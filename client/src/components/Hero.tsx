import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/abstract_digital_noise_texture_for_hero_background.png";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white text-black pt-20">
      {/* Subtle Background Texture - Light Mode */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <img
          src={heroBg}
          alt="Digital Noise Texture"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="relative z-10 container px-6 md:px-12 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter text-black">
            OWN THE
            <br />
            <span className="text-neutral-400">
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
          <p className="text-lg md:text-xl font-mono text-neutral-500 leading-relaxed">
            / The future isn't 10 blue links. It's one direct answer.
            <br />
            We engineer visibility for LLMs, Generative Engines, and AI Agents.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
             <button className="px-8 py-3 bg-black text-white font-mono font-bold text-sm hover:bg-neutral-800 transition-colors shadow-lg shadow-black/10">
               AUDIT MY AI VISIBILITY
             </button>
             <button className="px-8 py-3 border border-black text-black font-mono font-bold text-sm hover:bg-neutral-50 transition-colors">
               GEO EXPLAINED
             </button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 text-xs font-mono text-neutral-400"
      >
        SCROLL TO EXPLORE
      </motion.div>
    </section>
  );
}
