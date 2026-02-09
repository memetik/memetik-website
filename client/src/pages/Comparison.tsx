import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Nav } from "@/components/Nav";
import { ArrowRight, Check, X, ChevronDown } from "lucide-react";
import { comparisons } from "@/data/comparisons";

export default function Comparison() {
  const { comparison } = useParams<{ comparison: string }>();
  const data = comparison ? comparisons[comparison] : null;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      document.title = data.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", data.metaDescription);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground">
        <Nav />
        <div className="pt-32 pb-16 px-4 text-center">
          <h1 className="text-3xl font-display font-extrabold uppercase mb-4">Page Not Found</h1>
          <Link href="/">
            <a className="font-mono text-sm underline">Back to home</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1.5 mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
              {data.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[0.85] tracking-tight uppercase mb-6 whitespace-pre-line">
            {data.headline}
          </h1>
          <p className="font-serif text-2xl sm:text-3xl text-foreground/70 mb-6">
            {data.subhead}
          </p>
          <p className="font-mono text-sm text-foreground/60 max-w-2xl mb-8">
            {data.description}
          </p>

          <Link href="/audit">
            <a className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity">
              Get Your Free Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight uppercase mb-12">
            The honest comparison
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block border-2 border-foreground">
            {/* Header */}
            <div className="grid grid-cols-3 border-b-2 border-foreground">
              <div className="p-4 bg-foreground/5">
                <span className="font-mono text-xs uppercase tracking-wider text-foreground/50">
                  Category
                </span>
              </div>
              <div className="p-4 border-l border-foreground/20">
                <span className="font-mono text-xs uppercase tracking-wider text-foreground/50">
                  {data.themLabel}
                </span>
              </div>
              <div className="p-4 border-l-2 border-foreground bg-foreground text-background">
                <span className="font-mono text-xs uppercase tracking-wider">
                  {data.usLabel}
                </span>
              </div>
            </div>
            {/* Rows */}
            {data.rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-foreground/20 last:border-b-0"
              >
                <div className="p-4 bg-foreground/5">
                  <span className="font-mono text-xs font-bold uppercase">{row.category}</span>
                </div>
                <div className="p-4 border-l border-foreground/20">
                  <span className="font-mono text-xs text-foreground/70">{row.them}</span>
                </div>
                <div className="p-4 border-l-2 border-foreground bg-foreground/5">
                  <span className="font-mono text-xs font-bold">{row.us}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {data.rows.map((row, i) => (
              <div key={i} className="border-2 border-foreground">
                <div className="p-4 bg-foreground/5 border-b border-foreground/20">
                  <span className="font-mono text-xs font-bold uppercase">{row.category}</span>
                </div>
                <div className="p-4 border-b border-foreground/20">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/40 mb-1">
                    {data.themLabel}
                  </div>
                  <p className="font-mono text-xs text-foreground/70">{row.them}</p>
                </div>
                <div className="p-4 bg-foreground/5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/40 mb-1">
                    {data.usLabel}
                  </div>
                  <p className="font-mono text-xs font-bold">{row.us}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Line */}
          <div className="mt-8 border-2 border-foreground p-6 md:p-8 bg-foreground text-background">
            <div className="font-mono text-[10px] uppercase tracking-widest text-background/40 mb-3">
              The Bottom Line
            </div>
            <p className="font-mono text-sm text-background/90 leading-relaxed">
              {data.bottomLine}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight uppercase mb-12">
            Common Questions
          </h2>
          <div className="border-2 border-foreground divide-y-2 divide-foreground">
            {data.faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-foreground/5 transition-colors"
                >
                  <span className="font-mono text-sm font-bold pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="font-mono text-sm text-foreground/70 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight mb-4 text-background">
            See the difference yourself.
          </h2>
          <p className="font-mono text-sm text-background/60 mb-8 max-w-xl mx-auto">
            Get a free audit showing exactly where you stand in AI search.
          </p>
          <Link href="/audit">
            <a className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity">
              Get Your Free Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 md:px-12 border-t border-foreground/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <a className="font-display font-extrabold text-xl uppercase">MEMETIK</a>
          </Link>
          <div className="font-mono text-xs text-foreground/40 uppercase">&copy; 2026 MEMETIK</div>
        </div>
      </footer>
    </div>
  );
}
