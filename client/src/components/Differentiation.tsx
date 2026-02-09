import { Check, X } from "lucide-react";

export function Differentiation() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-foreground/10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 rounded-full mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
                Why We're Different
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-[0.9] mb-2 tracking-tight text-foreground">
              Not Another SEO Agency.
            </h2>
            <p className="font-serif text-lg sm:text-xl text-foreground/60 mb-6">
              We built Memetik because traditional agencies can't solve this problem.
            </p>

            <p className="text-base leading-relaxed text-foreground/70">
              Most agencies are still optimizing for Google rankings while your buyers are getting answers from ChatGPT. We engineer your brand into the AI layer itself.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-foreground/15 rounded p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mb-4 pb-2 border-b border-foreground/10">
                THE OLD WAY
              </div>
              <ul className="space-y-3">
                {["Optimizing for rankings", "Recycled playbooks", "Guessing what works", "Agency theatre"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/40 line-through text-sm">
                    <X className="w-3 h-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-foreground/15 rounded p-6 bg-foreground text-background">
              <div className="font-mono text-[10px] uppercase tracking-widest text-background/60 mb-4 pb-2 border-b border-background/15">
                THE MEMETIK WAY
              </div>
              <ul className="space-y-3">
                {["Optimizing for ANSWERS", "First principles", "LLM strategies", "Engineered dominance"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-background text-sm font-semibold">
                    <Check className="w-3 h-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
