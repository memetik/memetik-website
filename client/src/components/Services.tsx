const deliverables = [
  {
    id: "01",
    title: "LLM SEO",
    subtitle: "Get Recommended by AI",
    description: "When customers ask ChatGPT, Claude, or Gemini for recommendations, your brand is the answer. We engineer your presence into the models' knowledge base.",
    outcome: "Become the #1 AI recommendation in your category",
    tags: ["AI CITATIONS", "BRAND AUTHORITY"]
  },
  {
    id: "02",
    title: "ANSWER ENGINE",
    subtitle: "Win Zero-Click Searches",
    description: "70% of searches now end without a click. We structure your content so AI pulls YOUR answers into summaries, snippets, and direct responses.",
    outcome: "Capture traffic that never reaches traditional search results",
    tags: ["AEO", "DIRECT ANSWERS"]
  },
  {
    id: "03",
    title: "SCALE SYSTEMS",
    subtitle: "Programmatic Dominance",
    description: "We build content infrastructure that compounds visibility over time—100 bottom-of-funnel articles and 800 programmatic pages working around the clock.",
    outcome: "900+ pages of AI-optimized content working 24/7",
    tags: ["PROGRAMMATIC", "COMPOUND GROWTH"]
  }
];

function DeliverableCard({ item, index }: { item: typeof deliverables[0], index: number }) {
  return (
    <div className="group relative flex flex-col min-h-[480px] p-6 md:p-8 bg-background border border-foreground/10 rounded">
      
      {/* Number */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-foreground/40">0{index + 1}</span>
      </div>

      {/* Main headline */}
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-[0.85] text-foreground mb-2">
        {item.title}
      </h3>
      
      {/* Subtitle - Benefit focused */}
      <p className="font-serif text-lg sm:text-xl text-foreground mb-4">
        {item.subtitle}
      </p>

      {/* Description */}
      <p className="text-base leading-relaxed text-foreground/70 mb-6">
        {item.description}
      </p>
      
      {/* Outcome Box */}
      <div className="border border-foreground/10 rounded p-4 mb-6 bg-muted">
        <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-1">What You Get</div>
        <p className="text-sm font-semibold text-foreground">
          {item.outcome}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        {item.tags.map((tag, i) => (
          <div key={i} className="border border-foreground/15 rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 relative overflow-hidden border-b border-foreground/10">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-12">
        
        <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
            The Full Package
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight mb-4">
          What We Do for You
        </h2>
        <p className="text-base text-foreground/60 max-w-2xl">
          Every client engagement includes all three pillars. This is the complete system that makes your brand the answer AI gives.
        </p>
      </div>

      {/* Deliverables Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliverables.map((item, index) => (
            <DeliverableCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-12 text-center">
        <a 
          href="https://cal.com/memetik/letstalk"
          className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
        >
          LET'S TALK
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
