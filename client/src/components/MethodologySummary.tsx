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
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative border-b border-border py-12 md:py-16 transition-colors hover:bg-secondary/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
              {/* Number */}
              <div className="col-span-1 md:col-span-1 font-mono text-sm text-primary/50 group-hover:text-primary transition-colors">
                /{phase.id}
              </div>

              {/* Title & Icon */}
              <div className="col-span-11 md:col-span-4 flex items-center gap-4">
                <div className="p-3 bg-secondary/20 rounded-sm group-hover:bg-primary/10 transition-colors">
                    {phase.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {phase.title}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-5 font-sans text-muted-foreground leading-relaxed text-lg">
                {phase.description}
              </div>
              
              {/* Arrow */}
              <div className="col-span-12 md:col-span-2 flex justify-end items-center h-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
                 <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 flex justify-center">
        <Link href="/blueprint" className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg tracking-wide hover:bg-primary/90 transition-all inline-flex cursor-pointer">
            VIEW FULL STRATEGY
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
