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
  GrowthTimelineChart,
  StatsGrid,
  DataTable,
  StrategyAppendixSection,
} from "@/components/strategy";
import { TldrSection } from "@/components/strategy/TldrSection";
import { SummariseButton } from "@/components/strategy/SummariseButton";
import { AIAbsenceEvidence } from "@/components/strategy/AIAbsenceEvidence";
import { TamRoiCalculator } from "@/components/strategy/TamRoiCalculator";
import {
  Search,
  TrendingUp,
  Target,
  Eye,
  Globe,
  Shield,
  BarChart3,
  Layers3,
} from "lucide-react";

export default function StrategyKlaviyo() {
  useEffect(() => {
    document.title = "Klaviyo — AI Search & Answer Engine Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">
        {/* ── HERO ── */}
        <StrategyHero
          eyebrow="AI Search Strategy — Klaviyo"
          title="15M searches. Klaviyo barely shows up."
          oneLiner="15,025,300 monthly searches in your category. Your current visibility captures a fraction of them."
          subtitle="E-commerce buyers are asking Google, ChatGPT, and Gemini which email platform to choose — right now. Klaviyo has the product and the authority base to be the default answer. But without a concentrated strategy for the queries that actually create deals, that authority stays dormant while comparison sites and smaller competitors capture the demand."
          tags={["E-commerce Tech", "Email for E-commerce", "US + AU Markets"]}
        >
          <div className="mb-8">
            <SummariseButton slug="klaviyo" />
          </div>

          <div className="mb-8">
            <TldrSection
              items={[
                "15M+ monthly searches across email marketing, e-commerce tooling, and pricing — Klaviyo has no concentrated owned coverage for most of them.",
                "Klaviyo appears in ~38% of ChatGPT answers and ~50% of Gemini answers, but only 6% of Google AI Overviews. The gap is widening.",
                "Comparison sites like emailvendorselection.com (615K monthly traffic) outrank Klaviyo on the queries that shape purchase decisions.",
                "The opening move: own pricing, cost, and value-comparison queries first — the highest-friction buying moment in the category.",
                "Base-case 12-month trajectory: 398,435 monthly organic visits. Aggressive upside: 662,007.",
              ]}
            />
          </div>

          {/* Executive Summary Metrics */}
          <div className="space-y-4">
            <StatsGrid
              columns={2}
              stats={[
                {
                  label: "Total search opportunity",
                  value: "15M+",
                  icon: <Search className="h-5 w-5" />,
                  note: "Validated monthly demand across pricing, buyer guides, category, and education queries in US + AU.",
                },
                {
                  label: "Expected traffic in 12 months (base)",
                  value: "398,435",
                  icon: <TrendingUp className="h-5 w-5" />,
                  note: "Base-case organic visits/mo. Aggressive upside: 662,007. Estimate-only.",
                },
                {
                  label: "Current AI visibility",
                  value: "6.3%",
                  icon: <Eye className="h-5 w-5" />,
                  note: "Google AI Overview mention rate. ChatGPT: 37.5%. Gemini: 50%. Inconsistent presence across answer surfaces.",
                },
                {
                  label: "First 6-month target",
                  value: "147,421",
                  icon: <Target className="h-5 w-5" />,
                  note: "Base-case monthly visits by month 6. 99.6% of opportunity is non-competitor/unbranded demand.",
                },
              ]}
            />

            {/* Immediate Actions */}
            <div className="space-y-4 mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
                Immediate actions
              </div>
              {[
                {
                  n: "01",
                  title: "Publish pricing and value-comparison pages",
                  detail:
                    "Ship the first wave of decision-stage pages targeting pricing, cost-of-use, and head-to-head comparison queries — the buying moments where Klaviyo has no owned coverage today.",
                },
                {
                  n: "02",
                  title: "Pair every page with off-site authority",
                  detail:
                    "Attach review-platform reinforcement, editorial placements, and community distribution to every published page so answer engines see third-party proof, not just self-assertion.",
                },
                {
                  n: "03",
                  title: "Expand supporting content coverage",
                  detail:
                    "Build the surrounding content network — buyer guides, use-case explainers, and category context pages — so AI models keep finding the same commercial narrative across hundreds of related queries.",
                },
              ].map((a) => (
                <StrategyCard key={a.n}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
                      {a.n}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/62">{a.detail}</p>
                    </div>
                  </div>
                </StrategyCard>
              ))}
            </div>
          </div>
        </StrategyHero>

        {/* ═══════════════════════════════════════════
            ACT 1 — THE PROBLEM
        ═══════════════════════════════════════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="01"
            title="The Problem"
            eyebrow="Act 1 — Where Klaviyo stands today"
            subtitle="Klaviyo has real product authority. But on the queries that actually shape buying decisions, comparison sites and smaller competitors are capturing the demand."
          />

          <div className="space-y-6 max-w-3xl">
            <p className="text-[15px] leading-8 text-white/68">
              When an e-commerce founder asks ChatGPT "best email marketing platform for Shopify" or searches Google for "Klaviyo vs Mailchimp pricing," the answer should feature Klaviyo prominently. Sometimes it does. But the coverage is inconsistent, incomplete, and often controlled by third-party comparison sites rather than Klaviyo itself.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              Over 40% of buying journeys in SaaS now involve AI-generated answers before a single click happens. Google AI Overviews, ChatGPT recommendations, and Gemini summaries are replacing the old "ten blue links" for high-intent commercial queries. Klaviyo currently appears in only 6.3% of sampled Google AI Overviews — while comparison sites like emailvendorselection.com drive 615,000 monthly visits by owning the exact queries Klaviyo should dominate.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              The real cost isn't lost traffic — it's lost deals. Every time a buyer asks an AI tool "which email platform should I choose for my e-commerce store" and Klaviyo isn't the clear, first-mentioned answer, that buyer enters the evaluation phase with a different default. Klaviyo may still win the deal, but at higher CAC and longer sales cycles. And for the buyers who never click through at all — the ones who make their decision entirely inside an AI answer — Klaviyo simply doesn't exist.
            </p>
          </div>

          <AIAbsenceEvidence
            company="Klaviyo"
            platforms={[
              {
                name: "ChatGPT",
                icon: "chatgpt",
                prompt: "best email for e-commerce tools",
                result:
                  "ChatGPT asked for clarification rather than giving a direct answer — listing Mailchimp and Klaviyo as possible options but not providing a confident recommendation. When the prompt is unbranded, Klaviyo appears as one option among many rather than the default answer.",
                mentioned: true,
              },
              {
                name: "Gemini",
                icon: "gemini",
                prompt: "best email for e-commerce",
                result:
                  "Gemini responded with a general guide to e-commerce email types (welcome series, abandoned cart, post-purchase) without naming Klaviyo as a platform recommendation. The response focused on email strategy rather than platform selection — a missed commercial moment.",
                mentioned: false,
              },
              {
                name: "Google AI Overview",
                icon: "google",
                prompt: "best email for e-commerce",
                result:
                  "Google's AI Overview cited a Klaviyo blog post as a source but framed the answer around email types rather than platform recommendation. Klaviyo appeared as a citation, not as the recommended solution. Only 6.3% AI Overview mention rate across sampled prompts.",
                mentioned: true,
              },
            ]}
          />

          <div className="mt-6">
            <HighlightBox title="The competitive gap" tone="warning">
              <p className="text-sm leading-7 text-white/66">
                emailvendorselection.com generates 615,142 monthly visits with just 3,730 referring domains — compared to Klaviyo's 224,330 visits from 26,089 referring domains. A comparison site with 7× fewer backlinks is driving nearly 3× more traffic because it owns the decision-stage queries. Campaign Monitor (388,323 visits) and emailtooltester.com (346,749 visits) fill the same gap. These sites control the buying narrative Klaviyo should own.
              </p>
            </HighlightBox>
          </div>
        </StrategySectionShell>

        {/* ═══════════════════════════════════════════
            ACT 2 — THE OPPORTUNITY
        ═══════════════════════════════════════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="02"
            title="The Opportunity"
            eyebrow="Act 2 — The size of the prize"
            subtitle="Klaviyo already has the authority base to win. The category demand is massive, the competition is beatable, and the opening is clear."
          />

          <div className="space-y-6 max-w-3xl">
            <p className="text-[15px] leading-8 text-white/68">
              With 26,089 referring domains and over 1.2 million backlinks, Klaviyo has one of the strongest authority foundations in the entire email marketing category. That authority just hasn't been pointed at the right queries yet. The top comparison sites winning today have a fraction of Klaviyo's backlink profile — they win because they've built focused, decision-stage content that Klaviyo hasn't.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              The opening move is pricing and value-comparison queries. These are the highest-friction buying moments — where prospects are closest to a decision and most influenced by clear, trustworthy answers. When someone searches "Klaviyo pricing" or "Klaviyo vs Mailchimp cost," Klaviyo should own that answer completely. Today, third-party sites do.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              99.6% of the validated demand in this category is non-competitor/unbranded — meaning buyers are searching for solutions, not specific brands. That's demand Klaviyo can capture by becoming the definitive answer to category-level buying questions.
            </p>
          </div>

          <div className="mt-8">
            <PhasedUpsideChart
              points={[
                { label: "M1", low: 224330, base: 228000, high: 232000 },
                { label: "M2", low: 226000, base: 235000, high: 248000 },
                { label: "M3", low: 232000, base: 252000, high: 278000 },
                { label: "M4", low: 242000, base: 275000, high: 315000 },
                { label: "M5", low: 255000, base: 300000, high: 358000 },
                { label: "M6", low: 270000, base: 330000, high: 408000 },
                { label: "M7", low: 285000, base: 348000, high: 440000 },
                { label: "M8", low: 298000, base: 360000, high: 475000 },
                { label: "M9", low: 310000, base: 372000, high: 520000 },
                { label: "M10", low: 322000, base: 382000, high: 565000 },
                { label: "M11", low: 332000, base: 390000, high: 615000 },
                { label: "M12", low: 340000, base: 398435, high: 662007 },
              ]}
            />
          </div>

          <div className="mt-8">
            <TamRoiCalculator
              baseReachableVisits={398435}
              defaultLtv={0}
              defaultVisitToCustomerRate={0.01}
            />
          </div>
        </StrategySectionShell>

        {/* ═══════════════════════════════════════════
            ACT 3 — THE PLAN
        ═══════════════════════════════════════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="03"
            title="The Plan"
            eyebrow="Act 3 — How Klaviyo wins"
            subtitle="A 6-month execution system that builds decision-stage pages, surrounds them with supporting content, and reinforces everything through off-site authority — until Klaviyo becomes the default answer."
          />

          <StrategySectionLead
            takeaway="Three moves, executed concurrently every month."
            body="This isn't a content calendar. It's an operating system that runs research, production, distribution, and measurement in parallel so Klaviyo captures compounding market share every month."
          />

          {/* 3-step overview */}
          <div className="space-y-4 mt-6">
            {[
              {
                n: "1",
                icon: <Target className="h-4 w-4" />,
                label: "Build the decision pages",
                desc: "Publish pricing explainers, comparison pages, cost-of-use breakdowns, and value frameworks for the buying queries that create shortlists. These are the owned answer assets that convert browsers into evaluators.",
              },
              {
                n: "2",
                icon: <Layers3 className="h-4 w-4" />,
                label: "Expand supporting coverage",
                desc: "Build hundreds of supporting content pages around buyer guides, category context, use cases, and educational queries — so AI models and search engines find the same commercial narrative everywhere they look.",
              },
              {
                n: "3",
                icon: <Globe className="h-4 w-4" />,
                label: "Reinforce with off-site authority",
                desc: "Distribute proof through review platforms, editorial placements, community participation, expert commentary, and high-authority backlinks — so every claim Klaviyo makes on-site is echoed by trusted third parties.",
              },
            ].map((s) => (
              <StrategyCard key={s.n} glow="blue">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
                    {s.n}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#f4e4cd]">{s.icon}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">{s.label}</span>
                    </div>
                    <p className="text-sm leading-7 text-white/68">{s.desc}</p>
                  </div>
                </div>
              </StrategyCard>
            ))}
          </div>

          {/* Month blocks */}
          <div className="mt-10 space-y-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
              6-month deployment sequence
            </div>
            {[
              {
                label: "Month 1",
                title: "Set the foundation and ship first decision pages",
                bullets: [
                  "Complete category audit: map every buying query, competitor position, and content gap",
                  "Publish first pricing and value-comparison pages targeting highest-intent queries",
                  "Set up review-platform profiles and begin authority reinforcement",
                  "Deploy technical infrastructure: schema, sitemaps, crawl optimization, entity consistency",
                  "Begin off-site distribution for every published page",
                ],
              },
              {
                label: "Month 2",
                title: "Expand comparison coverage and deepen authority",
                bullets: [
                  "Ship head-to-head comparison pages (Klaviyo vs Mailchimp, Klaviyo vs Brevo, etc.)",
                  "Publish cost-of-use and format breakdown pages",
                  "Expand review-platform presence and begin community/forum distribution",
                  "First round of editorial and listicle placements on DR70+ publications",
                  "Run first prompt re-test cycle to measure AI visibility movement",
                ],
              },
              {
                label: "Month 3",
                title: "Scale supporting content and reinforce entity signals",
                bullets: [
                  "Begin publishing supporting content network: buyer guides, use-case pages, educational content",
                  "Deepen internal linking architecture connecting supporting pages to decision pages",
                  "Expand editorial placements and expert commentary distribution",
                  "First benchmark or research asset where category data supports it",
                  "Full entity consistency audit across owned and third-party surfaces",
                ],
              },
              {
                label: "Months 4–6",
                title: "Compound distribution and defend gains",
                bullets: [
                  "Scale supporting content coverage across all four demand clusters",
                  "Refresh pricing and comparison data monthly to maintain freshness signals",
                  "Expand into category-level buyer guide queries (email marketing platforms, CRM software)",
                  "Reinforce winning prompts with additional off-site proof",
                  "Quarterly strategy review: consolidate gains, patch weak prompts, reallocate to highest-impact queries",
                ],
              },
            ].map((mb) => (
              <StrategyCard key={mb.label} glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  {mb.label}
                </div>
                <h3 className="mt-3 text-xl font-display font-bold tracking-tight text-white">
                  {mb.title}
                </h3>
                <div className="mt-4">
                  <BulletList items={mb.bullets} />
                </div>
              </StrategyCard>
            ))}
          </div>

          {/* Operating timeline */}
          <div className="mt-10">
            <GrowthTimelineChart
              points={[
                { label: "M1", month: 1, low: 224330, base: 228000, high: 232000 },
                { label: "M2", month: 2, low: 226000, base: 235000, high: 248000 },
                { label: "M3", month: 3, low: 232000, base: 252000, high: 278000 },
                { label: "M6", month: 6, low: 270000, base: 330000, high: 408000 },
                { label: "M9", month: 9, low: 310000, base: 372000, high: 520000 },
                { label: "M12", month: 12, low: 340000, base: 398435, high: 662007 },
              ]}
              milestones={[
                {
                  label: "M1",
                  month: 1,
                  title: "Foundation deployed",
                  detail:
                    "Category audit complete. First pricing and comparison pages live. Technical infrastructure deployed. Review-platform setup and early off-site distribution running.",
                  trafficLabel: "Base traffic",
                  trafficValue: 228000,
                },
                {
                  label: "M3",
                  month: 3,
                  title: "Decision coverage established",
                  detail:
                    "Full pricing and comparison layer published. Supporting content network building. First AI visibility movement measurable. Off-site authority compounding.",
                  trafficLabel: "Base traffic",
                  trafficValue: 252000,
                },
                {
                  label: "M6",
                  month: 6,
                  title: "Category presence solidified",
                  detail:
                    "Broad decision-stage coverage live. Supporting content expanding into buyer guides and category queries. Authority signals reinforcing across third-party surfaces.",
                  trafficLabel: "Base traffic",
                  trafficValue: 330000,
                },
                {
                  label: "M12",
                  month: 12,
                  title: "Category leadership compounding",
                  detail:
                    "Full demand coverage operational. Refresh and defense loops protecting gains. Klaviyo is the default answer across pricing, comparison, and category queries.",
                  trafficLabel: "Base traffic",
                  trafficValue: 398435,
                },
              ]}
            />
          </div>

          {/* What gets built */}
          <div className="mt-10 space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
              What Memetik builds and ships
            </div>
            {[
              {
                icon: <Target className="h-4 w-4" />,
                label: "Decision-stage pages",
                title: "Pricing, comparison, and value pages",
                bullets: [
                  "Pricing and cost-of-use explainers for every relevant pricing query",
                  "Head-to-head comparison pages against every named competitor",
                  "Alternative and category-capture pages for unbranded buyer queries",
                  "Format breakdown and objection-handling FAQ pages",
                  "As many pages as the demand requires — not a fixed count",
                ],
              },
              {
                icon: <Layers3 className="h-4 w-4" />,
                label: "Supporting content network",
                title: "Coverage that compounds",
                bullets: [
                  "Buyer guide and platform selection content across all four demand clusters",
                  "Use-case and persona-specific pages that reinforce decision-stage assets",
                  "Educational and awareness content that captures top-of-funnel demand",
                  "Internal linking architecture that routes authority to the pages that matter most",
                ],
              },
              {
                icon: <Globe className="h-4 w-4" />,
                label: "Off-site authority",
                title: "Third-party proof that reinforces every claim",
                bullets: [
                  "Review-platform profile setup, optimization, and review acquisition",
                  "DR70+ editorial and listicle placements",
                  "Reddit and community/forum distribution",
                  "Professional network and newsletter placements",
                  "Expert commentary and digital PR",
                  "High-authority backlinks to decision-stage pages",
                ],
              },
              {
                icon: <Shield className="h-4 w-4" />,
                label: "Technical foundation",
                title: "Machine-readable, indexable, and consistent",
                bullets: [
                  "Schema matched to visible content across all published pages",
                  "Sitemap hygiene and crawl/index optimization",
                  "Canonical structure and Bing Webmaster Tools / IndexNow setup",
                  "Entity consistency across owned and third-party surfaces",
                ],
              },
              {
                icon: <BarChart3 className="h-4 w-4" />,
                label: "Measurement and defense",
                title: "Know what's working and protect gains",
                bullets: [
                  "Monthly AI visibility and prompt coverage testing",
                  "Citation tracking across ChatGPT, Gemini, and Google AI Overviews",
                  "Monthly performance reports: visibility, authority proof, workstream completion",
                  "Quarterly strategy reviews with refresh priorities and competitive response",
                  "Monthly data and pricing refreshes to maintain freshness signals",
                ],
              },
            ].map((scope) => (
              <StrategyCard key={scope.label}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
                    {scope.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                      {scope.label}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-white">{scope.title}</h3>
                    <div className="mt-3">
                      <BulletList items={scope.bullets} />
                    </div>
                  </div>
                </div>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        {/* ── FAILURE BLOCK ── */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[28px] border border-red-500/20 bg-red-500/[0.04] p-6 md:p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400/80">
              If Klaviyo does nothing
            </div>
            <h3 className="text-xl font-display font-semibold tracking-tight text-red-300 md:text-2xl">
              The cost of staying invisible
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              {[
                "Comparison sites continue to control the buying narrative — emailvendorselection.com, emailtooltester.com, and Campaign Monitor keep capturing the decision-stage queries Klaviyo should own.",
                "AI answer engines solidify their recommendation patterns around whatever content exists today. Once a competitor becomes the default answer, displacing them gets exponentially harder.",
                "Every month without concentrated decision-stage coverage is another month of pipeline leaking to competitors who built the pages Klaviyo didn't.",
                "The 15M+ monthly searches in this category won't wait. Competitors are already building the content infrastructure to capture them.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── SUCCESS BLOCK ── */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[28px] border border-[#f4e4cd]/20 bg-[#f4e4cd]/[0.04] p-6 md:p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
              12 months from now
            </div>
            <h3 className="text-xl font-display font-semibold tracking-tight text-[#f4e4cd] md:text-2xl">
              Klaviyo as the default answer
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              {[
                "When a buyer asks any AI tool 'which email platform for e-commerce,' Klaviyo is the first-mentioned, clearly recommended answer — consistently, across every major surface.",
                "Klaviyo owns the pricing and comparison narrative with authoritative, self-published pages that third-party sites can't outrank or misrepresent.",
                "398,000+ monthly organic visits (base case) flowing through decision-stage content that captures buyers at the highest-intent moment in their journey.",
                "A compounding authority system where every new page, placement, and review reinforces the same commercial story — making Klaviyo harder to displace with every passing month.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4e4cd]/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── CTA ── */}
        <StrategyCTA
          eyebrow="Book Strategy Call"
          title="Make Klaviyo the default answer."
          body="The data is clear. The opportunity is quantified. The execution system is ready. Let's discuss how to turn Klaviyo's existing authority into category ownership across every AI search surface that matters."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        {/* ── APPENDIX ── */}
        <StrategySectionShell>
          <SectionHeader
            number="A"
            title="Supporting Evidence"
            eyebrow="Appendix"
            subtitle="Detailed data tables, competitor benchmarks, and demand breakdowns behind this strategy."
          />

          <div className="space-y-6">
            <StrategyAppendixSection
              title="Competitor landscape"
              description="Organic traffic, keyword coverage, and authority metrics for the top competitors in Klaviyo's category."
            >
              <DataTable
                headers={["Competitor", "Organic traffic", "Keywords", "Ref. domains", "Backlinks"]}
                rows={[
                  ["emailvendorselection.com", "615,142", "12,717", "3,730", "16,894"],
                  ["campaignmonitor.com", "388,323", "34,428", "33,306", "228,798"],
                  ["emailtooltester.com", "346,749", "17,549", "4,516", "16,613"],
                  ["brevo.com", "80,010", "24,311", "78,270", "13,774,991"],
                  ["sender.net", "64,925", "25,555", "10,238", "958,029"],
                  [
                    <span key="k" className="font-semibold text-[#f4e4cd]">Klaviyo (current)</span>,
                    "224,330",
                    "45,705",
                    "26,089",
                    "1,295,554",
                  ],
                ]}
                highlightRow={5}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Demand cluster breakdown"
              description="The four primary demand clusters driving the 15M+ monthly search opportunity."
            >
              <DataTable
                headers={["Cluster", "Intent", "Monthly demand", "Expected 12m traffic (base)", "Phase"]}
                rows={[
                  ["Category & Brand Demand", "TOFU", "13,119,070", "269,911", "Months 9–12"],
                  ["Buyer Guides", "TOFU", "1,239,480", "93,558", "Months 9–12"],
                  ["Pricing & Cost", "BOFU", "115,360", "12,690", "Months 0–3"],
                  ["Education & Awareness", "TOFU", "362,800", "7,256", "Months 9–12"],
                ]}
                highlightRow={2}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Keyword attribution summary"
              description="Breakdown of competitor vs non-competitor/unbranded demand."
            >
              <DataTable
                headers={["Segment", "Demand", "% of total", "12m traffic (base)", "6m target (base)"]}
                rows={[
                  ["Competitor-keyword", "66,120", "0.4%", "3,761", "1,392"],
                  ["Non-competitor / unbranded", "14,959,180", "99.6%", "394,674", "146,029"],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="AI visibility evidence"
              description="Platform-level mention rates from sampled prompts. Some platform probes returned errors — findings should be interpreted with caveat discipline."
            >
              <DataTable
                headers={["Platform", "Mention rate", "Sample size", "Notes"]}
                rows={[
                  ["ChatGPT", "37.5%", "16 prompts", "Named as one option; rarely the default recommendation"],
                  ["Gemini", "50.0%", "16 prompts", "Mentioned in category context; inconsistent positioning"],
                  ["Google AI Overview", "6.3%", "16 prompts", "Cited as source, not recommended as platform"],
                  ["Perplexity", "—", "Probe error", "Data unavailable; caveat applies"],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Assumptions and methodology"
              description="How the traffic and demand numbers in this strategy were derived."
            >
              <BulletList
                items={[
                  "Search demand figures are based on validated keyword data across US and AU markets as of March 2026.",
                  "Traffic projections use standard click-through-rate modeling against keyword difficulty and current rankings. Estimate-only — actual results depend on execution speed, competitive response, and market conditions.",
                  "AI visibility rates are based on a 16-prompt sample per platform. These represent directional signals, not comprehensive audits.",
                  "Revenue planning requires Klaviyo's actual ACV/AOV and funnel conversion inputs — not provided in this analysis.",
                  "Some AI platform probes returned errors (Perplexity, one ChatGPT prompt). Findings are directionally sound but incomplete on those surfaces.",
                ]}
              />
            </StrategyAppendixSection>
          </div>
        </StrategySectionShell>
      </div>
    </StrategyPageFrame>
  );
}