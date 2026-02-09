import { motion } from "framer-motion";

export function Marquee() {
  return (
    <div className="w-full bg-foreground text-background overflow-hidden relative">

      {/* Main Ticker */}
      <div className="py-5 relative flex items-center bg-foreground text-background">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-foreground to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-foreground to-transparent z-10"></div>

          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 mx-4">
                <span className="text-4xl md:text-5xl font-display font-bold tracking-tight text-background">
                  LLM OPTIMIZATION
                </span>
                <span className="text-lg font-mono align-middle text-background/30">·</span>
                <span className="text-4xl md:text-5xl font-display font-bold tracking-tight text-background">
                  GENERATIVE SEARCH
                </span>
                <span className="text-lg font-mono align-middle text-background/30">·</span>
                <span className="text-4xl md:text-5xl font-display font-bold tracking-tight text-background">
                  AI VISIBILITY
                </span>
                <span className="text-lg font-mono align-middle text-background/30">·</span>
              </div>
            ))}
          </motion.div>
      </div>
    </div>
  );
}
