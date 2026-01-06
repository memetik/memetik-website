import { motion } from "framer-motion";
import { Search, Cpu, Globe, ArrowUpRight, Plus } from "lucide-react";
import React, { useRef } from "react";

const services = [
  {
    id: "01",
    icon: <Cpu className="w-12 h-12" />,
    title: "LLM SEO",
    description: "We reverse-engineer the training data. Your brand becomes the primary citation for ChatGPT, Claude, and Gemini.",
    tags: ["Training Data Injection", "Citation Optimization", "Brand Entity Connection"],
    type: "ATMOSPHERE SYSTEMS"
  },
  {
    id: "02",
    icon: <Search className="w-12 h-12" />,
    title: "ANSWER ENGINE OPTIMIZATION",
    description: "Traditional SEO is dying. We structure content for semantic density that AI agents prioritize over keyword stuffing.",
    tags: ["Semantic Architecture", "Answer Engine Optimization", "Structured Data"],
    type: "PROPULSION UNITS"
  },
  {
    id: "03",
    icon: <Globe className="w-12 h-12" />,
    title: "SAAS & ECOM DOMINANCE",
    description: "High-intent visibility for complex B2B sales cycles and massive product catalogs. We capture the 'How do I...' queries.",
    tags: ["Programmatic SEO", "Technical Scale", "Revenue Attribution"],
    type: "MISSION CONTROL"
  }
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={ref}
      className="group relative flex flex-col justify-between min-h-[500px] p-6 md:p-10 bg-[#E3E7DE] border-b-2 md:border-b-0 md:border-r-2 border-foreground hover:bg-[#E3E7DE] transition-all duration-300"
    >
      {/* Decorative Chevron Top */}
      <div className="w-full overflow-hidden whitespace-nowrap mb-6 select-none opacity-40 font-mono text-[10px] tracking-tighter font-bold text-foreground">
        &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
      </div>

      {/* Heavy Black Header */}
      <div className="bg-foreground p-4 md:p-6 mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-4xl md:text-5xl font-display font-black leading-[0.85] tracking-tighter uppercase text-[#E3E7DE]">
            {service.title}
          </h3>
      </div>

      <div className="flex-grow flex flex-col gap-6 relative z-10">
        <h4 className="font-serif text-lg md:text-3xl text-foreground leading-tight tracking-tight">
             {service.description}
        </h4>
        
        <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground mt-auto">
             <span>CERTIFIED FOR OPERATIONS</span>
             <span className="flex-grow border-b border-foreground/20"></span>
             <span>[ TESTED ]</span>
        </div>
        
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-foreground/60">
            <span>{service.type}</span>
            <span>/</span>
            <span>UNITED STATES</span>
        </div>
      </div>
      
      {/* Bottom Bar Controls */}
      <div className="flex mt-8 gap-0 border-2 border-foreground h-12">
         {/* X Box */}
         <div className="aspect-square bg-foreground text-[#E3E7DE] flex items-center justify-center border-r-2 border-foreground">
             <div className="relative w-4 h-4">
                 <div className="absolute inset-0 border border-[#E3E7DE] rotate-45 scale-75"></div>
                 <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E3E7DE] -rotate-45"></div>
                 <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E3E7DE] rotate-45"></div>
             </div>
         </div>
         
         <div className="flex-grow bg-foreground text-[#E3E7DE] flex items-center justify-center px-4 font-mono text-xs font-bold uppercase tracking-wider">
             {service.tags[0]}
         </div>
         
         <div className="bg-[#E3E7DE] text-foreground flex items-center justify-center px-4 font-mono text-xs font-bold uppercase tracking-wider border-l-2 border-foreground">
             MISSION-GRADE
         </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="bg-background text-foreground py-24 px-4 md:px-0 relative overflow-hidden border-b-2 border-foreground">
      
      <div className="container mx-auto px-6 md:px-12 mb-16 relative">
          <div className="flex items-center gap-4 mb-4">
             <div className="h-[2px] w-8 bg-foreground"></div>
             <span className="font-mono font-bold text-sm tracking-widest text-foreground uppercase">CAPABILITIES</span>
             <div className="h-[1px] flex-grow bg-foreground/30"></div>
          </div>
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter text-foreground uppercase mb-4">
             Core Systems
          </h2>
      </div>

      <div className="w-full border-t-2 border-foreground">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 bg-foreground">
            {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
