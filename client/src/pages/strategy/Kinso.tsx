import { useEffect } from "react";
import {
  Globe,
  Bot,
  Search,
  Database,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  Layers,
  ArrowRight,
  Sparkles,
  Radar,
  Building2,
  LineChart,
  Gauge,
  ShieldCheck,
  Compass,
  Network,
  Workflow,
  LucideIcon,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import {
  SectionHeader,
  HighlightBox,
  PhaseBlock,
  BulletList,
  DataTable,
  StatsGrid,
  PhasedUpsideChart,
  TamRoiCalculator,
} from "@/components/strategy";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);

const formatInt = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

const currentStateStats = [
  { label: "Organic Traffic (est.)", value: "556.77/mo", icon: <LineChart className="w-4 h-4" /> },
  { label: "Ranking Keywords", value: "24", icon: <Search className="w-4 h-4" /> },
  { label: "ChatGPT Mention Rate", value: "25%", icon: <Bot className="w-4 h-4" /> },
  { label: "Google AIO Mention Rate", value: "0%", icon: <AlertTriangle className="w-4 h-4" /> },
];

const marketBreakdownRows = [
  ["US", "95.47", "16", "0", "0", "Data unavailable in current payload", "Data unavailable in current payload"],
  ["AU", "461.31", "8", "0", "0", "Data unavailable in current payload", "Data unavailable in current payload"],
];

const competitorRows = [
  [
    "missiveapp.com",
    "Product competitor discovery",
    "166,300.31",
    "10,931",
    "4 query hits across 2 product prompts",
    "Data unavailable in current payload",
  ],
  [
    "front.com",
    "Seeded competitor",
    "86,294.76",
    "12,224",
    "No direct query hits in this payload",
    "Data unavailable in current payload",
  ],
  [
    "intercom.com",
    "Seeded competitor",
    "91,288.66",
    "26,720",
    "No direct query hits in this payload",
    "Data unavailable in current payload",
  ],
  [
    "zendesk.com",
    "Seeded competitor",
    "5,515,761.67",
    "846,083",
    "No direct query hits in this payload",
    "Data unavailable in current payload",
  ],
  [
    "helpscout.com",
    "Seeded competitor",
    "170,959.46",
    "24,924",
    "No direct query hits in this payload",
    "Data unavailable in current payload",
  ],
  [
    "hiverhq.com",
    "Seeded competitor",
    "282,533.58",
    "26,665",
    "No direct query hits in this payload",
    "Data unavailable in current payload",
  ],
  [
    "foundr.ai",
    "Product competitor discovery",
    "3,554.46",
    "1,219",
    "9 query hits across Kinso alternatives / Kinso vs",
    "Data unavailable in current payload",
  ],
];

const aiPlatformRows = [
  [
    "ChatGPT",
    "16",
    "4",
    "25%",
    "best unified ai inbox tools; Kinso alternatives; Kinso vs competitors",
    "Visible only on branded / clarification queries; absent on category-buying prompts",
  ],
  [
    "Google AI Overviews",
    "16",
    "0",
    "0%",
    "AI overview detected for Kinso alternatives / Kinso vs competitors but no citation to kinso.ai",
    "Complete citation gap on tested prompts",
  ],
  [
    "Perplexity",
    "Data unavailable",
    "Data unavailable",
    "Data unavailable",
    "Platform unavailable in this payload",
    "Add direct Perplexity prompt tracking in next crawl",
  ],
  [
    "Gemini",
    "Data unavailable",
    "Data unavailable",
    "Data unavailable",
    "Platform unavailable in this payload",
    "Add direct Gemini prompt tracking in next crawl",
  ],
];

const promptEvidenceRows = [
  [
    "best unified ai inbox tools (US/AU)",
    "Front, Superhuman, Missive appear repeatedly",
    "No",
    "Category loss: not shortlisted in highest-intent discovery prompt",
  ],
  [
    "best unified ai inbox for startups (US/AU)",
    "Front + niche alternatives",
    "No",
    "No presence in startup-oriented buying journey prompts",
  ],
  [
    "best unified ai inbox for enterprise (US/AU)",
    "Front + enterprise incumbents",
    "No",
    "No enterprise framing in model memory",
  ],
  [
    "Kinso alternatives (AU)",
    "ChatGPT recognizes Kinso context + gives alternatives",
    "Yes",
    "Brand known in narrow query shape only",
  ],
  [
    "Kinso vs competitors (AU)",
    "ChatGPT produced comparison framing",
    "Yes",
    "Entity exists but category authority is not established",
  ],
];

const keywordUniverseRows = [
  ["inbox", "159,200", "BOFU", "Buyer Guides", "missiveapp.com / helpscout.com", "No"],
  ["inbox gmail", "18,100", "BOFU", "Buyer Guides", "missiveapp.com", "No"],
  ["email app", "8,980", "BOFU", "Buyer Guides", "missiveapp.com", "No"],
  ["email apps", "8,100", "BOFU", "Buyer Guides", "missiveapp.com", "No"],
  ["cloud-based communication platform", "12,100", "BOFU", "Buyer Guides", "front.com", "Yes"],
  ["ai email", "7,900", "TOFU", "Category & Brand Demand", "missiveapp.com", "No"],
  ["email thread", "16,920", "TOFU", "Category & Brand Demand", "missiveapp.com / front.com", "No"],
  ["unified messaging app", "180", "BOFU", "Buyer Guides", "kinso.ai (position 100)", "No"],
  ["unified inbox email", "80", "BOFU", "Buyer Guides", "kinso.ai (position 40)", "Yes"],
  ["ai inbox", "80", "BOFU", "Buyer Guides", "kinso.ai (position 105)", "Yes"],
  ["unified inbox app", "60", "BOFU", "Buyer Guides", "kinso.ai (position 29)", "Yes"],
  ["all inboxes gmail", "180", "TOFU", "Category & Brand Demand", "kinso.ai (position 60)", "No"],
];

const keywordGapRows = [
  ["all inboxes gmail", "90", "LOW", "US", "Current rank: 60", "Lift with dedicated Gmail multi-inbox guide + FAQ schema"],
  ["unified messaging app", "90", "LOW", "US", "Current rank: 100", "Build BOFU landing page + alternatives section"],
  ["gmail all inboxes", "90", "LOW", "US", "Current rank: 105", "Create phrase-match variant page and canonical cluster"],
  ["gmail automatic labels", "70", "LOW", "AU", "Current rank: 80", "How-to + automation examples + internal links from product page"],
  ["ai inbox", "40", "MEDIUM", "US", "Current rank: 105", "Core money page with direct answer in first 40-60 words"],
  ["unified inbox email", "40", "MEDIUM", "US", "Current rank: 40", "Upgrade to apex comparison page with verdict table"],
  ["multiple inboxes gmail", "40", "LOW", "AU", "Current rank: 110", "Dedicated troubleshooting + setup page"],
  ["unified inbox app", "30", "LOW", "US", "Current rank: 29", "Push to top 10 via authority links and richer topical completeness"],
];

const tamIntentRows = [
  ["BOFU", "Phase 1 (Months 0-3)", "207,030", "11", "4,988.10", "8,313.50", "13,301.59"],
  ["MOFU", "Phase 2 (Months 4-8)", "0", "0", "0.00", "0.00", "0.00"],
  ["TOFU", "Phase 3 (Months 9-12)", "146,940", "26", "885.08", "1,770.16", "2,950.26"],
];

const phasedUpsidePoints = [
  { phase: "Phase 1 (Months 0-3)", label: "BOFU capture first", low: 4988.1, base: 8313.5, high: 13301.59 },
  { phase: "Phase 2 (Months 4-8)", label: "MOFU layer currently unmodeled", low: 0, base: 0, high: 0 },
  { phase: "Phase 3 (Months 9-12)", label: "TOFU retrieval density expansion", low: 885.08, base: 1770.16, high: 2950.26 },
];

const assumptionRows = [
  ["Channel Split", "Google 86% / AI 14%", "Directional model assumption", "Medium confidence"],
  ["Channel CTR", "Google 46.4% / AI 1.8%", "Modeled based on tam_v1 defaults", "Medium confidence"],
  ["Capture Rates", "BOFU 6%-16%, TOFU 1.5%-5%", "Scenario envelope (low/base/high)", "Medium confidence"],
  ["Revenue Model", "Disabled", "ACV/AOV missing in payload", "Low confidence until first-party data added"],
  ["AI Visibility Inputs", "32 prompts (US + AU)", "ChatGPT + Google AIO only", "Medium confidence"],
  ["Backlink Inputs", "Unavailable", "Referring domains/backlinks missing", "Low confidence for authority planning"],
];

const executiveActions = [
  "Build 8-12 BOFU apex assets around unified inbox and AI inbox commercial queries before expanding TOFU.",
  "Ship comparison and alternatives pages with direct verdicts: Kinso vs Front, Kinso vs Missive, Kinso alternatives for founders/startups.",
  "Implement Bing-first technical stack (Bing Webmaster Tools + IndexNow + FAQ/SoftwareApplication schema) to raise ChatGPT citation odds.",
  "Launch external authority loop: LinkedIn thought assets + Reddit participation + directory/review surfaces to strengthen entity trust.",
  "Expand prompt coverage to Perplexity and Gemini in the next audit cycle; current payload is missing those platforms.",
];

const phaseOneItems = [
  "Create /unified-ai-inbox, /ai-inbox, /unified-inbox-app, /unified-inbox-email as conversion-oriented apex pages.",
  "Add schema: Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList, HowTo where relevant.",
  "Set up Bing Webmaster Tools and IndexNow (critical for ChatGPT retrieval alignment).",
  "Create query-answer blocks in first 40-60 words on each money page; include explicit category language repeatedly.",
  "Refactor homepage IA: problem statement, category definition, alternatives references, and trust proof above fold.",
  "Establish prompt tracking dashboard for 20 recurring prompts across US and AU.",
];

const phaseTwoItems = [
  "Publish comparison matrix cluster: Kinso vs Front, Missive, Intercom inbox workflows, Hiver, Help Scout.",
  "Ship alternatives pages optimized for 'for startups', 'for founders', 'for revenue teams', 'for agencies'.",
  "Create 40-80 knowledge graph pages: Gmail multi-inbox, message prioritization, inbox triage, Slack prioritization workflows.",
  "Start distribution cadence: weekly LinkedIn posts, founder POV threads, and 2-3 expert commentary placements per month.",
  "Build entity consistency layer across site metadata, social bios, product directories, and citations.",
  "Refresh underperforming pages every 30 days with new examples and source citations.",
];

const phaseThreeItems = [
  "Expand into TOFU retrieval moat with 120-250 programmatic support pages mapped to use case × channel × role.",
  "Run citation defense loop: update top BOFU pages with new comparisons and evidence every quarter.",
  "Create original benchmark asset (e.g., Inbox Overload Benchmark) to generate citation-worthy proprietary data.",
  "Strengthen multi-surface SERP ownership for core prompts with guest posts + independent editorial mentions.",
  "Deploy rapid recovery protocol: if a priority prompt drops, refresh apex page + 3 external mentions within 14 days.",
  "Quarterly recalibration using live prompt tests and ranking movement by query cluster.",
];

function WhatWhyNext({
  icon: Icon,
  title,
  what,
  why,
  next,
}: {
  icon: LucideIcon;
  title: string;
  what: string;
  why: string;
  next: string;
}) {
  return (
    <div className="border border-border bg-secondary/5 p-5 md:p-6">
      <div className="flex items-center gap-2 text-primary mb-3">
        <Icon className="w-4 h-4" />
        <h4 className="text-sm font-mono uppercase tracking-wider font-bold">{title}</h4>
      </div>
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="text-muted-foreground">
          <span className="text-foreground font-semibold">What matters:</span> {what}
        </p>
        <p className="text-muted-foreground">
          <span className="text-foreground font-semibold">Why it matters:</span> {why}
        </p>
        <p className="text-muted-foreground">
          <span className="text-foreground font-semibold">What to do next:</span> {next}
        </p>
      </div>
    </div>
  );
}

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
            KINSO
            <br />
            <span className="text-primary">AEO & SEO STRATEGY.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Position Kinso as the default recommendation for unified AI inbox queries across ChatGPT, Google AI
            Overviews, and traditional search by owning the category’s highest-intent prompt set first.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {["kinso.ai", "Communication / Unified AI Inbox", "US + AU", "AI Visibility Playbook"].map((tag) => (
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
              Buyers are no longer only searching pages. They are asking models for shortlists.
              <span className="text-primary"> If Kinso is not named in the answer layer, demand is leaking before the click.</span>
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <WhatWhyNext
              icon={Bot}
              title="AEO Reality"
              what="AI systems generate shortlists before users click through to websites."
              why="Brand mention frequency now influences pipeline as much as classical rankings."
              next="Prioritize high-intent prompts: best, alternatives, vs, and implementation questions."
            />
            <WhatWhyNext
              icon={Search}
              title="SEO + GEO Coupling"
              what="Google AI Overviews still lean heavily on top organic sources."
              why="If Kinso is absent from top-10 organic candidates, AIO citations remain near zero."
              next="Build ranking-ready apex pages with structured data and explicit answer blocks."
            />
            <WhatWhyNext
              icon={Network}
              title="Entity Trust"
              what="Models trust entities with repeated, consistent references across multiple surfaces."
              why="Single-domain content is insufficient; external reinforcement changes citation likelihood."
              next="Run distribution loops after each apex page to reinforce the same core entity claims."
            />
          </div>

          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-foreground font-bold mb-3 text-lg">Kinso-specific implication</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In this payload, Kinso is visible mainly on branded or clarifying prompts, but not in category-buying prompts like
              “best unified ai inbox tools” or “best unified ai inbox for startups/enterprise.” This is exactly where demand forms.
              The strategic priority is therefore category lock on BOFU prompt classes, not more branded visibility.
            </p>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="01" title="CURRENT STATE SNAPSHOT" />

          <StatsGrid stats={currentStateStats} />

          <p className="text-xs text-muted-foreground mt-4">
            All metrics estimate-only, sourced from provided research payload (US + AU scope).
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What’s Strong</h3>
              <BulletList
                items={[
                  "Homepage positioning is clear: unified inbox + AI assistant framing is explicit.",
                  "Core branded terms rank #1 (e.g., 'kinso', 'kinso ai', 'kinso app').",
                  "Site appears technically accessible with status 200 and fast interaction timing in on-page payload.",
                  "Keyword universe quality gate passed (keywords, competitors, prompts all above strict threshold).",
                  "US and AU market signals are both present, enabling regional expansion planning from day one.",
                ]}
              />
            </div>

            <HighlightBox>
              <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What’s Missing</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Category visibility gap: 0% mention rate in Google AI Overviews across tested prompts.",
                  "ChatGPT mention rate only 25%, mostly from branded / ambiguous prompts rather than buyer-intent prompts.",
                  "No schema types detected in on-page audit payload (Organization/SoftwareApplication/FAQPage absent).",
                  "Backlinks and referring domains are Data unavailable in current payload, limiting authority confidence.",
                  "Organic keyword footprint (24) is too narrow for category lock in a competitive collaboration market.",
                  "MOFU in TAM model is currently zero, indicating a missing middle layer in the content architecture.",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </HighlightBox>
          </div>

          <div className="mt-8">
            <DataTable
              headers={[
                "Market",
                "Organic Traffic (est.)",
                "Organic Keywords",
                "Paid Traffic",
                "Paid Keywords",
                "Backlinks",
                "Referring Domains",
              ]}
              rows={marketBreakdownRows}
            />
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="border border-border bg-secondary/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Research Confidence</div>
              <p className="text-sm text-muted-foreground">
                Payload confidence: <span className="text-foreground font-semibold">91 / High</span>. TAM model confidence:
                <span className="text-foreground font-semibold"> 65 / Medium</span>.
              </p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Known Data Constraints</div>
              <p className="text-sm text-muted-foreground">
                DataForSEO LLM Mentions endpoint returned 404 in this run; backlink and referring-domain fields are unavailable.
                Next action: add backlink provider + Perplexity/Gemini prompt tests in next sprint.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="02" title="DATA-BACKED COMPETITIVE LANDSCAPE" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Competitor rows below are grounded in the provided research payload only. Where authority metrics are missing,
            fields are explicitly labeled as unavailable.
          </p>

          <DataTable
            headers={[
              "Domain",
              "Source",
              "Organic Traffic (est.)",
              "Organic Keywords",
              "Prompt Evidence",
              "Backlink / RD Data",
            ]}
            rows={competitorRows}
            highlightRow={0}
          />

          <p className="text-xs text-muted-foreground mt-4">
            Highlighted row indicates strongest discovered product competitor signal in the current payload.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <WhatWhyNext
              icon={Building2}
              title="Competitive Asymmetry"
              what="Missive, Front, and Intercom own larger keyword surfaces and appear repeatedly in AI category answers."
              why="Scale + retrieval density means models have more training and retrieval touchpoints for these brands."
              next="Outfocus with narrower category lock: unified AI inbox for founders/startups/revenue operators."
            />
            <WhatWhyNext
              icon={Radar}
              title="Prompt-Level Gap"
              what="Kinso gets surfaced mainly when user already says 'Kinso'."
              why="That indicates weak category memory but workable brand entity baseline."
              next="Publish category-defining comparison pages that force model association with 'unified AI inbox'."
            />
            <WhatWhyNext
              icon={ShieldCheck}
              title="Authority Gaps"
              what="Backlink/referring-domain metrics are not available in this payload."
              why="Authority planning without link baselines is incomplete."
              next="Run full off-page audit and map gap-to-top-3 competitors before month-2 distribution push."
            />
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="03" title="FULL KEYWORD UNIVERSE" />

          <HighlightBox className="mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Universe Size</div>
                <div className="text-2xl font-display font-bold text-foreground">37</div>
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">BOFU Keywords</div>
                <div className="text-2xl font-display font-bold text-foreground">11</div>
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">TOFU Keywords</div>
                <div className="text-2xl font-display font-bold text-foreground">26</div>
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Anchor Matched</div>
                <div className="text-2xl font-display font-bold text-primary">8</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              MOFU count is currently zero in modeled universe; this is a structural content gap, not just a ranking gap.
            </p>
          </HighlightBox>

          <DataTable
            headers={["Keyword", "Volume", "Intent", "Cluster", "Current Winner / URL", "Anchor Matched"]}
            rows={keywordUniverseRows}
          />

          <h3 className="text-foreground font-bold mt-10 mb-4 text-lg">Keyword Gaps to Close First (estimate-only priority list)</h3>
          <DataTable
            headers={["Gap Keyword", "Volume", "Competition", "Market", "Current State", "Next Asset"]}
            rows={keywordGapRows}
          />

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="border border-border bg-secondary/5 p-5">
              <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">What matters</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The largest modeled demand is still BOFU. Kinso does not need 500 pages before it wins; it needs to own the
                8-15 pages that define shortlists first.
              </p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">What to do next</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Build a money-entity map around: best unified ai inbox, unified inbox app, ai inbox, alternatives, and vs pages.
                Then attach TOFU support pages that internally link into these money assets.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="04" title="AI VISIBILITY BY LLM" />

          <HighlightBox className="mb-8">
            <p className="text-lg md:text-xl text-foreground font-display font-medium leading-tight">
              Kinso is <span className="text-primary">partially referenced in ChatGPT</span> but currently{" "}
              <span className="text-primary">not cited in Google AI Overviews</span> across tested category prompts.
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Mention and citation rates are estimate-only directional indicators from 32 tested prompts.
            </p>
          </HighlightBox>

          <DataTable
            headers={["Platform", "Prompts Tested", "Prompts Mentioned", "Mention Rate", "Evidence", "Readout"]}
            rows={aiPlatformRows}
          />

          <h3 className="text-foreground font-bold mt-10 mb-4 text-lg">Prompt Evidence (sample)</h3>
          <DataTable
            headers={["Prompt", "Observed Winners", "Kinso Mentioned", "Interpretation"]}
            rows={promptEvidenceRows}
          />

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <WhatWhyNext
              icon={Bot}
              title="ChatGPT"
              what="25% mention rate, but wins are mostly branded or disambiguation contexts."
              why="The model knows the entity but does not reliably rank it in category recommendations."
              next="Strengthen exact category phrasing and comparisons on-site and off-site, then re-test monthly."
            />
            <WhatWhyNext
              icon={Search}
              title="Google AIO"
              what="0% mention in tested prompts."
              why="AIO citations often mirror top-10 authority pages; Kinso currently lacks that citation footprint."
              next="Ship top-10 rankable BOFU assets with robust schema and external citations."
            />
            <WhatWhyNext
              icon={Compass}
              title="Coverage Gaps"
              what="Perplexity and Gemini were unavailable in this payload."
              why="A Google + ChatGPT-only view underestimates or misreads total AI visibility."
              next="Add platform-specific tracking in next audit cycle for complete multi-LLM score."
            />
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="05" title="TOTAL ADDRESSABLE SEARCH MARKET (12 MONTHS)" />

          <HighlightBox className="mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Total Addressable Demand</div>
                <div className="text-3xl font-display font-bold text-foreground">353,970</div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Reachable Visits (Base)</div>
                <div className="text-3xl font-display font-bold text-primary">10,083.65</div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Scope</div>
                <div className="text-3xl font-display font-bold text-foreground">US + AU</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Estimate-only model. Formula: Reachable Demand = Search Volume × Capture Rate × Channel Split × Channel CTR.
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-border bg-secondary/5 p-6">
              <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">By Channel (estimate-only)</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Google Demand</span>
                  <span className="text-foreground font-semibold">304,414.20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Google Reachable Visits (Base)</span>
                  <span className="text-foreground font-semibold">10,020.37</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Demand</span>
                  <span className="text-foreground font-semibold">49,555.80</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Reachable Visits (Base)</span>
                  <span className="text-foreground font-semibold">63.28</span>
                </div>
              </div>
            </div>
            <div className="border border-border bg-secondary/5 p-6">
              <h4 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">Pipeline Potential (estimate-only)</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Low Scenario Leads</span>
                  <span className="text-foreground font-semibold">23.49</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Scenario Leads</span>
                  <span className="text-foreground font-semibold">90.75</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">High Scenario Leads</span>
                  <span className="text-foreground font-semibold">243.78</span>
                </div>
              </div>
            </div>
          </div>

          <DataTable
            headers={["Intent", "Phase", "Demand", "Keyword Count", "Reachable Visits Low", "Reachable Visits Base", "Reachable Visits High"]}
            rows={tamIntentRows}
          />

          <p className="text-sm text-muted-foreground mt-6">
            Revenue modeling requires client ACV/AOV and funnel inputs.
          </p>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="06" title="PHASED UPSIDE (12 MONTHS)" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            The phased model below is estimate-only and maps expected reachable visits by execution phase. Phase 2 is zero
            because MOFU demand is currently unmodeled in the payload and should be corrected during implementation.
          </p>

          <PhasedUpsideChart points={phasedUpsidePoints} className="mb-8" />

          <div className="grid md:grid-cols-3 gap-4">
            <WhatWhyNext
              icon={Target}
              title="Phase 1 (0-3)"
              what="BOFU-heavy upside: base 8,313.50 reachable visits estimate-only."
              why="Commercial intent pages directly influence shortlist prompts and conversion pages."
              next="Prioritize apex assets and comparison pages before broader publishing."
            />
            <WhatWhyNext
              icon={Workflow}
              title="Phase 2 (4-8)"
              what="Modeled zero due to missing MOFU universe."
              why="This is a modeling and architecture gap, not true zero demand."
              next="Add MOFU entities: buyer frameworks, team workflows, and implementation pages."
            />
            <WhatWhyNext
              icon={Layers}
              title="Phase 3 (9-12)"
              what="TOFU adds retrieval density: base 1,770.16 reachable visits estimate-only."
              why="Long-tail breadth reinforces entity familiarity and supports BOFU conversions indirectly."
              next="Scale programmatic and educational clusters tied to core BOFU hubs."
            />
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="07" title="EXECUTION ROADMAP (AEO-FIRST)" />

          <HighlightBox className="mb-14">
            <p className="text-lg text-foreground leading-relaxed">
              Strategy sequence: <span className="text-primary font-semibold">Category lock first</span> (BOFU money entities),
              then retrieval density, then authority reinforcement. Do not invert this order.
            </p>
          </HighlightBox>

          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">
            <PhaseBlock number="01" icon={<Target className="w-4 h-4" />} label="Phase 1 — Months 0-3" title="Category Lock Foundation">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    What ships
                  </h4>
                  <BulletList items={phaseOneItems} />
                </div>
                <div className="border border-border bg-secondary/5 p-5">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Phase exit criteria</h5>
                  <p className="text-sm text-muted-foreground">
                    Kinso appears in at least 40% of tracked ChatGPT category prompts and shows first verified AIO citation
                    on at least one money-entity query (estimate-only operational target).
                  </p>
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="02" icon={<BarChart3 className="w-4 h-4" />} label="Phase 2 — Months 4-8" title="Comparison Engine + Authority Lift">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    What ships
                  </h4>
                  <BulletList items={phaseTwoItems} />
                </div>
                <div className="border border-border bg-secondary/5 p-5">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Phase exit criteria</h5>
                  <p className="text-sm text-muted-foreground">
                    Top BOFU pages rank in top-20 for primary non-branded terms in US + AU and AI mention rate improves
                    across non-branded prompts (estimate-only directional target).
                  </p>
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="03" icon={<Gauge className="w-4 h-4" />} label="Phase 3 — Months 9-12" title="Default Answer Acceleration">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    What ships
                  </h4>
                  <BulletList items={phaseThreeItems} />
                </div>
                <div className="border border-border bg-secondary/5 p-5">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Phase exit criteria</h5>
                  <p className="text-sm text-muted-foreground">
                    Kinso is repeatedly cited in cross-platform category prompts, not just branded prompts, and maintains
                    refreshed apex assets with stable citation frequency (estimate-only strategic target).
                  </p>
                </div>
              </div>
            </PhaseBlock>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="08" title="TAM × LTV CALCULATOR" />

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Interactive model below starts from base reachable visits ({formatNumber(10083.65)}) and lets Kinso plug in
            first-party LTV and visit-to-customer assumptions. All outputs are estimate-only.
          </p>

          <TamRoiCalculator
            baseReachableVisits={10083.65}
            defaultLtv={0}
            defaultVisitToCustomerRate={0.01}
            className="mb-4"
          />

          <div className="border border-border bg-secondary/5 p-5">
            <p className="text-sm text-muted-foreground">
              Revenue modeling requires client ACV/AOV and funnel inputs.
            </p>
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <SectionHeader number="09" title="ASSUMPTIONS & CONFIDENCE" />

          <DataTable
            headers={["Model Component", "Current Assumption", "Source / Note", "Confidence"]}
            rows={assumptionRows}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <HighlightBox>
              <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Methodology Notes</h3>
              <BulletList
                items={[
                  "TAM model version: tam_v1 with 12-month horizon; estimate-only outputs.",
                  "Formula used: ReachableDemand = SearchVolume × VisibilityCaptureRate × ChannelSplit × ChannelClickThrough.",
                  "Markets covered: US and AU only; no global extrapolation included.",
                  "AI visibility observations are directional and based on tested prompt set in payload.",
                  "No first-party calibration enabled in payload; model should be recalibrated after analytics integration.",
                ]}
              />
            </HighlightBox>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Confidence Readout</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <span className="text-foreground font-semibold">Research payload confidence:</span> 91 (high).
                </p>
                <p>
                  <span className="text-foreground font-semibold">TAM confidence:</span> 65 (medium).
                </p>
                <p>
                  <span className="text-foreground font-semibold">Why medium for TAM:</span> keyword universe is credible but still narrow,
                  MOFU layer is missing, and revenue inputs are absent.
                </p>
                <p>
                  <span className="text-foreground font-semibold">Next calibration step:</span> connect GA/GSC + CRM conversion data and rerun scenario bounds.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-foreground font-bold text-lg mb-4">90-Day Priority Sprint (operator checklist)</h3>
            <BulletList items={executiveActions} />
          </div>
        </section>

        <section>
          <SectionHeader number="10" title="NEXT STEPS" />

          <HighlightBox className="mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Kinso has a real window to own “Unified AI Inbox” — but only if execution starts with BOFU category prompts.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Today, entity awareness exists. Category authority does not. This strategy closes that gap with a sequence
              designed for measurable AI mention growth and non-branded demand capture.
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="border border-border bg-secondary/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Step 1</div>
              <p className="text-sm text-muted-foreground">Align on 15 money entities and publish the first 4 apex pages within 30 days.</p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Step 2</div>
              <p className="text-sm text-muted-foreground">Implement schema + Bing/IndexNow stack and launch monthly cross-LLM prompt tracking.</p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Step 3</div>
              <p className="text-sm text-muted-foreground">Run distribution loops for every apex asset to build citation trust outside kinso.ai.</p>
            </div>
          </div>

          <a
            href="https://cal.com/memetik/letstalk"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-primary bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-bold hover:bg-primary/90 transition-colors"
          >
            Book a Strategy Call
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </section>
      </main>
    </div>
  );
}