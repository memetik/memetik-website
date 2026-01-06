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
    <div
      ref={ref}
      className="group relative flex flex-col justify-between min-h-[450px] md:min-h-[550px] p-8 md:p-12 bg-background border-r border-b border-primary/20 hover:bg-secondary/5 transition-all duration-300 overflow-hidden"
    >
      {/* Corner Markers */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary opacity-20 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary opacity-20 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary opacity-20 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary opacity-20 group-hover:opacity-100 transition-opacity"></div>

      {/* Top Section */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8 md:mb-10">
          <span className="font-mono text-xs tracking-[0.2em] text-primary group-hover:text-primary transition-colors duration-300 border-b border-primary/50 pb-1 uppercase">
            Unit {service.id}
          </span>
          <div className="p-2 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
             <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-display font-bold leading-[0.9] tracking-tighter text-foreground mb-6 group-hover:text-primary transition-colors duration-300 uppercase">
          {service.title}
        </h3>

        {/* Description - Always visible on mobile AND desktop now, to ensure usability */}
        <div className="mt-auto relative z-10">
          <div className="mb-8 pl-4 border-l-2 border-primary/20 group-hover:border-primary transition-colors">
            <p className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed italic">
              {service.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-[10px] md:text-xs font-mono bg-primary text-primary-foreground font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Icon - Wireframe style */}
      <div className="absolute -bottom-12 -right-12 text-primary opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 transform scale-150 group-hover:scale-[1.6] group-hover:-rotate-12 transition-transform duration-1000 ease-in-out pointer-events-none z-0">
        {React.cloneElement(service.icon as React.ReactElement, { className: "w-64 h-64 stroke-[0.5]" })}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="bg-background text-foreground py-24 px-4 md:px-8 relative overflow-hidden border-b-2 border-border">
      {/* Decorative Technical Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05]"></div>

      <div className="flex flex-col items-center text-center mb-16 md:mb-24 border-b border-border/50 pb-12 max-w-5xl mx-auto px-4 relative z-10">
        {/* Chevron Divider */}
        <div className="w-full overflow-hidden text-primary/40 font-mono text-xs tracking-widest whitespace-nowrap mb-6 select-none opacity-50">
          &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
        </div>
        
        <div className="inline-block px-3 py-1 bg-primary text-primary-foreground font-mono text-xs font-bold mb-6 tracking-widest rounded-none uppercase">
          [ Capacity & Infrastructure ]
        </div>
        <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-foreground uppercase">
          Core Capabilities
        </h2>
        <div className="flex items-center gap-4 mt-8 font-mono text-xs text-muted-foreground tracking-widest uppercase">
           <span>/// Deployable Assets</span>
           <span>/// Global Reach</span>
           <span>/// 24/7 Ops</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-primary bg-primary">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
