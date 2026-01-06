export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background text-foreground">
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-12">
        
        {/* Social proof badge */}
        <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1.5 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
            Currently accepting 2 new clients
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.85] tracking-tight text-foreground uppercase mb-6">
          BE THE<br/>
          BRAND AI<br/>
          RECOMMENDS
        </h1>
        
        {/* Value proposition */}
        <div className="mb-8 max-w-2xl">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3">
            40-70% of buyers now ask AI before purchasing.
          </p>
          <p className="font-mono text-sm sm:text-base text-foreground/70">
            We engineer your brand into ChatGPT, Perplexity, and Gemini responses — so you're the answer, not your competitors.
          </p>
        </div>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
          <a 
            href="https://cal.com/memetik/letstalk" 
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            GET YOUR FREE AI VISIBILITY AUDIT
            <span className="text-lg">→</span>
          </a>
          <span className="font-mono text-xs text-foreground/50 uppercase">
            30-min strategy call • No obligation
          </span>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-foreground/20">
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-black">50+</span>
            <span className="font-mono text-xs text-foreground/60 uppercase leading-tight">Brands<br/>Optimized</span>
          </div>
          <div className="w-px h-8 bg-foreground/20"></div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-black">3x</span>
            <span className="font-mono text-xs text-foreground/60 uppercase leading-tight">Avg AI<br/>Citation Lift</span>
          </div>
          <div className="w-px h-8 bg-foreground/20"></div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-black">90</span>
            <span className="font-mono text-xs text-foreground/60 uppercase leading-tight">Days to<br/>Results</span>
          </div>
        </div>

      </div>
    </section>
  );
}
