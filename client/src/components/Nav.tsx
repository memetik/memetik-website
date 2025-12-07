import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#work", label: "WORK" },
    { href: "#agency", label: "AGENCY" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm text-foreground py-4 border-b border-transparent">
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center gap-2 group">
             <span className="font-display font-bold text-2xl tracking-tighter text-foreground">MEMETIK</span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-mono tracking-widest hover:text-primary transition-colors decoration-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border md:hidden shadow-lg"
          >
            <div className="flex flex-col p-6 gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

