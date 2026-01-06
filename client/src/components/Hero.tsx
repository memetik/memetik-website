export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background text-foreground">
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-12">
        
        {/* Chevron Bar */}
        <div className="font-mono text-xs sm:text-sm md:text-base tracking-tighter text-foreground mb-8 overflow-hidden">
          &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
        </div>

        {/* Main headline - FUEL style heavy black */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-display font-black leading-[0.85] tracking-tight text-foreground uppercase mb-4">
          MEMETIK
        </h1>
        
        {/* Serif italic subtitle */}
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-foreground mb-8">
          For Answer Engine Optimization
        </p>

        {/* Certification line */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-foreground mb-3">
          <span>CERTIFIED FOR AI VISIBILITY</span>
          <span className="hidden sm:inline text-foreground/40">|</span>
          <span className="border border-foreground px-2 py-0.5">[ TESTED ]</span>
        </div>

        {/* System / Location label */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-foreground mb-10">
          <span>VISIBILITY SYSTEMS</span>
          <span className="text-foreground/40">/</span>
          <span>UNITED STATES OF AMERICA</span>
        </div>

        {/* Bottom tag bar - FUEL style */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-foreground text-background">
            <span className="text-lg">✕</span>
          </div>
          <div className="bg-foreground text-background px-4 py-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
            LLM OPTIMIZATION
          </div>
          <div className="border-2 border-foreground px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
            MISSION-GRADE
          </div>
          <div className="border-2 border-foreground px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
            AEO & SEO
          </div>
        </div>

        {/* CTA below tags */}
        <div className="mt-12">
          <a 
            href="https://cal.com/memetik/letstalk" 
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            LET'S TALK
            <span className="text-lg">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
