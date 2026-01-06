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
            
            <section id="agency" className="py-24 md:py-32 px-6 md:px-12 bg-[#E3E7DE] text-foreground border-b-2 border-foreground relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
                    <div>
                        <div className="w-full overflow-hidden whitespace-nowrap mb-6 select-none opacity-40 font-mono text-[10px] tracking-tighter font-bold text-foreground">
                            &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
                        </div>
                        <div 
                          className="inline-block px-3 py-1 bg-foreground text-[#E3E7DE] font-mono text-xs font-bold mb-6 tracking-widest uppercase"
                        >
                          THE SHIFT
                        </div>
                        <h2 
                          className="text-5xl md:text-7xl font-display font-black leading-[0.85] mb-8 text-foreground uppercase tracking-tighter"
                        >
                            The search bar is dying. <br/>
                            <span className="text-foreground/50">The conversation is beginning.</span>
                        </h2>
                        <div className="h-4 w-24 bg-foreground mt-8"></div>
                    </div>
                    
                    <div 
                      className="font-serif text-2xl md:text-3xl text-foreground space-y-8 leading-tight border-l-2 border-foreground pl-8 md:pl-12"
                    >
                        <p>
                            <span className="font-bold highlight-text">40–70% of high-intent commercial research now begins or ends inside AI answer engines.</span>
                        </p>
                        <p className="text-foreground/80">
                            Google traffic is eroding. LLMs decide winners before a user ever clicks a link. If your brand isn't in the model's answer layer—you don't exist.
                        </p>
                        <p className="text-foreground font-bold font-sans uppercase tracking-tight text-lg">
                            We build Answer Engine Optimization (AEO) systems that force LLMs to cite you.
                        </p>
                    </div>
                </div>
            </section>

            <BrandManifesto />
            <Services />
            <MethodologySummary />
            
            <footer className="bg-foreground text-[#E3E7DE] py-24 md:py-32 px-6 md:px-12 border-t-2 border-foreground relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {/* Technical Decal */}
                    <div className="w-full overflow-hidden whitespace-nowrap mb-12 select-none opacity-20 font-mono text-[10px] tracking-tighter font-bold text-[#E3E7DE]">
                        &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
                        &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                        <div className="col-span-1 md:col-span-2 space-y-8">
                            <h2 className="text-4xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] text-[#E3E7DE] uppercase">
                              MEMETIK
                            </h2>
                            <p className="font-serif text-lg md:text-2xl text-[#E3E7DE]/80 max-w-md border-l-2 border-[#E3E7DE]/30 pl-6 py-2 leading-tight">
                              We engineer visibility across LLMs, search engines, and agents.
                            </p>
                        </div>
                        <div className="col-span-1 flex flex-col gap-6 font-mono text-sm text-[#E3E7DE]/60 pt-4">
                            <span className="text-[#E3E7DE] font-bold tracking-widest text-xs mb-2 border-b border-[#E3E7DE]/20 pb-2 inline-block w-max">LOCATIONS</span>
                            <span className="hover:text-[#E3E7DE] transition-colors cursor-pointer flex items-center gap-2 group">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E3E7DE]">[+]</span> SAN FRANCISCO
                            </span>
                            <span className="hover:text-[#E3E7DE] transition-colors cursor-pointer flex items-center gap-2 group">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E3E7DE]">[+]</span> NEW YORK
                            </span>
                            <span className="hover:text-[#E3E7DE] transition-colors cursor-pointer flex items-center gap-2 group">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E3E7DE]">[+]</span> TOKYO
                            </span>
                        </div>
                        <div className="col-span-1 flex flex-col gap-6 font-mono text-sm text-[#E3E7DE]/60 pt-4">
                            <span className="text-[#E3E7DE] font-bold tracking-widest text-xs mb-2 border-b border-[#E3E7DE]/20 pb-2 inline-block w-max">CONNECT</span>
                            <a href="#" className="hover:text-[#E3E7DE] hover:translate-x-1 transition-all">TWITTER / X</a>
                            <a href="#" className="hover:text-[#E3E7DE] hover:translate-x-1 transition-all">INSTAGRAM</a>
                            <a href="#" className="hover:text-[#E3E7DE] hover:translate-x-1 transition-all">LINKEDIN</a>
                        </div>
                    </div>
                    
                    <div className="mt-24 pt-8 border-t border-[#E3E7DE]/20 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] text-[#E3E7DE]/40 gap-4 uppercase tracking-widest">
                        <span>© 2026 MEMETIK // ALL RIGHTS RESERVED</span>
                        <span className="flex items-center gap-3 px-3 py-1 bg-[#E3E7DE]/5 border border-[#E3E7DE]/10">
                           <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75 rounded-full"></span>
                              <span className="relative inline-flex h-2 w-2 bg-green-500 rounded-full"></span>
                            </span>
                           SYSTEMS OPERATIONAL
                        </span>
                    </div>
                </div>
            </footer>
          </main>
      </div>
  );
}
