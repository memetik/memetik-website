import { useEffect } from "react";
import { Target, Database, Share2, RotateCw, CheckCircle, Zap, ArrowRight, Globe, AlertTriangle, Search, Bot, FileText, TrendingUp } from "lucide-react";
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

const competitors = [
  { site: "canstar.com.au", traffic: "1.4M/month", desc: "Star ratings system, trust signals, 1000+ indexed pages per vertical" },
  { site: "moneysmart.gov.au", traffic: "1.3M/month", desc: "Government authority, E-E-A-T maxed out, cited by every AI platform" },
  { site: "comparethemarket.com.au", traffic: "901.6K/month", desc: "Brand recognition, massive content library, every insurer × product type covered" },
  { site: "choice.com.au", traffic: "663.7K/month", desc: 'Independent reviews, "we don\'t take commission" positioning' },
  { site: "finder.com.au", traffic: "448.7K/month", desc: "Widest keyword coverage, comparison tools, policy breakdowns" },
  { site: "stockspot.com.au", traffic: "52.1K/month", desc: 'Original research ("Fat Cat Funds Report"), digital PR machine' },
  { site: "superratings.com.au", traffic: "14.6K/month", desc: "Industry authority, awards, data-driven content, media citations" },
];

export default function StrategyUleads() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Uleads — SEO & AEO Strategy | MEMETIK";
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
            ULEADS <br />
            <span className="text-primary">SEO & AEO STRATEGY.</span>
          </h1>

          <div className="flex flex-wrap gap-3 mt-6">
            {["boostursuper.com", "righthealthinsurance.com", "rightlifeinsure.com"].map((site) => (
              <span key={site} className="px-3 py-1 bg-secondary/10 border border-border text-sm font-mono text-muted-foreground">
                {site}
              </span>
            ))}
          </div>
        </div>

        {/* Current State */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="00" title="CURRENT STATE" />

          <HighlightBox className="mb-8">
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">What's Missing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "No indexable content beyond the landing page — Google has nothing to rank",
                "No blog, no resource pages, no comparison content",
                "No schema markup",
                "No sitemap or robots.txt configuration",
                "No backlink profile",
                "Zero presence in AI platforms (ChatGPT, Perplexity, Google AI Overviews)",
              ].map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </HighlightBox>

          <div className="bg-secondary/5 border border-border p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              The organic opportunity is massive — and completely untapped.
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Superannuation, health insurance, and life insurance are three of the highest-volume, highest-intent search verticals in Australian finance. Millions of Australians search for help with these decisions every year. The sites that capture that traffic — Canstar, Finder, Compare the Market, Money.com.au — built eight and nine-figure businesses on the back of organic content that converts searchers into leads.
              </p>
              <p>
                Right now, Uleads has three sites in three of those exact verticals with proven funnels and proven demand (paid ads confirm it). But every lead costs ad spend, and the moment you stop spending, the leads stop. There is zero organic presence — no content, no rankings, no AI visibility. That's not a problem, it's a gap. And it's the kind of gap where closing it changes the economics of the entire business.
              </p>
              <p>
                Organic leads compound. A page published in month 2 is still generating leads in month 12 and beyond. The three verticals share the same audience — Australians making financial decisions — which means content, links, and authority built on one site reinforces the others. This isn't three separate SEO projects. It's one ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* Competitive Landscape */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="01" title="COMPETITIVE LANDSCAPE" />

          <div className="space-y-6 mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Superannuation",
                  desc: "Dominated by AustralianSuper (27.3% share of search), ATO (23.1%), and Moneysmart (13.9%). Top 5 control 73% of search. Long-tail queries like \"should I switch super funds\" and \"best super fund for under 30s\" are less contested and high-intent.",
                },
                {
                  title: "Health Insurance",
                  desc: "Bupa (24.3%), Compare the Market (15.5%), and Medibank (14.4%) own head terms. Comparison-intent queries are where smaller players win. Finder, Canstar, and Money.com.au prove the model works.",
                },
                {
                  title: "Life Insurance",
                  desc: "Allianz (22.7%), Moneysmart (13.7%), Compare the Market (8.7%). Less consolidated than health insurance — more room for a content-rich comparison site to rank.",
                },
              ].map((v, i) => (
                <div key={i} className="p-6 bg-secondary/5 border border-border">
                  <h3 className="text-foreground font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-foreground font-bold mb-4 text-lg">Who Owns These Verticals</h3>
          <div className="overflow-x-auto border border-border rounded-lg mb-8">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-secondary/20 text-foreground">
                <tr>
                  <th className="p-4 md:p-6 font-bold">Site</th>
                  <th className="p-4 md:p-6 font-bold text-right">Organic Traffic</th>
                  <th className="p-4 md:p-6 font-bold">What They Do Well</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 bg-secondary/5">
                {competitors.map((c, i) => (
                  <tr key={i}>
                    <td className="p-4 md:p-6 text-foreground font-medium font-mono text-xs">{c.site}</td>
                    <td className="p-4 md:p-6 text-primary font-bold text-right whitespace-nowrap">{c.traffic}</td>
                    <td className="p-4 md:p-6 text-muted-foreground">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mb-8">Data sourced from Semrush, February 2026.</p>

          {/* Where Uleads sits */}
          <HighlightBox>
            <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Where Uleads Sits Today</h3>
            <p className="text-2xl md:text-4xl font-display font-bold text-foreground">
              0 <span className="text-muted-foreground text-lg">organic traffic.</span>{" "}
              0 <span className="text-muted-foreground text-lg">indexed content pages.</span>{" "}
              0 <span className="text-muted-foreground text-lg">referring domains.</span>{" "}
              0 <span className="text-muted-foreground text-lg">AI citations.</span>
            </p>
            <p className="text-sm text-muted-foreground mt-4">The strategy below is designed to close that gap.</p>
          </HighlightBox>
        </section>

        {/* Strategy */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="02" title="STRATEGY: CONTENT-LED LEAD GEN + AEO" />
          <HighlightBox className="mb-16">
            <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-tight">
              Turn each single-page funnel into a <span className="text-primary">content-rich authority site</span> that ranks for hundreds of long-tail, high-intent queries and gets cited by AI platforms. Every piece of content funnels back to the lead capture form.
            </p>
          </HighlightBox>
        </section>

        {/* Phases */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="03" title="EXECUTION PROTOCOL" />

          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">

            {/* Phase 1 */}
            <PhaseBlock number="01" icon={<Target className="w-4 h-4" />} label="Phase 1 — Month 1-2" title="Foundation">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Technical Setup (All 3 Sites)</h4>
                  <BulletList items={[
                    "Determine CMS capability — can GoHighLevel support a blog/content section, or do we need a subdomain or subdirectory on a separate platform?",
                    "Sitemap generation and submission to Google Search Console",
                    "robots.txt configuration",
                    "Schema markup: Organization, FAQPage, BreadcrumbList, WebSite on all pages",
                    "Google Search Console and Google Analytics setup for all 3 domains",
                    "Core Web Vitals audit and fixes",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2"><Search className="w-4 h-4 text-primary" /> Competitor Reverse-Engineering</h4>
                  <BulletList items={[
                    "Pull the complete keyword profile of every top-performing site in each vertical (Canstar, Finder, Compare the Market, Money.com.au, SuperRatings, Mozo, Lifebroker, etc.)",
                    "Identify every page that ranks, what it ranks for, estimated traffic, and backlink profile",
                    "Map their site architecture — how they structure categories, internal links, content hubs, and conversion funnels",
                    "Analyse their schema markup, page templates, CTA placement, and content formats",
                    "Identify exactly which content types drive their organic leads (comparison pages, \"best of\" lists, insurer reviews, calculators, guides)",
                    "Document everything that works and strip out what doesn't — this becomes the blueprint for all three Uleads sites",
                    "The goal is not to copy — it's to reverse-engineer the content model, improve on it, and deploy it faster across three sites simultaneously",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2"><Database className="w-4 h-4 text-primary" /> Keyword Research & Content Architecture</h4>
                  <BulletList items={[
                    "Full keyword map for each vertical built from competitor reverse-engineering + fresh research",
                    "Content calendar: 12-month publishing schedule per site, prioritised by traffic potential and conversion intent",
                    "Internal linking architecture designed to funnel authority to lead capture pages",
                    "Content gap analysis — every high-traffic page competitors rank for that these sites don't becomes a content brief",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3 flex items-center gap-2"><Bot className="w-4 h-4 text-primary" /> Baseline AEO Audit</h4>
                  <BulletList items={[
                    "Query each AI platform (ChatGPT, Perplexity, Gemini, Google AI Overviews) for core queries in each vertical",
                    "Document which brands get cited and why",
                    "Identify the content patterns AI models prefer to cite (structure, data, authority signals)",
                  ]} />
                </div>
              </div>
            </PhaseBlock>

            {/* Phase 2 */}
            <PhaseBlock number="02" icon={<Database className="w-4 h-4" />} label="Phase 2 — Month 2 Onwards" title="Content Engine">
              <p className="text-muted-foreground mb-8 max-w-2xl">15-20 pieces per site per month. Every article targets a real search query. Every article funnels to the lead capture form.</p>

              <div className="space-y-6 mb-8">
                {[
                  {
                    site: "boostursuper.com",
                    items: [
                      '"Is [Fund Name] any good?" reviews for every major super fund',
                      '"Best super fund for [segment]" — under 30s, over 50s, self-employed, high balance, low fees',
                      '"How to" guides — consolidate super, switch funds, find lost super, boost super with salary sacrifice',
                      "Super performance comparison pages (updated quarterly with public data)",
                      'Calculator content — "how much super should I have at [age]"',
                      "FAQ content with schema — targets featured snippets and AI extraction",
                    ],
                  },
                  {
                    site: "righthealthinsurance.com",
                    items: [
                      '"Best health insurance for [segment]" — singles, couples, families, young adults, seniors, pregnancy',
                      "Policy type explainers — hospital vs extras, gold vs silver vs bronze, gap cover explained",
                      "Insurer reviews — Bupa, Medibank, nib, HCF, ahm, etc.",
                      '"Is health insurance worth it?" and MLS/LHC penalty explainer content',
                      'Comparison pages — "[Insurer A] vs [Insurer B]" head-to-head reviews',
                      "Seasonal content — health insurance premium increase April, tax time reminders",
                    ],
                  },
                  {
                    site: "rightlifeinsure.com",
                    items: [
                      '"Best life insurance for [segment]" — young families, mortgage holders, self-employed, over 50s',
                      "Policy type explainers — term life vs whole life, TPD, trauma cover, income protection",
                      "Insurer reviews — TAL, AIA, Zurich, OnePath, MLC, NobleOak",
                      '"Life insurance through super vs direct" — high-intent comparison content',
                      'Calculator content — "how much life insurance do I need"',
                      'Claims process guides and "what does life insurance actually cover" trust content',
                    ],
                  },
                ].map((s, i) => (
                  <div key={i} className="bg-secondary/5 border border-border p-6">
                    <h4 className="text-foreground font-bold font-mono text-sm mb-4">{s.site}</h4>
                    <BulletList items={s.items} />
                  </div>
                ))}
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 flex gap-4 items-start">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-sm">
                  <strong className="text-foreground block mb-1">Content Principles</strong>
                  <span className="text-muted-foreground">
                    Every article targets a real search query with commercial or informational intent. FAQ schema on every page. Content structured for AI extraction — clear, quotable answers in the first 100 words. E-E-A-T signals — author bios, sources cited, "reviewed by licensed adviser" badges where possible.
                  </span>
                </div>
              </div>
            </PhaseBlock>

            {/* Phase 3 */}
            <PhaseBlock number="03" icon={<Share2 className="w-4 h-4" />} label="Phase 3 — Month 2 Onwards" title="Authority Building">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Link Building</h4>
                  <BulletList items={[
                    "Guest posts on personal finance blogs and insurance comparison sites",
                    "Niche edits on existing finance/insurance content",
                    "HARO/Connectively/SourceBottle journalist queries — position as expert sources",
                    "Finance directory submissions",
                    'Digital PR — original data pieces (e.g. "We compared 50 super funds for Australians under 30 — here\'s what we found") pitched to finance publications',
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Press Releases</h4>
                  <BulletList items={[
                    "Distributed across finance and insurance publications",
                    "Each release generates syndicated placements, backlinks, and brand entity signals for AI training data",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Parasite SEO</h4>
                  <BulletList items={[
                    "Publish optimized articles on Medium, LinkedIn, and finance editorial platforms",
                    "Target high-intent comparison and review queries",
                    "Each placement links back to the relevant Uleads site and builds domain authority by association",
                  ]} />
                </div>
              </div>
            </PhaseBlock>

            {/* Phase 4 */}
            <PhaseBlock number="04" icon={<RotateCw className="w-4 h-4" />} label="Phase 4 — Ongoing from Month 1" title="AEO & AI Visibility">
              <div className="space-y-8">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Reddit & Quora Seeding</h4>
                  <BulletList items={[
                    "Seed brand mentions in relevant threads: r/AusFinance, r/AusHENRY, r/fiaustralia for super and life insurance",
                    "r/australia, personal finance forums for health insurance",
                    'Quora answers for "best super fund," "how to compare health insurance Australia," "do I need life insurance"',
                    "AI models scrape both platforms heavily — every mention strengthens citation likelihood",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Entity Building</h4>
                  <BulletList items={[
                    "Consistent NAP (name, address, phone) and brand signals across all web properties",
                    "Ensure all 3 brands appear in directory listings, review platforms, and social profiles",
                    "Press release distribution builds entity signals that feed Google's Knowledge Panel and AI training data",
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">Content Structure for AI</h4>
                  <BulletList items={[
                    'Every key article opens with a clear, direct answer to the query (the "AI-citable statement")',
                    "FAQ sections with structured data",
                    "Data tables and comparison charts that AI models prefer to reference",
                    '"According to [Brand]" phrasing baked into parasite and PR content to train citation patterns',
                  ]} />
                </div>

                <div>
                  <h4 className="text-foreground font-bold text-sm mb-3">AI Monitoring</h4>
                  <BulletList items={[
                    "Monthly tracking of all 3 brands across ChatGPT, Perplexity, Gemini, Google AI Overviews",
                    "Track which queries trigger citations and which don't",
                    "Iterate content and entity signals based on what's working",
                  ]} />
                </div>
              </div>
            </PhaseBlock>
          </div>
        </section>

        {/* Programmatic Content */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="04" title="PROGRAMMATIC CONTENT OPPORTUNITY" />
          <p className="text-muted-foreground mb-8">Each vertical has a natural programmatic play that scales each site from 1 page to hundreds of indexed pages targeting long-tail queries.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                site: "boostursuper.com",
                desc: "Auto-generate a page for every super fund in Australia (100+ funds). Template: fund overview, fees, performance, reviews, \"is [fund] right for you?\" CTA.",
              },
              {
                site: "righthealthinsurance.com",
                desc: "Auto-generate pages for every health insurer × policy type combination. Template: insurer overview, policy breakdown, pros/cons, comparison CTA.",
              },
              {
                site: "rightlifeinsure.com",
                desc: "Auto-generate pages for every life insurer × cover type combination (term life, TPD, trauma, income protection). Template: insurer overview, cover details, claims data, comparison CTA.",
              },
            ].map((p, i) => (
              <div key={i} className="p-6 bg-secondary/5 border border-border">
                <h3 className="text-foreground font-bold font-mono text-sm mb-3">{p.site}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="05" title="WHAT TO EXPECT" />
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead className="bg-secondary/20 text-foreground">
                <tr>
                  <th className="p-4 md:p-6 font-bold">Timeline</th>
                  <th className="p-4 md:p-6 font-bold">Milestone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 bg-secondary/5">
                {[
                  { time: "Month 1-2", milestone: "Technical foundation live. Content publishing begins. Sites start getting indexed." },
                  { time: "Month 3-4", milestone: "Long-tail keywords entering rankings. First organic traffic. AI audit showing gaps and opportunities." },
                  { time: "Month 5-6", milestone: "Dozens of pages ranking. Organic leads starting to come through forms." },
                  { time: "Month 7-9", milestone: "Content compounding. Organic becoming a consistent lead source alongside paid." },
                  { time: "Month 10-12", milestone: "Hundreds of indexed pages. Organic lead volume growing month over month. AI citations beginning to appear." },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 md:p-6 text-primary font-bold whitespace-nowrap">{row.time}</td>
                    <td className="p-4 md:p-6 text-muted-foreground">{row.milestone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Next Steps + CTA */}
        <section className="text-center max-w-2xl mx-auto">
          <SectionHeader number="06" title="NEXT STEPS" />

          <div className="text-left mb-12">
            <div className="space-y-4">
              {[
                "Confirm CMS capabilities (can we add content to the existing sites, or do we need subdomains/separate platforms?)",
                "Technical setup and content calendars delivered (week 1-2)",
                "Content publishing begins (week 3)",
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
