import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import {
  SectionHeader,
  BulletList,
  DataTable,
  StatsGrid,
  PhasedUpsideChart,
  TamRoiCalculator,
  DeliveryScopeMatrix,
  WorkstreamTimeline,
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyCTA,
  StrategySectionLead,
  StrategyAppendixSection,
  HighlightBox,
} from "@/components/strategy";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bot,
  CircleDollarSign,
  Compass,
  Gauge,
  Globe,
  LineChart,
  Medal,
  Microscope,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

function formatWhole(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function ExecutiveStatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
        <div className="mt-3 break-words text-[clamp(1.6rem,2.5vw,2.15rem)] font-display font-bold leading-[0.98] tracking-tight text-white">
          {value}
        </div>
        {note ? <div className="mt-2 text-sm leading-6 text-white/56">{note}</div> : null}
      </div>
    </div>
  );
}

function InsightCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <StrategyCard className="h-full" glow="blue">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
    </StrategyCard>
  );
}

function PlatformCard({
  platform,
  rate,
  status,
  takeaway,
}: {
  platform: string;
  rate: string;
  status: string;
  takeaway: string;
}) {
  return (
    <StrategyCard className="h-full" glow="mixed">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Answer surface</div>
          <h3 className="mt-2 text-lg font-semibold text-white">{platform}</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/48">
          {status}
        </div>
      </div>
      <div className="mt-4 text-3xl font-display font-bold tracking-tight text-white">{rate}</div>
      <p className="mt-3 text-sm leading-6 text-white/62">{takeaway}</p>
    </StrategyCard>
  );
}

function PromptEvidenceCard({
  query,
  winner,
  summary,
}: {
  query: string;
  winner: string;
  summary: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Live prompt example</div>
      <div className="mt-2 text-base font-semibold text-white">{query}</div>
      <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">
        Current winners: {winner}
      </div>
      <p className="mt-4 text-sm leading-6 text-white/64">{summary}</p>
    </div>
  );
}

const opportunityCurve = [
  { month: 1, low: 4500, base: 7000, high: 11000 },
  { month: 2, low: 11000, base: 18000, high: 28000 },
  { month: 3, low: 18000, base: 32000, high: 50000 },
  { month: 4, low: 27000, base: 47000, high: 76000 },
  { month: 5, low: 38000, base: 59000, high: 101000 },
  { month: 6, low: 52000, base: 70857, high: 130000 },
  { month: 7, low: 62000, base: 90000, high: 164000 },
  { month: 8, low: 72000, base: 110000, high: 198000 },
  { month: 9, low: 81000, base: 132000, high: 232000 },
  { month: 10, low: 89000, base: 153000, high: 264000 },
  { month: 11, low: 95000, base: 172000, high: 295000 },
  { month: 12, low: 99308, base: 191505, high: 327134 },
];

const deliveryCategories = [
  {
    label: "Priority buying queries",
    detail:
      "Map the commercial questions that shape buying consideration first, so Hyro attacks the highest-leverage demand before broad category coverage.",
  },
  {
    label: "Owned decision pages",
    detail:
      "Build as many bottom-of-funnel pages as needed to cover buyer guides, use-case pages, comparisons, reviews, and proof-led commercial pages.",
  },
  {
    label: "Supporting content coverage",
    detail:
      "Expand surrounding ingredient, benefit, routine, scenario, and competitor-adjacent coverage so search engines and AI systems keep finding the same story.",
  },
  {
    label: "Third-party trust layer",
    detail:
      "Reinforce the on-site story through reviews, community discussions, editorial placements, listicles, backlinks, and other external credibility signals.",
  },
];

const deliveryLanes = [
  {
    category: "Research",
    title: "Commercial query map",
    volume: "always refined",
    whyItMatters:
      "Hyro should not try to win the entire electrolyte market at once. The opening move is the decision-stage query set where buyer intent is already strong.",
    deliverables: [
      "Prioritized commercial query map by buyer-guide, use-case, comparison, and review intent",
      "Competitor pressure map against LMNT, Liquid I.V., Nuun, DripDrop, and adjacent options",
      "Prompt and search visibility baseline across Google and answer engines",
    ],
  },
  {
    category: "On-site",
    title: "Decision-page production",
    volume: "ships continuously",
    whyItMatters:
      "These pages are what let Hyro become a serious recommendation, not just a brand with product pages and brand-led content.",
    deliverables: [
      "Best electrolyte drink / powder / mix buyer guides",
      "Use-case pages like sugar-free, low-sugar, pregnancy-safe, and other buying contexts",
      "Head-to-head comparisons, product-form explainers, and ingredient proof pages",
    ],
  },
  {
    category: "Authority",
    title: "Off-site reinforcement",
    volume: "every month",
    whyItMatters:
      "If third-party surfaces do not echo Hyro's value story, incumbents stay more believable in both traditional search and AI-generated recommendations.",
    deliverables: [
      "Backlinks into priority decision pages",
      "Review-platform improvements and proof capture",
      "Listicles, community/forum placement, and digital PR distribution",
    ],
  },
  {
    category: "Infrastructure",
    title: "Technical and entity setup",
    volume: "foundational + ongoing",
    whyItMatters:
      "Great pages underperform if they are weakly structured, inconsistently described, or hard for engines to crawl, index, and interpret.",
    deliverables: [
      "Schema aligned to visible content and proof objects",
      "Canonicals, sitemap hygiene, crawl/indexation support, Bing Webmaster Tools, and IndexNow",
      "Entity consistency across Hyro's site and third-party references",
    ],
  },
];

const deliveryMilestones = [
  {
    window: "Day 0–30",
    output:
      "Choose the first buyer-guide territory, ship the first decision pages, set technical foundations, and attach distribution to every early win.",
  },
  {
    window: "Day 31–60",
    output:
      "Expand comparisons, review-led content, and supporting coverage while building authority into the first pages already in market.",
  },
  {
    window: "Day 61–90",
    output:
      "Deepen category footprint, reinforce the strongest pages, and turn the early wins into a repeatable compounding motion.",
  },
];

const workstreamMonths = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];

const workstreamTracks = [
  {
    name: "Research & prioritization",
    description:
      "The target list evolves every month based on what Hyro is winning, where competitors are entrenched, and where new buying demand appears.",
    cells: [
      { label: "Opening move map", tone: "high" as const },
      { label: "Refine winners", tone: "base" as const },
      { label: "Expand use cases", tone: "base" as const },
      { label: "Refresh priorities", tone: "base" as const },
      { label: "Defend gains", tone: "base" as const },
      { label: "Adjacent expansion", tone: "base" as const },
    ],
  },
  {
    name: "Page production",
    description:
      "Decision pages, comparisons, proof pages, and supporting coverage all keep shipping together instead of waiting for one phase to end.",
    cells: [
      { label: "First buyer guides", tone: "high" as const },
      { label: "Comparisons + reviews", tone: "high" as const },
      { label: "Support clusters", tone: "high" as const },
      { label: "Scale winning formats", tone: "base" as const },
      { label: "Refresh + expand", tone: "base" as const },
      { label: "Broader category capture", tone: "base" as const },
    ],
  },
  {
    name: "Publishing & indexing",
    description:
      "Every month includes QA, publishing, schema alignment, indexation support, and internal linking so new pages become eligible quickly.",
    cells: [
      { label: "Infrastructure live", tone: "high" as const },
      { label: "Batch publishing", tone: "base" as const },
      { label: "Entity reinforcement", tone: "base" as const },
      { label: "Indexation tuning", tone: "base" as const },
      { label: "Refresh loops", tone: "base" as const },
      { label: "Consolidate winners", tone: "base" as const },
    ],
  },
  {
    name: "Off-site authority",
    description:
      "Community visibility, reviews, listicles, press angles, and backlinks run alongside page production so each page has external support behind it.",
    cells: [
      { label: "Seed trust signals", tone: "high" as const },
      { label: "Review + Reddit push", tone: "high" as const },
      { label: "Editorial + links", tone: "high" as const },
      { label: "Reinforce winners", tone: "base" as const },
      { label: "Compound authority", tone: "base" as const },
      { label: "Defensive coverage", tone: "base" as const },
    ],
  },
  {
    name: "Measurement & iteration",
    description:
      "Memetik measures what is getting indexed, mentioned, linked, and discovered, then reallocates attention toward the strongest revenue paths.",
    cells: [
      { label: "Baseline set", tone: "high" as const },
      { label: "Prompt retesting", tone: "base" as const },
      { label: "Win/loss review", tone: "base" as const },
      { label: "Monthly readout", tone: "base" as const },
      { label: "Quarter prep", tone: "base" as const },
      { label: "Next-cycle plan", tone: "base" as const },
    ],
  },
];

const competitorRows = [
  ["LMNT", "429,600", "34,009", "4,642", "150,912", "7"],
  ["Liquid I.V.", "456,449", "14,724", "2,789", "44,257", "7"],
  ["Nuun", "105,219", "19,880", "4,218", "77,141", "6"],
  ["DripDrop", "161,926", "14,368", "1,846", "9,454", "2"],
  ["Hydralyte", "4,169", "1,276", "586", "1,842", "0"],
  ["Hyro", "1,004", "362", "74", "366", "0"],
];

const keywordRows = [
  ["best electrolyte powder for pregnancy", "390", "89", "Use-case buyer guide"],
  ["best natural electrolytes drink", "390", "102", "Ingredient / natural-positioning buyer guide"],
  ["best sugar free electrolyte drink", "390", "69", "Sugar-free comparison page"],
  ["best sugar-free electrolyte drink", "390", "58", "Sugar-free comparison page"],
  ["best low-sugar electrolyte drink", "210", "80", "Low-sugar use-case page"],
  ["best no sugar electrolyte powder", "210", "60", "No-sugar buyer guide"],
  ["best cheap electrolyte powder", "140", "38", "Value comparison / alternatives page"],
  ["best electrolyte drink without potassium", "140", "62", "Ingredient-specific explainer / filter page"],
];

const promptRows = [
  [
    "best electrolyte powder drink mix",
    "ChatGPT",
    "LMNT, Hydrant, Nuun-style options surfaced",
    "Hyro absent",
  ],
  [
    "best electrolyte powder drink mix",
    "Google AI Overview",
    "LMNT, Liquid I.V., Ultima, Nuun, DripDrop, Skratch Labs",
    "Hyro absent",
  ],
  [
    "electrolyte powder drink mix comparison",
    "ChatGPT / Gemini",
    "Liquid I.V., LMNT, Nuun, DripDrop and other incumbents framed as defaults",
    "Hyro absent",
  ],
];

const clusterRows = [
  ["Buyer Guides", "211,170", "23,229", "Months 0–3", "First opening move"],
  ["Alternatives & Comparisons", "7,210", "793", "Months 0–3", "Supports evaluation"],
  ["Reviews & Social Proof", "3,720", "409", "Months 0–3", "Builds trust and conversion confidence"],
  ["Broader category demand", "8,241,950", "167,074", "Months 9–12", "Bigger expansion lane after early wins"],
];

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
              Turn Hyro into a
              <span className="block">default recommendation</span>
            </>
          }
          accent="for decision-stage electrolyte buyers"
          subtitle="Hyro already has enough authority to matter. The missing piece is not more generic content. It is a concentrated commercial land-grab around buyer guides, comparisons, proof pages, and third-party trust signals that influence both Google and AI answer engines."
          tags={["drinkhyro.com", "consumer health", "US market", "electrolyte drink mix"]}
        >
          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <StrategySectionShell className="p-0" glow="blue">
              <div className="relative p-6 md:p-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">
                      Executive summary
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                      Hyro’s best opening move is to own buyer-guide and decision-stage electrolyte queries first, then
                      widen into broader category demand once the first recommendation surfaces are shifting.
                    </p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/44">
                    validated topical subset only
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <ExecutiveStatCard label="Total search opportunity" value="8,464,050" />
                  <ExecutiveStatCard label="Expected traffic in 12 months" value="191,505" />
                  <ExecutiveStatCard label="Aggressive upside" value="327,134" />
                  <ExecutiveStatCard label="First 6-month target" value="70,857" />
                </div>
              </div>
            </StrategySectionShell>

            <StrategySectionShell className="p-0" glow="amber">
              <div className="relative p-6 md:p-7">
                <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Immediate actions</div>
                <div className="mt-5 space-y-3">
                  {[
                    "Publish the first buyer-guide pages around best electrolyte drink, best electrolyte powder, best hydration powder, best electrolyte mix, and best electrolyte drink mix.",
                    "Attach off-site authority to every core page through reviews, listicles, Reddit/community participation, editorial placements, and backlinks.",
                    "Expand surrounding use-case and comparison coverage so Hyro is not just present on-site, but repeatedly reinforced across search and AI discovery paths.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-sm leading-6 text-white/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </StrategySectionShell>
          </div>
        </StrategyHero>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="Google still drives a major share of discovery, but buying consideration now spills across search results, AI summaries, and answer engines before a customer ever lands on a brand site."
              body="For a category like electrolyte drink mix, this changes the growth math. Winning brands are not just ranking pages. They are becoming the names that repeatedly show up when buyers ask what to choose, what to compare, and what fits their specific health or lifestyle need."
              implication="If Hyro only improves traditional SEO, it will miss a growing share of buying influence. If it only thinks about AI, it will miss the demand engine that still begins in classic search."
            />

            <div className="grid gap-4 md:grid-cols-3">
              <InsightCard
                icon={<Search className="h-5 w-5" />}
                title="Search is still the demand engine"
                body="High-intent health and product research still happens heavily in Google. Buyers compare ingredients, sugar content, use cases, and product forms before they buy."
              />
              <InsightCard
                icon={<Bot className="h-5 w-5" />}
                title="AI now shapes consideration"
                body="ChatGPT, Gemini, Google AI Overviews, and other answer layers increasingly shape who gets named first when a buyer asks for the best option."
              />
              <InsightCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Trust compounds across both"
                body="The brands that win are the ones with aligned on-site pages, third-party mentions, reviews, and authority signals reinforcing the same commercial story."
              />
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="02" title="Where Hyro Is Today" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="Hyro is not starting from zero. It has enough authority to matter, but not enough commercial coverage to become a default choice in the category."
              body="That is a good place to be. The site has some trust and relevance already, which means this is not a cold start. But relative to the size of the electrolyte market, Hyro’s organic footprint is still small and too brand-adjacent."
              implication="This is a leverage problem, not a viability problem. The site needs a tighter commercial footprint, not just more publishing volume."
            />

            <StatsGrid
              columns={4}
              stats={[
                {
                  label: "Current organic traffic",
                  value: "1,004",
                  icon: <TrendingUp className="h-5 w-5" />,
                  note: "Small relative to category scale.",
                  valueClassName: "text-[clamp(1.6rem,2.8vw,2.3rem)]",
                },
                {
                  label: "Current organic keywords",
                  value: "362",
                  icon: <BarChart3 className="h-5 w-5" />,
                  note: "Coverage exists, but not where buyer intent is strongest.",
                  valueClassName: "text-[clamp(1.6rem,2.8vw,2.3rem)]",
                },
                {
                  label: "Referring domains",
                  value: "74",
                  icon: <Globe className="h-5 w-5" />,
                  note: "Enough baseline authority to support a focused push.",
                  valueClassName: "text-[clamp(1.6rem,2.8vw,2.3rem)]",
                },
                {
                  label: "Backlinks",
                  value: "366",
                  icon: <ArrowUpRight className="h-5 w-5" />,
                  note: "Useful starting base, but nowhere near category leaders.",
                  valueClassName: "text-[clamp(1.6rem,2.8vw,2.3rem)]",
                },
              ]}
            />

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What is working</div>
                <div className="mt-4">
                  <BulletList
                    items={[
                      "Hyro has real category relevance and enough existing authority to support a focused commercial push.",
                      "Topical integrity passed, which means the search opportunity is not being padded with low-quality or off-category keyword noise.",
                      "The product fits a category where buyers actively compare ingredients, sugar profile, use cases, and alternatives before purchase.",
                    ]}
                  />
                </div>
              </StrategyCard>

              <StrategyCard glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What is missing</div>
                <div className="mt-4">
                  <BulletList
                    items={[
                      "A concentrated set of buyer-guide and comparison pages aimed at the queries that shape buying consideration.",
                      "Enough supporting coverage around use cases, ingredients, benefits, and routines to create repeated visibility across related searches.",
                      "A stronger external trust layer so Hyro is not just self-asserting credibility on its own site.",
                    ]}
                  />
                </div>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="03" title="The Opportunity" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="The biggest upside is not trying to win the whole electrolyte category immediately. It is winning the decision-stage layer first, where buyers are already asking who to choose."
              body="The fastest commercial opening sits inside buyer guides, comparisons, and review-led searches. That is where Hyro can move from background relevance into active buying consideration, then use those wins to expand outward into the broader category."
              implication="Own the decision moment first. Broader category traffic becomes far more attainable after Hyro earns credibility in the queries that actually shape preference."
            />

            <div className="grid gap-4 md:grid-cols-3">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Opening move</div>
                <h3 className="mt-3 text-xl font-semibold text-white">Buyer-guide queries</h3>
                <div className="mt-4 text-3xl font-display font-bold tracking-tight text-[#f4e4cd]">211,170</div>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  The strongest early commercial cluster. Buyers already know the category and are deciding what to buy.
                </p>
              </StrategyCard>

              <StrategyCard glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">12-month traffic from this layer</div>
                <h3 className="mt-3 text-xl font-semibold text-white">Fastest early path</h3>
                <div className="mt-4 text-3xl font-display font-bold tracking-tight text-[#f4e4cd]">23,229</div>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  This is the clearest first wave because the intent is commercial and the content gaps are obvious.
                </p>
              </StrategyCard>

              <StrategyCard glow="amber">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Broader category expansion</div>
                <h3 className="mt-3 text-xl font-semibold text-white">Months 9–12+</h3>
                <div className="mt-4 text-3xl font-display font-bold tracking-tight text-[#f4e4cd]">167,074</div>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Once Hyro is trusted in the decision layer, broader electrolyte demand becomes a much more credible growth lane.
                </p>
              </StrategyCard>
            </div>

            <HighlightBox className="mt-6">
              <div className="max-w-4xl">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Founder read</div>
                <p className="mt-3 text-xl font-display font-semibold tracking-tight text-white md:text-2xl">
                  Hyro should not spend the first six months behaving like a broad media publisher. It should behave like
                  a brand trying to get chosen.
                </p>
              </div>
            </HighlightBox>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="04" title="Why Hyro Can Win" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="Hyro can win because there is a credible middle ground between being invisible and trying to out-scale category giants on day one."
              body="Incumbents have more authority, more pages, and more historical visibility. But Hyro does not need to beat them everywhere to matter. It needs to become the clearest answer for a defined set of buyer questions where product fit, proof, and focused execution can punch above brand size."
              implication="This strategy is about precision before scale: win the right slice of demand, then expand from a stronger base."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              <InsightCard
                icon={<Target className="h-5 w-5" />}
                title="The right starting territory exists"
                body="The best electrolyte drink / powder / mix query family is commercially strong, validated, and aligned with Hyro’s product category."
              />
              <InsightCard
                icon={<Medal className="h-5 w-5" />}
                title="Hyro already has enough trust to build on"
                body="Seventy-four referring domains is not category leadership, but it is enough to support a focused commercial land-grab if the execution is disciplined."
              />
              <InsightCard
                icon={<Compass className="h-5 w-5" />}
                title="The page mix is straightforward"
                body="Buyer guides, use-case pages, comparisons, review pages, and ingredient proof pages are a natural fit for this market and for how buyers evaluate hydration products."
              />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <StrategyCard glow="amber">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">First queries to attack</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "best electrolyte drink",
                    "best electrolyte powder",
                    "best hydration powder",
                    "best electrolyte mix",
                    "best electrolyte drink mix",
                    "best sugar free electrolyte drink",
                    "best low-sugar electrolyte drink",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </StrategyCard>

              <StrategyCard glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Why this opening move works</div>
                <p className="mt-4 text-sm leading-7 text-white/66">
                  These are not vague awareness terms. They are buyer questions with clear selection intent. If Hyro can
                  become a strong answer here—on-site and off-site—it earns a better shot at being chosen before the
                  customer defaults to bigger incumbents.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="05" title="Competitive Gap" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="The gap is not subtle: incumbents are stronger in search, stronger in authority, and more likely to be surfaced in recommendation environments."
              body="LMNT and Liquid I.V. set the pace, while Nuun and DripDrop still hold much larger visibility footprints than Hyro. That does not mean Hyro cannot compete. It means the strategy has to be concentrated, not generic."
              implication="Hyro should not chase every competitor on every front. It should attack the buying moments where a focused content-and-authority system can move fastest."
            />

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  What leading competitors are doing now
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    {
                      name: "LMNT",
                      text: "Huge authority footprint and strong visibility on commercial prompt sets. Often treated as a default for high-sodium and sugar-free positioning.",
                    },
                    {
                      name: "Liquid I.V.",
                      text: "Wins broad awareness and comparison surfaces with strong distribution, established branding, and larger search footprint.",
                    },
                    {
                      name: "Nuun / DripDrop",
                      text: "Still materially ahead of Hyro in search coverage and category familiarity, giving them more opportunities to appear in comparisons and roundups.",
                    },
                  ].map((item) => (
                    <div key={item.name} className="rounded-[20px] border border-white/8 bg-black/20 p-4">
                      <div className="text-base font-semibold text-white">{item.name}</div>
                      <p className="mt-2 text-sm leading-6 text-white/62">{item.text}</p>
                    </div>
                  ))}
                </div>
              </StrategyCard>

              <StrategyCard glow="amber">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  Hyro's opening advantage
                </div>
                <div className="mt-4">
                  <BulletList
                    items={[
                      "Hyro does not need to out-publish incumbents immediately; it needs to out-focus them in a narrower buying territory.",
                      "Many decision-stage and use-case queries remain under-served by clean, commercially persuasive pages.",
                      "A tighter system around pages, proof, reviews, and off-site authority can create movement faster than broad awareness content alone.",
                    ]}
                  />
                </div>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="06" title="AI Visibility Gap" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="Hyro is currently missing from sampled answer-engine prompts that directly reflect how buyers compare electrolyte products."
              body="The signal is straightforward: when buyers ask broad commercial questions, incumbent brands are the ones being named. Hyro is not yet part of the default answer set."
              implication="This is why the strategy cannot stop at publishing pages. Hyro needs answer-ready pages plus repeated third-party reinforcement that makes the brand easier to cite and safer to recommend."
            />

            <div className="grid gap-4 md:grid-cols-3">
              <PlatformCard
                platform="ChatGPT"
                rate="0 / 8"
                status="sampled prompts"
                takeaway="No Hyro mentions in the sampled prompt set despite strong category alignment."
              />
              <PlatformCard
                platform="Gemini"
                rate="0 / 8"
                status="sampled prompts"
                takeaway="No Hyro mentions in the sampled prompt set. Public claims remain softened where platform responses were inconsistent."
              />
              <PlatformCard
                platform="Google AI Overview"
                rate="0 / 8"
                status="sampled prompts"
                takeaway="No Hyro visibility in the sampled AI Overview set, while incumbents were named directly."
              />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <PromptEvidenceCard
                query="best electrolyte powder drink mix"
                winner="LMNT, Liquid I.V., Nuun-style incumbents"
                summary="This is exactly the kind of query that should become an early battleground. Today, Hyro is not part of the response set, which means buyers are being guided toward other brands before Hyro enters consideration."
              />
              <PromptEvidenceCard
                query="electrolyte powder drink mix comparison"
                winner="Liquid I.V., LMNT, Nuun, DripDrop"
                summary="Comparison prompts reward brands with stronger decision pages and stronger external credibility. Hyro needs both before it can expect consistent answer-engine visibility."
              />
              <PromptEvidenceCard
                query="best sugar-free or low-sugar electrolyte option"
                winner="Typically high-authority incumbents"
                summary="This use-case territory is a realistic opening for Hyro because the buyer intent is clear and the product-selection logic can be explained cleanly with proof-backed pages."
              />
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm leading-6 text-white/58">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Caveat discipline</span>
              <p className="mt-2">
                Public AI visibility statements on this page are based on the approved brief and sampled prompt evidence
                checked on 2026-03-08. Some platform-specific probes were unavailable, so this page intentionally avoids
                overstating coverage beyond the validated sample.
              </p>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="07" title="Revenue / Commercial Impact" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="This is a revenue-leverage play, not just a traffic play."
              body="If Hyro becomes more visible in the moments where buyers compare and choose electrolyte products, the upside is larger than rankings alone. Better decision-stage visibility means more qualified discovery, lower dependence on paid reacquisition, and a stronger chance of getting chosen before larger brands absorb the demand."
              implication="For founders, the key question is not 'Can this drive visits?' It is 'Can this move buying consideration at a lower long-term acquisition cost?'"
            />

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <PhasedUpsideChart points={opportunityCurve} />

              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  What the upside means in plain English
                </div>
                <div className="mt-4">
                  <BulletList
                    items={[
                      "Month 1–3 is about winning the first decision-stage territory, not claiming the whole market.",
                      "By month 6, Hyro should have a materially stronger footprint in buyer guides, comparisons, and proof-led pages than it has today.",
                      "By month 12, the modeled base case points to 191,505 total annual traffic if the full execution system compounds and the market responds as expected.",
                      "The aggressive case reaches 327,134 if Hyro wins more of the commercial category layer and the supporting authority network compounds faster.",
                    ]}
                  />
                </div>

                <div className="mt-5 rounded-[20px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                    Revenue planning note
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white">
                    Revenue planning requires client ACV/AOV and funnel inputs.
                  </p>
                </div>
              </StrategyCard>
            </div>

            <TamRoiCalculator
              className="mt-6"
              baseReachableVisits={191505}
              defaultVisitToCustomerRate={0.01}
            />
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="08" title="6-month Growth Plan" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="The first six months should feel like a compounding market-entry system: first buyer guides, then comparisons and proof, then broader coverage and heavier authority reinforcement."
              body="This is not a slow editorial calendar. It is a focused buildout designed to make Hyro easier to discover, easier to compare, and easier to trust across search and answer surfaces."
              implication="Every month should leave Hyro with more pages in market, more authority behind them, and clearer evidence of where the next expansion should go."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Month 1</div>
                <h3 className="mt-3 text-xl font-semibold text-white">Choose the opening move</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Launch the first buyer-guide pages around best electrolyte drink, best electrolyte powder, best
                  hydration powder, best electrolyte mix, and best electrolyte drink mix.
                </p>
                <div className="mt-4 text-sm text-white/70">
                  First competitors to pressure: <span className="text-white">LMNT and Liquid I.V.</span>
                </div>
              </StrategyCard>

              <StrategyCard glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Month 2</div>
                <h3 className="mt-3 text-xl font-semibold text-white">Add comparison pressure</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Expand into comparison, review, and product-form pages. Start pushing stronger review proof, listicle
                  placement, backlinks, and community distribution into the first shipped pages.
                </p>
                <div className="mt-4 text-sm text-white/70">
                  First prompts to win: <span className="text-white">comparison and “best for” searches</span>
                </div>
              </StrategyCard>

              <StrategyCard glow="amber">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Month 3</div>
                <h3 className="mt-3 text-xl font-semibold text-white">Deepen supporting coverage</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Build ingredient, benefit, routine, and use-case coverage around the first decision pages so Hyro’s
                  commercial story appears repeatedly across related discovery paths.
                </p>
                <div className="mt-4 text-sm text-white/70">
                  Focus themes: <span className="text-white">sugar-free, low-sugar, pregnancy-safe, ingredient-led</span>
                </div>
              </StrategyCard>

              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Months 4–6</div>
                <h3 className="mt-3 text-xl font-semibold text-white">Compound and defend</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Scale what is working, refresh winning pages, widen the authority footprint, and expand into larger
                  category territory with more proof and more external validation behind Hyro.
                </p>
                <div className="mt-4 text-sm text-white/70">
                  Goal by month 6: <span className="text-white">a real commercial footprint, not a pilot program</span>
                </div>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="09" title="Off-site Authority" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="Hyro will not become a stronger recommendation if the proof only lives on Hyro’s own site."
              body="Search engines and AI systems both respond better when the same commercial story is visible across third-party trust surfaces. That means reviews, Reddit/community participation, backlinks, editorial mentions, listicles, and expert or influencer proof all need to reinforce the same message."
              implication="This is where a lot of brands underinvest. They publish a page, but they do not give the market enough reasons to believe it."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              <StrategyCard glow="blue">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">Community & forum presence</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Reddit and adjacent community discussions help shape real buyer trust. Hyro needs thoughtful
                  participation and supporting mentions where people ask what actually works.
                </p>
              </StrategyCard>

              <StrategyCard glow="amber">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">Reviews, listicles, and editorial proof</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Hyro should be reinforced through review surfaces, roundup coverage, publication-style placements, and
                  expert commentary that make the brand more believable outside its own domain.
                </p>
              </StrategyCard>

              <StrategyCard glow="mixed">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#f4e4cd]">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">Backlinks into the pages that matter</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Authority should point into Hyro’s most important buyer-guide and comparison pages, not just the
                  homepage or generic brand pages.
                </p>
              </StrategyCard>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  First off-site surfaces to push
                </div>
                <div className="mt-4">
                  <BulletList
                    items={[
                      "Reddit and community threads around hydration, fitness, recovery, and sugar-conscious product selection",
                      "Hydration roundups, comparison listicles, and publication-style recommendation pages",
                      "Review-profile reinforcement and structured review acquisition where relevant",
                      "Athlete, creator, or expert commentary that strengthens proof outside the site",
                    ]}
                  />
                </div>
              </StrategyCard>

              <StrategyCard glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  What this does commercially
                </div>
                <div className="mt-4">
                  <BulletList
                    items={[
                      "Makes Hyro easier to trust when a buyer first encounters the brand",
                      "Improves the odds that comparison and answer-engine surfaces treat Hyro as a credible option",
                      "Adds durable authority behind the pages that drive buying consideration",
                      "Creates a moat that is harder for smaller or slower competitors to copy",
                    ]}
                  />
                </div>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="10" title="What Memetik Actually Builds and Ships" />
          <StrategySectionShell glow="amber">
            <StrategySectionLead
              takeaway="This is a full execution program: query strategy, decision-page production, supporting coverage, authority building, infrastructure, and ongoing reinforcement."
              body="The goal is not to produce a pile of content. The goal is to build a system that makes Hyro more visible, more believable, and more likely to be chosen in the exact moments that matter commercially."
              implication="Founders should read this as growth infrastructure, not a light retainer."
            />

            <DeliveryScopeMatrix
              categories={deliveryCategories}
              lanes={deliveryLanes}
              milestones={deliveryMilestones}
            />

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  The scope includes
                </div>
                <div className="mt-4">
                  <BulletList
                    items={[
                      "Priority buying-query mapping and sequencing",
                      "Bottom-of-funnel page production across buyer guides, comparisons, reviews, and proof-led pages",
                      "Supporting content coverage around ingredients, benefits, routines, and scenarios",
                      "Aggressive backlink acquisition into commercial pages",
                      "Digital PR, press-style angles, editorial placements, and listicle pushes",
                      "Review-platform work and third-party proof reinforcement",
                      "Bing Webmaster Tools, IndexNow, sitemap, canonicals, schema, and crawl/index support",
                      "Forum, community, and third-party placement strategy that amplifies what gets published",
                    ]}
                  />
                </div>
              </StrategyCard>

              <StrategyCard glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  The public promise
                </div>
                <p className="mt-4 text-sm leading-7 text-white/66">
                  Memetik does not promise an arbitrary fixed page count in public. The operating logic is simpler and
                  stronger than that: build as many decision pages as Hyro needs to cover the right buying demand, then
                  expand supporting coverage and authority behind the winners until the market starts to shift.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="11" title="Operating Model" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="This runs as a concurrent monthly system, not a linear handoff where strategy ends before production, or publishing ends before distribution starts."
              body="Every month includes research and prioritization, page production, publishing and indexing, off-site authority, and measurement. That is how the work compounds instead of resetting."
              implication="The advantage is speed with reinforcement: every shipped page gets more support, more data, and more authority over time."
            />

            <WorkstreamTimeline months={workstreamMonths} tracks={workstreamTracks} />

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <StrategyCard glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Monthly report</div>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Reviews what shipped, what got indexed, what gained authority, what prompt and search visibility moved,
                  and where Hyro should double down next.
                </p>
              </StrategyCard>
              <StrategyCard glow="amber">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Quarterly review</div>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Reallocates effort toward the strongest pages, patches weak spots, refreshes aging assets, and expands
                  into the next highest-leverage category territory.
                </p>
              </StrategyCard>
              <StrategyCard glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Defense loop</div>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  Winning pages do not get left alone. They get refreshed, reinforced, and defended as competitors react
                  and the answer landscape shifts.
                </p>
              </StrategyCard>
            </div>
          </StrategySectionShell>
        </section>

        <section className="mb-14 md:mb-20">
          <SectionHeader number="12" title="Why Memetik" />
          <StrategySectionShell glow="mixed">
            <StrategySectionLead
              takeaway="Memetik is built for brands that need category capture across both classic search demand and AI-shaped buying consideration."
              body="This matters because the market is no longer split neatly between SEO and everything else. The brands that win are the ones that can align buyer-guide pages, proof, technical foundations, and off-site trust into one commercial system."
              implication="The difference is not more activity. It is better alignment between what gets built, where it gets reinforced, and how the market actually makes decisions now."
            />

            <div className="grid gap-4 md:grid-cols-3">
              <InsightCard
                icon={<Microscope className="h-5 w-5" />}
                title="Founder-readable strategy"
                body="The plan is clear enough to skim quickly, but concrete enough that you can see exactly how the market gets shifted."
              />
              <InsightCard
                icon={<Gauge className="h-5 w-5" />}
                title="Execution, not abstraction"
                body="Memetik pairs research, production, authority, and infrastructure so Hyro gets shipped work and not just advisory language."
              />
              <InsightCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Built for compounding share"
                body="The system is designed to create durable visibility and trust, not a one-quarter spike that disappears when publishing slows down."
              />
            </div>
          </StrategySectionShell>
        </section>

        <StrategyCTA
          eyebrow="Book a Strategy Call"
          title="If Hyro wants to win decision-stage demand, this is the operating system."
          body="Memetik helps brands become easier to discover, easier to trust, and harder to ignore across the search and answer surfaces that now shape buying consideration."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <section className="mt-16 md:mt-20">
          <SectionHeader number="13" title="Supporting Evidence" />
          <StrategySectionShell glow="blue">
            <StrategySectionLead
              takeaway="The main strategy above is intentionally compressed. The detail below is here for founders and operators who want to inspect the supporting evidence."
              body="All figures and narrative on this page derive from the approved strategy brief dated 2026-03-08. Canonical lineage preserved: master reference → generation contract → brief → page."
            />

            <div className="space-y-4">
              <StrategyAppendixSection
                defaultOpen
                title="Validated market clusters and where the first growth comes from"
                description="This is the page-safe subset of the opportunity model: the cluster order matters more than the raw volume."
              >
                <DataTable
                  headers={[
                    "Cluster",
                    "Validated demand",
                    "Expected traffic in 12 months",
                    "Timing",
                    "Why it matters",
                  ]}
                  rows={clusterRows}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Detailed competitor evidence"
                description="Hyro does not need to beat every competitor everywhere. But the current gap in authority and visibility is real and needs to be acknowledged."
              >
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
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Commercial keyword signals"
                description="These are examples of decision-stage or use-case queries where Hyro has room to improve and where the page strategy should focus first."
              >
                <DataTable
                  headers={["Keyword", "Monthly volume", "Current position", "Recommended page type"]}
                  rows={keywordRows}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Prompt evidence sample"
                description="Unbranded prompts used to show who is being surfaced today in answer engines. Public claims remain softened where platform coverage was incomplete."
              >
                <DataTable
                  headers={["Prompt", "Surface", "Observed answer pattern", "Hyro status"]}
                  rows={promptRows}
                />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Assumptions, confidence, and caveats"
                description="What is solid, what is estimate-only, and what was intentionally softened on the public page."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <StrategyCard glow="mixed">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">High-confidence inputs</div>
                    <div className="mt-4">
                      <BulletList
                        items={[
                          "Approved brief status: page-generation approved",
                          "Research mode: strict",
                          "Payload confidence: high (100/100)",
                          "Quality gate: passed",
                          "Topical integrity: passed with low-quality semantic demand share at 0.1%",
                        ]}
                      />
                    </div>
                  </StrategyCard>

                  <StrategyCard glow="blue">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Public caveats preserved</div>
                    <div className="mt-4">
                      <BulletList
                        items={[
                          "Some platform-specific AI probes were unavailable, so the page uses validated sampled prompt evidence and avoids unsupported certainty.",
                          "Traffic trajectory is estimate-only and should be interpreted as modeled upside, not a guarantee.",
                          "Revenue planning requires Hyro’s first-party AOV/ACV and funnel conversion inputs before commitments should be made.",
                        ]}
                      />
                    </div>
                  </StrategyCard>
                </div>
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Optional traffic-to-revenue calculator"
                description="Useful for board or leadership planning once first-party economics are available."
              >
                <TamRoiCalculator baseReachableVisits={191505} defaultVisitToCustomerRate={0.01} />
              </StrategyAppendixSection>

              <StrategyAppendixSection
                title="Source trace"
                description="Compact lineage note for governance and internal consistency."
              >
                <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/64">
                  <p>
                    Canonical lineage preserved for this page: <span className="text-white">master reference → generation contract → approved brief → public page</span>.
                  </p>
                  <p className="mt-3">
                    Page source: <span className="text-white">Hyro Strategy Brief - 2026-03-08</span>. Major public claims
                    were limited to brief-approved evidence and softened where unresolved platform probe gaps existed.
                  </p>
                </div>
              </StrategyAppendixSection>
            </div>
          </StrategySectionShell>
        </section>
      </div>
    </StrategyPageFrame>
  );
}