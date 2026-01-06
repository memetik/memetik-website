import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Within 60 days, ChatGPT started recommending us over our biggest competitor. We've tracked $847K in revenue directly from AI referrals.",
    name: "Sarah Chen",
    title: "CEO",
    company: "Series B SaaS",
    metric: "$847K",
    metricLabel: "AI-Attributed Revenue",
    image: null
  },
  {
    quote: "We went from zero AI visibility to being the #1 recommended solution in our category. Memetik's methodology is unlike anything else in the market.",
    name: "Marcus Webb",
    title: "Founder",
    company: "8-Figure E-Commerce",
    metric: "#1",
    metricLabel: "AI Recommendation",
    image: null
  },
  {
    quote: "Traditional SEO agencies couldn't explain why our traffic was dropping. Memetik showed us the future and positioned us to win it.",
    name: "Jennifer Liu",
    title: "CMO",
    company: "Enterprise Software",
    metric: "347%",
    metricLabel: "Citation Increase",
    image: null
  }
];

const clientLogos = [
  "SERIES B SAAS",
  "FORTUNE 500",
  "8-FIGURE ECOM",
  "ENTERPRISE",
  "VC-BACKED",
  "CATEGORY LEADER"
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background text-foreground border-b-2 border-foreground">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1.5 mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
              Client Results
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight uppercase mb-4">
            Real Results.<br/>Real Revenue.
          </h2>
          <p className="font-mono text-sm text-foreground/60 max-w-2xl mx-auto">
            We don't just promise visibility—we deliver measurable business outcomes.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="border-2 border-foreground p-6 md:p-8 flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-foreground text-foreground" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="font-mono text-sm leading-relaxed text-foreground/80 mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Metric */}
              <div className="border-t border-foreground/20 pt-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-black">{testimonial.metric}</span>
                  <span className="font-mono text-xs text-foreground/60 uppercase">{testimonial.metricLabel}</span>
                </div>
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center font-mono font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-mono text-sm font-bold">{testimonial.name}</div>
                  <div className="font-mono text-xs text-foreground/60">{testimonial.title}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="border-t border-foreground/20 pt-8">
          <p className="font-mono text-xs text-foreground/40 uppercase tracking-wider text-center mb-6">
            Trusted by category leaders
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {clientLogos.map((logo, i) => (
              <div key={i} className="px-4 py-2 border border-foreground/20 font-mono text-xs text-foreground/40 uppercase tracking-wider">
                {logo}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
