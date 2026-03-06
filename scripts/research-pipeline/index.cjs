const https = require("https");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;

const RESEARCH_MODE = (process.env.RESEARCH_MODE || "strict").toLowerCase();
const STRICT_MODE = RESEARCH_MODE !== "fast";
const PERFORMANCE_PROVIDER = (process.env.PERFORMANCE_PROVIDER || "lighthouse").toLowerCase();
const ALLOW_PSI_FALLBACK = process.env.ALLOW_PSI_FALLBACK === "true";

const QUALITY_THRESHOLDS = {
  competitors: Number(process.env.MIN_COMPETITORS || 3),
  keywords: Number(process.env.MIN_KEYWORDS || 10),
  prompts: Number(process.env.MIN_PROMPTS || 6),
};

const MARKET_CONFIG = {
  US: {
    key: "US",
    locationCode: 2840,
    locationName: "United States",
    languageCode: "en",
    languageName: "English",
  },
  AU: {
    key: "AU",
    locationCode: 2036,
    locationName: "Australia",
    languageCode: "en",
    languageName: "English",
  },
};

function parseTargetMarkets() {
  const raw = (process.env.TARGET_MARKETS || "US,AU")
    .split(",")
    .map((m) => m.trim().toUpperCase())
    .filter(Boolean);

  const selected = raw.map((m) => MARKET_CONFIG[m]).filter(Boolean);
  if (selected.length) return selected;
  return [MARKET_CONFIG.US, MARKET_CONFIG.AU];
}

const TARGET_MARKETS = parseTargetMarkets();

const EXCLUDED_COMPETITOR_DOMAINS = new Set([
  "kinso.ai",
  "youtube.com",
  "reddit.com",
  "instagram.com",
  "facebook.com",
  "google.com",
  "linkedin.com",
  "apple.com",
  "x.com",
  "tiktok.com",
  "wikipedia.org",
]);

const PUBLISHER_COMPETITOR_DOMAINS = new Set([
  "medium.com",
  "substack.com",
  "forbes.com",
  "businessinsider.com",
  "zapier.com",
  "g2.com",
  "capterra.com",
  "getapp.com",
  "trustpilot.com",
]);

const TAM_TIMEFRAME_MONTHS = Number(process.env.TAM_TIMEFRAME_MONTHS || 12);
const TAM_CHANNEL_SPLIT = {
  google: Number(process.env.TAM_CHANNEL_SHARE_GOOGLE || 0.86),
  ai: Number(process.env.TAM_CHANNEL_SHARE_AI || 0.14),
};
const TAM_CHANNEL_REACHABILITY = {
  google: Number(process.env.TAM_REACHABLE_SHARE_GOOGLE || 0.12),
  ai: Number(process.env.TAM_REACHABLE_SHARE_AI || 0.018),
};
const TAM_CAPTURE_RATES = {
  BOFU: {
    low: Number(process.env.TAM_CAPTURE_BOFU_LOW || 0.06),
    base: Number(process.env.TAM_CAPTURE_BOFU_BASE || 0.1),
    high: Number(process.env.TAM_CAPTURE_BOFU_HIGH || 0.16),
  },
  MOFU: {
    low: Number(process.env.TAM_CAPTURE_MOFU_LOW || 0.03),
    base: Number(process.env.TAM_CAPTURE_MOFU_BASE || 0.06),
    high: Number(process.env.TAM_CAPTURE_MOFU_HIGH || 0.1),
  },
  TOFU: {
    low: Number(process.env.TAM_CAPTURE_TOFU_LOW || 0.015),
    base: Number(process.env.TAM_CAPTURE_TOFU_BASE || 0.03),
    high: Number(process.env.TAM_CAPTURE_TOFU_HIGH || 0.05),
  },
};

const TAM_SCENARIOS = ["low", "base", "high"];

const MONTHLY_TRAJECTORY_WEIGHTS = {
  low: [0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.08, 0.09, 0.1, 0.11, 0.14, 0.15],
  base: [0.04, 0.05, 0.06, 0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.1, 0.13, 0.14],
  high: [0.05, 0.06, 0.07, 0.08, 0.08, 0.09, 0.09, 0.09, 0.09, 0.1, 0.1, 0.1],
};

const DEFAULT_REVENUE_ASSUMPTIONS = {
  visitorToLead: {
    low: Number(process.env.TAM_V2L_LOW || 0.004),
    base: Number(process.env.TAM_V2L_BASE || 0.009),
    high: Number(process.env.TAM_V2L_HIGH || 0.015),
  },
  leadToSql: {
    low: Number(process.env.TAM_L2SQL_LOW || 0.25),
    base: Number(process.env.TAM_L2SQL_BASE || 0.35),
    high: Number(process.env.TAM_L2SQL_HIGH || 0.45),
  },
  sqlToCustomer: {
    low: Number(process.env.TAM_SQL2C_LOW || 0.12),
    base: Number(process.env.TAM_SQL2C_BASE || 0.2),
    high: Number(process.env.TAM_SQL2C_HIGH || 0.3),
  },
  visitorToOrder: {
    low: Number(process.env.TAM_V2ORDER_LOW || 0.005),
    base: Number(process.env.TAM_V2ORDER_BASE || 0.012),
    high: Number(process.env.TAM_V2ORDER_HIGH || 0.02),
  },
};

const INTENT_PATTERNS = {
  BOFU:
    /\b(vs|versus|alternative|alternatives|compare|comparison|best|top|review|reviews|pricing|price|cost|software|tool|tools|platform|app|apps|inbox|competitor|competitors)\b/i,
  MOFU:
    /\b(template|templates|calculator|generator|checklist|case study|case studies|workflow|workflows|integration|integrations|migration|implementation|playbook|playbooks|framework|frameworks|process|processes|automation|automations|setup|onboarding|rollout|prioritization|triage|taxonomy|governance|collaboration|management|productivity|routing|categorization|organization|organizer)\b/i,
  TOFU: /\b(what is|how to|guide|tips|ideas|trends|news|definition)\b/i,
};

const CLUSTER_PATTERNS = [
  { name: "Alternatives & Comparisons", pattern: /\b(vs|versus|alternative|alternatives|compare|comparison|competitor|competitors)\b/i },
  { name: "Reviews & Social Proof", pattern: /\b(review|reviews|rating|ratings|testimonial|testimonials)\b/i },
  { name: "Buyer Guides", pattern: /\b(best|top|software|tool|tools|platform|platforms|app|apps|inbox)\b/i },
  { name: "Pricing & Cost", pattern: /\b(price|pricing|cost|quote)\b/i },
  { name: "Tools & Templates", pattern: /\b(template|templates|calculator|generator|checklist)\b/i },
  { name: "Education & Awareness", pattern: /\b(what is|how to|guide|tips|ideas|trend|trends|news|definition)\b/i },
];

const PHASE_BY_INTENT = {
  BOFU: "Phase 1 (Months 0-3)",
  MOFU: "Phase 2 (Months 4-8)",
  TOFU: "Phase 3 (Months 9-12)",
};

const KEYWORD_UNIVERSE_LIMIT = Number(process.env.KEYWORD_UNIVERSE_LIMIT || 800);
const KEYWORD_UNIVERSE_MIN_VOLUME = Number(process.env.KEYWORD_UNIVERSE_MIN_VOLUME || 10);
const COMPETITOR_KEYWORD_FETCH_LIMIT = Number(process.env.COMPETITOR_KEYWORD_FETCH_LIMIT || 5);
const SEMANTIC_SEED_LIMIT = Number(process.env.SEMANTIC_SEED_LIMIT || 8);
const SEMANTIC_KEYWORD_LIMIT_PER_ENDPOINT = Number(process.env.SEMANTIC_KEYWORD_LIMIT_PER_ENDPOINT || 120);
const FULL_UNIVERSE_REQUIRE_RELEVANCE = process.env.FULL_UNIVERSE_REQUIRE_RELEVANCE !== "false";
const MOFU_SEED_TEMPLATES = (process.env.MOFU_SEED_TEMPLATES ||
  "{{anchor}} workflow,{{anchor}} integration,{{anchor}} implementation,{{anchor}} migration,{{anchor}} playbook")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const GENERIC_SEMANTIC_TOKENS = new Set([
  "software",
  "tool",
  "tools",
  "platform",
  "platforms",
  "app",
  "apps",
  "service",
  "services",
  "solution",
  "solutions",
]);

const AI_VISIBILITY_PLATFORMS = {
  chatgpt: process.env.ENABLE_CHATGPT_TRACKING !== "false",
  googleAiOverview: process.env.ENABLE_GOOGLE_AIO_TRACKING !== "false",
  gemini: process.env.ENABLE_GEMINI_TRACKING !== "false",
  perplexity: process.env.ENABLE_PERPLEXITY_TRACKING !== "false",
};
const AI_PROMPT_LIMIT = Number(process.env.AI_PROMPT_LIMIT || 8);

const AI_LLM_ENDPOINTS = {
  chatgpt: "/v3/ai_optimization/chat_gpt/llm_scraper/live/advanced",
  gemini: "/v3/ai_optimization/gemini/llm_scraper/live/advanced",
  perplexity: "/v3/ai_optimization/perplexity/llm_scraper/live/advanced",
};

const FIRST_PARTY_CALIBRATION = {
  enabled: process.env.ENABLE_FIRST_PARTY_CALIBRATION === "true",
  organicSessions12m: Number(process.env.FIRST_PARTY_ORGANIC_SESSIONS_12M || 0),
  visitorToLead: Number(process.env.FIRST_PARTY_VISITOR_TO_LEAD || 0),
  leadToCustomer: Number(process.env.FIRST_PARTY_LEAD_TO_CUSTOMER || 0),
  averageDealValue: Number(process.env.FIRST_PARTY_AVERAGE_DEAL_VALUE || 0),
  averageOrderValue: Number(process.env.FIRST_PARTY_AVERAGE_ORDER_VALUE || 0),
};

function nowIso() {
  return new Date().toISOString();
}

function elapsedMs(start) {
  return Date.now() - start;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizeDomain(input) {
  if (!input) return null;
  try {
    const u = new URL(input.startsWith("http") ? input : `https://${input}`);
    return u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return String(input).replace(/^www\./, "").toLowerCase();
  }
}

function execFileAsync(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(command, args, options, (error, stdout, stderr) => {
      if (error) {
        const err = new Error(`${error.message}\n${stderr || ""}`.trim());
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function isValidCompetitorDomain(domain, companyDomain) {
  const d = normalizeDomain(domain);
  if (!d) return false;
  if (d === normalizeDomain(companyDomain)) return false;
  if (EXCLUDED_COMPETITOR_DOMAINS.has(d)) return false;
  return true;
}

function isLikelyPublisherDomain(domain) {
  const d = normalizeDomain(domain);
  if (!d) return true;
  return PUBLISHER_COMPETITOR_DOMAINS.has(d);
}

function withMarketTask(baseTask, market) {
  return {
    ...baseTask,
    location_code: market.locationCode,
    language_code: market.languageCode,
  };
}

async function dfRequestAcrossMarkets(endpoint, baseTask, debug, stepName) {
  const responses = [];
  for (const market of TARGET_MARKETS) {
    const parsed = await dfRequest(
      endpoint,
      [withMarketTask(baseTask, market)],
      debug,
      `${stepName}_${market.key.toLowerCase()}`
    );
    responses.push({ market, parsed });
  }
  return responses;
}

function strongerCompetitionLevel(a, b) {
  const rank = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
  };
  const aa = String(a || "").toUpperCase();
  const bb = String(b || "").toUpperCase();
  return (rank[aa] || 0) >= (rank[bb] || 0) ? aa || null : bb || null;
}

function classifyIntent(keyword) {
  const value = String(keyword || "").toLowerCase();
  if (INTENT_PATTERNS.BOFU.test(value)) return "BOFU";
  if (INTENT_PATTERNS.MOFU.test(value)) return "MOFU";
  if (INTENT_PATTERNS.TOFU.test(value)) return "TOFU";
  return "TOFU";
}

function classifyCluster(keyword) {
  const value = String(keyword || "").toLowerCase();
  for (const item of CLUSTER_PATTERNS) {
    if (item.pattern.test(value)) return item.name;
  }
  return "Category & Brand Demand";
}

function initializeScenarioObject(defaultValue = 0) {
  return {
    low: defaultValue,
    base: defaultValue,
    high: defaultValue,
  };
}

function roundNumber(value, decimals = 2) {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function addScenario(target, source) {
  for (const scenario of TAM_SCENARIOS) {
    target[scenario] += Number(source[scenario] || 0);
  }
}

function averageScenario(target, denominator) {
  if (!denominator || denominator <= 0) return;
  for (const scenario of TAM_SCENARIOS) {
    target[scenario] = target[scenario] / denominator;
  }
}

function cleanToken(token) {
  return String(token || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function tokenizeText(text, minLength = 3) {
  return String(text || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= minLength);
}

function uniqueValues(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function normalizePhrase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function buildPhraseVariants(value) {
  const normalized = normalizePhrase(value);
  if (!normalized) return [];
  const tokens = tokenizeText(normalized, 2);
  const phrases = [normalized];

  if (tokens.length >= 2) {
    for (let size = 2; size <= Math.min(3, tokens.length); size += 1) {
      for (let start = 0; start <= tokens.length - size; start += 1) {
        phrases.push(tokens.slice(start, start + size).join(" "));
      }
    }
  }

  return uniqueValues(phrases.filter((phrase) => phrase.length >= 3));
}

function parseCompanyList(value) {
  return Array.isArray(value)
    ? value.map((entry) => normalizePhrase(entry)).filter(Boolean)
    : [];
}

function buildCompanySemanticProfile(company) {
  const categoryParts = String(company?.category || "")
    .split("/")
    .map((s) => normalizePhrase(s))
    .filter(Boolean);

  const explicitSeeds = parseCompanyList(company?.semanticSeeds);
  const explicitExclusions = parseCompanyList(company?.semanticExclusions);
  const promptModifiers = company?.promptModifiers || {};
  const brandDisambiguation = normalizePhrase(
    company?.brandDisambiguation || promptModifiers.categoryLabel || categoryParts[categoryParts.length - 1] || ""
  );

  const categoryPhrases = uniqueValues([
    ...categoryParts,
    ...categoryParts.flatMap((part) => buildPhraseVariants(part)),
  ]);
  const brandPhrases = uniqueValues([
    normalizePhrase(company?.name || ""),
    ...buildPhraseVariants(String(company?.name || "")),
  ]);
  const domainTokens = tokenizeText(normalizeDomain(company?.domain || "")?.replace(/\./g, " ") || "", 2);
  const competitorTokens = uniqueValues(
    (Array.isArray(company?.competitorSeeds) ? company.competitorSeeds : []).flatMap((entry) => {
      if (!entry) return [];
      if (typeof entry === "string") return tokenizeText(entry, 2);
      return [...tokenizeText(entry?.name || "", 2), ...tokenizeText(entry?.domain || "", 2)];
    })
  );

  const lexiconTokens = uniqueValues(
    [
      ...tokenizeText(categoryPhrases.join(" "), 2),
      ...tokenizeText(brandDisambiguation, 2),
      ...tokenizeText(explicitSeeds.join(" "), 2),
      ...tokenizeText(brandPhrases.join(" "), 2),
      ...domainTokens,
      ...competitorTokens,
    ].filter((token) => !GENERIC_SEMANTIC_TOKENS.has(token))
  );

  const signalTokens = uniqueValues(
    [...tokenizeText(brandDisambiguation, 2), ...tokenizeText(explicitSeeds.join(" "), 2), ...tokenizeText(categoryPhrases.join(" "), 2)]
      .filter((token) => !GENERIC_SEMANTIC_TOKENS.has(token))
  );

  const coreAnchors = uniqueValues([
    ...explicitSeeds,
    ...categoryPhrases,
    ...brandPhrases,
    brandDisambiguation,
  ]).filter((phrase) => phrase.length >= 3);

  return {
    brandDisambiguation,
    promptModifiers,
    explicitSeeds,
    exclusions: explicitExclusions,
    categoryPhrases,
    brandPhrases,
    lexicon: new Set(lexiconTokens.map(cleanToken).filter(Boolean)),
    signalTokens,
    coreAnchors,
    promptCategoryLabel: normalizePhrase(promptModifiers.categoryLabel || brandDisambiguation || categoryParts[categoryParts.length - 1] || company?.category || company?.name || ""),
    promptBrandLabel: normalizePhrase(
      brandDisambiguation ? `${company?.name || ""} ${brandDisambiguation}` : company?.name || ""
    ),
  };
}

function pickSemanticSeeds(company, semanticProfile, rankedKeywords = [], keywordGaps = []) {
  const anchors = (semanticProfile?.coreAnchors || []).slice(0, 6);
  const priorityAnchors = anchors.slice(0, 3);
  const rankedSeeds = rankedKeywords
    .slice(0, 30)
    .filter((row) => Number(row?.volume || 0) >= 40)
    .map((row) => row.keyword)
    .filter(Boolean)
    .slice(0, 2);

  const gapSeeds = keywordGaps
    .slice(0, 20)
    .filter((row) => Number(row?.volume || 0) >= 30)
    .map((row) => row.keyword)
    .filter(Boolean)
    .slice(0, 2);

  const mofuSeeds = [];
  for (const anchor of priorityAnchors) {
    for (const template of MOFU_SEED_TEMPLATES) {
      mofuSeeds.push(template.replace(/\{\{\s*anchor\s*\}\}/gi, anchor).trim());
    }
  }

  const orderedSeeds = [
    ...(semanticProfile?.explicitSeeds || []),
    ...priorityAnchors,
    ...mofuSeeds.slice(0, 6),
    ...rankedSeeds,
    ...gapSeeds,
    ...anchors.slice(3),
    String(company?.name || "").trim(),
  ];

  return [...new Set(orderedSeeds)]
    .map((seed) => String(seed || "").trim().toLowerCase())
    .filter((seed) => seed.length >= 3)
    .slice(0, SEMANTIC_SEED_LIMIT);
}

function getKeywordFromLabsItem(item) {
  return item?.keyword_data?.keyword || item?.keyword || null;
}

function parseLabsKeywordItem(item, marketKey) {
  const keyword = getKeywordFromLabsItem(item);
  if (!keyword) return null;

  const info = item?.keyword_data?.keyword_info || item?.keyword_info || {};
  return {
    keyword,
    volume: Number(info.search_volume || 0),
    cpc: typeof info.cpc === "number" ? info.cpc : null,
    competition: info.competition_level || null,
    markets: marketKey ? [marketKey] : [],
  };
}

function hasCoreAnchorMatch(keyword, anchors) {
  const value = String(keyword || "").toLowerCase();
  return anchors.some((anchor) => value.includes(anchor));
}

function matchesKeywordExclusion(keyword, exclusions = []) {
  const value = normalizePhrase(keyword);
  return exclusions.some((phrase) => value.includes(phrase));
}

function keywordRelevanceScore(keyword, lexicon) {
  const tokens = String(keyword || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (!tokens.length) return 0;

  let matches = 0;
  for (const token of tokens) {
    if (lexicon.has(cleanToken(token))) matches += 1;
  }
  return matches / tokens.length;
}

function createKeywordRow(keyword) {
  return {
    keyword,
    volume: 0,
    position: null,
    cpc: null,
    competition: null,
    url: null,
    intent: classifyIntent(keyword),
    cluster: classifyCluster(keyword),
    markets: new Set(),
    sources: new Set(),
    sourceDetails: [],
    relevanceScore: 0,
  };
}

function mergeKeywordRow(map, row, source, sourceDetail = null) {
  const keyword = row?.keyword;
  if (!keyword) return;

  const existing = map.get(keyword) || createKeywordRow(keyword);
  const volume = Number(row.volume || 0);
  existing.volume += volume;

  if (typeof row.position === "number") {
    existing.position =
      typeof existing.position === "number" ? Math.min(existing.position, row.position) : row.position;
  }

  if (typeof row.cpc === "number") {
    existing.cpc = typeof existing.cpc === "number" ? Math.max(existing.cpc, row.cpc) : row.cpc;
  }

  existing.competition = strongerCompetitionLevel(existing.competition, row.competition);
  if (!existing.url && row.url) existing.url = row.url;

  for (const market of row.markets || []) {
    existing.markets.add(market);
  }

  existing.sources.add(source);
  if (sourceDetail) existing.sourceDetails.push(sourceDetail);
  map.set(keyword, existing);
}

function stringifySet(value) {
  return Array.isArray(value) ? value : Array.from(value || []);
}

function safeRatio(numerator, denominator, fallback = 0) {
  if (!denominator) return fallback;
  return numerator / denominator;
}

function applyCaptureToDemand(demand, intent) {
  const rates = TAM_CAPTURE_RATES[intent] || TAM_CAPTURE_RATES.TOFU;
  const searchReachable = demand * TAM_CHANNEL_SPLIT.google * TAM_CHANNEL_REACHABILITY.google;
  const aiReachable = demand * TAM_CHANNEL_SPLIT.ai * TAM_CHANNEL_REACHABILITY.ai;

  const totalReachable = initializeScenarioObject();
  const searchByScenario = initializeScenarioObject();
  const aiByScenario = initializeScenarioObject();

  for (const scenario of TAM_SCENARIOS) {
    const captureRate = rates[scenario] || 0;
    searchByScenario[scenario] = searchReachable * captureRate;
    aiByScenario[scenario] = aiReachable * captureRate;
    totalReachable[scenario] = searchByScenario[scenario] + aiByScenario[scenario];
  }

  return {
    reachableVisits: totalReachable,
    channelReachableVisits: {
      google: searchByScenario,
      ai: aiByScenario,
    },
  };
}

function buildMonthlyTrajectory(totalsReachable) {
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return {
      month,
      label: `M${month}`,
      low: roundNumber(Number(totalsReachable?.low || 0) * MONTHLY_TRAJECTORY_WEIGHTS.low[index]),
      base: roundNumber(Number(totalsReachable?.base || 0) * MONTHLY_TRAJECTORY_WEIGHTS.base[index]),
      high: roundNumber(Number(totalsReachable?.high || 0) * MONTHLY_TRAJECTORY_WEIGHTS.high[index]),
    };
  });
}

function buildExecutionBlueprint(topOpportunityClusters = []) {
  const months = Array.from({ length: 12 }, (_, index) => `M${index + 1}`);
  const topBofu = topOpportunityClusters.filter((cluster) => cluster.intent === "BOFU").slice(0, 3);
  const topMofu = topOpportunityClusters.filter((cluster) => cluster.intent === "MOFU").slice(0, 3);
  const topTofu = topOpportunityClusters.filter((cluster) => cluster.intent === "TOFU").slice(0, 3);

  return {
    months,
    tracks: [
      {
        name: "Money entity capture",
        description:
          topBofu.length > 0
            ? `Priority BOFU coverage around ${topBofu.map((cluster) => cluster.cluster).join(", ")}.`
            : "Priority BOFU pages and comparison assets ship from month 1 onward.",
        cells: [
          { label: "Prioritize", tone: "high" },
          { label: "Build", tone: "high" },
          { label: "Ship", tone: "high" },
          { label: "Ship", tone: "high" },
          { label: "Expand", tone: "base" },
          { label: "Expand", tone: "base" },
          { label: "Refresh", tone: "base" },
          { label: "Refresh", tone: "base" },
          { label: "Refresh", tone: "base" },
          { label: "Defend", tone: "base" },
          { label: "Defend", tone: "base" },
          { label: "Defend", tone: "base" },
        ],
      },
      {
        name: "Workflow + implementation layer",
        description:
          topMofu.length > 0
            ? `Implementation, workflow, and proof assets expand around ${topMofu.map((cluster) => cluster.cluster).join(", ")}.`
            : "Implementation and workflow proof compounds in parallel with BOFU page launches.",
        cells: [
          { label: "Map", tone: "high" },
          { label: "Implement", tone: "high" },
          { label: "Instrument", tone: "base" },
          { label: "Ship", tone: "base" },
          { label: "Expand", tone: "base" },
          { label: "Expand", tone: "base" },
          { label: "Proof", tone: "base" },
          { label: "Proof", tone: "base" },
          { label: "Optimize", tone: "base" },
          { label: "Optimize", tone: "base" },
          { label: "Scale", tone: "base" },
          { label: "Scale", tone: "base" },
        ],
      },
      {
        name: "Authority + distribution",
        description:
          topTofu.length > 0
            ? `Authority building reinforces ${topTofu.map((cluster) => cluster.cluster).join(", ")} themes while supporting AI citation lift.`
            : "Authority and distribution reinforce every shipped asset from the first month.",
        cells: [
          { label: "Seed", tone: "high" },
          { label: "Seed", tone: "high" },
          { label: "Launch", tone: "base" },
          { label: "Distribute", tone: "base" },
          { label: "Distribute", tone: "base" },
          { label: "Expand", tone: "base" },
          { label: "Expand", tone: "base" },
          { label: "Refresh", tone: "base" },
          { label: "Refresh", tone: "base" },
          { label: "Scale", tone: "base" },
          { label: "Scale", tone: "base" },
          { label: "Defend", tone: "base" },
        ],
      },
      {
        name: "Measurement + prompt ops",
        description: "Prompt testing, answer-share tracking, and iteration loops start in month 1 and never stop.",
        cells: [
          { label: "Baseline", tone: "high" },
          { label: "Track", tone: "high" },
          { label: "Tune", tone: "base" },
          { label: "Tune", tone: "base" },
          { label: "Report", tone: "base" },
          { label: "Tune", tone: "base" },
          { label: "Report", tone: "base" },
          { label: "Tune", tone: "base" },
          { label: "Report", tone: "base" },
          { label: "Tune", tone: "base" },
          { label: "Report", tone: "base" },
          { label: "Systemize", tone: "base" },
        ],
      },
    ],
  };
}

function buildRevenueModel(company, tamModel) {
  const reachable = tamModel?.totals?.estimatedReachableVisits;
  if (!reachable) {
    return {
      enabled: false,
      modelType: "none",
      reason: "TAM model missing reachable visit scenarios.",
    };
  }

  const companyAcv = Number(company?.acv || process.env.DEFAULT_ACV || 0);
  const companyAov = Number(company?.aov || process.env.DEFAULT_AOV || 0);
  const modelType = companyAcv > 0 ? "b2b_saas" : companyAov > 0 ? "ecommerce" : "none";

  const leads = initializeScenarioObject();
  for (const scenario of TAM_SCENARIOS) {
    leads[scenario] = reachable[scenario] * DEFAULT_REVENUE_ASSUMPTIONS.visitorToLead[scenario];
  }

  if (modelType === "none") {
    return {
      enabled: false,
      modelType: "none",
      reason: "Revenue inputs missing (acv/aov). Showing TAM + pipeline potential only.",
      pipelinePotential: {
        leads: Object.fromEntries(
          Object.entries(leads).map(([k, v]) => [k, roundNumber(v)])
        ),
      },
      assumptions: {
        visitorToLead: DEFAULT_REVENUE_ASSUMPTIONS.visitorToLead,
      },
    };
  }

  if (modelType === "ecommerce") {
    const orders = initializeScenarioObject();
    const revenue = initializeScenarioObject();
    for (const scenario of TAM_SCENARIOS) {
      orders[scenario] = reachable[scenario] * DEFAULT_REVENUE_ASSUMPTIONS.visitorToOrder[scenario];
      revenue[scenario] = orders[scenario] * companyAov;
    }

    return {
      enabled: true,
      modelType,
      headlineMetric: "annualRevenuePotential",
      scenarios: {
        orders: Object.fromEntries(Object.entries(orders).map(([k, v]) => [k, roundNumber(v)])),
        annualRevenuePotential: Object.fromEntries(
          Object.entries(revenue).map(([k, v]) => [k, roundNumber(v)])
        ),
      },
      assumptions: {
        aov: companyAov,
        visitorToOrder: DEFAULT_REVENUE_ASSUMPTIONS.visitorToOrder,
      },
      estimateOnly: true,
    };
  }

  const sqls = initializeScenarioObject();
  const customers = initializeScenarioObject();
  const revenue = initializeScenarioObject();
  for (const scenario of TAM_SCENARIOS) {
    sqls[scenario] = leads[scenario] * DEFAULT_REVENUE_ASSUMPTIONS.leadToSql[scenario];
    customers[scenario] = sqls[scenario] * DEFAULT_REVENUE_ASSUMPTIONS.sqlToCustomer[scenario];
    revenue[scenario] = customers[scenario] * companyAcv;
  }

  return {
    enabled: true,
    modelType,
    headlineMetric: "annualRevenuePotential",
    scenarios: {
      leads: Object.fromEntries(Object.entries(leads).map(([k, v]) => [k, roundNumber(v)])),
      sqls: Object.fromEntries(Object.entries(sqls).map(([k, v]) => [k, roundNumber(v)])),
      customers: Object.fromEntries(Object.entries(customers).map(([k, v]) => [k, roundNumber(v)])),
      annualRevenuePotential: Object.fromEntries(
        Object.entries(revenue).map(([k, v]) => [k, roundNumber(v)])
      ),
    },
    assumptions: {
      acv: companyAcv,
      visitorToLead: DEFAULT_REVENUE_ASSUMPTIONS.visitorToLead,
      leadToSql: DEFAULT_REVENUE_ASSUMPTIONS.leadToSql,
      sqlToCustomer: DEFAULT_REVENUE_ASSUMPTIONS.sqlToCustomer,
    },
    estimateOnly: true,
  };
}

function buildTopicalIntegrityReport(company, semanticProfile, keywordUniverse, aiVisibility) {
  const topKeywords = (keywordUniverse || []).slice(0, 20);
  const excludedTopKeywords = topKeywords.filter((row) => row.exclusionMatched);
  const topicallyRelevantTopKeywords = topKeywords.filter(
    (row) => !row.exclusionMatched && (row.anchorMatched || Number(row.topicalRelevanceScore || row.relevanceScore || 0) >= 0.45)
  );
  const semanticOnlyRows = (keywordUniverse || []).filter(
    (row) => Array.isArray(row.sources) && row.sources.length === 1 && row.sources.includes("semantic_expansion")
  );
  const totalDemand = (keywordUniverse || []).reduce((sum, row) => sum + Number(row.volume || 0), 0);
  const semanticOnlyDemand = semanticOnlyRows.reduce((sum, row) => sum + Number(row.volume || 0), 0);
  const lowQualitySemanticDemand = semanticOnlyRows
    .filter((row) => Number(row.topicalRelevanceScore || row.relevanceScore || 0) < 0.45 && !row.anchorMatched)
    .reduce((sum, row) => sum + Number(row.volume || 0), 0);
  const ambiguousPromptMentions = (aiVisibility?.promptResults || []).filter((row) => row.ambiguousInterpretation).length;
  const validatedPromptMentions = (aiVisibility?.promptResults || []).filter((row) =>
    ["validated_brand", "validated_category"].includes(row.mentionQuality)
  ).length;

  const failures = [];
  if (topKeywords.length >= 5 && excludedTopKeywords.length > 0) {
    failures.push(`excluded terms in top keywords: ${excludedTopKeywords.map((row) => row.keyword).slice(0, 5).join(", ")}`);
  }
  if (topKeywords.length >= 5 && safeRatio(topicallyRelevantTopKeywords.length, topKeywords.length) < 0.7) {
    failures.push("top keyword topical coverage below 70%");
  }
  if (safeRatio(lowQualitySemanticDemand, totalDemand) > 0.35) {
    failures.push("low-quality semantic demand exceeds 35% of total keyword demand");
  }
  if (safeRatio(ambiguousPromptMentions, Math.max((aiVisibility?.promptResults || []).length, 1)) > 0.3) {
    failures.push("ambiguous AI prompt interpretations exceed 30%");
  }

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      company: company?.slug || company?.name || null,
      brandDisambiguation: semanticProfile?.brandDisambiguation || null,
      topKeywordCount: topKeywords.length,
      topicallyRelevantTopKeywordCount: topicallyRelevantTopKeywords.length,
      excludedTopKeywordCount: excludedTopKeywords.length,
      semanticOnlyDemandSharePercent: roundNumber(safeRatio(semanticOnlyDemand, totalDemand) * 100, 2),
      lowQualitySemanticDemandSharePercent: roundNumber(safeRatio(lowQualitySemanticDemand, totalDemand) * 100, 2),
      ambiguousPromptMentions,
      validatedPromptMentions,
    },
    sampleExcludedKeywords: excludedTopKeywords.slice(0, 10).map((row) => row.keyword),
    sampleLowQualitySemanticKeywords: semanticOnlyRows
      .filter((row) => Number(row.topicalRelevanceScore || row.relevanceScore || 0) < 0.45 && !row.anchorMatched)
      .slice(0, 10)
      .map((row) => row.keyword),
  };
}

function buildTamConfidence(tamModel, keywordUniverse, keywordGaps, aiVisibility, topicalIntegrity) {
  let score = 55;
  const reasons = [];

  if ((tamModel?.totals?.totalAddressableSearchDemand || 0) >= 1000) {
    score += 10;
    reasons.push("Sufficient TAM volume identified.");
  } else {
    reasons.push("Limited TAM volume; upside may be conservative.");
  }

  if ((keywordUniverse?.length || 0) >= 120) {
    score += 10;
    reasons.push("Strong full keyword universe coverage.");
  } else {
    score -= 5;
    reasons.push("Keyword universe is still limited; expand seed set and competitor coverage.");
  }

  if ((keywordGaps?.length || 0) >= 10) {
    score += 5;
    reasons.push("Gap analysis provides enough expansion signals.");
  }

  const semanticKeywords = Number(tamModel?.keywordUniverse?.semanticContribution?.keywordCount || 0);
  if (semanticKeywords >= 20) {
    score += 5;
    reasons.push("Semantic keyword expansion contributed meaningful TAM coverage.");
  } else {
    reasons.push("Semantic keyword expansion is light; broaden middle-funnel query seeds.");
  }

  if (topicalIntegrity?.passed) {
    score += 10;
    reasons.push("Topical integrity checks passed for the keyword universe.");
  } else if (topicalIntegrity) {
    score -= 20;
    reasons.push(`Topical integrity concerns detected: ${topicalIntegrity.failures.join("; ")}`);
  }

  const aiPromptCount = aiVisibility?.promptResults?.filter(
    (r) => !r.error && typeof r.responsePreview === "string" && r.responsePreview.length > 0
  ).length;
  if (aiPromptCount >= 6) {
    score += 5;
    reasons.push("AI visibility prompts provide directional coverage.");
  }

  const sampledPlatforms = Object.values(aiVisibility?.platformSummary || {}).filter(
    (row) => Number(row?.total || 0) > 0
  ).length;
  if (sampledPlatforms >= 2) {
    score += 5;
    reasons.push("AI visibility sampled across multiple platforms.");
  }

  if ((topicalIntegrity?.metrics?.ambiguousPromptMentions || 0) > 0) {
    score -= 5;
    reasons.push("Some AI prompt matches were ambiguous and discounted.");
  }

  if (tamModel?.revenueModel?.enabled) {
    score += 5;
    reasons.push("Revenue inputs available for optional upside modeling.");
  } else {
    reasons.push("Revenue model is estimate-only and missing first-party monetary inputs.");
  }

  score = Math.max(0, Math.min(100, score));
  const level = score >= 80 ? "high" : score >= 60 ? "medium" : "low";
  return { score, level, reasons };
}

function buildKeywordUniverse(company, semanticProfile, rankedKeywords, keywordGaps, competitorKeywordSets, semanticKeywordSets = []) {
  const lexicon = semanticProfile?.lexicon || new Set();
  const coreAnchors = semanticProfile?.coreAnchors || [];
  const exclusions = semanticProfile?.exclusions || [];
  const keywordMap = new Map();

  for (const row of rankedKeywords) {
    mergeKeywordRow(keywordMap, row, "target_ranked_keywords", "target");
  }

  for (const row of keywordGaps) {
    mergeKeywordRow(keywordMap, row, "keyword_gaps", "gap");
  }

  for (const set of competitorKeywordSets) {
    for (const row of set.keywords || []) {
      mergeKeywordRow(keywordMap, row, "competitor_keywords", set.domain);
    }
  }

  for (const set of semanticKeywordSets) {
    for (const row of set.keywords || []) {
      mergeKeywordRow(keywordMap, row, "semantic_expansion", set.source || "semantic_seed");
    }
  }

  const universe = [];
  for (const row of keywordMap.values()) {
    row.relevanceScore = keywordRelevanceScore(row.keyword, lexicon);
    const anchorMatch = hasCoreAnchorMatch(row.keyword, coreAnchors);
    const hasTargetSignal = row.sources.has("target_ranked_keywords") || row.sources.has("keyword_gaps");
    const onlyCompetitorSource = row.sources.size === 1 && row.sources.has("competitor_keywords");
    const semanticOnly = row.sources.size === 1 && row.sources.has("semantic_expansion");
    const isMofu = classifyIntent(row.keyword) === "MOFU";
    const exclusionMatched = matchesKeywordExclusion(row.keyword, exclusions);
    const topicalRelevanceScore = anchorMatch ? Math.max(row.relevanceScore, 0.85) : row.relevanceScore;

    if (row.volume < KEYWORD_UNIVERSE_MIN_VOLUME) continue;
    if (exclusionMatched && !hasTargetSignal) continue;
    if (FULL_UNIVERSE_REQUIRE_RELEVANCE && row.relevanceScore <= 0 && !hasTargetSignal) {
      continue;
    }

    if (onlyCompetitorSource && !anchorMatch) {
      if (row.relevanceScore < 0.5) continue;
      if (classifyIntent(row.keyword) === "TOFU" && row.volume > 100000) continue;
    }

    if (!hasTargetSignal && !anchorMatch && row.relevanceScore < 0.3) {
      continue;
    }

    if (semanticOnly && row.relevanceScore < 0.35 && !anchorMatch) {
      continue;
    }

    if (semanticOnly && row.volume > 250000 && topicalRelevanceScore < 0.75) {
      continue;
    }

    if (semanticOnly && isMofu && row.relevanceScore < 0.2 && !anchorMatch) {
      continue;
    }

    universe.push({
      keyword: row.keyword,
      volume: row.volume,
      position: row.position,
      cpc: row.cpc,
      competition: row.competition,
      url: row.url,
      intent: row.intent,
      cluster: row.cluster,
      markets: stringifySet(row.markets),
      sources: stringifySet(row.sources),
      sourceDetails: row.sourceDetails.slice(0, 8),
      relevanceScore: roundNumber(row.relevanceScore, 3),
      topicalRelevanceScore: roundNumber(topicalRelevanceScore, 3),
      anchorMatched: anchorMatch,
      exclusionMatched,
    });
  }

  return universe
    .sort((a, b) => {
      const exclusionDiff = Number(a.exclusionMatched) - Number(b.exclusionMatched);
      if (exclusionDiff !== 0) return exclusionDiff;
      const volumeDiff = (b.volume || 0) - (a.volume || 0);
      if (volumeDiff !== 0) return volumeDiff;
      return (b.topicalRelevanceScore || b.relevanceScore || 0) - (a.topicalRelevanceScore || a.relevanceScore || 0);
    })
    .slice(0, KEYWORD_UNIVERSE_LIMIT);
}

function applyFirstPartyCalibration(tamModel) {
  if (!FIRST_PARTY_CALIBRATION.enabled) {
    return {
      enabled: false,
      status: "disabled",
      reason: "ENABLE_FIRST_PARTY_CALIBRATION is not true.",
    };
  }

  const modeledBase = Number(tamModel?.totals?.estimatedReachableVisits?.base || 0);
  const firstPartySessions = Number(FIRST_PARTY_CALIBRATION.organicSessions12m || 0);

  if (modeledBase <= 0 || firstPartySessions <= 0) {
    return {
      enabled: false,
      status: "insufficient_inputs",
      reason: "FIRST_PARTY_ORGANIC_SESSIONS_12M is required and modeled base must be > 0.",
    };
  }

  const rawFactor = safeRatio(firstPartySessions, modeledBase, 1);
  const calibrationFactor = Math.max(0.25, Math.min(4, rawFactor));

  const calibrated = {
    low: roundNumber(tamModel.totals.estimatedReachableVisits.low * calibrationFactor),
    base: roundNumber(tamModel.totals.estimatedReachableVisits.base * calibrationFactor),
    high: roundNumber(tamModel.totals.estimatedReachableVisits.high * calibrationFactor),
  };

  const visitorToLead = FIRST_PARTY_CALIBRATION.visitorToLead > 0
    ? {
        low: roundNumber(FIRST_PARTY_CALIBRATION.visitorToLead * 0.8, 4),
        base: roundNumber(FIRST_PARTY_CALIBRATION.visitorToLead, 4),
        high: roundNumber(FIRST_PARTY_CALIBRATION.visitorToLead * 1.2, 4),
      }
    : null;

  let impliedRevenue = null;
  const dealValue =
    FIRST_PARTY_CALIBRATION.averageDealValue > 0
      ? FIRST_PARTY_CALIBRATION.averageDealValue
      : FIRST_PARTY_CALIBRATION.averageOrderValue > 0
      ? FIRST_PARTY_CALIBRATION.averageOrderValue
      : 0;

  if (visitorToLead && dealValue > 0) {
    const leadToCustomer = FIRST_PARTY_CALIBRATION.leadToCustomer > 0
      ? FIRST_PARTY_CALIBRATION.leadToCustomer
      : DEFAULT_REVENUE_ASSUMPTIONS.sqlToCustomer.base;

    impliedRevenue = {};
    for (const scenario of TAM_SCENARIOS) {
      const leads = calibrated[scenario] * visitorToLead[scenario];
      const customers = leads * leadToCustomer;
      impliedRevenue[scenario] = roundNumber(customers * dealValue);
    }
  }

  return {
    enabled: true,
    status: "applied",
    calibrationFactor: roundNumber(calibrationFactor, 3),
    firstPartyOrganicSessions12m: firstPartySessions,
    modeledReachableVisitsBeforeCalibration: {
      low: roundNumber(tamModel.totals.estimatedReachableVisits.low),
      base: roundNumber(tamModel.totals.estimatedReachableVisits.base),
      high: roundNumber(tamModel.totals.estimatedReachableVisits.high),
    },
    calibratedReachableVisits: calibrated,
    assumptions: {
      visitorToLead,
      leadToCustomer:
        FIRST_PARTY_CALIBRATION.leadToCustomer > 0
          ? FIRST_PARTY_CALIBRATION.leadToCustomer
          : null,
      dealValue: dealValue > 0 ? dealValue : null,
    },
    impliedRevenueEstimate: impliedRevenue,
    note: "Calibration is optional and estimate-only; validate against GA/CRM before forecasting commitments.",
  };
}

function buildTamModel(company, semanticProfile, keywordUniverse, keywordGaps, aiVisibility, topicalIntegrity) {
  const byIntent = {
    BOFU: {
      intent: "BOFU",
      phase: PHASE_BY_INTENT.BOFU,
      demand: 0,
      keywordCount: 0,
      reachableVisits: initializeScenarioObject(),
      channelReachableVisits: {
        google: initializeScenarioObject(),
        ai: initializeScenarioObject(),
      },
    },
    MOFU: {
      intent: "MOFU",
      phase: PHASE_BY_INTENT.MOFU,
      demand: 0,
      keywordCount: 0,
      reachableVisits: initializeScenarioObject(),
      channelReachableVisits: {
        google: initializeScenarioObject(),
        ai: initializeScenarioObject(),
      },
    },
    TOFU: {
      intent: "TOFU",
      phase: PHASE_BY_INTENT.TOFU,
      demand: 0,
      keywordCount: 0,
      reachableVisits: initializeScenarioObject(),
      channelReachableVisits: {
        google: initializeScenarioObject(),
        ai: initializeScenarioObject(),
      },
    },
  };

  const clusterMap = new Map();
  let totalDemand = 0;

  for (const row of keywordUniverse) {
    const keyword = row.keyword;
    const volume = Number(row.volume || 0);
    if (!keyword || volume <= 0) continue;

    const intent = classifyIntent(keyword);
    const cluster = classifyCluster(keyword);
    const impact = applyCaptureToDemand(volume, intent);

    totalDemand += volume;

    byIntent[intent].demand += volume;
    byIntent[intent].keywordCount += 1;
    addScenario(byIntent[intent].reachableVisits, impact.reachableVisits);
    addScenario(byIntent[intent].channelReachableVisits.google, impact.channelReachableVisits.google);
    addScenario(byIntent[intent].channelReachableVisits.ai, impact.channelReachableVisits.ai);

    const existingCluster = clusterMap.get(cluster) || {
      cluster,
      intent,
      phase: PHASE_BY_INTENT[intent],
      demand: 0,
      reachableVisits: initializeScenarioObject(),
      keywordCount: 0,
      sampleKeywords: [],
      markets: new Set(),
      sources: new Set(),
    };

    existingCluster.demand += volume;
    existingCluster.keywordCount += 1;
    addScenario(existingCluster.reachableVisits, impact.reachableVisits);
    if (existingCluster.sampleKeywords.length < 6 && !existingCluster.sampleKeywords.includes(keyword)) {
      existingCluster.sampleKeywords.push(keyword);
    }
    for (const market of row.markets || []) {
      existingCluster.markets.add(market);
    }
    for (const source of row.sources || []) {
      existingCluster.sources.add(source);
    }
    clusterMap.set(cluster, existingCluster);
  }

  const totalsReachable = initializeScenarioObject();
  for (const intentKey of Object.keys(byIntent)) {
    addScenario(totalsReachable, byIntent[intentKey].reachableVisits);
  }

  const byChannel = {
    google: {
      demand: totalDemand * TAM_CHANNEL_SPLIT.google,
      reachableVisits: initializeScenarioObject(),
    },
    ai: {
      demand: totalDemand * TAM_CHANNEL_SPLIT.ai,
      reachableVisits: initializeScenarioObject(),
    },
  };

  for (const intentKey of Object.keys(byIntent)) {
    addScenario(byChannel.google.reachableVisits, byIntent[intentKey].channelReachableVisits.google);
    addScenario(byChannel.ai.reachableVisits, byIntent[intentKey].channelReachableVisits.ai);
  }

  const phasedUpside = Object.values(byIntent).map((row) => ({
    phase: row.phase,
    intent: row.intent,
    demand: roundNumber(row.demand),
    keywordCount: row.keywordCount,
    estimatedReachableVisits: {
      low: roundNumber(row.reachableVisits.low),
      base: roundNumber(row.reachableVisits.base),
      high: roundNumber(row.reachableVisits.high),
    },
  }));

  const topOpportunityClusters = Array.from(clusterMap.values())
    .sort((a, b) => b.reachableVisits.base - a.reachableVisits.base)
    .slice(0, 12)
    .map((cluster) => ({
      cluster: cluster.cluster,
      intent: cluster.intent,
      phase: cluster.phase,
      demand: roundNumber(cluster.demand),
      keywordCount: cluster.keywordCount,
      estimatedReachableVisits: {
        low: roundNumber(cluster.reachableVisits.low),
        base: roundNumber(cluster.reachableVisits.base),
        high: roundNumber(cluster.reachableVisits.high),
      },
      sampleKeywords: cluster.sampleKeywords,
      markets: Array.from(cluster.markets),
      sources: Array.from(cluster.sources),
    }));

  const monthlyTrajectory = buildMonthlyTrajectory(totalsReachable);
  const executionBlueprint = buildExecutionBlueprint(topOpportunityClusters);

  const keywordUniverseSummary = {
    size: keywordUniverse.length,
    minVolumeThreshold: KEYWORD_UNIVERSE_MIN_VOLUME,
    coreAnchors: semanticProfile?.coreAnchors || [],
    topKeywords: keywordUniverse.slice(0, 40),
    countsBySource: keywordUniverse.reduce((acc, row) => {
      for (const source of row.sources || []) {
        acc[source] = (acc[source] || 0) + 1;
      }
      return acc;
    }, {}),
    countsByIntent: keywordUniverse.reduce((acc, row) => {
      acc[row.intent] = (acc[row.intent] || 0) + 1;
      return acc;
    }, {}),
    anchorMatchedCount: keywordUniverse.filter((row) => row.anchorMatched).length,
    validatedKeywordCount: keywordUniverse.filter((row) => !row.exclusionMatched).length,
    validatedDemand: roundNumber(
      keywordUniverse.filter((row) => !row.exclusionMatched).reduce((sum, row) => sum + Number(row.volume || 0), 0)
    ),
    semanticContribution: (() => {
      const semanticRows = keywordUniverse.filter((row) =>
        Array.isArray(row.sources) ? row.sources.includes("semantic_expansion") : false
      );
      const semanticDemand = semanticRows.reduce((sum, row) => sum + Number(row.volume || 0), 0);
      return {
        keywordCount: semanticRows.length,
        demand: roundNumber(semanticDemand),
        demandSharePercent: roundNumber(safeRatio(semanticDemand, totalDemand) * 100, 2),
      };
    })(),
  };

  const defaultLtv = Number(company?.ltv || process.env.DEFAULT_CUSTOMER_LTV || 0);
  const defaultVisitToCustomer = Number(process.env.DEFAULT_VISIT_TO_CUSTOMER_RATE || 0.01);
  const roiCalculatorDefaults = {
    customerLtv: defaultLtv > 0 ? defaultLtv : 0,
    visitToCustomerRate: defaultVisitToCustomer,
    formula: "EstimatedCustomers = ReachableVisits × VisitToCustomerRate; RevenuePotential = EstimatedCustomers × CustomerLTV",
    estimateOnly: true,
  };

  const tamModel = {
    timeframeMonths: TAM_TIMEFRAME_MONTHS,
    estimateOnly: true,
    markets: TARGET_MARKETS.map((m) => m.key),
    methodology: {
      version: "tam_v2",
      formula:
        "ReachableDemand = SearchVolume × ChannelSplit × ModeledReachableShare × VisibilityCaptureRate",
      notes: [
        "Modeled estimate; not actual analytics traffic.",
        "US+AU only.",
        "Google reachable-share defaults are intentionally conservative for founder planning.",
        "Use first-party analytics to calibrate conversion assumptions.",
        "Displayed monthly trajectory values should be rounded to whole numbers for planning readability.",
      ],
    },
    assumptions: {
      channelSplit: TAM_CHANNEL_SPLIT,
      modeledReachableShare: TAM_CHANNEL_REACHABILITY,
      captureRates: TAM_CAPTURE_RATES,
      scenarios: TAM_SCENARIOS,
      selectedHorizonMonths: 12,
      conversionRangePolicy: "low_base_high",
      founderReadableSummary: [
        "Google reachable-share assumptions are modeled conservatively rather than presented as raw CTR guarantees.",
        "Capture rates vary by BOFU, MOFU, and TOFU intent because commercial intent converts into visibility at different speeds.",
        "These numbers are planning coefficients, not a claim that the brand will capture the full market immediately.",
      ],
    },
    keywordUniverse: keywordUniverseSummary,
    totals: {
      totalAddressableSearchDemand: roundNumber(totalDemand),
      estimatedReachableVisits: {
        low: roundNumber(totalsReachable.low),
        base: roundNumber(totalsReachable.base),
        high: roundNumber(totalsReachable.high),
      },
      byChannel: {
        google: {
          demand: roundNumber(byChannel.google.demand),
          estimatedReachableVisits: {
            low: roundNumber(byChannel.google.reachableVisits.low),
            base: roundNumber(byChannel.google.reachableVisits.base),
            high: roundNumber(byChannel.google.reachableVisits.high),
          },
        },
        ai: {
          demand: roundNumber(byChannel.ai.demand),
          estimatedReachableVisits: {
            low: roundNumber(byChannel.ai.reachableVisits.low),
            base: roundNumber(byChannel.ai.reachableVisits.base),
            high: roundNumber(byChannel.ai.reachableVisits.high),
          },
        },
      },
    },
    byIntent: Object.values(byIntent).map((row) => ({
      intent: row.intent,
      phase: row.phase,
      demand: roundNumber(row.demand),
      keywordCount: row.keywordCount,
      estimatedReachableVisits: {
        low: roundNumber(row.reachableVisits.low),
        base: roundNumber(row.reachableVisits.base),
        high: roundNumber(row.reachableVisits.high),
      },
    })),
    phasedUpside,
    monthlyTrajectory,
    executionBlueprint,
    topOpportunityClusters,
    keywordGapCount: keywordGaps.length,
    aiVisibilitySignals: {
      promptsAnalyzed: aiVisibility?.promptResults?.length || 0,
      successfulPrompts:
        aiVisibility?.promptResults?.filter(
          (r) => !r.error && typeof r.responsePreview === "string" && r.responsePreview.length > 0
        ).length || 0,
      clientMentionedPrompts:
        aiVisibility?.promptResults?.filter((r) => r.clientMentioned).length || 0,
      validatedPrompts:
        aiVisibility?.promptResults?.filter((r) => ["validated_brand", "validated_category"].includes(r.mentionQuality)).length || 0,
      ambiguousPromptMentions:
        aiVisibility?.promptResults?.filter((r) => r.ambiguousInterpretation).length || 0,
      byPlatform: aiVisibility?.platformSummary || {},
      platformAvailability: aiVisibility?.platformAvailability || {},
    },
    roiCalculatorDefaults,
    topicalIntegrity: topicalIntegrity || null,
  };

  tamModel.revenueModel = buildRevenueModel(company, tamModel);
  tamModel.calibration = applyFirstPartyCalibration(tamModel);
  tamModel.confidence = buildTamConfidence(tamModel, keywordUniverse, keywordGaps, aiVisibility, topicalIntegrity);
  return tamModel;
}

function ensureDfSuccess(parsed, endpoint) {
  if (!parsed || typeof parsed !== "object") {
    throw new Error(`[${endpoint}] Empty DataForSEO response.`);
  }

  if (parsed.status_code !== 20000) {
    throw new Error(
      `[${endpoint}] DataForSEO status ${parsed.status_code}: ${parsed.status_message || "Unknown error"}`
    );
  }

  if (!Array.isArray(parsed.tasks) || parsed.tasks.length === 0) {
    throw new Error(`[${endpoint}] No tasks returned.`);
  }

  for (const task of parsed.tasks) {
    if (task?.status_code !== 20000) {
      throw new Error(
        `[${endpoint}] Task status ${task?.status_code}: ${task?.status_message || "Unknown task error"}`
      );
    }
  }
}

function summarizeDf(parsed) {
  const tasks = Array.isArray(parsed?.tasks) ? parsed.tasks : [];
  const firstTask = tasks[0] || null;
  const firstResult = firstTask?.result?.[0] || null;
  const itemCount = Array.isArray(firstResult?.items) ? firstResult.items.length : 0;
  return {
    status_code: parsed?.status_code,
    status_message: parsed?.status_message,
    time: parsed?.time,
    cost: parsed?.cost,
    tasks_count: parsed?.tasks_count,
    tasks_error: parsed?.tasks_error,
    first_task_status_code: firstTask?.status_code,
    first_task_status_message: firstTask?.status_message,
    first_result_items: itemCount,
  };
}

function pushDebug(debug, step, payload) {
  debug.steps.push({
    step,
    at: nowIso(),
    ...payload,
  });
}

function writeDebugFile(debugDir, slug, debug) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(debugDir, `${slug}-${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify(debug, null, 2));
  return file;
}

function dfRequest(endpoint, body, debug, stepName) {
  return new Promise((resolve, reject) => {
    const requestStartedAt = Date.now();
    const data = JSON.stringify(body);
    const auth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString("base64");

    const options = {
      hostname: "api.dataforseo.com",
      path: endpoint,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseText = "";
      res.on("data", (chunk) => (responseText += chunk));
      res.on("end", () => {
        let parsed;
        try {
          parsed = JSON.parse(responseText);
        } catch (error) {
          pushDebug(debug, stepName, {
            endpoint,
            durationMs: elapsedMs(requestStartedAt),
            httpStatus: res.statusCode,
            requestBody: body,
            parseError: error.message,
            rawResponsePreview: responseText.slice(0, 2000),
          });
          reject(new Error(`Failed to parse response: ${responseText.slice(0, 2000)}`));
          return;
        }

        const summary = summarizeDf(parsed);
        pushDebug(debug, stepName, {
          endpoint,
          durationMs: elapsedMs(requestStartedAt),
          httpStatus: res.statusCode,
          requestBody: body,
          summary,
          response: parsed,
        });

        try {
          ensureDfSuccess(parsed, endpoint);
          resolve(parsed);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      pushDebug(debug, stepName, {
        endpoint,
        durationMs: elapsedMs(requestStartedAt),
        requestBody: body,
        networkError: error.message,
      });
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

function psiRequest(url) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile`;
    https
      .get(apiUrl, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            if (res.statusCode !== 200) {
              reject(new Error(`PSI HTTP ${res.statusCode}: ${parsed?.error?.message || "Unknown error"}`));
              return;
            }
            resolve(parsed);
          } catch (e) {
            reject(new Error("Failed to parse PSI response"));
          }
        });
      })
      .on("error", reject);
  });
}

async function psiRequestWithRetry(url, retries = 3) {
  let attempt = 0;
  let lastError = null;
  while (attempt < retries) {
    try {
      return await psiRequest(url);
    } catch (error) {
      lastError = error;
      const isRateLimit = /429/.test(String(error.message));
      attempt += 1;
      if (!isRateLimit || attempt >= retries) break;
      await sleep(1200 * attempt);
    }
  }
  throw lastError;
}

async function runLighthouseAudit(url, debug) {
  const startedAt = Date.now();
  const args = [
    "--yes",
    "lighthouse",
    url,
    "--quiet",
    "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage",
    "--only-categories=performance,seo",
    "--output=json",
    "--output-path=stdout",
  ];

  const { stdout } = await execFileAsync("npx", args, {
    maxBuffer: 50 * 1024 * 1024,
    env: process.env,
  });

  const jsonStart = stdout.indexOf("{");
  const jsonEnd = stdout.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    throw new Error("Unable to parse Lighthouse JSON output.");
  }

  const parsed = JSON.parse(stdout.slice(jsonStart, jsonEnd + 1));
  const lighthouse = parsed?.lhr || parsed?.lighthouseResult || parsed;
  if (!lighthouse?.categories) {
    throw new Error("Lighthouse output missing categories.");
  }

  const output = {
    source: "lighthouse_cli",
    performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
    seoScore: Math.round((lighthouse.categories?.seo?.score || 0) * 100),
    lcp: lighthouse.audits?.["largest-contentful-paint"]?.displayValue || null,
    cls: lighthouse.audits?.["cumulative-layout-shift"]?.displayValue || null,
    tbt: lighthouse.audits?.["total-blocking-time"]?.displayValue || null,
  };

  pushDebug(debug, "lighthouse_audit", {
    provider: PERFORMANCE_PROVIDER,
    durationMs: elapsedMs(startedAt),
    url,
    summary: output,
  });

  return output;
}

function getStepResult(parsed) {
  return parsed?.tasks?.[0]?.result?.[0] || {};
}

async function runStep(name, fn, issues, timings, strict = STRICT_MODE) {
  const startedAt = Date.now();
  try {
    const value = await fn();
    timings[name] = elapsedMs(startedAt);
    return value;
  } catch (error) {
    timings[name] = elapsedMs(startedAt);
    const msg = `${name} failed: ${error.message}`;
    issues.push({ step: name, error: error.message });
    if (strict) {
      throw new Error(msg);
    }
    console.warn(`    [warn] ${msg}`);
    return null;
  }
}

async function preflight(debug, company) {
  console.log(`  [preflight] Verifying DataForSEO auth + baseline response...`);
  const responses = await dfRequestAcrossMarkets(
    "/v3/dataforseo_labs/google/domain_rank_overview/live",
    { target: company.domain },
    debug,
    "preflight_auth_check"
  );
  return {
    ok: true,
    checkedAt: nowIso(),
    markets: TARGET_MARKETS.map((m) => m.key),
    summaryByMarket: responses.map(({ market, parsed }) => ({
      market: market.key,
      summary: summarizeDf(parsed),
    })),
  };
}

async function discoverCompetitors(domain, debug) {
  const responses = await dfRequestAcrossMarkets(
    "/v3/dataforseo_labs/google/competitors_domain/live",
    { target: domain, limit: 20 },
    debug,
    "discover_competitors"
  );
  const merged = new Map();

  for (const { market, parsed } of responses) {
    const items = getStepResult(parsed).items || [];

    for (const item of items) {
      const domainName = normalizeDomain(item.domain);
      if (!domainName) continue;

      const intersections = Number(item.se_keywords ?? item.intersections ?? 0);
      const estimatedTraffic = Number(item.etv ?? item.metrics?.organic?.etv ?? 0);

      const existing = merged.get(domainName) || {
        domain: domainName,
        avgPosition: Number.POSITIVE_INFINITY,
        intersections: 0,
        estimatedTraffic: 0,
        source: "dataforseo_competitors_domain",
        markets: new Set(),
      };

      existing.avgPosition = Math.min(existing.avgPosition, Number(item.avg_position || Number.POSITIVE_INFINITY));
      existing.intersections += intersections;
      existing.estimatedTraffic += estimatedTraffic;
      existing.markets.add(market.key);

      merged.set(domainName, existing);
    }
  }

  return Array.from(merged.values()).map((c) => ({
    ...c,
    avgPosition: Number.isFinite(c.avgPosition) ? c.avgPosition : null,
    markets: Array.from(c.markets),
  }));
}

async function discoverCompetitorsByCategory(category, debug) {
  const categoryBase = category.split("/").pop().trim().toLowerCase();
  const query = `best ${categoryBase} software`;

  const responses = await dfRequestAcrossMarkets(
    "/v3/serp/google/organic/live/advanced",
    {
      keyword: query,
      depth: 30,
    },
    debug,
    "fallback_competitors_by_category_serp"
  );

  const unique = new Map();
  const domains = [];

  for (const { market, parsed } of responses) {
    const items = getStepResult(parsed).items || [];

    for (const item of items) {
      const domain = normalizeDomain(item.domain || item.url);
      if (!domain) continue;

      const row = unique.get(domain) || {
        domain,
        source: "dataforseo_serp_category_fallback",
        query,
        markets: new Set(),
      };
      row.markets.add(market.key);
      unique.set(domain, row);
    }
  }

  for (const row of unique.values()) {
    domains.push({
      ...row,
      markets: Array.from(row.markets),
    });
  }

  return domains;
}

async function getSerpDomainsForQuery(query, debug, stepName) {
  const responses = await dfRequestAcrossMarkets(
    "/v3/serp/google/organic/live/advanced",
    {
      keyword: query,
      depth: 30,
    },
    debug,
    stepName
  );

  const domains = [];

  for (const { market, parsed } of responses) {
    const items = getStepResult(parsed).items || [];

    for (const item of items) {
      if (item?.type && item.type !== "organic") continue;
      const domain = normalizeDomain(item.domain || item.url);
      if (!domain) continue;
      domains.push({
        domain,
        rank: item.rank_absolute || item.rank_group || null,
        title: item.title || null,
        market: market.key,
      });
    }
  }

  return domains;
}

async function discoverProductCompetitors(company, baselineCompetitors, debug, issues, timings) {
  const seedSet = new Set(
    (Array.isArray(company.competitorSeeds) ? company.competitorSeeds : [])
      .map((seed) => (typeof seed === "string" ? seed : seed.domain))
      .map((d) => normalizeDomain(d))
      .filter((d) => isValidCompetitorDomain(d, company.domain))
  );

  const baseSet = new Set(
    baselineCompetitors
      .map((c) => normalizeDomain(c.domain))
      .filter((d) => isValidCompetitorDomain(d, company.domain))
  );

  const categoryBase = company.category.split("/").pop().trim().toLowerCase();
  const queries = [
    `${company.name} alternatives`,
    `${company.name} vs`,
    `best ${categoryBase} software`,
    `${categoryBase} alternatives`,
    `${categoryBase} comparison`,
  ];

  const evidence = new Map();
  for (let i = 0; i < queries.length; i += 1) {
    const query = queries[i];
    const stepName = `product_competitor_query_${i + 1}`;
    const domains =
      (await runStep(
        stepName,
        () => getSerpDomainsForQuery(query, debug, stepName),
        issues,
        timings,
        false
      )) || [];

    for (const hit of domains) {
      const domain = normalizeDomain(hit.domain);
      if (!isValidCompetitorDomain(domain, company.domain)) continue;
      const row = evidence.get(domain) || {
        domain,
        queryHits: 0,
        queries: new Set(),
        markets: new Set(),
        bestRank: Number.POSITIVE_INFINITY,
      };
      row.queryHits += 1;
      row.queries.add(query);
      if (hit.market) row.markets.add(hit.market);
      if (typeof hit.rank === "number") row.bestRank = Math.min(row.bestRank, hit.rank);
      evidence.set(domain, row);
    }
  }

  const combined = [];
  for (const [domain, row] of evidence.entries()) {
    const isSeed = seedSet.has(domain);
    const inBase = baseSet.has(domain);
    const keep = isSeed || (row.queries.size >= 2 && !isLikelyPublisherDomain(domain));
    if (!keep) continue;

    let score = 0;
    if (isSeed) score += 100;
    if (inBase) score += 20;
    score += row.queries.size * 15;
    if (Number.isFinite(row.bestRank) && row.bestRank <= 10) score += 10;

    combined.push({
      domain,
      source: "product_competitor_discovery",
      evidence: {
        queryHits: row.queryHits,
        queryCount: row.queries.size,
        queries: Array.from(row.queries),
        markets: Array.from(row.markets),
        bestRank: Number.isFinite(row.bestRank) ? row.bestRank : null,
      },
      score,
    });
  }

  // Ensure seeds are always included.
  for (const domain of seedSet) {
    if (combined.some((c) => c.domain === domain)) continue;
    combined.push({
      domain,
      source: "seeded_competitor",
      evidence: {
        queryHits: 0,
        queryCount: 0,
        queries: [],
        bestRank: null,
      },
      score: 100,
    });
  }

  return combined.sort((a, b) => b.score - a.score);
}

async function getDomainMetrics(domain, debug, stepName = "domain_metrics") {
  const responses = await dfRequestAcrossMarkets(
    "/v3/dataforseo_labs/google/domain_rank_overview/live",
    { target: domain },
    debug,
    stepName
  );

  const markets = {};
  let organicTraffic = 0;
  let organicKeywords = 0;
  let paidTraffic = 0;
  let paidKeywords = 0;

  for (const { market, parsed } of responses) {
    const result = getStepResult(parsed);
    const data = result.items?.[0] || {};
    const organic = data.metrics?.organic || {};
    const paid = data.metrics?.paid || {};

    const entry = {
      organicTraffic: Number(organic.etv ?? data.etv ?? 0),
      organicKeywords: Number(organic.count ?? data.se_keywords ?? 0),
      paidTraffic: Number(paid.etv ?? data.paid_etv ?? 0),
      paidKeywords: Number(paid.count ?? data.paid_se_keywords ?? 0),
    };

    markets[market.key] = entry;
    organicTraffic += entry.organicTraffic;
    organicKeywords += entry.organicKeywords;
    paidTraffic += entry.paidTraffic;
    paidKeywords += entry.paidKeywords;
  }

  return {
    organicTraffic,
    organicKeywords,
    paidTraffic,
    paidKeywords,
    backlinks: null,
    referringDomains: null,
    markets,
    marketsIncluded: TARGET_MARKETS.map((m) => m.key),
  };
}

async function getBacklinkSummary(domain, debug, stepName = "backlink_summary") {
  const parsed = await dfRequest(
    "/v3/backlinks/summary/live",
    [
      {
        target: normalizeDomain(domain),
        include_subdomains: true,
        backlinks_status_type: "live",
      },
    ],
    debug,
    stepName
  );

  const row = getStepResult(parsed) || {};
  return {
    domain: normalizeDomain(domain),
    backlinks: Number(row.backlinks || 0),
    referringDomains: Number(row.referring_domains || 0),
    referringMainDomains: Number(row.referring_main_domains || 0),
    referringPages: Number(row.referring_pages || 0),
    brokenBacklinks: Number(row.broken_backlinks || 0),
    rank: Number(row.rank || 0),
    backlinksSpamScore: Number(row.backlinks_spam_score || 0),
    targetSpamScore: Number(row.info?.target_spam_score || 0),
    firstSeen: row.first_seen || null,
    source: "dataforseo_backlinks_summary_live",
    fetchedAt: nowIso(),
  };
}

async function getKeywordAnalysis(domain, debug, options = {}) {
  const {
    stepName = "keyword_analysis",
    limit = 200,
  } = options;

  const responses = await dfRequestAcrossMarkets(
    "/v3/dataforseo_labs/google/ranked_keywords/live",
    {
      target: domain,
      limit,
      order_by: ["keyword_data.keyword_info.search_volume,desc"],
    },
    debug,
    stepName
  );

  const merged = new Map();

  for (const { market, parsed } of responses) {
    const items = getStepResult(parsed).items || [];

    for (const item of items) {
      const keyword = item.keyword_data?.keyword;
      if (!keyword) continue;

      const volume = Number(item.keyword_data?.keyword_info?.search_volume || 0);
      const position = item.ranked_serp_element?.serp_item?.rank_absolute ?? null;
      const cpc = item.keyword_data?.keyword_info?.cpc ?? null;
      const competition = item.keyword_data?.keyword_info?.competition_level ?? null;
      const url = item.ranked_serp_element?.serp_item?.url;

      const existing = merged.get(keyword) || {
        keyword,
        volume: 0,
        position: null,
        cpc: null,
        competition: null,
        url: null,
        markets: new Set(),
      };

      existing.volume += volume;
      if (typeof position === "number") {
        existing.position =
          typeof existing.position === "number" ? Math.min(existing.position, position) : position;
      }
      if (typeof cpc === "number") {
        existing.cpc = typeof existing.cpc === "number" ? Math.max(existing.cpc, cpc) : cpc;
      }
      existing.competition = strongerCompetitionLevel(existing.competition, competition);
      if (!existing.url && url) existing.url = url;
      existing.markets.add(market.key);

      merged.set(keyword, existing);
    }
  }

  return Array.from(merged.values())
    .map((k) => ({
      ...k,
      markets: Array.from(k.markets),
    }))
    .sort((a, b) => (b.volume || 0) - (a.volume || 0))
    .slice(0, limit);
}

async function getKeywordGaps(targetDomain, competitorDomains, debug) {
  if (!competitorDomains.length) return [];

  const filtered = competitorDomains
    .map((d) => normalizeDomain(d))
    .filter((d) => isValidCompetitorDomain(d, targetDomain))
    .slice(0, 3);
  if (!filtered.length) return [];

  const request = {
    target1: normalizeDomain(targetDomain),
    limit: 100,
    order_by: ["keyword_data.keyword_info.search_volume,desc"],
  };

  filtered.forEach((domain, idx) => {
    request[`target${idx + 2}`] = domain;
  });

  const merged = new Map();
  for (const market of TARGET_MARKETS) {
    const marketRequest = withMarketTask(request, market);
    const marketRes = await dfRequest(
      "/v3/dataforseo_labs/google/domain_intersection/live",
      [marketRequest],
      debug,
      `keyword_gap_analysis_${market.key.toLowerCase()}`
    );
    const items = getStepResult(marketRes).items || [];

    for (const item of items) {
      const keyword = item.keyword_data?.keyword;
      if (!keyword) continue;

      const existing = merged.get(keyword) || {
        keyword,
        volume: 0,
        competition: null,
        markets: new Set(),
      };

      existing.volume += Number(item.keyword_data?.keyword_info?.search_volume || 0);
      existing.competition = strongerCompetitionLevel(
        existing.competition,
        item.keyword_data?.keyword_info?.competition_level
      );
      existing.markets.add(market.key);

      merged.set(keyword, existing);
    }
  }

  return Array.from(merged.values())
    .map((k) => ({
      keyword: k.keyword,
      volume: k.volume,
      competition: k.competition,
      markets: Array.from(k.markets),
    }))
    .sort((a, b) => (b.volume || 0) - (a.volume || 0))
    .slice(0, 100);
}

function semanticStepSuffix(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);
}

function mergeKeywordCandidate(map, row) {
  if (!row?.keyword) return;
  const existing = map.get(row.keyword) || {
    keyword: row.keyword,
    volume: 0,
    cpc: null,
    competition: null,
    markets: new Set(),
  };

  existing.volume += Number(row.volume || 0);
  if (typeof row.cpc === "number") {
    existing.cpc = typeof existing.cpc === "number" ? Math.max(existing.cpc, row.cpc) : row.cpc;
  }
  existing.competition = strongerCompetitionLevel(existing.competition, row.competition);
  for (const market of row.markets || []) {
    existing.markets.add(market);
  }

  map.set(row.keyword, existing);
}

async function collectSemanticKeywords(company, semanticProfile, rankedKeywords, keywordGaps, debug, issues, timings) {
  const seeds = pickSemanticSeeds(company, semanticProfile, rankedKeywords, keywordGaps);
  const semanticSets = [];

  const endpointConfigs = [
    {
      endpoint: "/v3/dataforseo_labs/google/related_keywords/live",
      source: "related_keywords",
      buildTask: (seed) => ({ keyword: seed, depth: 1, limit: SEMANTIC_KEYWORD_LIMIT_PER_ENDPOINT }),
    },
    {
      endpoint: "/v3/dataforseo_labs/google/keyword_suggestions/live",
      source: "keyword_suggestions",
      buildTask: (seed) => ({ keyword: seed, limit: SEMANTIC_KEYWORD_LIMIT_PER_ENDPOINT }),
    },
    {
      endpoint: "/v3/dataforseo_labs/google/keyword_ideas/live",
      source: "keyword_ideas",
      buildTask: (seed) => ({ keywords: [seed], limit: SEMANTIC_KEYWORD_LIMIT_PER_ENDPOINT }),
    },
  ];

  for (const seed of seeds) {
    for (const endpointConfig of endpointConfigs) {
      const merged = new Map();

      for (const market of TARGET_MARKETS) {
        const step = `semantic_${endpointConfig.source}_${semanticStepSuffix(seed)}_${market.key.toLowerCase()}`;
        const res = await runStep(
          step,
          () =>
            dfRequest(
              endpointConfig.endpoint,
              [withMarketTask(endpointConfig.buildTask(seed), market)],
              debug,
              step
            ),
          issues,
          timings,
          false
        );

        if (!res) continue;
        const items = getStepResult(res).items || [];
        for (const item of items) {
          const parsed = parseLabsKeywordItem(item, market.key);
          if (!parsed) continue;
          mergeKeywordCandidate(merged, parsed);
        }

        await sleep(120);
      }

      semanticSets.push({
        source: `${endpointConfig.source}:${seed}`,
        seed,
        endpoint: endpointConfig.source,
        keywords: Array.from(merged.values()).map((row) => ({
          keyword: row.keyword,
          volume: row.volume,
          cpc: row.cpc,
          competition: row.competition,
          markets: Array.from(row.markets),
        })),
      });

      await sleep(120);
    }
  }

  return {
    seeds,
    sets: semanticSets,
    totalCandidates: semanticSets.reduce((acc, set) => acc + (set.keywords?.length || 0), 0),
  };
}

async function buildFullKeywordUniverse(company, semanticProfile, rankedKeywords, keywordGaps, competitorMetrics, debug, issues, timings) {
  const competitorKeywordSets = [];
  const candidateCompetitors = (competitorMetrics || [])
    .filter((row) => row?.domain)
    .slice(0, COMPETITOR_KEYWORD_FETCH_LIMIT);

  for (const comp of candidateCompetitors) {
    const domain = normalizeDomain(comp.domain);
    if (!domain) continue;

    const rows =
      (await runStep(
        `competitor_keyword_universe_${domain}`,
        () =>
          getKeywordAnalysis(domain, debug, {
            stepName: `competitor_keyword_universe_${domain}`,
            limit: 150,
          }),
        issues,
        timings,
        false
      )) || [];

    competitorKeywordSets.push({
      domain,
      source: comp.source || "competitor",
      keywords: rows,
    });

    await sleep(300);
  }

  const semanticKeywordExpansion =
    (await runStep(
      "semantic_keyword_expansion",
      () => collectSemanticKeywords(company, semanticProfile, rankedKeywords, keywordGaps, debug, issues, timings),
      issues,
      timings,
      false
    )) || { seeds: [], sets: [], totalCandidates: 0 };

  pushDebug(debug, "semantic_keyword_expansion_summary", {
    seeds: semanticKeywordExpansion.seeds,
    setCount: semanticKeywordExpansion.sets.length,
    totalCandidates: semanticKeywordExpansion.totalCandidates,
  });

  return buildKeywordUniverse(
    company,
    semanticProfile,
    rankedKeywords,
    keywordGaps,
    competitorKeywordSets,
    semanticKeywordExpansion.sets
  );
}

function promptStepName(prefix, prompt) {
  return `${prefix}_${prompt.slice(0, 32).replace(/\s+/g, "_").toLowerCase()}`;
}

function isClientMentionedInText(company, text) {
  const normalized = String(text || "").toLowerCase();
  return (
    normalized.includes(company.name.toLowerCase()) ||
    normalized.includes(normalizeDomain(company.domain))
  );
}

async function runChatGptPrompt(company, semanticProfile, prompt, debug, issues) {
  return runLlmScraperPrompt(company, semanticProfile, prompt, "chatgpt", AI_LLM_ENDPOINTS.chatgpt, debug, issues);
}

async function runLlmScraperPrompt(company, semanticProfile, prompt, platform, endpoint, debug, issues) {
  const platformResults = [];

  for (const market of TARGET_MARKETS) {
    const step = `${promptStepName(`ai_prompt_${platform}`, prompt)}_${market.key.toLowerCase()}`;
    const promptRes = await runStep(
      step,
      () =>
        dfRequest(
          endpoint,
          [
            {
              keyword: prompt,
              location_name: market.locationName,
              language_name: market.languageName,
              tag: `${company.slug}-research-${platform}-${market.key.toLowerCase()}`,
            },
          ],
          debug,
          step
        ),
      issues,
      {},
      false
    );

    if (!promptRes) {
      platformResults.push({
        query: prompt,
        platform,
        market: market.key,
        clientMentioned: false,
        responsePreview: null,
        error: "no_response",
      });
      continue;
    }

    const response = getStepResult(promptRes);
    const serialized = JSON.stringify(response || {});
    const citations = Array.isArray(response?.citations) ? response.citations.length : 0;
    const clientMentioned = isClientMentionedInText(company, serialized);
    const quality = assessPromptMentionQuality(company, semanticProfile, prompt, serialized, clientMentioned);

    platformResults.push({
      query: prompt,
      platform,
      market: market.key,
      clientMentioned,
      responsePreview: serialized.slice(0, 1200),
      citations,
      model: response?.model || null,
      mentionQuality: quality.mentionQuality,
      categoryAligned: quality.categoryAligned,
      ambiguousInterpretation: quality.ambiguousInterpretation,
    });

    await sleep(250);
  }

  return platformResults;
}

function extractAiOverviewItems(items) {
  return (items || []).filter((item) => {
    const type = String(item?.type || "").toLowerCase();
    return type.includes("ai_overview") || type === "ai_mode";
  });
}

async function runGoogleAiOverviewPrompt(company, semanticProfile, prompt, debug, issues) {
  const platformResults = [];

  for (const market of TARGET_MARKETS) {
    const step = `${promptStepName("ai_prompt_google_aio", prompt)}_${market.key.toLowerCase()}`;
    const res = await runStep(
      step,
      () =>
        dfRequest(
          "/v3/serp/google/organic/live/advanced",
          [
            {
              keyword: prompt,
              location_code: market.locationCode,
              language_code: market.languageCode,
              depth: 20,
            },
          ],
          debug,
          step
        ),
      issues,
      {},
      false
    );

    if (!res) {
      platformResults.push({
        query: prompt,
        platform: "google_ai_overview",
        market: market.key,
        clientMentioned: false,
        responsePreview: null,
        error: "no_response",
      });
      continue;
    }

    const items = getStepResult(res).items || [];
    const aiOverviewItems = extractAiOverviewItems(items);
    const preview = JSON.stringify(aiOverviewItems.length ? aiOverviewItems : items.slice(0, 3));
    const clientMentioned = isClientMentionedInText(company, preview);
    const quality = assessPromptMentionQuality(company, semanticProfile, prompt, preview, clientMentioned);

    platformResults.push({
      query: prompt,
      platform: "google_ai_overview",
      market: market.key,
      clientMentioned,
      responsePreview: preview.slice(0, 1200),
      aiOverviewDetected: aiOverviewItems.length > 0,
      mentionQuality: quality.mentionQuality,
      categoryAligned: quality.categoryAligned,
      ambiguousInterpretation: quality.ambiguousInterpretation,
    });

    await sleep(250);
  }

  return platformResults;
}

function assessPromptMentionQuality(company, semanticProfile, query, serializedResponse, clientMentioned) {
  const text = normalizePhrase(serializedResponse);
  const queryText = normalizePhrase(query);
  const brandLabel = normalizePhrase(company?.name || "");
  const queryHasBrand = brandLabel ? queryText.includes(brandLabel) : false;
  const categoryAligned = (semanticProfile?.signalTokens || []).some((token) => text.includes(token));

  if (!clientMentioned) {
    return {
      mentionQuality: "absent",
      categoryAligned,
      ambiguousInterpretation: false,
    };
  }

  if (queryHasBrand && !categoryAligned) {
    return {
      mentionQuality: "ambiguous",
      categoryAligned,
      ambiguousInterpretation: true,
    };
  }

  if (categoryAligned) {
    return {
      mentionQuality: queryHasBrand ? "validated_brand" : "validated_category",
      categoryAligned,
      ambiguousInterpretation: false,
    };
  }

  return {
    mentionQuality: "brand_only",
    categoryAligned,
    ambiguousInterpretation: false,
  };
}

function summarizePlatformVisibility(promptResults) {
  const summary = {};

  for (const row of promptResults) {
    const key = row.platform || "unknown";
    if (!summary[key]) {
      summary[key] = {
        total: 0,
        mentioned: 0,
        validatedMentions: 0,
        ambiguousMentions: 0,
        mentionRate: 0,
        validatedMentionRate: 0,
        ambiguityRate: 0,
        markets: {},
      };
    }

    summary[key].total += 1;
    if (row.clientMentioned) summary[key].mentioned += 1;
    if (["validated_brand", "validated_category"].includes(row.mentionQuality)) {
      summary[key].validatedMentions += 1;
    }
    if (row.ambiguousInterpretation) summary[key].ambiguousMentions += 1;

    const market = row.market || "global";
    if (!summary[key].markets[market]) {
      summary[key].markets[market] = {
        total: 0,
        mentioned: 0,
        validatedMentions: 0,
        ambiguousMentions: 0,
        mentionRate: 0,
        validatedMentionRate: 0,
        ambiguityRate: 0,
      };
    }
    summary[key].markets[market].total += 1;
    if (row.clientMentioned) summary[key].markets[market].mentioned += 1;
    if (["validated_brand", "validated_category"].includes(row.mentionQuality)) {
      summary[key].markets[market].validatedMentions += 1;
    }
    if (row.ambiguousInterpretation) summary[key].markets[market].ambiguousMentions += 1;
  }

  for (const key of Object.keys(summary)) {
    summary[key].mentionRate = roundNumber(safeRatio(summary[key].mentioned, summary[key].total) * 100, 2);
    summary[key].validatedMentionRate = roundNumber(
      safeRatio(summary[key].validatedMentions, summary[key].total) * 100,
      2
    );
    summary[key].ambiguityRate = roundNumber(safeRatio(summary[key].ambiguousMentions, summary[key].total) * 100, 2);
    for (const marketKey of Object.keys(summary[key].markets)) {
      const marketRow = summary[key].markets[marketKey];
      marketRow.mentionRate = roundNumber(safeRatio(marketRow.mentioned, marketRow.total) * 100, 2);
      marketRow.validatedMentionRate = roundNumber(
        safeRatio(marketRow.validatedMentions, marketRow.total) * 100,
        2
      );
      marketRow.ambiguityRate = roundNumber(safeRatio(marketRow.ambiguousMentions, marketRow.total) * 100, 2);
    }
  }

  return summary;
}

function buildPromptSet(company, semanticProfile) {
  const categoryBase = semanticProfile?.promptCategoryLabel || company.category.split("/").pop().trim().toLowerCase();
  const categoryStem = categoryBase.replace(/software|platform|solution/g, "").trim() || categoryBase;
  const brandPromptLabel = semanticProfile?.promptBrandLabel || normalizePhrase(company.name);
  return uniqueValues([
    `best ${categoryBase}`,
    `best ${categoryBase} tools`,
    `${brandPromptLabel} alternatives`,
    `${brandPromptLabel} vs competitors`,
    `best ${categoryBase} for startups`,
    `best ${categoryBase} for enterprise`,
    `how to choose a ${categoryBase}`,
    `${categoryBase} comparison`,
    `${categoryStem} pricing`,
    `${categoryStem} workflow template`,
    `${categoryStem} migration guide`,
    `${categoryStem} implementation playbook`,
  ]).slice(0, Math.max(4, AI_PROMPT_LIMIT));
}

async function probeLlmPlatformAvailability(company, semanticProfile, platform, endpoint, debug, issues) {
  if (!AI_VISIBILITY_PLATFORMS[platform]) {
    return {
      configured: false,
      status: "disabled",
      endpoint,
      reason: "Disabled by environment flag.",
    };
  }

  const market = TARGET_MARKETS[0] || MARKET_CONFIG.US;
  const step = `ai_platform_probe_${platform}`;
  try {
    const probePrompt = buildPromptSet(company, semanticProfile)[0] || `${company.name} ${semanticProfile?.brandDisambiguation || ""}`.trim();
    const parsed = await dfRequest(
      endpoint,
      [
        {
          keyword: probePrompt,
          location_name: market.locationName,
          language_name: market.languageName,
          tag: `${company.slug}-probe-${platform}`,
        },
      ],
      debug,
      step
    );

    const result = getStepResult(parsed) || {};
    return {
      configured: true,
      status: "available",
      endpoint,
      sampleFields: Object.keys(result).slice(0, 10),
    };
  } catch (error) {
    issues.push({ step, error: error.message });
    pushDebug(debug, step, { error: error.message, endpoint });
    return {
      configured: true,
      status: "unavailable",
      endpoint,
      reason: error.message,
    };
  }
}

function buildCompetitorPromptEvidence(competitors, promptResults) {
  const rows = new Map();

  for (const comp of competitors || []) {
    const domain = normalizeDomain(comp?.domain);
    if (!domain) continue;
    rows.set(domain, {
      domain,
      name: comp?.name || null,
      queryHits: 0,
      queryCount: 0,
      matchedQueries: new Set(),
      markets: new Set(),
      platforms: {},
      sampleEvidence: [],
    });
  }

  for (const row of promptResults || []) {
    if (row.ambiguousInterpretation) continue;
    const text = String(row?.responsePreview || "").toLowerCase();
    if (!text) continue;

    for (const entry of rows.values()) {
      const nameToken = String(entry.name || "").toLowerCase().trim();
      const domainMentioned = text.includes(entry.domain);
      const nameMentioned = nameToken.length >= 3 ? text.includes(nameToken) : false;
      if (!domainMentioned && !nameMentioned) continue;

      entry.queryHits += 1;
      entry.matchedQueries.add(row.query);
      entry.markets.add(row.market || "global");
      const platform = row.platform || "unknown";
      entry.platforms[platform] = (entry.platforms[platform] || 0) + 1;

      if (entry.sampleEvidence.length < 4) {
        entry.sampleEvidence.push({
          query: row.query,
          platform,
          market: row.market || null,
        });
      }
    }
  }

  return Array.from(rows.values())
    .map((row) => ({
      domain: row.domain,
      name: row.name,
      queryHits: row.queryHits,
      queryCount: row.matchedQueries.size,
      matchedQueries: Array.from(row.matchedQueries),
      markets: Array.from(row.markets),
      platformHits: row.platforms,
      sampleEvidence: row.sampleEvidence,
    }))
    .sort((a, b) => b.queryHits - a.queryHits);
}

async function checkAIVisibility(company, semanticProfile, competitors, debug, issues) {
  const chatgptAvailability = await probeLlmPlatformAvailability(
    company,
    semanticProfile,
    "chatgpt",
    AI_LLM_ENDPOINTS.chatgpt,
    debug,
    issues
  );
  const geminiAvailability = await probeLlmPlatformAvailability(
    company,
    semanticProfile,
    "gemini",
    AI_LLM_ENDPOINTS.gemini,
    debug,
    issues
  );
  const perplexityAvailability = await probeLlmPlatformAvailability(
    company,
    semanticProfile,
    "perplexity",
    AI_LLM_ENDPOINTS.perplexity,
    debug,
    issues
  );

  const results = {
    mentionsByDomain: [],
    promptResults: [],
    platformSummary: {},
    competitorEvidence: [],
    platformAvailability: {
      chatgpt: chatgptAvailability,
      gemini: geminiAvailability,
      perplexity: perplexityAvailability,
      google_ai_overview: {
        configured: AI_VISIBILITY_PLATFORMS.googleAiOverview,
        status: AI_VISIBILITY_PLATFORMS.googleAiOverview ? "available_via_serp" : "disabled",
        endpoint: "/v3/serp/google/organic/live/advanced",
      },
    },
    platformAvailabilityFlags: {
      chatgpt: chatgptAvailability.status === "available",
      gemini: geminiAvailability.status === "available",
      perplexity: perplexityAvailability.status === "available",
      google_ai_overview: AI_VISIBILITY_PLATFORMS.googleAiOverview,
    },
  };

  const mentionRes = await runStep(
    "ai_mentions",
    () =>
      dfRequest(
        "/v3/ai_optimization/llm_mentions/live",
        [
          {
            search_filter: { domain: company.domain },
            location_code: 2840,
            language_code: "en",
            limit: 50,
          },
        ],
        debug,
        "ai_mentions"
      ),
    issues,
    {},
    false
  );

  if (mentionRes) {
    results.mentionsByDomain = getStepResult(mentionRes).items || [];
  }

  const prompts = buildPromptSet(company, semanticProfile);
  for (const prompt of prompts) {
    if (chatgptAvailability.status === "available") {
      const chatGptRows = await runChatGptPrompt(company, semanticProfile, prompt, debug, issues);
      results.promptResults.push(...chatGptRows);
    }

    if (geminiAvailability.status === "available") {
      const geminiRows = await runLlmScraperPrompt(
        company,
        semanticProfile,
        prompt,
        "gemini",
        AI_LLM_ENDPOINTS.gemini,
        debug,
        issues
      );
      results.promptResults.push(...geminiRows);
    }

    if (perplexityAvailability.status === "available") {
      const perplexityRows = await runLlmScraperPrompt(
        company,
        semanticProfile,
        prompt,
        "perplexity",
        AI_LLM_ENDPOINTS.perplexity,
        debug,
        issues
      );
      results.promptResults.push(...perplexityRows);
    }

    if (AI_VISIBILITY_PLATFORMS.googleAiOverview) {
      const googleRows = await runGoogleAiOverviewPrompt(company, semanticProfile, prompt, debug, issues);
      results.promptResults.push(...googleRows);
    }

    await sleep(450);
  }

  results.platformSummary = summarizePlatformVisibility(results.promptResults);
  results.competitorEvidence = buildCompetitorPromptEvidence(competitors, results.promptResults);

  return results;
}

async function auditWebsite(domain, debug) {
  const audit = { onPage: null, pageSpeed: null };

  const onPageRes = await dfRequest(
    "/v3/on_page/instant_pages",
    [{ url: `https://${domain}`, load_resources: true, enable_javascript: true }],
    debug,
    "onpage_audit"
  );

  const items = getStepResult(onPageRes).items || [];
  if (items.length > 0) {
    const page = items[0];
    audit.onPage = {
      title: page.meta?.title,
      description: page.meta?.description,
      h1: page.meta?.htags?.h1,
      wordCount: page.meta?.content?.plain_text_word_count,
      internalLinks: page.meta?.internal_links_count,
      externalLinks: page.meta?.external_links_count,
      schemaTypes: page.meta?.schema_types || [],
      statusCode: page.status_code,
      pageTiming: {
        timeToInteractiveMs: page.page_timing?.time_to_interactive ?? null,
        domCompleteMs: page.page_timing?.dom_complete ?? null,
        largestContentfulPaintMs: page.page_timing?.largest_contentful_paint ?? null,
      },
    };
  }

  try {
    if (PERFORMANCE_PROVIDER === "lighthouse") {
      audit.pageSpeed = await runLighthouseAudit(`https://${domain}`, debug);
    } else {
      const psi = await psiRequestWithRetry(`https://${domain}`);
      const lighthouse = psi?.lighthouseResult;
      if (lighthouse) {
        audit.pageSpeed = {
          source: "pagespeed_api",
          performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
          seoScore: Math.round((lighthouse.categories?.seo?.score || 0) * 100),
          lcp: lighthouse.audits?.["largest-contentful-paint"]?.displayValue,
          cls: lighthouse.audits?.["cumulative-layout-shift"]?.displayValue,
          tbt: lighthouse.audits?.["total-blocking-time"]?.displayValue,
        };
      }
    }
  } catch (error) {
    if (PERFORMANCE_PROVIDER === "lighthouse" && ALLOW_PSI_FALLBACK) {
      try {
        const psi = await psiRequestWithRetry(`https://${domain}`);
        const lighthouse = psi?.lighthouseResult;
        if (lighthouse) {
          audit.pageSpeed = {
            source: "pagespeed_api_fallback",
            performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
            seoScore: Math.round((lighthouse.categories?.seo?.score || 0) * 100),
            lcp: lighthouse.audits?.["largest-contentful-paint"]?.displayValue,
            cls: lighthouse.audits?.["cumulative-layout-shift"]?.displayValue,
            tbt: lighthouse.audits?.["total-blocking-time"]?.displayValue,
          };
        }
      } catch (fallbackError) {
        pushDebug(debug, "performance_fallback_error", {
          domain,
          provider: PERFORMANCE_PROVIDER,
          error: fallbackError.message,
        });
      }
    }

    if (!audit.pageSpeed && audit.onPage?.pageTiming) {
      audit.pageSpeed = {
        source: "dataforseo_onpage_timing",
        timeToInteractiveMs: audit.onPage.pageTiming.timeToInteractiveMs,
        domCompleteMs: audit.onPage.pageTiming.domCompleteMs,
        largestContentfulPaintMs: audit.onPage.pageTiming.largestContentfulPaintMs,
        note: "Derived from DataForSEO on_page timing metrics.",
      };
    }

    if (!audit.pageSpeed) {
      pushDebug(debug, "performance_fallback", {
        at: nowIso(),
        domain,
        provider: PERFORMANCE_PROVIDER,
        reason: error.message,
      });

      audit.pageSpeed = {
        source: "fallback_no_perf",
        error: error.message,
        statusCode: audit.onPage?.statusCode ?? null,
        note: "Performance provider unavailable. Configure Lighthouse runtime or enable ALLOW_PSI_FALLBACK=true.",
      };
    }
  }

  return audit;
}

function mergeAndDedupeCompetitors(competitors, companyDomain, includePublishers = false) {
  const map = new Map();
  for (const comp of competitors) {
    const domain = normalizeDomain(comp.domain);
    if (!domain) continue;
    if (!isValidCompetitorDomain(domain, companyDomain)) continue;
    if (!includePublishers && isLikelyPublisherDomain(domain)) continue;
    const existing = map.get(domain);
    map.set(domain, {
      ...(existing || {}),
      ...comp,
      domain,
      name: comp?.name || existing?.name || null,
      source: existing?.source || comp?.source || null,
      evidence: {
        ...(existing?.evidence || {}),
        ...(comp?.evidence || {}),
      },
    });
  }
  return Array.from(map.values());
}

function applySeededCompetitors(company, existingCompetitors) {
  const seeds = Array.isArray(company.competitorSeeds) ? company.competitorSeeds : [];
  const mapped = seeds
    .map((seed) => {
      if (typeof seed === "string") {
        return { domain: seed, source: "seeded_competitor" };
      }
      return {
        domain: seed.domain,
        name: seed.name,
        source: seed.source || "seeded_competitor",
      };
    })
    .filter((seed) => seed.domain);

  return mergeAndDedupeCompetitors([...existingCompetitors, ...mapped], company.domain, true);
}

function evaluateQualityGate(research) {
  const successfulPrompts = research.aiVisibility.promptResults.filter(
    (r) => !r.error && typeof r.responsePreview === "string" && r.responsePreview.length > 0
  ).length;
  const validatedPromptMentions = research.aiVisibility.promptResults.filter((r) =>
    ["validated_brand", "validated_category"].includes(r.mentionQuality)
  ).length;
  const minMofuKeywords = requiredMofuKeywordCount(research);

  const metrics = {
    competitors: research.competitors.length,
    keywords: research.rankedKeywords.length,
    keywordUniverse: research.keywordUniverse?.length || 0,
    mofuKeywords: research.keywordUniverse?.filter((row) => row.intent === "MOFU").length || 0,
    prompts: successfulPrompts,
    validatedPromptMentions,
    aiPlatformsWithSamples: Object.values(research.aiVisibility?.platformSummary || {}).filter(
      (row) => Number(row?.total || 0) > 0
    ).length,
    hasOnPage: Boolean(research.websiteAudit?.onPage),
    hasTam: Number(research.tamModel?.totals?.totalAddressableSearchDemand || 0) > 0,
    hasPageSpeed:
      Boolean(research.websiteAudit?.pageSpeed) &&
      !String(research.websiteAudit?.pageSpeed?.source || "").startsWith("fallback"),
    topicalIntegrityPassed: Boolean(research.topicalIntegrity?.passed),
  };

  const failures = [];
  if (metrics.competitors < QUALITY_THRESHOLDS.competitors) {
    failures.push(`competitors ${metrics.competitors} < ${QUALITY_THRESHOLDS.competitors}`);
  }
  if (metrics.keywords < QUALITY_THRESHOLDS.keywords) {
    failures.push(`keywords ${metrics.keywords} < ${QUALITY_THRESHOLDS.keywords}`);
  }
  if (metrics.prompts < QUALITY_THRESHOLDS.prompts) {
    failures.push(`prompts ${metrics.prompts} < ${QUALITY_THRESHOLDS.prompts}`);
  }
  if (metrics.mofuKeywords < minMofuKeywords) {
    failures.push(`mofu keywords ${metrics.mofuKeywords} < ${minMofuKeywords}`);
  }
  if (!metrics.topicalIntegrityPassed) {
    failures.push(`topical integrity failed: ${(research.topicalIntegrity?.failures || []).join("; ")}`);
  }
  if (!metrics.hasTam) failures.push("tam model missing");
  if (!metrics.hasOnPage) failures.push("onPage audit missing");
  if (!metrics.hasPageSpeed) failures.push("pageSpeed audit missing");

  return {
    mode: RESEARCH_MODE,
    thresholds: QUALITY_THRESHOLDS,
    derivedThresholds: {
      minMofuKeywords,
    },
    metrics,
    passed: failures.length === 0,
    failures,
  };
}

function computePayloadConfidence(research, issues) {
  let score = 0;
  score += Math.min(25, research.competitors.length * 5);
  score += Math.min(25, Math.floor(research.rankedKeywords.length / 2));
  score += Math.min(10, Math.floor((research.keywordUniverse?.length || 0) / 40));
  score += Math.min(20, research.aiVisibility.promptResults.length * 2);
  if (research.tamModel?.totals?.totalAddressableSearchDemand) score += 10;
  if (research.websiteAudit?.onPage) score += 15;
  if (research.websiteAudit?.pageSpeed) score += 15;
  if (research.topicalIntegrity?.passed) score += 10;
  score -= Number(research.topicalIntegrity?.metrics?.excludedTopKeywordCount || 0) * 10;
  score -= Math.round(Number(research.topicalIntegrity?.metrics?.lowQualitySemanticDemandSharePercent || 0) / 5);
  score -= Number(research.topicalIntegrity?.metrics?.ambiguousPromptMentions || 0) * 3;
  score -= issues.length * 5;
  score = Math.max(0, Math.min(100, score));

  const level = score >= 80 ? "high" : score >= 50 ? "medium" : "low";
  return { score, level };
}

function requiredMofuKeywordCount(research) {
  const universeSize = Number(research?.keywordUniverse?.length || 0);
  if (universeSize >= 200) return 8;
  if (universeSize >= 120) return 5;
  if (universeSize >= 60) return 3;
  if (universeSize >= 20) return 2;
  return 1;
}

async function runResearch(company) {
  const startedAt = Date.now();
  console.log(`\n========================================`);
  console.log(`Researching: ${company.name} (${company.domain})`);
  console.log(`Mode: ${RESEARCH_MODE.toUpperCase()}`);
  console.log(`========================================\n`);

  const outputDir = path.join(__dirname, "..", "..", "data", "research");
  const debugDir = path.join(outputDir, "_debug");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });

  const outputPath = path.join(outputDir, `${company.slug}.json`);

  const debug = {
    slug: company.slug,
    startedAt: nowIso(),
    mode: RESEARCH_MODE,
    company,
    steps: [],
    issues: [],
    timingsMs: {},
    preflight: null,
  };

  const issues = [];
  const timings = {};
  const semanticProfile = buildCompanySemanticProfile(company);

  try {
    debug.preflight = await runStep("preflight", () => preflight(debug, company), issues, timings, true);
    pushDebug(debug, "semantic_profile", semanticProfile);

    console.log(`  [1/7] Discovering competitors for ${company.domain}...`);
    let competitors =
      (await runStep(
        "discover_competitors",
        () => discoverCompetitors(company.domain, debug),
        issues,
        timings,
        STRICT_MODE
      )) || [];

    competitors =
      (await runStep(
        "discover_product_competitors",
        () => discoverProductCompetitors(company, competitors, debug, issues, timings),
        issues,
        timings,
        false
      )) || competitors;

    competitors = applySeededCompetitors(company, competitors);

    if (competitors.length < QUALITY_THRESHOLDS.competitors) {
      const categoryFallback =
        (await runStep(
          "fallback_competitors_by_category",
          () => discoverCompetitorsByCategory(company.category, debug),
          issues,
          timings,
          false
        )) || [];
      competitors = mergeAndDedupeCompetitors(
        [...competitors, ...categoryFallback],
        company.domain,
        false
      );
    }

    console.log(`  [2/7] Getting domain metrics for ${company.domain}...`);
    const targetMetrics = await runStep(
      "target_domain_metrics",
      () => getDomainMetrics(company.domain, debug, "target_domain_metrics"),
      issues,
      timings,
      STRICT_MODE
    );

    const targetBacklinks = await runStep(
      "target_backlink_summary",
      () => getBacklinkSummary(company.domain, debug, "target_backlink_summary"),
      issues,
      timings,
      false
    );

    const mergedTargetMetrics = {
      ...(targetMetrics || {}),
      backlinks: targetBacklinks?.backlinks ?? targetMetrics?.backlinks ?? 0,
      referringDomains: targetBacklinks?.referringDomains ?? targetMetrics?.referringDomains ?? 0,
      backlinkMetrics: targetBacklinks || null,
    };

    const competitorMetricsRaw = [];
    for (const comp of competitors.slice(0, 8)) {
      const normalizedCompDomain = normalizeDomain(comp.domain);
      const metrics = await runStep(
        `competitor_metrics_${normalizedCompDomain}`,
        () => getDomainMetrics(comp.domain, debug, `competitor_metrics_${normalizedCompDomain}`),
        issues,
        timings,
        false
      );

      const backlinkSummary = await runStep(
        `competitor_backlinks_${normalizedCompDomain}`,
        () => getBacklinkSummary(comp.domain, debug, `competitor_backlinks_${normalizedCompDomain}`),
        issues,
        timings,
        false
      );

      competitorMetricsRaw.push({
        ...comp,
        metrics: {
          ...(metrics || {}),
          backlinks: backlinkSummary?.backlinks ?? metrics?.backlinks ?? null,
          referringDomains: backlinkSummary?.referringDomains ?? metrics?.referringDomains ?? null,
          backlinkMetrics: backlinkSummary || null,
        },
      });
      await sleep(400);
    }

    const competitorMetrics = competitorMetricsRaw.filter((comp) => {
      if (comp.source === "seeded_competitor") return true;
      if (isLikelyPublisherDomain(comp.domain)) return false;
      const queryCount = comp.evidence?.queryCount || 0;
      const organicKeywords = comp.metrics?.organicKeywords || 0;
      return queryCount >= 2 && organicKeywords >= 500;
    });

    console.log(`  [3/7] Analyzing keywords for ${company.domain}...`);
    const rankedKeywords =
      (await runStep(
        "keyword_analysis",
        () => getKeywordAnalysis(company.domain, debug),
        issues,
        timings,
        STRICT_MODE
      )) || [];

    const competitorDomains = competitorMetrics.map((c) => normalizeDomain(c.domain)).filter(Boolean);
    const keywordGaps =
      (await runStep(
        "keyword_gap_analysis",
        () => getKeywordGaps(company.domain, competitorDomains, debug),
        issues,
        timings,
        false
      )) || [];

    console.log(`  [4/7] Building full keyword universe for ${company.name}...`);
    const keywordUniverse =
      (await runStep(
        "keyword_universe",
        () =>
          buildFullKeywordUniverse(
            company,
            semanticProfile,
            rankedKeywords,
            keywordGaps,
            competitorMetrics,
            debug,
            issues,
            timings
          ),
        issues,
        timings,
        STRICT_MODE
      )) || rankedKeywords;

    console.log(`  [5/7] Checking AI visibility for ${company.name}...`);
    const aiVisibility =
      (await runStep(
        "ai_visibility",
        () => checkAIVisibility(company, semanticProfile, competitorMetrics, debug, issues),
        issues,
        timings,
        STRICT_MODE
      )) || { mentionsByDomain: [], promptResults: [], platformSummary: {}, competitorEvidence: [], platformAvailability: {} };

    const competitorPromptEvidenceMap = new Map(
      (aiVisibility?.competitorEvidence || []).map((row) => [normalizeDomain(row.domain), row])
    );

    const enrichedCompetitors = competitorMetrics.map((comp) => {
      const domain = normalizeDomain(comp.domain);
      const promptEvidence = competitorPromptEvidenceMap.get(domain) || null;
      return {
        ...comp,
        evidence: {
          ...(comp.evidence || {}),
          promptEvidence,
        },
      };
    });

    const topicalIntegrity = buildTopicalIntegrityReport(company, semanticProfile, keywordUniverse, aiVisibility);

    console.log(`  [6/7] Modeling TAM and phased upside for ${company.name}...`);
    const tamModel =
      (await runStep(
        "tam_model",
        () => buildTamModel(company, semanticProfile, keywordUniverse, keywordGaps, aiVisibility, topicalIntegrity),
        issues,
        timings,
        STRICT_MODE
      )) || null;

    console.log(`  [7/7] Auditing website for ${company.domain}...`);
    const websiteAudit =
      (await runStep(
        "website_audit",
        () => auditWebsite(company.domain, debug),
        issues,
        timings,
        STRICT_MODE
      )) || { onPage: null, pageSpeed: null };

    const research = {
      slug: company.slug,
      company: {
        name: company.name,
        domain: company.domain,
        category: company.category,
        industry: company.industry,
      },
      seoMetrics: mergedTargetMetrics || {
        organicTraffic: 0,
        organicKeywords: 0,
        paidTraffic: 0,
        paidKeywords: 0,
        backlinks: 0,
        referringDomains: 0,
      },
      rankedKeywords,
      keywordUniverse,
      keywordGaps,
      competitors: enrichedCompetitors,
      tamModel,
      aiVisibility,
      topicalIntegrity,
      websiteAudit,
      qualityGate: null,
      meta: {
        generatedAt: nowIso(),
        researchMode: RESEARCH_MODE,
        semanticProfile,
        targetMarkets: TARGET_MARKETS.map((m) => ({ key: m.key, locationCode: m.locationCode })),
        timingsMs: timings,
        issues,
        totalDurationMs: elapsedMs(startedAt),
      },
    };

    const qualityGate = evaluateQualityGate(research);
    const confidence = computePayloadConfidence(research, issues);
    research.qualityGate = qualityGate;
    research.meta.payloadConfidence = confidence;

    if (!qualityGate.passed && STRICT_MODE) {
      throw new Error(`Quality gate failed: ${qualityGate.failures.join("; ")}`);
    }

    fs.writeFileSync(outputPath, JSON.stringify(research, null, 2));
    console.log(`\n  Research saved to ${outputPath}`);
    console.log(`  Payload confidence: ${confidence.level.toUpperCase()} (${confidence.score}/100)`);
    return research;
  } catch (error) {
    issues.push({ step: "runResearch", error: error.message });
    throw error;
  } finally {
    debug.issues = issues;
    debug.timingsMs = timings;
    debug.finishedAt = nowIso();
    debug.totalDurationMs = elapsedMs(startedAt);
    const debugFile = writeDebugFile(debugDir, company.slug, debug);
    console.log(`  Debug log: ${debugFile}`);
  }
}

async function main() {
  if (!DATAFORSEO_LOGIN || !DATAFORSEO_PASSWORD) {
    console.error("Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD environment variables.");
    console.error("Set them in .env or export them before running this script.");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const clientsPath = path.join(__dirname, "..", "..", "data", "dream-clients.json");
  const clients = JSON.parse(fs.readFileSync(clientsPath, "utf-8"));

  if (args.includes("--company")) {
    const companyName = args[args.indexOf("--company") + 1];
    const company = clients.find(
      (c) => c.name.toLowerCase() === companyName.toLowerCase() || c.slug === companyName.toLowerCase()
    );
    if (!company) {
      console.error(`Company "${companyName}" not found in dream-clients.json`);
      process.exit(1);
    }
    await runResearch(company);
  } else if (args.includes("--batch")) {
    for (const company of clients) {
      try {
        await runResearch(company);
      } catch (e) {
        console.error(`  FAILED: ${company.name} — ${e.message}`);
      }
      await sleep(2000);
    }
  } else {
    console.log("Usage:");
    console.log('  node scripts/research-pipeline/index.cjs --company "Linear"');
    console.log("  node scripts/research-pipeline/index.cjs --batch");
    console.log("\nEnvironment:");
    console.log("  RESEARCH_MODE=strict|fast (default: strict)");
    console.log("  MIN_COMPETITORS, MIN_KEYWORDS, MIN_PROMPTS");
  }
}

module.exports = { runResearch };
if (require.main === module) main();
