import { useEffect } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Building2,
  CheckCircle2,
  Compass,
  Database,
  Gauge,
  Globe,
  Link2,
  Lock,
  MessagesSquare,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  Wrench,
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

const formatPercent = (value: number) => `${value.toFixed(2)}%`;

const researchData = {
  company: {
    name: "Kinso",
    domain: "kinso.ai",
    category: "Communication / Unified AI Inbox",
    industry: "Communication / Collaboration",
  },
  seoMetrics: {
    organicTraffic: 556.7749864012003,
    organicKeywords: 24,
    backlinks: 426,
    referringDomains: 63,
    paidTraffic: 0,
    paidKeywords: 0,
    markets: {
      US: { organicTraffic: 95.4660008624196, organicKeywords: 16 },
      AU: { organicTraffic: 461.3089855387807, organicKeywords: 8 },
    },
    backlinkMetrics: {
      backlinks: 426,
      referringDomains: 63,
      referringMainDomains: 60,
      backlinksSpamScore: 21,
      targetSpamScore: 0,
    },
  },
  qualityGate: {
    passed: true,
    mode: "strict",
    metrics: {
      competitors: 5,
      keywords: 22,
      keywordUniverse: 559,
      prompts: 36,
      aiPlatformsWithSamples: 3,
      hasOnPage: true,
      hasTam: true,
    },
  },
  meta: {
    payloadConfidence: { score: 96, level: "high" as const },
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
    promptsAnalyzed: 36,
    clientMentionedPrompts: 8,
    platformSummary: {
      chatgpt: { total: 12, mentioned: 4, mentionRate: 33.33 },
      gemini: { total: 12, mentioned: 4, mentionRate: 33.33 },
      google_ai_overview: { total: 12, mentioned: 0, mentionRate: 0 },
    },
    platformAvailability: {
      chatgpt: { status: "available", endpoint: "/v3/ai_optimization/chat_gpt/llm_scraper/live/advanced" },
      gemini: { status: "available", endpoint: "/v3/ai_optimization/gemini/llm_scraper/live/advanced" },
      perplexity: {
        status: "unavailable",
        endpoint: "/v3/ai_optimization/perplexity/llm_scraper/live/advanced",
        reason: "[/v3/ai_optimization/perplexity/llm_scraper/live/advanced] Task status 40402: Invalid Path.",
      },
      google_ai_overview: { status: "available_via_serp", endpoint: "/v3/serp/google/organic/live/advanced" },
    },
  },
  keywordUniverse: {
    size: 559,
    anchorMatchedCount: 222,
    countsByIntent: { TOFU: 93, BOFU: 387, MOFU: 79 },
    countsBySource: {
      semantic_expansion: 518,
      competitor_keywords: 24,
      target_ranked_keywords: 22,
      keyword_gaps: 8,
    },
    semanticContribution: {
      keywordCount: 518,
      demand: 14587910,
      demandSharePercent: 97.51,
    },
  },
  tamModel: {
    estimateOnly: true,
    totals: {
      totalAddressableSearchDemand: 14959680,
      estimatedReachableVisits: {
        low: 134463.13,
        base: 249622.87,
        high: 409603.65,
      },
      byChannel: {
        google: {
          demand: 12865324.8,
          estimatedReachableVisits: {
            low: 133619.3,
            base: 248056.35,
            high: 407033.17,
          },
        },
        ai: {
          demand: 2094355.2,
          estimatedReachableVisits: {
            low: 843.83,
            base: 1566.51,
            high: 2570.48,
          },
        },
      },
    },
    byIntent: [
      {
        intent: "BOFU",
        demand: 2403550,
        keywordCount: 387,
        estimatedReachableVisits: { low: 57910.17, base: 96516.95, high: 154427.13 },
      },
      {
        intent: "MOFU",
        demand: 153130,
        keywordCount: 79,
        estimatedReachableVisits: { low: 1844.73, base: 3689.45, high: 6149.09 },
      },
      {
        intent: "TOFU",
        demand: 12403000,
        keywordCount: 93,
        estimatedReachableVisits: { low: 74708.23, base: 149416.46, high: 249027.43 },
      },
    ],
    topOpportunityClusters: [
      {
        cluster: "Category & Brand Demand",
        intent: "TOFU",
        demand: 12437710,
        keywordCount: 168,
        estimatedReachableVisits: { low: 75126.37, base: 150252.75, high: 250421.25 },
        sampleKeywords: ["outlook email", "free email services", "outlook email login", "godaddy email login", "hotmail email"],
      },
      {
        cluster: "Buyer Guides",
        intent: "BOFU",
        demand: 2403290,
        keywordCount: 381,
        estimatedReachableVisits: { low: 57903.91, base: 96506.51, high: 154410.42 },
        sampleKeywords: ["gmail inbox", "inbox", "shared inbox", "unified inbox", "team inbox", "ai inbox"],
      },
      {
        cluster: "Tools & Templates",
        intent: "MOFU",
        demand: 118400,
        keywordCount: 2,
        estimatedReachableVisits: { low: 1426.34, base: 2852.68, high: 4754.47 },
        sampleKeywords: ["email generator", "email signature generator"],
      },
    ],
    confidence: {
      score: 90,
      level: "high",
      reasons: [
        "Sufficient TAM volume identified.",
        "Strong full keyword universe coverage.",
        "Semantic keyword expansion contributed meaningful TAM coverage.",
        "AI visibility prompts provide directional coverage.",
        "AI visibility sampled across multiple platforms.",
        "Revenue model is estimate-only and missing first-party monetary inputs.",
      ],
    },
    revenueModel: {
      enabled: false,
      reason: "Revenue inputs missing (acv/aov). Showing TAM + pipeline potential only.",
      pipelinePotential: {
        leads: { low: 537.85, base: 2246.61, high: 6144.05 },
      },
    },
  },
  competitors: [
    {
      domain: "kinso.ai",
      role: "Target",
      organicTraffic: 556.7749864012003,
      organicKeywords: 24,
      paidTraffic: 0,
      backlinks: 426,
      referringDomains: 63,
      note: "Early footprint; mostly branded rankings.",
    },
    {
      domain: "missiveapp.com",
      role: "Direct",
      organicTraffic: 166300.31167035736,
      organicKeywords: 10931,
      paidTraffic: 0,
      backlinks: 23611,
      referringDomains: 2709,
      note: "Dominates inbox-adjacent informational + BOFU terms.",
    },
    {
      domain: "front.com",
      role: "Direct",
      organicTraffic: 86294.75961692631,
      organicKeywords: 12224,
      paidTraffic: 1354.5920000374317,
      backlinks: 50566,
      referringDomains: 6049,
      note: "Strong enterprise/commercial architecture + paid assist.",
    },
    {
      domain: "intercom.com",
      role: "Adjacent incumbent",
      organicTraffic: 91288.66046237387,
      organicKeywords: 26720,
      paidTraffic: 4417.890003025532,
      backlinks: 1024186,
      referringDomains: 42379,
      note: "Massive authority moat; owns broader messaging narratives.",
    },
    {
      domain: "hiverhq.com",
      role: "Direct",
      organicTraffic: 282533.58254896477,
      organicKeywords: 26665,
      paidTraffic: 69.49499875307083,
      backlinks: 24240,
      referringDomains: 6001,
      note: "Content engine across workflow/how-to + shared inbox guides.",
    },
    {
      domain: "gmelius.com",
      role: "Direct",
      organicTraffic: 80442.91756520234,
      organicKeywords: 10478,
      paidTraffic: 0,
      backlinks: 8830,
      referringDomains: 2337,
      note: "Shows direct AI evidence in Gemini + Google AIO for category prompts.",
    },
  ],
};

const executiveActions = [
  "Ship 12 decision-intent pages in the next 45 days (best, alternatives, vs, implementation).",
  "Stand up Bing + AI citation infrastructure now (IndexNow, schema, distribution, prompt tracking).",
  "Reallocate content effort from generic email-adjacent terms into unified inbox and team-workflow buyer queries.",
];

const visibilityPrompts = [
  {
    query: "best unified ai inbox tools",
    currentState: "Not mentioned in ChatGPT/Gemini responses sampled",
    implication: "Losing shortlist share at first-touch discovery.",
    difficulty: "Hard",
  },
  {
    query: "best unified ai inbox software",
    currentState: "Not consistently mentioned; competitor list dominates",
    implication: "Commercial intent captured by incumbent lists.",
    difficulty: "Hard",
  },
  {
    query: "best unified ai inbox for startups",
    currentState: "Not surfaced in sampled answers",
    implication: "Startup ICP framing owned by competitors.",
    difficulty: "Medium",
  },
  {
    query: "Kinso alternatives",
    currentState: "Mentioned, but context quality inconsistent",
    implication: "Entity understanding is unstable and fragile.",
    difficulty: "Medium",
  },
  {
    query: "Kinso vs competitors",
    currentState: "Mentioned in ChatGPT/Gemini, absent in Google AIO sample",
    implication: "Brand-aware queries partially captured, non-brand still weak.",
    difficulty: "Easy",
  },
];

const tofuKeywords = [
  ["outlook email", "4,480,000", "Category & Brand Demand", "Broad navigational demand; not decision-intent by default."],
  ["free email services", "3,660,000", "Category & Brand Demand", "Very broad; avoid headline TAM claims from this alone."],
  ["outlook email login", "763,100", "Category & Brand Demand", "High volume but low commercial fit for Kinso offer."],
  ["hotmail email", "220,000", "Category & Brand Demand", "Topical adjacency, weak product fit unless converted via education hub."],
  ["email gmail", "182,900", "Category & Brand Demand", "Awareness traffic source; requires strict internal linking discipline."],
  ["email account", "153,400", "Category & Brand Demand", "Broad educational intent, likely low direct conversion."],
  ["recall email outlook", "140,800", "Category & Brand Demand", "Competitor content currently wins this workflow problem."],
  ["messaging company", "27,100", "Category & Brand Demand", "Category framing term where incumbents already sit."],
  ["email thread", "25,740", "Category & Brand Demand", "Strong for thought leadership if tied to triage use cases."],
  ["ai email", "7,900", "Category & Brand Demand", "High relevance if tied to unified inbox + drafting workflows."],
];

const mofuKeywords = [
  ["email generator", "74,000", "Tools & Templates", "Template/tool demand can feed BOFU pages and capture links."],
  ["email signature generator", "44,400", "Tools & Templates", "Good utility gateway to inbox workflow education."],
  ["workflow", "22,200", "Category & Brand Demand", "Very broad; only useful with qualifier pages."],
  ["workflow diagram", "6,600", "Category & Brand Demand", "Potential visual asset + template content angle."],
  ["email migration", "530", "Category & Brand Demand", "Relevant to switching from legacy inbox stacks."],
  ["email automation workflow", "210", "Category & Brand Demand", "Bridges AI assistant narrative to operations buyers."],
  ["unified workflow", "20", "Category & Brand Demand", "Low volume but high topical relevance for product messaging."],
  ["email triage workflow", "10", "Category & Brand Demand", "High-intent, high-fit educational keyword despite low volume."],
];

const bofuKeywords = [
  ["gmail inbox", "1,643,000", "Buyer Guides", "Huge demand bucket; must be narrowed to shared/team use cases."],
  ["inbox", "489,700", "Buyer Guides", "Extremely broad; use only in long-tail qualified combinations."],
  ["shared inbox gmail", "1,320", "Buyer Guides", "Direct money query with clear buyer intent."],
  ["gmail shared inbox", "1,010", "Buyer Guides", "Core conversion keyword family."],
  ["shared inbox", "620", "Buyer Guides", "Head BOFU term; category anchor."],
  ["team inbox", "500", "Buyer Guides", "Core buying term for collaborative workflows."],
  ["unified inbox", "340", "Buyer Guides", "Primary category-defining query for Kinso positioning."],
  ["unified inbox email", "120", "Buyer Guides", "Kinso currently ~position 40; reclaimable fast win."],
  ["unified inbox app", "120", "Buyer Guides", "Kinso currently ~position 29; practical near-term lift target."],
  ["ai inbox", "80", "Buyer Guides", "Kinso currently ~position 105; clear content gap."],
  ["best shared inbox", "60", "Buyer Guides", "Commercial shortlist keyword; needs apex comparison page."],
  ["best shared inbox software", "50", "Buyer Guides", "High-CPC decision query with strong CAC leverage potential."],
];

const monthlyCurveBase = [6500, 9000, 12000, 15000, 17500, 19500, 21500, 23000, 24500, 26000, 27500, 29200];

const monthlyCurvePoints = monthlyCurveBase.map((base, index) => ({
  month: index + 1,
  label: `M${index + 1}`,
  low: Math.round(base * 0.54),
  base: Math.round(base),
  high: Math.round(base * 1.64),
}));

const workstreamMonths = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"];

export default function StrategyKinso() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Kinso — AEO & SEO Growth Strategy | Memetik";
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto w-full max-w-[1200px]">
        <StrategyHero
          eyebrow={
            <>
              <Brain className="h-3.5 w-3.5" />
              Hyper-Personalized Growth Strategy • 2026
            </>
          }
          title="Kinso"
          accent="SEO + AEO Category Capture Strategy"
          subtitle="How Kinso can move from occasional AI mention to consistent shortlist inclusion across Google, ChatGPT, Gemini, and AI answer layers — while building a compounding, defensible organic demand engine in US + AU."
          tags={[
            "kinso.ai",
            "Communication / Collaboration",
            "Unified AI Inbox",
            "US + AU focus",
            "Founder-ready operating model",
          ]}
        >
          <StrategySectionShell className="mt-8" glow="blue">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <StrategyEyebrow>
                <Sparkles className="h-3.5 w-3.5" />
                Executive Summary
              </StrategyEyebrow>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                Snapshot from validated US + AU research payload
              </div>
            </div>

            <StatsGrid
              columns={3}
              stats={[
                {
                  label: "Current organic footprint",
                  value: formatWhole(researchData.seoMetrics.organicTraffic),
                  icon: <Search className="h-5 w-5" />,
                  note: "Kinso currently sits at ~557 monthly organic visits across US + AU.",
                },
                {
                  label: "AI mention coverage (sampled prompts)",
                  value: `${researchData.aiVisibility.clientMentionedPrompts}/${researchData.aiVisibility.promptsAnalyzed}`,
                  icon: <Bot className="h-5 w-5" />,
                  note: "Mentioned in some brand-aware prompts, weak on non-brand category prompts.",
                },
                {
                  label: "12-month reachable visits (base scenario)",
                  value: formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base),
                  icon: <TrendingUp className="h-5 w-5" />,
                  note: "Modeled TAM opportunity if Kinso builds category + decision-intent coverage.",
                },
              ]}
            />

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {executiveActions.map((action, index) => (
                <StrategyCard key={action} className="h-full" glow={index === 1 ? "amber" : "blue"}>
                  <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">
                    Immediate action {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-white/72">{action}</p>
                </StrategyCard>
              ))}
            </div>
          </StrategySectionShell>
        </StrategyHero>

        <section className="space-y-20">
          <StrategySectionShell glow="mixed">
            <SectionHeader number="00" title="State of Search 2026" />
            <div className="grid gap-6 md:grid-cols-2">
              <StrategyCard glow="blue">
                <h3 className="mb-4 text-xl font-display font-bold text-white">What changed</h3>
                <BulletList
                  items={[
                    "Google still drives a major share of discovery and commercial research traffic.",
                    "Traditional search remains core buying behavior — especially for evaluative and implementation queries.",
                    "AI answer engines are changing shortlisting behavior before sales conversations happen.",
                    "Buyers now move across Google, ChatGPT, Gemini, Perplexity, and AI layers in one journey.",
                    "Winning brands now need dual visibility: classic SEO demand capture + AI answer inclusion.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard glow="amber">
                <h3 className="mb-4 text-xl font-display font-bold text-white">Founder frame</h3>
                <p className="mb-4 text-sm leading-6 text-white/70">
                  This is no longer a rankings-only problem. It is a <span className="text-white">shortlist share problem</span>. If
                  Kinso is not named when buyers ask “best unified AI inbox” style prompts, those prospects often never reach a click, let alone a demo.
                </p>
                <p className="text-sm leading-6 text-white/70">
                  The channel to build is not just SEO content. It is a retrieval system: decision pages, structured entities,
                  trusted citations, and answer-ready architecture across both Google and LLM ecosystems.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="blue">
            <SectionHeader number="01" title="Why This Matters Now" />
            <div className="grid gap-5 md:grid-cols-3">
              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Radar className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Visibility timing</span>
                </div>
                <p className="text-sm leading-6 text-white/68">
                  Kinso has a strong product narrative, but current discovery signals are still shallow: low non-brand rankings,
                  limited decision-page footprint, inconsistent AI mentions.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Target className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Category landgrab</span>
                </div>
                <p className="text-sm leading-6 text-white/68">
                  Competitors like Missive, Hiver, Front, and Gmelius already occupy high-intent search surfaces. Delay compounds
                  their authority moat while Kinso remains interpreted as “new” by models.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Gauge className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">CAC pressure</span>
                </div>
                <p className="text-sm leading-6 text-white/68">
                  Without an owned inbound layer, growth stays over-exposed to paid and outbound volatility. This strategy is a
                  CAC-pressure release valve with compounding shelf life.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="mixed">
            <SectionHeader number="02" title="Current State Snapshot" />
            <StatsGrid
              columns={5}
              stats={[
                {
                  label: "Organic traffic (US + AU)",
                  value: formatWhole(researchData.seoMetrics.organicTraffic),
                  icon: <BarChart3 className="h-5 w-5" />,
                },
                {
                  label: "Ranking keywords",
                  value: formatWhole(researchData.seoMetrics.organicKeywords),
                  icon: <Search className="h-5 w-5" />,
                },
                {
                  label: "Backlinks",
                  value: formatWhole(researchData.seoMetrics.backlinks),
                  icon: <Link2 className="h-5 w-5" />,
                },
                {
                  label: "Referring domains",
                  value: formatWhole(researchData.seoMetrics.referringDomains),
                  icon: <Globe className="h-5 w-5" />,
                },
                {
                  label: "Payload confidence",
                  value: `${researchData.meta.payloadConfidence.score}/100`,
                  icon: <ShieldCheck className="h-5 w-5" />,
                  note: `Level: ${researchData.meta.payloadConfidence.level.toUpperCase()}`,
                },
              ]}
              className="mb-6"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <HighlightBox>
                <h3 className="mb-3 text-lg font-display font-bold text-white">What matters</h3>
                <BulletList
                  items={[
                    `Kinso ranks mainly for branded or typo variants; non-brand commercial coverage is thin.`,
                    `AI visibility exists in some brand-aware prompts, but category prompts are mostly lost to competitors.`,
                    `Link profile is clean enough to build on (target spam score ${researchData.seoMetrics.backlinkMetrics.targetSpamScore}).`,
                    `Current indexed footprint is too small to train strong category authority signals across engines.`,
                  ]}
                />
              </HighlightBox>

              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">What to do next</h3>
                <BulletList
                  items={[
                    "Prioritize decision-intent content architecture before broad educational expansion.",
                    "Pair every BOFU page with structured schema + distribution loops for citation probability.",
                    "Build explicit entity consistency across site, profiles, and third-party mentions.",
                    "Operationalize weekly answer-share testing as a core growth metric alongside pipeline.",
                  ]}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="amber">
            <SectionHeader number="03" title="Cost of Inaction" />
            <div className="grid gap-5 md:grid-cols-3">
              <StrategyCard className="h-full">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4e4cd]">Shortlist risk</div>
                <p className="text-sm leading-6 text-white/70">
                  Buyers asking “best unified AI inbox” will continue seeing competitors first, anchoring preference before Kinso is even evaluated.
                </p>
              </StrategyCard>
              <StrategyCard className="h-full">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4e4cd]">CAC risk</div>
                <p className="text-sm leading-6 text-white/70">
                  Without compounding non-paid discovery, go-to-market remains reliant on paid/outbound pressure and higher marginal acquisition costs.
                </p>
              </StrategyCard>
              <StrategyCard className="h-full">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4e4cd]">Authority risk</div>
                <p className="text-sm leading-6 text-white/70">
                  Competitor authority compounds monthly through content freshness, citations, and links. Waiting makes recovery slower and more expensive.
                </p>
              </StrategyCard>
            </div>

            <HighlightBox className="mt-6">
              <p className="text-lg leading-8 text-white/80">
                At Kinso’s current visibility level, the biggest cost is not “lost clicks.” It’s <span className="text-white">lost consideration</span> —
                high-intent buyers forming preferences in answer engines before they ever hit your pipeline.
              </p>
            </HighlightBox>
          </StrategySectionShell>

          <StrategySectionShell glow="blue">
            <SectionHeader number="04" title="Data-backed Competitive Landscape" />
            <DataTable
              headers={[
                "Competitor",
                "Organic footprint",
                "Authority",
                "AI/search readout",
                "Strategic Read",
              ]}
              rows={researchData.competitors.map((c) => [
                `${c.domain} • ${c.role}`,
                `${formatWhole(c.organicTraffic)} visits • ${formatWhole(c.organicKeywords)} keywords`,
                `${formatWhole(c.backlinks)} backlinks • ${formatWhole(c.referringDomains)} ref domains`,
                c.note.includes("AI") ? c.note : "Dominates category-search real estate and influences shortlist expectations.",
                c.note,
              ])}
              highlightRow={0}
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">What matters</h3>
                <BulletList
                  items={[
                    "Kinso’s current organic footprint is materially smaller than each primary direct competitor.",
                    "Competitors are not just winning head terms — they’re winning long-tail workflow and implementation problems.",
                    "Authority gap is both content depth and link equity (e.g., Missive 2,709 referring domains vs Kinso 63).",
                  ]}
                />
              </StrategyCard>
              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">What to do next</h3>
                <BulletList
                  items={[
                    "Use a focused wedge: unified inbox + shared/team inbox buyer intent, not generic email ecosystem terms.",
                    "Build comparative and alternatives pages where incumbents currently hold default recommendations.",
                    "Launch monthly authority sprints (citations + integrations + trusted mentions) in parallel with content.",
                  ]}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="mixed">
            <SectionHeader number="05" title="AI Visibility by LLM" />
            <div className="grid gap-4">
              {[
                {
                  key: "chatgpt",
                  label: "ChatGPT",
                  summary: researchData.aiVisibility.platformSummary.chatgpt,
                  status: researchData.aiVisibility.platformAvailability.chatgpt.status,
                  endpoint: researchData.aiVisibility.platformAvailability.chatgpt.endpoint,
                  note: "Mentioned primarily in brand-aware prompts; weak in non-brand shortlist prompts.",
                },
                {
                  key: "gemini",
                  label: "Gemini",
                  summary: researchData.aiVisibility.platformSummary.gemini,
                  status: researchData.aiVisibility.platformAvailability.gemini.status,
                  endpoint: researchData.aiVisibility.platformAvailability.gemini.endpoint,
                  note: "Some positive brand recognition, but category recommendation coverage remains limited.",
                },
                {
                  key: "google_ai_overview",
                  label: "Google AI Overviews",
                  summary: researchData.aiVisibility.platformSummary.google_ai_overview,
                  status: researchData.aiVisibility.platformAvailability.google_ai_overview.status,
                  endpoint: researchData.aiVisibility.platformAvailability.google_ai_overview.endpoint,
                  note: "0/12 mentions in sampled prompts; currently absent where Google answer summaries influence shortlist behavior.",
                },
                {
                  key: "perplexity",
                  label: "Perplexity",
                  summary: { total: 0, mentioned: 0, mentionRate: 0 },
                  status: researchData.aiVisibility.platformAvailability.perplexity.status,
                  endpoint: researchData.aiVisibility.platformAvailability.perplexity.endpoint,
                  note: researchData.aiVisibility.platformAvailability.perplexity.reason,
                },
              ].map((platform) => (
                <StrategyCard key={platform.key} className="h-full">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-[#f4e4cd]" />
                      <div className="text-lg font-display font-bold text-white">{platform.label}</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">
                      status: {platform.status}
                    </div>
                  </div>

                  <div className="mb-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Prompts tested</div>
                      <div className="mt-1 text-xl font-display font-bold text-white">{formatWhole(platform.summary.total)}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Prompts mentioned</div>
                      <div className="mt-1 text-xl font-display font-bold text-white">{formatWhole(platform.summary.mentioned)}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Mention rate</div>
                      <div className="mt-1 text-xl font-display font-bold text-[#f4e4cd]">{formatPercent(platform.summary.mentionRate)}</div>
                    </div>
                  </div>

                  <p className="mb-3 text-sm leading-6 text-white/68">{platform.note}</p>
                  <p className="text-xs leading-6 text-white/45">
                    Endpoint used: <span className="text-white/65">{platform.endpoint}</span>
                  </p>
                </StrategyCard>
              ))}
            </div>

            <DataTable
              className="mt-6"
              headers={["Prompt", "Observed state", "Commercial implication", "Difficulty (inferred)"]}
              rows={visibilityPrompts.map((p) => [p.query, p.currentState, p.implication, p.difficulty])}
            />
          </StrategySectionShell>

          <StrategySectionShell glow="blue">
            <SectionHeader number="06" title="Full Keyword Universe" />
            <StatsGrid
              columns={4}
              stats={[
                {
                  label: "Total keyword universe",
                  value: formatWhole(researchData.keywordUniverse.size),
                  icon: <Database className="h-5 w-5" />,
                },
                {
                  label: "Anchor-matched terms",
                  value: formatWhole(researchData.keywordUniverse.anchorMatchedCount),
                  icon: <Target className="h-5 w-5" />,
                  note: "222/559 terms are closely aligned with core solution anchors.",
                },
                {
                  label: "Semantic expansion share",
                  value: `${formatOne(researchData.keywordUniverse.semanticContribution.demandSharePercent)}%`,
                  icon: <Compass className="h-5 w-5" />,
                },
                {
                  label: "Keyword gaps surfaced",
                  value: formatWhole(researchData.keywordUniverse.countsBySource.keyword_gaps),
                  icon: <AlertTriangle className="h-5 w-5" />,
                },
              ]}
              className="mb-6"
            />

            <HighlightBox className="mb-6">
              <h3 className="mb-3 text-lg font-display font-bold text-white">Topical guardrail (hard constraint)</h3>
              <p className="text-sm leading-7 text-white/72">
                This universe includes very large generic email-login and provider navigational demand. Those terms inflate raw demand but
                do not represent direct purchase intent for Kinso’s core offer. Strategy headlines and targets below are therefore weighted
                toward <span className="text-white">anchor-matched unified/shared/team inbox and workflow queries</span>, not broad login traffic.
              </p>
            </HighlightBox>

            <div className="space-y-6">
              <StrategyCard glow="blue">
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">
                    TOFU • 93 keywords
                  </div>
                </div>
                <DataTable
                  headers={["Keyword", "Volume", "Cluster", "Why it matters"]}
                  rows={tofuKeywords}
                />
              </StrategyCard>

              <StrategyCard glow="blue">
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">
                    MOFU • 79 keywords
                  </div>
                </div>
                <DataTable
                  headers={["Keyword", "Volume", "Cluster", "Why it matters"]}
                  rows={mofuKeywords}
                />
              </StrategyCard>

              <StrategyCard glow="blue">
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">
                    BOFU • 387 keywords
                  </div>
                </div>
                <DataTable
                  headers={["Keyword", "Volume", "Cluster", "Why it matters"]}
                  rows={bofuKeywords}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="mixed">
            <SectionHeader number="07" title="Total Addressable Search Market (12 months)" />
            <StatsGrid
              columns={4}
              stats={[
                {
                  label: "Total addressable demand",
                  value: formatWhole(researchData.tamModel.totals.totalAddressableSearchDemand),
                  icon: <Globe className="h-5 w-5" />,
                },
                {
                  label: "Reachable visits (low)",
                  value: formatWhole(researchData.tamModel.totals.estimatedReachableVisits.low),
                  icon: <TrendingUp className="h-5 w-5" />,
                },
                {
                  label: "Reachable visits (base)",
                  value: formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base),
                  icon: <TrendingUp className="h-5 w-5" />,
                },
                {
                  label: "Reachable visits (high)",
                  value: formatWhole(researchData.tamModel.totals.estimatedReachableVisits.high),
                  icon: <TrendingUp className="h-5 w-5" />,
                },
              ]}
              className="mb-6"
            />

            <DataTable
              headers={[
                "Intent",
                "Keyword count",
                "12-mo demand",
                "Reachable visits (Low)",
                "Reachable visits (Base)",
                "Reachable visits (High)",
              ]}
              rows={researchData.tamModel.byIntent.map((row) => [
                row.intent,
                formatWhole(row.keywordCount),
                formatWhole(row.demand),
                formatWhole(row.estimatedReachableVisits.low),
                formatWhole(row.estimatedReachableVisits.base),
                formatWhole(row.estimatedReachableVisits.high),
              ])}
            />

            <DataTable
              className="mt-6"
              headers={[
                "Channel",
                "Modeled demand share",
                "Reachable visits (Low)",
                "Reachable visits (Base)",
                "Reachable visits (High)",
              ]}
              rows={[
                [
                  "Google Search",
                  formatWhole(researchData.tamModel.totals.byChannel.google.demand),
                  formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.low),
                  formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.base),
                  formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.high),
                ],
                [
                  "AI Answer Layers",
                  formatWhole(researchData.tamModel.totals.byChannel.ai.demand),
                  formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.low),
                  formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.base),
                  formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.high),
                ],
              ]}
            />

            <HighlightBox className="mt-6">
              <p className="text-sm leading-7 text-white/72">
                TAM is modeled with conservative reachable-share logic, not guaranteed CTR outcomes. We deliberately avoid presenting
                aggressive legacy click assumptions as direct forecasts. Use this as a planning envelope; calibrate with first-party
                funnel and cohort performance once execution starts.
              </p>
            </HighlightBox>
          </StrategySectionShell>

          <StrategySectionShell glow="blue">
            <SectionHeader number="08" title="12-month Opportunity Curve" />
            <PhasedUpsideChart points={monthlyCurvePoints} />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">What matters</h3>
                <BulletList
                  items={[
                    "The curve is front-loaded by BOFU capture, then deepened by MOFU enablement, then widened by TOFU authority.",
                    "Month 1–3 gains come from decision pages + indexation + technical trust fixes.",
                    "Month 4–8 adds supporting workflow content and comparison coverage.",
                    "Month 9–12 compounds through topical depth and authority flywheel effects.",
                  ]}
                />
              </StrategyCard>
              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">Commercial implication</h3>
                <p className="text-sm leading-7 text-white/70">
                  This is a compounding channel build, not a one-time campaign. The objective is to increase qualified inbound flow and
                  AI shortlist share together, reducing paid dependency while improving category authority.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="amber">
            <SectionHeader number="09" title="Top 3 Executive Decisions" />
            <div className="grid gap-5 md:grid-cols-3">
              <StrategyCard glow="amber">
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Target className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Decision 1</span>
                </div>
                <h3 className="mb-2 text-lg font-display font-bold text-white">Own decision-intent first</h3>
                <p className="text-sm leading-6 text-white/70">
                  Approve a BOFU-first roadmap (best, alternatives, vs, implementation, pricing-adjacent pages) before broad awareness content.
                </p>
              </StrategyCard>

              <StrategyCard glow="amber">
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Workflow className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Decision 2</span>
                </div>
                <h3 className="mb-2 text-lg font-display font-bold text-white">Run monthly operating system</h3>
                <p className="text-sm leading-6 text-white/70">
                  Commit to concurrent workstreams from month 1: content, technical/entity, authority distribution, and answer-share testing.
                </p>
              </StrategyCard>

              <StrategyCard glow="amber">
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Decision 3</span>
                </div>
                <h3 className="mb-2 text-lg font-display font-bold text-white">Measure mentions + pipeline</h3>
                <p className="text-sm leading-6 text-white/70">
                  Replace rank-only reporting with answer-share and qualified pipeline contribution metrics tied to high-intent query sets.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="mixed">
            <SectionHeader number="10" title="30/60/90-Day View" />
            <div className="grid gap-5 md:grid-cols-3">
              <StrategyCard>
                <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">Day 1-30</div>
                <BulletList
                  items={[
                    "Finalize money-query map (US + AU) with query-to-page ownership.",
                    "Fix entity + schema baseline (Organization, FAQ, Product/Application, Review where valid).",
                    "Launch first wave of BOFU pages (shared inbox, unified inbox, team inbox variants).",
                    "Set up Bing Webmaster + IndexNow + answer-monitoring stack.",
                  ]}
                />
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">Day 31-60</div>
                <BulletList
                  items={[
                    "Publish alternatives/comparison cluster and implementation playbooks.",
                    "Begin authority placements and third-party citation relay.",
                    "Run weekly LLM prompt sweeps; tune pages based on answer extraction behavior.",
                    "Expand internal link graph from BOFU pages into workflow support content.",
                  ]}
                />
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">Day 61-90</div>
                <BulletList
                  items={[
                    "Ship second wave: category landing hubs + buying criteria pages.",
                    "Refresh underperforming pages with proof blocks, FAQs, and clearer verdicts.",
                    "Scale distribution cadence: LinkedIn, community surfaces, guest mentions, review nodes.",
                    "Deliver executive dashboard: answer share, citation trend, and pipeline-attributed movement.",
                  ]}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="blue">
            <SectionHeader number="11" title="What Memetik Will Actually Do" />
            <div className="grid gap-5 md:grid-cols-2">
              <StrategyCard glow="blue">
                <h3 className="mb-3 text-xl font-display font-bold text-white">1) Demand capture architecture</h3>
                <BulletList
                  items={[
                    "Build and prioritize Kinso Money Entity Map (best, alternatives, comparisons, implementation, pricing-adjacent).",
                    "Create apex pages engineered for extractability: direct answers, tables, verdict blocks, FAQs, schema.",
                    "Design internal linking from support content into BOFU conversion surfaces.",
                    "Refactor title/H1/section architecture for clear intent alignment and retrieval density.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard glow="blue">
                <h3 className="mb-3 text-xl font-display font-bold text-white">2) AI visibility system</h3>
                <BulletList
                  items={[
                    "Weekly prompt testing across ChatGPT, Gemini, and Google AI layers.",
                    "Citable answer optimization: concise definitions, comparison schemas, proof snippets.",
                    "Entity consistency reinforcement across owned and third-party profiles.",
                    "Answer-share tracking with competitor movement alerts and recapture protocol.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard glow="blue">
                <h3 className="mb-3 text-xl font-display font-bold text-white">3) Authority + distribution</h3>
                <BulletList
                  items={[
                    "Convert each key page into multi-surface distribution assets.",
                    "Build citation velocity through editorial mentions and trusted platform nodes.",
                    "Support review-surface strengthening where relevant to category trust (B2B tools directories, communities).",
                    "Coordinate anchor consistency so external signals reinforce category positioning.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard glow="blue">
                <h3 className="mb-3 text-xl font-display font-bold text-white">4) Executive operating cadence</h3>
                <BulletList
                  items={[
                    "Bi-weekly sprint planning tied to highest commercial upside queries.",
                    "Monthly board-level snapshot: what moved, what didn’t, what changes next.",
                    "Quarterly recalibration against competitor answer share and demand shifts.",
                    "No vanity reporting — pipeline leverage and shortlist share only.",
                  ]}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="mixed">
            <SectionHeader number="12" title="What We Need From Your Team" />
            <div className="grid gap-5 md:grid-cols-2">
              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">Access + data</h3>
                <BulletList
                  items={[
                    "Analytics + Search Console + product usage context access.",
                    "Conversion event definitions and current funnel baseline.",
                    "Clear ICP and segment priorities (startup vs enterprise, primary use cases).",
                    "Product proof inputs: outcomes, screenshots, capability deltas.",
                  ]}
                />
              </StrategyCard>
              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">Operating partnership</h3>
                <BulletList
                  items={[
                    "One accountable marketing or growth owner on weekly check-ins.",
                    "Fast review loop for factual accuracy and product claims.",
                    "Support for integration/content validation with product or support leads.",
                    "Commitment to ship consistently each month, not campaign bursts.",
                  ]}
                />
              </StrategyCard>
            </div>

            <WorkstreamTimeline
              className="mt-6"
              months={workstreamMonths}
              tracks={[
                {
                  name: "Money pages (BOFU)",
                  description: "Best/alternatives/vs/implementation pages that capture decision intent.",
                  cells: [
                    { label: "Sprint 1 pages", tone: "high" },
                    { label: "Sprint 2 pages", tone: "high" },
                    { label: "Refresh + add FAQs", tone: "base" },
                    { label: "New comparisons", tone: "high" },
                    { label: "Conversion tune", tone: "base" },
                    { label: "Update + expand", tone: "base" },
                    { label: "New use-case pages", tone: "base" },
                    { label: "Refresh cycle", tone: "base" },
                    { label: "Winner reinforcement", tone: "high" },
                    { label: "Coverage expansion", tone: "base" },
                    { label: "Defense updates", tone: "base" },
                    { label: "Year-end refresh", tone: "high" },
                  ],
                },
                {
                  name: "Knowledge support layer",
                  description: "Workflow, setup, migration, and adoption content that feeds BOFU pages.",
                  cells: [
                    { label: "Cluster map", tone: "base" },
                    { label: "Publish support set", tone: "base" },
                    { label: "Interlink pass", tone: "base" },
                    { label: "How-to expansion", tone: "base" },
                    { label: "Template/tool pages", tone: "base" },
                    { label: "Consolidate hubs", tone: "base" },
                    { label: "New vertical variants", tone: "base" },
                    { label: "Refresh + prune", tone: "base" },
                    { label: "Depth pass", tone: "base" },
                    { label: "Authority tie-in", tone: "base" },
                    { label: "Intent rebalance", tone: "base" },
                    { label: "Evergreen updates", tone: "base" },
                  ],
                },
                {
                  name: "AI answer optimization",
                  description: "Prompt testing, snippet tuning, and structured answer improvements.",
                  cells: [
                    { label: "Baseline tests", tone: "high" },
                    { label: "Snippet tuning", tone: "high" },
                    { label: "Prompt loop", tone: "base" },
                    { label: "Entity tune", tone: "base" },
                    { label: "Prompt loop", tone: "base" },
                    { label: "Answer format update", tone: "base" },
                    { label: "Prompt loop", tone: "base" },
                    { label: "Citation fixes", tone: "base" },
                    { label: "Prompt loop", tone: "base" },
                    { label: "Competitor recapture", tone: "high" },
                    { label: "Prompt loop", tone: "base" },
                    { label: "Annual benchmark", tone: "high" },
                  ],
                },
                {
                  name: "Authority + distribution",
                  description: "Third-party placements and entity reinforcement for trust transfer.",
                  cells: [
                    { label: "Node setup", tone: "base" },
                    { label: "Placement sprint", tone: "high" },
                    { label: "Placement sprint", tone: "high" },
                    { label: "Review profile push", tone: "base" },
                    { label: "Mentions expansion", tone: "base" },
                    { label: "Placement sprint", tone: "high" },
                    { label: "Mentions expansion", tone: "base" },
                    { label: "Placement sprint", tone: "high" },
                    { label: "Authority refresh", tone: "base" },
                    { label: "Placement sprint", tone: "high" },
                    { label: "Mentions expansion", tone: "base" },
                    { label: "Year-end authority audit", tone: "high" },
                  ],
                },
                {
                  name: "Measurement + exec reporting",
                  description: "Answer share, pipeline signals, and monthly executive decisions.",
                  cells: [
                    { label: "Dashboard baseline", tone: "high" },
                    { label: "Monthly report", tone: "base" },
                    { label: "Monthly report", tone: "base" },
                    { label: "Quarterly recalibration", tone: "high" },
                    { label: "Monthly report", tone: "base" },
                    { label: "Monthly report", tone: "base" },
                    { label: "Quarterly recalibration", tone: "high" },
                    { label: "Monthly report", tone: "base" },
                    { label: "Monthly report", tone: "base" },
                    { label: "Quarterly recalibration", tone: "high" },
                    { label: "Monthly report", tone: "base" },
                    { label: "Board summary", tone: "high" },
                  ],
                },
              ]}
            />
          </StrategySectionShell>

          <StrategySectionShell glow="amber">
            <SectionHeader number="13" title="Why Memetik vs Alternatives" />
            <div className="grid gap-5 md:grid-cols-3">
              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Bot className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Answer-engine native</span>
                </div>
                <p className="text-sm leading-6 text-white/70">
                  We optimize for mention frequency, citation quality, and shortlist share — not just ranking movement.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Database className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Operator depth</span>
                </div>
                <p className="text-sm leading-6 text-white/70">
                  Strategy includes content architecture, technical entity fixes, and distribution execution as one operating system.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Commercial accountability</span>
                </div>
                <p className="text-sm leading-6 text-white/70">
                  We tie work to pipeline leverage, CAC pressure relief, and category authority — the metrics founders and boards care about.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="blue">
            <SectionHeader number="14" title="TAM × LTV Calculator" />
            <TamRoiCalculator
              baseReachableVisits={Math.round(researchData.tamModel.totals.estimatedReachableVisits.base)}
              defaultVisitToCustomerRate={0.01}
              defaultLtv={0}
            />
            <div className="mt-5 rounded-[24px] border border-amber-300/20 bg-amber-200/[0.05] p-4">
              <div className="mb-1 flex items-center gap-2 text-[#f4e4cd]">
                <Lock className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Revenue model status</span>
              </div>
              <p className="text-sm leading-6 text-white/75">
                Revenue modeling requires client ACV/AOV and funnel inputs.
              </p>
            </div>
          </StrategySectionShell>

          <StrategySectionShell glow="mixed">
            <SectionHeader number="15" title="Assumptions & Confidence" />
            <div className="grid gap-5 md:grid-cols-2">
              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">Methodology assumptions (founder-readable)</h3>
                <BulletList
                  items={[
                    "Modeled on a 12-month horizon across US + AU demand surfaces.",
                    "Reachable-share estimates are conservative planning envelopes, not guaranteed click outcomes.",
                    "Opportunity model uses intent-weighted capture logic (BOFU > MOFU > TOFU in near-term efficiency).",
                    "AI visibility scores are directional from sampled prompts and platform availability constraints.",
                    "Displayed trajectory values are rounded for planning clarity.",
                  ]}
                />
              </StrategyCard>
              <StrategyCard>
                <h3 className="mb-3 text-lg font-display font-bold text-white">Confidence notes</h3>
                <BulletList items={researchData.tamModel.confidence.reasons} />
              </StrategyCard>
            </div>

            <StatsGrid
              className="mt-6"
              columns={3}
              stats={[
                {
                  label: "TAM confidence",
                  value: `${researchData.tamModel.confidence.score}/100`,
                  icon: <ShieldCheck className="h-5 w-5" />,
                  note: `Level: ${researchData.tamModel.confidence.level.toUpperCase()}`,
                },
                {
                  label: "Research payload confidence",
                  value: `${researchData.meta.payloadConfidence.score}/100`,
                  icon: <Gauge className="h-5 w-5" />,
                  note: `Level: ${researchData.meta.payloadConfidence.level.toUpperCase()}`,
                },
                {
                  label: "Quality gate status",
                  value: researchData.qualityGate.passed ? "PASS" : "FAIL",
                  icon: <CheckCircle2 className="h-5 w-5" />,
                  note: `Mode: ${researchData.qualityGate.mode.toUpperCase()}`,
                },
              ]}
            />

            <DataTable
              className="mt-6"
              headers={["Issue", "Impact", "Handling plan"]}
              rows={researchData.meta.issues.map((issue) => [
                issue.step,
                issue.error,
                "No blocking impact on strategy direction; continue with available platform data and expand coverage once endpoint access is restored.",
              ])}
            />
          </StrategySectionShell>

          <StrategySectionShell glow="amber">
            <SectionHeader number="16" title="Board-shareable Summary" />
            <div className="grid gap-5 md:grid-cols-2">
              <HighlightBox>
                <h3 className="mb-3 text-xl font-display font-bold text-white">One-slide thesis</h3>
                <p className="text-sm leading-7 text-white/75">
                  Kinso has a product-positioning advantage in unified AI inbox workflows but currently lacks enough search/answer-engine
                  surface area to win category shortlists consistently. The opportunity is substantial (modeled base reachable demand of{" "}
                  <span className="text-white">{formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base)} annual visits</span>)
                  if Kinso executes a BOFU-first, answer-engine-native operating system over 12 months.
                </p>
              </HighlightBox>

              <StrategyCard glow="amber">
                <h3 className="mb-3 text-xl font-display font-bold text-white">Board decisions to support</h3>
                <BulletList
                  items={[
                    "Treat SEO + AEO as one strategic growth program, not ad-hoc content output.",
                    "Fund consistency over bursts: monthly shipping cadence is the compounding driver.",
                    "Adopt answer-share and pipeline impact as core success metrics.",
                    "Use quarterly recalibration to keep pace with AI and competitor shifts.",
                  ]}
                />
              </StrategyCard>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Now</div>
                <div className="mt-2 text-2xl font-display font-bold text-white">{formatWhole(researchData.seoMetrics.organicKeywords)}</div>
                <p className="mt-2 text-sm text-white/60">Ranking keywords in US + AU.</p>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Risk</div>
                <div className="mt-2 text-2xl font-display font-bold text-white">0%</div>
                <p className="mt-2 text-sm text-white/60">Google AIO mention rate in sampled prompts.</p>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Opportunity</div>
                <div className="mt-2 text-2xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.totals.totalAddressableSearchDemand)}
                </div>
                <p className="mt-2 text-sm text-white/60">12-month addressable demand model.</p>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Execution</div>
                <div className="mt-2 text-2xl font-display font-bold text-white">12 mo</div>
                <p className="mt-2 text-sm text-white/60">Concurrent operating system required.</p>
              </StrategyCard>
            </div>
          </StrategySectionShell>

          <StrategyCTA
            eyebrow="Book Strategy Call"
            title="Want Memetik to build this with your team?"
            body="If you want us to turn this plan into execution — category pages, AI visibility system, authority distribution, and founder-grade measurement — book a strategy call."
            href="https://cal.com/memetik/letstalk"
            ctaLabel={
              <>
                Book Strategy Call
                <ArrowRight className="h-4 w-4" />
              </>
            }
          />
        </section>
      </div>
    </StrategyPageFrame>
  );
}