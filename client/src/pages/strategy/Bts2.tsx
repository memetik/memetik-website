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
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyCTA,
  StrategySectionLead,
  StrategyAppendixSection,
  ExecutionInfographic,
  StrategyEyebrow,
} from "@/components/strategy";
import {
  Bot,
  Compass,
  Database,
  Globe,
  LineChart,
  Radar,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  Target,
  Workflow,
} from "lucide-react";

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
    markets: {
      US: { organicTraffic: 157.9689934104681, organicKeywords: 18 },
      AU: { organicTraffic: 3.990000009536743, organicKeywords: 1 },
    },
    backlinkMetrics: {
      backlinksSpamScore: 44,
      targetSpamScore: 9,
    },
  },
  competitors: [
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
      name: "Skool",
      domain: "skool.com",
      organicTraffic: 208627.291008858,
      organicKeywords: 52170,
      backlinks: 6040046,
      referringDomains: 73244,
      promptQueryHits: 0,
      promptQueryCount: 0,
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
  ],
  tamModel: {
    totals: {
      totalSearchOpportunity: 2268640,
      expectedTraffic12Months: { low: 118614.1, base: 191043.1, high: 285366.8 },
      aggressiveUpside: 285366.8,
      first90DayTarget: { low: 14233.69, base: 28656.46, high: 51366.03 },
      byChannel: {
        google: { demand: 1951030.4 },
        ai: { demand: 317609.6 },
      },
    },
    monthlyTrajectory: [
      { month: 1, low: 3558.42, base: 7641.72, high: 14268.34 },
      { month: 2, low: 4744.56, base: 9552.15, high: 17122.01 },
      { month: 3, low: 5930.71, base: 11462.59, high: 19975.68 },
      { month: 4, low: 7116.85, base: 13373.02, high: 22829.34 },
      { month: 5, low: 8302.99, base: 13373.02, high: 22829.34 },
      { month: 6, low: 9489.13, base: 15283.45, high: 25683.01 },
      { month: 7, low: 9489.13, base: 15283.45, high: 25683.01 },
      { month: 8, low: 10675.27, base: 17193.88, high: 25683.01 },
      { month: 9, low: 11861.41, base: 17193.88, high: 25683.01 },
      { month: 10, low: 13047.55, base: 19104.31, high: 28536.68 },
      { month: 11, low: 16605.97, base: 24835.6, high: 28536.68 },
      { month: 12, low: 17792.12, base: 26746.03, high: 28536.68 },
    ],
    topOpportunityClusters: [
      {
        cluster: "Category & Brand Demand",
        intent: "TOFU",
        demand: 2228330,
        keywordCount: 513,
        sampleKeywords: ["patreon", "kajabi", "skool", "behind the scenes"],
      },
      {
        cluster: "Buyer Guides",
        intent: "BOFU",
        demand: 26590,
        keywordCount: 94,
        sampleKeywords: ["creator monetization platform", "creator platform", "circle app"],
      },
      {
        cluster: "Alternatives & Comparisons",
        intent: "BOFU",
        demand: 8470,
        keywordCount: 117,
        sampleKeywords: ["patreon alternative", "kajabi alternative", "skool alternative"],
      },
      {
        cluster: "Pricing & Cost",
        intent: "BOFU",
        demand: 4910,
        keywordCount: 3,
        sampleKeywords: ["kajabi pricing", "skool pricing", "patreon cost"],
      },
      {
        cluster: "Reviews & Social Proof",
        intent: "BOFU",
        demand: 320,
        keywordCount: 8,
        sampleKeywords: ["skool reviews", "creator platform review"],
      },
    ],
    assumptions: {
      founderReadableSummary: [
        "Total search opportunity is the full validated market demand across Google and AI discovery.",
        "Expected traffic in 12 months assumes strong execution against the highest-value BOFU, MOFU, and TOFU wedges.",
        "Aggressive upside reflects what happens if the company wins its initial wedge early and compounds faster across the year.",
      ],
      trafficChannels: { google: 0.86, ai: 0.14 },
    },
    revenueModel: {
      enabled: false,
      reason: "Revenue inputs missing (acv/aov). Showing TAM + pipeline potential only.",
      pipelinePotential: {
        leads: { low: 474.46, base: 1719.39, high: 4280.5 },
      },
    },
    confidence: {
      score: 100,
      level: "high",
      reasons: [
        "Sufficient TAM volume identified.",
        "Strong full keyword universe coverage.",
        "Topical integrity checks passed for the keyword universe.",
        "AI visibility sampled across multiple platforms.",
        "Revenue model is estimate-only and missing first-party monetary inputs.",
      ],
    },
  },
  aiVisibility: {
    platformSummary: {
      chatgpt: { total: 16, mentioned: 4, mentionRate: 25 },
      gemini: { total: 16, mentioned: 6, mentionRate: 37.5 },
      google_ai_overview: { total: 16, mentioned: 0, mentionRate: 0 },
    },
    promptExamples: [
      {
        query: "best creator monetization platform",
        result: "Not mentioned in ChatGPT US/AU, Gemini US/AU, or Google AI Overview samples.",
        implication: "High-intent category discovery is still largely captured by incumbents.",
      },
      {
        query: "behind the scenes creator monetization platform alternatives",
        result: "Mentioned in ChatGPT (US + AU) and Gemini (US + AU), absent in Google AI Overview samples.",
        implication: "Brand recall exists when prompted directly, but broad SERP-layer presence is missing.",
      },
      {
        query: "how to choose a creator monetization platform",
        result: "Mentioned in Gemini US, absent in most other samples.",
        implication: "Partial AI visibility exists but is inconsistent across answer engines.",
      },
    ],
  },
  topicalIntegrity: {
    passed: true,
    metrics: {
      semanticOnlyDemandSharePercent: 8.57,
      lowQualitySemanticDemandSharePercent: 0.01,
      ambiguousPromptMentions: 0,
      validatedPromptMentions: 10,
      topicallyRelevantTopKeywordCount: 20,
    },
    sampleLowQualitySemanticKeywords: [
      "voices of the void patreon",
      "content creator vs digital creator",
      "alternative sims 4 cc patreon",
      "business profile vs creator profile",
      "digital creator or content creator",
    ],
  },
  rankedKeywords: [
    { keyword: "behind the scenes", volume: 20000, position: 41, intent: "TOFU" },
    { keyword: "behind scenes", volume: 18100, position: 39, intent: "TOFU" },
    { keyword: "behind-the-scenes", volume: 18100, position: 62, intent: "TOFU" },
    { keyword: "bts videographer", volume: 1600, position: 63, intent: "TOFU" },
    { keyword: "skool vs patreon", volume: 70, position: 21, intent: "BOFU" },
    { keyword: "behind the scenes content", volume: 70, position: 55, intent: "TOFU" },
  ],
  websiteAudit: {
    title:
      "Best Creator Platform in 2026 | Earn From Your Content - Behind the Scenes",
    wordCount: 1087,
    internalLinks: 6,
    externalLinks: 9,
    schemaTypes: [],
    timeToInteractiveMs: 1220,
    domCompleteMs: 2710,
  },
};

const formatWhole = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));

const formatCompact = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return formatWhole(value);
};

export default function StrategyBts2() {
  useEffect(() => {
    document.title = "Behind the Scenes × Memetik | AEO Strategy 2026";
    window.scrollTo(0, 0);
  }, []);

  const monthlyPoints = researchData.tamModel.monthlyTrajectory.map((point) => ({
    label: `M${point.month}`,
    low: point.low,
    base: point.base,
    high: point.high,
  }));

  const execStats = [
    {
      label: "Total search opportunity",
      value: formatWhole(researchData.tamModel.totals.totalSearchOpportunity),
      valueClassName: "text-[clamp(1.55rem,2.35vw,2.25rem)]",
      icon: <Globe className="h-5 w-5" />,
      note: "Validated creator-platform demand across US + AU.",
    },
    {
      label: "Expected traffic in 12 months",
      value: formatWhole(researchData.tamModel.totals.expectedTraffic12Months.base),
      valueClassName: "text-[clamp(1.55rem,2.35vw,2.25rem)]",
      icon: <LineChart className="h-5 w-5" />,
      note: "Base-case outcome from a focused 12-month search + AI program.",
    },
    {
      label: "Aggressive upside",
      value: formatWhole(researchData.tamModel.totals.aggressiveUpside),
      valueClassName: "text-[clamp(1.55rem,2.35vw,2.25rem)]",
      icon: <Rocket className="h-5 w-5" />,
      note: "If BTS wins first wedge early and compounds authority faster.",
    },
    {
      label: "First 90-day target",
      value: formatWhole(researchData.tamModel.totals.first90DayTarget.base),
      valueClassName: "text-[clamp(1.55rem,2.35vw,2.25rem)]",
      icon: <Target className="h-5 w-5" />,
      note: "Early traction target focused on high-intent category and comparison pages.",
    },
  ];

  const competitorRows = researchData.competitors.map((competitor) => [
    competitor.name,
    competitor.domain,
    formatCompact(competitor.organicTraffic),
    formatWhole(competitor.organicKeywords),
    formatCompact(competitor.referringDomains),
    `${competitor.promptQueryHits}/${competitor.promptQueryCount}`,
  ]);

  const platformCards = [
    {
      name: "ChatGPT",
      mentionRate: researchData.aiVisibility.platformSummary.chatgpt.mentionRate,
      mentions: `${researchData.aiVisibility.platformSummary.chatgpt.mentioned}/${researchData.aiVisibility.platformSummary.chatgpt.total}`,
      driver: "Strongly influenced by Bing-indexed entities and authoritative comparative pages.",
    },
    {
      name: "Gemini",
      mentionRate: researchData.aiVisibility.platformSummary.gemini.mentionRate,
      mentions: `${researchData.aiVisibility.platformSummary.gemini.mentioned}/${researchData.aiVisibility.platformSummary.gemini.total}`,
      driver: "Leans on Google surfaces and entity clarity, especially for market-level recommendations.",
    },
    {
      name: "Google AI Overviews",
      mentionRate: researchData.aiVisibility.platformSummary.google_ai_overview.mentionRate,
      mentions: `${researchData.aiVisibility.platformSummary.google_ai_overview.mentioned}/${researchData.aiVisibility.platformSummary.google_ai_overview.total}`,
      driver: "Depends on top-10 organic presence and extraction-ready comparison content.",
    },
  ];

  return (
    <StrategyPageFrame>
      <Nav />
      <div className="mx-auto w-full max-w-[1200px]">
        <StrategyHero
          eyebrow={
            <>
              Strategy Memo • {researchData.company.name} • {researchData.company.industry}
            </>
          }
          title="How Behind the Scenes can own creator monetization intent"
          accent="across Google and AI answers"
          subtitle={
            <>
              BTS already has a product and positioning that AI engines can understand. The gap is distribution and
              structured demand capture. This plan focuses on owning high-intent creator-platform comparisons first, then
              compounding into broader category authority.
            </>
          }
          tags={[
            researchData.company.domain,
            researchData.company.category,
            "US + AU market focus",
            "Founder-facing strategy",
          ]}
        >
          <StrategySectionShell className="mt-4" glow="blue">
            <div className="mb-6 flex items-center justify-between gap-4">
              <StrategyEyebrow>Executive Summary</StrategyEyebrow>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                5-minute read
              </div>
            </div>

            <StatsGrid stats={execStats} columns={4} className="mb-6" />

            <HighlightBox>
              <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
                <div>
                  <h3 className="text-xl font-display font-semibold text-white">
                    Immediate actions for the next 30 days
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    The fastest path is to capture comparison-driven queries where buyers build shortlists, while making
                    BTS easier for answer engines to cite with confidence.
                  </p>
                </div>
                <BulletList
                  items={[
                    "Ship a focused comparison cluster: Patreon alternatives, Kajabi alternatives, Skool alternatives.",
                    "Create one flagship ‘Best creator monetization platform’ page with clear verdict logic and schema.",
                    "Launch weekly AI prompt tracking across ChatGPT, Gemini, and Google AI Overview trigger queries.",
                  ]}
                />
              </div>
            </HighlightBox>
          </StrategySectionShell>
        </StrategyHero>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="mixed">
            <SectionHeader number="00" title="State of Search 2026" />
            <StrategySectionLead
              takeaway="Google still drives core commercial discovery, but AI answers now shape the shortlist before clicks."
              body="Buyers now move across Google, ChatGPT, Gemini, and AI Overviews before they ever book a demo. This is not an SEO-or-AI decision. Winning brands are discoverable in both classic search results and AI recommendation layers."
              implication="For BTS, that means publishing pages that rank in Google and are easy for answer engines to extract, cite, and trust."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <StrategyCard glow="blue">
                <div className="mb-3 flex text-[#f4e4cd]">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Google remains the demand engine</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  Top-10 organic visibility is still the largest driver of category discovery and buying research.
                </p>
              </StrategyCard>
              <StrategyCard glow="blue">
                <div className="mb-3 flex text-[#f4e4cd]">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI shapes who gets shortlisted</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  Answer engines compress comparison behavior into a single recommendation moment. If BTS is not named,
                  intent leaks to incumbents.
                </p>
              </StrategyCard>
              <StrategyCard glow="blue">
                <div className="mb-3 flex text-[#f4e4cd]">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Cross-surface coverage is now the moat</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  The winners align content, authority, and entity signals so they appear in both search results and
                  answer citations.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="blue">
            <SectionHeader number="01" title="Current State Snapshot" />
            <StrategySectionLead
              takeaway="BTS has a credible domain footprint and product story, but very limited demand capture in category intent."
              body="Current organic presence is concentrated in branded and ambiguous terms, with minimal ownership of high-intent creator-platform pages. That keeps visibility low exactly where buyers compare options."
              implication="The upside is substantial because BTS is not trying to fix a weak product—it's fixing market discoverability."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Current organic traffic</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.seoMetrics.organicTraffic)}
                </div>
                <p className="mt-2 text-sm text-white/62">US-heavy traffic base with minimal non-US visibility.</p>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Current ranking keywords</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.seoMetrics.organicKeywords)}
                </div>
                <p className="mt-2 text-sm text-white/62">Too narrow for a platform operating in a competitive category.</p>
              </StrategyCard>
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Referring domains</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.seoMetrics.referringDomains)}
                </div>
                <p className="mt-2 text-sm text-white/62">
                  Useful authority base that can be converted into stronger category page performance.
                </p>
              </StrategyCard>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <HighlightBox>
                <h3 className="text-lg font-semibold text-white">What is already working</h3>
                <div className="mt-3">
                  <BulletList
                    items={[
                      "A clear monetization value proposition and direct-response homepage messaging.",
                      "Existing backlink footprint (27,577 backlinks, 880 referring domains) to build from.",
                      "Early foothold on one commercial query (‘skool vs patreon’ at position 21).",
                    ]}
                  />
                </div>
              </HighlightBox>
              <HighlightBox>
                <h3 className="text-lg font-semibold text-white">What is currently limiting growth</h3>
                <div className="mt-3">
                  <BulletList
                    items={[
                      "Most ranking terms are not high-intent creator-platform buying queries.",
                      "No broad category ownership for alternatives, comparisons, and pricing clusters.",
                      "No schema inventory currently detected in page audit, reducing extractability for AI answers.",
                    ]}
                  />
                </div>
              </HighlightBox>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="amber">
            <SectionHeader number="02" title="The Opportunity" />
            <StrategySectionLead
              takeaway="The market is large enough to materially change BTS pipeline if it captures even a small share of the right queries."
              body="Validated demand across the target set is 2,268,640 monthly searches. The opportunity is not to chase all of it—it is to control the most commercial slices and use them to expand outward."
              implication="A focused wedge can shift BTS from occasional mention to consistent shortlist inclusion."
            />

            <div className="grid gap-4 md:grid-cols-3">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Google-led demand</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.totals.byChannel.google.demand)}
                </div>
                <p className="mt-2 text-sm text-white/62">Still the largest capture opportunity for commercial research behavior.</p>
              </StrategyCard>
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">AI answer-layer demand</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.totals.byChannel.ai.demand)}
                </div>
                <p className="mt-2 text-sm text-white/62">Critical influence layer for recommendations and shortlist framing.</p>
              </StrategyCard>
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Validated topical guardrail</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.topicalIntegrity.metrics.topicallyRelevantTopKeywordCount)}/20
                </div>
                <p className="mt-2 text-sm text-white/62">
                  Top headline terms pass topical integrity checks for BTS category relevance.
                </p>
              </StrategyCard>
            </div>

            <div className="mt-6">
              <HighlightBox>
                <p className="text-sm leading-7 text-white/74">
                  Opportunity is strongest in <span className="text-white font-semibold">Alternatives & Comparisons</span> and
                  <span className="text-white font-semibold"> Buyer Guide</span> intent. These are the moments where a user is
                  actively deciding between Patreon, Kajabi, Skool, Teachable, Circle, and challengers like BTS.
                </p>
              </HighlightBox>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="blue">
            <SectionHeader number="03" title="Why Behind the Scenes Can Win" />
            <StrategySectionLead
              takeaway="BTS can win by owning the ‘creator business infrastructure’ narrative rather than copying marketplace incumbents."
              body="Patreon and platform giants win by default awareness. BTS wins by becoming the best-cited answer for creators who care about ownership, margin, and direct audience relationships."
              implication="This is a category-positioning fight first, then a distribution execution fight."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <StrategyCard>
                <div className="mb-3 flex text-[#f4e4cd]">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Clear wedge positioning</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  BTS can frame itself as the operator-grade monetization stack for creators building durable businesses.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 flex text-[#f4e4cd]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Existing authority foundation</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  The current referring domain base is enough to support faster ranking velocity once money pages exist.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 flex text-[#f4e4cd]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Early AI brand recognition</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  BTS already appears when prompts include direct brand framing—proof that visibility can be scaled.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="mixed">
            <SectionHeader number="04" title="Competitive Gap" />
            <StrategySectionLead
              takeaway="The gap is distribution intensity, not product legitimacy."
              body="Competitors are massively ahead in search footprint and cross-surface citations. BTS does not need to beat every competitor everywhere—it needs to dominate selected decision queries where buyers are closest to purchase."
              implication="Start by attacking comparison and alternatives intent where incumbents are visible but vulnerable to better framing."
            />

            <DataTable
              headers={[
                "Company",
                "Domain",
                "Organic traffic",
                "Ranking keywords",
                "Referring domains",
                "Prompt wins",
              ]}
              rows={[
                [
                  "Behind the Scenes",
                  researchData.company.domain,
                  formatWhole(researchData.seoMetrics.organicTraffic),
                  formatWhole(researchData.seoMetrics.organicKeywords),
                  formatWhole(researchData.seoMetrics.referringDomains),
                  "10 validated brand mentions",
                ],
                ...competitorRows,
              ]}
              highlightRow={0}
              className="mt-2"
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <StrategyCard>
                <h3 className="text-lg font-semibold text-white">Primary threat: category default bias</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  Patreon dominates mention frequency across 8/8 tested query groups in competitor evidence, making it
                  the default answer in many AI and search contexts.
                </p>
              </StrategyCard>
              <StrategyCard>
                <h3 className="text-lg font-semibold text-white">Primary opening: focused query warfare</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  Kajabi, Teachable, and Circle show fragmented ownership patterns. BTS can win share with
                  better-scoped comparison pages and sharper creator-business positioning.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="blue">
            <SectionHeader number="05" title="AI Visibility Gap" />
            <StrategySectionLead
              takeaway="BTS appears in AI only when the brand is explicitly in the prompt; it is rarely chosen in generic category prompts."
              body="That pattern means the market already understands BTS as a brand, but not yet as a default category recommendation. The next move is to train answer engines with clearer comparative and category evidence."
              implication="Own generic prompt intent, not just branded prompt intent."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {platformCards.map((platform) => (
                <StrategyCard key={platform.name}>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                    {platform.name}
                  </div>
                  <div className="text-3xl font-display font-bold text-white">{platform.mentionRate}%</div>
                  <div className="mt-1 text-sm text-white/62">Mention rate • {platform.mentions} prompts</div>
                  <p className="mt-3 text-sm leading-7 text-white/62">{platform.driver}</p>
                </StrategyCard>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {researchData.aiVisibility.promptExamples.map((example) => (
                <StrategyCard key={example.query}>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Real prompt evidence</div>
                  <h3 className="mt-2 text-base font-semibold text-white">{example.query}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">{example.result}</p>
                  <p className="mt-3 text-sm leading-6 text-white">{example.implication}</p>
                </StrategyCard>
              ))}
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="amber">
            <SectionHeader number="06" title="Revenue / Commercial Impact" />
            <StrategySectionLead
              takeaway="This is a pipeline leverage play: more shortlist presence lowers paid dependency and improves inbound quality."
              body="If BTS reaches the base-case traffic path, it can materially increase high-intent discovery. The strategic value is not only sessions—it is category trust in buying moments before sales conversations begin."
              implication="Revenue planning requires client ACV/AOV and funnel inputs."
            />

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Expected traffic in 12 months</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.totals.expectedTraffic12Months.base)}
                </div>
                <p className="mt-2 text-sm text-white/62">Base case trajectory from focused execution.</p>
              </StrategyCard>
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Aggressive upside</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.totals.aggressiveUpside)}
                </div>
                <p className="mt-2 text-sm text-white/62">If authority and comparison coverage compounds faster.</p>
              </StrategyCard>
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Pipeline potential (lead range)</div>
                <div className="mt-2 text-3xl font-display font-bold text-white">
                  {formatWhole(researchData.tamModel.revenueModel.pipelinePotential.leads.base)}
                </div>
                <p className="mt-2 text-sm text-white/62">Directional until BTS conversion and ACV data are layered in.</p>
              </StrategyCard>
            </div>

            <PhasedUpsideChart points={monthlyPoints} />

            <p className="mt-4 text-xs text-white/45">
              Estimate-only model. Revenue planning requires client ACV/AOV and funnel inputs.
            </p>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="blue">
            <SectionHeader number="07" title="90-day Wedge" />
            <StrategySectionLead
              takeaway="Win one wedge deeply: creator-platform alternatives and comparisons against the incumbents buyers already name."
              body="The first 90 days are about proving repeatable wins on commercial queries, then using those wins to expand into broader category capture."
              implication="Scope discipline matters more than content volume in the first sprint."
            />

            <div className="grid gap-4 md:grid-cols-2">
              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Target className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-white">First wedge: alternatives + comparisons</h3>
                </div>
                <BulletList
                  items={[
                    "Patreon alternative pages segmented by creator type and monetization model.",
                    "Kajabi alternative pages focused on creator-business use cases.",
                    "Skool alternative pages for membership + community migration scenarios.",
                    "Head-to-head pages: BTS vs Patreon, BTS vs Kajabi, BTS vs Skool, BTS vs Teachable, BTS vs Circle.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Rocket className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-white">First prompts to win</h3>
                </div>
                <BulletList
                  items={[
                    "“best creator monetization platform”",
                    "“patreon alternative”",
                    "“kajabi alternative”",
                    "“skool alternative”",
                    "“creator monetization platform comparison”",
                  ]}
                />
              </StrategyCard>

              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Swords className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-white">First competitors to attack</h3>
                </div>
                <BulletList
                  items={[
                    "Patreon: default recommendation leader; target by use-case specialization.",
                    "Kajabi: strong enterprise framing; counter with creator monetization clarity.",
                    "Teachable + Circle: fragmented positioning opportunities in comparison queries.",
                  ]}
                />
              </StrategyCard>

              <StrategyCard>
                <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                  <Radar className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-white">90-day outputs</h3>
                </div>
                <BulletList
                  items={[
                    "10 flagship commercial pages shipped with schema and direct-answer intros.",
                    "30 supporting knowledge pages mapped to those money pages.",
                    "Weekly prompt tracking dashboard across US + AU query set.",
                    "Monthly refresh loop on top five money entities.",
                  ]}
                />
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <StrategySectionShell glow="mixed">
            <SectionHeader number="08" title="Operating Model" />
            <StrategySectionLead
              takeaway="Run concurrent workstreams from month one: demand capture, authority, and measurement."
              body="This is not a linear SEO project. BTS needs a weekly publishing and feedback loop where pages, citations, and prompt testing reinforce each other continuously."
              implication="Treat AEO + SEO as an operating system, not a campaign."
            />

            <ExecutionInfographic
              steps={[
                {
                  label: "Map the wedge",
                  detail: "Prioritize the creator-platform entities, prompts, and comparisons most likely to move shortlist behavior.",
                },
                {
                  label: "Ship the assets",
                  detail: "Publish the money pages, support pages, and answer-ready blocks that directly target those buying moments.",
                },
                {
                  label: "Distribute proof",
                  detail: "Reinforce the pages with supporting evidence, citations, and creator-specific credibility signals.",
                },
                {
                  label: "Measure + refresh",
                  detail: "Track rankings, AI mentions, and page performance every week, then refresh the winners instead of waiting quarters.",
                },
              ]}
              tracks={[
                {
                  name: "Search demand capture",
                  description: "This is the commercial layer: the pages buyers see when they compare platforms and build shortlists.",
                  deliverables: [
                    "Alternatives + comparison pages against Patreon, Kajabi, Skool, Circle, and Teachable.",
                    "A flagship 'best creator monetization platform' page with direct-answer formatting.",
                    "Schema, verdict blocks, and refreshes on every money page.",
                  ],
                  outcome: "BTS starts showing up in the exact moments buyers choose who makes the list.",
                },
                {
                  name: "AI answer-engine visibility",
                  description: "This layer trains answer engines to recognize BTS as a valid category recommendation, not just a branded result.",
                  deliverables: [
                    "A tracked prompt library across ChatGPT, Gemini, and Google AI Overviews.",
                    "Entity and comparison copy designed to be cited cleanly by LLMs.",
                    "Fixes on prompts where incumbents win and BTS is absent.",
                  ],
                  outcome: "BTS earns more default mentions when buyers ask generic platform questions.",
                },
                {
                  name: "Authority + proof layer",
                  description: "These assets make the commercial pages more believable and easier to trust across both search and AI surfaces.",
                  deliverables: [
                    "Supporting creator guides and use-case pages around monetization, membership, and community growth.",
                    "Proof assets and evidence blocks that reinforce why BTS wins a specific wedge.",
                    "Citation and link targets around creator-economy decision content.",
                  ],
                  outcome: "The BTS narrative gets stronger, more defensible, and easier for Google and AI to recommend.",
                },
                {
                  name: "Measurement + operating rhythm",
                  description: "This is the part most teams skip: the cadence that turns shipping into compounding performance.",
                  deliverables: [
                    "A weekly scorecard covering rankings, AI visibility, and page-level movement.",
                    "Monthly refreshes on top money pages and prompt failures.",
                    "Wedge expansion decisions based on what is already winning.",
                  ],
                  outcome: "BTS gets a visible execution system instead of a pile of disconnected content.",
                },
              ]}
              outputs={[
                {
                  label: "Pages that attack shortlist intent",
                  detail: "Every month ships visible commercial assets BTS can point to: money pages, comparisons, and supporting proof.",
                },
                {
                  label: "An AI visibility system, not one-off tests",
                  detail: "Prompt tracking, citation fixes, and answer-engine iteration become part of the operating cadence.",
                },
                {
                  label: "A founder-readable growth machine",
                  detail: "You can see what Memetik is doing, what shipped, what moved, and where the next wedge opens up.",
                },
              ]}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-16 md:mb-20">
          <StrategySectionShell glow="amber">
            <SectionHeader number="09" title="Why Memetik" />
            <StrategySectionLead
              takeaway="Memetik runs AEO and SEO as one commercial system: demand capture, answer visibility, and revenue accountability."
              body="Most teams either publish content without answer-engine strategy, or run AI experiments without durable search infrastructure. Memetik connects both so BTS can build compounding shortlist share."
              implication="The goal is not more content. The goal is category influence that compounds."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <StrategyCard>
                <div className="mb-3 flex text-[#f4e4cd]">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Entity-first demand mapping</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  We prioritize pages by commercial leverage and prompt behavior, not vanity volume.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 flex text-[#f4e4cd]">
                  <Workflow className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Weekly operating cadence</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  Research, publishing, distribution, and answer-share measurement run in one loop.
                </p>
              </StrategyCard>
              <StrategyCard>
                <div className="mb-3 flex text-[#f4e4cd]">
                  <Radar className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Founder-level visibility</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  Every workstream maps back to pipeline pressure, shortlist share, and defensibility.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <StrategyCTA
          eyebrow="Book Strategy Call"
          title="Turn BTS into a default recommendation, not a hidden option."
          body="If you want Memetik to build and run this execution system with your team, book a strategy call. We’ll align on wedge, operating cadence, and first 90-day outcomes."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book Strategy Call"
        />

        <section className="mt-14 md:mt-20">
          <StrategySectionShell>
            <SectionHeader number="10" title="Appendix / Supporting Evidence" />
            <StrategySectionLead
              takeaway="Detailed evidence, assumptions, and model inputs."
              body="Everything below supports the strategy narrative above and is included for team planning, internal reviews, and execution QA."
            />

            <div className="space-y-4">
              <StrategyAppendixSection
                defaultOpen
                title="Detailed competitor metrics (US + AU scope)"
                description="Backlink and referring-domain values are sourced from the research payload backlink summaries."
              >
                <DataTable
                  headers={[
                    "Competitor",
                    "Domain",
                    "Organic traffic",
                    "Organic keywords",
                    "Backlinks",
                    "Referring domains",
                    "Prompt evidence",
                  ]}
                  rows={researchData.competitors.map((competitor) => [
                    competitor.name,
                    competitor.domain,
                    formatWhole(competitor.organicTraffic),
                    formatWhole(competitor.organicKeywords),
                    formatWhole(competitor.backlinks),
                    formatWhole(competitor.referringDomains),
                    `${competitor.promptQueryHits}/${competitor.promptQueryCount} prompt groups`,
                  ])}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Top opportunity clusters"
                description="Validated cluster-level demand used for prioritization."
              >
                <DataTable
                  headers={["Cluster", "Intent", "Demand", "Keyword count", "Example terms"]}
                  rows={researchData.tamModel.topOpportunityClusters.map((cluster) => [
                    cluster.cluster,
                    cluster.intent,
                    formatWhole(cluster.demand),
                    formatWhole(cluster.keywordCount),
                    cluster.sampleKeywords.join(", "),
                  ])}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Prompt evidence samples used in AI visibility analysis"
                description="Examples across ChatGPT, Gemini, and Google AI Overview test sets."
              >
                <DataTable
                  headers={["Prompt", "Observed outcome", "What it means"]}
                  rows={researchData.aiVisibility.promptExamples.map((example) => [
                    example.query,
                    example.result,
                    example.implication,
                  ])}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Keyword evidence from current ranking footprint"
                description="Current ranking terms indicate limited ownership of commercial creator-platform intent."
              >
                <DataTable
                  headers={["Keyword", "Monthly volume", "Current position", "Intent"]}
                  rows={researchData.rankedKeywords.map((kw) => [
                    kw.keyword,
                    formatWhole(kw.volume),
                    `#${kw.position}`,
                    kw.intent,
                  ])}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Assumptions, confidence, and guardrails"
                description="Planning assumptions are translated into plain language and kept outside the main founder narrative."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <StrategyCard>
                    <h3 className="text-lg font-semibold text-white">Planning assumptions (plain English)</h3>
                    <div className="mt-3">
                      <BulletList items={researchData.tamModel.assumptions.founderReadableSummary} />
                    </div>
                  </StrategyCard>
                  <StrategyCard>
                    <h3 className="text-lg font-semibold text-white">Confidence and topical integrity</h3>
                    <div className="mt-3">
                      <BulletList
                        items={[
                          `Confidence: ${researchData.tamModel.confidence.level} (${researchData.tamModel.confidence.score}/100).`,
                          `Topical integrity passed: ${researchData.topicalIntegrity.passed ? "yes" : "no"}.`,
                          `Ambiguous prompt mentions: ${researchData.topicalIntegrity.metrics.ambiguousPromptMentions}.`,
                          `Low-quality semantic demand share: ${researchData.topicalIntegrity.metrics.lowQualitySemanticDemandSharePercent}%.`,
                        ]}
                      />
                    </div>
                  </StrategyCard>
                </div>

                <DataTable
                  className="mt-4"
                  headers={["Scenario", "Expected traffic in 12 months", "First 90-day target"]}
                  rows={[
                    [
                      "Low",
                      formatWhole(researchData.tamModel.totals.expectedTraffic12Months.low),
                      formatWhole(researchData.tamModel.totals.first90DayTarget.low),
                    ],
                    [
                      "Base",
                      formatWhole(researchData.tamModel.totals.expectedTraffic12Months.base),
                      formatWhole(researchData.tamModel.totals.first90DayTarget.base),
                    ],
                    [
                      "High",
                      formatWhole(researchData.tamModel.totals.expectedTraffic12Months.high),
                      formatWhole(researchData.tamModel.totals.first90DayTarget.high),
                    ],
                  ]}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Website audit notes"
                description="On-page and technical context captured in the research run."
              >
                <DataTable
                  headers={["Field", "Observation"]}
                  rows={[
                    ["Homepage title", researchData.websiteAudit.title],
                    ["Word count", formatWhole(researchData.websiteAudit.wordCount)],
                    ["Internal links", formatWhole(researchData.websiteAudit.internalLinks)],
                    ["External links", formatWhole(researchData.websiteAudit.externalLinks)],
                    ["Schema types detected", researchData.websiteAudit.schemaTypes.length ? researchData.websiteAudit.schemaTypes.join(", ") : "None detected"],
                    ["Time to interactive", `${formatWhole(researchData.websiteAudit.timeToInteractiveMs)} ms`],
                    ["DOM complete", `${formatWhole(researchData.websiteAudit.domCompleteMs)} ms`],
                    [
                      "Backlink spam score / target spam score",
                      `${researchData.seoMetrics.backlinkMetrics.backlinksSpamScore} / ${researchData.seoMetrics.backlinkMetrics.targetSpamScore}`,
                    ],
                  ]}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="TAM × LTV calculator"
                description="Use your own funnel conversion and ACV/AOV inputs before committing to revenue forecasts."
              >
                <TamRoiCalculator
                  baseReachableVisits={Math.round(researchData.tamModel.totals.expectedTraffic12Months.base)}
                  defaultLtv={0}
                  defaultVisitToCustomerRate={0.01}
                />
                <p className="mt-3 text-xs text-white/45">
                  Revenue planning requires client ACV/AOV and funnel inputs.
                </p>
              </StrategyAppendixSection>
            </div>
          </StrategySectionShell>
        </section>
      </div>
    </StrategyPageFrame>
  );
}