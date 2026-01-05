import { motion } from "framer-motion";
import { ArrowRight, Check, X, Store, Rocket, Zap } from "lucide-react";

export function BrandManifesto() {
  return (
    <section className="bg-background text-foreground overflow-hidden">
      {/* SECTION: WHY WE EXIST */}
      <div className="py-24 md:py-32 px-6 md:px-12 border-b border-border relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="200" cy="200" r="199.5" stroke="currentColor" />
             <path d="M200 0V400M0 200H400" stroke="currentColor" />
           </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className="mb-16 md:mb-24"
          >
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent font-mono text-xs font-bold mb-6 tracking-widest border border-accent/20 rounded-none">
              WHY WE EXIST
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-bold leading-[0.9] mb-8 tracking-tighter">
              THE INDUSTRY <br/><span className="text-muted-foreground">IS BROKEN.</span>
            </h2>
            <div className="font-sans text-xl md:text-3xl text-muted-foreground space-y-8 leading-relaxed border-l-2 border-primary pl-8 md:pl-12">
              <p>
                Founders are paying "SEO agencies" who deliver nothing of value.
                Search is changing faster than agencies can keep up.
                Most still sell the same packages they offered in 2015.
              </p>
              <p className="text-foreground font-medium">
                Memetik was built as the antidote.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mt-16 md:mt-24">
            <div 
               className="space-y-8"
            >
              <h3 className="font-mono text-sm tracking-[0.2em] text-muted-foreground uppercase mb-6 pb-2 border-b border-border/50">The Old Way</h3>
              <ul className="space-y-6">
                {[
                  "Optimizing for rankings",
                  "Recycled 2018 playbooks",
                  "Guessing what works",
                  "Agency theatre"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-muted-foreground/50 line-through decoration-destructive/30 text-lg">
                    <div className="p-1 rounded-none bg-destructive/10">
                      <X className="w-4 h-4 text-destructive/50" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div 
               className="space-y-8"
            >
              <h3 className="font-mono text-sm tracking-[0.2em] text-primary uppercase mb-6 pb-2 border-b border-primary/20">The Memetik Way</h3>
              <ul className="space-y-6">
                {[
                  "Optimizing for ANSWERS",
                  "First principles architectures",
                  "Strategies LLMs cannot ignore",
                  "Engineered dominance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-foreground font-medium text-lg">
                    <div className="p-1 rounded-none bg-primary/10">
                      <Check className="w-4 h-4 text-primary" />
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
      <div className="py-24 md:py-32 px-6 md:px-12 bg-secondary/5 text-foreground relative overflow-hidden">
        {/* Subtle grid pattern for texture - Dark version for light background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h2 className="text-4xl md:text-8xl font-display font-bold mb-4 tracking-tighter text-foreground">OUR VALUES</h2>
              <div className="h-1 w-24 bg-primary mt-4"></div>
            </div>
            <p className="font-mono text-sm md:text-base text-muted-foreground tracking-widest uppercase md:mb-4">The Operating System for Dominance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="p-8 md:p-10 border-2 border-border bg-background shadow-none hover:shadow-[8px_8px_0px_0px_var(--color-primary)] hover:border-primary transition-all duration-500 group hover:-translate-y-2 rounded-none"
              >
                <div className="text-5xl md:text-7xl font-display font-bold text-foreground/20 group-hover:text-primary/30 transition-colors mb-12">0{i+1}</div>
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors tracking-tight">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm font-sans">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: WHO WE SERVE */}
      <div className="py-24 md:py-32 px-6 md:px-12 border-b border-border bg-background relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 tracking-tighter">WHO WE SERVE</h2>
             <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">We partner with founders who refuse to be left behind by the AI shift.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24">
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
                className="relative p-8 md:p-10 bg-secondary/5 border-2 border-border/50 hover:border-primary transition-all duration-300 rounded-none group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="mb-8 p-4 bg-background rounded-none border border-border inline-flex items-center justify-center shadow-sm group-hover:shadow-none group-hover:scale-110 transition-all duration-300 text-primary">
                  {item.icon}
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6">{item.desc}</p>
                
                <div className="inline-block px-3 py-1 bg-primary/10 rounded-none text-xs font-mono font-bold text-primary/80 uppercase tracking-wider">
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>

          <div className="relative p-10 md:p-16 border-2 border-primary/20 bg-secondary/5 rounded-none max-w-4xl mx-auto text-center overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <p className="font-mono text-xs text-primary mb-6 uppercase tracking-[0.2em] font-bold">The Requirement</p>
              <p className="text-xl md:text-4xl font-display font-medium text-foreground leading-tight mb-8">
                We do not work with unqualified or low-budget companies. <br className="hidden md:block"/>
                Our work requires <span className="text-primary font-bold">ambition</span>.
              </p>
              
              <a href="https://cal.com/memetik/letstalk" className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono font-bold text-sm overflow-hidden rounded-none border-2 border-primary shadow-[4px_4px_0px_0px_var(--color-foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 inline-flex items-center gap-2 mt-4">
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