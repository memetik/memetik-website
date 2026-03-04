import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import {
  Shield, CheckCircle, Check, X, ArrowRight, Download,
  Plus, Minus, Target, Database, Share2, RotateCw, Quote,
} from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const fadeInView = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" } };

// ─── HERO ────────────────────────────────────────────────────────
function TestHero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background text-foreground">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <motion.h1 {...fadeUp} transition={{ duration: 0.5, ease: "easeOut" }} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.9] tracking-tight text-foreground mb-6">
          Your Rankings Are Stable.<br />
          <em className="font-normal italic" style={{ fontFamily: "'Newsreader', serif" }}>Your Pipeline Isn't.</em>
        </motion.h1>
        <motion.p {...fadeUp} transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} className="text-base text-foreground/60 max-w-2xl mb-10">
          80% of searches now end inside AI. Your buyers are asking ChatGPT, Perplexity, and Gemini — not clicking Google. We engineer your brand into the answers they trust. Before your competitors do.
        </motion.p>
        <motion.div {...fadeUp} transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          <a href="https://cal.com/memetik/letstalk" className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity">
            See What AI Says About You — Free Audit
          </a>
          <a href="#methodology" className="inline-flex items-center gap-3 border border-foreground/20 text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:bg-foreground/5 transition-colors">
            Watch the 90-Day Process
          </a>
        </motion.div>
        <motion.p {...fadeUp} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} className="font-mono text-xs text-foreground/40 uppercase tracking-widest">
          B2B SaaS · E-commerce · Professional Services
        </motion.p>
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────
const services = [
  { id: "01", title: "LLM POSITIONING", subtitle: "Become the Brand AI Recommends", description: "80% of B2B buyers now use AI for vendor research. When they ask 'What's the best [your category]?' — your brand needs to be the answer. We engineer your presence into the knowledge layer that ChatGPT, Claude, and Gemini pull from.", outcome: "Your brand cited as the #1 recommendation in your category", tags: ["AI CITATIONS", "LLM KNOWLEDGE"] },
  { id: "02", title: "ANSWER ENGINE", subtitle: "Own the Zero-Click Layer", description: "80% of searches now end without a click. The traffic didn't disappear — it moved to AI summaries, snippets, and direct answers. We structure your content so AI pulls YOUR answers, not your competitor's.", outcome: "Capture the buyer intent that never reaches traditional search results", tags: ["AEO", "AI OVERVIEWS"] },
  { id: "03", title: "SCALE SYSTEMS", subtitle: "Content Infrastructure That Compounds", description: "We build 100 bottom-of-funnel articles and 800 programmatic pages engineered for AI citation. This isn't content marketing — it's visibility infrastructure that compounds every month and works while you sleep.", outcome: "900+ pages of AI-optimized content producing citations 24/7", tags: ["PROGRAMMATIC", "COMPOUND VISIBILITY"] },
];

function TestServices() {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 relative overflow-hidden border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-12">
        <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">AI Visibility Infrastructure</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">SEO Optimizes for Search Engines.<br className="hidden md:block" /> We Optimize for the Answers.</h2>
        <p className="text-base text-foreground/60 max-w-2xl">Every engagement includes all three pillars. This is the complete system that makes your brand the answer when buyers ask AI who to buy from.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }} whileHover={{ y: -4 }} className="group relative flex flex-col min-h-[480px] p-6 md:p-8 bg-background border border-foreground/10 rounded">
              <div className="flex items-center justify-between mb-6"><span className="font-mono text-xs text-foreground/40">{item.id}</span></div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-[0.85] text-foreground mb-2">{item.title}</h3>
              <p className="font-sans text-lg sm:text-xl text-foreground mb-4">{item.subtitle}</p>
              <p className="text-base leading-relaxed text-foreground/70 mb-6">{item.description}</p>
              <div className="border border-foreground/10 rounded p-4 mb-6 bg-muted">
                <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-1">What You Get</div>
                <p className="text-sm font-semibold text-foreground">{item.outcome}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                {item.tags.map((tag, i) => (<div key={i} className="border border-foreground/15 rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider">{tag}</div>))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-12 text-center">
        <a href="https://cal.com/memetik/letstalk" className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity">SEE WHAT AI SAYS ABOUT YOUR BRAND<span>→</span></a>
      </div>
    </section>
  );
}

// ─── DIFFERENTIATION ─────────────────────────────────────────────
function TestDifferentiation() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-foreground/10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div {...fadeInView} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">The Problem With Your Agency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-[0.9] mb-2 tracking-tight text-foreground">Your Agency Is Optimizing for a Search Engine That Sends Less Traffic Every Quarter.</h2>
            <p className="font-sans text-lg sm:text-xl text-foreground/60 mb-6">We built Memetik because the dashboards showed green while the pipeline went cold. Rankings stable. Traffic declining. Sound familiar?</p>
            <p className="text-base leading-relaxed text-foreground/70">Traditional SEO agencies are still celebrating page-one rankings while your buyers get their answers from ChatGPT and never click anything. Gartner predicts organic traffic will drop 50%+ by 2028. The shift already happened. The question is whether you're engineering for where buyers are going — or optimizing for where they used to be.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="border border-foreground/15 rounded p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-4 pb-2 border-b border-foreground/10">THE OLD WAY</div>
              <ul className="space-y-3">
                {["Optimizing for rankings that don't convert", "Recycled playbooks from 2019", "Monthly reports full of green arrows", "'Trust the process' with no AI strategy"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/40 line-through text-sm"><X className="w-3 h-3" />{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} className="border border-foreground/15 rounded p-6 bg-foreground text-background">
              <div className="font-mono text-[10px] uppercase tracking-widest text-background/60 mb-4 pb-2 border-b border-background/15">THE MEMETIK WAY</div>
              <ul className="space-y-3">
                {["Optimizing for the ANSWERS buyers actually use", "First-principles AI visibility engineering", "Weekly AI citation tracking with live dashboards", "Measurable answer share with 90-day guarantee"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-background text-sm font-semibold"><Check className="w-3 h-3" />{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── METHODOLOGY ─────────────────────────────────────────────────
const phases = [
  { id: "01", title: "THE AI VISIBILITY AUDIT", subtitle: "WEEK 1-2", icon: <Target className="w-12 h-12" />, description: "We run 100+ prompts across ChatGPT, Perplexity, Gemini, and Claude to map exactly where you appear, where competitors appear, and where nobody owns the answer yet. You'll see — for the first time — what AI actually says about your brand.", deliverables: ["100+ prompt tests across 4 major LLMs", "Competitor citation map", "Gap analysis with opportunity sizing", "Priority roadmap ranked by revenue impact"], outcome: "Stop flying blind. Know exactly where you stand in AI responses vs. every competitor." },
  { id: "02", title: "CONTENT ENGINEERING", subtitle: "WEEK 3-8", icon: <Database className="w-12 h-12" />, description: "We build the content infrastructure that LLMs prefer to cite. Every page is reverse-engineered from how AI models source and weight information — not from a keyword spreadsheet.", deliverables: ["100 bottom-of-funnel articles", "800 programmatic pages", "Comparison and alternative engines", "Entity and schema optimization"], outcome: "900+ pages built to be cited, not just indexed." },
  { id: "03", title: "AUTHORITY INJECTION", subtitle: "WEEK 4-12", icon: <Share2 className="w-12 h-12" />, description: "AI models weigh source authority heavily. We place your brand across high-authority surfaces — DR70-90 publications, industry platforms, and citation networks — so LLMs recognize you as the trusted source.", deliverables: ["DR70-90 publication placements", "Strategic branded mentions", "Citation network building", "Trust signal engineering"], outcome: "When AI evaluates who to recommend, the evidence points to you." },
  { id: "04", title: "CONTINUOUS REINFORCEMENT", subtitle: "MONTH 3+", icon: <RotateCw className="w-12 h-12" />, description: "AI models update constantly. Competitors will eventually try to catch up. We monitor your answer share weekly, test new prompts, track competitor movements, and reinforce your position before anyone can close the gap.", deliverables: ["Weekly AI citation monitoring", "New prompt pattern testing", "Competitor movement alerts", "Live answer share dashboard"], outcome: "Maintain the #1 position while competitors are still Googling 'what is AEO.'" },
];

function TestMethodology() {
  return (
    <section id="methodology" className="py-24 md:py-32 bg-background text-foreground px-4 md:px-0 border-b border-foreground/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 relative">
        <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">The System</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-4">From Invisible to Cited in 90 Days</h2>
        <p className="text-base text-foreground/60 max-w-2xl mb-8">A 4-phase system built on how LLMs actually source, evaluate, and surface recommendations. Not guesswork. Engineering.</p>
        <div className="h-px w-full bg-foreground/10 mb-12"></div>
      </div>
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12">
        {phases.map((phase, index) => (
          <motion.div key={phase.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }} className="group relative flex flex-col justify-between min-h-[500px] p-8 md:p-12 bg-background border border-foreground/10 rounded hover:bg-muted transition-all duration-300 overflow-hidden">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <span className="bg-foreground text-background px-3 py-1 rounded font-mono text-xs font-bold uppercase tracking-widest">{phase.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-[0.9] tracking-tight text-foreground mb-8">{phase.title}</h3>
              <div className="mt-auto relative z-10">
                <div className="mb-6 border-l-2 border-accent pl-6"><p className="font-sans text-lg text-foreground leading-tight">{phase.description}</p></div>
                <div className="bg-muted border border-foreground/10 rounded p-3 mb-6">
                  <p className="font-mono text-xs text-foreground/60 uppercase mb-1">Expected Outcome</p>
                  <p className="text-sm font-semibold text-foreground">{phase.outcome}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.deliverables.map((item, i) => (<span key={i} className="px-3 py-1 text-[10px] font-mono border border-foreground/15 rounded text-foreground uppercase tracking-wider bg-transparent">{item}</span>))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── GUARANTEE ───────────────────────────────────────────────────
function TestGuarantee() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b border-foreground/10">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="border border-foreground/15 rounded-lg p-8 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 border border-foreground/15 rounded-full flex items-center justify-center"><Shield className="w-8 h-8 text-accent" /></div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold tracking-tight mb-4">90 Days. Measurable Movement. Or Your Money Back.</h2>
          <p className="font-sans text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">We baseline your AI visibility on day one. If there's no measurable improvement in your answer share within 90 days, you get a full refund. No caveats. No fine print gymnastics.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {["Documented baseline audit before work begins", "90-day answer share tracking across all major LLMs", "Full refund if no measurable improvement"].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-accent" /><span>{item}</span></div>
            ))}
          </div>
          <p className="text-xs text-foreground/40 max-w-xl mx-auto">We've never paid out on this guarantee. Not once. But it exists because we know what it feels like to write five-figure checks to agencies that deliver nothing but decks. You shouldn't have to risk your budget on promises. Risk it on proof.</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── QUALIFICATION ───────────────────────────────────────────────
const fitItems = [
  { main: "$5M+ ARR with real pipeline pressure", sub: "Revenue is real but growth has stalled or become unpredictable" },
  { main: "6-month commitment mindset", sub: "This compounds, it doesn't spike. You understand that." },
  { main: "B2B SaaS or E-commerce with an existing marketing team", sub: "Someone to collaborate with and hand off to" },
  { main: "Category leader or funded challenger ready to own the AI layer", sub: "You want to dominate, not just participate" },
  { main: "Tired of dashboards that show green while revenue stalls", sub: "You've felt the disconnect and you're ready to fix it" },
];
const notFitItems = [
  { main: "Pre-revenue or pre-product-market-fit", sub: "Get the product right first. We'll be here." },
  { main: "Looking for a traffic spike in 30 days", sub: "This is infrastructure, not a hack" },
  { main: "Budget under $10K/month", sub: "The system requires real investment to execute properly" },
  { main: "Heavily regulated industry where content is legally constrained", sub: "Our system depends on publishing velocity" },
  { main: "Want to hand this off and never think about it again", sub: "This is a partnership. We need your team engaged." },
];

function TestQualification() {
  return (
    <section id="who-we-serve" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-foreground/10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">Who This Is For</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">This Isn't for Everyone. Here's How to Tell.</h2>
        <p className="text-base text-foreground/60 max-w-2xl mb-12">We take one client per category. That means we're selective — and so should you be.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInView} transition={{ duration: 0.5, ease: "easeOut" }} className="border border-foreground/15 rounded p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6"><span className="text-accent text-xl">&#10003;</span><h3 className="font-mono text-sm font-bold uppercase tracking-wider">You're a Great Fit If:</h3></div>
            <ul className="space-y-4">
              {fitItems.map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }} className="flex items-start gap-3">
                  <span className="text-accent mt-1">&bull;</span>
                  <div><span className="text-sm font-semibold">{item.main}</span><span className="text-sm text-foreground/60"> &mdash; {item.sub}</span></div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeInView} transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }} className="border border-foreground/15 rounded p-6 md:p-8 bg-muted">
            <div className="flex items-center gap-2 mb-6"><span className="text-red-400 text-xl">&#10007;</span><h3 className="font-mono text-sm font-bold uppercase tracking-wider">Not a Fit If:</h3></div>
            <ul className="space-y-4">
              {notFitItems.map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&bull;</span>
                  <div><span className="text-sm font-semibold">{item.main}</span><span className="text-sm text-foreground/60"> &mdash; {item.sub}</span></div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div className="border-t border-foreground/10 pt-8 mb-12">
          <p className="font-mono text-xs text-foreground/40 uppercase tracking-wider mb-4">Industries we specialize in</p>
          <div className="flex flex-wrap gap-3">
            {["B2B SaaS ($5M+ ARR)", "E-Commerce (7-figures+)", "Professional Services", "Funded Tech (Series A+)", "Agencies & Consultancies"].map((industry, i) => (
              <div key={i} className="border border-foreground/15 px-4 py-2 rounded text-sm">{industry}</div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="inline-block border border-foreground/15 rounded-lg p-8 md:p-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">March 2026: 2 spots remaining</span>
            </div>
            <p className="text-2xl md:text-4xl font-display font-extrabold tracking-tight mb-4">Your Buyers Are Asking AI. Let's Make Sure It Recommends You.</p>
            <p className="text-base text-foreground/60 mb-6">Free 30-min audit · See your brand vs. competitors across ChatGPT, Perplexity, and Gemini</p>
            <a href="https://cal.com/memetik/letstalk" className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity">SEE YOUR AI VISIBILITY SCORE<ArrowRight className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────
const testimonials = [
  { quote: "We lost 40% of our organic traffic in 12 months and couldn't figure out why — our rankings hadn't moved. Memetik showed us that AI was answering our buyers' questions before they ever reached Google. Within 90 days, ChatGPT was recommending us by name. We traced $847K in pipeline directly back to AI-referred traffic.", name: "Sarah Chen", title: "CEO", company: "Series B SaaS (HR Tech, $12M ARR)", metric: "$847K", metricLabel: "AI-Attributed Pipeline" },
  { quote: "I Googled 'best [our category]' and we were #2. I asked ChatGPT the same question and we weren't mentioned at all. Our main competitor was listed first. That's when I called Memetik. Three months later, we're the #1 AI recommendation and our branded search is up 35%. My board finally stopped asking me about the traffic decline.", name: "Marcus Webb", title: "Founder & CEO", company: "8-Figure DTC E-Commerce (Performance Apparel)", metric: "#1", metricLabel: "AI Recommendation in Category" },
  { quote: "Our CMO asked me to figure out why demo requests dropped 30% while our SEO metrics were all green. Turned out our competitors had been building AI visibility for months and we were completely invisible. Memetik got our AI citation rate up 347% in one quarter. Demo requests recovered — and then some.", name: "Jennifer Liu", title: "VP of Demand Gen", company: "Enterprise Software ($45M ARR)", metric: "347%", metricLabel: "AI Citation Increase" },
];

function TestTestimonials() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-foreground/10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">From Clients, Not Our Copywriter</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">They Had the Same Problem You Do.</h2>
        <p className="text-base text-foreground/60 max-w-2xl mb-12">Rankings looked fine. Pipeline told a different story. Here's what happened after 90 days.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }} className="border border-foreground/15 rounded p-6 md:p-8 flex flex-col">
              <Quote className="w-8 h-8 text-foreground/15 mb-4" />
              <p className="text-sm leading-relaxed text-foreground/80 mb-6 flex-1">{t.quote}</p>
              <div className="border-t border-foreground/10 pt-4 mb-4">
                <div className="text-3xl font-display font-extrabold text-accent mb-1">{t.metric}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">{t.metricLabel}</div>
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-foreground/50">{t.title}, {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-foreground/40 uppercase tracking-wider">Trusted by category leaders in SaaS, E-Commerce, and Professional Services</p>
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ────────────────────────────────────────────────
const caseStudies = [
  { title: "How a Series B SaaS Went from AI-Invisible to #1 Recommendation in 90 Days", before: "0 AI citations. Not mentioned in any LLM response for their category.", after: "#1 recommended brand across ChatGPT, Perplexity, and Gemini", revenue: "$847K in attributable pipeline within first quarter", timeline: "90 days from kickoff to #1 position" },
  { title: "How an 8-Figure E-Commerce Brand Captured 52% of Their Traffic from AI", before: "Organic traffic declining 8% MoM despite stable rankings. Zero AI presence.", after: "347% increase in AI citations. 52% of all site traffic now AI-referred.", revenue: "$2.3M in AI-attributed revenue in 6 months", timeline: "First citations within 45 days. Full results by month 6." },
];

function TestCaseStudies() {
  return (
    <section id="work" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-foreground/10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">The Receipts</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-12">Proof, Not Promises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }} className="border border-foreground/15 rounded p-6 md:p-8">
              <h3 className="text-xl font-display font-bold tracking-tight mb-6">{cs.title}</h3>
              <div className="space-y-4 mb-6">
                <div className="border-l-2 border-red-400/50 pl-4"><p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-1">Before</p><p className="text-sm text-foreground/70">{cs.before}</p></div>
                <div className="border-l-2 border-accent pl-4"><p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-1">After</p><p className="text-sm text-foreground/80 font-semibold">{cs.after}</p></div>
                <div className="border-l-2 border-accent pl-4"><p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-1">Revenue Impact</p><p className="text-sm text-foreground/80 font-semibold">{cs.revenue}</p></div>
                <div className="border-l-2 border-foreground/20 pl-4"><p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-1">Timeline</p><p className="text-sm text-foreground/70">{cs.timeline}</p></div>
              </div>
              <a href="#" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent transition-colors">READ THE FULL CASE STUDY<ArrowRight className="w-3 h-3" /></a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────
const faqs = [
  { question: "How is this different from what our SEO agency already does?", answer: "Completely different discipline. Your SEO agency optimizes for Google's ranking algorithm — keywords, backlinks, technical SEO. We optimize for how large language models source, evaluate, and surface brand recommendations. The inputs are different, the outputs are different, and the skillset is different. Most SEO agencies will tell you they 'do AI' now. Ask them to show you a single client's answer share data. They can't, because they don't measure it." },
  { question: "How fast will we see results?", answer: "Most clients see first AI citations within 30-45 days. Meaningful answer share improvement within 60-90 days. Full category positioning by month 4-6. This isn't a traffic hack — it's infrastructure that compounds. The 90-day guarantee exists because that's genuinely how long the system needs to produce measurable movement." },
  { question: "What does this cost?", answer: "Engagements start at $15K/month with a 6-month minimum commitment. That covers all three pillars — LLM positioning, answer engine optimization, and scale systems. There's no a-la-carte menu because the system only works as a system. If that number makes you blink, we're probably not the right fit yet — and that's fine." },
  { question: "What does category exclusivity actually mean?", answer: "It means if we work with you, we won't work with your direct competitor. Period. We take one client per category because our job is to make YOU the #1 AI recommendation — not juggle competing interests. This is also why we have limited spots and why we're selective about who we take on." },
  { question: "What exactly does the guarantee cover?", answer: "We baseline your AI visibility across all major LLMs on day one. If there's no measurable improvement in your answer share after 90 days of execution, you get your money back. 'Measurable improvement' means documented increase in citations, mentions, or recommendation frequency across the models we track. We've never had to pay out. But the guarantee is there because we remember what it felt like to hire agencies that delivered nothing." },
  { question: "Can we do this ourselves?", answer: "Technically, yes. The same way you can technically build your own CRM. The challenge is that LLM optimization requires proprietary prompt testing infrastructure, relationships with high-authority publications for placement, and a methodology built on thousands of data points about how AI models source recommendations. We've spent two years building that. You'd be starting from zero — and your competitors aren't waiting." },
  { question: "How do you actually measure AI visibility?", answer: "We run structured prompt tests across ChatGPT, Perplexity, Gemini, and Claude — tracking whether your brand is mentioned, in what position, with what sentiment, and how frequently across hundreds of relevant prompts. We call the core metric 'Answer Share' — think of it like share of voice, but for AI responses. You get a live dashboard updated weekly. No more flying blind." },
  { question: "We're in [specific industry]. Does this work for us?", answer: "If your buyers use AI to research vendors, compare solutions, or find recommendations — yes. We've driven results in B2B SaaS, E-commerce, professional services, and funded tech. The one exception is heavily regulated industries where content requires extensive legal review, because our system depends on publishing velocity. If you're unsure, the free audit will show you exactly what AI currently says about your category — and whether there's an opportunity worth pursuing." },
];

function TestFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b border-foreground/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">The Questions You're Actually Asking</h2>
        </div>
        <div className="border-t border-foreground/10">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }} className="border-b border-foreground/10 last:border-b-0">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left group">
                <span className="text-base font-semibold pr-8">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 border border-foreground/15 rounded flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="overflow-hidden">
                    <div className="pb-6"><p className="text-base text-foreground/70 leading-relaxed max-w-3xl">{faq.answer}</p></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-foreground/60 mb-4">Still have questions?</p>
          <a href="https://cal.com/memetik/letstalk" className="inline-flex items-center gap-3 border border-foreground px-6 py-3 rounded font-mono font-bold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors">Book a Call — We'll Answer Everything</a>
        </div>
      </div>
    </section>
  );
}

// ─── EMAIL CAPTURE ───────────────────────────────────────────────
function TestEmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b border-foreground/10">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/20 px-3 py-1.5 rounded-full mb-6">
              <Download className="w-3 h-3" />
              <span className="font-mono text-xs uppercase tracking-wider">The Playbook Your Agency Doesn't Have</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight mb-4">The 2026 AI Visibility Playbook</h2>
            <p className="text-base text-foreground/70 mb-6">Not ready to talk? Start here.</p>
            <ul className="space-y-2 mb-6">
              {["Why organic traffic is declining even when rankings are stable (with data)", "How LLMs decide which brands to recommend — and the 6 signals that matter", "The exact audit process we use to measure AI visibility across ChatGPT, Perplexity, and Gemini", "3 things you can do this week to start appearing in AI responses"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-foreground/15 rounded-lg p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-8"><CheckCircle className="w-12 h-12 mx-auto mb-4 text-accent" /><h3 className="font-display font-bold text-xl mb-2">Check Your Email</h3><p className="text-sm text-foreground/70">The playbook is on its way. Check your spam if you don't see it.</p></div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-foreground/60 mb-2 block">Work Email</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required className="w-full px-4 py-3 bg-transparent border border-foreground/20 rounded text-sm focus:border-foreground focus:outline-none transition-colors" />
                </label>
                <button type="submit" className="w-full flex items-center justify-center gap-3 bg-foreground text-background px-6 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity">SEND ME THE PLAYBOOK<ArrowRight className="w-4 h-4" /></button>
                <p className="text-[10px] text-foreground/40 mt-4 text-center">No spam. Unsubscribe anytime. We respect your inbox.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MOBILE STICKY CTA ──────────────────────────────────────────
function TestMobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-foreground text-background p-4 border-t border-background/10 shadow-lg">
      <a href="https://cal.com/memetik/letstalk" className="flex items-center justify-center gap-3 w-full bg-background text-foreground py-3 px-6 font-mono font-bold text-sm uppercase tracking-wider rounded">SEE YOUR AI VISIBILITY SCORE<ArrowRight className="w-4 h-4" /></a>
      <p className="text-[10px] text-background/50 text-center mt-2 uppercase">Free 30-min audit · Your brand vs. competitors in AI</p>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────
export default function TestLanding() {
  useEffect(() => {
    document.title = "MEMETIK | Your Rankings Are Stable. Your Pipeline Isn't. | AEO Agency";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "80% of B2B buyers now use AI for vendor research. We engineer your brand into ChatGPT, Perplexity, and Gemini responses. Measurable AI visibility in 90 days or full refund.");
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <TestMobileStickyCTA />
      <main>
        <TestHero />
        <Marquee />
        <TestServices />
        <TestDifferentiation />
        <TestMethodology />
        <TestGuarantee />
        <TestQualification />
        <TestTestimonials />
        <TestCaseStudies />
        <TestFAQ />
        <TestEmailCapture />

        {/* FOOTER CTA */}
        <footer className="bg-background text-foreground py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-foreground/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 pb-16 border-b border-foreground/15">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">Your Buyers Are Asking AI. Let's Make Sure It Recommends You.</h2>
              <p className="text-base text-foreground/60 mb-8 max-w-xl mx-auto">Every week you wait, your competitors are building the AI visibility infrastructure that makes them the default recommendation. The window to own your category is open. It won't be forever.</p>
              <a href="https://cal.com/memetik/letstalk" className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity">SEE WHAT AI SAYS ABOUT YOU — FREE AUDIT<span>→</span></a>
              <p className="font-mono text-xs text-foreground/40 mt-4 uppercase">See exactly where you rank vs competitors · Free 30-min audit</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div><h4 className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-4">For You</h4><ul className="space-y-2"><li><a href="/for/saas-founders" className="text-sm text-foreground/70 hover:text-foreground transition-colors">SaaS Founders</a></li><li><a href="/for/marketing-leaders" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Marketing Leaders</a></li><li><a href="/for/ecommerce-brands" className="text-sm text-foreground/70 hover:text-foreground transition-colors">E-commerce</a></li><li><a href="/for/b2b-services" className="text-sm text-foreground/70 hover:text-foreground transition-colors">B2B Services</a></li></ul></div>
              <div><h4 className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-4">Solutions</h4><ul className="space-y-2"><li><a href="/solutions/chatgpt-visibility" className="text-sm text-foreground/70 hover:text-foreground transition-colors">ChatGPT Visibility</a></li><li><a href="/solutions/perplexity-citations" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Perplexity Citations</a></li><li><a href="/solutions/ai-overview-ranking" className="text-sm text-foreground/70 hover:text-foreground transition-colors">AI Overview Ranking</a></li><li><a href="/solutions/competitor-displacement" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Competitor Displacement</a></li></ul></div>
              <div><h4 className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-4">Compare</h4><ul className="space-y-2"><li><a href="/vs/traditional-seo-agencies" className="text-sm text-foreground/70 hover:text-foreground transition-colors">vs SEO Agencies</a></li><li><a href="/vs/content-marketing-agencies" className="text-sm text-foreground/70 hover:text-foreground transition-colors">vs Content Agencies</a></li><li><a href="/vs/manual-seo" className="text-sm text-foreground/70 hover:text-foreground transition-colors">vs DIY/Manual</a></li></ul></div>
              <div><h4 className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-4">Resources</h4><ul className="space-y-2"><li><a href="/resources" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Articles</a></li><li><a href="/audit" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Free Audit</a></li><li><a href="#methodology" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Process</a></li><li><a href="#faq" className="text-sm text-foreground/70 hover:text-foreground transition-colors">FAQ</a></li></ul></div>
              <div><h4 className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-4">Company</h4><ul className="space-y-2"><li><a href="/bts" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Behind the Scenes</a></li><li><a href="https://cal.com/memetik/letstalk" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Contact</a></li></ul></div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-foreground/15">
              <div className="flex items-center gap-4 mb-4 md:mb-0"><h3 className="text-xl font-display font-bold tracking-tight">MEMETIK</h3><span className="font-mono text-xs text-foreground/40">Answer Engine Optimization</span></div>
              <div className="flex items-center gap-6">
                <div className="inline-flex items-center gap-2"><span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span><span className="font-mono text-xs uppercase tracking-wider text-foreground/70">Accepting clients</span></div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">© 2026 MEMETIK</div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
