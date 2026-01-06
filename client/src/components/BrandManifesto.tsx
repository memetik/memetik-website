import { Check, X, Store, Rocket, Zap, ArrowRight } from "lucide-react";

export function BrandManifesto() {
  return (
    <section className="bg-background text-foreground overflow-hidden">
      {/* SECTION: WHY WE EXIST */}
      <div className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground relative">
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="bg-foreground text-background px-3 py-1 font-mono text-[10px] font-bold uppercase">
              SECTION 03
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">INDUSTRY ANALYSIS</span>
            <div className="flex-grow"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">&gt;&gt;&gt;</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left - Main Statement */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black leading-[0.85] mb-8 tracking-tight uppercase text-foreground">
                THE INDUSTRY<br/>
                <span className="text-foreground/40">IS BROKEN.</span>
              </h2>
              
              <div className="space-y-4 font-mono text-sm leading-relaxed text-foreground/70">
                <p>Founders are paying "SEO agencies" who deliver nothing of value. Search is changing faster than agencies can keep up.</p>
              </div>
              
              <div className="mt-8 border-2 border-foreground bg-foreground text-background p-4 inline-block">
                <span className="font-mono font-bold text-sm uppercase tracking-wider">
                  MEMETIK WAS BUILT AS THE ANTIDOTE.
                </span>
              </div>
            </div>
            
            {/* Right - Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Old Way */}
              <div className="border-2 border-foreground/30 p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-4 pb-2 border-b border-foreground/20">
                  THE OLD WAY
                </div>
                <ul className="space-y-3">
                  {["Optimizing for rankings", "Recycled playbooks", "Guessing what works", "Agency theatre"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/40 line-through text-sm font-mono">
                      <X className="w-3 h-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Memetik Way */}
              <div className="border-2 border-foreground p-6 bg-foreground text-background">
                <div className="font-mono text-[10px] uppercase tracking-widest text-background/60 mb-4 pb-2 border-b border-background/20">
                  THE MEMETIK WAY
                </div>
                <ul className="space-y-3">
                  {["Optimizing for ANSWERS", "First principles", "LLM strategies", "Engineered dominance"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-background text-sm font-mono font-bold">
                      <Check className="w-3 h-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: BRAND VALUES */}
      <div className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="grid grid-cols-2 gap-[2px]">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-foreground"></div>
                  ))}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">CORE PRINCIPLES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight uppercase">
                Our Values
              </h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              THE OPERATING SYSTEM FOR DOMINANCE
            </div>
          </div>
          
          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-foreground">
            {[
              { title: "FIRST PRINCIPLES", desc: "We rebuild strategy from scratch. No assumptions. No legacy baggage." },
              { title: "BOLD INNOVATION", desc: "Experimentation beats perfection. We embrace failure to find what works." },
              { title: "SPEED WINS", desc: "Execution velocity compounds. We move faster than the market." },
              { title: "LONG-TERM GAMES", desc: "We partner for outcomes, not tasks. We play for the decade." }
            ].map((value, i) => (
              <div key={i} className="p-6 md:p-8 border-b sm:border-r border-foreground last:border-r-0 sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r [&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+4)]:border-b-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl md:text-4xl font-display font-black text-foreground/20">0{i+1}</div>
                  <div className="font-mono text-[8px] uppercase tracking-widest text-foreground/30">MTK-VAL-0{i+1}</div>
                </div>
                <h3 className="text-sm font-mono font-bold mb-3 uppercase tracking-wider">{value.title}</h3>
                <p className="text-xs font-mono text-foreground/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: WHO WE SERVE */}
      <div className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground bg-background">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">TARGET OPERATORS</span>
              <div className="bg-foreground text-background px-2 py-0.5 font-mono text-[10px] font-bold">SECTION 05</div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight uppercase mb-4">
              Who We Serve
            </h2>
            <p className="font-mono text-sm text-foreground/60 max-w-xl mx-auto">
              We partner with founders who refuse to be left behind.
            </p>
          </div>
          
          {/* Serve Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-foreground mb-12">
            {[
              { icon: <Store className="w-6 h-6" />, title: "E-Commerce", desc: "Founders scaling to 7–9 figures who need to dominate comparison queries.", tag: "7-9 FIGURES" },
              { icon: <Rocket className="w-6 h-6" />, title: "SaaS Leaders", desc: "Founders building category dominance through answer-based visibility.", tag: "CATEGORY LEADER" },
              { icon: <Zap className="w-6 h-6" />, title: "Operators", desc: "Visionaries who invest in speed and understand the platform shift.", tag: "HIGH-IQ" }
            ].map((item, i) => (
              <div key={i} className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-foreground last:border-r-0 last:border-b-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="font-mono text-[8px] uppercase tracking-widest text-foreground/30">0{i+1}</div>
                </div>
                <h3 className="text-xl font-display font-black uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="font-mono text-xs text-foreground/60 leading-relaxed mb-4">{item.desc}</p>
                <div className="bg-foreground text-background px-3 py-1.5 font-mono text-[10px] font-bold uppercase inline-block">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-block border-2 border-foreground p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60 mb-4">THE REQUIREMENT</p>
              <p className="text-2xl md:text-4xl font-display font-black uppercase tracking-tight mb-6">
                Our work requires <span className="bg-foreground text-background px-2">ambition</span>.
              </p>
              <a 
                href="https://cal.com/memetik/letstalk" 
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                LET'S TALK
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
