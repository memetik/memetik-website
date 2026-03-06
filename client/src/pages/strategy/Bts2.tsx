import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import {
  SectionHeader,
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyCTA,
  StrategyEyebrow,
  StrategySectionLead,
  StatsGrid,
  BulletList,
  DataTable,
  PhasedUpsideChart,
  DeliveryScopeMatrix,
  ExecutionInfographic,
  StrategyAppendixSection,
  TamRoiCalculator,
  WorkstreamTimeline,
  HighlightBox,
} from "@/components/strategy";
import {
  ArrowUpRight,
  Bot,
  Brain,
  Building2,
  Compass,
  Database,
  FileText,
  Globe,
  LineChart,
  Link2,
  Radar,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

const nf = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));

const pct = (value: number) => `${value.toFixed(1)}%`;

const headlineMetrics = {
  totalSearchOpportunity: 2268640,
  expectedTraffic12Months: 191043.1,
  aggressiveUpside: 285366.8,
  first90DayTarget: 28656.46,
};

const currentStateStats = [
  {
    label: "Current organic traffic",
    value: nf(161.95899342000484),
    note: "Existing visibility is minimal compared to category demand. BTS is largely absent in commercial discovery moments.",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    label: "Current ranking keywords",
    value: nf(19),
    note: "Most rankings are brand-adjacent phrasing, not creator monetization buyer intent terms.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    label: "Referring domains",
    value: nf(880),
    note: "Authority foundation exists, but it is not yet translated into category recommendation share.",
    icon: <Link2 className="h-5 w-5" />,
  },
  {
    label: "Backlinks",
    value: nf(27577),
    note: "The issue is not zero authority. The issue is missing entity coverage and decision-page depth.",
    icon: <Globe className="h-5 w-5" />,
  },
];

const rightToWinPoints = [
  "The product positioning is already monetization-centric: \"Monetize your content and keep 90% of every sale.\" That is a strong commercial angle if operationalized into comparison and decision content.",
  "BTS already has proof it can break into comparison intent (e.g., ranking for “skool vs patreon” at position 21), which means the domain can compete where pages are built intentionally.",
  "Topical integrity checks passed with high confidence and very low low-quality semantic demand share (0.01%), so the growth model is grounded in category-relevant demand, not junk keyword inflation.",
  "BTS can win by owning the “creator monetization platform alternative” wedge before trying to own broad “creator platform” category head terms.",
];

const competitorRows = [
  ["Behind the Scenes", nf(162), nf(19), nf(880), nf(27577), "10/48 prompts (21%)"],
  ["Patreon", nf(4172095), nf(598893), nf(372395), nf(454284402), "21 competitor hits"],
  ["Circle", nf(219983), nf(13861), nf(21370), nf(1707296), "2 competitor hits"],
  ["Kajabi", nf(79194), nf(17679), nf(40224), nf(1529242), "7 competitor hits"],
  ["Skool", nf(208627), nf(52170), nf(73244), nf(6040046), "0 in sampled prompts, but strong organic footprint"],
  ["Teachable", nf(506693), nf(81847), nf(88832), nf(15841175), "5 competitor hits"],
];

const aiPlatformStats = [
  {
    platform: "ChatGPT",
    mentionRate: 25,
    status: "Occasional mention",
    gap: "Not reliably recommended in “best platform” prompts.",
    icon: <Bot className="h-4 w-4" />,
  },
  {
    platform: "Gemini",
    mentionRate: 37.5,
    status: "Partial mention",
    gap: "Appears in some comparative prompts, but consistency is weak.",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    platform: "Google AI Overviews",
    mentionRate: 0,
    status: "Invisible",
    gap: "No sampled AIO mentions despite category activity.",
    icon: <Search className="h-4 w-4" />,
  },
];

const promptExamples = [
  {
    query: "best creator monetization platform",
    whoWins: "Patreon/Circle ecosystem content",
    btsNow: "Not mentioned across sampled platforms",
    whatChanges: "Need definitive “best platform” and alternatives page cluster with schema + external reinforcement.",
  },
  {
    query: "behind the scenes creator monetization platform alternatives",
    whoWins: "Patreon, Kajabi, Teachable in references",
    btsNow: "Mentioned in ChatGPT/Gemini, absent in AIO",
    whatChanges: "Convert this into stable recommendation by owning alternatives + proof pages and authority nodes.",
  },
  {
    query: "creator monetization platform comparison",
    whoWins: "Generic comparison listicles + incumbents",
    btsNow: "Not consistently surfaced",
    whatChanges: "Ship an objective comparison framework and distribute derivative assets to 3–5 trust nodes.",
  },
];

const phasedPoints = [
  { month: 1, low: 3558, base: 7642, high: 14268 },
  { month: 2, low: 4745, base: 9552, high: 17122 },
  { month: 3, low: 5931, base: 11463, high: 19976 },
  { month: 4, low: 7117, base: 13373, high: 22829 },
  { month: 5, low: 8303, base: 13373, high: 22829 },
  { month: 6, low: 9489, base: 15283, high: 25683 },
  { month: 7, low: 9489, base: 15283, high: 25683 },
  { month: 8, low: 10675, base: 17194, high: 25683 },
  { month: 9, low: 11861, base: 17194, high: 25683 },
  { month: 10, low: 13048, base: 19104, high: 28537 },
  { month: 11, low: 16606, base: 24836, high: 28537 },
  { month: 12, low: 17792, base: 26746, high: 28537 },
];

const wedgePages = [
  "Patreon alternative (primary wedge page)",
  "Best creator monetization platform for memberships",
  "BTS vs Patreon",
  "BTS vs Kajabi",
  "BTS vs Teachable",
  "BTS vs Circle",
  "Patreon pricing vs BTS value breakdown",
  "Skool alternative for creator memberships",
  "Creator monetization platform comparison (scored rubric)",
  "How to choose a creator monetization platform (with verdict paths)",
];

const wedgePrompts = [
  "best creator monetization platform",
  "patreon alternative",
  "behind the scenes creator monetization platform alternatives",
  "creator monetization platform comparison",
  "best creator monetization platform for enterprise",
];

const deliveryCategories = [
  {
    label: "Money Entity Mapping",
    detail: "Commercial query map: best-for, alternatives, comparisons, pricing, and implementation prompts by market and ICP.",
  },
  {
    label: "Demand Capture Build",
    detail: "BOFU + MOFU page system that captures shortlist moments and turns category research into pipeline entry.",
  },
  {
    label: "Authority & Distribution",
    detail: "Off-site trust layer: links, mentions, review surfaces, and platform-native proof that answer engines trust.",
  },
  {
    label: "Technical AEO Infrastructure",
    detail: "Bing, IndexNow, schema, internal linking, entity consistency, and weekly prompt-ops instrumentation.",
  },
];

const deliveryLanes = [
  {
    category: "BOFU",
    title: "Flagship / Apex Assets",
    volume: "8–12 pieces",
    whyItMatters:
      "These are the pages that win shortlist prompts and train models on BTS’s strongest category arguments.",
    deliverables: [
      "Patreon alternative + alternatives cluster",
      "Best creator monetization platform pages by segment",
      "Pricing and cost explainers with clear verdicts",
      "Original proof blocks, FAQs, and schema packs",
    ],
  },
  {
    category: "MOFU",
    title: "Comparison & Evaluation Layer",
    volume: "20–50 pages",
    whyItMatters:
      "Comparison pages convert buyer uncertainty into decision momentum and force competitors into your framing.",
    deliverables: [
      "BTS vs Patreon / Kajabi / Teachable / Circle / Skool",
      "Use-case specific comparison pages",
      "Migration and implementation pages",
      "Review and social-proof comparison inserts",
    ],
  },
  {
    category: "TOFU",
    title: "Knowledge Graph Coverage",
    volume: "200–2,500 pages",
    whyItMatters:
      "Retrieval density drives recommendation consistency across long-tail prompts and adjacent commercial intent.",
    deliverables: [
      "Programmatic creator monetization permutations",
      "Industry/use-case/localized long-tail pages",
      "Hub-and-spoke internal linking architecture",
      "Canonical guardrails + unique paragraph QA",
    ],
  },
  {
    category: "AUTHORITY",
    title: "Off-Site Trust & Distribution Engine",
    volume: "35–75+ placements",
    whyItMatters:
      "AI platforms trust entities with external reinforcement, not just owned-site claims.",
    deliverables: [
      "Aggressive topical backlink acquisition",
      "Digital PR / press release / listicle pushes",
      "Review platform growth (G2/Capterra/Trustpilot where relevant)",
      "Third-party forum/community placements (Reddit + niche communities)",
    ],
  },
];

const rolloutMilestones = [
  {
    window: "First 30 days",
    output:
      "10 Apex Assets live, 100 Knowledge Graph pages live, 10 authority/distribution placements, Bing + IndexNow + schema baseline deployed.",
  },
  {
    window: "By day 60",
    output:
      "25 Apex Assets total, 400 Knowledge Graph pages total, 25 placements total, first recommendation-share gains in core prompt set.",
  },
  {
    window: "By day 90",
    output:
      "40 Apex Assets total, 800 Knowledge Graph pages total, 40 placements total, stable wedge ownership across alternatives/comparison prompts.",
  },
];

const operatingSteps = [
  {
    label: "Monday — Research + entity updates",
    detail: "Refresh money entities, prompt sets, and competitor movement. Prioritize weekly content and distribution targets.",
  },
  {
    label: "Tuesday–Wednesday — Build",
    detail: "Produce Apex assets, comparison pages, and supporting knowledge pages with schema and internal links in place.",
  },
  {
    label: "Thursday — Distribution + trust relay",
    detail: "Break core assets into 10–20 micro-assets, publish to 3–5 authority nodes, and reinforce with consistent link anchors.",
  },
  {
    label: "Friday — Metrics + iteration",
    detail: "Track answer share, mention frequency, and query movement; roll insights directly into next sprint plan.",
  },
];

const operatingTracks = [
  {
    name: "On-site production system",
    description:
      "High-intent page shipping never pauses. BOFU and MOFU are prioritized first, then TOFU density scales behind them.",
    deliverables: [
      "Money entity map maintenance",
      "Apex + comparison content production",
      "Programmatic/Knowledge Graph deployment",
      "Schema + internal-link reinforcement",
    ],
    outcome:
      "BTS gets a compounding owned-asset layer that captures demand across decision stages, not just blog traffic.",
  },
  {
    name: "Off-site authority system",
    description:
      "Every major asset is amplified outside the domain so search and AI systems receive third-party trust signals continuously.",
    deliverables: [
      "10–20 micro-assets per core publication",
      "3–5 authority node pushes per asset cycle",
      "Digital PR, backlinks, and listicle distribution",
      "Review-platform and forum/community reinforcement",
    ],
    outcome:
      "BTS gets recommendation credibility that competitors cannot dislodge with on-site edits alone.",
  },
];

const operatingOutputs = [
  {
    label: "Weekly shipped assets",
    detail: "Visible new pages, updates, and distribution logs tied to specific entity and prompt goals.",
  },
  {
    label: "Answer-share dashboard",
    detail: "Prompt-level tracking across ChatGPT, Gemini, and Google AI surfaces with competitor movement visibility.",
  },
  {
    label: "Quarterly moat expansion",
    detail: "A widening query footprint, stronger off-site signal stack, and lower dependence on paid acquisition pressure.",
  },
];

const appendixClusterRows = [
  ["Category & Brand Demand", "TOFU", nf(2228330), nf(513), `${nf(112588)} / ${nf(180000)} / ${nf(271305)}`],
  ["Buyer Guides", "BOFU", nf(26590), nf(94), `${nf(3970)} / ${nf(6615)} / ${nf(9263)}`],
  ["Alternatives & Comparisons", "BOFU", nf(8470), nf(117), `${nf(1271)} / ${nf(2118)} / ${nf(2965)}`],
  ["Pricing & Cost", "BOFU", nf(4910), nf(3), `${nf(737)} / ${nf(1228)} / ${nf(1719)}`],
  ["Reviews & Social Proof", "BOFU", nf(320), nf(8), `${nf(48)} / ${nf(80)} / ${nf(112)}`],
];

const promptEvidenceRows = [
  [
    "best creator monetization platform",
    "ChatGPT + Gemini + Google AIO",
    "Patreon and incumbent listicles dominate; BTS absent in sampled outputs.",
    "Publish flagship best-of + alternatives pages and reinforce externally.",
  ],
  [
    "behind the scenes creator monetization platform alternatives",
    "ChatGPT + Gemini + Google AIO",
    "BTS appears in ChatGPT/Gemini, but not in AIO snippets.",
    "Convert partial visibility into stable recommendation with comparison depth + citations.",
  ],
  [
    "behind the scenes creator monetization platform vs competitors",
    "ChatGPT + Gemini + Google AIO",
    "BTS appears in LLM text responses, absent in AIO visibility.",
    "Own structured comparison pages and authority placements to bridge AIO gap.",
  ],
  [
    "best creator monetization platform for enterprise",
    "ChatGPT + Gemini + Google AIO",
    "Kajabi/Teachable patterns surface more often.",
    "Build enterprise-specific evaluation pages with clear segment verdicts.",
  ],
  [
    "how to choose a creator monetization platform",
    "ChatGPT + Gemini + Google AIO",
    "Generic frameworks dominate; BTS appears sporadically in Gemini.",
    "Ship decision framework page and distribute derivatives with expert bylines.",
  ],
];

const competitorAppendixRows = [
  ["Behind the Scenes", nf(162), nf(19), nf(27577), nf(880), "44", "9"],
  ["Circle", nf(219983), nf(13861), nf(1707296), nf(21370), "6", "2"],
  ["Kajabi", nf(79194), nf(17679), nf(1529242), nf(40224), "11", "3"],
  ["Patreon", nf(4172095), nf(598893), nf(454284402), nf(372395), "6", "0"],
  ["Skool", nf(208627), nf(52170), nf(6040046), nf(73244), "22", "0"],
  ["Teachable", nf(506693), nf(81847), nf(15841175), nf(88832), "18", "1"],
];

function StrategyBts2() {
  useEffect(() => {
    document.title = "Behind the Scenes Growth Strategy | Memetik";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto w-full max-w-[1200px] space-y-10 md:space-y-14">
        <StrategyHero
          eyebrow="Memetik Strategy Memo · Creator Economy"
          title="Behind the Scenes"
          accent="Category lock across Google + AI answers"
          subtitle="A founder-facing AEO strategy for turning BTS from occasional mention into default recommendation in creator monetization decisions."
          tags={[
            "behindthescenes.com",
            "Creator Economy",
            "Creator Platform",
            "Primary markets: US + AU",
            "Topical integrity: passed",
          ]}
        >
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <StrategyCard glow="mixed">
              <div className="mb-5 flex items-center justify-between gap-3">
                <StrategyEyebrow>Executive Summary</StrategyEyebrow>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Founders can skim in 5 min</div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-[20px] border border-white/10 bg-black/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Total search opportunity</div>
                  <div className="mt-2 text-[clamp(1.2rem,2.2vw,1.8rem)] font-display font-bold text-white">{nf(headlineMetrics.totalSearchOpportunity)}</div>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-black/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Expected traffic in 12 months</div>
                  <div className="mt-2 text-[clamp(1.2rem,2.2vw,1.8rem)] font-display font-bold text-white">{nf(headlineMetrics.expectedTraffic12Months)}</div>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-black/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Aggressive upside</div>
                  <div className="mt-2 text-[clamp(1.2rem,2.2vw,1.8rem)] font-display font-bold text-white">{nf(headlineMetrics.aggressiveUpside)}</div>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-black/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">First 90-day target</div>
                  <div className="mt-2 text-[clamp(1.2rem,2.2vw,1.8rem)] font-display font-bold text-[#f4e4cd]">{nf(headlineMetrics.first90DayTarget)}</div>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-[#f4e4cd]/20 bg-[#f4e4cd]/10 p-4">
                <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Immediate actions</div>
                <BulletList
                  items={[
                    "Own the “Patreon alternative” and “creator monetization platform comparison” wedge before broad category terms.",
                    "Ship a full comparison/evaluation cluster with objective verdict pages against Patreon, Kajabi, Teachable, Circle, and Skool.",
                    "Pair every on-site asset with external authority pushes so BTS is cited, not just indexed.",
                  ]}
                />
              </div>
            </StrategyCard>

            <HighlightBox>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Thesis</div>
              <p className="mt-3 text-xl font-display font-semibold tracking-tight text-white">
                BTS already has the product story and baseline authority. What’s missing is a deliberate answer-engine capture system.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                This strategy is about converting existing market credibility into shortlist share across Google and AI surfaces where creator
                platform decisions are now made.
              </p>
            </HighlightBox>
          </div>
        </StrategyHero>

        <StrategySectionShell glow="blue">
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still drives the majority of commercial discovery, but AI layers now shape shortlists before buyers click."
            body="BTS does not need an either/or strategy. It needs dual-surface dominance: classic search demand capture plus consistent AI recommendation presence across ChatGPT, Gemini, and Google AI layers."
            implication="Brands that win in 2026 are visible where buyers ask, compare, and decide — not just where they click."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                <Search className="h-4 w-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em]">Search remains core</span>
              </div>
              <p className="text-sm leading-6 text-white/70">
                Google AI Overviews still heavily source top organic results. Traditional SEO remains a direct input to AI visibility.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                <Bot className="h-4 w-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em]">Answer engines matter</span>
              </div>
              <p className="text-sm leading-6 text-white/70">
                Buyers now run multi-platform research loops across ChatGPT, Gemini, and AIO before sales conversations start.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                <Database className="h-4 w-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em]">Platform-specific inputs</span>
              </div>
              <p className="text-sm leading-6 text-white/70">
                ChatGPT is tied to Bing behavior, Perplexity leans heavily on Reddit, and Gemini/AIO reward entity clarity plus strong SERP footprints.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="02" title="Current State Snapshot" />
          <StrategySectionLead
            takeaway="BTS has authority signals and product clarity, but almost no category demand capture."
            body="The domain has real backlink depth and a focused value proposition, yet current discoverability is concentrated in low-commercial brand phrasing rather than creator monetization decision queries."
            implication="Right now, BTS is searchable by name. It is not yet consistently discoverable by buying intent."
          />

          <StatsGrid stats={currentStateStats} columns={4} />

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <StrategyCard>
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What is working</div>
              <BulletList
                items={[
                  "Clear monetization-oriented homepage proposition aligned to category intent.",
                  "Existing referring-domain base (880) to support authority amplification.",
                  "Early proof of comparison-query traction (e.g., skool vs patreon rank signal).",
                ]}
              />
            </StrategyCard>
            <StrategyCard>
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What is missing</div>
              <BulletList
                items={[
                  "Insufficient volume of BOFU comparison and alternatives pages.",
                  "No stable Google AI Overview presence in sampled prompt set.",
                  "Underdeveloped off-site trust relay tied to core money entities.",
                ]}
              />
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="amber">
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionLead
            takeaway="BTS is competing in a market with a large validated demand pool and a clear wedge to enter."
            body="Validated keyword demand across US and AU shows meaningful scale. The immediate upside is not trying to beat Patreon on every head term — it is owning high-intent alternatives, comparisons, and decision content where recommendation shifts happen fastest."
            implication="The fastest path is category wedge ownership first, then breadth."
          />

          <StatsGrid
            columns={3}
            stats={[
              {
                label: "Total search opportunity",
                value: nf(2268640),
                note: "Validated demand across US + AU keyword universe.",
                icon: <Globe className="h-5 w-5" />,
              },
              {
                label: "Expected traffic in 12 months (base)",
                value: nf(191043),
                note: "With serious execution across BOFU/MOFU/TOFU surfaces.",
                icon: <TrendingUp className="h-5 w-5" />,
              },
              {
                label: "Aggressive upside",
                value: nf(285367),
                note: "If wedge ownership lands early and compounds.",
                icon: <Rocket className="h-5 w-5" />,
              },
            ]}
          />

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">BOFU starts the engine</div>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Alternatives, comparisons, and pricing pages create fastest shortlist movement and highest commercial leverage.
              </p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">MOFU compounds trust</div>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Evaluation and implementation content converts awareness into confidence and improves recommendation consistency.
              </p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">TOFU creates retrieval density</div>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Programmatic coverage gives answer engines more opportunities to “see” and cite BTS across long-tail intent.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="04" title="Why Behind the Scenes Can Win" />
          <StrategySectionLead
            takeaway="BTS has a realistic right-to-win if it narrows the first battle and executes with velocity."
            body="This market does not reward generic publishing. It rewards clear entity framing, superior comparison assets, and relentless distribution. BTS can win that game because it already has the product angle and enough authority base to accelerate."
            implication="The objective is not to look bigger than incumbents. It is to be the clearest answer in specific high-value prompts."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <StrategyCard glow="blue">
              <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                <Target className="h-4 w-4" />
                <div className="text-[10px] font-mono uppercase tracking-[0.18em]">Right-to-win factors</div>
              </div>
              <BulletList items={rightToWinPoints} />
            </StrategyCard>

            <StrategyCard>
              <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                <ShieldCheck className="h-4 w-4" />
                <div className="text-[10px] font-mono uppercase tracking-[0.18em]">Guardrail check</div>
              </div>
              <p className="text-sm leading-6 text-white/70">
                Topical integrity passed with high confidence. Headline planning here is intentionally built on validated, category-relevant demand
                and excludes ambiguous/low-quality semantic noise from core narrative claims.
              </p>
              <div className="mt-4 rounded-[18px] border border-white/10 bg-black/20 p-3 text-sm text-white/70">
                Low-quality semantic demand share: <span className="text-white">0.01%</span> · Ambiguous prompt mentions:{" "}
                <span className="text-white">0</span> · Validated prompt mentions: <span className="text-white">10</span>
              </div>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="The market gap is not product quality — it is distribution and answer-surface ownership."
            body="Incumbents dominate because they are structurally present across commercial pages, authority domains, and answer-engine retrieval paths. BTS can close this by building and distributing a denser, better-framed decision content layer."
            implication="Shortlist share is won by surface area + trust signals, not by one homepage."
          />

          <DataTable
            headers={["Domain", "Organic traffic", "Keywords", "Ref. domains", "Backlinks", "AI prompt footprint"]}
            rows={competitorRows}
            highlightRow={0}
          />
        </StrategySectionShell>

        <StrategySectionShell glow="blue">
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionLead
            takeaway="BTS has partial LLM mention momentum, but recommendation consistency is not there yet."
            body="In sampled prompts, BTS appears in some ChatGPT and Gemini responses, but remains absent in Google AI Overview outputs. Competitors with stronger entity and distribution layers are cited more consistently."
            implication="The job is to move from occasional mention to repeatable top-option recommendation."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {aiPlatformStats.map((item) => (
              <StrategyCard key={item.platform}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[#f4e4cd]">
                    {item.icon}
                    <span className="text-sm font-semibold text-white">{item.platform}</span>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/60">
                    {pct(item.mentionRate)}
                  </div>
                </div>
                <div className="text-sm text-white">{item.status}</div>
                <p className="mt-2 text-sm leading-6 text-white/62">{item.gap}</p>
              </StrategyCard>
            ))}
          </div>

          <div className="mt-5">
            <DataTable
              headers={["Prompt example", "Who wins today", "BTS today", "What must change"]}
              rows={promptExamples.map((p) => [p.query, p.whoWins, p.btsNow, p.whatChanges])}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="amber">
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionLead
            takeaway="This is a pipeline leverage play: more shortlist visibility lowers paid dependency and improves conversion efficiency."
            body="Modeled traffic potential is meaningful, but revenue planning should remain tied to BTS first-party funnel and ACV/AOV data. The commercial upside comes from being present earlier in buying journeys and in more decision prompts."
            implication="Revenue planning requires client ACV/AOV and funnel inputs."
          />

          <PhasedUpsideChart points={phasedPoints} />

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Expected traffic in 12 months</div>
              <div className="mt-2 text-3xl font-display font-bold text-white">{nf(191043)}</div>
              <p className="mt-2 text-sm leading-6 text-white/62">Base trajectory with disciplined execution across all surfaces.</p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">First 90-day target</div>
              <div className="mt-2 text-3xl font-display font-bold text-white">{nf(28656)}</div>
              <p className="mt-2 text-sm leading-6 text-white/62">Early gains expected from BOFU wedge pages and trust-relay distribution.</p>
            </StrategyCard>
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Pipeline potential (leads)</div>
              <div className="mt-2 text-3xl font-display font-bold text-white">{nf(1719)}</div>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Base scenario from model assumptions; must be calibrated against BTS first-party conversion data.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="08" title="90-day Wedge" />
          <StrategySectionLead
            takeaway="First mission: own the creator monetization alternatives/comparison wedge before broad category expansion."
            body="This wedge has clear demand, visible competitor concentration, and strong AI shortlist influence. Winning here gives BTS defensible momentum and a reusable playbook for adjacent entities."
            implication="Narrow focus for 90 days creates broader category leverage in months 4–12."
          />

          <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr]">
            <StrategyCard glow="blue">
              <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                <Compass className="h-4 w-4" />
                <div className="text-[10px] font-mono uppercase tracking-[0.18em]">Wedge definition</div>
              </div>
              <p className="text-sm leading-6 text-white/70">
                <span className="text-white">First category/entity wedge:</span> creator monetization platform alternatives and comparison decisions,
                led by “Patreon alternative” intent.
              </p>

              <div className="mt-4">
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">First pages to ship</div>
                <BulletList items={wedgePages} />
              </div>
            </StrategyCard>

            <div className="space-y-4">
              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">First prompts to win</div>
                <BulletList items={wedgePrompts} />
              </StrategyCard>

              <StrategyCard>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">First competitors to attack</div>
                <BulletList
                  items={[
                    "Patreon (default recommendation leader)",
                    "Kajabi (enterprise/comparison influence)",
                    "Teachable (evaluation and enterprise overlap)",
                    "Circle (AIO/AI visibility in category lists)",
                  ]}
                />
              </StrategyCard>
            </div>
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="mixed">
          <SectionHeader number="09" title="What Memetik Actually Builds and Ships" />
          <StrategySectionLead
            takeaway="This is a full execution system: on-site demand capture plus off-site authority building, shipped weekly."
            body="Memetik runs the complete Category Lock program: entity mapping, high-intent page production, programmatic coverage, aggressive authority distribution, review-platform reinforcement, and technical AEO infrastructure."
            implication="This is not a light content retainer — it is a category-positioning operating system."
          />

          <DeliveryScopeMatrix categories={deliveryCategories} lanes={deliveryLanes} milestones={rolloutMilestones} />

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <StrategyCard>
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Infrastructure included</div>
              <BulletList
                items={[
                  "Bing Webmaster setup + sitemap governance",
                  "IndexNow implementation and monitoring",
                  "Schema architecture (FAQ, comparison, review, organization)",
                  "Entity consistency across site, profiles, and external surfaces",
                ]}
              />
            </StrategyCard>
            <StrategyCard>
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Authority stack included</div>
              <BulletList
                items={[
                  "Aggressive topical backlink acquisition from credible domains",
                  "Digital PR + press release + listicle push strategy",
                  "Review-surface development and response operations",
                  "Third-party community presence for citation reinforcement",
                ]}
              />
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="10" title="Operating Model" />
          <StrategySectionLead
            takeaway="Execution is concurrent, weekly, and measurable — not phase-gated content batching."
            body="Research, production, distribution, and measurement run in parallel every week. This keeps BTS shipping visible assets while continuously improving answer share."
            implication="You get continuous output and compounding market position, not delayed quarterly surprises."
          />

          <ExecutionInfographic steps={operatingSteps} tracks={operatingTracks} outputs={operatingOutputs} />
        </StrategySectionShell>

        <StrategySectionShell glow="blue">
          <SectionHeader number="11" title="Why Memetik" />
          <StrategySectionLead
            takeaway="Memetik is built for founder-level outcomes: shortlist share, pipeline leverage, and defensible category position."
            body="Most teams either do conventional SEO or generic AI chatter. Memetik builds the bridge between commercial search capture and answer-engine recommendation dominance."
            implication="The moat is created by combining strategic narrative, production velocity, and trust-layer execution."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <StrategyCard glow="mixed">
              <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                <Workflow className="h-4 w-4" />
                <div className="text-[10px] font-mono uppercase tracking-[0.18em]">What founders get</div>
              </div>
              <BulletList
                items={[
                  "An explicit category lock plan linked to commercial prompts.",
                  "Visible weekly output across both owned and third-party surfaces.",
                  "Prompt-level AI visibility tracking plus competitor movement intelligence.",
                  "An operating partner that executes, not just audits and advises.",
                ]}
              />
            </StrategyCard>

            <StrategyCard>
              <div className="mb-3 flex items-center gap-2 text-[#f4e4cd]">
                <Sparkles className="h-4 w-4" />
                <div className="text-[10px] font-mono uppercase tracking-[0.18em]">What this is not</div>
              </div>
              <BulletList
                items={[
                  "Not a keyword spreadsheet and blog quota.",
                  "Not Google-only optimization in a multi-engine buying world.",
                  "Not passive consulting without shipping responsibility.",
                  "Not vanity traffic reporting detached from pipeline impact.",
                ]}
              />
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="12" title="Appendix · Supporting Evidence" />
          <StrategySectionLead
            takeaway="Detailed assumptions, evidence, and diagnostics are below for operator-level review."
            body="Main narrative stays founder-brief. This appendix holds deeper benchmark, prompt, and model details."
          />

          <div className="space-y-4">
            <StrategyAppendixSection
              title="Assumptions, confidence, and planning guardrails"
              description="Translated into plain language for planning use."
              defaultOpen
            >
              <div className="grid gap-4 md:grid-cols-2">
                <StrategyCard>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Planning assumptions</div>
                  <BulletList
                    items={[
                      "Numbers represent planning estimates, not observed analytics outcomes.",
                      "Model is based on US + AU market demand only.",
                      "Expected outcomes assume serious weekly execution, not passive publishing.",
                      "BOFU is expected to move first, MOFU compounds next, TOFU density follows.",
                      "First-party analytics should be used to calibrate conversion assumptions quickly.",
                    ]}
                  />
                </StrategyCard>
                <StrategyCard>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Confidence and integrity</div>
                  <BulletList
                    items={[
                      "Confidence level: high (score 100).",
                      "Topical integrity check: passed.",
                      "Ambiguous prompt mentions: 0.",
                      "Validated prompt mentions: 10.",
                      "Low-quality semantic demand contribution is negligible.",
                    ]}
                  />
                </StrategyCard>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Competitor benchmark (search + authority)"
              description="Backlink and referring-domain values pulled from the research payload."
            >
              <DataTable
                headers={[
                  "Domain",
                  "Organic traffic",
                  "Organic keywords",
                  "Backlinks",
                  "Ref. domains",
                  "Backlink spam score",
                  "Target spam score",
                ]}
                rows={competitorAppendixRows}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Validated opportunity clusters"
              description="Cluster-level demand and projected 12-month contribution ranges."
            >
              <DataTable
                headers={["Cluster", "Intent", "Demand", "Keyword count", "12m expected traffic (low/base/high)"]}
                rows={appendixClusterRows}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Prompt evidence sample"
              description="Representative prompts across platforms showing current winner patterns and BTS visibility status."
            >
              <DataTable
                headers={["Prompt", "Platforms sampled", "What the sample showed", "Action implication"]}
                rows={promptEvidenceRows}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Technical and on-page snapshot"
              description="High-level crawl and infrastructure context from the payload."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <StrategyCard>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Homepage title</div>
                  <p className="text-sm leading-6 text-white/72">
                    Best Creator Platform in 2026 | Earn From Your Content - Behind the Scenes
                  </p>
                </StrategyCard>
                <StrategyCard>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">On-page structure</div>
                  <p className="text-sm leading-6 text-white/72">Word count: 1,087 · Internal links: 6 · External links: 9 · Status: 200</p>
                </StrategyCard>
                <StrategyCard>
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Timing snapshot</div>
                  <p className="text-sm leading-6 text-white/72">
                    Time to interactive: 1,220ms · DOM complete: 2,710ms
                  </p>
                </StrategyCard>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Month-by-month concurrent workstreams"
              description="Detailed cadence map for operator-level execution review."
            >
              <WorkstreamTimeline
                months={["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"]}
                tracks={[
                  {
                    name: "Money entity capture",
                    description: "Prioritize and ship BOFU wedge pages, then defend.",
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
                    name: "Implementation + workflow layer",
                    description: "Publish implementation and proof content that supports conversion confidence.",
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
                    description: "Sustain external signal growth to improve recommendation trust.",
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
                    name: "Prompt ops + measurement",
                    description: "Track answer share weekly and feed insights into next sprint.",
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
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="TAM × LTV calculator"
              description="Revenue planning helper. Use BTS first-party economics for real forecasting."
            >
              <TamRoiCalculator baseReachableVisits={191043} defaultVisitToCustomerRate={0.9 / 100} />
            </StrategyAppendixSection>
          </div>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Book Strategy Call"
          title="If you want BTS to become the default recommendation, let's build the wedge now."
          body="Memetik will walk your team through the first 90-day execution plan, required assets, and the exact operating cadence to turn this into a compounding growth channel."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />
      </div>
    </StrategyPageFrame>
  );
}

export default StrategyBts2;