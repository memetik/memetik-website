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
            
            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="grid grid-cols-2 gap-[2px]">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-foreground"></div>
                ))}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">MARKET ANALYSIS</span>
              <div className="bg-foreground text-background px-2 py-0.5 font-mono text-[10px] font-bold">THE SHIFT</div>
              <div className="flex-grow"></div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 hidden sm:inline">CRITICAL INTELLIGENCE</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left - Main Content */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-[0.9] mb-8 tracking-tight uppercase text-foreground">
                  The search bar is dying.<br/>
                  <span className="text-foreground/40">The conversation is beginning.</span>
                </h2>
                
                <div className="h-1 w-20 bg-foreground mb-8"></div>
                
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
            
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Logo & Tagline */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid grid-cols-3 gap-[2px]">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-background"></div>
                    ))}
                  </div>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight">MEMETIK</span>
                </div>
                <p className="font-mono text-sm text-background/60 max-w-md mb-6">
                  We engineer visibility across LLMs, search engines, and agents.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="border border-background/30 px-3 py-1.5 font-mono text-[10px] uppercase">NEW YORK</div>
                  <div className="border border-background/30 px-3 py-1.5 font-mono text-[10px] uppercase">SAN FRANCISCO</div>
                  <div className="border border-background/30 px-3 py-1.5 font-mono text-[10px] uppercase">GLOBAL</div>
                </div>
              </div>
              
              {/* Links */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-background/40 mb-4 pb-2 border-b border-background/20">
                  NAVIGATION
                </div>
                <ul className="space-y-2 font-mono text-sm">
                  <li><a href="#agency" className="text-background/60 hover:text-background transition-colors">About</a></li>
                  <li><a href="#" className="text-background/60 hover:text-background transition-colors">Services</a></li>
                  <li><a href="#" className="text-background/60 hover:text-background transition-colors">Methodology</a></li>
                  <li><a href="https://cal.com/memetik/letstalk" className="text-background/60 hover:text-background transition-colors">Contact</a></li>
                </ul>
              </div>
              
              {/* Connect */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-background/40 mb-4 pb-2 border-b border-background/20">
                  CONNECT
                </div>
                <ul className="space-y-2 font-mono text-sm">
                  <li><a href="#" className="text-background/60 hover:text-background transition-colors">Twitter / X</a></li>
                  <li><a href="#" className="text-background/60 hover:text-background transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="text-background/60 hover:text-background transition-colors">Instagram</a></li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-background/20 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-background/40">
                  © 2026 MEMETIK // ALL RIGHTS RESERVED
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 border border-background/20 px-3 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75 rounded-full"></span>
                      <span className="relative inline-flex h-2 w-2 bg-green-500 rounded-full"></span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-background/60">SYSTEMS OPERATIONAL</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Text */}
            <div className="absolute bottom-0 right-0 text-[15vw] font-display font-black text-background/[0.03] leading-none select-none pointer-events-none overflow-hidden">
              LAB
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
