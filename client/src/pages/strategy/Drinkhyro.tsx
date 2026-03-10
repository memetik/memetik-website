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
  StrategyAppendixSection,
  StrategySectionLead,
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyEyebrow,
  StrategyCTA,
} from "@/components/strategy";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Brain,
  Compass,
  Crosshair,
  Database,
  FileText,
  FlaskConical,
  Globe2,
  HeartPulse,
  Layers3,
  Link2,
  MessageSquareQuote,
  Newspaper,
  Radar,
  RefreshCw,
  ScanSearch,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Workflow,
} from "lucide-react";

function formatWhole(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));
}

function ExecutiveMetricCard({
  label,
  value,
  note,
  breakdown,
  glow = "blue",
}: {
  label: string;
  value: string;
  note: string;
  breakdown: { label: string; value: string }[];
  glow?: "blue" | "amber" | "mixed";
}) {
  return (
    <StrategyCard glow={glow}>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">{label}</div>
      <div className="mt-3 break-words text-[clamp(2rem,6vw,4rem)] font-display font-extrabold leading-[0.95] tracking-tight text-white">
        {value}
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">{note}</p>

      <div className="mt-4 space-y-2">
        {breakdown.map((item) => (
          <div
            key={`${label}-${item.label}`}
            className="flex items-center justify-between gap-3 rounded-[18px] border border-white/8 bg-black/20 px-4 py-3"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">{item.label}</div>
            <div className="text-sm font-semibold text-white">{item.value}</div>
          </div>
        ))}
      </div>
    </StrategyCard>
  );
}

function ImmediateActionCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <StrategyCard glow="amber">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/62">{body}</p>
        </div>
      </div>
    </StrategyCard>
  );
}

function VerticalMemoCard({
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
    <StrategyCard glow="blue">
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
            {icon}
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{eyebrow}</div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/64">{body}</p>
          {bullets?.length ? (
            <div className="mt-4">
              <BulletList items={bullets} />
            </div>
          ) : null}
        </div>
      </div>
    </StrategyCard>
  );
}

function PlatformSignalCard({
  platform,
  stat,
  body,
}: {
  platform: string;
  stat: string;
  body: string;
}) {
  return (
    <StrategyCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{platform}</div>
          <div className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{stat}</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
          sampled prompts
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/62">{body}</p>
    </StrategyCard>
  );
}

function PromptSignalCard({
  prompt,
  winner,
  body,
  excerpt,
}: {
  prompt: string;
  winner: string;
  body: string;
  excerpt: string;
}) {
  return (
    <StrategyCard glow="mixed">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Real prompt example</div>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{prompt}</h3>
      <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">
        Current visible winners: {winner}
      </div>
      <p className="mt-4 text-sm leading-7 text-white/64">{body}</p>
      <div className="mt-4 rounded-[22px] border border-white/8 bg-black/20 p-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Observed response pattern</div>
        <p className="mt-2 text-sm leading-6 text-white/68">{excerpt}</p>
      </div>
    </StrategyCard>
  );
}

function MonthPlanBlock({
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
    <StrategyCard glow="amber">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{label}</div>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/64">{body}</p>
      <div className="mt-4">
        <BulletList items={bullets} />
      </div>
    </StrategyCard>
  );
}

function ScopeBlock({
  label,
  title,
  body,
  bullets,
  icon,
}: {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  icon: React.ReactNode;
}) {
  return (
    <StrategyCard glow="blue">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{label}</div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/64">{body}</p>
          <div className="mt-4">
            <BulletList items={bullets} />
          </div>
        </div>
      </div>
    </StrategyCard>
  );
}

const executiveMetrics = [
  {
    label: "Total search opportunity",
    value: "8,464,050",
    note: "Validated topical demand inside Hyro's category frame, with low-quality semantic noise excluded.",
    glow: "mixed" as const,
    breakdown: [
      { label: "Competitor-keyword demand", value: "629,440" },
      { label: "Non-competitor / unbranded demand", value: "7,834,610" },
    ],
  },
  {
    label: "Expected traffic in 12 months",
    value: "191,505",
    note: "Base-case cumulative traffic potential if Hyro owns the decision layer first, then compounds into broader category coverage.",
    glow: "blue" as const,
    breakdown: [
      { label: "Competitor-keyword traffic", value: "13,798" },
      { label: "Non-competitor / unbranded traffic", value: "177,707" },
    ],
  },
  {
    label: "Aggressive upside",
    value: "327,134",
    note: "Upper-range outcome if Hyro wins faster on buyer guides, supporting coverage, and third-party trust surfaces.",
    glow: "amber" as const,
    breakdown: [
      { label: "Competitor-keyword share", value: "7.4%" },
      { label: "Non-competitor / unbranded share", value: "92.6%" },
    ],
  },
  {
    label: "First 6-month target",
    value: "70,857",
    note: "The first deployment window should create visible movement before the full category expansion phase arrives.",
    glow: "mixed" as const,
    breakdown: [
      { label: "Competitor-keyword 6-month target", value: "5,105" },
      { label: "Non-competitor / unbranded 6-month target", value: "65,752" },
    ],
  },
];

const opportunityCurve = [
  { month: 1, low: 2500, base: 4800, high: 8500 },
  { month: 2, low: 7000, base: 12000, high: 21000 },
  { month: 3, low: 13000, base: 20000, high: 35000 },
  { month: 4, low: 21000, base: 32000, high: 56000 },
  { month: 5, low: 29000, base: 49000, high: 83000 },
  { month: 6, low: 36751, base: 70857, high: 121040 },
  { month: 7, low: 45000, base: 91000, high: 155000 },
  { month: 8, low: 56000, base: 111000, high: 189000 },
  { month: 9, low: 67000, base: 132500, high: 226000 },
  { month: 10, low: 78000, base: 154000, high: 262000 },
  { month: 11, low: 89000, base: 173500, high: 294000 },
  { month: 12, low: 99308, base: 191505, high: 327134 },
];

const timelinePoints = [
  {
    month: 1,
    low: 2500,
    base: 4800,
    high: 8500,
    title: "Month 1 — Open with decision pages",
    detail:
      "Hyro starts where buyer intent is clearest: best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix.",
    bullets: [
      "Launch the first commercial pages around best-in-category and selection intent",
      "Ship indexing, schema, canonical, and sitemap fixes alongside the first pages",
      "Begin early review and authority-surface repair so proof matches the new pages",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 4800,
  },
  {
    month: 2,
    low: 7000,
    base: 12000,
    high: 21000,
    title: "Month 2 — Add comparison and review pressure",
    detail:
      "The second month expands into head-to-head evaluation pages and social-proof assets so Hyro is easier to compare, validate, and recommend.",
    bullets: [
      "Build comparison, alternatives, and review-led pages around the same decision set",
      "Attach off-site placements and community participation to the first winners",
      "Push fresh internal links back into the main commercial pages",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 12000,
  },
  {
    month: 3,
    low: 13000,
    base: 20000,
    high: 35000,
    title: "Month 3 — Expand supporting coverage",
    detail:
      "Once the first decision pages are live, Hyro broadens surrounding coverage across ingredients, benefits, use cases, routines, and hydration scenarios.",
    bullets: [
      "Publish supporting pages that reinforce the same commercial story",
      "Strengthen entity consistency across owned pages and third-party profiles",
      "Continue authority building around the pages already showing momentum",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 20000,
  },
  {
    month: 4,
    low: 21000,
    base: 32000,
    high: 56000,
    title: "Month 4 — Reinforce the first visible winners",
    detail:
      "The operating focus shifts from first launch to reinforcement: update promising pages, expand external mentions, and improve the proof layer where incumbents still look stronger.",
    bullets: [
      "Refresh copy, proof, and product framing on pages getting traction",
      "Push digital PR, listicles, and backlinks toward the pages already converting attention",
      "Broaden keyword coverage around sugar-free, low-sugar, and use-case terms",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 32000,
  },
  {
    month: 5,
    low: 29000,
    base: 49000,
    high: 83000,
    title: "Month 5 — Broaden category entry points",
    detail:
      "By month five, Hyro should look less like a single product page brand and more like a credible category guide across multiple buying angles.",
    bullets: [
      "Add adjacent decision pages tied to use case, ingredient preference, and product form",
      "Increase editorial and round-up inclusion in hydration and wellness surfaces",
      "Keep review acquisition and response workflows active",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 49000,
  },
  {
    month: 6,
    low: 36751,
    base: 70857,
    high: 121040,
    title: "Month 6 — Hit the first compounding target",
    detail:
      "At six months, Hyro should have a visible decision-layer footprint, active third-party proof, and a repeatable system for expanding what is already working.",
    bullets: [
      "Reach the first base-case traffic target of 70,857",
      "Use prompt checks and search indicators to identify where Hyro is starting to enter consideration",
      "Double down on winning themes before broad category expansion",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 70857,
  },
  {
    month: 7,
    low: 45000,
    base: 91000,
    high: 155000,
    title: "Month 7 — Scale the decision layer outward",
    detail:
      "The second half of the year pushes deeper into adjacent comparisons, benefits, and seasonal or situational use cases while defending the pages already gaining ground.",
    bullets: [
      "Expand into more competitor-adjacent comparisons and category modifiers",
      "Increase backlink pressure to core conversion pages",
      "Refresh pages where incumbents still dominate answer surfaces",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 91000,
  },
  {
    month: 8,
    low: 56000,
    base: 111000,
    high: 189000,
    title: "Month 8 — Make Hyro easier to cite",
    detail:
      "Machines and humans both need repeated proof. This month emphasizes structured evidence, updated pages, third-party reinforcement, and a cleaner entity footprint.",
    bullets: [
      "Expand author, about, review, and supporting proof surfaces",
      "Keep publishing supporting pages that route authority back to commercial winners",
      "Push more newsletter, editorial, and community references into market",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 111000,
  },
  {
    month: 9,
    low: 67000,
    base: 132500,
    high: 226000,
    title: "Month 9 — Enter broader category demand",
    detail:
      "Once the decision layer is established, Hyro can earn more value from the larger category terms without diluting the original opening move.",
    bullets: [
      "Begin widening into broader electrolyte drink and electrolyte powder demand",
      "Use the now-stronger authority base to support higher-volume pages",
      "Protect the best-performing buyer-guide pages from drift",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 132500,
  },
  {
    month: 10,
    low: 78000,
    base: 154000,
    high: 262000,
    title: "Month 10 — Build moat, not just movement",
    detail:
      "The system now behaves less like a launch campaign and more like category infrastructure: pages, citations, reviews, and proof all support the same story.",
    bullets: [
      "Refresh aging pages with new evidence and stronger comparisons",
      "Add fresh authority placements to defend the terms Hyro is starting to win",
      "Push new supporting coverage into emerging demand pockets",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 154000,
  },
  {
    month: 11,
    low: 89000,
    base: 173500,
    high: 294000,
    title: "Month 11 — Consolidate leadership signals",
    detail:
      "At this stage, Hyro should look increasingly credible across search, answer surfaces, and third-party references for a growing portion of buyer-led queries.",
    bullets: [
      "Use monthly reporting to consolidate around the strongest query families",
      "Reinforce review profiles, backlinks, and citations around those families",
      "Keep broadening use-case coverage where search and AI overlap",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 173500,
  },
  {
    month: 12,
    low: 99308,
    base: 191505,
    high: 327134,
    title: "Month 12 — Reach the modeled first-year range",
    detail:
      "By the end of year one, Hyro should no longer depend on branded demand alone. It should own meaningful discovery and consideration across the category's highest-leverage commercial questions.",
    bullets: [
      "Base-case cumulative traffic reaches 191,505",
      "High-case upside reaches 327,134 if reinforcement and answer-surface adoption compound faster",
      "The next planning cycle becomes defense plus adjacent expansion, not rebuilding from zero",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 191505,
  },
];

const timelineMilestones = [
  {
    label: "Milestone 1",
    month: 1,
    title: "Decision-page opening move",
    detail:
      "Launch the first buyer-guide pages and pair them with indexing readiness, internal linking, and review-proof cleanup.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 4800,
    bullets: ["Commercial pages first", "Infrastructure in parallel", "Early authority actions begin"],
  },
  {
    label: "Milestone 2",
    month: 2,
    title: "Comparison and proof layer added",
    detail:
      "Hyro becomes easier to evaluate against incumbent brands through comparison pages, review angles, and early external reinforcement.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 12000,
    bullets: ["Comparison pages", "Review assets", "Community participation"],
  },
  {
    label: "Milestone 3",
    month: 3,
    title: "Supporting coverage deepens",
    detail:
      "The site starts looking like a real category resource rather than a narrow product footprint.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 20000,
    bullets: ["Ingredients", "Benefits", "Use cases"],
  },
  {
    label: "Milestone 4",
    month: 6,
    title: "First compounding target reached",
    detail:
      "By month six, Hyro should have a clear first-wave footprint across decision pages, supporting coverage, and off-site proof.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 70857,
    bullets: ["Winning pages identified", "Authority proof active", "Refresh loop underway"],
  },
  {
    label: "Milestone 5",
    month: 9,
    title: "Broader category expansion starts",
    detail:
      "Hyro widens from decision-stage openings into larger category demand once the first commercial layer is established.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 132500,
    bullets: ["Broader category terms", "Defended winners", "More surface area"],
  },
  {
    label: "Milestone 6",
    month: 12,
    title: "Year-one category foothold",
    detail:
      "The first year ends with Hyro positioned to defend wins, refresh aging assets, and push into adjacent opportunity clusters.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 191505,
    bullets: ["Base-case 191,505", "Upper range 327,134", "Moat building phase"],
  },
];

const competitorRows = [
  ["LMNT", "429,600", "34,009", "4,642", "150,912", "7", "Dominant brand and answer-surface incumbent"],
  ["Liquid I.V.", "456,449", "14,724", "2,789", "44,257", "7", "Strong commercial footprint and comparison visibility"],
  ["Hydralyte", "4,169", "1,276", "586", "1,842", "0", "Smaller search presence, weaker answer-surface pull"],
  ["Nuun", "105,219", "19,880", "4,218", "77,141", "6", "Broad coverage and deep authority history"],
  ["DripDrop", "161,926", "14,368", "1,846", "9,454", "2", "Strong dehydration-oriented commercial footprint"],
  ["Hyro", "1,004", "362", "74", "366", "0", "Real starting relevance, but not yet concentrated around buying decisions"],
];

const opportunityClusterRows = [
  [
    "Buyer Guides",
    "Phase 1",
    "211,170",
    "23,229",
    "best electrolyte drink, best electrolyte powder, best hydration powder",
    "Fastest commercial opening move",
  ],
  [
    "Alternatives & Comparisons",
    "Phase 1",
    "7,210",
    "793",
    "electrolyte powder vs tablets, pedialyte vs electrolyte powder",
    "Makes Hyro easier to evaluate against incumbents",
  ],
  [
    "Reviews & Social Proof",
    "Phase 1",
    "3,720",
    "409",
    "lmnt electrolyte powder review, just ingredients electrolyte review",
    "Adds third-party-style trust and validation cues",
  ],
  [
    "Category & Brand Demand",
    "Phase 3",
    "8,241,950",
    "167,074",
    "electrolyte drinks, electrolyte drink mix, electrolyte powder",
    "Large later-stage expansion layer after decision pages are established",
  ],
];

const commercialSignalRows = [
  ["best electrolyte powder for pregnancy", "89", "390", "Important use-case page opportunity"],
  ["best natural electrolytes drink", "102", "390", "Natural-ingredient angle currently underowned"],
  ["best sugar free electrolyte drink", "69", "390", "Strong commercial modifier with buyer intent"],
  ["best sugar-free electrolyte drink", "58", "390", "Variant worth consolidating and improving"],
  ["best low-sugar electrolyte drink", "80", "210", "Clear health-conscious decision query"],
  ["best no sugar electrolyte powder", "60", "210", "High-fit comparison and buyer-guide angle"],
  ["best cheap electrolyte powder", "38", "140", "Price-sensitivity page opportunity"],
  ["best electrolyte drink without potassium", "62", "140", "Specific use-case and ingredient filter"],
];

const whyMemetikBullets = [
  {
    eyebrow: "Search + AI together",
    title: "Memetik treats Google and answer engines as one commercial system.",
    body:
      "The buyer path no longer lives in a single interface. Hyro needs classic search capture and answer-surface visibility working together, because buying consideration now moves across both.",
    icon: <Globe2 className="h-5 w-5" />,
  },
  {
    eyebrow: "On-site + off-site together",
    title: "Memetik does not stop at publishing pages.",
    body:
      "Decision pages matter, but they do not become a default recommendation on their own. Off-site authority, reviews, listicles, editorials, communities, and backlinks have to reinforce the same story.",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    eyebrow: "Deployment + defense",
    title: "Memetik ships, measures, refreshes, and reallocates.",
    body:
      "This is not a one-time content burst. The operating model keeps reinforcing what works, correcting what softens, and widening coverage once Hyro begins to win in the market.",
    icon: <RefreshCw className="h-5 w-5" />,
  },
];

export default function StrategyDrinkhyro() {
  useEffect(() => {
    document.title = "Hyro Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <StrategyPageFrame mainClassName="mx-auto max-w-6xl">
        <StrategyHero
          eyebrow="Founder strategy memo"
          title="Hyro can own electrolyte decisions"
          subtitle="The opening move is not broad category awareness. It is owning the buyer-guide and comparison queries where people decide which electrolyte powder to trust, then reinforcing those pages across Google, ChatGPT, Gemini, review surfaces, listicles, and community proof until Hyro enters real buying consideration."
          tags={["drinkhyro.com", "Consumer Health", "US market", "Electrolyte drink mix"]}
        >
          <div className="max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <StrategyEyebrow>00 / Executive Summary</StrategyEyebrow>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/38">
                validated topical scope
              </div>
            </div>

            <HighlightBox className="mb-6">
              <div className="max-w-3xl">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Founder read</div>
                <p className="mt-3 text-xl font-display font-semibold tracking-tight text-white md:text-2xl">
                  Hyro already has enough relevance to win a defined slice of the market. The fastest path is to own
                  the decision-stage electrolyte queries first, then widen into broader category demand once the proof
                  layer is in place.
                </p>
                <p className="mt-4 text-sm leading-7 text-white/66">
                  This page is derived from the approved Hyro brief and keeps the full execution engine visible:
                  commercial page buildout, supporting content coverage, off-site authority, review work, technical
                  infrastructure, and ongoing reinforcement.
                </p>
              </div>
            </HighlightBox>

            <div className="mb-8 space-y-4">
              {executiveMetrics.map((metric) => (
                <ExecutiveMetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  note={metric.note}
                  breakdown={metric.breakdown}
                  glow={metric.glow}
                />
              ))}
            </div>

            <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
              Immediate actions
            </div>
            <div className="space-y-4">
              <ImmediateActionCard
                number="01"
                title="Open with buyer-guide pages where selection intent is strongest."
                body="Hyro should begin with best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix rather than trying to boil the ocean across the entire category."
              />
              <ImmediateActionCard
                number="02"
                title="Attach third-party proof to every important commercial page."
                body="On-site publishing alone will not change who gets recommended. Reviews, communities, editorial mentions, roundups, and backlinks need to reinforce the same commercial narrative."
              />
              <ImmediateActionCard
                number="03"
                title="Widen only after the first commercial layer is working."
                body="Once the buyer-guide and comparison pages begin to earn visibility, Hyro can expand into broader category, ingredient, and routine coverage without diluting the opening move."
              />
            </div>
          </div>
        </StrategyHero>

        <StrategySectionShell className="mb-8" glow="mixed">
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still drives category discovery, but AI is now shaping who gets considered."
            body="Traditional search remains a core buying behavior. At the same time, buyers increasingly move across Google, ChatGPT, Gemini, and other answer layers before they ever buy. That means Hyro cannot rely on a single-channel SEO model. It needs visibility across classic demand capture and AI-led recommendation surfaces at the same time."
            implication="The brand that earns repeated visibility across both systems becomes easier to trust, easier to compare, and more likely to enter buying consideration."
          />

          <HighlightBox className="mb-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Why this matters now</div>
            <div className="mt-4">
              <BulletList
                items={[
                  "Google still carries a major share of discovery and commercial research traffic in categories like hydration, wellness, and supplement-adjacent consumer health.",
                  "AI answer layers are changing how buyers narrow options before they click, especially on best-of, comparison, and product-selection queries.",
                  "The winning brand is not just the one with product pages. It is the one that keeps appearing as the most believable answer across multiple surfaces.",
                  "For Hyro, that means building decision pages, supporting coverage, and third-party proof as one system rather than treating them as separate tasks.",
                ]}
              />
            </div>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="blue">
          <SectionHeader number="02" title="Where Hyro Is Today" />
          <StrategySectionLead
            takeaway="Hyro has a real foothold, but not yet a market-defining footprint."
            body="The brief shows a legitimate starting point: 1,004 current organic visits, 362 ranking keywords, 74 referring domains, and 366 backlinks. That is enough authority to support a focused opening move. It is not enough to win the category without concentrated commercial coverage."
            implication="This is a leverage story, not a cold-start story. Hyro does not need to manufacture relevance from zero. It needs to focus it."
          />

          <div className="space-y-4">
            <VerticalMemoCard
              eyebrow="What is working"
              title="The research passed quality checks and the category framing is usable."
              body="Hyro cleared the research quality gate with high confidence, and topical integrity passed with only 0.1% low-quality semantic demand share. That matters because it means the opportunity numbers here are anchored in validated topical scope, not noisy keyword expansion."
              bullets={[
                "High-confidence brief approval",
                "Topical integrity passed",
                "Commercial direction can be rendered publicly without blocking",
              ]}
              icon={<ShieldCheck className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="What is missing"
              title="Hyro has not yet concentrated its authority around buyer intent."
              body="The current footprint looks brand-adjacent rather than category-defining. The market has plenty of demand, but Hyro does not yet own the pages that help a customer choose between options, compare product types, or resolve specific decision criteria."
              bullets={[
                "Decision-stage pages are underbuilt relative to market opportunity",
                "Supporting coverage around ingredients, benefits, and use cases remains thin",
                "Third-party proof is not yet strong enough to reinforce commercial pages at scale",
              ]}
              icon={<Crosshair className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Commercial risk"
              title="If Hyro stays broad and generic, incumbents keep owning the deciding moments."
              body="When a category is led by strong brands like LMNT and Liquid I.V., the risk is not just lower rankings. The deeper risk is that buyers keep seeing other brands first when they ask who is best, what compares well, or what fits their specific need."
              bullets={[
                "Vendor consideration is shaped before purchase pages matter",
                "Answer surfaces amplify brands that already look well-supported",
                "Waiting gives incumbents more time to harden their position",
              ]}
              icon={<Radar className="h-5 w-5" />}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="amber">
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionLead
            takeaway="The biggest near-term upside sits in decision-stage electrolyte queries, not the whole category at once."
            body="Hyro should begin where intent is highest and choice is most visible. In the approved brief, buyer-guide demand is the clearest opening move, with validated examples like best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix."
            implication="Instead of trying to rank for every electrolyte term immediately, Hyro should first become the answer to the questions buyers ask when they are actively choosing."
          />

          <div className="space-y-4">
            <VerticalMemoCard
              eyebrow="Opening move"
              title="Lead with buyer guides and selection pages."
              body="This is the fastest commercial layer because the query language already reveals decision-making. People are not just browsing the category. They are asking what is best, what fits a need, and what they should choose."
              bullets={[
                "Validated buyer-guide demand: 211,170",
                "Expected 12-month traffic from this cluster alone: 23,229",
                "Best-for and use-case pages should launch before broad category pages",
              ]}
              icon={<Target className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Second layer"
              title="Expand into comparisons, reviews, and proof-led evaluation pages."
              body="Once Hyro owns the first decision pages, it becomes easier to widen into product comparisons, social-proof angles, and use-case evaluation pages that help buyers test alternatives and validate their choice."
              bullets={[
                "Comparison demand is smaller, but highly commercial",
                "Review-led content improves believability and buyer confidence",
                "These pages make Hyro easier to compare against better-known incumbents",
              ]}
              icon={<Trophy className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Expansion path"
              title="Broader category demand becomes much more valuable after the decision layer is built."
              body="The largest demand pool is still category-level search around electrolyte drinks, electrolyte powder, and related phrasing. But that layer should be approached after Hyro has stronger commercial pages and more external proof supporting the brand."
              bullets={[
                "Category & brand demand: 8,241,950",
                "Expected 12-month traffic from this broader layer: 167,074",
                "This is the scale layer, not the first move",
              ]}
              icon={<Compass className="h-5 w-5" />}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="mixed">
          <SectionHeader number="04" title="Why Hyro Can Win" />
          <StrategySectionLead
            takeaway="Hyro does not need to beat LMNT everywhere. It needs to become the most believable answer in a defined slice first."
            body="The approved brief is clear: Hyro already has enough authority to support a focused category move, but it has not yet used that authority to own buyer-guide and selection queries. That creates a credible right-to-win if execution stays concentrated."
            implication="A narrower, more commercial opening move gives Hyro a path to enter the market conversation faster than a diffuse category-awareness plan."
          />

          <div className="space-y-4">
            <HighlightBox>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">One strategic fact matters most</div>
              <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                92.6% of the validated demand is non-competitor and unbranded.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
                Hyro is not limited to stealing branded queries from incumbent electrolyte brands. Most of the upside sits
                in open-market demand where buyers are asking broad or need-specific questions and have not yet committed
                to a brand.
              </p>
            </HighlightBox>

            <VerticalMemoCard
              eyebrow="Right to win"
              title="Hyro already has a usable authority base."
              body="Seventy-four referring domains is not enough to dominate the category, but it is enough to support a focused campaign around a commercial slice of demand. That matters because it lowers the burden of proof required to get momentum started."
              bullets={[
                "74 referring domains",
                "366 backlinks",
                "Enough baseline authority to support a concentrated decision-page push",
              ]}
              icon={<Link2 className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Right market shape"
              title="The strongest available queries align with how people buy electrolyte products."
              body="The commercial signals in the brief are not vague informational topics. They include high-intent modifiers like sugar-free, low-sugar, pregnancy, natural ingredients, price sensitivity, and ingredient exclusions. Those are exactly the kinds of queries where a well-built commercial page can change the buying decision."
              bullets={[
                "Hyro can win on use-case specificity before broad category dominance",
                "Health-conscious modifiers create room for differentiated positioning",
                "Specific need states make commercial pages easier to trust and recommend",
              ]}
              icon={<HeartPulse className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Focused advantage"
              title="A tighter opening move is more realistic than broad category combat."
              body="Competing head-on across the entire electrolyte landscape would waste time and authority. Hyro's advantage comes from picking the most commercially valuable slice, building the best pages for it, and then surrounding those pages with enough proof that the market starts to repeat the same answer back."
              bullets={[
                "Start narrow, then widen",
                "Build around real selection behavior",
                "Use proof to increase trust, not just page count",
              ]}
              icon={<Sparkles className="h-5 w-5" />}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="blue">
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="Incumbents are winning because they occupy more decision surfaces, not because the category is closed."
            body="LMNT and Liquid I.V. are not just larger brands. They also show up more often where people compare products, ask for recommendations, and seek trusted evaluation. Hyro's job is not to outspend them everywhere. It is to build a tighter commercial footprint in the places that shape choice."
            implication="The category is competitive, but it is still structurally open to a focused brand that can build stronger decision pages and attach more believable proof."
          />

          <div className="space-y-4">
            <VerticalMemoCard
              eyebrow="What incumbents have"
              title="They already look like category defaults."
              body="LMNT, Liquid I.V., and Nuun combine broad organic reach with much deeper link profiles and more visible answer-surface presence. That creates a compounding perception advantage: buyers keep seeing the same names in more places."
              bullets={[
                "LMNT: 429,600 organic traffic and 4,642 referring domains",
                "Liquid I.V.: 456,449 organic traffic and 2,789 referring domains",
                "Nuun: 105,219 organic traffic and 4,218 referring domains",
              ]}
              icon={<BarChart3 className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="What Hyro lacks"
              title="Hyro is still too small on the pages that decide the category."
              body="The gap is not just overall traffic. It is that competitors have many more surfaces where a buyer can compare, validate, and trust them. Hyro needs more decision pages, more supporting coverage, and more third-party reinforcement if it wants to change that pattern."
              bullets={[
                "Far smaller organic footprint today",
                "Much lighter external authority profile",
                "No visible sampled answer-surface presence in the brief's commercial prompts",
              ]}
              icon={<ScanSearch className="h-5 w-5" />}
            />

            <DataTable
              headers={[
                "Brand",
                "Organic traffic",
                "Organic keywords",
                "Referring domains",
                "Backlinks",
                "Sampled prompt hits",
                "What it means",
              ]}
              rows={competitorRows}
              highlightRow={5}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="amber">
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionLead
            takeaway="In sampled unbranded prompts, Hyro is not yet being recommended."
            body="The approved brief shows zero sampled visibility for Hyro across ChatGPT, Gemini, and Google AI Overview on the tested prompt set. That does not mean Hyro is invisible everywhere. It does mean Hyro is not yet showing up where commercial recommendation behavior is already visible."
            implication="If Hyro wants to be chosen more often, it has to be easier for answer engines to find, compare, and trust across the exact questions buyers are asking."
          />

          <div className="space-y-4">
            <PlatformSignalCard
              platform="ChatGPT"
              stat="0 / 8 sampled mentions"
              body="In the brief's sampled prompt set, Hyro was not mentioned in ChatGPT on the tracked commercial prompts. LMNT and other incumbents appeared instead, especially on best-of and comparison language."
            />
            <PlatformSignalCard
              platform="Gemini"
              stat="0 / 8 sampled mentions"
              body="Gemini also showed no sampled Hyro visibility in the approved brief. One response example returned a safety-filter interruption, which is a reminder to keep platform claims cautious and specific."
            />
            <PlatformSignalCard
              platform="Google AI Overview"
              stat="0 / 8 sampled mentions"
              body="The tested Google AI Overview sample surfaced well-known brands like LMNT, Liquid I.V., Nuun, DripDrop, and others. Hyro did not appear in the tracked examples."
            />

            <PromptSignalCard
              prompt="best electrolyte powder drink mix"
              winner="LMNT, Liquid I.V., Ultima, Nuun, DripDrop"
              body="This is the exact type of decision-stage query Hyro needs to win. In the sampled responses, the answer layer defaulted to better-known brands and high-authority editorial references rather than Hyro."
              excerpt="Observed March 2026 sample: Google AI Overview named LMNT, Liquid I.V., Ultima, Nuun, DripDrop, and Skratch Labs. ChatGPT also surfaced LMNT and other well-known options, with Hyro absent."
            />

            <PromptSignalCard
              prompt="electrolyte powder drink mix comparison"
              winner="Liquid I.V., LMNT, Nuun, DripDrop, broad editorial sources"
              body="Comparison intent matters because it captures buyers who are narrowing choices, not just exploring the category. In the sampled responses, Hyro was absent while incumbent brands and editorial comparison logic shaped the answer."
              excerpt="Observed March 2026 sample: ChatGPT framed the comparison around Liquid I.V. and other incumbents. Gemini produced a comparison table featuring LMNT, Liquid I.V., Nuun Sport, and DripDrop."
            />

            <HighlightBox>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Caveat discipline</div>
              <p className="mt-3 text-sm leading-7 text-white/66">
                These AI findings are limited to the approved brief's sampled surfaces. Public claims here intentionally
                exclude unsupported platform certainty where probe coverage was incomplete. The signal is still clear:
                Hyro is not yet showing up in the commercial answer patterns that matter.
              </p>
            </HighlightBox>
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="mixed">
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionLead
            takeaway="If Hyro wins this layer, the upside is not a few rankings. It is a step change in buying consideration."
            body="The approved brief models a base-case path to 70,857 cumulative visits in the first six months and 191,505 in 12 months, with aggressive upside to 327,134. The most important part is where that growth starts: decision-stage pages and related proof surfaces that can influence buyer choice early."
            implication="High-intent category ownership improves efficient discovery, supports healthier acquisition economics, and gives Hyro a compounding channel that does not reset every quarter."
          />

          <div className="mb-6">
            <p className="max-w-3xl text-sm leading-7 text-white/64">
              Not every visit is equal. The first job here is to increase qualified visibility where people are actively
              deciding what product to choose. From there, supporting coverage and broader category pages widen reach
              without diluting the commercial core.
            </p>
          </div>

          <PhasedUpsideChart points={opportunityCurve} className="mb-6" />

          <TamRoiCalculator baseReachableVisits={191505} className="mb-6" />

          <StrategyCard>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Interpretation note</div>
            <p className="mt-3 text-sm leading-7 text-white/66">
              Estimate-only. Revenue planning requires client ACV/AOV and funnel inputs. The model on this page should
              be read as traffic and commercial-surface upside, not as a booked-revenue forecast.
            </p>
          </StrategyCard>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="amber">
          <SectionHeader number="08" title="6-month Growth Plan" />
          <StrategySectionLead
            takeaway="The first six months should build a visible decision-layer footprint, then compound it."
            body="This plan stays intentionally simple at founder altitude: Month 1 opens with the highest-intent pages, Month 2 expands comparison and proof, Month 3 deepens supporting coverage and infrastructure, and months 4–6 widen distribution while reinforcing what is already working."
            implication="The goal is not to publish randomly. It is to build a repeatable sequence that turns the first visible wins into durable market presence."
          />

          <div className="space-y-4">
            <MonthPlanBlock
              label="Month 1"
              title="Open with the buyer-guide layer."
              body="Hyro begins with the most commercially direct queries in the category. The first wave should focus on pages that help a buyer choose between electrolyte products based on fit, ingredients, sugar profile, and use case."
              bullets={[
                "Ship best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix",
                "Begin use-case pages around sugar-free, low-sugar, natural, pregnancy-related, and ingredient-filtered demand where relevant",
                "Attack the spaces where LMNT and Liquid I.V. currently shape the conversation",
                "Launch indexing, schema, canonical, sitemap, and internal-linking support alongside the first pages",
              ]}
            />

            <MonthPlanBlock
              label="Month 2"
              title="Add comparisons, reviews, and proof-led evaluation."
              body="Once the opening pages are live, Hyro expands into the pages that help a buyer compare options and validate a decision. This is where better-known competitors often keep their advantage."
              bullets={[
                "Build comparison and alternative pages against the most commercially relevant brands and product forms",
                "Create review and proof-led content that makes Hyro easier to trust in the market",
                "Start active off-site reinforcement through listicles, communities, reviews, and expert-style mentions",
                "Push backlinks toward the first commercial pages rather than diffusing authority",
              ]}
            />

            <MonthPlanBlock
              label="Month 3"
              title="Deepen supporting coverage and entity reinforcement."
              body="The third month turns the first pages into a broader content system. Hyro expands around hydration scenarios, ingredients, benefits, routines, and audience-specific needs while making the brand easier for machines to interpret consistently."
              bullets={[
                "Publish supporting coverage around benefits, ingredients, routines, and hydration scenarios",
                "Strengthen brand consistency across owned pages and third-party surfaces",
                "Improve crawl, index, schema, and visible proof alignment",
                "Identify which early pages deserve heavier reinforcement in months 4–6",
              ]}
            />

            <MonthPlanBlock
              label="Months 4–6"
              title="Compound distribution, refresh winners, and widen market share."
              body="After the first system is live, the focus shifts toward reinforcement and expansion. Hyro should look more credible in-market, easier to cite, and harder to ignore across both search and answer surfaces."
              bullets={[
                "Refresh the best-performing pages with stronger proof, clearer comparisons, and more up-to-date claims",
                "Expand external authority across editorials, newsletters, communities, listicles, and backlinks",
                "Widen into adjacent use cases and broader category entry points without losing decision-page focus",
                "Use monthly reporting to double down on what is entering real buying consideration",
              ]}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="blue">
          <SectionHeader number="09" title="Off-site Authority" />
          <StrategySectionLead
            takeaway="Hyro will not become a default recommendation through on-site publishing alone."
            body="Buyers and machines both look for external validation. The approved brief makes this explicit: review surfaces, communities, editorial mentions, listicles, backlinks, and expert-style placements are part of the main delivery scope, not a side quest."
            implication="If Hyro wants to be named more often, the market needs to see the same story repeated outside Hyro's own site."
          />

          <div className="space-y-4">
            <VerticalMemoCard
              eyebrow="Community presence"
              title="Reddit and forum participation make the brand visible where real buying conversations happen."
              body="Community threads and forum-style discussions often shape credibility long before a purchase. Hyro needs relevant participation and third-party-style mention surfaces around hydration, electrolyte use cases, product comparisons, and ingredient questions."
              bullets={[
                "Target buyer-relevant community threads and category discussions",
                "Show up where comparison and use-case questions are already happening",
                "Support decision pages with community-visible proof and references",
              ]}
              icon={<MessageSquareQuote className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Review surfaces"
              title="Review profiles and social proof should reinforce Hyro's commercial pages."
              body="Review-platform presence is not cosmetic. It improves trust, helps answer systems validate the brand, and gives buyers another proof surface when they check whether a recommendation feels credible."
              bullets={[
                "Audit and improve review-platform coverage",
                "Create an active review acquisition and response motion",
                "Reflect review proof back into Hyro's most important commercial pages",
              ]}
              icon={<Star className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Editorial and listicles"
              title="Hydration roundups, listicles, newsletters, and editorial placements should echo Hyro's strongest claims."
              body="Well-placed third-party mentions help answer systems and buyers see the brand as more than self-asserted. The initial attack surfaces in the brief include hydration roundups, comparison listicles, athlete or influencer proof, and expert commentary placements."
              bullets={[
                "Push digital PR and editorial-style mentions tied to the same commercial angles",
                "Earn inclusion in roundups where category leaders already benefit",
                "Use newsletters and professional-network distribution to extend proof beyond search",
              ]}
              icon={<Newspaper className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Backlink pressure"
              title="Backlinks should be pointed at decision pages, not sprayed across the site."
              body="The job is not just to grow a backlink count. It is to strengthen the exact pages Hyro needs buyers and answer layers to trust most. That means intentional link acquisition around the pages that influence category choice."
              bullets={[
                "Prioritize links that reinforce buyer-guide and comparison pages",
                "Use external mentions to support the pages already showing traction",
                "Treat authority as reinforcement for commercial pages, not vanity growth",
              ]}
              icon={<ArrowUpRight className="h-5 w-5" />}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="mixed">
          <SectionHeader number="10" title="What Memetik Actually Builds and Ships" />
          <StrategySectionLead
            takeaway="This is a serious execution program, not a light content retainer."
            body="Memetik does not just publish articles. The operating scope combines commercial page production, supporting coverage, off-site authority, review work, link acquisition, technical readiness, and refresh loops until the category starts to shift."
            implication="A founder should be able to look at this scope and immediately understand why the outcome is a market position, not a pile of disconnected deliverables."
          />

          <div className="space-y-4">
            <ScopeBlock
              label="Scope lane 01"
              title="Priority buying query mapping"
              body="Before scale, Hyro needs clear targeting. Memetik maps the highest-value decision queries, use-case modifiers, comparison phrases, and broad category openings that actually shape buying behavior."
              bullets={[
                "Define the first decision-stage queries to attack",
                "Rank openings by commercial intent, competition, and right-to-win",
                "Separate immediate launch terms from later category expansion terms",
              ]}
              icon={<Target className="h-5 w-5" />}
            />

            <ScopeBlock
              label="Scope lane 02"
              title="Bottom-of-funnel page production"
              body="Memetik builds as many commercial decision pages as needed to cover the relevant demand, starting with the pages that help a buyer choose, compare, and justify a purchase."
              bullets={[
                "Buyer-guide pages around best, use-case, and fit-based phrasing",
                "Best-for pages tied to sugar profile, ingredients, and audience needs",
                "Product-form and benefit pages that make the offer easier to understand and trust",
              ]}
              icon={<FileText className="h-5 w-5" />}
            />

            <ScopeBlock
              label="Scope lane 03"
              title="Comparison and evaluation content"
              body="This layer owns the moments where a buyer is already weighing options. It reduces friction between awareness and decision by giving Hyro a clear place in comparison conversations."
              bullets={[
                "Head-to-head brand comparisons where Hyro can credibly win",
                "Alternatives pages and category-capture comparisons",
                "Review-led and social-proof pages that increase buyer confidence",
              ]}
              icon={<ScaleIcon />}
            />

            <ScopeBlock
              label="Scope lane 04"
              title="Supporting content coverage"
              body="Once the core decision pages are live, Memetik expands the surrounding content network so machines repeatedly find the same commercial story across ingredients, benefits, routines, scenarios, and adjacent product questions."
              bullets={[
                "Hydration scenario pages and audience-specific use cases",
                "Ingredient, benefit, and routine coverage tied back to commercial pages",
                "Supporting pages that widen reach without diluting the core offer",
              ]}
              icon={<Database className="h-5 w-5" />}
            />

            <ScopeBlock
              label="Scope lane 05"
              title="Aggressive backlink acquisition"
              body="Memetik actively builds links into the pages Hyro needs to win, especially the decision pages and comparison assets that require stronger authority signals to compete with category leaders."
              bullets={[
                "Link acquisition pointed at buyer-guide and comparison pages",
                "Authority growth designed to improve trust, not just reporting optics",
                "External reinforcement focused on pages already showing traction or strategic importance",
              ]}
              icon={<Link2 className="h-5 w-5" />}
            />

            <ScopeBlock
              label="Scope lane 06"
              title="Digital PR, press release, and listicle pushes"
              body="Memetik expands Hyro's third-party footprint through editorial-style placements, roundup inclusion, expert commentary, press-style distribution, and publication-format content that echoes the same commercial story."
              bullets={[
                "Hydration and wellness listicles",
                "Publication-style and editorial placements",
                "Press-style distribution and commentary angles that strengthen in-market credibility",
              ]}
              icon={<Newspaper className="h-5 w-5" />}
            />

            <ScopeBlock
              label="Scope lane 07"
              title="Review-platform work and community placements"
              body="Memetik treats review profiles, community mentions, and forum participation as part of the main engine because buyers and machines both use these surfaces to validate whether a brand looks real and trusted."
              bullets={[
                "Review-platform setup, repair, and reinforcement",
                "Community and forum participation where the category is already being discussed",
                "Social-proof signals routed back into Hyro's commercial pages",
              ]}
              icon={<MessageSquareQuote className="h-5 w-5" />}
            />

            <ScopeBlock
              label="Scope lane 08"
              title="Bing, IndexNow, schema, crawl, and entity infrastructure"
              body="Visibility depends on machines being able to crawl, index, and interpret Hyro cleanly. Memetik keeps the technical and entity foundation explicit instead of assuming great content will carry everything."
              bullets={[
                "Schema matched to visible content",
                "Sitemap hygiene, crawl/index eligibility, and canonical discipline",
                "Bing Webmaster Tools, IndexNow, and brand-consistency support across owned and third-party surfaces",
              ]}
              icon={<Bot className="h-5 w-5" />}
            />

            <ScopeBlock
              label="Scope lane 09"
              title="Refresh, defense, and monthly optimization"
              body="After launch, Memetik keeps reinforcing the terms Hyro is starting to win, updates aging pages, responds to competitor movement, and widens the market footprint without letting the first wins decay."
              bullets={[
                "Monthly page refreshes and proof updates",
                "Traffic, prompt, and authority readouts tied to what actually shipped",
                "Reallocation toward the pages and query families with the clearest commercial movement",
              ]}
              icon={<RefreshCw className="h-5 w-5" />}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="amber">
          <SectionHeader number="11" title="Operating Model" />
          <StrategySectionLead
            takeaway="The first six months are the deployment window. The full year is the compounding window."
            body="Every month runs the same core motions in parallel: prioritization, page production, publishing and indexing, off-site authority, review reinforcement, and measurement. The difference over time is not whether the system runs. It is how much of the category Hyro has earned the right to cover."
            implication="Founders should expect visible monthly deployments, monthly reporting, and quarterly strategic reallocation rather than a vague evergreen retainer."
          />

          <div className="space-y-4">
            <GrowthTimelineChart points={timelinePoints} milestones={timelineMilestones} />

            <VerticalMemoCard
              eyebrow="Monthly deployment"
              title="Each month ships pages, authority, and infrastructure together."
              body="The model is intentionally concurrent. Hyro does not wait for the site to be perfect before building authority, and it does not wait for authority to improve before publishing commercial pages. Both move together, month by month."
              bullets={[
                "Research and prioritization",
                "Page production and publishing",
                "Off-site authority and review actions",
                "Measurement, refreshes, and reallocations",
              ]}
              icon={<Workflow className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Monthly reporting"
              title="Reporting should show what shipped, what moved, and what now deserves more pressure."
              body="Memetik's reporting frame should stay business-facing. The founder needs to see where visibility is increasing, which pages are earning momentum, which third-party proof surfaces are strengthening the brand, and where the next deployment should go."
              bullets={[
                "Visibility across search and answer surfaces",
                "Authority proof and work completed",
                "Prompt coverage and downstream search indicators",
                "Commercial implications for the next month's focus",
              ]}
              icon={<TrendingUp className="h-5 w-5" />}
            />

            <VerticalMemoCard
              eyebrow="Quarterly review"
              title="The strategy should refresh and consolidate rather than run on autopilot."
              body="Every quarter is an opportunity to reinforce winners, patch weak query families, tighten proof, refresh aging pages, and decide whether Hyro is ready for a broader category move or should keep pressing its current opening."
              bullets={[
                "Defended versus weak query families",
                "Refresh priorities and proof gaps",
                "Where to widen versus where to defend",
              ]}
              icon={<Compass className="h-5 w-5" />}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell className="mb-8" glow="blue">
          <SectionHeader number="12" title="Why Memetik" />
          <StrategySectionLead
            takeaway="Memetik is built for default recommendation visibility, not just rankings."
            body="Most SEO programs still behave like click-capture retainers. Memetik builds the broader market system a founder actually needs now: decision pages, supporting coverage, off-site authority, review reinforcement, technical readiness, and a monthly deployment model that can reshape category perception over time."
            implication="For Hyro, that means a partner built to influence buying consideration across both classic search and answer-driven discovery."
          />

          <div className="space-y-4">
            {whyMemetikBullets.map((item) => (
              <VerticalMemoCard
                key={item.title}
                eyebrow={item.eyebrow}
                title={item.title}
                body={item.body}
                icon={item.icon}
              />
            ))}

            <HighlightBox>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Bottom line</div>
              <p className="mt-3 text-xl font-display font-semibold tracking-tight text-white md:text-2xl">
                Hyro does not need more random content. It needs a concentrated market position that gets repeated across
                the pages buyers read and the sources buyers trust.
              </p>
            </HighlightBox>
          </div>
        </StrategySectionShell>

        <StrategyCTA
          title="Book a Strategy Call"
          body="If you want to turn Hyro's existing relevance into real category ownership across search and answer-driven discovery, Memetik can map the opening move, build the decision layer, and reinforce it until the market starts repeating the same answer."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <StrategySectionShell className="mt-16" glow="mixed">
          <SectionHeader number="13" title="Supporting Evidence" />
          <StrategySectionLead
            takeaway="Below the fold is the evidence layer behind the memo."
            body="The main narrative is intentionally founder-readable. The appendix keeps the supporting details visible: competitor evidence, opportunity clusters, commercial keyword signals, prompt samples, and the confidence rules that shaped the page."
          />

          <StrategyAppendixSection
            defaultOpen
            title="Competitor evidence snapshot"
            description="Compact comparison of Hyro's current footprint against the brands shaping the category today."
            className="mb-4"
          >
            <DataTable
              headers={[
                "Brand",
                "Organic traffic",
                "Keywords",
                "Referring domains",
                "Backlinks",
                "Sampled prompt hits",
                "Interpretation",
              ]}
              rows={[
                [
                  "LMNT",
                  "429,600",
                  "34,009",
                  "4,642",
                  "150,912",
                  "7",
                  "Category leader with the strongest blended authority and answer visibility in the brief sample.",
                ],
                [
                  "Liquid I.V.",
                  "456,449",
                  "14,724",
                  "2,789",
                  "44,257",
                  "7",
                  "Strong commercial footprint and recurring presence on recommendation-style surfaces.",
                ],
                [
                  "Hydralyte",
                  "4,169",
                  "1,276",
                  "586",
                  "1,842",
                  "0",
                  "Smaller organic footprint and no sampled answer-surface momentum in the brief.",
                ],
                [
                  "Nuun",
                  "105,219",
                  "19,880",
                  "4,218",
                  "77,141",
                  "6",
                  "Longstanding category credibility and broad informational coverage.",
                ],
                [
                  "DripDrop",
                  "161,926",
                  "14,368",
                  "1,846",
                  "9,454",
                  "2",
                  "Commercial strength around dehydration and recovery-style demand.",
                ],
                [
                  <span className="text-white">Hyro</span>,
                  <span className="text-white">1,004</span>,
                  <span className="text-white">362</span>,
                  <span className="text-white">74</span>,
                  <span className="text-white">366</span>,
                  <span className="text-white">0</span>,
                  <span className="text-white">
                    Usable starting relevance, but not yet a concentrated decision-stage footprint.
                  </span>,
                ],
              ]}
              highlightRow={5}
            />
          </StrategyAppendixSection>

          <StrategyAppendixSection
            title="Opportunity clusters and commercial keyword evidence"
            description="The approved opening move comes from the highest-intent cluster, then expands into comparison, proof, and broader category demand."
            className="mb-4"
          >
            <DataTable
              className="mb-5"
              headers={[
                "Cluster",
                "Initial timing",
                "Validated demand",
                "Expected traffic in 12 months",
                "Sample queries",
                "Why it matters",
              ]}
              rows={opportunityClusterRows}
            />

            <div className="mt-6">
              <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                Commercial signal keywords already on the board
              </div>
              <DataTable
                headers={["Keyword", "Current position", "Volume", "Interpretation"]}
                rows={commercialSignalRows}
              />
            </div>
          </StrategyAppendixSection>

          <StrategyAppendixSection
            title="Prompt evidence sample"
            description="Public-safe excerpting from the approved brief's sampled answer-surface evidence. This section stays specific and intentionally avoids unsupported platform claims."
            className="mb-4"
          >
            <div className="space-y-4">
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  Prompt: best electrolyte powder drink mix
                </div>
                <p className="mt-3 text-sm leading-7 text-white/66">
                  ChatGPT sample: Hyro absent. The response surfaced brands like LMNT and other widely recognized
                  electrolyte products instead. This matters because the prompt is a direct product-selection question.
                </p>
              </StrategyCard>

              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  Prompt: best electrolyte powder drink mix
                </div>
                <p className="mt-3 text-sm leading-7 text-white/66">
                  Google AI Overview sample: Hyro absent. The observed response named LMNT, Liquid I.V., Ultima,
                  Nuun, DripDrop, and Skratch Labs while citing third-party editorial sources. This is a clear signal
                  that editorial and roundup authority remain important in this category.
                </p>
              </StrategyCard>

              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  Prompt: electrolyte powder drink mix comparison
                </div>
                <p className="mt-3 text-sm leading-7 text-white/66">
                  ChatGPT and Gemini samples: Hyro absent. The responses leaned on familiar incumbents and general
                  comparison logic, reinforcing why Hyro needs stronger comparison pages plus external proof around the
                  same commercial angles.
                </p>
              </StrategyCard>
            </div>
          </StrategyAppendixSection>

          <StrategyAppendixSection
            title="Assumptions, confidence, and caveats"
            description="The page is based on the approved brief, not raw research inputs, and preserves the confidence constraints attached to that brief."
          >
            <BulletList
              items={[
                "Canonical lineage used for this page: master reference → generation contract → approved brief → page.",
                "Research mode in the brief: strict. Payload confidence: high. Quality gate: passed.",
                "Topical integrity passed, with low-quality semantic demand share reported at 0.1%, so headline opportunity claims stay inside validated scope.",
                "Perplexity probe coverage and one live mention endpoint were incomplete in the brief, so this page avoids unsupported platform certainty and keeps AI visibility claims softened to sampled surfaces only.",
                "Revenue planning requires client ACV/AOV and funnel inputs. The calculator is a planning tool, not a revenue promise.",
                "Source trace: approved Hyro strategy brief checked 2026-03-09, with research generated 2026-03-08.",
              ]}
            />
          </StrategyAppendixSection>
        </StrategySectionShell>
      </StrategyPageFrame>
    </>
  );
}

function ScaleIcon() {
  return <Activity className="h-5 w-5" />;
}