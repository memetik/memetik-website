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
} from "@/components/strategy";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bot,
  Compass,
  FileText,
  FlaskConical,
  Globe,
  Link2,
  Map,
  MessageCircle,
  MessageSquareQuote,
  Newspaper,
  Radar,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Swords,
  Target,
  Trophy,
  Users,
  Workflow,
} from "lucide-react";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

const executiveStats = [
  {
    label: "Total search opportunity",
    value: formatNumber(6786450),
    note: "Validated demand inside the topical set that matters for electrolyte drink mix buying behavior.",
    valueClassName: "text-[clamp(1.8rem,4vw,3.4rem)]",
  },
  {
    label: "Expected traffic in 12 months",
    value: formatNumber(585677),
    note: "Base-case trajectory if Hyro wins the first commercial layer, then expands outward.",
    valueClassName: "text-[clamp(1.8rem,4vw,3.4rem)]",
  },
  {
    label: "Aggressive upside",
    value: formatNumber(872604),
    note: "Higher-end scenario if the first wedge compounds across search and answer surfaces faster.",
    valueClassName: "text-[clamp(1.8rem,4vw,3.4rem)]",
  },
  {
    label: "First 90-day target",
    value: formatNumber(87851),
    note: "Near-term base target tied to decision-stage category pages, supporting coverage, and authority reinforcement.",
    valueClassName: "text-[clamp(1.8rem,4vw,3.4rem)]",
  },
];

const immediateActions = [
  "Publish Hyro's first buyer-guide and best-in-category decision pages around electrolyte powder selection.",
  "Attach each core page to review, community, editorial, and backlink pushes so third-party trust grows with on-site coverage.",
  "Expand supporting coverage around hydration scenarios, ingredients, benefits, routines, and comparison terms that reinforce the winners.",
];

const phasedTrafficPoints = [
  { month: 1, low: 10000, base: 18000, high: 26000 },
  { month: 2, low: 28000, base: 48000, high: 70000 },
  { month: 3, low: 52000, base: 87851, high: 120000 },
  { month: 4, low: 76000, base: 132000, high: 178000 },
  { month: 5, low: 102000, base: 185000, high: 245000 },
  { month: 6, low: 132000, base: 245000, high: 330000 },
  { month: 7, low: 166000, base: 308000, high: 425000 },
  { month: 8, low: 201000, base: 370000, high: 515000 },
  { month: 9, low: 236000, base: 432000, high: 615000 },
  { month: 10, low: 270000, base: 492000, high: 710000 },
  { month: 11, low: 301000, base: 541000, high: 790000 },
  { month: 12, low: 330353, base: 585677, high: 872604 },
];

const competitorRows = [
  {
    competitor: "LMNT",
    traffic: 429600,
    keywords: 34009,
    refDomains: 4642,
    backlinks: 150912,
    promptHits: 7,
    narrative: "Owns the premium high-sodium conversation and appears frequently in answer-led comparison moments.",
  },
  {
    competitor: "Nuun",
    traffic: 105219,
    keywords: 19880,
    refDomains: 4218,
    backlinks: 77141,
    promptHits: 6,
    narrative: "Has broad category familiarity and enough authority to keep showing up in general recommendation sets.",
  },
  {
    competitor: "DripDrop",
    traffic: 161926,
    keywords: 14368,
    refDomains: 1846,
    backlinks: 9454,
    promptHits: 4,
    narrative: "Wins trust where hydration is framed through efficacy, recovery, or medical-grade credibility.",
  },
  {
    competitor: "Hydralyte",
    traffic: 4169,
    keywords: 1276,
    refDomains: 586,
    backlinks: 1842,
    promptHits: 0,
    narrative: "Smaller search footprint, but still carries more authority infrastructure than Hyro today.",
  },
  {
    competitor: "Sodii",
    traffic: 0,
    keywords: 0,
    refDomains: 33,
    backlinks: 74,
    promptHits: 0,
    narrative: "Low current visibility; useful as a signal that not every competitor deserves equal strategic attention.",
  },
];

const promptExamples = [
  {
    platform: "ChatGPT",
    query: "best electrolyte powder drink mix",
    status: "Hyro absent",
    outcome:
      "The sampled answer recommends established brands like LMNT and Hydrant, while Hyro is not included.",
    implication:
      "The most commercial category prompt is still open terrain for Hyro, but incumbents are already shaping buyer consideration.",
  },
  {
    platform: "ChatGPT",
    query: "hyro electrolyte powder drink mix vs competitors",
    status: "Hyro mentioned",
    outcome:
      "Hyro appears in comparison framing, with the model able to describe ingredients, hydration use cases, and competitor positioning.",
    implication:
      "There is enough entity recognition to build from, but not enough market dominance to become the default recommendation.",
  },
  {
    platform: "Gemini",
    query: "hyro electrolyte powder drink mix vs competitors",
    status: "Hyro mentioned",
    outcome:
      "Gemini recognizes Hyro and places it in a usable market frame versus LMNT, Liquid I.V., Nuun, and DripDrop.",
    implication:
      "Hyro has partial answer-engine foothold, but it needs stronger proof and broader surface coverage to turn mentions into preference.",
  },
];

const openingMoveCards = [
  {
    title: "First category opening",
    body:
      "Lead with buyer-guide and best-for selection queries in electrolyte powder drink mix, where commercial intent is strongest and where Hyro can win consideration fastest.",
    items: [
      "Best electrolyte drink",
      "Best electrolyte powder",
      "Best hydration powder",
      "Best electrolyte mix",
      "Best electrolyte drink mix",
    ],
  },
  {
    title: "First comparison pressure",
    body:
      "Attack comparison and alternatives demand immediately after the first buyer-guide pages go live so Hyro can start appearing in evaluation moments, not just branded searches.",
    items: [
      "Electrolyte powder vs tablets",
      "Pedialyte vs electrolyte powder",
      "Liquid I.V.-adjacent comparison angles",
      "Strong vs weak electrolyte positioning",
      "Competitor-adjacent evaluation pages",
    ],
  },
  {
    title: "First trust surfaces",
    body:
      "Push the same commercial story into Reddit, review profiles, hydration roundups, comparison listicles, editorial placements, and backlinks that point buyers back to the decision pages.",
    items: [
      "Community threads and forum participation",
      "Review-platform reinforcement",
      "Hydration roundup placements",
      "Expert commentary and athlete proof",
      "Backlinks into the winning pages",
    ],
  },
];

const operatingTracks = [
  {
    name: "Monday — market and entity review",
    description:
      "Recheck priority buying queries, monitor competitor movement, patch entity consistency, and decide what should ship next based on live visibility.",
    deliverables: [
      "Prompt checks across Google and major AI surfaces",
      "Competitor watchlist updates",
      "Entity/profile consistency fixes",
      "Weekly production brief",
    ],
    outcome: "The program stays tied to real market movement instead of running on autopilot.",
  },
  {
    name: "Tuesday–Wednesday — asset production",
    description:
      "Build and refine the pages buyers actually use to compare products, understand tradeoffs, and decide what to try or switch to.",
    deliverables: [
      "Core decision pages and comparison pages",
      "Ingredient and benefit proof sections",
      "Supporting pages around scenarios and use cases",
      "Internal linking and schema implementation",
    ],
    outcome: "Hyro gains owned surfaces that can actually be cited, ranked, and recommended.",
  },
  {
    name: "Thursday — publishing and distribution",
    description:
      "Ship the core asset, then break it into a distribution package that can travel across multiple authority surfaces in the same week.",
    deliverables: [
      "Publish and index the core page",
      "Turn it into 10–20 micro-assets",
      "Push into 3–5 authority nodes",
      "Link and reference back to the owned asset",
    ],
    outcome: "Each page launches with reinforcement, instead of waiting months for trust to accumulate passively.",
  },
  {
    name: "Friday — measurement and iteration",
    description:
      "Review visibility, authority proof, indexing, and downstream search movement, then feed those signals into the next week's priorities.",
    deliverables: [
      "Prompt visibility checks",
      "Authority proof and placement tracking",
      "Indexing and crawl review",
      "Iteration plan for the next sprint",
    ],
    outcome: "The system compounds because winners get reinforced and weak spots get fixed quickly.",
  },
];

const deliveryCategories = [
  {
    icon: <Map className="h-5 w-5" />,
    title: "Priority query mapping",
    text:
      "Memetik identifies the exact buying questions that create category consideration, then sequences them so Hyro attacks the highest-leverage decision moments first.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Decision-page production",
    text:
      "We build as many bottom-of-funnel pages as needed to cover the demand: best-of pages, comparisons, use-case pages, product-form explainers, and ingredient/benefit proof.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Supporting coverage expansion",
    text:
      "Once the first decision pages are live, we expand surrounding coverage around scenarios, routines, benefits, ingredients, and adjacent comparison terms so the same story keeps getting found.",
  },
  {
    icon: <Newspaper className="h-5 w-5" />,
    title: "Off-site authority and proof",
    text:
      "We push the narrative into the market through backlinks, listicles, review profiles, forums, editorials, newsletters, and other third-party trust surfaces that answer engines learn from.",
  },
];

const whyMemetikCards = [
  {
    title: "Built for category capture, not content quotas",
    body:
      "This is not a blog retainer. Memetik is built around owning the commercial questions that influence what buyers choose before they ever arrive at a product page.",
  },
  {
    title: "Search plus answer engines, not search or AI",
    body:
      "Google still matters. Traditional search still shapes commercial research. But buyers now move across Google, ChatGPT, Gemini, and other answer layers in the same journey. The strategy has to win across both.",
  },
  {
    title: "On-site and off-site run together",
    body:
      "Pages alone are not enough. Memetik ships the owned assets, the supporting coverage, the technical infrastructure, and the third-party reinforcement at the same time so visibility compounds faster.",
  },
];

const keywordSignals = [
  ["best electrolyte powder for pregnancy", "390", "89"],
  ["best natural electrolytes drink", "390", "102"],
  ["best sugar free electrolyte drink", "390", "69"],
  ["best sugar-free electrolyte drink", "390", "58"],
  ["best low-sugar electrolyte drink", "210", "80"],
  ["best no sugar electrolyte powder", "210", "60"],
  ["best cheap electrolyte powder", "140", "38"],
  ["best electrolyte drink without potassium", "140", "62"],
];

function PromptCard({
  platform,
  query,
  status,
  outcome,
  implication,
}: {
  platform: string;
  query: string;
  status: string;
  outcome: string;
  implication: string;
}) {
  return (
    <StrategyCard className="h-full" glow="blue">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{platform}</div>
          <h3 className="mt-2 text-lg font-semibold text-white">{query}</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
          {status}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-white/68">{outcome}</p>
      <div className="mt-4 rounded-[20px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 px-4 py-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What it means</div>
        <p className="mt-2 text-sm leading-6 text-white">{implication}</p>
      </div>
    </StrategyCard>
  );
}

function CompactMetric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="mt-3 break-words text-[clamp(2rem,5vw,4rem)] font-display font-bold leading-[0.95] tracking-tight text-white">
        {value}
      </div>
      <p className="mt-3 text-sm leading-6 text-white/58">{note}</p>
    </div>
  );
}

function SectionNumberPill({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/20 text-[#f4e4cd]">
        {number}
      </span>
      {label}
    </div>
  );
}

export default function StrategyDrinkhyro() {
  useEffect(() => {
    document.title = "Hyro Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto max-w-[1280px]">
        <StrategyHero
          eyebrow="Hyro Growth Strategy"
          title={
            <>
              Own the electrolyte
              <br />
              buying conversation
            </>
          }
          accent="before bigger brands lock it up."
          subtitle="Hyro already has enough category relevance to matter. The opportunity is to turn that relevance into decision-stage visibility across Google and answer engines, starting with the buyer-guide layer where product evaluation is clearest and commercial leverage is highest."
          tags={[
            "drinkhyro.com",
            "Consumer Health",
            "US Market",
            "Electrolyte Drink Mix",
          ]}
        >
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <StrategyCard glow="mixed">
              <div className="grid gap-5 md:grid-cols-2">
                {executiveStats.map((stat) => (
                  <CompactMetric key={stat.label} label={stat.label} value={stat.value} note={stat.note || ""} />
                ))}
              </div>
            </StrategyCard>

            <HighlightBox>
              <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Executive summary</div>
              <h2 className="mt-3 text-2xl font-display font-bold tracking-tight text-white md:text-3xl">
                Hyro does not need to win the whole category first.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">
                The fastest opening move is to own the questions buyers ask when they are deciding which electrolyte mix
                is best, which one fits their needs, and what to compare it against. If Hyro wins those moments first,
                broader category visibility becomes much easier to compound.
              </p>

              <div className="mt-6">
                <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                  Immediate actions
                </div>
                <BulletList items={immediateActions} />
              </div>

              <div className="mt-6 rounded-[22px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/68">
                <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">
                  Canonical lineage
                </span>
                master reference → generation contract → brief → page
              </div>
            </HighlightBox>
          </div>
        </StrategyHero>

        <StrategySectionShell className="mb-14 md:mb-20" glow="blue">
          <SectionHeader number="00" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still drives a major share of discovery, but buyers now move across search and AI answers before they ever decide what to buy."
            body="Traditional search is still a core buying behavior. The shift is that decision-making increasingly happens across Google, ChatGPT, Gemini, and other answer layers in parallel. That means the winning brand is not just the one with pages indexed — it is the one that shows up consistently wherever the buyer asks for guidance."
            implication="For Hyro, the strategic goal is not generic traffic growth alone. It is to become one of the names buyers keep seeing when they ask which electrolyte mix is best, which one fits their needs, and how products compare."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Classic search still matters</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Google remains a major source of commercial research and discovery traffic, especially for category,
                comparison, and best-for queries.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">AI changes the shortlist earlier</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Buyers now ask AI tools for recommendations, alternatives, and product framing before they ever land on
                a product page or review site.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <Trophy className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Visibility must work across both</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                A durable growth engine now requires decision pages, supporting coverage, and third-party proof that can
                influence both ranked search and answer-driven recommendation behavior.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="mixed">
          <SectionHeader number="01" title="Where Hyro Is Today" />
          <StrategySectionLead
            takeaway="Hyro has enough authority to be credible, but not enough market presence yet to own the commercial conversation."
            body="The company is not starting from zero. Hyro already has a real category footprint, a usable authority base, and a clean enough topical profile to support a focused category push. But compared with category leaders, current visibility is still very small relative to the size of the opportunity."
            implication="This is the ideal setup for a focused growth strategy: credible enough to win, but still underbuilt enough that concentrated execution can move the market."
          />

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <StrategyCard glow="blue">
              <div className="mb-5 flex items-center gap-3">
                <Radar className="h-5 w-5 text-[#f4e4cd]" />
                <div className="text-lg font-semibold text-white">Current-state snapshot</div>
              </div>
              <StatsGrid
                columns={2}
                stats={[
                  {
                    label: "Current organic traffic",
                    value: formatNumber(1004),
                    note: "Very small compared with the category's validated demand.",
                    valueClassName: "text-[clamp(1.8rem,3vw,2.8rem)]",
                  },
                  {
                    label: "Organic keywords",
                    value: formatNumber(362),
                    note: "Enough footprint to prove relevance, not enough to dominate decision-stage discovery.",
                    valueClassName: "text-[clamp(1.8rem,3vw,2.8rem)]",
                  },
                  {
                    label: "Referring domains",
                    value: formatNumber(74),
                    note: "A usable authority base that can support a focused opening move.",
                    valueClassName: "text-[clamp(1.8rem,3vw,2.8rem)]",
                  },
                  {
                    label: "Backlinks",
                    value: formatNumber(366),
                    note: "Helpful, but far behind the authority stacks of major category leaders.",
                    valueClassName: "text-[clamp(1.8rem,3vw,2.8rem)]",
                  },
                ]}
              />
            </StrategyCard>

            <HighlightBox>
              <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Read on the business</div>
              <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">
                The site is relevant, but the commercial layer is underbuilt.
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">What is working</div>
                  <BulletList
                    items={[
                      "Hyro already shows enough category relevance to justify a public growth push.",
                      "Authority is not huge, but 74 referring domains is enough to support a focused commercial opening move.",
                      "Research quality gate passed with high confidence and topical integrity.",
                    ]}
                  />
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">What is missing</div>
                  <BulletList
                    items={[
                      "Not enough dedicated buyer-guide and comparison content around electrolyte mix selection.",
                      "Not enough supporting coverage reinforcing Hyro across use cases, ingredients, and adjacent category language.",
                      "Not enough third-party trust signals to shape answer-engine preference consistently.",
                    ]}
                  />
                </div>
              </div>
            </HighlightBox>
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="amber">
          <SectionHeader number="02" title="The Opportunity" />
          <StrategySectionLead
            takeaway="The market is large, the early commercial layer is clear, and the best opening move is narrower than the full category."
            body="The biggest total demand sits in broad category terms, but those are not the first battles Hyro should pick. The fastest path is to win the decision-stage queries where buyers are already comparing, evaluating, and choosing products — then expand outward into broader category coverage."
            implication="Win the buyer-guide layer first, and Hyro earns both traffic and category credibility. Skip that step, and broader demand becomes much harder to convert into preference."
          />

          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <StrategyCard>
              <div className="mb-5 flex items-center gap-3">
                <Compass className="h-5 w-5 text-[#f4e4cd]" />
                <div className="text-lg font-semibold text-white">Where the fastest upside lives</div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: "Buyer guides",
                    demand: "211,170",
                    note: "Highest-leverage first move because intent is commercial and selection-focused.",
                  },
                  {
                    label: "Alternatives & comparisons",
                    demand: "7,210",
                    note: "Smaller in volume, but highly influential when buyers are narrowing options.",
                  },
                  {
                    label: "Reviews & social proof",
                    demand: "3,790",
                    note: "Important trust layer that reinforces evaluation and post-click conviction.",
                  },
                  {
                    label: "Broader category demand",
                    demand: "6,564,280",
                    note: "Massive upside, but better attacked after the first commercial pages start winning.",
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-white/8 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold text-white">{item.label}</div>
                        <p className="mt-2 text-sm leading-6 text-white/58">{item.note}</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                        {item.demand}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </StrategyCard>

            <PhasedUpsideChart points={phasedTrafficPoints} />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="blue">
          <SectionHeader number="03" title="Why Hyro Can Win" />
          <StrategySectionLead
            takeaway="Hyro can win because the brand already has enough authority to be believable, while the most valuable decision-stage territory is still under-owned."
            body="This is not a strategy for outspending incumbents across the entire category. It is a strategy for taking a defined slice of commercial demand where Hyro can publish stronger buying guidance, create clearer product framing, and reinforce that story across third-party trust surfaces."
            implication="The right move is not broader awareness first. It is sharper commercial positioning first."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard glow="mixed">
              <div className="mb-4 flex text-[#f4e4cd]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Credible starting point</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Hyro already has 74 referring domains and a validated, on-topic footprint. That matters because the
                strategy does not need to manufacture category relevance from scratch.
              </p>
            </StrategyCard>

            <StrategyCard glow="mixed">
              <div className="mb-4 flex text-[#f4e4cd]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">A clear opening move</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                The buyer-guide cluster around best, use-case, and selection queries is commercially strong and is the
                fastest place for Hyro to create real market movement.
              </p>
            </StrategyCard>

            <StrategyCard glow="mixed">
              <div className="mb-4 flex text-[#f4e4cd]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Room to improve fast</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Because Hyro is not yet heavily built out in decision-stage content and off-site proof, focused
                execution can create noticeable gains faster than in already-saturated brands.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="mixed">
          <SectionHeader number="04" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="Hyro is not losing because the market is closed. It is losing because bigger brands have built more search coverage, more authority, and more default credibility."
            body="The leaders in this market are not just bigger products. They have stronger content footprints, stronger backlink profiles, and stronger answer-surface familiarity. Hyro does not need to catch all of that at once — but it does need to close the commercial gap where decisions are made."
            implication="The gap is operational, not existential. It can be narrowed with concentrated execution around the right pages and the right trust surfaces."
          />

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <StrategyCard>
              <div className="mb-5 flex items-center gap-3">
                <Swords className="h-5 w-5 text-[#f4e4cd]" />
                <div className="text-lg font-semibold text-white">What the leaders have that Hyro does not — yet</div>
              </div>
              <BulletList
                items={[
                  "LMNT and Nuun already occupy a larger share of category mindshare in both search and answer-led recommendations.",
                  "Incumbents have significantly stronger authority stacks, which makes their pages easier to rank and easier for answer engines to trust.",
                  "The market leaders have broader coverage across category pages, comparison moments, and external validation surfaces.",
                  "Hyro's fastest route is not broad category domination on day one — it is concentrated wins in decision-stage prompts where buyer intent is strongest.",
                ]}
              />
            </StrategyCard>

            <StrategyCard glow="blue">
              <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                Competitive pressure snapshot
              </div>
              <div className="space-y-3">
                {competitorRows.slice(0, 3).map((row) => (
                  <div key={row.competitor} className="rounded-[22px] border border-white/8 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold text-white">{row.competitor}</div>
                        <p className="mt-2 text-sm leading-6 text-white/58">{row.narrative}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-lg font-semibold text-white">{formatNumber(row.traffic)}</div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                          organic traffic
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-[16px] border border-white/8 bg-white/[0.04] p-2">
                        <div className="text-xs font-semibold text-white">{formatNumber(row.keywords)}</div>
                        <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">
                          keywords
                        </div>
                      </div>
                      <div className="rounded-[16px] border border-white/8 bg-white/[0.04] p-2">
                        <div className="text-xs font-semibold text-white">{formatNumber(row.refDomains)}</div>
                        <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">
                          ref. domains
                        </div>
                      </div>
                      <div className="rounded-[16px] border border-white/8 bg-white/[0.04] p-2">
                        <div className="text-xs font-semibold text-white">{row.promptHits}/8</div>
                        <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">
                          prompt hits
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="amber">
          <SectionHeader number="05" title="AI Visibility Gap" />
          <StrategySectionLead
            takeaway="Hyro has partial recognition in answer engines, but not enough consistency to become a default recommendation in the moments that matter most."
            body="The research shows Hyro can already appear in brand-adjacent and comparison prompts. That is encouraging. But on core category prompts, the market still defaults to incumbents. Google AI Overview visibility was not observed in the sampled set, and missing platform probes mean some AI surface detail must be treated cautiously."
            implication="The job is to turn scattered mention potential into repeated commercial visibility across the highest-intent prompts."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="mb-3 flex items-center gap-3">
                <Bot className="h-5 w-5 text-[#f4e4cd]" />
                <div className="text-lg font-semibold text-white">ChatGPT</div>
              </div>
              <div className="text-4xl font-display font-bold leading-none text-white">25%</div>
              <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                mention rate in sampled prompts
              </div>
              <p className="mt-4 text-sm leading-6 text-white/62">
                Hyro shows up in some brand-adjacent and comparison prompts, but it is not yet a reliable answer when
                buyers ask broad category questions.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-3 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#f4e4cd]" />
                <div className="text-lg font-semibold text-white">Gemini</div>
              </div>
              <div className="text-4xl font-display font-bold leading-none text-white">25%</div>
              <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                mention rate in sampled prompts
              </div>
              <p className="mt-4 text-sm leading-6 text-white/62">
                Similar pattern: there is enough entity recognition for Hyro to be understood, but not enough authority
                reinforcement to consistently win the recommendation layer.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-3 flex items-center gap-3">
                <Search className="h-5 w-5 text-[#f4e4cd]" />
                <div className="text-lg font-semibold text-white">Google AI Overview</div>
              </div>
              <div className="text-4xl font-display font-bold leading-none text-white">0%</div>
              <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                mention rate in sampled prompts
              </div>
              <p className="mt-4 text-sm leading-6 text-white/62">
                In the sampled prompt set, Hyro did not appear. That makes the search-to-answer bridge a visible growth
                priority.
              </p>
            </StrategyCard>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {promptExamples.map((prompt) => (
              <PromptCard key={`${prompt.platform}-${prompt.query}`} {...prompt} />
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-6 text-white/62">
            <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">
              Caveat discipline
            </span>
            Perplexity-specific probe data and one AI mention endpoint were unavailable in the approved brief, so this
            page shows only the sampled surfaces with supportable evidence and does not invent unsupported platform
            certainty.
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="mixed">
          <SectionHeader number="06" title="Revenue / Commercial Impact" />
          <StrategySectionLead
            takeaway="This is a commercial visibility play: more category consideration, more qualified product discovery, and a stronger moat against paid dependency."
            body="For Hyro, the upside is not just more visits. It is a larger share of the moments where buyers decide which electrolyte product to trust, compare, and try. The more Hyro appears across those moments, the stronger the leverage on acquisition efficiency and long-term category defensibility."
            implication="If Hyro waits, bigger brands keep training the market. If Hyro moves now, it can start shaping the buying narrative while the category is still fluid."
          />

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <StrategyCard glow="amber">
              <div className="mb-5 flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-[#f4e4cd]" />
                <div className="text-lg font-semibold text-white">What the upside means in plain English</div>
              </div>
              <BulletList
                items={[
                  "More buyers discovering Hyro before they default to LMNT, Nuun, or DripDrop.",
                  "More product consideration driven by category and comparison moments, not only branded demand.",
                  "Lower reliance on paid reacquisition if Hyro captures buyers earlier in the research journey.",
                  "A stronger market position across both ranked search and AI-assisted buying behavior.",
                ]}
              />

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">
                    Total search opportunity
                  </div>
                  <div className="mt-2 text-3xl font-display font-bold text-white">{formatNumber(6786450)}</div>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">
                    12-month base case
                  </div>
                  <div className="mt-2 text-3xl font-display font-bold text-white">{formatNumber(585677)}</div>
                </div>
              </div>
            </StrategyCard>

            <TamRoiCalculator
              baseReachableVisits={585677}
              className="h-full"
            />
          </div>

          <div className="mt-4 rounded-[24px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 px-5 py-4 text-sm leading-6 text-white">
            <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Revenue note</span>
            Revenue planning requires client ACV/AOV and funnel inputs.
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="blue">
          <SectionHeader number="07" title="90-day Opening Move" />
          <StrategySectionLead
            takeaway="The first 90 days should focus on one thing: make Hyro visible in the decision-stage moments where people choose an electrolyte product."
            body="This is not the phase to chase every broad category keyword. The opening move is tighter: publish the first buyer-guide pages, attach comparison pressure, reinforce them across third-party surfaces, and build the supporting coverage that keeps the same message showing up everywhere."
            implication="Narrow enough to win quickly, broad enough to create compounding category momentum."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {openingMoveCards.map((card) => (
              <StrategyCard key={card.title} glow="mixed">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{card.body}</p>
                <div className="mt-4">
                  <BulletList items={card.items} />
                </div>
              </StrategyCard>
            ))}
          </div>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">30 / 60 / 90</div>
                <h3 className="mt-2 text-2xl font-display font-bold text-white">Founder-readable rollout</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                real shipping cadence
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-white/8 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Days 0–30</div>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Lock the first decision-page set, publish the first buyer-guide assets, clean up crawl and indexing
                  basics, and start early review, backlink, and community distribution around those pages.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Days 31–60</div>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Expand comparisons, grow supporting coverage around use cases and benefits, and widen authority pushes
                  into listicles, editorials, reviews, and forum placement.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Days 61–90</div>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Turn the first wins into a repeatable rhythm: more decision pages, broader support coverage, stronger
                  third-party proof, and ongoing prompt testing to reinforce what is already working.
                </p>
              </div>
            </div>
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="amber">
          <SectionHeader number="08" title="Off-site Authority" />
          <StrategySectionLead
            takeaway="If Hyro only publishes pages on its own site, bigger brands will keep winning trust by default."
            body="Third-party proof is not a nice-to-have in this market. Reviews, editorials, listicles, communities, and backlinks all help shape whether Hyro feels like a legitimate recommendation when buyers and machines evaluate the category."
            implication="The market has to see the same Hyro story in more than one place for trust to compound."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Reddit and community threads</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Participate where hydration products get discussed in real-world language and route that proof back to
                Hyro's owned decision pages.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <Star className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Reviews and profile reinforcement</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Strengthen review-platform presence so Hyro looks established wherever buyers validate trust before
                purchasing.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <Newspaper className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Editorials, listicles, and roundups</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Push Hyro into the publications and comparison surfaces that buyers treat as independent validation.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <Link2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Backlinks into the winning assets</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Build aggressive backlink support into the pages that matter most so authority flows directly into
                decision-stage visibility.
              </p>
            </StrategyCard>
          </div>

          <HighlightBox className="mt-6">
            <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">What this looks like in practice</div>
            <p className="mt-3 max-w-3xl text-base leading-8 text-white/68">
              A new core page does not just get published and left alone. It gets turned into a distribution package:
              snippets for social and newsletters, community talking points, editorial pitches, listicle placements,
              review-profile reinforcement, and backlinks that repeatedly point buyers — and machines — back to the same
              owned asset.
            </p>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="mixed">
          <SectionHeader number="09" title="What Memetik Actually Builds and Ships" />
          <StrategySectionLead
            takeaway="This is a full execution program: demand mapping, decision-page production, supporting coverage, off-site authority, technical infrastructure, and weekly reinforcement."
            body="Founders should be able to see immediately why this is not a light content retainer. Memetik runs the whole growth system needed to help Hyro become easier to find, easier to trust, and harder to ignore in commercial category moments."
            implication="The output is visible every week, but the effect compounds over months."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {deliveryCategories.map((item) => (
              <StrategyCard key={item.title} glow="blue">
                <div className="mb-4 flex text-[#f4e4cd]">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{item.text}</p>
              </StrategyCard>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Visible scope</div>
              <h3 className="mt-2 text-2xl font-display font-bold text-white">What is included in the engine</h3>
              <div className="mt-4">
                <BulletList
                  items={[
                    "Priority buying query mapping and sequencing",
                    "Bottom-of-funnel page production across buyer guides, comparisons, alternatives, explainers, and proof pages",
                    "Supporting content coverage around scenarios, routines, ingredients, benefits, and adjacent terms",
                    "Aggressive backlink acquisition into the pages that matter most",
                    "Digital PR, listicle, editorial, and press-style visibility pushes",
                    "Review-platform setup and reinforcement",
                    "Bing Webmaster Tools, IndexNow, schema, canonicals, sitemap hygiene, and crawl/index support",
                    "Third-party placements across forums, communities, newsletters, and authority nodes",
                    "Refresh and defense loops once the first winning pages emerge",
                  ]}
                />
              </div>
            </StrategyCard>

            <StrategyCard glow="amber">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Important framing</div>
              <h3 className="mt-2 text-2xl font-display font-bold text-white">
                Memetik builds as much decision coverage as the market requires.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/68">
                Publicly, the right promise is not a fixed page count. The right promise is that Memetik builds as many
                decision pages as needed to cover the real commercial demand, then expands supporting coverage and
                authority behind the pages that start to win.
              </p>
              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/20 p-4 text-sm leading-6 text-white/62">
                That is why the program feels substantial: on-site production, off-site authority, technical
                infrastructure, and continuous optimization all run together.
              </div>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="blue">
          <SectionHeader number="10" title="Operating Model" />
          <StrategySectionLead
            takeaway="The work runs as a weekly operating rhythm, not a linear content project."
            body="Every week, Memetik researches, produces, publishes, distributes, measures, and iterates. That operating model is what turns a set of pages into a category-growth system."
            implication="Hyro gets visible outputs every week and a compounding market position over time."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {operatingTracks.map((track) => (
              <StrategyCard key={track.name} glow="mixed">
                <h3 className="text-xl font-semibold text-white">{track.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{track.description}</p>
                <div className="mt-4 space-y-2">
                  {track.deliverables.map((deliverable) => (
                    <div
                      key={deliverable}
                      className="rounded-[18px] border border-white/8 bg-black/20 px-3 py-2 text-sm leading-6 text-white/72"
                    >
                      {deliverable}
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-[20px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 px-4 py-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What this creates</div>
                  <p className="mt-2 text-sm leading-6 text-white">{track.outcome}</p>
                </div>
              </StrategyCard>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Weekly rhythm</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Monday review, Tuesday–Wednesday production, Thursday publishing and distribution, Friday metrics and
                iteration.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Monthly reporting</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Visibility movement, authority proof, prompt coverage, workstream completion, and downstream search
                indicators are reviewed every month.
              </p>
            </StrategyCard>

            <StrategyCard>
              <div className="mb-4 flex text-[#f4e4cd]">
                <RefreshCcw className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Quarterly refresh</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">
                Reallocate effort toward the strongest winning clusters, refresh aging pages, and defend commercial
                territory before competitors retake it.
              </p>
            </StrategyCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-14 md:mb-20" glow="amber">
          <SectionHeader number="11" title="Why Memetik" />
          <StrategySectionLead
            takeaway="Memetik is designed for founders who want category leverage, not vanity reporting."
            body="The difference is not just better SEO execution. The difference is building a system that helps Hyro win the moments where product selection happens across search, AI answers, and third-party trust surfaces."
            implication="The channel becomes more defensible because it compounds into market preference, not just rankings."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {whyMemetikCards.map((card) => (
              <StrategyCard key={card.title} glow="amber">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{card.body}</p>
              </StrategyCard>
            ))}
          </div>

          <HighlightBox className="mt-6">
            <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Bottom line</div>
            <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white md:text-3xl">
              Hyro's growth opportunity is not hidden.
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
              The opportunity is visible, the opening move is clear, and the market structure supports a focused push.
              What matters now is execution quality and speed: build the right decision pages, reinforce them everywhere
              buyers look, and keep compounding until Hyro becomes part of the default conversation.
            </p>
          </HighlightBox>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Book a Strategy Call"
          title="If Hyro wants to own more of the buying conversation, this is the moment to start."
          body="We'll walk through the opening move, the first decision pages, the first authority pushes, and what a category-capture program would look like for Hyro over the next 90 days."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <div className="mt-16 md:mt-20">
          <SectionNumberPill number="12" label="Appendix / Supporting evidence" />

          <div className="space-y-4">
            <StrategyAppendixSection
              defaultOpen
              title="Detailed competitor evidence"
              description="Compact evidence table for the named competitors in Hyro's approved brief."
            >
              <DataTable
                headers={[
                  "Competitor",
                  "Organic traffic",
                  "Organic keywords",
                  "Referring domains",
                  "Backlinks",
                  "Prompt hits",
                  "Strategic read",
                ]}
                rows={competitorRows.map((row) => [
                  row.competitor,
                  formatNumber(row.traffic),
                  formatNumber(row.keywords),
                  formatNumber(row.refDomains),
                  formatNumber(row.backlinks),
                  `${row.promptHits}/8`,
                  row.narrative,
                ])}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Validated opportunity clusters"
              description="Only topical, validated clusters from the approved brief are surfaced here. Low-quality semantic demand was not promoted into headline claims."
            >
              <DataTable
                headers={[
                  "Cluster",
                  "Intent",
                  "When it matters",
                  "Demand",
                  "Expected traffic in 12 months",
                  "Why it matters",
                ]}
                rows={[
                  [
                    "Category & Brand Demand",
                    "Broader discovery",
                    "Later expansion",
                    formatNumber(6564280),
                    formatNumber(530134),
                    "Massive upside, but better attacked after Hyro establishes itself in the commercial layer.",
                  ],
                  [
                    "Buyer Guides",
                    "Decision-stage",
                    "First 90 days",
                    formatNumber(211170),
                    formatNumber(52793),
                    "Fastest commercial opening because buyers are actively selecting and comparing options.",
                  ],
                  [
                    "Alternatives & Comparisons",
                    "Decision-stage",
                    "First 90 days",
                    formatNumber(7210),
                    formatNumber(1803),
                    "Smaller volume, but highly valuable because it captures active product evaluation.",
                  ],
                  [
                    "Reviews & Social Proof",
                    "Decision-stage trust",
                    "First 90 days",
                    formatNumber(3790),
                    formatNumber(948),
                    "Supports buying confidence and reinforces which brands feel credible to try.",
                  ],
                ]}
                highlightRow={1}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Commercial keyword signals"
              description="These specific decision-stage signals in the approved brief support the recommended opening move."
            >
              <DataTable
                headers={["Keyword", "Monthly volume", "Current position"]}
                rows={keywordSignals}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Prompt evidence sample"
              description="Real prompt examples from the approved brief. These are shown to illustrate the pattern, not to overclaim precision across every answer surface."
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {promptExamples.map((prompt) => (
                  <StrategyCard key={`appendix-${prompt.platform}-${prompt.query}`}>
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                      {prompt.platform}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-white">{prompt.query}</h3>
                    <div className="mt-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52 inline-flex">
                      {prompt.status}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/68">{prompt.outcome}</p>
                    <p className="mt-3 text-sm leading-6 text-white/58">{prompt.implication}</p>
                  </StrategyCard>
                ))}
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Method notes, confidence, and caveats"
              description="Public-safe assumptions and caveats from the approved brief."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <StrategyCard>
                  <div className="mb-4 flex items-center gap-3">
                    <FlaskConical className="h-5 w-5 text-[#f4e4cd]" />
                    <div className="text-lg font-semibold text-white">Confidence and integrity</div>
                  </div>
                  <BulletList
                    items={[
                      "Research mode: strict.",
                      "Payload confidence: high (100/100).",
                      "Quality gate: passed.",
                      "Topical integrity: passed, with low-quality semantic demand share of 0.1%.",
                      "Only validated topical subsets were promoted into headline opportunity claims.",
                    ]}
                  />
                </StrategyCard>

                <StrategyCard>
                  <div className="mb-4 flex items-center gap-3">
                    <MessageSquareQuote className="h-5 w-5 text-[#f4e4cd]" />
                    <div className="text-lg font-semibold text-white">Caveats carried into the page</div>
                  </div>
                  <BulletList
                    items={[
                      "Perplexity-specific probe data was unavailable in the approved brief and is intentionally not represented as certain.",
                      "One AI mentions endpoint was unavailable; the page uses supported prompt evidence instead of inventing broader claims.",
                      "Revenue planning requires first-party ACV/AOV and funnel inputs, so the calculator is estimate-only.",
                    ]}
                  />
                </StrategyCard>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Source trace"
              description="High-level trace of the inputs used to render this page."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Canonical doctrine</div>
                  <div className="mt-2 text-lg font-semibold text-white">Master reference</div>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    The upstream Memetik AEO doctrine governs terminology, delivery architecture, and cadence.
                  </p>
                </StrategyCard>
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Generation rules</div>
                  <div className="mt-2 text-lg font-semibold text-white">Generation contract</div>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    The contract preserves the execution engine, blocking rules, source precedence, and public
                    transformation discipline.
                  </p>
                </StrategyCard>
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Direct page input</div>
                  <div className="mt-2 text-lg font-semibold text-white">Approved Hyro brief</div>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    This page is rendered from the approved brief and does not bypass it with raw research.
                  </p>
                </StrategyCard>
              </div>

              <div className="mt-4 rounded-[22px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/68">
                <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Canonical chain</span>
                master reference → generation contract → brief → page
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Optional revenue planning tool"
              description="Included here again for convenience if the team wants to revisit business scenarios later."
            >
              <TamRoiCalculator baseReachableVisits={585677} />
            </StrategyAppendixSection>
          </div>
        </div>
      </div>
    </StrategyPageFrame>
  );
}