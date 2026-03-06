import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links: { href: string; label: string; isPage?: boolean }[] = [
    { href: "#work", label: "CASE STUDIES" },
    { href: "#methodology", label: "PROCESS" },
    { href: "#faq", label: "FAQ" },
    { href: "/resources", label: "RESOURCES", isPage: true },
  ];

  const isMarketingHome = location === "/";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // If not on homepage, navigate there with hash
    if (!isMarketingHome) {
      window.location.href = "/" + href;
      return;
    }
    
    // On homepage, smooth scroll
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const shellClass = scrolled
    ? "border-white/12 bg-[#07090d]/88 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
    : "border-white/10 bg-[#07090d]/72 shadow-[0_18px_60px_rgba(0,0,0,0.35)]";

  const linkClass =
    "font-mono text-[10px] uppercase tracking-[0.22em] text-white/52 transition-colors hover:text-white";

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 md:px-8 md:pt-5">
      <div className="mx-auto max-w-7xl">
        <div
          className={`relative rounded-[1.75rem] border backdrop-blur-md transition-all duration-300 ${shellClass}`}
        >
          <div className="absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))]" />
          <div className="relative flex items-center justify-between gap-4 px-5 py-3 md:px-6 md:py-4">
            <Link href="/" className="group relative z-50 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] text-white transition-colors group-hover:bg-white/[0.08]">
                <svg viewBox="0 0 100 100" fill="currentColor" className="h-5 w-5">
                  <path d="M0 0 H100 V100 H70 V35 H65 V100 H35 V35 H30 V100 H0 V0 Z M35 0 V25 L50 45 L65 25 V0" fillRule="evenodd" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold leading-none tracking-[-0.06em] text-white md:text-[1.45rem]">
                  MEMETIK
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/32">
                  Revenue-led search systems
                </span>
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <div className="flex items-center gap-6 lg:gap-8">
                {links.map((link) =>
                  link.isPage ? (
                    <Link key={link.label} href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>

              <a
                href="https://cal.com/memetik/letstalk"
                className="inline-flex items-center gap-2 rounded-full border border-[#f4e4cd]/25 bg-[#f4e4cd] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#090b0d] transition hover:opacity-92"
              >
                Book Strategy Call
              </a>
            </div>

            <div className="relative z-50 flex items-center gap-2 md:hidden">
              <a
                href="https://cal.com/memetik/letstalk"
                className="inline-flex items-center rounded-full border border-[#f4e4cd]/25 bg-[#f4e4cd] px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#090b0d]"
              >
                Strategy Call
              </a>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="relative z-40 border-t border-white/10 px-5 pb-5 pt-4 md:hidden">
              <div className="space-y-2 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                {links.map((link) =>
                  link.isPage ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block rounded-2xl px-3 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/72 transition hover:bg-white/[0.04] hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="block rounded-2xl px-3 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/72 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

