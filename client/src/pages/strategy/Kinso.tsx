import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Compass,
  Database,
  FileSearch,
  Globe,
  Layers3,
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
  TrendingUp,
  Workflow,
} from "lucide-react";
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

const formatWhole = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? Math.round(value) : 0
  );

function ExecutiveMetricCard({
  label,
  value,
  note,
  breakdown,
}: {
  label: string;
  value: string;
  note: string;
  breakdown: { label: string; value: string }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/48">{label}</div>
        <div className="mt-3 break-words text-[clamp(2.15rem,5vw,4rem)] font-display font-extrabold leading-[0.94] tracking-tight text-white">
          {value}
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/64">{note}</p>

        <div className="mt-4 rounded-[22px] border border-white/8 bg-black/20 p-4">
          <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
            demand composition
          </div>
          <div className="space-y-2">
            {breakdown.map((item) => (
              <div
                key={`${label}-${item.label}`}
                className="flex flex-col gap-1 rounded-[16px] border border-white/8 bg-white/[0.03] px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="text-xs font-mono uppercase tracking-[0.14em] text-white/40">{item.label}</div>
                <div className="text-sm font-medium text-white/78">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
    <StrategyCard className="rounded-[28px]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          {index}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Immediate action</div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
    </StrategyCard>
  );
}

function NarrativeCard({
  icon,
  eyebrow,
  title,
  body,
  bullets,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
}) {
  return (
    <StrategyCard className="rounded-[28px]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 text-[#f4e4cd]">
          {icon}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{eyebrow}</div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
      {bullets?.length ? <div className="mt-4"><BulletList items={bullets} /></div> : null}
    </StrategyCard>
  );
}

function PromptCard({
  prompt,
  status,
  today,
  nextMove,
}: {
  prompt: string;
  status: string;
  today: string;
  nextMove: string;
}) {
  return (
    <StrategyCard className="rounded-[28px]">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Unbranded buying prompt</div>
      <h3 className="mt-3 text-lg font-semibold text-white">{prompt}</h3>
      <div className="mt-4 space-y-3">
        <div className="rounded-[18px] border border-white/8 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Current status</div>
          <p className="mt-2 text-sm leading-6 text-white/72">{status}</p>
        </div>
        <div className="rounded-[18px] border border-white/8 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">What buyers see today</div>
          <p className="mt-2 text-sm leading-6 text-white/72">{today}</p>
        </div>
        <div className="rounded-[18px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What must change</div>
          <p className="mt-2 text-sm leading-6 text-white">{nextMove}</p>
        </div>
      </div>
    </StrategyCard>
  );
}

function RolloutCard({
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
    <StrategyCard className="rounded-[30px]">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{label}</div>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/66">{body}</p>
      <div className="mt-5">
        <BulletList items={bullets} />
      </div>
    </StrategyCard>
  );
}

function ScopeBlock({
  label,
  title,
  body,
  items,
}: {
  label: string;
  title: string;
  body: string;
  items: string[];
}) {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-md">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{label}</div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
        <div className="mt-5">
          <BulletList items={items} />
        </div>
      </div>
    </div>
  );
}

const executiveMetrics = [
  {
    label: "Total search opportunity",
    value: formatWhole(8250150),
    note: "Validated demand across the US and AU inside Kinso's relevant category frame, filtered through the approved brief's topical-integrity guardrails.",
    breakdown: [
      { label: "Competitor-keyword demand", value: `${formatWhole(471610)} (5.7%)` },
      { label: "Non-competitor / unbranded", value: `${formatWhole(7778540)} (94.3%)` },
    ],
  },
  {
    label: "Expected traffic in 12 months",
    value: formatWhole(575954),
    note: "Base-case planning view if Kinso starts with decision-stage shared inbox and email triage demand, then compounds authority and broader category coverage.",
    breakdown: [
      { label: "Competitor-keyword traffic", value: formatWhole(10052) },
      { label: "Non-competitor / unbranded", value: formatWhole(565902) },
    ],
  },
  {
    label: "Aggressive upside",
    value: formatWhole(859549),
    note: "Upper-range planning case if the first buyer-guide pages win early, off-site authority reinforces them quickly, and broader category coverage opens on schedule.",
    breakdown: [
      { label: "Demand mix in model", value: "5.7% competitor-led / 94.3% non-competitor" },
      { label: "Primary upside driver", value: "Unbranded buyer-guide demand, not competitor spillover" },
    ],
  },
  {
    label: "First 6-month target",
    value: formatWhole(213103),
    note: "The first half of the program is about building enough decision-page coverage and authority to turn Kinso into a visible option during live buying research.",
    breakdown: [
      { label: "Competitor-keyword target", value: formatWhole(3719) },
      { label: "Non-competitor / unbranded", value: formatWhole(209384) },
    ],
  },
];

const phasedUpsidePoints = [
  { month: 1, low: 12000, base: 18000, high: 26000 },
  { month: 2, low: 35000, base: 52000, high: 76000 },
  { month: 3, low: 70000, base: 98000, high: 145000 },
  { month: 4, low: 100000, base: 138000, high: 210000 },
  { month: 5, low: 125000, base: 174000, high: 260000 },
  { month: 6, low: 150000, base: 213103, high: 320000 },
  { month: 7, low: 178000, base: 260000, high: 390000 },
  { month: 8, low: 210000, base: 315000, high: 470000 },
  { month: 9, low: 245000, base: 380000, high: 565000 },
  { month: 10, low: 282000, base: 445000, high: 660000 },
  { month: 11, low: 320000, base: 510000, high: 760000 },
  { month: 12, low: 356299, base: 575954, high: 859549 },
];

const timelinePoints = [
  {
    month: 1,
    low: 12000,
    base: 18000,
    high: 26000,
    title: "Opening move set",
    detail:
      "Month 1 defines the category opening: Kinso publishes the first buyer-guide and decision-stage pages around AI shared inbox and email triage software, while the site infrastructure is aligned for indexing and machine readability.",
    bullets: [
      "Map the highest-priority buying queries and competitor angles",
      "Ship first decision pages around shared inbox, Gmail workflow, and email triage use cases",
      "Tighten schema, canonicals, sitemap hygiene, Bing Webmaster Tools, and IndexNow",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 18000,
  },
  {
    month: 2,
    low: 35000,
    base: 52000,
    high: 76000,
    title: "Authority attached to the first pages",
    detail:
      "Month 2 turns owned pages into market signals. Comparison pages, reviews, listicles, community placements, and early backlinks start reinforcing the same commercial story around the first topics.",
    bullets: [
      "Expand comparison and evaluation content against Front, Help Scout, and Missive",
      "Push review-profile reinforcement and first community participation",
      "Start backlink and placement pushes into the pages that matter most",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 52000,
  },
  {
    month: 3,
    low: 70000,
    base: 98000,
    high: 145000,
    title: "Coverage deepens around the winners",
    detail:
      "Month 3 builds supporting content around the first decision pages so search engines and answer engines keep finding the same narrative across use cases, proof objects, and adjacent query patterns.",
    bullets: [
      "Publish supporting content around buyer context, product form, and benefit proof",
      "Reinforce entity consistency across owned and third-party surfaces",
      "Use performance signals to decide which first-wave pages deserve heavier reinforcement",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 98000,
  },
  {
    month: 4,
    low: 100000,
    base: 138000,
    high: 210000,
    title: "First clusters start to compound",
    detail:
      "Month 4 expands the supporting network and widens distribution. Kinso is no longer just publishing pages; it is building category memory across search results, answer surfaces, and external references.",
    bullets: [
      "Widen coverage around collaboration, triage, and shared inbox workflows",
      "Refresh first pages using live search and answer-surface feedback",
      "Push more editorial-style placements and expert commentary mentions",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 138000,
  },
  {
    month: 5,
    low: 125000,
    base: 174000,
    high: 260000,
    title: "Proof layer expands",
    detail:
      "Month 5 adds more evidence-heavy pages and stronger off-site trust signals, making Kinso's commercial story easier to believe when buyers compare options.",
    bullets: [
      "Add product-form explainers and ingredient-style proof pages",
      "Increase review momentum and third-party list inclusion",
      "Route new backlinks to the pages already earning traction",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 174000,
  },
  {
    month: 6,
    low: 150000,
    base: 213103,
    high: 320000,
    title: "First six-month threshold reached",
    detail:
      "By Month 6 the goal is a repeatable deployment engine: decision pages, supporting coverage, reviews, backlinks, editorial mentions, and technical reinforcement all moving in sync.",
    bullets: [
      "Reach the first major visibility threshold in Kinso's target category slice",
      "Double down on pages and prompts showing strongest traction",
      "Prepare expansion into adjacent template and workflow demand",
    ],
    trafficLabel: "First 6-month target",
    trafficValue: 213103,
  },
  {
    month: 7,
    low: 178000,
    base: 260000,
    high: 390000,
    title: "Expansion beyond the first decision pages",
    detail:
      "After the initial buyer-guide layer proves out, Month 7 widens Kinso's footprint into adjacent workflows and use cases without losing commercial focus.",
    bullets: [
      "Expand beyond first-wave category pages into adjacent workflow pages",
      "Patch weak prompts where incumbents still hold the frame",
      "Keep authority pushes tied to live winners rather than vanity topics",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 260000,
  },
  {
    month: 8,
    low: 210000,
    base: 315000,
    high: 470000,
    title: "Broader supporting coverage takes hold",
    detail:
      "Month 8 builds out more of the surrounding content network so Kinso can show up in more contexts while keeping the main decision pages at the center of authority flow.",
    bullets: [
      "Expand supporting content coverage around templates and operational use cases",
      "Refresh pages that need stronger proof, structure, or internal linking",
      "Broaden newsletter, editorial, and professional-network distribution",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 315000,
  },
  {
    month: 9,
    low: 245000,
    base: 380000,
    high: 565000,
    title: "Category reach broadens",
    detail:
      "Month 9 is where the first controlled expansion into broader category demand becomes viable, because Kinso now has a stronger base of owned pages and third-party proof.",
    bullets: [
      "Move into broader category demand once first decision pages are established",
      "Use refreshed proof and authority to support higher-volume topics",
      "Defend terms where competitors react to Kinso's growing presence",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 380000,
  },
  {
    month: 10,
    low: 282000,
    base: 445000,
    high: 660000,
    title: "Defense and reinforcement",
    detail:
      "Month 10 focuses on consolidating gains: stronger refresh cycles, more external citations, and sharper internal authority routing into the pages that have become most commercially important.",
    bullets: [
      "Refresh aging pages before competitors can reclaim narrative control",
      "Route new authority into the highest-converting decision pages",
      "Keep review and community signals active instead of letting them decay",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 445000,
  },
  {
    month: 11,
    low: 320000,
    base: 510000,
    high: 760000,
    title: "Category consistency across surfaces",
    detail:
      "Month 11 is about making Kinso's story feel consistent wherever a buyer checks: traditional search, AI answers, review sites, listicles, and community discussions.",
    bullets: [
      "Close message gaps across owned, earned, and referenced surfaces",
      "Strengthen comparisons and proof pages that influence vendor consideration",
      "Use monthly reporting to reallocate effort toward the strongest clusters",
    ],
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 510000,
  },
  {
    month: 12,
    low: 356299,
    base: 575954,
    high: 859549,
    title: "Year-one category position defended",
    detail:
      "Month 12 is not an endpoint. It is the point where Kinso should have a defendable market position across the most important buying queries, with enough off-site proof and infrastructure to keep compounding.",
    bullets: [
      "Defend owned category pages with refreshes and new authority signals",
      "Expand into adjacent opportunities without diluting the first wins",
      "Treat search and answer-surface visibility as a durable growth asset, not a one-time launch",
    ],
    trafficLabel: "Expected traffic in 12 months",
    trafficValue: 575954,
  },
];

const timelineMilestones = [
  {
    label: "Month 1",
    month: 1,
    title: "Opening move",
    detail:
      "Set the first commercial angle around AI shared inbox and email triage queries, ship first decision pages, and align infrastructure so the market can actually find and index them.",
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 18000,
  },
  {
    label: "Month 2",
    month: 2,
    title: "Authority reinforcement",
    detail:
      "Attach reviews, comparisons, community proof, backlinks, and listicle/editorial placements to the first live pages rather than waiting until later.",
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 52000,
  },
  {
    label: "Month 3",
    month: 3,
    title: "Coverage depth",
    detail:
      "Expand supporting content and proof so answer engines and classic search surfaces keep seeing Kinso's narrative repeated in more contexts.",
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 98000,
  },
  {
    label: "Month 6",
    month: 6,
    title: "First compounding threshold",
    detail:
      "Decision pages, supporting coverage, off-site authority, and technical reinforcement are all running together, pushing Kinso into real buying consideration.",
    trafficLabel: "First 6-month target",
    trafficValue: 213103,
  },
  {
    label: "Month 9",
    month: 9,
    title: "Broader category reach",
    detail:
      "Kinso can start widening into adjacent category demand because the first decision-stage pages and authority surfaces are already established.",
    trafficLabel: "Cumulative traffic plan",
    trafficValue: 380000,
  },
  {
    label: "Month 12",
    month: 12,
    title: "Year-one position",
    detail:
      "The goal is a defendable presence across the right category questions, not a one-time publishing burst.",
    trafficLabel: "Expected traffic in 12 months",
    trafficValue: 575954,
  },
];

export default function StrategyKinso() {
  useEffect(() => {
    document.title = "Kinso Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame mainClassName="mx-auto max-w-6xl">
      <Nav />

      <StrategyHero
        eyebrow="Founder strategy memo"
        title="Kinso can own shared inbox demand"
        subtitle="The opening move is not broad awareness. It is to win the buyer-guide and decision-stage conversation around AI shared inbox and email triage software, then reinforce that position across Google, ChatGPT, Gemini, and other answer layers before incumbents keep defining the category for you."
        tags={["kinso.ai", "Communication / Collaboration", "Unified AI Inbox", "US + AU"]}
      >
        <div className="max-w-4xl space-y-4">
          <div className="mb-2">
            <StrategyEyebrow>Executive Summary</StrategyEyebrow>
          </div>

          {executiveMetrics.map((metric) => (
            <ExecutiveMetricCard key={metric.label} {...metric} />
          ))}

          <div className="pt-3">
            <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/46">
              Immediate actions
            </div>
            <div className="space-y-4">
              <ImmediateActionCard
                index="01"
                title="Own the first buyer-guide category pages"
                body="Start with the commercial queries where buyers are already comparing options: AI shared inbox software, email triage software, collaboration-heavy inbox workflows, and adjacent Gmail-oriented decision pages."
              />
              <ImmediateActionCard
                index="02"
                title="Attach authority to every important page"
                body="Do not publish pages in isolation. Every core page should be reinforced with review profiles, community participation, third-party mentions, backlinks, and listicle or editorial coverage so buyers and answer engines see the same story repeatedly."
              />
              <ImmediateActionCard
                index="03"
                title="Build depth around the first winners"
                body="Once the first decision pages are live, expand supporting coverage, entity consistency, and refresh loops around the winners until Kinso becomes a believable default option rather than a hidden alternative."
              />
            </div>
          </div>
        </div>
      </StrategyHero>

      <div className="space-y-10 md:space-y-12">
        <StrategySectionShell>
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still drives major commercial discovery, but buying consideration now forms across both classic search and AI answers before sales ever enters the room."
            body="Traditional search remains core behavior. Buyers still research categories, comparisons, pricing logic, and use cases in Google. But they also move through ChatGPT, Gemini, Perplexity, and other answer layers to compress research, compare vendors, and decide who looks credible enough to evaluate further."
            implication="For Kinso, the job is not choosing between SEO and AI visibility. The job is making the same commercial story easy to find across both."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Search className="h-5 w-5" />}
              eyebrow="Market reality"
              title="Google remains the main discovery rail"
              body="A large share of category research still starts in classic search. That matters because Kinso is currently small in organic visibility, and the market already has incumbents with far deeper page coverage and authority."
            />
            <NarrativeCard
              icon={<Bot className="h-5 w-5" />}
              eyebrow="Buying behavior"
              title="AI changes how vendors get evaluated"
              body="Buyers increasingly use AI interfaces to ask which tools are best, which option fits a workflow, or which vendor is most credible. Those answer layers influence vendor consideration even when analytics never record a visit."
            />
            <NarrativeCard
              icon={<Globe className="h-5 w-5" />}
              eyebrow="What winning now requires"
              title="Category visibility has to be consistent across surfaces"
              body="If Kinso only invests in traditional rankings, incumbents keep owning the answer layer. If it only thinks about AI mentions, it misses the Google demand that still drives category research at scale. The moat comes from owning both."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="02" title="Where Kinso Is Today" />
          <StrategySectionLead
            takeaway="Kinso is not starting from zero, but it is still nearly invisible relative to the size of the category it could win."
            body="The approved brief shows a meaningful category opportunity and a real, usable authority base. What is missing is the concentrated commercial page layer and off-site reinforcement needed to turn that base into visible buying consideration."
            implication="This is a positioning and execution gap, not a demand gap."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<LineChart className="h-5 w-5" />}
              eyebrow="Current search footprint"
              title="599 monthly organic visits against an 8.25M opportunity"
              body="Kinso currently captures a tiny share of the validated market: 599 organic visits and 22 ranking keywords against a total search opportunity of 8,250,150."
              bullets={[
                "Current organic traffic: 599",
                "Current organic keywords: 22",
                "No ranked commercial keywords were found in the approved brief",
              ]}
            />
            <NarrativeCard
              icon={<Link2 className="h-5 w-5" />}
              eyebrow="Existing authority"
              title="There is enough authority to support a focused opening move"
              body="Kinso already has 64 referring domains and 435 backlinks. That is far below the category leaders, but it is enough to support a concentrated effort around the right decision pages if authority work accelerates with publishing."
              bullets={[
                "Referring domains: 64",
                "Backlinks: 435",
                "Authority exists, but not yet at category-defining scale",
              ]}
            />
            <NarrativeCard
              icon={<Radar className="h-5 w-5" />}
              eyebrow="Commercial visibility gap"
              title="The missing layer is commercial page depth and off-site reinforcement"
              body="Kinso has not yet translated product relevance into a decisive set of buyer-guide pages, comparisons, proof assets, review coverage, and third-party mentions. That is why the company remains easy to overlook during live evaluation."
            />
            <NarrativeCard
              icon={<Bot className="h-5 w-5" />}
              eyebrow="Answer-surface snapshot"
              title="Sampled AI visibility is effectively absent"
              body="In the approved brief, Kinso recorded 0.0% sampled mention rate across ChatGPT, Gemini, and Google AI Overviews for the tested prompts. That is exactly the gap this program is built to close."
              bullets={[
                "ChatGPT: 0 / 16 sampled mentions",
                "Gemini: 0 / 16 sampled mentions",
                "Google AI Overview: 0 / 16 sampled mentions",
              ]}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionLead
            takeaway="The highest-leverage opening is narrow, commercial, and immediate: own decision-stage shared inbox and email triage demand before expanding into broader category reach."
            body="The strongest first layer is not generic brand awareness. It is the buyer-guide cluster where buyers are actively trying to choose software, compare workflows, and understand what kind of inbox product fits them."
            implication="Kinso should win the decision moment first, then use that position to grow into adjacent category demand."
          />

          <HighlightBox className="mb-4">
            <div className="max-w-4xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Core commercial read</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Most of the opportunity is unbranded.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">
                Only 5.7% of validated demand is tied to competitor-keyword patterns. The other 94.3% is non-competitor or unbranded demand. That means Kinso does not need to steal an already-closed market; it needs to become visible where buyers are still asking category and workflow questions without a fixed vendor in mind.
              </p>
            </div>
          </HighlightBox>

          <div className="space-y-4">
            <NarrativeCard
              icon={<Target className="h-5 w-5" />}
              eyebrow="Phase 1"
              title="Buyer-guide demand is the first attack surface"
              body="The biggest commercial cluster is the buyer-guide layer. That is where Kinso can earn buying consideration fastest because the searcher is already looking for tools, evaluating options, or framing a workflow problem in software terms."
              bullets={[
                `Demand: ${formatWhole(4537700)}`,
                `Expected traffic in 12 months: ${formatWhole(499147)}`,
                "Sample keywords: inbox and gmail, gmail inbox, team collaboration tools, inbox, inbox by gmail",
              ]}
            />
            <NarrativeCard
              icon={<Compass className="h-5 w-5" />}
              eyebrow="Phase 1"
              title="Comparisons matter even when they are not the largest cluster"
              body="Alternatives and head-to-head comparisons may be smaller in raw volume, but they are disproportionately important in real buying consideration. They help Kinso intercept buyers who already know some incumbents and are trying to choose."
              bullets={[
                "High leverage despite smaller volume",
                "Useful against Front, Help Scout, and Missive evaluation patterns",
                "Best shipped early, not postponed",
              ]}
            />
            <NarrativeCard
              icon={<Layers3 className="h-5 w-5" />}
              eyebrow="Phase 2"
              title="Templates and workflow pages widen coverage after the first wins"
              body="Once the first commercial pages are established, Kinso can widen into templates and operational workflow demand. Those pages deepen relevance, create more retrieval coverage, and support the main decision pages."
              bullets={[
                `Demand: ${formatWhole(18880)}`,
                "Sample keywords: gmail email template, gmail templates",
                "Useful as supporting coverage once the core story is established",
              ]}
            />
            <NarrativeCard
              icon={<Globe className="h-5 w-5" />}
              eyebrow="Phase 3"
              title="Broader category demand becomes realistic later"
              body="Generic category and brand-adjacent demand is large, but it should come after Kinso has already built authority around decision-stage shared inbox and triage queries. Broad expansion works better when the company already looks credible in the core slice."
              bullets={[
                `Demand: ${formatWhole(3693430)}`,
                `Expected traffic in 12 months: ${formatWhole(75942)}`,
                "This is later expansion, not the opening move",
              ]}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="04" title="Why Kinso Can Win" />
          <StrategySectionLead
            takeaway="Kinso can win because the market is large, mostly unbranded, and not yet matched by a concentrated Kinso-owned answer layer."
            body="The approved brief does not support a claim that Kinso already owns the conversation. It does support a much more useful claim: Kinso has product relevance, enough authority to start, and a market where most demand is still open to whoever builds the clearest commercial narrative first."
            implication="This is a company that can earn market position through focused execution, not one that needs a miracle."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Sparkles className="h-5 w-5" />}
              eyebrow="Reason 1"
              title="The product fits the first commercial story"
              body="Kinso sits naturally inside the shared inbox and email triage conversation. That gives the company a credible right to publish category-defining pages instead of stretching into a market it does not actually serve."
            />
            <NarrativeCard
              icon={<ShieldCheck className="h-5 w-5" />}
              eyebrow="Reason 2"
              title="The site already has enough authority to support a focused push"
              body="Sixty-four referring domains is not category leadership, but it is a real base. With stronger page architecture and much more aggressive external reinforcement, Kinso can move faster than a site that has no authority foundation at all."
            />
            <NarrativeCard
              icon={<TrendingUp className="h-5 w-5" />}
              eyebrow="Reason 3"
              title="Most of the upside is outside competitor-branded demand"
              body="The opportunity is driven mainly by non-competitor and unbranded queries. That matters because Kinso does not have to rely on poaching trademark-style demand. It can win by owning the category questions buyers ask before they decide who to trust."
            />
            <NarrativeCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              eyebrow="Reason 4"
              title="The research quality gate passed cleanly"
              body="Topical integrity passed in the approved brief, with low-quality semantic demand share at 0.0%. That gives Kinso a clean planning base: the page can lean into the opportunity without inflating ambiguous or low-relevance terms."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="Kinso is competing against incumbents that already invested in category surface area, authority depth, and answer-engine familiarity."
            body="Front, Help Scout, Missive, Gmelius, and Drag have much larger search footprints and much deeper authority than Kinso today. The gap is not that they have better words on a homepage. The gap is that they already built the pages and proof layers buyers and answer engines keep finding."
            implication="Kinso does not need to out-publish the whole category at once. It needs to out-focus the market on the right commercial slice first."
          />

          <div className="space-y-4 mb-4">
            <NarrativeCard
              icon={<FileSearch className="h-5 w-5" />}
              eyebrow="Where incumbents win"
              title="They have more pages, more authority, and more market memory"
              body="Each major incumbent has thousands more keywords and dramatically deeper authority. That means the market already sees them more often in search results, third-party references, and AI summaries."
            />
            <NarrativeCard
              icon={<Bot className="h-5 w-5" />}
              eyebrow="Who shapes the current answer layer"
              title="Front shows the strongest sampled answer-surface momentum"
              body="In the approved brief's competitor view, Front recorded the highest prompt-hit count. That matters because it suggests the brand already has stronger answer-surface familiarity than Kinso in the exact category Kinso wants to enter."
            />
            <NarrativeCard
              icon={<Target className="h-5 w-5" />}
              eyebrow="What Kinso should do about it"
              title="Attack the buying-decision layer instead of copying generic category breadth"
              body="The fastest path is to build the decision pages incumbents use to frame the market, then reinforce them aggressively off-site. Kinso wins by becoming clearer and more visible in the right slice, not by trying to imitate everything bigger players publish."
            />
          </div>

          <DataTable
            headers={["Competitor", "Organic traffic", "Organic keywords", "Referring domains", "Backlinks", "Prompt hits"]}
            rows={[
              ["Missive", formatWhole(160380), formatWhole(10650), formatWhole(2736), formatWhole(23821), formatWhole(10)],
              ["Gmelius", formatWhole(91438), formatWhole(10372), formatWhole(2346), formatWhole(9031), formatWhole(1)],
              ["Front", formatWhole(88656), formatWhole(11993), formatWhole(6083), formatWhole(51273), formatWhole(28)],
              ["Help Scout", formatWhole(150333), formatWhole(24153), formatWhole(26329), formatWhole(681859), formatWhole(13)],
              ["Drag", formatWhole(70833), formatWhole(10334), formatWhole(1970), formatWhole(9230), formatWhole(1)],
            ]}
            highlightRow={2}
          />
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionLead
            takeaway="In sampled answer-engine checks, Kinso is absent exactly where buyers ask who to choose."
            body="The approved brief shows 0.0% sampled mention rate across ChatGPT, Gemini, and Google AI Overviews for the tested prompt set. That does not mean the category is unwinnable. It means Kinso has not yet built enough owned and external proof for answer engines to treat it as a confident recommendation."
            implication="The fix is not one more blog post. The fix is a coordinated answer-layer program: decision pages, proof, reviews, comparisons, and third-party reinforcement."
          />

          <div className="space-y-4 mb-4">
            <NarrativeCard
              icon={<Bot className="h-5 w-5" />}
              eyebrow="Platform snapshot"
              title="ChatGPT: absent in sampled checks"
              body="Kinso was not mentioned in the sampled ChatGPT prompts in the approved brief. The visible category framing currently leans toward established incumbents and existing review or comparison narratives."
            />
            <NarrativeCard
              icon={<Bot className="h-5 w-5" />}
              eyebrow="Platform snapshot"
              title="Gemini: absent in sampled checks"
              body="Kinso was also absent in the sampled Gemini checks. That reinforces the same diagnosis: the company has not yet built enough externally validated category presence to be surfaced confidently."
            />
            <NarrativeCard
              icon={<Search className="h-5 w-5" />}
              eyebrow="Platform snapshot"
              title="Google AI Overviews: detected, but Kinso not surfaced"
              body="Google AI Overview appeared in sampled results for the key unbranded category prompt, but Kinso was not part of the surfaced answer layer. That is a direct commercial visibility gap inside Google's own evolving results."
            />
          </div>

          <div className="space-y-4">
            <PromptCard
              prompt="best shared inbox and email triage software"
              status="Sampled live across ChatGPT US/AU, Gemini US/AU, and Google AI Overview US. Kinso was absent."
              today="The prompt evidence in the approved brief shows incumbents like Front and Help Scout framing the answer. Kinso is not yet treated as a default option."
              nextMove="Publish the definitive buyer-guide page, pair it with proof and comparison pages, and reinforce it through reviews, listicles, community references, and backlinks so Kinso becomes a believable answer instead of an omitted one."
            />
            <PromptCard
              prompt="team collaboration tools"
              status="Validated as part of the top buyer-guide cluster, but not yet converted into a Kinso-owned commercial destination."
              today="Without a precise Kinso page, the market is more likely to route buyers toward broader incumbent pages, generic collaboration roundups, or non-specialist listicles."
              nextMove="Create a decision page that ties collaboration directly to shared inbox and email triage workflows, then support it with third-party proof so the category frame favors Kinso's use case."
            />
            <PromptCard
              prompt="collaborative inbox vs shared mailbox"
              status="Validated comparison intent in the approved brief, but not yet owned by a Kinso evaluation page."
              today="This kind of query shapes buying consideration because it defines the category language itself. If Kinso does not answer it, incumbents get to set the terms."
              nextMove="Ship comparison-led evaluation content that explains the difference, names the right use cases, and makes Kinso visible inside the decision logic buyers are already using."
            />
          </div>

          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Caveat discipline</div>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Publicly visible AI-gap claims here are limited to the sampled ChatGPT, Gemini, and Google AI Overview checks in the approved brief. Specific Perplexity probe detail was not used on-page because the brief flagged a caution on that data path.
            </p>
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionLead
            takeaway="If Kinso turns even a modest share of validated category demand into visibility, search can become a meaningful pipeline engine instead of a minor brand side-channel."
            body="This is a commercial growth program, not a vanity traffic plan. The base case in the approved brief models 575,954 visits in 12 months and 213,103 in the first 6 months if Kinso wins the right decision-stage slice first and compounds from there."
            implication="What matters is not traffic for its own sake. What matters is creating more high-intent moments where Kinso enters vendor consideration before incumbents lock the decision."
          />

          <StrategyCard className="mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <StrategyEyebrow>Estimate-only</StrategyEyebrow>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                Cumulative traffic progression
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/66">
              The curve below is a planning model based on the approved brief's validated demand, priority sequence, and compounding rollout logic. It is useful because it translates category ownership work into a clear founder view: how the first decision pages create the base, and how supporting coverage plus authority increase the upside over time.
            </p>
          </StrategyCard>

          <PhasedUpsideChart points={phasedUpsidePoints} className="mb-4" />

          <TamRoiCalculator baseReachableVisits={575954} className="mb-4" />

          <StrategyCard>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Revenue planning note</div>
            <p className="mt-3 text-sm leading-7 text-white/66">
              Revenue planning requires client ACV/AOV and funnel inputs. The traffic model is page-safe and useful for scenario planning, but actual pipeline and revenue projections should be calibrated with Kinso's first-party CRM, conversion, and sales data before they are treated as commitments.
            </p>
          </StrategyCard>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="08" title="6-month Growth Plan" />
          <StrategySectionLead
            takeaway="The first six months are about turning Kinso from a relevant product into a visible category option in the moments that shape buying decisions."
            body="The program starts with the buyer-guide and decision-page layer, then expands through comparisons, proof pages, supporting coverage, off-site authority, and ongoing refresh. The goal is to build a compounding system, not a one-time publication burst."
            implication="Month 1 sets the opening move. Month 2 attaches authority. Month 3 deepens coverage. Months 4–6 turn that into a repeatable visibility engine."
          />

          <div className="space-y-4">
            <RolloutCard
              label="Month 1"
              title="Define the category opening and ship the first decision pages"
              body="Month 1 is where Kinso claims the first commercial territory around AI shared inbox and email triage software. The priority is not broad content volume. The priority is a sharp first set of bottom-of-funnel pages tied to the clearest buying queries."
              bullets={[
                "Publish first decision pages around inbox and Gmail, Gmail inbox, team collaboration tools, inbox, and inbox by Gmail",
                "Frame Kinso directly against the market language buyers already use",
                "Set technical foundations: schema, canonicals, sitemap hygiene, crawl/index eligibility, Bing Webmaster Tools, and IndexNow",
                "Start with the incumbents most likely to shape the conversation: Front, Help Scout, and Missive",
              ]}
            />
            <RolloutCard
              label="Month 2"
              title="Expand comparisons, reviews, and authority reinforcement"
              body="Month 2 makes the first pages harder to ignore. Kinso should not wait for later quarters to add third-party proof. The market needs to see evidence across owned and external surfaces at the same time."
              bullets={[
                "Ship head-to-head comparisons and evaluation pages around shared mailbox, collaborative inbox, and alternative-style terms",
                "Strengthen review profiles and integrate clearer review proof into commercial pages",
                "Push listicles, expert commentary, community/forum mentions, and first serious backlink acquisition into the pages that matter most",
                "Use early search and answer-surface feedback to sharpen messaging on the first winners",
              ]}
            />
            <RolloutCard
              label="Month 3"
              title="Deepen supporting coverage and reinforce category signals"
              body="Month 3 expands the supporting layer around the pages already defining Kinso's commercial story. This is where the market starts seeing the same narrative repeated across more use cases and supporting contexts."
              bullets={[
                "Build supporting pages around use cases, product form, benefit proof, and buyer context",
                "Publish proof-heavy assets that make Kinso's positioning easier to trust",
                "Strengthen entity consistency across owned pages, profile pages, reviews, and third-party mentions",
                "Keep authority work tied directly to the pages influencing buying consideration",
              ]}
            />
            <RolloutCard
              label="Months 4–6"
              title="Compound visibility, refresh winners, and widen market share"
              body="By this point Kinso should be moving from isolated launches into a real deployment engine. Publishing, authority, refresh, and infrastructure now work together to turn the first pages into durable market assets."
              bullets={[
                "Expand supporting coverage around templates, adjacent workflows, and broader context pages",
                "Refresh decision pages using live performance and answer-surface feedback",
                "Continue aggressive backlink acquisition, editorials, listicle pushes, and community placements around the winners",
                "Use monthly reporting to reallocate effort toward the strongest pages, prompts, and external authority nodes",
              ]}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="09" title="Off-site Authority" />
          <StrategySectionLead
            takeaway="Kinso will not become a default recommendation through owned pages alone."
            body="Third-party trust is part of the core system, not an optional amplifier. Answer engines, classic search, and human buyers all look for external evidence that the company is credible, cited, reviewed, and discussed beyond its own website."
            implication="This is why Memetik pairs every important page with review, community, editorial, and backlink work instead of treating distribution as a later add-on."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Star className="h-5 w-5" />}
              eyebrow="Reviews"
              title="Review platforms help validate the category claim"
              body="Review-profile presence and reinforcement help Kinso look like a credible option when buyers check external proof. They also create the kind of machine-readable trust signals that answer surfaces tend to rely on."
              bullets={[
                "Repair or strengthen review profiles where needed",
                "Build a repeatable review acquisition and response workflow",
                "Route review proof back into decision pages and comparison pages",
              ]}
            />
            <NarrativeCard
              icon={<MessageSquare className="h-5 w-5" />}
              eyebrow="Communities"
              title="Reddit and forum participation shape real-world credibility"
              body="Community threads, forum participation, and practitioner discussion are where many buyers pressure-test vendor claims. Kinso needs to be present where category language is actually debated, not just where polished marketing copy lives."
              bullets={[
                "Participate in Reddit and relevant community threads",
                "Place Kinso into real workflow conversations, not just promotions",
                "Use community insights to refine page language and proof",
              ]}
            />
            <NarrativeCard
              icon={<Newspaper className="h-5 w-5" />}
              eyebrow="Editorial and listicles"
              title="Listicles, expert commentary, and editorials create broader trust"
              body="Third-party roundups and editorial-style placements help the market keep encountering Kinso in buying contexts it does not control directly. That matters for both human trust and retrieval visibility."
              bullets={[
                "Push expert commentary and publication-style placements",
                "Target comparison listicles and category roundups",
                "Use editorial mentions to reinforce decision pages already live on-site",
              ]}
            />
            <NarrativeCard
              icon={<Link2 className="h-5 w-5" />}
              eyebrow="Backlinks"
              title="Authority needs to flow into the pages that matter commercially"
              body="Backlinks are not a vanity count here. The point is to direct authority into the buyer-guide, comparison, and proof pages that shape buying consideration, then refresh and defend those pages as they start to win."
              bullets={[
                "Aggressive backlink acquisition into live commercial pages",
                "Authority routing toward the pages with strongest traction",
                "Refresh and defense once pages start carrying category visibility",
              ]}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="10" title="What Memetik Actually Builds and Ships" />
          <StrategySectionLead
            takeaway="This is a serious market-capture program, not a light content retainer."
            body="Memetik builds the whole visibility system required for Kinso to win: priority query mapping, commercial pages, supporting coverage, review and authority layers, technical/entity infrastructure, and ongoing refresh once the first wins appear."
            implication="A founder should read this as category infrastructure: what gets mapped, what gets built, what gets distributed, and what keeps getting reinforced after launch."
          />

          <div className="space-y-4">
            <ScopeBlock
              label="Scope lane 01"
              title="Priority buying-query mapping"
              body="Before production scales, Memetik maps the exact buying queries and prompt patterns that matter most to Kinso's category entry. This prevents generic publishing and keeps execution tied to commercial demand."
              items={[
                "Map the first high-intent category, comparison, and workflow queries to attack",
                "Prioritize the opening move around AI shared inbox and email triage software",
                "Align each priority query to one clear owned destination and one clear commercial angle",
              ]}
            />
            <ScopeBlock
              label="Scope lane 02"
              title="Bottom-of-funnel page production"
              body="Memetik builds as many bottom-of-funnel pages as needed to cover the relevant demand, starting with the buyer-guide and decision pages that shape vendor consideration fastest."
              items={[
                "Buyer guides that answer who the tool is for, what it does best, and how to evaluate it",
                "Use-case pages tied to collaboration, triage, Gmail workflow, and team inbox behavior",
                "Product-form explainers and proof-led pages that make Kinso's story easier to trust",
              ]}
            />
            <ScopeBlock
              label="Scope lane 03"
              title="Comparison and evaluation content"
              body="Kinso needs pages that intercept buyers who already know some incumbents and are actively comparing options. This layer is where much of the category framing actually happens."
              items={[
                "Head-to-head comparisons against incumbent decision patterns",
                "Alternative-style pages and category distinction pages",
                "Evaluation pages that explain shared mailbox, collaborative inbox, and related category language clearly",
              ]}
            />
            <ScopeBlock
              label="Scope lane 04"
              title="Supporting content coverage"
              body="Once the first decision pages exist, Memetik expands supporting coverage around use cases, proof objects, buyer context, and adjacent workflow patterns so search and answer engines keep finding the same narrative in more places."
              items={[
                "Supporting pages around adjacent workflows and buying contexts",
                "Template and operational coverage once the first commercial pages are live",
                "Internal linking and authority routing back into the pages that matter most",
              ]}
            />
            <ScopeBlock
              label="Scope lane 05"
              title="Off-site authority and distribution"
              body="Memetik does not leave authority to chance. The program explicitly includes aggressive backlink acquisition, digital PR and editorial pushes, listicles, reviews, and community placements that reinforce Kinso's owned pages."
              items={[
                "Backlinks routed into decision pages and proof pages",
                "Digital PR, editorial mentions, press-style angles, and listicle inclusion",
                "Review-platform work, Reddit/community participation, and professional-network distribution",
              ]}
            />
            <ScopeBlock
              label="Scope lane 06"
              title="Infrastructure, entity consistency, and defense"
              body="Kinso also needs the technical and entity layer that makes the entire system easier to crawl, index, and trust. Memetik keeps this visible because without it, good pages and placements underperform."
              items={[
                "Schema matched to visible content, clean canonicals, sitemap hygiene, and crawl/index readiness",
                "Bing Webmaster Tools, IndexNow, and machine-readable consistency across owned and third-party surfaces",
                "Monthly refresh, measurement, and defense loops so winning pages do not decay after launch",
              ]}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="11" title="Operating Model" />
          <StrategySectionLead
            takeaway="Kinso needs monthly deployments with concurrent workstreams, not isolated publishing sprints."
            body="Each month runs the same core motions together: research and prioritization, page production, publishing and indexing, off-site authority, and measurement. The mix changes as the program matures, but those motions do not stop after launch."
            implication="That is how the first decision pages turn into category position instead of sitting as isolated assets."
          />

          <GrowthTimelineChart points={timelinePoints} milestones={timelineMilestones} className="mb-4" />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Workflow className="h-5 w-5" />}
              eyebrow="Monthly deployment rhythm"
              title="Every month ships research, pages, authority, and infrastructure together"
              body="The program does not move in a simple line from content to distribution to reporting. Every month includes prioritization, production, publishing, indexing, authority building, and measurement running concurrently."
            />
            <NarrativeCard
              icon={<Database className="h-5 w-5" />}
              eyebrow="Monthly reporting"
              title="Reporting shows what moved, what shipped, and what deserves more force"
              body="Memetik reviews visibility movement, prompt coverage, authority proof, and workstream completion each month so Kinso can see whether the program is actually increasing buying-surface presence rather than just producing output."
            />
            <NarrativeCard
              icon={<Compass className="h-5 w-5" />}
              eyebrow="Quarterly strategy review"
              title="The program refreshes and reallocates instead of running on autopilot"
              body="Every quarter, the strategy should decide which pages deserve reinforcement, which prompts still look weak, which external surfaces matter most, and where Kinso can widen the category footprint without losing focus."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="12" title="Why Memetik" />
          <StrategySectionLead
            takeaway="Memetik is built for category ownership, not content volume for its own sake."
            body="Most agencies either stay too narrow on on-site SEO or talk about AI visibility without building the underlying page, authority, and infrastructure system required to earn it. Memetik's model is different because it keeps the whole growth engine visible and operational."
            implication="For Kinso, that means one partner responsible for the commercial pages, the supporting coverage, the off-site authority, the technical foundation, and the ongoing defense."
          />

          <HighlightBox className="mb-4">
            <div className="max-w-4xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">The Memetik difference</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                One system for Google, answer engines, and market trust.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">
                Kinso does not need disconnected tactics. It needs a commercial visibility engine that makes the same story easier to find, easier to trust, and harder for incumbents to crowd out.
              </p>
            </div>
          </HighlightBox>

          <div className="space-y-4">
            <NarrativeCard
              icon={<Target className="h-5 w-5" />}
              eyebrow="Commercial focus"
              title="The work starts from buying moments, not generic traffic goals"
              body="Memetik begins with the category questions and prompts that shape vendor consideration, then builds the page and authority system around those moments."
            />
            <NarrativeCard
              icon={<Layers3 className="h-5 w-5" />}
              eyebrow="Integrated execution"
              title="On-site production, off-site authority, and technical foundations stay under one roof"
              body="That matters because Kinso needs all three at once. Publishing without distribution is weak. Distribution without owned destinations leaks value. Infrastructure without message clarity does not change the market."
            />
            <NarrativeCard
              icon={<Radar className="h-5 w-5" />}
              eyebrow="Visibility that can be defended"
              title="Memetik treats refresh and defense as core scope"
              body="Once Kinso starts winning the right pages and prompts, the job is not done. Pages need refreshes, authority needs reinforcement, and the market needs a steady signal that Kinso deserves to stay visible."
            />
          </div>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Book a Strategy Call"
          title="Turn Kinso into a visible category choice."
          body="If you want a category-capture program built around real buying queries, decision pages, off-site authority, and a compounding search plus answer-engine moat, let's map the next move together."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <div className="mt-16 md:mt-20">
          <SectionHeader number="13" title="Supporting Evidence Appendix" />
          <StrategySectionLead
            takeaway="The main narrative is designed to be skimmable. The evidence below supports the thesis without turning the page into a research dump."
            body="Source trace: this page is derived from an approved Kinso strategy brief checked on 2026-03-09 and grounded in Memetik's canonical 2026 master reference and public page contract."
          />

          <div className="space-y-4">
            <StrategyAppendixSection
              title="Validated opportunity clusters"
              description="The approved brief's priority demand clusters. These are the public-safe opportunity slices supporting the opening move and rollout sequence."
              defaultOpen
            >
              <DataTable
                headers={["Cluster", "Intent", "Phase", "Demand", "Expected traffic in 12 months", "Sample keywords"]}
                rows={[
                  [
                    "Buyer Guides",
                    "BOFU",
                    "Months 0–3",
                    formatWhole(4537700),
                    formatWhole(499147),
                    "inbox and gmail, gmail inbox, team collaboration tools, inbox, inbox by gmail",
                  ],
                  [
                    "Category & Brand Demand",
                    "TOFU",
                    "Months 9–12",
                    formatWhole(3693430),
                    formatWhole(75942),
                    "gmail mail, aol email, email gmail, com mail login, email account",
                  ],
                  [
                    "Tools & Templates",
                    "MOFU",
                    "Months 4–8",
                    formatWhole(18880),
                    formatWhole(850),
                    "gmail email template, gmail email templates, gmail template, gmail templates",
                  ],
                  [
                    "Alternatives & Comparisons",
                    "BOFU",
                    "Months 0–3",
                    formatWhole(140),
                    formatWhole(15),
                    "inbox vs gmail, inbox alternative, collaborative inbox vs shared mailbox",
                  ],
                ]}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Demand composition and headline metric support"
              description="Keyword attribution summary provided with the brief. This is why the main page emphasizes unbranded category demand rather than a competitor-only strategy."
            >
              <DataTable
                headers={["Metric", "Competitor-keyword", "Non-competitor / unbranded", "What it means"]}
                rows={[
                  [
                    "Total search opportunity",
                    `${formatWhole(471610)} (5.7%)`,
                    `${formatWhole(7778540)} (94.3%)`,
                    "Most of the market is still open to whoever earns visibility in unbranded buying research.",
                  ],
                  [
                    "Expected traffic in 12 months",
                    formatWhole(10052),
                    formatWhole(565902),
                    "The base case is driven mainly by non-competitor category demand.",
                  ],
                  [
                    "First 6-month target",
                    formatWhole(3719),
                    formatWhole(209384),
                    "The early program should be judged by unbranded demand capture, not only competitor interception.",
                  ],
                  [
                    "Aggressive upside",
                    "No separate split provided",
                    "No separate split provided",
                    "Public page treatment stays qualitative here to avoid inventing unsupported attribution.",
                  ],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Detailed competitor evidence"
              description="Named competitors from the approved brief. These numbers explain why Kinso needs a focused attack surface rather than a broad generic SEO plan."
            >
              <DataTable
                headers={["Competitor", "Organic traffic", "Organic keywords", "Referring domains", "Backlinks", "Prompt hits"]}
                rows={[
                  ["Missive", formatWhole(160380), formatWhole(10650), formatWhole(2736), formatWhole(23821), formatWhole(10)],
                  ["Gmelius", formatWhole(91438), formatWhole(10372), formatWhole(2346), formatWhole(9031), formatWhole(1)],
                  ["Front", formatWhole(88656), formatWhole(11993), formatWhole(6083), formatWhole(51273), formatWhole(28)],
                  ["Help Scout", formatWhole(150333), formatWhole(24153), formatWhole(26329), formatWhole(681859), formatWhole(13)],
                  ["Drag", formatWhole(70833), formatWhole(10334), formatWhole(1970), formatWhole(9230), formatWhole(1)],
                ]}
                highlightRow={2}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Prompt evidence excerpts"
              description="Public-safe excerpts from the approved brief's prompt evidence. These are included to show how the answer-surface gap appears in live category prompts without overstating platform certainty."
            >
              <div className="space-y-4">
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Prompt example 01
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    best shared inbox and email triage software
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    In sampled ChatGPT results, Kinso was not mentioned. The surfaced answer leaned toward established incumbents, with Front and Help Scout appearing prominently in the response preview.
                  </p>
                </StrategyCard>

                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Prompt example 02
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    best shared inbox and email triage software
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    In sampled Gemini results, Kinso was also absent. The response preview again centered the market around incumbent tools, with Front taking the strongest framing position in the provided excerpt.
                  </p>
                </StrategyCard>

                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Prompt example 03
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    Google AI Overview on the same commercial query
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    Google AI Overview was detected in the sampled US result, but Kinso was absent from the surfaced answer layer. That matters because it shows the problem is not limited to chat interfaces; it also affects Google's blended results.
                  </p>
                </StrategyCard>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Assumptions, confidence, and page-safe caveats"
              description="The approved brief passed the quality gate with high confidence, but public claims still need honest caveat discipline."
            >
              <div className="space-y-4">
                <StrategyCard>
                  <BulletList
                    items={[
                      "Quality gate: passed",
                      "Payload confidence: high (100/100)",
                      "Topical integrity: passed, with low-quality semantic demand share at 0.0%",
                      "Traffic planning on the page is a scenario model, not a promise",
                      "Revenue planning requires Kinso's first-party ACV/AOV and funnel inputs",
                    ]}
                  />
                </StrategyCard>
                <StrategyCard>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Caution items carried from the brief</div>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    The approved brief flagged missing or incomplete probe paths for certain AI-surface checks. That is why this page keeps its public AI-evidence narrative limited to the sampled ChatGPT, Gemini, and Google AI Overview data that were supported in the brief, and avoids overstating unsupported platform specifics.
                  </p>
                </StrategyCard>
              </div>
            </StrategyAppendixSection>
          </div>
        </div>
      </div>
    </StrategyPageFrame>
  );
}