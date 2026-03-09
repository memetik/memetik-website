import { useEffect, type ReactNode } from "react";
import { Nav } from "@/components/Nav";
import {
  BulletList,
  DataTable,
  GrowthTimelineChart,
  HighlightBox,
  PhasedUpsideChart,
  SectionHeader,
  StrategyAppendixSection,
  StrategyCTA,
  StrategyCard,
  StrategyEyebrow,
  StrategyHero,
  StrategyPageFrame,
  StrategySectionLead,
  StrategySectionShell,
  TamRoiCalculator,
} from "@/components/strategy";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Compass,
  Database,
  FileSearch,
  Gauge,
  Globe,
  Layers3,
  Link2,
  MessageSquare,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function MetricBreakdown({
  items,
}: {
  items: { label: string; value: string; tone?: "base" | "accent" }[];
}) {
  return (
    <div className="mt-4 space-y-2">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={`rounded-[18px] border px-3 py-2 text-xs leading-5 ${
            item.tone === "accent"
              ? "border-[#f4e4cd]/18 bg-[#f4e4cd]/8 text-white"
              : "border-white/8 bg-black/20 text-white/68"
          }`}
        >
          <span className="font-mono uppercase tracking-[0.16em] text-[10px] text-white/42">{item.label}</span>
          <span className="ml-2">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function ExecutiveMetricCard({
  label,
  value,
  note,
  breakdown,
}: {
  label: string;
  value: string;
  note: string;
  breakdown: { label: string; value: string; tone?: "base" | "accent" }[];
}) {
  return (
    <StrategyCard glow="mixed">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">{label}</div>
      <div className="mt-3 text-[clamp(2.2rem,6vw,4.2rem)] font-display font-extrabold leading-[0.92] tracking-tight text-white break-words">
        {value}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/64">{note}</p>
      <MetricBreakdown items={breakdown} />
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
    <StrategyCard>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/64">{body}</p>
        </div>
      </div>
    </StrategyCard>
  );
}

function InsightBlock({
  icon,
  title,
  body,
  bullets,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  bullets?: string[];
}) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/64">{body}</p>
          {bullets?.length ? <div className="mt-4"><BulletList items={bullets} /></div> : null}
        </div>
      </div>
    </StrategyCard>
  );
}

function MonthPlanBlock({
  label,
  title,
  body,
  outputs,
  prompts,
  competitors,
  compounding,
}: {
  label: string;
  title: string;
  body: string;
  outputs: string[];
  prompts: string[];
  competitors: string;
  compounding: string;
}) {
  return (
    <StrategyCard glow="blue">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">{label}</div>
      <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>

      <div className="mt-5 rounded-[22px] border border-white/8 bg-black/20 p-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">What ships</div>
        <div className="mt-3">
          <BulletList items={outputs} />
        </div>
      </div>

      <div className="mt-4 rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">First prompts to win</div>
        <p className="mt-3 text-sm leading-6 text-white/72">{prompts.join(" • ")}</p>
      </div>

      <div className="mt-4 rounded-[22px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Competitive pressure</div>
        <p className="mt-3 text-sm leading-6 text-white">{competitors}</p>
        <p className="mt-3 text-sm leading-6 text-white/68">{compounding}</p>
      </div>
    </StrategyCard>
  );
}

function PlatformCard({
  platform,
  value,
  body,
}: {
  platform: string;
  value: string;
  body: string;
}) {
  return (
    <StrategyCard>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{platform}</div>
      <div className="mt-3 text-3xl font-display font-bold tracking-tight text-white">{value}</div>
      <p className="mt-3 text-sm leading-6 text-white/64">{body}</p>
    </StrategyCard>
  );
}

function PromptExampleCard({
  query,
  surface,
  observed,
  implication,
}: {
  query: string;
  surface: string;
  observed: string;
  implication: string;
}) {
  return (
    <StrategyCard>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Prompt example</div>
      <h3 className="mt-3 text-lg font-semibold text-white">{query}</h3>
      <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">
        {surface}
      </div>
      <p className="mt-4 text-sm leading-7 text-white/66">{observed}</p>
      <div className="mt-4 rounded-[20px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 px-4 py-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What this means</div>
        <p className="mt-2 text-sm leading-6 text-white">{implication}</p>
      </div>
    </StrategyCard>
  );
}

function ScopeBlock({
  index,
  title,
  body,
  bullets,
}: {
  index: string;
  title: string;
  body: string;
  bullets: string[];
}) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          {index}
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
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
    value: formatNumber(8_464_050),
    note:
      "Validated topical demand is far larger than Hyro's current footprint, and most of it sits in non-competitor research rather than named-brand searches.",
    breakdown: [
      {
        label: "Competitor-keyword demand",
        value: `${formatNumber(629_440)} (7.4%)`,
      },
      {
        label: "Non-competitor / unbranded demand",
        value: `${formatNumber(7_834_610)} (92.6%)`,
        tone: "accent" as const,
      },
    ],
  },
  {
    label: "Expected traffic in 12 months",
    value: formatNumber(191_505),
    note:
      "Base-case growth is substantial relative to current visibility because Hyro can enter decision-stage demand before trying to own the whole category.",
    breakdown: [
      {
        label: "Competitor-keyword share of 12-month target",
        value: formatNumber(13_798),
      },
      {
        label: "Non-competitor / unbranded share of 12-month target",
        value: formatNumber(177_707),
        tone: "accent" as const,
      },
    ],
  },
  {
    label: "Aggressive upside",
    value: formatNumber(327_134),
    note:
      "If Hyro compounds strong page coverage with authority reinforcement and continued refresh, the upside extends well beyond the base case.",
    breakdown: [
      {
        label: "Demand mix guiding upside",
        value: "7.4% competitor-branded / 92.6% non-competitor",
      },
      {
        label: "Founder read",
        value: "The larger prize is broad category ownership, not only stealing branded clicks.",
        tone: "accent" as const,
      },
    ],
  },
  {
    label: "First 6-month target",
    value: formatNumber(70_857),
    note:
      "The first six months are about building enough decision-stage coverage and trust signals for Hyro to move from marginal visibility into real buying consideration.",
    breakdown: [
      {
        label: "Competitor-keyword share of 6-month target",
        value: formatNumber(5_105),
      },
      {
        label: "Non-competitor / unbranded share of 6-month target",
        value: formatNumber(65_752),
        tone: "accent" as const,
      },
    ],
  },
];

const phasedUpsidePoints = [
  { month: 1, low: 1_000, base: 2_500, high: 5_000 },
  { month: 2, low: 3_000, base: 7_000, high: 13_000 },
  { month: 3, low: 7_000, base: 14_000, high: 26_000 },
  { month: 4, low: 14_000, base: 26_000, high: 46_000 },
  { month: 5, low: 25_000, base: 45_000, high: 80_000 },
  { month: 6, low: 36_200, base: 70_857, high: 118_000 },
  { month: 7, low: 47_000, base: 93_000, high: 154_000 },
  { month: 8, low: 58_000, base: 111_000, high: 187_000 },
  { month: 9, low: 69_500, base: 130_000, high: 221_000 },
  { month: 10, low: 80_500, base: 151_000, high: 257_000 },
  { month: 11, low: 90_600, base: 171_500, high: 293_000 },
  { month: 12, low: 99_308, base: 191_505, high: 327_134 },
];

const timelinePoints = [
  {
    month: 1,
    title: "Month 1 — establish the opening move",
    detail:
      "Hyro starts with the buyer-guide layer: the first high-intent pages, the initial technical cleanup, and the first off-site proof surfaces that help those pages get trusted faster.",
    bullets: [
      "Publish first decision pages around best electrolyte drink, best electrolyte powder, and best hydration powder",
      "Tighten crawl, canonical, sitemap, schema, Bing, and IndexNow handling",
      "Start review-profile reinforcement and first community placements",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 2_500,
    low: 1_000,
    base: 2_500,
    high: 5_000,
  },
  {
    month: 2,
    title: "Month 2 — expand comparison and proof",
    detail:
      "Hyro adds comparison and review-led pages while building backlinks, listicle visibility, and external proof around the first pages already in market.",
    bullets: [
      "Add comparison-led coverage and evaluation pages",
      "Push listicles, editorial mentions, and first backlinks into live assets",
      "Extend review and community participation around hydration decision queries",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 7_000,
    low: 3_000,
    base: 7_000,
    high: 13_000,
  },
  {
    month: 3,
    title: "Month 3 — deepen use-case coverage",
    detail:
      "Once the first decision pages are live, Hyro widens supporting coverage around ingredients, benefits, hydration scenarios, and product-form questions so both Google and answer engines see a fuller category story.",
    bullets: [
      "Expand use-case and ingredient/benefit pages",
      "Reinforce author, about, and entity consistency across owned and third-party surfaces",
      "Continue authority placements linked to the first decision pages",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 14_000,
    low: 7_000,
    base: 14_000,
    high: 26_000,
  },
  {
    month: 4,
    title: "Month 4 — reinforce what starts winning",
    detail:
      "Hyro begins refining pages that show early traction, widening adjacent variants, and strengthening the external proof that helps those pages become easier to trust and recommend.",
    bullets: [
      "Refresh early winners based on query movement and answer-surface patterns",
      "Expand adjacent buyer-guide variants and scenario pages",
      "Increase editorial, community, and review reinforcement behind pages already moving",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 26_000,
    low: 14_000,
    base: 26_000,
    high: 46_000,
  },
  {
    month: 5,
    title: "Month 5 — widen commercial coverage",
    detail:
      "The content system pushes into more comparison, alternative, and product-form language while authority work continues to point trust into the most commercially important destinations.",
    bullets: [
      "Scale evaluation coverage and supporting category routes",
      "Strengthen backlinks to decision pages rather than generic blog URLs",
      "Continue community and listicle visibility around real buyer questions",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 45_000,
    low: 25_000,
    base: 45_000,
    high: 80_000,
  },
  {
    month: 6,
    title: "Month 6 — first-wave system is visible",
    detail:
      "By this point Hyro should have a credible first-wave footprint: decision pages, comparison coverage, supporting category routes, review reinforcement, and a growing third-party trust layer.",
    bullets: [
      "Reach the first major coverage threshold around buyer intent",
      "Keep refreshing pages that are approaching page-one and answer-surface visibility",
      "Push authority into the assets most likely to influence buying consideration",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 70_857,
    low: 36_200,
    base: 70_857,
    high: 118_000,
  },
  {
    month: 7,
    title: "Month 7 — move beyond the first cluster",
    detail:
      "With the initial decision layer established, Hyro can widen into adjacent subtopics and category routes without losing focus on the commercial pages that matter most.",
    bullets: [
      "Expand adjacent category coverage and related scenario pages",
      "Keep reviews and community placements active",
      "Refresh underperforming pages before decay sets in",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 93_000,
    low: 47_000,
    base: 93_000,
    high: 154_000,
  },
  {
    month: 8,
    title: "Month 8 — compound distribution",
    detail:
      "Authority work keeps layering onto live assets so Hyro is not relying on publishing alone. The goal is repeated market visibility, not isolated page launches.",
    bullets: [
      "Increase press, listicle, and expert commentary touches",
      "Strengthen links and brand mentions into priority pages",
      "Expand forum and community visibility where buyers compare products",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 111_000,
    low: 58_000,
    base: 111_000,
    high: 187_000,
  },
  {
    month: 9,
    title: "Month 9 — broaden into larger category demand",
    detail:
      "After winning enough decision-stage visibility, Hyro can move farther up the category with better odds of converting that attention into trust and purchase intent.",
    bullets: [
      "Push broader category routes such as electrolyte drinks and electrolyte drink mix",
      "Connect broader coverage back into decision pages",
      "Use new authority proof to support broader category visibility",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 130_000,
    low: 69_500,
    base: 130_000,
    high: 221_000,
  },
  {
    month: 10,
    title: "Month 10 — refresh and defend",
    detail:
      "At this stage the job is no longer just expansion. Hyro must defend pages already winning, update comparison claims, and remove ambiguity that lets other brands reclaim ground.",
    bullets: [
      "Refresh aging decision pages and comparisons",
      "Patch weak prompts where Hyro remains absent",
      "Reinforce third-party proof on pages driving the best response",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 151_000,
    low: 80_500,
    base: 151_000,
    high: 257_000,
  },
  {
    month: 11,
    title: "Month 11 — consolidate the market story",
    detail:
      "Hyro should now look more complete to search engines and answer engines alike: not just a product page, but a fuller commercial category presence with repeated validation around it.",
    bullets: [
      "Strengthen link architecture and entity consistency",
      "Publish additional support around winning subtopics",
      "Sustain listicle, review, editorial, and community reinforcement",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 171_500,
    low: 90_600,
    base: 171_500,
    high: 293_000,
  },
  {
    month: 12,
    title: "Month 12 — category control starts to feel durable",
    detail:
      "The twelve-month outcome is not a one-time lift. It is a stronger default position around electrolyte buying decisions, supported by live pages, external proof, and ongoing defense.",
    bullets: [
      "Cumulative base case reaches 191,505 expected traffic",
      "The larger share of growth comes from non-competitor demand rather than brand interception alone",
      "The moat is stronger because visibility exists across owned, earned, and referenced surfaces",
    ],
    trafficLabel: "Cumulative traffic",
    trafficValue: 191_505,
    low: 99_308,
    base: 191_505,
    high: 327_134,
  },
];

const timelineMilestones = [
  {
    label: "Month 1",
    month: 1,
    title: "First decision pages and infrastructure base",
    detail:
      "Hyro publishes the first decision pages and gets the site into better shape for indexing, retrieval, and machine-readable trust.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 2_500,
  },
  {
    label: "Month 2",
    month: 2,
    title: "Comparisons, reviews, and early off-site proof",
    detail:
      "The initial layer is no longer just on-site. Comparison coverage, review reinforcement, listicles, and backlinks start attaching to live assets.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 7_000,
  },
  {
    label: "Month 3",
    month: 3,
    title: "Supporting category coverage expands",
    detail:
      "Hyro begins to look more complete around the category, which helps both search and answer engines find the same commercial story in more contexts.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 14_000,
  },
  {
    label: "Month 6",
    month: 6,
    title: "First-wave market footprint is visible",
    detail:
      "By month 6, the first major decision layer, supporting coverage, and off-site trust system should be established and compounding.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 70_857,
  },
  {
    label: "Month 9",
    month: 9,
    title: "Broader category routes come online",
    detail:
      "Once the commercial layer is in place, Hyro can widen into larger category demand with better conversion and credibility.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 130_000,
  },
  {
    label: "Month 12",
    month: 12,
    title: "Hyro becomes harder to ignore",
    detail:
      "The brand is supported by a wider category footprint, stronger third-party proof, and more durable buying-consideration visibility.",
    trafficLabel: "Cumulative traffic",
    trafficValue: 191_505,
  },
];

export default function StrategyDrinkhyro() {
  useEffect(() => {
    document.title = "Hyro Strategy | Memetik";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />
      <div className="mx-auto max-w-6xl space-y-16 md:space-y-20">
        <StrategyHero
          eyebrow="00 Founder strategy memo"
          title="Hyro can own the electrolyte conversation"
          subtitle="Google still drives a major share of commercial research in this category, but buyers no longer stay inside classic search before they choose. They move across Google, ChatGPT, Gemini, AI overviews, editorial roundups, reviews, and community threads. Hyro already has enough authority to win the decision-stage layer first — then widen into broader electrolyte demand with a stronger moat."
          tags={["drinkhyro.com", "Consumer Health", "US market", "Electrolyte Drink Mix"]}
        >
          <div className="max-w-4xl space-y-4">
            <HighlightBox>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Executive summary</div>
              <p className="mt-3 text-xl font-display font-semibold tracking-tight text-white md:text-2xl">
                Hyro's opening move is not to chase the whole electrolyte market at once. It is to win the buyer-guide and
                decision layer where product choice is already happening, then build supporting coverage and third-party proof
                around those pages until Hyro becomes much easier to choose.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
                The page below is derived from the approved strategy brief, not raw research alone. It stays focused on the
                category opening, the commercial upside, and the execution system required to make Hyro visible across both
                search and answer surfaces.
              </p>
            </HighlightBox>

            <div className="space-y-4">
              {executiveMetrics.map((metric) => (
                <ExecutiveMetricCard key={metric.label} {...metric} />
              ))}
            </div>

            <StrategySectionShell>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Immediate actions</div>
              <div className="mt-4 space-y-4">
                <ImmediateActionCard
                  number="01"
                  title="Own the buyer-guide layer first"
                  body="Start with the highest-intent pages around best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix."
                />
                <ImmediateActionCard
                  number="02"
                  title="Attach third-party proof to every live page"
                  body="Do not publish decision pages in isolation. Pair them with reviews, Reddit and community participation, listicles, editorial mentions, and backlinks so Hyro looks credible beyond its own site."
                />
                <ImmediateActionCard
                  number="03"
                  title="Expand behind the pages that start to win"
                  body="Once the first decision pages gain traction, widen into comparisons, product-form explainers, ingredient and benefit coverage, and broader category routes — while refreshing the earliest winners."
                />
              </div>

              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-white/60">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Validation note</span>
                <span className="ml-2">
                  Topical integrity passed, with low-quality semantic demand share at 0.1%, so headline opportunity claims are
                  grounded in validated category demand rather than inflated keyword noise.
                </span>
              </div>
            </StrategySectionShell>
          </div>
        </StrategyHero>

        <section>
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still matters enormously, but it is no longer the only place where electrolyte purchase decisions start to form."
            body="Traditional search remains a core buying behavior, especially for category research and product evaluation. At the same time, answer engines now shape which brands get surfaced first, summarized first, and trusted first. In practical terms, Hyro needs visibility across classic search demand capture and the AI-led answer layer sitting around it."
            implication="If Hyro only optimizes for rankings and ignores answer surfaces, it risks losing buying consideration before the shopper ever lands on a product page."
          />
          <StrategySectionShell className="space-y-4">
            <InsightBlock
              icon={<Search className="h-5 w-5" />}
              title="Classic search still drives category research"
              body="High-intent electrolyte queries still run through Google at meaningful scale. Buyers research ingredients, use cases, comparisons, and best-in-category options long before purchase."
              bullets={[
                "Commercial research still starts with search behavior buyers already trust",
                "Category pages and buyer guides remain core entry points",
                "Large publisher roundups and established brands dominate if Hyro leaves these questions unanswered",
              ]}
            />
            <InsightBlock
              icon={<Bot className="h-5 w-5" />}
              title="AI compresses evaluation before the click"
              body="Answer engines are changing how buyers narrow their options. Instead of clicking through ten tabs, a buyer may now read one synthesized answer, compare a few named brands, and carry that filtered view back into search or retail."
              bullets={[
                "Being absent from sampled answer surfaces means Hyro is missing early consideration",
                "Repeated brand visibility across AI surfaces reinforces trust",
                "The new battleground is not just rank position — it is whether Hyro appears as a credible choice at all",
              ]}
            />
            <InsightBlock
              icon={<Globe className="h-5 w-5" />}
              title="The winning strategy has to span both systems"
              body="This category now rewards brands that combine search visibility, product-comparison coverage, and third-party trust. Hyro cannot treat search and answer engines as separate programs."
              bullets={[
                "Owned pages give answer engines and Google something to retrieve",
                "External proof makes those pages more believable",
                "The system compounds when the same story appears across the site, reviews, communities, and editorials",
              ]}
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="02" title="Where Hyro Is Today" />
          <StrategySectionLead
            takeaway="Hyro is not invisible because the brand lacks relevance. It is invisible because the category coverage around that relevance is still too thin."
            body="The current baseline shows a company with enough authority to start, but not enough commercial page coverage or answer-surface presence to compete with category leaders. That matters because incumbents are not just outranking Hyro — they are pre-shaping buyer perception before Hyro enters the conversation."
            implication="This is a scale-and-focus problem, not a relevance problem. Hyro already has enough signal to justify a serious category-capture push."
          />
          <StrategySectionShell className="space-y-4">
            <InsightBlock
              icon={<TrendingUp className="h-5 w-5" />}
              title="Current organic footprint is small against the market"
              body={`Hyro currently sits at ${formatNumber(1_004)} organic visits and ${formatNumber(362)} ranking keywords against a validated category opportunity of ${formatNumber(
                8_464_050
              )}.`}
              bullets={[
                "The opportunity is large enough that even focused execution can materially change growth",
                "The current footprint is too small to influence the broader category narrative",
                "The biggest issue is not whether demand exists; it is whether Hyro owns enough of the right pages",
              ]}
            />
            <InsightBlock
              icon={<Link2 className="h-5 w-5" />}
              title="Authority exists, but it is under-leveraged"
              body={`Hyro already has ${formatNumber(74)} referring domains and ${formatNumber(
                366
              )} backlinks. That is not enough to beat category leaders at scale today, but it is enough to support a focused opening move around buyer-intent pages.`}
              bullets={[
                "This gives Hyro a usable base rather than a cold start",
                "Authority should be concentrated around decision pages first, not spread thinly",
                "The right execution model turns modest authority into early traction faster",
              ]}
            />
            <InsightBlock
              icon={<Radar className="h-5 w-5" />}
              title="Sampled answer-surface visibility is effectively missing"
              body="Across the sampled unbranded prompts in the approved brief, Hyro showed 0.0% mention rate in ChatGPT, Gemini, and Google AI Overviews. That is the clearest signal that the brand has not yet built enough retrieval coverage or external validation around the questions buyers ask."
              bullets={[
                "The problem is not just ranking gaps; it is missing recommendation visibility",
                "Competitors are shaping the default answers in Hyro's category",
                "This creates hidden demand leakage that traditional analytics will undercount",
              ]}
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionLead
            takeaway="The smartest opening is to win the buyer-guide layer first, then widen into comparisons, reviews, and broader electrolyte demand."
            body="The data does not suggest Hyro should start by attacking the entire electrolyte category head-on. The stronger move is to own the decision-stage queries where product choice is clear, then build more coverage around those wins until Hyro has a broader category footprint."
            implication="This is how Hyro can move from marginal discoverability to meaningful buying consideration without wasting effort on a diluted first move."
          />
          <StrategySectionShell className="space-y-4">
            <InsightBlock
              icon={<Target className="h-5 w-5" />}
              title="Buyer guides are the first commercial opening"
              body={`The highest-leverage starting cluster is buyer-guide demand: ${formatNumber(
                211_170
              )} in validated search opportunity and ${formatNumber(
                23_229
              )} expected traffic in 12 months from that cluster alone.`}
              bullets={[
                "best electrolyte drink",
                "best electrolyte powder",
                "best hydration powder",
                "best electrolyte mix",
                "best electrolyte drink mix",
              ]}
            />
            <InsightBlock
              icon={<Compass className="h-5 w-5" />}
              title="Commercial keyword signals show Hyro is near the conversation, but not yet in it"
              body="The approved brief surfaced multiple high-intent terms where Hyro is present but too far down the page to matter commercially. That is useful because it shows the brand is adjacent to the right demand already."
              bullets={[
                "best cheap electrolyte powder — position 38",
                "best sugar-free electrolyte drink — position 58",
                "best electrolyte drink without potassium — position 62",
                "best electrolyte powder for pregnancy — position 89",
              ]}
            />
            <InsightBlock
              icon={<Layers3 className="h-5 w-5" />}
              title="The category can be widened once the first layer starts working"
              body="After buyer guides, Hyro should expand into comparisons, reviews, and supporting category coverage around hydration scenarios, ingredients, benefits, routines, and competitor-adjacent terms."
              bullets={[
                `Alternatives & comparisons: ${formatNumber(7_210)} demand`,
                `Reviews & social proof: ${formatNumber(3_720)} demand`,
                `Broader category and brand demand later: ${formatNumber(8_241_950)} demand`,
              ]}
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="04" title="Why Hyro Can Win" />
          <StrategySectionLead
            takeaway="Hyro has a credible right to win because the market is large, the first opening is focused, and most of the opportunity is unbranded."
            body="This is not a story where Hyro needs to outspend entrenched players everywhere at once. It is a story where Hyro can win a defined slice of commercial demand, build trust around that slice, and then use those wins to move into broader category coverage."
            implication="The brand does not need total category dominance on day one. It needs an opening that can compound."
          />
          <StrategySectionShell className="space-y-4">
            <InsightBlock
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Hyro has enough authority to support a focused push"
              body="A smaller brand can still win if it concentrates authority and proof around the right pages. Hyro's existing referring-domain base is enough to justify a focused category play instead of waiting for a larger authority profile first."
              bullets={[
                "74 referring domains is a usable base, not a blank slate",
                "366 backlinks provide starting support for concentrated commercial pages",
                "Focused execution matters more than diffuse publishing at this stage",
              ]}
            />
            <InsightBlock
              icon={<Star className="h-5 w-5" />}
              title="Most of the prize sits outside competitor-branded demand"
              body="Only 7.4% of mapped opportunity comes from competitor-keyword demand. The remaining 92.6% comes from non-competitor and unbranded demand — the kind of market share that is more defensible if Hyro earns it."
              bullets={[
                "Hyro is not limited to intercepting competitor brand searches",
                "The larger growth path comes from becoming visible for category questions",
                "That makes the channel more durable over time",
              ]}
            />
            <InsightBlock
              icon={<Sparkles className="h-5 w-5" />}
              title="The research quality is strong enough to act"
              body="The approved brief passed the research quality gate with high confidence, and topical integrity also passed. That matters because it reduces the risk that Hyro is chasing noisy or semantically weak demand."
              bullets={[
                "Payload confidence: high",
                "Quality gate: passed",
                "Low-quality semantic demand share: 0.1%",
              ]}
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="LMNT, Liquid I.V., Nuun, and other incumbents are winning because they already occupy the product-evaluation layer and receive more trust by default."
            body="The competitive issue is not just that these brands are larger. It is that they have more category pages, more authority, more external citations, and more visibility inside the answers buyers read before making a choice."
            implication="Hyro's job is not to copy their entire footprint at once. It is to beat them in a more focused opening move where buyer intent is strongest."
          />
          <StrategySectionShell className="space-y-5">
            <HighlightBox>
              <p className="text-2xl font-display font-semibold tracking-tight text-white">
                The incumbents already look like the obvious answers because they have built both the on-site coverage and
                the external proof Hyro still lacks.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
                In this category, scale shows up as more than traffic. It shows up as more comparison pages, more authority,
                more listicle appearances, more review gravity, and more repetition across AI and search surfaces.
              </p>
            </HighlightBox>

            <DataTable
              headers={["Competitor", "Organic traffic", "Referring domains", "Backlinks", "Prompt hits"]}
              rows={[
                ["LMNT", formatNumber(429_600), formatNumber(4_642), formatNumber(150_912), "7"],
                ["Liquid I.V.", formatNumber(456_449), formatNumber(2_789), formatNumber(44_257), "7"],
                ["Nuun", formatNumber(105_219), formatNumber(4_218), formatNumber(77_141), "6"],
                ["DripDrop", formatNumber(161_926), formatNumber(1_846), formatNumber(9_454), "2"],
                ["Hydralyte", formatNumber(4_169), formatNumber(586), formatNumber(1_842), "0"],
              ]}
            />

            <InsightBlock
              icon={<Gauge className="h-5 w-5" />}
              title="What Hyro has to do differently"
              body="Hyro should not begin by trying to out-cover the whole category. It should build the strongest, clearest decision pages in a narrower slice, then reinforce them with authority signals that large brands already benefit from."
              bullets={[
                "Attack the buyer-guide layer before broader category pages",
                "Use comparison and review content to narrow the authority gap faster",
                "Build external proof at the same time pages go live, not later",
              ]}
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionLead
            takeaway="On sampled unbranded prompts, Hyro is not yet part of the answers buyers are reading."
            body="That absence matters because answer engines are now part of the evaluation journey even when they do not send a measurable click. If Hyro wants to become easier to choose, it has to be found, cited, and reinforced across the same surfaces where competitors already appear."
            implication="This is why the strategy includes owned pages, supporting coverage, external proof, and technical cleanup as one system instead of a pure content plan."
          />
          <StrategySectionShell className="space-y-4">
            <PlatformCard
              platform="ChatGPT"
              value="0 / 8 sampled mentions"
              body="In the sampled prompts from the approved brief, ChatGPT did not mention Hyro. The pattern was brand-list style answers led by better-known electrolyte names."
            />
            <PlatformCard
              platform="Gemini"
              value="0 / 8 sampled mentions"
              body="Gemini also showed no validated Hyro mentions in the sampled set. Some responses were inconsistent, but the important commercial point is that Hyro was still absent."
            />
            <PlatformCard
              platform="Google AI Overviews"
              value="0 / 8 sampled mentions"
              body="The sampled AI Overview evidence named established competitors and large editorial sources instead of Hyro, which means the recommendation layer is currently being captured elsewhere."
            />

            <PromptExampleCard
              query="best electrolyte powder drink mix"
              surface="ChatGPT sample"
              observed="The sampled answer highlighted LMNT and other established brands as top options and did not mention Hyro."
              implication="Hyro is missing one of the clearest product-evaluation prompts in the category — exactly the kind of query that influences buying consideration before checkout."
            />
            <PromptExampleCard
              query="best electrolyte powder drink mix"
              surface="Google AI Overview sample"
              observed="The sampled AI Overview named LMNT, Liquid I.V., Ultima, Nuun, and DripDrop, supported by publisher citations such as Forbes and Men's Journal."
              implication="Even when the user starts with a broad commercial query, the visible answer already frames who belongs in the category conversation. Hyro is currently outside that frame."
            />
            <PromptExampleCard
              query="electrolyte powder drink mix comparison"
              surface="ChatGPT and Gemini samples"
              observed="The sampled comparison responses centered on Liquid I.V., LMNT, Nuun, DripDrop, and other familiar brands rather than surfacing Hyro as an option."
              implication="Comparison language is one of the fastest paths to being evaluated seriously. If Hyro is missing here, it is missing a critical part of product choice behavior."
            />

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Caveat discipline</div>
              <p className="mt-3 text-sm leading-7 text-white/64">
                One Perplexity probe and one broader LLM mention endpoint were unavailable during research, so this page stays
                intentionally conservative. The public narrative only uses validated samples from the approved brief rather than
                inventing broader platform certainty.
              </p>
            </div>
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionLead
            takeaway="If Hyro closes this visibility gap, the upside is meaningful because the market size is large and the current baseline is still small."
            body="The commercial logic here is straightforward. Hyro does not need every query in the electrolyte market. It needs enough presence around buyer-intent pages to create compounding traffic, stronger product consideration, and a healthier long-term acquisition mix."
            implication="Most of the upside comes from non-competitor demand, which means this can become a true growth asset rather than a narrow brand-interception tactic."
          />
          <StrategySectionShell className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <StrategyEyebrow>Estimate-only</StrategyEyebrow>
              <StrategyEyebrow>Validated topical scope</StrategyEyebrow>
              <StrategyEyebrow>12-month cumulative curve</StrategyEyebrow>
            </div>

            <StrategyCard>
              <p className="text-sm leading-7 text-white/66">
                Base planning points to <span className="text-white font-semibold">{formatNumber(191_505)}</span> expected
                traffic in 12 months, with a first 6-month target of{" "}
                <span className="text-white font-semibold">{formatNumber(70_857)}</span>. The aggressive upside reaches{" "}
                <span className="text-white font-semibold">{formatNumber(327_134)}</span> if Hyro compounds page coverage,
                external authority, and refresh loops successfully. The model is cumulative, so the final 12-month point aligns
                to the visible 12-month target shown above.
              </p>
            </StrategyCard>

            <PhasedUpsideChart points={phasedUpsidePoints} />

            <TamRoiCalculator baseReachableVisits={191_505} />

            <div className="rounded-[24px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Commercial planning note</div>
              <p className="mt-3 text-sm leading-7 text-white">
                Revenue planning requires client ACV/AOV and funnel inputs.
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Use Hyro's first-party conversion rates, repeat-purchase behavior, and blended customer value data to turn the
                traffic model into a more precise revenue model. Until those inputs are layered in, treat the calculator as a
                directional planning tool rather than a commitment.
              </p>
            </div>
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="08" title="6-month Growth Plan" />
          <StrategySectionLead
            takeaway="The first six months should feel like a clear market-entry sequence: decision pages first, proof second, expansion third, compounding thereafter."
            body="This is a founder-readable deployment view of what ships and why it ships in that order. The point is not to publish randomly. The point is to create a stronger answer layer around the exact questions that shape product choice."
            implication="Hyro should feel the program moving from focused entry into broader category control, not from isolated content launches into drift."
          />
          <StrategySectionShell className="space-y-4">
            <MonthPlanBlock
              label="Month 1"
              title="Build the opening move"
              body="Month 1 is about publishing the first decision pages and getting the site technically ready to support them. This is where Hyro begins to earn relevance for the product-selection layer."
              outputs={[
                "Publish the first buyer-guide pages around best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix",
                "Tighten canonicals, sitemap hygiene, crawl and index eligibility, schema, Bing Webmaster Tools, and IndexNow",
                "Set up the first review and profile reinforcement surfaces",
              ]}
              prompts={[
                "best electrolyte drink",
                "best electrolyte powder",
                "best hydration powder",
              ]}
              competitors="LMNT and Liquid I.V. are the clearest pressure points because they already appear prominently in sampled decision-stage answers."
              compounding="These pages become the core owned destinations that later backlinks, reviews, listicles, and comparison pages can reinforce."
            />

            <MonthPlanBlock
              label="Month 2"
              title="Expand comparisons and social proof"
              body="Month 2 builds out the evaluation layer around the first pages. Hyro should now start appearing more believable because the market sees both owned content and third-party reinforcement."
              outputs={[
                "Add comparison and evaluation pages tied to how buyers frame product tradeoffs",
                "Publish review-led proof pages and tighten product evidence on decision pages",
                "Push Reddit and community participation, listicles, backlinks, and early editorial touches into live assets",
              ]}
              prompts={[
                "electrolyte powder drink mix comparison",
                "electrolyte powder vs tablets",
                "brand and product review variations",
              ]}
              competitors="Liquid I.V., Nuun, and DripDrop become important benchmarks here because they are often included in comparison-style answers."
              compounding="This month makes Hyro harder to dismiss as a niche brand by attaching real proof to the first wave of category pages."
            />

            <MonthPlanBlock
              label="Month 3"
              title="Deepen supporting coverage and trust consistency"
              body="Month 3 expands the supporting content network around the first winners. That means more use-case, ingredient, benefit, and scenario coverage — plus cleaner entity consistency across owned and third-party surfaces."
              outputs={[
                "Add pages around hydration scenarios, ingredients, benefits, routines, and product-form explainers",
                "Reinforce author, about, brand, and review consistency across the web",
                "Keep backlinks, listicles, reviews, and community placements pointing into the strongest pages",
              ]}
              prompts={[
                "best sugar free electrolyte drink",
                "best low-sugar electrolyte drink",
                "best electrolyte powder for pregnancy",
              ]}
              competitors="This month also helps Hyro compete with publisher-style roundups, not only brand sites, because richer support coverage makes the overall story more complete."
              compounding="Hyro becomes more retrievable in more contexts, which improves both classic search coverage and answer-surface visibility."
            />

            <MonthPlanBlock
              label="Months 4–6"
              title="Compound, refresh, and widen category share"
              body="Once the first decision layer is live and supported, Hyro can widen coverage behind the pages already showing momentum. The focus shifts from launch to compounding."
              outputs={[
                "Build as many additional bottom-of-funnel and supporting pages as needed to cover the next winning demand pockets",
                "Refresh pages that show traction, patch weak pages, and update proof elements",
                "Increase editorial, listicle, backlink, review, and community momentum behind the strongest commercial assets",
              ]}
              prompts={[
                "broader buyer-guide variants",
                "adjacent category routes",
                "more comparison and review-led search behavior",
              ]}
              competitors="By this phase Hyro is contesting not just product brands but the broader editorial and answer-layer ecosystem that currently frames the category."
              compounding={`The goal by month 6 is a visibly stronger market footprint and a cumulative base target of ${formatNumber(
                70_857
              )}.`}
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="09" title="Off-site Authority" />
          <StrategySectionLead
            takeaway="Hyro will not become the trusted answer with on-site pages alone."
            body="Third-party proof is part of the core program, not a nice-to-have. In this category, brands that look real to buyers and answer engines both tend to have reviews, roundups, community references, editorial mentions, and backlinks pointing into the right pages."
            implication="Every important page should be supported by proof outside Hyro's own website."
          />
          <StrategySectionShell className="space-y-4">
            <InsightBlock
              icon={<MessageSquare className="h-5 w-5" />}
              title="Reddit, forums, and real community participation"
              body="Category buyers compare products in threads and discussion spaces long before they commit. Hyro needs visible participation around hydration questions, comparisons, use cases, and real product-selection conversations."
              bullets={[
                "Seed useful, non-spammy participation around product-comparison questions",
                "Show up in the same places where buyers ask peers what to choose",
                "Reinforce decision pages with external discussion and link signals where appropriate",
              ]}
            />
            <InsightBlock
              icon={<Star className="h-5 w-5" />}
              title="Reviews and third-party profile reinforcement"
              body="Review surfaces often play an outsized role in trust, especially when the user has already narrowed the field. Hyro needs cleaner review visibility and stronger profile consistency across the web."
              bullets={[
                "Strengthen review-platform presence and profile completeness",
                "Improve review acquisition and response handling where relevant",
                "Bring review proof back into core decision pages",
              ]}
            />
            <InsightBlock
              icon={<FileSearch className="h-5 w-5" />}
              title="Editorial roundups, listicles, and digital PR"
              body="Many answer surfaces and category pages cite publisher-style comparisons and best-of roundups. Hyro needs inclusion in those external narratives, not just its own internal claims."
              bullets={[
                "Push hydration roundups and comparison listicles",
                "Pursue editorial and expert commentary placements",
                "Use digital PR and press-style narratives to widen brand trust",
              ]}
            />
            <InsightBlock
              icon={<ArrowUpRight className="h-5 w-5" />}
              title="Backlinks directed at the pages that matter"
              body="Backlinks should reinforce Hyro's decision pages, comparison pages, and strongest supporting pages — not only generic homepage authority."
              bullets={[
                "Point links into buyer-guide and evaluation pages first",
                "Use external placements to reinforce the pages with the most commercial leverage",
                "Layer athlete, influencer, and expert proof where it strengthens credibility",
              ]}
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="10" title="What Memetik Actually Builds and Ships" />
          <StrategySectionLead
            takeaway="This is a serious execution program built to change market perception, not a light content retainer."
            body="Memetik does not just write articles and hope rankings happen. The program maps the priority buying queries, builds the commercial pages needed to win them, expands supporting coverage, reinforces those pages with aggressive authority work, and keeps the technical layer clean enough for search and answer engines to trust what they find."
            implication="A founder should read this section and immediately understand that Memetik is delivering both production and market pressure — on-site and off-site."
          />
          <StrategySectionShell className="space-y-4">
            <HighlightBox>
              <p className="text-2xl font-display font-semibold tracking-tight text-white">
                Memetik builds as many bottom-of-funnel pages as needed to cover the relevant demand, then expands supporting
                coverage and authority behind the winners.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
                The program is designed to shift who gets found, cited, and trusted when buyers ask commercial questions about
                electrolyte products.
              </p>
            </HighlightBox>

            <ScopeBlock
              index="01"
              title="Priority buying query mapping"
              body="Memetik starts by mapping the exact questions that create product choice, not just general category traffic."
              bullets={[
                "Identify the decision queries that matter most first",
                "Prioritize the terms where Hyro can enter fastest",
                "Sequence the attack so the first pages create the strongest commercial leverage",
              ]}
            />

            <ScopeBlock
              index="02"
              title="Bottom-of-funnel page production"
              body="Memetik builds the core decision pages around product selection, category evaluation, and use-case fit."
              bullets={[
                "Buyer-guide pages that answer best-in-category and best-for questions",
                "Clear product-selection pages built for real buying intent",
                "Page structures designed to be both readable for humans and easy to retrieve for answer engines",
              ]}
            />

            <ScopeBlock
              index="03"
              title="Comparison and evaluation coverage"
              body="Hyro needs dedicated content for side-by-side product choice, tradeoffs, alternatives, and review-led decision behavior."
              bullets={[
                "Comparison pages where category choice is explicit",
                "Review and proof pages that reduce trust friction",
                "Product-form and tradeoff explainers tied to evaluation behavior",
              ]}
            />

            <ScopeBlock
              index="04"
              title="Supporting content coverage behind the winners"
              body="Once the first commercial pages are in place, Memetik expands the surrounding support network so the same story appears across more contexts."
              bullets={[
                "Hydration scenarios, ingredients, benefits, routines, and use-case pages",
                "Category support pages that route authority into decision pages",
                "Broader coverage that makes Hyro more retrievable across search and answer engines",
              ]}
            />

            <ScopeBlock
              index="05"
              title="Aggressive backlink acquisition"
              body="Memetik pushes meaningful link support into the pages that matter commercially rather than treating link building as a separate vanity exercise."
              bullets={[
                "Backlinks aimed at decision and evaluation pages first",
                "Support for the pages most likely to influence buying consideration",
                "Authority building tied directly to Hyro's market-opening move",
              ]}
            />

            <ScopeBlock
              index="06"
              title="Digital PR, press-style pushes, and listicle inclusion"
              body="Memetik actively pushes Hyro into third-party narratives the market already trusts."
              bullets={[
                "Editorial and digital PR outreach around hydration and electrolyte narratives",
                "Placement pushes into comparison articles and roundups",
                "Proof distribution designed to make Hyro easier to cite and recommend",
              ]}
            />

            <ScopeBlock
              index="07"
              title="Reviews, communities, and third-party placements"
              body="Memetik makes Hyro more visible outside its own domain by reinforcing the places buyers and machines both use as trust inputs."
              bullets={[
                "Review-platform work and profile consistency",
                "Forum, Reddit, and community participation around real product questions",
                "Third-party placements that widen proof beyond the site itself",
              ]}
            />

            <ScopeBlock
              index="08"
              title="Bing, IndexNow, schema, and technical trust infrastructure"
              body="The technical layer stays explicit because a strong page still underperforms if it is hard to crawl, weakly structured, or inconsistent across surfaces."
              bullets={[
                "Schema matched to visible content",
                "Canonicals, sitemap hygiene, crawl and index eligibility",
                "Bing Webmaster Tools, IndexNow, and entity consistency across owned and third-party surfaces",
              ]}
            />

            <ScopeBlock
              index="09"
              title="Monthly refresh, reinforcement, and defense"
              body="Memetik does not treat the first wave of publishing as the end of the job. The system keeps strengthening what wins and patching what stays weak."
              bullets={[
                "Refresh and update live pages as the market changes",
                "Reinforce winners with more links, proof, and distribution",
                "Defend visibility instead of letting pages decay after launch",
              ]}
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="11" title="Operating Model" />
          <StrategySectionLead
            takeaway="Hyro needs monthly deployments that keep research, production, publishing, authority building, and measurement moving together."
            body="The timeline below shows how the program compounds over a full 12 months. It is not a one-time launch. It is a sequence of monthly deployments tied to cumulative traffic growth and stronger market visibility."
            implication="The objective is not just more pages. It is a stronger default position in the category over time."
          />
          <StrategySectionShell className="space-y-5">
            <GrowthTimelineChart points={timelinePoints} milestones={timelineMilestones} />

            <InsightBlock
              icon={<Database className="h-5 w-5" />}
              title="Each month runs concurrent workstreams"
              body="Every month includes prioritization, page production, publishing and indexing, off-site authority pushes, review reinforcement, and measurement. The mix shifts over time, but the program always runs as one system rather than a series of disconnected tasks."
            />

            <InsightBlock
              icon={<TrendingUp className="h-5 w-5" />}
              title="Monthly reporting stays commercial"
              body="Reporting should show whether Hyro is getting more visible around buying questions, whether authority proof is landing where it should, and whether the shipped work is translating into stronger downstream search performance."
              bullets={[
                "Default-answer visibility on sampled prompts",
                "Coverage movement across the priority commercial queries",
                "Proof that pages, authority work, and technical updates are actually shipping",
              ]}
            />

            <InsightBlock
              icon={<Users className="h-5 w-5" />}
              title="Quarterly review keeps the program from drifting"
              body="Every quarter, the program should re-evaluate what Hyro already owns, what is still weak, where competitors are moving, and where the next layer of category expansion should go."
            />
          </StrategySectionShell>
        </section>

        <section>
          <SectionHeader number="12" title="Why Memetik" />
          <StrategySectionLead
            takeaway="Memetik is built for brands that need to become easier to choose across both search and answer engines."
            body="The difference is not just better SEO execution. The difference is that Memetik treats owned pages, supporting coverage, off-site authority, technical eligibility, and refresh loops as one founder-level growth system."
            implication="For Hyro, that means a partner focused on market position and commercial visibility — not just publishing output."
          />
          <StrategySectionShell className="space-y-4">
            <InsightBlock
              icon={<Target className="h-5 w-5" />}
              title="Commercial first, not vanity first"
              body="Memetik works backward from the queries that shape product choice. The point is to influence buying consideration and category trust, not only to generate more low-intent traffic."
            />
            <InsightBlock
              icon={<Search className="h-5 w-5" />}
              title="Built for the blended search reality"
              body="Hyro's buyers now move through search, answer engines, reviews, communities, and editorial roundups. Memetik builds for that blended discovery path rather than treating AI visibility as a side topic."
            />
            <InsightBlock
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Execution that stays visible to founders"
              body="Memetik makes the program concrete: what ships in month 1, what expands in month 2, what compounds by month 3, and how the first six months lead into a stronger 12-month position."
            />
          </StrategySectionShell>
        </section>

        <StrategyCTA
          title="If Hyro wants the category to notice, the decision layer is the first place to start."
          body="The opportunity is large, the opening move is clear, and the execution model is already defined. If you want Memetik to help Hyro build the pages, authority, and infrastructure that make the brand easier to choose, the next step is a strategy call."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <section>
          <SectionHeader number="13" title="Supporting evidence appendix" />

          <div className="space-y-6">
            <StrategyAppendixSection
              defaultOpen
              title="Validated demand clusters"
              description="A compact view of the main demand groups extracted into the approved brief. This appendix keeps the detailed evidence below the fold while preserving the category logic that drives the public strategy."
            >
              <DataTable
                headers={["Cluster", "Phase", "Total search opportunity", "Expected traffic in 12 months", "Sample keywords"]}
                rows={[
                  [
                    "Category & brand demand",
                    "Months 9–12",
                    formatNumber(8_241_950),
                    formatNumber(167_074),
                    "electrolyte drinks, electrolyte drink mix, electrolyte powder, electrolyte drink",
                  ],
                  [
                    "Buyer guides",
                    "Months 0–3",
                    formatNumber(211_170),
                    formatNumber(23_229),
                    "best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix",
                  ],
                  [
                    "Alternatives & comparisons",
                    "Months 0–3",
                    formatNumber(7_210),
                    formatNumber(793),
                    "electrolyte powder drink mix comparison, electrolyte powder vs tablets, liquid iv vs gatorade",
                  ],
                  [
                    "Reviews & social proof",
                    "Months 0–3",
                    formatNumber(3_720),
                    formatNumber(409),
                    "lmnt electrolyte powder review, electrolyte review queries, brand review variants",
                  ],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Detailed competitor evidence"
              description="Competitor scale and prompt-hit evidence pulled into the approved brief. This is why the strategy starts with a focused opening rather than a diffuse category attack."
            >
              <DataTable
                headers={["Competitor", "Organic traffic", "Organic keywords", "Referring domains", "Backlinks", "Prompt hits"]}
                rows={[
                  ["LMNT", formatNumber(429_600), formatNumber(34_009), formatNumber(4_642), formatNumber(150_912), "7"],
                  ["Liquid I.V.", formatNumber(456_449), formatNumber(14_724), formatNumber(2_789), formatNumber(44_257), "7"],
                  ["Hydralyte", formatNumber(4_169), formatNumber(1_276), formatNumber(586), formatNumber(1_842), "0"],
                  ["Nuun", formatNumber(105_219), formatNumber(19_880), formatNumber(4_218), formatNumber(77_141), "6"],
                  ["DripDrop", formatNumber(161_926), formatNumber(14_368), formatNumber(1_846), formatNumber(9_454), "2"],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Sample AI prompt evidence"
              description="Public-safe prompt examples used in the main narrative. These are unbranded commercial prompts rather than branded vanity checks."
            >
              <DataTable
                headers={["Prompt", "Surface", "Observed answer pattern", "Founder read"]}
                rows={[
                  [
                    "best electrolyte powder drink mix",
                    "ChatGPT",
                    "Answer highlighted LMNT and other established options; Hyro absent.",
                    "Hyro is missing one of the clearest product-selection prompts in the market.",
                  ],
                  [
                    "best electrolyte powder drink mix",
                    "Google AI Overview",
                    "Named LMNT, Liquid I.V., Ultima, Nuun, and DripDrop with editorial citations; Hyro absent.",
                    "The visible recommendation layer is already framing who belongs in the category conversation.",
                  ],
                  [
                    "electrolyte powder drink mix comparison",
                    "ChatGPT / Gemini samples",
                    "Comparison responses centered on familiar incumbents rather than Hyro.",
                    "Hyro is not yet present in evaluation language where buyers compare tradeoffs.",
                  ],
                ]}
              />

              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/20 p-4 text-sm leading-7 text-white/62">
                Public caveat: one Perplexity probe and one broader LLM mention endpoint were unavailable during research, so
                the page only uses validated platform samples rather than claiming broader certainty.
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Attribution split, confidence, and caveats"
              description="The opportunity is dominated by non-competitor demand, and the research passed the quality and topical-integrity filters."
            >
              <div className="space-y-4">
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Keyword attribution summary</div>
                  <div className="mt-4">
                    <BulletList
                      items={[
                        `Competitor-keyword demand: ${formatNumber(629_440)} (7.4%)`,
                        `Non-competitor / unbranded demand: ${formatNumber(7_834_610)} (92.6%)`,
                        `Competitor-keyword expected traffic in 12 months: ${formatNumber(13_798)}`,
                        `Non-competitor / unbranded expected traffic in 12 months: ${formatNumber(177_707)}`,
                        `Competitor-keyword first 6-month target: ${formatNumber(5_105)}`,
                        `Non-competitor / unbranded first 6-month target: ${formatNumber(65_752)}`,
                      ]}
                    />
                  </div>
                </StrategyCard>

                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Confidence and guardrails</div>
                  <div className="mt-4">
                    <BulletList
                      items={[
                        "Payload confidence: high (100/100)",
                        "Quality gate: passed",
                        "Topical integrity: passed",
                        "Low-quality semantic demand share: 0.1%",
                        "Revenue planning requires Hyro's first-party ACV/AOV and funnel inputs",
                      ]}
                    />
                  </div>
                </StrategyCard>

                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Source trace</div>
                  <p className="mt-3 text-sm leading-7 text-white/64">
                    Canonical lineage for this page is fixed: master reference → generation contract → approved brief → page.
                    Public claims were drawn from the approved brief dated 2026-03-09 and softened where platform-specific gaps
                    remained unresolved.
                  </p>
                </StrategyCard>
              </div>
            </StrategyAppendixSection>
          </div>
        </section>
      </div>
    </StrategyPageFrame>
  );
}