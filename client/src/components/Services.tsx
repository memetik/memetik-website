import { motion } from "framer-motion";
import { Search, Cpu, Globe, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "LLM SEO",
    description: "We reverse-engineer the training data. Your brand becomes the primary citation for ChatGPT, Claude, and Gemini.",
    tags: ["Training Data Injection", "Citation Optimization", "Brand Entity Connection"]
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "GENERATIVE ENGINE OPTIMIZATION (GEO)",
    description: "Traditional SEO is dying. We structure content for semantic density that AI agents prioritize over keyword stuffing.",
    tags: ["Semantic Architecture", "Answer Engine Optimization", "Structured Data"]
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "SAAS & ECOM DOMINANCE",
    description: "High-intent visibility for complex B2B sales cycles and massive product catalogs. We capture the 'How do I...' queries.",
    tags: [" programmatic SEO", "Technical Scale", "Revenue Attribution"]
  }
];

export function Services() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black text-white border-y border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group flex flex-col gap-6 p-6 border border-white/10 hover:border-white/50 transition-colors bg-neutral-900/50"
          >
            <div className="text-white/50 group-hover:text-white transition-colors">
              {service.icon}
            </div>
            
            <h3 className="text-2xl font-display font-bold tracking-tight">
              {service.title}
            </h3>
            
            <p className="font-mono text-sm text-neutral-400 leading-relaxed">
              {service.description}
            </p>
            
            <div className="mt-auto pt-6 border-t border-white/10">
              <ul className="flex flex-col gap-2">
                {service.tags.map((tag, i) => (
                  <li key={i} className="flex items-center gap-2 font-mono text-xs text-neutral-500">
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
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
