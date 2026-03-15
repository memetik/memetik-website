import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Nav } from "@/components/Nav";
import {
  SectionHeader,
  HighlightBox,
  BulletList,
  DataTable,
  PhasedUpsideChart,
  GrowthTimelineChart,
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyCTA,
  StrategySectionLead,
  StrategyAppendixSection,
} from "@/components/strategy";
import {
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Compass,
  Eye,
  FileText,
  Gauge,
  Globe,
  Layers3,
  Link2,
  MessageSquare,
  Newspaper,
  Radar,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const totalSearchOpportunity = 14845730;
const expectedTraffic12Months = 310568;
const aggressiveUpside = 538574;
const firstSixMonthTarget = 114910;

const competitorKeywordDemand = 350910;
const unbrandedDemand = 14494820;
const competitorKeywordTraffic12Months = 7703;
const unbrandedTraffic12Months = 302865;
const competitorKeywordTraffic6Months = 2850;
const unbrandedTraffic6Months = 112060;

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/28 outline-none transition focus:border-white/20 focus:bg-white/[0.05]";

function formatWhole(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? Math.round(value) : 0
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function sanitizeDecimalInput(raw: string, maxDecimals = 2) {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [intPart = "", decimalPart = ""] = cleaned.split(".");
  if (cleaned.includes(".")) {
    return `${intPart}.${decimalPart.slice(0, maxDecimals)}`;
  }
  return intPart;
}

function parseNumber(raw: string) {
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

function ExecutiveMetricCard({
  icon,
  label,
  value,
  note,
  breakdown,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  note: string;
  breakdown: { label: string; value: string; note?: string }[];
}) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
          <div className="mt-3 break-words text-[clamp(2.2rem,6vw,4rem)] font-display font-extrabold leading-[0.92] tracking-tight text-white">
            {value}
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">{note}</p>
        </div>
      </div>

      <div className="mt-5 rounded-[22px] border border-white/10 bg-black/20 p-4">
        <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Keyword attribution</div>
        <div className="space-y-3">
          {breakdown.map((item) => (
            <div key={`${label}-${item.label}`} className="rounded-[18px] border border-white/8 bg-white/[0.03] px-3 py-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="text-sm text-white/60">{item.label}</div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
              {item.note ? <div className="mt-2 text-xs leading-6 text-white/42">{item.note}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </StrategyCard>
  );
}

function ImmediateActionCard({
  number,
  title,
  detail,
}: {
  number: string;
  title: string;
  detail: string;
}) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-white/62">{detail}</p>
        </div>
      </div>
    </StrategyCard>
  );
}

function StackCard({
  label,
  title,
  icon,
  children,
  glow,
}: {
  label: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  glow?: "blue" | "amber" | "mixed";
}) {
  return (
    <StrategyCard glow={glow}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
          {icon}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-white/64">{children}</div>
    </StrategyCard>
  );
}

function PlatformStatusCard({
  platform,
  status,
  detail,
}: {
  platform: string;
  status: string;
  detail: string;
}) {
  return (
    <StrategyCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Validated sample</div>
          <div className="mt-2 text-lg font-semibold text-white">{platform}</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
          {status}
        </div>
      </div>
      <p className="mt-3 text-sm leading-7 text-white/62">{detail}</p>
    </StrategyCard>
  );
}

function PromptObservationCard({
  platform,
  market,
  prompt,
  observed,
}: {
  platform: string;
  market: string;
  prompt: string;
  observed: string;
}) {
  return (
    <StrategyCard>
      <div className="flex flex-wrap gap-2">
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
          {platform}
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">
          {market}
        </div>
      </div>
      <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Prompt</div>
      <div className="mt-2 text-sm font-semibold text-white">{prompt}</div>
      <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Observed answer pattern</div>
      <p className="mt-2 text-sm leading-7 text-white/62">{observed}</p>
    </StrategyCard>
  );
}

function MonthBlock({
  label,
  title,
  bullets,
}: {
  label: string;
  title: string;
  bullets: string[];
}) {
  return (
    <StrategyCard glow="blue">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{label}</div>
      <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">{title}</h3>
      <div className="mt-5">
        <BulletList items={bullets} />
      </div>
    </StrategyCard>
  );
}

function ScopeBlock({
  label,
  title,
  icon,
  bullets,
}: {
  label: string;
  title: string;
  icon: ReactNode;
  bullets: string[];
}) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
          <div className="mt-4">
            <BulletList items={bullets} />
          </div>
        </div>
      </div>
    </StrategyCard>
  );
}

function CommercialImpactCalculator({ baseVisits }: { baseVisits: number }) {
  const [ltvInput, setLtvInput] = useState("");
  const [visitRateInput, setVisitRateInput] = useState("1");

  const result = useMemo(() => {
    const ltv = parseNumber(ltvInput);
    const visitRate = parseNumber(visitRateInput) / 100;
    const estimatedCustomers = baseVisits * visitRate;
    const revenuePotential = estimatedCustomers * ltv;

    return {
      ltv,
      visitRate,
      estimatedCustomers,
      revenuePotential,
    };
  }, [baseVisits, ltvInput, visitRateInput]);

  return (
    <StrategyCard glow="mixed">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Estimate-only</div>
          <h3 className="mt-2 text-xl font-semibold text-white">Traffic to revenue calculator</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">
          Expected traffic in 12 months: {formatWhole(baseVisits)}
        </div>
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">
        This is a founder planning tool, not a forecast guarantee. Plug in XoomAI&apos;s own customer value and visit-to-customer rate to translate the traffic plan into commercial potential.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Customer LTV</span>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={ltvInput}
              onChange={(e) => setLtvInput(sanitizeDecimalInput(e.target.value, 0))}
              className={`${inputClass} pl-8`}
              placeholder="2500"
            />
          </div>
        </label>

        <label className="block space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Visit → Customer rate</span>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={visitRateInput}
              onChange={(e) => setVisitRateInput(sanitizeDecimalInput(e.target.value, 2))}
              className={`${inputClass} pr-8`}
              placeholder="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35">%</span>
          </div>
        </label>
      </div>

      <div className="mt-6 space-y-3">
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Expected traffic in 12 months</div>
          <div className="mt-2 text-2xl font-display font-bold text-white">{formatWhole(baseVisits)}</div>
        </div>
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Estimated customers</div>
          <div className="mt-2 text-2xl font-display font-bold text-white">{formatWhole(result.estimatedCustomers)}</div>
        </div>
        <div className="rounded-[22px] border border-[#f4e4cd]/20 bg-[#f4e4cd]/8 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Revenue potential</div>
          <div className="mt-2 text-2xl font-display font-bold text-white">{formatCurrency(result.revenuePotential)}</div>
        </div>
      </div>

      <p className="mt-5 text-xs leading-6 text-white/45">
        Formula: estimated customers = expected traffic in 12 months × visit-to-customer rate; revenue potential = estimated customers × LTV.
        Revenue planning requires client ACV/AOV and funnel inputs.
      </p>
    </StrategyCard>
  );
}

const executiveMetrics = [
  {
    label: "Total search opportunity",
    value: formatWhole(totalSearchOpportunity),
    note:
      "Validated topical demand across the category space XoomAI can realistically grow into across AU and US, after filtering out weak semantic noise.",
    icon: <Search className="h-5 w-5" />,
    breakdown: [
      {
        label: "Competitor-keyword demand",
        value: `${formatWhole(competitorKeywordDemand)} (2.4%)`,
      },
      {
        label: "Non-competitor / unbranded demand",
        value: `${formatWhole(unbrandedDemand)} (97.6%)`,
      },
    ],
  },
  {
    label: "Expected traffic in 12 months",
    value: formatWhole(expectedTraffic12Months),
    note:
      "Base-case planning outcome if XoomAI wins the first decision-stage cluster, reinforces it with authority, and keeps expanding into broader category demand.",
    icon: <TrendingUp className="h-5 w-5" />,
    breakdown: [
      {
        label: "Competitor-keyword expected traffic",
        value: formatWhole(competitorKeywordTraffic12Months),
      },
      {
        label: "Non-competitor / unbranded expected traffic",
        value: formatWhole(unbrandedTraffic12Months),
      },
    ],
  },
  {
    label: "Aggressive upside",
    value: formatWhole(aggressiveUpside),
    note:
      "Upper-range planning case if early buyer-guide wins become sticky, authority compounds, and XoomAI expands cleanly from the opening move into the wider market.",
    icon: <Sparkles className="h-5 w-5" />,
    breakdown: [
      {
        label: "Demand mix driving the upside",
        value: "2.4% competitor-keyword share",
      },
      {
        label: "Where most upside sits",
        value: "97.6% non-competitor / unbranded demand",
        note: "The biggest upside is not trapped inside rival brand terms. It comes from open-market research queries.",
      },
    ],
  },
  {
    label: "First 6-month target",
    value: formatWhole(firstSixMonthTarget),
    note:
      "Early traction comes from decision-stage demand first, then supporting coverage, distribution, and technical reinforcement around the pages that start to move.",
    icon: <Target className="h-5 w-5" />,
    breakdown: [
      {
        label: "Competitor-keyword 6-month target",
        value: formatWhole(competitorKeywordTraffic6Months),
      },
      {
        label: "Non-competitor / unbranded 6-month target",
        value: formatWhole(unbrandedTraffic6Months),
      },
    ],
  },
];

const immediateActions = [
  {
    number: "01",
    title: "Own the decision stage first",
    detail:
      "Start with buyer-guide and evaluation queries where buyers are choosing tools, providers, and approaches now: AI tools, best AI, best AI for coding, AI workflow automation tools, and AI workflow tools.",
  },
  {
    number: "02",
    title: "Attach third-party proof to every core page",
    detail:
      "Do not publish a page and hope. Every important page needs matching review-platform work, community presence, comparison listicles, editorial mentions, and direct backlinks so the market hears the same story beyond the website.",
  },
  {
    number: "03",
    title: "Expand, measure, and defend",
    detail:
      "Once the first pages start to move, widen the supporting coverage, reinforce entity consistency and indexing, then keep refreshing the winners until XoomAI becomes a default option in the category conversation.",
  },
];

const upsidePoints = [
  { month: 1, low: 800, base: 2800, high: 4500 },
  { month: 2, low: 3500, base: 9400, high: 14000 },
  { month: 3, low: 9000, base: 18500, high: 28000 },
  { month: 4, low: 18000, base: 35000, high: 54000 },
  { month: 5, low: 32000, base: 63000, high: 96000 },
  { month: 6, low: 50000, base: 114910, high: 140000 },
  { month: 7, low: 73000, base: 146000, high: 205000 },
  { month: 8, low: 94000, base: 182000, high: 275000 },
  { month: 9, low: 112000, base: 218000, high: 350000 },
  { month: 10, low: 131000, base: 252000, high: 420000 },
  { month: 11, low: 145000, base: 282000, high: 480000 },
  { month: 12, low: 157465, base: 310568, high: 538574 },
];

const timelinePoints = [
  {
    month: 1,
    title: "Map the opening move and publish the first decision pages",
    detail:
      "Month 1 establishes the first commercial territory: the buyer-guide cluster around AI tools, best AI, best AI for coding, and workflow automation terms that signal active evaluation.",
    bullets: [
      "Prioritize the first commercial prompt set for Australian business buyers.",
      "Publish the first decision pages and buyer guides.",
      "Set up schema, sitemap hygiene, canonicals, Bing Webmaster Tools, and IndexNow.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 2800,
    low: 800,
    base: 2800,
    high: 4500,
  },
  {
    month: 2,
    title: "Expand into comparisons and visible trust surfaces",
    detail:
      "Month 2 adds comparison pressure and third-party reinforcement so XoomAI is not relying on self-published claims alone.",
    bullets: [
      "Launch head-to-head and evaluation pages around early commercial themes.",
      "Strengthen review-platform presence and profile consistency.",
      "Start community placement, listicle outreach, and the first editorial/backlink pushes.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 9400,
    low: 3500,
    base: 9400,
    high: 14000,
  },
  {
    month: 3,
    title: "Deepen supporting coverage and entity reinforcement",
    detail:
      "Month 3 broadens the surrounding content network so answer engines and search systems keep finding the same commercial story in more contexts.",
    bullets: [
      "Ship supporting use-case, buyer-context, and pricing-support pages.",
      "Improve internal linking and visible proof objects across the core pages.",
      "Re-test answer surfaces and tighten pages that underperform.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 18500,
    low: 9000,
    base: 18500,
    high: 28000,
  },
  {
    month: 4,
    title: "Turn first winners into category anchors",
    detail:
      "Month 4 shifts from first-wave launch to reinforcement. Pages that begin to win get refreshed, linked harder, and supported with more proof.",
    bullets: [
      "Refresh early winners with stronger comparisons and evidence.",
      "Widen community and professional-network distribution.",
      "Push more backlinks directly into the pages that are gaining traction.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 35000,
    low: 18000,
    base: 35000,
    high: 54000,
  },
  {
    month: 5,
    title: "Add proof-heavy commercial assets",
    detail:
      "Month 5 broadens the commercial surface area with pricing, implementation, and benefit-proof content that helps buyers move from curiosity to confidence.",
    bullets: [
      "Publish pricing-support and selection-guidance content.",
      "Add case-evidence style proof where available.",
      "Continue editorial, listicle, and backlink reinforcement.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 63000,
    low: 32000,
    base: 63000,
    high: 96000,
  },
  {
    month: 6,
    title: "Establish the first meaningful market footprint",
    detail:
      "By Month 6, XoomAI should no longer look invisible. The first cluster is live, supported, and being defended while the next layer of opportunity opens.",
    bullets: [
      "Reach the first 6-month target in the approved brief.",
      "Refresh winning pages rather than just adding net new volume.",
      "Use reporting to decide which themes deserve heavier expansion next.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 114910,
    low: 50000,
    base: 114910,
    high: 140000,
  },
  {
    month: 7,
    title: "Scale from opening move into adjacent commercial angles",
    detail:
      "After the first footprint is established, XoomAI can widen into adjacent use cases, provider comparisons, and more nuanced workflow automation research themes.",
    bullets: [
      "Expand decision pages around winning subtopics.",
      "Keep review velocity and off-site reinforcement active.",
      "Patch any pages or prompts that still look generic or unsupported.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 146000,
    low: 73000,
    base: 146000,
    high: 205000,
  },
  {
    month: 8,
    title: "Increase density around use cases and buyer contexts",
    detail:
      "Month 8 is about retrieval density and buyer-fit clarity: more use cases, more context pages, and more ways for machines and buyers to understand XoomAI’s positioning.",
    bullets: [
      "Add more use-case and persona-adjacent support pages.",
      "Reinforce internal pathways into the top commercial pages.",
      "Keep authority-building pointed at the best-converting themes.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 182000,
    low: 94000,
    base: 182000,
    high: 275000,
  },
  {
    month: 9,
    title: "Begin the broader category expansion",
    detail:
      "Only after the first decision-stage territory is anchored does it make sense to push harder into broader category and brand demand.",
    bullets: [
      "Expand outward from buyer-guide wins into broader AI category capture.",
      "Maintain commercial pages as the authority center of the site.",
      "Keep third-party proof synchronized with the broader push.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 218000,
    low: 112000,
    base: 218000,
    high: 350000,
  },
  {
    month: 10,
    title: "Reinforce owned territory as the market notices",
    detail:
      "Month 10 focuses on defense. As more of the market becomes visible, it becomes more important to protect the themes XoomAI has already begun to own.",
    bullets: [
      "Refresh pages where new competitors or generic tools start appearing.",
      "Strengthen review and editorial proof on the most visible surfaces.",
      "Keep indexing, structured data, and entity consistency clean.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 252000,
    low: 131000,
    base: 252000,
    high: 420000,
  },
  {
    month: 11,
    title: "Consolidate authority across owned and third-party surfaces",
    detail:
      "By Month 11, the program should feel less like a launch and more like a moat: the same XoomAI story is visible in multiple places buyers trust.",
    bullets: [
      "Continue backlink pressure into the strongest commercial pages.",
      "Keep community, listicle, and editorial coverage active.",
      "Use reporting to close the final soft spots before year-end expansion.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 282000,
    low: 145000,
    base: 282000,
    high: 480000,
  },
  {
    month: 12,
    title: "Finish year one with a defended category position",
    detail:
      "Month 12 is the point where XoomAI should have visible, defensible market presence across its first important buying questions, plus a clear next-wave expansion path.",
    bullets: [
      "Reach the approved-brief base case of 310,568 expected visits in 12 months.",
      "Protect the best-performing decision pages with ongoing refresh and authority reinforcement.",
      "Plan the next year around adjacent categories, new proof assets, and defended commercial territory.",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 310568,
    low: 157465,
    base: 310568,
    high: 538574,
  },
];

const timelineMilestones = [
  {
    label: "Milestone 1",
    month: 1,
    title: "First commercial territory defined",
    detail:
      "XoomAI begins with the decision-stage query set, the first buyer-guide pages, and the infrastructure needed to make those assets crawlable, indexable, and machine-readable.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 2800,
  },
  {
    label: "Milestone 2",
    month: 2,
    title: "Comparison and trust layer turns on",
    detail:
      "The first core pages are now supported by comparisons, review-profile reinforcement, community visibility, and third-party distribution rather than sitting alone on the site.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 9400,
  },
  {
    label: "Milestone 3",
    month: 3,
    title: "Support network and entity clarity deepen",
    detail:
      "Supporting coverage expands around use cases, pricing context, and proof objects so both buyers and answer systems see a denser, more coherent story.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 18500,
  },
  {
    label: "Milestone 4",
    month: 6,
    title: "First visible market footprint established",
    detail:
      "By the end of Month 6, XoomAI should have a live, reinforced set of commercial pages with distribution, reviews, backlinks, and measurable visibility movement around them.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 114910,
  },
  {
    label: "Milestone 5",
    month: 9,
    title: "Expansion into broader category demand begins",
    detail:
      "With the first buying-query cluster established, the program can push beyond the opening move into broader category capture without losing commercial focus.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 218000,
  },
  {
    label: "Milestone 6",
    month: 12,
    title: "Year-one category position becomes defensible",
    detail:
      "The first year ends with owned commercial pages, a support network around them, third-party proof, and a refresh loop that makes the position harder to displace.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 310568,
  },
];

export default function StrategyXoomai() {
  useEffect(() => {
    document.title = "XoomAI Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">
        <StrategyHero
          eyebrow="Memetik founder strategy memo"
          title="XoomAI can own AI workflow automation"
          subtitle="The fastest opening move is not broad AI awareness. It is decision-stage demand around managed AI employees, AI tools, and workflow automation research for Australian businesses—then expanding that visibility across Google, ChatGPT, Gemini, and the rest of the answer layer."
          tags={["xoomai.com.au", "AI Consultancy", "AU + US", "Managed AI Employee & Workflow Automation"]}
        >
          <StrategyCard glow="mixed">
            <SectionHeader
              number="00"
              title="Executive Summary"
              eyebrow="Founder-readable snapshot"
              subtitle="These topline numbers come from the approved brief’s validated topical subset. The recommendation is simple: own the decision stage first, reinforce it aggressively off-site, then expand into the broader category."
            />

            <div className="space-y-4">
              {executiveMetrics.map((metric) => (
                <ExecutiveMetricCard
                  key={metric.label}
                  icon={metric.icon}
                  label={metric.label}
                  value={metric.value}
                  note={metric.note}
                  breakdown={metric.breakdown}
                />
              ))}
            </div>

            <div className="mt-8 border-t border-white/8 pt-6">
              <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Immediate actions</div>
              <div className="space-y-4">
                {immediateActions.map((action) => (
                  <ImmediateActionCard key={action.number} {...action} />
                ))}
              </div>
            </div>
          </StrategyCard>
        </StrategyHero>

        <StrategySectionShell>
          <SectionHeader
            number="01"
            title="State of Search 2026"
            eyebrow="Why this matters now"
            subtitle="Google still drives a major share of discovery and commercial research. AI answer engines are changing how buyers narrow options, not replacing classic search outright. XoomAI needs visibility in both."
          />
          <StrategySectionLead
            takeaway="The strategic shift is not from search to AI. It is from isolated rankings to owning the same commercial story wherever buyers research."
            body="Traditional search remains a core buying behavior, especially when a company is being researched, compared, and validated. At the same time, buyers are now asking answer engines direct selection questions before they ever speak to sales."
            implication="If XoomAI only thinks in terms of Google rankings, it misses the moments where buyers ask who to trust, what tool to use, and which option fits their business best."
          />

          <div className="space-y-4">
            <StackCard
              label="Search behavior"
              title="Google still sets the commercial agenda"
              icon={<Search className="h-5 w-5" />}
              glow="blue"
            >
              Traditional search still carries a major share of discovery and evaluation. Buyers still use Google to compare providers,
              check proof, evaluate pricing clarity, and confirm whether a company looks credible enough to contact.
            </StackCard>

            <StackCard
              label="Answer engines"
              title="AI now shapes buying consideration before analytics sees the session"
              icon={<Bot className="h-5 w-5" />}
            >
              Buyers move across Google, ChatGPT, Gemini, Perplexity, and other answer layers asking direct questions about the best tools,
              the right vendors, and the right implementation path. That changes who gets considered long before a form fill appears.
            </StackCard>

            <StackCard
              label="What wins"
              title="The moat comes from consistency across both layers"
              icon={<Globe className="h-5 w-5" />}
            >
              Winning brands do not tell one story on their website and disappear everywhere else. They show up in classic search,
              answer-engine responses, review platforms, editorial mentions, communities, and other third-party proof surfaces with the same clear commercial narrative.
            </StackCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="02"
            title="Where XoomAI Is Today"
            eyebrow="Current state snapshot"
            subtitle="The opportunity is large, but XoomAI starts from a near-zero discoverability base in organic search and sampled answer-surface visibility."
          />
          <StrategySectionLead
            takeaway="Today the market is open, but XoomAI is effectively invisible inside it."
            body="The company has category fit, but it has not yet translated that into visible commercial pages, indexed trust surfaces, or answer-engine reinforcement. That creates risk in the short term, but it also means the upside is not capped by small incremental gains."
            implication="This is less about improving an existing growth channel and more about building one."
          />

          <div className="space-y-4">
            <StackCard
              label="Baseline"
              title="Search visibility is at zero"
              icon={<Gauge className="h-5 w-5" />}
              glow="amber"
            >
              <BulletList
                items={[
                  "Current organic traffic: 0",
                  "Current organic keywords: 0",
                  "Referring domains: 0",
                  "Backlinks: 0",
                ]}
              />
            </StackCard>

            <StackCard
              label="Commercial coverage"
              title="The decision-stage layer is not built yet"
              icon={<FileText className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  "No ranked commercial keywords were found in the brief.",
                  "There is no visible concentration of buyer-guide pages around AI tools, workflow automation, or managed AI employee selection intent.",
                  "That means XoomAI is not yet a normal choice when buyers compare options in search or answer engines.",
                ]}
              />
            </StackCard>

            <StackCard
              label="Signal quality"
              title="The demand model is clean enough to act on"
              icon={<Shield className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  "Research quality gate passed with high confidence.",
                  "Topical integrity passed with low-quality semantic demand share at 0.0%.",
                  "This strategy is grounded in validated demand, not inflated by noisy keyword expansion.",
                ]}
              />
            </StackCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="03"
            title="The Opportunity"
            eyebrow="Opening move"
            subtitle="XoomAI should not try to win the entire AI category from day one. The highest-leverage move is narrower, more commercial, and easier to defend."
          />
          <StrategySectionLead
            takeaway="Start with buyer guides and decision-stage research, not generic AI awareness."
            body="The fastest commercial path is to become visible where buyers are choosing tools, approaches, and providers. That means owning the pages and answers tied to evaluation intent first, then broadening into larger category demand after the first cluster is established."
            implication="Broad AI demand is massive, but it is not the smartest first fight."
          />

          <div className="space-y-4">
            <HighlightBox title="Recommended opening move">
              <p className="text-xl font-display font-semibold tracking-tight text-white">
                Lead with the buyer-guide layer for managed AI employee and workflow automation demand aimed at Australian businesses.
              </p>
              <p className="text-sm leading-7 text-white/66">
                In the approved brief, the strongest early cluster is buyer-guide intent. That is where category selection and provider evaluation
                are clearest, and where XoomAI can start shaping commercial consideration fastest.
              </p>
            </HighlightBox>

            <StackCard
              label="Phase 1 demand"
              title="Buyer guides are the fastest commercial wedge"
              icon={<Target className="h-5 w-5" />}
              glow="blue"
            >
              <BulletList
                items={[
                  `Validated demand: ${formatWhole(140740)}`,
                  `Expected traffic in 12 months: ${formatWhole(15463)}`,
                  "First pages to ship: ai tools, best ai, best ai for coding, ai workflow automation tools, ai workflow tools",
                ]}
              />
            </StackCard>

            <StackCard
              label="Support layer"
              title="Pricing and educational coverage should reinforce the main pages"
              icon={<Layers3 className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  `Pricing & cost demand: ${formatWhole(1040)} with ${formatWhole(114)} expected traffic in 12 months`,
                  `Education & awareness demand: ${formatWhole(83200)} with ${formatWhole(1673)} expected traffic in 12 months`,
                  "These pages help explain fit, reduce buyer hesitation, and create more internal and external reinforcement around the core decision pages.",
                ]}
              />
            </StackCard>

            <StackCard
              label="Later expansion"
              title="Broader category demand comes after the first cluster wins"
              icon={<Compass className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  `Category & brand demand: ${formatWhole(14620210)}`,
                  `Expected traffic in 12 months from that layer: ${formatWhole(293261)}`,
                  "That broader demand is worth pursuing, but only after XoomAI has a live, reinforced commercial base to expand from.",
                ]}
              />
            </StackCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="04"
            title="Why XoomAI Can Win"
            eyebrow="Right to win"
            subtitle="The first win condition is not brand scale. It is whether XoomAI can become the clearest answer in a defined commercial slice of the market."
          />
          <StrategySectionLead
            takeaway="XoomAI can win because the first profitable layer is commercially specific, not broad and vague."
            body="The approved brief does not recommend starting with huge generic category terms. It recommends starting where buyers are evaluating options, where the language is more specific, and where execution quality matters more than raw market size."
            implication="That makes this a positioning-and-execution problem, not just a budget problem."
          />

          <div className="space-y-4">
            <StackCard
              label="Commercial clarity"
              title="The opening move matches real buyer behavior"
              icon={<Building2 className="h-5 w-5" />}
              glow="blue"
            >
              XoomAI is not being asked to invent a new category. The first pages map directly to existing buying research: best AI, AI tools,
              workflow automation tools, use-case selection, and the questions buyers ask when deciding how to bring AI into operations.
            </StackCard>

            <StackCard
              label="Demand structure"
              title="Most of the upside is unbranded"
              icon={<TrendingUp className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  `Non-competitor / unbranded demand represents ${formatWhole(unbrandedDemand)} of the ${formatWhole(totalSearchOpportunity)} total.`,
                  "That means XoomAI is not forced to rely on intercepting another company’s brand traffic to grow.",
                  "The bigger opportunity is becoming visible when buyers ask open-market questions.",
                ]}
              />
            </StackCard>

            <StackCard
              label="Execution advantage"
              title="A tighter local frame is more winnable than broad AI sprawl"
              icon={<Radar className="h-5 w-5" />}
            >
              Starting with managed AI employee and workflow automation research for Australian businesses gives XoomAI a clearer commercial frame,
              sharper page strategy, and more believable proof path than trying to dominate the word “AI” from day one.
            </StackCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="05"
            title="Competitive Gap"
            eyebrow="What the market looks like now"
            subtitle="XoomAI is not competing against one neat peer set. It is competing against a combination of specialist consultancies and very large ecosystem players that already occupy visible search territory."
          />
          <StrategySectionLead
            takeaway="XoomAI is not losing because the market is unwinnable. It is losing because others already have indexed surface area and XoomAI does not."
            body="Some competitors are huge and structural. Others are smaller, but still have enough content, authority, and visibility to look like obvious options in the market. XoomAI needs to close the discoverability gap before it can change consideration."
            implication="The first win is not beating everyone everywhere. It is beating the market’s current default surfaces in one defined slice first."
          />

          <div className="space-y-4">
            <HighlightBox title="Founder view">
              <p className="text-xl font-display font-semibold tracking-tight text-white">
                The gap is not that competitors are universally strong. The gap is that they already have something buyers can find.
              </p>
              <p className="text-sm leading-7 text-white/66">
                Even modest incumbents with a few hundred referring domains and a few hundred ranked keywords look more credible than a company
                with no indexed decision-stage surface at all.
              </p>
            </HighlightBox>

            <StackCard
              label="Authority gravity"
              title="The top end of the market is massive"
              icon={<BarChart3 className="h-5 w-5" />}
              glow="amber"
            >
              <BulletList
                items={[
                  `Azure AI Consulting Australia: ${formatWhole(173201094)} organic traffic`,
                  `${formatWhole(7001834)} organic keywords`,
                  `${formatWhole(3161996)} referring domains and ${formatWhole(864347185)} backlinks`,
                ]}
              />
            </StackCard>

            <StackCard
              label="Specialist pressure"
              title="Smaller consultancies still look more established than XoomAI"
              icon={<Building2 className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  `Appenate AI Consulting: ${formatWhole(488)} keywords, ${formatWhole(396)} referring domains, ${formatWhole(1338)} backlinks`,
                  `Inventium AI Consulting: ${formatWhole(116)} keywords, ${formatWhole(499)} referring domains, ${formatWhole(2305)} backlinks`,
                  `Custom D: ${formatWhole(24)} keywords, ${formatWhole(258)} referring domains, ${formatWhole(2992)} backlinks`,
                ]}
              />
            </StackCard>

            <StackCard
              label="XoomAI gap"
              title="Today XoomAI has no visible answer to that footprint"
              icon={<Eye className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  "0 organic traffic",
                  "0 organic keywords",
                  "0 referring domains",
                  "0 backlinks",
                  "No ranked commercial page set visible in the approved brief",
                ]}
              />
            </StackCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="06"
            title="AI Visibility Gap"
            eyebrow="Answer-surface diagnosis"
            subtitle="On sampled commercial prompts, XoomAI is not showing up yet. Generic tools, larger platforms, and broader AI brands are absorbing the answers buyers see."
          />
          <StrategySectionLead
            takeaway="Right now, answer engines do not recommend XoomAI for the category questions that matter."
            body="The public evidence here is limited to validated sampled surfaces in the approved brief. Where additional probes were unavailable or timed out, this page intentionally omits them rather than pretending to have certainty."
            implication="The fix is not 'do more AI SEO.' The fix is better decision pages, stronger proof, and broader third-party reinforcement around them."
          />

          <div className="space-y-4">
            <PlatformStatusCard
              platform="ChatGPT"
              status="0 / 16 mention rate"
              detail="Across the sampled prompt set in the approved brief, XoomAI was not mentioned. That means the company is not yet part of the answer set buyers encounter inside ChatGPT for the tested commercial prompts."
            />
            <PlatformStatusCard
              platform="Gemini"
              status="0 / 16 mention rate"
              detail="Gemini showed the same pattern: category-aligned responses, but no XoomAI mention. Buyers asking generic selection questions are being routed toward other brands and tools."
            />
            <PlatformStatusCard
              platform="Google AI Overview"
              status="0 / 16 mention rate"
              detail="Google AI Overviews were detected in the sampling, but XoomAI was not cited. That is especially important because Google still anchors a large share of commercial research behavior."
            />
          </div>

          <div className="mt-6 space-y-4">
            <PromptObservationCard
              platform="ChatGPT"
              market="US"
              prompt="best managed ai employee and workflow automation"
              observed="The sampled response leaned toward GPT-based agents, Perplexity AI, and Claude-style assistants. XoomAI did not appear, which means generic AI brands are currently filling the recommendation space."
            />
            <PromptObservationCard
              platform="ChatGPT"
              market="AU"
              prompt="best managed ai employee and workflow automation"
              observed="The sampled response shifted toward tools like Zapier and UiPath. That tells us the market is being interpreted as software selection first, not as a managed service category that XoomAI could own."
            />
            <PromptObservationCard
              platform="Gemini"
              market="AU"
              prompt="best managed ai employee and workflow automation"
              observed="Gemini’s sampled answer highlighted AI employee platforms such as Lindy AI and Devin-style products. Again, XoomAI was absent, and the category was framed around product defaults rather than a managed consultancy option."
            />
          </div>

          <HighlightBox className="mt-6" title="Caveat discipline" tone="warning">
            <p className="text-sm leading-7 text-white/68">
              Additional platform probes in the research payload returned errors or timeouts, including missing mention endpoints and a failed
              Perplexity probe. Publicly, the strategy only uses validated ChatGPT, Gemini, and Google AI Overview observations.
            </p>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="07"
            title="Revenue / Commercial Impact"
            eyebrow="Commercial upside"
            subtitle="This is not about chasing vanity traffic. It is about turning XoomAI from invisible into considered across a meaningful slice of commercial demand."
          />
          <StrategySectionLead
            takeaway="If XoomAI turns invisibility into category presence, search and answer-surface visibility become a real demand-capture channel."
            body="The opportunity matters commercially because the market is large, mostly unbranded, and currently under-owned by XoomAI. The question is not whether there is enough demand. The question is whether XoomAI can become a normal option while buyers are still researching."
            implication="That creates leverage against paid dependency, improves how often XoomAI makes the initial consideration set, and compounds into a harder-to-copy market position over time."
          />

          <StrategyCard glow="mixed">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What the numbers mean</div>
            <div className="mt-4">
              <BulletList
                items={[
                  `The approved brief models ${formatWhole(firstSixMonthTarget)} visits in the first 6 months and ${formatWhole(expectedTraffic12Months)} in 12 months on the base case.`,
                  `The upside case reaches ${formatWhole(aggressiveUpside)}, which matters because most of the opportunity sits in non-competitor / unbranded demand rather than rival brand names.`,
                  "Commercially, this means XoomAI can build a durable organic and answer-surface acquisition channel instead of renting all consideration through paid channels or outbound alone.",
                ]}
              />
            </div>
          </StrategyCard>

          <div className="mt-6">
            <PhasedUpsideChart points={upsidePoints} />
          </div>

          <div className="mt-6">
            <CommercialImpactCalculator baseVisits={expectedTraffic12Months} />
          </div>

          <HighlightBox className="mt-6" title="Estimate-only" tone="warning">
            <p className="text-sm leading-7 text-white/68">
              The traffic curve is cumulative and aligned to the approved brief’s visible 12-month base case. Revenue planning requires client
              ACV/AOV and funnel inputs. Until those first-party numbers are provided, the right founder read is traffic and market-share
              potential, not committed revenue forecasting.
            </p>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="08"
            title="6-month Growth Plan"
            eyebrow="What ships first"
            subtitle="The program starts with the first commercial territory, then compounds through reinforcement, supporting coverage, and broader distribution."
          />
          <StrategySectionLead
            takeaway="The first six months are about making XoomAI visible in buying moments, then reinforcing the early winners until the market starts to shift."
            body="This plan preserves the real execution engine from the approved brief: Month 1, Month 2, Month 3, and Months 4–6 each have clear outputs, but the work compounds because production, authority, indexing, and measurement keep running together."
            implication="Founders should read this as a deployment plan, not a vague promise to 'do content.'"
          />

          <div className="space-y-4">
            <MonthBlock
              label="Month 1"
              title="Define the opening move and ship the first decision pages"
              bullets={[
                "Prioritize the first commercial query set around AI tools, best AI, best AI for coding, AI workflow automation tools, and AI workflow tools.",
                "Publish the first buyer-guide, use-case, and product-form pages aimed at Australian business buyers.",
                "Set up schema, sitemap hygiene, canonicals, Bing Webmaster Tools, IndexNow, and baseline entity consistency.",
                "Define the first comparison pressure against Appenate AI Consulting, Inventium AI Consulting, and Custom D-style consultancy alternatives.",
              ]}
            />

            <MonthBlock
              label="Month 2"
              title="Expand comparisons, reviews, and off-site proof"
              bullets={[
                "Add head-to-head and evaluation pages around the highest-intent terms from Month 1.",
                "Strengthen review-platform presence and profile consistency so third-party proof starts supporting the owned pages.",
                "Push community participation, comparison listicles, expert commentary, and the first editorial placements.",
                "Begin direct backlink acquisition into the early commercial winners rather than spreading links randomly.",
              ]}
            />

            <MonthBlock
              label="Month 3"
              title="Deepen supporting coverage and tighten the commercial narrative"
              bullets={[
                "Publish supporting pages around adjacent use cases, buyer context, pricing support, and proof objects.",
                "Improve internal linking so supporting pages feed authority into the main decision pages.",
                "Re-test sampled prompts and search surfaces to see which claims need stronger proof or clearer differentiation.",
                "Reinforce author, about, profile, and entity consistency across owned and third-party surfaces.",
              ]}
            />

            <MonthBlock
              label="Months 4–6"
              title="Scale the winners and widen the market footprint"
              bullets={[
                "Build as many bottom-of-funnel and comparison pages as needed to cover the demand that proves worth owning.",
                "Refresh the pages that start to win instead of only adding net-new volume.",
                "Expand off-site authority through reviews, communities, listicles, editorials, newsletters, and more backlinks to the strongest commercial pages.",
                "Move from the opening Australian-business frame into broader category demand only after the first cluster has visible traction.",
              ]}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="09"
            title="Off-site Authority"
            eyebrow="Third-party trust"
            subtitle="XoomAI will not become a default recommendation by publishing pages alone. The market needs to hear the same story about the company away from xoomai.com.au."
          />
          <StrategySectionLead
            takeaway="Third-party proof is part of the core strategy, not an optional add-on."
            body="Reviews, communities, listicles, editorials, and backlinks all matter because answer engines and buyers both look for external confirmation that a company is credible. Without that layer, on-site pages are easier to ignore."
            implication="This is how XoomAI stops looking like a self-asserted expert and starts looking like a category option the market already recognizes."
          />

          <div className="space-y-4">
            <StackCard
              label="Reviews"
              title="Review-platform presence needs to support the sales story"
              icon={<CheckCircle2 className="h-5 w-5" />}
              glow="blue"
            >
              <BulletList
                items={[
                  "Repair or strengthen review profiles where relevant.",
                  "Make service descriptions, categories, and proof consistent with the core commercial pages.",
                  "Use reviews as belief reinforcement, not as an afterthought.",
                ]}
              />
            </StackCard>

            <StackCard
              label="Communities"
              title="Community and forum participation makes the brand discoverable outside the site"
              icon={<MessageSquare className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  "Participate in Reddit and equivalent discussion surfaces where AI workflow and automation decisions are being discussed.",
                  "Use community placements to reinforce practical authority and category fit.",
                  "Feed those trust signals back into the main decision pages with clear narrative consistency.",
                ]}
              />
            </StackCard>

            <StackCard
              label="Distribution"
              title="Listicles, newsletters, and publication-style placements widen consideration"
              icon={<Newspaper className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  "Push comparison listicles and publication-style mentions that align with the buying queries XoomAI is targeting.",
                  "Use professional-network and newsletter distribution to spread the same core message beyond search results.",
                  "Turn off-site placements into repeated proof rather than isolated mentions.",
                ]}
              />
            </StackCard>

            <StackCard
              label="Backlinks and editorial"
              title="Aggressive backlink acquisition and editorial mentions reinforce the winners"
              icon={<Link2 className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  "Point backlinks directly into the commercial pages that matter most.",
                  "Use digital PR, expert commentary, and editorial placements to increase trust and retrievability.",
                  "Treat authority building as a continuous operating track, not a late-stage add-on.",
                ]}
              />
            </StackCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="10"
            title="What Memetik Actually Builds and Ships"
            eyebrow="Scope of execution"
            subtitle="This is a serious category-capture program. It combines on-site production, off-site authority, infrastructure, and refresh loops into one operating system."
          />
          <StrategySectionLead
            takeaway="Founders should read this as growth infrastructure, not a light content retainer."
            body="Memetik does not stop at writing pages. The program maps the buying questions, builds the pages that answer them, reinforces them with third-party trust, keeps the infrastructure clean, and refreshes the winners until the market starts to move."
            implication="The output is a visible market footprint that compounds, not a stack of disconnected deliverables."
          />

          <div className="space-y-4">
            <ScopeBlock
              label="Planning layer"
              title="Priority buying query mapping"
              icon={<Radar className="h-5 w-5" />}
              bullets={[
                "Map the highest-value commercial query set first.",
                "Sequence which themes XoomAI should own now versus later.",
                "Tie each priority theme to one clear commercial story and one owned destination.",
              ]}
            />

            <ScopeBlock
              label="Owned assets"
              title="Bottom-of-funnel page production"
              icon={<FileText className="h-5 w-5" />}
              bullets={[
                "Build as many buyer-guide, best-for, use-case, and commercial decision pages as needed to cover the demand that matters.",
                "Create pages aimed at real selection behavior, not generic blog publishing.",
                "Write them to be useful for both buyers and machine retrieval.",
              ]}
            />

            <ScopeBlock
              label="Evaluation layer"
              title="Comparison, pricing, and evaluation content"
              icon={<Target className="h-5 w-5" />}
              bullets={[
                "Ship head-to-head comparison pages and alternative pages.",
                "Add pricing-support and decision-clarity pages where they reduce buying friction.",
                "Support every major claim with visible proof, not empty positioning.",
              ]}
            />

            <ScopeBlock
              label="Supporting coverage"
              title="A wider content network around the winners"
              icon={<Layers3 className="h-5 w-5" />}
              bullets={[
                "Expand into adjacent use cases, buyer contexts, proof objects, and related commercial questions.",
                "Use supporting pages to strengthen internal linking and retrieval density around the main money pages.",
                "Keep the commercial pages as the center of gravity rather than burying them under generic content.",
              ]}
            />

            <ScopeBlock
              label="Authority engine"
              title="Reviews, communities, listicles, editorials, and backlinks"
              icon={<MessageSquare className="h-5 w-5" />}
              bullets={[
                "Review-platform work to strengthen visible trust surfaces.",
                "Community/forum participation where real buyers and operators discuss tools and providers.",
                "Listicle pushes, digital PR, editorial placements, and aggressive backlink acquisition into the most important pages.",
              ]}
            />

            <ScopeBlock
              label="Infrastructure"
              title="Bing, IndexNow, schema, canonicals, and entity consistency"
              icon={<Gauge className="h-5 w-5" />}
              bullets={[
                "Set up or tighten crawl and index eligibility.",
                "Match structured data to visible content instead of decorative markup.",
                "Keep sitemap hygiene, canonicals, author/about/profile signals, and entity consistency clean across owned and third-party surfaces.",
              ]}
            />

            <ScopeBlock
              label="Defense loop"
              title="Measurement, refresh, and competitive response"
              icon={<TrendingUp className="h-5 w-5" />}
              bullets={[
                "Re-test commercial prompts and monitor movement.",
                "Refresh pages that soften or get copied.",
                "Double down on the themes that start to produce visible traction and buyer relevance.",
              ]}
            />
          </div>

          <HighlightBox className="mt-6" title="Bottom line">
            <p className="text-xl font-display font-semibold tracking-tight text-white">
              Memetik delivers both on-site production and off-site authority building.
            </p>
            <p className="text-sm leading-7 text-white/66">
              That is why the engagement looks bigger than a content package. It is designed to change how the market discovers, validates,
              and recommends XoomAI over time.
            </p>
          </HighlightBox>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="11"
            title="Operating Model"
            eyebrow="How the program compounds"
            subtitle="The strategy runs as monthly deployments with concurrent workstreams. What ships each month builds on what shipped before."
          />
          <StrategySectionLead
            takeaway="The program compounds because multiple reinforcing layers move together every month."
            body="Research, production, indexing, authority building, and measurement all run at the same time. That is what turns the first pages into a market footprint instead of a one-time launch."
            implication="XoomAI does not wait a quarter for value. It gets visible deployments every month, then those deployments are reinforced and defended."
          />

          <GrowthTimelineChart points={timelinePoints} milestones={timelineMilestones} />

          <div className="mt-6 space-y-4">
            <StackCard
              label="Monthly deployment model"
              title="What runs every month"
              icon={<Compass className="h-5 w-5" />}
              glow="blue"
            >
              <BulletList
                items={[
                  "Research and prioritization around the next most important commercial themes.",
                  "Page production across decision pages, comparisons, and supporting coverage.",
                  "Publishing, indexing, structured-data, and internal-linking reinforcement.",
                  "Off-site authority actions across reviews, communities, newsletters, listicles, editorials, and backlinks.",
                  "Measurement, prompt re-testing, and decisions about what to refresh, expand, or de-prioritize next.",
                ]}
              />
            </StackCard>

            <StackCard
              label="Reporting"
              title="How founders know the program is working"
              icon={<BarChart3 className="h-5 w-5" />}
            >
              <BulletList
                items={[
                  "Monthly reporting on visibility movement, authority proof, and shipped work.",
                  "Commercial readouts that connect page production and authority activity to market presence.",
                  "Quarterly reviews that decide what to defend, what to consolidate, and where the next expansion wave should go.",
                ]}
              />
            </StackCard>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader
            number="12"
            title="Why Memetik"
            eyebrow="Why this approach fits"
            subtitle="XoomAI does not need generic SEO theater. It needs a firm that understands how search, answer engines, and third-party proof now work together in commercial discovery."
          />
          <StrategySectionLead
            takeaway="Memetik is built to turn a company into the answer buyers hear first, not just another site trying to rank."
            body="That matters for XoomAI because the opportunity is not only to get traffic. It is to become a credible default option in the category conversation. That takes more than page publishing and more than technical cleanup."
            implication="The real advantage is the integrated system: strategy, production, authority, infrastructure, and reinforcement in one line of motion."
          />

          <div className="space-y-4">
            <HighlightBox title="Why founders buy Memetik">
              <p className="text-xl font-display font-semibold tracking-tight text-white">
                We optimize for default recommendation, not vanity rankings alone.
              </p>
              <p className="text-sm leading-7 text-white/66">
                That changes how the work is scoped, how the program is measured, and why off-site trust is treated as core execution rather
                than optional amplification.
              </p>
            </HighlightBox>

            <StackCard
              label="Commercial focus"
              title="We start where buying decisions happen"
              icon={<Target className="h-5 w-5" />}
              glow="blue"
            >
              The strategy begins with the queries and prompts that shape vendor choice, then expands outward. That keeps the first wave tied
              to real business leverage instead of generalized awareness for its own sake.
            </StackCard>

            <StackCard
              label="Integrated execution"
              title="We build the owned surfaces and the trust layer around them"
              icon={<Globe className="h-5 w-5" />}
            >
              Memetik handles the decision pages, supporting coverage, reviews, communities, listicles, editorial pushes, backlinks, and the
              technical/entity foundation needed to make the whole system believable and discoverable.
            </StackCard>

            <StackCard
              label="Visible accountability"
              title="Founders can see what ships and how the market changes"
              icon={<Sparkles className="h-5 w-5" />}
            >
              The program stays founder-readable: clear monthly deployments, visible outputs, visible reinforcement, and clear reporting on
              whether XoomAI is becoming more present in the category or not.
            </StackCard>
          </div>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Book Strategy Call"
          title="If you want XoomAI to become the answer buyers see first"
          body="Memetik will help turn this from a strategy memo into a live category-capture program across search, answer engines, and third-party trust surfaces."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <StrategySectionShell>
          <SectionHeader
            number="13"
            title="Supporting Evidence"
            eyebrow="Appendix"
            subtitle="The main memo above is the recommendation. The sections below show the evidence that supports it without turning the primary page into a research dump."
          />
          <StrategySectionLead
            takeaway="Everything on this page flows from the approved XoomAI brief."
            body="The canonical lineage for this page is preserved: master reference → generation contract → approved brief → page. Public claims below are limited to the approved brief’s validated evidence and explicit caveats."
          />

          <div className="space-y-4">
            <StrategyAppendixSection
              defaultOpen
              title="Validated opportunity clusters"
              description="Selected cluster evidence from the approved brief, trimmed to relevant examples only."
            >
              <DataTable
                headers={[
                  "Cluster",
                  "Intent",
                  "When it matters",
                  "Validated demand",
                  "Expected traffic in 12 months",
                  "Selected examples",
                ]}
                rows={[
                  [
                    "Category & Brand Demand",
                    "Broader category demand",
                    "Months 9–12",
                    formatWhole(14620210),
                    formatWhole(293261),
                    "ai, microsoft ai, conversational ai",
                  ],
                  [
                    "Buyer Guides",
                    "Decision-stage",
                    "Months 0–3",
                    formatWhole(140740),
                    formatWhole(15463),
                    "ai tools, best ai, best ai for coding, ai workflow automation tools",
                  ],
                  [
                    "Education & Awareness",
                    "Support / explain",
                    "Months 9–12",
                    formatWhole(83200),
                    formatWhole(1673),
                    "what is ai workflow, what is ai workflow automation, what is ai agent workflow",
                  ],
                  [
                    "Pricing & Cost",
                    "Decision support",
                    "Months 0–3",
                    formatWhole(1040),
                    formatWhole(114),
                    "consultant pricing strategy, ai assistant pricing, ai agent pricing",
                  ],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Competitor benchmark snapshot"
              description="The competitive picture that informs the gap narrative in the main memo."
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
                rows={[
                  [
                    "Tribeca Digital",
                    formatWhole(0),
                    formatWhole(0),
                    formatWhole(0),
                    formatWhole(0),
                    formatWhole(0),
                  ],
                  [
                    "Appenate AI Consulting",
                    formatWhole(326),
                    formatWhole(488),
                    formatWhole(396),
                    formatWhole(1338),
                    formatWhole(0),
                  ],
                  [
                    "Inventium AI Consulting",
                    formatWhole(374),
                    formatWhole(116),
                    formatWhole(499),
                    formatWhole(2305),
                    formatWhole(0),
                  ],
                  [
                    "Azure AI Consulting Australia",
                    formatWhole(173201094),
                    formatWhole(7001834),
                    formatWhole(3161996),
                    formatWhole(864347185),
                    formatWhole(0),
                  ],
                  [
                    "Custom D",
                    formatWhole(346),
                    formatWhole(24),
                    formatWhole(258),
                    formatWhole(2992),
                    formatWhole(0),
                  ],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Sample answer-engine observations"
              description="Public-safe excerpts from the validated prompt evidence used in the AI visibility section."
            >
              <DataTable
                headers={["Platform", "Market", "Prompt", "Observed answer pattern", "XoomAI present?"]}
                rows={[
                  [
                    "ChatGPT",
                    "US",
                    "best managed ai employee and workflow automation",
                    "Response leaned toward GPT-based agents, Perplexity AI, and Claude-style assistants.",
                    "No",
                  ],
                  [
                    "ChatGPT",
                    "AU",
                    "best managed ai employee and workflow automation",
                    "Response leaned toward workflow tools such as Zapier and UiPath.",
                    "No",
                  ],
                  [
                    "Gemini",
                    "AU",
                    "best managed ai employee and workflow automation",
                    "Response emphasized AI employee platforms such as Lindy AI and Devin-style products.",
                    "No",
                  ],
                  [
                    "Google AI Overview",
                    "US",
                    "best managed ai employee and workflow automation",
                    "AI Overview detected in search results, but no visible XoomAI mention in the approved sample.",
                    "No",
                  ],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Attribution, assumptions, and caveats"
              description="The commercial read on the model, plus the caveats founders should keep in mind."
            >
              <div className="space-y-4">
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Keyword attribution summary</div>
                  <div className="mt-4">
                    <BulletList
                      items={[
                        `${formatWhole(competitorKeywordDemand)} of total validated demand is competitor-keyword demand (2.4%).`,
                        `${formatWhole(unbrandedDemand)} of total validated demand is non-competitor / unbranded demand (97.6%).`,
                        `${formatWhole(competitorKeywordTraffic12Months)} of the 12-month base case comes from competitor-keyword demand versus ${formatWhole(unbrandedTraffic12Months)} from non-competitor / unbranded demand.`,
                        `${formatWhole(competitorKeywordTraffic6Months)} of the first 6-month target comes from competitor-keyword demand versus ${formatWhole(unbrandedTraffic6Months)} from non-competitor / unbranded demand.`,
                      ]}
                    />
                  </div>
                </StrategyCard>

                <HighlightBox title="Founder caveats" tone="warning">
                  <BulletList
                    items={[
                      "Estimate-only: traffic planning is modeled from the approved brief’s validated demand and execution assumptions.",
                      "Revenue planning requires client ACV/AOV and funnel inputs.",
                      "Topical integrity passed, and the strategy avoids weak or low-quality semantic expansion in headline claims.",
                      "Some additional platform probes were unavailable or errored, so public AI-visibility claims are intentionally limited to validated sampled surfaces only.",
                    ]}
                  />
                </HighlightBox>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Source trace and lineage"
              description="Compact public trace for how this page was generated."
            >
              <BulletList
                items={[
                  "Canonical lineage preserved: master reference → generation contract → approved brief → page.",
                  "Approved brief date: 2026-03-14.",
                  "The public page uses validated search opportunity, traffic planning, competitor evidence, and sampled answer-engine observations from the approved brief.",
                  "Where evidence was weak, stale, or unavailable, the page softened or omitted the claim instead of upgrading certainty.",
                ]}
              />
            </StrategyAppendixSection>
          </div>
        </StrategySectionShell>
      </div>
    </StrategyPageFrame>
  );
}