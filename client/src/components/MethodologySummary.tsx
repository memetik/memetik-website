import { motion } from "framer-motion";
import { Target, Database, Share2, RotateCw, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const phases = [
  {
    id: "01",
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "CITATION VOID AUDIT",
    description: "We run 100+ real buyer prompts across 7 engines to find where you are invisible. We deliver a Capital Allocation Roadmap naming your exact 3 'Money Entities'."
  },
  {
    id: "02",
    icon: <Database className="w-6 h-6 text-primary" />,
    title: "PROPRIETARY DATA CORE",
    description: "We build the permanent moat. Tier 1 'Apex Assets' (Flagship Content) and Tier 2 'Knowledge Graph' (Programmatic Data) that Answer Engines are forced to cite."
  },
  {
    id: "03",
    icon: <Share2 className="w-6 h-6 text-primary" />,
    title: "TRUST RELAY NETWORK",
    description: "We launch 12-15 surgically crafted posts across external platforms (Reddit, LinkedIn, Medium) that quote your Apex Assets verbatim, validating your authority."
  },
  {
    id: "04",
    icon: <RotateCw className="w-6 h-6 text-primary" />,
    title: "CITATION FORCING LOOP",
    description: "Weekly micro-patches and a live Answer Share Dashboard to track your dominance. The perpetual #1 lock that competitors cannot break."
  }
];

export function MethodologySummary() {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground px-6 md:px-12 border-b border-border">
      <div className="flex flex-col items-center text-center mb-16 md:mb-24 border-b border-border pb-6">
        <div className="inline-block px-2 py-1 bg-accent text-accent-foreground font-mono text-xs font-bold mb-4">
          EXECUTION PROTOCOL
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tighter text-foreground mb-4">
          WHAT WE DO
        </h2>
        <span className="font-mono text-sm text-muted-foreground">
          (90-DAY INFRASTRUCTURE BUILD)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-0 border-t border-border">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative border-b border-border/50 py-16 md:py-24 transition-all hover:bg-secondary/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
              {/* Number */}
              <div className="col-span-1 md:col-span-1">
                <span className="font-mono text-xl text-primary/30 group-hover:text-primary transition-colors duration-500 font-bold block transform group-hover:-translate-y-1 group-hover:scale-110 origin-left">
                  /{phase.id}
                </span>
              </div>

              {/* Title */}
              <div className="col-span-11 md:col-span-5 flex items-center">
                <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {phase.title}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-5 font-serif text-muted-foreground leading-relaxed text-lg md:text-xl md:pl-8 border-l-0 md:border-l border-border/50 group-hover:border-primary/30 transition-colors duration-500">
                {phase.description}
              </div>
              
              {/* Arrow */}
              <div className="col-span-12 md:col-span-1 flex justify-end items-center h-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-20px] group-hover:translate-x-0 hidden md:flex">
                 <div className="p-3 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm">
                   <ArrowRight className="w-6 h-6 text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)" />
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 flex justify-center">
        <Link href="/strategy" className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg tracking-wide hover:bg-primary/90 transition-all inline-flex cursor-pointer">
            VIEW FULL STRATEGY
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
