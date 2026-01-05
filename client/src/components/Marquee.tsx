import { motion } from "framer-motion";

export function Marquee() {
  return (
    <div className="w-full py-4 bg-primary text-primary-foreground overflow-hidden flex items-center border-y-2 border-primary relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-primary to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-primary to-transparent z-10"></div>
      
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 font-mono text-[10px] bg-background text-primary px-1 font-bold border border-primary hidden md:block">
        LIVE FEED
      </div>

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase">
              LLM OPTIMIZATION
            </span>
            <span className="text-xl font-mono align-middle opacity-50">[ + ]</span>
            <span className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase">
              GENERATIVE SEARCH
            </span>
            <span className="text-xl font-mono align-middle opacity-50">[ + ]</span>
            <span className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase">
              AI VISIBILITY
            </span>
            <span className="text-xl font-mono align-middle opacity-50">[ + ]</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
