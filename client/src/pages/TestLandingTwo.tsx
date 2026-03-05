import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import {
  ArrowRight,
  Check,
  CheckCircle,
  Database,
  Download,
  Minus,
  Plus,
  RotateCw,
  Share2,
  Shield,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const fadeInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const sectionShell =
  "relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm";
const cardShell =
  "relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-md";

const services = [
  {
    id: "01",
    title: "REVENUE VISIBILITY",
    subtitle: "Get Chosen in High-Intent Buying Moments",
    description:
      "When buyers ask Google, ChatGPT, Perplexity, or Gemini who to trust in your category, we help your brand show up as the credible answer. That means more shortlist consideration before competitors ever get the call.",
    outcome: "More qualified demand from the moments that shape buying decisions",
    tags: ["PIPELINE", "CATEGORY TRUST"],
  },
  {
    id: "02",
    title: "ZERO-CLICK CAPTURE",
    subtitle: "Capture Demand That Never Clicks",
    description:
      "More revenue journeys now start and end inside AI answers, summaries, and overviews. We structure your content so your brand owns those moments and earns trust even when the click never happens.",
    outcome: "Win visibility and influence where traditional SEO reports stop",
    tags: ["AEO", "AI OVERVIEWS"],
  },
  {
    id: "03",
    title: "COMPOUND SYSTEMS",
    subtitle: "Build a Compounding Revenue Engine",
    description:
      "We build bottom-of-funnel and programmatic content infrastructure designed to scale category coverage, reinforce authority, and keep generating qualified demand month after month.",
    outcome: "A search and AI growth engine that compounds instead of resetting every quarter",
    tags: ["PROGRAMMATIC", "COMPOUND GROWTH"],
  },
];

const phases = [
  {
    title: "REVENUE OPPORTUNITY AUDIT",
    subtitle: "WEEK 1-2",
    icon: <Target className="w-12 h-12" />,
    description:
      "We map where buyers ask revenue-critical questions across Google, ChatGPT, Perplexity, Gemini, and Claude — then show where you win, where competitors win, and where demand is still unclaimed.",
    deliverables: [
      "100+ prompt tests across 4 major LLMs",
      "Competitor demand capture map",
      "Revenue-prioritized gap analysis",
      "Executive roadmap with fastest upside",
    ],
    outcome: "Know exactly where search and AI are creating — or leaking — pipeline.",
  },
  {
    title: "DEMAND CAPTURE BUILDOUT",
    subtitle: "WEEK 3-8",
    icon: <Database className="w-12 h-12" />,
    description:
      "We build the pages, comparisons, bottom-of-funnel assets, and structured content that help your brand get cited, discovered, and shortlisted in the moments that matter most.",
    deliverables: [
      "100 bottom-of-funnel articles",
      "800 programmatic pages",
      "Comparison and alternative pages",
      "Entity and schema optimization",
    ],
    outcome: "Content infrastructure built for pipeline contribution, not vanity traffic.",
  },
  {
    title: "AUTHORITY & DISTRIBUTION",
    subtitle: "WEEK 4-12",
    icon: <Share2 className="w-12 h-12" />,
    description:
      "We strengthen the trust signals AI models and buyers both rely on — placements, branded mentions, and authority surfaces that make your brand easier to recommend and harder to ignore.",
    deliverables: [
      "DR70-90 publication placements",
      "Strategic branded mentions",
      "Citation network building",
      "Trust signal engineering",
    ],
    outcome: "Build the authority layer that increases recommendation frequency and buyer trust.",
  },
  {
    title: "MEASUREMENT & REINFORCEMENT",
    subtitle: "MONTH 3+",
    icon: <RotateCw className="w-12 h-12" />,
    description:
      "We track answer share, prompt patterns, and competitor movement weekly so you can defend gains, expand category coverage, and keep turning visibility into revenue over time.",
    deliverables: [
      "Weekly AI citation monitoring",
      "New prompt pattern testing",
      "Competitor movement alerts",
      "Live answer share dashboard",
    ],
    outcome: "Turn search and AI into a managed growth channel instead of a black box.",
  },
];

const fitItems = [
  {
    main: "Series A/B+ or established service business with real pipeline pressure",
    sub: "You care about efficient growth, not just growth at any cost.",
  },
  {
    main: "Clear ACV or meaningful buying journey",
    sub: "The category is researched, compared, and influenced before sales gets involved.",
  },
  {
    main: "Leadership team wants search to drive revenue, not just rankings",
    sub: "You measure channels by pipeline contribution and category impact.",
  },
  {
    main: "In-house marketing or revenue team ready to execute with us",
    sub: "This works best as a strategic growth partnership, not outsourced busywork.",
  },
  {
    main: "You want a moat competitors will struggle to copy",
    sub: "Distribution, authority, and answer share compound when built correctly.",
  },
];

const notFitItems = [
  {
    main: "Pre-revenue or still finding product-market fit",
    sub: "Search and GEO work best when the offer and category are already validated.",
  },
  {
    main: "Looking for cheap content or a short-term traffic spike",
    sub: "This is growth infrastructure, not a content quota.",
  },
  {
    main: "Budget under $10K/month",
    sub: "The system needs enough investment to produce meaningful coverage and velocity.",
  },
  {
    main: "Highly constrained publishing environment",
    sub: "Heavy compliance slows the publishing cadence this model depends on.",
  },
  {
    main: "Want to hand it off and ignore it",
    sub: "The strongest results come from teams that treat this like a growth lever.",
  },
];

const faqs = [
  {
    question: "How is this different from what our SEO agency already does?",
    answer:
      "Most SEO agencies optimize for rankings, traffic, and technical hygiene. We optimize for revenue-critical discovery across both search and AI engines. That means measuring answer share, category visibility, and pipeline impact — not just whether a keyword moved from position 8 to 5.",
  },
  {
    question: "What outcome should founders and CMOs expect?",
    answer:
      "A stronger share of high-intent demand in your category. In practice that means more branded discovery, more shortlist inclusion, more qualified pipeline, and a channel that compounds instead of needing to be re-bought every quarter.",
  },
  {
    question: "How fast will we see results?",
    answer:
      "Most clients see first movement in citations and recommendation frequency within 30-45 days, meaningful answer share improvement within 60-90 days, and broader pipeline impact as the content and authority layer compound over the following months.",
  },
  {
    question: "What does this cost?",
    answer:
      "Engagements start at $15K/month with a 6-month commitment. That covers the full system: audit, demand capture buildout, authority work, and ongoing reinforcement. We price this like a growth channel, not a content retainer.",
  },
  {
    question: "Why would a fund manager care about this?",
    answer:
      "Because it can become a repeatable, capital-efficient growth lever across a portfolio. When a company owns its category across search and AI, it strengthens demand capture, reduces paid dependency, and creates a moat that is hard for slower competitors to reverse.",
  },
  {
    question: "How do you measure AI visibility?",
    answer:
      "We run structured prompt testing across major LLMs, track whether and how often your brand is cited, and monitor competitive movement over time. We call the core metric Answer Share — effectively share of voice for the answers buyers actually read.",
  },
  {
    question: "Can we do this in-house?",
    answer:
      "You can, but most teams underestimate the testing infrastructure, authority layer, and operating discipline required. We already have the prompt systems, content methodology, and optimization loop built — which means you get speed, pattern recognition, and a tighter path to measurable upside.",
  },
  {
    question: "What does category exclusivity mean?",
    answer:
      "If we work with you, we do not work with a direct competitor in your category. The goal is not to make everyone slightly more visible. The goal is to help one brand own more of the demand and trust in the category.",
  },
];

function GlobalAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050608]" />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.35) 75%, transparent)",
        }}
      />
      <div className="absolute left-[-12%] top-[2%] h-[30rem] w-[30rem] rounded-full bg-[#3157d8]/18 blur-[120px]" />
      <div className="absolute right-[-10%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-[#d08c4a]/15 blur-[120px]" />
      <div className="absolute bottom-[-12%] left-[12%] h-[22rem] w-[22rem] rounded-full bg-[#4f7bf5]/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[6%] h-[24rem] w-[24rem] rounded-full bg-[#f2d1a0]/8 blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)] opacity-40" />
    </div>
  );
}

function HeroSignalField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090c] via-[#060709] to-[#050608]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(91,123,255,0.16),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(230,165,97,0.14),transparent_22%),radial-gradient(circle_at_58%_78%,rgba(255,255,255,0.05),transparent_20%)]" />
      <div
        className="absolute inset-x-0 bottom-0 h-[60%] opacity-[0.32]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent 0%, rgba(5,6,8,0.1) 12%, rgba(5,6,8,0.88) 100%), repeating-linear-gradient(90deg, rgba(113,141,255,0.45) 0px, rgba(113,141,255,0.45) 1px, transparent 1px, transparent 58px)",
          backgroundSize: "100% 100%, 100% 100%",
        }}
      />
      <div className="absolute inset-y-0 right-[-6%] hidden w-[48%] lg:block bg-[radial-gradient(circle_at_50%_50%,rgba(240,201,149,0.14),transparent_64%)] blur-2xl" />
      <div className="absolute left-[6%] top-[18%] h-40 w-40 rounded-full border border-white/10 opacity-30 blur-sm" />
      <div className="absolute right-[14%] top-[14%] h-64 w-64 rounded-full border border-white/10 opacity-20 blur-sm" />
      <div className="absolute bottom-[12%] right-[18%] h-px w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}

function SectionGlow({
  className,
  color = "blue",
}: {
  className?: string;
  color?: "blue" | "amber" | "mixed";
}) {
  const glowMap = {
    blue: "bg-[#4368e5]/14",
    amber: "bg-[#d08d4b]/14",
    mixed: "bg-[#d8b98a]/10",
  };

  return <div aria-hidden className={`pointer-events-none absolute rounded-full blur-[110px] ${glowMap[color]} ${className ?? ""}`} />;
}

function HeroIntelligencePanel() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
      className={`w-full max-w-[30rem] lg:ml-auto ${cardShell}`}
    >
      <SectionGlow color="amber" className="-right-12 top-0 h-44 w-44 opacity-90" />
      <SectionGlow color="blue" className="-left-12 bottom-0 h-48 w-48 opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_28%,rgba(255,255,255,0.02))]" />
      <div className="relative p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 mb-2">
              Live category intelligence
            </p>
            <h3 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white">
              Search + AI demand map
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Updated weekly
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 md:p-6 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 mb-3">
            Answer share
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-5xl md:text-6xl font-display font-semibold leading-none text-white">
                41%
              </div>
              <p className="text-sm text-white/60 mt-2">Up from 18% across core buying prompts</p>
            </div>
            <div className="rounded-full border border-amber-200/15 bg-amber-200/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-100">
              +23 pts / 90 days
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "High-intent prompts", value: "126" },
            { label: "AI engines tracked", value: "4" },
            { label: "Competitor gap closed", value: "68%" },
            { label: "Priority surfaces won", value: "19" },
          ].map((item) => (
            <div key={item.label} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mb-2">
                {item.label}
              </p>
              <p className="text-2xl font-display font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 md:p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              Prompt ownership
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              Top revenue moments
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Best [category] software", width: "78%" },
              { label: "[Category] alternatives", width: "64%" },
              { label: "Who to trust for [category]", width: "85%" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-3 mb-2 text-xs text-white/60">
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]">Owned</span>
                </div>
                <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#5c7cff] via-[#8ea5ff] to-[#f0be83]"
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TestTwoHero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden text-foreground pt-16 md:pt-20">
      <HeroSignalField />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="max-w-4xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 rounded-full mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-[#efc38b] shadow-[0_0_16px_rgba(239,195,139,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
              Revenue-First Search + AI Demand Intelligence
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-display font-extrabold leading-[0.92] tracking-tight text-white mb-6"
          >
            Turn Search and AI Visibility<br />
            <em className="font-normal italic text-[#f4e4cd]" style={{ fontFamily: "'Newsreader', serif" }}>
              Into Pipeline and Revenue.
            </em>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="text-base md:text-lg text-white/68 max-w-3xl mb-10"
          >
            Memetik helps growth-stage brands capture high-intent demand across Google, ChatGPT,
            Perplexity, and Gemini — so more buyers discover, trust, and choose you before they ever
            talk to sales.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
          >
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#090b0d] hover:opacity-90 transition-opacity shadow-[0_12px_40px_rgba(244,228,205,0.14)]"
            >
              See Your Revenue Opportunities in AI Search
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center gap-3 rounded border border-white/15 bg-white/[0.03] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-white hover:bg-white/[0.06] transition-colors"
            >
              Watch the 90-Day Process
            </a>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            className="flex flex-wrap items-center gap-3 text-white/48"
          >
            {[
              "Series A-B+ SaaS",
              "E-commerce",
              "Professional Services",
              "Fund Managers",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em]"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        <HeroIntelligencePanel />
      </div>
    </section>
  );
}

function TestTwoServices() {
  return (
    <section className="text-foreground py-16 md:py-24 relative overflow-hidden border-b border-white/10">
      <SectionGlow color="blue" className="left-[-6rem] top-24 h-56 w-56" />
      <SectionGlow color="amber" className="right-[-4rem] bottom-0 h-52 w-52" />
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-14 ${sectionShell}`}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_18%,transparent_82%,rgba(255,255,255,0.03))]" />
        <div className="relative max-w-7xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.03] px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
            Revenue-First SEO + GEO
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
          Rankings Are a Metric.<br className="hidden md:block" /> Revenue Is the Goal.
        </h2>
        <p className="text-base text-white/65 max-w-2xl">
          Every engagement is built to help your brand capture more high-intent demand, convert more
          buying moments into pipeline, and build a compounding organic growth channel across search
          and AI.
        </p>
        </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className={`group flex flex-col min-h-[460px] p-6 md:p-8 ${cardShell} hover:border-white/15 transition-all duration-300`}
            >
              <SectionGlow color={index === 1 ? "amber" : "blue"} className="-right-16 -bottom-20 h-40 w-40 opacity-80" />
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-white/35">{item.id}</span>
              </div>
              <h3 className="relative text-2xl sm:text-3xl md:text-[2rem] font-display font-bold tracking-tight leading-[0.95] text-white mb-2 break-words max-w-[12ch]">
                {item.title}
              </h3>
              <p className="font-sans text-lg sm:text-xl text-white mb-4">{item.subtitle}</p>
              <p className="text-base leading-relaxed text-white/65 mb-6">{item.description}</p>
              <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 mb-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 mb-1">
                  What You Get
                </div>
                <p className="text-sm font-semibold text-white">{item.outcome}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                {item.tags.map((tag) => (
                  <div
                    key={tag}
                    className="border border-white/12 rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/65 bg-white/[0.02]"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto mt-12 text-center">
        <a
          href="https://cal.com/memetik/letstalk"
          className="inline-flex items-center gap-3 rounded border border-white/15 bg-white/[0.04] px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider text-white hover:bg-white/[0.07] transition-colors"
        >
          See Where Revenue Is Being Lost to AI Search
          <span>→</span>
        </a>
      </div>
      </div>
    </section>
  );
}

function TestTwoDifferentiation() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-white/10 text-foreground relative overflow-hidden">
      <SectionGlow color="mixed" className="left-[8%] top-20 h-48 w-48" />
      <div className={`max-w-6xl mx-auto p-8 md:p-12 ${sectionShell}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div {...fadeInView} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.03] px-3 py-1.5 rounded-full mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-white/60">
                Why Memetik
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-[0.9] mb-2 tracking-tight text-white">
              Traditional SEO Can Lift Rankings. We Focus on Revenue Impact.
            </h2>
            <p className="font-sans text-lg sm:text-xl text-white/60 mb-6">
              Boards, founders, and CMOs do not care about green arrows if pipeline stalls.
            </p>
            <p className="text-base leading-relaxed text-white/68">
              Memetik is built for the new demand journey: buyers research in Google, validate in AI,
              compare alternatives, and shortlist before sales ever enters the picture. Our job is to
              make sure your brand owns more of that journey — and turns visibility into measurable
              commercial upside.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`${cardShell} p-6`}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4 pb-2 border-b border-white/10">
                The Old Way
              </div>
              <ul className="space-y-3">
                {[
                  "Celebrate rankings while pipeline stays flat",
                  "Treat content as an output, not a growth system",
                  "Ignore zero-click and AI buying moments",
                  "Report activity instead of commercial impact",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/40 line-through text-sm">
                    <X className="w-3 h-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className={`${cardShell} p-6 bg-white/[0.08] text-white`}
            >
              <SectionGlow color="amber" className="-right-14 top-0 h-36 w-36 opacity-80" />
              <div className="relative font-mono text-[10px] uppercase tracking-widest text-white/55 mb-4 pb-2 border-b border-white/10">
                The Memetik Way
              </div>
              <ul className="relative space-y-3">
                {[
                  "Build for pipeline, category trust, and demand capture",
                  "Engineer discovery across search and AI together",
                  "Track answer share and competitive visibility weekly",
                  "Treat SEO + GEO like a compounding revenue channel",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white text-sm font-semibold">
                    <Check className="w-3 h-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestTwoMethodology() {
  return (
    <section
      id="methodology"
      className="py-24 md:py-32 text-foreground px-4 md:px-0 border-b border-white/10 relative overflow-hidden"
    >
      <SectionGlow color="blue" className="left-[12%] top-28 h-56 w-56" />
      <SectionGlow color="amber" className="right-[6%] top-40 h-48 w-48" />
      <div className={`container mx-auto px-6 md:px-12 py-10 md:py-14 ${sectionShell}`}>
      <div className="container mx-auto mb-16 relative">
        <div className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.03] px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-white/60">
            The System
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-4">
          From Visibility to Revenue in 90 Days
        </h2>
        <p className="text-base text-white/65 max-w-2xl mb-8">
          A four-phase system built to help growth-stage brands capture demand, strengthen category
          authority, and convert more search and AI visibility into pipeline.
        </p>
        <div className="h-px w-full bg-white/10 mb-12"></div>
      </div>
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
            className={`group flex flex-col justify-between min-h-[500px] p-8 md:p-12 ${cardShell} transition-all duration-300`}
          >
            <SectionGlow color={index % 2 === 0 ? "blue" : "amber"} className="-right-12 bottom-0 h-40 w-40 opacity-80" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <span className="bg-white text-[#070809] px-3 py-1 rounded font-mono text-xs font-bold uppercase tracking-widest">
                  {phase.subtitle}
                </span>
                <div className="text-white/20">{phase.icon}</div>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-[0.9] tracking-tight text-white mb-8">
                {phase.title}
              </h3>
              <div className="mt-auto relative z-10">
                <div className="mb-6 border-l-2 border-[#f0be83] pl-6">
                  <p className="font-sans text-lg text-white/78 leading-tight">{phase.description}</p>
                </div>
                <div className="bg-black/20 border border-white/10 rounded p-3 mb-6">
                  <p className="font-mono text-xs text-white/55 uppercase mb-1">
                    Expected Outcome
                  </p>
                  <p className="text-sm font-semibold text-white">{phase.outcome}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-[10px] font-mono border border-white/12 rounded text-white/65 uppercase tracking-wider bg-white/[0.02]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}

function TestTwoGuarantee() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-foreground border-b border-white/10 relative overflow-hidden">
      <SectionGlow color="amber" className="left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${sectionShell} p-8 md:p-12 text-center`}
        >
          <div className="w-16 h-16 mx-auto mb-6 border border-white/15 rounded-full flex items-center justify-center bg-white/[0.04]">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
            More High-Intent Visibility in 90 Days. Or Your Money Back.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/68 mb-8 max-w-2xl mx-auto">
            We baseline your category visibility across search and AI on day one. If there is no
            measurable improvement in answer share and high-intent discovery within 90 days, you get
            a full refund.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              "Documented baseline before work begins",
              "90-day tracking across major LLMs",
              "Full refund if visibility does not move",
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2 text-sm text-white/82">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/42 max-w-xl mx-auto">
            We keep the guarantee because executive teams should not have to underwrite another vague
            agency promise. The budget should be tied to proof, not posture.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TestTwoQualification() {
  return (
    <section
      id="who-we-serve"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-white/10 text-foreground relative overflow-hidden"
    >
      <SectionGlow color="blue" className="right-[8%] top-24 h-52 w-52" />
      <div className={`max-w-6xl mx-auto p-8 md:p-12 ${sectionShell}`}>
        <div className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.03] px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-white/60">
            Who This Is For
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
          Built for Teams That Care About Efficient Growth.
        </h2>
        <p className="text-base text-white/65 max-w-2xl mb-12">
          The best fits are companies with real buying journeys, real pipeline goals, and leadership
          teams that want search to become a meaningful growth channel again.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`${cardShell} p-6 md:p-8`}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-accent text-xl">&#10003;</span>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider">You're a Great Fit If:</h3>
            </div>
            <ul className="space-y-4">
              {fitItems.map((item, i) => (
                <motion.li
                  key={item.main}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-accent mt-1">&bull;</span>
                  <div>
                    <span className="text-sm font-semibold text-white">{item.main}</span>
                    <span className="text-sm text-white/60"> &mdash; {item.sub}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            {...fadeInView}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className={`${cardShell} p-6 md:p-8 bg-white/[0.03]`}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-red-400 text-xl">&#10007;</span>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider">Not a Fit If:</h3>
            </div>
            <ul className="space-y-4">
              {notFitItems.map((item, i) => (
                <motion.li
                  key={item.main}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-red-400 mt-1">&bull;</span>
                  <div>
                    <span className="text-sm font-semibold text-white">{item.main}</span>
                    <span className="text-sm text-white/60"> &mdash; {item.sub}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div className="border-t border-white/10 pt-8 mb-12">
          <p className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4">
            Ideal buyers
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Series B SaaS",
              "Growth-stage E-Commerce",
              "Professional Services",
              "Demand Gen Leaders",
              "Fund Managers & Portfolio Teams",
            ].map((item) => (
              <div key={item} className="border border-white/12 bg-white/[0.03] px-4 py-2 rounded text-sm text-white/78">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className={`inline-block p-8 md:p-12 max-w-2xl ${cardShell}`}>
            <div className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.03] px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-wider text-white/65">
                March 2026: 2 spots remaining
              </span>
            </div>
            <p className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white mb-4">
              Search Should Be Driving Pipeline. Let's Make It Happen.
            </p>
            <p className="text-base text-white/65 mb-6">
              Free 30-min audit · See where your brand is winning and losing demand across search and AI
            </p>
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider text-[#090b0d] hover:opacity-90 transition-opacity"
            >
              See Your Visibility-to-Revenue Score
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestTwoFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-foreground border-b border-white/10 relative overflow-hidden">
      <SectionGlow color="mixed" className="left-[10%] top-16 h-48 w-48" />
      <div className={`max-w-4xl mx-auto p-8 md:p-12 ${sectionShell}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
            The Questions Executive Teams Actually Ask
          </h2>
        </div>
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
              className="border-b border-white/10 last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-base font-semibold pr-8 text-white">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 border border-white/15 bg-white/[0.03] rounded flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#090b0d] transition-colors">
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">
                      <p className="text-base text-white/68 leading-relaxed max-w-3xl">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-white/60 mb-4">Still have questions?</p>
          <a
            href="https://cal.com/memetik/letstalk"
            className="inline-flex items-center gap-3 border border-white/15 bg-white/[0.03] px-6 py-3 rounded font-mono font-bold text-sm uppercase tracking-wider text-white hover:bg-white hover:text-[#090b0d] transition-colors"
          >
            Book a Call — We'll Answer Everything
          </a>
        </div>
      </div>
    </section>
  );
}

function TestTwoEmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-foreground border-b border-white/10 relative overflow-hidden">
      <SectionGlow color="amber" className="right-[8%] top-20 h-52 w-52" />
      <div className={`max-w-4xl mx-auto p-8 md:p-12 ${sectionShell}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.03] px-3 py-1.5 rounded-full mb-6">
              <Download className="w-3 h-3" />
              <span className="font-mono text-xs uppercase tracking-wider text-white/65">
                Revenue-First SEO + GEO Playbook
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white mb-4">
              The 2026 Search + AI Revenue Playbook
            </h2>
            <p className="text-base text-white/68 mb-6">
              Not ready to talk? Start with the framework.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "How high-intent demand is shifting from search results into AI answers",
                "The metrics executive teams should track beyond rankings and traffic",
                "How to audit your category visibility across Google, ChatGPT, Perplexity, and Gemini",
                "Three moves you can make this quarter to turn visibility into pipeline",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/78">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${cardShell} p-6 md:p-8`}>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-display font-bold text-xl text-white mb-2">Check Your Email</h3>
                <p className="text-sm text-white/68">
                  The playbook is on its way. Check your spam if you don't see it.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-white/55 mb-2 block">
                    Work Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/12 rounded text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none transition-colors"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-6 py-4 font-mono font-bold text-sm uppercase tracking-wider text-[#090b0d] hover:opacity-90 transition-opacity"
                >
                  Send Me the Playbook
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-white/40 mt-4 text-center">
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestTwoMobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-foreground text-background p-4 border-t border-background/10 shadow-lg">
      <a
        href="https://cal.com/memetik/letstalk"
        className="flex items-center justify-center gap-3 w-full bg-background text-foreground py-3 px-6 font-mono font-bold text-sm uppercase tracking-wider rounded"
      >
        See Your Revenue Opportunities
        <TrendingUp className="w-4 h-4" />
      </a>
      <p className="text-[10px] text-background/50 text-center mt-2 uppercase">
        Free 30-min audit · Search and AI demand map
      </p>
    </div>
  );
}

export default function TestLandingTwo() {
  useEffect(() => {
    document.title = "MEMETIK | Revenue-First SEO + GEO | Search and AI Pipeline Growth";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Memetik helps growth-stage brands turn search and AI visibility into pipeline, category authority, and revenue. Revenue-first SEO + GEO for SaaS, e-commerce, and professional services.",
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <GlobalAtmosphere />
      <Nav />
      <TestTwoMobileStickyCTA />
      <main className="relative z-10">
        <TestTwoHero />
        <Marquee />
        <TestTwoServices />
        <TestTwoDifferentiation />
        <TestTwoMethodology />
        <TestTwoGuarantee />
        <TestTwoQualification />
        <TestTwoFAQ />
        <TestTwoEmailCapture />

        <footer className="text-foreground py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-white/10">
          <SectionGlow color="amber" className="left-1/2 top-0 h-64 w-64 -translate-x-1/2 opacity-70" />
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 pb-16 p-10 md:p-14 border-b border-white/15 ${sectionShell}`}>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
                Own the Demand That Drives Revenue.
              </h2>
              <p className="text-base text-white/66 mb-8 max-w-xl mx-auto">
                Your buyers are already asking search engines and AI who to trust. We help make sure
                the answer is your brand — and that the outcome is more pipeline, more authority, and
                more compounding demand.
              </p>
              <a
                href="https://cal.com/memetik/letstalk"
                className="inline-flex items-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider text-[#090b0d] hover:opacity-90 transition-opacity"
              >
                See What Search and AI Are Worth to Your Pipeline
                <span>→</span>
              </a>
              <p className="font-mono text-xs text-white/42 mt-4 uppercase">
                Free 30-min audit · Clear upside · No obligation
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <h3 className="text-xl font-display font-bold tracking-tight text-white">MEMETIK</h3>
                <span className="font-mono text-xs text-white/40">Revenue-First SEO + GEO</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  <span className="font-mono text-xs uppercase tracking-wider text-white/65">
                    Accepting clients
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  © 2026 MEMETIK
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
