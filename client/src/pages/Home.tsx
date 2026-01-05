import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MethodologySummary } from "@/components/MethodologySummary";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { BrandManifesto } from "@/components/BrandManifesto";
import { motion } from "framer-motion";
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
            
            <section id="agency" className="py-24 md:py-32 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center bg-background border-b border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/4" />
                
                <div className="relative z-10">
                    <div 
                      className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs font-bold mb-6 tracking-widest border border-primary/20 rounded-full"
                    >
                      THE SHIFT
                    </div>
                    <h2 
                      className="text-4xl md:text-6xl font-display font-bold leading-[0.9] mb-8 text-foreground uppercase tracking-tight"
                    >
                        The search bar is dying. <br/>
                        <span className="text-primary">The conversation is beginning.</span>
                    </h2>
                    <div 
                      className="w-24 h-1 bg-primary mt-8 origin-left"
                    ></div>
                </div>
                
                <div 
                  className="font-sans text-lg md:text-2xl text-muted-foreground space-y-8 leading-relaxed border-l-2 border-primary/20 pl-8 relative z-10"
                >
                    <p>
                        <span className="text-foreground font-bold highlight-text bg-gradient-to-r from-primary/20 to-transparent bg-no-repeat bg-[length:100%_0.4em] bg-bottom">40–70% of high-intent commercial research now begins or ends inside AI answer engines.</span>
                    </p>
                    <p>
                        Google traffic is eroding. LLMs decide winners before a user ever clicks a link. If your brand isn't in the model's answer layer—you don't exist.
                    </p>
                    <p className="text-foreground font-medium">
                        We build Answer Engine Optimization (AEO) systems that force LLMs to cite you.
                    </p>
                </div>
            </section>

            <BrandManifesto />
            <Services />
            <MethodologySummary />
            
            <footer className="bg-background text-foreground py-24 md:py-32 px-6 md:px-12 border-t-2 border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/5 pointer-events-none"></div>
                
                {/* Technical Decal */}
                <div className="absolute top-0 right-12 px-4 py-1 bg-primary text-primary-foreground font-mono text-[10px] uppercase font-bold tracking-widest border-b-2 border-l-2 border-r-2 border-primary">
                  Zone: Footer // ID: F-01
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.8] text-foreground uppercase">
                          MEMETIK
                        </h2>
                        <p className="font-mono text-sm md:text-base text-muted-foreground max-w-md border-l-2 border-primary pl-6 py-2">
                          Algorithmic Market Capture. <br/>
                          We make you the default answer in ChatGPT, Claude, & Perplexity.
                        </p>
                    </div>
                    <div className="col-span-1 flex flex-col gap-6 font-mono text-sm text-muted-foreground pt-4">
                        <span className="text-primary font-bold tracking-widest text-xs mb-2 border-b-2 border-primary/20 pb-2 inline-block w-max">LOCATIONS</span>
                        <span className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">»</span> SAN FRANCISCO
                        </span>
                        <span className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">»</span> NEW YORK
                        </span>
                        <span className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">»</span> TOKYO
                        </span>
                    </div>
                    <div className="col-span-1 flex flex-col gap-6 font-mono text-sm text-muted-foreground pt-4">
                        <span className="text-primary font-bold tracking-widest text-xs mb-2 border-b-2 border-primary/20 pb-2 inline-block w-max">CONNECT</span>
                        <a href="#" className="hover:text-primary hover:translate-x-1 transition-all">TWITTER</a>
                        <a href="#" className="hover:text-primary hover:translate-x-1 transition-all">INSTAGRAM</a>
                        <a href="#" className="hover:text-primary hover:translate-x-1 transition-all">LINKEDIN</a>
                    </div>
                </div>
                <div className="mt-32 pt-8 border-t-2 border-border flex flex-col md:flex-row justify-between items-center font-mono text-xs text-muted-foreground gap-4">
                    <span>© 2025 MEMETIK // ALL RIGHTS RESERVED</span>
                    <span className="flex items-center gap-3 px-4 py-2 bg-secondary/10 border-2 border-border">
                       <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-75 rounded-none"></span>
                          <span className="relative inline-flex h-2 w-2 bg-primary rounded-none"></span>
                        </span>
                       SYSTEMS OPERATIONAL
                    </span>
                </div>
            </footer>
          </main>
      </div>
  );
}
