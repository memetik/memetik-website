import { motion } from "framer-motion";
import { Search, Cpu, Globe, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "LLM SEO",
    description: "We reverse-engineer the training data. Your brand becomes the primary citation for ChatGPT, Claude, and Gemini.",
    tags: ["Training Data Injection", "Citation Optimization", "Brand Entity Connection"]
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "ANSWER ENGINE OPTIMIZATION (AEO)",
    description: "Traditional SEO is dying. We structure content for semantic density that AI agents prioritize over keyword stuffing.",
    tags: ["Semantic Architecture", "Answer Engine Optimization", "Structured Data"]
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "SAAS & ECOM DOMINANCE",
    description: "High-intent visibility for complex B2B sales cycles and massive product catalogs. We capture the 'How do I...' queries.",
    tags: ["Programmatic SEO", "Technical Scale", "Revenue Attribution"]
  }
];

export function Services() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background text-foreground border-y border-border relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group flex flex-col gap-6 p-8 border border-border hover:border-primary transition-colors bg-secondary/10 hover:bg-secondary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
               <Sparkles className="text-accent w-6 h-6" />
            </div>

            <div className="text-primary group-hover:text-accent transition-colors">
              {service.icon}
            </div>
            
            <h3 className="text-2xl font-display font-bold tracking-tight text-foreground">
              {service.title}
            </h3>
            
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>
            
            <div className="mt-auto pt-6 border-t border-border group-hover:border-primary/30">
              <ul className="flex flex-col gap-2">
                {service.tags.map((tag, i) => (
                  <li key={i} className="flex items-center gap-2 font-mono text-xs text-neutral-400 group-hover:text-neutral-300">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
