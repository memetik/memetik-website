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
        <div>
           {/* Badge removed as requested */}
           
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] tracking-tighter text-foreground drop-shadow-sm select-none">
            Be the Brand
            <br />
            <span className="text-primary">
              AI recommends
            </span>
          </h1>
        </div>

        <div
          className="max-w-2xl flex flex-col gap-8"
        >
          <p className="text-xl md:text-3xl font-sans text-muted-foreground leading-tight border-l-2 border-primary pl-6 py-2 tracking-tight">
            The future is one direct answer.
            <br />
            <span className="text-foreground">We engineer visibility for LLMs, Answer Engines, and AI Agents.</span>
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
             <a href="https://cal.com/memetik/letstalk" className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono font-bold text-sm overflow-hidden rounded-none border-2 border-primary shadow-[4px_4px_0px_0px_var(--color-foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 inline-block">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
               <div className="relative flex items-center gap-2">
                 LET'S TALK
                 <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
               </div>
             </a>
          </div>
        </div>
      </div>
      
    </section>
  );
}


