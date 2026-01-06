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
      className="group relative flex flex-col justify-between min-h-[500px] p-8 md:p-12 bg-background border-2 border-foreground hover:bg-[#E3E7DE] transition-all duration-300 overflow-hidden"
    >
      {/* Heavy Black Bar Top */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-foreground"></div>
      
      {/* Top Section */}
      <div className="relative z-10 flex flex-col h-full mt-6">
        <div className="flex justify-between items-start mb-8">
          <span className="bg-foreground text-[#E3E7DE] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
            {phase.subtitle}
          </span>
          <div className="font-mono text-xs font-bold text-foreground/40">
              UNIT-{phase.id}
          </div>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-display font-black leading-[0.9] tracking-tighter text-foreground mb-8 uppercase">
          {phase.title}
        </h3>

        <div className="mt-auto relative z-10">
          <div className="mb-8 border-l-2 border-foreground pl-6">
            <p className="font-serif text-xl text-foreground leading-tight">
              {phase.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {phase.deliverables.map((item, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-[10px] font-mono border border-foreground/30 text-foreground uppercase tracking-wider bg-transparent"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MethodologySummary() {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground px-4 md:px-0 border-b-2 border-foreground relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 mb-16 relative">
           <div className="w-full overflow-hidden whitespace-nowrap mb-6 select-none opacity-40 font-mono text-[10px] tracking-tighter font-bold text-foreground">
                &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
           </div>
           
           <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter text-foreground mb-8 uppercase">
             Methodology
           </h2>
           <div className="h-[2px] w-full bg-foreground mb-12"></div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-t-2 border-foreground">
        {phases.map((phase, index) => (
          <div key={phase.id} className={`${index % 2 === 0 ? 'md:border-r-2 border-foreground' : ''} ${index < 2 ? 'border-b-2 border-foreground' : ''}`}>
             <PhaseCard phase={phase} index={index} />
          </div>
        ))}
      </div>
      
      <div className="mt-24 flex justify-center">
        <a href="https://cal.com/memetik/letstalk" className="group relative px-10 py-5 bg-foreground text-[#E3E7DE] font-mono font-bold text-sm overflow-hidden rounded-none border-2 border-foreground hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 inline-flex items-center gap-4 uppercase tracking-widest">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <div className="relative flex items-center gap-4">
              <span>LET'S TALK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </a>
      </div>
    </section>
  );
}
