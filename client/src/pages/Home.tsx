import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MethodologySummary } from "@/components/MethodologySummary";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { BrandManifesto } from "@/components/BrandManifesto";
import { Testimonials } from "@/components/Testimonials";
import { CaseStudies } from "@/components/CaseStudies";
import { FAQ } from "@/components/FAQ";
import { Guarantee } from "@/components/Guarantee";
import { EmailCapture } from "@/components/EmailCapture";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "MEMETIK | AEO & SEO Agency";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <MobileStickyCTA />
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
                  <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-3">THE PROBLEM</div>
                  <p className="font-mono text-sm leading-relaxed text-foreground/80">
                    Google traffic is eroding. LLMs decide winners before a user ever clicks a link. If your brand isn't in the model's answer layer—you don't exist.
                  </p>
                </div>
                
                <div className="border-2 border-foreground p-6 bg-foreground text-background">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-background/50 mb-3">THE SOLUTION</div>
                  <p className="font-mono text-sm font-bold leading-relaxed mb-4">
                    We build Answer Engine Optimization (AEO) systems that force LLMs to cite you.
                  </p>
                  <a 
                    href="https://cal.com/memetik/letstalk" 
                    className="inline-flex items-center gap-2 text-background font-mono text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                  >
                    See how it works →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BrandManifesto />
        <Testimonials />
        <CaseStudies />
        <Services />
        <MethodologySummary />
        <FAQ />
        <Guarantee />
        <EmailCapture />
        
        {/* FOOTER */}
        <footer className="bg-foreground text-background py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            
            {/* Final CTA Section */}
            <div className="text-center mb-16 pb-16 border-b border-background/20">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight uppercase mb-4 text-background">
                Stop losing deals to AI.
              </h2>
              <p className="font-mono text-sm sm:text-base text-background/60 mb-8 max-w-xl mx-auto">
                Every day you wait, competitors are training LLMs to recommend them instead of you.
              </p>
              <a 
                href="https://cal.com/memetik/letstalk" 
                className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                GET YOUR FREE AI VISIBILITY AUDIT
                <span>→</span>
              </a>
              <p className="font-mono text-xs text-background/40 mt-4 uppercase">
                See exactly where you rank vs competitors • 30-min call
              </p>
            </div>
            
            {/* Footer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase mb-2 text-background">
                  MEMETIK
                </h3>
                <p className="font-mono text-sm text-background/60 mb-4">
                  Answer Engine Optimization for ambitious brands.
                </p>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-background/50">
                  <span>NEW YORK</span>
                  <span>/</span>
                  <span>SAN FRANCISCO</span>
                  <span>/</span>
                  <span>GLOBAL</span>
                </div>
              </div>
              
              <div className="md:text-right">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="font-mono text-xs uppercase tracking-wider text-background/70">
                    Currently accepting new clients
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-background/40">
                  © 2026 MEMETIK // ALL RIGHTS RESERVED
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
