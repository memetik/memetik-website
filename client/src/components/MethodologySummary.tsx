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
    subtitle: "WEEK 1-2",
    description: "Complete visibility mapping across major AI models. We establish your current Answer Share and identify the fastest paths to dominance.",
    icon: <Target className="w-12 h-12" />,
    deliverables: [
      "100+ prompt tests",
      "Competitor visibility map",
      "Gap analysis report",
      "Priority roadmap"
    ],
    outcome: "Know exactly where you stand vs competitors in AI responses"
  },
  {
    id: "02",
    title: "CONTENT ENGINEERING",
    subtitle: "WEEK 3-8",
    description: "We build the content infrastructure that AI models prefer to cite. High-authority assets designed specifically for LLM consumption.",
    icon: <Database className="w-12 h-12" />,
    deliverables: [
      "8–12 Apex Assets",
      "Comparison engines",
      "Programmatic pages",
      "Entity optimization"
    ],
    outcome: "Content that AI actually wants to recommend"
  },
  {
    id: "03",
    title: "AUTHORITY INJECTION",
    subtitle: "WEEK 4-12",
    description: "We establish your brand as the trusted source by distributing across high-authority surfaces that AI models crawl.",
    icon: <Share2 className="w-12 h-12" />,
    deliverables: [
      "DR70-90 placements",
      "Branded mentions",
      "Citation building",
      "Trust signals"
    ],
    outcome: "AI recognizes you as the authority in your category"
  },
  {
    id: "04",
    title: "ONGOING OPTIMIZATION",
    subtitle: "MONTH 3+",
    description: "Continuous reinforcement to maintain and expand your #1 position as AI models update and competitors try to catch up.",
    icon: <RotateCw className="w-12 h-12" />,
    deliverables: [
      "Weekly monitoring",
      "Prompt testing",
      "Competitor tracking",
      "Live dashboard"
    ],
    outcome: "Stay #1 while competitors scramble to figure out AEO"
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
        
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-black leading-[0.9] tracking-tighter text-foreground mb-8 uppercase">
          {phase.title}
        </h3>

        <div className="mt-auto relative z-10">
          <div className="mb-6 border-l-2 border-foreground pl-6">
            <p className="font-serif text-lg text-foreground leading-tight">
              {phase.description}
            </p>
          </div>
          
          {/* Outcome highlight */}
          <div className="bg-foreground/5 border border-foreground/20 p-3 mb-6">
            <p className="font-mono text-xs text-foreground/60 uppercase mb-1">Expected Outcome</p>
            <p className="font-mono text-sm font-bold text-foreground">{phase.outcome}</p>
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
    <section id="methodology" className="py-24 md:py-32 bg-background text-foreground px-4 md:px-0 border-b-2 border-foreground relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 mb-16 relative">
           <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1.5 mb-6">
             <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
               Our Process
             </span>
           </div>
           
           <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-black tracking-tighter text-foreground mb-4 uppercase">
             The 90-Day Roadmap
           </h2>
           <p className="font-mono text-sm text-foreground/60 max-w-2xl mb-8">
             A proven 4-phase system that takes you from invisible to undeniable in AI responses. Here's exactly what happens when you partner with us.
           </p>
           <div className="h-[2px] w-full bg-foreground mb-12"></div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-t-2 border-foreground">
        {phases.map((phase, index) => (
          <div key={phase.id} className={`${index % 2 === 0 ? 'md:border-r-2 border-foreground' : ''} ${index < 2 ? 'border-b-2 border-foreground' : ''}`}>
             <PhaseCard phase={phase} index={index} />
          </div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <p className="font-mono text-sm text-foreground/60 mb-6 uppercase tracking-wider">
          Ready to see what this looks like for your brand?
        </p>
        <a href="https://cal.com/memetik/letstalk" className="group relative px-10 py-5 bg-foreground text-[#E3E7DE] font-mono font-bold text-sm overflow-hidden rounded-none border-2 border-foreground hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 inline-flex items-center gap-4 uppercase tracking-widest">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <div className="relative flex items-center gap-4">
              <span>GET YOUR FREE AI AUDIT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </a>
        <p className="font-mono text-xs text-foreground/40 mt-4 uppercase">
          We'll show you exactly where you rank in AI responses
        </p>
      </div>
    </section>
  );
}
