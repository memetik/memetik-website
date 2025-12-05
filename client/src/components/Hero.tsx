import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/abstract_digital_noise_texture_for_hero_background.png";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
        <img
          src={heroBg}
          alt="Digital Noise Texture"
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>
      
      {/* Grid lines for construction vibe */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative z-10 container px-6 md:px-12 flex flex-col gap-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
           <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1 mb-6 text-accent font-mono text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 bg-accent animate-pulse rounded-sm"></span>
              Construction Phase: Active
           </div>
           
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter text-white">
            OWN THE
            <br />
            <span className="text-primary">
              AI ANSWER.
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl flex flex-col gap-6"
        >
          <p className="text-lg md:text-xl font-mono text-muted-foreground leading-relaxed border-l-2 border-primary pl-6">
            The future isn't 10 blue links. It's one direct answer.
            <br />
            We engineer visibility for LLMs, Answer Engines, and AI Agents.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
             <button className="px-8 py-3 bg-primary text-primary-foreground font-mono font-bold text-sm hover:bg-primary/90 transition-all flex items-center gap-2">
               AUDIT MY AI VISIBILITY
               <span className="text-lg">→</span>
             </button>
             <button className="px-8 py-3 border border-border text-foreground font-mono font-bold text-sm hover:bg-secondary transition-colors hover:border-primary/50">
               AEO EXPLAINED
             </button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 text-xs font-mono text-muted-foreground flex items-center gap-3"
      >
        <div className="w-px h-12 bg-border"></div>
        SCROLL TO EXPLORE
      </motion.div>
    </section>
  );
}
