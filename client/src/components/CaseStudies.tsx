import { ArrowRight, TrendingUp, Target, Zap } from "lucide-react";

const caseStudies = [
  {
    id: "01",
    industry: "B2B SaaS",
    title: "From Zero to #1 AI Recommendation",
    challenge: "A Series B project management tool was invisible in AI responses while competitors dominated every query.",
    solution: "Full AEO deployment: LLM audit, 12 apex assets, authority injection across 80+ high-trust surfaces.",
    results: [
      { metric: "0 → #1", label: "AI Ranking" },
      { metric: "$847K", label: "Attributed Revenue" },
      { metric: "90", label: "Days to Results" }
    ],
    quote: "ChatGPT now recommends us first. That's a moat competitors can't easily cross."
  },
  {
    id: "02",
    industry: "E-Commerce",
    title: "347% Increase in AI Citations",
    challenge: "An 8-figure DTC brand was losing market share as AI assistants recommended competitors in buying decisions.",
    solution: "Semantic restructuring of 600+ product pages, comparison content engine, and entity optimization.",
    results: [
      { metric: "347%", label: "Citation Lift" },
      { metric: "52%", label: "Traffic from AI" },
      { metric: "$2.3M", label: "New Revenue" }
    ],
    quote: "Customers now say 'ChatGPT told me to buy from you.' That's the future."
  }
];

export function CaseStudies() {
  return (
    <section id="work" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-foreground text-background border-b-2 border-foreground">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 border border-background/30 px-3 py-1.5 mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-background/70">
              Proof of Work
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight uppercase mb-4 text-background">
            Case Studies
          </h2>
          <p className="font-mono text-sm text-background/60 max-w-2xl">
            Real transformations. Measurable results. See how we've helped brands dominate AI recommendations.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-8 mb-12">
          {caseStudies.map((study, i) => (
            <div key={i} className="border-2 border-background/30 p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left - Story */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-background text-foreground px-2 py-1 font-mono text-xs font-bold">
                      CASE {study.id}
                    </span>
                    <span className="font-mono text-xs text-background/60 uppercase">
                      {study.industry}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-display font-extrabold uppercase tracking-tight mb-6 text-background">
                    {study.title}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="font-mono text-xs text-background/50 uppercase mb-1">The Challenge</div>
                      <p className="font-mono text-sm text-background/80">{study.challenge}</p>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-background/50 uppercase mb-1">Our Solution</div>
                      <p className="font-mono text-sm text-background/80">{study.solution}</p>
                    </div>
                  </div>
                  
                  <blockquote className="border-l-2 border-background/30 pl-4 font-serif text-lg text-background/70">
                    "{study.quote}"
                  </blockquote>
                </div>
                
                {/* Right - Results */}
                <div className="flex flex-col justify-center">
                  <div className="font-mono text-xs text-background/50 uppercase mb-4">Results</div>
                  <div className="grid grid-cols-3 gap-4">
                    {study.results.map((result, j) => (
                      <div key={j} className="text-center p-4 border border-background/20">
                        <div className="text-3xl md:text-4xl font-display font-extrabold text-background mb-1">
                          {result.metric}
                        </div>
                        <div className="font-mono text-[10px] text-background/60 uppercase">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-mono text-sm text-background/60 mb-4 uppercase">
            Want results like these?
          </p>
          <a 
            href="https://cal.com/memetik/letstalk"
            className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            GET YOUR FREE AI AUDIT
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
