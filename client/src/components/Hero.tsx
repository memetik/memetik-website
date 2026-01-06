export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background text-foreground">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--color-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-foreground)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.06]"></div>
      
      {/* Decorative crosses */}
      <div className="absolute top-32 right-8 text-foreground/20 text-2xl font-light select-none hidden sm:block">+</div>
      <div className="absolute top-1/2 right-12 text-foreground/20 text-2xl font-light select-none hidden sm:block">+</div>
      <div className="absolute bottom-48 left-8 text-foreground/20 text-2xl font-light select-none hidden sm:block">+</div>
      <div className="absolute bottom-32 right-1/4 text-foreground/20 text-2xl font-light select-none hidden sm:block">+</div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-12">
        
        {/* Technical header bar */}
        <div className="flex items-center gap-4 mb-12 text-xs font-mono uppercase tracking-wider">
          <div className="bg-foreground text-background px-3 py-2">
            <div className="text-[10px] leading-tight">FIG.</div>
            <div className="text-base font-bold leading-tight">01</div>
          </div>
          <div className="text-foreground/70">
            <div>AUTONOMOUS VISIBILITY</div>
            <div>UNIT</div>
          </div>
          <div className="flex-grow"></div>
          <div className="text-foreground/50 hidden sm:block">&gt;&gt;&gt;</div>
          <div className="text-foreground/70 hidden sm:block">USA</div>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tight text-foreground uppercase mb-12">
          BE THE<br/>
          BRAND<br/>
          AI<br/>
          RECOMMENDS
        </h1>
        
        {/* Tagline with highlighted text */}
        <div className="mb-12 max-w-xl">
          <p className="font-mono text-base sm:text-lg leading-relaxed">
            <span className="text-foreground/70">The future is one direct answer.</span>
            <br/>
            <span className="bg-foreground text-background px-1 inline-block mt-1">We engineer visibility for LLMs,</span>
            <br/>
            <span className="bg-foreground text-background px-1 inline-block mt-1">Answer Engines, and AI Agents.</span>
          </p>
        </div>

        {/* CTA Button */}
        <a 
          href="https://cal.com/memetik/letstalk" 
          className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          LET'S TALK
          <span className="text-lg">→</span>
        </a>

      </div>
    </section>
  );
}
