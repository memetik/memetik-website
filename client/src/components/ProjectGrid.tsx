import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "SCALE_AI CITATIONS",
    client: "VERTEX SAAS",
    category: "LLM SEO",
    result: "+450% CHATGPT MENTIONS",
    year: "2024",
  },
  {
    id: "02",
    title: "SEMANTIC COMMERCE",
    client: "LUXE RETAIL",
    category: "AEO STRATEGY",
    result: "12K AI-DIRECTED VISITS",
    year: "2024",
  },
  {
    id: "03",
    title: "KNOWLEDGE GRAPH OPS",
    client: "DATA FLOW",
    category: "ENTITY MAPPING",
    result: "GOOGLE SGE SNIPPETS OWNED",
    year: "2023",
  },
  {
    id: "04",
    title: "PROGRAMMATIC ANSWERS",
    client: "FINTECH CORE",
    category: "CONTENT ENG",
    result: "ZERO-CLICK DOMINANCE",
    year: "2023",
  },
];

export function ProjectGrid() {
  return (
    <section id="work" className="py-24 md:py-32 bg-background text-foreground px-6 md:px-12 border-b border-border">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-b border-border pb-6">
        <div>
          <div className="inline-block px-2 py-1 bg-accent text-accent-foreground font-mono text-xs font-bold mb-4">
            PROVEN INFRASTRUCTURE
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tighter text-white">
            CASE STUDIES
          </h2>
        </div>
        <span className="font-mono text-sm text-muted-foreground mb-2">
          (GENERATIVE ERA)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-0">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative border-b border-border py-12 transition-colors hover:bg-secondary/20 cursor-pointer"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <span className="col-span-1 font-mono text-xs text-primary">
                /{project.id}
              </span>
              <h3 className="col-span-1 md:col-span-5 text-2xl md:text-4xl font-display font-medium tracking-tight group-hover:pl-4 transition-all duration-300 text-white group-hover:text-primary">
                {project.title}
              </h3>
              <div className="col-span-2 md:col-span-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {project.client}
              </div>
              <div className="col-span-2 md:col-span-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {project.category}
              </div>
              <div className="col-span-2 md:col-span-2 font-mono text-xs font-bold text-accent">
                {project.result}
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <button className="font-mono text-sm border-b border-primary text-primary pb-1 hover:pb-2 hover:text-white hover:border-white transition-all">
            VIEW FULL REPORT
        </button>
      </div>
    </section>
  );
}
