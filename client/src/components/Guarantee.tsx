import { Shield, CheckCircle } from "lucide-react";

export function Guarantee() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b-2 border-foreground">
      <div className="max-w-4xl mx-auto">
        
        <div className="border-2 border-foreground p-8 md:p-12 text-center">
          
          {/* Shield Icon */}
          <div className="w-16 h-16 mx-auto mb-6 border-2 border-foreground flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          
          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black tracking-tight uppercase mb-4">
            The 90-Day Guarantee
          </h2>
          
          {/* Subhead */}
          <p className="font-serif text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            If we don't measurably improve your AI visibility within 90 days, we'll refund your first month. No questions asked.
          </p>
          
          {/* What's Included */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              "Baseline AI visibility audit",
              "90-day performance tracking",
              "Full refund if no improvement"
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 font-mono text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          
          {/* Fine Print */}
          <p className="font-mono text-xs text-foreground/40 max-w-xl mx-auto">
            We've never paid out on this guarantee—because our methodology works. But it exists because we believe you shouldn't risk your investment on promises. You should risk it on proof.
          </p>
          
        </div>

      </div>
    </section>
  );
}
