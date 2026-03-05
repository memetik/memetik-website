import { useEffect } from "react";
import {
  Globe,
  AlertTriangle,
  CheckCircle,
  Search,
  Bot,
  Target,
  Database,
  Share2,
  RotateCw,
  Zap,
  ArrowRight,
  Mail,
  MessageSquare,
  Layers,
  Users,
  Building2,
  Workflow,
  ShieldCheck,
  Link2,
  BarChart3,
  Compass,
  Sparkles,
  FileText,
  ListChecks,
  Gauge,
  Cpu,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import {
  SectionHeader,
  HighlightBox,
  PhaseBlock,
  BulletList,
  DataTable,
  StatsGrid,
} from "@/components/strategy";

const heroTags = [
  "kinso.ai",
  "Communication / Unified AI Inbox",
  "Communication / Collaboration",
  "Early-Stage Organic Footprint",
];

const currentStateMissing = [
  "No measurable organic traffic footprint detected (0 monthly organic visits in current export)",
  "No measurable organic keyword footprint detected (0 ranking keywords in current export)",
  "No backlink profile detected (0 backlinks, 0 referring domains in current export)",
  "No paid search footprint detected (0 paid traffic, 0 paid keywords in current export)",
  "No captured AI mention dataset (0 mentions in current export)",
  "No captured prompt-result dataset for AI engines (empty prompt results export)",
  "No on-page audit diagnostics returned in dataset (null on-page data)",
  "No Core Web Vitals / page speed snapshot returned in dataset (null page speed data)",
];

const whatThisMeans = [
  "Kinso is in a true greenfield SEO position: no legacy penalties, no content debt, no cannibalization.",
  "Every authoritative page shipped can become a net-new entry point into both classic search and answer engines.",
  "Because there is no current query ownership, the first 40-60 pages determine category positioning.",
  "AI visibility can be engineered from day one via citation-ready assets and source-layer distribution.",
];

const marketRealityCards = [
  {
    title: "Market Narrative Is Crowded",
    body: "‘AI inbox’, ‘team inbox’, ‘shared inbox’, ‘email collaboration’, and ‘AI email assistant’ are contested narratives with established incumbents (Front, Missive, Hiver, Zendesk, Intercom, Superhuman, Shortwave).",
  },
  {
    title: "But Search Intent Is Fragmented",
    body: "Users rarely search one head term. They search by pain: ‘too many emails’, ‘handoff confusion’, ‘who replied to customer’, ‘shared inbox for startup’, ‘AI summarize threads’. Fragmentation creates entry points.",
  },
  {
    title: "AI Engines Reward Structured Expertise",
    body: "LLMs and AI Overviews disproportionately cite pages with clear definitions, comparisons, frameworks, statistics, and strong source references. Most SaaS blogs still publish generic thought leadership, leaving citation gaps.",
  },
];

const competitorRows = [
  [
    "front.com",
    "Team inbox + customer operations",
    "High",
    "Rich educational content, comparison pages, category framing (‘customer operations platform’), strong brand authority",
    "Owns broad team-inbox language; vulnerable on narrower ‘AI inbox workflow’ and role-specific operational queries",
  ],
  [
    "missiveapp.com",
    "Collaborative inbox for teams",
    "Medium-High",
    "Clear feature pages, product-led content, strong positioning around collaboration in email threads",
    "Opportunity to outrank on AI-specific query modifiers and modern workflow architecture content",
  ],
  [
    "hiverhq.com",
    "Shared inbox for Gmail teams",
    "High",
    "High-volume SEO program in customer support/shared inbox space; large long-tail coverage",
    "Can be bypassed in modern AI-native narrative and cross-channel unification queries",
  ],
  [
    "helpscout.com",
    "Customer support inbox/help desk",
    "Very High",
    "Deep TOFU library, mature domain authority, strong glossary/how-to assets",
    "Less focused on ‘unified AI inbox’ category definition for cross-functional internal teams",
  ],
  [
    "zendesk.com",
    "Enterprise support suite",
    "Very High",
    "Massive authority and enterprise intent capture; strong docs and category pages",
    "Heavyweight product leaves space for agile/SMB and AI-first collaboration messaging",
  ],
  [
    "intercom.com",
    "Support + AI agent ecosystem",
    "Very High",
    "Strong AI narrative, product marketing excellence, broad educational ecosystem",
    "Opportunity in inbox-specific operational workflows where Intercom is not perceived as email-first",
  ],
  [
    "superhuman.com",
    "Personal productivity email client",
    "High",
    "Strong brand and productivity thought leadership",
    "Not built for collaborative team inbox ownership and assignment governance queries",
  ],
  [
    "shortwave.com",
    "AI-powered email client",
    "Medium",
    "AI-forward positioning and feature-led landing pages",
    "Room for deeper collaborative and multi-user inbox governance content",
  ],
  [
    "slack.com",
    "Team communication platform",
    "Very High",
    "Massive authority around async communication and collaboration",
    "Not a unified inbox product; can be compared against inbox-centric workflows",
  ],
  [
    "microsoft.com (Teams/Outlook ecosystem)",
    "Enterprise communication stack",
    "Very High",
    "Default distribution advantage and broad informational content",
    "Complex ecosystem creates clarity opportunity for simpler AI inbox narrative",
  ],
];

const categoryQueries = [
  ["what is a unified inbox", "Informational", "TOFU", "Definition and category framing page"],
  ["unified inbox software", "Commercial", "MOFU", "Category page + product-led explainer"],
  ["ai inbox for teams", "Commercial", "MOFU", "AI-native team inbox page"],
  ["shared inbox with ai", "Commercial", "MOFU", "Feature page + comparison module"],
  ["email collaboration software", "Commercial", "MOFU", "Use-case and role page"],
  ["best shared inbox tools", "Commercial Investigation", "MOFU", "List post + product comparison"],
  ["front alternatives", "Commercial Investigation", "BOFU", "Alternative page"],
  ["missive alternatives", "Commercial Investigation", "BOFU", "Alternative page"],
  ["hiver alternatives", "Commercial Investigation", "BOFU", "Alternative page"],
  ["shared inbox for startups", "Commercial", "BOFU", "ICP landing page"],
  ["shared inbox for agencies", "Commercial", "BOFU", "Industry page"],
  ["shared inbox for customer success", "Commercial", "BOFU", "Function-specific page"],
  ["how to manage team email", "Informational", "TOFU", "Framework content"],
  ["email handoff best practices", "Informational", "TOFU", "SOP guide"],
  ["who replied to this email", "Problem-aware", "MOFU", "Pain-point page + feature tie-in"],
  ["prevent duplicate replies in shared inbox", "Problem-aware", "MOFU", "Solution page"],
  ["ai email triage workflow", "Informational/Commercial", "MOFU", "Workflow template page"],
  ["automate inbox routing with ai", "Commercial", "MOFU", "Automation feature page"],
  ["email assignment workflow", "Informational", "TOFU", "Process guide + template"],
  ["email sla tracking for teams", "Commercial", "MOFU", "SLA page / operations content"],
  ["inbox zero for teams", "Informational", "TOFU", "Methodology content"],
  ["gmail shared inbox alternative", "Commercial Investigation", "BOFU", "Alternative page"],
  ["outlook shared inbox alternative", "Commercial Investigation", "BOFU", "Alternative page"],
  ["ai summarize email threads", "Feature-intent", "MOFU", "Feature page"],
  ["convert emails to tasks automatically", "Feature-intent", "MOFU", "Workflow page"],
  ["internal collaboration on emails", "Problem-aware", "MOFU", "Use-case page"],
  ["best ai email assistant for teams", "Commercial Investigation", "MOFU", "Comparison page"],
  ["unified inbox vs help desk", "Informational/Commercial", "MOFU", "Comparison framework page"],
  ["shared inbox vs distribution list", "Informational", "TOFU", "Definition page"],
  ["shared mailbox governance", "Informational", "TOFU", "Policy and governance guide"],
  ["client communication management tools", "Commercial", "MOFU", "Industry-oriented solution page"],
  ["multi-channel team inbox ai", "Commercial", "MOFU", "Cross-channel landing page"],
  ["email collaboration for remote teams", "Commercial", "MOFU", "Remote work page"],
  ["best inbox tools for founders", "Commercial Investigation", "MOFU", "Founder-focused page"],
  ["ai assistant for support inbox", "Commercial", "MOFU", "Support workflow page"],
  ["team communication operating system", "Thought leadership", "TOFU", "Category expansion article"],
];

const clusterRows = [
  [
    "Category Education",
    "Define and own the language of ‘Unified AI Inbox’",
    "What Is a Unified AI Inbox? / Unified Inbox vs Shared Inbox / Unified Inbox vs Help Desk / AI Inbox Glossary",
    "High AI citation potential because definition pages are frequently referenced by LLMs",
  ],
  [
    "Pain-Point Playbooks",
    "Capture problem-aware searches from operators",
    "Prevent Duplicate Replies / Email Handoff SOP / Inbox SLA Framework / Assignment Rules Template",
    "Strong for both SEO long-tail and AI answer snippets",
  ],
  [
    "Competitor Alternatives",
    "Convert bottom-funnel switch intent",
    "Front Alternative / Missive Alternative / Hiver Alternative / Shared Inbox Alternatives",
    "High commercial intent; essential BOFU moat",
  ],
  [
    "Role-Based Landing Pages",
    "Map product value to buyer responsibilities",
    "For Support Leads / For Customer Success / For Founders / For Agencies",
    "Improves conversion relevance and intent match",
  ],
  [
    "Industry Pages",
    "Unlock vertical-specific acquisition",
    "For SaaS / For Agencies / For Ecommerce / For Professional Services",
    "Supports long-tail and outbound personalization",
  ],
  [
    "Workflow Templates",
    "Become operational reference source",
    "Email Triage Workflow / Escalation Matrix / Response Taxonomy / Weekly Inbox Review Checklist",
    "Template assets get linked and cited disproportionately",
  ],
  [
    "AI Capability Proof",
    "Demonstrate practical AI outcomes",
    "How Kinso Summarizes Threads / Priority Detection Logic / Auto-Assignment Signals",
    "Builds trust and feature differentiation for answer engines",
  ],
  [
    "Trust Layer",
    "Increase E-E-A-T and answer-engine confidence",
    "Security Overview / Compliance Posture / Reliability Practices / Change Log",
    "Critical for B2B buyer confidence and AI confidence scoring",
  ],
];

const aiPromptLibraryRows = [
  ["What is the best unified AI inbox for a 15-person startup team?", "Kinso is absent; incumbents dominate", "Create definitive ‘best-for-team-size’ comparison + first-party benchmarks"],
  ["How do we stop duplicate customer replies from multiple teammates?", "Generic help desk advice appears", "Publish SOP-style page with workflow diagram + product mapping"],
  ["What is the difference between shared inbox and help desk?", "Mixed definitions, no clear standard", "Own canonical comparison page with concise definitions"],
  ["What tools combine AI triage and collaborative email?", "Broad AI email tool mentions", "Build feature-led and comparison-led answer blocks"],
  ["How should customer success teams manage inbound email?", "Role-based playbooks from broad SaaS blogs", "Launch CS-specific operational guides with templates"],
  ["Is Front or Missive better for startups?", "Brand-vs-brand discussion, no third option", "Publish neutral comparison plus Kinso alternative page"],
  ["How to build email handoff workflows for remote teams?", "General productivity sources cited", "Create executable framework with policy templates"],
  ["Can AI assign emails to the right teammate automatically?", "Concept-level answers, low specificity", "Publish implementation guide tied to Kinso logic"],
  ["What is an AI inbox?", "No category owner yet", "Publish category-defining glossary + schema"],
  ["Best shared inbox for agencies with multiple clients?", "Listicles from software directories", "Build vertical comparison + agency workflow assets"],
  ["How to measure inbox performance for team collaboration?", "Scattered KPI advice", "Own KPI framework page with downloadable dashboard template"],
  ["What should be in an inbox governance policy?", "Policy templates from generic operations blogs", "Publish governance playbook with practical examples"],
];

const roadmapAssets = [
  {
    month: "Month 1",
    focus: "Foundation + IA + technical baseline",
    assets: [
      "Information architecture (hub-spoke)",
      "Core category page: Unified AI Inbox",
      "Technical schema baseline",
      "Analytics + GSC + event map",
    ],
  },
  {
    month: "Month 2",
    focus: "Category education cluster",
    assets: [
      "Unified inbox vs shared inbox",
      "Unified inbox vs help desk",
      "AI inbox glossary",
      "Team email collaboration fundamentals",
    ],
  },
  {
    month: "Month 3",
    focus: "Pain-point cluster (operators)",
    assets: [
      "Prevent duplicate replies framework",
      "Email handoff SOP template",
      "Inbox triage workflow with AI",
      "SLA and ownership playbook",
    ],
  },
  {
    month: "Month 4",
    focus: "BOFU conversion cluster",
    assets: [
      "Front alternative",
      "Missive alternative",
      "Hiver alternative",
      "Best shared inbox tools (team-size framework)",
    ],
  },
  {
    month: "Month 5",
    focus: "Role + industry expansion",
    assets: [
      "For customer success teams",
      "For agencies",
      "For founders",
      "For remote support operations",
    ],
  },
  {
    month: "Month 6",
    focus: "Authority amplification + AI visibility sprint",
    assets: [
      "Original benchmark: inbox collaboration maturity",
      "Statistics page with source citations",
      "Expert commentary pieces",
      "Prompt-oriented FAQ expansion",
    ],
  },
];

const kpiRows = [
  [
    "Indexation",
    "Indexed non-brand pages",
    "0",
    "25-40 pages",
    "50-80 pages",
  ],
  [
    "Organic discovery",
    "Ranking keywords (Top 100)",
    "0",
    "150-300",
    "400-900",
  ],
  [
    "Commercial visibility",
    "Bottom-funnel ranking set",
    "0",
    "10-20 tracked BOFU terms in Top 30",
    "25-50 BOFU terms in Top 20",
  ],
  [
    "Authority",
    "Referring domains",
    "0",
    "20-40 relevant domains",
    "60-120 relevant domains",
  ],
  [
    "AI presence",
    "Citable assets live",
    "0",
    "12-20",
    "30-50",
  ],
  [
    "Answer engine traction",
    "Prompts where Kinso appears as candidate answer",
    "Unknown / likely near-zero",
    "15-30% prompt coverage",
    "35-55% prompt coverage",
  ],
];

const first30Pages = [
  "What Is a Unified AI Inbox? (Category Definition)",
  "Unified Inbox vs Shared Inbox: Complete Comparison",
  "Unified Inbox vs Help Desk: Which Model Fits Your Team?",
  "AI Inbox Explained: Features, Workflows, and Limitations",
  "Team Email Collaboration: Operating Principles for Modern Teams",
  "How to Stop Duplicate Replies in a Shared Inbox",
  "Email Handoff SOP Template for Cross-Functional Teams",
  "Inbox Assignment Rules: A Practical Framework",
  "AI Email Triage Workflow (Step-by-Step)",
  "How to Build Inbox SLA Policies Without Slowing the Team",
  "Shared Inbox Governance Policy Template",
  "How to Track Team Inbox Performance: KPI Framework",
  "Front Alternative for AI-First Teams",
  "Missive Alternative for Growing Teams",
  "Hiver Alternative for Multi-Function Collaboration",
  "Best Shared Inbox Tools for Startups (2026)",
  "Best Shared Inbox Tools for Agencies (2026)",
  "Best AI Email Assistant for Teams (2026)",
  "Gmail Shared Inbox Alternatives",
  "Outlook Shared Mailbox Alternatives",
  "Unified AI Inbox for Customer Success Teams",
  "Unified AI Inbox for Support Teams",
  "Unified AI Inbox for Founders and Exec Teams",
  "Unified AI Inbox for Agencies Managing Multiple Clients",
  "Remote Team Email Collaboration Playbook",
  "How AI Summarization Changes Thread Handoffs",
  "How to Convert Emails Into Actionable Tasks Automatically",
  "Inbox Collaboration Benchmark Report (Original Data)",
  "Unified Inbox Statistics and Research Hub",
  "Kinso Product-Led FAQ (Prompt-Optimized)",
];

const schemaChecklist = [
  "Organization schema on all core pages with sameAs and entity consistency",
  "SoftwareApplication schema on product and feature pages",
  "FAQPage schema on FAQ blocks and prompt-oriented Q&A sections",
  "HowTo schema where operational workflows are explained step-by-step",
  "Article schema on all editorial assets with author and reviewedBy properties",
  "BreadcrumbList schema across all content templates",
  "WebSite schema with SearchAction for site-level query signaling",
  "ItemList schema for comparison pages and ranked tool lists",
];

const distributionChannels = [
  "Founder/exec LinkedIn POV threads tied to each new strategic article",
  "Repurposed newsletter summaries focused on inbox operations and AI adoption",
  "Community syndication (RevGenius, CX/CS communities, SaaS operator groups)",
  "Guest contributions on support/customer operations publications",
  "Podcast guest placements around ‘AI collaboration workflows’",
  "Data-driven digital PR from benchmark and statistics assets",
  "Integration ecosystem pages and partner mentions",
  "Template asset submissions to operations resource directories",
];

const riskRows = [
  [
    "Publishing generic AI content",
    "No ranking differentiation, low AI citation likelihood",
    "Prioritize workflow specificity, practical templates, and operational depth",
  ],
  [
    "Over-indexing on head terms too early",
    "Slow growth, poor early feedback loops",
    "Start with long-tail pain + alternatives + role pages",
  ],
  [
    "Weak internal linking architecture",
    "Authority dilution, indexation inefficiency",
    "Hub-and-spoke templates with strict linking rules",
  ],
  [
    "Ignoring entity consistency",
    "Reduced trust in answer engines",
    "Standardize naming, about-page claims, author bios, schema entities",
  ],
  [
    "No source citations in thought leadership",
    "Low answer-engine confidence",
    "Cite credible external sources and first-party data transparently",
  ],
  [
    "Treating AI visibility as separate from SEO",
    "Fragmented strategy and missed compounding",
    "Single editorial system optimized for both retrieval and citation",
  ],
];

const operatingCadence = [
  "Weekly: publish 2 strategic assets (1 educational, 1 commercial or workflow)",
  "Weekly: internal linking pass on all newly published and adjacent pages",
  "Weekly: prompt monitoring across ChatGPT, Perplexity, Gemini, Copilot with a fixed library",
  "Bi-weekly: refresh 2 older pages based on new PAA, AI snippets, and CTR trends",
  "Monthly: competitor content diff (new pages, new claims, new comparison angles)",
  "Monthly: authority sprint (digital PR + partner mentions + guest insights)",
  "Quarterly: rebuild the top 20 pages for freshness, schema expansion, and conversion lift",
];

export default function StrategyKinso() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Kinso — SEO & AEO Strategy | MEMETIK";
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
            <span className="text-primary">SEO & AEO STRATEGY.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mt-6 mb-4">
            Build Kinso into the default answer when teams ask search engines and AI assistants how to manage collaborative inboxes, reduce email chaos, and operationalize AI communication workflows.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {heroTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary/10 border border-border text-sm font-mono text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="00" title="CURRENT STATE: GREENFIELD, ZERO FOOTPRINT" />

          <HighlightBox className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">
              Research Snapshot (Export: 2026-03-05)
            </h3>
            <StatsGrid
              stats={[
                { label: "Organic Traffic", value: "0", icon: <Search className="w-4 h-4" /> },
                { label: "Organic Keywords", value: "0", icon: <BarChart3 className="w-4 h-4" /> },
                { label: "Backlinks", value: "0", icon: <Link2 className="w-4 h-4" /> },
                { label: "Referring Domains", value: "0", icon: <Share2 className="w-4 h-4" /> },
                { label: "Paid Traffic", value: "0", icon: <Target className="w-4 h-4" /> },
                { label: "Paid Keywords", value: "0", icon: <Compass className="w-4 h-4" /> },
                { label: "AI Mentions Captured", value: "0", icon: <Bot className="w-4 h-4" /> },
                { label: "Prompt Results Captured", value: "0", icon: <Cpu className="w-4 h-4" /> },
              ]}
            />
          </HighlightBox>

          <HighlightBox className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What’s Missing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentStateMissing.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </HighlightBox>

          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              This is a blank slate advantage — if execution is disciplined.
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              {whatThisMeans.map((point, idx) => (
                <p key={idx}>{point}</p>
              ))}
              <p>
                Kinso is not fighting legacy SEO decay. The first strategic content system can define both search narrative and AI retrieval narrative from scratch. In practical terms: this is a category land-grab window.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="01" title="CATEGORY REALITY & COMPETITIVE PRESSURE" />

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {marketRealityCards.map((card, i) => (
              <div key={i} className="p-6 bg-secondary/5 border border-border">
                <h3 className="text-foreground font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <h3 className="text-foreground font-bold mb-4 text-lg">Search + Product Competitor Map</h3>
          <DataTable
            headers={[
              "Domain",
              "Primary Positioning",
              "Relative Organic Strength",
              "What They Do Well",
              "Where Kinso Can Win",
            ]}
            rows={competitorRows}
            className="mb-6"
          />
          <p className="text-xs text-muted-foreground mb-8">
            Competitor set based on category overlap across shared inbox, collaborative email, help desk-adjacent workflows, and AI email assistant narratives.
          </p>

          <HighlightBox>
            <div className="flex gap-4 items-start">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="text-sm">
                <strong className="text-foreground block mb-1">
                  Strategic Positioning Move
                </strong>
                <span className="text-muted-foreground">
                  Don’t fight incumbents on generic “best inbox software” first. Win the intersection they under-serve: <span className="text-foreground font-medium">AI-native collaborative inbox operations</span> with deep workflow content and role-specific execution guides.
                </span>
              </div>
            </div>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="02" title="QUERY UNIVERSE: WHERE DEMAND ACTUALLY LIVES" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Because current ranking data is zero, opportunity mapping is built from greenfield query patterns in this category: definitions, comparisons, alternatives, pain-point operations, role-intent, and AI workflow intent.
          </p>

          <DataTable
            headers={["Priority Query Pattern", "Intent", "Funnel", "Recommended Asset Type"]}
            rows={categoryQueries}
            className="mb-8"
          />

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">
              The Core Insight
            </h3>
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Teams don’t search for “unified AI inbox” first. They search for <span className="text-primary">operational pain</span> first — duplicate replies, handoff errors, unclear ownership, SLA slippage.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Kinso should own pain-to-solution pathways, then ladder users into category ownership and product consideration.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="03" title="INFORMATION ARCHITECTURE FOR SEO + AEO" />

          <div className="bg-secondary/5 border border-border p-6 md:p-8 mb-10">
            <h3 className="text-foreground font-bold mb-4 text-lg">Hub-and-Spoke Content System</h3>
            <BulletList
              items={[
                "Primary hub: /unified-ai-inbox/ as the canonical category and entity page",
                "Comparison hub: /compare/ for versus and alternatives intent capture",
                "Workflow hub: /playbooks/ for actionable SOP and template content",
                "Role hub: /solutions/ by function (Support, Customer Success, Founders, Ops)",
                "Industry hub: /industry/ by vertical context (SaaS, Agencies, Ecommerce, Services)",
                "Proof hub: /research/ for original data, statistics, and benchmark assets",
                "FAQ hub: /faq/ built from prompt-derived question sets for answer engines",
              ]}
            />
          </div>

          <DataTable
            headers={["Cluster", "Strategic Goal", "Priority Pages", "AEO Value"]}
            rows={clusterRows}
            className="mb-8"
          />

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">
              URL + Template Principle
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every template should be citation-ready: concise summary at top, scannable headings, FAQ blocks, clear definitions, source citations, and entity-consistent metadata. This is not only for Google ranking — it is specifically for LLM retrieval and answer extraction.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="04" title="AI VISIBILITY GAP ANALYSIS" />

          <div className="bg-secondary/5 border border-border p-6 md:p-8 mb-8">
            <h3 className="text-foreground font-bold mb-3 text-lg">Current AI Footprint Status</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The provided research export contains zero AI mention records and zero captured prompt result records. Operationally, that means Kinso currently has no measurable answer-engine footprint in this dataset.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-border p-4 bg-secondary/10">
                <div className="text-xs font-mono text-muted-foreground mb-1">Mentions by Domain</div>
                <div className="text-2xl font-display font-bold text-foreground">0</div>
              </div>
              <div className="border border-border p-4 bg-secondary/10">
                <div className="text-xs font-mono text-muted-foreground mb-1">Prompt Results Captured</div>
                <div className="text-2xl font-display font-bold text-foreground">0</div>
              </div>
              <div className="border border-border p-4 bg-secondary/10">
                <div className="text-xs font-mono text-muted-foreground mb-1">Structured AEO Assets</div>
                <div className="text-2xl font-display font-bold text-foreground">0 baseline</div>
              </div>
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-4 text-lg">Prompt Library to Track Monthly</h3>
          <DataTable
            headers={[
              "Prompt",
              "Likely Current Outcome",
              "Kinso Action to Win Answer Inclusion",
            ]}
            rows={aiPromptLibraryRows}
            className="mb-8"
          />

          <HighlightBox>
            <div className="flex gap-4 items-start">
              <Bot className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="text-sm">
                <strong className="text-foreground block mb-1">AEO Rule for Kinso</strong>
                <span className="text-muted-foreground">
                  LLMs cite what is explicit, structured, and frequently reinforced across trustworthy surfaces. Kinso needs an <span className="text-foreground font-medium">asset layer</span> (definitions, frameworks, comparisons, statistics, FAQs) and a <span className="text-foreground font-medium">distribution layer</span> (mentions, links, references, community visibility) running in parallel.
                </span>
              </div>
            </div>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="05" title="EXECUTION PROTOCOL (6-MONTH SYSTEM)" />

          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">
            <PhaseBlock
              number="01"
              icon={<Target className="w-4 h-4" />}
              label="Phase 1 — Weeks 1-2"
              title="Measurement, Technical Baseline, and Entity Setup"
            >
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary" />
                    Tracking & Diagnostics
                  </h4>
                  <BulletList
                    items={[
                      "Set up Google Search Console, GA4, Bing Webmaster, and server log capture",
                      "Define conversion events: trial starts, demo requests, key CTA clicks, integration intent",
                      "Create dashboard slices by page type: category, comparison, workflow, role, industry",
                      "Establish baseline for indexation, impressions, CTR, and prompt visibility tracker",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Entity & Trust Layer
                  </h4>
                  <BulletList
                    items={[
                      "Standardize entity naming across site copy, metadata, and social profiles (‘Kinso’, ‘Kinso.ai’)",
                      "Build robust About + Team + Editorial Standards pages for E-E-A-T reinforcement",
                      "Create author bylines and reviewer framework for educational content",
                      "Publish transparent product terminology glossary to ensure semantic consistency",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    Schema Foundation
                  </h4>
                  <BulletList items={schemaChecklist} />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock
              number="02"
              icon={<Layers className="w-4 h-4" />}
              label="Phase 2 — Weeks 3-6"
              title="Category and Definition Ownership"
            >
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Establish Kinso as the definitive source for category language before competitors lock the narrative.
                </p>
                <BulletList
                  items={[
                    "Publish canonical category page: ‘What Is a Unified AI Inbox?’ with clear taxonomy",
                    "Launch 3 core definition/comparison pages linked bidirectionally",
                    "Implement summary blocks designed for AI extraction (2-3 sentence direct answers)",
                    "Add FAQ sections from top People Also Ask style query patterns",
                    "Deploy internal links from homepage + nav + footer to ensure crawl priority",
                  ]}
                />
              </div>
            </PhaseBlock>

            <PhaseBlock
              number="03"
              icon={<Workflow className="w-4 h-4" />}
              label="Phase 3 — Weeks 7-12"
              title="Operational Pain-Point Content Engine"
            >
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Capture high-intent operators by solving their day-to-day inbox failures with practical, implementation-grade content.
                </p>
                <BulletList
                  items={[
                    "Ship workflow playbooks: duplicate reply prevention, triage routing, ownership models",
                    "Attach downloadable templates/checklists to increase save/share/link behavior",
                    "Embed product screenshots and process diagrams to increase trust and usability",
                    "Use ‘problem → consequences → framework → Kinso implementation’ narrative format",
                    "Build TOFU-to-BOFU pathways: each guide links to relevant role and alternative pages",
                  ]}
                />
              </div>
            </PhaseBlock>

            <PhaseBlock
              number="04"
              icon={<Compass className="w-4 h-4" />}
              label="Phase 4 — Weeks 13-18"
              title="Commercial Capture: Alternatives and Buyer Guides"
            >
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Convert existing category demand by targeting switch-intent and evaluation-intent pages.
                </p>
                <BulletList
                  items={[
                    "Launch competitor alternative pages with transparent, evidence-based positioning",
                    "Publish ‘best tools’ pages segmented by team size and use case",
                    "Create migration guides for teams moving from legacy shared mailbox setups",
                    "Add clear conversion blocks (demo/trial) aligned to visitor context",
                    "Refresh comparison pages monthly with newly released competitor features",
                  ]}
                />
              </div>
            </PhaseBlock>

            <PhaseBlock
              number="05"
              icon={<Share2 className="w-4 h-4" />}
              label="Phase 5 — Weeks 19-24"
              title="Authority Amplification + AI Citation Sprint"
            >
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Improve retrieval odds by expanding off-site signals and citation-worthy first-party assets.
                </p>
                <BulletList
                  items={[
                    "Publish original benchmark report on inbox collaboration maturity (survey + analysis)",
                    "Create statistics hub page updated quarterly and externally source-linked",
                    "Run digital PR outreach around original insights and trend data",
                    "Place expert commentary on relevant partner and community channels",
                    "Monitor AI prompt outputs monthly and patch pages where Kinso is absent",
                  ]}
                />
              </div>
            </PhaseBlock>

            <PhaseBlock
              number="06"
              icon={<RotateCw className="w-4 h-4" />}
              label="Phase 6 — Ongoing"
              title="Compounding Optimization Loop"
            >
              <div className="space-y-6">
                <BulletList
                  items={[
                    "Re-optimize top pages based on query drift and SERP feature shifts",
                    "Expand winning clusters with adjacent variants and deeper role/industry angles",
                    "Continuously improve CTR with title tests and richer SERP snippets",
                    "Upgrade underperforming pages with fresh examples and clearer frameworks",
                    "Scale internal linking depth as library passes 50+ pages",
                  ]}
                />
              </div>
            </PhaseBlock>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="06" title="CONTENT BLUEPRINT: FIRST 30 STRATEGIC PAGES" />

          <div className="bg-secondary/5 border border-border p-6 md:p-8 mb-8">
            <h3 className="text-foreground font-bold mb-4 text-lg">Publishing Priority Sequence</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {first30Pages.map((page, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <span className="text-primary font-mono mr-1">{String(i + 1).padStart(2, "0")}.</span> {page}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-4 text-lg">Month-by-Month Asset Roadmap</h3>
          <DataTable
            headers={["Month", "Focus", "Priority Assets"]}
            rows={roadmapAssets.map((item) => [
              item.month,
              item.focus,
              <ul key={item.month} className="space-y-1">
                {item.assets.map((asset, idx) => (
                  <li key={idx} className="text-muted-foreground text-sm">• {asset}</li>
                ))}
              </ul>,
            ])}
            className="mb-8"
          />

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">
              Editorial Standard (Non-Negotiable)
            </h3>
            <BulletList
              items={[
                "Each article answers a specific prompt in the first 120 words",
                "Each article includes at least one framework, one checklist, and one practical example",
                "Each article includes 3-5 internal links to adjacent cluster pages",
                "Each article includes explicit takeaway summary for answer engine extraction",
                "Each article includes author + reviewedBy attribution where applicable",
              ]}
            />
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="07" title="AUTHORITY & DISTRIBUTION ENGINE" />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 text-lg flex items-center gap-2">
                <Link2 className="w-4 h-4 text-primary" />
                Off-Site Signal Objectives
              </h3>
              <BulletList
                items={[
                  "Earn references from reputable SaaS, support, and operations publications",
                  "Build partner mentions via integrations and ecosystem collaborations",
                  "Secure links to benchmark/statistics page from community roundups",
                  "Drive branded mentions tied to specific operational frameworks",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 text-lg flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Distribution Cadence
              </h3>
              <BulletList items={distributionChannels} />
            </div>
          </div>

          <HighlightBox>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For AI visibility, backlinks alone are insufficient. The goal is <span className="text-foreground font-medium">reference density</span>: Kinso’s concepts and frameworks repeatedly appearing across multiple credible surfaces in similar language. That repetition dramatically increases retrieval and citation probability.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="08" title="MEASUREMENT SYSTEM & SUCCESS METRICS" />

          <DataTable
            headers={["Pillar", "Metric", "Current", "6-Month Target", "12-Month Target"]}
            rows={kpiRows}
            className="mb-8"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 text-lg flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-primary" />
                Weekly Operating Cadence
              </h3>
              <BulletList items={operatingCadence} />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 text-lg flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Dashboard Segments
              </h3>
              <BulletList
                items={[
                  "Category pages: impressions, CTR, average position, prompt inclusion rate",
                  "Pain-point pages: long-tail keyword growth, engaged sessions, assisted conversions",
                  "Alternative pages: BOFU rankings, conversion rate, competitor query share",
                  "Research pages: referral traffic, external mentions, citation frequency in AI outputs",
                  "Role/industry pages: qualified lead attribution by ICP segment",
                ]}
              />
            </div>
          </div>

          <HighlightBox>
            <div className="flex gap-4 items-start">
              <Gauge className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="text-sm">
                <strong className="text-foreground block mb-1">North-Star Logic</strong>
                <span className="text-muted-foreground">
                  The leading indicator is not traffic alone — it is <span className="text-foreground font-medium">qualified query surface area owned</span> across SEO and AI prompts. Traffic and pipeline follow from sustained ownership.
                </span>
              </div>
            </div>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="09" title="RISKS, FAILURE MODES, AND MITIGATIONS" />

          <DataTable
            headers={["Risk", "Consequence", "Mitigation"]}
            rows={riskRows}
            className="mb-8"
          />

          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-foreground font-bold mb-4 text-lg">Execution Discipline Rules</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "No page ships without a unique intent target and internal-link destination map.",
                "No article ships without summary blocks that can be quoted directly by answer engines.",
                "No comparison page ships without transparent criteria and regularly updated evidence.",
                "No month ends without prompt-monitoring results and content patch decisions.",
                "No quarter closes without one original data asset to strengthen authority.",
                "No cluster scales before conversion pathways are instrumented.",
              ].map((rule, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="10" title="WHAT SUCCESS LOOKS LIKE FOR KINSO" />

          <HighlightBox className="mb-8">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Kinso becomes not just a product page on the internet, but a <span className="text-primary">knowledge surface</span> that search engines and AI systems repeatedly rely on when answering team communication and inbox workflow questions.
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary/5 border border-border p-6">
              <div className="text-primary mb-3">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-foreground font-bold mb-2">SEO Outcome</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kinso consistently ranks across long-tail operational queries, role pages, and alternative pages that map to high-intent evaluation behavior.
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-6">
              <div className="text-primary mb-3">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-foreground font-bold mb-2">AEO Outcome</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kinso appears as a recurring candidate in AI-generated answers because the web has enough structured, repeated, trustworthy references to Kinso’s frameworks and category pages.
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-6">
              <div className="text-primary mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-foreground font-bold mb-2">Business Outcome</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Inbound pipeline quality improves as visitors arrive already educated through Kinso’s operational content, reducing friction and shortening time-to-value conversations.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="border border-primary/30 bg-primary/5 p-8 md:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-primary/30 bg-primary/10 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Calendar className="w-3.5 h-3.5" />
              Next Step
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight mb-4">
              Book a Strategy Call
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-sm md:text-base">
              We’ll turn this blueprint into a live execution plan: technical setup, content production system, AI visibility tracking, and weekly operating cadence.
            </p>
            <a
              href="https://cal.com/memetik/letstalk"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold border border-primary hover:opacity-90 transition-opacity"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}