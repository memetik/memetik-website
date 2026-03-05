import { useEffect } from "react";
import {
  Globe,
  Bot,
  Search,
  AlertTriangle,
  CheckCircle,
  Target,
  Database,
  Share2,
  RotateCw,
  ArrowRight,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Layers,
  Workflow,
  Radar,
  FileSearch,
  Link2,
  Clock3,
  Building2,
  MessagesSquare,
  Gauge,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { SectionHeader, HighlightBox, PhaseBlock, BulletList, DataTable, StatsGrid } from "@/components/strategy";

const rankedKeywords = [
  {
    keyword: "kinso",
    volume: 210,
    position: 1,
    cpc: "6.51",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "kinso ai",
    volume: 70,
    position: 1,
    cpc: "Data unavailable in current payload",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "kimso",
    volume: 260,
    position: 8,
    cpc: "Data unavailable in current payload",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "oneinbox ai",
    volume: 30,
    position: 23,
    cpc: "Data unavailable in current payload",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "unified inbox app",
    volume: 30,
    position: 29,
    cpc: "9.35",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "knso",
    volume: 90,
    position: 31,
    cpc: "Data unavailable in current payload",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "unified inbox email",
    volume: 40,
    position: 40,
    cpc: "25.23",
    competition: "MEDIUM",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "ai for messages",
    volume: 30,
    position: 41,
    cpc: "3.89",
    competition: "HIGH",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "all inboxes gmail",
    volume: 90,
    position: 60,
    cpc: "Data unavailable in current payload",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "so ai",
    volume: 140,
    position: 70,
    cpc: "8.27",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "tiktok inbox app",
    volume: 40,
    position: 82,
    cpc: "Data unavailable in current payload",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "slack sort by priority",
    volume: 30,
    position: 91,
    cpc: "Data unavailable in current payload",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "ai kin",
    volume: 1000,
    position: 100,
    cpc: "0.16",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "unified messaging app",
    volume: 90,
    position: 100,
    cpc: "21.94",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "ai inbox",
    volume: 40,
    position: 105,
    cpc: "40.44",
    competition: "MEDIUM",
    url: "https://www.kinso.ai/",
  },
  {
    keyword: "gmail all inboxes",
    volume: 90,
    position: 105,
    cpc: "Data unavailable in current payload",
    competition: "LOW",
    url: "https://www.kinso.ai/",
  },
];

const keywordGaps = [
  { keyword: "so ai", volume: 140, competition: "LOW" },
  { keyword: "all inboxes gmail", volume: 90, competition: "LOW" },
  { keyword: "unified messaging app", volume: 90, competition: "LOW" },
  { keyword: "gmail all inboxes", volume: 90, competition: "LOW" },
  { keyword: "tiktok inbox app", volume: 40, competition: "LOW" },
  { keyword: "unified inbox email", volume: 40, competition: "MEDIUM" },
  { keyword: "ai inbox", volume: 40, competition: "MEDIUM" },
  { keyword: "slack sort by priority", volume: 30, competition: "LOW" },
  { keyword: "unified inbox app", volume: 30, competition: "LOW" },
];

const competitors = [
  {
    domain: "microsoft.com",
    avgPosition: 33.22,
    traffic: 158721351.34,
    keywords: 6656625,
    paidTraffic: 226449.13,
    paidKeywords: 112,
    source: "DataForSEO competitors_domain",
  },
  {
    domain: "substack.com",
    avgPosition: 53.14,
    traffic: 67201508.73,
    keywords: 20732073,
    paidTraffic: 0,
    paidKeywords: 0,
    source: "DataForSEO competitors_domain",
  },
  {
    domain: "spikenow.com",
    avgPosition: 41.14,
    traffic: 107618.74,
    keywords: 18702,
    paidTraffic: 0,
    paidKeywords: 0,
    source: "DataForSEO competitors_domain",
  },
  {
    domain: "beeper.com",
    avgPosition: 32.43,
    traffic: 111409.71,
    keywords: 25178,
    paidTraffic: 0,
    paidKeywords: 0,
    source: "DataForSEO competitors_domain",
  },
  {
    domain: "medium.com",
    avgPosition: 49.67,
    traffic: 90248154.52,
    keywords: 14829707,
    paidTraffic: 28.05,
    paidKeywords: 4,
    source: "DataForSEO competitors_domain",
  },
  {
    domain: "superhuman.com",
    avgPosition: 32.67,
    traffic: 181199.73,
    keywords: 30072,
    paidTraffic: 370.81,
    paidKeywords: 5,
    source: "DataForSEO competitors_domain",
  },
  {
    domain: "zapier.com",
    avgPosition: 46.83,
    traffic: 7624374.88,
    keywords: 474295,
    paidTraffic: 2.84,
    paidKeywords: 1,
    source: "DataForSEO competitors_domain",
  },
  {
    domain: "missiveapp.com",
    avgPosition: 35.33,
    traffic: 160021.11,
    keywords: 10137,
    paidTraffic: 0,
    paidKeywords: 0,
    source: "DataForSEO competitors_domain",
  },
];

const aiPromptResults = [
  {
    query: "best unified ai inbox tools",
    platform: "ChatGPT",
    kinsoMentioned: "No",
    observedLeaders: "Superhuman, Front (from response preview)",
    confidence: "High confidence (explicitly named competitors)",
    source: "Prompt test 2026-03-05",
  },
  {
    query: "best unified ai inbox software",
    platform: "ChatGPT",
    kinsoMentioned: "No",
    observedLeaders: "Front, Missive (from response preview)",
    confidence: "High confidence (explicitly named competitors)",
    source: "Prompt test 2026-03-05",
  },
  {
    query: "best unified ai inbox for startups",
    platform: "ChatGPT",
    kinsoMentioned: "No",
    observedLeaders: "Front (from response preview)",
    confidence: "Medium confidence (partial response preview)",
    source: "Prompt test 2026-03-05",
  },
  {
    query: "best unified ai inbox for enterprise",
    platform: "ChatGPT",
    kinsoMentioned: "No",
    observedLeaders: "Front (from response preview)",
    confidence: "Medium confidence (partial response preview)",
    source: "Prompt test 2026-03-05",
  },
  {
    query: "unified ai inbox comparison",
    platform: "ChatGPT",
    kinsoMentioned: "No",
    observedLeaders: "Front (from response preview)",
    confidence: "Medium confidence (partial response preview)",
    source: "Prompt test 2026-03-05",
  },
  {
    query: "how to choose unified ai inbox platform",
    platform: "ChatGPT",
    kinsoMentioned: "No",
    observedLeaders: "No specific winner named in payload excerpt",
    confidence: "Low confidence (advisory response excerpt only)",
    source: "Prompt test 2026-03-05",
  },
  {
    query: "Kinso alternatives",
    platform: "ChatGPT",
    kinsoMentioned: "Yes (as clarification target only)",
    observedLeaders: "No alternatives returned",
    confidence: "High confidence (response asks clarifying question)",
    source: "Prompt test 2026-03-05",
  },
  {
    query: "Kinso vs competitors",
    platform: "ChatGPT",
    kinsoMentioned: "Yes (as clarification target only)",
    observedLeaders: "No competitors returned",
    confidence: "High confidence (response asks clarifying question)",
    source: "Prompt test 2026-03-05",
  },
];

const formatNum = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return `${Math.round(num)}`;
};

const ConfidenceBadge = ({ level, score }: { level: string; score: number }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-border text-xs font-mono uppercase tracking-wider text-muted-foreground">
    <ShieldCheck className="w-3 h-3 text-primary" />
    Research Confidence: {level} ({score}/100)
  </div>
);

export default function StrategyKinso() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Kinso — AEO & SEO Strategy | MEMETIK";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
      <Nav />

      <main className="pt-24 pb-32 px-4 md:px-12 container mx-auto max-w-5xl">
        {/* Hero */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold tracking-wider uppercase mb-6">
            <Globe className="w-3 h-3" />
            Strategy Document /// March 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tighter mb-6 leading-[0.95]">
            KINSO <br />
            <span className="text-primary">AEO & SEO STRATEGY.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl leading-relaxed mt-6 mb-4">
            Make Kinso the default recommendation when buyers ask ChatGPT, Gemini, Perplexity, and Google AI Overviews about unified inbox tools, AI inbox software, and cross-channel message prioritization.
          </p>

          <div className="flex flex-wrap gap-3 mt-6 mb-6">
            {[
              "kinso.ai",
              "Communication / Collaboration",
              "Unified AI Inbox",
              "Location: Data unavailable in current payload",
              "Research mode: strict",
            ].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary/10 border border-border text-sm font-mono text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          <ConfidenceBadge level="medium" score={74} />
        </div>

        {/* State of Search 2026 */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="00" title="STATE OF SEARCH 2026" />

          <HighlightBox className="mb-8">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              In 2026, the buying journey starts in answer engines. If Kinso is not named in AI-generated shortlists for “best unified AI inbox tools,” demand is lost before a click ever happens.
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">What changed</h3>
              <BulletList
                items={[
                  "Buyers now ask for recommendations directly in ChatGPT, Perplexity, Gemini, and Google AI Overviews.",
                  "AEO success = being named and cited, not only getting organic clicks.",
                  "Model training windows are active now; authority built in the next 9–15 months compounds.",
                  "Traditional SEO alone misses non-Google answer surfaces where high-intent decisions are made.",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">Platform mechanics Kinso must align to</h3>
              <BulletList
                items={[
                  "ChatGPT retrieval is heavily influenced by Bing index coverage and structured clarity.",
                  "Perplexity citations are heavily influenced by Reddit and open-web references.",
                  "Google AI Overviews overwhelmingly cite top-10 organic pages; rank + completeness matter.",
                  "Entity trust (consistent brand facts across web surfaces) impacts recommendation frequency.",
                ]}
              />
            </div>
          </div>

          <StatsGrid
            stats={[
              { label: "ChatGPT citation overlap with Bing top-10", value: "87%", icon: <Search className="w-4 h-4" /> },
              { label: "Google AIO citations from top-10 organic", value: "93.67%", icon: <BarChart3 className="w-4 h-4" /> },
              { label: "Cross-platform presence lift (4+ surfaces)", value: "2.8x", icon: <Layers className="w-4 h-4" /> },
              { label: "Semantic completeness AI inclusion lift", value: "340%", icon: <Sparkles className="w-4 h-4" /> },
            ]}
            columns={4}
          />

          <p className="text-xs text-muted-foreground mt-4">
            Context stats sourced from Memetik 2026 AEO Playbook benchmarking. They define strategic direction; company-specific diagnostics below come from the provided Kinso research payload.
          </p>
        </section>

        {/* Current State Snapshot */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="01" title="CURRENT STATE SNAPSHOT" />

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-secondary/5 border border-border p-4">
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase">Organic Traffic</div>
              <div className="text-2xl font-display font-bold text-foreground">95.47/mo</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4">
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase">Organic Keywords</div>
              <div className="text-2xl font-display font-bold text-foreground">16</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4">
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase">Paid Keywords</div>
              <div className="text-2xl font-display font-bold text-foreground">0</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4">
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase">Schema Types Detected</div>
              <div className="text-2xl font-display font-bold text-foreground">0</div>
            </div>
          </div>

          <div className="bg-secondary/5 border border-border p-6 md:p-8 mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What is working</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Brand capture exists: 'kinso' and 'kinso ai' rank #1, meaning branded intent can find the product.",
                "Homepage messaging is clear on proposition: unified inbox + AI assistant for business messages.",
                "On-page copy depth is not thin for a homepage (724 words), giving enough semantic surface to expand from.",
                "Research quality gate passed in strict mode (competitors, keyword volume, prompt set all above thresholds).",
              ].map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <HighlightBox className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What is missing (highest priority gaps)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "AI shortlist invisibility: Kinso is not mentioned for core category prompts like 'best unified ai inbox tools'.",
                "No detected schema types on audited page (Organization/FAQ/SoftwareApplication/HowTo missing).",
                "Non-branded rankings are weak: most category keywords sit between positions 29 and 105.",
                "Only 16 ranking keywords today, limiting retrieval density for answer engines.",
                "Backlinks and referring domains are unavailable in current payload, creating measurement blind spots.",
                "PageSpeed API data is unavailable (quota exceeded), so performance confidence is partial.",
                "No evidence in payload of comparison pages, alternatives pages, or dedicated use-case pages.",
                "AI mentions endpoint failed in payload (DataForSEO llm_mentions 404), requiring manual augmentation.",
              ].map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </HighlightBox>

          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">Confidence statement</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This strategy is based on a <span className="text-foreground font-semibold">medium-confidence payload (74/100)</span>. The core directional findings are strong because keyword, prompt, and competitor coverage all passed strict thresholds. However, two key datasets are incomplete: backlink/referring-domain data and live PSI performance metrics.
            </p>
            <BulletList
              items={[
                "Confidence in AI-visibility diagnosis: High (8 direct prompt tests show repeat non-mention).",
                "Confidence in keyword opportunity mapping: Medium-high (16 ranked + 9 explicit gaps in payload).",
                "Confidence in authority-gap quantification: Medium-low until backlink/referring-domain data is filled.",
                "Immediate next action: run supplemental Ahrefs/SEMrush + refreshed PSI to complete baseline.",
              ]}
            />
          </div>
        </section>

        {/* Competitive Landscape */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="02" title="DATA-BACKED COMPETITIVE LANDSCAPE" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            The table below uses only competitors returned by the research payload. Rows are not fabricated; each competitor appears in DataForSEO competitor-domain output. Where metrics are absent in payload (e.g., backlinks, referring domains), fields are explicitly marked unavailable.
          </p>

          <DataTable
            headers={[
              "Competitor Domain",
              "Avg Position (Overlap Set)",
              "Organic Traffic",
              "Organic Keywords",
              "Paid Traffic",
              "Research Source",
            ]}
            rows={competitors.map((c) => [
              <span className="text-foreground font-mono text-xs" key={`${c.domain}-d`}>
                {c.domain}
              </span>,
              c.avgPosition.toFixed(2),
              <span className="text-primary font-bold whitespace-nowrap" key={`${c.domain}-t`}>
                {formatNum(c.traffic)}/mo
              </span>,
              `${formatNum(c.keywords)}`,
              `${formatNum(c.paidTraffic)}`,
              c.source,
            ])}
            highlightRow={6}
            className="mb-4"
          />
          <p className="text-xs text-muted-foreground mb-10">
            Highlighted row: zapier.com, because it demonstrates an important distribution play — Kinso can earn mentions via integration ecosystems and educational middleware content, not only by direct “inbox app” pages.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Interpretation: who actually competes for AI answers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The competitor set mixes enterprise platforms (Microsoft), publishing networks (Medium, Substack), productivity SaaS (Superhuman, Missive), and messaging-unification tools (Beeper, Spike). This indicates the SERP/entity space is still fluid: answer engines are synthesizing from broad sources, not a locked “single category” map. That is good news for Kinso — category lock is still available.
              </p>
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Radar className="w-4 h-4 text-primary" />
                Interpretation: what this means operationally
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kinso cannot win by waiting for the market to define itself. It needs to define the category language itself: “unified AI inbox,” “AI inbox for founders,” “cross-channel priority inbox,” “Slack + Gmail + social triage.” The brand that publishes canonical comparisons and decision frameworks first will become the retrieval default.
              </p>
            </div>
          </div>

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Data availability caveat</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Backlinks and referring domains are <strong className="text-foreground">Data unavailable in current payload</strong> for Kinso and competitors. Next action: run link profile extraction in Ahrefs or DataForSEO backlinks API to quantify authority deficits and prioritize digital PR targets by gap magnitude.
            </p>
          </HighlightBox>
        </section>

        {/* AI Visibility Audit */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="03" title="AI VISIBILITY AUDIT (CHATGPT PROMPT TESTS)" />

          <HighlightBox className="mb-8">
            <div className="flex gap-4 items-start">
              <Bot className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-lg md:text-xl font-display font-medium text-foreground mb-2">
                  Kinso is currently <span className="text-primary">category-invisible</span> in ChatGPT for commercial discovery prompts.
                </p>
                <p className="text-sm text-muted-foreground">
                  In the payload’s 8 prompt tests, Kinso only appears when directly named — and even then as a clarification request, not as a recommended solution.
                </p>
              </div>
            </div>
          </HighlightBox>

          <DataTable
            headers={[
              "Prompt",
              "Platform",
              "Kinso Mentioned?",
              "Observed Leaders (from payload preview)",
              "Confidence",
              "Source",
            ]}
            rows={aiPromptResults.map((r) => [
              <span key={r.query} className="text-foreground font-mono text-xs">
                {r.query}
              </span>,
              r.platform,
              r.kinsoMentioned === "No" ? (
                <span className="text-red-400 font-semibold">No</span>
              ) : (
                <span className="text-yellow-300 font-semibold">Clarification-only</span>
              ),
              r.observedLeaders,
              r.confidence,
              r.source,
            ])}
            className="mb-8"
          />

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/5 border border-border p-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Commercial prompt visibility</div>
              <div className="text-2xl font-display font-bold text-red-400 mt-1">0 / 6</div>
              <div className="text-xs text-muted-foreground mt-1">No inclusion in category-buying prompts</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Branded prompt handling</div>
              <div className="text-2xl font-display font-bold text-yellow-300 mt-1">2 / 2</div>
              <div className="text-xs text-muted-foreground mt-1">Mentioned only as ambiguous entity</div>
            </div>
            <div className="bg-secondary/5 border border-border p-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">AI mention endpoint status</div>
              <div className="text-2xl font-display font-bold text-muted-foreground mt-1">40400</div>
              <div className="text-xs text-muted-foreground mt-1">Data unavailable via DataForSEO llm_mentions</div>
            </div>
          </div>

          <div className="bg-secondary/5 border border-border p-6">
            <h3 className="text-foreground font-bold mb-3">Immediate implication</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Kinso is not yet established as an entity in the “best unified AI inbox” decision space. Competitors like Front, Superhuman, and Missive are occupying answer slots because they have stronger retrieval footprints: more indexable supporting content, broader mention surfaces, and clearer category labeling.
            </p>
            <BulletList
              items={[
                "Priority #1: build canonical category pages that answer commercial prompts in first 40–60 words.",
                "Priority #2: publish comparison + alternatives assets so models have explicit competitive framing to retrieve.",
                "Priority #3: distribute each apex page to external nodes (LinkedIn, Medium, Reddit, integration partner ecosystems).",
                "Priority #4: normalize entity references across web profiles to reduce ambiguity when users ask for 'Kinso alternatives' or 'Kinso vs competitors'.",
              ]}
            />
          </div>
        </section>

        {/* Keyword Opportunity */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="04" title="KEYWORD & QUERY OPPORTUNITY MAP" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Current footprint is mostly branded or low-position category terms. The upside is high: multiple commercial-intent keywords with medium/low competition are already in the ranking profile, but mostly outside page one.
          </p>

          <DataTable
            headers={["Keyword", "Volume", "Current Position", "CPC (USD)", "Competition", "Landing URL"]}
            rows={rankedKeywords.map((k) => [
              <span key={k.keyword} className="text-foreground font-mono text-xs">
                {k.keyword}
              </span>,
              `${k.volume}`,
              k.position <= 10 ? (
                <span className="text-primary font-semibold">#{k.position}</span>
              ) : (
                <span className="text-muted-foreground">#{k.position}</span>
              ),
              k.cpc,
              k.competition,
              <span key={`${k.keyword}-u`} className="text-muted-foreground font-mono text-xs">
                {k.url}
              </span>,
            ])}
            className="mb-8"
          />

          <h3 className="text-foreground font-bold mb-3 text-lg">Explicit keyword gaps from payload</h3>
          <DataTable
            headers={["Gap Keyword", "Volume", "Competition", "Why It Matters for AEO"]}
            rows={keywordGaps.map((g) => [
              <span key={g.keyword} className="text-foreground font-mono text-xs">
                {g.keyword}
              </span>,
              `${g.volume}`,
              g.competition,
              g.keyword.includes("unified")
                ? "Direct category-language alignment; supports canonical entity retrieval."
                : g.keyword.includes("gmail") || g.keyword.includes("slack")
                  ? "Integration/use-case framing increases practical intent and AI recommendation relevance."
                  : "Long-tail support page candidate to build retrieval density.",
            ])}
            className="mb-8"
          />

          <HighlightBox className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Most important insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The highest-CPC term in the payload is <span className="text-foreground font-semibold">“ai inbox” (CPC 40.44, position 105)</span>. That is exactly the signal of high commercial value: advertisers pay aggressively when queries correlate with buyer intent. Ranking from #105 to top-10 here is not just SEO lift — it is direct demand capture for both search engines and AI summaries.
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary/5 border border-border p-6">
              <h4 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-primary" />
                Query clusters Kinso should own first
              </h4>
              <BulletList
                items={[
                  "Best unified AI inbox tools",
                  "Unified inbox software for startups",
                  "Unified inbox software for enterprise teams",
                  "AI inbox comparison",
                  "Unified inbox email tools",
                  "Slack + Gmail + social unified inbox",
                  "AI message prioritization software",
                  "Alternative to Front for unified inbox",
                  "Alternative to Superhuman for multi-channel teams",
                  "Missive alternatives with AI triage",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h4 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-primary" />
                Rank-to-mention conversion logic
              </h4>
              <BulletList
                items={[
                  "Move category pages into organic top-10 to improve Google AIO inclusion probability.",
                  "Add concise answer blocks and table-first layouts so LLMs can extract clean summaries.",
                  "Deploy FAQ schema + comparison schema candidates for richer retrieval signals.",
                  "Create explicit verdict sections on all money pages (who it is for, who it is not for).",
                  "Refresh top pages monthly to defend freshness and model memory.",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Strategy */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="05" title="STRATEGY: CATEGORY LOCK FOR 'UNIFIED AI INBOX'" />

          <HighlightBox className="mb-12">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Kinso should execute a two-track system: <span className="text-primary">Apex Assets for commercial prompts</span> +{" "}
              <span className="text-primary">Knowledge Graph pages for retrieval density</span>. Every asset must make Kinso easier to cite, easier to compare, and easier to trust across ChatGPT, Perplexity, Gemini, and Google AIO.
            </p>
          </HighlightBox>

          <div className="space-y-6">
            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-lg font-display font-bold text-foreground mb-3">Tier 1 — Apex Assets (first 10 pages)</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                These are direct money-query pages. Build these first because they influence both bottom-funnel conversions and AI shortlist representation.
              </p>
              <BulletList
                items={[
                  "Best Unified AI Inbox Tools (2026): Detailed, criteria-driven ranking with transparent methodology.",
                  "Kinso vs Front: Feature-depth, workflow speed, AI triage quality, best-fit profiles.",
                  "Kinso vs Superhuman: Multi-channel use cases vs email acceleration use cases.",
                  "Kinso vs Missive: Team collaboration, assignment flows, message context handling.",
                  "Front Alternatives for AI-First Teams (with Kinso placement).",
                  "Superhuman Alternatives for Multi-Channel Teams.",
                  "What Is a Unified AI Inbox? (Category-defining canonical page).",
                  "AI Inbox for Startups: Decision framework + implementation checklist.",
                  "AI Inbox for Enterprise: Security, routing, governance considerations.",
                  "Slack + Gmail + Social in One Inbox: Practical setup and operating model.",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-lg font-display font-bold text-foreground mb-3">Tier 2 — Comparison Matrix Expansion (20–40 pages)</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Expand “vs” and “alternatives” coverage so answer engines repeatedly see Kinso in competitive contexts.
              </p>
              <BulletList
                items={[
                  "Comparison pages per buyer segment: support teams, founder-led teams, operations managers, agencies.",
                  "Use-case comparisons: high-volume inbound, executive inbox triage, cross-platform client communication.",
                  "Integration comparisons: Gmail-first stack, Slack-heavy stack, social-DM-heavy stack.",
                  "Latency/response-quality scoring table format on every comparison page.",
                  "Consistent closing verdict with “Best for” by scenario.",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-lg font-display font-bold text-foreground mb-3">Tier 3 — Knowledge Graph (150–300 pages over time)</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Programmatic but useful long-tail pages to improve retrieval density. Each page must contain at least one unique paragraph and one clear CTA.
              </p>
              <BulletList
                items={[
                  "Template: “Best unified inbox for {industry} teams”.",
                  "Template: “How to prioritize {channel} messages with AI”.",
                  "Template: “{Tool A} vs {Tool B} for {team type}”.",
                  "Template: “Unified inbox for {region} startups” (if market expansion data becomes available).",
                  "Mandatory internal link pattern: each page links to 1–2 apex assets + one product CTA.",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-lg font-display font-bold text-foreground mb-3">Tier 4 — Authority Distribution (external trust relay)</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Every apex asset triggers derivative placements to build third-party proof signals.
              </p>
              <BulletList
                items={[
                  "LinkedIn founder/executive breakdown post with condensed comparison findings.",
                  "Medium/Substack educational version with neutral benchmark framing.",
                  "Reddit participation in productivity + founder ops communities (non-promotional, evidence-first).",
                  "Integration ecosystem content (Zapier, Slack community resources where applicable).",
                  "Guest posts: “How teams triage multi-channel communication in 2026”.",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Platform Tactics */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="06" title="PLATFORM-SPECIFIC AEO TACTICS" />

          <DataTable
            headers={["Platform", "Primary Data Source", "Kinso Gap Today", "Execution Tactic"]}
            rows={[
              [
                "ChatGPT",
                "Bing index + web retrieval",
                "No inclusion in core discovery prompts",
                "Bing Webmaster setup, IndexNow deployment, exact-match title/H1 for money pages, FAQ schema on apex assets.",
              ],
              [
                "Perplexity",
                "Reddit + open web citations",
                "No measured presence in payload",
                "Reddit seeding through genuine Q&A, publish evidence-led comparison threads, secure citations from independent posts.",
              ],
              [
                "Google AI Overviews",
                "Top-10 Google organic",
                "Most category terms rank beyond page one",
                "Top-10 campaign on 'ai inbox', 'unified inbox email', and core comparison entities with semantic completeness upgrades.",
              ],
              [
                "Gemini",
                "Google search + entity signals",
                "Entity ambiguity on branded prompts",
                "Entity consistency across About page, social bios, profile listings, and organization schema.",
              ],
              [
                "Claude",
                "Brave/web crawl data",
                "No direct data in current payload",
                "Ensure crawlability + indexation, publish clear answer-first pages, maintain external references.",
              ],
            ]}
            className="mb-8"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-primary" />
                Technical AEO checklist (Month 1)
              </h3>
              <BulletList
                items={[
                  "Implement Organization + WebSite + SoftwareApplication schema.",
                  "Add FAQPage schema to each apex asset with 5–10 high-intent FAQs.",
                  "Deploy XML sitemap with clear segmentation for /comparisons, /alternatives, /guides.",
                  "Configure robots.txt with explicit crawl access for core asset directories.",
                  "Register Bing Webmaster Tools and submit sitemap separately from Google.",
                  "Implement IndexNow for instant URL discovery in Bing-supported systems.",
                  "Add canonical tags and prevent cannibalization between similar comparison pages.",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                <MessagesSquare className="w-4 h-4 text-primary" />
                Entity clarity checklist (Month 1–2)
              </h3>
              <BulletList
                items={[
                  "Create a dedicated “What is Kinso?” explainer page for disambiguation.",
                  "Use consistent brand naming: 'Kinso' + 'Kinso AI' alignment across all properties.",
                  "Publish team bylines with role credentials on category pages.",
                  "Create “Kinso alternatives” and “Kinso vs {competitor}” pages to control branded comparisons.",
                  "Synchronize company description across LinkedIn, product directories, and support docs.",
                  "Add concise company facts block in footer and About page for machine parsing.",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Execution protocol */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="07" title="EXECUTION PROTOCOL (90-DAY OPERATOR PLAN)" />

          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">
            <PhaseBlock number="01" icon={<Target className="w-4 h-4" />} label="Phase 1 — Days 1-21" title="Foundation + Entity Fixes">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-primary" />
                    Deliverables
                  </h4>
                  <BulletList
                    items={[
                      "Bing Webmaster verification + sitemap submission.",
                      "IndexNow live for new and updated content URLs.",
                      "Core schema deployment: Organization, WebSite, SoftwareApplication.",
                      "Branded disambiguation page: 'What is Kinso?'",
                      "Analytics baseline model with AI mention tracking sheet.",
                      "Supplemental data pull to fill missing backlinks/referring domains and PSI metrics.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-primary" />
                    Exit criteria
                  </h4>
                  <BulletList
                    items={[
                      "All technical foundations validated in Search Console + Bing Webmaster.",
                      "Schema tested and passing on homepage + 2 test content templates.",
                      "Confidence score upgraded from medium to high via missing-data closure.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="02" icon={<Database className="w-4 h-4" />} label="Phase 2 — Days 22-45" title="Apex Asset Sprint (10 flagship pages)">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-primary" />
                    Deliverables
                  </h4>
                  <BulletList
                    items={[
                      "Publish the 10 priority apex pages listed in Section 05.",
                      "Each page includes direct answer in first 60 words + quick comparison table.",
                      "Each page contains methodology, criteria, verdict, and FAQ block.",
                      "Internal links from homepage and nav to top commercial pages.",
                      "Monthly refresh protocol documented (owner, cadence, fields to update).",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary" />
                    Exit criteria
                  </h4>
                  <BulletList
                    items={[
                      "At least 10 high-intent pages indexable and internally linked.",
                      "Initial rank movement on 3 priority terms: 'ai inbox', 'unified inbox email', 'unified messaging app'.",
                      "Branded comparison prompts return concrete Kinso context (not clarification-only responses).",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="03" icon={<Share2 className="w-4 h-4" />} label="Phase 3 — Days 46-75" title="Authority Distribution + Mentions Engine">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <MessagesSquare className="w-4 h-4 text-primary" />
                    Deliverables
                  </h4>
                  <BulletList
                    items={[
                      "For each apex asset, publish 3 derivative pieces across LinkedIn/Medium/Reddit.",
                      "Create comparison snippets tailored for founder and support-lead audiences.",
                      "Build repeatable distribution SOP: publish → extract insights → republish with canonical link back.",
                      "Acquire first wave of third-party mentions from relevant productivity/ops communities.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Radar className="w-4 h-4 text-primary" />
                    Exit criteria
                  </h4>
                  <BulletList
                    items={[
                      "External mention footprint exists across minimum 4 surfaces.",
                      "ChatGPT prompt retest shows first signs of category inclusion on at least 1 core prompt.",
                      "Perplexity and Google AIO checks initiated with baseline tracking.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>

            <PhaseBlock number="04" icon={<RotateCw className="w-4 h-4" />} label="Phase 4 — Days 76-90+" title="Scale Knowledge Graph + Defend Winners">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    Deliverables
                  </h4>
                  <BulletList
                    items={[
                      "Launch 50–100 knowledge-graph pages from approved templates.",
                      "Set monthly content refresh cycle for top 15 pages.",
                      "Detect and consolidate cannibalized pages via canonical/merge actions.",
                      "Run quarterly competitor benchmark refresh with same prompt pack.",
                      "Document win/loss prompts and root causes for each.",
                    ]}
                  />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Exit criteria
                  </h4>
                  <BulletList
                    items={[
                      "Kinso appears in AI responses for at least 30% of priority prompt set.",
                      "At least 5 commercial pages in top-20 rankings, with progression trend to top-10.",
                      "Established update loop prevents regression from stale comparisons.",
                    ]}
                  />
                </div>
              </div>
            </PhaseBlock>
          </div>
        </section>

        {/* KPI projections */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="08" title="PROJECTED OUTCOMES (SCENARIO-BASED)" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Projections below are model-based operational targets, not guaranteed outcomes. They use current payload baseline (traffic 95.47, keywords 16, category-prompt visibility near zero) plus expected uplift from consistent execution.
          </p>

          <DataTable
            headers={["Metric", "Now (Payload)", "6 Months Target", "12 Months Target", "Assumption Basis"]}
            rows={[
              [
                "Organic ranking keywords",
                "16",
                "120–220",
                "300–600",
                "Apex + comparison + programmatic roll-out with internal link architecture.",
              ],
              [
                "Organic traffic (monthly)",
                "95.47",
                "1,200–3,000",
                "5,000–12,000",
                "Top-20 to top-10 movement on commercial terms + long-tail retrieval density.",
              ],
              [
                "Commercial prompt AI mention rate (priority set)",
                "0% category prompts",
                "15–30%",
                "35–60%",
                "Distribution + entity clarity + improved ranking footprint.",
              ],
              [
                "Branded prompt clarity",
                "Clarification-only behavior",
                "Named product with category context",
                "Named + compared with clear positioning",
                "Disambiguation pages + third-party references + structured entity signals.",
              ],
              [
                "Top-10 presence on target terms ('ai inbox', 'unified inbox email', related)",
                "0 in top-10 (payload terms)",
                "2–4 terms",
                "6–12 terms",
                "Monthly refresh and query-specific page optimization.",
              ],
            ]}
            highlightRow={2}
            className="mb-8"
          />

          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Success definition for Kinso</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The strategic win is not “more blog posts.” The win is: when someone asks “best unified AI inbox tools,” Kinso is repeatedly named in shortlist responses, appears in comparison contexts, and owns enough organic surface area that Google AI Overviews and other answer engines can cite it with confidence.
            </p>
          </HighlightBox>
        </section>

        {/* Risks and dependencies */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="09" title="RISKS, DEPENDENCIES, AND DATA GAPS" />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3">Known data gaps from payload</h3>
              <BulletList
                items={[
                  "Backlinks: Data unavailable in current payload.",
                  "Referring domains: Data unavailable in current payload.",
                  "PageSpeed Insights detailed CWV: unavailable due API quota 429.",
                  "Cross-platform AI mention frequency endpoint unavailable (DataForSEO llm_mentions 40400).",
                ]}
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6">
              <h3 className="text-foreground font-bold mb-3">Required next actions to close gaps</h3>
              <BulletList
                items={[
                  "Run immediate supplemental authority crawl (Ahrefs/SEMrush/DataForSEO backlinks API).",
                  "Re-run PSI with valid quota and capture LCP/CLS/INP baselines.",
                  "Expand prompt testing to Gemini, Perplexity, Claude with same query set.",
                  "Set monthly AI mention panel with scored prompts and screenshot archive.",
                ]}
              />
            </div>
          </div>

          <DataTable
            headers={["Risk", "Impact", "Likelihood", "Mitigation", "Owner"]}
            rows={[
              [
                "Publishing velocity drops after initial sprint",
                "High",
                "Medium",
                "Lock weekly cadence: 1 apex + 3 distribution assets minimum.",
                "Growth / Content Lead",
              ],
              [
                "Entity ambiguity persists for branded prompts",
                "High",
                "Medium",
                "Ship disambiguation + structured About + consistent profile data.",
                "Marketing + Product Marketing",
              ],
              [
                "Programmatic pages cannibalize intent",
                "Medium",
                "Medium",
                "Canonical governance + intent-mapped templates + hub architecture.",
                "SEO Lead",
              ],
              [
                "No external citations despite content volume",
                "High",
                "Medium",
                "Distribution SLA: every apex page gets 3+ external placements in 14 days.",
                "Distribution Lead",
              ],
              [
                "Performance bottlenecks hurt crawl/indexation",
                "Medium",
                "Unknown (data gap)",
                "Run PSI, fix CWV bottlenecks before scale wave.",
                "Engineering",
              ],
            ]}
            className="mb-8"
          />

          <p className="text-xs text-muted-foreground">
            “Unknown” values are explicitly marked where source payload did not provide sufficient diagnostic depth.
          </p>
        </section>

        {/* Next steps CTA */}
        <section>
          <SectionHeader number="10" title="NEXT STEPS" />

          <HighlightBox className="mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">What happens next</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Kinso already has the core narrative and product angle. The gap is visibility architecture: category assets, comparison coverage, and external authority signals. If executed with discipline over 90 days, Kinso can move from “clarify what Kinso is” to “Kinso is one of the top unified AI inbox options” in both search and answer engines.
            </p>
            <BulletList
              items={[
                "Week 1: close data gaps + finalize technical and entity foundation.",
                "Weeks 2–6: publish 10 apex pages mapped to commercial prompts.",
                "Weeks 4–10: activate trust relay distribution across 4+ surfaces.",
                "Weeks 8–12: scale knowledge graph and monitor AI mention lift.",
              ]}
            />
          </HighlightBox>

          <a
            href="https://cal.com/memetik/letstalk"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider border border-primary hover:bg-primary/90 transition-colors"
          >
            Book a Strategy Call
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </section>
      </main>
    </div>
  );
}