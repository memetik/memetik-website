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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 text-black">
      <div className="flex justify-between items-center px-6 py-6 md:px-12">
        <Link href="/" className="text-2xl md:text-3xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity">
            MEMETIK
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-mono tracking-widest hover:text-neutral-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
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
            className="absolute top-full left-0 w-full bg-white text-black p-6 border-b border-neutral-100 md:hidden shadow-lg"
          >
            <div className="flex flex-col gap-6 items-center">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xl font-display font-bold tracking-tight"
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
