import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#work", label: "WORK" },
    { href: "#agency", label: "GROWTH PARTNER" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2 border-primary bg-background`}>
      {/* Top "System" Bar */}
      <div className="w-full border-b border-primary/20 bg-primary/5 py-1 px-4 hidden md:flex justify-between items-center text-[10px] font-mono tracking-widest text-primary/60 uppercase">
        <div className="flex gap-4">
          <span>SYS.VER.2026.1</span>
          <span>LAT: 37.7749° N</span>
        </div>
        <div className="flex gap-4">
           <span>// MEMETIK.AI</span>
           <span>STATUS: ONLINE</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center h-20">
        <Link href="/">
          <a className="flex items-center gap-4 group relative z-50">
             {/* Logo Mark - M Shape */}
             <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center group-hover:bg-foreground/90 transition-colors">
               <svg viewBox="0 0 100 100" fill="currentColor" className="w-6 h-6">
                 <path d="M0 0 H100 V100 H70 V35 H65 V100 H35 V35 H30 V100 H0 V0 Z M35 0 V25 L50 45 L65 25 V0" fillRule="evenodd" />
               </svg>
             </div>
             <div className="flex flex-col">
               <span className="font-display font-bold text-2xl tracking-tighter text-foreground leading-none">MEMETIK</span>
               <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground leading-none mt-1">LOCKED IN</span>
             </div>
          </a>
        </Link>

        {/* Desktop Menu - Technical Style */}
        <div className="hidden md:flex items-center h-full">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="h-full flex items-center px-8 text-xs font-mono tracking-widest hover:bg-primary hover:text-background transition-colors border-l border-primary/10 relative group"
            >
              {link.label}
              {/* Corner mark on hover */}
              <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-background opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
          ))}
          <a
            href="https://cal.com/memetik/letstalk"
            className="h-full flex items-center px-6 text-xs font-mono font-bold tracking-widest bg-foreground text-background hover:opacity-90 transition-opacity border-l border-primary/10"
          >
            FREE AUDIT →
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden relative z-50">
          <a
            href="https://cal.com/memetik/letstalk"
            className="px-3 py-2 text-[10px] font-mono font-bold tracking-widest bg-foreground text-background"
          >
            FREE AUDIT
          </a>
          <button
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-background border-b border-border md:hidden shadow-lg h-screen"
        >
          <div className="flex flex-col p-8 gap-8 items-center justify-center h-full pb-32">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-3xl font-display font-bold hover:text-primary transition-colors tracking-tighter"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

