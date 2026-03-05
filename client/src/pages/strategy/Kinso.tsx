import { useEffect } from "react";
import {
  Globe,
  AlertTriangle,
  CheckCircle,
  Target,
  Database,
  Share2,
  RotateCw,
  Zap,
  ArrowRight,
  Search,
  Bot,
  BarChart3,
  Gauge,
  Shield,
  Link2,
  FileText,
  TrendingUp,
  Compass,
  Brain,
  Building2,
  Clock3,
  Layers,
  Sparkles,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { SectionHeader, HighlightBox, PhaseBlock, BulletList, DataTable, StatsGrid } from "@/components/strategy";

const heroTags = ["kinso.ai", "Communication / Collaboration", "Unified AI Inbox", "US + AU"];

const whatIsStrong = [
  "Clear category narrative on homepage: unified inbox + AI assistant for business messages.",
  "Homepage messaging already uses high-intent language patterns buyers use (unified inbox, prioritisation, draft replies).",
  "Fast technical interaction signals from crawl payload (Time to Interactive ~713ms, estimate-only from DataForSEO timing).",
  "Brand query capture already established: 'kinso' and 'kinso ai' rank #1 in US/AU.",
  "Strict research quality gate passed (competitors, keywords, prompts, on-page audit, TAM model all present).",
];

const whatIsMissing = [
  "Only 24 ranking keywords in US+AU combined — category coverage is still extremely thin.",
  "Most non-brand category terms rank outside page 1 (e.g., 'ai inbox' position ~105, 'unified messaging app' ~100, estimate-only).",
  "No schema types detected on audited page (Organization / FAQ / Product / SoftwareApplication / Review all missing).",
  "Backlinks and referring domains are unavailable in current payload (cannot validate authority baseline yet).",
  "AI visibility is weak in decision prompts: Kinso mentioned in only 2 of 8 prompts tested on ChatGPT.",
  "Prompt responses show category confusion around 'Kinso' entity (AI asks for clarification rather than confidently recommending the product).",
  "No paid search coverage (0 paid traffic, 0 paid keywords in provided markets), limiting demand learning loops.",
];

const currentStateStats = [
  { label: "Organic Traffic (US+AU)", value: "556.8/mo (est.)", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Ranking Keywords", value: "24 total", icon: <Search className="w-4 h-4" /> },
  { label: "AI Prompts Mentioned", value: "2 / 8", icon: <Bot className="w-4 h-4" /> },
  { label: "Research Payload Confidence", value: "87 / High", icon: <Shield className="w-4 h-4" /> },
];

const competitorRows = [
  [
    <span className="font-mono text-xs text-foreground">kinso.ai</span>,
    "Target",
    "556.8/mo (est.)",
    "24",
    "US + AU",
    "2/8 prompts mentioned",
    "Current baseline; category underrepresentation outside branded demand",
  ],
  [
    <span className="font-mono text-xs text-foreground">missiveapp.com</span>,
    "Product competitor discovery",
    "166,300.3/mo (est.)",
    "10,931",
    "US + AU",
    "Observed in unified inbox query set",
    "Large long-tail footprint + collaborative inbox positioning",
  ],
  [
    <span className="font-mono text-xs text-foreground">front.com</span>,
    "Seeded competitor",
    "86,294.8/mo (est.)",
    "12,224",
    "US + AU",
    "Frequently recommended in prompts",
    "Strong category education + team inbox narrative",
  ],
  [
    <span className="font-mono text-xs text-foreground">intercom.com</span>,
    "Seeded competitor",
    "91,288.7/mo (est.)",
    "26,720",
    "US + AU",
    "Frequently recommended in prompts",
    "Deep content library + broad support/communication category authority",
  ],
  [
    <span className="font-mono text-xs text-foreground">zendesk.com</span>,
    "Seeded competitor",
    "5,515,761.7/mo (est.)",
    "846,083",
    "US + AU",
    "Enterprise default mention pattern",
    "Massive domain authority and category-wide informational moat",
  ],
  [
    <span className="font-mono text-xs text-foreground">helpscout.com</span>,
    "Seeded competitor",
    "170,959.5/mo (est.)",
    "24,924",
    "US + AU",
    "Cited in related buyer journeys",
    "Strong help desk education content + comparison coverage",
  ],
  [
    <span className="font-mono text-xs text-foreground">hiverhq.com</span>,
    "Seeded competitor",
    "282,533.6/mo (est.)",
    "26,665",
    "US + AU",
    "Competes on Gmail/shared inbox intent",
    "Heavy query capture around shared inbox and support ops",
  ],
  [
    <span className="font-mono text-xs text-foreground">crisp.chat</span>,
    "Product competitor discovery",
    "57,022.5/mo (est.)",
    "7,580",
    "US + AU",
    "Best rank #1 in discovery prompts",
    "Consistent appearance in unified inbox alternatives/comparison prompts",
  ],
];

const aiPromptRows = [
  ["best unified ai inbox tools", "ChatGPT", "No", "Front appears in preview; Kinso absent"],
  ["best unified ai inbox software", "ChatGPT", "No", "Superhuman + Front in preview; Kinso absent"],
  ["Kinso alternatives", "ChatGPT", "Yes", "Mentioned but ambiguous category context"],
  ["Kinso vs competitors", "ChatGPT", "Yes", "Mentioned only after clarification request"],
  ["best unified ai inbox for startups", "ChatGPT", "No", "Front listed in preview; Kinso absent"],
  ["best unified ai inbox for enterprise", "ChatGPT", "No", "Front listed in preview; Kinso absent"],
  ["how to choose unified ai inbox platform", "ChatGPT", "No", "General framework answer; no Kinso inclusion"],
  ["unified ai inbox comparison", "ChatGPT", "No", "Superhuman-focused preview; Kinso absent"],
];

const keywordPriorityRows = [
  ["all inboxes gmail", "90", "US", "Low", "60", "Existing keyword gap; near-term optimization candidate"],
  ["unified messaging app", "90", "US", "Low", "100", "Commercial-intent category term; high strategic value"],
  ["gmail all inboxes", "90", "US", "Low", "105", "Similar intent cluster; can be consolidated via hub page"],
  ["gmail automatic labels", "70", "AU", "Low", "80", "Workflow-focused query suitable for feature-led content"],
  ["ai inbox", "40", "US", "Medium", "105", "Core category term with high CPC signal (est. CPC 40.44)"],
  ["unified inbox email", "40", "US", "Medium", "40", "Mid-funnel term with direct product-fit intent"],
  ["multiple inboxes gmail", "40", "AU", "Low", "110", "Localized Gmail workflow intent; low competition"],
  ["unified inbox app", "30", "US", "Low", "29", "Closest non-brand opportunity currently within striking range"],
  ["ai for messages", "30", "US", "High", "41", "Broad AI messaging term; requires stronger intent framing"],
  ["slack sort by priority", "30", "US", "Low", "91", "Feature-led use-case entry point for workflow content"],
];

const platformTactics = [
  {
    platform: "ChatGPT (Search)",
    source: "Bing index + web sources",
    tactic:
      "Set up Bing Webmaster Tools + IndexNow + exact-match BOFU assets ('best unified ai inbox software', 'unified ai inbox comparison') to improve citation eligibility.",
  },
  {
    platform: "Perplexity",
    source: "Reddit-heavy citation behavior + web crawl",
    tactic:
      "Launch founder-led Reddit participation in r/SaaS, r/Productivity, r/startups with transparent workflows and linked benchmark content.",
  },
  {
    platform: "Claude",
    source: "Brave/web crawl patterns",
    tactic:
      "Ensure all core pages are crawlable, semantically complete, and interlinked with explicit entity statements (what Kinso is, for whom, and why now).",
  },
  {
    platform: "Google AI Overviews",
    source: "Top-10 organic dependency",
    tactic:
      "Prioritize page-1 SEO capture on 8 identified keyword gaps; AIO inclusion is unlikely until top-10 organic presence is achieved.",
  },
  {
    platform: "Gemini",
    source: "Google Search + entity signals",
    tactic:
      "Expand structured data and consistency across About, Product, Use Cases, and external profiles to strengthen Knowledge Graph understanding.",
  },
];

const section07Stats = [
  { label: "Total Addressable Search Demand", value: "4,180", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Reachable Visits (Base, est.)", value: "60.19", icon: <Compass className="w-4 h-4" /> },
  { label: "Google Share of Demand", value: "86%", icon: <Search className="w-4 h-4" /> },
  { label: "AI Share of Demand", value: "14%", icon: <Bot className="w-4 h-4" /> },
];

const phasedUpsideRows = [
  ["Phase 1 (Months 0-3)", "BOFU", "350", "6", "8.43", "14.05", "22.49", "Estimate-only model output"],
  ["Phase 2 (Months 4-8)", "MOFU", "0", "0", "0", "0", "0", "No modeled MOFU demand in current payload; expand seed set"],
  ["Phase 3 (Months 9-12)", "TOFU", "3,830", "16", "23.07", "46.14", "76.9", "Estimate-only model output"],
];

const assumptionRows = [
  ["Formula", "ReachableDemand = SearchVolume × VisibilityCaptureRate × ChannelSplit × ChannelClickThrough", "Model-level assumption (estimate-only)"],
  ["Channel Split", "Google 0.86 / AI 0.14", "Applied globally across US+AU in current TAM payload"],
  ["Channel CTR", "Google 0.464 / AI 0.018", "Model assumption, not first-party click data"],
  ["Capture Rates (BOFU)", "Low 0.06 / Base 0.10 / High 0.16", "Estimate-only scenario assumptions"],
  ["Capture Rates (MOFU)", "Low 0.03 / Base 0.06 / High 0.10", "Estimate-only scenario assumptions"],
  ["Capture Rates (TOFU)", "Low 0.015 / Base 0.03 / High 0.05", "Estimate-only scenario assumptions"],
  ["Market Scope", "US + AU only", "Additional markets not included in current payload"],
  ["Revenue Model", "Disabled", "Revenue modeling requires client ACV/AOV and funnel inputs."],
];

export default function StrategyKinso() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Kinso — AEO & SEO Strategy | MEMETIK";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
      <Nav />

      <main className="pt-24 pb-32 px-4 md:px-12 container mx-auto max-w-5xl">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold tracking-wider uppercase mb-6">
            <Globe className="w-3 h-3" />
            Strategy Document /// March 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tighter mb-6 leading-[0.95]">
            KINSO <br />
            <span className="text-primary">AEO & SEO STRATEGY.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mt-6 mb-4">
            Position Kinso as the default recommendation for unified AI inbox workflows across Google, ChatGPT, and
            buyer-led “comparison + alternatives + best-for” prompts in US and AU.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {heroTags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary/10 border border-border text-sm font-mono text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="00" title="STATE OF SEARCH 2026" />

          <HighlightBox className="mb-8">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              In 2026, being <span className="text-primary">discoverable</span> is not enough. The winners are the
              brands that get <span className="text-primary">named directly</span> in AI answers before the click ever
              happens.
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-secondary/5 border border-border">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                AI discovery is now shortlist formation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Buyers ask “best unified inbox”, “alternatives”, and “for startups vs enterprise” in AI tools before
                they visit sites. If Kinso is absent there, high-intent demand is lost upstream and never appears in
                normal analytics attribution.
              </p>
            </div>

            <div className="p-6 bg-secondary/5 border border-border">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                SEO and AEO are now one operating system
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Google rankings still matter because AI Overviews and model retrieval rely heavily on top organic
                documents. But ranking alone is insufficient: entity clarity, schema, and external citations now
                determine answer-engine trust.
              </p>
            </div>
          </div>

          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              Kinso’s market context: high product relevance, low retrieval visibility.
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Kinso’s product narrative maps tightly to a real demand category (“unified inbox”, “AI assistant for
                business messages”). That is strategically strong. But current search coverage is primarily branded and
                fragmented. Category-level discoverability is thin, and AI prompt testing shows inconsistent entity
                recognition.
              </p>
              <p>
                The opportunity is not theoretical. Prompt outputs already recommend adjacent tools (Front, Superhuman,
                others) while Kinso is often omitted. This is exactly the kind of visibility gap that can be closed
                with a focused money-entity strategy plus platform-specific distribution.
              </p>
              <p>
                Bottom line: Kinso has product-market narrative fit for this category, but not yet content-market fit
                for AI retrieval and commercial search capture.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="01" title="CURRENT STATE SNAPSHOT" />

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Confidence note: research payload confidence is <strong className="text-foreground">87 (High)</strong>.
            TAM model confidence is <strong className="text-foreground">65 (Medium)</strong>. All forecasts are{" "}
            <strong className="text-foreground">estimate-only</strong>.
          </p>

          <StatsGrid stats={currentStateStats} />

          <div className="bg-secondary/5 border border-border p-6 md:p-8 my-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What’s Strong</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {whatIsStrong.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <HighlightBox className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What’s Missing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {whatIsMissing.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </HighlightBox>

          <DataTable
            headers={["Market", "Organic Traffic (est.)", "Organic Keywords", "Paid Traffic", "Paid Keywords", "Notes"]}
            rows={[
              ["US", "95.47/mo", "16", "0", "0", "Higher category competition; most strategic upside is non-brand ranking lift"],
              ["AU", "461.31/mo", "8", "0", "0", "Current traffic appears brand-skewed; requires intent expansion"],
              [
                "Global in payload",
                "556.77/mo",
                "24",
                "0",
                "0",
                "Estimate-only from research payload; backlinks/referring domains unavailable",
              ],
            ]}
            className="mb-6"
          />

          <p className="text-xs text-muted-foreground">
            Data unavailable in current payload: backlinks and referring domains for Kinso and competitors. Next action:
            run Ahrefs/Semrush backlink pull + Bing link profile export in week 1.
          </p>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="02" title="DATA-BACKED COMPETITIVE LANDSCAPE" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Every row below is grounded in provided research data (source: seeded competitor list + product competitor
            discovery). Traffic and keyword values are estimate-only third-party metrics, not first-party analytics.
          </p>

          <DataTable
            headers={[
              "Domain",
              "Source",
              "Organic Traffic (est.)",
              "Organic Keywords",
              "Markets",
              "AI / Prompt Evidence",
              "Interpretation",
            ]}
            rows={competitorRows}
            highlightRow={0}
            className="mb-8"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-secondary/5 border border-border">
              <h3 className="text-foreground font-bold mb-2">Strategic finding #1</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kinso is competing in a category where dominant players have{" "}
                <strong className="text-foreground">four to five orders of magnitude</strong> more query coverage than
                Kinso’s current 24-keyword footprint.
              </p>
            </div>

            <div className="p-6 bg-secondary/5 border border-border">
              <h3 className="text-foreground font-bold mb-2">Strategic finding #2</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prompt-level discovery competitors (especially Crisp and Missive) are appearing on “unified inbox”
                intents, which indicates category framing and document structure currently outperform Kinso in AI
                retrieval surfaces.
              </p>
            </div>
          </div>

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">Competitive Reality</h3>
            <p className="text-lg md:text-2xl font-display font-bold text-foreground leading-tight">
              This is not a “small tweak” problem. It’s a{" "}
              <span className="text-primary">coverage + entity clarity + authority signal</span> gap.
            </p>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Kinso does not need to match Zendesk-scale volume. It needs to lock specific high-intent entity clusters
              where incumbents are broad and generic, then compound via structured long-tail expansion and distribution.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="03" title="AI VISIBILITY GAP (PROMPT-LEVEL)" />

          <div className="bg-secondary/5 border border-border p-6 md:p-8 mb-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              Kinso appears in 2 of 8 prompts, and both mentions are ambiguous.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              In commercial prompts like “best unified ai inbox software,” Kinso is not present in the surfaced answer
              previews. In brand prompts, the model often asks clarifying questions about what Kinso is, which signals
              weak entity confidence.
            </p>
            <p className="text-xs text-muted-foreground">
              Data note: DataForSEO LLM mentions endpoint returned 404 in this payload. Prompt-level analysis below is
              based on direct prompt results included in research data.
            </p>
          </div>

          <DataTable
            headers={["Query", "Platform", "Kinso Mentioned", "Observed Result Pattern"]}
            rows={aiPromptRows}
            className="mb-8"
          />

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 bg-secondary/5 border border-border text-center">
              <div className="text-2xl font-display font-bold text-foreground">8</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">Prompts Analyzed</div>
            </div>
            <div className="p-5 bg-secondary/5 border border-border text-center">
              <div className="text-2xl font-display font-bold text-foreground">2</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">Prompts Mentioning Kinso</div>
            </div>
            <div className="p-5 bg-secondary/5 border border-border text-center">
              <div className="text-2xl font-display font-bold text-primary">25%</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">Prompt Mention Rate (est.)</div>
            </div>
          </div>

          <HighlightBox>
            <div className="flex gap-4 items-start">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="text-sm">
                <strong className="text-foreground block mb-1">Primary AEO objective for Kinso</strong>
                <span className="text-muted-foreground">
                  Move from “ambiguous mention” to “confident recommendation” by publishing money pages that answer
                  buyer prompts directly, then reinforcing those pages through external trust nodes and platform-specific
                  indexing workflows.
                </span>
              </div>
            </div>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="04" title="KEYWORD OPPORTUNITY MAP" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Priority query set below is grounded in rankedKeywords + keywordGaps from the payload. These are the terms
            where Kinso has existing relevance signals but insufficient rankings. Volumes and ranking positions are
            estimate-only third-party metrics.
          </p>

          <DataTable
            headers={["Keyword", "Monthly Volume", "Market", "Competition", "Current Position", "Opportunity Notes"]}
            rows={keywordPriorityRows}
            className="mb-8"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-secondary/5 border border-border">
              <h4 className="text-foreground font-bold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Near-term wins (first 90 days)
              </h4>
              <BulletList
                items={[
                  "unified inbox app (position ~29) — optimize to top 15 with intent-matched page + FAQ schema",
                  "unified inbox email (position ~40) — publish dedicated comparison-style landing page",
                  "all inboxes gmail / gmail all inboxes — build Gmail workflow hub with clear product mapping",
                  "ai for messages (position ~41) — strengthen semantic relevance via use-case cluster content",
                ]}
              />
            </div>

            <div className="p-6 bg-secondary/5 border border-border">
              <h4 className="text-foreground font-bold mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Strategic terms to own long-term
              </h4>
              <BulletList
                items={[
                  "ai inbox (core category phrase, high CPC signal indicates strong buyer value)",
                  "unified messaging app (category-defining language with low reported competition)",
                  "best unified ai inbox for startups / enterprise (money-entity prompt targets)",
                  "unified ai inbox alternatives / comparison (shortlist-creation intent)",
                ]}
              />
            </div>
          </div>

          <HighlightBox>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Important nuance: current TAM payload shows MOFU demand at zero in the modeled set. This likely reflects
              limited seed keyword coverage, not real-world absence of MOFU demand. Next action is to expand seed sets
              using sales calls, support transcripts, and competitor money pages before quarter-end recalibration.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="05" title='STRATEGY: CATEGORY LOCK FOR "UNIFIED AI INBOX"' />

          <HighlightBox className="mb-12">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Build Kinso into the most citable answer for unified inbox workflows by combining{" "}
              <span className="text-primary">money-entity pages</span>,{" "}
              <span className="text-primary">retrieval-density content</span>, and{" "}
              <span className="text-primary">cross-platform trust signals</span>.
            </p>
          </HighlightBox>

          <div className="space-y-8">
            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-foreground font-bold mb-4 text-lg flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                Content Architecture (12-month target state)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-mono text-primary mb-3 uppercase tracking-wider">Tier 1 — Apex / BOFU</h4>
                  <BulletList
                    items={[
                      "Best Unified AI Inbox Software (2026): Criteria + Ranked Comparison",
                      "Kinso vs Front",
                      "Kinso vs Missive",
                      "Kinso vs Superhuman",
                      "Kinso Alternatives (fair comparison + fit matrix)",
                      "Unified AI Inbox for Startups",
                      "Unified AI Inbox for Enterprise Teams",
                      "Unified Inbox Email: Buyer’s Guide",
                    ]}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-primary mb-3 uppercase tracking-wider">
                    Tier 2 — Knowledge Graph / TOFU
                  </h4>
                  <BulletList
                    items={[
                      "How to manage multiple inboxes in Gmail",
                      "How to auto-prioritize Slack + email threads",
                      "How to set automatic labels with AI for support teams",
                      "How to triage customer messages across channels",
                      "Unified inbox workflows for founders, ops leads, and support managers",
                      "Use-case pages by team type (Sales, Support, Founder Office, Operations)",
                      "Geo variants for US and AU language intent differences",
                      "FAQ cluster pages mapped to top prompt patterns",
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-foreground font-bold mb-4 text-lg flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                Platform-Specific AEO Tactics
              </h3>
              <DataTable
                headers={["Platform", "Primary Data Source", "Kinso Tactic"]}
                rows={platformTactics.map((t) => [t.platform, t.source, t.tactic])}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-foreground font-bold mb-4 text-lg flex items-center gap-2">
                <Link2 className="w-4 h-4 text-primary" />
                Authority + Distribution Plan
              </h3>
              <BulletList
                items={[
                  "Each Apex page triggers 5–10 derivative placements within 14 days (LinkedIn, Medium, Reddit, partner blogs).",
                  "Create consistent entity signatures across site, social, product listings, and founder bios.",
                  "Launch third-party comparison contributions where editorially appropriate; keep claims evidence-backed.",
                  "Publish benchmark-style mini datasets from product usage patterns (response time reduction, triage speed, etc., only with verifiable data).",
                  "Create and maintain profiles on relevant review/discovery surfaces (platform selection depends on Kinso’s ICP and category fit).",
                  "Set up Bing Webmaster Tools + IndexNow in month 1 to improve ChatGPT retrieval speed.",
                ]}
              />
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="06" title="EXECUTION PROTOCOL" />

          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">
            <PhaseBlock number="01" icon={<Target className="w-4 h-4" />} label="Phase 1 — Month 0-1" title="Foundation + Entity Clarity">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary" />
                    Technical & Indexing Setup
                  </h4>
                  <BulletList
                    items={[
                      "Implement Organization + SoftwareApplication + FAQPage schema on core pages.",
                      "Add structured FAQ blocks answering top buyer prompts in first 40–60 words.",
                      "Register Bing Webmaster Tools + submit sitemap + enable IndexNow.",
                      "Validate crawlability and indexation of every commercial page variant.",
                      "Publish robots.txt and sitemap controls for future content scale.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Money-Entity Asset Sprint (first 6 pages)
                  </h4>
                  <BulletList
                    items={[
                      "best unified ai inbox software",
                      "unified ai inbox alternatives",
                      "unified ai inbox comparison",
                      "unified inbox app",
                      "unified inbox email",
                      "ai inbox",
                    ]}
                  />
                </div>

                <div className="p-4 border border-border bg-secondary/5">
                  <p className="text-xs text-muted-foreground">
                    Delivery standard: every page must include direct answer block, comparison table, fit criteria, FAQ
                    schema, and single next-step CTA.
                  </p>
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="02" icon={<Database className="w-4 h-4" />} label="Phase 2 — Month 2-4" title="Coverage Expansion + Internal Graph">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4 text-primary" />
                    Query Cluster Buildout
                  </h4>
                  <BulletList
                    items={[
                      "Expand from 24 ranking keywords to 120+ by publishing workflow and feature clusters.",
                      "Build Gmail cluster: all inboxes gmail / gmail all inboxes / multiple inboxes gmail / automatic labels.",
                      "Build team cluster: startup vs enterprise use cases, support team workflows, ops inbox automation.",
                      "Build competitor cluster: Kinso vs Front, Kinso vs Missive, Kinso vs Crisp, Kinso vs shared inbox tools.",
                      "Add intent-safe canonical strategy to prevent cannibalization across near-duplicate terms.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <RotateCw className="w-4 h-4 text-primary" />
                    Refresh Loop
                  </h4>
                  <BulletList
                    items={[
                      "Bi-weekly prompt testing across ChatGPT + Perplexity + Gemini for top 20 entities.",
                      "Refresh underperforming pages with tighter direct answers and updated comparison criteria.",
                      "Iterate titles/H1 for exact-match Bing sensitivity where appropriate.",
                      "Instrument internal links so every TOFU page routes to 1–2 BOFU assets.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="03" icon={<Share2 className="w-4 h-4" />} label="Phase 3 — Month 5-8" title="Authority Relay + Multi-Surface Ownership">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    External Trust Signals
                  </h4>
                  <BulletList
                    items={[
                      "Distribute each Apex asset into LinkedIn article, founder post, and one community-native version.",
                      "Seed transparent workflow content in relevant forums (no astroturfing, no disguised promotion).",
                      "Pursue editorial mentions in productivity/collaboration publications.",
                      "Maintain consistent brand descriptors across all external references to reduce entity ambiguity.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI Mention Defense
                  </h4>
                  <BulletList
                    items={[
                      "Track mention frequency on top decision prompts weekly.",
                      "If a competitor displaces Kinso on a prompt, run rapid recovery: update page + publish 3 external mentions in 14 days.",
                      "Maintain revision log for all high-intent assets to preserve freshness and model trust.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="04" icon={<Clock3 className="w-4 h-4" />} label="Phase 4 — Month 9-12" title="Lock, Defend, and Scale">
              <div className="space-y-8">
                <BulletList
                  items={[
                    "Quarterly recalibration of entity map using prompt + SERP data.",
                    "Double down on winning clusters with adjacent use-case permutations.",
                    "Expand to additional markets only after US+AU query control is stable.",
                    "Document repeatable content playbooks for internal team scale.",
                  ]}
                />
                <div className="p-4 border border-border bg-secondary/5">
                  <p className="text-xs text-muted-foreground">
                    Control metric for end of month 12: Kinso should be consistently cited in core category prompts and
                    rank on page 1 for defined BOFU cluster terms (estimate-only target framework).
                  </p>
                </div>
              </div>
            </PhaseBlock>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="07" title="TOTAL ADDRESSABLE SEARCH MARKET (12 MONTHS)" />

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            This TAM model is explicitly <strong className="text-foreground">estimate-only</strong>. It is not
            analytics-reported traffic. Scope includes US + AU only and uses the provided formula-based methodology.
          </p>

          <StatsGrid stats={section07Stats} />

          <DataTable
            headers={["Model Component", "Value", "Notes"]}
            rows={[
              ["Timeframe", "12 months", "Selected horizon from tamModel"],
              ["Total Addressable Search Demand", "4,180", "US+AU combined demand in payload"],
              ["Estimated Reachable Visits (Low/Base/High)", "31.5 / 60.19 / 99.39", "Estimate-only modeled visits"],
              ["Google Demand", "3,594.8", "86% channel split assumption"],
              ["AI Demand", "585.2", "14% channel split assumption"],
              ["Google Reachable Visits (L/B/H)", "31.3 / 59.82 / 98.76", "Estimate-only modeled output"],
              ["AI Reachable Visits (L/B/H)", "0.2 / 0.38 / 0.62", "Estimate-only modeled output"],
            ]}
            className="my-8"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-secondary/5 border border-border">
              <h4 className="text-foreground font-bold mb-3">Top Opportunity Cluster #1</h4>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                <strong className="text-foreground">Category & Brand Demand</strong> (TOFU, Phase 3): demand 3,830
                across 16 keywords, with estimate-only reachable visits of 23.07 (low), 46.14 (base), 76.9 (high).
              </p>
              <p className="text-xs text-muted-foreground">
                Sample terms from payload: kinso, ai kin, kinso ai, kimso, so ai, kenso.
              </p>
            </div>

            <div className="p-6 bg-secondary/5 border border-border">
              <h4 className="text-foreground font-bold mb-3">Top Opportunity Cluster #2</h4>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                <strong className="text-foreground">Buyer Guides</strong> (BOFU, Phase 1): demand 350 across 6
                keywords, with estimate-only reachable visits of 8.43 (low), 14.05 (base), 22.49 (high).
              </p>
              <p className="text-xs text-muted-foreground">
                Sample terms from payload: unified messaging app, ai inbox, unified inbox email, unified inbox app.
              </p>
            </div>
          </div>

          <HighlightBox>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Revenue modeling requires client ACV/AOV and funnel inputs. Current model provides TAM + pipeline
              potential only. Existing estimate-only pipeline potential from payload: leads low 0.13, base 0.54, high
              1.49 over 12 months.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="08" title="PHASED UPSIDE (12 MONTHS)" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Upside scenarios below are estimate-only projections from the TAM model and should be treated as planning
            ranges, not guaranteed outcomes.
          </p>

          <DataTable
            headers={[
              "Phase",
              "Intent",
              "Demand",
              "Keyword Count",
              "Low Visits (est.)",
              "Base Visits (est.)",
              "High Visits (est.)",
              "Notes",
            ]}
            rows={phasedUpsideRows}
            className="mb-8"
          />

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-secondary/5 border border-border">
              <h4 className="font-bold text-foreground mb-2">Phase 1 Focus</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Capture BOFU terms where Kinso already has weak but existing relevance. Goal is to move “position
                29–105” terms into page-1 contention through direct-answer assets and schema.
              </p>
            </div>
            <div className="p-6 bg-secondary/5 border border-border">
              <h4 className="font-bold text-foreground mb-2">Phase 2 Focus</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Model currently reports zero MOFU demand in seed set. Execution goal is to create this layer by
                expanding query mapping and introducing comparison/use-case entities.
              </p>
            </div>
            <div className="p-6 bg-secondary/5 border border-border">
              <h4 className="font-bold text-foreground mb-2">Phase 3 Focus</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Scale TOFU retrieval density and brand-category association so AI engines stop asking “what is Kinso?”
                and start treating Kinso as a known option.
              </p>
            </div>
          </div>

          <HighlightBox>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                With current payload data, the largest modeled upside is not from raw volume expansion alone, but from
                fixing retrieval confidence around Kinso’s entity in commercial prompts. This is an answer-quality and
                distribution problem as much as a keyword problem.
              </p>
            </div>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="09" title="ASSUMPTIONS & CONFIDENCE" />

          <DataTable headers={["Assumption Area", "Current Value", "Confidence Note"]} rows={assumptionRows} className="mb-8" />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-secondary/5 border border-border">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Confidence summary
              </h3>
              <BulletList
                items={[
                  "Research payload confidence: 87 (High).",
                  "TAM confidence: 65 (Medium).",
                  "AI prompt sample is directional (8 prompts), useful for prioritization but not exhaustive.",
                  "Backlink/referring domain gaps reduce authority certainty.",
                  "All projection numbers are estimate-only and must be validated against first-party data.",
                ]}
              />
            </div>

            <div className="p-6 bg-secondary/5 border border-border">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-primary" />
                Methodological limitations
              </h3>
              <BulletList
                items={[
                  "US and AU only in current model.",
                  "No ACV/AOV included; revenue not modeled.",
                  "LLM mentions API returned not found in this run; compensated with prompt-result analysis.",
                  "MOFU query set underdeveloped in current seed terms.",
                  "Category scope overlaps with support inbox and productivity inbox segments, requiring tighter ICP segmentation.",
                ]}
              />
            </div>
          </div>

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">Required Data to Improve Model Quality</h3>
            <BulletList
              items={[
                "First-party funnel metrics: visitor → trial/signup → activation → pipeline.",
                "Average contract value (or AOV) by segment for revenue scenario modeling.",
                "Sales call transcripts to mine real buyer language and high-intent objections.",
                "Backlink and referring-domain baseline from Ahrefs/Semrush/Majestic.",
                "Per-platform prompt benchmarking across ChatGPT, Perplexity, Gemini, and Google AI Overviews at monthly cadence.",
              ]}
            />
          </HighlightBox>
        </section>

        <section className="mb-16 md:mb-20">
          <SectionHeader number="10" title="90-DAY ACTION PLAN + NEXT STEPS" />

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 bg-secondary/5 border border-border">
              <h3 className="text-foreground font-bold mb-3">Weeks 1–2</h3>
              <BulletList
                items={[
                  "Implement schema stack + Bing setup + IndexNow.",
                  "Publish first 3 Apex assets for unified inbox BOFU terms.",
                  "Create entity clarity blocks across homepage, product page, and about page.",
                  "Set up weekly prompt monitoring dashboard for top 20 prompts.",
                ]}
              />
            </div>

            <div className="p-6 bg-secondary/5 border border-border">
              <h3 className="text-foreground font-bold mb-3">Weeks 3–6</h3>
              <BulletList
                items={[
                  "Publish next 5 BOFU/comparison assets (Kinso vs key competitors).",
                  "Launch Gmail and workflow use-case cluster pages.",
                  "Begin distribution relay: LinkedIn + Reddit + partner posts.",
                  "Refresh pages based on first prompt/ranking movement.",
                ]}
              />
            </div>
          </div>

          <div className="bg-secondary/5 border border-border p-6 md:p-8 mb-10">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              Core strategic commitment
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Kinso should operate this as a category-lock program, not a blog cadence. The objective is to become the
              most trusted answer for a defined set of high-intent prompts, then defend those positions with consistent
              refresh and external authority reinforcement.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every forecast in this document is estimate-only. Performance lift depends on execution quality, internal
              speed, and ongoing calibration using first-party data.
            </p>
          </div>

          <HighlightBox className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Ready to execute this with precision?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We’ll turn this into a sprint plan with owners, publish calendar, prompt tracking, and monthly
                  recalibration.
                </p>
              </div>
              <a
                href="https://cal.com/memetik/letstalk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider border border-primary hover:opacity-90 transition-opacity"
              >
                Book a Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </HighlightBox>

          <p className="text-xs text-muted-foreground">
            Research timestamp: 2026-03-05. Source set includes SEO metrics, keyword/rank data, competitor benchmarks,
            prompt-level AI checks, on-page audit timing, and TAM model outputs for US/AU.
          </p>
        </section>
      </main>
    </div>
  );
}