import { useEffect } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bot,
  Brain,
  Building2,
  CheckCircle2,
  Compass,
  Database,
  Gauge,
  Globe,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import {
  BulletList,
  DataTable,
  HighlightBox,
  PhasedUpsideChart,
  SectionHeader,
  StatsGrid,
  StrategyCTA,
  StrategyCard,
  StrategyEyebrow,
  StrategyHero,
  StrategyPageFrame,
  StrategySectionShell,
  TamRoiCalculator,
  WorkstreamTimeline,
} from "@/components/strategy";

const formatWhole = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));

const formatOne = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const researchData = {
  company: {
    name: "Behind the Scenes",
    domain: "behindthescenes.com",
    category: "Creator Economy / Creator Platform",
    industry: "Creator Economy",
    markets: ["US", "AU"],
  },
  seoMetrics: {
    organicTraffic: 161.95899342000484,
    organicKeywords: 19,
    backlinks: 27577,
    referringDomains: 880,
    backlinkMetrics: {
      backlinks: 27577,
      referringDomains: 880,
      backlinksSpamScore: 44,
      targetSpamScore: 9,
      firstSeen: "2020-07-06 08:57:01 +00:00",
    },
  },
  qualityGate: {
    passed: true,
    mode: "strict",
    metrics: {
      competitors: 5,
      keywords: 18,
      keywordUniverse: 736,
      prompts: 48,
      aiPlatformsWithSamples: 3,
      hasOnPage: true,
      hasTam: true,
      topicalIntegrityPassed: true,
    },
  },
  topicalIntegrity: {
    passed: true,
    metrics: {
      semanticOnlyDemandSharePercent: 8.57,
      lowQualitySemanticDemandSharePercent: 0.01,
      ambiguousPromptMentions: 0,
      validatedPromptMentions: 10,
      topicallyRelevantTopKeywordCount: 20,
      topKeywordCount: 20,
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
  meta: {
    payloadConfidence: { score: 100, level: "high" as const },
    issues: [
      {
        step: "ai_platform_probe_perplexity",
        error: "[/v3/ai_optimization/perplexity/llm_scraper/live/advanced] Task status 40402: Invalid Path.",
      },
      {
        step: "ai_mentions",
        error: "[/v3/ai_optimization/llm_mentions/live] DataForSEO status 40400: Not Found.",
      },
    ],
  },
  aiVisibility: {
    promptsAnalyzed: 48,
    clientMentionedPrompts: 10,
    platformSummary: {
      chatgpt: { total: 16, mentioned: 4, mentionRate: 25 },
      gemini: { total: 16, mentioned: 6, mentionRate: 37.5 },
      google_ai_overview: { total: 16, mentioned: 0, mentionRate: 0 },
    },
    platformAvailability: {
      chatgpt: { status: "available" },
      gemini: { status: "available" },
      perplexity: {
        status: "unavailable",
        reason: "[/v3/ai_optimization/perplexity/llm_scraper/live/advanced] Task status 40402: Invalid Path.",
      },
      google_ai_overview: { status: "available_via_serp" },
    },
  },
  competitors: [
    {
      name: "Patreon",
      domain: "patreon.com",
      organicTraffic: 4172095.4804578777,
      organicKeywords: 598893,
      backlinks: 454284402,
      referringDomains: 372395,
      promptQueryHits: 21,
      promptQueryCount: 8,
    },
    {
      name: "Circle",
      domain: "circle.so",
      organicTraffic: 219982.5281981025,
      organicKeywords: 13861,
      backlinks: 1707296,
      referringDomains: 21370,
      promptQueryHits: 2,
      promptQueryCount: 2,
    },
    {
      name: "Kajabi",
      domain: "kajabi.com",
      organicTraffic: 79193.97659552284,
      organicKeywords: 17679,
      backlinks: 1529242,
      referringDomains: 40224,
      promptQueryHits: 7,
      promptQueryCount: 4,
    },
    {
      name: "Teachable",
      domain: "teachable.com",
      organicTraffic: 506693.49539815076,
      organicKeywords: 81847,
      backlinks: 15841175,
      referringDomains: 88832,
      promptQueryHits: 5,
      promptQueryCount: 3,
    },
    {
      name: "Skool",
      domain: "skool.com",
      organicTraffic: 208627.291008858,
      organicKeywords: 52170,
      backlinks: 6040046,
      referringDomains: 73244,
      promptQueryHits: 0,
      promptQueryCount: 0,
    },
  ],
  tamModel: {
    estimateOnly: true,
    keywordUniverse: {
      size: 736,
      validatedDemand: 2268640,
      anchorMatchedCount: 137,
      countsByIntent: { TOFU: 240, MOFU: 276, BOFU: 220 },
      countsBySource: {
        competitor_keywords: 19,
        semantic_expansion: 702,
        target_ranked_keywords: 18,
      },
    },
    totals: {
      totalAddressableSearchDemand: 2268640,
      estimatedReachableVisits: { low: 3850.34, base: 7615.89, high: 12664.89 },
      byChannel: {
        google: {
          demand: 1951030.4,
          estimatedReachableVisits: { low: 3758.56, base: 7434.35, high: 12363 },
        },
        ai: {
          demand: 317609.6,
          estimatedReachableVisits: { low: 91.78, base: 181.54, high: 301.89 },
        },
      },
    },
    byIntent: [
      {
        intent: "BOFU",
        demand: 40100,
        keywordCount: 220,
        estimatedReachableVisits: { low: 254.36, base: 423.94, high: 678.3 },
      },
      {
        intent: "MOFU",
        demand: 39070,
        keywordCount: 276,
        estimatedReachableVisits: { low: 123.91, base: 247.83, high: 413.05 },
      },
      {
        intent: "TOFU",
        demand: 2189470,
        keywordCount: 240,
        estimatedReachableVisits: { low: 3472.06, base: 6944.12, high: 11573.54 },
      },
    ],
    topOpportunityClusters: [
      {
        cluster: "Category & Brand Demand",
        intent: "TOFU",
        demand: 2228330,
        keywordCount: 513,
        estimatedReachableVisits: { low: 3595.61, base: 7191.22, high: 11985.37 },
        sampleKeywords: ["patreon", "kajabi", "skool", "teachable", "creator monetization", "behind the scenes"],
      },
      {
        cluster: "Buyer Guides",
        intent: "BOFU",
        demand: 26590,
        keywordCount: 94,
        estimatedReachableVisits: { low: 167.76, base: 279.7, high: 447.57 },
        sampleKeywords: [
          "creator monetization platform",
          "content creator platform",
          "creator economy platform",
          "creator subscription platform",
        ],
      },
      {
        cluster: "Alternatives & Comparisons",
        intent: "BOFU",
        demand: 8470,
        keywordCount: 117,
        estimatedReachableVisits: { low: 53.73, base: 89.54, high: 143.27 },
        sampleKeywords: ["patreon alternative", "kajabi alternative", "skool alternative", "patreon vs skool"],
      },
      {
        cluster: "Pricing & Cost",
        intent: "BOFU",
        demand: 4910,
        keywordCount: 3,
        estimatedReachableVisits: { low: 31.15, base: 51.91, high: 83.05 },
        sampleKeywords: ["kajabi pricing", "skool pricing", "patreon cost"],
      },
    ],
    assumptions: {
      founderReadableSummary: [
        "Google reachable-share assumptions are modeled conservatively rather than presented as raw CTR guarantees.",
        "Capture rates vary by BOFU, MOFU, and TOFU intent because commercial intent converts into visibility at different speeds.",
        "These are planning coefficients, not a claim that the brand will capture the full market immediately.",
      ],
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
    executionBlueprint: {
      months: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"],
      tracks: [
        {
          name: "Money entity capture",
          description: "BOFU pages for alternatives, comparisons, pricing, and creator-platform buyer guides.",
          cells: [
            { label: "Prioritize", tone: "high" as const },
            { label: "Build", tone: "high" as const },
            { label: "Ship", tone: "high" as const },
            { label: "Ship", tone: "high" as const },
            { label: "Expand", tone: "base" as const },
            { label: "Expand", tone: "base" as const },
            { label: "Refresh", tone: "base" as const },
            { label: "Refresh", tone: "base" as const },
            { label: "Refresh", tone: "base" as const },
            { label: "Defend", tone: "base" as const },
            { label: "Defend", tone: "base" as const },
            { label: "Defend", tone: "base" as const },
          ],
        },
        {
          name: "Workflow + implementation layer",
          description: "How-to and implementation content mapped to creator monetization operations.",
          cells: [
            { label: "Map", tone: "high" as const },
            { label: "Implement", tone: "high" as const },
            { label: "Instrument", tone: "base" as const },
            { label: "Ship", tone: "base" as const },
            { label: "Expand", tone: "base" as const },
            { label: "Expand", tone: "base" as const },
            { label: "Proof", tone: "base" as const },
            { label: "Proof", tone: "base" as const },
            { label: "Optimize", tone: "base" as const },
            { label: "Optimize", tone: "base" as const },
            { label: "Scale", tone: "base" as const },
            { label: "Scale", tone: "base" as const },
          ],
        },
        {
          name: "Authority + distribution",
          description: "Third-party placements, review surfaces, founder bylines, and AI-citation trust signals.",
          cells: [
            { label: "Seed", tone: "high" as const },
            { label: "Seed", tone: "high" as const },
            { label: "Launch", tone: "base" as const },
            { label: "Distribute", tone: "base" as const },
            { label: "Distribute", tone: "base" as const },
            { label: "Expand", tone: "base" as const },
            { label: "Expand", tone: "base" as const },
            { label: "Refresh", tone: "base" as const },
            { label: "Refresh", tone: "base" as const },
            { label: "Scale", tone: "base" as const },
            { label: "Scale", tone: "base" as const },
            { label: "Defend", tone: "base" as const },
          ],
        },
        {
          name: "Measurement + prompt ops",
          description: "Prompt testing, answer-share tracking, and competitor movement every month from day one.",
          cells: [
            { label: "Baseline", tone: "high" as const },
            { label: "Track", tone: "high" as const },
            { label: "Tune", tone: "base" as const },
            { label: "Tune", tone: "base" as const },
            { label: "Report", tone: "base" as const },
            { label: "Tune", tone: "base" as const },
            { label: "Report", tone: "base" as const },
            { label: "Tune", tone: "base" as const },
            { label: "Report", tone: "base" as const },
            { label: "Tune", tone: "base" as const },
            { label: "Report", tone: "base" as const },
            { label: "Systemize", tone: "base" as const },
          ],
        },
      ],
    },
    revenueModel: {
      enabled: false,
      pipelinePotential: {
        leads: { low: 15.4, base: 68.54, high: 189.97 },
      },
    },
    confidence: {
      score: 100,
      level: "high",
      reasons: [
        "Sufficient TAM volume identified.",
        "Strong full keyword universe coverage.",
        "Topical integrity checks passed for the keyword universe.",
        "AI visibility prompts provide directional coverage.",
        "Revenue model is estimate-only and missing first-party monetary inputs.",
      ],
    },
  },
};

const bofuRows = [
  ["patreon alternative", "1,860", "Alternatives & Comparisons", "High intent, direct replacement demand"],
  ["kajabi alternative", "1,040", "Alternatives & Comparisons", "High-CPC problem-aware buyers"],
  ["skool alternative", "340", "Alternatives & Comparisons", "Switch-intent from cohort/course creators"],
  ["creator monetization platform", "630", "Buyer Guides", "Core category commercial term"],
  ["content creator platform", "430", "Buyer Guides", "Cross-format monetization query"],
  ["creator subscription platform", "90", "Buyer Guides", "Recurring revenue-specific intent"],
  ["kajabi pricing", "3,290", "Pricing & Cost", "Price-sensitive high-conversion traffic"],
  ["skool pricing", "1,600", "Pricing & Cost", "Commercial comparison and switching catalyst"],
  ["patreon alternatives", "770", "Alternatives & Comparisons", "Plural variant with broad buyer intent"],
];

const mofuRows = [
  ["creator monetization", "260", "Category Evaluation", "General monetization research before tool choice"],
  ["patreon membership", "12,690", "Feature / Model Research", "Membership mechanics and offer design"],
  ["creator subscription", "10", "Operational Discovery", "Early framework / stack planning"],
  ["creator subscription platform (variants)", "90", "Platform Research", "Recurring revenue stack comparison"],
  ["twitch monetization", "8,100", "Model Research", "Monetization mechanics benchmarking"],
  ["subscription finder", "720", "Offer Exploration", "Users testing subscription models"],
  ["api monetization", "270", "Technical Evaluation", "Platform extensibility interest"],
  ["content monetization", "50", "Education & Awareness", "Problem framing before vendor shortlist"],
];

const tofuRows = [
  ["patreon", "1,401,000", "Category & Brand Demand", "Incumbent brand gravity in this category"],
  ["kajabi", "217,800", "Category & Brand Demand", "Strong creator business mindshare"],
  ["skool", "139,600", "Category & Brand Demand", "Community-first creator stack demand"],
  ["teachable", "27,100", "Category & Brand Demand", "Course-creator awareness layer"],
  ["behind the scenes", "20,000", "Brand / Term Ambiguity", "Mixed-intent term; needs disambiguation"],
  ["behind scenes", "18,100", "Brand / Term Ambiguity", "Surface-level awareness but low commercial clarity"],
  ["behind-the-scenes", "18,100", "Brand / Term Ambiguity", "Hyphenated variation still mostly non-commercial"],
  ["ugc creator", "22,200", "Creator Economy Context", "Audience-adjacent awareness for entry content"],
];

const platformCards = [
  {
    key: "chatgpt",
    label: "ChatGPT",
    mentionRate: researchData.aiVisibility.platformSummary.chatgpt.mentionRate,
    mentioned: researchData.aiVisibility.platformSummary.chatgpt.mentioned,
    total: researchData.aiVisibility.platformSummary.chatgpt.total,
    status: researchData.aiVisibility.platformAvailability.chatgpt.status,
    implication: "Present but inconsistent. BTS appears in targeted BTS-branded prompts, weak in generic category prompts.",
  },
  {
    key: "gemini",
    label: "Gemini",
    mentionRate: researchData.aiVisibility.platformSummary.gemini.mentionRate,
    mentioned: researchData.aiVisibility.platformSummary.gemini.mentioned,
    total: researchData.aiVisibility.platformSummary.gemini.total,
    status: researchData.aiVisibility.platformAvailability.gemini.status,
    implication: "Current strongest LLM surface, but still below category-leader density.",
  },
  {
    key: "google_ai_overview",
    label: "Google AI Overviews",
    mentionRate: researchData.aiVisibility.platformSummary.google_ai_overview.mentionRate,
    mentioned: researchData.aiVisibility.platformSummary.google_ai_overview.mentioned,
    total: researchData.aiVisibility.platformSummary.google_ai_overview.total,
    status: researchData.aiVisibility.platformAvailability.google_ai_overview.status,
    implication: "Critical gap: zero mentions where competitors like Circle, Kajabi, Patreon, and Teachable appear.",
  },
  {
    key: "perplexity",
    label: "Perplexity",
    mentionRate: 0,
    mentioned: 0,
    total: 0,
    status: researchData.aiVisibility.platformAvailability.perplexity.status,
    implication: "Unavailable in this payload. Keep visible as a known blindspot, not an ignored channel.",
    unavailableReason: researchData.aiVisibility.platformAvailability.perplexity.reason,
  },
];

const decisions = [
  {
    title: "Own alternatives/comparisons now, not later",
    why: "Category incumbents dominate generic prompts. BTS wins fastest by owning comparison and alternative intent where buyers are open to switching.",
    action:
      "Ship and rank a full alternatives/comparison stack (Patreon, Kajabi, Skool, Teachable) with explicit verdicts, proof, and schema.",
  },
  {
    title: "Fix Google AI Overview invisibility in parallel with classic SEO",
    why: "Google still drives most commercial discovery, and AI Overviews inherit from top organic visibility patterns.",
    action:
      "Prioritize top-10 capable pages for core commercial entities, technical indexing health, and snippet-friendly answer blocks.",
  },
  {
    title: "Run AEO as an operating system, not a one-time content sprint",
    why: "Answer share compounds through monthly refresh, external citations, and prompt iteration loops.",
    action:
      "Adopt monthly workstreams from month 1: money pages, authority distribution, and prompt instrumentation shipped concurrently.",
  },
];

export default function StrategyBts2() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Behind the Scenes — AEO & SEO Growth Strategy | MEMETIK";
  }, []);

  const monthlyPoints = researchData.tamModel.monthlyTrajectory.map((point) => ({
    month: point.month,
    label: point.label,
    low: Math.round(point.low),
    base: Math.round(point.base),
    high: Math.round(point.high),
  }));

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto w-full max-w-6xl">
        <StrategyHero
          eyebrow={
            <>
              <Globe className="h-3.5 w-3.5" />
              Strategy Document • March 2026
            </>
          }
          title="Behind the Scenes"
          accent="AEO + SEO Category Capture Plan"
          subtitle="How Behind the Scenes can move from occasional LLM mention to category-default recommendation while compounding classic search demand capture across US and AU."
          tags={[
            researchData.company.domain,
            researchData.company.industry,
            "US + AU",
            "Creator Monetization Platform",
            "Public Strategy",
          ]}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard glow="amber">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Validated 12-month TAM</div>
              <div className="mt-3 text-4xl font-display font-bold text-white">
                {formatWhole(researchData.tamModel.totals.totalAddressableSearchDemand)}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Topically validated demand in the current keyword universe. Headline excludes excluded/ambiguous clusters.
              </p>
            </StrategyCard>
            <StrategyCard glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Modeled reachable visits (base)</div>
              <div className="mt-3 text-4xl font-display font-bold text-white">
                {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base)}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Conservative modeled reachable share across Google + AI surfaces over a 12-month operating window.
              </p>
            </StrategyCard>
            <StrategyCard glow="mixed">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Validated LLM mentions</div>
              <div className="mt-3 text-4xl font-display font-bold text-white">
                {researchData.aiVisibility.clientMentionedPrompts}/{researchData.aiVisibility.promptsAnalyzed}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Mentioned in 10 of 48 tested prompts. Visible in chat interfaces, absent in Google AI Overviews.
              </p>
            </StrategyCard>
          </div>
        </StrategyHero>

        <StrategySectionShell glow="mixed" className="mb-16">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <StrategyEyebrow>Executive Summary</StrategyEyebrow>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
              Founder Readout
            </div>
          </div>

          <div className="mb-6">
            <StatsGrid
              columns={3}
              stats={[
                {
                  label: "Base Reachable Opportunity",
                  value: formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base),
                  icon: <TrendingUp className="h-5 w-5" />,
                  note: "Modeled 12-month reachable visits across Google + AI surfaces.",
                },
                {
                  label: "AI Mention Coverage",
                  value: `${researchData.aiVisibility.clientMentionedPrompts}/${researchData.aiVisibility.promptsAnalyzed}`,
                  icon: <Bot className="h-5 w-5" />,
                  note: "Strongest in Gemini; zero in Google AI Overviews across sampled prompts.",
                },
                {
                  label: "Competitive Visibility Gap",
                  value: "0%",
                  icon: <AlertTriangle className="h-5 w-5" />,
                  note: "Google AI Overview mention rate for BTS in sampled prompts.",
                },
              ]}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <h3 className="mb-3 text-sm font-semibold text-white">Immediate Action 1</h3>
              <p className="text-sm leading-6 text-white/65">
                Ship high-intent alternatives/comparison pages (Patreon, Kajabi, Skool, Teachable) with direct verdicts and FAQ schema.
              </p>
            </StrategyCard>
            <StrategyCard>
              <h3 className="mb-3 text-sm font-semibold text-white">Immediate Action 2</h3>
              <p className="text-sm leading-6 text-white/65">
                Build Google AI Overview eligibility: snippet-first answer blocks, entity consistency, and top-10 capable commercial pages.
              </p>
            </StrategyCard>
            <StrategyCard>
              <h3 className="mb-3 text-sm font-semibold text-white">Immediate Action 3</h3>
              <p className="text-sm leading-6 text-white/65">
                Launch monthly prompt operations and authority distribution in month 1 so answer share improves while rankings climb.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <section className="mb-16">
          <SectionHeader number="00" title="State of Search 2026" />
          <StrategySectionShell>
            <div className="grid gap-6 md:grid-cols-2">
              <StrategyCard glow="blue">
                <h3 className="mb-4 text-xl font-display font-bold text-white">What changed</h3>
                <BulletList
                  items={[
                    "Google still drives a major share of discovery and commercial research traffic in creator economy categories.",
                    "Traditional search remains a core buyer behavior, especially for alternatives, pricing, and implementation questions.",
                    "AI answer engines are changing shortlist formation before website visits happen.",
                    "Buyers now move across Google, ChatGPT, Gemini, and other answer layers before ever talking to sales.",
                    "Winning brands must be present across both classic search demand capture and AI recommendation surfaces.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard glow="amber">
                <h3 className="mb-4 text-xl font-display font-bold text-white">Founder implication</h3>
                <p className="text-sm leading-7 text-white/68">
                  This is no longer an SEO-only game and it is not an AI-only game either. It is a cross-surface visibility game.
                  Right now BTS has a meaningful product story, real backlink depth, and early LLM mention presence — but is still
                  underrepresented in the exact high-intent prompts that create shortlist pressure. The execution model below is
                  designed to convert that gap into pipeline leverage over the next 12 months.
                </p>
                <div className="mt-5 rounded-[20px] border border-white/10 bg-black/25 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">What to do next</div>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    Treat AEO + SEO as one operating system: commercial content coverage, authority distribution, and prompt
                    instrumentation running every month from day one.
                  </p>
                </div>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="01" title="Why This Matters Now" />
          <HighlightBox>
            <p className="text-xl font-display font-semibold tracking-tight text-white md:text-3xl">
              BTS is already in the conversation in some LLM responses, but not yet the default recommendation where buyer intent is
              highest.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/68">
              The window is attractive: category incumbents own broad awareness, but their recommendation footprint is not perfectly
              locked across every use case. That creates an asymmetric opportunity for BTS to win comparison-driven demand and expand
              into category-default prompts before a late-stage land-grab makes displacement expensive.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-16">
          <SectionHeader number="02" title="Cost of Inaction" />
          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard className="h-full">
              <div className="mb-3 flex text-[#f4e4cd]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">Shortlist loss compounds quietly</h3>
              <p className="text-sm leading-6 text-white/62">
                If BTS is absent in high-intent alternatives/comparison prompts, buyers will shortlist incumbents before reaching your
                funnel.
              </p>
            </StrategyCard>
            <StrategyCard className="h-full">
              <div className="mb-3 flex text-[#f4e4cd]">
                <Gauge className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">CAC pressure increases</h3>
              <p className="text-sm leading-6 text-white/62">
                Paid acquisition has to work harder when organic and answer-engine share do not absorb early research demand.
              </p>
            </StrategyCard>
            <StrategyCard className="h-full">
              <div className="mb-3 flex text-[#f4e4cd]">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">Category authority shifts to competitors</h3>
              <p className="text-sm leading-6 text-white/62">
                The longer incumbents are repeatedly cited, the harder it becomes to rewrite model memory and market perception.
              </p>
            </StrategyCard>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader number="03" title="Current State Snapshot" />
          <StrategySectionShell glow="blue">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <StrategyEyebrow>
                <ShieldCheck className="h-3.5 w-3.5" />
                Confidence: {researchData.meta.payloadConfidence.level} ({researchData.meta.payloadConfidence.score}/100)
              </StrategyEyebrow>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                Strict quality gate passed
              </div>
            </div>

            <StatsGrid
              columns={4}
              stats={[
                {
                  label: "Organic Traffic",
                  value: formatWhole(researchData.seoMetrics.organicTraffic),
                  icon: <Search className="h-5 w-5" />,
                },
                {
                  label: "Ranking Keywords",
                  value: formatWhole(researchData.seoMetrics.organicKeywords),
                  icon: <BarChart3 className="h-5 w-5" />,
                },
                {
                  label: "Backlinks",
                  value: formatWhole(researchData.seoMetrics.backlinks),
                  icon: <TrendingUp className="h-5 w-5" />,
                },
                {
                  label: "Referring Domains",
                  value: formatWhole(researchData.seoMetrics.referringDomains),
                  icon: <Compass className="h-5 w-5" />,
                },
              ]}
              className="mb-6"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">What matters</div>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  BTS has meaningful link depth ({formatWhole(researchData.seoMetrics.backlinkMetrics.backlinks)} backlinks /{" "}
                  {formatWhole(researchData.seoMetrics.backlinkMetrics.referringDomains)} referring domains), but traffic and keyword
                  coverage are still narrow relative to category opportunity.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Why it matters</div>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  This profile suggests authority potential exists, but commercial query capture and AI citation density are not yet
                  engineered for consistent shortlist ownership.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="04" title="Data-backed Competitive Landscape" />
          <StrategySectionShell>
            <DataTable
              headers={["Competitor", "Organic Traffic", "Organic Keywords", "Backlinks", "Ref. Domains", "AI Prompt Footprint"]}
              rows={researchData.competitors.map((competitor) => [
                <span className="font-medium text-white" key={competitor.domain}>
                  {competitor.name}
                </span>,
                formatWhole(competitor.organicTraffic),
                formatWhole(competitor.organicKeywords),
                formatWhole(competitor.backlinks),
                formatWhole(competitor.referringDomains),
                `${competitor.promptQueryHits} hits / ${competitor.promptQueryCount} queries`,
              ])}
              className="mb-6"
            />

            <div className="grid gap-4 md:grid-cols-3">
              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Competitive pressure</div>
                <p className="text-sm leading-6 text-white/68">
                  Patreon appears across 8/8 tested prompt themes with 21 total hits across ChatGPT, Gemini, and Google AI
                  Overviews.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Compounding moat signal</div>
                <p className="text-sm leading-6 text-white/68">
                  Circle, Kajabi, and Teachable each pair larger indexed footprints with significantly higher referring-domain counts.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Gap BTS can attack</div>
                <p className="text-sm leading-6 text-white/68">
                  Competitors win generic category prompts; BTS already appears in BTS-branded prompts. That is a convertable gap.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="05" title="AI Visibility by LLM" />
          <StrategySectionShell glow="mixed">
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <StrategyCard glow="amber">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Prompt-level coverage</div>
                <div className="mt-3 text-4xl font-display font-bold text-white">
                  {researchData.aiVisibility.clientMentionedPrompts}/{researchData.aiVisibility.promptsAnalyzed}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Validated mention rate across all sampled prompts and markets.
                </p>
              </StrategyCard>
              <StrategyCard glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Topical integrity</div>
                <div className="mt-3 text-4xl font-display font-bold text-white">
                  {formatPercent(researchData.topicalIntegrity.metrics.lowQualitySemanticDemandSharePercent)}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Low-quality semantic demand share remains negligible; headline insights are grounded in validated topical subsets.
                </p>
              </StrategyCard>
            </div>

            <div className="space-y-4">
              {platformCards.map((platform) => (
                <StrategyCard key={platform.key} className="border-white/12">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{platform.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/65">{platform.implication}</p>
                      {platform.unavailableReason ? (
                        <p className="mt-2 text-xs leading-5 text-white/45">Unavailable reason: {platform.unavailableReason}</p>
                      ) : null}
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center md:w-[320px]">
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Status</div>
                        <div className="mt-2 text-sm text-white">{platform.status}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Mentions</div>
                        <div className="mt-2 text-sm text-white">
                          {platform.total > 0 ? `${platform.mentioned}/${platform.total}` : "n/a"}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Rate</div>
                        <div className="mt-2 text-sm text-white">{formatPercent(platform.mentionRate)}</div>
                      </div>
                    </div>
                  </div>
                </StrategyCard>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">What matters</div>
                <p className="text-sm leading-6 text-white/65">
                  BTS has directional AI visibility in chat assistants but cannot rely on that alone. Google AI Overviews remains a
                  zero-coverage channel in this sample.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">What to do next</div>
                <p className="text-sm leading-6 text-white/65">
                  Close overview visibility gap with classic top-10 SEO execution, then reinforce with entity-consistent authority
                  distribution.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="06" title="Full Keyword Universe" />
          <StrategySectionShell>
            <div className="mb-6">
              <StatsGrid
                columns={4}
                stats={[
                  {
                    label: "Validated Keyword Universe",
                    value: formatWhole(researchData.tamModel.keywordUniverse.size),
                    icon: <Database className="h-5 w-5" />,
                  },
                  {
                    label: "Validated Demand",
                    value: formatWhole(researchData.tamModel.keywordUniverse.validatedDemand),
                    icon: <TrendingUp className="h-5 w-5" />,
                  },
                  {
                    label: "Anchor-Matched Terms",
                    value: formatWhole(researchData.tamModel.keywordUniverse.anchorMatchedCount),
                    icon: <Target className="h-5 w-5" />,
                  },
                  {
                    label: "Semantic Share of Demand",
                    value: `${formatOne(researchData.topicalIntegrity.metrics.semanticOnlyDemandSharePercent)}%`,
                    icon: <Brain className="h-5 w-5" />,
                  },
                ]}
              />
            </div>

            <div className="space-y-6">
              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">TOFU Universe (full-width)</h3>
                <DataTable
                  headers={["Keyword", "Volume", "Cluster", "Commercial implication"]}
                  rows={tofuRows}
                  className="border-white/8"
                />
              </StrategyCard>

              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">MOFU Universe (full-width)</h3>
                <DataTable
                  headers={["Keyword", "Volume", "Cluster", "Commercial implication"]}
                  rows={mofuRows}
                  className="border-white/8"
                />
              </StrategyCard>

              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">BOFU Universe (full-width)</h3>
                <DataTable
                  headers={["Keyword", "Volume", "Cluster", "Commercial implication"]}
                  rows={bofuRows}
                  className="border-white/8"
                  highlightRow={0}
                />
              </StrategyCard>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Guardrail: topical integrity</div>
                <p className="text-sm leading-6 text-white/65">
                  Topical integrity passed. Headline recommendations are anchored to validated creator monetization themes and not
                  contaminated edge terms.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Ambiguity risk surfaced</div>
                <p className="text-sm leading-6 text-white/65">
                  BTS-branded terms overlap with non-category meanings. Content architecture must disambiguate “Behind the Scenes” as
                  a creator monetization platform entity.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="07" title="Total Addressable Search Market (12 months)" />
          <StrategySectionShell glow="amber">
            <div className="mb-6 grid gap-4 md:grid-cols-4">
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Total demand</div>
                <div className="mt-3 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.totals.totalAddressableSearchDemand)}
                </div>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Reachable low</div>
                <div className="mt-3 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.low)}
                </div>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Reachable base</div>
                <div className="mt-3 text-3xl font-display font-bold text-[#f4e4cd]">
                  {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base)}
                </div>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Reachable high</div>
                <div className="mt-3 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.high)}
                </div>
              </StrategyCard>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DataTable
                headers={["Channel", "Demand", "Reachable Low", "Reachable Base", "Reachable High"]}
                rows={[
                  [
                    "Google",
                    formatWhole(researchData.tamModel.totals.byChannel.google.demand),
                    formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.low),
                    formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.base),
                    formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.high),
                  ],
                  [
                    "AI surfaces",
                    formatWhole(researchData.tamModel.totals.byChannel.ai.demand),
                    formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.low),
                    formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.base),
                    formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.high),
                  ],
                ]}
              />
              <DataTable
                headers={["Intent", "Demand", "Keywords", "Reachable Low", "Reachable Base", "Reachable High"]}
                rows={researchData.tamModel.byIntent.map((item) => [
                  item.intent,
                  formatWhole(item.demand),
                  formatWhole(item.keywordCount),
                  formatWhole(item.estimatedReachableVisits.low),
                  formatWhole(item.estimatedReachableVisits.base),
                  formatWhole(item.estimatedReachableVisits.high),
                ])}
              />
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5">
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Founder-readable modeling note</div>
              <p className="text-sm leading-7 text-white/65">
                This model uses conservative reachable-share planning inputs across Google and AI channels. It is intentionally not
                presented as a raw CTR guarantee. The goal is planning realism: what BTS can reasonably capture with disciplined
                execution and monthly compounding, not a best-case vanity projection.
              </p>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="08" title="12-month Opportunity Curve" />
          <PhasedUpsideChart points={monthlyPoints} className="mb-6" />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Month 1 base</div>
              <div className="mt-2 text-2xl font-display font-bold text-white">{formatWhole(monthlyPoints[0].base)}</div>
              <p className="mt-2 text-sm text-white/60">Early gains come from BOFU page deployment and technical indexing hygiene.</p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Month 6 base</div>
              <div className="mt-2 text-2xl font-display font-bold text-white">
                {formatWhole(monthlyPoints[5].base)}
              </div>
              <p className="mt-2 text-sm text-white/60">Middle-curve lift comes from comparisons + authority distribution compounding.</p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Month 12 base</div>
              <div className="mt-2 text-2xl font-display font-bold text-[#f4e4cd]">
                {formatWhole(monthlyPoints[11].base)}
              </div>
              <p className="mt-2 text-sm text-white/60">Late-stage acceleration depends on persistent prompt ops and content refresh velocity.</p>
            </StrategyCard>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader number="09" title="Top 3 Executive Decisions" />
          <StrategySectionShell>
            <div className="space-y-4">
              {decisions.map((decision, idx) => (
                <StrategyCard key={decision.title} glow={idx === 0 ? "amber" : "blue"}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">{decision.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/63">
                        <span className="text-white font-medium">Why:</span> {decision.why}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/63">
                        <span className="text-white font-medium">Decision-action:</span> {decision.action}
                      </p>
                    </div>
                  </div>
                </StrategyCard>
              ))}
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="10" title="30/60/90-Day View" />
          <StrategySectionShell glow="blue">
            <div className="grid gap-4 md:grid-cols-3">
              <StrategyCard className="h-full">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                  <Sparkles className="h-3.5 w-3.5 text-[#f4e4cd]" />
                  Day 0–30
                </div>
                <BulletList
                  items={[
                    "Map 30 money entities with explicit BTS positioning",
                    "Publish first alternatives/comparison cluster (Patreon, Kajabi, Skool, Teachable)",
                    "Implement schema and answer-first page blocks for AI extraction",
                    "Set baseline prompt board across ChatGPT, Gemini, and Google AIO",
                  ]}
                />
              </StrategyCard>
              <StrategyCard className="h-full">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                  <Workflow className="h-3.5 w-3.5 text-[#f4e4cd]" />
                  Day 31–60
                </div>
                <BulletList
                  items={[
                    "Expand BOFU coverage into pricing and implementation entities",
                    "Launch authority distribution loop (founder bylines, review surfaces, strategic mentions)",
                    "Build internal linking hub system between BOFU and supporting MOFU pages",
                    "Track prompt deltas weekly and refresh pages with weak answer extraction",
                  ]}
                />
              </StrategyCard>
              <StrategyCard className="h-full">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                  <Radar className="h-3.5 w-3.5 text-[#f4e4cd]" />
                  Day 61–90
                </div>
                <BulletList
                  items={[
                    "Scale comparison matrix and 'best for' pages to full competitor set",
                    "Ship AI-optimized FAQ blocks and evidence refreshes on top pages",
                    "Publish first benchmark narrative asset to increase citation trust",
                    "Move from single-page wins to answer-share consistency at cluster level",
                  ]}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="11" title="What Memetik Will Actually Do" />
          <StrategySectionShell>
            <div className="grid gap-4 md:grid-cols-2">
              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">1) Money Entity Capture System</h3>
                <BulletList
                  items={[
                    "Build and ship the highest-leverage BOFU entity set first (alternatives, comparisons, pricing).",
                    "Write answer-first assets engineered for both ranking and LLM extraction.",
                    "Design verdict-driven comparison architecture to win shortlist moments.",
                    "Install structured schema stack for better snippet and AI parsing reliability.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">2) Knowledge Graph + Retrieval Density</h3>
                <BulletList
                  items={[
                    "Expand MOFU/TOFU support pages mapped to creator monetization use cases.",
                    "Connect every support page into 1–2 core money assets to consolidate authority.",
                    "Continuously refresh weak or decaying pages based on prompt and SERP signals.",
                    "Maintain high topical precision so growth does not drift into irrelevant traffic.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">3) Authority & Distribution Layer</h3>
                <BulletList
                  items={[
                    "Create multi-surface presence beyond owned domain pages.",
                    "Push key assets into trusted third-party nodes for citation reinforcement.",
                    "Strengthen brand/entity consistency across indexable public surfaces.",
                    "Use review and social proof surfaces to reinforce commercial trust signals.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">4) Measurement & Prompt Operations</h3>
                <BulletList
                  items={[
                    "Weekly prompt testing on priority commercial queries.",
                    "Track answer-share movement by platform, market, and intent cluster.",
                    "Run competitor alerting for sudden citation shifts.",
                    "Ship tactical content and authority updates every month as one operating system.",
                  ]}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="12" title="Monthly Operating System (Concurrent Workstreams)" />
          <WorkstreamTimeline
            months={researchData.tamModel.executionBlueprint.months}
            tracks={researchData.tamModel.executionBlueprint.tracks}
          />
        </section>

        <section className="mb-16">
          <SectionHeader number="13" title="What We Need From Your Team" />
          <StrategySectionShell>
            <div className="grid gap-4 md:grid-cols-2">
              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">Decision access + speed</h3>
                <BulletList
                  items={[
                    "Single executive owner for final content and positioning decisions",
                    "Fast approval window for commercial pages (ideally within 48–72 hours)",
                    "Access to current sales narratives, objections, and category framing",
                    "Visibility into campaign or offer changes that affect messaging",
                  ]}
                />
              </StrategyCard>
              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">Data + infrastructure inputs</h3>
                <BulletList
                  items={[
                    "Analytics + Search Console access for calibration and prioritization",
                    "CMS publishing access with schema-ready implementation workflow",
                    "Internal SMEs available for proof-rich differentiation points",
                    "First-party conversion data (ACV/AOV, lead stages, close rates) for revenue modeling calibration",
                  ]}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="14" title="Why Memetik vs Alternatives" />
          <StrategySectionShell glow="mixed">
            <DataTable
              headers={["Dimension", "Traditional SEO Agency", "Generic Content Team", "Memetik AEO + SEO System"]}
              rows={[
                [
                  "Primary KPI",
                  "Rankings + traffic",
                  "Publishing volume",
                  "Answer share + commercial discovery + pipeline leverage",
                ],
                ["AI visibility", "Usually uninstrumented", "Not measured", "Prompt-tested weekly across major answer surfaces"],
                ["Execution model", "Linear projects", "Content quotas", "Concurrent monthly workstreams from month 1"],
                ["Competitive motion", "Quarterly snapshots", "Minimal", "Continuous competitor citation and query monitoring"],
                ["Founder readability", "Technical-heavy", "Tactic-heavy", "Decision-centric with explicit business implications"],
              ]}
              highlightRow={4}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="15" title="TAM × LTV Calculator" />
          <StrategySectionShell>
            <div className="mb-4 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm leading-6 text-white/68">
                Revenue modeling requires client ACV/AOV and funnel inputs. This calculator is provided so your team can apply
                first-party economics to the modeled reachable opportunity.
              </p>
            </div>
            <TamRoiCalculator
              baseReachableVisits={Math.round(researchData.tamModel.totals.estimatedReachableVisits.base)}
              defaultVisitToCustomerRate={0.01}
              defaultLtv={0}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="16" title="Assumptions & Confidence" />
          <StrategySectionShell>
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Model confidence</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">{researchData.tamModel.confidence.score}/100</div>
                <p className="mt-2 text-sm text-white/60">{researchData.tamModel.confidence.level} confidence payload</p>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Topical integrity</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {researchData.topicalIntegrity.passed ? "Passed" : "Flagged"}
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Ambiguous prompt mentions: {researchData.topicalIntegrity.metrics.ambiguousPromptMentions}
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Quality gate</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {researchData.qualityGate.passed ? "Passed" : "Failed"}
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Mode: {researchData.qualityGate.mode} • Platforms sampled: {researchData.qualityGate.metrics.aiPlatformsWithSamples}
                </p>
              </StrategyCard>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">Model assumptions (estimate-only)</h3>
                <BulletList items={researchData.tamModel.assumptions.founderReadableSummary} />
              </StrategyCard>
              <StrategyCard>
                <h3 className="mb-3 text-lg font-semibold text-white">Payload caveats surfaced</h3>
                <BulletList
                  items={[
                    "Perplexity endpoint unavailable in this payload; channel retained as explicit visibility blindspot.",
                    "Revenue model disabled due to missing ACV/AOV inputs.",
                    "Low-quality semantic terms exist but represent negligible demand share.",
                    "AI mention metrics are directional and should be tracked continuously, not treated as static truth.",
                  ]}
                />
              </StrategyCard>
            </div>

            {researchData.meta.issues.length ? (
              <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Observed data collection issues</div>
                <div className="space-y-2">
                  {researchData.meta.issues.map((issue) => (
                    <p key={issue.step} className="text-sm leading-6 text-white/62">
                      <span className="text-white">{issue.step}</span>: {issue.error}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </StrategySectionShell>
        </section>

        <section className="mb-16">
          <SectionHeader number="17" title="Board-shareable Summary" />
          <StrategySectionShell glow="amber">
            <div className="grid gap-4 md:grid-cols-2">
              <HighlightBox>
                <h3 className="mb-3 text-xl font-display font-bold text-white">What the board should know</h3>
                <BulletList
                  items={[
                    "BTS has product and authority signals but is under-captured in high-intent search and AI shortlist moments.",
                    "Validated 12-month demand is 2,268,640 searches; base reachable model is 7,616 visits with disciplined execution.",
                    "AI visibility exists but is uneven: strongest in Gemini, weak in ChatGPT, absent in Google AI Overviews.",
                    "The strategy is TAM-first and estimate-only; revenue planning needs first-party ACV/AOV and funnel conversion inputs.",
                  ]}
                />
              </HighlightBox>

              <StrategyCard>
                <h3 className="mb-3 text-xl font-display font-bold text-white">What happens next</h3>
                <p className="mb-4 text-sm leading-7 text-white/65">
                  Run a 90-day launch across commercial entity capture, authority distribution, and prompt instrumentation. The goal is
                  to convert BTS from “occasionally mentioned” to “consistently shortlisted,” then scale that into defensible category
                  authority over 12 months.
                </p>
                <a
                  href={`https://${researchData.company.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#f4e4cd] hover:opacity-85"
                >
                  Review domain
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <StrategyCTA
          eyebrow="Book Strategy Call"
          title="If this is directionally right, let’s operationalize it."
          body="We’ll turn this strategy into a live monthly operating system: money pages, entity authority, prompt coverage, and measurable answer-share gains."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />
      </div>
    </StrategyPageFrame>
  );
}