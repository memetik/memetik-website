import { motion } from "framer-motion";
import { ArrowRight, Check, X, Store, Rocket, Zap } from "lucide-react";

export function BrandManifesto() {
  return (
    <section className="bg-background text-foreground overflow-hidden">
      {/* SECTION: WHY WE EXIST */}
      <div className="py-24 md:py-32 px-6 md:px-12 border-b-2 border-foreground relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-16 md:mb-24">
             {/* Chevron Divider */}
             <div className="w-full overflow-hidden whitespace-nowrap mb-6 select-none opacity-40 font-mono text-[10px] tracking-tighter font-bold text-foreground">
                &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
             </div>
             
            <h2 className="text-5xl md:text-8xl font-display font-black leading-[0.8] mb-8 tracking-tighter uppercase text-foreground">
              THE INDUSTRY <br/><span className="text-muted-foreground">IS BROKEN.</span>
            </h2>
            <div className="font-serif text-2xl md:text-4xl text-foreground space-y-8 leading-tight">
              <p>
                Founders are paying "SEO agencies" who deliver nothing of value.
                Search is changing faster than agencies can keep up.
              </p>
              <p className="bg-foreground text-[#E3E7DE] p-2 inline-block font-sans font-bold tracking-tight transform -rotate-1">
                Memetik was built as the antidote.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mt-16 md:mt-24">
            <div className="space-y-8">
              <h3 className="font-mono text-sm tracking-[0.2em] text-muted-foreground uppercase mb-6 pb-2 border-b border-foreground/20">The Old Way</h3>
              <ul className="space-y-6">
                {[
                  "Optimizing for rankings",
                  "Recycled 2018 playbooks",
                  "Guessing what works",
                  "Agency theatre"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-muted-foreground/50 line-through decoration-foreground/30 text-lg font-serif italic">
                    <div className="p-1 rounded-none border border-foreground/20">
                      <X className="w-4 h-4 text-foreground/50" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h3 className="font-mono text-sm tracking-[0.2em] text-foreground uppercase mb-6 pb-2 border-b-2 border-foreground">The Memetik Way</h3>
              <ul className="space-y-6">
                {[
                  "Optimizing for ANSWERS",
                  "First principles architectures",
                  "Strategies LLMs cannot ignore",
                  "Engineered dominance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-foreground font-bold text-lg font-sans uppercase tracking-tight">
                    <div className="p-1 rounded-none bg-foreground text-[#E3E7DE]">
                      <Check className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: BRAND VALUES */}
      <div className="py-24 md:py-32 px-6 md:px-12 bg-foreground text-[#E3E7DE] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
               <div className="w-full overflow-hidden whitespace-nowrap mb-6 select-none opacity-40 font-mono text-[10px] tracking-tighter font-bold text-[#E3E7DE]">
                &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
             </div>
              <h2 className="text-4xl md:text-8xl font-display font-black mb-4 tracking-tighter text-[#E3E7DE] uppercase">OUR VALUES</h2>
            </div>
            <p className="font-mono text-sm md:text-base text-[#E3E7DE]/60 tracking-widest uppercase md:mb-4">The Operating System for Dominance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#E3E7DE]/20">
            {[
              {
                title: "FIRST PRINCIPLES",
                desc: "We rebuild strategy from scratch. No assumptions. No legacy baggage."
              },
              {
                title: "BOLD INNOVATION",
                desc: "Experimentation beats perfection. We embrace failure to find what truly works."
              },
              {
                title: "SPEED WINS",
                desc: "Execution velocity compounds. We move faster than the market."
              },
              {
                title: "LONG-TERM GAMES",
                desc: "We partner for outcomes, not tasks. We play for the decade, not the quarter."
              }
            ].map((value, i) => (
              <div 
                key={i} 
                className="p-8 md:p-10 border-r border-b border-[#E3E7DE]/20 hover:bg-[#E3E7DE] hover:text-foreground transition-all duration-300 group"
              >
                <div className="text-5xl md:text-7xl font-display font-bold text-[#E3E7DE]/20 group-hover:text-foreground/20 transition-colors mb-12">0{i+1}</div>
                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase">{value.title}</h3>
                <p className="leading-relaxed text-sm font-mono opacity-80">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: WHO WE SERVE */}
      <div className="py-24 md:py-32 px-6 md:px-12 border-b-2 border-foreground bg-background relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-7xl font-display font-black mb-8 tracking-tighter uppercase">WHO WE SERVE</h2>
             <p className="font-serif text-2xl md:text-3xl text-foreground max-w-2xl mx-auto">We partner with founders who refuse to be left behind.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-foreground">
            {[
              {
                icon: <Store className="w-8 h-8" />,
                title: "E-Commerce",
                desc: "Founders scaling to 7–9 figures who need to dominate comparison queries.",
                highlight: "Scaling to 7-9 Figures"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "SaaS Leaders",
                desc: "Founders building category dominance through answer-based visibility.",
                highlight: "Category Dominance"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "High-IQ Operators",
                desc: "Visionaries who invest in speed and understand the platform shift.",
                highlight: "Invest in Speed"
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-foreground hover:bg-secondary/10 transition-all duration-300 group last:border-r-0"
              >
                <div className="mb-8 text-foreground group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                
                <h3 className="text-3xl font-display font-bold mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="font-serif text-lg text-muted-foreground leading-tight mb-8">{item.desc}</p>
                
                <div className="inline-block px-3 py-1 bg-foreground text-[#E3E7DE] rounded-none text-xs font-mono font-bold uppercase tracking-wider">
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-24 max-w-4xl mx-auto text-center">
            <div className="relative z-10 flex flex-col items-center">
              <p className="font-mono text-xs text-foreground mb-6 uppercase tracking-[0.2em] font-bold">The Requirement</p>
              <p className="text-2xl md:text-5xl font-display font-black text-foreground leading-none mb-8 uppercase tracking-tighter">
                Our work requires <span className="bg-foreground text-[#E3E7DE] px-2">ambition</span>.
              </p>
              
              <a href="https://cal.com/memetik/letstalk" className="group relative px-8 py-4 bg-foreground text-[#E3E7DE] font-mono font-bold text-sm overflow-hidden rounded-none border-2 border-foreground hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 inline-flex items-center gap-2 mt-4">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <div className="relative flex items-center gap-2">
                  LET'S TALK
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}