const fs = require("fs");
const http = require("http");
const https = require("https");
const os = require("os");
const path = require("path");
const { URL } = require("url");
const { generateStrategyOutboundPack } = require("./generate-outbound-pack.cjs");

const DEFAULT_OPENAI_BASE_URL = "http://127.0.0.1:8317/v1";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "dummy";
const STRATEGY_MODEL = process.env.STRATEGY_MODEL || "gpt-5.4(high)";
const REPO_ROOT = path.join(__dirname, "..", "..");
const REPO_STRATEGY_CONTRACT_ROOT = path.join(REPO_ROOT, "contracts", "strategy");
const CANONICAL_MIND_ROOT = "/Users/house/Mind/Memetik/60-Shared/Reference/Strategy-Generation";
const CANONICAL_MASTER_REFERENCE_PATH = "/Users/house/Mind/Memetik/60-Shared/Reference/MEMETIK-2026-AEO-Master-Reference.md";
const PORTABLE_BRIEF_SNAPSHOT_DIR = path.join(REPO_ROOT, "content", "strategy-briefs");
const PORTABLE_STRATEGY_CONTENT_DRAFT_DIR = path.join(REPO_ROOT, "content", "strategy-content-drafts");
const OBSIDIAN_STRATEGY_CONTENT_DRAFT_DIR =
  process.env.OBSIDIAN_STRATEGY_CONTENT_DRAFT_DIR ||
  path.join(os.homedir(), "Mind", "Areas", "Agency", "Clients", "SaaS", "memetik", "Strategy Content Drafts");
const OPENAI_BASE_URL = resolveOpenAIBaseUrl(STRATEGY_MODEL);
const MODEL_REQUEST_MAX_RETRIES = Number(process.env.STRATEGY_MODEL_MAX_RETRIES || 3);
const MODEL_REQUEST_TIMEOUT_MS = Number(process.env.STRATEGY_MODEL_TIMEOUT_MS || 15 * 60 * 1000);

const REQUIRED_BRIEF_SECTIONS = [
  "## Lineage",
  "## 1. Brief Metadata",
  "## 2. Company Context",
  "## 3. Category Framing",
  "## 4. Current State and Visibility",
  "## 5. Competitor Landscape",
  "## 6. Money Entities",
  "## 7. Prioritized Wedge and Ranked Sequence",
  "## 8. Apex Assets Plan",
  "## 9. Knowledge Graph Plan",
  "## 10. Trust Relay Plan",
  "## 11. Technical and Entity Foundation",
  "## 12. Proof and Measurement Model",
  "## 13. Cadence and Next Actions",
  "## 14. Page Extraction Map",
  "## 15. Unresolved Gaps and Blockers",
  "## 16. Claim Register",
];

const REQUIRED_SECTION_PATTERNS = [
  /the problem|current state|where .* today/i,
  /the opportunity|commercial upside|revenue potential|revenue impact|why .* can win/i,
  /the plan|growth plan|what memetik/i,
  /cost of|what happens if|failure|staying invisible/i,
  /success|becomes the|12 months from now/i,
  /estimate-only|modeled estimate|modeled/i,
  /book a strategy call|let'?s talk|cal\.com\/memetik\/letstalk/i,
  /StrategyPageFrame/i,
  /StrategyHero/i,
  /StrategySectionShell/i,
  /StrategyCTA/i,
];

const REQUIRED_CONTENT_DRAFT_SECTIONS = [
  "## Source Angle",
  "## Rough Video Script",
  "### Hook",
  "### Body",
  "### CTA",
  "## LinkedIn Post",
  "## Adaptation Notes",
];

const MARKET_CONTEXT_NON_NEGOTIABLES = [
  "Google still drives a major share of discovery and commercial research traffic.",
  "Traditional search remains a core buying behavior even as AI answer engines grow.",
  "AI is changing how buyers shortlist vendors, but it is not replacing Google outright.",
  "Buyers now move across Google, ChatGPT, Perplexity, Gemini, and other answer layers before they ever talk to sales.",
  "Winning brands need visibility across both classic search demand capture and AI answer surfaces.",
].join("\n- ");

function readJsonIfPresent(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function normalizeBaseUrl(value) {
  if (!value) return null;
  const trimmed = String(value).trim().replace(/\/$/, "");
  if (!trimmed) return null;
  return /\/v1$/i.test(trimmed) ? trimmed : `${trimmed}/v1`;
}

function getFactoryCustomModels() {
  const factoryRoot = path.join(os.homedir(), ".factory");
  const settings = readJsonIfPresent(path.join(factoryRoot, "settings.json"));
  const config = readJsonIfPresent(path.join(factoryRoot, "config.json"));
  const settingsModels = Array.isArray(settings?.customModels)
    ? settings.customModels.map((model) => ({
        model: model?.model,
        provider: model?.provider,
        baseUrl: model?.baseUrl,
      }))
    : [];
  const configModels = Array.isArray(config?.custom_models)
    ? config.custom_models.map((model) => ({
        model: model?.model,
        provider: model?.provider,
        baseUrl: model?.base_url,
      }))
    : [];

  return [...settingsModels, ...configModels];
}

function resolveOpenAIBaseUrl(modelName) {
  if (process.env.OPENAI_BASE_URL) {
    return normalizeBaseUrl(process.env.OPENAI_BASE_URL) || DEFAULT_OPENAI_BASE_URL;
  }

  const customModels = getFactoryCustomModels();
  const exactMatch = customModels.find((entry) => entry?.provider === "openai" && entry?.model === modelName && entry?.baseUrl);
  if (exactMatch?.baseUrl) {
    return normalizeBaseUrl(exactMatch.baseUrl) || DEFAULT_OPENAI_BASE_URL;
  }

  const familyMatch = customModels.find(
    (entry) => entry?.provider === "openai" && /^gpt-5\.4(?:\(|$)/i.test(entry?.model || "") && entry?.baseUrl
  );
  if (familyMatch?.baseUrl) {
    return normalizeBaseUrl(familyMatch.baseUrl) || DEFAULT_OPENAI_BASE_URL;
  }

  return DEFAULT_OPENAI_BASE_URL;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetriableModelError(message) {
  return /(internal_error|headers timeout|timed out|timeout|econnreset|socket hang up|stream error|502|503|504|rate limit)/i.test(
    String(message || "")
  );
}

async function requestModelCompletion(payload) {
  const endpoint = `${OPENAI_BASE_URL.replace(/\/$/, "")}/chat/completions`;
  let lastError = null;

  for (let attempt = 1; attempt <= MODEL_REQUEST_MAX_RETRIES; attempt += 1) {
    try {
      const parsed = await new Promise((resolve, reject) => {
        const requestBody = JSON.stringify(payload);
        const url = new URL(endpoint);
        const transport = url.protocol === "https:" ? https : http;
        const req = transport.request(
          url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Length": Buffer.byteLength(requestBody),
            },
          },
          (response) => {
            let data = "";
            response.setEncoding("utf8");
            response.on("data", (chunk) => {
              data += chunk;
            });
            response.on("end", () => {
              let parsedResponse;
              try {
                parsedResponse = JSON.parse(data);
              } catch {
                reject(new Error(`Failed to parse model response: ${data.slice(0, 500)}`));
                return;
              }

              if (response.statusCode >= 400 || parsedResponse?.error) {
                const msg = parsedResponse?.error?.message || `${response.statusCode || 500}`;
                reject(new Error(`Model API error: ${msg}`));
                return;
              }

              resolve(parsedResponse);
            });
          }
        );

        req.setTimeout(MODEL_REQUEST_TIMEOUT_MS, () => {
          req.destroy(new Error(`Model request timed out after ${MODEL_REQUEST_TIMEOUT_MS}ms`));
        });

        req.on("error", reject);
        req.write(requestBody);
        req.end();
      });

      return parsed;
    } catch (error) {
      lastError = error;
      if (attempt >= MODEL_REQUEST_MAX_RETRIES || !isRetriableModelError(error?.message)) break;
      await sleep(1500 * attempt);
    }
  }

  throw lastError;
}

function loadStrategicContextDocs() {
  throw new Error("loadStrategicContextDocs now requires canonical inputs via loadCanonicalGenerationInputs().");
}

function resolveCanonicalGenerationPaths(slug, company) {
  const mindRoot = process.env.STRATEGY_GENERATION_ROOT || CANONICAL_MIND_ROOT;
  const briefDir = slug === "bts-2" ? path.join(mindRoot, "examples") : path.join(mindRoot, "briefs");
  const briefFileName =
    process.env.STRATEGY_BRIEF_FILE_NAME ||
    (slug === "bts-2" ? "BTS-Strategy-Brief.md" : `${pascalCase(company?.slug || slug)}-Strategy-Brief.md`);

  return {
    masterReferencePath: process.env.MEMETIK_MASTER_REFERENCE_PATH || CANONICAL_MASTER_REFERENCE_PATH,
    generationContractPath:
      process.env.STRATEGY_GENERATION_CONTRACT_PATH ||
      path.join(REPO_STRATEGY_CONTRACT_ROOT, "MEMETIK-2026-Strategy-Generation-Contract.md"),
    briefSchemaPath:
      process.env.CLIENT_STRATEGY_BRIEF_SCHEMA_PATH || path.join(REPO_STRATEGY_CONTRACT_ROOT, "client-strategy-brief-schema.yaml"),
    pageContractPath:
      process.env.WEBSITE_STRATEGY_PAGE_CONTRACT_PATH || path.join(REPO_STRATEGY_CONTRACT_ROOT, "website-strategy-page-contract.md"),
    contentDraftContractPath:
      process.env.STRATEGY_CONTENT_DRAFT_CONTRACT_PATH ||
      path.join(REPO_STRATEGY_CONTRACT_ROOT, "strategy-content-draft-contract.md"),
    briefPath: process.env.STRATEGY_BRIEF_PATH || path.join(briefDir, briefFileName),
  };
}

function readRequiredArtifact(filePath, label, validators = []) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} is required but missing: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.trim()) {
    throw new Error(`${label} is empty: ${filePath}`);
  }

  if (/\b(?:TODO|TBD)\b/.test(content)) {
    throw new Error(`${label} still contains TODO/TBD markers: ${filePath}`);
  }

  validators.forEach((validator) => validator(content, filePath));
  return { filePath, content };
}

function validateMarkdownHeading(content, filePath) {
  if (!content.trim().startsWith("#")) {
    throw new Error(`Markdown artifact must start with a heading: ${filePath}`);
  }
}

function validateGenerationContract(content, filePath) {
  const requiredSnippets = [
    /research payload -> internal strategy brief -> founder-facing website strategy page/i,
    /brief is canonical downstream planning state/i,
    /Trust Relay is core scope/i,
  ];
  const missing = requiredSnippets.filter((snippet) => !snippet.test(content)).map((snippet) => snippet.toString());
  if (missing.length > 0) {
    throw new Error(`Generation contract is invalid (${filePath}). Missing: ${missing.join(", ")}`);
  }
}

function validateBriefSchema(content, filePath) {
  const requiredSnippets = [
    /brief_schema:/i,
    /canonical_lineage:/i,
    /The brief is the canonical downstream planning artifact/i,
    /Ranked execution sequence is mandatory/i,
  ];
  const missing = requiredSnippets.filter((snippet) => !snippet.test(content)).map((snippet) => snippet.toString());
  if (missing.length > 0) {
    throw new Error(`Brief schema is invalid (${filePath}). Missing: ${missing.join(", ")}`);
  }
}

function validatePageContract(content, filePath) {
  const requiredSnippets = [
    /Canonical direct input\s*\|\s*Approved company strategy brief/i,
    /no approved brief exists/i,
    /What Memetik builds and ships/i,
  ];
  const missing = requiredSnippets.filter((snippet) => !snippet.test(content)).map((snippet) => snippet.toString());
  if (missing.length > 0) {
    throw new Error(`Website page contract is invalid (${filePath}). Missing: ${missing.join(", ")}`);
  }
}

function validateContentDraftContract(content, filePath) {
  const requiredSnippets = [/founder-advisory content drafts/i, /rough video script/i, /linkedin post/i];
  const missing = requiredSnippets.filter((snippet) => !snippet.test(content)).map((snippet) => snippet.toString());
  if (missing.length > 0) {
    throw new Error(`Strategy content draft contract is invalid (${filePath}). Missing: ${missing.join(", ")}`);
  }
}

function loadCanonicalGenerationInputs(slug, company) {
  const paths = resolveCanonicalGenerationPaths(slug, company);

  const masterReference = readRequiredArtifact(paths.masterReferencePath, "Master reference", [validateMarkdownHeading]);
  const generationContract = readRequiredArtifact(paths.generationContractPath, "Strategy generation contract", [
    validateMarkdownHeading,
    validateGenerationContract,
  ]);
  const briefSchema = readRequiredArtifact(paths.briefSchemaPath, "Client strategy brief schema", [validateBriefSchema]);
  const pageContract = readRequiredArtifact(paths.pageContractPath, "Website strategy page contract", [
    validateMarkdownHeading,
    validatePageContract,
  ]);
  const contentDraftContract = readRequiredArtifact(paths.contentDraftContractPath, "Strategy content draft contract", [
    validateMarkdownHeading,
    validateContentDraftContract,
  ]);

  const docs = [masterReference, generationContract, briefSchema, pageContract].map((doc) => ({
    filePath: doc.filePath,
    content: doc.content.slice(0, 24000),
  }));

  console.log("  Canonical lineage: master reference -> generation contract -> brief -> page");
  console.log(`  Master reference: ${paths.masterReferencePath}`);
  console.log(`  Generation contract: ${paths.generationContractPath}`);
  console.log(`  Brief schema: ${paths.briefSchemaPath}`);
  console.log(`  Page contract: ${paths.pageContractPath}`);
  console.log(`  Content draft contract: ${paths.contentDraftContractPath}`);
  console.log(`  Canonical brief: ${paths.briefPath}`);

  return {
    paths,
    docs,
    masterReference,
    generationContract,
    briefSchema,
    pageContract,
    contentDraftContract,
  };
}

function ensureOrderedMarkers(content, markers, label) {
  let lastIndex = -1;
  for (const marker of markers) {
    const index = content.indexOf(marker);
    if (index === -1) {
      throw new Error(`${label} is missing required marker: ${marker}`);
    }
    if (index <= lastIndex) {
      throw new Error(`${label} is out of order at marker: ${marker}`);
    }
    lastIndex = index;
  }
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(value));
}

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
  return `${Number(value).toFixed(1)}%`;
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countWords(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function extractStrategyHeroLiteralProps(tsxContent) {
  const openingTagMatch = tsxContent.match(/<StrategyHero[\s\S]*?>/);
  if (!openingTagMatch) return { title: null, accent: null };

  const openingTag = openingTagMatch[0];
  const titleMatch = openingTag.match(/\btitle="([^"]+)"/);
  const accentMatch = openingTag.match(/\baccent="([^"]+)"/);

  return {
    title: titleMatch?.[1]?.trim() || null,
    accent: accentMatch?.[1]?.trim() || null,
  };
}

function normalizeCompetitorAlias(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*/, "")
    .trim();
}

function getCompetitorAliases(researchData = {}) {
  const ignoredTokens = new Set(["www", "com", "co", "io", "ai", "app", "hq", "inc", "llc", "the"]);
  const aliases = new Set();

  for (const competitor of Array.isArray(researchData?.competitors) ? researchData.competitors : []) {
    const candidates = [competitor?.name, competitor?.domain];
    for (const candidate of candidates) {
      const normalized = normalizeCompetitorAlias(candidate);
      if (!normalized) continue;

      aliases.add(normalized);
      const domainRoot = normalized.split(".")[0];
      if (domainRoot && !ignoredTokens.has(domainRoot) && domainRoot.length >= 3) {
        aliases.add(domainRoot);
      }

      for (const token of normalized.split(/[^a-z0-9]+/i).filter(Boolean)) {
        if (token.length >= 4 && !ignoredTokens.has(token)) aliases.add(token);
      }
    }
  }

  return Array.from(aliases).sort((a, b) => b.length - a.length);
}

function buildKeywordAttributionSummary(researchData = {}) {
  const rows = Array.isArray(researchData?.keywordUniverse) ? researchData.keywordUniverse : [];
  const winRates = researchData?.tamModel?.assumptions?.trafficWinRates;
  const totals = researchData?.tamModel?.totals || {};
  const monthlyTrajectory = Array.isArray(researchData?.tamModel?.monthlyTrajectory) ? researchData.tamModel.monthlyTrajectory : [];
  const competitorAliases = getCompetitorAliases(researchData);

  if (!rows.length || !winRates || !competitorAliases.length) return null;

  const matchesCompetitor = (keyword) => {
    const normalized = String(keyword || "").toLowerCase();
    return competitorAliases.some((alias) => alias && new RegExp(`\\b${escapeRegExp(alias)}\\b`, "i").test(normalized));
  };

  const summarizeRows = (subset) => {
    const demand = subset.reduce((sum, row) => sum + Number(row?.volume || 0), 0);
    const expectedTraffic12Months = { low: 0, base: 0, high: 0 };

    for (const row of subset) {
      const intent = row?.intent;
      const volume = Number(row?.volume || 0);
      if (!intent || !winRates[intent] || volume <= 0) continue;
      for (const scenario of ["low", "base", "high"]) {
        expectedTraffic12Months[scenario] += volume * Number(winRates[intent]?.[scenario] || 0);
      }
    }

    const first6MonthTarget = { low: 0, base: 0, high: 0 };
    for (const scenario of ["low", "base", "high"]) {
      const totalScenario = Number(totals?.expectedTraffic12Months?.[scenario] || 0);
      const first6Weight = totalScenario > 0
        ? monthlyTrajectory.slice(0, 6).reduce((sum, row) => sum + Number(row?.[scenario] || 0), 0) / totalScenario
        : 0;
      first6MonthTarget[scenario] = expectedTraffic12Months[scenario] * first6Weight;
    }

    return {
      keywordCount: subset.length,
      demand,
      expectedTraffic12Months,
      first6MonthTarget,
    };
  };

  const competitorRows = rows.filter((row) => matchesCompetitor(row?.keyword));
  if (!competitorRows.length) return null;

  const nonCompetitorRows = rows.filter((row) => !matchesCompetitor(row?.keyword));
  const competitor = summarizeRows(competitorRows);
  const nonCompetitor = summarizeRows(nonCompetitorRows);
  const totalDemand = competitor.demand + nonCompetitor.demand;
  const totalBaseTraffic = competitor.expectedTraffic12Months.base + nonCompetitor.expectedTraffic12Months.base;

  return {
    competitorAliases: competitorAliases.slice(0, 12),
    competitor,
    nonCompetitor,
    shares: {
      demand: {
        competitor: totalDemand > 0 ? (competitor.demand / totalDemand) * 100 : 0,
        nonCompetitor: totalDemand > 0 ? (nonCompetitor.demand / totalDemand) * 100 : 0,
      },
      expectedTraffic12MonthsBase: {
        competitor: totalBaseTraffic > 0 ? (competitor.expectedTraffic12Months.base / totalBaseTraffic) * 100 : 0,
        nonCompetitor: totalBaseTraffic > 0 ? (nonCompetitor.expectedTraffic12Months.base / totalBaseTraffic) * 100 : 0,
      },
    },
  };
}

function formatKeywordAttributionSummary(summary) {
  if (!summary) return "- No competitor-keyword attribution summary available for this payload.";

  return [
    `- Competitor-keyword demand: ${formatNumber(summary.competitor.demand)} (${formatPercent(summary.shares.demand.competitor)})`,
    `- Non-competitor / unbranded demand: ${formatNumber(summary.nonCompetitor.demand)} (${formatPercent(summary.shares.demand.nonCompetitor)})`,
    `- Competitor-keyword expected traffic in 12 months (base): ${formatNumber(summary.competitor.expectedTraffic12Months.base)}`,
    `- Non-competitor / unbranded expected traffic in 12 months (base): ${formatNumber(summary.nonCompetitor.expectedTraffic12Months.base)}`,
    `- Competitor-keyword first 6-month target (base): ${formatNumber(summary.competitor.first6MonthTarget.base)}`,
    `- Non-competitor / unbranded first 6-month target (base): ${formatNumber(summary.nonCompetitor.first6MonthTarget.base)}`,
    `- Alias set used for competitor matching: ${summary.competitorAliases.join(", ")}`,
  ].join("\n");
}

function toJsonBlock(value) {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function isBrandedPromptQuery(query, company) {
  const normalizedQuery = String(query || "").toLowerCase();
  const brandTerms = Array.from(
    new Set([
      String(company?.name || "").toLowerCase(),
      String(company?.domain || "")
        .toLowerCase()
        .replace(/^www\./, "")
        .replace(/\.[a-z]+$/, ""),
    ])
  ).filter(Boolean);

  return brandTerms.some((term) => term && normalizedQuery.includes(term));
}

function pickPromptEvidence(promptResults = [], company, limit = 3) {
  return promptResults
    .filter((result) => result?.query && result?.platform && !isBrandedPromptQuery(result.query, company))
    .sort((a, b) => Number(Boolean(b.clientMentioned)) - Number(Boolean(a.clientMentioned)))
    .slice(0, limit);
}

function formatTargetMarkets(targetMarkets, fallbackMarkets = []) {
  const values = Array.isArray(targetMarkets) && targetMarkets.length ? targetMarkets : fallbackMarkets;
  if (!Array.isArray(values) || !values.length) return "unknown";

  return values
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (entry?.key) return entry.key;
      if (entry?.locationName) return entry.locationName;
      if (entry?.locationCode) return String(entry.locationCode);
      return null;
    })
    .filter(Boolean)
    .join(", ");
}

function getCategoryLabel(company) {
  return (
    String(company?.brandDisambiguation || "").trim().toLowerCase() ||
    String(company?.category || "")
      .split("/")
      .pop()
      ?.trim()
      .toLowerCase() ||
    String(company?.industry || "").trim().toLowerCase() ||
    "category"
  );
}

function selectPrimaryWedgeCluster(topClusters = []) {
  return (
    topClusters.find((cluster) => cluster?.intent === "BOFU" && !/category & brand/i.test(cluster?.cluster || "")) ||
    topClusters.find((cluster) => !/category & brand/i.test(cluster?.cluster || "")) ||
    topClusters[0] ||
    null
  );
}

function describePrimaryWedge(cluster, company) {
  const categoryLabel = getCategoryLabel(company);
  if (!cluster) {
    return `Own the highest-intent commercial queries in ${categoryLabel} before broader category demand.`;
  }

  if (/alternatives? & comparisons?/i.test(cluster.cluster || "")) {
    return `Own ${categoryLabel} alternatives and comparison queries before broader category demand.`;
  }
  if (/buyer guides?/i.test(cluster.cluster || "")) {
    return `Own best-in-category and decision-stage ${categoryLabel} queries before broader category demand.`;
  }
  if (/pricing/i.test(cluster.cluster || "")) {
    return `Own ${categoryLabel} pricing and value-comparison queries before broader category demand.`;
  }
  if (/reviews?/i.test(cluster.cluster || "")) {
    return `Own ${categoryLabel} review and proof queries before broader category demand.`;
  }

  return `Own the highest-intent ${categoryLabel} decision queries before broader category demand.`;
}

function describeWhyCanWin(company, researchData, cluster) {
  const authorityBase = formatNumber(researchData?.seoMetrics?.backlinkMetrics?.referringDomains);
  const categoryLabel = getCategoryLabel(company);
  const clusterLabel = cluster?.cluster ? cluster.cluster.toLowerCase() : "decision-stage demand";
  return `${company.name} already has real category relevance and a usable authority base (${authorityBase} referring domains), but it has not yet turned that into a concentrated set of owned pages around ${clusterLabel} in ${categoryLabel}.`;
}

function describeRecommendation(cluster, company) {
  const categoryLabel = getCategoryLabel(company);
  if (!cluster) {
    return {
      recommendation: `Lead with the highest-intent ${categoryLabel} Money Entities.`,
      pageSummary: `Start with the decision-stage queries where buying consideration is clearest.`,
      rationale: `${company.name} already shows category demand, and the fastest path is concentrating the first wave on the highest-intent commercial terms.`,
    };
  }

  if (/alternatives? & comparisons?/i.test(cluster.cluster || "")) {
    return {
      recommendation: `Lead with ${categoryLabel} alternatives and comparison Money Entities.`,
      pageSummary: `Start with the alternatives and comparison layer where brand switching and shortlist decisions are clearest.`,
      rationale: `${company.name} already shows live comparison relevance, and the strongest BOFU wedge is the alternatives/comparison cluster.`,
    };
  }
  if (/buyer guides?/i.test(cluster.cluster || "")) {
    return {
      recommendation: `Lead with best-in-category and decision-stage ${categoryLabel} Money Entities.`,
      pageSummary: `Start with the buyer-guide layer where category selection and product evaluation are clearest.`,
      rationale: `${company.name} already has category relevance, and the strongest BOFU wedge is the buyer-guide cluster around best, use-case, and selection queries.`,
    };
  }
  if (/pricing/i.test(cluster.cluster || "")) {
    return {
      recommendation: `Lead with ${categoryLabel} pricing and value-comparison Money Entities.`,
      pageSummary: `Start with pricing and value questions where purchase friction is highest.`,
      rationale: `${company.name} can win by making value, format, and price clarity easier to understand than competing options.`,
    };
  }
  if (/reviews?/i.test(cluster.cluster || "")) {
    return {
      recommendation: `Lead with ${categoryLabel} review and proof-driven Money Entities.`,
      pageSummary: `Start with reviews and proof where trust and product confidence matter most.`,
      rationale: `${company.name} can win early by turning product proof into owned pages that capture validation-stage demand.`,
    };
  }

  return {
    recommendation: `Lead with the highest-intent ${categoryLabel} Money Entities.`,
    pageSummary: `Start with the decision-stage queries where buying consideration is clearest.`,
    rationale: `${company.name} already shows category demand, and the fastest path is concentrating the first wave on the highest-intent commercial terms.`,
  };
}

function getApexAssetTypes(cluster) {
  if (/buyer guides?/i.test(cluster?.cluster || "")) {
    return "best-for/use-case pages, buyer guide pages, head-to-head comparison pages, product-form explainer pages, and ingredient/benefit proof pages.";
  }
  if (/reviews?/i.test(cluster?.cluster || "")) {
    return "review pages, product proof pages, head-to-head comparison pages, expert roundup pages, and objection-handling FAQ pages.";
  }
  if (/pricing/i.test(cluster?.cluster || "")) {
    return "pricing/value explainer pages, comparison pages, cost-of-use explainers, format breakdown pages, and objection-handling FAQ pages.";
  }
  return "flagship alternatives pages, head-to-head competitor pages, best-for/use-case pages, pricing/value explainer pages, and comparison rubric pages.";
}

function getKnowledgeGraphShape(company) {
  const categoryText = `${company?.category || ""} ${company?.industry || ""}`.toLowerCase();
  if (/consumer health|electrolyte|hydration/i.test(categoryText)) {
    return "supporting retrieval pages around hydration scenarios, ingredients, benefits, routines, use cases, and competitor-adjacent terms.";
  }
  if (/creator/i.test(categoryText)) {
    return "supporting retrieval pages around use cases, creator personas, monetization models, and competitor-adjacent terms.";
  }
  return "supporting retrieval pages around adjacent use cases, buyer context, proof objects, and competitor-adjacent terms.";
}

function getInitialAttackSurfaces(company) {
  const categoryText = `${company?.category || ""} ${company?.industry || ""}`.toLowerCase();
  if (/consumer health|electrolyte|hydration/i.test(categoryText)) {
    return "Reddit/community threads, hydration roundups and comparison listicles, review-profile reinforcement, athlete/influencer proof, and expert commentary placements.";
  }
  if (/creator/i.test(categoryText)) {
    return "Reddit/community threads, creator-software listicles, review-profile reinforcement, and expert commentary placements.";
  }
  return "Reddit/community threads, review-profile reinforcement, comparison listicles, editorial mentions, and expert commentary placements.";
}

function buildCanonicalBrief(company, researchData, canonicalInputs) {
  const today = new Date().toISOString().slice(0, 10);
  const totals = researchData?.tamModel?.totals || {};
  const qualityGate = researchData?.qualityGate || {};
  const payloadConfidence = researchData?.meta?.payloadConfidence || researchData?.tamModel?.confidence || {};
  const topicalIntegrity = researchData?.topicalIntegrity || {};
  const topClusters = Array.isArray(researchData?.tamModel?.topOpportunityClusters)
    ? researchData.tamModel.topOpportunityClusters.slice(0, 4)
    : [];
  const primaryWedgeCluster = selectPrimaryWedgeCluster(topClusters);
  const categoryLabel = getCategoryLabel(company);
  const primaryWedge = describePrimaryWedge(primaryWedgeCluster, company);
  const whyCanWin = describeWhyCanWin(company, researchData, primaryWedgeCluster);
  const wedgeRecommendation = describeRecommendation(primaryWedgeCluster, company);
  const competitors = Array.isArray(researchData?.competitors) ? researchData.competitors.slice(0, 5) : [];
  const rankedCommercialKeywords = (researchData?.rankedKeywords || [])
    .filter((keyword) => /\b(vs|alternative|alternatives|pricing|compare|comparison|best)\b/i.test(keyword.keyword || ""))
    .slice(0, 8)
    .map((keyword) => `${keyword.keyword} (position ${keyword.position}, volume ${formatNumber(keyword.volume)})`);
  const promptEvidence = pickPromptEvidence(researchData?.aiVisibility?.promptResults, company, 5);

  const platformSummaryLines = Object.entries(researchData?.aiVisibility?.platformSummary || {}).map(([platform, summary]) => {
    return `- ${platform}: ${formatPercent(summary?.mentionRate)} mention rate (${summary?.mentioned || 0}/${summary?.total || 0})`;
  });

  const competitorLines = competitors.map((competitor) => {
    return `| ${competitor.name || competitor.domain} | ${formatNumber(
      competitor.metrics?.organicTraffic
    )} | ${formatNumber(competitor.metrics?.organicKeywords)} | ${formatNumber(
      competitor.metrics?.referringDomains
    )} | ${formatNumber(competitor.metrics?.backlinks)} | ${competitor.evidence?.promptEvidence?.queryHits || 0} |`;
  });

  const clusterLines = topClusters.map((cluster, index) => {
    return `${index + 1}. ${cluster.cluster} (${cluster.intent}, ${cluster.phase}) — demand ${formatNumber(
      cluster.demand
    )}, expected 12m traffic ${formatNumber(cluster.expectedTraffic12Months?.base)}; sample keywords: ${(cluster.sampleKeywords || [])
      .slice(0, 5)
      .join(", ")}`;
  });

  const wedgeKeywords = Array.from(
    new Set(
      topClusters
        .filter((cluster) => /buyer|alternative|comparison|pricing/i.test(cluster.cluster || ""))
        .flatMap((cluster) => cluster.sampleKeywords || [])
        .concat(rankedCommercialKeywords.map((entry) => entry.split(" (")[0]))
    )
  ).slice(0, 8);

  const unresolvedGaps = [];
  if (Array.isArray(researchData?.meta?.issues)) {
    researchData.meta.issues.forEach((issue, index) => {
      unresolvedGaps.push({
        gapId: `GAP-${String(index + 1).padStart(3, "0")}`,
        summary: `${issue.step}: ${issue.error}`,
        severity: /invalid|not found/i.test(issue.error || "") ? "caution" : "note",
      });
    });
  }

  if (Array.isArray(qualityGate?.failures)) {
    qualityGate.failures.forEach((failure, index) => {
      unresolvedGaps.push({
        gapId: `GAP-QG-${String(index + 1).padStart(3, "0")}`,
        summary: failure,
        severity: "blocker",
      });
    });
  }

  const claimRecords = [
    {
      claimId: "CLAIM-001",
      statement: `${company.name} has minimal current organic visibility against the size of the category opportunity.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["seoMetrics.organicTraffic", "seoMetrics.organicKeywords", "tamModel.totals.totalSearchOpportunity"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-002",
      statement: `${company.name} already has a usable authority base (${formatNumber(
        researchData?.seoMetrics?.referringDomains
      )} referring domains) that can support a focused wedge strategy.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["seoMetrics.backlinkMetrics.referringDomains", "seoMetrics.backlinkMetrics.backlinks"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-003",
      statement: `${primaryWedgeCluster?.cluster || "Decision-stage"} intent is the fastest commercial wedge because the strongest BOFU clusters in the payload align with current category behavior.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["tamModel.topOpportunityClusters", "rankedKeywords"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-004",
      statement: `${company.name} has partial LLM mention momentum but no sampled Google AI Overview visibility, so answer-surface work must be explicit.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["aiVisibility.platformSummary", "aiVisibility.promptResults"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-005",
      statement: `Downstream strategy must preserve the full Memetik system: Money Entities, Apex Assets, Knowledge Graph, Trust Relay, and technical/entity foundation.`,
      sourceClass: "canonical_internal",
      sourcePointer: canonicalInputs.paths.generationContractPath,
      sourcePayloadPaths: ["contract.5", "contract.9"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-006",
      statement: `The company passed the research quality gate with high confidence and topical integrity, so the wedge can be rendered publicly with caveat discipline rather than blocked outright.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["qualityGate", "meta.payloadConfidence", "topicalIntegrity"],
      certainty: "high",
      pageHandling: "use",
    },
  ];

  return `# ${company.name} Strategy Brief - ${today}

## Lineage
- Master reference: ${canonicalInputs.paths.masterReferencePath}
- Generation contract: ${canonicalInputs.paths.generationContractPath}
- Brief schema: ${canonicalInputs.paths.briefSchemaPath}
- Public output contract: ${canonicalInputs.paths.pageContractPath}
- Canonical chain: master reference -> generation contract -> brief -> page

## 1. Brief Metadata
- Brief title: ${company.name} Strategy Brief - ${today}
- Slug: ${company.slug}
- Brief status: approved_for_page_generation
- Generated at: ${today}
- Research generated at: ${researchData?.meta?.generatedAt || "unknown"}
- Research mode: ${researchData?.meta?.researchMode || "unknown"}
- Payload confidence: ${payloadConfidence.level || "unknown"} (${payloadConfidence.score || "n/a"}/100)
- Quality gate: ${qualityGate.passed ? "passed" : "failed"}
- Page output path: ${path.join(__dirname, "..", "..", "client", "src", "pages", "strategy", `${pascalCase(company.slug)}.tsx`)}
- Repository content draft path: ${getRepoStrategyContentDraftPath(company.slug)}
- Obsidian content draft path: ${getObsidianStrategyContentDraftPath(company.slug)}
- Canonical brief path: ${canonicalInputs.paths.briefPath}

## 2. Company Context
- Company: ${company.name}
- Domain: ${company.domain}
- Category: ${company.category}
- Industry: ${company.industry}
- Target markets: ${formatTargetMarkets(researchData?.meta?.targetMarkets, researchData?.seoMetrics?.marketsIncluded || [])}
- Current organic traffic: ${formatNumber(researchData?.seoMetrics?.organicTraffic)}
- Current organic keywords: ${formatNumber(researchData?.seoMetrics?.organicKeywords)}
- Referring domains: ${formatNumber(researchData?.seoMetrics?.backlinkMetrics?.referringDomains)}
- Backlinks: ${formatNumber(researchData?.seoMetrics?.backlinkMetrics?.backlinks)}

## 3. Category Framing
- Primary wedge: ${primaryWedge}
- Why this company can win now: ${whyCanWin}
- Commercial objective: Move from brand-adjacent discoverability to shortlist inclusion across Google, ChatGPT, Gemini, and other answer surfaces.
- Doctrine constraint: Preserve Apex Assets + Knowledge Graph + Trust Relay + technical/entity foundation as one execution system.

## 4. Current State and Visibility
- Search opportunity: ${formatNumber(totals.totalSearchOpportunity)} total validated demand
- Expected traffic in 12 months (base): ${formatNumber(totals.expectedTraffic12Months?.base)}
- Aggressive upside: ${formatNumber(totals.aggressiveUpside)}
- First 6-month target (base): ${formatNumber(totals.first6MonthTarget?.base)}
- AI visibility baseline:
${platformSummaryLines.join("\n") || "- No AI visibility summary available."}
- Topical integrity: ${topicalIntegrity.passed ? "passed" : "failed"} (low-quality semantic demand share ${formatPercent(
    topicalIntegrity?.metrics?.lowQualitySemanticDemandSharePercent
  )})

## 5. Competitor Landscape
| Competitor | Organic traffic | Organic keywords | Referring domains | Backlinks | Prompt hits |
| --- | ---: | ---: | ---: | ---: | ---: |
${competitorLines.join("\n")}

## 6. Money Entities
${clusterLines.join("\n")}

Commercial keyword signals:
${rankedCommercialKeywords.map((keyword) => `- ${keyword}`).join("\n") || "- No ranked commercial keywords found."}

## 7. Prioritized Wedge and Ranked Sequence
### REC-001
- recommendation: ${wedgeRecommendation.recommendation}
- company_specific_rationale: ${wedgeRecommendation.rationale}
- priority_rank: 1
- claim_ids: CLAIM-001, CLAIM-003, CLAIM-006
- gap_ids: none
- visibility: page_extractable
- page_summary: ${wedgeRecommendation.pageSummary}

### REC-002
- recommendation: Pair every core Apex Asset with Trust Relay distribution and review-platform reinforcement.
- company_specific_rationale: ${company.name} has baseline authority but weak answer-surface consistency; external reinforcement is required to change recommendation-share.
- priority_rank: 2
- claim_ids: CLAIM-002, CLAIM-004, CLAIM-005
- gap_ids: ${unresolvedGaps.length ? unresolvedGaps.map((gap) => gap.gapId).join(", ") : "none"}
- visibility: page_extractable
- page_summary: Do not ship on-site pages without matching off-site authority and review proof.

### REC-003
- recommendation: Keep the public page founder-readable, but preserve the real Month 1 / Month 2 / Month 3 / Months 4-6 execution plan and concurrent monthly workstreams.
- company_specific_rationale: The doctrine requires the execution engine to remain visible so the strategy reads like a serious category-capture program, not a light content retainer.
- priority_rank: 3
- claim_ids: CLAIM-005
- gap_ids: none
- visibility: page_extractable
- page_summary: Show the actual 6-month shipping model and concurrent workstreams, not a vague promise.

## 8. Apex Assets Plan
- First assets to ship: ${wedgeKeywords.slice(0, 5).join(", ") || `${categoryLabel} comparison, ${categoryLabel} review`}
- Required Apex Asset types: ${getApexAssetTypes(primaryWedgeCluster)}
- Founder-facing point: These are the owned answer assets that create shortlist share fastest.

## 9. Knowledge Graph Plan
- Supporting clusters: ${(topClusters || []).map((cluster) => cluster.cluster).join(", ") || "No clusters available"}
- Required output shape: ${getKnowledgeGraphShape(company)}
- Founder-facing point: Knowledge Graph density makes answer engines repeatedly find the same commercial narrative.

## 10. Trust Relay Plan
- Required workstreams: review platforms, community/forum participation, professional-network/newsletter distribution, listicles/publication-style placements, digital PR/editorial placements, backlinks to Apex Assets.
- Initial attack surfaces: ${getInitialAttackSurfaces(company)}
- Founder-facing point: Recommendation-share requires third-party trust, not just indexed pages.

## 11. Technical and Entity Foundation
- Required systems: schema matched to visible content, sitemap hygiene, crawl/index eligibility, canonicals, Bing Webmaster Tools, IndexNow, entity consistency across owned and third-party surfaces.
- Current note: website audit exists in payload and should support a visible but concise infrastructure callout on the page.

## 12. Proof and Measurement Model
- Total search opportunity: ${formatNumber(totals.totalSearchOpportunity)}
- Expected traffic in 12 months (base): ${formatNumber(totals.expectedTraffic12Months?.base)}
- Aggressive upside: ${formatNumber(totals.aggressiveUpside)}
- First 6-month target: ${formatNumber(totals.first6MonthTarget?.base)}
- Revenue-model note: ${researchData?.tamModel?.revenueModel?.enabled === false ? "Revenue planning requires client ACV/AOV and funnel inputs." : "Revenue model present in payload; keep caveat discipline."}
- Measurement frame: recommendation-share, prompt coverage, authority proof, workstream completion, and downstream search indicators.

## 13. Cadence and Next Actions
- 6-month execution framing: Month 1 sets the wedge and first money pages, Month 2 expands comparison/review coverage and authority reinforcement, Month 3 deepens supporting coverage and entity reinforcement, Months 4-6 compound distribution, refresh, and market-share expansion.
- Monthly execution model: each month runs research and prioritization, page production, publishing/indexing, off-site authority, and measurement concurrently.
- Immediate next actions: publish first wedge pages, attach Trust Relay distribution to each, then expand supporting Knowledge Graph coverage.

## 14. Page Extraction Map
- Hero <- sections 2, 3, 12
- Current state <- sections 4, 5
- Opportunity / right to win <- sections 3, 6, 7
- Competitive gap <- section 5
- AI visibility gap <- sections 4, 15
- 6-month growth plan <- sections 7, 8, 9, 13
- What Memetik builds and ships <- sections 8, 9, 10, 11, 13
- Operating cadence <- section 13
- Supporting evidence appendix <- sections 5, 6, 12, 15, 16

## 15. Unresolved Gaps and Blockers
${
    unresolvedGaps.length
      ? unresolvedGaps
          .map(
            (gap) =>
              `### ${gap.gapId}\n- summary: ${gap.summary}\n- severity: ${gap.severity}\n- affected_sections: 4, 10, 15\n- impact_on_wedge: Preserve caveat discipline; do not invent unsupported platform certainty.\n- required_resolution: Re-run or replace the missing platform probe before using those specifics publicly.\n- brief_status: proceed_with_caveat\n- page_status: page_safe_if_softened`
          )
          .join("\n\n")
      : "No unresolved gaps."
  }

## 16. Claim Register
${claimRecords
    .map(
      (claim) => `### ${claim.claimId}
- statement: ${claim.statement}
- source_class: ${claim.sourceClass}
- source_pointer: ${claim.sourcePointer}
- source_payload_paths: ${claim.sourcePayloadPaths.join(", ")}
- checked_at: ${today}
- freshness_tier: ${claim.sourceClass === "canonical_internal" ? "tier_3_stable" : "tier_2_semi_stable"}
- freshness_status: current
- certainty: ${claim.certainty}
- page_handling: ${claim.pageHandling}`
    )
    .join("\n\n")}

## Appendix: Payload excerpts
### Top opportunity clusters
${toJsonBlock(topClusters)}

### Prompt evidence sample
${toJsonBlock(promptEvidence)}
`;
}

function validateCanonicalBriefContent(content, briefPath) {
  validateMarkdownHeading(content, briefPath);
  ensureOrderedMarkers(content, REQUIRED_BRIEF_SECTIONS, `Canonical brief (${briefPath})`);
  const requiredSnippets = [
    "Canonical chain: master reference -> generation contract -> brief -> page",
    "Brief status: approved_for_page_generation",
    "### REC-001",
    "### CLAIM-001",
  ];
  const missing = requiredSnippets.filter((snippet) => !content.includes(snippet));
  if (missing.length > 0) {
    throw new Error(`Canonical brief is invalid (${briefPath}). Missing: ${missing.join(", ")}`);
  }
}

function getPortableBriefSnapshotPath(slug) {
  const fileName = slug === "bts-2" ? "BTS-Strategy-Brief.md" : `${pascalCase(slug)}-Strategy-Brief.md`;
  return path.join(PORTABLE_BRIEF_SNAPSHOT_DIR, fileName);
}

function getStrategyContentDraftFileName(slug) {
  return slug === "bts-2" ? "BTS-Strategy-Content-Drafts.md" : `${pascalCase(slug)}-Strategy-Content-Drafts.md`;
}

function getRepoStrategyContentDraftPath(slug) {
  const fileName = getStrategyContentDraftFileName(slug);
  return path.join(PORTABLE_STRATEGY_CONTENT_DRAFT_DIR, fileName);
}

function getObsidianStrategyContentDraftPath(slug) {
  return path.join(OBSIDIAN_STRATEGY_CONTENT_DRAFT_DIR, getStrategyContentDraftFileName(slug));
}

function syncPortableBriefSnapshot(slug, briefContent) {
  const snapshotPath = getPortableBriefSnapshotPath(slug);

  if (!fs.existsSync(PORTABLE_BRIEF_SNAPSHOT_DIR)) {
    fs.mkdirSync(PORTABLE_BRIEF_SNAPSHOT_DIR, { recursive: true });
  }

  fs.writeFileSync(snapshotPath, briefContent);
  validateCanonicalBriefContent(briefContent, snapshotPath);
  console.log(`  Portable brief snapshot updated: ${snapshotPath}`);

  return snapshotPath;
}

function createOrValidateCanonicalBrief(company, researchData, canonicalInputs) {
  const briefContent = buildCanonicalBrief(company, researchData, canonicalInputs);
  const briefDir = path.dirname(canonicalInputs.paths.briefPath);
  if (!fs.existsSync(briefDir)) {
    fs.mkdirSync(briefDir, { recursive: true });
  }

  fs.writeFileSync(canonicalInputs.paths.briefPath, briefContent);
  validateCanonicalBriefContent(briefContent, canonicalInputs.paths.briefPath);
  const portableSnapshotPath = syncPortableBriefSnapshot(company.slug, briefContent);
  console.log(`  Canonical brief created/updated: ${canonicalInputs.paths.briefPath}`);
  console.log("  Canonical brief validated against required sections and lineage.");

  return {
    filePath: canonicalInputs.paths.briefPath,
    content: briefContent,
    portableSnapshotPath,
  };
}

function validateResearchForGeneration(researchData) {
  const qualityGate = researchData?.qualityGate;
  const payloadConfidence = researchData?.meta?.payloadConfidence;
  const allowLowConfidence = process.env.ALLOW_LOW_CONFIDENCE_GENERATION === "true";
  const allowLegacyResearch = process.env.ALLOW_LEGACY_RESEARCH_GENERATION === "true";

  if (!qualityGate) {
    throw new Error(
      "Research payload is missing qualityGate metadata. Re-run research with the updated pipeline before generation."
    );
  }

  if (!payloadConfidence) {
    throw new Error(
      "Research payload is missing payloadConfidence metadata. Re-run research with the updated pipeline before generation."
    );
  }

  if (!allowLowConfidence && qualityGate && !qualityGate.passed) {
    throw new Error(`Research quality gate failed: ${qualityGate.failures.join("; ")}`);
  }

  if (!allowLowConfidence && payloadConfidence?.level === "low") {
    throw new Error(`Payload confidence is low (${payloadConfidence.score}/100). Refusing generation.`);
  }

  const tamModel = researchData?.tamModel;
  if (!tamModel) {
    throw new Error("Research payload is missing tamModel. Re-run research with TAM modeling enabled.");
  }
  if (!tamModel?.totals?.totalAddressableSearchDemand) {
    throw new Error("TAM model missing totalAddressableSearchDemand.");
  }
  if (
    (!Array.isArray(tamModel?.phasedUpside) || tamModel.phasedUpside.length === 0) &&
    (!Array.isArray(tamModel?.monthlyTrajectory) || tamModel.monthlyTrajectory.length === 0)
  ) {
    throw new Error("TAM model missing monthlyTrajectory/phasedUpside data.");
  }
  if (!tamModel?.assumptions) {
    throw new Error("TAM model missing assumptions table data.");
  }

  if (!Array.isArray(researchData?.keywordUniverse) || researchData.keywordUniverse.length === 0) {
    throw new Error("Research payload is missing keywordUniverse. Re-run research with full keyword universe enabled.");
  }

  if (!researchData?.aiVisibility?.platformSummary) {
    throw new Error("Research payload is missing aiVisibility.platformSummary for per-LLM tracking.");
  }

  if (!researchData?.seoMetrics?.backlinkMetrics) {
    throw new Error("Research payload is missing seoMetrics.backlinkMetrics. Re-run research with backlinks summary enabled.");
  }

  if (!Array.isArray(researchData?.aiVisibility?.competitorEvidence)) {
    throw new Error("Research payload is missing aiVisibility.competitorEvidence.");
  }

  if (!researchData?.topicalIntegrity && !allowLegacyResearch) {
    throw new Error("Research payload is missing topicalIntegrity metadata.");
  }

  if (!allowLowConfidence && researchData.topicalIntegrity && !researchData.topicalIntegrity.passed) {
    throw new Error(`Topical integrity failed: ${researchData.topicalIntegrity.failures.join("; ")}`);
  }
}

function validateGeneratedTsx(tsxContent) {
  const missing = REQUIRED_SECTION_PATTERNS.filter((pattern) => !pattern.test(tsxContent));
  if (missing.length > 0) {
    throw new Error(
      `Generated page failed required section checks. Missing patterns: ${missing
        .map((p) => p.toString())
        .join(", ")}`
    );
  }

  const heroProps = extractStrategyHeroLiteralProps(tsxContent);
  if (heroProps.title && countWords(heroProps.title) > 12) {
    throw new Error(`Generated page hero title is too verbose: "${heroProps.title}"`);
  }

  if (heroProps.accent && countWords(heroProps.accent) > 4) {
    throw new Error(`Generated page hero accent is too verbose: "${heroProps.accent}"`);
  }

  if (heroProps.title && /\bcan own\b/i.test(heroProps.title)) {
    throw new Error(`Generated page hero title must not use the old "can own" agency pattern: "${heroProps.title}"`);
  }

  if (!/oneLiner/.test(tsxContent)) {
    console.warn(`  Warning: Generated TSX does not include an oneLiner prop. The content JSON enrichment will generate a fallback.`);
  }

  if (!/GrowthTimelineChart/.test(tsxContent)) {
    throw new Error("Generated page must use GrowthTimelineChart for the Operating Model section.");
  }

  if (/WorkstreamTimeline/.test(tsxContent)) {
    throw new Error("Generated page must not use WorkstreamTimeline; use GrowthTimelineChart instead.");
  }

  if (/DeliveryScopeMatrix/.test(tsxContent)) {
    throw new Error("Generated page must not use DeliveryScopeMatrix in the main narrative; use stacked scope blocks instead.");
  }

  if (/\b(BTS 2|BTS 3|old page|original page|previous page|counter-offensive page)\b/i.test(tsxContent)) {
    throw new Error("Generated public pages must not reference prior page versions or old page drafts.");
  }

  if (/\bweekly (operating system|rhythm|cadence|retainer)\b/i.test(tsxContent)) {
    throw new Error("Generated public pages must not describe the program using weekly-rhythm language.");
  }
}

function ensureVisibleEstimateOnlyLabel(tsxContent) {
  if (/estimate-only|modeled estimate|modeled/i.test(tsxContent)) {
    return tsxContent;
  }

  const estimateOnlyBlock = [
    '      <div className="mx-auto w-full max-w-5xl px-6 pb-6">',
    '        <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">',
    '          Estimate-only traffic planning based on modeled search capture, not a guarantee.',
    "        </p>",
    "      </div>",
    "",
    "      <StrategyCTA",
  ].join("\n");

  if (tsxContent.includes("      <StrategyCTA")) {
    return tsxContent.replace("      <StrategyCTA", estimateOnlyBlock);
  }

  return tsxContent;
}

async function codexRequest(systemPrompt, userPrompt) {
  const parsed = await requestModelCompletion({
    model: STRATEGY_MODEL,
    max_tokens: 16000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = parsed?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part?.type === "text") return part.text || "";
        return "";
      })
      .join("");
  }

  const outputText = parsed?.output_text;
  if (typeof outputText === "string") return outputText;

  throw new Error(`No text content returned by model: ${JSON.stringify(parsed).slice(0, 500)}`);
}

// Read existing strategy pages as style examples
function loadExamplePages() {
  const pagesDir = path.join(__dirname, "..", "..", "client", "src", "pages");
  const examples = [];
  for (const file of ["Home.tsx"]) {
    const filePath = path.join(pagesDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      // Take first 200 lines as example to stay within token limits
      examples.push({ file, content: content.split("\n").slice(0, 200).join("\n") });
    }
  }
  return examples;
}

function loadComponentLibrary() {
  const compDir = path.join(__dirname, "..", "..", "client", "src", "components", "strategy");
  const index = fs.readFileSync(path.join(compDir, "index.ts"), "utf-8");
  const files = {};
  for (const f of fs.readdirSync(compDir)) {
    if (f !== "index.ts") {
      files[f] = fs.readFileSync(path.join(compDir, f), "utf-8");
    }
  }
  return { index, files };
}

function buildSystemPrompt(examples, components, canonicalDocs, brief) {
  const exampleSnippets = examples
    .map((e) => `--- ${e.file} (first 200 lines) ---\n${e.content}`)
    .join("\n\n");

  const componentSnippets = Object.entries(components.files)
    .map(([name, content]) => `--- ${name} ---\n${content}`)
    .join("\n\n");

  const strategicContext = canonicalDocs
    .map((doc) => `--- ${doc.filePath} ---\n${doc.content}`)
    .join("\n\n");

  const briefContext = `--- ${brief.filePath} ---\n${brief.content}`;

  return `You are a senior frontend developer and AEO/SEO strategist building a strategy page for Memetik (memetik.ai), an Answer Engine Optimization agency.

You are generating a complete, production-ready TSX file for a strategy page. The page follows a StoryBrand + PAS (Problem-Agitate-Solve) narrative structure where the prospect is the hero and Memetik is the guide. It should feel like a premium founder-facing strategy deck that someone who knows NOTHING about AI search can immediately understand.

NARRATIVE FRAMEWORK — StoryBrand 3-Act Structure:
The page tells a story in 3 acts, not 12 consultant-report sections:
- Act 1 "The Problem": Where the company stands today, why they are invisible, the competitive gap, the AI visibility gap — told as ONE compelling narrative about what is broken.
- Act 2 "The Opportunity": The wedge, why this company can win, the commercial upside and revenue curve — ONE section showing the size of the prize and why THIS company specifically wins it.
- Act 3 "The Plan": 6-month growth plan, what Memetik builds, off-site authority, operating model — ONE coherent execution story with a simple 3-step overview at the top.
- Plus: a failureBlock (what happens if they do nothing) and a successBlock (what 12 months from now looks like) before the CTA.
- NO separate "State of Search 2026" section. Market context is 1-2 sentences inside "The Problem."
- NO separate "Why Memetik" section. 2-3 sentences max, folded into the CTA area.

SHARED COMPONENTS (import from "@/components/strategy"):
${componentSnippets}

Index file:
${components.index}

STYLE EXAMPLES:
${exampleSnippets}

STRATEGIC CONTEXT (MANDATORY GROUNDING):
${strategicContext}

APPROVED CANONICAL BRIEF (MANDATORY DIRECT INPUT):
${briefContext}

CRITICAL RULES:
1. Output ONLY the complete TSX file content — no markdown fences, no explanation, no commentary.
2. The file must be a valid React component with a default export.
3. Import shared components from "@/components/strategy". Prefer StrategyPageFrame, StrategyHero, StrategySectionShell, StrategyCard, StrategyCTA.
4. Import Nav from "@/components/Nav". Import icons from "lucide-react".
5. DO NOT include pricing. Ever. No dollar amounts for Memetik's services.
6. End with a "Book a Strategy Call" CTA linking to https://cal.com/memetik/letstalk
7. Match the Memetik dark premium design system: glass/translucent shells, rounded radii, mono metadata pills, layered glow.
8. Use useEffect to set document.title and scroll to top.
9. The hero H1 must use a contrast or direct-address formula, NOT an internal ownership claim. Preferred formulas in priority order:
   a) Direct address + tension: "Your buyers are searching. They can't find you yet."
   b) Contrast / before-after: "From invisible to the default recommendation." or "Zero visibility today. Category leader in 12 months."
   c) Quantified gap: "14.8M searches. Zero results for [Company]."
   d) Provocative question: "Who gets the deal when [Company] doesn't show up?"
   NEVER use the old "[Brand] can own the [category]" pattern — it reads as agency jargon to founders. The headline must make a founder who knows nothing about AI search immediately feel the stakes. Keep it under 10 words. No accent line unless extremely short.
10. A founder should be able to skim the ENTIRE main narrative in under 3 minutes.
11. Make it 400-700 lines. The old 550-950 range was too verbose.
12. The page is PUBLIC. Do not include passwords or gates.

NARRATIVE RULES:
13. "The Problem" section should use narrativeProse (paragraph blocks) to tell a story, NOT walls of stacked cards. Use at most 2-3 cards for data like AI visibility scores. Name the external problem (invisible), the internal problem (losing deals they don't know about), and the philosophical problem (inferior competitors getting found first).
14. "The Opportunity" section should excite. Show the size of the prize AND the specific wedge. Include PhasedUpsideChart and the calculator here.
15. "The Plan" section should reassure. Open with a 3-step summary, then expand into month blocks and scope blocks.
16. Use StrategySectionLead sparingly — at most in 1 section. Other sections use a subtitle and/or narrativeProse.
17. Max 2-3 cards per section. Use prose for flow; cards for data or distinct concepts only.
18. Include a failure block and success block as data, not as sections (they render between the last section and the CTA).
19. Do not fabricate competitors or metrics. Use backlink metrics from the brief where available.
20. Translate operator-only doctrine into founder language. Do not use Money Entities, Apex Assets, Knowledge Graph, Trust Relay, recommendation-share, wedge, or shortlist.
21. Include the literal phrase "Estimate-only" at least once.
22. Do not bypass the approved brief. Raw research payload is not the canonical input.
23. Put detailed evidence (keyword tables, competitor data, assumptions, prompt evidence) in the Appendix using StrategyAppendixSection.
24. The main narrative must have one reading axis: vertical. No side-by-side layouts.
25. Include 2-3 real unbranded prompt examples inside "The Problem" section showing who currently wins the AI answers.
26. Preserve the full delivery scope: on-site pages, off-site authority, reviews, backlinks, technical infrastructure, and refresh loops.
27. Frame as monthly deployments, not weekly cadence.
28. Do not promise a fixed count of pages. Memetik builds as many as needed.
29. Use cumulative traffic progression so the final chart point matches the 12-month expected traffic number.
30. Canonical lineage must be preserved: master reference -> generation contract -> brief -> page.
31. The hero must include a "oneLiner" prop — a single punchy stat line that renders in gold below the H1. Format: "[Quantified gap]. [Company consequence]." e.g. "14.8M monthly searches. Zero results for XoomAI." Keep it under 15 words. It must pass the 3-second test — a founder glances at the hero and instantly understands the stakes from headline + oneLiner alone.
32. Do NOT generate deliverableStack, midPageCta, or transitionalCta in the TSX. These are added as standard doctrine during post-generation enrichment. The template auto-generates smart defaults for midPageCta and transitionalCta when not present in the JSON.`;
}

function buildContentDraftSystemPrompt(canonicalInputs) {
  return `You are a founder-advisory content strategist turning a canonical Memetik strategy into portable social content.

CONTENT DRAFT CONTRACT (mandatory):
--- ${canonicalInputs.paths.contentDraftContractPath} ---
${canonicalInputs.contentDraftContract.content}

CRITICAL RULES:
1. Output ONLY markdown. No code fences. No explanation.
2. Keep one primary angle across the whole file.
3. The angle must stay company-specific and evidence-bound.
4. Use public-safe founder language. Do not use operator-only labels like Money Entities, Apex Assets, Knowledge Graph, Trust Relay, or recommendation-share.
5. Do not mention the brief, the strategy page, internal prompts, internal versions, or old drafts.
6. Use missed traffic, missed revenue potential, and missed AI visibility only when supported by the canonical inputs.
7. If revenue math is not fully supported, say it needs first-party ACV/AOV and funnel inputs instead of inventing certainty.
8. Keep the tone calm, sharp, and founder-advisory.
9. Use a soft comment-based CTA by default.
10. Follow this exact structure:
# <Company> Strategy Content Drafts

## Source Angle
- Primary hook:
- Why it matters now:
- Proof points to use:
- Caveats / claims to avoid:
- Suggested CTA:

## Rough Video Script
### Hook
### Body
### CTA

## LinkedIn Post

## Adaptation Notes
- Reel opener overlay:
- Supporting stat line:
- CTA variation:
`;
}

function validateGeneratedStrategyContentDraft(content, filePath) {
  validateMarkdownHeading(content, filePath);
  ensureOrderedMarkers(content, REQUIRED_CONTENT_DRAFT_SECTIONS, `Strategy content drafts (${filePath})`);

  const forbiddenPatterns = [
    /\bMoney Entities\b/i,
    /\bApex Assets\b/i,
    /\bKnowledge Graph\b/i,
    /\bTrust Relay\b/i,
    /\brecommendation-share\b/i,
    /\bstrategy page\b/i,
    /\binternal brief\b/i,
    /\bold draft\b/i,
    /\bprevious page\b/i,
  ];
  const forbidden = forbiddenPatterns.filter((pattern) => pattern.test(content)).map((pattern) => pattern.toString());
  if (forbidden.length > 0) {
    throw new Error(`Strategy content drafts contain forbidden internal language: ${forbidden.join(", ")}`);
  }

  if (!/comment/i.test(content)) {
    throw new Error("Strategy content drafts must include a comment-based CTA.");
  }
}

async function generateStrategyContentDrafts(company, researchData, canonicalInputs, brief, pageTsxContent, keywordAttributionSummary) {
  const systemPrompt = buildContentDraftSystemPrompt(canonicalInputs);
  const userPrompt = `Generate the founder-advisory content drafts now.

COMPANY: ${company.name}
DOMAIN: ${company.domain}
CATEGORY: ${company.category}
INDUSTRY: ${company.industry}
CONTENT DRAFT OUTPUT PATH: ${getObsidianStrategyContentDraftPath(company.slug)}

KEYWORD ATTRIBUTION SUMMARY (use if available):
${formatKeywordAttributionSummary(keywordAttributionSummary)}

RESEARCH MODEL NOTES:
- Expected traffic in 12 months: ${formatNumber(researchData?.tamModel?.totals?.expectedTraffic12Months?.base)}
- First 6-month target: ${formatNumber(researchData?.tamModel?.totals?.first6MonthTarget?.base)}
- Aggressive upside: ${formatNumber(researchData?.tamModel?.totals?.aggressiveUpside)}
- Revenue model enabled: ${researchData?.tamModel?.revenueModel?.enabled === false ? "no" : "yes"}

APPROVED BRIEF CONTENT:
${brief.content}

CANONICAL PUBLIC PAGE TSX:
${pageTsxContent}

Additional requirements:
- Keep one clear angle that can power both the video script and LinkedIn post.
- The angle should normally combine missed traffic, missed AI visibility, and missed revenue potential when the canonical inputs support those claims.
- The rough video script should read like a 45-90 second talking-head draft with short lines, not polished ad copy.
- The LinkedIn post should be short-paragraph founder commentary, roughly 150-300 words, and end with a soft comment-based CTA.
- If you use modeled numbers, say modeled or estimate-only once in natural language.
- If revenue planning is incomplete, say that revenue planning needs client ACV/AOV and funnel inputs instead of inventing certainty.
- Do not mention internal systems, contracts, or the words brief / strategy page in the visible draft.
- Keep the output clean enough to save directly as markdown.`;

  const draftContent = await codexRequest(systemPrompt, userPrompt);

  let cleaned = draftContent;
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:md|markdown)?\n/, "").replace(/\n```$/, "");
  }

  const repoOutPath = getRepoStrategyContentDraftPath(company.slug);
  const obsidianOutPath = getObsidianStrategyContentDraftPath(company.slug);
  if (!fs.existsSync(PORTABLE_STRATEGY_CONTENT_DRAFT_DIR)) {
    fs.mkdirSync(PORTABLE_STRATEGY_CONTENT_DRAFT_DIR, { recursive: true });
  }
  if (!fs.existsSync(OBSIDIAN_STRATEGY_CONTENT_DRAFT_DIR)) {
    fs.mkdirSync(OBSIDIAN_STRATEGY_CONTENT_DRAFT_DIR, { recursive: true });
  }

  fs.writeFileSync(repoOutPath, cleaned);
  validateGeneratedStrategyContentDraft(cleaned, repoOutPath);
  fs.writeFileSync(obsidianOutPath, cleaned);
  validateGeneratedStrategyContentDraft(cleaned, obsidianOutPath);
  console.log(`  Strategy content drafts saved to ${repoOutPath}`);
  console.log(`  Strategy content drafts mirrored to ${obsidianOutPath}`);

  return { filePath: obsidianOutPath, repoFilePath: repoOutPath, content: cleaned };
}

async function generateContentJson(company, researchData, canonicalInputs, brief, pageTsxContent, keywordAttributionSummary) {
  console.log(`  Generating content JSON for ${company.name}...`);

  const contentJsonDir = path.join(REPO_ROOT, "data", "strategy-content");
  if (!fs.existsSync(contentJsonDir)) fs.mkdirSync(contentJsonDir, { recursive: true });

  const schemaPath = path.join(REPO_ROOT, "shared", "strategyContentSchema.ts");
  const schemaContent = fs.existsSync(schemaPath) ? fs.readFileSync(schemaPath, "utf-8") : "";

  const systemPrompt = `You are a data extraction engine. You will receive a complete strategy page TSX file and its approved brief. Extract ALL content into a structured JSON object matching the StrategyContentData schema.

SCHEMA:
${schemaContent}

RULES:
1. Output ONLY valid JSON. No markdown fences, no explanation, no commentary.
2. Extract every piece of visible text content from the TSX.
3. Map icons to their string names (e.g., "Search", "TrendingUp", "Target").
4. The "tldr" field is MANDATORY. Write 6-8 bullet points that a founder can skim in 10 seconds. Each bullet must be one sentence, data-grounded, and actionable. Cover: current AI visibility score, total search opportunity, current traffic/authority baseline, the recommended opening move, competitive landscape summary, and execution timeline.
5. Do NOT include any publicBannedTerms: ${JSON.stringify(["Foundation Assets", "AI share of voice", "pSEO", "programmatic SEO", "Apex Assets", "Knowledge Graph", "Trust Relay", "recommendation-share", "shortlist", "wedge", "Dream 100"])}.
6. Translate any internal terms to public equivalents.
7. Preserve all data: metrics, breakdowns, chart points, timeline milestones, appendix tables, prompt observations.
8. The JSON must be complete enough to render the full page from data alone.
9. The page follows a StoryBrand 3-act structure: "The Problem" (section 01), "The Opportunity" (section 02), "The Plan" (section 03). Extract sections accordingly. Use "narrativeProse" for paragraph-style content blocks within sections.
10. Extract "failureBlock" and "successBlock" if the TSX contains agitation/success-vision content near the CTA. These have eyebrow, heading, and bullets fields.
11. The hero headline must use a contrast or direct-address formula (e.g. "Your buyers are searching. They can't find you yet.") — NEVER the old "[Brand] can own the [category]" pattern.
12. The template renders a "Summarise with AI" button and the TLDR section at the very top of the hero. Just ensure the tldr array and all content fields are populated.
13. Generate a "hero.oneLiner" field: a single punchy stat line for the 3-second hero test. Format: "[Big number/gap]. [Company consequence]." Under 15 words. Example: "14.8M monthly searches. Zero results for XoomAI."
14. Do NOT generate deliverableStack in the JSON. It will be added by a post-generation enrichment script with standard Memetik doctrine.
15. Do NOT generate midPageCta or transitionalCta. The template auto-generates smart defaults.`;

  const userPrompt = `Extract the content from this strategy page TSX into the StrategyContentData JSON format.

COMPANY: ${company.name}
SLUG: ${company.slug}
DOMAIN: ${company.domain}

KEYWORD ATTRIBUTION SUMMARY:
${formatKeywordAttributionSummary(keywordAttributionSummary)}

TSX CONTENT:
${pageTsxContent}

APPROVED BRIEF:
${brief.content.slice(0, 8000)}

Generate the complete JSON now.`;

  try {
    let jsonContent = await codexRequest(systemPrompt, userPrompt);

    if (jsonContent.startsWith("```")) {
      jsonContent = jsonContent.replace(/^```(?:json)?\n/, "").replace(/\n```$/, "");
    }

    const parsed = JSON.parse(jsonContent);

    if (!parsed.slug) parsed.slug = company.slug;
    if (!parsed.company) parsed.company = company.name;
    if (!parsed.title) parsed.title = `${company.name} — Founder Strategy Memo | MEMETIK`;

    // Post-generation enrichment: add deliverableStack + validate oneLiner
    const enrichScript = path.join(__dirname, "enrich-content-json.cjs");
    if (fs.existsSync(enrichScript)) {
      const { enrichContentJson } = require(enrichScript);
      enrichContentJson(parsed, company);
      console.log(`  Content JSON enriched with deliverableStack and oneLiner`);
    }

    const outPath = path.join(contentJsonDir, `${company.slug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));
    console.log(`  Content JSON saved to ${outPath}`);

    updateStrategyRouteRegistry(company.slug, outPath);

    return { outPath, data: parsed };
  } catch (error) {
    console.warn(`  Warning: Content JSON generation failed for ${company.slug}: ${error.message}`);
    console.warn(`  The TSX page was generated successfully. Content JSON can be created manually.`);
    return null;
  }
}

function updateStrategyRouteRegistry(slug, contentDataPath) {
  const registryPath = path.join(REPO_ROOT, "shared", "strategyRouteRegistry.json");
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));

  const entry = registry.routes.find((r) => r.slug === slug);
  if (entry) {
    const relativePath = path.relative(REPO_ROOT, contentDataPath);
    entry.prerenderMode = "data";
    entry.contentDataPath = relativePath;
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
    console.log(`  Route registry updated: ${slug} -> prerenderMode: "data"`);
  }
}

async function generateStrategyPage(company, researchData, options = {}) {
  console.log(`\nGenerating strategy page for ${company.name}...`);
  console.log(`  Using model: ${STRATEGY_MODEL} via ${OPENAI_BASE_URL}`);

  validateResearchForGeneration(researchData);

  const canonicalInputs = loadCanonicalGenerationInputs(company.slug, company);
  const brief = createOrValidateCanonicalBrief(company, researchData, canonicalInputs);

  const examples = loadExamplePages();
  const components = loadComponentLibrary();
  const systemPrompt = buildSystemPrompt(examples, components, canonicalInputs.docs, brief);
  const keywordAttributionSummary = buildKeywordAttributionSummary(researchData);

  const userPrompt = `Generate a complete strategy page TSX file for this company using the StoryBrand 3-act narrative structure.

CANONICAL LINEAGE (do not break): master reference -> generation contract -> brief -> page
APPROVED BRIEF PATH: ${brief.filePath}
PAGE CONTRACT PATH: ${canonicalInputs.paths.pageContractPath}

COMPANY: ${company.name}
DOMAIN: ${company.domain}
CATEGORY: ${company.category}
INDUSTRY: ${company.industry}

KEYWORD ATTRIBUTION SUMMARY (use if available):
${formatKeywordAttributionSummary(keywordAttributionSummary)}

APPROVED BRIEF CONTENT:
${brief.content}

The component should be named Strategy${pascalCase(company.slug)} and exported as default.
The file will be saved at client/src/pages/strategy/${pascalCase(company.slug)}.tsx

REQUIRED STRUCTURE (StoryBrand 3-Act):
1. Hero + TLDR + Executive Summary (section 00): 4 stacked metric cards + 3 immediate actions inside StrategyHero. Include a "oneLiner" prop with a quantified stat line for the 3-second test (e.g. "14.8M monthly searches. Zero results for XoomAI.").
2. "The Problem" (section 01): ONE section merging current state, competitive gap, AI visibility gap. Use narrativeProse paragraphs for story flow. Include 2-3 prompt observations. Max 2 cards for data.
3. "The Opportunity" (section 02): ONE section merging wedge, right to win, commercial upside. Include PhasedUpsideChart and calculator. Use narrativeProse.
4. "The Plan" (section 03): ONE section merging growth plan, delivery scope, off-site authority, operating model. Open with a 3-step summary via sectionLead, then month blocks, scope blocks, and GrowthTimelineChart.
5. Failure block: data block (not a section) with 3-4 bullets about what happens if they do nothing.
6. Success block: data block (not a section) with 3-4 bullets about what 12 months looks like.
7. CTA: Book a strategy call.
8. Appendix: Supporting evidence using StrategyAppendixSection.

- Use StrategyPageFrame, StrategyHero, StrategySectionShell, StrategyCard, StrategyCTA.
- Hero H1: use a contrast or direct-address formula that makes the stakes obvious to a founder who knows nothing about AI search. Preferred: "Your buyers are searching. They can't find you yet." or "From invisible to the default recommendation." or a quantified gap like "14.8M searches. Zero results for [Company]." NEVER use "[Brand] can own the [category]" — that is agency jargon. Under 10 words. No accent unless very short.
- Make the page 400-700 lines.
- If keyword attribution is available, add breakdown beneath each executive-summary metric card.
- Include "Estimate-only" label at least once.
- Use cumulative traffic progression in charts.
- Translate all operator doctrine to founder language.
- For BTS, frame for serious creators and contrast against Whop.
- Do not fabricate data. Use brief evidence only.

Generate the complete TSX file now.`;

  const tsxContent = await codexRequest(systemPrompt, userPrompt);

  // Clean up markdown fences if model adds them
  let cleaned = tsxContent;
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:tsx|typescript|ts)?\n/, "").replace(/\n```$/, "");
  }

  cleaned = ensureVisibleEstimateOnlyLabel(cleaned);

  validateGeneratedTsx(cleaned);

  // Save the TSX file
  const outDir = path.join(__dirname, "..", "..", "client", "src", "pages", "strategy");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const fileName = `${pascalCase(company.slug)}.tsx`;
  const outPath = path.join(outDir, fileName);
  fs.writeFileSync(outPath, cleaned);
  console.log(`  Strategy page saved to ${outPath}`);

  // Generate content JSON for data-driven rendering
  const contentJsonResult = await generateContentJson(company, researchData, canonicalInputs, brief, cleaned, keywordAttributionSummary);

  const contentDraft = await generateStrategyContentDrafts(
    company,
    researchData,
    canonicalInputs,
    brief,
    cleaned,
    keywordAttributionSummary
  );

  let outboundPack = null;
  if (options.outboundPack) {
    outboundPack = await generateStrategyOutboundPack({
      company,
      researchData,
      brief,
      pageTsxContent: cleaned,
      legacyContentDraftContent: contentDraft.content,
    });
  }

  return {
    fileName,
    componentName: `Strategy${pascalCase(company.slug)}`,
    outPath,
    contentJsonPath: contentJsonResult?.outPath || null,
    contentDraftPath: contentDraft.filePath,
    repoContentDraftPath: contentDraft.repoFilePath,
    outboundPack,
  };
}

function pascalCase(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

module.exports = { generateStrategyPage, pascalCase };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (!args.includes("--slug")) {
    console.log("Usage: node scripts/research-pipeline/generate-strategy.cjs --slug linear [--outbound-pack]");
    process.exit(0);
  }
  const slug = args[args.indexOf("--slug") + 1];
  const outboundPack = args.includes("--outbound-pack");
  const researchPath = path.join(__dirname, "..", "..", "data", "research", `${slug}.json`);
  if (!fs.existsSync(researchPath)) {
    console.error(`Research file not found: ${researchPath}`);
    console.error("Run the research pipeline first.");
    process.exit(1);
  }
  const research = JSON.parse(fs.readFileSync(researchPath, "utf-8"));
  const clientsPath = path.join(__dirname, "..", "..", "data", "dream-clients.json");
  const clients = JSON.parse(fs.readFileSync(clientsPath, "utf-8"));
  const company = clients.find((c) => c.slug === slug);
  if (!company) {
    console.error(`Company "${slug}" not found in dream-clients.json`);
    process.exit(1);
  }
  generateStrategyPage(company, research, { outboundPack }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
