import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import {
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyCTA,
  SectionHeader,
  HighlightBox,
  BulletList,
  StatsGrid,
  PhasedUpsideChart,
  DataTable,
  StrategyAppendixSection,
  StrategySectionLead,
  GrowthTimelineChart,
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
  Layers3,
  Shield,
  Globe,
  BarChart3,
  Bot,
  Sparkles,
} from "lucide-react";

export default function StrategyLinear() {
  useEffect(() => {
    document.title = "Linear — AI Search & Answer Engine Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">

        {/* ── HERO ── */}
        <StrategyHero
          eyebrow="Answer Engine Strategy — Linear"
          title="12M searches. Jira gets the answer."
          oneLiner="12.3M monthly searches in issue tracking. Linear owns almost none of them."
          subtitle="Engineering teams already love Linear. But when buyers ask Google, ChatGPT, or Gemini which issue tracker to choose, Jira and GitHub dominate the answers. This strategy shows how to change that — and what it costs to wait."
          tags={["Dev Tools", "Issue Tracking", "US + AU", "Search + AI Visibility"]}
        >
          <div className="mb-8">
            <SummariseButton slug="linear" />
          </div>

          <div className="mb-8">
            <TldrSection
              items={[
                "12.3M monthly searches in Linear's category — Linear captures less than 0.5% of that demand today.",
                "Jira (Atlassian) has 122× Linear's organic traffic and dominates AI answer surfaces.",
                "Linear appears in ~62% of ChatGPT and ~87% of Gemini responses — but almost never in Google AI Overviews.",
                "A focused 6-month program targeting buyer-guide and comparison queries could drive 566K+ monthly visits within 12 months.",
              ]}
            />
          </div>

          {/* Executive metrics */}
          <div className="space-y-4">
            <StatsGrid
              columns={2}
              stats={[
                {
                  label: "Total category search demand",
                  value: "12.3M",
                  icon: <Search className="h-5 w-5" />,
                  note: "Monthly validated searches across issue tracking, project management, and dev-tool buyer queries in US + AU.",
                },
                {
                  label: "Expected traffic in 12 months",
                  value: "566,958",
                  icon: <TrendingUp className="h-5 w-5" />,
                  note: "Base-case modeled traffic from a focused program. Estimate-only — aggressive upside reaches 876K.",
                },
                {
                  label: "Current organic traffic",
                  value: "66,532",
                  icon: <Eye className="h-5 w-5" />,
                  note: "Linear's current monthly organic visits — less than 1% of total category demand.",
                },
                {
                  label: "First 6-month target",
                  value: "209,774",
                  icon: <Target className="h-5 w-5" />,
                  note: "Base-case traffic target for the first half of the engagement.",
                },
              ]}
            />

            <StrategyCard>
              <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                Keyword attribution
              </div>
              <p className="text-sm leading-7 text-white/62 mb-4">
                99.9% of the identified search opportunity is non-competitor and unbranded demand — buyers searching for categories, use cases, and comparisons, not specific brand names. This is open territory.
              </p>
              <BulletList
                items={[
                  "Non-competitor / unbranded demand: 12,351,790 monthly searches (99.9%)",
                  "Competitor-keyword demand: 13,580 monthly searches (0.1%)",
                  "Unbranded expected 12-month traffic (base): 566,356",
                ]}
              />
            </StrategyCard>

            {/* Immediate actions */}
            <div className="mt-6 space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                Immediate actions
              </div>
              {[
                {
                  n: "01",
                  title: "Publish decision-stage pages for the highest-intent buyer queries",
                  detail:
                    "Best issue tracking tools, project tracking software, Linear vs Jira — these are the queries that form vendor shortlists. Linear needs owned pages for each one.",
                },
                {
                  n: "02",
                  title: "Pair every new page with off-site authority and review proof",
                  detail:
                    "Publishing alone isn't enough. Each decision page needs matching third-party placements, backlinks, review-platform presence, and community mentions to earn AI recommendation confidence.",
                },
                {
                  n: "03",
                  title: "Build the supporting content network that makes AI engines keep finding Linear",
                  detail:
                    "Surround decision pages with supporting coverage across use cases, buyer contexts, and adjacent comparisons so retrieval systems repeatedly surface the same commercial story.",
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

        {/* ═══════════ ACT 1: THE PROBLEM ═══════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="01"
            title="The Problem"
            eyebrow="Act 1 — Where Linear stands today"
            subtitle="Linear has the product. It doesn't have the pages that make buyers find it."
          />

          <div className="space-y-6 max-w-3xl">
            <p className="text-[15px] leading-8 text-white/68">
              Over 12 million searches happen every month in the issue-tracking and project-management category across the US and Australia. These aren't casual browsers — they're engineering leads evaluating tools, CTOs comparing pricing, and team leads asking "best issue tracker for startups."
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              Linear captures almost none of this demand. With 66,532 monthly organic visits against a 12.3M-search category, Linear is invisible in the moments that form vendor shortlists. Meanwhile, Atlassian's Jira pulls in 8.1 million visits per month. Monday.com pulls in 919K. Even Plane — a fraction of Linear's product quality — gets 96K.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              The issue isn't brand awareness. Developers know Linear. The issue is that Linear has no owned content for the buyer queries that matter — no "best issue tracking tools" page, no "Linear vs Jira" comparison, no pricing transparency page that search engines and AI models can cite when someone asks for a recommendation.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              In AI search, this creates a specific kind of damage. When a buyer asks ChatGPT or Gemini "best issue tracking software," Linear sometimes appears — but inconsistently, and never as the default recommendation. In Google AI Overviews, Linear appeared in only 12.5% of sampled prompts. Jira is cited first in almost every response. The buyers Linear loses here never show up in any analytics dashboard — they simply choose a competitor before Linear ever gets the call.
            </p>
          </div>

          {/* AI evidence */}
          <AIAbsenceEvidence
            company="Linear"
            platforms={[
              {
                name: "ChatGPT",
                icon: "chatgpt",
                prompt: "best issue tracking tools",
                result:
                  "Lists Jira Software first as \"best overall for large teams,\" followed by GitHub Issues, then mentions Linear as \"best modern developer tool\" — but Jira consistently leads the recommendation and gets the most detailed coverage.",
                mentioned: true,
              },
              {
                name: "Gemini",
                icon: "gemini",
                prompt: "best issue tracking",
                result:
                  "Jira is named the \"industry standard\" for software development. Linear is categorized as \"small teams / startups\" — a niche framing that undersells the product to enterprise buyers evaluating their options.",
                mentioned: true,
              },
              {
                name: "Google AI Overview",
                icon: "google",
                prompt: "best project tracking software",
                result:
                  "Linear was absent from the majority of sampled Google AI Overview responses. Jira, Monday.com, and GitHub Issues dominate the overview panels that appear above traditional search results.",
                mentioned: false,
              },
            ]}
          />

          <StrategyCard className="mt-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd] mb-3">
              AI visibility snapshot
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { platform: "ChatGPT", rate: "62.5%", note: "10 of 16 sampled prompts" },
                { platform: "Gemini", rate: "87.5%", note: "14 of 16 sampled prompts" },
                { platform: "Google AI Overview", rate: "12.5%", note: "2 of 16 sampled prompts" },
              ].map((p) => (
                <div key={p.platform} className="rounded-[18px] border border-white/8 bg-black/20 p-4 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{p.platform}</div>
                  <div className="mt-2 text-2xl font-display font-bold text-white">{p.rate}</div>
                  <div className="mt-1 text-xs text-white/45">{p.note}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-white/55">
              Linear has partial momentum in LLM responses but almost no presence in Google AI Overviews — the surface that now appears above traditional search results for most buyer queries. This is where shortlists form before a click ever happens.
            </p>
          </StrategyCard>
        </StrategySectionShell>

        {/* ═══════════ ACT 2: THE OPPORTUNITY ═══════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="02"
            title="The Opportunity"
            eyebrow="Act 2 — The size of the prize"
            subtitle="Linear has the authority base to win. It just hasn't built the pages yet."
          />

          <div className="space-y-6 max-w-3xl">
            <p className="text-[15px] leading-8 text-white/68">
              Linear already has 6,166 referring domains and 66,000+ backlinks. That's a real authority foundation — far stronger than most companies at this stage. The problem isn't credibility. It's that Linear hasn't converted that authority into a concentrated set of decision-stage pages that search engines and AI models can serve to buyers.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              The opening is buyer-guide demand. Over 3.3 million monthly searches happen around queries like "best project tracking software," "project management tools," and "issue tracker for engineering teams." These are the queries where buying decisions are made — and right now, Linear has no owned pages targeting them. This is where Memetik starts.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              Then come comparisons and pricing — "Linear vs Jira," "Jira pricing," "ClickUp alternatives" — another 90K monthly searches where buyers are actively evaluating options. Linear needs to own these pages so the comparison happens on its terms, not on a third-party site that may not present the product fairly.
            </p>
          </div>

          <div className="mt-8">
            <PhasedUpsideChart
              points={[
                { label: "Now", low: 66532, base: 66532, high: 66532 },
                { label: "M3", low: 90000, base: 120000, high: 160000 },
                { label: "M6", low: 145000, base: 209774, high: 290000 },
                { label: "M9", low: 220000, base: 380000, high: 540000 },
                { label: "M12", low: 334000, base: 566958, high: 876833 },
              ]}
            />
          </div>

          <div className="mt-6">
            <TamRoiCalculator baseReachableVisits={566958} />
          </div>
        </StrategySectionShell>

        {/* ═══════════ ACT 3: THE PLAN ═══════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="03"
            title="The Plan"
            eyebrow="Act 3 — How Memetik builds this"
            subtitle="A 6-month program that compounds every month — not a content calendar."
          />

          <StrategySectionLead
            takeaway="Three moves. One system. Compounding results."
            body="Every month runs research, production, distribution, and measurement in parallel. Nothing ships without matching off-site authority. Nothing gets published without the technical infrastructure to make it findable."
          />

          {/* 3-step summary */}
          <div className="space-y-4 mb-8">
            {[
              {
                step: "01",
                title: "Capture the buyer queries",
                body: "Publish decision-stage pages — buyer guides, head-to-head comparisons, pricing transparency, and use-case pages — for the highest-intent searches in issue tracking.",
              },
              {
                step: "02",
                title: "Build the authority layer",
                body: "Every decision page gets matched off-site authority: review-platform placements, editorial mentions, community threads, backlinks from DR70+ domains, and comparison listicles on third-party publications.",
              },
              {
                step: "03",
                title: "Expand and compound",
                body: "Surround decision pages with supporting content that covers long-tail use cases, buyer contexts, and adjacent queries — so AI retrieval systems keep finding the same story across hundreds of surfaces.",
              },
            ].map((s) => (
              <StrategyCard key={s.step} glow="blue">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/62">{s.body}</p>
                  </div>
                </div>
              </StrategyCard>
            ))}
          </div>

          {/* Month blocks */}
          <div className="space-y-4">
            {[
              {
                label: "Month 1",
                title: "Set the foundation and ship the first decision pages",
                bullets: [
                  "Full discovery audit: map every buyer query in the category, benchmark competitor content and AI visibility, identify the fastest-win pages",
                  "Publish the first wave of decision-stage pages targeting \"best issue tracking,\" \"project tracking software,\" and \"Linear vs Jira\"",
                  "Set up review-platform profiles and begin first off-site authority placements",
                  "Technical foundation: schema, sitemap hygiene, crawl eligibility, entity consistency, and IndexNow setup",
                ],
              },
              {
                label: "Month 2",
                title: "Expand comparisons and deepen authority",
                bullets: [
                  "Publish comparison pages for every major competitor: Linear vs Monday, Linear vs GitHub Issues, Linear vs ClickUp",
                  "Pricing transparency pages for key buyer queries",
                  "First wave of backlinks from DR70+ domains pointing to decision pages",
                  "Reddit and community thread participation around issue-tracking discussions",
                ],
              },
              {
                label: "Month 3",
                title: "Build supporting coverage and reinforce everything",
                bullets: [
                  "Launch the supporting content network: use-case pages, buyer-context pages, industry-specific guides",
                  "Entity reinforcement: consistent author profiles, about pages, and third-party review coverage",
                  "Second wave of editorial placements and expert commentary in dev-tool publications",
                  "First measurement cycle: prompt testing, citation tracking, traffic attribution",
                ],
              },
              {
                label: "Months 4–6",
                title: "Compound distribution and expand market share",
                bullets: [
                  "Scale supporting content across every use case, team size, and buyer persona in the category",
                  "Refresh data, pricing, and benchmark claims on all decision pages to maintain freshness signals",
                  "Widen off-site authority: newsletter placements, professional-network distribution, and new editorial coverage",
                  "Quarterly strategy review: defend won prompts, attack weakening competitor positions, reallocate effort to highest-upside queries",
                ],
              },
            ].map((m) => (
              <StrategyCard key={m.label} glow="blue">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
                  {m.label}
                </div>
                <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">
                  {m.title}
                </h3>
                <div className="mt-5">
                  <BulletList items={m.bullets} />
                </div>
              </StrategyCard>
            ))}
          </div>

          {/* Operating timeline */}
          <div className="mt-8">
            <GrowthTimelineChart
              points={[
                { month: 1, label: "M1", low: 70000, base: 85000, high: 105000, title: "Foundation & first decision pages", detail: "Discovery audit, first wave of buyer-guide pages, review-platform setup, technical foundation.", trafficLabel: "Base traffic", trafficValue: 85000 },
                { month: 2, label: "M2", low: 80000, base: 100000, high: 130000, title: "Comparisons & authority deepening", detail: "Competitor comparisons, pricing pages, first backlinks, community participation.", trafficLabel: "Base traffic", trafficValue: 100000 },
                { month: 3, label: "M3", low: 95000, base: 130000, high: 175000, title: "Supporting network & measurement", detail: "Supporting content launch, entity reinforcement, editorial placements, first citation tracking.", trafficLabel: "Base traffic", trafficValue: 130000 },
                { month: 4, label: "M4", low: 120000, base: 170000, high: 240000, title: "Scale & compound", detail: "Expanded supporting content, broader off-site authority, data refreshes on decision pages.", trafficLabel: "Base traffic", trafficValue: 170000 },
                { month: 5, label: "M5", low: 160000, base: 230000, high: 340000, title: "Category expansion", detail: "New use-case clusters, newsletter distribution, professional-network placements.", trafficLabel: "Base traffic", trafficValue: 230000 },
                { month: 6, label: "M6", low: 200000, base: 300000, high: 450000, title: "First plateau & strategy review", detail: "Quarterly review: defend wins, attack weakening competitors, reallocate to highest-upside queries.", trafficLabel: "Base traffic", trafficValue: 300000 },
                { month: 9, label: "M9", low: 260000, base: 420000, high: 620000, title: "Broader category demand capture", detail: "Category and brand demand coverage, expanded comparison network, deeper editorial placements.", trafficLabel: "Base traffic", trafficValue: 420000 },
                { month: 12, label: "M12", low: 334000, base: 566958, high: 876833, title: "Full compound effect", detail: "The system reaches compound velocity — decision pages, supporting content, and authority all reinforcing each other.", trafficLabel: "Base traffic", trafficValue: 566958 },
              ]}
              milestones={[
                { label: "M1", month: 1, title: "Foundation", detail: "Audit, first decision pages, technical setup, review-platform presence.", trafficLabel: "Base traffic", trafficValue: 85000 },
                { label: "M3", month: 3, title: "First measurement cycle", detail: "Supporting content live, first citation tracking, editorial placements shipping.", trafficLabel: "Base traffic", trafficValue: 130000 },
                { label: "M6", month: 6, title: "Quarterly review", detail: "Defend wins, reallocate effort, scale to next demand tier.", trafficLabel: "Base traffic", trafficValue: 300000 },
                { label: "M12", month: 12, title: "Full compound", detail: "Category coverage at scale, durable recommendation positioning, compounding traffic.", trafficLabel: "Base traffic", trafficValue: 566958 },
              ]}
            />
          </div>

          {/* Scope: what Memetik ships */}
          <HighlightBox className="mt-8" title="What Memetik builds every month">
            <BulletList
              items={[
                "Decision-stage pages: buyer guides, head-to-head comparisons, alternative roundups, pricing transparency pages, use-case pages — as many as needed to cover the demand",
                "Supporting content network: hundreds of pages covering long-tail use cases, buyer contexts, and adjacent queries that reinforce decision pages",
                "Off-site authority: review-platform placements, Reddit/community participation, DR70+ backlinks, editorial placements, comparison listicles on third-party publications, expert commentary, newsletter distribution",
                "Technical infrastructure: structured data matched to visible content, sitemap hygiene, crawl eligibility, canonicals, Bing Webmaster Tools, IndexNow, entity consistency across owned and third-party surfaces",
                "Measurement: prompt testing across ChatGPT, Gemini, and Google AI Overviews, citation tracking, traffic attribution, monthly recommendation-visibility reporting",
                "Refresh and defense: monthly data and pricing updates, quarterly decision-page reviews, competitor-response updates, and drift correction when a previously won query softens",
              ]}
            />
          </HighlightBox>
        </StrategySectionShell>

        {/* ═══════════ FAILURE BLOCK ═══════════ */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[28px] border border-red-500/20 bg-red-500/[0.04] p-6 md:p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400/80">
              What happens if Linear does nothing
            </div>
            <h3 className="text-xl font-display font-semibold tracking-tight text-red-300 md:text-2xl">
              The gap widens every month
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              {[
                "Jira and Monday.com continue to capture the buyer queries that form shortlists — every month they publish and distribute, the gap becomes harder to close.",
                "Google AI Overviews expand into more issue-tracking queries. Without owned content, Linear stays absent from the surface that now sits above traditional search results.",
                "Engineering leads who would choose Linear never see it in their research phase — they shortlist Jira, evaluate Monday, and make a decision before Linear gets the call.",
                "Newer competitors like Plane build their content presence while Linear's product advantage erodes through pure invisibility.",
              ].map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ═══════════ SUCCESS BLOCK ═══════════ */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[28px] border border-[#f4e4cd]/20 bg-[#f4e4cd]/[0.04] p-6 md:p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
              What 12 months from now looks like
            </div>
            <h3 className="text-xl font-display font-semibold tracking-tight text-[#f4e4cd] md:text-2xl">
              Linear becomes the default recommendation
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              {[
                "When a CTO asks ChatGPT \"best issue tracking tool for startups,\" Linear is the first name — with a confident recommendation, not a footnote.",
                "Google AI Overviews cite Linear's owned decision pages for buyer-intent queries, putting the brand above traditional search results.",
                "566K+ monthly organic visits from buyers actively evaluating tools — a pipeline channel that compounds instead of resetting every quarter.",
                "The content and authority moat makes it progressively harder for competitors to displace Linear from the queries that create revenue.",
              ].map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4e4cd]/60" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ═══════════ CTA ═══════════ */}
        <StrategyCTA
          eyebrow="Next step"
          title="Let's make Linear the answer."
          body="This strategy is ready to execute. Book a call to walk through the research, discuss priorities, and define the first 30 days. Memetik builds category-defining search and AI visibility for dev tools — and Linear is exactly the kind of product that should own its category."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        {/* ═══════════ APPENDIX ═══════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="A"
            title="Supporting Evidence"
            eyebrow="Appendix"
            subtitle="Detailed data behind the strategy — competitor benchmarks, opportunity clusters, and prompt evidence."
          />

          <div className="space-y-6">
            <StrategyAppendixSection
              title="Competitor landscape"
              description="Organic traffic, keyword coverage, and backlink profiles for Linear's primary competitors."
            >
              <DataTable
                headers={["Competitor", "Organic traffic", "Keywords", "Referring domains", "Backlinks"]}
                rows={[
                  ["linear.app", "66,532", "16,427", "6,166", "66,056"],
                  ["atlassian.com (Jira)", "8,158,279", "539,199", "156,051", "74,568,368"],
                  ["github.com", "48,417,137", "4,294,553", "2,218,878", "4,625,038,368"],
                  ["monday.com", "919,983", "154,685", "71,799", "8,537,980"],
                  ["plane.so", "96,852", "12,129", "1,400", "108,845"],
                ]}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Opportunity clusters"
              description="The four demand clusters that form the basis of the execution plan."
            >
              <DataTable
                headers={["Cluster", "Intent", "Phase", "Monthly demand", "12-month traffic (base)"]}
                rows={[
                  ["Buyer Guides", "BOFU", "Months 0–3", "3,375,480", "371,303"],
                  ["Category & Brand", "TOFU", "Months 9–12", "8,719,870", "181,710"],
                  ["Pricing & Cost", "BOFU", "Months 0–3", "52,100", "5,731"],
                  ["Alternatives & Comparisons", "BOFU", "Months 0–3", "37,770", "4,155"],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Commercial keyword signals"
              description="High-volume keywords where Linear has no or weak positioning today."
            >
              <DataTable
                headers={["Keyword", "Current position", "Monthly volume"]}
                rows={[
                  ["define alternatives", "104", "18,100"],
                  ["slack pricing", "80", "8,100"],
                  ["notion pricing", "102", "6,600"],
                  ["best software for project management", "53", "5,400"],
                  ["best app for planning", "53", "4,400"],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="AI prompt evidence"
              description="Sample prompts tested across ChatGPT and Gemini showing how Linear is currently positioned in AI responses."
            >
              <div className="space-y-4">
                <StrategyCard>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">ChatGPT</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">US</span>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Prompt</div>
                  <div className="mt-2 text-sm font-semibold text-white">"best issue tracking tools"</div>
                  <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Result</div>
                  <p className="mt-2 text-sm leading-7 text-white/62">Jira is listed first as "best overall." Linear appears as "best modern developer tool" — a secondary mention, not the default recommendation.</p>
                </StrategyCard>
                <StrategyCard>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Gemini</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">AU</span>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Prompt</div>
                  <div className="mt-2 text-sm font-semibold text-white">"best issue tracking"</div>
                  <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Result</div>
                  <p className="mt-2 text-sm leading-7 text-white/62">Linear is called "The Speed Demon" and positioned for "high-speed startups" — a niche framing that undersells the product to enterprise teams and mid-market buyers evaluating alternatives to Jira.</p>
                </StrategyCard>
              </div>
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Assumptions and caveats"
              description="Material assumptions behind the traffic projections and strategy."
            >
              <BulletList
                items={[
                  "Traffic projections are modeled estimates based on keyword demand, intent distribution, and expected capture rates. Actual results will vary based on execution speed, content quality, and competitive response.",
                  "AI visibility data was sampled across 16 prompts on ChatGPT, Gemini, and Google AI Overviews. Perplexity probes were unavailable at the time of research.",
                  "Some ChatGPT prompts timed out during data collection. Where evidence is incomplete, findings have been softened rather than fabricated.",
                  "Revenue projections require Linear's ACV and funnel conversion data to be meaningful — the calculator above is a planning tool, not a forecast guarantee.",
                  "All data was collected on 2026-03-16. Competitor positions and AI response patterns may shift as the market evolves.",
                ]}
              />
            </StrategyAppendixSection>
          </div>
        </StrategySectionShell>
      </div>
    </StrategyPageFrame>
  );
}