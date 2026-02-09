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
      "100 bottom-of-funnel articles",
      "800 programmatic pages",
      "Comparison engines",
      "Entity optimization"
    ],
    outcome: "900+ pages of AI-optimized content"
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
      className="group relative flex flex-col justify-between min-h-[500px] p-8 md:p-12 bg-background border border-foreground/10 rounded hover:bg-muted transition-all duration-300 overflow-hidden"
    >
      {/* Top Section */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <span className="bg-foreground text-background px-3 py-1 rounded font-mono text-xs font-bold uppercase tracking-widest">
            {phase.subtitle}
          </span>
        </div>
        
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-[0.9] tracking-tight text-foreground mb-8">
          {phase.title}
        </h3>

        <div className="mt-auto relative z-10">
          <div className="mb-6 border-l-2 border-accent pl-6">
            <p className="font-serif text-lg text-foreground leading-tight">
              {phase.description}
            </p>
          </div>
          
          {/* Outcome highlight */}
          <div className="bg-muted border border-foreground/10 rounded p-3 mb-6">
            <p className="font-mono text-xs text-foreground/60 uppercase mb-1">Expected Outcome</p>
            <p className="text-sm font-semibold text-foreground">{phase.outcome}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {phase.deliverables.map((item, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-[10px] font-mono border border-foreground/15 rounded text-foreground uppercase tracking-wider bg-transparent"
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
    <section id="methodology" className="py-24 md:py-32 bg-background text-foreground px-4 md:px-0 border-b border-foreground/10 relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 mb-16 relative">
           <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
             <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
               Our Process
             </span>
           </div>
           
           <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-4">
             The 90-Day Roadmap
           </h2>
           <p className="text-base text-foreground/60 max-w-2xl mb-8">
             A proven 4-phase system that takes you from invisible to undeniable in AI responses. Here's exactly what happens when you partner with us.
           </p>
           <div className="h-px w-full bg-foreground/10 mb-12"></div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12">
        {phases.map((phase, index) => (
          <div key={phase.id}>
             <PhaseCard phase={phase} index={index} />
          </div>
        ))}
      </div>
      

    </section>
  );
}
