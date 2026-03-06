import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import {
  SectionHeader,
  HighlightBox,
  BulletList,
  DataTable,
  StatsGrid,
  PhasedUpsideChart,
  TamRoiCalculator,
  WorkstreamTimeline,
  StrategySectionLead,
  StrategyAppendixSection,
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyEyebrow,
  StrategyCTA,
} from "@/components/strategy";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  Compass,
  Database,
  Globe,
  Layers3,
  LineChart,
  Link2,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const formatWhole = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const researchData = {
  company: {
    name: "Behind the Scenes",
    domain: "behindthescenes.com",
    category: "Creator Economy / Creator Platform",
    industry: "Creator Economy",
  },
  seoMetrics: {
    organicTraffic: 161.95899342000484,
    organicKeywords: 19,
    backlinks: 27577,
    referringDomains: 880,
    marketsIncluded: ["US", "AU"],
    backlinkMetrics: {
      backlinksSpamScore: 44,
      targetSpamScore: 9,
    },
  },
  tamModel: {
    keywordUniverse: {
      size: 736,
      validatedDemand: 2268640,
      semanticContributionDemandSharePercent: 86.08,
    },
    totals: {
      totalAddressableSearchDemand: 2268640,
      estimatedReachableVisits: {
        low: 3850.34,
        base: 7615.89,
        high: 12664.89,
      },
      byChannel: {
        google: {
          demand: 1951030.4,
          estimatedReachableVisits: {
            low: 3758.56,
            base: 7434.35,
            high: 12363,
          },
        },
        ai: {
          demand: 317609.6,
          estimatedReachableVisits: {
            low: 91.78,
            base: 181.54,
            high: 301.89,
          },
        },
      },
    },
    monthlyTrajectory: [
      { month: 1, label: "M1", low: 115.51, base: 304.64, high: 633.24 },
      { month: 2, label: "M2", low: 154.01, base: 380.79, high: 759.89 },
      { month: 3, label: "M3", low: 192.52, base: 456.95, high: 886.54 },
      { month: 4, label: "M4", low: 231.02, base: 533.11, high: 1013.19 },
      { month: 5, label: "M5", low: 269.52, base: 533.11, high: 1013.19 },
      { month: 6, label: "M6", low: 308.03, base: 609.27, high: 1139.84 },
      { month: 7, label: "M7", low: 308.03, base: 609.27, high: 1139.84 },
      { month: 8, label: "M8", low: 346.53, base: 685.43, high: 1139.84 },
      { month: 9, label: "M9", low: 385.03, base: 685.43, high: 1139.84 },
      { month: 10, label: "M10", low: 423.54, base: 761.59, high: 1266.49 },
      { month: 11, label: "M11", low: 539.05, base: 990.07, high: 1266.49 },
      { month: 12, label: "M12", low: 577.55, base: 1066.22, high: 1266.49 },
    ],
    topOpportunityClusters: [
      {
        cluster: "Category & Brand Demand",
        intent: "TOFU",
        demand: 2228330,
        keywordCount: 513,
        estimatedReachableVisits: { low: 3595.61, base: 7191.22, high: 11985.37 },
        sampleKeywords: ["patreon", "kajabi", "skool", "creator monetization", "creator business platform"],
      },
      {
        cluster: "Buyer Guides",
        intent: "BOFU",
        demand: 26590,
        keywordCount: 94,
        estimatedReachableVisits: { low: 167.76, base: 279.7, high: 447.57 },
        sampleKeywords: ["creator monetization platform", "video creator platform", "creator platform"],
      },
      {
        cluster: "Alternatives & Comparisons",
        intent: "BOFU",
        demand: 8470,
        keywordCount: 117,
        estimatedReachableVisits: { low: 53.73, base: 89.54, high: 143.27 },
        sampleKeywords: ["patreon alternative", "kajabi alternative", "skool alternative", "patreon vs skool"],
      },
    ],
    assumptions: {
      founderReadableSummary: [
        "Google reachable-share assumptions are modeled conservatively rather than presented as raw CTR guarantees.",
        "Capture rates vary by BOFU, MOFU, and TOFU intent because commercial intent converts into visibility at different speeds.",
        "These numbers are planning coefficients, not a claim that the brand will capture the full market immediately.",
      ],
      channelSplit: { google: 0.86, ai: 0.14 },
      modeledReachableShare: { google: 0.12, ai: 0.018 },
      captureRates: {
        BOFU: { low: 0.06, base: 0.1, high: 0.16 },
        MOFU: { low: 0.03, base: 0.06, high: 0.1 },
        TOFU: { low: 0.015, base: 0.03, high: 0.05 },
      },
    },
    revenueModel: {
      enabled: false,
      reason: "Revenue inputs missing (acv/aov). Showing TAM + pipeline potential only.",
      pipelinePotential: {
        leads: {
          low: 15.4,
          base: 68.54,
          high: 189.97,
        },
      },
    },
    confidence: {
      score: 100,
      level: "high",
      reasons: [
        "Sufficient TAM volume identified.",
        "Strong full keyword universe coverage.",
        "Semantic keyword expansion contributed meaningful TAM coverage.",
        "Topical integrity checks passed for the keyword universe.",
        "AI visibility prompts provide directional coverage.",
        "AI visibility sampled across multiple platforms.",
        "Revenue model is estimate-only and missing first-party monetary inputs.",
      ],
    },
  },
  aiVisibility: {
    platformSummary: {
      chatgpt: { mentionRate: 25, total: 16, mentioned: 4, validatedMentions: 4 },
      gemini: { mentionRate: 37.5, total: 16, mentioned: 6, validatedMentions: 6 },
      google_ai_overview: { mentionRate: 0, total: 16, mentioned: 0, validatedMentions: 0 },
    },
    platformAvailability: {
      perplexity: { configured: true, status: "unavailable", reason: "Invalid Path from provider endpoint" },
    },
    competitorEvidence: [
      { name: "Patreon", domain: "patreon.com", queryHits: 21, queryCount: 8 },
      { name: "Kajabi", domain: "kajabi.com", queryHits: 7, queryCount: 4 },
      { name: "Teachable", domain: "teachable.com", queryHits: 5, queryCount: 3 },
      { name: "Circle", domain: "circle.so", queryHits: 2, queryCount: 2 },
      { name: "Skool", domain: "skool.com", queryHits: 0, queryCount: 0 },
    ],
  },
  topicalIntegrity: {
    passed: true,
    metrics: {
      topKeywordCount: 20,
      topicallyRelevantTopKeywordCount: 20,
      lowQualitySemanticDemandSharePercent: 0.01,
      semanticOnlyDemandSharePercent: 8.57,
      ambiguousPromptMentions: 0,
      validatedPromptMentions: 10,
    },
    sampleLowQualitySemanticKeywords: [
      "voices of the void patreon",
      "content creator vs digital creator",
      "alternative sims 4 cc patreon",
      "business profile vs creator profile",
      "digital creator or content creator",
      "alternative to vans old skool",
    ],
  },
  competitors: [
    {
      name: "Behind the Scenes",
      domain: "behindthescenes.com",
      organicTraffic: 161.95899342000484,
      organicKeywords: 19,
      backlinks: 27577,
      referringDomains: 880,
      promptHits: 10,
    },
    {
      name: "Patreon",
      domain: "patreon.com",
      organicTraffic: 4172095.4804578777,
      organicKeywords: 598893,
      backlinks: 454284402,
      referringDomains: 372395,
      promptHits: 21,
    },
    {
      name: "Kajabi",
      domain: "kajabi.com",
      organicTraffic: 79193.97659552284,
      organicKeywords: 17679,
      backlinks: 1529242,
      referringDomains: 40224,
      promptHits: 7,
    },
    {
      name: "Circle",
      domain: "circle.so",
      organicTraffic: 219982.5281981025,
      organicKeywords: 13861,
      backlinks: 1707296,
      referringDomains: 21370,
      promptHits: 2,
    },
    {
      name: "Skool",
      domain: "skool.com",
      organicTraffic: 208627.291008858,
      organicKeywords: 52170,
      backlinks: 6040046,
      referringDomains: 73244,
      promptHits: 0,
    },
    {
      name: "Teachable",
      domain: "teachable.com",
      organicTraffic: 506693.49539815076,
      organicKeywords: 81847,
      backlinks: 15841175,
      referringDomains: 88832,
      promptHits: 5,
    },
  ],
  promptExamples: [
    {
      query: "best creator monetization platform",
      currentPattern: "Patreon repeatedly appears across ChatGPT + Gemini; BTS absent.",
      btsStatus: "Not mentioned",
      implication: "BTS is missing from the highest-value category entry query.",
    },
    {
      query: "behind the scenes creator monetization platform alternatives",
      currentPattern: "BTS is mentioned in ChatGPT + Gemini when query includes brand phrase.",
      btsStatus: "Mentioned",
      implication: "Brand-specific demand exists, but does not transfer to category-generic prompts.",
    },
    {
      query: "behind the scenes creator monetization platform vs competitors",
      currentPattern: "BTS appears in ChatGPT + Gemini; Google AI Overview still does not surface it.",
      btsStatus: "Mixed by platform",
      implication: "Visibility is platform-fragmented; Google AIO remains an open gap.",
    },
  ],
  websiteAudit: {
    title: "Best Creator Platform in 2026 | Earn From Your Content - Behind the Scenes",
    wordCount: 1087,
    internalLinks: 6,
    externalLinks: 9,
    schemaTypes: [],
    timeToInteractiveMs: 1220,
    domCompleteMs: 2710,
  },
};

const executiveActions = [
  "Own one money wedge first: alternatives + comparisons for creators choosing Patreon, Kajabi, and Teachable alternatives.",
  "Publish a compact apex set in 90 days: 12 decision pages, 1 methodology page, and 24 support pages tied to the same entity language.",
  "Install answer-share operations weekly: prompt tracking across ChatGPT, Gemini, and Google AI Overview with explicit win/loss loops.",
];

const wedgePages = [
  "Patreon Alternative for Serious Creators (2026): Data-Backed Comparison",
  "Kajabi Alternative for Membership-Led Creators: Behind the Scenes vs Kajabi",
  "Teachable Alternative for Community + Monetization: Full Breakdown",
  "Behind the Scenes vs Patreon: Fees, Ownership, and Conversion Tradeoffs",
  "Behind the Scenes vs Kajabi: Creator Business Stack Comparison",
  "Creator Monetization Platform Comparison: Which Model Fits Which Creator Stage",
  "Creator Monetization Platform for Startups: What to Pick and Why",
  "How to Choose a Creator Monetization Platform (Without Getting Trapped by Platform Fees)",
  "Skool Alternative for Paid Creator Communities",
  "Creator Membership Platform Checklist (Operator Edition)",
  "Creator Business Platform ROI Framework",
  "BTS Pricing and Monetization Logic Explained (for serious evaluators)",
];

const appendixKeywordRows = [
  ["patreon alternative", "1,860", "Alternatives & Comparisons", "High-intent competitor switch term"],
  ["kajabi alternative", "1,040", "Alternatives & Comparisons", "High commercial intent, high CPC"],
  ["skool alternative", "340", "Alternatives & Comparisons", "Direct community-platform displacement query"],
  ["creator monetization platform", "630", "Buyer Guides", "Core category buying phrase"],
  ["creator subscription platform", "90", "Buyer Guides", "Strong fit with BTS model"],
  ["creator economy platform", "80", "Buyer Guides", "Topical category fit"],
  ["creator platform", "360", "Buyer Guides", "Foundational head term"],
  ["patreon alternatives", "770", "Alternatives & Comparisons", "Plural intent variant with buyer behavior"],
  ["best patreon alternative", "60", "Alternatives & Comparisons", "Evaluation-stage phrase"],
  ["best kajabi alternative", "60", "Alternatives & Comparisons", "High buyer intent variant"],
  ["alternative to patreon", "220", "Alternatives & Comparisons", "Strong switching-intent phrase"],
  ["patreon vs skool", "10", "Alternatives & Comparisons", "Competitive framing opportunity"],
];

const promptEvidenceRows = [
  ["best creator monetization platform", "ChatGPT", "US", "No", "Patreon-led answer pattern"],
  ["best creator monetization platform", "Gemini", "US", "No", "Patreon-led answer pattern"],
  ["best creator monetization platform", "Google AIO", "US", "No", "No BTS citation in AIO sample"],
  ["behind the scenes creator monetization platform alternatives", "ChatGPT", "US", "Yes", "BTS appears on branded query"],
  ["behind the scenes creator monetization platform alternatives", "Gemini", "AU", "Yes", "BTS appears on branded query"],
  ["behind the scenes creator monetization platform alternatives", "Google AIO", "AU", "No", "Snippet sources favor incumbents"],
  ["behind the scenes creator monetization platform vs competitors", "ChatGPT", "AU", "Yes", "BTS acknowledged in comparison framing"],
  ["behind the scenes creator monetization platform vs competitors", "Gemini", "US", "Yes", "BTS appears with competitor mentions"],
  ["behind the scenes creator monetization platform vs competitors", "Google AIO", "US", "No", "No direct BTS inclusion"],
  ["how to choose a creator monetization platform", "Gemini", "US", "Yes", "BTS appears in one market/platform combination"],
  ["creator monetization platform comparison", "ChatGPT", "US", "No", "Generic competitor list"],
  ["creator monetization platform comparison", "Google AIO", "AU", "No", "No BTS in surfaced overview"],
];

const assumptionRows = [
  [
    "Channel split (planning input)",
    "Google 86% / AI 14%",
    "Represents where discovery currently happens across classic and answer-engine paths.",
  ],
  [
    "Modeled reachable-share coefficient",
    "Google 0.12 / AI 0.018",
    "Conservative planning coefficient, not a click-through guarantee.",
  ],
  [
    "Capture rates by intent",
    "BOFU 6–16% / MOFU 3–10% / TOFU 1.5–5%",
    "Commercial intent captured faster than broad informational intent.",
  ],
  [
    "Geography modeled",
    "US + AU",
    "Current TAM and trajectory reflect these two markets only.",
  ],
  [
    "Revenue model state",
    "Disabled",
    "No ACV/AOV + funnel data in payload, so revenue needs client-side calibration.",
  ],
];

export default function StrategyBts2() {
  useEffect(() => {
    document.title = "Behind the Scenes Growth Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  const baseReachableVisits = Math.round(researchData.tamModel.totals.estimatedReachableVisits.base);

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto max-w-[1180px] space-y-8 md:space-y-10">
        <StrategyHero
          eyebrow="Memetik Growth Strategy Memo"
          title="How Behind the Scenes can become a default answer in creator monetization"
          accent="without trying to outspend incumbents"
          subtitle="Founder-facing strategy to win shortlist visibility across Google + answer engines, starting with one wedge and compounding into category authority."
          tags={[
            researchData.company.domain,
            researchData.company.industry,
            researchData.company.category,
            "US + AU",
            "Public strategy memo",
          ]}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard glow="mixed">
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Database className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Validated demand</span>
              </div>
              <div className="text-3xl font-display font-bold text-white">
                {formatWhole(researchData.tamModel.keywordUniverse.validatedDemand)}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/62">Topically validated annual search demand across US + AU.</p>
            </StrategyCard>

            <StrategyCard glow="mixed">
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Search className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Current capture</span>
              </div>
              <div className="text-3xl font-display font-bold text-white">
                {formatWhole(researchData.seoMetrics.organicTraffic)}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/62">Approximate monthly organic traffic today.</p>
            </StrategyCard>

            <StrategyCard glow="mixed">
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Bot className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">AIO visibility</span>
              </div>
              <div className="text-3xl font-display font-bold text-white">
                {formatPercent(researchData.aiVisibility.platformSummary.google_ai_overview.mentionRate)}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/62">Google AI Overview mention rate across tested prompts.</p>
            </StrategyCard>
          </div>
        </StrategyHero>

        <StrategySectionShell glow="blue">
          <SectionHeader number="00" title="Executive Summary" />
          <StrategySectionLead
            takeaway="Behind the Scenes has enough authority and brand signal to win, but it is currently invisible on the highest-value non-branded decision prompts."
            body="Right now, BTS appears when prompts explicitly include its brand phrase, but loses generic category prompts to Patreon, Kajabi, Teachable, and Circle. The path forward is to lock one narrow commercial wedge first, then expand with disciplined monthly execution."
            implication="If you win the alternatives/comparison layer first, you can turn existing brand gravity into durable shortlist share instead of one-off mentions."
          />

          <StatsGrid
            columns={3}
            stats={[
              {
                label: "Validated annual demand (US + AU)",
                value: formatWhole(researchData.tamModel.keywordUniverse.validatedDemand),
                icon: <Target className="h-4 w-4" />,
                note: "Topical integrity checks passed; low-quality semantic contamination is near-zero.",
              },
              {
                label: "Current monthly organic traffic",
                value: formatWhole(researchData.seoMetrics.organicTraffic),
                icon: <TrendingUp className="h-4 w-4" />,
                note: "Current capture is materially below reachable modeled potential.",
              },
              {
                label: "Base modeled reachable visits (12-month run-rate)",
                value: formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base),
                icon: <LineChart className="h-4 w-4" />,
                note: "Conservative modeling across Google and AI surfaces.",
              },
            ]}
          />

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <HighlightBox>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4e4cd]">Immediate actions (next 30 days)</div>
              <BulletList items={executiveActions} />
            </HighlightBox>

            <StrategyCard glow="blue">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4e4cd]">What success looks like by day 90</div>
              <BulletList
                items={[
                  "BTS appears consistently for branded + near-branded alternatives prompts across ChatGPT and Gemini.",
                  "At least 12 high-intent pages shipped and internally linked into a clear decision architecture.",
                  "Weekly answer-share scoreboard running with explicit win/loss and refresh protocol.",
                ]}
              />
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="mixed">
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still drives most commercial discovery, but AI answer engines now shape the shortlist before buyers click."
            body="The operating reality is hybrid: buyers move between classic search and answer engines. They ask broad category questions in AI, validate options in Google, and only click when trust is already formed."
            implication="You do not win by choosing SEO or AEO. You win by making both layers reinforce the same recommendation pattern."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Globe className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Search core remains</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                Google remains a major path for demand capture, especially for commercial research and comparison behavior.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Bot className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Answer layer influence</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                ChatGPT and Gemini increasingly frame first recommendations. If BTS is not named there, shortlist share leaks before site visits.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Layers3 className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Multi-surface requirement</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                Winning requires synchronized assets across your site, review/distribution nodes, and structured entities that models can trust.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="blue">
          <SectionHeader number="02" title="Where Behind the Scenes Is Today" />
          <StrategySectionLead
            takeaway="BTS has trust signals and a meaningful domain footprint, but current discoverability is narrow and mostly brand-led."
            body="The domain carries non-trivial authority, yet only a small keyword footprint is ranking today. Current content wins appear sporadic and not organized around money entities."
            implication="This is not a credibility problem. It is a coverage and structure problem."
          />

          <StatsGrid
            columns={4}
            stats={[
              {
                label: "Organic keywords",
                value: formatWhole(researchData.seoMetrics.organicKeywords),
                icon: <Search className="h-4 w-4" />,
                note: "Very low category coverage for a competitive market.",
              },
              {
                label: "Backlinks",
                value: formatWhole(researchData.seoMetrics.backlinks),
                icon: <Link2 className="h-4 w-4" />,
                note: "Domain already has significant external linkage signal.",
              },
              {
                label: "Referring domains",
                value: formatWhole(researchData.seoMetrics.referringDomains),
                icon: <Compass className="h-4 w-4" />,
                note: "Strong base to support category pages if architecture improves.",
              },
              {
                label: "Schema types detected",
                value: `${researchData.websiteAudit.schemaTypes.length}`,
                icon: <Database className="h-4 w-4" />,
                note: "No visible schema inventory on homepage snapshot.",
              },
            ]}
          />

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <HighlightBox>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Strengths to leverage</div>
              <BulletList
                items={[
                  "Brand phrase already has measurable demand and existing SERP footprint.",
                  "Authority base exists (27,577 backlinks / 880 referring domains).",
                  "Topical integrity checks passed on keyword universe (clean enough for scale play).",
                ]}
              />
            </HighlightBox>

            <StrategyCard>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Primary constraints</div>
              <BulletList
                items={[
                  "Category-level generic prompts still default to incumbents.",
                  "Commercial comparison architecture is too thin for sustained answer-share wins.",
                  "Google AI Overview is currently at 0% mention rate in tested prompt set.",
                ]}
              />
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="mixed">
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionLead
            takeaway="The biggest upside sits in one place: commercial alternatives and comparison intent, then expansion into broader category capture."
            body="Modeled TAM is large, but the practical path is phased. Start where intent is highest, then layer MOFU and TOFU for compounding retrieval density."
            implication="This is a sequencing game. The wrong order burns months; the right order compounds quickly."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {researchData.tamModel.topOpportunityClusters.map((cluster) => (
              <StrategyCard key={cluster.cluster} glow="blue">
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{cluster.cluster}</div>
                <div className="text-2xl font-display font-bold text-white">{formatWhole(cluster.demand)}</div>
                <p className="mt-1 text-xs text-white/52">Demand</p>
                <div className="mt-3 text-sm text-white/68">
                  {formatWhole(cluster.estimatedReachableVisits.base)} base reachable visits
                </div>
                <div className="mt-3 text-xs text-white/48">
                  Sample: {cluster.sampleKeywords.slice(0, 3).join(" · ")}
                </div>
              </StrategyCard>
            ))}
          </div>

          <HighlightBox className="mt-5">
            <p className="text-sm leading-7 text-white/74">
              Topical integrity passed with <span className="text-white font-semibold">20/20 top keywords relevant</span>. Low-quality semantic demand is
              only <span className="text-white font-semibold">0.01%</span>, so this opportunity can be pursued aggressively without polluting strategy with
              off-category noise.
            </p>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell glow="blue">
          <SectionHeader number="04" title="Why Behind the Scenes Can Win" />
          <StrategySectionLead
            takeaway="BTS can win a defined slice by owning the ‘creator business control’ narrative where incumbents are weakest."
            body="Patreon and Kajabi are large, but they are broad. BTS can position around ownership, monetization control, and creator-first economics in direct comparison moments."
            implication="You do not need to beat incumbents everywhere. You need to beat them in one decision frame repeatedly."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Target className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Narrative wedge</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                Position BTS as the platform for creators who want to monetize without surrendering customer relationship ownership.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Authority base</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                Existing referring-domain depth supports faster trust transfer once comparison pages and structured proof assets are live.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Sparkles className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Prompt evidence</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                BTS already appears in branded comparison prompts. That signal can be expanded into non-branded recommendations with deliberate coverage.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="amber">
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="The gap is not subtle: incumbents dominate category visibility while BTS is barely present in organic and answer-layer discovery."
            body="The authority moat is currently held by platforms with larger content and citation footprints. BTS needs to build a focused money-entity layer to narrow that gap where purchase decisions happen."
            implication="Competing at head terms now is inefficient. Attack decision pages first, then let authority compound upward."
          />

          <DataTable
            headers={["Brand", "Organic Traffic", "Organic Keywords", "Backlinks / Ref Domains", "Prompt Hits (48 tests)"]}
            rows={researchData.competitors.map((c) => [
              (
                <div>
                  <div className="font-medium text-white">{c.name}</div>
                  <div className="text-xs text-white/45">{c.domain}</div>
                </div>
              ),
              formatWhole(c.organicTraffic),
              formatWhole(c.organicKeywords),
              `${formatWhole(c.backlinks)} / ${formatWhole(c.referringDomains)}`,
              formatWhole(c.promptHits),
            ])}
            highlightRow={0}
            className="mt-3"
          />
        </StrategySectionShell>

        <StrategySectionShell glow="mixed">
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionLead
            takeaway="BTS is partially visible in ChatGPT and Gemini, but absent in Google AI Overviews across the tested set."
            body="Current pattern shows the brand can be recognized when queries explicitly reference BTS, but generic buying prompts still default to incumbents."
            implication="The job is to convert branded mention pockets into category-level recommendation consistency."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">ChatGPT</div>
              <div className="text-3xl font-display font-bold text-white">
                {formatPercent(researchData.aiVisibility.platformSummary.chatgpt.mentionRate)}
              </div>
              <p className="mt-2 text-sm text-white/62">
                {researchData.aiVisibility.platformSummary.chatgpt.mentioned}/{researchData.aiVisibility.platformSummary.chatgpt.total} prompts mentioned BTS.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Gemini</div>
              <div className="text-3xl font-display font-bold text-white">
                {formatPercent(researchData.aiVisibility.platformSummary.gemini.mentionRate)}
              </div>
              <p className="mt-2 text-sm text-white/62">
                {researchData.aiVisibility.platformSummary.gemini.mentioned}/{researchData.aiVisibility.platformSummary.gemini.total} prompts mentioned BTS.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Google AI Overview</div>
              <div className="text-3xl font-display font-bold text-white">
                {formatPercent(researchData.aiVisibility.platformSummary.google_ai_overview.mentionRate)}
              </div>
              <p className="mt-2 text-sm text-white/62">
                0/{researchData.aiVisibility.platformSummary.google_ai_overview.total} tested prompts mentioned BTS.
              </p>
            </StrategyCard>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {researchData.promptExamples.map((example) => (
              <StrategyCard key={example.query}>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Prompt evidence</div>
                <div className="text-sm font-semibold text-white">{example.query}</div>
                <p className="mt-2 text-sm leading-6 text-white/62">{example.currentPattern}</p>
                <div className="mt-3 text-xs text-white/48">
                  BTS status: <span className="text-white/72">{example.btsStatus}</span>
                </div>
                <div className="mt-1 text-xs text-white/48">{example.implication}</div>
              </StrategyCard>
            ))}
          </div>

          <HighlightBox className="mt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 mt-1 text-[#f4e4cd]" />
              <p className="text-sm leading-7 text-white/72">
                Perplexity endpoint was unavailable in this dataset snapshot, so we treat Perplexity as unmeasured rather than assumed. Operationally, this means
                we should include Perplexity checks in ongoing prompt ops once endpoint coverage is stable.
              </p>
            </div>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell glow="amber">
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionLead
            takeaway="There is clear pipeline leverage if BTS converts visibility gains into decision-page traffic and lead capture."
            body="Base modeled reachable traffic is 7,616 visits on a 12-month run-rate view, with upside to 12,665 under high-case execution. The bigger story is shortlist share: if BTS becomes the recommended answer in more buying moments, paid dependence and CAC pressure can ease over time."
            implication="This is not just traffic upside. It is shortlist control, which compounds into better pipeline efficiency."
          />

          <div className="mb-4 flex flex-wrap gap-3">
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
              estimate-only commercial model
            </div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
              conservative planning coefficients
            </div>
          </div>

          <PhasedUpsideChart
            points={researchData.tamModel.monthlyTrajectory.map((point) => ({
              label: point.label,
              low: Math.round(point.low),
              base: Math.round(point.base),
              high: Math.round(point.high),
            }))}
          />

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Modeled reachable visits (base)</div>
              <div className="mt-2 text-3xl font-display font-bold text-white">
                {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base)}
              </div>
              <p className="mt-2 text-sm text-white/62">12-month planning horizon.</p>
            </StrategyCard>

            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Pipeline potential (base leads)</div>
              <div className="mt-2 text-3xl font-display font-bold text-white">
                {formatWhole(researchData.tamModel.revenueModel.pipelinePotential.leads.base)}
              </div>
              <p className="mt-2 text-sm text-white/62">Estimate based on modeled visitor-to-lead assumptions.</p>
            </StrategyCard>

            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Pipeline potential (high leads)</div>
              <div className="mt-2 text-3xl font-display font-bold text-white">
                {formatWhole(researchData.tamModel.revenueModel.pipelinePotential.leads.high)}
              </div>
              <p className="mt-2 text-sm text-white/62">Requires sustained execution + conversion alignment.</p>
            </StrategyCard>
          </div>

          <HighlightBox className="mt-5">
            <p className="text-sm leading-7 text-white/74">
              Revenue planning requires client ACV/AOV and funnel inputs. This model is useful for directional planning and prioritization, not booked-revenue
              forecasting.
            </p>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell glow="blue">
          <SectionHeader number="08" title="90-day Wedge" />
          <StrategySectionLead
            takeaway="First wedge: alternatives + comparison intent around Patreon, Kajabi, and Teachable."
            body="The first 90 days should avoid broad thought-leadership sprawl. Focus on high-buying-intent entities where recommendation order matters, and ship enough depth for answer engines to trust recurring citations."
            implication="One clear wedge won deeply beats ten shallow content themes."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <StrategyCard glow="mixed">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">First category/entity wedge</div>
              <p className="text-sm leading-6 text-white/68">
                “Creator monetization platform alternatives” with explicit side-by-side comparisons focused on ownership, fees, community leverage, and creator
                business control.
              </p>
            </StrategyCard>

            <StrategyCard glow="mixed">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">First competitors to attack</div>
              <BulletList items={["Patreon (primary demand owner)", "Kajabi (high-CPC commercial comparisons)", "Teachable (education-commerce overlap)", "Circle (community-led creator infra)"]} />
            </StrategyCard>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <StrategyCard>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">First prompts to win</div>
              <BulletList
                items={[
                  "best creator monetization platform",
                  "creator monetization platform comparison",
                  "best creator monetization platform for startups",
                  "behind the scenes creator monetization platform alternatives",
                  "behind the scenes creator monetization platform vs competitors",
                ]}
              />
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">First pages to ship (12)</div>
              <BulletList items={wedgePages.slice(0, 6)} />
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="mixed">
          <SectionHeader number="09" title="Operating Model" />
          <StrategySectionLead
            takeaway="Run this as a concurrent operating system, not a one-time content sprint."
            body="All tracks should run from month one: money-page shipping, workflow proof, authority/distribution, and prompt operations. Waiting to sequence these linearly slows compounding."
            implication="The moat comes from cadence and reinforcement, not single-asset quality alone."
          />

          <WorkstreamTimeline
            months={researchData.tamModel.monthlyTrajectory.map((month) => month.label)}
            tracks={[
              {
                name: "Money entity capture",
                description: "Build and refresh alternatives/comparison assets every month.",
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
                description: "How-to and adoption proof content for trust transfer.",
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
                description: "External reinforcement for recommendation trust.",
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
                description: "Weekly answer-share testing and iteration loop.",
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
            ]}
          />
        </StrategySectionShell>

        <StrategySectionShell glow="amber">
          <SectionHeader number="10" title="Why Memetik" />
          <StrategySectionLead
            takeaway="This is exactly the kind of market where Memetik is most useful: high-intent competition, fragmented answer visibility, and clear wedge potential."
            body="Memetik runs AEO + SEO as one operating system. That means we do not just publish pages; we map money entities, ship winning structures, reinforce authority nodes, and monitor answer share weekly."
            implication="You get a growth channel with compounding memory, not a content quota."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Swords className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Competitive-first</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                We prioritize entities where competitor recommendation patterns are strongest and most commercial.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Workflow className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Operator cadence</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                Weekly shipping + weekly prompt testing + monthly recalibration to keep momentum and defend gains.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-2 flex items-center gap-2 text-[#f4e4cd]">
                <Users className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Founder reporting</span>
              </div>
              <p className="text-sm leading-6 text-white/68">
                We translate answer visibility into pipeline language so leadership can make fast budget decisions.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Book Strategy Call"
          title="If this wedge is directionally right, we can operationalize it fast."
          body="We’ll validate the first entity map, lock the first 90-day ship list, and build a weekly answer-share operating cadence with your team."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book Strategy Call"
        />

        <StrategySectionShell className="mt-14 md:mt-16" glow="blue">
          <SectionHeader number="11" title="Appendix / Supporting Evidence" />
          <StrategySectionLead
            takeaway="Detailed research evidence, assumptions, and modeling context."
            body="Main memo stays founder-readable. The sections below provide supporting depth for growth and SEO operators."
          />

          <div className="space-y-4">
            <StrategyAppendixSection
              defaultOpen
              title="Keyword universe, topical integrity, and quality guardrails"
              description="Only validated, category-relevant opportunities are emphasized. Excluded/low-quality semantic terms are intentionally de-prioritized."
            >
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Keyword universe</div>
                  <div className="mt-2 text-2xl font-display font-bold text-white">
                    {formatWhole(researchData.tamModel.keywordUniverse.size)}
                  </div>
                  <p className="mt-1 text-xs text-white/52">Validated keywords in model.</p>
                </StrategyCard>
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Top keywords relevant</div>
                  <div className="mt-2 text-2xl font-display font-bold text-white">
                    {researchData.topicalIntegrity.metrics.topicallyRelevantTopKeywordCount}/
                    {researchData.topicalIntegrity.metrics.topKeywordCount}
                  </div>
                  <p className="mt-1 text-xs text-white/52">Topical integrity passed.</p>
                </StrategyCard>
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Low-quality semantic share</div>
                  <div className="mt-2 text-2xl font-display font-bold text-white">
                    {researchData.topicalIntegrity.metrics.lowQualitySemanticDemandSharePercent}%
                  </div>
                  <p className="mt-1 text-xs text-white/52">Kept out of headline planning.</p>
                </StrategyCard>
              </div>

              <DataTable
                headers={["Keyword", "Volume", "Cluster", "Why it matters"]}
                rows={appendixKeywordRows}
                tableClassName="[&_th:nth-child(1)]:w-[30%] [&_th:nth-child(2)]:w-[12%] [&_th:nth-child(3)]:w-[22%] [&_th:nth-child(4)]:w-[36%]"
              />

              <div className="mt-4">
                <div className="mb-2 text-xs font-mono uppercase tracking-[0.18em] text-white/45">Sample low-quality semantic terms (de-prioritized)</div>
                <BulletList items={researchData.topicalIntegrity.sampleLowQualitySemanticKeywords} />
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Detailed competitor evidence (SEO + authority + prompt presence)"
              description="Backlink/ref-domain values and organic footprint pulled directly from research payload."
            >
              <DataTable
                headers={["Company", "Organic Traffic", "Organic Keywords", "Backlinks", "Ref Domains", "Prompt Hits"]}
                rows={researchData.competitors.map((c) => [
                  `${c.name} (${c.domain})`,
                  formatWhole(c.organicTraffic),
                  formatWhole(c.organicKeywords),
                  formatWhole(c.backlinks),
                  formatWhole(c.referringDomains),
                  formatWhole(c.promptHits),
                ])}
                highlightRow={0}
                tableClassName="[&_th:nth-child(1)]:w-[28%] [&_th:nth-child(2)]:w-[14%] [&_th:nth-child(3)]:w-[14%] [&_th:nth-child(4)]:w-[14%] [&_th:nth-child(5)]:w-[14%] [&_th:nth-child(6)]:w-[16%]"
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Prompt evidence sample (cross-platform)"
              description="Representative prompt outcomes from ChatGPT, Gemini, and Google AI Overview tests."
            >
              <DataTable
                headers={["Prompt", "Platform", "Market", "BTS mentioned", "Observed pattern"]}
                rows={promptEvidenceRows}
                tableClassName="[&_th:nth-child(1)]:w-[30%] [&_th:nth-child(2)]:w-[14%] [&_th:nth-child(3)]:w-[10%] [&_th:nth-child(4)]:w-[12%] [&_th:nth-child(5)]:w-[34%]"
              />
              <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
                Perplexity was unavailable in this snapshot due endpoint-level path error, so it is tracked as a data availability issue rather than a visibility conclusion.
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Model assumptions, confidence, and calibration constraints"
              description="Conservative planning framework used for trajectory and reachable-demand estimates."
            >
              <DataTable
                headers={["Assumption area", "Value", "Interpretation"]}
                rows={assumptionRows}
                tableClassName="[&_th:nth-child(1)]:w-[26%] [&_th:nth-child(2)]:w-[24%] [&_th:nth-child(3)]:w-[50%]"
              />

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <StrategyCard>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Founder-readable assumptions</div>
                  <BulletList items={researchData.tamModel.assumptions.founderReadableSummary} />
                </StrategyCard>

                <StrategyCard>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Confidence ({researchData.tamModel.confidence.level})
                  </div>
                  <BulletList items={researchData.tamModel.confidence.reasons} />
                </StrategyCard>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Technical snapshot and on-page readiness"
              description="Current page state from audit payload. Useful for implementation planning."
            >
              <DataTable
                headers={["Signal", "Current state"]}
                rows={[
                  ["Title", researchData.websiteAudit.title],
                  ["Word count", formatWhole(researchData.websiteAudit.wordCount)],
                  ["Internal links", formatWhole(researchData.websiteAudit.internalLinks)],
                  ["External links", formatWhole(researchData.websiteAudit.externalLinks)],
                  ["Schema types detected", researchData.websiteAudit.schemaTypes.length ? researchData.websiteAudit.schemaTypes.join(", ") : "None detected in snapshot"],
                  ["Time to interactive", `${formatWhole(researchData.websiteAudit.timeToInteractiveMs)} ms`],
                  ["DOM complete", `${formatWhole(researchData.websiteAudit.domCompleteMs)} ms`],
                  ["Backlink spam score (domain-level)", `${researchData.seoMetrics.backlinkMetrics.backlinksSpamScore}`],
                  ["Target spam score", `${researchData.seoMetrics.backlinkMetrics.targetSpamScore}`],
                ]}
                tableClassName="[&_th:nth-child(1)]:w-[30%] [&_th:nth-child(2)]:w-[70%]"
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="TAM × LTV scenario calculator"
              description="Use first-party economics to translate reachable demand into revenue scenarios."
            >
              <TamRoiCalculator
                baseReachableVisits={baseReachableVisits}
                defaultLtv={0}
                defaultVisitToCustomerRate={0.01}
              />
            </StrategyAppendixSection>
          </div>
        </StrategySectionShell>
      </div>
    </StrategyPageFrame>
  );
}

function Workflow({ className = "" }: { className?: string }) {
  return <BarChart3 className={className} />;
}