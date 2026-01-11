import { motion } from "framer-motion";

export function Marquee() {
  return (
    <div className="w-full bg-foreground text-background overflow-hidden flex flex-col border-y-2 border-foreground relative">
      
      {/* Top Chevron Tape */}
      <div className="w-full bg-background text-foreground border-b-2 border-foreground py-1 overflow-hidden">
        <motion.div
            className="flex whitespace-nowrap font-mono text-sm font-bold tracking-tighter leading-none"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
            {[...Array(20)].map((_, i) => (
                <span key={i} className="mx-0 select-none">
                    &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
                </span>
            ))}
        </motion.div>
      </div>

      {/* Main Ticker */}
      <div className="py-4 relative flex items-center bg-foreground text-background">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-foreground to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-foreground to-transparent z-10"></div>
          
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 font-mono text-[10px] bg-background text-foreground px-2 py-1 font-bold border border-background hidden md:block">
            LIVE FEED
          </div>

          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 mx-4">
                <span className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase text-background">
                  LLM OPTIMIZATION
                </span>
                <span className="text-xl font-mono align-middle text-background/50">[ + ]</span>
                <span className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase text-background">
                  GENERATIVE SEARCH
                </span>
                <span className="text-xl font-mono align-middle text-background/50">[ + ]</span>
                <span className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase text-background">
                  AI VISIBILITY
                </span>
                <span className="text-xl font-mono align-middle text-background/50">[ + ]</span>
              </div>
            ))}
          </motion.div>
      </div>
      
       {/* Bottom Chevron Tape - Reversed */}
      <div className="w-full bg-background text-foreground border-t-2 border-foreground py-1 overflow-hidden">
        <motion.div
            className="flex whitespace-nowrap font-mono text-sm font-bold tracking-tighter leading-none"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
             {[...Array(20)].map((_, i) => (
                <span key={i} className="mx-0 select-none">
                    &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                </span>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
