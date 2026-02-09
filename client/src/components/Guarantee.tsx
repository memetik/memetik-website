import { Shield, CheckCircle } from "lucide-react";

export function Guarantee() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b border-foreground/10">
      <div className="max-w-4xl mx-auto">
        
        <div className="border border-foreground/15 rounded-lg p-8 md:p-12 text-center">
          
          {/* Shield Icon */}
          <div className="w-16 h-16 mx-auto mb-6 border border-foreground/15 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          
          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold tracking-tight mb-4">
            The 90-Day Guarantee
          </h2>
          
          {/* Subhead */}
          <p className="font-serif text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            If there's no measurable movement in your AI visibility within 90 days, you get a full refund. No questions asked.
          </p>
          
          {/* What's Included */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              "Baseline AI visibility audit",
              "90-day performance tracking",
              "Full refund if no improvement"
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          
          {/* Fine Print */}
          <p className="text-xs text-foreground/40 max-w-xl mx-auto">
            We've never paid out on this guarantee — because our methodology works. But it exists because we believe you shouldn't risk your investment on promises. You should risk it on proof.
          </p>
          
        </div>

      </div>
    </section>
  );
}
