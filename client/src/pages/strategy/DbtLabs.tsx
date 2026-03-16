import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import {
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyCTA,
  StrategySectionLead,
  SectionHeader,
  HighlightBox,
  BulletList,
  PhasedUpsideChart,
  StatsGrid,
  DataTable,
  StrategyAppendixSection,
  GrowthTimelineChart,
  TamRoiCalculator,
} from "@/components/strategy";
import { AIAbsenceEvidence } from "@/components/strategy/AIAbsenceEvidence";
import { TldrSection } from "@/components/strategy/TldrSection";
import { SummariseButton } from "@/components/strategy/SummariseButton";
import {
  Search,
  TrendingUp,
  Target,
  Eye,
  Layers3,
  Shield,
  Globe,
  BarChart3,
  Gauge,
  FileText,
} from "lucide-react";

export default function StrategyDbtLabs() {
  useEffect(() => {
    document.title = "dbt Labs — AI Search Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">

        {/* ──────────────────── HERO ──────────────────── */}
        <StrategyHero
          eyebrow="AI Search Strategy — dbt Labs"
          title="11.7M searches. dbt is barely visible."
          oneLiner="0% ChatGPT mention rate. 6% Gemini. Your buyers are choosing tools without you in the conversation."
          subtitle="Data teams researching transformation tools are asking Google, ChatGPT, and Gemini for recommendations right now. dbt Labs has the category authority to win those answers — but almost none of the pages required to get recommended. This strategy shows exactly what's broken, how big the prize is, and the 6-month plan to fix it."
          tags={["Data Transformation", "US + AU Markets", "Answer Engine Optimization"]}
        >
          <div className="mb-8">
            <SummariseButton slug="dbt-labs" />
          </div>

          <div className="mb-8">
            <TldrSection
              items={[
                "11.7M monthly searches in data transformation — dbt Labs captures a fraction of the available demand.",
                "ChatGPT doesn't mention dbt in any of 16 tested buyer prompts. Gemini mentions it once. Google AI Overviews twice.",
                "Competitors like Coalesce and Matillion are getting cited in answers dbt Labs should own.",
                "419,200 monthly visits achievable within 12 months by building the decision-stage pages buyers and AI models need.",
                "The opening move: buyer guides and comparison pages for high-intent queries like 'best ETL tools' and 'dbt vs alternatives'.",
              ]}
            />
          </div>

          {/* Executive metric cards — stacked vertical */}
          <div className="space-y-4">
            <StatsGrid
              columns={2}
              stats={[
                {
                  label: "Total search opportunity",
                  value: "11.7M",
                  icon: <Search className="h-5 w-5" />,
                  note: "Monthly validated demand across data transformation, ETL/ELT tools, and category comparison queries.",
                },
                {
                  label: "Expected traffic in 12 months",
                  value: "419,200",
                  icon: <TrendingUp className="h-5 w-5" />,
                  note: "Base-case projection. Aggressive upside: 666,904. Estimate-only.",
                },
                {
                  label: "First 6-month target",
                  value: "155,104",
                  icon: <Target className="h-5 w-5" />,
                  note: "Focused on buyer-guide and comparison queries where purchase intent is highest.",
                },
                {
                  label: "AI visibility today",
                  value: "~3%",
                  icon: <Eye className="h-5 w-5" />,
                  note: "Across 16 tested prompts: 0% ChatGPT, 6.3% Gemini, 12.5% Google AI Overviews.",
                },
              ]}
            />

            {/* Keyword attribution card */}
            <StrategyCard>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-3">
                Keyword attribution
              </div>
              <p className="text-sm leading-7 text-white/62 mb-4">
                97.7% of the validated demand is unbranded — buyers searching for solutions, not specific vendors. This is unclaimed territory.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-white/60">Unbranded / non-competitor demand</span>
                  <span className="text-sm font-semibold text-white">11,439,550 (97.7%)</span>
                </div>
                <div className="flex justify-between rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-white/60">Competitor-branded demand</span>
                  <span className="text-sm font-semibold text-white">270,180 (2.3%)</span>
                </div>
              </div>
            </StrategyCard>

            {/* Immediate actions */}
            <div className="space-y-4 border-t border-white/8 pt-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-2">
                Immediate actions
              </div>
              {[
                {
                  number: "01",
                  title: "Publish buyer-guide pages for high-intent data transformation queries",
                  detail:
                    "Queries like 'best ETL tools,' 'data transformation tools,' and 'extract transform load tools' represent 1.9M monthly searches with zero owned dbt Labs pages targeting them.",
                },
                {
                  number: "02",
                  title: "Build comparison and evaluation pages to own the shortlist",
                  detail:
                    "Head-to-head pages for 'dbt vs Matillion,' 'ETL vs ELT,' and 'data lake vs data warehouse' are where buyers form preferences. dbt Labs has no structured comparison content.",
                },
                {
                  number: "03",
                  title: "Pair every page with off-site authority and review reinforcement",
                  detail:
                    "On-site pages alone won't change AI recommendations. Each decision page needs matching backlinks, review-platform presence, and third-party editorial mentions.",
                },
              ].map((action) => (
                <StrategyCard key={action.number}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
                      {action.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/62">{action.detail}</p>
                    </div>
                  </div>
                </StrategyCard>
              ))}
            </div>
          </div>
        </StrategyHero>

        {/* ──────────────────── ACT 1: THE PROBLEM ──────────────────── */}
        <StrategySectionShell>
          <SectionHeader
            number="01"
            eyebrow="Act 1"
            title="The Problem"
            subtitle="dbt is the most well-known transformation tool in modern data — and it's almost invisible where buying decisions happen."
          />

          <div className="space-y-6 max-w-3xl">
            <p className="text-[15px] leading-8 text-white/68">
              When a data engineering lead asks ChatGPT "what are the best data transformation tools,"
              dbt doesn't appear. When a VP of Data asks Gemini to compare ETL platforms, Coalesce
              gets cited — dbt Labs is mentioned once across 16 tested prompts. Over 60% of B2B buyers
              now start their research inside AI-powered search surfaces before they ever visit a vendor
              website. dbt Labs is missing from that conversation.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              This isn't a brand-awareness problem. dbt has strong community recognition and 5,714
              referring domains. The problem is structural: dbt Labs doesn't have the decision-stage
              pages — buyer guides, comparison tables, evaluation frameworks — that AI models and
              search engines need to confidently recommend a tool. Without those pages, answer engines
              default to competitors who do have them, even when those competitors are objectively
              weaker in the market.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              Meanwhile, Coalesce.io — with 526 referring domains compared to dbt's 5,714 — is
              getting cited in AI answers for "best data transformation tools." Integrate.io appears
              in Gemini. These are companies with a fraction of dbt's actual authority, but they've
              built the content that AI systems can extract and recommend. The result: dbt Labs is
              losing buying consideration it should dominate, to competitors it should outrank.
            </p>
          </div>

          {/* AI absence evidence */}
          <AIAbsenceEvidence
            company="dbt Labs"
            platforms={[
              {
                name: "ChatGPT",
                icon: "chatgpt",
                prompt: "best data transformation tools",
                result:
                  "ChatGPT returned a generic list of data transformation types (normalization, standardization, log transforms) — interpreting the query as a data science concept rather than a tooling recommendation. dbt was not mentioned. No vendor was recommended.",
                mentioned: false,
              },
              {
                name: "Gemini",
                icon: "gemini",
                prompt: "data transformation comparison",
                result:
                  "Gemini produced a detailed ETL vs ELT vs EtLT comparison table. dbt was cited once as a source link. Coalesce.io was the primary cited source. The answer positioned ELT as the modern default without naming dbt as the category leader.",
                mentioned: false,
              },
              {
                name: "Google AI Overview",
                icon: "google",
                prompt: "best data transformation tools",
                result:
                  "Google AI Overview listed dbt alongside Matillion, Fivetran, and Alteryx — but the source citations pointed to Datameer, Astera, and Coalesce listicle pages, not to any dbt Labs owned content. dbt was mentioned but did not control the narrative.",
                mentioned: true,
              },
            ]}
          />

          <HighlightBox title="The core issue" tone="warning" className="mt-8">
            <p className="text-[15px] leading-8 text-white/68">
              dbt Labs has the authority and brand recognition to be the default recommendation in data
              transformation. But without owned decision-stage content, that authority is being
              borrowed by competitors who publish listicles and buyer guides that AI models can cite.
              Every month this gap stays open, buying consideration flows to tools with weaker products
              but stronger content infrastructure.
            </p>
          </HighlightBox>
        </StrategySectionShell>

        {/* ──────────────────── ACT 2: THE OPPORTUNITY ──────────────────── */}
        <StrategySectionShell>
          <SectionHeader
            number="02"
            eyebrow="Act 2"
            title="The Opportunity"
            subtitle="11.7M monthly searches. A usable authority base. And a competitor field that hasn't locked any of it down yet."
          />

          <div className="space-y-6 max-w-3xl">
            <p className="text-[15px] leading-8 text-white/68">
              The data transformation category has 11.7M monthly searches across buyer guides,
              tool comparisons, ETL/ELT education, and category exploration queries. The highest-intent
              cluster — buyer guides for "best data analytics tools," "ETL tools," and "data
              transformation tools" — represents 1.9M searches alone. These are the queries where
              buyers form vendor preferences. None of the current competitors have locked them down.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              dbt Labs has a genuine right to win here. 5,714 referring domains and 67,348 backlinks
              give dbt a stronger authority foundation than every direct competitor except Gartner
              (which competes on a completely different axis). The opening move is narrow and
              high-leverage: build the buyer-guide and comparison pages that turn existing authority
              into AI-visible recommendations, starting with the queries where purchase intent is
              clearest.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              The alternatives cluster — "ETL vs ELT," "dbt vs Matillion," "data lake vs data
              warehouse" — adds another 21,190 monthly searches of pure bottom-of-funnel evaluation
              demand. Together, the buyer-guide and comparison clusters create a focused entry point
              that compounds into broader category coverage over the following months.
            </p>
          </div>

          <div className="mt-8">
            <PhasedUpsideChart
              points={[
                { label: "M1", low: 2000, base: 5000, high: 8000 },
                { label: "M2", low: 6000, base: 14000, high: 22000 },
                { label: "M3", low: 15000, base: 35000, high: 55000 },
                { label: "M4", low: 30000, base: 65000, high: 100000 },
                { label: "M5", low: 50000, base: 100000, high: 155000 },
                { label: "M6", low: 70000, base: 155104, high: 240000 },
                { label: "M7", low: 85000, base: 195000, high: 310000 },
                { label: "M8", low: 100000, base: 240000, high: 380000 },
                { label: "M9", low: 110000, base: 290000, high: 450000 },
                { label: "M10", low: 120000, base: 335000, high: 520000 },
                { label: "M11", low: 128000, base: 375000, high: 590000 },
                { label: "M12", low: 134000, base: 419200, high: 666904 },
              ]}
            />
          </div>

          <div className="mt-8">
            <TamRoiCalculator
              baseReachableVisits={419200}
              defaultLtv={0}
              defaultVisitToCustomerRate={0.01}
            />
          </div>
        </StrategySectionShell>

        {/* ──────────────────── ACT 3: THE PLAN ──────────────────── */}
        <StrategySectionShell>
          <SectionHeader
            number="03"
            eyebrow="Act 3"
            title="The Plan"
            subtitle="A 6-month system to make dbt Labs the default recommendation in data transformation."
          />

          <StrategySectionLead
            takeaway="Three steps. One compounding system."
            body="Step 1: Build the decision-stage pages that answer buyer questions directly. Step 2: Reinforce every page with off-site authority — backlinks, review platforms, editorial placements, and community presence. Step 3: Expand supporting content coverage and keep refreshing until the recommendation pattern is durable."
          />

          {/* Month blocks */}
          <div className="mt-8 space-y-6">
            {[
              {
                label: "Month 1",
                title: "Set the foundation — first buyer-guide and comparison pages",
                bullets: [
                  "Publish decision pages targeting 'best data transformation tools,' 'ETL tools,' and 'best ELT platforms'",
                  "Build head-to-head comparison pages: dbt vs Matillion, ETL vs ELT, data lake vs data warehouse",
                  "Set up review-platform profiles and begin review acquisition workflow",
                  "Complete technical audit: schema, sitemaps, crawl eligibility, Bing Webmaster Tools, IndexNow",
                  "Secure first editorial placements and community mentions",
                ],
              },
              {
                label: "Month 2",
                title: "Expand comparison coverage and authority reinforcement",
                bullets: [
                  "Ship additional comparison and alternative pages across the competitor set",
                  "Publish use-case pages: dbt for analytics engineering, dbt for data migration, dbt for enterprise",
                  "Push first wave of high-authority backlinks to decision pages",
                  "Begin Reddit and community thread presence around data transformation evaluation queries",
                  "Run first round of prompt testing to measure early AI visibility movement",
                ],
              },
              {
                label: "Month 3",
                title: "Deepen supporting coverage and entity reinforcement",
                bullets: [
                  "Expand supporting content network around ETL/ELT education, data pipeline architecture, and transformation best practices",
                  "Publish pricing transparency and benchmark pages where category data supports them",
                  "Reinforce entity consistency across owned and third-party surfaces",
                  "Continue editorial, newsletter, and listicle distribution",
                  "Measure recommendation movement across ChatGPT, Gemini, and Google AI Overviews",
                ],
              },
              {
                label: "Months 4–6",
                title: "Compound distribution and defend gains",
                bullets: [
                  "Expand into broader category demand: education, awareness, and brand-adjacent queries",
                  "Refresh data on existing decision pages to maintain freshness signals",
                  "Continue monthly backlink and editorial placement cadence",
                  "Patch weak prompts where competitors regain ground",
                  "Quarterly strategy review: consolidate winning positions, reallocate effort to emerging opportunities",
                ],
              },
            ].map((month) => (
              <StrategyCard key={month.label} glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  {month.label}
                </div>
                <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">
                  {month.title}
                </h3>
                <div className="mt-5">
                  <BulletList items={month.bullets} />
                </div>
              </StrategyCard>
            ))}
          </div>

          {/* Scope blocks */}
          <div className="mt-10 space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
              What Memetik builds and ships
            </div>

            {[
              {
                icon: <FileText className="h-5 w-5" />,
                label: "Decision-stage pages",
                title: "Buyer guides, comparisons, alternatives, and evaluation content",
                bullets: [
                  "Best-for and use-case pages targeting the highest-intent buyer queries",
                  "Head-to-head comparison pages for every relevant competitor pairing",
                  "Alternative pages and category evaluation frameworks",
                  "Pricing transparency and benchmark pages where data supports them",
                  "As many decision pages as needed to cover the full demand surface — no fixed cap",
                ],
              },
              {
                icon: <Layers3 className="h-5 w-5" />,
                label: "Supporting content network",
                title: "Retrieval density that compounds over time",
                bullets: [
                  "Education and explainer pages around ETL, ELT, transformation patterns, and data pipeline architecture",
                  "Use-case specific pages that reinforce decision content through internal linking",
                  "Long-tail coverage across adjacent queries to expand AI retrieval surface",
                ],
              },
              {
                icon: <Globe className="h-5 w-5" />,
                label: "Off-site authority",
                title: "Third-party proof that reinforces every claim",
                bullets: [
                  "High-authority backlinks (DR70+) pointing to decision pages",
                  "Review-platform presence: G2, Capterra, TrustRadius profile optimization and review acquisition",
                  "Reddit and community thread participation around data tool evaluation",
                  "Editorial and digital PR placements in data engineering publications",
                  "Listicle and newsletter distribution through professional networks",
                ],
              },
              {
                icon: <Shield className="h-5 w-5" />,
                label: "Technical infrastructure",
                title: "Machine-readable, indexable, and consistent",
                bullets: [
                  "Schema markup matched to visible content across every new page",
                  "Sitemap hygiene, crawl/index eligibility, and canonical management",
                  "Bing Webmaster Tools and IndexNow integration for faster discovery",
                  "Entity consistency across owned properties and third-party profiles",
                ],
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                label: "Measurement and proof",
                title: "Know exactly what's working",
                bullets: [
                  "Monthly prompt testing across ChatGPT, Gemini, and Google AI Overviews",
                  "Citation tracking and recommendation visibility scoring",
                  "Workstream completion reporting tied to business outcomes",
                  "Quarterly strategy reviews with consolidation and reallocation decisions",
                ],
              },
              {
                icon: <Gauge className="h-5 w-5" />,
                label: "Refresh and defense",
                title: "The work compounds — it doesn't decay",
                bullets: [
                  "Monthly data refreshes on decision pages to maintain freshness signals",
                  "Quarterly deep reviews of flagship content",
                  "Competitor-response updates when the market shifts",
                  "Ongoing backlink and editorial reinforcement cadence",
                ],
              },
            ].map((scope) => (
              <StrategyCard key={scope.label}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
                    {scope.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                      {scope.label}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{scope.title}</h3>
                    <div className="mt-4">
                      <BulletList items={scope.bullets} />
                    </div>
                  </div>
                </div>
              </StrategyCard>
            ))}
          </div>

          {/* Growth timeline */}
          <div className="mt-10">
            <GrowthTimelineChart
              points={[
                { label: "M1", month: 1, low: 2000, base: 5000, high: 8000, title: "Foundation", detail: "First decision pages live. Technical infrastructure in place. Review platforms set up. First editorial placements secured.", trafficLabel: "Base traffic", trafficValue: 5000 },
                { label: "M2", month: 2, low: 6000, base: 14000, high: 22000, title: "Expansion", detail: "Comparison and alternative pages shipping. First backlink wave complete. Community presence established.", trafficLabel: "Base traffic", trafficValue: 14000 },
                { label: "M3", month: 3, low: 15000, base: 35000, high: 55000, title: "Depth", detail: "Supporting content network expanding. Pricing and benchmark pages live. First measurable AI visibility movement.", trafficLabel: "Base traffic", trafficValue: 35000 },
                { label: "M4", month: 4, low: 30000, base: 65000, high: 100000, title: "Compounding", detail: "Broader category demand entering the system. Monthly refresh cadence active. Authority signals reinforcing.", trafficLabel: "Base traffic", trafficValue: 65000 },
                { label: "M5", month: 5, low: 50000, base: 100000, high: 155000, title: "Compounding", detail: "Education and awareness content expanding reach. Ongoing editorial and backlink distribution.", trafficLabel: "Base traffic", trafficValue: 100000 },
                { label: "M6", month: 6, low: 70000, base: 155104, high: 240000, title: "6-month target", detail: "First-half target achieved. Decision pages ranking. AI recommendation patterns forming. System shifting to defense and expansion.", trafficLabel: "Base traffic", trafficValue: 155104 },
                { label: "M7", month: 7, low: 85000, base: 195000, high: 310000, title: "Category expansion", detail: "Broader brand and category demand clusters entering production.", trafficLabel: "Base traffic", trafficValue: 195000 },
                { label: "M8", month: 8, low: 100000, base: 240000, high: 380000, title: "Authority deepening", detail: "Continued backlink and editorial reinforcement. Recommendation patterns strengthening.", trafficLabel: "Base traffic", trafficValue: 240000 },
                { label: "M9", month: 9, low: 110000, base: 290000, high: 450000, title: "Full coverage", detail: "Education and awareness clusters live. Full-funnel coverage active.", trafficLabel: "Base traffic", trafficValue: 290000 },
                { label: "M10", month: 10, low: 120000, base: 335000, high: 520000, title: "Defense mode", detail: "Quarterly review complete. Weak prompts patched. Competitor responses handled.", trafficLabel: "Base traffic", trafficValue: 335000 },
                { label: "M11", month: 11, low: 128000, base: 375000, high: 590000, title: "Compounding", detail: "System producing durable recommendation patterns across AI surfaces.", trafficLabel: "Base traffic", trafficValue: 375000 },
                { label: "M12", month: 12, low: 134000, base: 419200, high: 666904, title: "12-month target", detail: "419,200 base-case monthly traffic. dbt Labs positioned as the default recommendation in data transformation buyer queries.", trafficLabel: "Base traffic", trafficValue: 419200 },
              ]}
              milestones={[
                { label: "M1", month: 1, title: "Foundation deployed", detail: "First buyer-guide and comparison pages live. Technical audit complete. Review platforms active.", trafficLabel: "Base traffic", trafficValue: 5000 },
                { label: "M6", month: 6, title: "6-month target hit", detail: "155,104 monthly visits from decision-stage content. AI visibility measurably improving.", trafficLabel: "Base traffic", trafficValue: 155104 },
                { label: "M12", month: 12, title: "Category position established", detail: "419,200 monthly visits. dbt Labs is the default recommendation across buyer-guide queries in data transformation.", trafficLabel: "Base traffic", trafficValue: 419200 },
              ]}
            />
          </div>
        </StrategySectionShell>

        {/* ──────────────────── FAILURE BLOCK ──────────────────── */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[28px] border border-red-500/20 bg-red-500/[0.04] p-6 md:p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400/80">
              If nothing changes
            </div>
            <h3 className="text-xl font-display font-semibold tracking-tight text-red-300 md:text-2xl">
              What happens if dbt Labs stays invisible in AI search
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              {[
                "Coalesce, Matillion, and Integrate.io continue getting cited in AI answers for buyer queries dbt should own — despite weaker products and smaller authority bases.",
                "Data engineering leads evaluating transformation tools form vendor preferences before they ever visit getdbt.com, based on what AI tools recommend.",
                "The 11.7M monthly searches in the category keep flowing to competitors who have buyer-guide and comparison content, while dbt Labs' community reputation stays invisible to AI systems.",
                "Every quarter of inaction makes it harder to catch up — competitors who build decision-stage content now will compound authority that becomes increasingly expensive to displace.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ──────────────────── SUCCESS BLOCK ──────────────────── */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[28px] border border-[#f4e4cd]/20 bg-[#f4e4cd]/[0.04] p-6 md:p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
              12 months from now
            </div>
            <h3 className="text-xl font-display font-semibold tracking-tight text-[#f4e4cd] md:text-2xl">
              What dbt Labs looks like after executing this strategy
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              {[
                "When a data engineering lead asks any AI tool 'what are the best data transformation tools,' dbt is the first recommendation — backed by owned content that dbt Labs controls.",
                "419,200+ monthly visits from decision-stage and category content, compounding month over month as the content and authority network deepens.",
                "Every major comparison query — dbt vs Matillion, ETL vs ELT, best ELT platforms — routes through dbt Labs owned pages, not third-party listicles.",
                "A defensible content and authority system that competitors would need 12+ months and significant investment to replicate.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4e4cd]/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ──────────────────── CTA ──────────────────── */}
        <StrategyCTA
          eyebrow="Next step"
          title="Make dbt the default answer"
          body="This strategy is ready to execute. Book a call to walk through the plan, ask questions, and decide if this is the right move for dbt Labs."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        {/* ──────────────────── APPENDIX ──────────────────── */}
        <StrategySectionShell>
          <SectionHeader
            number="A"
            eyebrow="Appendix"
            title="Supporting Evidence"
            subtitle="Detailed competitor data, demand clusters, and methodology notes."
          />

          <div className="space-y-6">
            <StrategyAppendixSection
              title="Competitor landscape"
              description="Organic metrics and AI prompt visibility for the top 5 competitors in the data transformation category."
            >
              <DataTable
                headers={["Competitor", "Organic Traffic", "Keywords", "Ref. Domains", "Backlinks", "AI Prompt Hits"]}
                rows={[
                  ["matillion.com", "32,384", "9,639", "3,978", "129,361", "0"],
                  ["gartner.com", "1,963,764", "259,934", "170,799", "127,001,103", "0"],
                  ["coalesce.io", "30,455", "1,695", "526", "4,353", "2"],
                  ["estuary.dev", "98,808", "10,466", "1,548", "14,262", "0"],
                  ["integrate.io", "83,748", "21,819", "3,488", "677,747", "1"],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Demand clusters"
              description="Top opportunity clusters ranked by phase and expected 12-month traffic."
            >
              <DataTable
                headers={["Cluster", "Intent", "Phase", "Monthly Demand", "Expected 12m Traffic (Base)", "Sample Keywords"]}
                rows={[
                  ["Buyer Guides", "BOFU", "Months 0–3", "1,925,000", "211,632", "data analytics tools, ETL tools, extract transform load tools"],
                  ["Category & Brand", "TOFU", "Months 9–12", "9,577,060", "201,478", "source control with git, CTEs, AWS downtime"],
                  ["Education & Awareness", "TOFU", "Months 9–12", "186,480", "3,759", "ETL what is, analytics definition, what is dbt"],
                  ["Alternatives & Comparisons", "BOFU", "Months 0–3", "21,190", "2,331", "data lake vs data warehouse, ETL vs ELT"],
                ]}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Methodology and assumptions"
              description="How the numbers in this strategy were derived."
            >
              <BulletList
                items={[
                  "Search demand validated via DataForSEO keyword data across US and AU markets as of March 2026.",
                  "AI visibility tested across 16 unbranded buyer prompts on ChatGPT, Gemini, and Google AI Overviews.",
                  "Traffic projections modeled from keyword-level click-through rates and domain authority baselines. Estimate-only — not a guarantee.",
                  "Perplexity probe data was unavailable due to API errors (GAP-001). AI visibility figures exclude Perplexity.",
                  "Some ChatGPT prompts timed out (GAP-003, GAP-004). ChatGPT mention rate reflects available data only.",
                  "Revenue modeling requires client-provided ACV/AOV and funnel conversion data.",
                ]}
              />
            </StrategyAppendixSection>
          </div>
        </StrategySectionShell>
      </div>
    </StrategyPageFrame>
  );
}