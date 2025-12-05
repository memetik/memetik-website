import { motion } from "framer-motion";
import { ShieldAlert, Lock, Target, Database, Share2, RotateCw, CheckCircle, Zap, FileText, Network, ArrowRight, ChevronRight } from "lucide-react";
import { Nav } from "@/components/Nav";

// Shared Components for cleaner layout
const SectionHeader = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-4 mb-8 md:mb-12 border-b border-primary/20 pb-4">
    <span className="text-primary font-mono text-xl font-bold">{number}</span>
    <h2 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">{title}</h2>
  </div>
);

const HighlightBox = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-secondary/10 border border-primary/20 p-6 md:p-8 relative overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
    {children}
  </div>
);

export default function Strategy() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      <Nav />
      
      <main className="pt-24 pb-32 px-6 md:px-12 container mx-auto max-w-4xl">
        
        {/* 1. Header Section - Clean & Authoritative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-bold tracking-wider uppercase mb-6">
            <ShieldAlert className="w-3 h-3" />
            Classified Strategy /// Do Not Distribute
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-6 leading-[0.9]">
            ALGORITHMIC <br/>
            <span className="text-primary">MARKET CAPTURE.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            The 90-day protocol to become the default, mathematical answer in ChatGPT, Claude, and Perplexity.
          </p>
        </motion.div>

        {/* 2. The Promise - High Impact */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <HighlightBox className="bg-gradient-to-br from-secondary/20 to-background">
             <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">The Promise</h3>
             <p className="text-2xl md:text-4xl font-display font-medium text-white leading-tight mb-8">
               "When any buyer describes their problem to an AI, your company is the <span className="text-primary">default, confident, unhedged answer</span>."
             </p>
             <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground border-t border-white/10 pt-8">
               <div>
                 <strong className="text-white block mb-2">Today:</strong>
                 Legacy incumbents and random blogs own the answer. Your brand is hidden or footnoted.
               </div>
               <div>
                 <strong className="text-white block mb-2 text-primary">Tomorrow:</strong>
                 Your brand is the canonical source. AI drives demos, sign-ups, and bundles straight to your door.
               </div>
             </div>
          </HighlightBox>
        </motion.section>

        {/* 3. Who We Work With - Simple Grid */}
        <section className="mb-32">
          <SectionHeader number="01" title="TARGET PROFILE" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Series A-C SaaS", desc: "High-growth tech needing category dominance." },
              { title: "$20-300M E-com", desc: "DTC brands fighting for comparison tables." },
              { title: "B2B Services", desc: "Agencies, Firms, & MSPs seeking vendor shortlists." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-secondary/5 border border-white/5 hover:border-primary/30 transition-colors group">
                <h3 className="text-white font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. The Shift - Data Visuals */}
        <section className="mb-32">
          <SectionHeader number="02" title="THE SHIFT" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="text-6xl md:text-8xl font-display font-bold text-white">71%</span>
                <span className="text-primary font-mono text-sm uppercase tracking-wider border-l-2 border-primary pl-3 mt-2">
                  Of commercial queries end with <br/> ZERO clicks (SparkToro Q3 2025)
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-6xl md:text-8xl font-display font-bold text-white">9-15<span className="text-4xl">mo</span></span>
                <span className="text-primary font-mono text-sm uppercase tracking-wider border-l-2 border-primary pl-3 mt-2">
                  Training data window closes <br/> for 2026-2028 models
                </span>
              </div>
            </div>
            <div className="bg-secondary/5 p-8 border border-white/5 space-y-6">
               <h4 className="text-white font-bold mb-4">The Behavior Has Changed</h4>
               <ul className="space-y-4 text-sm text-muted-foreground">
                 <li className="flex gap-3">
                   <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                   <span><strong>SaaS:</strong> 41% of buyers start with "best X for Y" directly in LLMs.</span>
                 </li>
                 <li className="flex gap-3">
                   <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                   <span><strong>E-com:</strong> 63% of discovery is comparison-style inside Perplexity.</span>
                 </li>
                 <li className="flex gap-3">
                   <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                   <span><strong>B2B:</strong> 58% of procurement teams ask LLMs for shortlists first.</span>
                 </li>
               </ul>
            </div>
          </div>
        </section>

        {/* 5. The Methodology - Timeline */}
        <section className="mb-32">
          <SectionHeader number="03" title="90-DAY EXECUTION" />
          
          <div className="space-y-24 relative before:absolute before:left-4 md:before:left-8 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-12 md:pl-24">
            
            {/* Phase 1 */}
            <div className="relative">
              <span className="absolute -left-[3.25rem] md:-left-[6.25rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">01</span>
              <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" /> Week 1
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Citation Void Audit</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                We run 100+ real buyer prompts to find where you are invisible. We deliver a <strong>Capital Allocation Roadmap</strong> naming your exact 3 "Money Entities".
              </p>
              <div className="bg-secondary/10 p-6 border border-white/10 rounded-lg">
                 <h4 className="text-white text-xs font-bold uppercase mb-4 opacity-70">Example Money Entities</h4>
                 <div className="grid gap-4 text-sm">
                   <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-b border-white/5 pb-2">
                     <span className="text-primary font-bold w-24">Hyro</span>
                     <span className="text-neutral-400">"best sugar-free electrolyte 2026"</span>
                   </div>
                   <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-b border-white/5 pb-2">
                     <span className="text-primary font-bold w-24">BTS</span>
                     <span className="text-neutral-400">"best OnlyFans alternative 2026"</span>
                   </div>
                   <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                     <span className="text-primary font-bold w-24">Kinso</span>
                     <span className="text-neutral-400">"Intercom killer with AI replies"</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative">
              <span className="absolute -left-[3.25rem] md:-left-[6.25rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-white/20 font-bold text-sm">02</span>
              <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
                <Database className="w-4 h-4" /> Weeks 2-10
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Proprietary Data Core</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                We build the permanent moat. Tier 1 "Apex Assets" (Flagship Content) and Tier 2 "Knowledge Graph" (Programmatic Data).
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary/5 p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4 text-white font-bold">
                    <FileText className="w-4 h-4 text-primary" /> Apex Assets (Tier 1)
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-400">
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> Column-1 Comparison Tables</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> Redacted Earnings/Data Reports</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> "Zero-regret" Rate Tables</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> SOC-2 & Compliance Proofs</li>
                  </ul>
                </div>
                <div className="bg-secondary/5 p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4 text-white font-bold">
                    <Network className="w-4 h-4 text-primary" /> Knowledge Graph (Tier 2)
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-400">
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> 400-800 Programmatic Nodes</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> Conditional Data Axes</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> Unique URL for every variant</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0"/> Zero Thin Content</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 flex gap-4 items-start">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-sm">
                  <strong className="text-white block mb-1">Why This Wins:</strong>
                  <span className="text-muted-foreground">We publish BOFU first (fastest wins), then MOFU (comparison killers), then TOFU (scale). This triggers "information gain" signals that AI models prioritize.</span>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative">
              <span className="absolute -left-[3.25rem] md:-left-[6.25rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-white/20 font-bold text-sm">03</span>
              <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
                <Share2 className="w-4 h-4" /> Weeks 11-12
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Trust Relay Network</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Day 71 Trust Hijack. We launch 12-15 surgically crafted posts across external platforms that quote your Apex Assets verbatim.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['LinkedIn Pulse', 'Reddit Megathreads', 'Medium (200k+)', 'G2 Reviews'].map((platform, i) => (
                  <div key={i} className="p-4 bg-secondary/5 border border-white/5 text-center">
                    <span className="block text-white font-bold text-sm mb-1">{platform}</span>
                    <span className="text-xs text-muted-foreground">Backlinks to Core</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 4 */}
            <div className="relative">
              <span className="absolute -left-[3.25rem] md:-left-[6.25rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-white/20 font-bold text-sm">04</span>
              <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
                <RotateCw className="w-4 h-4" /> Week 13+
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Citation Forcing Loop</h3>
              <p className="text-muted-foreground max-w-2xl">
                Weekly micro-patches and a live Answer Share Dashboard to track your dominance. The perpetual #1 lock.
              </p>
            </div>

          </div>
        </section>

        {/* 6. Results Table - Clean */}
        <section className="mb-32">
          <SectionHeader number="04" title="PROJECTED OUTCOMES" />
          <div className="overflow-hidden border border-white/10 rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/20 text-white">
                <tr>
                  <th className="p-4 md:p-6 font-bold">Client Type</th>
                  <th className="p-4 md:p-6 font-bold text-right">Time to #1</th>
                  <th className="p-4 md:p-6 font-bold text-right">Answer Share</th>
                  <th className="p-4 md:p-6 font-bold text-right text-primary">AI Referrals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-secondary/5">
                <tr>
                  <td className="p-4 md:p-6 text-white font-medium">DTC Health (Hyro)</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">64 Days</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">78%</td>
                  <td className="p-4 md:p-6 text-primary font-bold text-right">400k+</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 text-white font-medium">Creator SaaS (BTS)</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">71 Days</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">81%</td>
                  <td className="p-4 md:p-6 text-primary font-bold text-right">320k+</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 text-white font-medium">AI Sales (Kinso)</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">58 Days</td>
                  <td className="p-4 md:p-6 text-muted-foreground text-right">74%</td>
                  <td className="p-4 md:p-6 text-primary font-bold text-right">280k+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. CTA - Clean & Centered */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-6">SECURE YOUR MOAT</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            The window is closing. Once the training data is set, the moat is dug. 
            Start the infrastructure build today.
          </p>
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg tracking-wide hover:bg-primary/90 transition-all">
            INITIATE INFRASTRUCTURE BUILD
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-8 text-xs text-neutral-600 uppercase tracking-widest">
            /// End of Briefing
          </p>
        </section>

      </main>
    </div>
  );
}
