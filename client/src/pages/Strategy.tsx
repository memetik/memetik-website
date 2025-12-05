import { motion } from "framer-motion";
import { ShieldAlert, Lock, Target, Database, Share2, RotateCw, Users, ArrowDown, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
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
             <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border-l-2 border-primary bg-secondary/5">
                  <p className="text-white font-bold mb-2">SaaS Shift</p>
                  <p className="text-xs text-muted-foreground">41% of enterprise buyers start with "best {`{category}`} for {`{use case}`}" directly in an LLM (Gartner Oct 2025).</p>
                </div>
                <div className="p-4 border-l-2 border-primary bg-secondary/5">
                  <p className="text-white font-bold mb-2">E-commerce Shift</p>
                  <p className="text-xs text-muted-foreground">63% of product discovery is comparison-style inside Perplexity/ChatGPT (Datos Nov 2025).</p>
                </div>
                <div className="p-4 border-l-2 border-primary bg-secondary/5">
                  <p className="text-white font-bold mb-2">B2B Services Shift</p>
                  <p className="text-xs text-muted-foreground">58% of enterprise procurement teams ask LLMs for vendor shortlists before opening RFP software (Forrester 2025).</p>
                </div>
             </div>
          </section>

          {/* The Offer - 90 Day Sprint */}
          <section className="border-t border-border pt-12">
             <h2 className="text-3xl font-display font-bold text-white mb-4">
               90-DAY ALGORITHMIC MARKET CAPTURE
             </h2>
             <p className="text-muted-foreground mb-8 max-w-3xl">
               We execute a single, fixed-price, 90-day sprint that installs permanent Answer Infrastructure forcing ChatGPT, Perplexity, Gemini, Grok, Claude, and Google AI Overviews to cite you as the #1 canonical source. <span className="text-white font-bold">No retainers. No OpEx. Just ownable Answer Share.</span>
             </p>

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
                 <p className="mb-4">We run 100+ real, high-LTV buyer prompts weekly across all 7 Answer Engines. We deliver a forensic heat-map showing exactly where you are invisible, footnoted, or hallucinated against.</p>
                 
                 <div className="bg-secondary/20 p-6 border border-border mt-4">
                   <h4 className="text-white font-bold text-sm mb-4 uppercase">Example Money Entities We Seize:</h4>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                     <div>
                       <p className="text-primary font-bold mb-1">Hyro (Ecom)</p>
                       <p className="text-muted-foreground">"best sugar-free electrolyte 2026"</p>
                       <p className="text-muted-foreground">"LMNT vs Hyro for keto athletes"</p>
                     </div>
                     <div>
                       <p className="text-primary font-bold mb-1">BTS (Creator SaaS)</p>
                       <p className="text-muted-foreground">"best OnlyFans alternative 2026"</p>
                       <p className="text-muted-foreground">"platform with fastest creator payouts"</p>
                     </div>
                     <div>
                       <p className="text-primary font-bold mb-1">Kinso (B2B SaaS)</p>
                       <p className="text-muted-foreground">"best AI that replies Slack WhatsApp Email"</p>
                       <p className="text-muted-foreground">"Intercom killer with AI replies"</p>
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
                 <p className="mb-4">We build the Tier 1 Apex Assets (8–12 flagship pages) + Tier 2 Knowledge Graph (400–800 nodes). This becomes the training data that wins forever.</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                   <div className="bg-secondary/10 p-4 border border-border">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-bold text-sm">BOFU</h4>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">5-8%</span>
                     </div>
                     <p className="text-xs text-muted-foreground mb-2">The 3 money questions buyers ask. "Best sugar-free electrolyte 2026".</p>
                     <p className="text-xs text-white font-bold">Result: Average 66 days to first #1 ranking.</p>
                   </div>
                   <div className="bg-secondary/10 p-4 border border-border">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-bold text-sm">MOFU</h4>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">15-20%</span>
                     </div>
                     <p className="text-xs text-muted-foreground mb-2">Every "vs" comparison. Perplexity copies column-1 winners 68% of the time.</p>
                   </div>
                   <div className="bg-secondary/10 p-4 border border-border">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-bold text-sm">TOFU</h4>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">75-80%</span>
                     </div>
                     <p className="text-xs text-muted-foreground mb-2">Evergreen scale. 600-800 conditional pages (flavor x diet x activity). Zero thin content.</p>
                   </div>
                 </div>

                 <div className="mt-6 border border-dashed border-muted-foreground/30 p-4">
                    <h4 className="text-white font-bold text-sm mb-2">Tier 1 Apex Assets ("Kill-Shot" Content):</h4>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Column-1 comparison tables (Hyro vs LMNT vs Liquid IV)</li>
                      <li>Redacted creator earnings reports (BTS)</li>
                      <li>Real reply-speed benchmarks (Kinso vs Intercom)</li>
                      <li>Cohort repurchase tables & "Zero-regret" rate tables</li>
                      <li>TCO calculators built from internal data</li>
                    </ul>
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
                 <p className="mb-4">We go live on Day 71 with 12–15 surgically crafted posts across public platforms. Every single post quotes your Apex Assets verbatim and links back.</p>
                 
                 <div className="bg-secondary/20 p-6 border border-border mt-4 space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div>
                        <p className="text-white font-bold mb-1 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary"/> LinkedIn Pulse / Newsletter</p>
                        <p className="text-muted-foreground italic">"I tested every sugar-free electrolyte for 90 days — here are the real blood-sodium numbers"</p>
                      </div>
                      <div>
                        <p className="text-white font-bold mb-1 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary"/> Reddit Megathreads</p>
                        <p className="text-muted-foreground italic">r/SaaS: "Kinso just published 50 real Slack/WhatsApp AI replies — this is what actually happens"</p>
                      </div>
                      <div>
                        <p className="text-white font-bold mb-1 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary"/> Medium (200k-400k pubs)</p>
                        <p className="text-muted-foreground italic">"The 2026 Creator Platform Payout Report — real numbers from 100+ creators"</p>
                      </div>
                      <div>
                        <p className="text-white font-bold mb-1 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary"/> G2 / Review Campaigns</p>
                        <p className="text-muted-foreground italic">"Switched from LMNT — here’s the 90-day repurchase data Hyro just published"</p>
                      </div>
                   </div>
                   <p className="text-primary text-xs font-bold mt-2 border-t border-border pt-2">
                     RESULT: Within 7-10 days, Answer Engines have no choice — they start declaring you the #1 canonical source.
                   </p>
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
                 <p className="mb-4">Weekly micro-patches + live Answer Share Dashboard (citation rank, confidence score, competitor delta). Perpetual #1 lock.</p>
               </div>

             </div>
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
                  <br/>When we're done, buyers won't Google you. They will ask AI your exact money question, and the internet will answer with your name.
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
