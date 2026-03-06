import { useEffect } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  Brain,
  Building2,
  CheckCircle2,
  Compass,
  Database,
  Globe,
  Layers,
  LineChart,
  Link2,
  MessagesSquare,
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
  PhaseBlock,
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
    markets: {
      US: {
        organicTraffic: 95.4660008624196,
        organicKeywords: 16,
      },
      AU: {
        organicTraffic: 461.3089855387807,
        organicKeywords: 8,
      },
    },
    backlinkMetrics: {
      backlinks: 426,
      referringDomains: 63,
      backlinksSpamScore: 21,
      targetSpamScore: 0,
    },
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
      chatgpt: {
        status: "available",
        endpoint: "/v3/ai_optimization/chat_gpt/llm_scraper/live/advanced",
      },
      gemini: {
        status: "available",
        endpoint: "/v3/ai_optimization/gemini/llm_scraper/live/advanced",
      },
      perplexity: {
        status: "unavailable",
        endpoint: "/v3/ai_optimization/perplexity/llm_scraper/live/advanced",
        reason: "[/v3/ai_optimization/perplexity/llm_scraper/live/advanced] Task status 40402: Invalid Path.",
      },
      google_ai_overview: {
        status: "available_via_serp",
        endpoint: "/v3/serp/google/organic/live/advanced",
      },
    },
  },
  tamModel: {
    estimateOnly: true,
    timeframeMonths: 12,
    markets: ["US", "AU"],
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
        phase: "Phase 1 (Months 0-3)",
        demand: 2403550,
        keywordCount: 387,
        estimatedReachableVisits: { low: 57910.17, base: 96516.95, high: 154427.13 },
      },
      {
        intent: "MOFU",
        phase: "Phase 2 (Months 4-8)",
        demand: 153130,
        keywordCount: 79,
        estimatedReachableVisits: { low: 1844.73, base: 3689.45, high: 6149.09 },
      },
      {
        intent: "TOFU",
        phase: "Phase 3 (Months 9-12)",
        demand: 12403000,
        keywordCount: 93,
        estimatedReachableVisits: { low: 74708.23, base: 149416.46, high: 249027.43 },
      },
    ],
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
    topOpportunityClusters: [
      {
        cluster: "Category & Brand Demand",
        intent: "TOFU",
        phase: "Phase 3 (Months 9-12)",
        demand: 12437710,
        keywordCount: 168,
        estimatedReachableVisits: { low: 75126.37, base: 150252.75, high: 250421.25 },
        sampleKeywords: ["outlook email", "free email services", "outlook email login", "godaddy email login"],
      },
      {
        cluster: "Buyer Guides",
        intent: "BOFU",
        phase: "Phase 1 (Months 0-3)",
        demand: 2403290,
        keywordCount: 381,
        estimatedReachableVisits: { low: 57903.91, base: 96506.51, high: 154410.42 },
        sampleKeywords: ["gmail inbox", "inbox", "shared inbox", "unified inbox", "team inbox", "ai inbox"],
      },
      {
        cluster: "Tools & Templates",
        intent: "MOFU",
        phase: "Phase 2 (Months 4-8)",
        demand: 118400,
        keywordCount: 2,
        estimatedReachableVisits: { low: 1426.34, base: 2852.68, high: 4754.47 },
        sampleKeywords: ["email generator", "email signature generator"],
      },
      {
        cluster: "Alternatives & Comparisons",
        intent: "BOFU",
        phase: "Phase 1 (Months 0-3)",
        demand: 190,
        keywordCount: 5,
        estimatedReachableVisits: { low: 4.58, base: 7.63, high: 12.21 },
        sampleKeywords: ["inbox alternative", "inbox vs gmail", "collaborative inbox vs shared mailbox"],
      },
      {
        cluster: "Pricing & Cost",
        intent: "BOFU",
        phase: "Phase 1 (Months 0-3)",
        demand: 70,
        keywordCount: 1,
        estimatedReachableVisits: { low: 1.69, base: 2.81, high: 4.5 },
        sampleKeywords: ["google workspace email pricing"],
      },
    ],
    revenueModel: {
      enabled: false,
      reason: "Revenue inputs missing (acv/aov). Showing TAM + pipeline potential only.",
      pipelinePotential: {
        leads: {
          low: 537.85,
          base: 2246.61,
          high: 6144.05,
        },
      },
    },
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
    assumptions: {
      channelSplit: { google: 0.86, ai: 0.14 },
      channelClickThrough: { google: 0.464, ai: 0.018 },
      captureRates: {
        BOFU: { low: 0.06, base: 0.1, high: 0.16 },
        MOFU: { low: 0.03, base: 0.06, high: 0.1 },
        TOFU: { low: 0.015, base: 0.03, high: 0.05 },
      },
    },
  },
  competitors: [
    {
      domain: "hiverhq.com",
      source: "seeded_competitor",
      queryHits: 0,
      queryCount: 0,
      bestRank: null as number | null,
      metrics: {
        organicTraffic: 282533.58254896477,
        organicKeywords: 26665,
        backlinks: 24240,
        referringDomains: 6001,
      },
    },
    {
      domain: "missiveapp.com",
      source: "product_competitor_discovery",
      queryHits: 3,
      queryCount: 2,
      bestRank: 8,
      metrics: {
        organicTraffic: 166300.31167035736,
        organicKeywords: 10931,
        backlinks: 23611,
        referringDomains: 2709,
      },
    },
    {
      domain: "intercom.com",
      source: "seeded_competitor",
      queryHits: 0,
      queryCount: 0,
      bestRank: null as number | null,
      metrics: {
        organicTraffic: 91288.66046237387,
        organicKeywords: 26720,
        backlinks: 1024186,
        referringDomains: 42379,
      },
    },
    {
      domain: "front.com",
      source: "seeded_competitor",
      queryHits: 0,
      queryCount: 0,
      bestRank: null as number | null,
      metrics: {
        organicTraffic: 86294.75961692631,
        organicKeywords: 12224,
        backlinks: 50566,
        referringDomains: 6049,
      },
    },
    {
      domain: "gmelius.com",
      source: "product_competitor_discovery",
      queryHits: 5,
      queryCount: 3,
      bestRank: 1,
      metrics: {
        organicTraffic: 80442.91756520234,
        organicKeywords: 10478,
        backlinks: 8830,
        referringDomains: 2337,
      },
    },
  ],
  keywordGaps: [
    { keyword: "all inboxes gmail", volume: 90, competition: "LOW", markets: ["US"], currentPosition: 60 },
    { keyword: "unified messaging app", volume: 90, competition: "LOW", markets: ["US"], currentPosition: 100 },
    { keyword: "gmail all inboxes", volume: 90, competition: "LOW", markets: ["US"], currentPosition: 105 },
    { keyword: "gmail automatic labels", volume: 70, competition: "LOW", markets: ["AU"], currentPosition: 80 },
    { keyword: "unified inbox email", volume: 40, competition: "MEDIUM", markets: ["US"], currentPosition: 40 },
    { keyword: "ai inbox", volume: 40, competition: "MEDIUM", markets: ["US"], currentPosition: 105 },
    { keyword: "multiple inboxes gmail", volume: 40, competition: "LOW", markets: ["AU"], currentPosition: 110 },
    { keyword: "unified inbox app", volume: 30, competition: "LOW", markets: ["US"], currentPosition: 29 },
  ],
  qualityGate: {
    passed: true,
    mode: "strict",
    metrics: {
      competitors: 5,
      keywords: 22,
      keywordUniverse: 559,
      prompts: 36,
      aiPlatformsWithSamples: 3,
      hasTam: true,
      hasOnPage: true,
    },
  },
  confidence: {
    payload: { score: 96, level: "high" },
    tam: { score: 90, level: "high" },
  },
  websiteAudit: {
    title: "Kinso: Unified Inbox, AI Assistant for Business Messages",
    description:
      "Bring every email, message and contact into one smart workspace. Kinso learns your goals, prioritises what matters and drafts replies in your voice.",
    wordCount: 724,
    internalLinks: 5,
    externalLinks: 4,
    schemaTypes: [] as string[],
    timeToInteractiveMs: 225,
    domCompleteMs: 405,
  },
};

const phasedPoints = researchData.tamModel.byIntent.map((item) => ({
  phase: item.phase,
  label: `${item.intent} capture`,
  low: Math.round(item.estimatedReachableVisits.low),
  base: Math.round(item.estimatedReachableVisits.base),
  high: Math.round(item.estimatedReachableVisits.high),
}));

const llmRows = [
  {
    platform: "ChatGPT",
    status: researchData.aiVisibility.platformAvailability.chatgpt.status,
    totalPrompts: researchData.aiVisibility.platformSummary.chatgpt.total,
    mentioned: researchData.aiVisibility.platformSummary.chatgpt.mentioned,
    mentionRate: researchData.aiVisibility.platformSummary.chatgpt.mentionRate,
    evidence: "Mentioned on brand/comparison prompts; absent on non-brand ‘best’ prompts.",
  },
  {
    platform: "Gemini",
    status: researchData.aiVisibility.platformAvailability.gemini.status,
    totalPrompts: researchData.aiVisibility.platformSummary.gemini.total,
    mentioned: researchData.aiVisibility.platformSummary.gemini.mentioned,
    mentionRate: researchData.aiVisibility.platformSummary.gemini.mentionRate,
    evidence: "Brand present on Kinso-specific prompts; category winners still competitor-led.",
  },
  {
    platform: "Google AI Overviews",
    status: researchData.aiVisibility.platformAvailability.google_ai_overview.status,
    totalPrompts: researchData.aiVisibility.platformSummary.google_ai_overview.total,
    mentioned: researchData.aiVisibility.platformSummary.google_ai_overview.mentioned,
    mentionRate: researchData.aiVisibility.platformSummary.google_ai_overview.mentionRate,
    evidence: "0/12 mentions despite AIO presence on relevant SERPs.",
  },
  {
    platform: "Perplexity",
    status: researchData.aiVisibility.platformAvailability.perplexity.status,
    totalPrompts: 0,
    mentioned: 0,
    mentionRate: 0,
    evidence: researchData.aiVisibility.platformAvailability.perplexity.reason,
  },
];

const immediateActions = [
  "Launch 12 high-intent Apex assets for unified inbox + shared inbox + alternatives within 45 days.",
  "Build Bing-indexed comparison layer (Kinso vs Superhuman / Missive / Gmelius / Front) to lift ChatGPT recommendation frequency.",
  "Deploy external authority sprint: Reddit, review surfaces, and expert bylines tied to each Apex asset within 14 days of publish.",
];

export default function StrategyKinso() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Kinso — AEO & SEO Strategy | MEMETIK";
  }, []);

  return (
    <StrategyPageFrame mainClassName="container mx-auto max-w-6xl">
      <Nav />

      <StrategyHero
        eyebrow={
          <>
            <Globe className="h-3.5 w-3.5" />
            Strategy Document /// March 2026
          </>
        }
        title={
          <>
            KINSO
            <br />
            AEO + SEO
          </>
        }
        accent="CATEGORY LOCK STRATEGY."
        subtitle={
          <>
            Kinso has a product story AI models can repeat, but not yet the retrieval density or authority signals
            required to win non-brand recommendation prompts. This plan is built to move Kinso from{" "}
            <span className="text-white">brand-mentioned</span> to <span className="text-white">category-recommended</span>{" "}
            across ChatGPT, Gemini, and Google AI surfaces.
          </>
        }
        tags={[
          "kinso.ai",
          "Communication / Unified AI Inbox",
          "US + AU",
          "Strict Research Mode",
          "TAM-first Planning",
        ]}
      >
        <StrategySectionShell className="mt-6" glow="blue">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <StrategyEyebrow className="mb-4">Executive Summary</StrategyEyebrow>
              <div className="grid gap-4 sm:grid-cols-3">
                <StrategyCard>
                  <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45 mb-2">Current Organic</div>
                  <div className="text-3xl font-display font-bold text-white">
                    {formatWhole(researchData.seoMetrics.organicTraffic)}
                  </div>
                  <div className="text-xs text-white/45 mt-2">monthly visits (US+AU estimate)</div>
                </StrategyCard>
                <StrategyCard>
                  <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45 mb-2">BOFU Demand</div>
                  <div className="text-3xl font-display font-bold text-white">
                    {formatWhole(researchData.tamModel.byIntent[0].demand)}
                  </div>
                  <div className="text-xs text-white/45 mt-2">12-month demand in validated buyer-guide cluster</div>
                </StrategyCard>
                <StrategyCard>
                  <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45 mb-2">AIO Mention Rate</div>
                  <div className="text-3xl font-display font-bold text-white">0%</div>
                  <div className="text-xs text-white/45 mt-2">0/12 prompts in Google AI Overviews sample</div>
                </StrategyCard>
              </div>
            </div>
            <StrategyCard glow="mixed">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-3">Top 3 Actions (Next 30-60 Days)</div>
              <BulletList items={immediateActions} />
            </StrategyCard>
          </div>
        </StrategySectionShell>
      </StrategyHero>

      <section className="mb-20">
        <SectionHeader number="00" title="State of Search 2026" />
        <StrategySectionShell glow="mixed">
          <div className="grid gap-6 lg:grid-cols-3">
            <StrategyCard className="lg:col-span-2">
              <h3 className="text-xl font-display font-bold text-white mb-4">The market shift that matters for Kinso</h3>
              <div className="space-y-4 text-sm leading-7 text-white/70">
                <p>
                  Unified inbox buyers now shortlist vendors inside answer engines before they click. In this dataset,
                  Kinso appears in brand-comparison contexts (e.g., “Kinso vs competitors”), but disappears in
                  high-intent non-brand prompts like “best unified AI inbox software.”
                </p>
                <p>
                  This is exactly the 2026 AEO pattern: visibility is no longer just keyword rankings. Winning requires
                  being repeatedly cited as the trusted entity across Google results, AI summaries, and external
                  authority surfaces.
                </p>
                <p>
                  The opportunity is not “more blog traffic.” It is recommendation share in buying prompts where
                  category decisions are formed.
                </p>
              </div>
            </StrategyCard>

            <StrategyCard glow="amber">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-3">What matters</div>
              <BulletList
                items={[
                  "ChatGPT mention rate: 33.33% (4/12), mostly brand-led prompts.",
                  "Gemini mention rate: 33.33% (4/12), similar pattern.",
                  "Google AI Overviews mention rate: 0% (0/12).",
                  "Perplexity endpoint unavailable in payload: visibility not yet measured.",
                ]}
              />
            </StrategyCard>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="flex items-center gap-2 text-[#f4e4cd] mb-2">
                <Brain className="h-4 w-4" />
                <div className="text-xs font-mono uppercase tracking-wider">Why it matters</div>
              </div>
              <p className="text-sm text-white/68">
                If Kinso is absent in non-brand recommendation prompts, it loses demand before users ever search
                directly for “Kinso”.
              </p>
            </StrategyCard>
            <StrategyCard>
              <div className="flex items-center gap-2 text-[#f4e4cd] mb-2">
                <Radar className="h-4 w-4" />
                <div className="text-xs font-mono uppercase tracking-wider">What to do next</div>
              </div>
              <p className="text-sm text-white/68">
                Build a dense “best / alternatives / vs / implementation” asset graph and back it with third-party
                citations and entity consistency.
              </p>
            </StrategyCard>
            <StrategyCard>
              <div className="flex items-center gap-2 text-[#f4e4cd] mb-2">
                <ShieldCheck className="h-4 w-4" />
                <div className="text-xs font-mono uppercase tracking-wider">Guardrail</div>
              </div>
              <p className="text-sm text-white/68">
                Headline targets are tied to validated topical buyer-guide clusters, not broad “email login” keyword
                noise present in semantic expansion.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="01" title="Current State Snapshot" />
        <StrategySectionShell glow="blue">
          <StatsGrid
            columns={4}
            stats={[
              { label: "Organic Traffic", value: formatWhole(researchData.seoMetrics.organicTraffic), icon: <LineChart className="h-5 w-5" /> },
              { label: "Organic Keywords", value: formatWhole(researchData.seoMetrics.organicKeywords), icon: <Search className="h-5 w-5" /> },
              { label: "Backlinks", value: formatWhole(researchData.seoMetrics.backlinks), icon: <Link2 className="h-5 w-5" /> },
              { label: "Referring Domains", value: formatWhole(researchData.seoMetrics.referringDomains), icon: <Globe className="h-5 w-5" /> },
            ]}
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <HighlightBox>
              <h3 className="text-lg font-display font-bold text-white mb-4">Snapshot: where Kinso stands</h3>
              <BulletList
                items={[
                  `US visibility baseline remains low (${formatOne(researchData.seoMetrics.markets.US.organicTraffic)} est. organic visits).`,
                  `AU contributes most current organic share (${formatOne(researchData.seoMetrics.markets.AU.organicTraffic)} est. organic visits).`,
                  "Homepage has no detected schema types in on-page sample.",
                  "Current ranking footprint is mostly brand and adjacent terms, not controlled category entities.",
                  "Backlink profile exists but authority gap vs category leaders remains large.",
                ]}
              />
            </HighlightBox>

            <StrategyCard glow="mixed">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-3">
                Confidence & Data Health
              </div>
              <div className="space-y-3 text-sm text-white/68">
                <p>
                  Research payload confidence:{" "}
                  <span className="text-white font-medium">
                    {researchData.confidence.payload.level} ({researchData.confidence.payload.score}/100)
                  </span>
                </p>
                <p>
                  TAM model confidence:{" "}
                  <span className="text-white font-medium">
                    {researchData.confidence.tam.level} ({researchData.confidence.tam.score}/100)
                  </span>
                </p>
                <p>
                  Quality gate mode: <span className="text-white font-medium">{researchData.qualityGate.mode}</span>{" "}
                  (passed with {researchData.qualityGate.metrics.competitors} competitors,{" "}
                  {researchData.qualityGate.metrics.keywordUniverse} universe keywords,{" "}
                  {researchData.qualityGate.metrics.prompts} prompts).
                </p>
              </div>
            </StrategyCard>
          </div>
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="02" title="Data-backed Competitive Landscape" />
        <StrategySectionShell glow="amber">
          <DataTable
            headers={[
              "Domain",
              "Organic Traffic",
              "Organic Keywords",
              "Backlinks",
              "Referring Domains",
              "Prompt Query Hits",
              "Best Observed Rank",
              "Source",
            ]}
            rows={[
              [
                "kinso.ai (target)",
                formatWhole(researchData.seoMetrics.organicTraffic),
                formatWhole(researchData.seoMetrics.organicKeywords),
                formatWhole(researchData.seoMetrics.backlinks),
                formatWhole(researchData.seoMetrics.referringDomains),
                "—",
                "—",
                "target",
              ],
              ...researchData.competitors.map((c) => [
                c.domain,
                formatWhole(c.metrics.organicTraffic),
                formatWhole(c.metrics.organicKeywords),
                formatWhole(c.metrics.backlinks),
                formatWhole(c.metrics.referringDomains),
                `${c.queryHits}/${c.queryCount}`,
                c.bestRank ? `#${c.bestRank}` : "n/a",
                c.source,
              ]),
            ]}
            highlightRow={0}
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-2">What matters</div>
              <p className="text-sm text-white/68">
                Kinso competes against domains with 35x–2,700x more referring domains. Entity trust is the bottleneck,
                not just on-page optimization.
              </p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-2">Why it matters</div>
              <p className="text-sm text-white/68">
                LLM recommendation frequency is heavily reinforced by external authority and repeated co-citation across
                search surfaces.
              </p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-2">What to do next</div>
              <p className="text-sm text-white/68">
                Prioritize high-leverage comparison assets + authority placements that name Kinso next to Missive,
                Front, and Gmelius in buyer contexts.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="03" title="AI Visibility by LLM" />
        <StrategySectionShell glow="blue">
          <div className="mb-6">
            <StatsGrid
              columns={4}
              stats={[
                {
                  label: "Prompts Analyzed",
                  value: formatWhole(researchData.aiVisibility.promptsAnalyzed),
                  icon: <MessagesSquare className="h-5 w-5" />,
                },
                {
                  label: "Client Mentioned Prompts",
                  value: formatWhole(researchData.aiVisibility.clientMentionedPrompts),
                  icon: <Bot className="h-5 w-5" />,
                },
                {
                  label: "ChatGPT Mention Rate",
                  value: formatPercent(researchData.aiVisibility.platformSummary.chatgpt.mentionRate),
                  icon: <Brain className="h-5 w-5" />,
                },
                {
                  label: "Google AIO Mention Rate",
                  value: `${researchData.aiVisibility.platformSummary.google_ai_overview.mentionRate}%`,
                  icon: <AlertTriangle className="h-5 w-5" />,
                },
              ]}
            />
          </div>

          <DataTable
            headers={["Platform", "Availability", "Mentions", "Total Tests", "Mention Rate", "Evidence Summary"]}
            rows={llmRows.map((r) => [
              r.platform,
              r.status,
              String(r.mentioned),
              String(r.totalPrompts),
              `${r.mentionRate}%`,
              r.evidence,
            ])}
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <StrategyCard>
              <h3 className="text-lg font-display font-bold text-white mb-3">Prompt evidence pattern</h3>
              <BulletList
                items={[
                  "Kinso appears on brand prompts (“Kinso alternatives”, “Kinso vs competitors”).",
                  "Kinso is absent in sampled generic “best unified AI inbox” prompts across ChatGPT and Gemini.",
                  "Google AI Overviews sampled with 0 explicit Kinso mentions, despite AIO surfaces being present.",
                  "Competitive evidence shows gmelius.com captured at least one high-intent query with cross-platform hits.",
                ]}
              />
            </StrategyCard>

            <HighlightBox>
              <h3 className="text-lg font-display font-bold text-white mb-3">Platform caveat surfaced openly</h3>
              <p className="text-sm text-white/68 leading-7">
                Perplexity in this payload is marked <span className="text-white">unavailable</span> due to API path
                status 40402. This strategy does not hide that gap. Perplexity coverage should be added in the next
                audit pass before declaring full cross-LLM dominance.
              </p>
            </HighlightBox>
          </div>
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="04" title="Full Keyword Universe" />
        <StrategySectionShell glow="mixed">
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">Universe Size</div>
              <div className="text-3xl font-display font-bold text-white mt-2">
                {formatWhole(researchData.tamModel.keywordUniverse.size)}
              </div>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">Anchor-Matched Terms</div>
              <div className="text-3xl font-display font-bold text-white mt-2">
                {formatWhole(researchData.tamModel.keywordUniverse.anchorMatchedCount)}
              </div>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">Semantic Contribution</div>
              <div className="text-3xl font-display font-bold text-white mt-2">
                {formatPercent(researchData.tamModel.keywordUniverse.semanticContribution.demandSharePercent)}
              </div>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">Keyword Gaps</div>
              <div className="text-3xl font-display font-bold text-white mt-2">
                {formatWhole(researchData.keywordGaps.length)}
              </div>
            </StrategyCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            <DataTable
              headers={["Intent", "Keyword Count", "Primary Role", "Priority"]}
              rows={[
                ["BOFU", formatWhole(researchData.tamModel.keywordUniverse.countsByIntent.BOFU), "Buyer guides / alternatives / shared inbox software", "Highest"],
                ["MOFU", formatWhole(researchData.tamModel.keywordUniverse.countsByIntent.MOFU), "Workflow tooling + implementation context", "Medium"],
                ["TOFU", formatWhole(researchData.tamModel.keywordUniverse.countsByIntent.TOFU), "Broad category discovery / demand shaping", "Medium-Late"],
              ]}
              className="h-full"
            />
            <DataTable
              headers={["Source", "Count", "Interpretation"]}
              rows={[
                [
                  "semantic_expansion",
                  formatWhole(researchData.tamModel.keywordUniverse.countsBySource.semantic_expansion),
                  "Breadth signal; includes broad and sometimes ambiguous terms.",
                ],
                [
                  "competitor_keywords",
                  formatWhole(researchData.tamModel.keywordUniverse.countsBySource.competitor_keywords),
                  "Direct evidence of what currently drives competing domains.",
                ],
                [
                  "target_ranked_keywords",
                  formatWhole(researchData.tamModel.keywordUniverse.countsBySource.target_ranked_keywords),
                  "Current ranking footprint for Kinso.",
                ],
                [
                  "keyword_gaps",
                  formatWhole(researchData.tamModel.keywordUniverse.countsBySource.keyword_gaps),
                  "Immediate ranking opportunities already detected.",
                ],
              ]}
              className="h-full"
            />
          </div>

          <DataTable
            headers={["Cluster", "Intent", "Demand", "Keyword Count", "Low/Base/High Reachable Visits", "Sample Keywords"]}
            rows={researchData.tamModel.topOpportunityClusters.map((c) => [
              c.cluster,
              c.intent,
              formatWhole(c.demand),
              formatWhole(c.keywordCount),
              `${formatWhole(c.estimatedReachableVisits.low)} / ${formatWhole(c.estimatedReachableVisits.base)} / ${formatWhole(c.estimatedReachableVisits.high)}`,
              c.sampleKeywords.join(", "),
            ])}
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-2">What matters</div>
              <p className="text-sm text-white/68">
                BOFU “Buyer Guides” is the cleanest topical capture zone (387 keywords) and should anchor phase 1.
              </p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-2">Why it matters</div>
              <p className="text-sm text-white/68">
                Broad TOFU terms can inflate TAM with low-intent email navigation queries. They are useful for brand
                education, but not first for conversion capture.
              </p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-2">What to do next</div>
              <p className="text-sm text-white/68">
                Keep headline planning metrics anchored to validated buyer-guide / alternatives / implementation
                clusters before expanding to broad category demand.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="05" title="Total Addressable Search Market (12 months)" />
        <StrategySectionShell glow="amber">
          <div className="flex items-center justify-between mb-5">
            <StrategyEyebrow>estimate-only • US + AU modeled</StrategyEyebrow>
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/42">
              timeframe: {researchData.tamModel.timeframeMonths} months
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">Total Search Demand</div>
              <div className="text-3xl font-display font-bold text-white mt-2">
                {formatWhole(researchData.tamModel.totals.totalAddressableSearchDemand)}
              </div>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">Reachable Visits (Low)</div>
              <div className="text-3xl font-display font-bold text-white mt-2">
                {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.low)}
              </div>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">Reachable Visits (Base)</div>
              <div className="text-3xl font-display font-bold text-[#f4e4cd] mt-2">
                {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base)}
              </div>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">Reachable Visits (High)</div>
              <div className="text-3xl font-display font-bold text-white mt-2">
                {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.high)}
              </div>
            </StrategyCard>
          </div>

          <DataTable
            headers={["Channel", "Demand", "Low Reachable", "Base Reachable", "High Reachable", "Assumed CTR"]}
            rows={[
              [
                "Google",
                formatWhole(researchData.tamModel.totals.byChannel.google.demand),
                formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.low),
                formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.base),
                formatWhole(researchData.tamModel.totals.byChannel.google.estimatedReachableVisits.high),
                `${(researchData.tamModel.assumptions.channelClickThrough.google * 100).toFixed(1)}%`,
              ],
              [
                "AI Surfaces",
                formatWhole(researchData.tamModel.totals.byChannel.ai.demand),
                formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.low),
                formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.base),
                formatWhole(researchData.tamModel.totals.byChannel.ai.estimatedReachableVisits.high),
                `${(researchData.tamModel.assumptions.channelClickThrough.ai * 100).toFixed(1)}%`,
              ],
            ]}
          />

          <HighlightBox className="mt-6">
            <h3 className="text-lg font-display font-bold text-white mb-2">Topical guardrail disclosure</h3>
            <p className="text-sm text-white/68 leading-7">
              The full TAM includes broad semantic demand where some terms are category-adjacent (e.g., generic email
              login behavior). For execution planning, Kinso should prioritize the validated buyer-guide and
              comparison-heavy subset first, then expand into broader TOFU once authority compounding is visible.
            </p>
          </HighlightBox>

          {!researchData.tamModel.revenueModel.enabled ? (
            <StrategyCard className="mt-6" glow="mixed">
              <div className="flex items-center gap-2 text-[#f4e4cd] mb-2">
                <AlertTriangle className="h-4 w-4" />
                <div className="text-xs font-mono uppercase tracking-[0.18em]">Revenue model status</div>
              </div>
              <p className="text-sm text-white/68">
                Revenue modeling requires client ACV/AOV and funnel inputs. Current output is TAM + pipeline potential
                only.
              </p>
            </StrategyCard>
          ) : null}
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="06" title="Phased Upside (12 months)" />
        <StrategySectionShell glow="blue">
          <div className="flex items-center justify-between mb-5">
            <StrategyEyebrow>estimate-only • rounded planning values</StrategyEyebrow>
            <div className="text-xs text-white/45">Low / Base / High scenarios</div>
          </div>

          <PhasedUpsideChart points={phasedPoints} />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {researchData.tamModel.byIntent.map((phase) => (
              <StrategyCard key={phase.phase}>
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45 mb-2">{phase.phase}</div>
                <div className="text-lg font-bold text-white mb-1">{phase.intent}</div>
                <div className="text-sm text-white/68 mb-3">
                  Demand: <span className="text-white">{formatWhole(phase.demand)}</span> • Keywords:{" "}
                  <span className="text-white">{formatWhole(phase.keywordCount)}</span>
                </div>
                <div className="text-xs text-white/45">
                  Reachable (L/B/H): {formatWhole(phase.estimatedReachableVisits.low)} /{" "}
                  {formatWhole(phase.estimatedReachableVisits.base)} /{" "}
                  {formatWhole(phase.estimatedReachableVisits.high)}
                </div>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="07" title="Execution Blueprint (What Kinso Should Ship)" />
        <StrategySectionShell glow="mixed">
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <PhaseBlock
                number="01"
                icon={<Target className="h-4 w-4" />}
                label="Phase 1 — Months 0-3"
                title="Money Entity Capture"
              >
                <div className="space-y-5">
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Search className="h-4 w-4 text-[#f4e4cd]" />
                      What to publish first
                    </h4>
                    <BulletList
                      items={[
                        "Best unified AI inbox tools (with transparent methodology).",
                        "Kinso vs Superhuman, Kinso vs Missive, Kinso vs Front, Kinso vs Gmelius.",
                        "Superhuman alternatives for founders / GTM teams (with Kinso included).",
                        "Shared inbox for Gmail / Outlook: implementation pages tied to Kinso workflows.",
                        "Unified inbox app and AI inbox explainer pages answering in first 40-60 words.",
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">Expected outcome</h4>
                    <p className="text-sm text-white/68 leading-7">
                      Shift from mostly brand-only mentions to consistent inclusion in “best” and “alternatives”
                      shortlists where purchase decisions begin.
                    </p>
                  </div>
                </div>
              </PhaseBlock>

              <PhaseBlock
                number="02"
                icon={<Workflow className="h-4 w-4" />}
                label="Phase 2 — Months 4-8"
                title="Workflow & Implementation Layer"
              >
                <div className="space-y-5">
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Layers className="h-4 w-4 text-[#f4e4cd]" />
                      MOFU depth build
                    </h4>
                    <BulletList
                      items={[
                        "Unified inbox workflow templates (sales, founder, support, recruiting).",
                        "Email triage workflow playbooks linked to product proof.",
                        "Migration guides from fragmented stacks to Kinso.",
                        "Schema layer: FAQPage + HowTo + SoftwareApplication + Organization.",
                        "Hub pages connecting each workflow page back to comparison and CTA assets.",
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">Expected outcome</h4>
                    <p className="text-sm text-white/68 leading-7">
                      Improve retrieval density and answer completeness so models can cite Kinso for “how to” and
                      implementation prompts, not just vendor-name prompts.
                    </p>
                  </div>
                </div>
              </PhaseBlock>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <PhaseBlock
                number="03"
                icon={<Compass className="h-4 w-4" />}
                label="Phase 3 — Months 9-12"
                title="Authority Distribution & Multi-surface Ownership"
              >
                <div className="space-y-5">
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Link2 className="h-4 w-4 text-[#f4e4cd]" />
                      Trust relay execution
                    </h4>
                    <BulletList
                      items={[
                        "For each Apex asset, publish 5-10 derivative placements within 14 days.",
                        "Bing-first technical hygiene: Bing Webmaster Tools + IndexNow + sitemap parity.",
                        "Reddit and community seeding around practical unified inbox workflows.",
                        "Review-surface consistency (G2/Capterra/Trustpilot where category-fit exists).",
                        "Consistent entity naming across site, social profiles, and external citations.",
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">Expected outcome</h4>
                    <p className="text-sm text-white/68 leading-7">
                      Increase model trust signals required for default recommendation behavior, especially in
                      ChatGPT/Gemini response scaffolds.
                    </p>
                  </div>
                </div>
              </PhaseBlock>

              <PhaseBlock
                number="04"
                icon={<RotateIcon />}
                label="Ongoing — Weekly / Monthly"
                title="Measurement, Prompt Ops, and Reinforcement"
              >
                <div className="space-y-5">
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4 text-[#f4e4cd]" />
                      Operating cadence
                    </h4>
                    <BulletList
                      items={[
                        "Weekly prompt pack across priority buyer queries in US + AU.",
                        "Monthly competitor citation delta report (Kinso vs Missive/Front/Gmelius/Hiver).",
                        "Quarterly refresh of top 10 money assets with new comparisons and proof.",
                        "Cannibalization checks + internal link map updates for KG expansion.",
                        "Re-audit Perplexity once endpoint support is restored.",
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">Expected outcome</h4>
                    <p className="text-sm text-white/68 leading-7">
                      Convert one-time content pushes into a compounding answer-share system with visible defensive
                      moats.
                    </p>
                  </div>
                </div>
              </PhaseBlock>
            </div>
          </div>
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="08" title="TAM × LTV Calculator" />
        <StrategySectionShell glow="amber">
          <div className="mb-5 grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45 mb-2">Base Reachable Visits</div>
              <div className="text-2xl font-display font-bold text-white">
                {formatWhole(researchData.tamModel.totals.estimatedReachableVisits.base)}
              </div>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45 mb-2">Pipeline Potential (Base Leads)</div>
              <div className="text-2xl font-display font-bold text-white">
                {formatWhole(researchData.tamModel.revenueModel.pipelinePotential.leads.base)}
              </div>
            </StrategyCard>
            <StrategyCard>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/45 mb-2">Modeling Status</div>
              <div className="text-sm text-white/68 leading-6 mt-1">
                Revenue modeling requires client ACV/AOV and funnel inputs.
              </div>
            </StrategyCard>
          </div>

          <TamRoiCalculator
            baseReachableVisits={Math.round(researchData.tamModel.totals.estimatedReachableVisits.base)}
            defaultLtv={0}
            defaultVisitToCustomerRate={0.01}
          />
        </StrategySectionShell>
      </section>

      <section className="mb-20">
        <SectionHeader number="09" title="Assumptions & Confidence" />
        <StrategySectionShell glow="blue">
          <div className="flex items-center justify-between mb-6">
            <StrategyEyebrow>estimate-only methodology</StrategyEyebrow>
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/42">
              tam confidence: {researchData.tamModel.confidence.level} ({researchData.tamModel.confidence.score}/100)
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            <StrategyCard>
              <h3 className="text-lg font-display font-bold text-white mb-3">Model assumptions used</h3>
              <BulletList
                items={[
                  `Channel split: Google ${(researchData.tamModel.assumptions.channelSplit.google * 100).toFixed(0)}% / AI ${(researchData.tamModel.assumptions.channelSplit.ai * 100).toFixed(0)}%.`,
                  `Channel CTR: Google ${(researchData.tamModel.assumptions.channelClickThrough.google * 100).toFixed(1)}%, AI ${(researchData.tamModel.assumptions.channelClickThrough.ai * 100).toFixed(1)}%.`,
                  "Capture rates modeled by intent stage (BOFU/MOFU/TOFU) with low/base/high scenarios.",
                  "Displayed phased upside values rounded to whole numbers for planning readability.",
                  "US + AU only for this model horizon.",
                ]}
              />
            </StrategyCard>

            <StrategyCard>
              <h3 className="text-lg font-display font-bold text-white mb-3">Confidence notes & caveats</h3>
              <BulletList
                items={[
                  "No explicit topicalIntegrity object in payload; conservative topical filtering applied manually in strategy narrative.",
                  "Large semantic expansion set includes ambiguous non-commercial queries; not all should be roadmap-priority.",
                  "Perplexity sampling unavailable in this run due to endpoint error; platform view is incomplete.",
                  "AI mention data is directional and should be re-tested on a fixed monthly query set.",
                  "Revenue output disabled until first-party ACV/AOV and funnel rates are supplied.",
                ]}
              />
            </StrategyCard>
          </div>

          <DataTable
            headers={["Component", "Status", "Confidence", "Notes"]}
            rows={[
              ["Competitive metrics", "available", "high", "5 direct competitors with traffic, keyword, backlink, and ref-domain data."],
              ["Prompt-based AI visibility", "available", "high", "36 prompts across ChatGPT, Gemini, Google AIO surfaces."],
              ["Perplexity visibility", "unavailable", "low", researchData.aiVisibility.platformAvailability.perplexity.reason],
              ["TAM model", "available", "high", "12-month low/base/high model with by-intent phasing."],
              ["Revenue model", "disabled", "n/a", "Revenue modeling requires client ACV/AOV and funnel inputs."],
            ]}
          />
        </StrategySectionShell>
      </section>

      <StrategyCTA
        eyebrow="Book Strategy Call"
        title="Turn Kinso Into the Default Recommendation"
        body="If you want, we’ll convert this into a live 90-day execution sprint: money-entity content map, LLM prompt monitoring, authority distribution plan, and weekly reinforcement cadence."
        href="https://cal.com/memetik/letstalk"
        ctaLabel="Book a Strategy Call"
      />
    </StrategyPageFrame>
  );
}

function RotateIcon() {
  return <TrendingUp className="h-4 w-4" />;
}