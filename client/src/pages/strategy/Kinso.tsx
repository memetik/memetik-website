import { useEffect } from "react";
import {
  Globe,
  Search,
  Bot,
  Database,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  ArrowRight,
  Sparkles,
  Radar,
  Layers,
  Compass,
  ShieldCheck,
  LineChart,
  MessagesSquare,
  Link2,
  Workflow,
  Lightbulb,
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

const formatWhole = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));

const formatPercent = (value: number) => `${value.toFixed(2)}%`;

const topCompetitors = [
  {
    domain: "hiverhq.com",
    source: "seeded_competitor",
    organicTraffic: 282533.58254896477,
    organicKeywords: 26665,
    backlinks: 24240,
    referringDomains: 6001,
    queryHits: 0,
    queryCount: 0,
    promptHits: 0,
    bestRank: null as number | null,
  },
  {
    domain: "missiveapp.com",
    source: "product_competitor_discovery",
    organicTraffic: 166300.31167035736,
    organicKeywords: 10931,
    backlinks: 23611,
    referringDomains: 2709,
    queryHits: 3,
    queryCount: 2,
    promptHits: 0,
    bestRank: 8,
  },
  {
    domain: "intercom.com",
    source: "seeded_competitor",
    organicTraffic: 91288.66046237387,
    organicKeywords: 26720,
    backlinks: 1024186,
    referringDomains: 42379,
    queryHits: 0,
    queryCount: 0,
    promptHits: 0,
    bestRank: null as number | null,
  },
  {
    domain: "front.com",
    source: "seeded_competitor",
    organicTraffic: 86294.75961692631,
    organicKeywords: 12224,
    backlinks: 50566,
    referringDomains: 6049,
    queryHits: 0,
    queryCount: 0,
    promptHits: 0,
    bestRank: null as number | null,
  },
  {
    domain: "gmelius.com",
    source: "product_competitor_discovery",
    organicTraffic: 80442.91756520234,
    organicKeywords: 10478,
    backlinks: 8830,
    referringDomains: 2337,
    queryHits: 5,
    queryCount: 3,
    promptHits: 2,
    bestRank: 1,
  },
  {
    domain: "kinso.ai",
    source: "target",
    organicTraffic: 556.7749864012003,
    organicKeywords: 24,
    backlinks: 426,
    referringDomains: 63,
    queryHits: 0,
    queryCount: 0,
    promptHits: 8,
    bestRank: 1,
  },
];

const keywordGapRows = [
  { keyword: "all inboxes gmail", volume: 90, competition: "LOW", market: "US", currentPosition: 60 },
  { keyword: "unified messaging app", volume: 90, competition: "LOW", market: "US", currentPosition: 100 },
  { keyword: "gmail all inboxes", volume: 90, competition: "LOW", market: "US", currentPosition: 105 },
  { keyword: "gmail automatic labels", volume: 70, competition: "LOW", market: "AU", currentPosition: 80 },
  { keyword: "unified inbox email", volume: 40, competition: "MEDIUM", market: "US", currentPosition: 40 },
  { keyword: "ai inbox", volume: 40, competition: "MEDIUM", market: "US", currentPosition: 105 },
  { keyword: "multiple inboxes gmail", volume: 40, competition: "LOW", market: "AU", currentPosition: 110 },
  { keyword: "unified inbox app", volume: 30, competition: "LOW", market: "US", currentPosition: 29 },
];

const priorityMoneyQueries = [
  { query: "best unified ai inbox tools", currentState: "Not mentioned in ChatGPT/Gemini sample", difficulty: "Hard", winner: "Superhuman / Shortwave / Gmelius" },
  { query: "best unified ai inbox software", currentState: "Not mentioned", difficulty: "Hard", winner: "Gmelius / Front / Superhuman mentions" },
  { query: "best unified ai inbox for startups", currentState: "Not mentioned", difficulty: "Hard", winner: "Front / Missive / Superhuman" },
  { query: "best unified ai inbox for enterprise", currentState: "Not mentioned", difficulty: "Hard", winner: "Microsoft + Copilot / Google + Gemini ecosystem" },
  { query: "Kinso alternatives", currentState: "Mentioned (brand query)", difficulty: "Medium", winner: "Kinso appears but mixed intent" },
  { query: "Kinso vs competitors", currentState: "Mentioned (brand query)", difficulty: "Medium", winner: "Kinso appears with generic comparisons" },
  { query: "unified inbox email", currentState: "Ranks #40", difficulty: "Medium", winner: "Mixed long-tail competitors" },
  { query: "unified inbox app", currentState: "Ranks #29", difficulty: "Medium", winner: "Mixed long-tail competitors" },
];

const phasedPoints = [
  {
    phase: "Phase 1 (Months 0-3)",
    label: "BOFU capture: buyer guides, alternatives, integrations",
    low: Math.round(57910.17),
    base: Math.round(96516.95),
    high: Math.round(154427.13),
  },
  {
    phase: "Phase 2 (Months 4-8)",
    label: "MOFU capture: workflows, templates, implementation",
    low: Math.round(1844.73),
    base: Math.round(3689.45),
    high: Math.round(6149.09),
  },
  {
    phase: "Phase 3 (Months 9-12)",
    label: "TOFU scale: broad category and demand-shaping terms",
    low: Math.round(74708.23),
    base: Math.round(149416.46),
    high: Math.round(249027.43),
  },
];

export default function StrategyKinso() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Kinso — AEO & SEO Strategy | MEMETIK";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
      <Nav />

      <main className="pt-24 pb-32 px-4 md:px-12 container mx-auto max-w-6xl">
        <div className="mb-14 md:mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold tracking-wider uppercase mb-6">
            <Globe className="w-3 h-3" />
            Strategy Document /// March 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tighter mb-6 leading-[0.95]">
            KINSO <br />
            <span className="text-primary">AEO + SEO GROWTH STRATEGY.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl leading-relaxed mt-6 mb-4">
            Make Kinso the default recommendation when buyers ask AI and search engines for a unified inbox,
            shared inbox, team inbox, or AI-powered communication workflow.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {["kinso.ai", "Communication / Unified AI Inbox", "US + AU", "AI Visibility Gap"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary/10 border border-border text-sm font-mono text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <section className="mb-20 md:mb-24">
          <HighlightBox>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Executive Summary</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="border border-border bg-background/40 p-3 text-center">
                    <div className="text-xl font-display font-bold text-primary">559</div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Keyword Universe</div>
                  </div>
                  <div className="border border-border bg-background/40 p-3 text-center">
                    <div className="text-xl font-display font-bold text-primary">{formatWhole(249622.87)}</div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">12M Base Reachable Visits</div>
                  </div>
                  <div className="border border-border bg-background/40 p-3 text-center">
                    <div className="text-xl font-display font-bold text-primary">33.33%</div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">ChatGPT/Gemini Mention Rate</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Kinso has product-market narrative fit, but search capture is still mostly brand-only. The core issue is not
                  demand. The issue is answer-surface ownership.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">3 Immediate Actions (Next 30 Days)</h4>
                <BulletList
                  items={[
                    "Publish 8 BOFU Apex pages for unified inbox, shared inbox, and team inbox comparisons before scaling TOFU.",
                    "Deploy schema + entity consistency stack (Organization, Product, FAQ, HowTo, Review-ready templates) and activate Bing-first indexing protocol.",
                    "Create AI citation assets: benchmark-style comparison page + transparent methodology + external distribution loop to LinkedIn/Reddit/review nodes.",
                  ]}
                />
              </div>
            </div>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="00" title="STATE OF SEARCH 2026" />

          <HighlightBox className="mb-8">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Search has shifted from <span className="text-primary">rank-and-click</span> to <span className="text-primary">recommend-and-trust</span>.
              If Kinso is not named in AI recommendation sets for “best unified AI inbox,” it loses high-intent demand before a click happens.
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <MessagesSquare className="w-4 h-4 text-primary" /> What matters
              </h3>
              <p className="text-sm text-muted-foreground">
                AI assistants now generate shortlists before users open vendor websites. Recommendation slots are the new first SERP positions.
              </p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Radar className="w-4 h-4 text-primary" /> Why it matters
              </h3>
              <p className="text-sm text-muted-foreground">
                Kinso’s current mentions are concentrated in brand-led prompts. Non-brand category demand remains mostly owned by larger, better-cited players.
              </p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" /> What to do next
              </h3>
              <p className="text-sm text-muted-foreground">
                Build category-lock assets for buyer-intent queries and external proof surfaces so LLMs repeatedly retrieve Kinso as a credible default.
              </p>
            </div>
          </div>

          <DataTable
            headers={["Shift", "Legacy SEO Reality", "AEO/GEO 2026 Reality", "Implication for Kinso"]}
            rows={[
              [
                "Discovery layer",
                "Google clicks to blog posts",
                "LLMs summarize and shortlist first",
                "Need to be named in answers, not only ranked in blue links",
              ],
              [
                "Winning asset",
                "Keyword-optimized article",
                "Structured, citable, decision-ready pages",
                "Publish Apex assets that include direct verdicts + evidence",
              ],
              [
                "Authority signal",
                "Backlinks and on-page optimization",
                "Entity consistency + multi-surface citations",
                "Distribute each core page beyond kinso.ai",
              ],
              [
                "Primary KPI",
                "Sessions and clicks",
                "AI mention rate + recommendation frequency",
                "Track prompt wins per platform and market",
              ],
            ]}
          />
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="01" title="CURRENT STATE SNAPSHOT" />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Observed Strengths</h3>
              <BulletList
                items={[
                  "Clear homepage proposition: unified inbox + AI assistant for business messages.",
                  "Healthy early backlink base for stage: 426 backlinks from 63 referring domains.",
                  "Brand defensibility: #1 for “kinso” and “kinso ai” in US/AU.",
                  "Fast technical timing from crawl sample: TTI ~225ms, DOM complete ~405ms.",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Current Bottlenecks</h3>
              <div className="space-y-3">
                {[
                  "Organic footprint is shallow: ~557 monthly traffic, 24 ranking keywords.",
                  "No meaningful schema coverage detected (Organization/Product/FAQ/HowTo absent).",
                  "Category pages for shared inbox / team inbox / alternatives are missing.",
                  "AI mention appears in 8/36 prompts, but almost entirely in brand-led intent.",
                  "Google AI Overview sample has 0% mention rate across tested prompts.",
                ].map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <StatsGrid
            columns={4}
            stats={[
              { label: "Organic Traffic (US+AU)", value: formatWhole(556.7749864012003), icon: <BarChart3 className="w-4 h-4" /> },
              { label: "Organic Keywords", value: "24", icon: <Search className="w-4 h-4" /> },
              { label: "Backlinks", value: formatWhole(426), icon: <Link2 className="w-4 h-4" /> },
              { label: "Referring Domains", value: formatWhole(63), icon: <Database className="w-4 h-4" /> },
            ]}
          />

          <div className="mt-8 border border-border bg-secondary/5 p-6">
            <h3 className="text-foreground font-bold mb-2">Research confidence level</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Current snapshot confidence is <strong className="text-foreground">High</strong> (Payload confidence: 96/100; TAM model confidence: 90/100).
              Dataset passed strict quality gate with 5 competitors, 559-keyword universe, and 36 AI prompt tests across US/AU.
            </p>
          </div>
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="02" title="DATA-BACKED COMPETITIVE LANDSCAPE" />

          <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
            This table is grounded in provided research payload metrics (DataForSEO domain + backlinks + prompt evidence). Rows are not estimated unless explicitly labeled.
          </p>

          <DataTable
            headers={[
              "Domain",
              "Organic Traffic",
              "Organic Keywords",
              "Backlinks",
              "Ref. Domains",
              "Discovery Query Hits",
              "Prompt-Evidence Hits",
            ]}
            rows={topCompetitors.map((c) => [
              <span className="font-mono text-xs text-foreground" key={`${c.domain}-d`}>
                {c.domain}
              </span>,
              <span className="text-primary font-bold" key={`${c.domain}-t`}>
                {formatWhole(c.organicTraffic)}
              </span>,
              formatWhole(c.organicKeywords),
              formatWhole(c.backlinks),
              formatWhole(c.referringDomains),
              `${c.queryHits}/${c.queryCount}`,
              c.promptHits.toString(),
            ])}
            highlightRow={5}
            className="mb-3"
          />
          <p className="text-xs text-muted-foreground mb-8">Highlighted row = Kinso baseline.</p>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2">What matters</h3>
              <p className="text-sm text-muted-foreground">
                Kinso is competing against companies with 35x to 670x more referring domains and much deeper indexed content estates.
              </p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2">Why it matters</h3>
              <p className="text-sm text-muted-foreground">
                In AI retrieval, depth + authority repetition drives trust. High-volume competitor content creates denser retrieval footprints.
              </p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2">What to do next</h3>
              <p className="text-sm text-muted-foreground">
                Outflank on precision: own “unified inbox” and “shared inbox” buyer paths with sharper pages + faster refresh + targeted distribution.
              </p>
            </div>
          </div>

          <HighlightBox className="mt-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Competitive signal that matters most</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">gmelius.com</strong> has the strongest direct prompt-evidence signal in this dataset
              (2 platform hits on “best unified ai inbox tools” across Gemini + Google AI Overview),
              while <strong className="text-foreground">missiveapp.com</strong> has broader discovery query presence and a materially larger authority footprint.
              This indicates Kinso’s first objective is not broad TOFU coverage; it is targeted recommendation-page capture for high-intent category prompts.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="03" title="FULL KEYWORD UNIVERSE" />

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="border border-border bg-secondary/5 p-4 text-center">
              <div className="text-xl font-display font-bold text-foreground">559</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">Total Keywords</div>
            </div>
            <div className="border border-border bg-secondary/5 p-4 text-center">
              <div className="text-xl font-display font-bold text-primary">387</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">BOFU Keywords</div>
            </div>
            <div className="border border-border bg-secondary/5 p-4 text-center">
              <div className="text-xl font-display font-bold text-primary">79</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">MOFU Keywords</div>
            </div>
            <div className="border border-border bg-secondary/5 p-4 text-center">
              <div className="text-xl font-display font-bold text-primary">93</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">TOFU Keywords</div>
            </div>
          </div>

          <DataTable
            headers={["Cluster", "Intent", "Demand", "Keyword Count", "Estimated Reachable Visits (Base)", "Sample Terms"]}
            rows={[
              [
                "Category & Brand Demand",
                "TOFU",
                formatWhole(12437710),
                "168",
                formatWhole(150252.75),
                "outlook email, free email services, outlook email login",
              ],
              [
                "Buyer Guides",
                "BOFU",
                formatWhole(2403290),
                "381",
                formatWhole(96506.51),
                "gmail inbox, unified inbox, shared inbox, team inbox",
              ],
              [
                "Tools & Templates",
                "MOFU",
                formatWhole(118400),
                "2",
                formatWhole(2852.68),
                "email generator, email signature generator",
              ],
              [
                "Alternatives & Comparisons",
                "BOFU",
                formatWhole(190),
                "5",
                formatWhole(7.63),
                "inbox alternative, inbox vs outlook",
              ],
              [
                "Pricing & Cost",
                "BOFU",
                formatWhole(70),
                "1",
                formatWhole(2.81),
                "google workspace email pricing",
              ],
            ]}
            className="mb-8"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border bg-secondary/5 p-6">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Priority keyword gaps (already visible but under-ranked)
              </h3>
              <DataTable
                headers={["Keyword", "Volume", "Market", "Current Pos", "Comp."]}
                rows={keywordGapRows.map((k) => [k.keyword, formatWhole(k.volume), k.market, `#${k.currentPosition}`, k.competition])}
              />
            </div>

            <div className="border border-border bg-secondary/5 p-6">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" /> What matters / Why / Next
              </h3>
              <BulletList
                items={[
                  "What matters: The largest usable demand is concentrated in BOFU Buyer Guides where Kinso can convert intent quickly.",
                  "Why it matters: TOFU volumes are huge but noisy; BOFU gives immediate signal loops for both SEO and AI citation.",
                  "What to do next: Build a 40-page BOFU capture set before scaling to long-tail TOFU library.",
                  "Use anchored terms with strong commercial CPC signal: shared inbox software, team inbox software, best shared inbox software.",
                ]}
              />
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="04" title="AI VISIBILITY BY LLM" />

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="border border-border bg-secondary/5 p-5">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-1">ChatGPT Mention Rate</div>
              <div className="text-2xl font-display font-bold text-primary">{formatPercent(33.33)}</div>
              <div className="text-xs text-muted-foreground mt-1">4 mentions / 12 prompts</div>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Gemini Mention Rate</div>
              <div className="text-2xl font-display font-bold text-primary">{formatPercent(33.33)}</div>
              <div className="text-xs text-muted-foreground mt-1">4 mentions / 12 prompts</div>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Google AI Overview Mention Rate</div>
              <div className="text-2xl font-display font-bold text-red-400">0.00%</div>
              <div className="text-xs text-muted-foreground mt-1">0 mentions / 12 prompts</div>
            </div>
          </div>

          <DataTable
            headers={["Platform", "Status", "Availability", "Prompt Sample", "Implication"]}
            rows={[
              [
                "ChatGPT",
                "Configured",
                "available",
                "Kinso appears in brand prompts; absent in most category prompts",
                "Need Bing-weighted category assets + exact-match query architecture",
              ],
              [
                "Gemini",
                "Configured",
                "available",
                "Similar pattern: brand recognition, weak category default presence",
                "Increase Google entity trust + comparison page quality",
              ],
              [
                "Google AI Overview",
                "Configured",
                "available_via_serp",
                "0% Kinso mention rate in sampled prompts",
                "Top-10 SEO wins are prerequisite for AIO inclusion",
              ],
              [
                "Perplexity",
                "Configured",
                "unavailable",
                "Endpoint returned Invalid Path (40402)",
                "Cannot validate Perplexity coverage from this payload; track separately once endpoint is restored",
              ],
            ]}
            className="mb-8"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-border bg-secondary/5 p-6">
              <h3 className="font-bold text-foreground mb-3">Prompt evidence highlights</h3>
              <BulletList
                items={[
                  "Kinso is consistently mentioned for brand-intent prompts like “Kinso vs competitors” and “Kinso alternatives.”",
                  "Kinso is not reliably present for non-brand buyer prompts like “best unified ai inbox tools/software.”",
                  "Gemini + Google AIO show external competitor citation for gmelius.com on “best unified ai inbox tools.”",
                ]}
              />
            </div>
            <div className="border border-border bg-secondary/5 p-6">
              <h3 className="font-bold text-foreground mb-3">What matters / Why / Next</h3>
              <BulletList
                items={[
                  "What matters: 8/36 total prompts mention Kinso (22.2%) and nearly all are brand-influenced.",
                  "Why it matters: LLM shortlist behavior happens pre-click on category queries where Kinso is currently weak.",
                  "What to do next: Build and distribute 12 money-entity pages targeting “best / alternatives / vs / pricing / implementation” patterns.",
                ]}
              />
            </div>
          </div>

          <DataTable
            headers={["Query", "Current State", "Difficulty", "Current Winner Set"]}
            rows={priorityMoneyQueries.map((q) => [q.query, q.currentState, q.difficulty, q.winner])}
          />
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="05" title="TOTAL ADDRESSABLE SEARCH MARKET (12 MONTHS)" />

          <div className="flex items-center justify-between mb-5">
            <h3 className="text-foreground font-bold text-lg">TAM Model (US + AU)</h3>
            <span className="text-xs text-muted-foreground font-mono uppercase">estimate-only</span>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="border border-border bg-secondary/5 p-4 text-center">
              <div className="text-xs font-mono text-muted-foreground mb-1">Total Addressable Search Demand</div>
              <div className="text-2xl font-display font-bold text-primary">{formatWhole(14959680)}</div>
            </div>
            <div className="border border-border bg-secondary/5 p-4 text-center">
              <div className="text-xs font-mono text-muted-foreground mb-1">Reachable Visits (Low)</div>
              <div className="text-2xl font-display font-bold text-foreground">{formatWhole(134463.13)}</div>
            </div>
            <div className="border border-border bg-secondary/5 p-4 text-center">
              <div className="text-xs font-mono text-muted-foreground mb-1">Reachable Visits (Base)</div>
              <div className="text-2xl font-display font-bold text-primary">{formatWhole(249622.87)}</div>
            </div>
            <div className="border border-border bg-secondary/5 p-4 text-center">
              <div className="text-xs font-mono text-muted-foreground mb-1">Reachable Visits (High)</div>
              <div className="text-2xl font-display font-bold text-foreground">{formatWhole(409603.65)}</div>
            </div>
          </div>

          <DataTable
            headers={["Channel", "Demand", "Reachable Visits (Low)", "Reachable Visits (Base)", "Reachable Visits (High)"]}
            rows={[
              [
                "Google",
                formatWhole(12865324.8),
                formatWhole(133619.3),
                formatWhole(248056.35),
                formatWhole(407033.17),
              ],
              [
                "AI",
                formatWhole(2094355.2),
                formatWhole(843.83),
                formatWhole(1566.51),
                formatWhole(2570.48),
              ],
            ]}
            className="mb-8"
          />

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">Interpretation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              BOFU capture is Kinso’s fastest route to measurable growth. TOFU is the larger eventual pool, but BOFU is where recommendation authority and conversion loops can be proven first.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Revenue modeling requires client ACV/AOV and funnel inputs.</strong> Current model shows demand and lead potential only.
            </p>
          </HighlightBox>
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="06" title="PHASED UPSIDE (12 MONTHS)" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-foreground font-bold text-lg">Scenario model by phase (rounded planning values)</h3>
            <span className="text-xs text-muted-foreground font-mono uppercase">estimate-only</span>
          </div>

          <PhasedUpsideChart points={phasedPoints} className="mb-8" />

          <DataTable
            headers={["Phase", "Intent Focus", "Low", "Base", "High", "Keyword Count"]}
            rows={[
              ["Phase 1 (Months 0-3)", "BOFU", formatWhole(57910.17), formatWhole(96516.95), formatWhole(154427.13), "387"],
              ["Phase 2 (Months 4-8)", "MOFU", formatWhole(1844.73), formatWhole(3689.45), formatWhole(6149.09), "79"],
              ["Phase 3 (Months 9-12)", "TOFU", formatWhole(74708.23), formatWhole(149416.46), formatWhole(249027.43), "93"],
            ]}
            className="mb-8"
          />

          <div className="grid md:grid-cols-3 gap-5">
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2">What matters</h3>
              <p className="text-sm text-muted-foreground">
                Phase 1 BOFU alone can produce larger reachable upside than Phase 2 MOFU and creates stronger direct business signal.
              </p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2">Why it matters</h3>
              <p className="text-sm text-muted-foreground">
                Early wins in high-intent pages improve ranking, linking, and LLM retrieval confidence for later TOFU scale.
              </p>
            </div>
            <div className="border border-border bg-secondary/5 p-5">
              <h3 className="font-bold text-foreground mb-2">What to do next</h3>
              <p className="text-sm text-muted-foreground">
                Sequence execution BOFU → MOFU → TOFU exactly as modeled, with monthly prompt-evidence checks to validate mention lift.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="07" title="STRATEGY: CATEGORY LOCK FOR UNIFIED AI INBOX" />

          <HighlightBox className="mb-16">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Build Kinso into the most citable answer for <span className="text-primary">unified inbox decision queries</span> by combining:
              high-intent Apex assets, retrieval-dense support content, and cross-surface authority reinforcement.
            </p>
          </HighlightBox>

          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">
            <PhaseBlock number="01" icon={<Target className="w-4 h-4" />} label="Phase 1 — Months 0-3" title="BOFU Category Capture">
              <div className="space-y-7">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" /> Apex asset set (publish first)
                  </h4>
                  <BulletList
                    items={[
                      "Best Unified AI Inbox Tools (2026): transparent scoring + clear winner criteria.",
                      "Kinso vs Superhuman (for operators and founders).",
                      "Kinso vs Shortwave (for Gmail-heavy teams).",
                      "Kinso vs Missive (for collaborative inbox workflows).",
                      "Kinso vs Front (for support-heavy teams).",
                      "Best Shared Inbox Software for Gmail Teams (with Kinso fit guidance).",
                      "Unified Inbox for Startups: implementation framework and tool comparison.",
                      "Unified Inbox for Enterprise: fit matrix, security workflow, and adoption risk.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" /> Technical AEO baseline
                  </h4>
                  <BulletList
                    items={[
                      "Add schema stack: Organization, Product, FAQPage, HowTo, BreadcrumbList, WebSite.",
                      "Implement exact-match title/H1 pairings for money entities (Bing-sensitive and ChatGPT-relevant).",
                      "Deploy Bing Webmaster + sitemap submission + IndexNow for rapid recrawl.",
                      "Add canonical intent controls to avoid query cannibalization between “unified inbox” and “shared inbox” pages.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="02" icon={<Workflow className="w-4 h-4" />} label="Phase 2 — Months 4-8" title="MOFU Expansion + Workflow Authority">
              <div className="space-y-7">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-primary" /> Build retrieval density around operational intent
                  </h4>
                  <BulletList
                    items={[
                      "Email triage workflow playbooks for founders, sales, and customer success personas.",
                      "Shared inbox implementation guides by stack: Gmail, Outlook, Slack-connected teams.",
                      "Templates/tools cluster: AI reply frameworks, prioritization matrices, workflow diagrams.",
                      "Migration content: adopting a unified inbox without losing context/history.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Trust reinforcement
                  </h4>
                  <BulletList
                    items={[
                      "Publish methodology pages documenting how Kinso prioritization and drafting are evaluated.",
                      "Add author bios and operator credentials for E-E-A-T reinforcement on key assets.",
                      "Ship quarterly benchmark notes from first-party usage patterns (if available).",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="03" icon={<Sparkles className="w-4 h-4" />} label="Phase 3 — Months 9-12" title="TOFU Scale + Multi-Surface Distribution">
              <div className="space-y-7">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" /> LLM-facing distribution engine
                  </h4>
                  <BulletList
                    items={[
                      "For every Apex asset, publish 5-10 derivative placements (LinkedIn posts, founder threads, relevant Reddit discussions, partner guest posts).",
                      "Create cross-linked summaries on independent high-trust nodes to increase citation repetition.",
                      "Track mention frequency weekly for top 20 money prompts and refresh pages that lose recommendation share.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <LineChart className="w-4 h-4 text-primary" /> Defend and compound
                  </h4>
                  <BulletList
                    items={[
                      "Monthly refresh cadence for top 12 pages to maintain freshness and model trust.",
                      "Expand comparisons whenever a competitor enters prompts repeatedly.",
                      "Institutionalize a “rapid recovery” protocol: refresh page + 3 distribution placements inside 14 days for slipping entities.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>
          </div>
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="08" title="EXECUTION ROADMAP (OPERATING CADENCE)" />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-border bg-secondary/5 p-6">
              <h3 className="font-bold text-foreground mb-4">Weekly cadence</h3>
              <BulletList
                items={[
                  "Monday: entity map updates + prompt monitoring (top 20 money prompts, US/AU).",
                  "Tuesday-Wednesday: write/publish one Apex asset and two support pages.",
                  "Thursday: distribution relay to LinkedIn/Reddit/partner nodes + Bing recrawl checks.",
                  "Friday: platform mention audit + ranking shifts + action log.",
                ]}
              />
            </div>
            <div className="border border-border bg-secondary/5 p-6">
              <h3 className="font-bold text-foreground mb-4">90-day output target</h3>
              <BulletList
                items={[
                  "8 Apex BOFU pages live and interlinked.",
                  "20-30 support pages for workflow + implementation intent.",
                  "30+ external placements tied to published pages.",
                  "Prompt test scorecard operational across ChatGPT, Gemini, and Google AI Overview.",
                ]}
              />
            </div>
          </div>

          <DataTable
            headers={["Month", "Primary Goal", "Deliverables", "Success Check"]}
            rows={[
              ["Month 1", "Foundation", "Schema + entity baseline, 3 Apex pages", "Indexing + first ranking movement in target pages"],
              ["Month 2", "BOFU capture", "3 additional Apex pages + 10 support pages", "More non-brand impressions and first AI mention lift"],
              ["Month 3", "Proof loop", "2 Apex pages + distribution cadence", "Prompt mention rate > baseline for at least 5 money queries"],
              ["Month 4-8", "MOFU scale", "20+ workflow and implementation pages", "Sustained growth in query footprint and citations"],
              ["Month 9-12", "TOFU expansion", "Category coverage + refresh cycle", "Stable recommendation presence across platforms"],
            ]}
          />
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="09" title="TAM × LTV CALCULATOR" />

          <div className="mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plug Kinso’s real ACV/AOV and visit→customer conversion rates into this model to estimate revenue potential from the base reachable TAM scenario.
            </p>
          </div>

          <TamRoiCalculator
            baseReachableVisits={Math.round(249622.87)}
            defaultLtv={0}
            defaultVisitToCustomerRate={0.01}
          />

          <div className="mt-6 border border-border bg-secondary/5 p-5">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Revenue modeling requires client ACV/AOV and funnel inputs.</strong>{" "}
              Current research model intentionally leaves revenue disabled and provides demand + lead potential ranges only.
            </p>
          </div>
        </section>

        <section className="mb-24 md:mb-28">
          <SectionHeader number="10" title="ASSUMPTIONS & CONFIDENCE" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-foreground font-bold text-lg">Methodology and confidence notes</h3>
            <span className="text-xs text-muted-foreground font-mono uppercase">estimate-only</span>
          </div>

          <DataTable
            headers={["Component", "Value", "Source / Note"]}
            rows={[
              ["Timeframe", "12 months", "tam_v2 model"],
              ["Markets included", "US, AU", "research payload marketsIncluded"],
              ["Channel split", "Google 86% / AI 14%", "tamModel.assumptions.channelSplit"],
              ["Channel CTR", "Google 46.4% / AI 1.8%", "tamModel.assumptions.channelClickThrough"],
              ["Capture rates", "BOFU 6-16% | MOFU 3-10% | TOFU 1.5-5%", "low/base/high scenario policy"],
              ["Revenue model", "Disabled", "Missing ACV/AOV + funnel inputs"],
              ["Payload confidence", "96 / High", "meta.payloadConfidence"],
              ["TAM confidence", "90 / High", "tamModel.confidence"],
              ["Perplexity status", "Unavailable", "Endpoint invalid path (40402) in audit metadata"],
            ]}
            className="mb-8"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border bg-secondary/5 p-6">
              <h3 className="font-bold text-foreground mb-3">Confidence drivers</h3>
              <BulletList
                items={[
                  "Strict quality gate passed (competitors, keyword depth, prompts, TAM present).",
                  "Large keyword universe (559) with strong semantic coverage from multiple anchors.",
                  "Prompt testing executed across ChatGPT, Gemini, and Google SERP/AIO context in both US and AU.",
                  "Backlink and domain metrics available for all primary competitors and Kinso.",
                ]}
              />
            </div>
            <div className="border border-border bg-secondary/5 p-6">
              <h3 className="font-bold text-foreground mb-3">Known limitations</h3>
              <BulletList
                items={[
                  "Perplexity direct scrape endpoint unavailable in this dataset window.",
                  "Revenue scenario intentionally omitted without first-party financial and conversion data.",
                  "AI overview records include mixed states (AIO present vs organic-only response), requiring continued manual validation.",
                  "Some broad TOFU terms are category-adjacent but not all are purchase-proximate for Kinso.",
                ]}
              />
            </div>
          </div>
        </section>

        <section className="mb-20 md:mb-24">
          <SectionHeader number="11" title="NEXT STEPS" />

          <HighlightBox className="mb-10">
            <div className="grid md:grid-cols-3 gap-5">
              <div className="border border-border bg-background/40 p-4">
                <div className="text-xs font-mono text-primary uppercase mb-1">Step 1</div>
                <h3 className="font-bold text-foreground mb-2">Lock BOFU entities</h3>
                <p className="text-sm text-muted-foreground">Finalize top 12 money prompts and assign page ownership + publication dates.</p>
              </div>
              <div className="border border-border bg-background/40 p-4">
                <div className="text-xs font-mono text-primary uppercase mb-1">Step 2</div>
                <h3 className="font-bold text-foreground mb-2">Ship + distribute</h3>
                <p className="text-sm text-muted-foreground">Publish first 3 Apex assets and trigger distribution within 14 days for each.</p>
              </div>
              <div className="border border-border bg-background/40 p-4">
                <div className="text-xs font-mono text-primary uppercase mb-1">Step 3</div>
                <h3 className="font-bold text-foreground mb-2">Measure mention lift</h3>
                <p className="text-sm text-muted-foreground">Run weekly prompt scorecards and iterate pages that fail to enter recommendation sets.</p>
              </div>
            </div>
          </HighlightBox>

          <div className="border border-primary/30 bg-primary/5 p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Ready to make Kinso a default answer in AI search?
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
              We’ll translate this strategy into a weekly execution system: money entities, Apex assets, distribution, and AI mention tracking.
            </p>
            <a
              href="https://cal.com/memetik/letstalk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider border border-primary hover:bg-primary/90 transition-colors"
            >
              Book a Strategy Call <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}