import { ArrowRight } from "lucide-react";

export function Qualification() {
  return (
    <section id="who-we-serve" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-foreground/10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">

        <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
            Ideal Client Profile
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">
          Is This for You?
        </h2>
        <p className="text-base text-foreground/60 max-w-2xl mb-12">
          We're selective about who we work with. AEO requires significant investment and commitment. Here's who sees the best results:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="border border-foreground/15 rounded p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-accent text-xl">&#10003;</span>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider">You're a Great Fit If:</h3>
            </div>
            <ul className="space-y-4">
              {[
                { main: "$1M+ ARR", sub: "You have the revenue to invest in long-term growth" },
                { main: "6-month commitment mindset", sub: "You understand AEO is a strategic play, not a quick fix" },
                { main: "B2B SaaS or E-commerce", sub: "Your customers research purchases with AI" },
                { main: "Category leader or ambitious challenger", sub: "You want to dominate, not just compete" },
                { main: "In-house marketing team", sub: "Someone to collaborate with and hand off to" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-1">&bull;</span>
                  <div>
                    <span className="text-sm font-semibold">{item.main}</span>
                    <span className="text-sm text-foreground/60"> &mdash; {item.sub}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-foreground/15 rounded p-6 md:p-8 bg-muted">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-red-400 text-xl">&#10007;</span>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider">Not a Fit If:</h3>
            </div>
            <ul className="space-y-4">
              {[
                { main: "Pre-revenue or early stage", sub: "Focus on product-market fit first" },
                { main: "Looking for quick wins", sub: "AEO compounds over 6-12 months" },
                { main: "Budget under $15K/month", sub: "We can't deliver results at lower price points" },
                { main: "Highly regulated industry", sub: "Healthcare, finance require specialized compliance" },
                { main: "Want to 'set and forget'", sub: "This is a partnership, not a service subscription" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&bull;</span>
                  <div>
                    <span className="text-sm font-semibold">{item.main}</span>
                    <span className="text-sm text-foreground/60"> &mdash; {item.sub}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 mb-12">
          <p className="font-mono text-xs text-foreground/40 uppercase tracking-wider mb-4">
            Industries we specialize in
          </p>
          <div className="flex flex-wrap gap-3">
            {["B2B SaaS", "E-Commerce (7-figures+)", "Professional Services", "Agencies", "Tech Startups"].map((industry, i) => (
              <div key={i} className="border border-foreground/15 px-4 py-2 rounded text-sm">
                {industry}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block border border-foreground/15 rounded-lg p-8 md:p-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
                February 2026: 1 spot remaining
              </span>
            </div>
            <p className="text-2xl md:text-4xl font-display font-extrabold tracking-tight mb-4">
              Ready to Dominate AI Search?
            </p>
            <p className="text-base text-foreground/60 mb-6">
              Get a free AI visibility audit and see exactly where you stand against competitors in LLM responses.
            </p>
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              CLAIM YOUR FREE AUDIT
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="font-mono text-xs text-foreground/40 mt-4 uppercase">
              30-min call &middot; No obligation &middot; Results in 48hrs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
