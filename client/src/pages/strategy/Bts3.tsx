import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import {
  SectionHeader,
  HighlightBox,
  BulletList,
  DataTable,
  PhasedUpsideChart,
  GrowthTimelineChart,
  TamRoiCalculator,
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyCTA,
  StrategySectionLead,
  StrategyAppendixSection,
  StrategyEyebrow,
} from "@/components/strategy";
import {
  BadgeCheck,
  Bot,
  BrainCircuit,
  DollarSign,
  FileText,
  Gauge,
  Globe,
  Link2,
  MessageSquareQuote,
  Radar,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function MetricStackCard({
  label,
  value,
  note,
  icon,
  breakdown,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
  breakdown?: Array<{ label: string; value: string }>;
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
      {breakdown?.length ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {breakdown.map((item) => (
            <div key={item.label} className="rounded-[18px] border border-white/10 bg-white/[0.03] px-3 py-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/42">{item.label}</div>
              <div className="mt-2 text-base font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      ) : null}
    </StrategyCard>
  );
}

function ActionStackCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
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
  glow = "blue",
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  icon?: React.ReactNode;
  glow?: "blue" | "amber" | "mixed";
}) {
  return (
    <StrategyCard className="mb-4 last:mb-0" glow={glow}>
      <div className="flex items-start gap-3">
        {icon ? <div className="mt-1 text-[#f4e4cd]">{icon}</div> : null}
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{eyebrow}</div>
          <h3 className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">{body}</p>
          {bullets?.length ? (
            <div className="mt-5 max-w-3xl">
              <BulletList items={bullets} />
            </div>
          ) : null}
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
  platform,
  prompt,
  takeaway,
  detail,
}: {
  platform: string;
  prompt: string;
  takeaway: string;
  detail: string;
}) {
  return (
    <StrategyCard className="mb-4 last:mb-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">{platform}</div>
      <div className="mt-2 text-lg font-semibold text-white">{prompt}</div>
      <p className="mt-3 text-sm leading-7 text-white/64">
        <span className="text-white">What it means:</span> {takeaway}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/64">{detail}</p>
    </StrategyCard>
  );
}

const executiveMetrics = [
  {
    label: "Total search opportunity",
    value: formatNumber(2268640),
    note: "Validated creator-platform demand across search and answer-engine discovery, with topical integrity already passed.",
    breakdown: [
      { label: "Competitor keywords", value: formatNumber(2033950) },
      { label: "Non-competitor keywords", value: formatNumber(234690) },
    ],
    icon: <Search className="h-5 w-5" />,
  },
  {
    label: "Expected traffic in 12 months",
    value: formatNumber(191043),
    note: "Base-case cumulative traffic if BTS wins the competitor-brand decision layer first, then compounds outward into broader creator-platform demand.",
    breakdown: [
      { label: "Competitor-keyword traffic", value: formatNumber(169225) },
      { label: "Non-competitor traffic", value: formatNumber(21818) },
    ],
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    label: "Aggressive upside",
    value: formatNumber(285367),
    note: "Upside case if the first commercial wedge compounds faster across comparison pages, supporting coverage, and off-site authority.",
    breakdown: [
      { label: "Competitor-keyword traffic", value: formatNumber(252954) },
      { label: "Non-competitor traffic", value: formatNumber(32413) },
    ],
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    label: "First 6-month target",
    value: formatNumber(70686),
    note: "The six-month goal is not broad category dominance. It is the current base-case milestone from the BTS model if BTS becomes visible in the buying moments where serious creators decide what platform deserves trust.",
    breakdown: [
      { label: "Competitor-keyword traffic", value: formatNumber(62613) },
      { label: "Non-competitor traffic", value: formatNumber(8073) },
    ],
    icon: <Target className="h-5 w-5" />,
  },
];

const trafficAttributionMetrics = [
  {
    label: "Competitor-brand traffic",
    value: formatNumber(169225),
    note: `${formatPercent(88.6)} of the 12-month base case is attributable to competitor-brand demand across Patreon, Kajabi, Skool, Circle / Circles, Teachable, and Thinkific.`,
    icon: <Swords className="h-5 w-5" />,
  },
  {
    label: "Unbranded traffic",
    value: formatNumber(21818),
    note: `${formatPercent(11.4)} comes from unbranded creator-platform demand such as creator monetization platform, creator platform, pricing, reviews, and adjacent category queries.`,
    icon: <Search className="h-5 w-5" />,
  },
  {
    label: "Patreon alone",
    value: formatNumber(112080),
    note: `${formatPercent(58.7)} of the full base-case model comes from Patreon-linked demand, which means the current traffic story is more concentrated than the page previously implied.`,
    icon: <Target className="h-5 w-5" />,
  },
];

const immediateActions = [
  {
    title: "Own the competitor-brand decision layer first",
    body: "Start with Patreon alternative, Kajabi alternative, creator monetization platform, Kajabi pricing, Skool pricing, and adjacent comparison pages where buying intent is already visible in the current model.",
  },
  {
    title: "Build visibility across Google and AI answers at the same time",
    body: "BTS needs stronger commercial pages plus stronger Bing / Reddit / editorial / review signals so answer engines stop defaulting to the larger incumbents.",
  },
  {
    title: "Turn trust into a visible moat",
    body: "Review profiles, Reddit conversations, listicles, backlinks, and editorial proof need to reinforce the same story: BTS is for serious creators building real businesses, not hustle-marketplace volume.",
  },
];

const tractionStats = [
  {
    eyebrow: "Platform traction",
    title: "The product is ahead of the brand.",
    body: "BTS already has 20,000+ users, 1,600+ builders, and more than $1.4M paid to builders. The strategic problem is not whether something real exists. It is that the market still does not see enough of that reality when buyers compare creator platforms.",
    bullets: [
      "20,000+ users and 1,600+ builders give BTS real platform gravity",
      "$1.4M+ paid to builders is meaningful proof that the business works",
      "The visibility layer is what lags, not the underlying product story",
    ],
    icon: <Users className="h-5 w-5" />,
  },
  {
    eyebrow: "Current discoverability",
    title: "Search visibility is still tiny relative to the category prize.",
    body: "Current organic traffic is roughly 162 visits, current ranking keywords are 19, and AI visibility is still patchy. That gap is exactly why the opening move should be narrow and commercial rather than broad and editorial.",
    bullets: [
      `${formatNumber(880)} referring domains and ${formatNumber(27577)} backlinks mean authority is not zero`,
      "The missing layer is concentrated comparison coverage and repeated proof across the web",
      "This is a positioning and execution problem, not a demand problem",
    ],
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    eyebrow: "Strategic filter",
    title: "BTS is playing a density game, not a volume game.",
    body: "The goal is not millions of low-quality accounts. It is a much denser business base of serious creators building real businesses. That is why the whole strategy should filter toward the right 10,000 builders rather than chase everybody.",
    bullets: [
      "A denser business base creates better GMV economics than noisy marketplace volume",
      "The right comparison pages attract builders, not browsers",
      "The campaign should feel like platform positioning, not generic SEO",
    ],
    icon: <Trophy className="h-5 w-5" />,
  },
];

const rightToWinCards = [
  {
    eyebrow: "Right to win",
    title: "BTS can own the serious-business alternative lane.",
    body: "Whop can keep the broader creator marketplace lane. BTS can own the buying conversation for serious creators who want a cleaner, more intentional platform to build long-term businesses on.",
    bullets: [
      "The Whop contrast is emotionally legible and commercially useful",
      "BTS already has enough product proof to make the comparison credible",
      "That contrast is strongest in alternative, versus, and pricing-style queries",
    ],
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    eyebrow: "GMV thesis",
    title: "The page should optimize for builder quality, not marketplace noise.",
    body: "The $1B GMV thesis matters because it creates a sharp strategic lens. Everything in the content system should attract the builders who treat their work seriously, not the broadest possible pool of low-intent accounts.",
    bullets: [
      "10,000 builders × $100K average annual revenue is a stronger north star than vanity signup volume",
      "This changes the content voice, the channels, and the comparisons worth attacking",
      "BTS should look like the home for obsessed builders, not hustle-culture tourists",
    ],
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    eyebrow: "Opening wedge",
    title: "Comparison and monetization demand are the fastest commercial opening.",
    body: "Validated demand clusters already point toward competitor-brand demand, creator monetization alternatives, Patreon alternatives, pricing explainers, and adjacent creator-platform buying terms. That is where BTS can get into consideration first.",
    bullets: [
      "Patreon alternative plus Kajabi / Skool / Circle decision pages are the clearest opening assets in the current model",
      "Creator monetization platform and pricing-intent pages widen the evaluation layer",
      "Broader category coverage becomes more winnable after the decision layer moves",
    ],
    icon: <Target className="h-5 w-5" />,
  },
];

const competitorRows = [
  ["Patreon", "4,172,095", "598,893", "372,395", "454,284,402", "21"],
  ["Teachable", "506,693", "81,847", "88,832", "15,841,175", "5"],
  ["Circle", "219,983", "13,861", "21,370", "1,707,296", "2"],
  ["Skool", "208,627", "52,170", "73,244", "6,040,046", "0"],
  ["Kajabi", "79,194", "17,679", "40,224", "1,529,242", "7"],
  ["Whop", "487,500", "119,200", "18,900", "—", "232"],
  ["Behind the Scenes", "162", "19", "880", "27,577", "—"],
];

const whopWeaknesses = [
  {
    eyebrow: "Structural weakness",
    title: "Whop depends on volume that weakens the brand.",
    body: "Whop's marketplace breadth helps top-line metrics, but it also dilutes the brand. BTS does not need to copy that strategy. It needs to weaponize the contrast.",
    bullets: [
      "Most marketplace volume does not equal high-value builder density",
      "Hustle-culture breadth creates a trust vulnerability BTS can exploit",
      "The cleaner serious-business story is easier to defend over time",
    ],
    icon: <ShieldAlert className="h-5 w-5" />,
  },
  {
    eyebrow: "Trust weakness",
    title: "Whop's reputation problems make the contrast sharper.",
    body: "Documented fund-hold complaints, hustle-marketplace perception, and noisy low-trust categories create a vulnerability that comparison pages can make legible. The strategy does not need to invent anything; it needs to organize what buyers already worry about.",
    bullets: [
      "BTS can position itself as the cleaner platform for real businesses",
      "Review and editorial proof make that contrast easier to believe",
      "This is why reputation warfare belongs in the build, not just in messaging",
    ],
    icon: <Swords className="h-5 w-5" />,
  },
  {
    eyebrow: "Search weakness",
    title: "Whop's size does not make its search layer untouchable.",
    body: "A large brand can still have commercial gaps, especially around comparison intent and specific creator-business queries. BTS should not try to erase Whop's full footprint; it should attack the slices where the contrast is easiest to understand and trust.",
    bullets: [
      "Comparison pages let BTS compete without out-scaling Whop everywhere",
      "Search ownership is about repeated presence across surfaces, not one ranking alone",
      "That is why the multi-surface strategy still belongs inside this program",
    ],
    icon: <Search className="h-5 w-5" />,
  },
];

const platformStats = [
  {
    eyebrow: "ChatGPT",
    title: "Early mention momentum exists, but default-answer status does not.",
    body: "BTS can appear in some branded or alternative-style prompts, but that is not the same as being the repeated recommendation. The market still defaults to the larger incumbents too often.",
    bullets: ["Sampled mention rate: 25.0%", "Momentum exists, but repetition and proof are missing"],
    icon: <Bot className="h-5 w-5" />,
  },
  {
    eyebrow: "Gemini",
    title: "Positioning can land when retrieval context is strong enough.",
    body: "Gemini's sampled mention rate is stronger, which suggests BTS has a message that can resonate when the model has enough supporting context. The system now needs more repeated proof across owned and third-party surfaces.",
    bullets: ["Sampled mention rate: 37.5%", "Differentiated language can already land in the right context"],
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    eyebrow: "Google AI Overviews",
    title: "Google-side visibility is still missing.",
    body: "In the sampled set, BTS did not surface in AI Overviews. That makes commercial page coverage, schema/entity work, and third-party reinforcement especially important on the Google side.",
    bullets: ["Sampled mention rate: 0.0%", "The page-and-proof layer still needs to be built out"],
    icon: <Globe className="h-5 w-5" />,
  },
];

const promptExamples = [
  {
    platform: "Gemini · AU",
    prompt: "best creator monetization platform tools",
    takeaway: "BTS can be recognized in broad category prompts, but it still does not own the answer.",
    detail:
      "That means the positioning is promising, but the market still needs stronger commercial pages, comparisons, and off-site proof before BTS becomes a repeated default recommendation.",
  },
  {
    platform: "ChatGPT · US / AU",
    prompt: "behind the scenes creator monetization platform alternatives",
    takeaway: "Even branded alternative prompts still redirect attention toward larger incumbents.",
    detail:
      "This is why the first wave should lead with alternative and comparison pages that make the Patreon / Kajabi / Skool contrast explicit and easy to trust, even while Whop remains a strategic competitor in the broader story.",
  },
  {
    platform: "Gemini · AU",
    prompt: "behind the scenes creator monetization platform alternatives",
    takeaway: "Gemini can already describe BTS with differentiated language around frictionless commerce and creator monetization.",
    detail:
      "That is a useful sign. The message is not broken. The market simply does not encounter it often enough across owned pages, reviews, communities, and editorial proof.",
  },
];

const upsidePoints = [
  { month: 1, low: 3558, base: 7642, high: 14268 },
  { month: 2, low: 8303, base: 17194, high: 31390 },
  { month: 3, low: 14234, base: 28656, high: 51366 },
  { month: 4, low: 21351, base: 42029, high: 74195 },
  { month: 5, low: 29654, base: 55402, high: 97025 },
  { month: 6, low: 39143, base: 70686, high: 122708 },
  { month: 7, low: 48632, base: 85969, high: 148391 },
  { month: 8, low: 59307, base: 103163, high: 174074 },
  { month: 9, low: 71168, base: 120357, high: 199757 },
  { month: 10, low: 84216, base: 139461, high: 228293 },
  { month: 11, low: 100822, base: 164297, high: 256830 },
  { month: 12, low: 112588, base: 191043, high: 285367 },
];

const operatingTimelinePoints = [
  {
    month: 1,
    title: "Open the first decision pages",
    detail: "Month 1 is about concentration. BTS opens with the clearest commercial pages and fixes the technical/entity layer so those assets can actually move.",
    bullets: [
      "Ship Patreon alternative, Kajabi alternative, creator monetization platform, and the first pricing/comparison pages.",
      "Lock schema, canonicals, sitemap hygiene, Bing Webmaster Tools, and IndexNow around the first wedge.",
      "Start the first review-profile and creator-community visibility pushes immediately.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 7642,
    low: 3558,
    base: 7642,
    high: 14268,
  },
  {
    month: 2,
    title: "Attach proof to the opening wedge",
    detail: "Month 2 widens the evaluation layer so BTS is not relying on owned pages alone to tell the story.",
    bullets: [
      "Expand comparison coverage around Patreon, Kajabi, Circle, and Skool where the demand is visible.",
      "Push reviews, backlinks, Reddit / Quora / founder-community placements, and editorial proof in parallel.",
      "Refresh early winners with stronger proof and clearer differentiation.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 17194,
    low: 8303,
    base: 17194,
    high: 31390,
  },
  {
    month: 3,
    title: "Build the supporting network behind the winners",
    detail: "Month 3 deepens the system so buyers and answer engines keep encountering the same BTS story in more contexts.",
    bullets: [
      "Publish supporting coverage around creator monetization models, use cases, pricing, and product proof.",
      "Refresh the first decision pages with rebuttals, proof, and clearer comparisons.",
      "Retest prompts and reallocate effort toward the surfaces already showing traction.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 28656,
    low: 14234,
    base: 28656,
    high: 51366,
  },
  {
    month: 4,
    title: "Double down on the pages already pulling demand",
    detail: "Month 4 turns early signals into a repeatable system instead of a first-wave launch burst.",
    bullets: [
      "Reinforce the comparisons and pricing pages that are starting to win clicks or citations.",
      "Expand adjacent creator-business pages that support the same trust narrative.",
      "Increase listicles, mentions, and backlinks around the strongest assets.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 42029,
    low: 21351,
    base: 42029,
    high: 74195,
  },
  {
    month: 5,
    title: "Broaden buying consideration without losing focus",
    detail: "Month 5 adds more surface area, but only around the commercial story that is already working.",
    bullets: [
      "Add deeper creator-segment, objection-handling, and proof pages behind the decision layer.",
      "Keep off-site proof velocity up across communities, reviews, and editorial mentions.",
      "Use measurement to prune weak angles and reinforce strong ones.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 55402,
    low: 29654,
    base: 55402,
    high: 97025,
  },
  {
    month: 6,
    title: "Turn the first wins into category pressure",
    detail: "By month 6, BTS should have a real comparison layer, real proof surfaces, and enough repeated presence that incumbents feel more pressure.",
    bullets: [
      "Push deeper supporting coverage behind winning comparisons and monetization pages.",
      "Increase backlinks, listicles, review velocity, and press-style placements.",
      "Make the BTS = serious creators building real businesses story easier to encounter everywhere buyers research what to trust.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 70686,
    low: 39143,
    base: 70686,
    high: 122708,
  },
  {
    month: 7,
    title: "Refresh winners and defend the opening lane",
    detail: "Month 7 is where the program starts behaving like an operating system rather than a launch sequence.",
    bullets: [
      "Refresh winning comparison pages with newer proof, screenshots, and rebuttal coverage.",
      "Strengthen internal linking and entity consistency across the growing content network.",
      "Keep community and review activity aligned with the same commercial narrative.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 85969,
    low: 48632,
    base: 85969,
    high: 148391,
  },
  {
    month: 8,
    title: "Expand creator segments and objections",
    detail: "Month 8 widens coverage into the next layer of creator-business demand without diluting the positioning.",
    bullets: [
      "Add use-case, pricing, and migration-style pages that answer harder buying objections.",
      "Keep the proof layer fresh so answer engines have more trustworthy context to retrieve.",
      "Reallocate effort toward clusters and surfaces with the strongest compounding signals.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 103163,
    low: 59307,
    base: 103163,
    high: 174074,
  },
  {
    month: 9,
    title: "Build repeated presence across the web",
    detail: "Month 9 is about retrieval density: more places repeating the same serious-business story back to buyers.",
    bullets: [
      "Push more editorial placements, roundup inclusion, and citation-worthy proof assets.",
      "Keep strengthening communities and reviews where buyers sanity-check platform choices.",
      "Expand supporting content only where it clearly reinforces the money pages.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 120357,
    low: 71168,
    base: 120357,
    high: 199757,
  },
  {
    month: 10,
    title: "Consolidate category authority",
    detail: "Month 10 is where BTS should start to feel harder to ignore in the creator-platform consideration set.",
    bullets: [
      "Refresh high-performing assets again and defend rankings/citations against incumbent moves.",
      "Tighten the entity layer so the site and off-site proof keep reinforcing each other.",
      "Push the next tier of comparison and proof pages where coverage is still thin.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 139461,
    low: 84216,
    base: 139461,
    high: 228293,
  },
  {
    month: 11,
    title: "Scale what is clearly compounding",
    detail: "Month 11 should look disciplined: reinforce the proven lanes, cut dead weight, and compound the assets that keep winning consideration.",
    bullets: [
      "Prioritize the pages, prompts, and proof surfaces that are already driving the strongest movement.",
      "Keep publishing support coverage only where it strengthens commercial pages and trust signals.",
      "Use reporting to show which workstreams are actually creating leverage.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 164297,
    low: 100822,
    base: 164297,
    high: 256830,
  },
  {
    month: 12,
    title: "Compound the moat",
    detail: "The year-end target is not a one-off ranking win. It is a stronger demand engine across comparisons, buyer guides, supporting coverage, reviews, communities, editorials, and answer-engine retrieval.",
    bullets: [
      "Defend the strongest comparison and pricing lanes.",
      "Keep refreshing proof so off-site and on-site signals stay aligned.",
      "Enter the next year with a denser, harder-to-displace market position.",
    ],
    trafficLabel: "Base traffic",
    trafficValue: 191043,
    low: 112588,
    base: 191043,
    high: 285367,
  },
];

const operatingMilestones = [
  {
    label: "Month 1",
    month: 1,
    title: "Claim the first comparison pages",
    detail:
      "Launch Patreon alternative, Kajabi alternative, creator monetization platform, and the first pricing/comparison pages, then fix the technical/entity layer so those assets can actually move.",
    trafficLabel: "Base traffic",
    trafficValue: 7642,
  },
  {
    label: "Month 2",
    month: 2,
    title: "Push comparison proof into the market",
    detail:
      "Review profiles, listicles, Reddit/community placements, editorial mentions, and early backlinks reinforce the first decision pages so BTS is not telling the story alone.",
    trafficLabel: "Base traffic",
    trafficValue: 17194,
  },
  {
    label: "Month 3",
    month: 3,
    title: "Build supporting coverage behind the winners",
    detail:
      "Expand persona pages, monetization-model pages, proof pages, pricing explainers, and supporting comparison assets so BTS keeps appearing in more serious-business creator contexts.",
    trafficLabel: "Base traffic",
    trafficValue: 28656,
  },
  {
    label: "Month 6",
    month: 6,
    title: "Turn the system into category pressure",
    detail:
      "By month six, BTS should have a real comparison layer, real proof surfaces, stronger AI/search visibility, and enough repeated presence that displacing it becomes harder for incumbents.",
    trafficLabel: "Base traffic",
    trafficValue: 70686,
  },
  {
    label: "Month 12",
    month: 12,
    title: "Compound the moat",
    detail:
      "The year-end target is a stronger demand engine across comparisons, buyer guides, supporting coverage, reviews, communities, editorials, and answer-engine retrieval — not a one-off ranking win.",
    trafficLabel: "Base traffic",
    trafficValue: 191043,
  },
];

const monthPlan = [
  {
    label: "Month 1",
    title: "Open with the pages that make the serious-business contrast impossible to miss",
    body: "This month is about concentration. Publish the first alternative and comparison pages, clean the technical/entity layer, and make BTS legible as the serious-business option before broader expansion begins.",
    bullets: [
      "Ship Patreon alternative, Kajabi alternative, creator monetization platform, and early pricing/comparison pages.",
      "Lock schema, canonicals, sitemap hygiene, Bing Webmaster Tools, and IndexNow around the first page set.",
      "Start the first review-profile and creator-community visibility pushes immediately.",
    ],
  },
  {
    label: "Month 2",
    title: "Expand the evaluation layer and attach trust to it",
    body: "The second month widens the decision layer. Comparison pages are not enough by themselves; they need reviews, backlinks, listicles, editorial proof, and reputation pressure working around them.",
    bullets: [
      "Expand comparison and alternative pages around Patreon, Kajabi, Circle, and Skool where relevant.",
      "Push review infrastructure, backlinks, Reddit / Quora / founder-community placements, and editorial proof.",
      "Run the answer-surface, search, and reputation layers as one coordinated system instead of separate campaigns.",
    ],
  },
  {
    label: "Month 3",
    title: "Build the supporting network behind the pages already gaining traction",
    body: "The third month makes the system deeper. Supporting pages around creator personas, monetization models, pricing, proof, and product fit help answer engines and buyers keep encountering the same BTS narrative.",
    bullets: [
      "Publish supporting coverage around creator monetization models, use cases, pricing, and product proof.",
      "Refresh the first decision pages with new proof, comparisons, and rebuttals as the market responds.",
      "Retest prompts and move resources toward the pages and off-site surfaces already showing traction.",
    ],
  },
  {
    label: "Months 4–6",
    title: "Turn the first wins into a durable category position",
    body: "From here, BTS shifts from first-wave publication to compounding market pressure. The pages that win get reinforced, the weaker ones get repaired, and the brand shows up more often across search, communities, reviews, and answer layers.",
    bullets: [
      "Push deeper supporting coverage behind winning comparisons and monetization pages.",
      "Increase backlinks, listicles, review velocity, press-style placements, and forum/community visibility.",
      "Make the BTS = serious creators building real businesses story easier to encounter everywhere buyers research what platform to trust.",
    ],
  },
];

const offsiteAuthorityCards = [
  {
    title: "Reddit, Quora, and creator communities",
    body:
      "The buying conversation happens in public creator forums long before a founder fills out a form. BTS needs visible proof in those threads.",
    bullets: [
      "Show up in creator-business conversations where people ask what to use instead of Whop",
      "Use community proof to reinforce the same comparisons the decision pages are making",
      "Feed real community questions back into the next wave of page production",
    ],
    icon: <MessageSquareQuote className="h-5 w-5" />,
  },
  {
    title: "Review and editorial proof",
    body:
      "BTS needs review-platform presence, editorial mentions, listicles, and expert-style proof so the market sees a real business platform, not just a good homepage with thin third-party evidence.",
    bullets: [
      "Build visible review presence across multiple platforms",
      "Push editorial and listicle placements that echo the same serious-business story",
      "Make the third-party layer useful to both buyers and answer engines",
    ],
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Backlinks that strengthen the money pages",
    body:
      "The point is not generic link volume. The point is links and mentions that reinforce Whop alternative pages, Patreon alternative pages, pricing explainers, and the broader creator-monetization commercial layer.",
    bullets: [
      "Point link acquisition at the pages closest to buying consideration",
      "Pair every core asset with distribution and reinforcement, not just publication",
      "Use authority to strengthen retrieval, trust, and conversion confidence at the same time",
    ],
    icon: <Link2 className="h-5 w-5" />,
  },
];

const buildShipBlocks = [
  {
    number: "01",
    title: "AI answer-surface visibility",
    description:
      "Make BTS easier to cite when buyers ask AI models about creator platforms, serious-business alternatives, monetization tools, and where founders should actually build. The goal is repeated answer-surface presence, not a single lucky mention.",
    bullets: [
      "Strengthen Bing, Reddit, editorial, and review signals that feed LLM retrieval",
      "Publish comparison and monetization pages that deserve to be cited",
      "Increase the odds that BTS is described with differentiated business-building language, not generic creator-tool copy",
    ],
    icon: <Bot className="h-5 w-5" />,
  },
  {
    number: "02",
    title: "Search presence across the buying journey",
    description:
      "Maximize BTS visibility for the queries that matter most by owning more than one surface: the BTS site, review platforms, editorial placements, communities, and supporting properties that reinforce the same narrative.",
    bullets: [
      "Win alternatives, versus pages, pricing explainers, and buyer guides first",
      "Use multi-surface placements so BTS appears repeatedly when creators research options",
      "Force competitors to fight across multiple surfaces instead of one result at a time",
    ],
    icon: <Search className="h-5 w-5" />,
  },
  {
    number: "03",
    title: "Trust and reputation infrastructure",
    description:
      "Whop's trust problems and marketplace noise are strategic openings. BTS should make that contrast visible while building its own review, proof, and editorial infrastructure aggressively.",
    bullets: [
      "Use documented trust gaps to sharpen the Whop comparison without inventing claims",
      "Build BTS review velocity and profile completeness across multiple platforms",
      "Make the serious-business contrast visible in pages, reviews, communities, and editorial proof",
    ],
    icon: <Swords className="h-5 w-5" />,
  },
  {
    number: "04",
    title: "What gets built in practice",
    description:
      "This only works if the build is substantial. BTS needs a visible body of work, not a vague promise of content and reporting.",
    bullets: [
      "500+ optimized content pages over time across comparisons, buyer guides, use cases, and supporting coverage",
      "55 third-party placements across LinkedIn, Medium, HackerNoon, Forbes-style outlets, Reddit, Quora, and Substack-style surfaces",
      "36 press-release or editorial-style pushes across the campaign where credible",
      "Review-platform work across five surfaces plus active forum operations across three priority communities",
    ],
    icon: <FileText className="h-5 w-5" />,
  },
  {
    number: "05",
    title: "Technical and market infrastructure",
    description:
      "BTS also needs the machine-readable layer that makes all of this retrievable and defensible: schema, canonicals, sitemaps, Bing Webmaster Tools, IndexNow, entity consistency, competitive monitoring, and fast refresh cycles.",
    bullets: [
      "Keep crawl, indexing, and entity consistency tight across owned and third-party surfaces",
      "Run weekly AI mention tracking and monthly performance reporting",
      "Use continuous competitive monitoring and fast counter-publishing when incumbents move",
    ],
    icon: <Wrench className="h-5 w-5" />,
  },
];

const whyMemetikBullets = [
  "Memetik is built for the current discovery stack: classic search demand plus AI answer influence plus the trust layer that feeds both.",
  "The system stays commercial by default: alternatives, comparisons, pricing, proof, and buyer guides first — not content volume for its own sake.",
  "BTS gets one connected operating system instead of separate vendors for pages, links, reviews, PR, and technical clean-up.",
  "The work is meant to become more defensible every month as more surfaces repeat the same serious-business platform narrative.",
];

const competitorSpendRows = [
  ["Patreon", "$413M", "1,135", "$200K–$400K/mo"],
  ["Thinkific", "$182M (public)", "250–300", "$150K–$300K/mo"],
  ["Teachable (Hotmart)", "Acquired $250M", "150", "$100K–$200K/mo"],
  ["Kajabi", "$550M", "400", "$75K–$150K/mo"],
  ["Whop", "$217M", "125–175", "$50K–$75K/mo"],
  ["Circle", "$33M", "252", "$60K–$120K/mo"],
  ["Skool", "$0 (bootstrapped)", "~36", "$15K–$40K/mo"],
  ["BTS", "$15M valuation", "—", "$0 current structured SEO/content spend"],
];

const targetQueryRows = [
  ["patreon", "Category & Brand Demand", "TOFU", formatNumber(112080)],
  ["kajabi", "Category & Brand Demand", "TOFU", formatNumber(17424)],
  ["skool", "Category & Brand Demand", "TOFU", formatNumber(11168)],
  ["circle app", "Buyer Guides", "BOFU", formatNumber(2623)],
  ["creator monetization platform", "Buyer Guides", "BOFU", formatNumber(158)],
  ["patreon alternative", "Alternatives & Comparisons", "BOFU", formatNumber(465)],
  ["kajabi pricing", "Pricing & Cost", "BOFU", formatNumber(823)],
  ["skool reviews", "Reviews & Social Proof", "BOFU", formatNumber(53)],
];

const attributionBreakdownRows = [
  ["Competitor-brand keywords", formatNumber(169225), formatPercent(88.6), "Patreon, Kajabi, Skool, Circle / Circles, Teachable, Thinkific"],
  ["Unbranded keywords", formatNumber(21818), formatPercent(11.4), "Creator monetization platform, creator platform, pricing, reviews, and adjacent category demand"],
  ["Patreon alone", formatNumber(112080), formatPercent(58.7), "The single largest traffic driver in the current model"],
];

const clusterAttributionRows = [
  ["Category & Brand Demand", formatNumber(180999), formatPercent(94.7), "Mostly branded competitor and category demand; this is where the current model is concentrated"],
  ["Buyer Guides", formatNumber(6615), formatPercent(3.5), "Creator monetization platform, creator platform, and adjacent buyer-guide queries"],
  ["Alternatives & Comparisons", formatNumber(2118), formatPercent(1.1), "Patreon alternative, Kajabi alternative, and adjacent comparison terms"],
  ["Pricing & Cost", formatNumber(1228), formatPercent(0.6), "Kajabi pricing, Skool pricing, Patreon cost"],
  ["Reviews & Social Proof", formatNumber(80), "<0.1%", "Skool reviews and adjacent review-proof queries"],
];

const brandAttributionRows = [
  ["Patreon", formatNumber(112080), formatPercent(58.7), "Primary model driver"],
  ["Kajabi", formatNumber(17424), formatPercent(9.1), "Second-largest branded source"],
  ["Circle / Circles", formatNumber(15261), formatPercent(8.0), "Includes Circle / Circles demand"],
  ["Skool", formatNumber(12057), formatPercent(6.3), "Large branded demand bucket"],
  ["Teachable + Thinkific", formatNumber(2997), formatPercent(1.6), "Smaller supporting branded demand"],
  ["Unbranded total", formatNumber(21818), formatPercent(11.4), "All non-competitor demand combined"],
];

const publishingPlatformRows = [
  ["LinkedIn", "Analysis pieces", "best platform for online entrepreneurs"],
  ["Medium", "Builder stories", "best platform for selling courses"],
  ["HackerNoon", "Technical / infra content", "creator economy infrastructure"],
  ["Forbes / Entrepreneur-style outlets", "Thought leadership", "future of creator economy"],
  ["Reddit", "Recommendations", "[competitor] alternative"],
  ["Quora", "Detailed answers", "which platform is best for building a business?"],
  ["Substack", "Newsletter content", "building a real business online"],
];

const appendixAssumptions = [
  "The visible traffic numbers are planning estimates derived from the approved BTS strategy brief and should be read as directional growth modeling rather than guaranteed outcomes.",
  "The current BTS traffic model is heavily concentrated in competitor-brand demand rather than broad unbranded category demand.",
  "Whop remains a strategic competitor in the narrative, but the current modeled traffic attribution does not include Whop-branded keywords.",
  "The page is intentionally founder-readable while still preserving the real tactical depth behind the program.",
  "Public AI visibility conclusions remain softened where platform probing was incomplete. The page does not upgrade unsupported probe gaps into precise public certainty.",
  "Revenue planning still requires client ACV/AOV and funnel inputs before commitments should be treated as financial forecasts.",
];

export default function StrategyBts3() {
  useEffect(() => {
    document.title = "BTS Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto max-w-6xl">
        <StrategyHero
          eyebrow="BTS × Memetik Strategy Memo"
          title="BTS for serious creators building real businesses"
          accent="with the Whop contrast made visible"
          subtitle="This strategy turns BTS into the visible choice for serious creators building real businesses: comparison pages first, multi-surface visibility second, and trust infrastructure built hard enough that the market starts repeating the same serious-business story back to buyers."
          tags={["behindthescenes.com", "creator economy", "6-month plan", "serious builders"]}
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
                  BTS does not need to become the biggest creator marketplace. It needs to become the platform serious creators trust when they want to build a real business.
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66 md:text-base">
                  BTS can own the competitor-brand and creator-monetization decision layer, build answer-surface and search visibility together, and surround the whole system with enough proof that the market stops treating BTS like a hidden product.
                </p>
              </div>
            </HighlightBox>

            <div className="mt-6">
              {executiveMetrics.map((metric) => (
                <MetricStackCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="mt-6">
              {immediateActions.map((action, index) => (
                <ActionStackCard key={action.title} index={index} title={action.title} body={action.body} />
              ))}
            </div>
          </div>
        </StrategyHero>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="Google still drives creator-platform discovery, but buyer consideration now spills across answer engines, review surfaces, founder communities, and editorial comparisons before a founder ever commits."
              body="For BTS, the visibility problem is not just about rankings. It is about becoming a repeated answer when someone asks what platform they should trust to build a real business, what to use instead of Patreon or Kajabi, or how creator monetization platforms actually compare."
              implication="The winner is not the brand with one good result. It is the brand buyers keep encountering across multiple trusted surfaces."
            />

            <div className="mt-6">
              <VerticalInsightCard
                eyebrow="Discovery shift"
                title="The battleground moved closer to the decision."
                body="Creators now use classic search plus answer layers to compare platforms, sanity-check pricing, judge trustworthiness, and narrow the field before they ever click into a product site. That makes comparison pages and proof surfaces much more valuable than generic thought-leadership content."
                bullets={[
                  "Search still captures demand, but answer layers now influence the shortlist",
                  "Comparison and alternative queries have disproportionate commercial leverage",
                  "Repeated presence across surfaces is more defensible than a single ranking win",
                ]}
                icon={<Search className="h-5 w-5" />}
              />

              <VerticalInsightCard
                eyebrow="AI visibility window"
                title="The next six months still matter more than the following twenty-four."
                body="Category positions are not fully hardened yet, which means a challenger with strong pages and stronger proof can still move into the answer set faster than a mature category would usually allow."
                bullets={[
                  "ChatGPT leans heavily on Bing-aligned retrieval and strong web evidence",
                  "Perplexity heavily cites Reddit and other discussion-driven surfaces",
                  "Google AI Overviews still reward strong top-10 organic and page-quality signals",
                ]}
                icon={<Bot className="h-5 w-5" />}
              />
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="02" title="Where BTS Is Today" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="BTS already has real product traction. What it lacks is visible market power."
              body="That distinction matters. BTS is not inventing a story from scratch. It already has users, builders, payout proof, and a meaningful product philosophy. The page needs to turn that hidden reality into discoverable, comparable, trustable surface area."
              implication="This is a visibility and positioning problem sitting on top of a real platform, which is exactly the kind of problem that can move fast when the strategy is concentrated."
            />

            <div className="mt-6">
              {tractionStats.map((item) => (
                <VerticalInsightCard
                  key={item.title}
                  eyebrow={item.eyebrow}
                  title={item.title}
                  body={item.body}
                  bullets={item.bullets}
                  icon={item.icon}
                />
              ))}
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="03" title="Why BTS Can Win" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="BTS can win a defined slice of the market because the creator-platform category still leaves room for a cleaner, more serious business-building story."
              body="The advantage is not scale. The advantage is strategic clarity. BTS does not need to beat Whop everywhere. It needs to become the more credible answer where founders are asking which platform is better for building a real business over time."
              implication="That makes the opening wedge emotionally clear and commercially useful at the same time."
            />

            <div className="mt-6">
              {rightToWinCards.map((card) => (
                <VerticalInsightCard
                  key={card.title}
                  eyebrow={card.eyebrow}
                  title={card.title}
                  body={card.body}
                  bullets={card.bullets}
                  icon={card.icon}
                  glow="amber"
                />
              ))}
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="04" title="Competitive Gap" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="The gap is real, but it is not mysterious. BTS loses today because incumbents have more pages, more proof, and more repeated market signals."
              body="Patreon, Teachable, Circle, Kajabi, Skool, and especially Whop all present stronger surface area than BTS does today. The right reaction is not panic. It is to attack the parts of the category where BTS can make the contrast easiest to understand and trust."
              implication="Comparison intent is where a challenger can move fastest without pretending to be bigger than it is."
            />

            <div className="mt-6 overflow-x-auto rounded-[28px] border border-white/10 bg-black/20 p-4 md:p-5">
              <DataTable
                headers={["Brand", "Organic traffic", "Organic keywords", "Referring domains", "Backlinks", "Prompt hits"]}
                rows={competitorRows}
              />
            </div>

            <div className="mt-6">
              {whopWeaknesses.map((item) => (
                <VerticalInsightCard
                  key={item.title}
                  eyebrow={item.eyebrow}
                  title={item.title}
                  body={item.body}
                  bullets={item.bullets}
                  icon={item.icon}
                />
              ))}
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="05" title="AI Visibility Gap" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="BTS has enough positioning clarity to get mentioned, but not enough repeated proof to become the default recommendation yet."
              body="That is the practical reading of the current prompt evidence. The message can land, especially in the right creator-monetization context, but the broader answer ecosystem still does not encounter BTS often enough to trust it by default."
              implication="Owned pages, third-party proof, and retrieval-friendly signals all have to move together."
            />

            <div className="mt-6">
              {platformStats.map((item) => (
                <VerticalInsightCard
                  key={item.title}
                  eyebrow={item.eyebrow}
                  title={item.title}
                  body={item.body}
                  bullets={item.bullets}
                  icon={item.icon}
                />
              ))}
            </div>

            <div className="mt-6">
              {promptExamples.map((example) => (
                <PromptExampleCard key={`${example.platform}-${example.prompt}`} {...example} />
              ))}
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="06" title="Revenue / Commercial Impact" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="If BTS becomes easier to find and easier to trust in the right creator-business buying moments, search becomes a strategic demand engine rather than a visibility afterthought."
              body="The opportunity is not random top-of-funnel volume. It is better placement in the alternatives, comparisons, pricing, and evaluation moments where founders decide what platform deserves serious consideration."
              implication="That is why the first decision pages can create outsized leverage relative to their raw page count."
            />

            <div className="mt-6 rounded-[28px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 px-5 py-4 text-sm leading-7 text-white/78">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Estimate-only</span>
              The curve below is a planning model based on the approved BTS brief. It shows cumulative 12-month traffic progression if BTS wins comparison and monetization demand first, then compounds outward from there.
            </div>

            <div className="mt-6">
              <PhasedUpsideChart points={upsidePoints} />
            </div>

            <div className="mt-6">
              <TamRoiCalculator className="w-full" baseReachableVisits={191043} defaultLtv={0} defaultVisitToCustomerRate={0.01} />
            </div>

            <StrategyCard className="mt-6 w-full">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/42">Commercial interpretation</div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/66">
                The base case points to {formatNumber(191043)} expected visits across 12 months, with {formatNumber(70686)} as the current first 6-month milestone and {formatNumber(285367)} as the aggressive upside. More important than the raw number is the source of that traffic: the current model is driven mostly by competitor-brand search rather than broad unbranded creator-platform demand.
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/66">Revenue planning requires client ACV/AOV and funnel inputs.</p>
            </StrategyCard>

            <div className="mt-6">
              {trafficAttributionMetrics.map((metric) => (
                <MetricStackCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="mt-6">
              <DataTable
                headers={["Traffic source", "Modeled 12m traffic", "Share of base case", "Interpretation"]}
                rows={attributionBreakdownRows}
                highlightRow={0}
              />
            </div>

            <StrategyCard className="mt-6 w-full" glow="amber">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/42">What this means</div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/66">
                The current upside is still mostly a Patreon / Kajabi / Skool / Circle demand-capture story. Whop remains strategically relevant to the positioning, but Whop-branded traffic is not what is driving the current model.
              </p>
            </StrategyCard>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="07" title="6-month Growth Plan" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="The first six months should feel like a deliberate market-entry sequence, not a vague publishing calendar."
              body="The order stays the same: first claim the comparison layer, then reinforce it, then widen the coverage network behind what is already working."
              implication="Each month block has a distinct job, and the compounding logic should be visible."
            />

            <div className="mt-6">
              {monthPlan.map((month) => (
                <MonthBlock key={month.label} label={month.label} title={month.title} body={month.body} bullets={month.bullets} />
              ))}
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="08" title="Off-site Authority" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="BTS cannot win the serious-business comparison story on owned pages alone. The market also needs third-party reasons to repeat and trust it."
              body="That means Reddit, founder communities, review platforms, listicles, editorial proof, and backlinks all belong inside the execution system. They are not optional amplification after the real work. They are part of the real work."
              implication="The strongest BTS pages still need the web to echo them back."
            />

            <div className="mt-6">
              {offsiteAuthorityCards.map((item) => (
                <VerticalInsightCard
                  key={item.title}
                  eyebrow="Authority layer"
                  title={item.title}
                  body={item.body}
                  bullets={item.bullets}
                  icon={item.icon}
                  glow="amber"
                />
              ))}
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="09" title="What Memetik Actually Builds and Ships" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="This is a full execution system: pages, proof, reviews, communities, backlinks, technical infrastructure, and competitive response loops working together."
              body="The founder should feel the weight of the build, not a watered-down content-retainer story."
              implication="The work needs to look serious because the category fight is serious."
            />

            <div className="mt-6">
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
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="10" title="Operating Model" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="The system compounds because BTS keeps shipping and reinforcing the same business-building story every month."
              body="This timeline uses one growth line with milestones layered into it so a founder can immediately see what ships, when it ships, and why the visibility curve bends upward."
              implication="The visual should make the operating logic feel obvious instead of buried in a grid."
            />

            <div className="mt-6">
              <GrowthTimelineChart points={operatingTimelinePoints} milestones={operatingMilestones} />
            </div>

            <div className="mt-6">
              <VerticalInsightCard
                eyebrow="Monthly rhythm"
                title="A founder-readable operating system"
                body="Each month includes prompt and competitor review, decision-page production, publishing and indexing support, off-site authority work, and monthly reporting. The mix evolves, but the system never drops into a single-channel mode."
                bullets={[
                  "Keep comparison pages, supporting coverage, and off-site proof moving together",
                  "Use monthly reporting to show shipped work, market movement, and what gets reinforced next",
                  "Reallocate effort quarterly toward the pages, prompts, and trust surfaces showing real traction",
                ]}
                icon={<Radar className="h-5 w-5" />}
              />
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="11" title="Why Memetik" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="Memetik is built for the hybrid discovery stack that BTS actually has to win: search demand, answer-engine influence, and the trust layer that feeds both."
              body="That is why this strategy works: the build is broad enough, tactical enough, and aggressive enough to actually move the market."
              implication="The value is not just more content. It is a system competitors have to unwind surface by surface."
            />

            <HighlightBox className="mt-6">
              <div className="max-w-3xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Memetik difference</div>
                <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                  We do not just try to make BTS rank. We try to make BTS the platform serious creators keep encountering when they research what to trust.
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
          title="If BTS wants the serious-business lane, this is the execution map."
          body="The market already has louder brands. BTS does not need to be louder everywhere. It needs to be easier to trust in the exact moments that shape creator-platform decisions."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <section className="mt-16 md:mt-20">
          <SectionHeader number="12" title="Supporting Evidence Appendix" />

          <div className="space-y-4">
            <StrategyAppendixSection
              defaultOpen
              title="Competitor spend and market pressure"
              description="Relevant tactical context for understanding the size and seriousness of the category fight."
            >
              <DataTable headers={["Platform", "Funding", "Employees", "Estimated SEO / content spend"]} rows={competitorSpendRows} />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              defaultOpen
              title="Keyword breakdown behind the current model"
              description="Representative keywords actually present in the current BTS traffic model, with their cluster, intent, and modeled 12-month contribution."
            >
              <DataTable headers={["Keyword", "Cluster", "Intent", "Modeled 12m traffic"]} rows={targetQueryRows} />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              defaultOpen
              title="Traffic attribution breakdown"
              description="How much of the current BTS traffic model is attributable to competitor-brand demand versus unbranded category demand."
            >
              <div className="space-y-4">
                <DataTable
                  headers={["Cluster", "Modeled 12m traffic", "Share of base case", "What is inside"]}
                  rows={clusterAttributionRows}
                />
                <DataTable
                  headers={["Brand or bucket", "Modeled 12m traffic", "Share of base case", "Notes"]}
                  rows={brandAttributionRows}
                />
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              defaultOpen
              title="Third-party publishing surfaces"
              description="Examples of external surfaces where the search-ownership and reputation-warfare logic can be executed."
            >
              <DataTable headers={["Platform", "Type", "Target angle"]} rows={publishingPlatformRows} />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              defaultOpen
              title="Planning assumptions, confidence, and caveats"
              description="How to interpret the opportunity numbers honestly."
            >
              <div className="space-y-3">
                {appendixAssumptions.map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/66">
                    {item}
                  </div>
                ))}
              </div>
            </StrategyAppendixSection>
          </div>
        </section>
      </div>
    </StrategyPageFrame>
  );
}
