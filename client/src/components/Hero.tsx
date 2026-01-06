import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@assets/generated_images/abstract_ai_search_visualization_with_data_nodes_and_connections_in_light_theme_colors.png";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background Image with Overlay - Parallax Effect */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
        <img
          src={heroBg}
          alt="AI Search Network Visualization"
          className="w-full h-full object-cover grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
      </motion.div>
      
      {/* Subtle data grid instead of construction lines */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03]"></div>

      <div className="relative z-10 container px-6 md:px-12 flex flex-col gap-10 pt-32">
        {/* Decorative 'Stamp' Container */}
        <div className="absolute top-24 right-6 md:right-12 border-2 border-primary p-4 hidden lg:block opacity-60 rotate-2">
            <div className="border border-primary p-2">
                <div className="font-display font-bold text-4xl text-primary leading-none text-center">LAB</div>
                <div className="font-mono text-[10px] text-center mt-1 tracking-widest">ADVANCED TECH OPS</div>
            </div>
        </div>

        <div className="max-w-4xl relative">
          {/* Chevron Divider */}
          <div className="w-full overflow-hidden text-primary/40 font-mono text-xs tracking-widest whitespace-nowrap mb-6 select-none opacity-50">
            &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
          </div>

          {/* Technical Header Block */}
          <div className="flex items-center gap-4 mb-6 text-xs font-mono tracking-widest text-muted-foreground border-b border-primary/20 pb-4 w-fit">
            <span className="bg-primary text-background px-2 py-0.5 font-bold">FIG. 01</span>
            <span>AUTONOMOUS VISIBILITY UNIT</span>
            <span>&gt;&gt;&gt; USA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.85] tracking-tighter text-foreground drop-shadow-sm select-none uppercase">
            Be the Brand <br/>
            <span className="text-primary relative inline-block">
              AI recommends
              {/* Decorative crosshairs */}
              <span className="absolute -top-4 -right-4 text-primary text-2xl font-light opacity-50">+</span>
              <span className="absolute -bottom-4 -left-4 text-primary text-2xl font-light opacity-50">+</span>
            </span>
          </h1>
        </div>

        <div className="max-w-2xl flex flex-col gap-8 relative">
           {/* Side Line Decoration */}
           <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-primary/20 hidden md:block">
              <div className="absolute top-0 left-[-4px] w-[10px] h-[2px] bg-primary"></div>
              <div className="absolute bottom-0 left-[-4px] w-[10px] h-[2px] bg-primary"></div>
           </div>

          <p className="text-xl md:text-3xl font-serif text-muted-foreground leading-tight pl-0 md:pl-6 py-2 tracking-tight">
            The future is one direct answer.
            <br />
            <span className="text-foreground bg-primary/5 px-1 italic">We engineer visibility for LLMs, Answer Engines, and AI Agents.</span>
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4 md:pl-6">
             <a href="https://cal.com/memetik/letstalk" className="group relative px-10 py-5 bg-primary text-primary-foreground font-mono font-bold text-sm overflow-hidden rounded-none border-2 border-primary shadow-[6px_6px_0px_0px_var(--color-foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 inline-block uppercase tracking-widest">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
               <div className="relative flex items-center gap-4">
                 <span>LET'S TALK</span>
                 <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
               </div>
             </a>
             
             {/* Secondary 'ghost' technical button -> Solid Block Style */}
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-[10px] font-mono tracking-widest font-bold">
                <span className="animate-pulse">●</span> MISSION-GRADE
             </div>
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-[10px] font-mono tracking-widest font-bold">
                SYSTEM READY
             </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}


