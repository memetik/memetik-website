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

      <div className="relative z-10 container px-6 md:px-12 flex flex-col gap-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
           {/* Badge removed as requested */}
           
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold leading-[0.8] tracking-tighter text-foreground drop-shadow-sm select-none">
            OWN THE
            <br />
            <span className="text-primary relative inline-block">
              AI ANSWER.
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl flex flex-col gap-8"
        >
          <p className="text-xl md:text-3xl font-sans text-muted-foreground leading-tight border-l-2 border-primary pl-6 py-2 tracking-tight">
            The future isn't 10 blue links. It's one direct answer.
            <br />
            <span className="text-foreground">We engineer visibility for LLMs, Answer Engines, and AI Agents.</span>
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
             <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono font-bold text-sm overflow-hidden rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
               <div className="relative flex items-center gap-2">
                 AUDIT MY AI VISIBILITY
                 <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
               </div>
             </button>
             <button className="group relative px-8 py-4 border border-border text-foreground font-mono font-bold text-sm overflow-hidden rounded-full hover:border-primary/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/5">
               <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
               <span className="relative">AEO EXPLAINED</span>
             </button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-6 md:left-12 text-xs font-mono text-muted-foreground flex items-center gap-3"
      >
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent"></div>
        <span className="writing-vertical-lr">SCROLL TO EXPLORE</span>
      </motion.div>
    </section>
  );
}


