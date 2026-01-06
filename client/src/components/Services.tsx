const services = [
  {
    id: "01",
    title: "LLM SEO",
    subtitle: "Training Data Systems",
    description: "We reverse-engineer the training data. Your brand becomes the primary citation for ChatGPT, Claude, and Gemini.",
    tags: ["CITATION OPTIMIZATION", "BRAND ENTITY"],
    type: "ATMOSPHERE SYSTEMS",
    status: "DEPLOYED"
  },
  {
    id: "02",
    title: "ANSWER ENGINE",
    subtitle: "Semantic Architecture",
    description: "Traditional SEO is dying. We structure content for semantic density that AI agents prioritize over keyword stuffing.",
    tags: ["AEO", "STRUCTURED DATA"],
    type: "PROPULSION UNITS",
    status: "OPERATIONAL"
  },
  {
    id: "03",
    title: "SAAS & ECOM",
    subtitle: "Revenue Operations",
    description: "High-intent visibility for complex B2B sales cycles and massive product catalogs. We capture the 'How do I...' queries.",
    tags: ["PROGRAMMATIC", "SCALE"],
    type: "MISSION CONTROL",
    status: "ACTIVE"
  }
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  return (
    <div className="group relative flex flex-col min-h-[450px] p-6 md:p-8 bg-background border-b-2 md:border-b-0 md:border-r-2 border-foreground last:border-r-0">
      
      {/* Top Row */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-foreground text-background px-2 py-1 font-mono text-[10px] font-bold">
            FIG.0{index + 1}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">
            {service.type}
          </div>
        </div>
        <div className="border border-foreground px-2 py-0.5 font-mono text-[10px] uppercase">
          {service.status}
        </div>
      </div>

      {/* Title Block */}
      <div className="bg-foreground text-background p-4 mb-6">
        <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight uppercase leading-[0.9]">
          {service.title}
        </div>
        <div className="font-serif text-sm italic mt-2 text-background/70">
          {service.subtitle}
        </div>
      </div>

      {/* Description */}
      <div className="flex-grow">
        <p className="font-mono text-sm leading-relaxed text-foreground/80 mb-6">
          {service.description}
        </p>
        
        {/* Certification Line */}
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-foreground/50 mb-4">
          <span>CERTIFIED FOR OPERATIONS</span>
          <div className="flex-grow border-t border-foreground/20"></div>
          <span>[ TESTED ]</span>
        </div>
      </div>

      {/* Bottom Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <div className="flex items-center justify-center w-8 h-8 bg-foreground text-background">
          <span className="text-xs">✕</span>
        </div>
        {service.tags.map((tag, i) => (
          <div key={i} className="border-2 border-foreground px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
            {tag}
          </div>
        ))}
        <div className="bg-foreground text-background px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
          MISSION-GRADE
        </div>
      </div>

      {/* Corner Registration Mark */}
      <div className="absolute bottom-3 right-3 font-mono text-[8px] text-foreground/30 uppercase">
        MTK-SVC-0{index + 1}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 relative overflow-hidden border-b-2 border-foreground">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="grid grid-cols-2 gap-[2px]">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-foreground"></div>
                ))}
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-foreground/60">CAPABILITIES</span>
              <div className="bg-foreground text-background px-2 py-0.5 font-mono text-[10px] font-bold">
                SECTION 02
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight uppercase">
              Core Systems
            </h2>
          </div>
          
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 text-right">
            <div>OPERATIONAL STATUS: ACTIVE</div>
            <div>LAST UPDATED: 2026</div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="h-1 w-16 bg-foreground"></div>
          <div className="flex-grow border-t-2 border-foreground"></div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">&gt;&gt;&gt;</div>
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
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-foreground/40">
          <span>MORE OUTPUT • MORE RESILIENCE • MORE VISIBILITY</span>
          <span>ZERO DOWNTIME OPERATIONS</span>
        </div>
      </div>
    </section>
  );
}
