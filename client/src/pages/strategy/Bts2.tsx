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
  DeliveryScopeMatrix,
  ExecutionInfographic,
  WorkstreamTimeline,
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyEyebrow,
  StrategyCTA,
  StrategySectionLead,
  StrategyAppendixSection,
} from "@/components/strategy";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  Building2,
  FileText,
  Gauge,
  Globe,
  Layers3,
  Link2,
  MessageSquareQuote,
  Network,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  TrendingUp,
  Workflow,
} from "lucide-react";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

const executiveStats = [
  {
    label: "Total search opportunity",
    value: formatNumber(2268640),
    note: "Validated demand across creator-platform queries, with topical integrity passed.",
    valueClassName: "text-[clamp(1.7rem,3vw,2.7rem)]",
    icon: <Search className="h-5 w-5" />,
  },
  {
    label: "Expected traffic in 12 months",
    value: formatNumber(191043),
    note: "Base case if BTS owns the first commercial lane and expands coverage behind it.",
    valueClassName: "text-[clamp(1.7rem,3vw,2.7rem)]",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    label: "Aggressive upside",
    value: formatNumber(285367),
    note: "Higher-end scenario if the first commercial win compounds into broader creator-platform demand.",
    valueClassName: "text-[clamp(1.7rem,3vw,2.7rem)]",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    label: "First 90-day target",
    value: formatNumber(28656),
    note: "The first proof window is buyer consideration, not broad awareness all at once.",
    valueClassName: "text-[clamp(1.7rem,3vw,2.7rem)]",
    icon: <Target className="h-5 w-5" />,
  },
];

const currentStateStats = [
  {
    label: "Current organic traffic",
    value: "162",
    note: "Current discoverability is tiny relative to the validated category opportunity.",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    label: "Current organic keywords",
    value: "19",
    note: "BTS is not yet publishing enough category-defining commercial surfaces.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: "Referring domains",
    value: formatNumber(880),
    note: "There is already enough authority to support a focused commercial opening move if execution becomes systematic.",
    icon: <Link2 className="h-5 w-5" />,
  },
  {
    label: "Backlinks",
    value: formatNumber(27577),
    note: "The issue is not zero authority. The issue is weak commercial coverage and inconsistent retrieval signals.",
    icon: <Network className="h-5 w-5" />,
    valueClassName: "text-[clamp(1.8rem,3.1vw,2.8rem)]",
  },
];

const opportunityCards = [
  {
    title: "Buyer Guides",
    demand: "26,590",
    traffic: "6,615",
    phase: "Phase 1",
    description:
      "This is the fastest path to intent-rich discovery: creator monetization platform, video creator platform, and adjacent buying-language queries.",
    examples: ["circle app", "app circle", "creator monetization platform"],
  },
  {
    title: "Alternatives & Comparisons",
    demand: "8,470",
    traffic: "2,118",
    phase: "Phase 1",
    description:
      "This is where buying consideration is clearest. Buyers compare platforms before they ever talk to sales or sign up for a trial.",
    examples: ["patreon alternative", "kajabi alternative", "kajabi vs teachable"],
  },
  {
    title: "Pricing & Cost",
    demand: "4,910",
    traffic: "1,228",
    phase: "Phase 1",
    description:
      "Pricing-intent pages shape conversion confidence. They help BTS win buyers who are already comparing business models and fee structures.",
    examples: ["kajabi pricing", "skool pricing", "patreon cost"],
  },
  {
    title: "Category & Brand Demand",
    demand: "2,228,330",
    traffic: "181,000",
    phase: "Phase 3",
    description:
      "This is the larger long-game category prize. It becomes more winnable once BTS first owns a defined monetization lane and earns outside proof.",
    examples: ["patreon", "kajabi", "skool"],
  },
];

const upsidePoints = [
  { month: 1, low: 700, base: 1200, high: 1800 },
  { month: 2, low: 6500, base: 9500, high: 14000 },
  { month: 3, low: 19000, base: 28656, high: 42000 },
  { month: 4, low: 29000, base: 42000, high: 63000 },
  { month: 5, low: 40000, base: 58000, high: 86000 },
  { month: 6, low: 51500, base: 75000, high: 110000 },
  { month: 7, low: 63000, base: 93000, high: 136000 },
  { month: 8, low: 74500, base: 112000, high: 164000 },
  { month: 9, low: 86000, base: 132000, high: 194000 },
  { month: 10, low: 97000, base: 151000, high: 224000 },
  { month: 11, low: 105000, base: 171500, high: 255000 },
  { month: 12, low: 112588, base: 191043, high: 285367 },
];

const competitorRows = [
  ["Patreon", "4,172,095", "598,893", "372,395", "454,284,402", "21"],
  ["Teachable", "506,693", "81,847", "88,832", "15,841,175", "5"],
  ["Circle", "219,983", "13,861", "21,370", "1,707,296", "2"],
  ["Skool", "208,627", "52,170", "73,244", "6,040,046", "0"],
  ["Kajabi", "79,194", "17,679", "40,224", "1,529,242", "7"],
  ["Behind the Scenes", "162", "19", "880", "27,577", "—"],
];

const platformStats = [
  {
    platform: "ChatGPT",
    rate: "25.0%",
    note: "BTS appears in a minority of sampled prompts. Branded alternative queries can trigger mentions, but not durable default-answer status yet.",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    platform: "Gemini",
    rate: "37.5%",
    note: "Gemini shows more early mention momentum, which suggests the positioning can land when the retrieval context is strong enough.",
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    platform: "Google AI Overviews",
    rate: "0.0%",
    note: "In the sampled set, BTS did not surface. That makes Google-side commercial page coverage and technical/entity readiness a real priority.",
    icon: <Search className="h-5 w-5" />,
  },
];

const promptExamples = [
  {
    prompt: "best creator monetization platform tools",
    platform: "Gemini · AU",
    takeaway:
      "BTS can be recognized in broad category prompts, but that is not the same as owning the answer. The market is still open for a stronger default recommendation.",
    detail:
      "The sampled result framed the market around monetization tools, but broad tool roundups still tend to disperse attention across many vendors unless BTS owns stronger category pages and comparison proof.",
  },
  {
    prompt: "behind the scenes creator monetization platform alternatives",
    platform: "ChatGPT · US / AU",
    takeaway:
      "Even branded alternative prompts still redirect attention toward bigger incumbents like Patreon and adjacent options like Ko-fi.",
    detail:
      "This is exactly why the first move should be comparison pages: buyers are already asking decision-stage questions, and BTS needs pages that make it the serious-business alternative to options like Whop.",
  },
  {
    prompt: "behind the scenes creator monetization platform alternatives",
    platform: "Gemini · AU",
    takeaway:
      "Gemini surfaced BTS with clearer differentiated language around frictionless commerce and pay-per-view, which is a useful signal.",
    detail:
      "That means the positioning is not the problem. The problem is repetition and reinforcement across owned pages, third-party proof, and broader retrieval coverage.",
  },
];

const firstPages = [
  "Whop alternative",
  "BTS vs Whop",
  "Patreon alternative",
  "Creator monetization platform",
  "Circle app",
  "App Circle",
  "Video creator platform",
  "Noise creator platform",
  "Kajabi alternative",
  "Pricing / cost explainer",
];

const firstPrompts = [
  "best creator monetization platform",
  "best Whop alternative",
  "patreon alternative",
  "creator monetization platform alternatives",
  "kajabi alternative",
  "skool vs patreon",
  "best platform for behind-the-scenes content",
];

const firstCompetitors = ["Whop", "Patreon", "Kajabi", "Circle", "Skool"];

const deliveryCategories = [
  {
    label: "Priority buying query mapping",
    detail:
      "Prioritize the commercial prompt families that actually shape buyer decisions, not a random keyword backlog.",
  },
  {
    label: "Bottom-of-funnel pages",
    detail:
      "Build the decision pages, comparisons, and evaluation content that turn BTS into a credible buying option.",
  },
  {
    label: "Supporting coverage",
    detail:
      "Expand supporting content so answer engines keep finding the same commercial story in more contexts.",
  },
  {
    label: "Off-site authority",
    detail:
      "Push review, editorial, Reddit, community, and link-based proof until the market sees the same answer everywhere.",
  },
];

const deliveryLanes = [
  {
    category: "On-site conversion layer",
    title: "Bottom-of-funnel decision pages",
    volume: "As many bottom-of-funnel pages as needed to cover real demand",
    whyItMatters:
      "These are the pages that create buying consideration fastest: alternatives, comparisons, use-case pages, pricing explainers, and decision-support assets.",
    deliverables: [
      "Patreon alternative flagship page",
      "Whop comparison and alternative pages",
      "Head-to-head competitor pages",
      "Best-for / use-case guides",
      "Pricing and cost transparency pages",
    ],
  },
  {
    category: "Commercial coverage",
    title: "Category-capture and evaluation layer",
    volume: "Expanded anywhere buyers compare options",
    whyItMatters:
      "BTS needs more than one hero page. It needs enough middle-funnel and commercial coverage that buyers keep encountering the same business case.",
    deliverables: [
      "Alternatives and versus pages",
      "Buyer guide clusters",
      "Persona / monetization-model pages",
      "Comparison rubric and proof pages",
    ],
  },
  {
    category: "Scale layer",
    title: "Supporting content network",
    volume: "Scaled around the winning pages and use cases",
    whyItMatters:
      "Supporting pages create retrieval density, reinforce the opening move, and route authority back into the highest-converting pages.",
    deliverables: [
      "Competitor-adjacent supporting pages",
      "Creator persona coverage",
      "Use-case and monetization model pages",
      "Internal-link architecture back to the decision pages",
    ],
  },
  {
    category: "Authority layer",
    title: "Off-site authority and proof",
    volume: "Built across the third-party surfaces that shape trust",
    whyItMatters:
      "Default recommendation status does not move on owned pages alone. BTS needs third-party reinforcement across reviews, editorials, Reddit threads, communities, and link nodes.",
    deliverables: [
      "Aggressive backlink acquisition to the decision pages",
      "Digital PR, editorial, and listicle pushes",
      "Review-platform presence and reinforcement",
      "Forum, Reddit, creator-community, and newsletter placements",
    ],
  },
];

const deliveryMilestones = [
  {
    window: "Day 0–30",
    output:
      "Map the highest-intent buying queries, launch the first decision pages, get review profiles live, and start early placements across Reddit, creator communities, and editorial surfaces.",
  },
  {
    window: "Day 31–60",
    output:
      "Expand the comparison library, publish supporting coverage behind the winners, and grow review, editorial, and backlink proof around the pages already gaining traction.",
  },
  {
    window: "Day 61–90",
    output:
      "Cover the highest-intent demand fully, reinforce the strongest pages with community proof and backlinks, and turn early wins into a durable business-building brand signal.",
  },
];

const executionSteps = [
  {
    label: "Map the opening move",
    detail:
      "Lock the first buying queries, the first competitors to attack, the first prompts to win, and the proof needed to make each page believable.",
  },
  {
    label: "Ship the core pages",
    detail:
      "Publish the initial decision pages and comparison pages that change buyer consideration instead of waiting for broad category coverage first.",
  },
  {
    label: "Multiply distribution",
    detail:
      "Break each shipped asset into micro-assets, listicle angles, community posts, review proof, and backlinks that reinforce the same narrative.",
  },
  {
    label: "Reinforce and iterate",
    detail:
      "Re-test prompts, monitor movement, refresh weak pages, and push more authority at the prompts where BTS begins to win.",
  },
];

const executionTracks = [
  {
    name: "Publishing and owned visibility",
    description:
      "Memetik runs the page production engine: commercial page briefs, drafting, optimization, schema alignment, publishing support, and indexing readiness.",
    deliverables: [
      "Publish 1 core asset",
      "Expand into related comparison / evaluation pages",
      "Add schema, canonicals, and internal links",
      "Refresh pages as competitors respond",
    ],
    outcome:
      "BTS gets a visible on-site body of work that answer engines and buyers can actually retrieve, compare, and trust.",
  },
  {
    name: "Off-site authority distribution",
    description:
      "Every core asset gets broken into derivative content and pushed into authority nodes. This is where the market starts hearing the same story from more than BTS itself.",
    deliverables: [
      "Turn each core asset into 10–20 micro-assets",
      "Push to 3–5 authority nodes per asset",
      "Secure backlinks, listicles, review proof, and community mentions",
      "Link back to the owned destination consistently",
    ],
    outcome:
      "BTS gains the third-party reinforcement needed to increase buyer trust across both classic search and AI answer layers.",
  },
];

const executionOutputs = [
  {
    label: "A real shipping cadence",
    detail:
      "Not a quarterly strategy deck. BTS sees pages, placements, proof objects, refreshes, and weekly movement.",
  },
  {
    label: "A cleaner answer-engine signal",
    detail:
      "The same commercial story starts appearing across owned pages, review surfaces, communities, and editorial mentions.",
  },
  {
    label: "A more defensible growth channel",
    detail:
      "As the opening move compounds, BTS depends less on isolated wins and more on a system competitors have to unpick surface by surface.",
  },
];

const cadenceTracks = [
  {
    name: "Priority buying query research and prioritization",
    description: "Keep the prompt map current as buyer language and competitor pressure evolve.",
    cells: [
      { label: "Refresh priority prompts", tone: "high" as const },
      { label: "Expand gaps", tone: "base" as const },
      { label: "Re-rank entities", tone: "base" as const },
      { label: "Defend winners", tone: "high" as const },
    ],
  },
  {
    name: "Decision-page publishing",
    description: "Flagship pages and comparison assets keep shipping instead of pausing after the first batch.",
    cells: [
      { label: "First wave assets", tone: "high" as const },
      { label: "Cluster buildout", tone: "high" as const },
      { label: "Evidence assets", tone: "base" as const },
      { label: "Refresh + expand", tone: "base" as const },
    ],
  },
  {
    name: "Supporting coverage expansion",
    description: "Supporting retrieval pages extend the opening move into more use cases, personas, and competitor-adjacent contexts.",
    cells: [
      { label: "100 pages", tone: "base" as const },
      { label: "400 pages", tone: "high" as const },
      { label: "800+ pages", tone: "high" as const },
      { label: "Deeper coverage", tone: "base" as const },
    ],
  },
  {
    name: "Off-site authority",
    description: "Backlinks, review activity, listicles, community posts, and editorial mentions run continuously.",
    cells: [
      { label: "10 placements", tone: "base" as const },
      { label: "25 placements", tone: "high" as const },
      { label: "40 placements", tone: "high" as const },
      { label: "Compound authority", tone: "base" as const },
    ],
  },
];

const whyMemetikBullets = [
  "Memetik is not selling generic SEO reporting. The system is built to win high-intent buying decisions and default recommendations.",
  "The execution model keeps decision pages, supporting coverage, off-site authority, and technical/entity work connected instead of split across agencies.",
  "The program is designed for category ownership: first win a narrow commercial opening move, then widen that control into broader demand.",
  "Reporting stays tied to prompt coverage, answer visibility, authority proof, and business-facing progress rather than vanity ranking noise.",
];

const offsiteAuthorityCards = [
  {
    title: "Reddit and creator communities",
    body:
      "BTS needs visible proof in the places creators pressure-test platforms in public. That means Reddit threads, niche communities, founder groups, and creator conversations where real buyers compare Whop, Patreon, and the rest.",
    icon: <MessageSquareQuote className="h-5 w-5" />,
  },
  {
    title: "Reviews and editorial proof",
    body:
      "Review profiles, listicles, expert roundups, and editorial mentions help answer engines see BTS as a credible business platform instead of a niche brand with thin third-party proof.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Backlinks that reinforce the money pages",
    body:
      "Every strong comparison page should keep getting cited, linked, and discussed off-site so the on-site story is reinforced by the wider web, not left to stand alone.",
    icon: <Link2 className="h-5 w-5" />,
  },
];

function PromptCard({
  prompt,
  platform,
  takeaway,
  detail,
}: {
  prompt: string;
  platform: string;
  takeaway: string;
  detail: string;
}) {
  return (
    <StrategyCard className="h-full" glow="blue">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Sample prompt</div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
          {platform}
        </div>
      </div>
      <div className="mt-3 text-base font-semibold leading-7 text-white">{prompt}</div>
      <p className="mt-3 text-sm leading-6 text-white/72">{takeaway}</p>
      <div className="mt-4 rounded-[20px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/58">
        {detail}
      </div>
    </StrategyCard>
  );
}

function KeyMoveCard({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <StrategyCard className="h-full" glow="mixed">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/62">{body}</p>
    </StrategyCard>
  );
}

export default function StrategyBts2() {
  useEffect(() => {
    document.title = "Behind the Scenes Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame mainClassName="px-4 pt-24 pb-28 sm:px-6 md:px-10">
      <Nav />

      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-14 md:gap-18">
        <StrategyHero
          eyebrow="00 · Founder strategy memo"
          title="BTS for serious creators building real businesses"
          subtitle="Own the commercial comparisons and monetization queries where founders choose the platform they can build on long term."
          tags={[
            "behindthescenes.com",
            "Creator Economy",
            "Creator monetization platform",
            "US + AU demand mapped",
            "Approved brief · 2026-03-07",
          ]}
        >
          <StrategySectionShell className="mt-8" glow="amber">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
              <div>
                <StrategyEyebrow className="mb-5">Executive Summary</StrategyEyebrow>
                <StatsGrid stats={executiveStats} columns={2} className="gap-4" />
              </div>

              <StrategyCard className="h-full" glow="blue">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Immediate actions</div>
                  <ArrowRight className="h-4 w-4 text-white/35" />
                </div>

                <div className="space-y-4">
                  {[
                    "Lead with Whop and Patreon comparison pages where buying intent is already visible and BTS can frame itself as the serious-business option.",
                    "Pair every core bottom-of-funnel page with off-site authority, review proof, Reddit/community visibility, and backlinks so the message compounds off-site as well as on-site.",
                    "Keep the first 90 days output-heavy and visible: pages shipped, placements earned, coverage expanded, and buyer trust checked weekly.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-[22px] border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-mono text-xs font-bold tracking-[0.18em] text-[#f4e4cd]">
                          0{index + 1}
                        </div>
                        <p className="text-sm leading-6 text-white/72">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[22px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Canonical lineage
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/78">
                    This page is rendered from the approved brief, not raw research:
                    <span className="text-white"> master reference → generation contract → brief → page</span>.
                  </p>
                </div>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </StrategyHero>

        <StrategySectionShell>
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still matters, but buying consideration now gets shaped across classic search and AI answer engines before a buyer ever converts."
            body="The commercial reality is hybrid, not either/or. Google still drives a major share of discovery and commercial research. Traditional search remains core behavior. At the same time, buyers increasingly move across ChatGPT, Gemini, Perplexity, Google AI Overviews, and other answer layers to compare vendors, pressure-test alternatives, and decide who even deserves a click."
            implication="Winning the category now means owning both demand capture and answer-surface trust. If BTS only shows up in one layer, competitors still control buyer consideration."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <KeyMoveCard
              icon={<Search className="h-5 w-5" />}
              title="Classic search still drives demand"
              body="Commercial research still starts with search behavior that looks familiar: comparisons, alternatives, pricing, reviews, and brand lookups. Ignoring Google would mean ignoring the largest visible demand layer."
            />
            <KeyMoveCard
              icon={<Bot className="h-5 w-5" />}
              title="AI changes who gets considered"
              body="More buying journeys now pass through answer engines before analytics can fully see them. That changes where brand preference gets formed and which companies become the default suggestion."
            />
            <KeyMoveCard
              icon={<Radar className="h-5 w-5" />}
              title="Category winners reinforce both"
              body="The brands that win are not just publishing pages. They are creating one repeated commercial story across owned pages, review surfaces, editorial mentions, communities, and answer engines."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="02" title="Where Behind the Scenes Is Today" />
          <StrategySectionLead
            takeaway="BTS has enough authority to matter, but not enough commercial coverage to get chosen."
            body="The current site is not starting from zero. It already has 880 referring domains and 27,577 backlinks, which is a usable base. What is missing is systematic coverage of the commercial prompts that shape buyer choice in the creator platform category."
            implication="This is a positioning-and-execution gap more than an authority gap. BTS does not need a reinvention. It needs a sharper opening move."
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <StatsGrid stats={currentStateStats} columns={2} />
            </div>

            <HighlightBox className="h-full">
              <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">
                Snapshot diagnosis
              </div>
              <h3 className="mt-4 text-2xl font-display font-bold tracking-tight text-white">
                Strong enough to accelerate. Invisible enough to lose the category if nothing changes.
              </h3>
              <div className="mt-5">
                <BulletList
                  items={[
                    "Current organic visibility is tiny relative to a 2,268,640-query validated search opportunity.",
                    "Topical integrity passed, so the market model is built on validated demand rather than noisy semantic expansion.",
                    "One live commercial signal already exists: “skool vs patreon” is ranking, which supports a comparison-first opening move.",
                    "The current gap is a lack of owned answer assets, comparison coverage, pricing clarity, and retrieval repetition.",
                  ]}
                />
              </div>
            </HighlightBox>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionLead
            takeaway="The fastest path is not broad creator-category awareness. It is owning the monetization and alternative queries that create buyer consideration first."
            body="The approved brief is explicit: Buyer Guides, Alternatives & Comparisons, and Pricing & Cost are the Phase 1 clusters. Broad category demand becomes much more winnable after BTS establishes itself as a credible answer for the commercial prompts buyers use when they are actively comparing options."
            implication="In plain English: win the buying questions first, then expand into the larger category."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {opportunityCards.map((card) => (
              <StrategyCard key={card.title} className="h-full" glow="mixed">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                      {card.phase}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{card.title}</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                    Demand {card.demand}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/62">{card.description}</p>
                <div className="mt-4 rounded-[20px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">
                    Expected traffic in 12 months
                  </div>
                  <div className="mt-2 text-2xl font-display font-bold tracking-tight text-white">
                    {card.traffic}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {card.examples.map((example) => (
                      <div
                        key={example}
                        className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/52"
                      >
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </StrategyCard>
            ))}
          </div>

          <div className="mt-6">
            <PhasedUpsideChart points={upsidePoints} />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="04" title="Why Behind the Scenes Can Win" />
          <StrategySectionLead
            takeaway="BTS does not need to beat every creator platform everywhere. It needs to own one clear commercial lane where its positioning already makes sense."
            body="The company-specific right to win is unusually clear. BTS already has a monetization-first positioning, a usable authority base, and early evidence that LLMs can understand its differentiated framing. What it lacks is repetition: the same commercial story expressed through the right pages, comparisons, proof surfaces, and technical/entity signals."
            implication="That combination makes this a leverage problem, not a blank-sheet problem."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <KeyMoveCard
              icon={<BadgeCheck className="h-5 w-5" />}
              title="The positioning already fits the opening move"
              body="Prompt evidence shows answer engines can describe BTS in a differentiated way around frictionless commerce and creator monetization. That is a useful starting advantage."
            />
            <KeyMoveCard
              icon={<Building2 className="h-5 w-5" />}
              title="There is enough authority to support lift"
              body="880 referring domains is not category dominance, but it is enough to amplify a focused alternative-and-comparison opening move if the pages and proof get built correctly."
            />
            <KeyMoveCard
              icon={<Telescope className="h-5 w-5" />}
              title="The Whop contrast is easy to understand"
              body="Whop can own the broader creator marketplace lane. BTS can own the buyer conversation for serious creators building real businesses who want a cleaner, more intentional platform story."
            />
          </div>

          <HighlightBox className="mt-6">
            <div className="max-w-4xl">
              <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Right-to-win summary</div>
              <p className="mt-4 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                The opening move is to own creator monetization alternatives and comparison intent before expanding into broad category demand.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">
                That is where BTS can look like the best answer fastest. Once those commercial pages exist and are reinforced off-site,
                the larger “creator platform” and competitor brand-demand layers become more winnable because the market has already learned
                how to place BTS in the category.
              </p>
            </div>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="Incumbents are winning because they are easier to retrieve, easier to compare, and easier for machines to trust."
            body="The competitive gap is not just size. It is surface area. Patreon, Teachable, Circle, Kajabi, and Skool all present more pages, more authority, and more repeated category cues than BTS does today. Buyers also compare against Whop when they want a creator-business platform, which makes the contrast page even more important."
            implication="BTS does not need to match incumbent scale immediately. It needs to become easier to choose in one high-intent lane first."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard className="h-full" glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                What incumbents have
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">Commercial surface area</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Competitors have more indexable comparison pages, more brand-demand pages, more editorial mentions, and more retrieval repetition across the web.
              </p>
            </StrategyCard>

            <StrategyCard className="h-full" glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                What BTS lacks
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">Decision pages that make the contrast obvious</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                BTS has not yet translated its positioning into a visible system of alternatives, versus pages, buyer guides, pricing explainers, and supporting proof that make the Whop contrast obvious.
              </p>
            </StrategyCard>

            <StrategyCard className="h-full" glow="amber">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                What to do
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">Attack the comparison layer first</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Alternatives and comparison prompts are where large category leaders can be displaced earliest because buyers are still deciding, not just searching for a familiar brand.
              </p>
            </StrategyCard>
          </div>

          <div className="mt-6">
            <DataTable
              headers={[
                "Brand",
                "Organic traffic",
                "Organic keywords",
                "Referring domains",
                "Backlinks",
                "Prompt hits",
              ]}
              rows={competitorRows}
              highlightRow={5}
              tableClassName="min-w-[880px]"
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionLead
            takeaway="BTS has early answer-engine momentum, but not durable business-platform default status."
            body="The sampled baseline is directionally useful: BTS appears in some ChatGPT and Gemini prompts, but sampled Google AI Overviews show no visibility. That means the brand is interpretable, but not yet reinforced enough across owned and third-party surfaces to become the obvious answer repeatedly."
            implication="This is why the strategy cannot stop at content publishing. It needs off-site authority and repeated third-party proof."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {platformStats.map((item) => (
              <StrategyCard key={item.platform} className="h-full" glow="mixed">
                <div className="mb-3 flex text-[#f4e4cd]">{item.icon}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                  Sampled mention rate
                </div>
                <div className="mt-2 text-3xl font-display font-bold tracking-tight text-white">{item.rate}</div>
                <div className="mt-2 text-lg font-semibold text-white">{item.platform}</div>
                <p className="mt-3 text-sm leading-6 text-white/62">{item.note}</p>
              </StrategyCard>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {promptExamples.map((item) => (
              <PromptCard key={`${item.platform}-${item.prompt}`} {...item} />
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Caveat discipline</span>
            <span className="ml-3">
              Public claims here are intentionally limited to the approved sampled surfaces. Additional platform probes had gaps in the source process, so this page does not overstate certainty for unsampled answer engines.
            </span>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionLead
            takeaway="The upside is not just more traffic. It is becoming the platform buyers trust earlier in the buying journey."
            body="For BTS, this strategy changes how buyers find, compare, and trust the platform. If the company becomes the repeated answer for creator monetization alternatives and commercial comparison prompts, that can reduce dependency on reactive acquisition and create a more defensible demand engine."
            implication="Traffic is the visible signal. Buyer choice is the business outcome."
          />

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <StatsGrid
                stats={[
                  {
                    label: "Total search opportunity",
                    value: formatNumber(2268640),
                    note: "Validated demand across the mapped creator-platform opportunity.",
                    icon: <Globe className="h-5 w-5" />,
                    valueClassName: "text-[clamp(1.75rem,3vw,2.9rem)]",
                  },
                  {
                    label: "Expected traffic in 12 months",
                    value: formatNumber(191043),
                    note: "Base case for the full traffic trajectory if the first commercial win compounds.",
                    icon: <TrendingUp className="h-5 w-5" />,
                    valueClassName: "text-[clamp(1.75rem,3vw,2.9rem)]",
                  },
                  {
                    label: "Aggressive upside",
                    value: formatNumber(285367),
                    note: "Higher-end scenario if BTS captures broader category demand after the first commercial win lands.",
                    icon: <Sparkles className="h-5 w-5" />,
                    valueClassName: "text-[clamp(1.75rem,3vw,2.9rem)]",
                  },
                  {
                    label: "First 90-day target",
                    value: formatNumber(28656),
                    note: "Initial traction window for the first commercial clusters.",
                    icon: <Target className="h-5 w-5" />,
                    valueClassName: "text-[clamp(1.75rem,3vw,2.9rem)]",
                  },
                ]}
                columns={2}
              />

              <HighlightBox>
                <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">
                  What this means in plain English
                </div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-white/68 md:text-base">
                  <p>
                    If BTS owns more of the comparison and monetization conversation, it increases the number of buyers who encounter the
                    brand before they settle on Patreon, Kajabi, or another incumbent.
                  </p>
                  <p>
                    That improves not just raw visits, but the quality of the visits: users arriving from alternative, pricing, and
                    evaluation queries are much closer to selection than broad top-of-funnel readers.
                  </p>
                </div>
              </HighlightBox>
            </div>

            <div className="space-y-4">
              <TamRoiCalculator baseReachableVisits={191043} />
              <div className="rounded-[24px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-4 text-sm leading-6 text-white/78">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Revenue planning note</span>
                <span className="ml-3">Revenue planning requires client ACV/AOV and funnel inputs.</span>
              </div>
            </div>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="08" title="90-day Opening Move" />
          <StrategySectionLead
            takeaway="The first 90 days should look like a focused category capture sprint, not a slow content warm-up."
            body="The opening move is specific: lead with Whop and Patreon comparison pages, publish the first bottom-of-funnel pages, push trust signals around each one, and expand supporting coverage behind the winners."
            implication="The goal of the first quarter is to change market perception in one commercial lane, then widen from there."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <StrategyCard className="h-full" glow="amber">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">First opening move</div>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Creator monetization alternatives and comparison intent for serious creators building real businesses
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                This is the cleanest commercial opening because buyers are actively comparing platforms and the brief already shows relevant BOFU demand and one live comparison ranking signal.
              </p>
              <div className="mt-5">
                <BulletList
                  items={[
                    "Own buyer consideration before chasing broad awareness",
                    "Use comparison pages to reposition BTS against Whop and other incumbents",
                    "Build around the terms buyers already use when switching or evaluating",
                  ]}
                />
              </div>
            </StrategyCard>

            <StrategyCard className="h-full" glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">First competitors to attack</div>
              <div className="mt-4 flex flex-wrap gap-3">
                {firstCompetitors.map((competitor) => (
                  <div
                    key={competitor}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/62"
                  >
                    {competitor}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-white/62">
                Whop matters because it is the cleanest contrast for founders who want to build a real business, not join a noisier marketplace. Patreon leads the next wave because it dominates membership framing, while Kajabi, Circle, and Skool overlap with creator monetization, courses, community, and creator-business tooling.
              </p>
            </StrategyCard>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <StrategyCard className="h-full" glow="mixed">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">First pages to ship</div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {firstPages.map((page) => (
                  <div
                    key={page}
                    className="rounded-[18px] border border-white/8 bg-black/20 px-3 py-3 text-sm leading-6 text-white/72"
                  >
                    {page}
                  </div>
                ))}
              </div>
            </StrategyCard>

            <StrategyCard className="h-full" glow="mixed">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">First prompts to win</div>
              <div className="mt-4 grid gap-2">
                {firstPrompts.map((prompt) => (
                  <div
                    key={prompt}
                    className="rounded-[18px] border border-white/8 bg-black/20 px-3 py-3 text-sm leading-6 text-white/72"
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </StrategyCard>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {deliveryMilestones.map((milestone) => (
              <StrategyCard key={milestone.window} className="h-full" glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{milestone.window}</div>
                <p className="mt-3 text-sm leading-7 text-white/72">{milestone.output}</p>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="09" title="Off-site Authority" />
          <StrategySectionLead
            takeaway="BTS will not become the obvious answer on owned pages alone. The market needs to hear the same story about BTS off-site too."
            body="This is the missing layer on most SEO retainers and the reason this strategy is more commercial than a publishing plan. Reddit threads, creator communities, reviews, listicles, editorial mentions, and backlinks help buyers — and answer engines — trust BTS as the serious-business alternative to Whop and the broader creator-platform field."
            implication="If BTS wants the comparison pages to convert, it needs public proof around them, not just polished on-site copy."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {offsiteAuthorityCards.map((card) => (
              <KeyMoveCard key={card.title} {...card} />
            ))}
          </div>

          <HighlightBox className="mt-6">
            <div className="max-w-4xl">
              <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Why Reddit matters</div>
              <p className="mt-4 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                When creators ask real people what to use instead of Whop, BTS needs to show up in the answer.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">
                That means creator-community threads, Reddit conversations, review profiles, and editorial proof that link back to the bottom-of-funnel pages and repeat the same commercial story: BTS is for serious creators building real businesses.
              </p>
            </div>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="10" title="What Memetik Actually Builds and Ships" />
          <StrategySectionLead
            takeaway="This is a category-capture program, not a light content retainer."
            body="Memetik’s delivery model is simple in public language: map the buying queries, build the decision pages, expand supporting coverage, reinforce them with off-site authority, and keep the technical/entity foundation clean. BTS does not just get blog posts. It gets a real demand-capture engine."
            implication="If any one of these layers is missing, the system gets weaker. That is why the scope has to be substantial."
          />

          <DeliveryScopeMatrix
            categories={deliveryCategories}
            lanes={deliveryLanes}
            milestones={deliveryMilestones}
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StrategyCard className="h-full" glow="amber">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                <Layers3 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">On-site production</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Priority buying query mapping, bottom-of-funnel targeting, comparison/evaluation content, supporting coverage, internal linking, and conversion-oriented page structure.
              </p>
            </StrategyCard>

            <StrategyCard className="h-full" glow="amber">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                <MessageSquareQuote className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Off-site authority</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Aggressive backlink acquisition, digital PR, press and editorial pushes, creator-software listicles, review-platform work, newsletter distribution, and community/forum placements that link back into the core decision pages.
              </p>
            </StrategyCard>

            <StrategyCard className="h-full" glow="amber">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Infrastructure and machine-readability</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Schema matched to visible content, sitemap hygiene, crawl and index eligibility, canonicals, Bing Webmaster Tools, IndexNow, and entity consistency across owned and third-party surfaces.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="11" title="Operating Model" />
          <StrategySectionLead
            takeaway="Execution works because research, publishing, distribution, and measurement run every week in parallel."
            body="This is not a linear sequence where pages are written first and authority comes later. Memetik runs the opening move like an operating system: map, publish, distribute, re-test, and reinforce. Every week creates visible outputs and stronger commercial signals."
            implication="That is how the program compounds instead of resetting every month."
          />

          <ExecutionInfographic
            steps={executionSteps}
            tracks={executionTracks}
            outputs={executionOutputs}
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <StrategyCard className="h-full" glow="mixed">
              <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Weekly cadence</div>
              <div className="mt-5 space-y-3">
                {[
                  {
                    day: "Monday",
                    text: "Research, entity updates, priority review, and prompt movement checks.",
                  },
                  {
                    day: "Tuesday–Wednesday",
                    text: "Page briefing, drafting, QA, comparison buildout, and supporting coverage production.",
                  },
                  {
                    day: "Thursday",
                    text: "Publishing, indexing pushes, off-site authority distribution, review activity, Reddit/community outreach, and authority-node outreach.",
                  },
                  {
                    day: "Friday",
                    text: "Metrics review, buyer-trust checks, prompt re-testing, and iteration planning.",
                  },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="rounded-[20px] border border-white/8 bg-black/20 p-4"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">
                      {item.day}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/72">{item.text}</p>
                  </div>
                ))}
              </div>
            </StrategyCard>

            <StrategyCard className="h-full" glow="blue">
              <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Distribution workflow</div>
              <h3 className="mt-4 text-2xl font-display font-bold tracking-tight text-white">
                Publish once. Multiply everywhere that matters.
              </h3>
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {[
                  {
                    step: "01",
                    title: "Ship core asset",
                    text: "Publish a flagship comparison, alternative, or buyer guide page.",
                  },
                  {
                    step: "02",
                    title: "Create micro-assets",
                    text: "Turn it into 10–20 short-form proofs, claims, snippets, and angle variations.",
                  },
                  {
                    step: "03",
                    title: "Push authority nodes",
                    text: "Distribute to 3–5 review, editorial, listicle, newsletter, or community surfaces.",
                  },
                  {
                    step: "04",
                    title: "Link back and reinforce",
                    text: "Route trust and context back to the owned destination until the signal repeats.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                      {item.step}
                    </div>
                    <div className="mt-2 text-base font-semibold text-white">{item.title}</div>
                    <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
                  </div>
                ))}
              </div>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="12" title="Why Memetik" />
          <StrategySectionLead
            takeaway="Memetik is built for category ownership in an answer-engine market, not just ranking maintenance."
            body="The difference is strategic discipline. Memetik keeps the founder-facing story simple — own the right buying questions and make the market hear the same answer everywhere — while keeping the operating model deep enough to actually move demand."
            implication="That is why the program feels more like a growth engine than an SEO retainer."
          />

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <StrategyCard className="h-full" glow="mixed">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold text-white">One system, not disconnected tactics</h3>
              <div className="mt-4">
                <BulletList items={whyMemetikBullets} />
              </div>
            </StrategyCard>

            <div className="grid gap-4">
              <StrategyCard className="h-full" glow="amber">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                  <CrownIcon />
                </div>
                <h3 className="text-xl font-semibold text-white">Founder-readable, operator-serious</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  The strategy stays easy to understand at the board level, but the work underneath is concrete enough to create real market movement.
                </p>
              </StrategyCard>

              <StrategyCard className="h-full" glow="amber">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                  <Radar className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">Measured by default recommendation momentum</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  The scorecard is whether BTS gets recommended, cited, and found for the right buying prompts — not just whether a keyword moved a few positions.
                </p>
              </StrategyCard>
            </div>
          </div>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Book a Strategy Call"
          title="If BTS wants to become the obvious platform for serious creators building real businesses, the opening move is ready."
          body="Memetik can turn this plan into a visible 90-day execution program: the first buying queries, the first bottom-of-funnel pages, the first off-site authority surfaces, and the operating cadence that makes the gains stick."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <div className="pt-2">
          <SectionHeader number="13" title="Supporting Evidence Appendix" />
          <StrategySectionLead
            takeaway="The main story above is intentionally concise. The detail below is here for diligence, not to clutter the decision."
            body="These appendix sections keep the source-safe evidence visible: cluster shape, competitor benchmarks, sampled prompt evidence, execution assumptions, and planning tools. The approved brief remains the canonical planning artifact behind this page."
          />

          <div className="space-y-5">
            <StrategyAppendixSection
              defaultOpen
              title="Keyword and demand clusters"
              description="The opening move is grounded in validated topical demand, with Phase 1 focused on BOFU clusters and Phase 3 reserved for broader category capture."
            >
              <DataTable
                headers={[
                  "Cluster",
                  "Intent",
                  "Execution phase",
                  "Demand",
                  "Expected traffic in 12 months",
                  "Sample keywords",
                ]}
                rows={[
                  [
                    "Buyer Guides",
                    "BOFU",
                    "Phase 1",
                    "26,590",
                    "6,615",
                    "circle app · app circle · creator monetization platform · video creator platform",
                  ],
                  [
                    "Alternatives & Comparisons",
                    "BOFU",
                    "Phase 1",
                    "8,470",
                    "2,118",
                    "patreon alternative · kajabi alternative · kajabi vs teachable · skool alternative",
                  ],
                  [
                    "Pricing & Cost",
                    "BOFU",
                    "Phase 1",
                    "4,910",
                    "1,228",
                    "kajabi pricing · skool pricing · patreon cost",
                  ],
                  [
                    "Category & Brand Demand",
                    "TOFU",
                    "Phase 3",
                    "2,228,330",
                    "181,000",
                    "patreon · kajabi · skool · the circles · business",
                  ],
                ]}
              />

              <div className="mt-5 rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/60">
                Topical integrity passed in the approved brief, and low-quality semantic demand share was reported at 0.0%. That is why the page leads only with validated topical subsets instead of inflated generic keyword volume.
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Detailed competitor evidence"
              description="These numbers show why the gap is about surface area and retrieval footprint, not just brand quality."
            >
              <DataTable
                headers={[
                  "Competitor",
                  "Organic traffic",
                  "Organic keywords",
                  "Referring domains",
                  "Backlinks",
                  "Prompt hits",
                ]}
                rows={competitorRows}
                highlightRow={5}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Sample prompt evidence"
              description="Public-safe examples from the approved brief. These are illustrative, not a claim of complete platform coverage."
            >
              <div className="grid gap-4 lg:grid-cols-3">
                {promptExamples.map((item) => (
                  <PromptCard key={`appendix-${item.platform}-${item.prompt}`} {...item} />
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-4 text-sm leading-6 text-white/78">
                The approved brief includes caution flags for missing platform probes in parts of the collection workflow. For that reason, this page uses only softened, sampled answer-surface claims rather than pretending to show full-market certainty.
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Cadence and execution visibility"
              description="The work does not run as isolated campaigns. The operating model continues monthly and quarterly after the first 90 days."
            >
              <WorkstreamTimeline
                months={["Month 1", "Month 2", "Month 3", "Months 4–6"]}
                tracks={cadenceTracks}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Assumptions, confidence, and planning notes"
              description="Compact diligence notes derived from the approved brief."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <StrategyCard className="h-full" glow="blue">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Confidence
                  </div>
                  <div className="mt-3 text-xl font-semibold text-white">High-confidence brief</div>
                  <p className="mt-3 text-sm leading-6 text-white/62">
                    Research mode was strict, payload confidence was high, the quality gate passed, and topical integrity passed. That is why the page is approved for public rendering with caveat discipline.
                  </p>
                </StrategyCard>

                <StrategyCard className="h-full" glow="blue">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Commercial modeling note
                  </div>
                  <div className="mt-3 text-xl font-semibold text-white">Traffic is modeled; revenue needs first-party inputs</div>
                  <p className="mt-3 text-sm leading-6 text-white/62">
                    Expected traffic, aggressive upside, and first-90-day targets are planning figures. Revenue translation still requires BTS-specific ACV/AOV and funnel conversion data.
                  </p>
                </StrategyCard>

                <StrategyCard className="h-full" glow="blue">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Public caveat
                  </div>
                  <div className="mt-3 text-xl font-semibold text-white">No unsupported platform certainty</div>
                  <p className="mt-3 text-sm leading-6 text-white/62">
                    Missing or broken third-party probe paths in the brief were handled conservatively. The strategy uses enough evidence to act, without claiming full visibility across every answer engine.
                  </p>
                </StrategyCard>

                <StrategyCard className="h-full" glow="blue">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Canonical source rule
                  </div>
                  <div className="mt-3 text-xl font-semibold text-white">Approved brief is the direct page input</div>
                  <p className="mt-3 text-sm leading-6 text-white/62">
                    This page does not bypass the approved brief or reinterpret raw payload data as canonical strategy. The brief remains the downstream planning source of truth for this public output.
                  </p>
                </StrategyCard>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Optional revenue planning calculator"
              description="Useful for scenario planning once BTS plugs in first-party monetization and funnel assumptions."
            >
              <TamRoiCalculator baseReachableVisits={191043} defaultVisitToCustomerRate={0.01} />
            </StrategyAppendixSection>
          </div>
        </div>
      </div>
    </StrategyPageFrame>
  );
}

function CrownIcon() {
  return <Building2 className="h-5 w-5" />;
}