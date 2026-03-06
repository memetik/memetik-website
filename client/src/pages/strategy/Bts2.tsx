import { useEffect } from "react";
import {
  Globe,
  Bot,
  Search,
  BarChart3,
  Database,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Layers,
  Radar,
  Sparkles,
  ShieldCheck,
  Link2,
  LineChart,
  BrainCircuit,
  Gauge,
  Flag,
  Network,
  Compass,
  FileText,
  Microscope,
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

const company = {
  name: "Behind the Scenes",
  domain: "behindthescenes.com",
  category: "Creator Economy / Creator Platform",
  industry: "Creator Economy",
};

const seoSnapshot = {
  organicTraffic: 162,
  organicKeywords: 19,
  backlinks: 27577,
  referringDomains: 880,
  markets: {
    US: { organicTraffic: 158, organicKeywords: 18 },
    AU: { organicTraffic: 4, organicKeywords: 1 },
  },
};

const confidence = {
  tamScore: 90,
  tamLevel: "high",
  payloadScore: 94,
  payloadLevel: "high",
  qualityGatePassed: true,
  qualityGateMode: "strict",
  thresholds: {
    competitors: 3,
    keywords: 10,
    prompts: 6,
  },
  observed: {
    competitors: 5,
    keywords: 18,
    keywordUniverse: 539,
    mofuKeywords: 78,
    prompts: 36,
    aiPlatformsWithSamples: 3,
  },
};

const executiveStats = [
  { label: "Total Addressable Search Demand (US+AU, 12m)", value: "14,511,910" },
  { label: "Estimated Reachable Visits (Base Scenario)", value: "237,860" },
  { label: "AI Prompt Mention Coverage", value: "8 / 36" },
];

const immediateActions = [
  "Disambiguate entity: explicitly position Behind the Scenes as a creator monetization platform (not generic “behind the scenes” content).",
  "Publish BOFU comparison stack first: Patreon alternatives, Skool alternatives, Kajabi vs BTS, and creator platform pricing pages.",
  "Build AI citation footprint across Bing-indexed assets + external trust nodes (LinkedIn, review profiles, creator communities).",
];

const rankedKeywordRows = [
  ["behind scenes", "18,100", "#39", "Homepage", "TOFU / Branded-ambiguous"],
  ["behind the scenes", "20,000", "#41", "Homepage", "TOFU / Branded-ambiguous"],
  ["behind-the-scenes content", "70", "#44", "Homepage", "TOFU"],
  ["behind the scenes content", "70", "#55", "Homepage", "TOFU"],
  ["bts videographer", "1,600", "#63", "Homepage", "TOFU / Ambiguous acronym"],
  ["skool vs patreon", "70", "#21", "Blog comparison URL", "BOFU / Comparison"],
  ["work behind the scenes", "210", "#59", "Homepage", "TOFU"],
  ["what does bts stand for in business", "30", "#110", "Blog", "TOFU / Irrelevant drift"],
];

const competitorRows = [
  {
    domain: "behindthescenes.com",
    traffic: "162",
    keywords: "19",
    backlinks: "27,577",
    referringDomains: "880",
    promptHits: "8 / 36",
    notes: "Client domain (US+AU dataforseo + prompt sample)",
  },
  {
    domain: "kajabi.com",
    traffic: "79,194",
    keywords: "17,679",
    backlinks: "1,529,242",
    referringDomains: "40,224",
    promptHits: "0 / 0",
    notes: "Seeded competitor dataset; prompt evidence unavailable for direct mentions",
  },
  {
    domain: "patreon.com",
    traffic: "4,172,095",
    keywords: "598,893",
    backlinks: "454,284,402",
    referringDomains: "372,395",
    promptHits: "0 / 0",
    notes: "Seeded competitor dataset; massive category authority",
  },
  {
    domain: "skool.com",
    traffic: "208,627",
    keywords: "52,170",
    backlinks: "6,040,046",
    referringDomains: "73,244",
    promptHits: "0 / 0",
    notes: "Seeded competitor dataset",
  },
  {
    domain: "thinkific.com",
    traffic: "317,066",
    keywords: "87,229",
    backlinks: "29,934,849",
    referringDomains: "77,677",
    promptHits: "0 / 0",
    notes: "Seeded competitor dataset",
  },
  {
    domain: "teachable.com",
    traffic: "506,693",
    keywords: "81,847",
    backlinks: "15,841,175",
    referringDomains: "88,832",
    promptHits: "0 / 0",
    notes: "Seeded competitor dataset",
  },
];

const platformSummaryRows = [
  ["ChatGPT", "4 / 12", "33.33%", "US: 2/6 • AU: 2/6", "Available", "/v3/ai_optimization/chat_gpt/llm_scraper/live/advanced"],
  ["Gemini", "4 / 12", "33.33%", "US: 2/6 • AU: 2/6", "Available", "/v3/ai_optimization/gemini/llm_scraper/live/advanced"],
  ["Google AI Overviews", "0 / 12", "0.00%", "US: 0/6 • AU: 0/6", "Available via SERP", "/v3/serp/google/organic/live/advanced"],
  [
    "Perplexity",
    "N/A",
    "N/A",
    "N/A",
    "Unavailable",
    "/v3/ai_optimization/perplexity/llm_scraper/live/advanced (40402 Invalid Path)",
  ],
];

const promptEvidenceRows = [
  [
    "best creator platform tools",
    "US",
    "No",
    "No",
    "No",
    "Broad listicle answers; BTS absent",
  ],
  [
    "best creator platform software",
    "AU",
    "No",
    "No",
    "No",
    "Patreon/Kajabi-style ecosystems dominate framing",
  ],
  [
    "Behind the Scenes alternatives",
    "US",
    "Yes",
    "Yes",
    "No",
    "Entity interpreted as phrase synonym, not platform category win",
  ],
  [
    "Behind the Scenes vs competitors",
    "US",
    "Yes",
    "Yes",
    "No",
    "Mention appears when brand is explicit in prompt",
  ],
  [
    "best creator platform for startups",
    "US",
    "No",
    "No",
    "No",
    "Generic creator stacks; no BTS placement",
  ],
  [
    "best creator platform for enterprise",
    "US",
    "No",
    "No",
    "No",
    "Enterprise influencer tooling answers; no BTS placement",
  ],
];

const keywordUniverseSummary = {
  size: 539,
  anchorMatched: 224,
  semanticContributionDemand: "14,412,660",
  semanticShare: "99.32%",
  countsByIntent: [
    ["BOFU", "382", "Phase 1 priority", "Commercial / alternatives / comparisons"],
    ["MOFU", "78", "Phase 2 priority", "Workflows, implementation, education"],
    ["TOFU", "79", "Phase 3 priority", "Awareness + category framing"],
  ],
  countsBySource: [
    ["semantic_expansion", "520", "Large coverage, but includes broad email terms"],
    ["target_ranked_keywords", "18", "Existing performance baseline"],
    ["competitor_keywords", "1", "Minimal direct competitor import in final universe"],
  ],
};

const topOpportunityClusterRows = [
  [
    "Category & Brand Demand",
    "TOFU",
    "12,258,790",
    "154",
    "148,097",
    "outlook email, free email services, outlook email login",
  ],
  [
    "Buyer Guides",
    "BOFU",
    "2,208,370",
    "375",
    "88,679",
    "gmail inbox, inbox, hotmail inbox, email inbox",
  ],
  [
    "Tools & Templates",
    "MOFU",
    "44,400",
    "1",
    "1,070",
    "email signature generator",
  ],
  [
    "Alternatives & Comparisons",
    "BOFU",
    "260",
    "6",
    "10",
    "skool vs patreon, inbox vs gmail, collaborative inbox vs shared mailbox",
  ],
  [
    "Pricing & Cost",
    "BOFU",
    "70",
    "1",
    "3",
    "google workspace email pricing",
  ],
];

const tamTotals = {
  demand: "14,511,910",
  low: 127799,
  base: 237860,
  high: 390520,
  googleDemand: "12,480,243",
  aiDemand: "2,031,667",
  googleBase: 236367,
  aiBase: 1493,
};

const phasedPoints = [
  {
    phase: "Phase 1 (Months 0-3)",
    label: "BOFU capture: alternatives, comparisons, pricing + migration intent",
    low: 53216,
    base: 88693,
    high: 141908,
  },
  {
    phase: "Phase 2 (Months 4-8)",
    label: "MOFU expansion: workflows, implementation, education assets",
    low: 953,
    base: 1906,
    high: 3176,
  },
  {
    phase: "Phase 3 (Months 9-12)",
    label: "TOFU scale: category authority + disambiguated brand retrieval",
    low: 73631,
    base: 147261,
    high: 245436,
  },
];

const moneyEntityRows = [
  ["Best creator platform for creators", "Apex comparison page", "No consistent BTS inclusion in broad prompts"],
  ["Patreon alternatives", "Alternatives page + FAQ schema", "High-intent switch traffic"],
  ["Skool alternatives", "Alternatives page + side-by-side matrix", "Existing keyword signal already present"],
  ["Kajabi alternatives", "Alternatives + migration guide", "Competitive overlap with creator business stack"],
  ["Behind the Scenes vs Patreon", "Head-to-head comparison", "Entity disambiguation and conversion-focused"],
  ["Behind the Scenes pricing / fees", "Transparent pricing explainer", "Commercial trust + AI extractability"],
  ["Best creator platform for startups", "Use-case page", "Prompt evidence currently misses BTS"],
  ["Best creator platform for enterprise creators", "Segmented decision page", "Prompt evidence currently misses BTS"],
];

const phaseOneAssets = [
  "Behind the Scenes vs Patreon: transparent feature/fee comparison",
  "Behind the Scenes vs Skool: community economics breakdown",
  "Patreon alternatives for creators in 2026",
  "Skool alternatives for creator memberships",
  "Kajabi alternatives for creators selling subscriptions",
  "Best creator platform for coaches",
  "Best creator platform for education creators",
  "Creator platform pricing benchmark (BTS, Patreon, Kajabi, Skool, Thinkific, Teachable)",
  "How to migrate from Patreon to Behind the Scenes",
  "Behind the Scenes fees explained: payout math by scenario",
  "Creator platform comparison calculator page",
  "BTS category glossary (clear entity language for LLM retrieval)",
];

const phaseTwoAssets = [
  "Creator platform for finance educators",
  "Creator platform for fitness creators",
  "Creator platform for relationship coaches",
  "Creator platform for podcasters",
  "Creator platform for newsletter creators",
  "How to launch memberships without Patreon lock-in",
  "How to package exclusive content tiers",
  "Monetization playbooks by creator type (template pages)",
];

const distributionNodes = [
  "LinkedIn founder/operator POV posts linking to apex pages",
  "Creator economy community threads with non-spam educational participation",
  "Review platform profile hygiene and response cadence",
  "Creator interviews and case-study syndication",
  "Bing Webmaster Tools + IndexNow deployment to accelerate ChatGPT retrievability",
];

export default function StrategyBts2() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Behind the Scenes — SEO & AEO Strategy | MEMETIK";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
      <Nav />

      <main className="pt-24 pb-32 px-4 md:px-12 container mx-auto max-w-6xl">
        {/* Hero */}
        <div className="mb-14 md:mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold tracking-wider uppercase mb-6">
            <Globe className="w-3 h-3" />
            Strategy Document /// March 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tighter mb-6 leading-[0.95]">
            BEHIND THE SCENES <br />
            <span className="text-primary">SEO & AEO STRATEGY.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl leading-relaxed mt-6 mb-4">
            Category lock plan to make Behind the Scenes the default recommendation for creator monetization prompts across
            ChatGPT, Gemini, and Google AI search surfaces.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {[company.domain, company.industry, "US + AU", "Creator Monetization", "AEO-First Roadmap"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary/10 border border-border text-sm font-mono text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Executive Summary Strip */}
        <section className="mb-20 md:mb-24">
          <SectionHeader number="ES" title="EXECUTIVE SUMMARY" />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {executiveStats.map((stat) => (
              <div key={stat.label} className="bg-secondary/5 border border-border p-6">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Top 3 Immediate Actions</h3>
            <BulletList items={immediateActions} />
          </HighlightBox>
        </section>

        {/* 00 State of Search 2026 */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="00" title="STATE OF SEARCH 2026" />

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/5 border border-border p-5">
              <h3 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">What matters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discovery is increasingly answer-led. Buyers ask LLMs for “best platform” recommendations before visiting websites.
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h3 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">Why it matters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If Behind the Scenes is not named in shortlist prompts, category demand is captured by Patreon, Kajabi, Skool, and
                adjacent authority sites.
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h3 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">What to do next</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Build money-entity pages + external authority signals so LLMs retrieve BTS as an entity, not a generic phrase.
              </p>
            </div>
          </div>

          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Behind the Scenes currently gets mention lift only when the exact brand appears in the prompt, which means the brand can
              be retrieved, but it is not yet competitive on broad commercial query classes like <span className="text-foreground">“best creator platform software”</span> or{" "}
              <span className="text-foreground">“best creator platform for startups”</span>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is the core 2026 challenge: generic prompts are being won by incumbents with deeper content archives and stronger
              entity footprints. The opportunity is to build retrieval density and answer authority fast while the category is still
              structurally fragmented.
            </p>
          </div>
        </section>

        {/* 01 Current State Snapshot */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="01" title="CURRENT STATE SNAPSHOT" />

          <HighlightBox className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Snapshot Metrics (US + AU)</h3>
            <StatsGrid
              stats={[
                { label: "Organic Traffic", value: `${seoSnapshot.organicTraffic}/mo`, icon: <LineChart className="w-4 h-4" /> },
                { label: "Ranking Keywords", value: `${seoSnapshot.organicKeywords}`, icon: <Search className="w-4 h-4" /> },
                { label: "Backlinks", value: `${seoSnapshot.backlinks.toLocaleString()}`, icon: <Link2 className="w-4 h-4" /> },
                { label: "Referring Domains", value: `${seoSnapshot.referringDomains}`, icon: <Network className="w-4 h-4" /> },
              ]}
            />
            <div className="mt-6 border-t border-border/40 pt-4 text-xs text-muted-foreground font-mono">
              Confidence: <span className="text-foreground">High</span> ({confidence.tamScore}/100 TAM model, {confidence.payloadScore}/100 payload).
              Quality gate: <span className="text-foreground">{confidence.qualityGatePassed ? "Passed" : "Failed"}</span> ({confidence.qualityGateMode} mode).
            </div>
          </HighlightBox>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">What’s working</h3>
              <BulletList
                items={[
                  "Strong backlink and referring domain baseline for a smaller traffic footprint (27,577 backlinks, 880 referring domains).",
                  "Existing category comparison signal exists via “skool vs patreon” content ranking at position #21.",
                  "Homepage messaging is monetization-oriented and conversion-aware.",
                  "Fast interaction timing baseline (TTI ~1.25s from on-page audit timing).",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-primary mb-3">What’s blocking growth</h3>
              <BulletList
                items={[
                  "Keyword set is mostly brand-ambiguous (“behind the scenes”) rather than commercial creator-platform entities.",
                  "No schema types detected in on-page audit output (missed extraction opportunities for LLMs and rich search).",
                  "Only 19 ranking keywords despite substantial backlink footprint.",
                  "AI visibility on broad creator-platform prompts is low; current mention rate is prompt-dependent and non-defensive.",
                ]}
              />
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-4 text-lg">Top Current Ranking Keywords</h3>
          <DataTable
            headers={["Keyword", "Search Volume", "Current Position", "Ranking URL", "Intent / Notes"]}
            rows={rankedKeywordRows}
            className="mb-4"
          />
          <p className="text-xs text-muted-foreground">
            Data source: DataForSEO ranked keyword snapshot (US + AU). Ranking set indicates high entity ambiguity and low commercial depth.
          </p>
        </section>

        {/* 02 Competitive Landscape */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="02" title="DATA-BACKED COMPETITIVE LANDSCAPE" />

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/5 border border-border p-5">
              <h4 className="text-sm font-mono uppercase text-primary tracking-wider mb-2">What matters</h4>
              <p className="text-sm text-muted-foreground">You are competing with category-scale domains, not just direct startups.</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h4 className="text-sm font-mono uppercase text-primary tracking-wider mb-2">Why it matters</h4>
              <p className="text-sm text-muted-foreground">Authority gaps in traffic, keyword breadth, and referring domains shape LLM trust and citations.</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h4 className="text-sm font-mono uppercase text-primary tracking-wider mb-2">What to do next</h4>
              <p className="text-sm text-muted-foreground">Target high-intent query classes where incumbents are broad but not deeply specialized.</p>
            </div>
          </div>

          <DataTable
            headers={[
              "Domain",
              "Organic Traffic",
              "Ranking Keywords",
              "Backlinks",
              "Ref. Domains",
              "Prompt-Evidence Hits",
              "Evidence Notes",
            ]}
            rows={competitorRows.map((c) => [
              <span className="text-foreground font-mono text-xs" key={c.domain}>
                {c.domain}
              </span>,
              c.traffic,
              c.keywords,
              c.backlinks,
              c.referringDomains,
              c.promptHits,
              c.notes,
            ])}
            highlightRow={0}
            className="mb-6"
          />

          <HighlightBox>
            <div className="flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground block mb-1">Interpretation note</strong>
                Competitor prompt-hit counts are <span className="text-foreground">0/0 in this payload</span> because direct per-domain prompt extraction
                did not return matched query evidence in the competitor evidence object. Traffic, keyword, backlink, and referring-domain values are valid from
                DataForSEO domain/backlink snapshots and should be treated as the grounding layer for competitive authority analysis.
              </div>
            </div>
          </HighlightBox>
        </section>

        {/* 03 Full Keyword Universe */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="03" title="FULL KEYWORD UNIVERSE" />

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-secondary/5 border border-border p-4 text-center">
              <div className="text-2xl font-display font-bold text-foreground">{keywordUniverseSummary.size}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Total Keywords</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4 text-center">
              <div className="text-2xl font-display font-bold text-foreground">{keywordUniverseSummary.anchorMatched}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Anchor Matched</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4 text-center">
              <div className="text-2xl font-display font-bold text-foreground">{keywordUniverseSummary.semanticContributionDemand}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Semantic Demand Contribution</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4 text-center">
              <div className="text-2xl font-display font-bold text-primary">{keywordUniverseSummary.semanticShare}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Semantic Demand Share</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-foreground font-bold mb-3">Intent Breakdown</h3>
              <DataTable
                headers={["Intent", "Keyword Count", "Roadmap Priority", "Why It Matters"]}
                rows={keywordUniverseSummary.countsByIntent}
              />
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-3">Source Breakdown</h3>
              <DataTable
                headers={["Source", "Keyword Count", "Commentary"]}
                rows={keywordUniverseSummary.countsBySource}
              />
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-3">Opportunity Clusters (from TAM model)</h3>
          <DataTable
            headers={["Cluster", "Intent", "Demand", "Keyword Count", "Base Reachable Visits", "Sample Terms"]}
            rows={topOpportunityClusterRows}
            className="mb-6"
          />

          <HighlightBox>
            <div className="flex gap-3 items-start">
              <Microscope className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground block mb-1">Critical keyword-universe caveat</strong>
                The universe includes substantial high-volume email/inbox semantics (e.g. “outlook email”, “gmail inbox”) that are not tightly aligned to
                core creator platform intent. This inflates total TAM if used without filtering. Strategy should prioritize the creator-platform money-entity
                subset first, then selectively expand into adjacent monetization/creator workflow intents.
              </div>
            </div>
          </HighlightBox>
        </section>

        {/* 04 AI Visibility by LLM */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="04" title="AI VISIBILITY BY LLM" />

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Bot className="w-4 h-4" />
                <span className="text-sm font-mono uppercase tracking-wider">ChatGPT</span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">33.33%</p>
              <p className="text-xs text-muted-foreground mt-1">Mention rate (4/12 prompts)</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary mb-2">
                <BrainCircuit className="w-4 h-4" />
                <span className="text-sm font-mono uppercase tracking-wider">Gemini</span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">33.33%</p>
              <p className="text-xs text-muted-foreground mt-1">Mention rate (4/12 prompts)</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Search className="w-4 h-4" />
                <span className="text-sm font-mono uppercase tracking-wider">Google AIO</span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">0.00%</p>
              <p className="text-xs text-muted-foreground mt-1">Mention rate (0/12 prompts)</p>
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-3">Platform Status + Availability</h3>
          <DataTable
            headers={["Platform", "Mentions", "Mention Rate", "Market Split", "Status", "Endpoint / Source"]}
            rows={platformSummaryRows}
            className="mb-8"
          />

          <h3 className="text-foreground font-bold mb-3">Prompt Evidence Highlights</h3>
          <DataTable
            headers={["Query", "Market", "ChatGPT", "Gemini", "Google AIO", "Observed Behavior"]}
            rows={promptEvidenceRows.map((r) => [
              <span className="font-mono text-xs text-foreground" key={`${r[0]}-${r[1]}`}>
                {r[0]}
              </span>,
              r[1],
              r[2],
              r[3],
              r[4],
              r[5],
            ])}
            className="mb-6"
          />

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What this means</h3>
            <BulletList
              items={[
                "BTS is retrievable when users already know the brand; it is not the default answer for category-level buying prompts.",
                "Perplexity pathway in this payload is unavailable (40402 invalid path), so current LLM coverage excludes a major discovery surface.",
                "Google AI Overviews returning 0/12 mention rate indicates weak inclusion in Google’s answer-layer extraction for target query set.",
                "The core objective is moving from prompt-dependent mention to consistent shortlist inclusion on non-branded commercial queries.",
              ]}
            />
          </HighlightBox>
        </section>

        {/* 05 TAM */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="05" title="TOTAL ADDRESSABLE SEARCH MARKET (12 MONTHS)" />

          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Scope: US + AU • Method: TAM v2 modeled estimate • Horizon: 12 months
            </p>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">estimate-only</span>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-secondary/5 border border-border p-4 text-center">
              <div className="text-xs font-mono text-muted-foreground mb-1">Total Addressable Demand</div>
              <div className="text-2xl font-display font-bold text-foreground">{tamTotals.demand}</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4 text-center">
              <div className="text-xs font-mono text-muted-foreground mb-1">Reachable Visits (Low)</div>
              <div className="text-2xl font-display font-bold text-foreground">{tamTotals.low.toLocaleString()}</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4 text-center">
              <div className="text-xs font-mono text-muted-foreground mb-1">Reachable Visits (Base)</div>
              <div className="text-2xl font-display font-bold text-primary">{tamTotals.base.toLocaleString()}</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4 text-center">
              <div className="text-xs font-mono text-muted-foreground mb-1">Reachable Visits (High)</div>
              <div className="text-2xl font-display font-bold text-foreground">{tamTotals.high.toLocaleString()}</div>
            </div>
          </div>

          <DataTable
            headers={["Channel", "Demand", "Base Reachable Visits", "Notes"]}
            rows={[
              ["Google", tamTotals.googleDemand, tamTotals.googleBase.toLocaleString(), "86% channel split modeled; strongest near-term lever"],
              ["AI Search", tamTotals.aiDemand, tamTotals.aiBase.toLocaleString(), "14% channel split modeled; critical for future category lock"],
            ]}
            className="mb-6"
          />

          <HighlightBox>
            <div className="flex gap-3 items-start">
              <Gauge className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground block mb-1">Revenue modeling status</strong>
                Revenue modeling requires client ACV/AOV and funnel inputs. Current payload has revenueModel disabled and only supports
                traffic + pipeline potential scenarios.
              </div>
            </div>
          </HighlightBox>
        </section>

        {/* 06 Phased Upside */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="06" title="PHASED UPSIDE (12 MONTHS)" />

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">Modeled upside by rollout phase and intent family</p>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">estimate-only</span>
          </div>

          <PhasedUpsideChart points={phasedPoints} className="mb-8" />

          <DataTable
            headers={["Phase", "Intent Focus", "Keyword Count", "Low", "Base", "High"]}
            rows={[
              [
                "Phase 1 (Months 0-3)",
                "BOFU",
                "382",
                phasedPoints[0].low.toLocaleString(),
                phasedPoints[0].base.toLocaleString(),
                phasedPoints[0].high.toLocaleString(),
              ],
              [
                "Phase 2 (Months 4-8)",
                "MOFU",
                "78",
                phasedPoints[1].low.toLocaleString(),
                phasedPoints[1].base.toLocaleString(),
                phasedPoints[1].high.toLocaleString(),
              ],
              [
                "Phase 3 (Months 9-12)",
                "TOFU",
                "79",
                phasedPoints[2].low.toLocaleString(),
                phasedPoints[2].base.toLocaleString(),
                phasedPoints[2].high.toLocaleString(),
              ],
            ]}
          />
        </section>

        {/* 07 Strategy */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="07" title="STRATEGY: CATEGORY LOCK FOR CREATOR PLATFORM QUERIES" />

          <HighlightBox className="mb-10">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Build an entity-first AEO system so “Behind the Scenes” resolves as a{" "}
              <span className="text-primary">creator monetization platform</span>, not a generic phrase.
            </p>
          </HighlightBox>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-3">What matters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Money entities (best, alternatives, vs, pricing) create shortlists where conversions happen.
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-3">Why it matters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prompt evidence shows brand retrieval but weak category-level recommendation power.
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-3">What to do next</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ship BOFU apex assets first, then MOFU expansion, then TOFU authority with strict internal linking.
              </p>
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-3">Priority Money Entity Map</h3>
          <DataTable
            headers={["Money Query", "Asset Type", "Reason"]}
            rows={moneyEntityRows}
            className="mb-10"
          />

          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Apex Assets (Phase 1)
              </h3>
              <BulletList items={phaseOneAssets} />
            </div>
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                Expansion Assets (Phase 2+)
              </h3>
              <BulletList items={phaseTwoAssets} />
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-3">Platform-Specific AEO Tactics</h3>
          <DataTable
            headers={["Platform", "Primary Source", "Tactic"]}
            rows={[
              [
                "ChatGPT",
                "Bing index + structured content",
                "Bing Webmaster Tools + IndexNow + exact-match BOFU titles + FAQ schema deployment",
              ],
              [
                "Gemini",
                "Google Search + entity graph",
                "Entity-consistent brand language, schema depth, and comparison pages in top-10 organic",
              ],
              [
                "Google AI Overviews",
                "Top-10 organic citations",
                "Prioritize pages with direct-answer intros, comparison tables, and method sections",
              ],
              [
                "Perplexity",
                "Unavailable in current dataset path",
                "Fix API path issue; meanwhile execute Reddit/community signal plan for future inclusion testing",
              ],
            ]}
            className="mb-8"
          />

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Authority & Distribution Nodes</h3>
            <BulletList items={distributionNodes} />
          </HighlightBox>
        </section>

        {/* 08 Execution Protocol */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="08" title="EXECUTION PROTOCOL" />

          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">
            <PhaseBlock
              number="01"
              icon={<Compass className="w-4 h-4" />}
              label="Phase 1 — Months 0-3"
              title="Entity Correction + BOFU Capture"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    Technical & Structure
                  </h4>
                  <BulletList
                    items={[
                      "Implement schema baseline (Organization, WebSite, FAQPage, BreadcrumbList, Article).",
                      "Normalize title/H1/meta patterns around creator monetization entities.",
                      "Build clear URL taxonomy: /compare/, /alternatives/, /pricing/, /use-cases/.",
                      "Submit refreshed XML sitemaps to Google + Bing; deploy IndexNow.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Content Sprint
                  </h4>
                  <BulletList
                    items={[
                      "Publish 8-12 apex BOFU pages from the money-entity map.",
                      "Answer query intent in first 40-60 words on every page.",
                      "Add comparison tables, decision criteria, FAQs, and explicit verdict sections.",
                      "Link every BOFU page to one high-conversion CTA path.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock
              number="02"
              icon={<Radar className="w-4 h-4" />}
              label="Phase 2 — Months 4-8"
              title="MOFU Expansion + Retrieval Density"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Query-Class Coverage
                  </h4>
                  <BulletList
                    items={[
                      "Build 30-60 supporting MOFU pages for creator segments and workflows.",
                      "Launch problem-solution hubs (migration, monetization setup, tier strategy, payout optimization).",
                      "Create internal link loops: support page → apex page → conversion page.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Authority Signals
                  </h4>
                  <BulletList
                    items={[
                      "Strengthen external trust nodes: creator interviews, contributor bylines, and platform listings.",
                      "Codify brand entity consistency across site and external profiles.",
                      "Run monthly prompt-set audits to measure movement from mention to recommendation.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock
              number="03"
              icon={<BarChart3 className="w-4 h-4" />}
              label="Phase 3 — Months 9-12"
              title="TOFU Scale + AI Defense"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Flag className="w-4 h-4 text-primary" />
                    Category Defense
                  </h4>
                  <BulletList
                    items={[
                      "Expand into broader TOFU category prompts while preserving creator-platform relevance guardrails.",
                      "Refresh underperforming apex assets quarterly with new proof and competitor deltas.",
                      "Protect winning entities with multi-surface presence (owned + earned + community).",
                      "Track prompt win-rate across US and AU markets and recalibrate monthly.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>
          </div>
        </section>

        {/* 09 TAM x LTV Calculator */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="09" title="TAM × LTV CALCULATOR" />
          <TamRoiCalculator
            baseReachableVisits={tamTotals.base}
            defaultLtv={0}
            defaultVisitToCustomerRate={0.01}
            className="mb-4"
          />
          <p className="text-xs text-muted-foreground">
            Revenue modeling requires client ACV/AOV and funnel inputs.
          </p>
        </section>

        {/* 10 Assumptions & Confidence */}
        <section className="mb-20 md:mb-28">
          <SectionHeader number="10" title="ASSUMPTIONS & CONFIDENCE" />

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Methodology: ReachableDemand = SearchVolume × VisibilityCaptureRate × ChannelSplit × ChannelClickThrough
            </p>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">estimate-only</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3">Model Assumptions</h3>
              <BulletList
                items={[
                  "Channel split: Google 86%, AI search 14%.",
                  "Channel CTR: Google 0.464, AI 0.018.",
                  "Capture rates by intent: BOFU (6-16%), MOFU (3-10%), TOFU (1.5-5%).",
                  "Horizon fixed at 12 months; US and AU markets only.",
                  "All figures are planning estimates and require first-party calibration before commitments.",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3">Confidence Signals</h3>
              <BulletList
                items={[
                  `TAM confidence: ${confidence.tamScore}/100 (${confidence.tamLevel}).`,
                  `Research payload confidence: ${confidence.payloadScore}/100 (${confidence.payloadLevel}).`,
                  "Quality gate passed under strict mode with thresholds exceeded on competitors, keywords, and prompts.",
                  "Prompt evidence sampled across ChatGPT, Gemini, and Google AIO.",
                  "Revenue model disabled due to missing ACV/AOV inputs; pipeline-only framing currently available.",
                ]}
              />
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-3">Quality Gate Check</h3>
          <DataTable
            headers={["Metric", "Threshold", "Observed", "Status"]}
            rows={[
              ["Competitors", String(confidence.thresholds.competitors), String(confidence.observed.competitors), "Pass"],
              ["Ranked Keywords", String(confidence.thresholds.keywords), String(confidence.observed.keywords), "Pass"],
              ["Prompt Samples", String(confidence.thresholds.prompts), String(confidence.observed.prompts), "Pass"],
              ["Keyword Universe", "N/A", String(confidence.observed.keywordUniverse), "Pass"],
              ["Platforms With Samples", "N/A", String(confidence.observed.aiPlatformsWithSamples), "Pass"],
            ]}
            className="mb-8"
          />

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Known Data Constraints</h3>
            <BulletList
              items={[
                "Perplexity endpoint returned 40402 Invalid Path, so platform-specific visibility is currently unmeasured in this payload.",
                "LLM mentions endpoint returned 40400 Not Found; direct mentions-by-domain matrix unavailable.",
                "Keyword universe has large semantic expansion from inbox/email terms; strategy should enforce category relevance filters.",
                "First-party conversion and monetary inputs were not provided; revenue scenarios remain intentionally disabled.",
              ]}
            />
          </HighlightBox>
        </section>

        {/* 11 CTA */}
        <section className="mb-8">
          <SectionHeader number="11" title="NEXT STEPS" />

          <div className="bg-secondary/5 border border-border p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              If you want, we can execute this with your team in weekly sprints.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              First sprint focus: entity correction, BOFU money pages, schema layer, Bing + Google indexing, and prompt tracking baseline.
              Goal: move from prompt-dependent mentions to repeatable shortlist inclusion in commercial creator platform queries.
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