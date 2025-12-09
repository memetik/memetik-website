import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Target, Database, Share2, RotateCw } from "lucide-react";
import { Link } from "wouter";
import React, { useRef } from "react";

const overviewPoints = [
  "AEO (Answer Engine Optimization)",
  "LLM content engineering",
  "First-principles SEO",
  "Parasite SEO across high-authority domains",
  "AI automation for scale",
  "Structured data designed for model ingestion",
  "Authority systems that create answer-share dominance"
];

const phases = [
  {
    id: "01",
    title: "THE LLM AUDIT",
    subtitle: "PHASE 1",
    description: "A complete visibility mapping across 7 major AI models. We establish your current Answer Share and identify the fastest paths to take it.",
    icon: <Target className="w-12 h-12" />,
    deliverables: [
      "100+ prompt tests",
      "Hallucination report",
      "Competitor visibility map",
      "SERP overlap analysis"
    ]
  },
  {
    id: "02",
    title: "PROPRIETARY DATA CORE",
    subtitle: "PHASE 2",
    description: "We construct the data infrastructure models prefer to ingest. Tier 1 'Apex Assets' and Tier 2 'Programmatic Clusters' that force citation.",
    icon: <Database className="w-12 h-12" />,
    deliverables: [
      "8–12 Apex Assets",
      "Comparison grids",
      "600+ Programmatic Pages",
      "Zero filler content"
    ]
  },
  {
    id: "03",
    title: "AUTHORITY INJECTION",
    subtitle: "PHASE 3",
    description: "We force models to recognise your data by distributing it across high-trust surfaces and validating your authority.",
    icon: <Share2 className="w-12 h-12" />,
    deliverables: [
      "Parasite SEO",
      "50–100+ branded mentions",
      "DR70–90 backlinks",
      "Link velocity campaigns"
    ]
  },
  {
    id: "04",
    title: "CONTINUOUS DEPLOYMENT",
    subtitle: "PHASE 4",
    description: "A long-term reinforcement system. We maintain the #1 slot across all relevant queries and prevent loss of visibility as models update.",
    icon: <RotateCw className="w-12 h-12" />,
    deliverables: [
      "Weekly micro-patches",
      "Continuous prompt testing",
      "Competitor interdiction",
      "Live Share Dashboard"
    ]
  }
];

function PhaseCard({ phase, index }: { phase: typeof phases[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between min-h-[450px] p-8 md:p-12 bg-background border border-border/40 rounded-3xl hover:border-primary/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2"
    >
      {/* Top Section */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8 md:mb-10">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground/60 group-hover:text-primary transition-colors duration-300 border border-border/50 rounded-full px-3 py-1">
            {phase.subtitle}
          </span>
          <div className="p-3 rounded-full bg-secondary/5 group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-all duration-300 transform group-hover:rotate-45">
             <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-display font-bold leading-[1] tracking-tighter text-foreground mb-6 group-hover:text-primary transition-colors duration-300 break-words hyphens-auto">
          {phase.title}
        </h3>

        {/* Description - Always visible on mobile, reveal on desktop */}
        <div className="md:mt-auto relative z-10">
          <div className="mb-8 md:transform md:translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out">
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              {phase.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 md:transform md:translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out delay-75">
            {phase.deliverables.map((item, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 text-[10px] md:text-xs font-mono border border-border/60 rounded-full text-muted-foreground/80 group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300 bg-secondary/5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Icon - softer opacity */}
      <div className="absolute -bottom-12 -right-12 text-foreground/[0.02] group-hover:text-primary/[0.04] transition-colors duration-500 transform scale-150 group-hover:scale-[1.6] group-hover:-rotate-12 transition-transform duration-1000 ease-in-out pointer-events-none z-0">
        {React.cloneElement(phase.icon as React.ReactElement, { className: "w-64 h-64" })}
      </div>
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
}

export function MethodologySummary() {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground px-4 md:px-8 border-b border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />
      
      <div className="flex flex-col items-center text-center mb-20 md:mb-32 border-b border-border/50 pb-12 max-w-5xl mx-auto px-4">
        <div className="inline-block px-3 py-1 bg-accent/10 text-accent font-mono text-xs font-bold mb-6 tracking-widest border border-accent/20 rounded-full">
          EXECUTION PROTOCOL
        </div>
        <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-foreground mb-8">
          WHAT WE DO
        </h2>
        
        {/* Overview Grid */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mt-4">
          {overviewPoints.map((point, i) => (
            <span key={i} className="px-4 py-2 bg-secondary/5 border border-border/50 rounded-full text-xs md:text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default">
              {point}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {phases.map((phase, index) => (
          <PhaseCard key={phase.id} phase={phase} index={index} />
        ))}
      </div>
      
      <div className="mt-24 flex justify-center">
        <Link href="/strategy" className="group relative px-10 py-5 bg-foreground text-background font-mono font-bold text-lg tracking-wide overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <div className="relative flex items-center gap-3">
              VIEW FULL STRATEGY
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
      </div>
    </section>
  );
}
