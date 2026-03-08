import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Compass,
  FileText,
  Gauge,
  Globe,
  LineChart,
  Link2,
  MessageSquare,
  Newspaper,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Waves,
  Wrench,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  GrowthTimelineChart,
  HighlightBox,
  PhasedUpsideChart,
  SectionHeader,
  StrategyAppendixSection,
  StrategyCard,
  StrategyCTA,
  StrategyEyebrow,
  StrategyHero,
  StrategyPageFrame,
  StrategySectionLead,
  StrategySectionShell,
  TamRoiCalculator,
} from "@/components/strategy";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

const executiveMetrics = [
  {
    label: "Total search opportunity",
    value: "8,464,050",
    note: "Validated topical demand in the US electrolyte drink mix category. Topical integrity passed, so the headline opportunity is not inflated by low-quality semantic noise.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    label: "Expected traffic in 12 months",
    value: "191,505",
    note: "Base-case cumulative traffic if Hyro wins the right decision-stage queries first, then expands into broader category coverage behind them.",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    label: "Aggressive upside",
    value: "327,134",
    note: "Upside case if Hyro compounds faster across buyer guides, comparison pages, supporting coverage, and third-party authority.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    label: "First 6-month target",
    value: "70,857",
    note: "The first visible milestone is not full category ownership. It is establishing Hyro inside decision-stage buying moments and building repeatable momentum.",
    icon: <Target className="h-5 w-5" />,
  },
];

const immediateActions = [
  {
    title: "Lead with buyer-guide demand, not broad category awareness",
    body: "Start where buying intent is highest: best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix.",
  },
  {
    title: "Attach third-party trust to every important page",
    body: "Hyro should not publish decision pages in isolation. Each important page needs review proof, community visibility, listicle/editorial support, and backlinks pointed at it.",
  },
  {
    title: "Build the market narrative across Google and AI surfaces at the same time",
    body: "Google still drives major discovery, but buyers now move across Google, ChatGPT, Gemini, and other answer layers before they decide what to buy. Hyro needs visibility across both.",
  },
];

const opportunityCurve = [
  { month: 1, low: 1800, base: 3000, high: 5200 },
  { month: 2, low: 5200, base: 8500, high: 14500 },
  { month: 3, low: 9800, base: 16000, high: 27000 },
  { month: 4, low: 16500, base: 27000, high: 45000 },
  { month: 5, low: 25000, base: 43000, high: 71000 },
  { month: 6, low: 37000, base: 70857, high: 113000 },
  { month: 7, low: 50000, base: 93000, high: 148000 },
  { month: 8, low: 63000, base: 112000, high: 180000 },
  { month: 9, low: 76000, base: 132000, high: 215000 },
  { month: 10, low: 90000, base: 153000, high: 252000 },
  { month: 11, low: 103000, base: 173000, high: 289000 },
  { month: 12, low: 118000, base: 191505, high: 327134 },
];

const operatingTimelinePoints = [
  { month: 1, low: 1800, base: 3000, high: 5200 },
  { month: 2, low: 5200, base: 8500, high: 14500 },
  { month: 3, low: 9800, base: 16000, high: 27000 },
  { month: 4, low: 16500, base: 27000, high: 45000 },
  { month: 5, low: 25000, base: 43000, high: 71000 },
  { month: 6, low: 37000, base: 70857, high: 113000 },
];

const operatingMilestones = [
  {
    label: "Month 1",
    month: 1,
    title: "Own the first decision-stage pages",
    detail:
      "Lock the buyer-guide opening move, publish the first decision pages, fix the technical/entity layer, and establish the first review and community footprints.",
    trafficLabel: "Base traffic",
    trafficValue: 3000,
  },
  {
    label: "Month 2",
    month: 2,
    title: "Expand comparison and review proof",
    detail:
      "Add head-to-head comparisons, review-led content, listicle/editorial reinforcement, and the first focused backlink pushes to pages already in market.",
    trafficLabel: "Base traffic",
    trafficValue: 8500,
  },
  {
    label: "Month 3",
    month: 3,
    title: "Deepen supporting coverage around the winners",
    detail:
      "Surround early winners with use-case pages, ingredient/benefit explainers, competitor-adjacent support content, and stronger entity consistency across surfaces.",
    trafficLabel: "Base traffic",
    trafficValue: 16000,
  },
  {
    label: "Month 6",
    month: 6,
    title: "Turn the system into compounding category pressure",
    detail:
      "Months 4-6 expand the coverage network, refresh pages that are moving, widen third-party trust, and push Hyro into more recommendation moments across the category.",
    trafficLabel: "Base traffic",
    trafficValue: 70857,
  },
];

const competitorRows = [
  ["LMNT", "429,600", "34,009", "4,642", "150,912", "7"],
  ["Liquid I.V.", "456,449", "14,724", "2,789", "44,257", "7"],
  ["Hydralyte", "4,169", "1,276", "586", "1,842", "0"],
  ["Nuun", "105,219", "19,880", "4,218", "77,141", "6"],
  ["DripDrop", "161,926", "14,368", "1,846", "9,454", "2"],
  ["Hyro", "1,004", "362", "74", "366", "0"],
];

const keywordSignalRows = [
  ["best electrolyte powder for pregnancy", "390", "89", "High-intent use case Hyro can answer credibly"],
  ["best natural electrolytes drink", "390", "102", "Natural ingredient framing is commercially useful"],
  ["best sugar free electrolyte drink", "390", "69", "Decision-stage buyer language with clear commercial intent"],
  ["best sugar-free electrolyte drink", "390", "58", "Variant worth consolidating into one strong page cluster"],
  ["best low-sugar electrolyte drink", "210", "80", "Useful for selection-based comparison content"],
  ["best no sugar electrolyte powder", "210", "60", "Clear opportunity for buyer-guide and use-case expansion"],
  ["best cheap electrolyte powder", "140", "38", "Price-sensitive evaluation content opportunity"],
  ["best electrolyte drink without potassium", "140", "62", "Niche health need that can create trust and relevance"],
];

const promptRows = [
  [
    "best electrolyte powder drink mix",
    "ChatGPT",
    "LMNT, Hydrant, Nuun-style alternatives",
    "Absent",
    "Hyro needs a page that deserves to be cited, then third-party proof that reinforces it.",
  ],
  [
    "best electrolyte powder drink mix",
    "Google AI Overview",
    "LMNT, Liquid I.V., Ultima, Nuun, DripDrop",
    "Absent",
    "Google is surfacing strong editorial and brand proof; Hyro needs both owned pages and stronger trust signals.",
  ],
  [
    "electrolyte powder drink mix comparison",
    "Gemini / ChatGPT sample prompts",
    "Liquid I.V., LMNT, Nuun, DripDrop, other incumbents",
    "Absent",
    "Comparison moments are still being claimed by incumbents with broader authority and clearer evaluation content.",
  ],
];

const primaryPromptExamples = [
  {
    prompt: "best electrolyte powder drink mix",
    today:
      "Sample responses elevate brands like LMNT and other established incumbents. Hyro is absent.",
    whyItMatters:
      "This is a buying-intent query. If Hyro is missing here, it is missing from one of the clearest product-selection moments in the category.",
  },
  {
    prompt: "electrolyte powder drink mix comparison",
    today:
      "The answer layer currently defaults to familiar incumbents with clearer comparison narratives and broader authority.",
    whyItMatters:
      "Comparison prompts influence which brands get serious consideration. Hyro needs sharper evaluation pages and third-party reinforcement.",
  },
  {
    prompt: "best sugar free electrolyte drink",
    today:
      "Hyro has visible room to compete because this is a use-case-driven selection query and the current ranking footprint is still weak.",
    whyItMatters:
      "Use-case queries are where a challenger brand can win faster than trying to own the whole category on day one.",
  },
];

const monthPlan = [
  {
    label: "Month 1",
    title: "Claim the first buying moments",
    body:
      "Start with buyer-guide demand in electrolyte powder drink mix. Publish the first decision pages, align the site structure around them, and tighten the crawl/index/entity layer so the market can actually find and interpret what Hyro stands for.",
    bullets: [
      "Ship the first buyer-guide and decision pages around best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix",
      "Establish the first comparison direction against incumbent frames buyers already recognize",
      "Repair the technical/entity foundation: schema matched to visible content, sitemap hygiene, canonicals, Bing Webmaster Tools, and IndexNow",
      "Launch the first review-profile and community visibility pushes so pages do not sit alone",
    ],
  },
  {
    label: "Month 2",
    title: "Expand evaluation content and trust proof",
    body:
      "Now Hyro needs to look credible in evaluation mode, not just present. This is the month where comparison content, review proof, backlinks, and listicle/editorial placements begin to change how the market sees the brand.",
    bullets: [
      "Publish comparison and alternative pages tied to real selection behavior",
      "Build ingredient, benefit, and product-form explainers that help answer engines understand the product story",
      "Push hydration roundups, editorial mentions, and listicle placements that echo the same buying narrative",
      "Drive the first focused backlink acquisition toward the pages closest to revenue intent",
    ],
  },
  {
    label: "Month 3",
    title: "Deepen supporting coverage around early winners",
    body:
      "Once the first pages are in market, the job is to surround them with supporting coverage that keeps repeating the same commercial story in more contexts: routines, ingredients, use cases, health needs, and competitor-adjacent searches.",
    bullets: [
      "Expand supporting coverage around hydration scenarios, routines, ingredients, benefits, and use cases",
      "Strengthen internal linking so authority flows back to decision pages",
      "Add review-led proof and expert commentary where buyer skepticism is highest",
      "Retest the market, identify what is moving, and redirect effort toward the pages and prompts showing traction",
    ],
  },
  {
    label: "Months 4-6",
    title: "Compound the system into category pressure",
    body:
      "From here, Hyro shifts from first-wave visibility to compounding share. Memetik keeps building around winners, refreshing what is aging, widening third-party trust, and pushing into broader category demand without losing commercial focus.",
    bullets: [
      "Expand into broader category coverage behind the pages already earning traction",
      "Refresh pages, pricing/evaluation narratives, and proof blocks as the market shifts",
      "Increase Reddit/community participation, editorial placements, review velocity, and backlink pressure",
      "Consolidate what is winning and keep widening Hyro's presence across Google and AI discovery layers",
    ],
  },
];

const offsiteLanes = [
  {
    title: "Community and forum participation",
    icon: <MessageSquare className="h-5 w-5" />,
    body:
      "Hyro needs visible presence where real hydration questions and product comparisons happen. Reddit and similar communities matter because they influence how brands are perceived long before a checkout click appears in analytics.",
    bullets: [
      "Participate in hydration and fitness discussions around real buyer questions",
      "Support pages with natural references and proof points from community conversations",
      "Use recurring community themes to decide what comparison and use-case content to publish next",
    ],
  },
  {
    title: "Reviews and reputation surfaces",
    icon: <Star className="h-5 w-5" />,
    body:
      "Review platforms are part of modern buying research. If Hyro looks thin or inconsistent there, answer engines and buyers both have less reason to trust the brand.",
    bullets: [
      "Strengthen review-platform presence and profile completeness",
      "Create a review acquisition and response rhythm that keeps proof fresh",
      "Feed review proof back into decision pages and comparison content",
    ],
  },
  {
    title: "Editorials, listicles, and expert proof",
    icon: <Newspaper className="h-5 w-5" />,
    body:
      "Buyers and AI systems both rely on third-party validation. Hydration roundups, editorial mentions, athlete/influencer proof, and expert commentary all help make Hyro easier to recommend.",
    bullets: [
      "Pitch hydration roundups and comparison listicles aligned to buyer-guide demand",
      "Place expert commentary and product evidence into category-relevant editorial surfaces",
      "Use those placements to support both referral trust and backlink strength",
    ],
  },
];

const buildShipBlocks = [
  {
    number: "01",
    title: "Map the buying queries that actually shape purchase decisions",
    icon: <Compass className="h-5 w-5" />,
    description:
      "Memetik starts by identifying the commercial searches and answer-engine prompts that matter most first. For Hyro, that means decision-stage electrolyte powder drink mix queries before broader category demand.",
    bullets: [
      "Prioritize buyer-guide, comparison, review, and use-case demand",
      "Tie each query cluster to a clear page and a clear commercial story",
      "Sequence the market attack so Hyro enters high-intent research moments first",
    ],
  },
  {
    number: "02",
    title: "Build as many bottom-of-funnel pages as needed to cover the demand",
    icon: <FileText className="h-5 w-5" />,
    description:
      "This is not a light publishing retainer. Memetik builds the decision pages Hyro needs to be taken seriously in market: buyer guides, best-for pages, comparisons, alternatives, product-form explainers, and ingredient/benefit proof pages.",
    bullets: [
      "Best-in-category pages for the main product-selection terms",
      "Head-to-head and alternative pages where incumbent brands dominate buyer evaluation",
      "Use-case and proof pages that make the product story more believable",
    ],
  },
  {
    number: "03",
    title: "Expand supporting coverage behind the winners",
    icon: <Globe className="h-5 w-5" />,
    description:
      "Once the first decision pages are live, Memetik builds supporting content coverage around hydration scenarios, ingredients, benefits, routines, use cases, and adjacent comparisons so Hyro keeps appearing in more buying contexts.",
    bullets: [
      "Create supporting content that reinforces the same commercial narrative",
      "Increase retrieval density across the category without drifting into noise",
      "Use internal links and topic clustering to push authority back toward decision pages",
    ],
  },
  {
    number: "04",
    title: "Build third-party trust, not just owned content",
    icon: <Link2 className="h-5 w-5" />,
    description:
      "Memetik runs aggressive backlink acquisition, listicle placements, digital PR, review-platform work, and community/forum participation alongside publishing. That is how Hyro becomes easier to trust and harder to ignore.",
    bullets: [
      "Aggressive backlink acquisition pointed at the pages closest to revenue intent",
      "Digital PR, press-release angles, listicles, and editorial placements",
      "Review-profile reinforcement plus Reddit/forum/community presence",
    ],
  },
  {
    number: "05",
    title: "Make the infrastructure machine-readable and indexable",
    icon: <Wrench className="h-5 w-5" />,
    description:
      "Memetik also handles the infrastructure required for modern visibility: schema matched to visible content, crawl/index eligibility, canonicals, sitemap hygiene, Bing Webmaster Tools, IndexNow, and entity consistency across owned and third-party surfaces.",
    bullets: [
      "Fix the technical conditions required for pages to be discovered and interpreted correctly",
      "Strengthen entity consistency so Hyro looks like the same brand everywhere",
      "Remove structural friction that slows discovery or weakens page eligibility",
    ],
  },
  {
    number: "06",
    title: "Refresh, defend, and reallocate every month",
    icon: <Radar className="h-5 w-5" />,
    description:
      "Memetik does not publish and walk away. Each month the system retests prompts, measures movement, reinforces winners, patches weak spots, and expands the next layer of category coverage.",
    bullets: [
      "Track visibility movement across search and answer surfaces",
      "Refresh proof, comparisons, and product narratives as the market changes",
      "Keep investing behind the pages and trust signals that are actually moving the category",
    ],
  },
];

const whyMemetikBullets = [
  "Memetik is built around modern discovery behavior: Google still matters, but buyers now move across AI answer layers before they choose.",
  "The program is designed to change buying consideration, not just publish blog content and hope rankings follow.",
  "On-site pages, off-site authority, reviews, backlinks, and technical/entity work are run as one coordinated growth system.",
  "The work is commercial by default: decision pages first, proof second, compounding coverage third, and monthly reinforcement throughout.",
];

const appendixAssumptions = [
  "The visible traffic numbers are planning estimates derived from the approved brief and should be treated as directional growth modeling rather than guaranteed outcomes.",
  "Topical integrity passed with low-quality semantic demand share at 0.1%, which supports using the headline category opportunity without promoting noisy or irrelevant demand.",
  "Public AI visibility statements are intentionally softened where platform probing was incomplete. Missing probes for some surfaces were flagged in the brief and are not being upgraded into precise public claims.",
  "Revenue planning requires client ACV/AOV and funnel inputs.",
];

function MetricStackCard({
  label,
  value,
  note,
  icon,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
}) {
  return (
    <StrategyCard className="mb-4 last:mb-0" glow="mixed">
      <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
        {icon}
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">{label}</div>
      </div>
      <div className="text-[clamp(2rem,7vw,4.25rem)] font-display font-bold leading-[0.92] tracking-tight text-white">
        {value}
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-white/62">{note}</p>
    </StrategyCard>
  );
}

function ActionStackCard({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <StrategyCard className="mb-4 last:mb-0">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          0{index + 1}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">Immediate action</div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">{body}</p>
    </StrategyCard>
  );
}

function VerticalInsightCard({
  eyebrow,
  title,
  body,
  bullets,
  icon,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  icon?: React.ReactNode;
}) {
  return (
    <StrategyCard className="mb-4 last:mb-0" glow="blue">
      <div className="flex items-start gap-3">
        {icon ? <div className="mt-1 text-[#f4e4cd]">{icon}</div> : null}
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{eyebrow}</div>
          <h3 className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">{body}</p>
          {bullets?.length ? <div className="mt-5 max-w-3xl"><BulletList items={bullets} /></div> : null}
        </div>
      </div>
    </StrategyCard>
  );
}

function MonthBlock({
  label,
  title,
  body,
  bullets,
}: {
  label: string;
  title: string;
  body: string;
  bullets: string[];
}) {
  return (
    <StrategyCard className="mb-4 last:mb-0" glow="mixed">
      <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4e4cd]">
        {label}
      </div>
      <h3 className="text-2xl font-display font-bold tracking-tight text-white">{title}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">{body}</p>
      <div className="mt-5 max-w-3xl">
        <BulletList items={bullets} />
      </div>
    </StrategyCard>
  );
}

function PromptExampleCard({
  prompt,
  today,
  whyItMatters,
}: {
  prompt: string;
  today: string;
  whyItMatters: string;
}) {
  return (
    <StrategyCard className="mb-4 last:mb-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Real market prompt</div>
      <div className="mt-2 text-lg font-semibold text-white">{prompt}</div>
      <p className="mt-3 text-sm leading-7 text-white/64">
        <span className="text-white">What shows up today:</span> {today}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/64">
        <span className="text-white">Why it matters:</span> {whyItMatters}
      </p>
    </StrategyCard>
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

      <div className="mx-auto max-w-6xl">
        <StrategyHero
          eyebrow="Hyro × Memetik Strategy Memo"
          title="Win the electrolyte buying moments"
          accent="before incumbents own them by default"
          subtitle="Hyro already has the beginnings of category authority. The opportunity is to turn that base into real buying consideration across Google and AI answer surfaces by owning decision-stage electrolyte powder drink mix queries first, then expanding the surrounding trust and coverage behind them."
          tags={[
            "drinkhyro.com",
            "consumer health",
            "electrolyte drink mix",
            "US market",
          ]}
        >
          <div className="rounded-[28px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 px-5 py-4 text-sm leading-7 text-white/78">
            <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Canonical lineage</span>
            master reference → generation contract → brief → page
          </div>

          <div className="mt-8">
            <HighlightBox>
              <div className="max-w-4xl">
                <StrategyEyebrow className="mb-5">Executive Summary</StrategyEyebrow>
                <p className="text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                  Hyro does not need to win the entire hydration category first. It needs to win the part of the market where buyers are actively deciding what to buy.
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66 md:text-base">
                  The fastest path is to own buyer-guide and comparison demand in electrolyte powder drink mix, then surround those pages with stronger supporting coverage and third-party trust until Hyro starts appearing as a credible default choice.
                </p>
              </div>
            </HighlightBox>

            <div className="mt-6">
              {executiveMetrics.map((metric) => (
                <MetricStackCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="mt-6">
              <StrategyEyebrow className="mb-4">Immediate actions</StrategyEyebrow>
              {immediateActions.map((action, index) => (
                <ActionStackCard key={action.title} index={index} title={action.title} body={action.body} />
              ))}
            </div>
          </div>
        </StrategyHero>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="Google still drives a major share of discovery, but buyers now move across answer engines before they decide what belongs on the shortlist."
              body="Traditional search remains core buying behavior in categories like hydration, supplements, and consumer health. The change is not that Google disappeared. The change is that decision-making now happens across Google, ChatGPT, Gemini, and other answer layers before a brand ever sees the session in analytics."
              implication="For Hyro, the job is not just ranking pages. It is becoming easy to discover, easy to compare, and easy to trust wherever serious product research happens."
            />

            <VerticalInsightCard
              eyebrow="What changed"
              title="The battleground moved closer to the decision"
              body="In consumer health, buyers increasingly use search and AI answers to compare options, evaluate ingredients, sanity-check claims, and narrow which products deserve attention. That means brands that appear credible inside those moments gain leverage before paid media, social retargeting, or brand recall can even do their job."
              bullets={[
                "Google remains a major source of category discovery and commercial research traffic",
                "AI answer layers are influencing which brands get considered in the first place",
                "Brands now need both search demand capture and answer-surface visibility to keep pace",
              ]}
              icon={<Globe className="h-5 w-5" />}
            />

            <VerticalInsightCard
              eyebrow="Why it matters now"
              title="Visibility gaps now create buying-consideration gaps"
              body="If Hyro is absent from buyer-guide and comparison moments, the brand is not just losing traffic. It is losing the chance to be evaluated at all. In categories with entrenched incumbents, that directly affects customer acquisition efficiency, brand recall, and long-term defensibility."
              bullets={[
                "Missing decision-stage visibility means losing buying consideration before checkout",
                "Incumbents benefit from both stronger pages and stronger third-party proof",
                "Waiting makes the authority gap harder and more expensive to close later",
              ]}
              icon={<Gauge className="h-5 w-5" />}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="02" title="Where Hyro Is Today" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="Hyro is not starting from zero. The brand has enough authority and topical relevance to support a focused market attack, but not enough visible decision-stage coverage to win the category yet."
              body="The current footprint is small relative to the size of the market: 1,004 organic visits, 362 ranking keywords, 74 referring domains, and 366 backlinks against a validated category opportunity of 8,464,050 searches."
              implication="This is exactly the kind of position where a focused opening move can outperform a broad content plan."
            />

            <VerticalInsightCard
              eyebrow="What is working"
              title="There is a usable foundation"
              body="Hyro already has a real authority base and enough category alignment to justify a serious growth program. This matters because challenger brands often fail here: they either lack authority entirely or have no credible product story to build around. Hyro has both."
              bullets={[
                "74 referring domains provide a workable authority base for a challenger brand",
                "Topical integrity passed, which reduces the risk of building around noisy or irrelevant demand",
                "The category already contains clear buying-intent clusters Hyro can target first",
              ]}
              icon={<ShieldCheck className="h-5 w-5" />}
            />

            <VerticalInsightCard
              eyebrow="What is missing"
              title="The market cannot yet find a strong Hyro answer in the moments that matter most"
              body="Hyro has not yet turned its relevance into a concentrated set of decision pages around buyer guides, comparisons, use cases, and review proof. That means incumbents are still controlling the commercial narrative when buyers ask which electrolyte product they should choose."
              bullets={[
                "Current decision-stage page coverage is too thin relative to the category",
                "Comparison and evaluation content is not yet strong enough to challenge incumbents",
                "Third-party trust signals are not yet reinforcing Hyro consistently across the market",
              ]}
              icon={<Waves className="h-5 w-5" />}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="The fastest path is not broad awareness. It is owning the buyer-guide layer in electrolyte powder drink mix, then expanding from there."
              body="The approved brief is clear: the first opening move is best-in-category and decision-stage demand. That is where buying intent is strongest, where product differentiation matters, and where Hyro can start earning consideration faster than it could by attacking the full category head-on."
              implication="Start where buyers are choosing. Then widen the moat behind the pages that win."
            />

            <VerticalInsightCard
              eyebrow="Priority demand"
              title="Buyer-guide queries are the commercial opening move"
              body="The buyer-guide cluster contains 211,170 validated searches and an expected 12-month traffic contribution of 23,229 on its own. More importantly, these are the moments where people are actively choosing: best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix."
              bullets={[
                "These are product-selection moments, not casual awareness searches",
                "They create direct entry points into buying consideration",
                "They give Hyro a defined slice of the category to win before broader expansion",
              ]}
              icon={<Target className="h-5 w-5" />}
            />

            <VerticalInsightCard
              eyebrow="Second layer"
              title="Comparisons, reviews, and use-case demand are force multipliers"
              body="Once Hyro is present in the first buyer-guide pages, the next layer is comparison content, review-led proof, and use-case coverage. These pages help answer engines and buyers keep finding the same Hyro story in more specific situations."
              bullets={[
                "Comparison demand helps Hyro enter direct evaluation moments",
                "Review and social proof content makes the claims feel believable",
                "Use-case and ingredient coverage reinforces the narrative across more prompts",
              ]}
              icon={<BarChart3 className="h-5 w-5" />}
            />

            <VerticalInsightCard
              eyebrow="Longer horizon"
              title="Broad category coverage comes after Hyro earns the right to compete"
              body="The broad category cluster is large, but it belongs later in the sequence. Hyro should first prove itself in the decision-stage layer, then expand into wider category demand with stronger authority, clearer pages, and better third-party reinforcement already in place."
              bullets={[
                "Broad category demand is valuable, but slower and more authority-dependent",
                "Winning smaller high-intent pockets first improves the odds of broader expansion",
                "This sequencing reduces wasted effort and increases commercial leverage",
              ]}
              icon={<Compass className="h-5 w-5" />}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="04" title="Why Hyro Can Win" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="Hyro can win because this category still has decision-stage gaps, and Hyro already has enough brand foundation to attack them with credibility."
              body="Incumbents are stronger overall, but the approved brief does not require Hyro to outrank everyone everywhere. It requires Hyro to become more visible in a defined slice of the category where buyers are selecting, comparing, and validating products."
              implication="The win condition is not immediate category dominance. It is becoming the credible alternative in the exact queries that shape buying decisions."
            />

            <VerticalInsightCard
              eyebrow="Right to win"
              title="Hyro has a better starting position than a typical challenger"
              body="Many challenger brands fail because they have to build everything at once: authority, relevance, proof, and technical foundation. Hyro already has enough of a base to focus on the market narrative instead of trying to invent one from scratch."
              bullets={[
                "A usable backlink and referring-domain base already exists",
                "Research quality and topical integrity were strong enough to support a public strategy",
                "The category has clear use-case and comparison angles Hyro can address with specificity",
              ]}
              icon={<Trophy className="h-5 w-5" />}
            />

            <VerticalInsightCard
              eyebrow="Strategic fit"
              title="The opening move matches how buyers actually research hydration products"
              body="Buyers do not begin by asking for every electrolyte brand in existence. They begin with intent-rich questions: what is best, what is sugar-free, what is natural, what is better for a certain need, and how one option compares with another. That behavior fits Hyro's opportunity perfectly."
              bullets={[
                "Decision-stage search behavior creates a realistic entry point for Hyro",
                "Use-case and ingredient-specific framing can make Hyro more memorable and more relevant",
                "Focused decision pages give Hyro a chance to outperform its current size",
              ]}
              icon={<Radar className="h-5 w-5" />}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="The category is currently controlled by brands with far deeper page coverage and far stronger authority. Hyro does not need to beat them everywhere, but it does need to stop leaving decision-stage demand uncontested."
              body="LMNT, Liquid I.V., Nuun, and DripDrop are not just bigger brands. They have stronger search footprints, stronger authority, and stronger presence in the prompts buyers ask when they are comparing products."
              implication="Hyro's best move is to fight where incumbents are visible but not unbeatable: decision pages, comparisons, proof-led use cases, and sharper product framing."
            />

            <VerticalInsightCard
              eyebrow="The real gap"
              title="Incumbents are winning through coverage plus authority"
              body="The competitive gap is not one thing. It is the combination of stronger buyer-guide content, more comparison coverage, broader backlinks, and more external proof. That is why a pure on-site content plan would be too weak."
              bullets={[
                "LMNT and Liquid I.V. dominate both search footprint and prompt presence",
                "Nuun and DripDrop still carry more authority and evaluation visibility than Hyro",
                "Hyro needs an execution system that closes page, proof, and authority gaps together",
              ]}
              icon={<Bot className="h-5 w-5" />}
            />

            <DataTable
              className="mt-6"
              headers={["Brand", "Organic traffic", "Organic keywords", "Referring domains", "Backlinks", "Prompt hits"]}
              rows={competitorRows}
              highlightRow={5}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="Hyro is largely absent from the sampled answer-layer prompts that shape product evaluation today."
              body="The approved brief shows 0.0% sampled mention rate across ChatGPT, Gemini, and Google AI Overview for the tested prompt set. Public caveat discipline matters here: some platform probing was incomplete, so the right conclusion is not fake certainty. The right conclusion is that Hyro is not yet showing up often enough in the visible commercial prompts that matter."
              implication="This is fixable, but only if on-site pages, review proof, and third-party authority are shipped together."
            />

            <VerticalInsightCard
              eyebrow="Platform snapshot"
              title="The market is already answering these questions without Hyro"
              body="When buyers ask who offers the best electrolyte powder drink mix or how options compare, the answer layers are defaulting to established names. That leaves Hyro outside the recommendation set unless the brand builds pages and proof specifically designed to change that pattern."
              bullets={[
                "ChatGPT sample prompts did not mention Hyro in the tested set",
                "Google AI Overview sample prompts surfaced incumbent brands and editorial sources instead",
                "Gemini sampling did not produce evidence of Hyro visibility in the tested prompts",
              ]}
              icon={<MessageSquare className="h-5 w-5" />}
            />

            <div className="mt-6">
              {primaryPromptExamples.map((example) => (
                <PromptExampleCard key={example.prompt} {...example} />
              ))}
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Public caveat</div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
                Some answer-surface probing in the research payload was incomplete, so this page avoids inventing unsupported platform precision. The visible conclusion is still clear: Hyro is not yet consistently present in the sampled commercial prompts where incumbents are being recommended.
              </p>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="If Hyro becomes visible in the right buying moments, search becomes more than a traffic channel. It becomes a lower-friction route into consideration, conversion, and brand defensibility."
              body="The opportunity here is not generic top-of-funnel reach. It is better placement in the moments where buyers compare products, ask for best-in-category recommendations, and validate what to trust before they buy."
              implication="This is why the opening move matters so much: the right decision pages can change both traffic and the quality of the traffic Hyro attracts."
            />

            <div className="mb-6 rounded-[28px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 px-5 py-4 text-sm leading-7 text-white/78">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Estimate-only</span>
              The curve below is a planning model based on the approved brief. It shows cumulative 12-month traffic progression if Hyro wins decision-stage demand first and compounds outward from there.
            </div>

            <PhasedUpsideChart points={opportunityCurve} />

            <TamRoiCalculator
              className="mt-6"
              baseReachableVisits={191505}
              defaultLtv={0}
              defaultVisitToCustomerRate={1}
            />

            <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5 md:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/42">Commercial interpretation</div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/66">
                The base case points to {formatNumber(191505)} expected visits across 12 months, with {formatNumber(70857)} as the first 6-month milestone and {formatNumber(327134)} as the aggressive upside. More important than the raw number is the source of that traffic: product-selection and evaluation demand that can influence purchase behavior more directly than broad awareness content.
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/66">
                Revenue planning requires client ACV/AOV and funnel inputs.
              </p>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="08" title="6-month Growth Plan" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="The first six months are not a content calendar. They are a concentrated market-entry sequence."
              body="Hyro should move in a specific order: first the decision pages, then the comparisons and proof layers, then the supporting coverage and compounding authority behind the winners."
              implication="The goal is to create momentum early, then widen the moat around what starts working."
            />

            {monthPlan.map((month) => (
              <MonthBlock
                key={month.label}
                label={month.label}
                title={month.title}
                body={month.body}
                bullets={month.bullets}
              />
            ))}
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="09" title="Off-site Authority" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="Hyro will not become easier to recommend from owned pages alone. The market also needs third-party reasons to trust the brand."
              body="In this category, authority is built across reviews, communities, editorials, listicles, backlinks, and expert proof. Those surfaces matter because buyers read them, search engines value them, and answer engines use them as supporting evidence."
              implication="Off-site authority is not amplification after the fact. It is part of the core growth system."
            />

            {offsiteLanes.map((lane) => (
              <VerticalInsightCard
                key={lane.title}
                eyebrow="Authority layer"
                title={lane.title}
                body={lane.body}
                bullets={lane.bullets}
                icon={lane.icon}
              />
            ))}

            <HighlightBox className="mt-6">
              <div className="max-w-3xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">What this changes</div>
                <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white">
                  Hyro starts to look less like an isolated product page and more like a brand the market keeps encountering in credible contexts.
                </p>
              </div>
            </HighlightBox>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="10" title="What Memetik Actually Builds and Ships" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="This is a substantial execution program, not a light content retainer."
              body="Memetik runs research, page production, comparison content, supporting coverage, aggressive backlinks, digital PR, review work, technical infrastructure, and market reinforcement as one coordinated system. That is what it takes to change how a category sees a challenger brand."
              implication="A founder should read this section and immediately understand why the work is hard to replicate casually."
            />

            {buildShipBlocks.map((block) => (
              <StrategyCard key={block.number} className="mb-4 last:mb-0" glow="blue">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
                    {block.number}
                  </div>
                  <div className="text-[#f4e4cd]">{block.icon}</div>
                </div>
                <h3 className="text-2xl font-display font-bold tracking-tight text-white">{block.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">{block.description}</p>
                <div className="mt-5 max-w-3xl">
                  <BulletList items={block.bullets} />
                </div>
              </StrategyCard>
            ))}
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="11" title="Operating Model" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="The program compounds because the workstreams run concurrently every month, not one after another."
              body="Each month includes research and prioritization, production, publishing/indexing, off-site authority, and measurement. The mix evolves, but the operating system stays active from day one."
              implication="That is how Hyro moves from isolated wins to sustained category pressure."
            />

            <GrowthTimelineChart points={operatingTimelinePoints} milestones={operatingMilestones} />

            <div className="mt-6">
              <VerticalInsightCard
                eyebrow="Monthly rhythm"
                title="A founder-readable operating system"
                body="Every month Memetik reviews what moved, what failed to gain traction, what the competitive surfaces are doing, and which pages or proof assets deserve the next push. That keeps the program focused on market movement, not just output volume."
                bullets={[
                  "Weekly priority review and research refresh",
                  "Continuous drafting, publishing, indexing, and reinforcement",
                  "Monthly reporting on visibility, authority proof, and shipped work",
                  "Quarterly strategy review to refresh, consolidate, and reallocate effort",
                ]}
                icon={<CheckCircle2 className="h-5 w-5" />}
              />
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="12" title="Why Memetik" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="Memetik is built for the new shape of discovery: classic search demand plus answer-engine influence plus the trust layer that feeds both."
              body="Most agencies still treat these as separate jobs. Memetik treats them as one commercial system. That matters because Hyro does not need more disconnected activity. It needs a market position that gets stronger every month."
              implication="The value is not just output. It is building a category position competitors have to work hard to reverse."
            />

            <HighlightBox>
              <div className="max-w-3xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Memetik difference</div>
                <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                  We do not optimize Hyro for isolated rankings. We build the conditions for the brand to become the answer buyers keep encountering when they research what to buy.
                </p>
                <div className="mt-6">
                  <BulletList items={whyMemetikBullets} />
                </div>
              </div>
            </HighlightBox>
          </StrategySectionShell>
        </section>

        <StrategyCTA
          eyebrow="Book a Strategy Call"
          title="If Hyro wants to own the decision layer, the build should start now."
          body="The market is already teaching buyers which electrolyte brands to trust. Memetik helps Hyro change that pattern with the pages, authority, infrastructure, and operating rhythm required to win serious buying consideration."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <section className="mt-16 md:mt-20">
          <SectionHeader number="13" title="Supporting Evidence Appendix" />

          <div className="space-y-4">
            <StrategyAppendixSection
              defaultOpen
              title="Keyword and demand evidence"
              description="A compact view of the validated demand clusters and the commercial keyword signals shaping the first opening move."
            >
              <div className="space-y-6">
                <DataTable
                  headers={["Demand cluster", "Intent / phase", "Validated demand", "Expected traffic in 12 months", "Sample queries"]}
                  rows={[
                    [
                      "Category & Brand Demand",
                      "Broader category / later expansion",
                      "8,241,950",
                      "167,074",
                      "electrolyte drinks, electrolyte drink mix, electrolyte powder",
                    ],
                    [
                      "Buyer Guides",
                      "Decision-stage / first 90 days",
                      "211,170",
                      "23,229",
                      "best electrolyte drink, best electrolyte powder, best hydration powder",
                    ],
                    [
                      "Alternatives & Comparisons",
                      "Decision-stage / first 90 days",
                      "7,210",
                      "793",
                      "electrolyte powder vs tablets, pedialyte vs electrolyte powder",
                    ],
                    [
                      "Reviews & Social Proof",
                      "Decision-stage / first 90 days",
                      "3,720",
                      "409",
                      "electrolyte powder review and product-review variants",
                    ],
                  ]}
                  highlightRow={1}
                />

                <DataTable
                  headers={["Commercial query", "Volume", "Current position", "Why it matters"]}
                  rows={keywordSignalRows}
                />
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Detailed competitor evidence"
              description="The competitive read supporting the decision to lead with buyer guides and evaluation content."
            >
              <div className="space-y-6">
                <DataTable
                  headers={["Brand", "Organic traffic", "Organic keywords", "Referring domains", "Backlinks", "Prompt hits"]}
                  rows={competitorRows}
                  highlightRow={5}
                />

                <div className="grid gap-4 md:grid-cols-1">
                  <StrategyCard>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Competitive interpretation</div>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
                      LMNT and Liquid I.V. currently set the pace across both search scale and prompt visibility. Nuun and DripDrop also operate with much stronger authority bases than Hyro. That is why the recommended opening move is narrow and commercial: win the selection layer first instead of trying to out-scale incumbents everywhere from day one.
                    </p>
                  </StrategyCard>
                </div>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Prompt evidence and AI visibility samples"
              description="Public-safe prompt snapshots showing the current answer-layer pattern without inventing unsupported platform certainty."
            >
              <div className="space-y-6">
                <DataTable
                  headers={["Prompt", "Surface", "Who shows up", "Hyro status", "Takeaway"]}
                  rows={promptRows}
                />

                <div className="space-y-4">
                  <StrategyCard>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Sample prompt excerpt</div>
                    <p className="mt-3 text-sm leading-7 text-white/64">
                      For <span className="text-white">“best electrolyte powder drink mix”</span>, sampled results referenced brands like LMNT and other established incumbents, while Hyro was absent. In the Google AI Overview sample, the surface referenced brands such as LMNT, Liquid I.V., Ultima, Nuun, and DripDrop, alongside editorial sources.
                    </p>
                  </StrategyCard>

                  <StrategyCard>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Caveat discipline</div>
                    <p className="mt-3 text-sm leading-7 text-white/64">
                      Two AI data probes in the approved brief were incomplete. The strategy therefore avoids precise public claims for unsupported surfaces and keeps the visible conclusion narrow: Hyro is not yet consistently present in the sampled commercial prompts where the category leaders are being surfaced.
                    </p>
                  </StrategyCard>
                </div>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Planning assumptions, confidence, and source trace"
              description="What supports this page, what was softened publicly, and how to interpret the opportunity numbers honestly."
            >
              <div className="space-y-6">
                <StrategyCard>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Source trace</div>
                  <p className="mt-3 text-sm leading-7 text-white/64">
                    Canonical lineage for this page: master reference → generation contract → approved brief → page. This page is rendered from the approved Hyro strategy brief dated 2026-03-08 and does not bypass the brief with raw research as the planning source of truth.
                  </p>
                </StrategyCard>

                <StrategyCard>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Confidence and caveats</div>
                  <div className="mt-4">
                    <BulletList items={appendixAssumptions} />
                  </div>
                </StrategyCard>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Optional commercial model"
              description="Use first-party conversion and customer value inputs to translate the traffic model into revenue potential."
            >
              <TamRoiCalculator
                baseReachableVisits={191505}
                defaultLtv={0}
                defaultVisitToCustomerRate={1}
              />
            </StrategyAppendixSection>
          </div>
        </section>
      </div>
    </StrategyPageFrame>
  );
}