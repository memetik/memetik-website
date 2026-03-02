import { useEffect, useState } from "react";
import { Target, Database, Share2, RotateCw, CheckCircle, Zap, ArrowRight, Globe, AlertTriangle, Search, Bot, FileText, TrendingUp, Shield, Users, BarChart3, Swords, Eye, Megaphone, MapPin, Clock, DollarSign, Star, ExternalLink, Lock } from "lucide-react";
import { Nav } from "@/components/Nav";

const GATE_KEY = "bts-strategy-auth";
const CORRECT_HASH = ",[a`y&0#IGrF<C#Z";

function hashPassword(pw: string): string {
  let h = 0;
  for (let i = 0; i < pw.length; i++) {
    h = ((h << 5) - h + pw.charCodeAt(i)) | 0;
  }
  const mapped = Array.from(
    new Uint8Array(new Int32Array([h, h ^ 0x5f3759df, h ^ 0xdeadbeef, h ^ 0xcafebabe]).buffer)
  );
  return mapped.map((b) => String.fromCharCode(33 + (b % 94))).join("");
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hashPassword(password) === CORRECT_HASH) {
      sessionStorage.setItem(GATE_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center font-sans">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-primary/20 bg-secondary/10 mb-4">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-display font-bold text-foreground mb-1">Restricted Document</h1>
          <p className="text-sm text-muted-foreground">Enter password to access this strategy document.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className={`w-full px-4 py-3 bg-secondary/10 border ${error ? "border-red-500" : "border-border"} text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors mb-3`}
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary text-primary-foreground font-display font-bold text-sm hover:opacity-90 transition-opacity"
          >
            ACCESS DOCUMENT
          </button>
          {error && (
            <p className="text-xs text-red-500 font-mono mt-2 text-center">Incorrect password.</p>
          )}
        </form>
      </div>
    </div>
  );
}

const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4 mb-8 md:mb-12 border-b border-primary/20 pb-4">
    <span className="text-primary font-mono text-xl font-bold">{number}</span>
    <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground tracking-tight">{title}</h2>
  </div>
);

const HighlightBox = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-secondary/10 border border-primary/20 p-6 md:p-8 relative overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
    {children}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 text-sm text-muted-foreground">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2">
        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const competitorSpend = [
  { platform: "Patreon", funding: "$413M", employees: "1,135", spend: "$200K–$400K/mo" },
  { platform: "Thinkific", funding: "$182M (public)", employees: "250–300", spend: "$150K–$300K/mo" },
  { platform: "Teachable (Hotmart)", funding: "Acquired $250M", employees: "150", spend: "$100K–$200K/mo" },
  { platform: "Kajabi", funding: "$550M", employees: "400", spend: "$75K–$150K/mo" },
  { platform: "Whop", funding: "$217M", employees: "125–175", spend: "$50K–$75K/mo" },
  { platform: "Circle", funding: "$33M", employees: "252", spend: "$60K–$120K/mo" },
  { platform: "Skool", funding: "$0 (bootstrapped)", employees: "~36", spend: "$15K–$40K/mo" },
  { platform: "Podia", funding: "$4.75M", employees: "35", spend: "$10K–$30K/mo" },
];

const targetQueries = [
  { query: '"best creator platform 2026"', winner: "Weak (Whop/Kajabi)", difficulty: "Medium" },
  { query: '"best Whop alternative"', winner: "Nobody", difficulty: "Easy" },
  { query: '"Whop vs BTS"', winner: "Nobody", difficulty: "Easy" },
  { query: '"creator platform with lowest fees"', winner: "Scattered", difficulty: "Medium" },
  { query: '"fastest payout creator platform"', winner: "Scattered", difficulty: "Medium" },
  { query: '"best platform for selling digital products"', winner: "Whop (weak)", difficulty: "Medium" },
  { query: '"best community platform for creators"', winner: "Skool", difficulty: "Hard" },
  { query: '"Whop alternative without fund holds"', winner: "Nobody", difficulty: "Easy" },
  { query: '"safest creator platform for payments"', winner: "Nobody", difficulty: "Easy" },
  { query: '"best all-in-one creator platform"', winner: "Kajabi", difficulty: "Medium" },
];

const publishingPlatforms = [
  { platform: "LinkedIn", type: "Analysis pieces", target: '"creator platform comparison"' },
  { platform: "Medium", type: "Creator stories", target: '"best platform for selling courses"' },
  { platform: "HackerNoon", type: "Technical content", target: '"creator economy infrastructure"' },
  { platform: "Forbes/Entrepreneur", type: "Thought leadership", target: '"future of creator economy"' },
  { platform: "Reddit", type: "Recommendations", target: '"[competitor] alternative"' },
  { platform: "Quora", type: "Detailed answers", target: '"which creator platform is best?"' },
  { platform: "YouTube", type: "Reviews/comparisons", target: '"BTS vs Whop"' },
  { platform: "Substack", type: "Newsletter content", target: '"creator business strategies"' },
];

export default function StrategyBTS() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(GATE_KEY) === "1");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "BTS Counter-Offensive — Strategic Growth Plan | MEMETIK";
  }, []);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
      <Nav />

      <main className="pt-24 pb-32 px-4 md:px-12 container mx-auto max-w-5xl">

        {/* Hero */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold tracking-wider uppercase mb-6">
            <Shield className="w-3 h-3" />
            Confidential /// March 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tighter mb-6 leading-[0.95]">
            BTS <br />
            <span className="text-primary">COUNTER-OFFENSIVE.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mt-6 mb-4">
            6-month strategic growth plan to make BTS visible everywhere that matters — AI answers, search results, review platforms, and the trust signals that feed all three.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {["behindthescenes.com", "Creator Economy", "6-Month Campaign", "$11K/mo"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary/10 border border-border text-sm font-mono text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* TLDR */}
        <section className="mb-24 md:mb-32">
          <HighlightBox className="bg-gradient-to-br from-secondary/5 to-background">
            <h3 className="text-sm font-mono text-primary mb-6 uppercase tracking-widest">TLDR</h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Three lines of effort running simultaneously across 6 months to take BTS from zero visibility to measurable AI presence, significant organic search growth, and 4.5+ review ratings across platforms.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background/50 border border-border p-5">
                <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  <Bot className="w-4 h-4" /> Line 1
                </div>
                <h4 className="text-lg font-display font-bold text-foreground mb-2">AI Dominance</h4>
                <p className="text-sm text-muted-foreground">Get BTS into ChatGPT, Perplexity, Gemini, and Google AI Overviews by targeting each model's specific data sources. Wikipedia page pursuit for 7x AI visibility lift.</p>
              </div>
              <div className="bg-background/50 border border-border p-5">
                <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  <Search className="w-4 h-4" /> Line 2
                </div>
                <h4 className="text-lg font-display font-bold text-foreground mb-2">Search Ownership</h4>
                <p className="text-sm text-muted-foreground">Multi-surface visibility — BTS appears across multiple results for every query that matters. 500+ pages, 55 third-party placements, competitor keyword hijacking.</p>
              </div>
              <div className="bg-background/50 border border-border p-5">
                <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  <Swords className="w-4 h-4" /> Line 3
                </div>
                <h4 className="text-lg font-display font-bold text-foreground mb-2">Reputation Warfare</h4>
                <p className="text-sm text-muted-foreground">Weaponise Whop's documented problems (120-day fund holds, 3.7/5 Trustpilot) while building BTS's trust infrastructure to 4.5+ ratings across 5 platforms.</p>
              </div>
            </div>

            <div className="border-t border-primary/10 pt-6">
              <h4 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What Gets Built</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "500+ optimised content pages on behindthescenes.com",
                  "55 third-party placements (LinkedIn, Medium, HackerNoon, Forbes, Reddit, Quora, YouTube, Substack)",
                  "36 press releases (6/month) — press coverage + AI training data + Wikipedia notability",
                  "3 independent blog properties with real author personas, no footprint to BTS",
                  "Active review profiles on 5 platforms with solicitation flows",
                  "Forum operations across 4 platforms (Reddit, Quora, Indie Hackers, Twitter/X)",
                  "APAC content dominance: Australia, Singapore, Malaysia, India, Japan",
                  "Weekly AI mention tracking and monthly performance reports",
                  "Continuous competitive monitoring with 48-hour counter-publishing",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-primary/10 pt-6 mt-6">
              <p className="text-xl md:text-2xl font-display font-bold text-foreground">
                $11K/month. $66K total. Phase 1 pricing. <span className="text-primary">Full strategy and execution, end to end.</span>
              </p>
            </div>
          </HighlightBox>
        </section>

        {/* 01: Executive Summary */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="01" title="EXECUTIVE SUMMARY" />

          <div className="prose-custom space-y-6 text-muted-foreground leading-relaxed">
            <p>
              BTS has a real product, real users (20,000+), real creators (1,600+), and $1.4M+ paid out. What it doesn't have is visibility.
            </p>
            <p>
              Domain Authority sits at 7. Organic traffic is roughly 40 clicks per month — and that's only been for one month. The site ranks for 8-17 keywords, almost all branded variations of "behindthescenes." AI visibility across ChatGPT, Perplexity, Gemini, and Google AI Overviews is zero. BTS has no presence on Trustpilot, G2, Capterra, or Product Hunt. The 166+ blog articles already published are a solid foundation, but they're not yet connected to the broader discovery ecosystem.
            </p>
            <p>
              Meanwhile, Whop — the primary competitor — has an Authority Score of 51, 487.5K organic monthly traffic, 232 AI mentions across platforms, and $217M in funding behind it. They're spending $50-75K/month on content alone, with a dedicated Head of SEO and a team of 7-9 freelance writers.
            </p>
            <p className="text-foreground font-medium">
              But Whop is more fragile than it looks. And the window to exploit that fragility is open right now.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: "BTS Users", value: "20,000+", icon: <Users className="w-4 h-4" /> },
              { label: "Active Creators", value: "1,600+", icon: <Star className="w-4 h-4" /> },
              { label: "Paid to Creators", value: "$1.4M+", icon: <DollarSign className="w-4 h-4" /> },
              { label: "AI Mentions", value: "0", icon: <Bot className="w-4 h-4" /> },
            ].map((stat) => (
              <div key={stat.label} className="bg-secondary/5 border border-border p-4 text-center">
                <div className="flex justify-center text-primary mb-2">{stat.icon}</div>
                <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-xs font-mono text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-8 leading-relaxed">
            The product is ahead of the brand. The content library exists but isn't connected to any distribution system. The platform metrics are real but invisible to anyone who isn't already a user. This plan closes that gap.
          </p>
        </section>

        {/* 02: The Landscape */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="02" title="THE LANDSCAPE" />

          {/* Competitor Spend Table */}
          <h3 className="text-lg font-display font-bold text-foreground mb-4">What the Competition Spends</h3>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-secondary/10 border-b border-border">
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Platform</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Funding</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Employees</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Est. SEO/Content Spend</th>
                </tr>
              </thead>
              <tbody>
                {competitorSpend.map((row) => (
                  <tr key={row.platform} className="border-b border-border/50">
                    <td className="p-3 font-medium text-foreground">{row.platform}</td>
                    <td className="p-3 text-muted-foreground">{row.funding}</td>
                    <td className="p-3 text-muted-foreground">{row.employees}</td>
                    <td className="p-3 text-muted-foreground">{row.spend}</td>
                  </tr>
                ))}
                <tr className="border-b border-primary/30 bg-primary/5">
                  <td className="p-3 font-bold text-primary">BTS (current)</td>
                  <td className="p-3 text-primary font-medium">$15M valuation</td>
                  <td className="p-3 text-primary font-medium">—</td>
                  <td className="p-3 text-primary font-bold">$0</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Whop's Weaknesses */}
          <h3 className="text-lg font-display font-bold text-foreground mb-4">Whop's Weaknesses</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Whop looks strong on the surface. 487.5K organic traffic. 119.2K keywords. 18.9K referring domains. But the structure underneath is brittle.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Search className="w-4 h-4" /> Search Dependency
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                52% of Whop's organic traffic comes from the keyword "whop." Strip that out and non-branded organic presence drops to ~234K. Organic search drives only ~8% of total traffic. 69% is direct. They haven't built a search moat — they've built brand recognition with a thin search layer on top.
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <AlertTriangle className="w-4 h-4" /> Technical SEO Broken
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Text-to-HTML ratio of 0.04% (should be 10%+). PageSpeed 53%. IP canonicalization redirects to vercel.com instead of whop.com. Using 308 redirects instead of 301s. About page returns 404. SimilarWeb categorises them as "Fashion and Apparel."
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Shield className="w-4 h-4" /> Trust Problems
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trustpilot: 3.7/5 from 2,107 reviews. 120-day fund holds on creator earnings. Random account suspensions. Confusing fees. BBB complaints filed. Reddit threads warning about scams. Marketplace described as "spammy" and full of get-rich-quick schemes.
              </p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Target className="w-4 h-4" /> Product Gaps
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Course features basic vs dedicated platforms. Documentation doesn't match current interface. No Facebook presence. Weak Instagram. YouTube (229K subs) is siloed — doesn't feed back into search strategy because the site can't retain authority.
              </p>
            </div>
          </div>

          <HighlightBox className="mb-10">
            <h3 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">But They're Investing in Defense</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Colin McDermott (Head of SEO, 15+ years experience). Senior content editor, technical writer, 7-9 freelance writers. Actively hiring Head of Marketing at $250-300K + equity. YouTube channel (Whop Media) at 229K subscribers. Total estimated SEO/content spend including video: $80-135K/month. They take search seriously. They just have structural vulnerabilities that money alone can't fix quickly.
            </p>
          </HighlightBox>

          {/* AI Visibility Window */}
          <h3 className="text-lg font-display font-bold text-foreground mb-4">The AI Visibility Window</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              "Wikipedia accounts for ~22% of LLM training data. ChatGPT cites Wikipedia in 47.9% of answers. Companies with a Wikipedia page see 7x better AI visibility.",
              "ChatGPT uses Bing for real-time search. 87% of SearchGPT citations match Bing's top 10 results.",
              "Sites present on 4+ platforms are 2.8x more likely to appear in ChatGPT responses.",
              "Only 11% of domains get cited by both ChatGPT and Perplexity — cross-platform AI visibility is rare and valuable.",
              "Perplexity sources heavily from Reddit (46.7% of citations) and YouTube (13.9%).",
              "Google AI Overviews pull 93.67% of citations from top-10 organic results.",
              "Pages with high semantic completeness see 340% higher AI inclusion rates.",
            ].map((stat, i) => (
              <div key={i} className="flex gap-2 text-sm text-muted-foreground bg-secondary/5 border border-border p-4">
                <BarChart3 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{stat}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            BTS currently has zero AI mentions. Whop has 232 across platforms: 19 in ChatGPT, 65 in AI Overviews, 129 in AI Mode, 19 in Gemini. That gap is significant, but it's early enough that the positions haven't hardened. <span className="text-foreground font-medium">The next 6 months matter more than the following 24.</span>
          </p>

          {/* BTS Baseline */}
          <h3 className="text-lg font-display font-bold text-foreground mb-4 mt-10">BTS vs. The Field</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-secondary/10 border-b border-border">
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Metric</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">BTS</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Whop</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Domain Authority", bts: "7", whop: "51" },
                  { metric: "Organic Traffic", bts: "~40 clicks/mo (1 month)", whop: "487.5K/mo" },
                  { metric: "Organic Keywords", bts: "8-17", whop: "119.2K" },
                  { metric: "Referring Domains", bts: "~100 real editorial", whop: "18.9K" },
                  { metric: "AI Mentions", bts: "0", whop: "232" },
                  { metric: "Review Presence", bts: "None", whop: "2,107 Trustpilot reviews" },
                  { metric: "Content Base", bts: "166+ articles", whop: "Extensive" },
                ].map((row) => (
                  <tr key={row.metric} className="border-b border-border/50">
                    <td className="p-3 text-foreground font-medium">{row.metric}</td>
                    <td className="p-3 text-muted-foreground">{row.bts}</td>
                    <td className="p-3 text-muted-foreground">{row.whop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 03: The Strategy */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="03" title="THE STRATEGY" />
          <p className="text-muted-foreground mb-8 leading-relaxed">Three lines of effort, running simultaneously.</p>

          <div className="space-y-8">
            <HighlightBox>
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Bot className="w-4 h-4" /> Line 1
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">AI Dominance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Make BTS the answer when people ask AI models about creator platforms. Get BTS content into Bing (ChatGPT), Reddit and YouTube (Perplexity), top-10 organic results (Google AI Overviews), Brave (Claude), and the broader web that feeds training data. Build multi-platform presence and semantic depth that AI models use as trust signals. Target: measurable, growing AI citation share by month 3, with Whop's relative share declining by month 5.
              </p>
            </HighlightBox>

            <HighlightBox>
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Search className="w-4 h-4" /> Line 2
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Search Ownership</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Maximise BTS's search visibility with a constellation of placements — not just the BTS site, but guest posts, Medium articles, Reddit threads, review profiles, LinkedIn pieces. When someone searches "best Whop alternative" or "creator platform comparison 2026," BTS appears repeatedly across multiple results. A competitor would have to fight on 8 fronts simultaneously to displace this.
              </p>
            </HighlightBox>

            <HighlightBox>
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Swords className="w-4 h-4" /> Line 3
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Reputation Warfare</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Attack Whop's trust vulnerabilities while building BTS's trust infrastructure. Whop's problems are real, documented, and painful. The 120-day fund hold is a disqualifying issue for many creators. Make those problems visible everywhere, while building BTS's review presence, social proof, and press coverage. Comparison content targets all competitors. Attack content targets Whop specifically.
              </p>
            </HighlightBox>
          </div>
        </section>

        {/* 04: The Playbook */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="04" title="THE PLAYBOOK" />

          {/* Section 1: AI Answer */}
          <h3 className="text-xl font-display font-bold text-foreground mb-2 mt-8 flex items-center gap-3">
            <Bot className="w-5 h-5 text-primary" /> Become the Default AI Answer
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Target queries where AI answers are weak or uncontested — the easiest ground to take first.</p>

          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-secondary/10 border-b border-border">
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Query</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Who Wins Now</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {targetQueries.map((row) => (
                  <tr key={row.query} className="border-b border-border/50">
                    <td className="p-3 text-foreground font-medium font-mono text-xs">{row.query}</td>
                    <td className="p-3 text-muted-foreground">{row.winner}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-xs font-mono font-bold ${
                        row.difficulty === "Easy" ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                        row.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                        "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}>
                        {row.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Content Tiers */}
          <h4 className="text-base font-display font-bold text-foreground mb-4">Content Tiers — Scaling to 500+ Pages</h4>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-2">Flagship Content</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">Deep comparison pages (BTS vs Whop, BTS vs Kajabi, BTS vs Skool), comprehensive guides, and original research built from BTS platform data. Designed to be the definitive resource, earn backlinks, and get cited by AI models.</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-2">Comparison Content</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">Targets every competitor: Patreon, Teachable, Circle, Podia, Thinkific. Fair, detailed, data-driven. Where a competitor genuinely has an advantage, acknowledge it — credibility increases conversion and AI trust signals.</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-2">Attack Content</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">Whop-only. "Whop Fund Hold Problems," "Is Whop Legit," "Whop Scam Complaints." Surfaces real, documented issues from Trustpilot, Reddit, and BBB filings. Nothing fabricated.</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-2">Programmatic Content</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">Long-tail pages: "best creator platform for yoga instructors," "best platform for selling photography presets." Volume play covering hundreds of niche queries no competitor is targeting.</p>
            </div>
          </div>

          {/* AI Training Data */}
          <h4 className="text-base font-display font-bold text-foreground mb-4">Getting Into AI Training Data</h4>
          <div className="space-y-4 mb-10">
            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-2">Wikipedia — Highest Leverage Play</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">~22% of LLM training data. 7x better AI visibility for companies with a page. The 36 press releases build the coverage base Wikipedia editors require. If notability criteria are met by month 3, we draft the page.</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-2">Bing Optimization → ChatGPT</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">ChatGPT uses Bing for real-time search. 87% of SearchGPT citations match Bing's top 10. Bing Webmaster Tools, IndexNow protocol, structured data. Most SEO campaigns ignore Bing entirely — that's the opportunity.</p>
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-2">Multi-Platform Presence</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">Sites on 4+ platforms are 2.8x more likely to appear in ChatGPT. BTS content across blog, LinkedIn, Medium, HackerNoon, Reddit, Quora, YouTube, Substack, and the independent blog network — platform-native, not duplicate.</p>
            </div>
          </div>

          {/* Platform-Specific Tactics */}
          <h4 className="text-base font-display font-bold text-foreground mb-4">Platform-Specific Tactics</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { model: "ChatGPT", source: "Bing", tactic: "Bing Webmaster Tools, IndexNow, structured data (FAQ, comparison, review schema)" },
              { model: "Perplexity", source: "Reddit + YouTube", tactic: "Reddit threads (46.7% of citations) + YouTube reviews (13.9%). Forum ops do double duty." },
              { model: "Claude", source: "Brave Search", tactic: "Ensure BTS content indexed by Brave. Different index = different coverage opportunities." },
              { model: "Google AI Overviews", source: "Top-10 Organic", tactic: "93.67% of citations from top-10 results. Strong organic = AI Overview inclusion." },
            ].map((item) => (
              <div key={item.model} className="bg-secondary/5 border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-primary font-bold uppercase">{item.model}</span>
                  <span className="text-xs text-muted-foreground">→ {item.source}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.tactic}</p>
              </div>
            ))}
          </div>

          {/* Section 2: Own Search Results */}
          <h3 className="text-xl font-display font-bold text-foreground mb-2 mt-16 flex items-center gap-3">
            <Eye className="w-5 h-5 text-primary" /> Own the Search Results
          </h3>

          <h4 className="text-base font-display font-bold text-foreground mb-4 mt-6">Multi-Surface Visibility End State</h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            For key queries like "best Whop alternative," the goal is BTS present across as many result types as possible:
          </p>
          <div className="bg-secondary/5 border border-border p-5 mb-8 font-mono text-sm">
            {[
              { pos: "Position 1", source: "behindthescenes.com page" },
              { pos: "Positions 2-3", source: "Guest posts on high-authority sites mentioning BTS" },
              { pos: "Positions 4-5", source: "Medium/Substack articles by creators" },
              { pos: "Positions 6-7", source: "Reddit threads recommending BTS" },
              { pos: "Position 8", source: "G2/Capterra review page" },
              { pos: "Positions 9-10", source: "LinkedIn or HackerNoon piece" },
            ].map((item) => (
              <div key={item.pos} className="flex gap-4 py-2 border-b border-border/30 last:border-0">
                <span className="text-primary font-bold w-28 shrink-0">{item.pos}</span>
                <span className="text-muted-foreground">{item.source}</span>
              </div>
            ))}
          </div>

          {/* Publishing Platforms */}
          <h4 className="text-base font-display font-bold text-foreground mb-4">High-Authority Site Publishing — 55 Placements</h4>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-secondary/10 border-b border-border">
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Platform</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Content Type</th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-primary">Target Query</th>
                </tr>
              </thead>
              <tbody>
                {publishingPlatforms.map((row) => (
                  <tr key={row.platform} className="border-b border-border/50">
                    <td className="p-3 font-medium text-foreground">{row.platform}</td>
                    <td className="p-3 text-muted-foreground">{row.type}</td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Reputation Warfare */}
          <h3 className="text-xl font-display font-bold text-foreground mb-2 mt-16 flex items-center gap-3">
            <Swords className="w-5 h-5 text-primary" /> Reputation Warfare
          </h3>

          <div className="space-y-6 mt-6">
            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-3">Fund Holds Amplification</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Whop's 120-day fund hold on creator earnings is their single biggest vulnerability. Creators can't access their own money for four months.
              </p>
              <BulletList items={[
                'Dedicated content: "Whop Fund Hold Problems," "Why Whop Holds Your Money for 120 Days," "Creator Platforms That Pay Instantly"',
                "Surface existing complaints in forum discussions — amplify real ones, don't create fake ones",
                "Position BTS's payment speed as the direct contrast with specific, verifiable data",
                "Every comparison content piece mentions the fund hold difference prominently",
              ]} />
            </div>

            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-3">Marketplace Quality Attacks</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Whop's marketplace is filled with get-rich-quick products and low-quality digital offerings. This is a brand problem they can't fix without alienating their creator base.
              </p>
              <BulletList items={[
                "Content contrasting Whop's open marketplace (minimal quality control) with BTS's approach to curation",
                "Surface specific examples of low-quality Whop listings — screenshot, document, cite",
                "Position BTS as the platform for professional creators, not hustle culture resellers",
              ]} />
            </div>

            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-3">Review Platform Strategy</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Whop: 3.7/5 from 2,107 reviews. BTS: not on Trustpilot at all. Close that gap and flip it.
              </p>
              <BulletList items={[
                "Create profiles on Trustpilot, G2, Capterra, TrustRadius, Product Hunt in month 1",
                "Review solicitation flow within BTS platform at natural trigger points (first payout, milestones)",
                "Target 4.5+ rating within 6 months",
                '"Whop: 3.7/5 from 2,107 reviews. BTS: 4.5+/5" — this data point shows up everywhere',
              ]} />
            </div>

            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-3">Social Proof at Scale</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">Forum and community presence across four platforms. Key principle: every post provides real value regardless of whether they click through to BTS.</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  { platform: "Reddit", desc: "Aged accounts, authentic engagement in r/Entrepreneur, r/creators, r/passive_income. BTS mentions feel incidental." },
                  { platform: "Indie Hackers", desc: "Genuine creator business discussions. Sophisticated, skeptical audience — approach must be authentic." },
                  { platform: "Quora", desc: "500+ word answers that genuinely help. BTS mentioned as one option with honest pros and cons." },
                  { platform: "Twitter/X", desc: "Creator economy conversations. Quote-tweet discussions about platforms, payment processing, selection." },
                ].map((item) => (
                  <div key={item.platform} className="bg-background/50 border border-border/50 p-3">
                    <span className="text-xs font-mono text-primary font-bold">{item.platform}</span>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-3">Press Releases — 36 Total (6/Month)</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Each release serves three functions: builds Wikipedia notability coverage base, creates pages on high-authority news sites that rank in search, and provides fresh content for AI models to index. Six per month creates sustained press saturation — roughly one every five days.
              </p>
              <div className="grid md:grid-cols-3 gap-3 mt-4">
                {[
                  { month: "Month 1-2", theme: "Establish BTS in the media landscape. APAC launch, fee comparison research, founding story, payout benchmarks." },
                  { month: "Month 3-4", theme: "Create comparative narratives. Migration numbers, Wikipedia-ready profile, earnings transparency, feature comparisons." },
                  { month: "Month 5-6", theme: "Position as category leader. Industry trust research, growth metrics, year in review, 2027 predictions." },
                ].map((item) => (
                  <div key={item.month} className="bg-background/50 border border-border/50 p-3">
                    <span className="text-xs font-mono text-primary font-bold">{item.month}</span>
                    <p className="text-sm text-muted-foreground mt-1">{item.theme}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-3">Independent Blog Network — 3 Sites</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Clean domains, real author personas with LinkedIn and Twitter/X profiles, unique hosting/registrars/IPs, no footprint to BTS. Publish genuinely useful creator content for 2-3 months before introducing platform comparisons.
              </p>
              <BulletList items={[
                "Non-negotiable: if someone reads these and never clicks a BTS link, they still get genuine value",
                "AI models treat independent editorial content as more trustworthy than brand content",
                "Serve as additional surfaces for Bing and Brave to index, feeding ChatGPT and Claude",
              ]} />
            </div>

            <div className="bg-secondary/5 border border-border p-5">
              <h5 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-3">Competitive Monitoring — Continuous</h5>
              <BulletList items={[
                "Track every piece of content Whop publishes. Counter within 48 hours with a better version.",
                "Monitor Whop's backlink profile. When they get a link from a publication, pitch that same publication with a BTS angle.",
                "Track Whop's AI mention share weekly. Counter immediately with targeted content for that platform's data sources.",
                "Let their technical SEO problems bleed silently. Don't alert them to the IP canonicalization issue, 308 redirects, 0.04% text-to-HTML ratio, or 404 About page.",
              ]} />
            </div>
          </div>
        </section>

        {/* 05: APAC Defense */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="05" title="APAC DEFENSE" />
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            BTS has an APAC presence that Whop hasn't targeted yet. Establish dominance in APAC search and AI results before Whop arrives. First-mover advantage in regional search is significant — harder to displace an incumbent than to claim uncontested ground.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <FileText className="w-4 h-4" /> Content
              </div>
              <BulletList items={[
                '"Best Creator Platform in Australia 2026" — flagship APAC comparison',
                "Country pages: Singapore, Malaysia, India, Japan",
                '"Creator Economy in APAC" — comprehensive market overview',
                "Payment processing comparisons for APAC methods (PayNow, GrabPay, UPI)",
                'Localised attack: "Best Whop Alternative in Australia"',
              ]} />
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Users className="w-4 h-4" /> Community
              </div>
              <BulletList items={[
                "Identify APAC creator communities on Facebook, Discord, Telegram, Line",
                "Establish presence before Whop arrives",
                "Develop local creator case studies",
                'Position: "built for global creators" vs American hustle culture',
              ]} />
            </div>
            <div className="bg-secondary/5 border border-border p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Megaphone className="w-4 h-4" /> Press
              </div>
              <BulletList items={[
                "Target APAC publications: Tech in Asia, e27, Mumbrella",
                "Guest posts on APAC tech and business sites",
                "APAC market entry angles, regional partnerships",
                "Resonates in markets skeptical of Silicon Valley hype",
              ]} />
            </div>
          </div>
        </section>

        {/* 06: Timeline & Milestones */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="06" title="TIMELINE & MILESTONES" />

          <div className="space-y-8 relative ml-8 md:ml-16 border-l-2 border-primary/20 pl-8 md:pl-12">
            {[
              {
                month: "Month 1",
                title: "Audit & Optimise",
                items: [
                  "Full AI visibility audit across ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews",
                  "SEO audit of all 166+ existing pages",
                  "Create profiles on Trustpilot, G2, Capterra, TrustRadius, Product Hunt",
                  "First 6 press releases distributed",
                  "Bing Webmaster Tools + IndexNow setup",
                  "Competitive monitoring for Whop begins",
                  "Blog network domains registered and setup begins",
                ],
                kpi: "AI audit complete. SEO audit done. All review profiles created. First 6 releases out.",
              },
              {
                month: "Month 2",
                title: "Strengthen & Expand",
                items: [
                  "Complete internal linking architecture across all existing content",
                  "New content production targeting high-priority queries",
                  "Independent blog network goes live with first content",
                  "Forum operations begin on Reddit, Quora, Indie Hackers",
                  "First backlinks acquired through outreach and guest posting",
                  "High-authority placements begin on LinkedIn and Medium",
                  "Press releases 7-12 distributed",
                ],
                kpi: "Interlinking complete. New content production started. Blogs publishing. Forum ops begun.",
              },
              {
                month: "Month 3",
                title: "Push",
                items: [
                  "Scale content to 300+ total pages live",
                  "All third-party placements actively publishing",
                  "Forum operations at full speed across all four platforms",
                  "Wikipedia page drafted if press coverage meets notability criteria",
                  "Press releases 13-18 distributed",
                  "Review solicitation process activated",
                ],
                kpi: "300+ pages live. All placements active. Wikipedia drafted if eligible.",
                target: "First measurable AI mentions for BTS across any platform.",
              },
              {
                month: "Month 4",
                title: "Expand",
                items: [
                  "APAC content live across Australia, Singapore, Malaysia, India, Japan",
                  "Content scaling toward 500+ total pages",
                  "Review solicitation at scale",
                  "Blog network begins platform comparison content",
                  "Press releases 19-24 distributed",
                ],
                kpi: "APAC content live. Scaling toward 500+ pages. Review solicitation at scale.",
                target: "AI mentions showing measurable improvement over zero baseline.",
              },
              {
                month: "Month 5",
                title: "Consolidate",
                items: [
                  "All content live and fully interlinked",
                  "Review ratings at 4.5+ on Trustpilot",
                  "Forum posts generating organic engagement",
                  "Blog network fully operational with natural cross-linking",
                  "Press releases 25-30 distributed",
                ],
                kpi: "All content live. Reviews at 4.5+. Forum posts generating organic engagement.",
                target: "Whop's AI mention share declining relative to BTS's growing share.",
              },
              {
                month: "Month 6",
                title: "Review & Decision",
                items: [
                  "Full performance review against all month-1 baselines",
                  "AI citation share: before vs after across all platforms",
                  "Search position tracking for all target queries",
                  "Review platform ratings and volume",
                  "Backlink profile growth analysis",
                  "Press releases 31-36 distributed",
                ],
                kpi: "Full performance review complete. AI citation share documented. All targets measured.",
                target: "Decision: continue, expand, or maintain.",
              },
            ].map((phase) => (
              <div key={phase.month} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[calc(2rem+7px)] md:-left-[calc(3rem+7px)] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary border-2 border-background"></span>
                <div className="text-primary font-mono text-sm font-bold uppercase tracking-wider mb-1">{phase.month}</div>
                <h4 className="text-lg font-display font-bold text-foreground mb-3">{phase.title}</h4>
                <BulletList items={phase.items} />
                <div className="mt-3 bg-secondary/5 border border-border p-3 text-xs">
                  <span className="font-mono text-primary font-bold">KPIs: </span>
                  <span className="text-muted-foreground">{phase.kpi}</span>
                </div>
                {phase.target && (
                  <div className="mt-2 bg-primary/5 border border-primary/20 p-3 text-xs">
                    <span className="font-mono text-primary font-bold">TARGET: </span>
                    <span className="text-foreground font-medium">{phase.target}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 07: What I Need From BTS */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="07" title="WHAT I NEED FROM BTS" />
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">This works if I have the following. Without them, parts of the strategy stall.</p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Product Roadmap Access", desc: "Content aligned with feature launches is 10x more effective than writing about them a month later." },
              { title: "Creator Testimonials & Case Studies", desc: "Real creator stories are the most persuasive content for search and AI. Permission to interview and publish results." },
              { title: "Payment Speed Data", desc: "Exact numbers. This is the direct counter to Whop's 120-day hold. Must be specific and verifiable." },
              { title: "Messaging & Positioning Input", desc: "What resonates with users? What language do they use? What objections come up in sales?" },
              { title: "48-Hour Content Approvals", desc: "Content velocity matters. Competitive monitoring breaks down if approvals take a week." },
              { title: "Bi-Weekly Strategy Calls", desc: "30 minutes every two weeks to review progress, adjust priorities, stay aligned." },
              { title: "Platform Data for Research", desc: "User growth, creator earnings, transaction volumes, payout stats — raw material for original research and press releases." },
            ].map((item) => (
              <div key={item.title} className="bg-secondary/5 border border-border p-4">
                <h5 className="text-sm font-mono text-primary font-bold mb-1">{item.title}</h5>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 08: Risks & Contingencies */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="08" title="RISKS & CONTINGENCIES" />

          <div className="space-y-4">
            {[
              {
                risk: "Blog Network Discovery",
                mitigation: "Each blog provides genuine value independently. Unique hosting, registrars, IPs. Real author personas with active social profiles. No footprint patterns. If deindexed, broader strategy continues — blog network amplifies, doesn't carry.",
              },
              {
                risk: "Reddit Account Bans",
                mitigation: "Aged accounts with established posting history and authentic engagement. Every post provides real value. BTS mentions incidental, not promotional. If banned, shift volume to Quora, Indie Hackers, Twitter/X.",
              },
              {
                risk: "Whop Counter-Response",
                mitigation: "Actually a favorable outcome. Forces them to play defense and split resources. We choose the battleground; they react. Their structural technical problems compound and limit response effectiveness.",
              },
              {
                risk: "Wikipedia Rejection",
                mitigation: "36 press releases specifically designed to build coverage base. If first submission rejected, continue building coverage beyond 6 months. Press itself has standalone value for AI training and search.",
              },
              {
                risk: "AI Model Updates",
                mitigation: "Strategy diversified across 12+ platforms. No single platform failure eliminates visibility. Real-time search integrations mean recently published content always has a path into AI answers.",
              },
              {
                risk: "Content Quality Dilution at Scale",
                mitigation: "Flagship content is deeply researched. Programmatic content meets minimum quality threshold with manual review. If a page isn't genuinely useful, it doesn't publish.",
              },
            ].map((item) => (
              <div key={item.risk} className="bg-secondary/5 border border-border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <h5 className="text-sm font-mono text-foreground font-bold">{item.risk}</h5>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.mitigation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 09: Commercial Terms */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="09" title="COMMERCIAL TERMS" />

          <HighlightBox className="bg-gradient-to-br from-secondary/5 to-background">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">$11,000<span className="text-primary">/month</span></h3>
                <p className="text-muted-foreground text-sm mb-6">6-month initial engagement. $66,000 total.</p>
                <BulletList items={[
                  "Invoiced monthly through Memetik",
                  "50% of month 1 ($5,500) to kick off",
                  "Monthly invoicing thereafter",
                  "Phase 1 / founding-partner pricing",
                  "Category exclusivity: no competing creator economy platforms",
                ]} />
              </div>
              <div>
                <h4 className="text-sm font-mono text-primary font-bold uppercase tracking-wider mb-3">What Gets Built</h4>
                <BulletList items={[
                  "500+ optimised content pages",
                  "55 third-party placements across 8 platforms",
                  "36 press releases (6/month)",
                  "3-site independent blog network",
                  "Active profiles on 5 review platforms",
                  "Forum engagement across 4 platforms",
                  "APAC content dominance across 5 countries",
                  "Weekly AI tracking + monthly reports",
                  "Continuous competitive monitoring",
                ]} />
                <div className="mt-4 p-3 bg-secondary/10 border border-border text-xs text-muted-foreground">
                  <span className="text-primary font-mono font-bold">Add-on: </span>
                  PPC competitor campaigns — $1,000/mo management fee + ad spend
                </div>
              </div>
            </div>
          </HighlightBox>
        </section>

        {/* 10: Next Steps */}
        <section className="mb-16">
          <SectionHeader number="10" title="NEXT STEPS" />

          <div className="space-y-4 mb-10">
            {[
              { step: "01", text: "Review this document together. Ask questions. Push back on anything that doesn't sit right." },
              { step: "02", text: "Confirm the engagement." },
              { step: "03", text: "Week 1: AI audit and SEO audit begin immediately." },
              { step: "04", text: "Full campaign running at speed within 2 weeks." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start bg-secondary/5 border border-border p-4">
                <span className="text-primary font-mono font-bold text-lg shrink-0">{item.step}</span>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-lg hover:opacity-90 transition-opacity"
            >
              LET'S TALK <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-xs text-muted-foreground mt-4 font-mono">
              Confidential. BTS leadership and strategic partners only.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
