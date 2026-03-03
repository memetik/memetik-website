export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background text-foreground">
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-12">
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.9] tracking-tight text-foreground mb-6">
          Be the Brand<br/>
          <em className="font-normal italic" style={{ fontFamily: "'Newsreader', serif" }}>AI Recommends</em>
        </h1>
        
        <p className="text-base text-foreground/60 max-w-2xl mb-10">
          We engineer your brand into ChatGPT, Perplexity, and Gemini responses — so you're the answer, not your competitors.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          <a 
            href="https://cal.com/memetik/letstalk" 
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
          >
            Get Your Free Audit
          </a>
          <a 
            href="#methodology" 
            className="inline-flex items-center gap-3 border border-foreground/20 text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:bg-foreground/5 transition-colors"
          >
            See How It Works
          </a>
        </div>

        <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest">
          B2B SaaS · E-commerce · Professional Services
        </p>

      </div>
    </section>
  );
}
