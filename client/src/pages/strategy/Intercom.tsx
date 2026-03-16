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
  PhasedUpsideChart,
  GrowthTimelineChart,
  TamRoiCalculator,
  StrategyAppendixSection,
  DataTable,
} from "@/components/strategy";
import { TldrSection } from "@/components/strategy/TldrSection";
import { SummariseButton } from "@/components/strategy/SummariseButton";
import { AIAbsenceEvidence } from "@/components/strategy/AIAbsenceEvidence";
import { StatCard } from "@/components/strategy/StatsGrid";
import {
  Search,
  TrendingUp,
  Bot,
  Eye,
  Target,
  Globe,
  Shield,
  BarChart3,
  Layers3,
  RefreshCw,
} from "lucide-react";

export default function StrategyIntercom() {
  useEffect(() => {
    document.title = "Intercom — AI Search Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">

        {/* ── HERO ── */}
        <StrategyHero
          eyebrow="AI Search Strategy — Intercom"
          title="34.8M searches. Intercom is invisible."
          oneLiner="Your buyers are asking AI who to choose. Right now, the answer isn't Intercom."
          subtitle="We mapped 34.8 million monthly searches across customer messaging, AI chatbots, and CRM software. Intercom captures a fraction of that demand today — and is nearly absent from AI answer surfaces. This strategy shows the gap, the commercial prize, and the 6-month plan to close it."
          tags={["Customer Success", "Messaging", "US + AU", "intercom.com"]}
        >
          <div className="mb-8">
            <SummariseButton slug="intercom" />
          </div>

          <div className="mb-8">
            <TldrSection
              items={[
                "34.8M monthly searches in Intercom's category — current organic traffic is 92,712.",
                "AI visibility is critically low: 6% mention rate on ChatGPT, 0% on Gemini and Google AI Overviews.",
                "Zendesk has 60× more organic traffic but has not locked AI answer surfaces yet — the window is open.",
                "A focused buyer-guide strategy can reach 1M+ monthly visits within 12 months and make Intercom the default AI recommendation.",
              ]}
            />
          </div>

          {/* Executive Metrics */}
          <div className="space-y-4">
            <StatCard
              label="Total search opportunity"
              value="34.8M"
              icon={<Search className="h-5 w-5" />}
              note="Monthly validated demand across customer messaging, AI chatbot, CRM, and helpdesk queries in US and AU markets."
            />
            <StatCard
              label="Expected traffic in 12 months (base)"
              value="1,049,239"
              icon={<TrendingUp className="h-5 w-5" />}
              note="Base-case modeled traffic from a focused execution plan. Aggressive upside: 1.7M."
            />
            <StatCard
              label="AI visibility — ChatGPT"
              value="6.3%"
              icon={<Bot className="h-5 w-5" />}
              note="Intercom appeared in 1 of 16 sampled prompts on ChatGPT. Zero mentions on Gemini and Google AI Overviews."
            />
            <StatCard
              label="Current organic traffic"
              value="92,712"
              icon={<Eye className="h-5 w-5" />}
              note="Against 34.8M monthly demand, Intercom currently captures less than 0.3% of category traffic."
            />
          </div>

          {/* Immediate Actions */}
          <div className="mt-8 space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
              Immediate actions
            </div>
            {[
              { n: "01", title: "Publish decision-stage buyer guides", detail: "Ship the first wave of commercial pages targeting 'best AI chatbot platform,' 'knowledge base software,' and 'customer relationship management software' — the queries where buyers build shortlists." },
              { n: "02", title: "Pair every page with off-site authority", detail: "Every published page gets matched with review-platform reinforcement, editorial placements, and community distribution so AI engines see consistent third-party proof." },
              { n: "03", title: "Expand supporting coverage to compound", detail: "Build surrounding content across adjacent use cases, buyer contexts, and comparison angles so answer engines keep finding the same commercial story from multiple directions." },
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
        </StrategyHero>

        {/* ═══════════════════════════════════════════════
            ACT 1 — THE PROBLEM
        ═══════════════════════════════════════════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="01"
            title="The Problem"
            eyebrow="Act 1 — Where Intercom stands today"
            subtitle="Intercom has category authority. It does not have category visibility."
          />

          <div className="mb-8 space-y-6 max-w-3xl">
            <p className="text-[15px] leading-8 text-white/68">
              Intercom is one of the most recognized names in customer messaging. But recognition and discoverability are two different things. Today, when a buyer asks Google, ChatGPT, or Gemini "what is the best AI chatbot platform" or "best customer relationship management software," Intercom is almost never in the answer.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              The category has 34.8 million monthly searches — and Intercom captures less than 0.3% of that traffic. Meanwhile Zendesk generates 60× more organic visits, not because it has a better product, but because it has more pages answering the questions buyers actually ask. The gap is not about brand strength. It is about who owns the commercial content layer that search engines and AI models pull from.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              The shift to AI-generated answers makes this worse. Over half of Google searches now end without a click — buyers read the AI summary and move on. If Intercom is not the answer inside that summary, it is not on the shortlist. And right now, it is not. Across 16 sampled prompts, Intercom appeared in only 1 ChatGPT response, zero Gemini responses, and zero Google AI Overviews.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              This means deals are being lost before sales ever knows they existed. A VP of Support evaluates three platforms based on an AI recommendation, Intercom is not among them, and the deal closes with a competitor — all without a single website visit registering in analytics.
            </p>
          </div>

          <AIAbsenceEvidence
            company="Intercom"
            platforms={[
              {
                name: "ChatGPT",
                icon: "chatgpt",
                prompt: "best messaging tools",
                result: "ChatGPT listed WhatsApp, Telegram, Signal, Slack, and Microsoft Teams across personal, team, and business categories. Intercom was mentioned only tangentially as a business communication tool — not as a recommended option in the primary list.",
                mentioned: true,
              },
              {
                name: "ChatGPT",
                icon: "chatgpt",
                prompt: "best messaging",
                result: "ChatGPT asked for clarification ('Are you asking about the best messaging apps, tips for writing great messages, or something else?'). No brands were recommended. Intercom was absent.",
                mentioned: false,
              },
              {
                name: "Gemini",
                icon: "gemini",
                prompt: "best messaging",
                result: "Gemini recommended Signal, WhatsApp, Telegram, iMessage, and Discord — all consumer tools. No business messaging platforms were mentioned. Intercom was completely absent.",
                mentioned: false,
              },
            ]}
          />

          <div className="mt-8">
            <HighlightBox title="The competitive gap" tone="warning">
              <p className="text-sm leading-7 text-white/66">
                Zendesk generates 5.6M monthly organic visits from 818,000 keywords. Intercom generates 92,712 from 23,934. The gap is not brand — it is content infrastructure. Zendesk has built the buyer-guide and comparison layer that search and AI engines pull from. Intercom has not. That means every "best customer support software" query, every "Zendesk vs alternatives" comparison, every "AI chatbot platform" evaluation is a deal Zendesk gets to influence and Intercom does not.
              </p>
            </HighlightBox>
          </div>
        </StrategySectionShell>

        {/* ═══════════════════════════════════════════════
            ACT 2 — THE OPPORTUNITY
        ═══════════════════════════════════════════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="02"
            title="The Opportunity"
            eyebrow="Act 2 — Why Intercom wins this"
            subtitle="Intercom has 41,714 referring domains and real category authority. It just needs to point that authority at the queries that actually create pipeline."
          />

          <div className="mb-8 space-y-6 max-w-3xl">
            <p className="text-[15px] leading-8 text-white/68">
              Here is what makes Intercom's position different from a startup trying to break in: the authority already exists. Over 41,000 domains already link to intercom.com. Over 1 million backlinks. The brand has real credibility with search engines and AI models — it just has not converted that credibility into decision-stage content.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              The opening move is buyer guides — the cluster of queries where people search for "best AI chatbot platform," "knowledge base software," "customer relationship management CRM software," and similar decision-stage terms. This cluster represents 3.7 million monthly searches and over 410,000 base-case annual visits. These are the queries where a single well-built page can shift whether Intercom makes the shortlist.
            </p>
            <p className="text-[15px] leading-8 text-white/68">
              And the window is open: none of the sampled competitors — including Zendesk — have locked AI answer surfaces yet. Zero prompt hits across the board in our testing. The first platform to build the right content layer and reinforce it with third-party proof will become the default recommendation. Intercom has the authority base to do that faster than anyone else in the category.
            </p>
          </div>

          <div className="mt-6">
            <PhasedUpsideChart
              points={[
                { label: "Now", low: 92712, base: 92712, high: 92712 },
                { label: "M3", low: 145000, base: 210000, high: 295000 },
                { label: "M6", low: 245000, base: 388219, high: 560000 },
                { label: "M9", low: 420000, base: 680000, high: 1050000 },
                { label: "M12", low: 582130, base: 1049239, high: 1708699 },
              ]}
            />
          </div>

          <div className="mt-6">
            <TamRoiCalculator baseReachableVisits={1049239} />
          </div>

          <p className="mt-4 text-xs text-white/45 leading-relaxed">
            Estimate-only. Traffic projections based on validated keyword demand modeled across 12 months. Revenue planning requires Intercom's ACV and funnel conversion inputs.
          </p>
        </StrategySectionShell>

        {/* ═══════════════════════════════════════════════
            ACT 3 — THE PLAN
        ═══════════════════════════════════════════════ */}
        <StrategySectionShell>
          <SectionHeader
            number="03"
            title="The Plan"
            eyebrow="Act 3 — How we get there"
            subtitle="A 6-month execution system that builds Intercom's decision-stage presence, reinforces it with third-party authority, and compounds it into durable category ownership."
          />

          <div className="mb-8 max-w-4xl">
            <p className="text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
              Three moves. One system. Compounding results.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 md:text-base">
              Step 1: Build the decision-stage pages buyers and AI engines need. Step 2: Reinforce every page with off-site authority and review proof. Step 3: Expand supporting coverage so the same commercial story appears from every angle. Every month runs all three in parallel.
            </p>
          </div>

          {/* Month blocks */}
          <div className="space-y-6">
            <StrategyCard glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Month 1</div>
              <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">Set the foundation</h3>
              <div className="mt-5">
                <BulletList items={[
                  "Map priority buying queries across chatbot, messaging, CRM, and helpdesk categories",
                  "Publish first wave of decision pages: best AI chatbot platform, knowledge base software, CRM software comparisons",
                  "Set up review-platform profiles and begin off-site distribution for each published page",
                  "Establish technical baseline: schema, sitemaps, crawl eligibility, entity consistency",
                ]} />
              </div>
            </StrategyCard>

            <StrategyCard glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Month 2</div>
              <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">Expand and reinforce</h3>
              <div className="mt-5">
                <BulletList items={[
                  "Ship head-to-head comparison pages: Intercom vs Zendesk, vs Freshdesk, vs Drift, vs other category competitors",
                  "Publish pricing transparency and evaluation framework pages",
                  "Begin community and forum distribution: Reddit threads, expert commentary, industry newsletters",
                  "First round of editorial placements and high-authority backlinks to decision pages",
                ]} />
              </div>
            </StrategyCard>

            <StrategyCard glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Month 3</div>
              <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">Deepen coverage and prove results</h3>
              <div className="mt-5">
                <BulletList items={[
                  "Build supporting content network: use-case pages, buyer-context articles, industry-specific guides",
                  "Reinforce entity consistency across all owned and third-party surfaces",
                  "Run first prompt re-testing cycle to measure AI visibility movement",
                  "Publish first benchmark or original research asset where the category supports it",
                ]} />
              </div>
            </StrategyCard>

            <StrategyCard glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Months 4–6</div>
              <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">Compound and defend</h3>
              <div className="mt-5">
                <BulletList items={[
                  "Scale supporting content to cover the full buyer journey — education, awareness, and brand-adjacent demand",
                  "Widen off-site authority: more editorial placements, digital PR, listicle inclusion, review acquisition",
                  "Refresh data on decision pages to maintain freshness signals",
                  "Quarterly strategy review: reallocate effort toward highest-converting queries, patch weak prompts, expand into adjacent categories",
                ]} />
              </div>
            </StrategyCard>
          </div>

          {/* What Memetik builds */}
          <div className="mt-10 space-y-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
              What Memetik builds and ships
            </div>

            <StrategyCard>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
                  <Target className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Decision-stage pages</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">The content buyers and AI actually pull from</h3>
                  <div className="mt-4">
                    <BulletList items={[
                      "Best-for and category selection pages for every major buying query",
                      "Head-to-head comparison pages against named competitors",
                      "Pricing transparency and evaluation framework pages",
                      "Use-case guides, buyer guides, and product-form explainers",
                      "Benchmark reports and original research assets where the category supports them",
                    ]} />
                  </div>
                </div>
              </div>
            </StrategyCard>

            <StrategyCard>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
                  <Layers3 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Supporting content network</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">Retrieval density that compounds</h3>
                  <div className="mt-4">
                    <BulletList items={[
                      "Adjacent use-case and buyer-context pages that reinforce every decision page",
                      "Industry-specific and persona-specific guides that expand coverage",
                      "Internal linking architecture that routes authority toward commercial pages",
                      "Structured to help AI engines find the same recommendation from multiple angles",
                    ]} />
                  </div>
                </div>
              </div>
            </StrategyCard>

            <StrategyCard>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Off-site authority</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">Third-party proof that reinforces every claim</h3>
                  <div className="mt-4">
                    <BulletList items={[
                      "Review-platform profile setup and ongoing review acquisition",
                      "Reddit and community participation around buyer evaluation threads",
                      "Editorial placements and digital PR in industry publications",
                      "Comparison listicles and third-party publication placements",
                      "High-authority backlinks (DR70+) pointed at decision pages",
                      "LinkedIn and newsletter distribution for expert commentary",
                    ]} />
                  </div>
                </div>
              </div>
            </StrategyCard>

            <StrategyCard>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Technical foundation</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">Machine-readable, indexable, and consistent</h3>
                  <div className="mt-4">
                    <BulletList items={[
                      "Schema markup matched to visible content on every commercial page",
                      "Sitemap hygiene, crawl/index eligibility, and canonical setup",
                      "Bing Webmaster Tools, IndexNow, and entity consistency across surfaces",
                      "Author, about, and trust-surface consistency for brand entity clarity",
                    ]} />
                  </div>
                </div>
              </div>
            </StrategyCard>

            <StrategyCard>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Measurement and proof</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">Know exactly what is working</h3>
                  <div className="mt-4">
                    <BulletList items={[
                      "Baseline and recurring AI prompt testing across ChatGPT, Gemini, and Google AI Overviews",
                      "Citation tracking and recommendation monitoring across answer surfaces",
                      "Monthly reporting: visibility movement, authority proof, workstream completion",
                      "Quarterly strategy review with reallocation and competitive response updates",
                    ]} />
                  </div>
                </div>
              </div>
            </StrategyCard>

            <StrategyCard>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Refresh and defense</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">The work compounds — it does not decay</h3>
                  <div className="mt-4">
                    <BulletList items={[
                      "Monthly data refreshes on pricing and benchmark pages to maintain freshness signals",
                      "Quarterly decision-page reviews to keep content competitive and accurate",
                      "Competitor-response updates when rival content shifts",
                      "Ongoing supporting content expansion into adjacent categories and use cases",
                    ]} />
                  </div>
                </div>
              </div>
            </StrategyCard>
          </div>

          {/* Growth timeline */}
          <div className="mt-10">
            <GrowthTimelineChart
              points={[
                { month: 1, label: "M1", low: 95000, base: 110000, high: 135000, title: "Foundation set", detail: "First decision pages published. Technical baseline established. Review profiles live.", trafficLabel: "Base traffic", trafficValue: 110000 },
                { month: 2, label: "M2", low: 110000, base: 145000, high: 195000, title: "Comparison layer ships", detail: "Head-to-head comparisons, pricing pages, and first editorial placements live.", trafficLabel: "Base traffic", trafficValue: 145000 },
                { month: 3, label: "M3", low: 145000, base: 210000, high: 295000, title: "Supporting coverage deepens", detail: "Use-case pages, buyer-context content, entity reinforcement. First prompt re-test.", trafficLabel: "Base traffic", trafficValue: 210000 },
                { month: 4, label: "M4", low: 175000, base: 265000, high: 385000, title: "Compounding begins", detail: "Authority signals compound. Education and awareness content expands reach.", trafficLabel: "Base traffic", trafficValue: 265000 },
                { month: 5, label: "M5", low: 205000, base: 320000, high: 470000, title: "Distribution widens", detail: "Broader editorial placements, community distribution, review acquisition accelerates.", trafficLabel: "Base traffic", trafficValue: 320000 },
                { month: 6, label: "M6", low: 245000, base: 388219, high: 560000, title: "6-month milestone", detail: "Decision-stage presence established. Quarterly review reallocates toward highest-performing clusters.", trafficLabel: "Base traffic", trafficValue: 388219 },
                { month: 7, label: "M7", low: 290000, base: 460000, high: 670000, title: "Category coverage expands", detail: "Brand demand and broader category queries begin converting. Supporting content network matures.", trafficLabel: "Base traffic", trafficValue: 460000 },
                { month: 8, label: "M8", low: 340000, base: 540000, high: 790000, title: "Authority compounding", detail: "Link profile strengthens. AI citation frequency increases across platforms.", trafficLabel: "Base traffic", trafficValue: 540000 },
                { month: 9, label: "M9", low: 420000, base: 680000, high: 1050000, title: "Category brand demand activates", detail: "TOFU category terms start delivering meaningful volume as supporting layer matures.", trafficLabel: "Base traffic", trafficValue: 680000 },
                { month: 10, label: "M10", low: 470000, base: 790000, high: 1220000, title: "Defensive refresh cycle", detail: "Pricing refreshes, benchmark updates, competitor-response patches deployed.", trafficLabel: "Base traffic", trafficValue: 790000 },
                { month: 11, label: "M11", low: 520000, base: 910000, high: 1430000, title: "Market share compounds", detail: "Intercom appears consistently in AI recommendations for core buyer queries.", trafficLabel: "Base traffic", trafficValue: 910000 },
                { month: 12, label: "M12", low: 582130, base: 1049239, high: 1708699, title: "12-month target", detail: "Established category presence across search and AI surfaces. Ongoing defense and expansion continue.", trafficLabel: "Base traffic", trafficValue: 1049239 },
              ]}
              milestones={[
                { label: "M1", month: 1, title: "Foundation set", detail: "First decision pages, technical baseline, review profiles.", trafficLabel: "Base traffic", trafficValue: 110000 },
                { label: "M6", month: 6, title: "6-month milestone", detail: "Decision-stage presence established. Quarterly review reallocates toward highest-performing clusters.", trafficLabel: "Base traffic", trafficValue: 388219 },
                { label: "M12", month: 12, title: "12-month target", detail: "Category presence across search and AI surfaces. 1M+ base traffic.", trafficLabel: "Base traffic", trafficValue: 1049239 },
              ]}
            />
          </div>
        </StrategySectionShell>

        {/* ── FAILURE BLOCK ── */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[28px] border border-red-500/20 bg-red-500/[0.04] p-6 md:p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400/80">
              If Intercom does nothing
            </div>
            <h3 className="text-xl font-display font-semibold tracking-tight text-red-300 md:text-2xl">
              The gap widens every month
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              {[
                "Zendesk and Freshworks continue building the content layer AI pulls from — locking Intercom out of buyer shortlists before sales gets involved.",
                "AI answer surfaces consolidate around the brands that publish decision-stage content first. Once a competitor becomes the default recommendation, displacing them takes 3–4× the effort.",
                "Every month without buyer-guide coverage means deals closing with competitors that Intercom's sales team never knew existed.",
                "The 41,714 referring domains Intercom has built become a wasted asset — authority without commercial content to point it at.",
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
              Intercom becomes the default answer
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              {[
                "When a VP of Support asks ChatGPT or Gemini 'best AI chatbot platform for enterprise,' Intercom is the first name in the answer — with citations to owned comparison and evaluation pages.",
                "Over 1 million monthly organic visits from buyer-intent queries, driving pipeline that did not exist 12 months earlier.",
                "A defensible content moat: hundreds of decision pages, supporting content, and third-party proof that competitors would need years to replicate.",
                "Sales conversations start with prospects who already believe Intercom is the category leader — because that is what every AI surface told them.",
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
          eyebrow="Next step"
          title="Make Intercom the answer"
          body="The data, the gap, and the plan are here. The only question is whether Intercom moves before the category locks around someone else. Memetik builds the full system — decision pages, off-site authority, technical infrastructure, and ongoing defense — so you become the default recommendation, not just another option."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        {/* ── APPENDIX ── */}
        <StrategySectionShell>
          <SectionHeader
            number="A"
            title="Supporting Evidence"
            eyebrow="Appendix"
            subtitle="Detailed data behind the strategy — competitor benchmarks, keyword clusters, and prompt evidence."
          />

          <div className="space-y-6">
            <StrategyAppendixSection
              title="Competitor landscape"
              description="Organic search and authority comparison across key competitors."
            >
              <DataTable
                headers={["Competitor", "Organic Traffic", "Organic Keywords", "Referring Domains", "Backlinks"]}
                rows={[
                  ["intercom.com", "92,712", "23,934", "41,714", "1,000,630"],
                  ["zendesk.com", "5,620,214", "818,002", "329,335", "773,781,522"],
                  ["freshworks.com", "—", "—", "—", "—"],
                  ["crisp.chat", "56,803", "6,598", "9,371", "2,669,235"],
                  ["kustomer.com", "17,515", "2,642", "3,098", "17,971"],
                ]}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Opportunity clusters"
              description="Validated search demand grouped by buyer intent and deployment phase."
            >
              <DataTable
                headers={["Cluster", "Intent", "Phase", "Monthly Demand", "12m Traffic (Base)", "Sample Keywords"]}
                rows={[
                  ["Buyer Guides", "BOFU", "Months 0–3", "3,728,610", "410,079", "ai chatbot platform, knowledge base software, CRM software"],
                  ["Pricing & Cost", "BOFU", "Months 0–3", "14,080", "1,549", "intercom pricing, intercom cost"],
                  ["Education & Awareness", "MOFU", "Months 4–8", "786,950", "27,189", "what is CRM, what is RCS messaging"],
                  ["Category & Brand Demand", "TOFU", "Months 9–12", "30,246,420", "609,901", "ai chatbot, helpdesk solution, messaging"],
                ]}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="AI prompt evidence"
              description="Sampled prompts tested across ChatGPT and Gemini. Intercom appeared in 1 of 16 prompts tested."
            >
              <DataTable
                headers={["Prompt", "Platform", "Market", "Intercom Mentioned?", "Who Was Recommended"]}
                rows={[
                  ["best messaging tools", "ChatGPT", "US", "Tangentially", "WhatsApp, Telegram, Signal, Slack, Microsoft Teams"],
                  ["best messaging", "ChatGPT", "US", "No", "Asked for clarification — no brands recommended"],
                  ["best messaging", "ChatGPT", "AU", "No", "WhatsApp, Signal, Telegram (consumer tools only)"],
                  ["best messaging", "Gemini", "US", "No", "Signal, WhatsApp, Telegram, iMessage, Discord"],
                  ["best messaging", "Gemini", "AU", "No", "Signal, WhatsApp, Telegram (consumer tools only)"],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Keyword attribution breakdown"
              description="How the 34.8M search opportunity splits between competitor-branded and unbranded demand."
            >
              <DataTable
                headers={["Segment", "Demand", "Share", "12m Traffic (Base)", "6m Target (Base)"]}
                rows={[
                  ["Competitor-branded queries", "3,351,380", "9.6%", "67,028", "24,800"],
                  ["Non-competitor / unbranded queries", "31,435,270", "90.4%", "982,212", "363,418"],
                  [<span className="font-semibold text-white">Total</span>, <span className="font-semibold text-white">34,786,650</span>, <span className="font-semibold text-white">100%</span>, <span className="font-semibold text-white">1,049,239</span>, <span className="font-semibold text-white">388,219</span>],
                ]}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Assumptions and methodology"
              description="How traffic projections and opportunity sizing were calculated."
            >
              <BulletList items={[
                "Traffic estimates are modeled from validated keyword demand using standard click-through-rate curves. Estimate-only — not a guarantee.",
                "AI visibility was tested across 16 prompts on ChatGPT (GPT-5-3) and Gemini. Perplexity probe data was unavailable due to API limitations.",
                "Competitor data sourced from third-party SEO tools; rankings and traffic are directional estimates.",
                "Revenue planning requires Intercom's actual ACV/AOV and funnel conversion data — not modeled here.",
                "90.4% of the opportunity comes from unbranded queries — these are the queries where content investment has the highest leverage.",
              ]} />
            </StrategyAppendixSection>
          </div>
        </StrategySectionShell>
      </div>
    </StrategyPageFrame>
  );
}