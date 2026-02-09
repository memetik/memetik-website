import { useState } from "react";
import { ArrowRight, Download, CheckCircle } from "lucide-react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your email service
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-foreground text-background border-b border-foreground/10">
      <div className="max-w-4xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 border border-background/20 px-3 py-1.5 rounded-full mb-6">
              <Download className="w-3 h-3" />
              <span className="font-mono text-xs uppercase tracking-wider">
                Free Resource
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight mb-4 text-background">
              The 2026 AI Visibility Playbook
            </h2>
            
            <p className="text-base text-background/70 mb-6">
              Not ready to talk? Get our free guide covering:
            </p>
            
            <ul className="space-y-2 mb-6">
              {[
                "How LLMs decide which brands to recommend",
                "The 5 factors that determine AI citations",
                "Quick wins you can implement today",
                "How to audit your current AI visibility"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-background/80">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right - Form */}
          <div className="border border-background/15 rounded-lg p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-display font-bold text-xl mb-2">Check Your Email</h3>
                <p className="text-sm text-background/70">
                  The playbook is on its way. Check your spam if you don't see it.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-background/60 mb-2 block">
                    Work Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3 bg-transparent border border-background/20 rounded text-sm focus:border-background focus:outline-none transition-colors"
                  />
                </label>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-background text-foreground px-6 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
                >
                  GET THE FREE PLAYBOOK
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <p className="text-[10px] text-background/40 mt-4 text-center">
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </form>
            )}
          </div>
          
        </div>

      </div>
    </section>
  );
}
