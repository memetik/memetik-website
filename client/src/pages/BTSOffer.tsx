import { motion } from "framer-motion";
import { ShieldAlert, Target, Database, Share2, RotateCw, CheckCircle, Zap, FileText, Network, ArrowRight, ChevronRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import {
  MarketingCard,
  MarketingContainer,
  MarketingFooter,
  MarketingPage,
  MarketingPill,
  MarketingSectionShell,
} from "@/components/marketing/MarketingTheme";

// Shared Components for cleaner layout
const SectionHeader = ({ number, title }: { number: string, title: string }) => (
  <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-4 md:mb-12">
    <span className="font-mono text-xl font-bold text-white/48">{number}</span>
    <h2 className="text-2xl md:text-4xl font-display font-bold text-white tracking-[-0.04em]">{title}</h2>
  </div>
);

const HighlightBox = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] md:p-8 ${className}`}>
    <div className="absolute left-0 top-0 h-full w-1 bg-white/25"></div>
    {children}
  </div>
);

export default function BTSOffer() {
  return (
    <MarketingPage className="font-sans overflow-x-hidden">
      <Nav />
      
      <main className="px-4 pb-8 pt-28 sm:px-6 md:px-12 md:pt-32">
        <MarketingContainer className="max-w-5xl space-y-6">
        
        {/* 1. Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <MarketingSectionShell className="px-6 py-10 md:px-10 md:py-14">
            <MarketingPill className="mb-6">
              <ShieldAlert className="h-3 w-3" />
              Strategic proposal /// BTS
            </MarketingPill>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-[-0.05em] mb-6 leading-[0.95]">
              PROJECT <br/>
              <span className="text-white/70">DEFAULT ANSWER.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-white/65 max-w-2xl leading-relaxed mx-auto md:mx-0">
              The offer to make BTS the default answer in AI search.
            </p>
          </MarketingSectionShell>
        </motion.div>

        {/* 2. The Goal & Reality */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <MarketingSectionShell className="px-6 py-10 md:px-10 md:py-12">
          <HighlightBox className="bg-gradient-to-br from-secondary/5 to-background mb-8">
             <h3 className="text-sm font-mono text-white/48 mb-4 uppercase tracking-[0.22em]">The Goal</h3>
             <p className="text-xl md:text-3xl lg:text-4xl font-display font-medium text-white leading-tight">
               When a creator asks ChatGPT, Perplexity, or Claude for the "best monetization platform" or "fastest payouts," the AI answers confidently with <span className="text-white/78">BTS</span>—not OnlyFans, not Patreon, and not "it depends."
             </p>
          </HighlightBox>

          <MarketingCard className="p-8">
             <h3 className="text-sm font-mono text-[#ff8a65] mb-4 uppercase tracking-[0.22em] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> The Reality (Important)
             </h3>
             <p className="text-white/62 leading-relaxed mb-4">
                We need to be clear before we start: We are going after OnlyFans and Patreon. These are some of the most efficient, profitable-per-employee companies in history. Taking their digital real estate is going to be a dogfight.
             </p>
             <p className="text-white font-medium">
                It will require significant time, effort, and precision. But we are committed to working alongside you in the trenches to win this domain at any cost.
             </p>
          </MarketingCard>
          </MarketingSectionShell>
        </motion.section>

        {/* 3. The Deliverables - Execution Protocol */}
        <section>
          <MarketingSectionShell className="px-6 py-10 md:px-10 md:py-12">
          <SectionHeader number="01" title="THE DELIVERABLES" />
          
          <div className="space-y-20 md:space-y-24 relative before:absolute before:left-6 md:before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent before:opacity-30 pl-16 md:pl-32">
            
            {/* Phase 1 */}
            <div className="relative">
              <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-[0_0_10px_rgba(249,115,22,0.5)]">01</span>
              <div className="mb-2 flex items-center gap-3 text-white/55 font-mono text-sm font-bold uppercase tracking-[0.22em]">
                <Target className="w-4 h-4" /> Phase 1
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">The Audit</h3>
              <p className="text-white/60 mb-6 max-w-2xl">
                We test 100+ live prompts across 7 AI models to see exactly where BTS is invisible today. We identify the gaps and the opportunities.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="relative">
              <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-border font-bold text-sm">02</span>
              <div className="mb-2 flex items-center gap-3 text-white/55 font-mono text-sm font-bold uppercase tracking-[0.22em]">
                <Database className="w-4 h-4" /> Phase 2
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Proprietary Data Core</h3>
              <p className="text-white/60 mb-6 max-w-2xl">
                We build the data infrastructure that future models will train on.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <MarketingCard className="p-6">
                  <div className="flex items-center gap-2 mb-4 text-white font-bold">
                    <FileText className="w-4 h-4 text-white/70" /> Tier 1: Apex Assets (8-12 Pages)
                  </div>
                  <p className="text-xs text-white/48 mb-4 font-mono">The pages that win the money. High-intent BOFU + "vs/alternative" pages.</p>
                  <ul className="space-y-3 text-sm text-white/62">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white/70 shrink-0"/> Column-1 comparison table: BTS vs OnlyFans vs Patreon vs Fansly (BTS in column 1)</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white/70 shrink-0"/> Real creator payout speed calculator (exact days + fees published)</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white/70 shrink-0"/> Redacted earnings leak from 50+ top BTS creators (monthly revenue screenshots)</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white/70 shrink-0"/> “Why I moved from OnlyFans to BTS” case studies (named + anonymised)</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white/70 shrink-0"/> BTS vs OnlyFans vs Patreon 2026 deep-dive</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white/70 shrink-0"/> Chargeback & fraud rate transparency table (BTS vs every competitor)</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white/70 shrink-0"/> Full revenue-share & hidden-fee transparency grid</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-white/70 shrink-0"/> “BTS paid me 41% more last month” quote injection pages</li>
                  </ul>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/60">
                    These pages are engineered to trigger the 68% “copy column 1” rule in Perplexity and maximum Information Gain.
                  </div>
                </MarketingCard>
                <MarketingCard className="p-6">
                  <div className="flex items-center gap-2 mb-4 text-white font-bold">
                    <Network className="w-4 h-4 text-white/70" /> Tier 2: Knowledge Graph (600-800 Pages)
                  </div>
                  <p className="text-xs text-white/48 mb-4 font-mono">Programmatic SEO at scale.</p>
                  <ul className="space-y-3 text-sm text-white/62">
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-white/70 shrink-0"/> <strong>Cluster:</strong> creator niche × monthly earnings tier × payout speed × content type × traffic source × country</li>
                  </ul>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/54">
                    Every single page is unique and data-rich → zero thin content, unbreakable moat, impossible for OnlyFans/Patreon clones to ever catch up.
                  </div>
                </MarketingCard>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative">
              <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-border font-bold text-sm">03</span>
              <div className="mb-2 flex items-center gap-3 text-white/55 font-mono text-sm font-bold uppercase tracking-[0.22em]">
                <Share2 className="w-4 h-4" /> Phase 3
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Trust Relay</h3>
              <p className="text-white/60 mb-6 max-w-2xl">
                We execute an "Authority Hijack" to force the models to recognize your new data.
              </p>
              <MarketingCard className="p-6">
                 <p className="text-white text-sm">
                    <strong>Action:</strong> We deploy surgically crafted posts across Reddit (r/creators), LinkedIn, and G2 that quote your Apex Assets verbatim, validating your authority.
                 </p>
              </MarketingCard>
            </div>

            {/* Phase 4 */}
            <div className="relative">
              <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border border-border font-bold text-sm">04</span>
              <div className="mb-2 flex items-center gap-3 text-white/55 font-mono text-sm font-bold uppercase tracking-[0.22em]">
                <RotateCw className="w-4 h-4" /> Phase 4
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">The Lock</h3>
              <p className="text-white/60 max-w-2xl mb-4">
                Once we have the ranking, we defend it.
              </p>
              <MarketingCard className="p-6">
                 <p className="text-white text-sm">
                    <strong>Output:</strong> Weekly micro-patches to block competitors and a live dashboard tracking your "Answer Share" vs OnlyFans/Patreon in real-time.
                 </p>
              </MarketingCard>
            </div>

          </div>
          </MarketingSectionShell>
        </section>

        {/* 4. Commitment to Winning */}
        <section>
           <MarketingSectionShell className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-12">
             <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-6">Our Commitment to Winning</h3>
             <div className="space-y-6 text-white/60 leading-relaxed">
               <p>
                 We want BTS to dominate, period. If you have an offer from another agency that includes a specific tactic or angle you like, share it with us. We’re happy to review it, validate it, and integrate the good parts into our execution plan.
               </p>
               <p className="text-white font-medium border-l-2 border-white/25 pl-4">
                 However, based on the data we see across every major AI model today, we firmly believe the Proprietary Data Core + Trust Relay approach outlined here is the only path that yields permanent, defensive results.
               </p>
             </div>
           </MarketingSectionShell>
        </section>

        {/* 5. CTA - Clean & Centered */}
        <section>
          <MarketingSectionShell className="mx-auto max-w-2xl px-6 py-10 text-center md:px-10 md:py-12">
          <h2 className="text-3xl font-display font-bold text-white mb-6 tracking-[-0.04em]">READY TO FIGHT?</h2>
          <button className="group relative inline-flex items-center gap-3 rounded-full border border-white/15 bg-white px-8 py-4 font-bold text-lg tracking-wide text-black transition-all hover:opacity-95">
            ACCEPT PROPOSAL
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-8 text-xs text-white/32 uppercase tracking-[0.22em]">
            /// Confidential Offer
          </p>
          </MarketingSectionShell>
        </section>

        </MarketingContainer>
      </main>

      <MarketingFooter
        title="Want this same precision applied to your category?"
        description="MEMETIK builds category-answer systems for brands that want durable, defensible visibility inside AI search."
        ctaHref="https://cal.com/memetik/letstalk"
        ctaLabel="Book a strategy call"
        note="Confidential engagements · custom scope"
      />
    </MarketingPage>
  );
}
