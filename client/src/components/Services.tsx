const services = [
  {
    id: "01",
    title: "LLM SEO",
    subtitle: "For Training Data Infiltration",
    description: "We reverse-engineer the training data. Your brand becomes the primary citation for ChatGPT, Claude, and Gemini.",
    tags: ["CITATION OPT", "BRAND ENTITY"],
    type: "ATMOSPHERE SYSTEMS",
    location: "UNITED STATES OF AMERICA"
  },
  {
    id: "02",
    title: "AEO",
    subtitle: "For Semantic Architecture",
    description: "Traditional SEO is dying. We structure content for semantic density that AI agents prioritize over keyword stuffing.",
    tags: ["AEO", "STRUCTURED DATA"],
    type: "PROPULSION UNITS",
    location: "UNITED STATES OF AMERICA"
  },
  {
    id: "03",
    title: "SCALE",
    subtitle: "For Revenue Operations",
    description: "High-intent visibility for complex B2B sales cycles and massive product catalogs. We capture the 'How do I...' queries.",
    tags: ["PROGRAMMATIC", "ECOM + SAAS"],
    type: "MISSION CONTROL",
    location: "UNITED STATES OF AMERICA"
  }
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  return (
    <div className="group relative flex flex-col min-h-[480px] p-6 md:p-8 bg-background border-b-2 md:border-b-0 md:border-r-2 border-foreground last:border-r-0">
      
      {/* Chevron header */}
      <div className="font-mono text-[10px] tracking-tighter text-foreground/60 mb-6 overflow-hidden">
        &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
      </div>

      {/* Main headline - FUEL style */}
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-[0.85] text-foreground mb-2">
        {service.title}
      </h3>
      
      {/* Serif italic subtitle */}
      <p className="font-serif text-lg sm:text-xl italic text-foreground mb-6">
        {service.subtitle}
      </p>

      {/* Description */}
      <p className="font-mono text-sm leading-relaxed text-foreground/70 mb-6 flex-grow">
        {service.description}
      </p>
      
      {/* Certification Line */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-widest text-foreground mb-2">
        <span>CERTIFIED FOR OPERATIONS</span>
        <span className="border border-foreground px-1.5 py-0.5">[ TESTED ]</span>
      </div>
      
      {/* System / Location */}
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-foreground/60 mb-6">
        <span>{service.type}</span>
        <span>/</span>
        <span>{service.location}</span>
      </div>

      {/* Bottom Tags - FUEL style */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <div className="flex items-center justify-center w-8 h-8 bg-foreground text-background">
          <span className="text-xs">✕</span>
        </div>
        <div className="bg-foreground text-background px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
          {service.tags[0]}
        </div>
        {service.tags.slice(1).map((tag, i) => (
          <div key={i} className="border-2 border-foreground px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 relative overflow-hidden border-b-2 border-foreground">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-12">
        
        {/* Chevron bar */}
        <div className="font-mono text-xs tracking-tighter text-foreground/60 mb-8 overflow-hidden">
          &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight uppercase mb-2">
          SERVICES
        </h2>
        <p className="font-serif text-xl sm:text-2xl md:text-3xl italic text-foreground mb-6">
          For AI-Era Visibility
        </p>
        
        {/* Certification + Location */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-foreground mb-2">
          <span>CERTIFIED FOR COMMERCIAL OPERATIONS</span>
          <span className="border border-foreground px-2 py-0.5">[ DEPLOYED ]</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/60">
          <span>MEMETIK SYSTEMS</span>
          <span>/</span>
          <span>UNITED STATES OF AMERICA</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="border-t-2 border-foreground">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
      
      {/* Bottom Tag Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-foreground text-background">
            <span className="text-xs">✕</span>
          </div>
          <div className="bg-foreground text-background px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
            MORE OUTPUT
          </div>
          <div className="border-2 border-foreground px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
            MORE RESILIENCE
          </div>
          <div className="border-2 border-foreground px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
            ZERO DOWNTIME
          </div>
        </div>
      </div>
    </section>
  );
}
