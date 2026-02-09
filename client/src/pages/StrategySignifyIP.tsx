import { useEffect } from "react";
import { Target, Database, Share2, RotateCw, CheckCircle, Zap, ArrowRight, Globe, AlertTriangle, Search, Bot, FileText, TrendingUp, Shield, MapPin, Scale, Star, Users, BarChart3 } from "lucide-react";
import { Nav } from "@/components/Nav";

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

const PhaseBlock = ({ number, icon, label, title, children }: { number: string; icon: React.ReactNode; label: string; title: string; children: React.ReactNode }) => (
  <div className="relative">
    <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-none bg-primary text-primary-foreground font-bold text-sm shadow-none border border-primary">{number}</span>
    <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
      {icon} {label}
    </div>
    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{title}</h3>
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

const boutiqueTier = [
  { firm: "The Trademark Factory", url: "ttmf.com.au", positioning: "Fixed fee from $350, 9000+ TMs, online-first", content: "Pricing pages, guides, blog" },
  { firm: "Acorn Trade Marks", url: "acorntrademarks.com.au", positioning: "Fixed fees, no hidden costs, SMB focus", content: "Minimal" },
  { firm: "YIP Legal", url: "yiplegal.com.au", positioning: "Packages from $450, startups + brands", content: "Blog, service pages" },
  { firm: "Mark My Words", url: "mmwtrademarks.com.au", positioning: "Blog content, practical guides", content: "Strong blog" },
  { firm: "Markster", url: "markster.com.au", positioning: "Online TM service, blog content", content: "Good blog + SEO" },
  { firm: "Quick Off The Mark", url: "quickoffthemark.com.au", positioning: "Blog-driven, educational", content: "Strong content" },
  { firm: "eTrademark", url: "etrademark.com.au", positioning: "$199 attorney fee, volume play", content: "Minimal" },
  { firm: "TradeMark Action", url: "trademarkaction.com", positioning: "$990 fixed fee, transparent pricing", content: "Moderate" },
];

const adelaideTier = [
  { firm: "Madderns", notes: "50+ years, Adelaide institution, patents + TMs" },
  { firm: "Phillips Ormonde Fitzpatrick", notes: "National firm, Adelaide office on Grenfell St" },
  { firm: "Davies Collison Cave", notes: "Est. 1877, largest AU TM filers since 2000" },
  { firm: "IP Guardian", notes: "Adelaide-based, free consultations, strong reviews" },
  { firm: "DW Fox Tucker", notes: "Adelaide law firm, IP practice group, award-winning" },
  { firm: "Piper Alderman", notes: "Adelaide HQ, full-service with IP team" },
];

const nationalTier = [
  { firm: "Spruson & Ferguson", notes: "WTR 1000 Gold, massive content library" },
  { firm: "Baxter IP", notes: "Strong SEO, Sydney/Melbourne, blog content" },
  { firm: "Lawpath", notes: "Online legal, strong SEO content on TM topics" },
  { firm: "Gladwin Legal", notes: "Blog-driven TM guides ranking well" },
  { firm: "Halfords IP", notes: "Ranking for TM cost/fee queries" },
];

export default function StrategySignifyIP() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Signify IP — SEO & AEO Strategy | MEMETIK";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
      <Nav />

      <main className="pt-24 pb-32 px-4 md:px-12 container mx-auto max-w-5xl">

        {/* Hero */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold tracking-wider uppercase mb-6">
            <Globe className="w-3 h-3" />
            Strategy Document /// February 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tighter mb-6 leading-[0.95]">
            SIGNIFY IP <br />
            <span className="text-primary">SEO & AEO STRATEGY.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mt-6 mb-4">
            Make Signify IP the default answer when any Australian business owner asks Google, ChatGPT, Perplexity, or Gemini about trade mark registration, protection, or attorneys.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {["signifyip.com.au", "Trade Marks", "Adelaide, SA", "Fixed-Fee"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary/10 border border-border text-sm font-mono text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Current State */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="00" title="CURRENT STATE" />

          {/* What's Strong */}
          <div className="bg-secondary/5 border border-border p-6 md:p-8 mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What's Strong</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Clear value proposition: fixed fees, plain English, strategic approach",
                "Excellent social proof: 5.0 Google rating, 11 genuine reviews",
                "2 detailed case studies with real outcomes (Hyro, Natural Raw C)",
                "Named team members (Hollie, Christine) referenced in reviews — builds E-E-A-T",
                "Services are well-defined: searches, applications, disputes, portfolio management",
                "Free consultation CTA is clear",
              ].map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What's Missing */}
          <HighlightBox className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What's Missing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "No indexable content — Google has nothing to rank. Only 1 result for site:signifyip.com.au",
                "No blog, no resource pages, no guides, no comparison content",
                "No schema markup of any kind",
                "No sitemap or robots.txt configured",
                "No backlink profile — zero referring domains",
                "Zero presence in AI platforms (ChatGPT, Perplexity, Gemini, Google AI Overviews)",
                "No FAQ content despite the vertical being FAQ-heavy",
                "No pricing transparency page despite 'fixed fees' being a core value prop",
                "No industry-specific or location landing pages",
                "All image alt text says 'Company E logo' — no descriptive alt text",
              ].map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </HighlightBox>

          {/* The Opportunity */}
          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              The organic opportunity is massive — and completely untapped.
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Trade mark registration is one of the highest-intent search verticals in Australian professional services. Businesses search when they're ready to act. The firms that own organic search capture leads at zero marginal cost — indefinitely.
              </p>
              <p>
                Most of Signify IP's direct boutique competitors have minimal to no content strategies. The big firms (Spruson & Ferguson, Allens, Corrs) have authority but don't target the SMB/startup keywords that Signify's ideal clients actually search for. The gap is massive.
              </p>
              <p>
                <strong className="text-foreground">Who AI platforms currently cite:</strong> IP Australia (government authority), Lawpath, Gladwin Legal, Progressive Legal, and the large firms. No boutique TM specialist is consistently cited. This is the window.
              </p>
            </div>
          </div>
        </section>

        {/* Keyword Opportunity */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="01" title="KEYWORD OPPORTUNITY" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            430+ unique keywords mapped across 15 categories. Estimated 25,000-40,000 total monthly searches in Australia. Here are the top 10 priority targets:
          </p>

          <div className="overflow-x-auto border border-border rounded-lg mb-8">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-secondary/20 text-foreground">
                <tr>
                  <th className="p-4 md:p-6 font-bold">#</th>
                  <th className="p-4 md:p-6 font-bold">Keyword</th>
                  <th className="p-4 md:p-6 font-bold text-right">Monthly Searches</th>
                  <th className="p-4 md:p-6 font-bold">Intent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 bg-secondary/5">
                {[
                  { kw: "how to register a trade mark in australia", vol: "500-1,000", intent: "Informational → BOFU" },
                  { kw: "trade mark registration cost australia", vol: "500-1,000", intent: "Commercial" },
                  { kw: "trademark attorney australia", vol: "500-1,000", intent: "Commercial" },
                  { kw: "how to trademark a business name australia", vol: "500-1,000", intent: "Informational → BOFU" },
                  { kw: "trade mark vs copyright", vol: "500-1,000", intent: "Informational" },
                  { kw: "do i need a trademark attorney", vol: "200-500", intent: "Commercial" },
                  { kw: "trademark attorney adelaide", vol: "100-300", intent: "Local / Commercial" },
                  { kw: "how much does it cost to trademark", vol: "500-1,000", intent: "Commercial" },
                  { kw: "someone is using my trade mark", vol: "100-200", intent: "Panic → Urgent" },
                  { kw: "fixed fee trademark attorney australia", vol: "50-100", intent: "Exact Match" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 md:p-6 text-primary font-bold">{i + 1}</td>
                    <td className="p-4 md:p-6 text-foreground font-medium font-mono text-xs">{row.kw}</td>
                    <td className="p-4 md:p-6 text-primary font-bold text-right whitespace-nowrap">{row.vol}</td>
                    <td className="p-4 md:p-6 text-muted-foreground whitespace-nowrap">{row.intent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <HighlightBox>
            <div className="flex gap-4 items-start">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div className="text-sm">
                <strong className="text-foreground block mb-1">Why "fixed fee trademark attorney australia" matters most</strong>
                <span className="text-muted-foreground">
                  Lowest volume on the list, but this is Signify IP's exact positioning. Zero competition. Anyone searching this phrase is your ideal client. Own it permanently.
                </span>
              </div>
            </div>
          </HighlightBox>
        </section>

        {/* Competitive Landscape */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="02" title="COMPETITIVE LANDSCAPE" />

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Three tiers of competitors were mapped: direct boutique TM specialists, Adelaide/SA-based firms, and national enterprise firms. The key finding: <strong className="text-foreground">most boutique competitors have minimal to zero content strategies.</strong>
          </p>

          {/* Tier 1 */}
          <div className="mb-8">
            <h3 className="text-foreground font-bold mb-4 text-lg flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Tier 1: Direct Boutique Competitors
            </h3>
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full text-left text-sm min-w-[700px]">
                <thead className="bg-secondary/20 text-foreground">
                  <tr>
                    <th className="p-4 md:p-6 font-bold">Firm</th>
                    <th className="p-4 md:p-6 font-bold">Positioning</th>
                    <th className="p-4 md:p-6 font-bold">Content Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 bg-secondary/5">
                  {boutiqueTier.map((c, i) => (
                    <tr key={i}>
                      <td className="p-4 md:p-6">
                        <span className="text-foreground font-medium block">{c.firm}</span>
                        <span className="text-muted-foreground text-xs font-mono">{c.url}</span>
                      </td>
                      <td className="p-4 md:p-6 text-muted-foreground">{c.positioning}</td>
                      <td className="p-4 md:p-6 text-muted-foreground">{c.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mb-8">
            <h3 className="text-foreground font-bold mb-4 text-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Tier 2: Adelaide / SA-Based Firms
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {adelaideTier.map((c, i) => (
                <div key={i} className="p-4 bg-secondary/5 border border-border">
                  <span className="text-foreground font-bold text-sm block">{c.firm}</span>
                  <span className="text-muted-foreground text-xs">{c.notes}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3 */}
          <div className="mb-8">
            <h3 className="text-foreground font-bold mb-4 text-lg flex items-center gap-2">
              <Scale className="w-4 h-4 text-primary" />
              Tier 3: National Firms with Organic Authority
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {nationalTier.map((c, i) => (
                <div key={i} className="p-4 bg-secondary/5 border border-border">
                  <span className="text-foreground font-bold text-sm block">{c.firm}</span>
                  <span className="text-muted-foreground text-xs">{c.notes}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Where Signify IP sits */}
          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Where Signify IP Sits Today</h3>
            <p className="text-2xl md:text-4xl font-display font-bold text-foreground">
              1 <span className="text-muted-foreground text-lg">indexed page.</span>{" "}
              0 <span className="text-muted-foreground text-lg">organic traffic.</span>{" "}
              0 <span className="text-muted-foreground text-lg">referring domains.</span>{" "}
              0 <span className="text-muted-foreground text-lg">AI citations.</span>
            </p>
            <p className="text-sm text-muted-foreground mt-4">The strategy below closes that gap and leapfrogs the entire boutique tier.</p>
          </HighlightBox>
        </section>

        {/* Strategy Overview */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="03" title="STRATEGY: 7-PHASE CONTENT + AEO SYSTEM" />
          <HighlightBox className="mb-8">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Turn a 6-page website into a <span className="text-primary">300+ page content authority</span> that ranks for 150-200 keywords, generates 40-60 organic leads per month, and becomes the #1 cited trade mark source across all AI platforms.
            </p>
          </HighlightBox>

          {/* Content Architecture */}
          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-foreground font-bold mb-6 text-lg">Site Architecture</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { section: "/guides/", desc: "10 flagship pillar guides (registration, costs, classes, Madrid Protocol, disputes, renewal, infringement, startups)", pages: "10 pages" },
                { section: "/industries/", desc: "Industry-specific landing pages: food & bev, fashion, tech, ecommerce, construction, health, hospitality, services, creative", pages: "9 pages" },
                { section: "/locations/", desc: "Location pages: Adelaide, Sydney, Melbourne, Brisbane, Perth, Canberra, Hobart, Gold Coast", pages: "8 pages" },
                { section: "/comparisons/", desc: "Attorney vs DIY, TM Headstart vs Standard, Signify IP vs competitors, best-of listicles", pages: "8 pages" },
                { section: "/resources/", desc: "FAQ (50+ questions), glossary, checklist, timeline, 2026 regulation changes", pages: "5 pages" },
                { section: "/case-studies/", desc: "Expanded from 2 to 12+ detailed client stories with outcomes", pages: "12+ pages" },
                { section: "/blog/", desc: "Ongoing topical content: regulation changes, common mistakes, seasonal guides", pages: "Ongoing" },
                { section: "pSEO Pages", desc: "\"Can I trademark...\", \"TM in [country] from AU\", \"What to do if...\", industry x service, location x service", pages: "200-300 pages" },
              ].map((item, i) => (
                <div key={i} className="p-4 border border-border/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-foreground font-bold font-mono text-xs">{item.section}</span>
                    <span className="text-primary font-bold text-xs whitespace-nowrap ml-2">{item.pages}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Execution Phases */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="04" title="EXECUTION PROTOCOL" />

          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">

            {/* Phase 1: Technical Foundation */}
            <PhaseBlock number="01" icon={<Target className="w-4 h-4" />} label="Phase 1 — Week 1-2" title="Technical Foundation">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Schema Markup</h4>
                  <BulletList items={[
                    "LegalService + Organization + LocalBusiness schema on all pages",
                    "FAQPage schema on every content page (LLMs directly map structured Q&A)",
                    "HowTo schema on process/guide pages",
                    "Person schema for Hollie and Christine (E-E-A-T signals)",
                    "BreadcrumbList navigation for every page",
                  ]} />
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2"><Search className="w-4 h-4 text-primary" /> Technical Checklist</h4>
                  <BulletList items={[
                    "Generate and submit XML sitemap to Google Search Console",
                    "Configure robots.txt",
                    "Set up Google Search Console and GA4",
                    "Fix all image alt text (currently all 'Company E logo')",
                    "Add canonical URLs and Open Graph meta tags to all pages",
                    "Core Web Vitals audit and fixes",
                    "Implement IndexNow for instant indexing of new content",
                    "Internal linking structure between all existing pages",
                  ]} />
                </div>
              </div>
            </PhaseBlock>

            {/* Phase 2: Apex Assets */}
            <PhaseBlock number="02" icon={<FileText className="w-4 h-4" />} label="Phase 2 — Month 1-3" title="Apex Assets (BOFU Content)">
              <HighlightBox className="mb-8">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  40+ hand-crafted, high-intent pages. Each targets a real search query, includes FAQ schema, and is structured for AI citation. These are the pages that rank, convert, and get cited.
                </p>
              </HighlightBox>

              <div className="space-y-6">
                {/* Flagship Guides */}
                <div className="bg-secondary/5 border border-border p-6">
                  <h4 className="text-foreground font-bold font-mono text-sm mb-4">Flagship Guide Pages <span className="text-primary">(10 pages)</span></h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "How to Register a Trade Mark in Australia — Complete 2026 Guide (3,500+ words)",
                      "Trade Mark Registration Costs — Full 2026 Breakdown (with Signify IP's fixed fees)",
                      "Trade Mark vs Copyright vs Patent — What's the Difference?",
                      "Do I Need a Trade Mark Attorney? Attorney vs DIY Filing",
                      "International Trade Mark Registration — Madrid Protocol Guide",
                      "Trade Mark Classes Explained — Complete Australian Guide (all 45 classes)",
                      "Trade Mark Opposition & Disputes — What to Expect",
                      "Trade Mark Renewal Guide — Deadlines, Costs & Process",
                      "Trade Mark Infringement — How to Protect Your Brand",
                      "Trade Marks for Startups — A Founder's Guide to Brand Protection",
                    ].map((page, i) => (
                      <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary font-bold font-mono text-xs shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                        <span>{page}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Pages */}
                <div className="bg-secondary/5 border border-border p-6">
                  <h4 className="text-foreground font-bold font-mono text-sm mb-4">Comparison & Alternative Pages <span className="text-primary">(8 pages)</span></h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Trade Mark Attorney vs Lawyer — What's the Difference?",
                      "TM Headstart vs Standard Application — Which to Choose?",
                      "Signify IP vs The Trademark Factory — Full Comparison",
                      "Best Trade Mark Attorneys in Australia (2026 listicle)",
                      "IP Australia Direct vs Using an Attorney",
                      "Best Trade Mark Attorneys in Adelaide",
                      "Cheapest Ways to Register a Trade Mark in Australia",
                      "Trade Mark Registration Services Compared 2026",
                    ].map((page, i) => (
                      <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{page}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industry Pages */}
                <div className="bg-secondary/5 border border-border p-6">
                  <h4 className="text-foreground font-bold font-mono text-sm mb-4">Industry Landing Pages <span className="text-primary">(9 pages)</span></h4>
                  <div className="flex flex-wrap gap-2">
                    {["Food & Beverage", "Fashion & Clothing", "Technology & SaaS", "E-commerce", "Construction & Trades", "Health & Wellness", "Hospitality & Events", "Professional Services", "Creative & Design"].map((ind) => (
                      <span key={ind} className="px-3 py-1 bg-secondary/10 border border-border text-xs font-mono text-muted-foreground">{ind}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Each page: why TMs matter for that industry, common issues, what to protect, cost estimate, case study, CTA.</p>
                </div>

                {/* Location Pages */}
                <div className="bg-secondary/5 border border-border p-6">
                  <h4 className="text-foreground font-bold font-mono text-sm mb-4">Location Pages <span className="text-primary">(8 pages)</span></h4>
                  <div className="flex flex-wrap gap-2">
                    {["Adelaide (primary)", "Sydney", "Melbourne", "Brisbane", "Perth", "Canberra", "Hobart", "Gold Coast"].map((city) => (
                      <span key={city} className="px-3 py-1 bg-secondary/10 border border-border text-xs font-mono text-muted-foreground">{city}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Each page positions Signify IP as serving that city remotely. Local business stats, TM relevance, testimonials if available.</p>
                </div>

                {/* Resource Pages */}
                <div className="bg-secondary/5 border border-border p-6">
                  <h4 className="text-foreground font-bold font-mono text-sm mb-4">Resource & FAQ Pages <span className="text-primary">(5 pages)</span></h4>
                  <BulletList items={[
                    "Trade Mark FAQ — 50+ common questions answered (FAQPage schema)",
                    "Trade Mark Glossary — every term explained (long-tail definition queries)",
                    "Trade Mark Registration Checklist — downloadable PDF + on-page content",
                    "Trade Mark Application Timeline — visual timeline infographic",
                    "2026 Trade Mark Regulation Changes — topical authority play",
                  ]} />
                </div>
              </div>
            </PhaseBlock>

            {/* Phase 3: pSEO */}
            <PhaseBlock number="03" icon={<Database className="w-4 h-4" />} label="Phase 3 — Month 2-6" title="Programmatic SEO (200-300 Pages)">
              <HighlightBox className="mb-8">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Programmatic pages cover every permutation a potential client might search. Each page is 800-1,200 words of unique content with FAQ schema, internal links to pillar content, and a CTA to free consultation.
                </p>
              </HighlightBox>

              <div className="space-y-4">
                {[
                  { template: "Industry x Service Type", pattern: '"Trade Mark [Service] for [Industry] Businesses"', example: "Trade Mark Search for Restaurant Businesses", count: "36 pages" },
                  { template: "Location x Service Type", pattern: '"Trade Mark [Service] in [City]"', example: "Trade Mark Registration in Sydney", count: "32 pages" },
                  { template: '"Can I Trademark..." Queries', pattern: '"Can I Trademark a [Thing] in Australia?"', example: "Can I Trademark a Colour / Sound / Hashtag / Slogan", count: "20+ pages" },
                  { template: "International Filing", pattern: '"How to Register a Trade Mark in [Country] from Australia"', example: "USA, UK, EU, NZ, Singapore, Japan, China, India, Canada", count: "15+ pages" },
                  { template: "Dispute Scenarios", pattern: '"What to Do If [Scenario]"', example: "...Someone Copies Your Brand / Application Rejected / Cease and Desist", count: "10+ pages" },
                ].map((t, i) => (
                  <div key={i} className="p-4 bg-secondary/5 border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-foreground font-bold text-sm">{t.template}</span>
                      <span className="text-primary font-bold text-xs whitespace-nowrap ml-2">{t.count}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mb-1">{t.pattern}</p>
                    <p className="text-xs text-muted-foreground">e.g. {t.example}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto border border-border rounded-lg mt-8">
                <table className="w-full text-left text-sm min-w-[400px]">
                  <thead className="bg-secondary/20 text-foreground">
                    <tr>
                      <th className="p-4 md:p-6 font-bold">Content Type</th>
                      <th className="p-4 md:p-6 font-bold text-right">Editorial</th>
                      <th className="p-4 md:p-6 font-bold text-right">Programmatic</th>
                      <th className="p-4 md:p-6 font-bold text-right text-primary">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20 bg-secondary/5">
                    <tr>
                      <td className="p-4 md:p-6 text-foreground font-medium text-xs">Apex Assets (BOFU)</td>
                      <td className="p-4 md:p-6 text-muted-foreground text-right">40+</td>
                      <td className="p-4 md:p-6 text-muted-foreground text-right">—</td>
                      <td className="p-4 md:p-6 text-primary font-bold text-right">40+</td>
                    </tr>
                    <tr>
                      <td className="p-4 md:p-6 text-foreground font-medium text-xs">pSEO (TOFU)</td>
                      <td className="p-4 md:p-6 text-muted-foreground text-right">—</td>
                      <td className="p-4 md:p-6 text-muted-foreground text-right">200-300</td>
                      <td className="p-4 md:p-6 text-primary font-bold text-right">200-300</td>
                    </tr>
                    <tr>
                      <td className="p-4 md:p-6 text-foreground font-medium text-xs">Blog / Ongoing</td>
                      <td className="p-4 md:p-6 text-muted-foreground text-right">12+</td>
                      <td className="p-4 md:p-6 text-muted-foreground text-right">—</td>
                      <td className="p-4 md:p-6 text-primary font-bold text-right">12+</td>
                    </tr>
                    <tr className="bg-secondary/10">
                      <td className="p-4 md:p-6 text-foreground font-bold">Total (12 months)</td>
                      <td className="p-4 md:p-6 text-foreground font-bold text-right">52+</td>
                      <td className="p-4 md:p-6 text-foreground font-bold text-right">200-300</td>
                      <td className="p-4 md:p-6 text-primary font-bold text-right">252-352</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </PhaseBlock>

            {/* Phase 4: AEO */}
            <PhaseBlock number="04" icon={<Bot className="w-4 h-4" />} label="Phase 4 — Concurrent from Month 1" title="AEO & AI Visibility">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Citation-Ready Content Formatting</h4>
                  <BulletList items={[
                    "Definitive statements in the first 200 words — LLMs prefer confident, un-hedged answers",
                    "Comparison tables with Signify IP in column 1 (LLMs copy column 1 68% of the time)",
                    "Numbered lists and step-by-step processes (LLMs prefer structured answers)",
                    "Specific data points: exact fees, exact timelines, exact statistics — not vague ranges",
                    "FAQ sections with schema — directly maps to AI Q&A responses",
                    "Author attribution (Hollie Ford, Christine) — builds E-E-A-T for AI trust",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Entity Building</h4>
                  <BulletList items={[
                    "Google Knowledge Panel — claim and optimize business listing",
                    "Crunchbase, LinkedIn Company Page — optimized with full description and services",
                    "Legal directories: IPTA, INTA, Law Society SA, Doyle's Guide, Best Lawyers",
                    "Business directories: TrueLocal, Yellow Pages, Yelp, Hotfrog, StartLocal",
                    "Consistent NAP across all platforms: Signify IP, 213 Greenhill Rd, Eastwood SA 5063",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">AI Platform Seeding</h4>
                  <BulletList items={[
                    "Reddit seeding: r/AusLegal, r/smallbusiness, r/australia — helpful answers citing Signify IP content",
                    "Quora answers for core queries: 'best trade mark attorney,' 'how to register trade mark Australia'",
                    "'According to Signify IP' phrasing baked into parasite and PR content to train citation patterns",
                    "Monthly monitoring across ChatGPT, Perplexity, Gemini, Google AI Overviews — iterate based on what works",
                  ]} />
                </div>
              </div>
            </PhaseBlock>

            {/* Phase 5: Authority Building */}
            <PhaseBlock number="05" icon={<Share2 className="w-4 h-4" />} label="Phase 5 — Month 2 Onwards" title="Trust Relay Network">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Content Placements</h4>
                  <BulletList items={[
                    "LinkedIn Articles (Hollie Ford): 4-6 thought leadership pieces on TM topics",
                    "Medium / business publications: 'How I Helped [Client] Protect Their Brand' — 3-4 articles",
                    "Industry blogs / guest posts: trade mark tips for specific audiences — 3-4 articles",
                    "Startup publications (Startup Daily, etc.): 'Why Every Australian Startup Needs a Trade Mark'",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Backlink Strategy</h4>
                  <div className="overflow-x-auto border border-border rounded-lg">
                    <table className="w-full text-left text-sm min-w-[400px]">
                      <thead className="bg-secondary/20 text-foreground">
                        <tr>
                          <th className="p-4 font-bold">Source Type</th>
                          <th className="p-4 font-bold text-right">Target DR</th>
                          <th className="p-4 font-bold text-right">Quantity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/20 bg-secondary/5">
                        <tr><td className="p-4 text-muted-foreground">Legal directories</td><td className="p-4 text-right text-primary font-bold">DR60-80+</td><td className="p-4 text-right">8-10</td></tr>
                        <tr><td className="p-4 text-muted-foreground">Business directories</td><td className="p-4 text-right text-primary font-bold">DR50-70+</td><td className="p-4 text-right">5-6</td></tr>
                        <tr><td className="p-4 text-muted-foreground">Industry publications</td><td className="p-4 text-right text-primary font-bold">DR40-60+</td><td className="p-4 text-right">3-4</td></tr>
                        <tr><td className="p-4 text-muted-foreground">University/gov resource pages</td><td className="p-4 text-right text-primary font-bold">DR70-90+</td><td className="p-4 text-right">2-3</td></tr>
                        <tr><td className="p-4 text-muted-foreground">Guest posts</td><td className="p-4 text-right text-primary font-bold">DR40-60+</td><td className="p-4 text-right">3-4</td></tr>
                        <tr className="bg-secondary/10"><td className="p-4 text-foreground font-bold">Total</td><td className="p-4"></td><td className="p-4 text-right text-primary font-bold">20+ links</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </PhaseBlock>

            {/* Phase 6: Local SEO */}
            <PhaseBlock number="06" icon={<MapPin className="w-4 h-4" />} label="Phase 6 — Month 1-3" title="Local SEO — Adelaide Domination">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Google Business Profile</h4>
                  <BulletList items={[
                    "Add all services with descriptions and pricing",
                    "Upload 20+ professional photos (office, team, process)",
                    "Write full business description using target keywords",
                    "Add service areas (all major Australian cities)",
                    "Post weekly Google Business updates",
                    "Respond to all reviews with keyword-rich responses",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Review Generation</h4>
                  <BulletList items={[
                    "Post-service email requesting Google review",
                    "Review link in email signatures",
                    "Target: 2-3 new reviews per month (reach 30+ reviews within 6 months)",
                    "Respond to every review within 24 hours",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Local Citations (10+ directories)</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Yellow Pages AU", "TrueLocal", "Hotfrog", "StartLocal", "Yelp AU", "White Pages", "Adelaide Now", "SA.gov.au"].map((dir) => (
                      <span key={dir} className="px-2 py-1 bg-secondary/10 border border-border text-xs font-mono text-muted-foreground">{dir}</span>
                    ))}
                  </div>
                </div>
              </div>
            </PhaseBlock>

            {/* Phase 7: Measurement */}
            <PhaseBlock number="07" icon={<BarChart3 className="w-4 h-4" />} label="Ongoing" title="Measurement & KPIs">
              <div className="space-y-6">
                <div className="overflow-x-auto border border-border rounded-lg">
                  <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-secondary/20 text-foreground">
                      <tr>
                        <th className="p-4 md:p-6 font-bold">Metric</th>
                        <th className="p-4 md:p-6 font-bold text-right">Now</th>
                        <th className="p-4 md:p-6 font-bold text-right">6-Month</th>
                        <th className="p-4 md:p-6 font-bold text-right text-primary">12-Month</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20 bg-secondary/5">
                      {[
                        { metric: "Indexed pages", now: "1", six: "100+", twelve: "300+" },
                        { metric: "Organic traffic (monthly)", now: "~0", six: "500-1,000", twelve: "3,000-5,000" },
                        { metric: "Keywords ranking top 10", now: "0", six: "30-50", twelve: "150-200" },
                        { metric: "Referring domains", now: "0", six: "20-30", twelve: "50+" },
                        { metric: "Domain Rating", now: "~0", six: "15-25", twelve: "30-40" },
                        { metric: "AI citation rate (20 queries)", now: "0/20", six: "5-8/20", twelve: "12-15/20" },
                        { metric: "Organic leads per month", now: "0", six: "10-20", twelve: "40-60" },
                        { metric: "Consultation bookings (organic)", now: "0", six: "5-10", twelve: "20-30" },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="p-4 md:p-6 text-foreground font-medium text-xs">{row.metric}</td>
                          <td className="p-4 md:p-6 text-muted-foreground text-right">{row.now}</td>
                          <td className="p-4 md:p-6 text-muted-foreground text-right">{row.six}</td>
                          <td className="p-4 md:p-6 text-primary font-bold text-right">{row.twelve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </PhaseBlock>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="05" title="12-MONTH ROADMAP" />
          <div className="overflow-x-auto border border-border rounded-lg mb-8">
            <table className="w-full text-left text-sm min-w-[700px]">
              <thead className="bg-secondary/20 text-foreground">
                <tr>
                  <th className="p-4 md:p-6 font-bold">Timeline</th>
                  <th className="p-4 md:p-6 font-bold">What We're Doing</th>
                  <th className="p-4 md:p-6 font-bold">What You'll See</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 bg-secondary/5">
                {[
                  {
                    time: "Month 1",
                    doing: "Technical foundation. Schema markup. Sitemap + GSC. Flagship guides #1-3 published. Pricing page. FAQ page. GBP optimization. Local citations. AEO baseline audit.",
                    seeing: "Site indexed properly in Google. Content calendar delivered. First pages ranking for long-tail queries.",
                  },
                  {
                    time: "Month 2-3",
                    doing: "Flagship guides #4-10 published. Comparison pages. Adelaide + Sydney + Melbourne location pages. Industry landing pages begin. LinkedIn article series. First Reddit/Medium placements.",
                    seeing: "40-50 pages live. Long-tail rankings appearing. First organic impressions in Search Console.",
                  },
                  {
                    time: "Month 4-6",
                    doing: "pSEO launch: 80-100 programmatic pages deployed. Remaining location + industry pages. Link building campaigns. Ongoing AEO entity building.",
                    seeing: "130-155 pages live. Rankings climbing. First organic leads hitting forms. AI platforms starting to reference content.",
                  },
                  {
                    time: "Month 7-9",
                    doing: "International filing pages. Dispute scenario pages. Second wave of link building. PR placements. Content refresh on top performers.",
                    seeing: "190-235 pages live. Organic becoming a consistent lead channel. Multiple AI platforms citing Signify IP. Monthly leads growing.",
                  },
                  {
                    time: "Month 10-12",
                    doing: "Remaining competitor pages. Final pSEO batch. Full content audit. Optimization pass. Year 2 planning.",
                    seeing: "230-295 pages live. 150-200 ranking keywords. 40-60 organic leads/month. Top-3 AI cited source for TM queries.",
                  },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 md:p-6 text-primary font-bold whitespace-nowrap align-top">{row.time}</td>
                    <td className="p-4 md:p-6 text-muted-foreground align-top">{row.doing}</td>
                    <td className="p-4 md:p-6 text-foreground align-top">{row.seeing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Publishing velocity */}
          <div className="overflow-x-auto border border-border rounded-lg mb-8">
            <table className="w-full text-left text-sm min-w-[400px]">
              <thead className="bg-secondary/20 text-foreground">
                <tr>
                  <th className="p-4 md:p-6 font-bold">Quarter</th>
                  <th className="p-4 md:p-6 font-bold text-right">New Pages</th>
                  <th className="p-4 md:p-6 font-bold text-right text-primary">Cumulative</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 bg-secondary/5">
                <tr><td className="p-4 md:p-6 text-foreground">Q1 (Month 1-3)</td><td className="p-4 md:p-6 text-right text-muted-foreground">40-50</td><td className="p-4 md:p-6 text-right text-primary font-bold">50-55</td></tr>
                <tr><td className="p-4 md:p-6 text-foreground">Q2 (Month 4-6)</td><td className="p-4 md:p-6 text-right text-muted-foreground">80-100</td><td className="p-4 md:p-6 text-right text-primary font-bold">130-155</td></tr>
                <tr><td className="p-4 md:p-6 text-foreground">Q3 (Month 7-9)</td><td className="p-4 md:p-6 text-right text-muted-foreground">60-80</td><td className="p-4 md:p-6 text-right text-primary font-bold">190-235</td></tr>
                <tr><td className="p-4 md:p-6 text-foreground">Q4 (Month 10-12)</td><td className="p-4 md:p-6 text-right text-muted-foreground">40-60</td><td className="p-4 md:p-6 text-right text-primary font-bold">230-295</td></tr>
              </tbody>
            </table>
          </div>

          <HighlightBox>
            <p className="text-sm md:text-base text-muted-foreground italic">
              Signify IP has a strong brand, excellent reviews, and a clear value proposition — but zero organic presence. Most competitors haven't started. The firms that build content authority now will <span className="text-primary font-bold not-italic">own this vertical for years.</span>
            </p>
          </HighlightBox>
        </section>

        {/* Investment */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="06" title="INVESTMENT" />

          <div className="text-center mb-8 p-4 border-2 border-primary">
            <p className="text-lg md:text-xl font-display font-bold text-foreground">
              Month-to-month. No lock-in contract. Cancel anytime.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Every page we build stays on your site — permanently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Ignite */}
            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-foreground font-bold text-lg mb-1">Ignite</h3>
              <p className="text-xs text-muted-foreground font-mono mb-4">No lock-in contract</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">$2,200<span className="text-muted-foreground text-lg">/mo</span></p>
              <BulletList items={[
                "Full technical SEO setup (schema, sitemap, GSC, GA4, Core Web Vitals)",
                "10 flagship guide pages",
                "5 location pages (Adelaide + 4 major cities)",
                "30 programmatic SEO pages",
                "Google Business Profile optimization",
                "Local citation submissions (10+ directories)",
                "Monthly reporting",
              ]} />
              <div className="mt-6 pt-4 border-t border-border/50">
                <p className="text-xs font-mono text-primary font-bold">~50 PAGES OVER 3 MONTHS</p>
              </div>
            </div>

            {/* Authority */}
            <div className="bg-secondary/5 border-2 border-primary p-6 md:p-8 relative">
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-mono font-bold px-3 py-1">RECOMMENDED</span>
              <h3 className="text-foreground font-bold text-lg mb-1">Authority</h3>
              <p className="text-xs text-muted-foreground font-mono mb-4">No lock-in contract</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">$3,500<span className="text-muted-foreground text-lg">/mo</span></p>
              <BulletList items={[
                "Everything in Ignite",
                "Full 40+ editorial pages (guides, comparisons, industry, all 8 locations)",
                "200-300 programmatic SEO pages (every permutation)",
                "12+ expanded case studies",
                "Press releases (2/month)",
                "Blog content (2 posts/month)",
                "AEO baseline audit + quarterly monitoring",
                "Review generation strategy + templates",
                "Legal directory submissions (IPTA, Law Society SA, Doyle's Guide)",
                "Monthly reporting with SEO + AEO + conversion tracking",
              ]} />
              <div className="mt-6 pt-4 border-t border-primary/30">
                <p className="text-xs font-mono text-primary font-bold">350+ PAGES OVER 6 MONTHS</p>
              </div>
            </div>

            {/* Dominance */}
            <div className="bg-secondary/5 border border-border p-6 md:p-8">
              <h3 className="text-foreground font-bold text-lg mb-1">Dominance</h3>
              <p className="text-xs text-muted-foreground font-mono mb-4">No lock-in contract</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">$5,500<span className="text-muted-foreground text-lg">/mo</span></p>
              <BulletList items={[
                "Everything in Authority",
                "Dedicated backlink outreach (5+ DR50+ links/month)",
                "LinkedIn ghostwriting for Hollie Ford (2/month)",
                "Guest post placements (1-2/month)",
                "Reddit + Quora seeding (ongoing brand mentions)",
                "Medium articles + content placements",
                "Monthly AEO monitoring + optimization",
                "Competitor monitoring dashboard",
                "Quarterly content refresh on top performers",
                "Priority Slack/email support",
              ]} />
              <div className="mt-6 pt-4 border-t border-border/50">
                <p className="text-xs font-mono text-primary font-bold">350+ PAGES, 20+ BACKLINKS, 30+ PLACEMENTS</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm font-mono text-primary font-bold uppercase tracking-widest mb-4">More investment = faster compounding</p>
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full text-left text-sm min-w-[500px]">
                <thead className="bg-secondary/20 text-foreground">
                  <tr>
                    <th className="p-4 md:p-6 font-bold"></th>
                    <th className="p-4 md:p-6 font-bold text-center">Ignite</th>
                    <th className="p-4 md:p-6 font-bold text-center text-primary">Authority</th>
                    <th className="p-4 md:p-6 font-bold text-center">Dominance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 bg-secondary/5">
                  <tr>
                    <td className="p-4 md:p-6 text-foreground font-medium text-xs">Pages published</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">~50</td>
                    <td className="p-4 md:p-6 text-primary font-bold text-center">350+</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">350+</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 text-foreground font-medium text-xs">Organic leads/month (month 12)</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">5-15</td>
                    <td className="p-4 md:p-6 text-primary font-bold text-center">40-60</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">50-80</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 text-foreground font-medium text-xs">Time to ROI</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">6-9 months</td>
                    <td className="p-4 md:p-6 text-primary font-bold text-center">3-5 months</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">2-4 months</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 text-foreground font-medium text-xs">AI citation tracking</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">—</td>
                    <td className="p-4 md:p-6 text-primary font-bold text-center">Quarterly</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">Monthly</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 text-foreground font-medium text-xs">Backlink building</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">Organic only</td>
                    <td className="p-4 md:p-6 text-primary font-bold text-center">PR + directories</td>
                    <td className="p-4 md:p-6 text-muted-foreground text-center">Dedicated outreach</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 flex gap-4 items-start">
            <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div className="text-sm">
              <strong className="text-foreground block mb-1">The economics</strong>
              <span className="text-muted-foreground">
                On Authority at $3,500/month — by month 12, you're looking at 40-60 organic leads per month. At a conservative 20% conversion to paid consultations, that's 8-12 new clients per month from organic alone. At Signify IP's average engagement value, the ROI pays for itself many times over. And unlike paid ads, it compounds — every page we build keeps working permanently.
              </span>
            </div>
          </div>
        </section>

        {/* Next Steps + CTA */}
        <section className="text-center max-w-2xl mx-auto">
          <SectionHeader number="07" title="NEXT STEPS" />

          <div className="text-left mb-12">
            <div className="space-y-4">
              {[
                "Review this strategy document and confirm priorities",
                "Technical setup begins (week 1-2): schema, sitemap, GSC, analytics",
                "First flagship content published by end of month 1",
                "Programmatic content and link building from month 2",
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-secondary/5 border border-border">
                  <span className="flex h-6 w-6 items-center justify-center rounded-none bg-primary text-primary-foreground font-bold text-xs shrink-0">{i + 1}</span>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://cal.com/memetik/letstalk"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono font-bold text-sm overflow-hidden rounded-none border-2 border-primary shadow-[4px_4px_0px_0px_var(--color-foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 inline-flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <div className="relative flex items-center gap-2">
              LET'S TALK
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          <p className="mt-8 text-xs text-neutral-600 uppercase tracking-widest">/// End of Strategy</p>
        </section>
      </main>
    </div>
  );
}
