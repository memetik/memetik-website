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
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group flex flex-col gap-6 p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:rotate-12 group-hover:scale-110">
               <Sparkles className="text-accent w-6 h-6" />
            </div>

            <div className="relative z-10 text-primary group-hover:text-accent transition-colors duration-300">
              {service.icon}
            </div>
            
            <h3 className="relative z-10 text-2xl font-display font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
            
            <p className="relative z-10 font-serif text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
            
            <div className="relative z-10 mt-auto pt-6 border-t border-border/50 group-hover:border-primary/20 transition-colors duration-300">
              <ul className="flex flex-col gap-3">
                {service.tags.map((tag, i) => (
                  <li key={i} className="flex items-center gap-3 font-mono text-xs text-muted-foreground/80 group-hover:text-foreground/80 transition-colors">
                    <span className="w-1.5 h-1.5 bg-primary/50 group-hover:bg-accent rounded-full transition-colors duration-300" />
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
