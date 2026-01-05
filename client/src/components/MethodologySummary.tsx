import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Target, Database, Share2, RotateCw, ArrowRight } from "lucide-react";
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
    <div
      ref={ref}
      className="group relative flex flex-col justify-between min-h-[450px] md:min-h-[550px] p-8 md:p-12 bg-background border-2 border-primary/20 hover:border-primary transition-all duration-300 overflow-hidden shadow-none hover:shadow-[8px_8px_0px_0px_var(--color-primary)] hover:-translate-y-1"
    >
      {/* Technical Header Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary/10 group-hover:bg-primary/30 transition-colors"></div>
      
      {/* Side ID Marker */}
      <div className="absolute right-0 top-12 bottom-12 w-px bg-primary/10 flex flex-col justify-center items-center gap-2 py-4">
         <span className="writing-vertical-lr text-[8px] font-mono tracking-widest text-primary/40 uppercase rotate-180">Unit-0{index+1}</span>
      </div>

      {/* Top Section */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8 md:mb-10 pr-6">
          <span className="font-mono text-xs tracking-[0.2em] text-primary transition-colors duration-300 border-b-2 border-primary/20 pb-1 uppercase font-bold">
            {phase.subtitle}
          </span>
          <div className="p-2 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
             <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-display font-bold leading-[1] tracking-tighter text-foreground mb-6 group-hover:text-primary transition-colors duration-300 break-words hyphens-auto uppercase">
          {phase.title}
        </h3>

        {/* Description - Always visible on mobile AND desktop now, to ensure usability */}
        <div className="mt-auto relative z-10">
          <div className="mb-8">
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              {phase.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {phase.deliverables.map((item, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-[10px] md:text-xs font-mono border border-primary/20 rounded-none text-muted-foreground uppercase tracking-wider group-hover:border-primary group-hover:text-primary transition-colors duration-300 bg-transparent"
              >
                [ {item} ]
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
    </div>
  );
}

export function MethodologySummary() {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground px-4 md:px-8 border-b border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />
      
      <div className="flex flex-col items-center text-center mb-20 md:mb-32 border-b-2 border-border pb-12 max-w-5xl mx-auto px-4 relative">
        <div className="absolute top-0 left-0 text-[10px] font-mono text-muted-foreground uppercase tracking-widest hidden md:block">
           SEC: PROTOCOLS
        </div>
        <div className="absolute top-0 right-0 text-[10px] font-mono text-muted-foreground uppercase tracking-widest hidden md:block">
           REF: 994-A
        </div>

        <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs font-bold mb-6 tracking-widest border-2 border-primary rounded-none uppercase">
          [ Execution Protocol ]
        </div>
        <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-foreground mb-8 uppercase">
          What We Do
        </h2>
        
        {/* Overview Grid */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mt-4">
          {overviewPoints.map((point, i) => (
            <span key={i} className="px-4 py-2 bg-background border border-primary/30 text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-tight hover:text-primary hover:border-primary transition-colors cursor-default relative group">
              <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
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
        <a href="https://cal.com/memetik/letstalk" className="group relative px-10 py-5 bg-primary text-primary-foreground font-mono font-bold text-sm overflow-hidden rounded-none border-2 border-primary shadow-[6px_6px_0px_0px_var(--color-foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 inline-flex items-center gap-4 uppercase tracking-widest">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <div className="relative flex items-center gap-4">
              <span>[ INITIATE PROTOCOL ]</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </a>
      </div>
    </section>
  );
}
