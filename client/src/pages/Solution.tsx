import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Nav } from "@/components/Nav";
import { ArrowRight, AlertTriangle, ChevronDown } from "lucide-react";
import { solutions } from "@/data/solutions";

export default function Solution() {
  const { solution } = useParams<{ solution: string }>();
  const data = solution ? solutions[solution] : null;
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
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <Link href="/audit">
              <a className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity">
                Get Your Free Audit
                <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
            <span className="font-mono text-xs text-foreground/50 uppercase">
              See where you stand in 24 hours
            </span>
          </div>

          {/* Results */}
          <div className="grid grid-cols-3 gap-4">
            {data.results.map((r, i) => (
              <div key={i} className="border-2 border-foreground p-4">
                <div className="text-2xl md:text-3xl font-display font-extrabold">{r.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/60 mt-1">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight uppercase mb-12">
            {data.problemTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
            {data.problems.map((p, i) => (
              <div
                key={i}
                className="p-6 md:p-8 border-b md:odd:border-r border-foreground/20 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <p className="font-mono text-sm text-foreground/80 leading-relaxed">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Solve It */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-foreground text-background border-b-2 border-foreground">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight uppercase mb-12 text-background">
            How we solve it
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-background/30">
            {data.steps.map((s, i) => (
              <div
                key={i}
                className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-background/20 last:border-r-0 last:border-b-0"
              >
                <div className="font-mono text-xs text-background/40 mb-4">0{i + 1}</div>
                <h3 className="font-display font-extrabold text-xl uppercase mb-3 text-background">
                  {s.title}
                </h3>
                <p className="font-mono text-xs text-background/70 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
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
            Stop losing to competitors in AI.
          </h2>
          <p className="font-mono text-sm text-background/60 mb-8 max-w-xl mx-auto">
            See exactly where you stand in 24 hours. Free, no obligation.
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
