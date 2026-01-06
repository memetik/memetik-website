const services = [
  {
    id: "01",
    title: "LLM SEO",
    subtitle: "Get Recommended by AI",
    description: "When customers ask ChatGPT, Claude, or Gemini for recommendations, your brand is the answer. We engineer your presence into the models' knowledge base.",
    outcome: "Become the #1 AI recommendation in your category",
    tags: ["AI CITATIONS", "BRAND AUTHORITY"],
    investment: "From $15K/mo"
  },
  {
    id: "02",
    title: "ANSWER ENGINE",
    subtitle: "Win Zero-Click Searches",
    description: "70% of searches now end without a click. We structure your content so AI pulls YOUR answers into summaries, snippets, and direct responses.",
    outcome: "Capture traffic that never reaches traditional search results",
    tags: ["AEO", "DIRECT ANSWERS"],
    investment: "From $15K/mo"
  },
  {
    id: "03",
    title: "SCALE SYSTEMS",
    subtitle: "Programmatic Dominance",
    description: "For SaaS and E-commerce brands ready to dominate thousands of queries. We build content infrastructure that compounds visibility over time.",
    outcome: "600+ pages of AI-optimized content working 24/7",
    tags: ["PROGRAMMATIC", "COMPOUND GROWTH"],
    investment: "From $20K/mo"
  }
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  return (
    <div className="group relative flex flex-col min-h-[520px] p-6 md:p-8 bg-background border-b-2 md:border-b-0 md:border-r-2 border-foreground last:border-r-0">
      
      {/* Service Number */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-foreground/40">SERVICE 0{index + 1}</span>
        <span className="font-mono text-xs text-foreground/60">{service.investment}</span>
      </div>

      {/* Main headline */}
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-[0.85] text-foreground mb-2">
        {service.title}
      </h3>
      
      {/* Subtitle - Benefit focused */}
      <p className="font-serif text-lg sm:text-xl text-foreground mb-4">
        {service.subtitle}
      </p>

      {/* Description */}
      <p className="font-mono text-sm leading-relaxed text-foreground/70 mb-6">
        {service.description}
      </p>
      
      {/* Outcome Box */}
      <div className="border-2 border-foreground p-4 mb-6 bg-foreground/5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-1">What You Get</div>
        <p className="font-mono text-sm font-bold text-foreground">
          {service.outcome}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {service.tags.map((tag, i) => (
          <div key={i} className="border border-foreground/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider">
            {tag}
          </div>
        ))}
      </div>

      {/* CTA */}
      <a 
        href="https://cal.com/memetik/letstalk"
        className="mt-auto inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground hover:opacity-70 transition-opacity"
      >
        Learn More →
      </a>
    </div>
  );
}

export function Services() {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 relative overflow-hidden border-b-2 border-foreground">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-12">
        
        <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1.5 mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
            What We Deliver
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight uppercase mb-4">
          Services Built for Results
        </h2>
        <p className="font-mono text-sm text-foreground/60 max-w-2xl mb-6">
          Every engagement is designed around one goal: making your brand the answer AI gives. Here's how we do it.
        </p>
        
        {/* Investment qualifier */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider text-foreground/60">
          <span>Minimum engagement: 6 months</span>
          <span>•</span>
          <span>Investment from $15K/month</span>
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
      
      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-12 text-center">
        <p className="font-mono text-sm text-foreground/60 mb-4">
          Not sure which service is right for you?
        </p>
        <a 
          href="https://cal.com/memetik/letstalk"
          className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          GET A CUSTOM RECOMMENDATION
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
