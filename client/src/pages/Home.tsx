import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MethodologySummary } from "@/components/MethodologySummary";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { BrandManifesto } from "@/components/BrandManifesto";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "MEMETIK | AEO & SEO Agency";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        
        {/* THE SHIFT SECTION */}
        <section id="agency" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b-2 border-foreground">
          <div className="max-w-7xl mx-auto">
            
            {/* Chevron bar */}
            <div className="font-mono text-xs tracking-tighter text-foreground/60 mb-8 overflow-hidden">
              &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left - Main Content */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-[0.9] mb-2 tracking-tight uppercase text-foreground">
                  The search bar is dying.
                </h2>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground/60 mb-6">
                  The conversation is beginning.
                </p>
                
                {/* Certification line */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-foreground mb-2">
                  <span>CRITICAL INTELLIGENCE</span>
                  <span className="border border-foreground px-2 py-0.5">[ VERIFIED ]</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/60 mb-8">
                  <span>MARKET ANALYSIS</span>
                  <span>/</span>
                  <span>UNITED STATES OF AMERICA</span>
                </div>
                
                {/* Stats Box */}
                <div className="border-2 border-foreground p-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-display font-black">40-70%</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">OF HIGH-INTENT</span>
                  </div>
                  <p className="font-mono text-sm text-foreground/70">
                    commercial research now begins or ends inside AI answer engines.
                  </p>
                </div>
                
                {/* Tag bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="border-2 border-foreground px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                    THE SHIFT
                  </div>
                  <div className="border-2 border-foreground px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                    AI ERA
                  </div>
                </div>
              </div>
              
              {/* Right - Info Cards */}
              <div className="space-y-4">
                <div className="border-2 border-foreground p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-3">INTELLIGENCE BRIEF</div>
                  <p className="font-mono text-sm leading-relaxed text-foreground/80">
                    Google traffic is eroding. LLMs decide winners before a user ever clicks a link. If your brand isn't in the model's answer layer—you don't exist.
                  </p>
                </div>
                
                <div className="border-2 border-foreground p-6 bg-foreground text-background">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-background/50 mb-3">OUR MISSION</div>
                  <p className="font-mono text-sm font-bold leading-relaxed">
                    We build Answer Engine Optimization (AEO) systems that force LLMs to cite you.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="border border-background/40 px-2 py-1 text-[10px] font-mono uppercase">CERTIFIED</div>
                    <div className="border border-background/40 px-2 py-1 text-[10px] font-mono uppercase">TESTED</div>
                    <div className="border border-background/40 px-2 py-1 text-[10px] font-mono uppercase">DEPLOYED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BrandManifesto />
        <Services />
        <MethodologySummary />
        
        {/* FOOTER */}
        <footer className="bg-foreground text-background py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            
            {/* Chevron bar */}
            <div className="font-mono text-xs tracking-tighter text-background/30 mb-8 overflow-hidden">
              &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
            </div>
            
            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase mb-2">
              MEMETIK
            </h2>
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-background/60 mb-6">
              We engineer visibility across LLMs, search engines, and agents.
            </p>
            
            {/* Certification + Location */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-background/80 mb-2">
              <span>SYSTEMS OPERATIONAL</span>
              <span className="border border-background/40 px-2 py-0.5">[ ACTIVE ]</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-background/50 mb-8">
              <span>NEW YORK</span>
              <span>/</span>
              <span>SAN FRANCISCO</span>
              <span>/</span>
              <span>GLOBAL</span>
            </div>
            
            {/* Tag bar */}
            <div className="flex flex-wrap items-center gap-2 mb-16">
              <div className="border-2 border-background/60 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                LLM SEO
              </div>
              <div className="border-2 border-background/60 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                AEO
              </div>
              <div className="border-2 border-background/60 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                AI AGENTS
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-background/20 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-background/40">
                  © 2026 MEMETIK // ALL RIGHTS RESERVED
                </div>
                <a 
                  href="https://cal.com/memetik/letstalk" 
                  className="inline-flex items-center gap-3 bg-background text-foreground px-6 py-3 font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  LET'S TALK
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
