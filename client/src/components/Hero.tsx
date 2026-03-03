export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.95] tracking-tight text-foreground mb-8">
          Be the Brand{" "}
          <em className="font-serif font-normal italic">AI Recommends</em>
        </h1>
        
        <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto mb-12">
          We engineer your brand into ChatGPT, Perplexity, and Gemini responses — so you're the answer, not your competitors.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://cal.com/memetik/letstalk" 
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity"
          >
            Get Your Free Audit
          </a>
          <a 
            href="#methodology" 
            className="inline-flex items-center gap-3 border border-foreground/20 text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded-full hover:bg-foreground/5 transition-colors"
          >
            See How It Works
          </a>
        </div>

      </div>
    </section>
  );
}
