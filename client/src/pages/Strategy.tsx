import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, Target, Database, Share2, RotateCw, CheckCircle, Zap, FileText, Network, ArrowRight, ChevronRight } from "lucide-react";
import { Nav } from "@/components/Nav";

// Shared Components for cleaner layout
const SectionHeader = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-4 mb-8 md:mb-12 border-b border-primary/20 pb-4">
    <span className="text-primary font-mono text-xl font-bold">{number}</span>
    <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground tracking-tight">{title}</h2>
  </div>
);

const HighlightBox = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-secondary/10 border border-primary/20 p-6 md:p-8 relative overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
    {children}
  </div>
);

export default function Strategy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Strategy Protocol | MEMETIK AEO & SEO Agency";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
      <Nav />
      
      <main className="pt-24 pb-32 px-4 md:px-12 container mx-auto max-w-5xl">
        
        {/* 1. Header Section - Clean & Authoritative */}
        <div 
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold tracking-wider uppercase mb-6">
            <ShieldAlert className="w-3 h-3" />
            Classified Strategy /// Do Not Distribute
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tighter mb-6 leading-[0.95]">
            ALGORITHMIC <br/>
            <span className="text-primary">MARKET CAPTURE.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
            The 90-day protocol to become the default, mathematical answer in ChatGPT, Claude, and Perplexity.
          </p>
        </div>

        {/* 2. The Promise - High Impact */}
        <section 
          className="mb-24 md:mb-32"
        >
          <HighlightBox className="bg-gradient-to-br from-secondary/5 to-background">
             <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">The Promise</h3>
             <p className="text-xl md:text-3xl lg:text-4xl font-display font-medium text-foreground leading-tight mb-8">
               "When any buyer anywhere in the world describes their exact problem to an Answer Engine, your company is the <span className="text-primary">default, confident, unhedged answer</span> the internet gives: not a link, not a footnote, not “one of the options,” the <span className="text-primary">canonical source</span>."
             </p>
             <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground border-t border-primary/10 pt-8">
               <div>
                 <strong className="text-foreground block mb-2">Today:</strong>
                 Legacy incumbents and random blogs own the answer. Your brand is hidden or footnoted.
               </div>
               <div>
                 <strong className="text-foreground block mb-2 text-primary">Tomorrow:</strong>
                 Your brand is the canonical source. AI drives demos, sign-ups, and bundles straight to your door.
               </div>
             </div>
          </HighlightBox>
        </section>

        {/* 3. Who We Work With - Simple Grid */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="01" title="TARGET PROFILE" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Series A-C SaaS", desc: "High-growth tech needing category dominance." },
              { title: "$20-300M E-com", desc: "DTC brands fighting for comparison tables." },
              { title: "$10-150M B2B Services", desc: "Consulting, Agencies, Firms, & MSPs seeking vendor shortlists." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-secondary/5 border border-border hover:border-primary/30 transition-colors group">
                <h3 className="text-foreground font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. The Shift - Data Visuals */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="02" title="THE SHIFT" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="text-5xl md:text-8xl font-display font-bold text-foreground">71%</span>
                <span className="text-primary font-mono text-sm uppercase tracking-wider border-l-2 border-primary pl-3 mt-2">
                  Of commercial queries end with <br/> ZERO clicks (SparkToro Q3 2025)
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl md:text-8xl font-display font-bold text-foreground">9-15<span className="text-3xl md:text-4xl">mo</span></span>
                <span className="text-primary font-mono text-sm uppercase tracking-wider border-l-2 border-primary pl-3 mt-2">
                  Training data window closes <br/> for 2026-2028 models
                </span>
              </div>
            </div>
            <div className="bg-secondary/5 p-8 border border-border space-y-6">
               <h4 className="text-foreground font-bold mb-4">The Behavior Has Changed</h4>
               <ul className="space-y-4 text-sm text-muted-foreground">
                 <li className="flex gap-3">
                   <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                   <span><strong>SaaS:</strong> 41% of buyers start with "best X for Y" directly in LLMs (Gartner).</span>
                 </li>
                 <li className="flex gap-3">
                   <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                   <span><strong>E-com:</strong> 63% of discovery is comparison-style inside Perplexity (Datos).</span>
                 </li>
                 <li className="flex gap-3">
                   <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                   <span><strong>B2B:</strong> 58% of procurement teams ask LLMs for shortlists first (Forrester).</span>
                 </li>
               </ul>
            </div>
          </div>
        </section>

        {/* 5. The Methodology - Timeline */}
        <section className="mb-24 md:mb-32">
          <SectionHeader number="03" title="EXECUTION PROTOCOL" />
          
          {/* Timeline container with corrected alignment for mobile/desktop */}
          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">
            
            {/* Phase 1 */}
            <div className="relative">
              <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-[0_0_10px_rgba(249,115,22,0.5)]">01</span>
              <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" /> Phase 1
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Citation Void Audit</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                We run 100+ real buyer prompts across 7 engines to find where you are invisible. We deliver a <strong>Capital Allocation Roadmap</strong> naming your exact 3 "Money Entities".
              </p>
              <div className="bg-secondary/10 p-6 border border-border rounded-lg">
                 <h4 className="text-foreground text-xs font-bold uppercase mb-4 opacity-70">Example Money Entities We Seize</h4>
                 <div className="grid gap-4 text-sm">
                   <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-b border-border pb-2">
                     <span className="text-primary font-bold w-24 shrink-0">Liquid I.V.</span>
                     <span className="text-neutral-400">"best electrolyte powder 2026", "Liquid I.V. vs LMNT for hydration"</span>
                   </div>
                   <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-b border-border pb-2">
                     <span className="text-primary font-bold w-24 shrink-0">Slack</span>
                     <span className="text-neutral-400">"best enterprise chat 2026", "Slack vs Microsoft Teams for startups"</span>
                   </div>
                   <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                     <span className="text-primary font-bold w-24 shrink-0">Deloitte</span>
                     <span className="text-neutral-400">"top digital transformation consultants", "Deloitte vs McKinsey for AI strategy"</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative">
              <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-border font-bold text-sm">02</span>
              <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
                <Database className="w-4 h-4" /> Phase 2
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Proprietary Data Core</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                We build the permanent moat. Tier 1 "Apex Assets" (Flagship Content) and Tier 2 "Knowledge Graph" (Programmatic Data).
              </p>
              
              {/* Funnel Table */}
              <div className="mb-8 overflow-x-auto border border-border rounded-lg bg-secondary/5">
                 <table className="w-full text-left text-xs md:text-sm">
                   <thead className="bg-secondary/20 text-foreground font-bold">
                     <tr>
                       <th className="p-4 whitespace-nowrap">Funnel Layer</th>
                       <th className="p-4 whitespace-nowrap">% Pages</th>
                       <th className="p-4 min-w-[200px]">Strategy</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border/20 text-muted-foreground">
                     <tr>
                       <td className="p-4 text-foreground font-bold whitespace-nowrap">BOFU (Bottom)</td>
                       <td className="p-4 text-primary whitespace-nowrap">5-8%</td>
                       <td className="p-4">The 3 money questions. "Best electrolyte powder 2026". (8-12 flagship pages)</td>
                     </tr>
                     <tr>
                       <td className="p-4 text-foreground font-bold whitespace-nowrap">MOFU (Middle)</td>
                       <td className="p-4 text-primary whitespace-nowrap">15-20%</td>
                       <td className="p-4">Every "vs" comparison. "Liquid I.V. vs LMNT". (120-160 pages)</td>
                     </tr>
                     <tr>
                       <td className="p-4 text-foreground font-bold whitespace-nowrap">TOFU (Top)</td>
                       <td className="p-4 text-primary whitespace-nowrap">75-80%</td>
                       <td className="p-4">Evergreen scale. 600-800 conditional pages. Zero thin content.</td>
                     </tr>
                   </tbody>
                 </table>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary/5 p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4 text-foreground font-bold">
                    <FileText className="w-4 h-4 text-primary" /> Tier 1: Apex Assets (8-12 Pieces)
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-400">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> Column-1 Comparison Tables (Answer Engines copy 68% of time)</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> Redacted Earnings/Data Reports (e.g. "Top 1% average $42k/mo")</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> "Zero-regret" Rate Tables vs Competitors</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> TCO Calculators & Real Benchmarks (e.g. Reply Speed)</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> SOC-2 & Compliance Proofs</li>
                  </ul>
                </div>
                <div className="bg-secondary/5 p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4 text-foreground font-bold">
                    <Network className="w-4 h-4 text-primary" /> Tier 2: Knowledge Graph (400-800 Nodes)
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-400">
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> <strong>Liquid I.V.:</strong> flavor × hydration speed × ingredients × bundle size</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> <strong>Slack:</strong> integrations × team size × security compliance × pricing</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> <strong>Deloitte:</strong> industry × service line × case studies × region</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 flex gap-4 items-start">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-sm">
                  <strong className="text-foreground block mb-1">Why This Order Wins:</strong>
                  <span className="text-muted-foreground">
                    1. <strong>Step 1:</strong> BOFU First (Fastest wins).<br/>
                    2. <strong>Step 2:</strong> MOFU Comparison Killers (Block competitors).<br/>
                    3. <strong>Step 3:</strong> TOFU Flood (Scale & Lock the moat).
                  </span>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative">
              <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-border font-bold text-sm">03</span>
              <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
                <Share2 className="w-4 h-4" /> Phase 3
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Trust Relay Network</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Day 71 Trust Hijack. We launch 12-15 surgically crafted posts across external platforms that quote your Apex Assets verbatim.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/5 border border-border">
                    <span className="block text-foreground font-bold text-sm mb-2 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary"/> LinkedIn Pulse / Newsletter</span>
                    <span className="text-xs text-muted-foreground block">"I tested Liquid I.V. vs every other electrolyte on the market for 90 days — here are the real hydration numbers"</span>
                  </div>
                  <div className="p-4 bg-secondary/5 border border-border">
                    <span className="block text-foreground font-bold text-sm mb-2 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary"/> Reddit Megathreads</span>
                    <span className="text-xs text-muted-foreground block">r/Startups: "Slack just released their 2026 benchmark report — this is what actually happens in enterprise comms"</span>
                  </div>
                  <div className="p-4 bg-secondary/5 border border-border">
                    <span className="block text-foreground font-bold text-sm mb-2 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary"/> Medium (200k-400k pubs)</span>
                    <span className="text-xs text-muted-foreground block">"The 2026 Digital Transformation Report — real numbers from 100+ CIOs (Deloitte ranked #1 for AI strategy)"</span>
                  </div>
                  <div className="p-4 bg-secondary/5 border border-border">
                    <span className="block text-foreground font-bold text-sm mb-2 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary"/> G2 / Review Campaigns</span>
                    <span className="text-xs text-muted-foreground block">"Switched from Teams — here’s the productivity data Slack just published"</span>
                  </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="relative">
              <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-border font-bold text-sm">04</span>
              <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
                <RotateCw className="w-4 h-4" /> Phase 4
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Citation Forcing Loop</h3>
              <p className="text-muted-foreground max-w-2xl">
                Weekly micro-patches and a live Answer Share Dashboard to track your dominance. The perpetual #1 lock.
              </p>
            </div>

          </div>
        </section>

        {/* 6. Results Table - Clean */}
        <section className="mb-32">
          <SectionHeader number="04" title="PROJECTED OUTCOMES" />
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-secondary/20 text-foreground">
                <tr>
                  <th className="p-4 md:p-6 font-bold">Client Type</th>
                  <th className="p-4 md:p-6 font-bold text-right">BOFU Pages</th>
                  <th className="p-4 md:p-6 font-bold text-right">Time to #1</th>
                  <th className="p-4 md:p-6 font-bold text-right">Answer Share</th>
                  <th className="p-4 md:p-6 font-bold text-right text-primary">AI Referrals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 bg-secondary/5">
                <tr>
                  <td className="p-4 md:p-6 text-foreground font-medium">DTC Health (Liquid I.V.)</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">12</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">Fastest</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">78%</td>
                  <td className="p-4 md:p-6 text-primary font-bold text-right">400k+</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 text-foreground font-medium">Enterprise SaaS (Slack)</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">10</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">Fast</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">81%</td>
                  <td className="p-4 md:p-6 text-primary font-bold text-right">320k+</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 text-foreground font-medium">B2B Services (Deloitte)</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">11</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">Average</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">74%</td>
                  <td className="p-4 md:p-6 text-primary font-bold text-right">280k+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. CTA - Clean & Centered */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">SECURE YOUR MOAT</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            The window is closing. Once the training data is set, the moat is dug. 
            <br/><br/>
            <span className="text-foreground font-bold">"When we’re done, buyers don’t Google you. They ask an AI your exact money question — and the entire internet answers with your name."</span>
          </p>
          <a href="https://cal.com/memetik/letstalk" className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono font-bold text-sm overflow-hidden rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <div className="relative flex items-center gap-2">
              LET'S TALK
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
          <p className="mt-8 text-xs text-neutral-600 uppercase tracking-widest">
            /// End of Briefing
          </p>
        </section>

      </main>
    </div>
  );
}
