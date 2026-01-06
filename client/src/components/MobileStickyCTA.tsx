import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-foreground text-background p-4 border-t-2 border-background/20 shadow-lg">
      <a
        href="https://cal.com/memetik/letstalk"
        className="flex items-center justify-center gap-3 w-full bg-background text-foreground py-3 px-6 font-mono font-bold text-sm uppercase tracking-wider"
      >
        GET YOUR FREE AI AUDIT
        <ArrowRight className="w-4 h-4" />
      </a>
      <p className="font-mono text-[10px] text-background/50 text-center mt-2 uppercase">
        30-min call • See where you rank vs competitors
      </p>
    </div>
  );
}
