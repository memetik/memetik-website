import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Search, Cpu, Globe, ArrowUpRight } from "lucide-react";
import React, { useRef } from "react";

const services = [
  {
    id: "01",
    icon: <Cpu className="w-12 h-12" />,
    title: "LLM SEO",
    description: "We reverse-engineer the training data. Your brand becomes the primary citation for ChatGPT, Claude, and Gemini.",
    tags: ["Training Data Injection", "Citation Optimization", "Brand Entity Connection"]
  },
  {
    id: "02",
    icon: <Search className="w-12 h-12" />,
    title: "ANSWER ENGINE OPTIMIZATION",
    description: "Traditional SEO is dying. We structure content for semantic density that AI agents prioritize over keyword stuffing.",
    tags: ["Semantic Architecture", "Answer Engine Optimization", "Structured Data"]
  },
  {
    id: "03",
    icon: <Globe className="w-12 h-12" />,
    title: "SAAS & ECOM DOMINANCE",
    description: "High-intent visibility for complex B2B sales cycles and massive product catalogs. We capture the 'How do I...' queries.",
    tags: ["Programmatic SEO", "Technical Scale", "Revenue Attribution"]
  }
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between h-[500px] md:h-[600px] p-8 md:p-12 border-r border-border/50 bg-background hover:bg-secondary/5 transition-colors duration-500 overflow-hidden"
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Section */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <span className="font-mono text-sm tracking-widest text-muted-foreground group-hover:text-primary transition-colors duration-300">
            /{service.id}
          </span>
          <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300 transform group-hover:rotate-45 group-hover:scale-110">
             <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
        
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[0.9] tracking-tighter text-foreground mb-6 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 mt-auto transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
        <div className="mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-md">
            {service.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-xs font-mono border border-border rounded-full text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Giant Background Icon */}
      <div className="absolute -bottom-12 -right-12 text-foreground/5 group-hover:text-primary/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
        {React.cloneElement(service.icon as React.ReactElement, { className: "w-64 h-64" })}
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="bg-background text-foreground border-y border-border relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/50">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
