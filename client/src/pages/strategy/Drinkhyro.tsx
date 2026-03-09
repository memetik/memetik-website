import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Nav } from "@/components/Nav";
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
} from "@/components/strategy";
import {
  Activity,
  BadgeCheck,
  BarChart3,
  Bot,
  Compass,
  FileText,
  Globe,
  Link2,
  MessageSquare,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

function formatNumber(value: number) {
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
  if (cleaned.includes(".")) return `${intPart}.${decimalPart.slice(0, maxDecimals)}`;
  return intPart;
}

type BreakdownItem = {
  label: string;
  value: string;
};

function ExecutiveMetricCard({
  label,
  value,
  summary,
  breakdownLabel,
  breakdown,
  breakdownNote,
}: {
  label: string;
  value: string;
  summary: string;
  breakdownLabel: string;
  breakdown: BreakdownItem[];
  breakdownNote?: string;
}) {
  return (
    <StrategyCard glow="mixed">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">{label}</div>
      <div className="mt-3 break-words text-[clamp(2.2rem,4.6vw,4rem)] font-display font-extrabold leading-[0.92] tracking-tight text-white">
        {value}
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/66">{summary}</p>

      <div className="mt-5 rounded-[22px] border border-white/10 bg-black/20 p-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{breakdownLabel}</div>
        <div className="mt-3 space-y-2">
          {breakdown.map((item) => (
            <div key={`${label}-${item.label}`} className="flex flex-col gap-1 rounded-[16px] border border-white/8 bg-white/[0.03] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-white/58">{item.label}</div>
              <div className="text-sm font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>
        {breakdownNote ? <p className="mt-3 text-sm leading-6 text-white/56">{breakdownNote}</p> : null}
      </div>
    </StrategyCard>
  );
}

function ImmediateActionCard({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <StrategyCard glow="blue">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
          Immediate action
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          {index}
        </div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
    </StrategyCard>
  );
}

function StackCard({
  eyebrow,
  icon,
  title,
  body,
  bullets,
  footer,
}: {
  eyebrow: string;
  icon?: ReactNode;
  title: string;
  body: string;
  bullets?: string[];
  footer?: string;
}) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-[#f4e4cd]">
            {icon}
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{eyebrow}</div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
          {bullets?.length ? <div className="mt-4"><BulletList items={bullets} /></div> : null}
          {footer ? <div className="mt-4 rounded-[18px] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-white/62">{footer}</div> : null}
        </div>
      </div>
    </StrategyCard>
  );
}

function MonthPlanCard({
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
    <StrategyCard glow="mixed">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">{label}</div>
      <h3 className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
      <div className="mt-4">
        <BulletList items={bullets} />
      </div>
    </StrategyCard>
  );
}

function PlatformStatusCard({
  platform,
  rate,
  title,
  body,
  icon,
}: {
  platform: string;
  rate: string;
  title: string;
  body: string;
  icon: ReactNode;
}) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-[#f4e4cd]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{platform}</div>
            <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
              {rate}
            </div>
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
        </div>
      </div>
    </StrategyCard>
  );
}

function PromptEvidenceCard({
  platform,
  query,
  winners,
  implication,
}: {
  platform: string;
  query: string;
  winners: string;
  implication: string;
}) {
  return (
    <StrategyCard>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{platform}</div>
      <h3 className="mt-2 text-lg font-semibold text-white">{query}</h3>
      <div className="mt-4 rounded-[18px] border border-white/10 bg-black/20 p-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Current visible winners</div>
        <p className="mt-2 text-sm leading-7 text-white">{winners}</p>
      </div>
      <p className="mt-4 text-sm leading-7 text-white/66">{implication}</p>
    </StrategyCard>
  );
}

function CommercialImpactCalculator({
  baseTraffic,
}: {
  baseTraffic: number;
}) {
  const [aovInput, setAovInput] = useState("");
  const [conversionInput, setConversionInput] = useState("");

  const result = useMemo(() => {
    const aov = Number(aovInput || 0);
    const conversionRate = Number(conversionInput || 0) / 100;
    const estimatedCustomers = baseTraffic * conversionRate;
    const revenuePotential = estimatedCustomers * aov;

    return {
      aov,
      conversionRate,
      estimatedCustomers,
      revenuePotential,
    };
  }, [aovInput, baseTraffic, conversionInput]);

  return (
    <StrategyCard className="mt-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Commercial impact calculator</div>
          <h3 className="mt-2 text-2xl font-display font-bold tracking-tight text-white">Turn the traffic plan into a revenue planning range</h3>
        </div>
        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
          founder planning tool
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Average order value / customer value</span>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={aovInput}
              onChange={(e) => setAovInput(sanitizeDecimalInput(e.target.value, 0))}
              placeholder="150"
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-8 pr-4 text-white outline-none transition focus:border-white/20 focus:bg-white/[0.05] placeholder:text-white/28"
            />
          </div>
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">Visit to customer rate</span>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={conversionInput}
              onChange={(e) => setConversionInput(sanitizeDecimalInput(e.target.value, 2))}
              placeholder="1.5"
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-4 pr-8 text-white outline-none transition focus:border-white/20 focus:bg-white/[0.05] placeholder:text-white/28"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35">%</span>
          </div>
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Expected traffic in 12 months</div>
          <div className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{formatNumber(baseTraffic)}</div>
        </div>
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Estimated customers</div>
          <div className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{formatNumber(result.estimatedCustomers)}</div>
        </div>
        <div className="rounded-[22px] border border-[#f4e4cd]/20 bg-[#f4e4cd]/8 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Revenue potential</div>
          <div className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{formatCurrency(result.revenuePotential)}</div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/58">
        This calculator is intentionally simple: expected traffic × visit-to-customer rate × order value.
        It helps a founder pressure-test upside quickly before plugging in first-party store, repeat-purchase, and retention data.
      </p>
    </StrategyCard>
  );
}

const totalSearchOpportunity = 8_464_050;
const expectedTraffic12Months = 191_505;
const aggressiveUpside = 327_134;
const firstSixMonthTarget = 70_857;
const currentOrganicTraffic = 1_004;
const currentOrganicKeywords = 362;
const currentReferringDomains = 74;
const currentBacklinks = 366;
const lowTwelveMonthCase = 99_308;

const executiveMetrics = [
  {
    label: "Total search opportunity",
    value: formatNumber(totalSearchOpportunity),
    summary:
      "Validated electrolyte category demand in the US. The underlying research passed topical integrity, so Hyro is not being pointed at noisy or low-quality keyword expansion.",
    breakdownLabel: "Demand split",
    breakdown: [
      { label: "Competitor-keyword demand", value: "629,440 (7.4%)" },
      { label: "Non-competitor / unbranded demand", value: "7,834,610 (92.6%)" },
    ],
  },
  {
    label: "Expected traffic in 12 months",
    value: formatNumber(expectedTraffic12Months),
    summary:
      "Base-case upside if Hyro owns the first decision-stage buying pages, reinforces them off-site, and expands broader category coverage behind the initial wins.",
    breakdownLabel: "12-month traffic mix",
    breakdown: [
      { label: "Competitor-keyword traffic", value: "13,798" },
      { label: "Non-competitor / unbranded traffic", value: "177,707" },
    ],
  },
  {
    label: "Aggressive upside",
    value: formatNumber(aggressiveUpside),
    summary:
      "Upper-range outcome if Hyro gains traction early, compounds authority faster, and converts first-wave decision pages into wider category ownership.",
    breakdownLabel: "Where the upside lives",
    breakdown: [
      { label: "Competitor-keyword demand", value: "629,440 (7.4%)" },
      { label: "Non-competitor / unbranded demand", value: "7,834,610 (92.6%)" },
    ],
    breakdownNote:
      "The bigger prize is not stealing a small slice of rival brand demand. It is showing up when buyers ask broad, unbranded questions about what electrolyte product to choose.",
  },
  {
    label: "First 6-month target",
    value: formatNumber(firstSixMonthTarget),
    summary:
      "A realistic first-half outcome if the opening move is executed cleanly and paired with authority building instead of standalone publishing.",
    breakdownLabel: "6-month traffic mix",
    breakdown: [
      { label: "Competitor-keyword traffic", value: "5,105" },
      { label: "Non-competitor / unbranded traffic", value: "65,752" },
    ],
  },
];

const immediateActions = [
  {
    index: "01",
    title: "Own the first buying questions",
    body:
      "Start with the highest-intent pages around best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix.",
  },
  {
    index: "02",
    title: "Attach off-site proof to every important page",
    body:
      "Every serious page should be reinforced through reviews, community placements, roundups, editorial mentions, and backlinks so Hyro becomes more believable across search and AI surfaces.",
  },
  {
    index: "03",
    title: "Expand beyond the first winners",
    body:
      "Once the first decision pages gain traction, widen into use-case pages, comparisons, ingredient proof, and broader category coverage so the market keeps retrieving the same Hyro story.",
  },
];

const marketShiftCards = [
  {
    eyebrow: "Search still matters",
    icon: <Search className="h-5 w-5" />,
    title: "Google is still the center of product discovery",
    body:
      "For consumer health categories like electrolyte drink mix, Google remains a major source of product research, comparison behavior, and purchase-intent traffic. That is still where a large share of the market starts looking.",
  },
  {
    eyebrow: "AI now shapes selection",
    icon: <Bot className="h-5 w-5" />,
    title: "Buyers are deciding earlier inside answer engines",
    body:
      "More buyers now ask ChatGPT, Gemini, and Google AI Overviews what to choose before they ever click through to a site. The buying decision is moving upstream into the answer itself.",
  },
  {
    eyebrow: "The new standard",
    icon: <Globe className="h-5 w-5" />,
    title: "Winning brands need visibility across both layers",
    body:
      "The brand that earns trust across classic search, AI answers, reviews, editorials, and communities becomes easier to recommend and harder to displace. That matters directly to CAC efficiency and long-term defensibility.",
  },
];

const currentStateCards = [
  {
    eyebrow: "Current visibility",
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Hyro has room to grow fast",
    body: `Hyro is operating with ${formatNumber(currentOrganicTraffic)} current organic visits and ${formatNumber(
      currentOrganicKeywords
    )} ranking keywords against ${formatNumber(totalSearchOpportunity)} validated category demand.`,
    bullets: [
      "The market is large enough to matter commercially.",
      "Hyro's current visibility is still small relative to the category.",
      "That gap creates upside if the opening move is focused.",
    ],
  },
  {
    eyebrow: "Existing foundation",
    icon: <Link2 className="h-5 w-5" />,
    title: "The authority base is usable",
    body: `Hyro already has ${formatNumber(currentReferringDomains)} referring domains and ${formatNumber(
      currentBacklinks
    )} backlinks. That is not category leadership, but it is enough to support a concentrated push around high-intent pages.`,
    bullets: [
      "Hyro is not starting from zero.",
      "A focused content and authority program has something to build on.",
      "That makes the first 6 months more about concentration than about basic setup alone.",
    ],
  },
  {
    eyebrow: "The gap",
    icon: <Compass className="h-5 w-5" />,
    title: "The site is not yet organized around buying consideration",
    body:
      "Hyro has category relevance, but it has not yet turned that into a clear layer of decision pages, comparison assets, proof pages, and third-party reinforcement around electrolyte selection queries.",
    bullets: [
      "No sampled visibility in ChatGPT, Gemini, or Google AI Overviews for the tested prompts.",
      "No concentrated decision-page layer around the strongest buyer-guide terms.",
      "Limited third-party proof and retrieval repetition compared with category leaders.",
    ],
  },
];

const opportunityBlocks = [
  {
    eyebrow: "Phase 1 / immediate",
    title: "Buyer guides",
    body: `The fastest commercial opening sits in the buyer-guide cluster: ${formatNumber(
      211_170
    )} validated demand and ${formatNumber(23_229)} expected traffic in 12 months.`,
    footer: "This is where buyers ask what is best, what fits their use case, and what to choose now.",
    bullets: [
      "best electrolyte drink",
      "best electrolyte powder",
      "best hydration powder",
      "best electrolyte mix",
      "best electrolyte drink mix",
    ],
  },
  {
    eyebrow: "Phase 1 / immediate",
    title: "Comparisons and alternatives",
    body: `Comparison behavior adds another ${formatNumber(
      7_210
    )} validated demand and helps Hyro enter direct evaluation moments where buyers compare forms, brands, and use cases.`,
    footer: "These pages capture buyers who are already narrowing options.",
    bullets: [
      "electrolyte powder drink mix comparison",
      "electrolyte powder vs tablets",
      "pedialyte vs electrolyte powder",
      "liquid iv vs gatorade",
    ],
  },
  {
    eyebrow: "Phase 1 / immediate",
    title: "Reviews and proof",
    body: `Review-style demand is smaller at ${formatNumber(
      3_720
    )}, but it plays an outsized role in making claims believable inside both search and answer surfaces.`,
    footer: "Proof pages and review reinforcement help Hyro look credible, not just present.",
    bullets: [
      "review profiles and responses",
      "expert and athlete proof",
      "ingredient and benefit substantiation",
      "third-party roundups and review placements",
    ],
  },
  {
    eyebrow: "Phase 3 / expansion",
    title: "Broader category capture",
    body: `Once the first buying pages are working, Hyro can expand into the wider category layer worth ${formatNumber(
      8_241_950
    )} in validated demand and ${formatNumber(167_074)} expected traffic in 12 months.`,
    footer: "The broad market gets much easier to win after the decision layer starts working.",
    bullets: [
      "electrolyte drinks",
      "electrolyte drink mix",
      "electrolyte powder",
      "electrolyte drink",
      "electrolyte drink for dehydration",
    ],
  },
];

const commercialSignals = [
  "best electrolyte powder for pregnancy",
  "best natural electrolytes drink",
  "best sugar free electrolyte drink",
  "best sugar-free electrolyte drink",
  "best low-sugar electrolyte drink",
  "best no sugar electrolyte powder",
  "best cheap electrolyte powder",
  "best electrolyte drink without potassium",
];

const competitiveTableRows = [
  ["LMNT", "429,600", "34,009", "4,642", "150,912", "7"],
  ["Liquid I.V.", "456,449", "14,724", "2,789", "44,257", "7"],
  ["Nuun", "105,219", "19,880", "4,218", "77,141", "6"],
  ["DripDrop", "161,926", "14,368", "1,846", "9,454", "2"],
  ["Hydralyte", "4,169", "1,276", "586", "1,842", "0"],
  ["Hyro", "1,004", "362", "74", "366", "0"],
];

const platformStatus = [
  {
    platform: "ChatGPT sample",
    rate: "0 / 8 prompts",
    title: "Hyro is not yet part of the answer set",
    body:
      "Across the sampled prompts, ChatGPT did not mention Hyro. That means the current on-site and off-site signal set is not yet strong enough to place Hyro in commercial answer moments.",
    icon: <Bot className="h-5 w-5" />,
  },
  {
    platform: "Gemini sample",
    rate: "0 / 8 prompts",
    title: "No visible foothold yet",
    body:
      "The Gemini sample also showed no Hyro mentions for the tested prompts. Hyro needs stronger retrieval support, clearer evidence pages, and broader third-party trust to compete here.",
    icon: <Radar className="h-5 w-5" />,
  },
  {
    platform: "Google AI Overview sample",
    rate: "0 / 8 prompts",
    title: "Google is surfacing competitors and publishers instead",
    body:
      "In the sampled Google AI Overview results, Hyro did not appear. That is especially important because Google still sits at the center of category discovery for this market.",
    icon: <Search className="h-5 w-5" />,
  },
];

const promptEvidence = [
  {
    platform: "ChatGPT prompt sample",
    query: "best electrolyte powder drink mix",
    winners: "LMNT, Hydrant, and Liquid I.V. were surfaced as popular choices. Hyro was absent.",
    implication:
      "Hyro needs a better on-site answer for this exact question and matching third-party proof that supports claims like sugar-free, ingredient clarity, and best-fit use cases.",
  },
  {
    platform: "Google AI Overview sample",
    query: "best electrolyte powder drink mix",
    winners: "LMNT, Liquid I.V., Ultima, Nuun, DripDrop, and Skratch Labs were named through cited roundup-style sources. Hyro was absent.",
    implication:
      "This is a signal that Hyro needs both stronger decision pages and more presence in the editorial and roundup surfaces Google already trusts in this category.",
  },
  {
    platform: "Gemini / comparison prompt sample",
    query: "electrolyte powder drink mix comparison",
    winners: "LMNT, Liquid I.V., Nuun, DripDrop, and Ultima were visible in comparison-style reasoning. Hyro was absent.",
    implication:
      "Comparison content cannot be treated as a nice-to-have. It is part of how answer engines decide which brands look recommendation-ready.",
  },
];

const sixMonthPlan = [
  {
    label: "Month 1",
    title: "Publish the first decision pages and lock the opening move",
    body:
      "The first month is about making Hyro legible for buying consideration. That means shipping the first pages around what buyers most clearly want to know when they are choosing an electrolyte drink mix.",
    bullets: [
      "Launch the first decision pages around best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix.",
      "Tighten schema, canonicals, sitemap coverage, crawl/index handling, Bing Webmaster Tools, and IndexNow so new pages are easy to discover and interpret.",
      "Start authority reinforcement around the same pages through review profiles, community participation, roundups, and first backlink pushes.",
      "Attack the most visible incumbents first: LMNT, Liquid I.V., and Nuun.",
    ],
  },
  {
    label: "Month 2",
    title: "Expand comparison, review, and use-case coverage",
    body:
      "Once the first decision pages are live, Hyro should widen the buying layer into direct comparisons, trust-building proof, and use-case pages that match real purchase questions.",
    bullets: [
      "Add comparison content around forms, brand alternatives, and category tradeoffs.",
      "Build proof pages around ingredient clarity, benefits, routines, and why Hyro fits specific use cases.",
      "Push listicle placements, review-platform reinforcement, community/forum visibility, and editorial outreach tied to the same themes.",
      "Prioritize commercial openings like sugar-free, low-sugar, natural, and use-case selection questions.",
    ],
  },
  {
    label: "Month 3",
    title: "Deepen supporting coverage and entity reinforcement",
    body:
      "The third month turns the first pages into a network. Hyro needs supporting coverage that keeps surfacing the same story across hydration scenarios, ingredient themes, and adjacent selection questions.",
    bullets: [
      "Expand supporting content coverage around hydration scenarios, benefits, routines, ingredients, and product-form questions.",
      "Strengthen author, about, profile, review, and third-party consistency so machines see one coherent brand story.",
      "Refresh early winners based on what search results and answer surfaces are already rewarding.",
      "Broaden backlinks and editorial proof toward the pages that start showing early movement.",
    ],
  },
  {
    label: "Months 4–6",
    title: "Compound the first wins into broader market share",
    body:
      "The second quarter of the engagement is where Hyro starts converting first-wave traction into durable market presence. The work becomes less about launch and more about compounding.",
    bullets: [
      `Push toward the first 6-month traffic target of ${formatNumber(firstSixMonthTarget)} through continued page expansion, authority reinforcement, and refresh cycles.`,
      "Broaden into more unbranded category demand once the first buying pages and comparisons have proof behind them.",
      "Defend what starts working with updated pricing, product detail, comparison maintenance, and additional third-party proof.",
      "Keep widening community, editorial, review, and backlink coverage so Hyro appears repeatedly across the market's trust surfaces.",
    ],
  },
];

const authorityBlocks = [
  {
    eyebrow: "Community and forum visibility",
    title: "Make Hyro show up where people compare hydration products in public",
    body:
      "Reddit, niche forums, and real-world discussion threads often shape buyer trust before the click. Hyro needs credible participation and cited presence in those conversations, especially around use cases and product tradeoffs.",
    bullets: [
      "Reddit and forum participation around hydration, training, travel, recovery, and daily wellness contexts",
      "Replies and placements tied to the same decision pages Hyro is trying to rank",
      "Proof-driven participation rather than spammy mention tactics",
    ],
  },
  {
    eyebrow: "Review-layer reinforcement",
    title: "Treat reviews as part of discovery, not as a cleanup task",
    body:
      "Third-party review surfaces influence both buyer trust and machine trust. Hyro should strengthen review profiles, acquisition workflows, and response coverage so claims travel beyond the site.",
    bullets: [
      "Review-profile setup or repair",
      "Review acquisition and response workflow",
      "Review proof integrated back into decision pages and comparison content",
    ],
  },
  {
    eyebrow: "Roundups, listicles, and digital PR",
    title: "Win the third-party pages answer engines already lean on",
    body:
      "Many AI and Google answer layers cite roundups, publication-style comparisons, and editorial sources before they cite smaller brands directly. Hyro needs presence in those surfaces to become recommendation-ready.",
    bullets: [
      "Hydration roundups and best-of listicle pushes",
      "Editorial placements and expert commentary",
      "Digital PR or press-release-style proof pushes when Hyro has a credible evidence hook to distribute",
    ],
  },
  {
    eyebrow: "Backlinks and proof distribution",
    title: "Point authority at the pages that actually move buying decisions",
    body:
      "Backlinks should reinforce commercial decision pages, not just broad home-page awareness. The goal is to make Hyro's most important pages harder to ignore in both Google and AI retrieval patterns.",
    bullets: [
      "Aggressive backlink acquisition to decision pages and comparison pages",
      "Third-party proof objects that echo Hyro's commercial story",
      "Authority distribution tied to early winners, not sprayed evenly across the site",
    ],
  },
];

const buildShipBlocks = [
  {
    eyebrow: "Priority buying query mapping",
    title: "Hyro gets a clear list of the buying questions that matter first",
    body:
      "Memetik starts by mapping the exact questions buyers ask when they are deciding what electrolyte product to buy, compare, switch to, or trust. That creates the commercial priority order for the whole program.",
    bullets: [
      "Buyer-guide queries",
      "Use-case selection queries",
      "Comparison and alternative queries",
      "Review and proof-led queries",
    ],
  },
  {
    eyebrow: "Bottom-of-funnel page production",
    title: "Memetik builds as many decision pages as the market requires",
    body:
      "This is not a fixed-content quota. Memetik builds the decision pages Hyro actually needs to cover demand, then expands the ones that prove they can win.",
    bullets: [
      "Best-in-category and best-for pages",
      "Buyer guides and selection pages",
      "Ingredient and benefit proof pages",
      "Commercial pages designed for both human buyers and machine retrieval",
    ],
  },
  {
    eyebrow: "Comparison and evaluation content",
    title: "Memetik builds the pages buyers read when they are narrowing options",
    body:
      "Comparison content is where buying consideration sharpens. Hyro needs direct brand comparisons, form-factor comparisons, and tradeoff pages that make evaluation easier.",
    bullets: [
      "Head-to-head comparisons",
      "Alternative pages",
      "Product-form explainers",
      "Evaluation pages tied to competitor and category tradeoffs",
    ],
  },
  {
    eyebrow: "Supporting content coverage",
    title: "Memetik surrounds every important page with supporting coverage",
    body:
      "Decision pages work better when they sit inside a wider supporting content network. That supporting layer helps Google and answer engines keep finding the same commercial narrative in more contexts.",
    bullets: [
      "Hydration scenarios",
      "Ingredient and benefit themes",
      "Routines and use cases",
      "Adjacent category questions and supporting explainers",
    ],
  },
  {
    eyebrow: "Aggressive authority building",
    title: "Memetik pushes backlinks, listicles, editorial mentions, and distribution in parallel",
    body:
      "Hyro does not just need more pages. It needs those pages to look backed by the market. That means aggressive backlink acquisition, digital PR, listicle pushes, and expert or creator proof routed toward the pages that matter most.",
    bullets: [
      "Backlinks to decision pages",
      "Listicle and roundup placements",
      "Editorial and expert commentary placements",
      "Distribution around credible proof objects",
    ],
  },
  {
    eyebrow: "Reviews and third-party surfaces",
    title: "Memetik makes off-site trust explicit",
    body:
      "Review platforms, community placements, newsletters, and third-party profiles all feed the credibility layer behind Hyro's discovery strategy. These surfaces are part of the core scope, not a side project.",
    bullets: [
      "Review-platform presence and maintenance",
      "Community and forum participation",
      "Professional-network or newsletter distribution",
      "Third-party proof surfaced back into owned pages",
    ],
  },
  {
    eyebrow: "Technical and entity infrastructure",
    title: "Memetik handles the infrastructure that makes the content eligible to win",
    body:
      "The program also includes the machine-readable layer that helps Hyro's content get crawled, indexed, interpreted, and connected across surfaces.",
    bullets: [
      "Schema matched to visible content",
      "Sitemap hygiene and crawl/index handling",
      "Canonicals and internal-link structure",
      "Bing Webmaster Tools and IndexNow support",
      "Entity consistency across owned and third-party surfaces",
    ],
  },
  {
    eyebrow: "Refresh and defense",
    title: "Memetik keeps improving what works instead of publishing and walking away",
    body:
      "Once Hyro starts getting traction, the work shifts toward refresh cycles, competitive response, proof expansion, and defending the pages that matter most commercially.",
    bullets: [
      "Page refreshes and claim updates",
      "Comparison maintenance as the market shifts",
      "Authority reinforcement around early winners",
      "Monthly performance review and reallocation",
    ],
  },
];

const whyMemetikBlocks = [
  {
    eyebrow: "Commercial strategy first",
    title: "Memetik starts where buyer intent is already close to purchase",
    body:
      "The plan is not to chase generic awareness first. It starts with the queries that shape what product a buyer chooses, then broadens once those commercial pages begin to work.",
  },
  {
    eyebrow: "On-site and off-site together",
    title: "Memetik does not separate publishing from proof",
    body:
      "Many teams publish pages and hope authority follows. Memetik treats off-site authority, reviews, editorials, backlinks, and community presence as part of the same system from the start.",
  },
  {
    eyebrow: "Built for the new search reality",
    title: "Memetik plans for Google and answer engines at the same time",
    body:
      "The objective is to make Hyro easier to discover in classic search while also making it easier for AI answer surfaces to retrieve and recommend. That is how the moat compounds.",
  },
];

const clusterTableRows = [
  [
    "Buyer Guides",
    "Immediate",
    "211,170",
    "23,229",
    "best electrolyte drink, best electrolyte powder, best hydration powder",
  ],
  [
    "Alternatives & Comparisons",
    "Immediate",
    "7,210",
    "793",
    "liquid iv vs gatorade, electrolyte powder vs tablets, electrolyte powder drink mix comparison",
  ],
  [
    "Reviews & Social Proof",
    "Immediate",
    "3,720",
    "409",
    "lmnt electrolyte powder review, just ingredients electrolyte review, review-led terms",
  ],
  [
    "Category & Brand Demand",
    "Expansion",
    "8,241,950",
    "167,074",
    "electrolyte drinks, electrolyte drink mix, electrolyte powder, electrolyte drink",
  ],
];

const appendixAssumptions = [
  "Traffic planning is Estimate-only and should be treated as directional planning rather than a guaranteed outcome.",
  "Topical integrity passed, with low-quality semantic demand share measured at 0.1%, so the visible opportunity numbers are grounded in validated topical subsets.",
  "Public AI visibility evidence here uses validated prompt samples across ChatGPT, Gemini, and Google AI Overview only.",
  "Perplexity-specific probe output and a separate AI mention endpoint were not stable enough to cite publicly, so they were intentionally omitted rather than guessed.",
  "Revenue planning requires client ACV/AOV and funnel inputs.",
  "Source trace: rendered from the approved Hyro strategy brief checked 2026-03-09, following Memetik's canonical doctrine and public-page contract.",
];

const appendixPromptRows = [
  [
    "best electrolyte powder drink mix",
    "ChatGPT",
    "Hyro absent",
    "LMNT, Hydrant, Liquid I.V.",
    "Hyro needs a stronger owned page plus third-party proof around this exact commercial question.",
  ],
  [
    "best electrolyte powder drink mix",
    "Google AI Overview",
    "Hyro absent",
    "LMNT, Liquid I.V., Ultima, Nuun, DripDrop, Skratch Labs",
    "Google is leaning on roundup and editorial-style authority surfaces Hyro does not yet occupy.",
  ],
  [
    "electrolyte powder drink mix comparison",
    "ChatGPT / Gemini sample",
    "Hyro absent",
    "Liquid I.V., LMNT, Nuun, DripDrop, Ultima",
    "Comparison pages and evaluation proof need to become part of the first-wave content push.",
  ],
];

const baseCurve = [4_200, 11_000, 21_500, 34_000, 52_000, 70_857, 92_000, 116_000, 139_500, 161_000, 177_500, 191_505];
const lowRatio = lowTwelveMonthCase / expectedTraffic12Months;
const highRatio = aggressiveUpside / expectedTraffic12Months;

const phasedUpsidePoints = baseCurve.map((base, index) => ({
  month: index + 1,
  low: Math.round(base * lowRatio),
  base,
  high: Math.round(base * highRatio),
}));

const operatingTimelinePoints = [
  {
    month: 1,
    title: "Opening move goes live",
    detail:
      "Hyro publishes the first decision pages, tightens crawl and entity setup, and starts the first review, community, roundup, and backlink pushes around the same themes.",
    bullets: [
      "First pages for best electrolyte drink, powder, mix, and hydration powder",
      "Schema, canonicals, sitemap, Bing Webmaster Tools, and IndexNow setup",
      "First authority actions against LMNT, Liquid I.V., and Nuun",
    ],
  },
  {
    month: 2,
    title: "Comparison layer expands",
    detail:
      "The second month pushes Hyro deeper into evaluation behavior through comparisons, proof pages, and review reinforcement.",
    bullets: [
      "Comparison and use-case pages expand",
      "Review and listicle reinforcement begins compounding",
      "Early backlink routes point toward commercial pages",
    ],
  },
  {
    month: 3,
    title: "Supporting coverage deepens",
    detail:
      "Hyro broadens the supporting content network around ingredients, benefits, hydration scenarios, and routines so the market keeps seeing the same commercial story.",
    bullets: [
      "More use-case and proof content",
      "Entity consistency strengthened across surfaces",
      "Refresh loop starts on early winners",
    ],
  },
  {
    month: 4,
    title: "First winners get reinforced",
    detail:
      "Commercial pages showing traction receive more internal support, fresh proof, and stronger off-site distribution.",
    bullets: [
      "Refresh winning pages",
      "Redirect authority toward emerging winners",
      "Expand community and editorial coverage",
    ],
  },
  {
    month: 5,
    title: "Distribution widens",
    detail:
      "By month five, Hyro should have enough coverage to widen editorial, listicle, and backlink distribution more aggressively.",
    bullets: [
      "Broader third-party placements",
      "More review-surface activity",
      "Comparison pages kept current as market narratives shift",
    ],
  },
  {
    month: 6,
    title: "First-half market share checkpoint",
    detail:
      "Hyro reaches the first meaningful checkpoint where the early program can be judged against traffic, answer-surface movement, and authority proof.",
    bullets: [
      `Base case target: ${formatNumber(firstSixMonthTarget)} cumulative traffic`,
      "Defend what is working and patch weak pages",
      "Prepare broader unbranded category expansion",
    ],
  },
  {
    month: 7,
    title: "Adjacent query expansion",
    detail:
      "The program starts reaching further into adjacent unbranded demand once the first buying pages have proof and traction behind them.",
    bullets: [
      "Broaden supporting coverage",
      "Add more use-case and routine pages",
      "Keep authority pressure on core winners",
    ],
  },
  {
    month: 8,
    title: "Authority density increases",
    detail:
      "Off-site proof becomes thicker across editorials, communities, reviews, and backlinks, giving Hyro more durability across both search and answer surfaces.",
    bullets: [
      "More trust surfaces echo the same Hyro story",
      "Commercial pages gain stronger external support",
      "Refresh cadence keeps claims current",
    ],
  },
  {
    month: 9,
    title: "Broader category capture begins",
    detail:
      "With the decision layer stronger, Hyro pushes further into large category demand around broader electrolyte searches.",
    bullets: [
      "Broader category terms become more reachable",
      "Topical authority is now reinforced by depth and proof",
      "Expansion stays anchored to the pages that already convert attention into buying consideration",
    ],
  },
  {
    month: 10,
    title: "Defensibility improves",
    detail:
      "The program shifts from proving the opening move to making it harder for competitors to retake ground.",
    bullets: [
      "Refresh comparisons and proof objects",
      "Improve weak prompts where Hyro still underperforms",
      "Keep widening high-value third-party coverage",
    ],
  },
  {
    month: 11,
    title: "Market repetition compounds",
    detail:
      "Hyro increasingly benefits from being seen repeatedly in more contexts, which improves trust and raises the odds of becoming a default choice.",
    bullets: [
      "More consistent retrieval across buying scenarios",
      "More external proof reinforcing owned pages",
      "More stable brand interpretation across machines and buyers",
    ],
  },
  {
    month: 12,
    title: "Category position becomes durable",
    detail:
      "At the 12-month mark, the goal is a compounding market position built on decision pages, supporting coverage, off-site proof, and a maintained technical foundation.",
    bullets: [
      `Base case: ${formatNumber(expectedTraffic12Months)} cumulative traffic`,
      `Upper-range case: ${formatNumber(aggressiveUpside)} cumulative traffic`,
      "A stronger claim on default recommendation status across high-intent buying prompts",
    ],
  },
].map((point, index) => ({
  ...point,
  low: Math.round(baseCurve[index] * lowRatio),
  base: baseCurve[index],
  high: Math.round(baseCurve[index] * highRatio),
  trafficLabel: "Cumulative traffic",
  trafficValue: baseCurve[index],
}));

const operatingMilestones = [
  {
    label: "Month 1",
    month: 1,
    title: "Opening move live",
    detail:
      "First decision pages, indexing setup, and first authority pushes launch together so Hyro is not relying on publishing alone.",
    trafficLabel: "Cumulative traffic",
    trafficValue: baseCurve[0],
  },
  {
    label: "Month 2",
    month: 2,
    title: "Comparison and proof layer expands",
    detail:
      "Hyro widens into comparisons, proof content, and stronger third-party reinforcement around the same buying questions.",
    trafficLabel: "Cumulative traffic",
    trafficValue: baseCurve[1],
  },
  {
    label: "Month 3",
    month: 3,
    title: "Supporting coverage deepens",
    detail:
      "The content network broadens, entity consistency improves, and refresh loops begin on early winners.",
    trafficLabel: "Cumulative traffic",
    trafficValue: baseCurve[2],
  },
  {
    label: "Month 6",
    month: 6,
    title: "First-half checkpoint",
    detail:
      "Hyro should have enough live coverage, authority proof, and answer-surface feedback to judge the opening move and reallocate toward winners.",
    trafficLabel: "Cumulative traffic",
    trafficValue: baseCurve[5],
  },
  {
    label: "Month 9",
    month: 9,
    title: "Broader category capture",
    detail:
      "The program can start pressing more confidently into large unbranded category demand because the decision layer now has more support beneath it.",
    trafficLabel: "Cumulative traffic",
    trafficValue: baseCurve[8],
  },
  {
    label: "Month 12",
    month: 12,
    title: "Compounding market position",
    detail:
      "By the end of the first year, Hyro should look materially more visible, more cited, and more trustworthy across both classic search and answer surfaces.",
    trafficLabel: "Cumulative traffic",
    trafficValue: baseCurve[11],
  },
];

export default function StrategyDrinkhyro() {
  useEffect(() => {
    document.title = "Hyro Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto max-w-6xl space-y-16 md:space-y-20">
        <StrategyHero
          eyebrow="Hyro Growth Strategy / Founder Memo"
          title="Hyro can win the decision stage in electrolyte drink mix"
          accent="before incumbents harden the market"
          subtitle="Hyro already has real category relevance, but buyers asking Google, ChatGPT, Gemini, and Google AI Overviews what electrolyte product to choose are still being shown incumbents and publisher roundups first. The opening move is to own the buying questions that shape consideration, then reinforce those pages with third-party proof until Hyro becomes easier to recommend across the market."
          tags={["drinkhyro.com", "Consumer Health", "US market", "Electrolyte drink mix"]}
        >
          <div className="max-w-4xl space-y-6">
            <HighlightBox>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">Founder takeaway</div>
              <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                Hyro does not need to outpublish the whole category first. It needs to win the buying questions that decide what product people choose.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 md:text-base">
                The cleanest opening move is the best-in-category and evaluation layer around electrolyte powder drink mix. That is where the category is already making decisions, where Hyro has the clearest commercial path, and where off-site proof can change market perception fastest.
              </p>
            </HighlightBox>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="border-b border-white/10 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
                    00
                  </div>
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Executive summary</div>
                    <h2 className="text-2xl font-display font-extrabold tracking-tight text-white md:text-4xl">
                      The market is large, the current gap is real, and the opening move is clear
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6 md:p-8">
                {executiveMetrics.map((metric) => (
                  <ExecutiveMetricCard
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    summary={metric.summary}
                    breakdownLabel={metric.breakdownLabel}
                    breakdown={metric.breakdown}
                    breakdownNote={metric.breakdownNote}
                  />
                ))}

                <div className="pt-2">
                  <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">Immediate actions</div>
                  <div className="space-y-4">
                    {immediateActions.map((action) => (
                      <ImmediateActionCard
                        key={action.index}
                        index={action.index}
                        title={action.title}
                        body={action.body}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StrategyHero>

        <StrategySectionShell>
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still drives discovery, but AI is now shaping what buyers think is worth choosing."
            body="Traditional search remains core behavior in consumer health. At the same time, buyers increasingly ask answer engines what to buy, compare, trust, or switch to before they ever click through. That means Hyro has to win across both classic search demand capture and AI answer surfaces."
            implication="The brand that becomes easier to retrieve, cite, and trust across both layers gets the edge in buying consideration before price and promotion do the heavy lifting."
          />

          <div className="space-y-4">
            {marketShiftCards.map((card) => (
              <StackCard
                key={card.title}
                eyebrow={card.eyebrow}
                icon={card.icon}
                title={card.title}
                body={card.body}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="02" title="Where Hyro Is Today" />
          <StrategySectionLead
            takeaway="Hyro is relevant enough to move, but not yet concentrated enough to win the market's most important buying moments."
            body="This is not a zero-to-one situation. Hyro already has enough site presence and authority to justify an aggressive opening move. The problem is that the current footprint is still too thin where buyers make real product decisions."
            implication="The next step is not generic content expansion. It is concentration around the pages, proof, and authority surfaces that shape what product buyers choose."
          />

          <div className="space-y-4">
            {currentStateCards.map((card) => (
              <StackCard
                key={card.title}
                eyebrow={card.eyebrow}
                icon={card.icon}
                title={card.title}
                body={card.body}
                bullets={card.bullets}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionLead
            takeaway="The fastest path is not the whole electrolyte market. It is the decision-stage slice where buyers ask what to choose."
            body="The approved opening move is the best-in-category and decision-stage layer around electrolyte powder drink mix. That is where purchase intent is clearest, where pages can win buying consideration quickly, and where Hyro can expand outward after the first wins."
            implication="Win the selection questions first. Then use those wins to enter broader category demand with more authority and lower execution risk."
          />

          <div className="space-y-4">
            {opportunityBlocks.map((block) => (
              <StackCard
                key={block.title}
                eyebrow={block.eyebrow}
                icon={<Target className="h-5 w-5" />}
                title={block.title}
                body={block.body}
                bullets={block.bullets}
                footer={block.footer}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="04" title="Why Hyro Can Win" />
          <StrategySectionLead
            takeaway="Hyro has a real opening because the category's biggest upside is still unbranded, use-case driven, and commercially sharp."
            body="Hyro does not need to beat LMNT or Liquid I.V. on every surface at once. It needs to become the clearest answer in the parts of the market where buyers are actively choosing between options and where the incumbents are broad rather than precise."
            implication="A focused position with stronger proof can beat bigger brands in narrower, high-intent slices long before it beats them everywhere."
          />

          <HighlightBox className="mb-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Right to win</div>
            <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
              92.6% of validated demand is non-competitor and unbranded.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 md:text-base">
              That means Hyro's real upside is not mainly about stealing people already looking for a rival brand.
              It is about becoming discoverable when buyers ask broad market questions about sugar-free options, natural options,
              hydration fit, product form, and what is best for their specific situation.
            </p>
          </HighlightBox>

          <div className="space-y-4">
            <StackCard
              eyebrow="Existing authority base"
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Hyro has enough authority to support a focused move"
              body="With 74 referring domains already in place, Hyro can support a concentrated commercial push. That is a very different starting point from a brand with no discoverability and no backlink foundation."
            />
            <StackCard
              eyebrow="Commercial opening"
              icon={<TrendingUp className="h-5 w-5" />}
              title="The market is already signaling where Hyro can be sharper"
              body="The strongest commercial signals point toward decision-stage pages tied to sugar-free, low-sugar, natural, price-sensitive, and use-case selection questions."
              bullets={commercialSignals}
            />
            <StackCard
              eyebrow="Why now"
              icon={<Sparkles className="h-5 w-5" />}
              title="Hyro can still shape the category story before it hardens further"
              body="Once answer engines and roundups keep retrieving the same brands repeatedly, it becomes much harder to break in. That makes speed valuable now: Hyro still has a window to become part of the answer set before those patterns get more durable."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="Hyro is not losing because the category is too big. It is losing because incumbents own the visible pages, citations, and trust layers first."
            body="LMNT, Liquid I.V., Nuun, and other leaders already have stronger traffic, broader content coverage, deeper backlink profiles, and more sampled answer-surface presence. Hyro's job is not to copy all of that immediately. It is to enter the market where decision intent is clearest and where proof can shift perception fastest."
            implication="Concentrated commercial coverage plus authority reinforcement is the path to closing the gap, not broad unfocused publishing."
          />

          <div className="space-y-4">
            <StackCard
              eyebrow="What leaders own today"
              icon={<Trophy className="h-5 w-5" />}
              title="Competitors are winning both discoverability and trust repetition"
              body="The market leaders are not just bigger in search. They also benefit from stronger editorial presence, more review signals, more backlinks, and more consistent retrieval across buying questions."
              bullets={[
                "LMNT and Liquid I.V. dominate traffic and backlink depth.",
                "Nuun and DripDrop stay present in comparison and round-up behavior.",
                "Publishers and editorial roundups are helping answer engines decide who looks credible.",
              ]}
            />

            <DataTable
              headers={["Brand", "Organic traffic", "Organic keywords", "Referring domains", "Backlinks", "Sampled prompt hits"]}
              rows={competitiveTableRows}
              highlightRow={5}
              tableClassName="min-w-[860px]"
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionLead
            takeaway="Hyro is still absent from the tested answer-surface moments where buyers ask what electrolyte product to choose."
            body="That absence matters because answer engines are increasingly involved in what buyers trust, compare, and remember. The immediate goal is not just to appear once. It is to become more recommendation-ready across the same commercial questions Hyro is targeting in search."
            implication="Pages alone are not enough. Hyro needs answer-ready content, stronger external proof, and more retrieval repetition across the market."
          />

          <div className="space-y-4">
            {platformStatus.map((card) => (
              <PlatformStatusCard
                key={card.platform}
                platform={card.platform}
                rate={card.rate}
                title={card.title}
                body={card.body}
                icon={card.icon}
              />
            ))}

            <div className="rounded-[24px] border border-[#f4e4cd]/18 bg-[#f4e4cd]/8 p-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Real prompt examples</div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68">
                These are unbranded prompt samples from the approved brief. Unsupported platform probes were intentionally left out rather than guessed.
              </p>
            </div>

            {promptEvidence.map((prompt) => (
              <PromptEvidenceCard
                key={`${prompt.platform}-${prompt.query}`}
                platform={prompt.platform}
                query={prompt.query}
                winners={prompt.winners}
                implication={prompt.implication}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionLead
            takeaway="This is not just a traffic plan. It is a plan to capture more buying consideration before the market defaults to bigger brands."
            body="If Hyro becomes more visible for the decision-stage questions that shape choice, it can turn search and answer-surface visibility into a more efficient demand engine. The commercial value compounds because the same pages and proof objects can influence DTC sales, branded search, repeat discovery, and retailer demand over time."
            implication="The market is big enough that even a narrow first win can become meaningful. What matters is entering the right buying moments first and compounding from there."
          />

          <StrategyEyebrow className="mb-4">Estimate-only</StrategyEyebrow>

          <HighlightBox className="mb-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Commercial read-through</div>
            <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
              The core upside sits in broad, unbranded category demand.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 md:text-base">
              That matters because broad demand is usually cheaper to defend over time than purely competitor-dependent traffic.
              If Hyro can become easier to discover on the questions buyers ask before they know which brand they want,
              the brand gains leverage that is harder for incumbents to erase with paid spend alone.
            </p>
          </HighlightBox>

          <PhasedUpsideChart points={phasedUpsidePoints} />

          <CommercialImpactCalculator baseTraffic={expectedTraffic12Months} />

          <StrategyCard className="mt-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Planning note</div>
            <p className="mt-3 text-sm leading-7 text-white/68">
              Revenue planning requires client ACV/AOV and funnel inputs. The visible numbers on this page are traffic planning numbers grounded in the approved brief, not a closed-form revenue forecast.
            </p>
          </StrategyCard>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="08" title="6-month Growth Plan" />
          <StrategySectionLead
            takeaway="The first 6 months are about entering the market where choice happens, then compounding those wins into wider category presence."
            body="This is a staged commercial build: the first month establishes the opening move, the second deepens evaluation content and proof, the third expands supporting coverage and entity reinforcement, and months 4–6 compound the first wins into broader share."
            implication="The fastest growth comes from sequencing the work correctly, not from trying to publish everything at once."
          />

          <div className="space-y-4">
            {sixMonthPlan.map((month) => (
              <MonthPlanCard
                key={month.label}
                label={month.label}
                title={month.title}
                body={month.body}
                bullets={month.bullets}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="09" title="Off-site Authority" />
          <StrategySectionLead
            takeaway="Hyro will not become easier to recommend on the strength of on-site pages alone."
            body="Answer engines and buyers both rely on third-party signals to decide what looks credible. That means Hyro needs presence in communities, reviews, roundups, editorials, and backlink sources that echo the same commercial story the site is publishing."
            implication="Off-site authority is core scope, not optional amplification."
          />

          <div className="space-y-4">
            {authorityBlocks.map((block) => (
              <StackCard
                key={block.title}
                eyebrow={block.eyebrow}
                icon={<Users className="h-5 w-5" />}
                title={block.title}
                body={block.body}
                bullets={block.bullets}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="10" title="What Memetik Actually Builds and Ships" />
          <StrategySectionLead
            takeaway="This is a serious category-capture program, not a light publishing retainer."
            body="Memetik delivers the full operating engine required to move Hyro from background relevance to stronger buying consideration. That includes query prioritization, commercial page production, supporting coverage, off-site authority, review systems, technical infrastructure, and ongoing refresh loops."
            implication="The scope is substantial because category position only improves when all of those layers reinforce the same commercial story."
          />

          <div className="space-y-4">
            {buildShipBlocks.map((block) => (
              <StackCard
                key={block.title}
                eyebrow={block.eyebrow}
                icon={<FileText className="h-5 w-5" />}
                title={block.title}
                body={block.body}
                bullets={block.bullets}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="11" title="Operating Model" />
          <StrategySectionLead
            takeaway="The program compounds through monthly deployments that keep production, publishing, authority, and measurement moving together."
            body="Hyro should not experience this as one launch followed by idle time. Each month has live deployment work, performance review, proof reinforcement, and refresh decisions layered onto the same trajectory."
            implication="The market shift happens because pages, proof, indexing, and authority all keep moving forward on the same timeline."
          />

          <GrowthTimelineChart points={operatingTimelinePoints} milestones={operatingMilestones} />

          <div className="mt-6 space-y-4">
            <StackCard
              eyebrow="Monthly deployment model"
              icon={<Activity className="h-5 w-5" />}
              title="Every month runs the same core motions in parallel"
              body="Research and prioritization, page production, publishing and indexing, off-site authority, review actions, and measurement all continue every month. The mix changes over time, but the system does not stop after the first launch."
            />
            <StackCard
              eyebrow="Reporting and decision points"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Hyro gets visible proof, not vague channel reporting"
              body="Each month should show movement across default recommendation visibility, prompt coverage, authority proof, work completed, and downstream search indicators. Each quarter should reset priorities based on what is defended, what is soft, and where the next growth leverage sits."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="12" title="Why Memetik" />
          <StrategySectionLead
            takeaway="Memetik is built for the moment where search and AI are merging into one commercial discovery system."
            body="Hyro needs a partner that understands how decision pages, supporting coverage, authority building, technical eligibility, and answer-surface visibility work together. Memetik is designed around that full system."
            implication="The advantage is not just more output. It is a better operating model for how brands become easier to discover and trust now."
          />

          <HighlightBox className="mb-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Memetik fit</div>
            <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
              Memetik helps brands become the answer buyers keep seeing, not just another page in the results.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 md:text-base">
              For Hyro, that means pairing a commercial content plan with the trust layer, entity layer, and refresh layer that make visibility durable instead of temporary.
            </p>
          </HighlightBox>

          <div className="space-y-4">
            {whyMemetikBlocks.map((block) => (
              <StackCard
                key={block.title}
                eyebrow={block.eyebrow}
                icon={<Sparkles className="h-5 w-5" />}
                title={block.title}
                body={block.body}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Book Strategy Call"
          title="If Hyro wants to win the buying moments that shape category choice, this is the opening move."
          body="Memetik can help turn this plan into a live market-capture program across search, answer engines, and the third-party trust surfaces that influence both."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <div className="space-y-6">
          <StrategySectionShell>
            <SectionHeader number="13" title="Supporting Evidence" />
            <StrategySectionLead
              takeaway="Below the fold is the proof layer behind the strategy."
              body="The main memo is designed for a founder to skim quickly. This appendix keeps the supporting evidence visible without turning the primary flow into a research dump."
            />
          </StrategySectionShell>

          <StrategyAppendixSection
            defaultOpen
            title="Competitor evidence snapshot"
            description="Compact view of the category leaders Hyro is up against today, using the validated metrics from the approved brief."
          >
            <DataTable
              headers={["Brand", "Organic traffic", "Organic keywords", "Referring domains", "Backlinks", "Sampled prompt hits"]}
              rows={competitiveTableRows}
              highlightRow={5}
            />
          </StrategyAppendixSection>

          <StrategyAppendixSection
            title="Priority buying query evidence"
            description="The opportunity is not one undifferentiated market. The plan is sequenced around the decision-stage demand that matters first."
          >
            <div className="space-y-6">
              <DataTable
                headers={["Cluster", "Priority window", "Validated demand", "Expected traffic in 12 months", "Sample query examples"]}
                rows={clusterTableRows}
                highlightRow={0}
              />

              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Commercial query signals already visible in the research</div>
                <div className="mt-4">
                  <BulletList items={commercialSignals} />
                </div>
              </StrategyCard>
            </div>
          </StrategyAppendixSection>

          <StrategyAppendixSection
            title="Prompt evidence snapshot"
            description="Public-safe prompt evidence used on the page. Only validated sampled prompts are shown here."
          >
            <DataTable
              headers={["Query", "Platform", "Hyro status", "Who shows up now", "What this means"]}
              rows={appendixPromptRows}
            />
          </StrategyAppendixSection>

          <StrategyAppendixSection
            title="Attribution split and confidence notes"
            description="Why the page emphasizes unbranded opportunity, and where the visible caveats sit."
          >
            <div className="space-y-4">
              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Keyword attribution summary</div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-[18px] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-7 text-white/68">
                    Competitor-keyword demand: <span className="font-semibold text-white">629,440</span> (7.4%)
                  </div>
                  <div className="rounded-[18px] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-7 text-white/68">
                    Non-competitor / unbranded demand: <span className="font-semibold text-white">7,834,610</span> (92.6%)
                  </div>
                  <div className="rounded-[18px] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-7 text-white/68">
                    Competitor-keyword expected traffic in 12 months: <span className="font-semibold text-white">13,798</span>
                  </div>
                  <div className="rounded-[18px] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-7 text-white/68">
                    Non-competitor / unbranded expected traffic in 12 months: <span className="font-semibold text-white">177,707</span>
                  </div>
                </div>
              </StrategyCard>

              <StrategyCard>
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Assumptions and caveats</div>
                <div className="mt-4">
                  <BulletList items={appendixAssumptions} />
                </div>
              </StrategyCard>
            </div>
          </StrategyAppendixSection>
        </div>
      </div>
    </StrategyPageFrame>
  );
}