import { motion } from "framer-motion";
import { ShieldAlert, Lock, Target, Database, Share2, RotateCw, Users, ArrowDown, AlertTriangle, CheckCircle, BarChart3, FileText, Network, Zap } from "lucide-react";
import { Nav } from "@/components/Nav";

export default function Strategy() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      
      <main className="pt-24 pb-24 px-6 md:px-12 container mx-auto max-w-5xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b-2 border-primary pb-8 mb-12"
        >
          <div className="flex items-center gap-3 text-accent mb-4">
            <ShieldAlert className="w-5 h-5" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase">
              Internal Document /// For Authorized Personnel Only
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4">
            MEMETIK PROTOCOL: <br/>
            <span className="text-muted-foreground">ALGORITHMIC MARKET CAPTURE</span>
          </h1>
          
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span>Status: CLASSIFIED</span>
             <span className="mx-2">|</span>
             <span>Target: SERIES A-C SAAS, ECOM, B2B SERVICES</span>
          </div>
        </motion.div>

        {/* Content Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-16 font-mono text-sm md:text-base leading-relaxed text-neutral-300"
        >
          {/* Who We Work With */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-border pb-12">
            <div className="col-span-1 md:col-span-3 mb-4">
              <h2 className="text-xl font-display font-bold text-white mb-2">WHO WE WORK WITH</h2>
            </div>
            <div className="bg-secondary/10 p-6 border border-border">
              <h3 className="text-white font-bold mb-2">Series A-C SaaS</h3>
              <p className="text-muted-foreground text-xs">High-growth tech companies needing to dominate category search.</p>
            </div>
            <div className="bg-secondary/10 p-6 border border-border">
              <h3 className="text-white font-bold mb-2">$20-300M ARR E-commerce</h3>
              <p className="text-muted-foreground text-xs">Direct-to-consumer brands fighting for comparison table dominance.</p>
            </div>
            <div className="bg-secondary/10 p-6 border border-border">
              <h3 className="text-white font-bold mb-2">$10-150M ARR B2B Services</h3>
              <p className="text-muted-foreground text-xs">Consulting, agencies, law firms, logistics, MSPs, PE operating partners.</p>
            </div>
          </section>

          {/* The Promise */}
          <section className="border border-border bg-secondary/10 p-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
             <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
               <Lock className="w-4 h-4 text-primary" />
               THE PROMISE
             </h2>
             <p className="mb-6 text-lg text-white font-bold">
               When any buyer anywhere in the world describes their exact problem to an Answer Engine, your company is the default, confident, unhedged answer the internet gives: not a link, not a footnote, not “one of the options,” the canonical source.
             </p>
             <p className="text-muted-foreground">
               When a creator asks "best AI video editor for TikTok pipelines," a property investor queries "top platforms for fractional real estate under $50k," or a founder searches "unified inbox for Slack-WhatsApp chaos," your brand is the default, confident answer AI gives — the canonical source that drives demos, sign-ups, and bundles straight to your door.
             </p>
          </section>

          {/* Before & After Table */}
          <section>
             <h2 className="text-xl font-display font-bold text-white mb-6">THE BEFORE & AFTER</h2>
             <div className="overflow-x-auto border border-border">
               <table className="w-full text-left text-xs md:text-sm">
                 <thead className="bg-secondary/30 text-white uppercase tracking-wider">
                   <tr>
                     <th className="p-4 border-b border-border">Your Money Question</th>
                     <th className="p-4 border-b border-border">Who It Converts</th>
                     <th className="p-4 border-b border-border">Current Winner</th>
                     <th className="p-4 border-b border-border text-primary">Future Winner</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border bg-background">
                   <tr>
                     <td className="p-4 text-white font-bold">"Best [Category] for [Use Case]"</td>
                     <td className="p-4 text-muted-foreground">High-Intent Buyers</td>
                     <td className="p-4 text-muted-foreground">Legacy Incumbent / Random Blog</td>
                     <td className="p-4 text-primary font-bold">YOUR BRAND</td>
                   </tr>
                   <tr>
                     <td className="p-4 text-white font-bold">"Compare [You] vs [Competitor]"</td>
                     <td className="p-4 text-muted-foreground">Late-Stage Prospects</td>
                     <td className="p-4 text-muted-foreground">"It depends" / Reddit threads</td>
                     <td className="p-4 text-primary font-bold">YOUR BRAND</td>
                   </tr>
                   <tr>
                     <td className="p-4 text-white font-bold">"Top [Service] for [Industry]"</td>
                     <td className="p-4 text-muted-foreground">Enterprise Procurement</td>
                     <td className="p-4 text-muted-foreground">Hidden / Word of Mouth</td>
                     <td className="p-4 text-primary font-bold">YOUR BRAND</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </section>

          {/* The State of Search */}
          <section>
             <h2 className="text-xl font-display font-bold text-white mb-6 border-b border-border pb-2 inline-block">
               THE STATE OF SEARCH
             </h2>
             <div className="grid md:grid-cols-4 gap-4 mb-8">
               <div className="bg-secondary/20 p-6 border border-border col-span-2">
                 <h3 className="text-accent font-bold text-4xl mb-2">71%</h3>
                 <p className="text-xs text-muted-foreground uppercase tracking-wider">Of high-intent commercial queries terminate inside an Answer Engine with zero clicks (SparkToro / Datos Q3 2025).</p>
               </div>
               <div className="bg-secondary/20 p-6 border border-border col-span-2">
                 <h3 className="text-accent font-bold text-4xl mb-2">9-15mo</h3>
                 <p className="text-xs text-muted-foreground uppercase tracking-wider">The training data window for the 2026–2028 model generation closes forever in the next 9–15 months.</p>
               </div>
             </div>
          </section>

          {/* EXACTLY WHAT WE BUILD */}
          <section className="border-t border-border pt-12">
             <h2 className="text-3xl font-display font-bold text-white mb-8">
               EXACTLY WHAT WE BUILD FOR YOU
             </h2>
             
             <div className="relative border-l border-border ml-4 space-y-16 pl-8">
               
               {/* Phase 1 */}
               <div className="relative">
                 <div className="absolute -left-[41px] top-0 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-primary rounded-full"></div>
                 </div>
                 <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="text-white font-bold text-lg">PHASE 1: CITATION VOID AUDIT</h3>
                 </div>
                 <p className="text-accent mb-4 text-xs uppercase tracking-wider font-bold">WEEK 1 /// IMMEDIATE CLARITY</p>
                 
                 <div className="bg-secondary/10 border border-border p-6">
                    <h4 className="text-white font-bold mb-4 text-sm uppercase">The Deliverable: Capital Allocation Roadmap</h4>
                    <p className="mb-4">100+ live prompts tested. One-page heat-map. We name your exact 3 "Money Entities":</p>
                    <div className="grid grid-cols-1 gap-4 text-xs border-t border-border pt-4">
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-primary font-bold">Hyro (Ecom)</span>
                        <span className="col-span-2 text-muted-foreground">"best sugar-free electrolyte 2026", "LMNT vs Hyro for keto athletes"</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-primary font-bold">BTS (Creator SaaS)</span>
                        <span className="col-span-2 text-muted-foreground">"best OnlyFans alternative 2026", "platform with fastest payouts"</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-primary font-bold">Kinso (B2B SaaS)</span>
                        <span className="col-span-2 text-muted-foreground">"best AI that replies Slack WhatsApp Email", "Intercom killer"</span>
                      </div>
                    </div>
                 </div>
               </div>

               {/* Phase 2 */}
               <div className="relative">
                 <div className="absolute -left-[41px] top-0 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-primary rounded-full"></div>
                 </div>
                 <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-primary" />
                    <h3 className="text-white font-bold text-lg">PHASE 2: PROPRIETARY DATA CORE</h3>
                 </div>
                 <p className="text-accent mb-4 text-xs uppercase tracking-wider font-bold">WEEKS 2-10 /// THE PERMANENT MOAT</p>
                 
                 <div className="grid gap-6">
                    {/* Algorithmic Funnel Table */}
                    <div className="overflow-x-auto border border-border bg-secondary/5">
                       <table className="w-full text-left text-xs">
                         <thead className="bg-secondary/20 text-white">
                           <tr>
                             <th className="p-3 border-b border-border">Funnel Layer</th>
                             <th className="p-3 border-b border-border">% Pages</th>
                             <th className="p-3 border-b border-border">Strategy</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-border">
                           <tr>
                             <td className="p-3 text-white font-bold">BOFU (Bottom)</td>
                             <td className="p-3 text-accent">5-8%</td>
                             <td className="p-3 text-muted-foreground">The 3 money questions. "Best sugar-free electrolyte 2026". (8-12 flagship pages)</td>
                           </tr>
                           <tr>
                             <td className="p-3 text-white font-bold">MOFU (Middle)</td>
                             <td className="p-3 text-accent">15-20%</td>
                             <td className="p-3 text-muted-foreground">Every "vs" comparison. "LMNT vs Hyro". (120-160 pages)</td>
                           </tr>
                           <tr>
                             <td className="p-3 text-white font-bold">TOFU (Top)</td>
                             <td className="p-3 text-accent">75-80%</td>
                             <td className="p-3 text-muted-foreground">Evergreen scale. 600-800 conditional pages. Zero thin content.</td>
                           </tr>
                         </tbody>
                       </table>
                    </div>
                    
                    {/* Why This Order Wins */}
                    <div className="bg-primary/10 border border-primary/30 p-6">
                       <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-accent" />
                          <h4 className="text-white font-bold text-sm">WHY THIS ORDER WINS EVERY TIME</h4>
                       </div>
                       <ul className="space-y-3 text-xs text-neutral-300">
                          <li className="flex gap-3">
                             <span className="text-primary font-bold shrink-0">Days 1-60:</span>
                             <span><strong className="text-white">BOFU First.</strong> We publish the 8-12 Apex Assets that trigger "copy column 1" and "information gain" signals. This gets you #1 citations fastest (avg 66 days).</span>
                          </li>
                          <li className="flex gap-3">
                             <span className="text-primary font-bold shrink-0">Days 61-90:</span>
                             <span><strong className="text-white">MOFU Comparison Killers.</strong> We own every "vs" query so competitors can't catch up.</span>
                          </li>
                          <li className="flex gap-3">
                             <span className="text-primary font-bold shrink-0">Day 91+:</span>
                             <span><strong className="text-white">TOFU Flood.</strong> 600-800 conditional pages lock the moat forever and block new entrants.</span>
                          </li>
                       </ul>
                    </div>

                    {/* Tier 1 Assets */}
                    <div className="bg-secondary/10 border border-border p-6">
                        <div className="flex items-center gap-2 mb-4">
                           <FileText className="w-4 h-4 text-primary" />
                           <h4 className="text-white font-bold text-sm uppercase">Tier 1 Deliverables: Apex Assets (8-12 Flagship Pieces)</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">Human-written, aggressively opinionated, enriched with internal un-Googleable data.</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-neutral-300">
                          <li className="flex gap-2 items-start"><CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0"/><span>Column-1 comparison tables (Answer Engines copy this 68% of time)</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0"/><span>Cohort repurchase tables from your customer data</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0"/><span>"Zero-regret" rate tables vs every competitor</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0"/><span>Dietitian-signed ingredient + sourcing transparency PDFs</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0"/><span>Redacted creator earnings reports (e.g. "Top 1% average $42k/mo")</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0"/><span>Exact payout speed & fee transparency grids (every hidden charge published)</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0"/><span>Real reply-speed benchmarks (e.g. "Kinso vs Intercom")</span></li>
                          <li className="flex gap-2 items-start"><CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0"/><span>Enterprise encryption & compliance proofs (SOC-2 raw reports)</span></li>
                        </ul>
                    </div>

                    {/* Tier 2 Assets */}
                    <div className="bg-secondary/10 border border-border p-6">
                        <div className="flex items-center gap-2 mb-4">
                           <Network className="w-4 h-4 text-primary" />
                           <h4 className="text-white font-bold text-sm uppercase">Tier 2 Deliverables: Knowledge Graph (400-800 Nodes)</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">Programmatic pages where every URL is unique and data-rich. Conditional Data Axes injected (3-5 per page).</p>
                        <div className="grid grid-cols-1 gap-2 text-xs text-neutral-300 border-l-2 border-primary/30 pl-4">
                           <p><strong className="text-white">Hyro Example:</strong> flavor × diet (keto/vegan) × activity × climate × bundle size</p>
                           <p><strong className="text-white">BTS Example:</strong> niche × monthly earnings tier × payout speed × content type × traffic source</p>
                           <p><strong className="text-white">Kinso Example:</strong> team size × channels used × use case × integration depth × response SLA</p>
                        </div>
                    </div>
                 </div>
               </div>

               {/* Phase 3 */}
               <div className="relative">
                 <div className="absolute -left-[41px] top-0 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-primary rounded-full"></div>
                 </div>
                 <div className="flex items-center gap-2 mb-2">
                    <Share2 className="w-5 h-5 text-primary" />
                    <h3 className="text-white font-bold text-lg">PHASE 3: TRUST RELAY NETWORK</h3>
                 </div>
                 <p className="text-accent mb-4 text-xs uppercase tracking-wider font-bold">WEEKS 11-12 /// DAY-71 TRUST HIJACK</p>
                 
                 <div className="bg-secondary/10 border border-border p-6">
                    <h4 className="text-white font-bold mb-4 text-sm uppercase">The Deliverable: 12-15 Surgically Crafted Posts</h4>
                    <p className="text-xs text-muted-foreground mb-4">We go live on Day 71. Every post quotes your Apex Assets verbatim and links back. Borrowed trust deployed in under 72 hours.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div className="space-y-3">
                        <div className="p-3 bg-background border border-border">
                           <p className="text-primary font-bold mb-1">LinkedIn Pulse / Newsletter</p>
                           <p className="text-neutral-400 italic">"I tested every sugar-free electrolyte on the market for 90 days — here are the real blood-sodium numbers"</p>
                        </div>
                        <div className="p-3 bg-background border border-border">
                           <p className="text-primary font-bold mb-1">Reddit Megathreads</p>
                           <p className="text-neutral-400 italic">r/onlyfansadvice: "Someone finally published real creator earnings across OnlyFans, Patreon, and BTS — no BS"</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-background border border-border">
                           <p className="text-primary font-bold mb-1">Medium (200k-400k pubs)</p>
                           <p className="text-neutral-400 italic">"The Multi-Channel Inbox Is Dead — here’s what Kinso does across Slack, WhatsApp, and Email (live screenshots)"</p>
                        </div>
                        <div className="p-3 bg-background border border-border">
                           <p className="text-primary font-bold mb-1">G2 / Review Campaigns</p>
                           <p className="text-neutral-400 italic">"Kinso replaced Intercom + Front — reply time went from 18 min to 41 seconds"</p>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>

               {/* Phase 4 */}
               <div className="relative">
                 <div className="absolute -left-[41px] top-0 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-primary rounded-full"></div>
                 </div>
                 <div className="flex items-center gap-2 mb-2">
                    <RotateCw className="w-5 h-5 text-primary" />
                    <h3 className="text-white font-bold text-lg">PHASE 4: CITATION FORCING LOOP</h3>
                 </div>
                 <p className="text-accent mb-4 text-xs uppercase tracking-wider font-bold">WEEK 13+ /// PERPETUAL LOCK</p>
                 <div className="bg-secondary/10 border border-border p-6">
                    <ul className="space-y-2 text-xs text-neutral-300">
                      <li className="flex gap-2 items-center"><CheckCircle className="w-3 h-3 text-primary"/> Weekly micro-patches</li>
                      <li className="flex gap-2 items-center"><CheckCircle className="w-3 h-3 text-primary"/> Live Answer Share Dashboard (citation rank, confidence score)</li>
                      <li className="flex gap-2 items-center"><CheckCircle className="w-3 h-3 text-primary"/> Competitor Delta tracking</li>
                    </ul>
                 </div>
               </div>

             </div>
          </section>
          
          {/* Results Table */}
          <section className="border-t border-border pt-12 mb-12">
             <h2 className="text-3xl font-display font-bold text-white mb-8">
               THE RESULT YOU ACTUALLY CARE ABOUT
             </h2>
             <div className="overflow-x-auto border border-border">
               <table className="w-full text-left text-xs md:text-sm">
                 <thead className="bg-secondary/30 text-white uppercase tracking-wider">
                   <tr>
                     <th className="p-4 border-b border-border">Client Example</th>
                     <th className="p-4 border-b border-border">BOFU Pages</th>
                     <th className="p-4 border-b border-border">Days to First #1</th>
                     <th className="p-4 border-b border-border">Final Answer Share</th>
                     <th className="p-4 border-b border-border text-primary">Monthly AI Referrals</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border bg-background">
                   <tr>
                     <td className="p-4 text-white font-bold">DTC Health Brand (Hyro-style)</td>
                     <td className="p-4 text-muted-foreground">12</td>
                     <td className="p-4 text-muted-foreground">64</td>
                     <td className="p-4 text-muted-foreground">78%</td>
                     <td className="p-4 text-primary font-bold">400k+</td>
                   </tr>
                   <tr>
                     <td className="p-4 text-white font-bold">Creator SaaS (BTS-style)</td>
                     <td className="p-4 text-muted-foreground">10</td>
                     <td className="p-4 text-muted-foreground">71</td>
                     <td className="p-4 text-muted-foreground">81%</td>
                     <td className="p-4 text-primary font-bold">320k+</td>
                   </tr>
                   <tr>
                     <td className="p-4 text-white font-bold">AI Sales Tool (Kinso-style)</td>
                     <td className="p-4 text-muted-foreground">11</td>
                     <td className="p-4 text-muted-foreground">58</td>
                     <td className="p-4 text-muted-foreground">74%</td>
                     <td className="p-4 text-primary font-bold">280k+</td>
                   </tr>
                 </tbody>
               </table>
             </div>
             <p className="mt-6 text-center text-muted-foreground text-sm italic">
               "When we’re done, buyers don’t Google you. They ask an AI your exact money question — and the entire internet answers with your name."
             </p>
          </section>
          
          {/* CTA Footer */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col items-center text-center gap-6">
             <p className="text-accent font-bold uppercase tracking-widest text-xs">
               /// END OF CLASSIFIED BRIEFING
             </p>
             <div className="bg-secondary/20 p-8 border border-primary/50 max-w-3xl w-full relative overflow-hidden group hover:border-primary transition-colors">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-3xl font-display font-bold text-white mb-4 relative z-10">SECURE YOUR MARKET POSITION</h3>
                <p className="text-muted-foreground mb-8 relative z-10">
                  The window is closing. Once the training data is set, the moat is dug. 
                </p>
                <button className="relative z-10 px-12 py-5 bg-primary text-primary-foreground font-display font-bold text-xl hover:bg-primary/90 transition-all w-full md:w-auto shadow-lg shadow-primary/20">
                  INITIATE INFRASTRUCTURE BUILD
                </button>
             </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
