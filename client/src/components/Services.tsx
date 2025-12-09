import { motion } from "framer-motion";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between min-h-[450px] md:min-h-[550px] p-8 md:p-12 bg-background border border-border/40 rounded-3xl hover:border-primary/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2"
    >
      {/* Top Section */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8 md:mb-10">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground/60 group-hover:text-primary transition-colors duration-300 border border-border/50 rounded-full px-3 py-1">
            {service.id}
          </span>
          <div className="p-3 rounded-full bg-secondary/5 group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-all duration-300 transform group-hover:rotate-45">
             <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-display font-bold leading-[1] tracking-tighter text-foreground mb-6 group-hover:text-primary transition-colors duration-300 break-words hyphens-auto">
          {service.title}
        </h3>

        {/* Description - Always visible on mobile AND desktop now, to ensure usability */}
        <div className="mt-auto relative z-10">
          <div className="mb-8">
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 text-[10px] md:text-xs font-mono border border-border/60 rounded-full text-muted-foreground/80 group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300 bg-secondary/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Icon - softer opacity */}
      <div className="absolute -bottom-12 -right-12 text-foreground/[0.02] group-hover:text-primary/[0.04] transition-colors duration-500 transform scale-150 group-hover:scale-[1.6] group-hover:-rotate-12 transition-transform duration-1000 ease-in-out pointer-events-none z-0">
        {React.cloneElement(service.icon as React.ReactElement, { className: "w-64 h-64" })}
      </div>
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="bg-background text-foreground py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="flex flex-col items-center text-center mb-16 md:mb-24 border-b border-border/50 pb-12 max-w-5xl mx-auto px-4">
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs font-bold mb-6 tracking-widest border border-primary/20 rounded-full">
          OUR EXPERTISE
        </div>
        <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-foreground">
          CORE CAPABILITIES
        </h2>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
