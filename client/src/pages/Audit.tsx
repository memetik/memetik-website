import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Nav } from "@/components/Nav";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
  TrendingDown,
  BarChart3,
  Shield,
  Zap,
  Target,
  Clock,
} from "lucide-react";

export default function Audit() {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Free AEO Audit | MEMETIK";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to API / n8n webhook / Notion
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1.5 mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
              Free AI Visibility Analysis
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left -- Copy */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[0.85] tracking-tight text-foreground uppercase mb-6">
                Is your brand
                <br />
                invisible to AI?
              </h1>

              <p className="font-serif text-xl sm:text-2xl text-foreground/70 mb-6">
                Find out what ChatGPT, Perplexity, and Gemini say when buyers
                ask about your category.
              </p>

              <p className="font-mono text-sm text-foreground/60 mb-8">
                Most B2B brands are completely invisible in AI search results.
                Your competitors might already be the default recommendation.
                This free audit shows you exactly where you stand.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { stat: "40-70%", label: "Of buyers use AI before purchasing" },
                  { stat: "0%", label: "Of brands know their AI visibility" },
                  { stat: "90", label: "Days to fix it" },
                ].map((item, i) => (
                  <div key={i} className="border-2 border-foreground p-4">
                    <div className="text-2xl md:text-3xl font-display font-black">
                      {item.stat}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/60 mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right -- Form */}
            <div className="border-2 border-foreground p-6 md:p-8 bg-foreground/[0.02]">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-600" />
                  <h3 className="font-display font-black text-2xl uppercase mb-3">
                    Audit Requested
                  </h3>
                  <p className="font-mono text-sm text-foreground/70 mb-4">
                    We'll analyze <strong>{domain}</strong> across ChatGPT,
                    Perplexity, and Gemini and send your report within 24 hours.
                  </p>
                  <p className="font-mono text-xs text-foreground/50">
                    Check <strong>{email}</strong> for your results.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="font-display font-black text-xl uppercase mb-2">
                      Get Your Free AEO Audit
                    </h2>
                    <p className="font-mono text-xs text-foreground/60">
                      Takes 30 seconds. Results delivered in 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                      <span className="font-mono text-xs uppercase tracking-wider text-foreground/60 mb-2 block">
                        Your Website
                      </span>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                        <input
                          type="text"
                          value={domain}
                          onChange={(e) => setDomain(e.target.value)}
                          placeholder="yourcompany.com"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-transparent border-2 border-foreground/30 font-mono text-sm focus:border-foreground focus:outline-none transition-colors"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="font-mono text-xs uppercase tracking-wider text-foreground/60 mb-2 block">
                        Work Email
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full px-4 py-3 bg-transparent border-2 border-foreground/30 font-mono text-sm focus:border-foreground focus:outline-none transition-colors"
                      />
                    </label>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 bg-foreground text-background px-6 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      Run My Free Audit
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="font-mono text-[10px] text-foreground/40 text-center">
                      No credit card. No sales call required. Just data.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-xs tracking-tighter text-foreground/60 mb-8 overflow-hidden">
            &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase mb-4">
            What's in the audit
          </h2>
          <p className="font-serif text-lg text-foreground/60 mb-12 max-w-2xl">
            A 7-page competitive analysis of your AI search presence, scored
            and benchmarked against your top competitors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
            {[
              {
                icon: Eye,
                title: "AI Visibility Score",
                description:
                  "Your brand scored 0-100 across ChatGPT, Perplexity, and Gemini for your category keywords.",
              },
              {
                icon: Target,
                title: "Competitor Benchmarks",
                description:
                  "See exactly which competitors AI recommends instead of you, and why they're winning.",
              },
              {
                icon: BarChart3,
                title: "Query-by-Query Breakdown",
                description:
                  "10+ purchase-intent queries tested: who shows up, who gets cited, who's invisible.",
              },
              {
                icon: AlertTriangle,
                title: "Content Gap Analysis",
                description:
                  "Specific topics and questions where your content is missing or too weak for AI citation.",
              },
              {
                icon: Zap,
                title: "5 Quick Wins",
                description:
                  "Actionable recommendations you can implement this week to improve AI visibility.",
              },
              {
                icon: Shield,
                title: "Schema & Technical Check",
                description:
                  "JSON-LD, FAQ markup, and content structure assessment for AI parseability.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 md:p-8 border-b md:border-r border-foreground/20 last:border-b-0 md:[&:nth-child(3n)]:border-r-0 md:[&:nth-child(n+4)]:border-b-0"
              >
                <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-lg uppercase mb-2">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-foreground text-background border-b-2 border-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase mb-6 text-background">
                Your buyers aren't googling anymore
              </h2>
              <p className="font-mono text-sm text-background/70 mb-6">
                They're asking ChatGPT "what's the best {"{category}"} tool?"
                and buying whatever it recommends. If you're not in that
                answer, you don't exist.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: EyeOff,
                    text: "Your brand is invisible in AI recommendations",
                  },
                  {
                    icon: TrendingDown,
                    text: "Google organic traffic declining 15-30% YoY",
                  },
                  {
                    icon: AlertTriangle,
                    text: "Competitors are actively optimizing for AI search",
                  },
                  {
                    icon: Clock,
                    text: "12-24 month window before AI search is commoditized",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 border border-background/30 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-background/70" />
                    </div>
                    <span className="font-mono text-sm text-background/80">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Example audit preview */}
            <div className="border-2 border-background/30 p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-background/40 mb-4">
                Sample Audit Result
              </div>
              <div className="space-y-3">
                {[
                  {
                    query: '"best project management tool"',
                    result: "Competitor cited, you invisible",
                    score: 0,
                    color: "bg-red-500",
                  },
                  {
                    query: '"project management for startups"',
                    result: "Mentioned (not recommended)",
                    score: 5,
                    color: "bg-yellow-500",
                  },
                  {
                    query: '"alternative to [competitor]"',
                    result: "Not mentioned",
                    score: 0,
                    color: "bg-red-500",
                  },
                  {
                    query: '"[your brand] review"',
                    result: "Partial information, outdated",
                    score: 3,
                    color: "bg-yellow-500",
                  },
                  {
                    query: '"best [category] 2026"',
                    result: "Competitor cited as #1",
                    score: 0,
                    color: "bg-red-500",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 py-2 border-b border-background/10 last:border-b-0"
                  >
                    <span className="font-mono text-xs text-background/60 truncate flex-1">
                      {item.query}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${item.color}`}
                      ></div>
                      <span className="font-mono text-xs text-background/80 whitespace-nowrap">
                        {item.score}/10
                      </span>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-background/20 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-background">
                    Overall AEO Score
                  </span>
                  <span className="font-display font-black text-2xl text-red-400">
                    8/100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-foreground">
            {[
              {
                step: "01",
                title: "Submit your domain",
                description:
                  "Enter your website URL and we run it through our AI visibility analysis engine.",
                time: "30 seconds",
              },
              {
                step: "02",
                title: "We analyze everything",
                description:
                  "10+ category queries across ChatGPT, Perplexity, and Gemini. Competitor benchmarks. Content gap analysis.",
                time: "24 hours",
              },
              {
                step: "03",
                title: "Get your report",
                description:
                  "7-page branded PDF with your AEO score, competitor comparison, and 5 actionable recommendations.",
                time: "Delivered via email",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-foreground/20 last:border-r-0 last:border-b-0"
              >
                <div className="font-mono text-xs text-foreground/40 mb-4">
                  {item.step}
                </div>
                <h3 className="font-display font-black text-xl uppercase mb-3">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-foreground/70 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-2 border border-foreground/20 px-2 py-1">
                  <Clock className="w-3 h-3 text-foreground/50" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase mb-8">
            Why companies trust Memetik
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { stat: "50+", label: "Brands audited" },
              { stat: "3x", label: "Avg citation lift" },
              { stat: "90", label: "Day guarantee" },
              { stat: "236", label: "Articles published" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-display font-black">
                  {item.stat}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/60 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4 text-background">
            Stop guessing. Start measuring.
          </h2>
          <p className="font-mono text-sm text-background/60 mb-8 max-w-xl mx-auto">
            Your competitors are already optimizing for AI search. See exactly
            where you stand in 24 hours.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Get Your Free Audit
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="font-mono text-xs text-background/40 mt-4 uppercase">
            Free. No obligation. Results in 24 hours.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 md:px-12 border-t border-foreground/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <a className="font-display font-black text-xl uppercase">
              MEMETIK
            </a>
          </Link>
          <div className="font-mono text-xs text-foreground/40 uppercase">
            &copy; 2026 MEMETIK
          </div>
        </div>
      </footer>
    </div>
  );
}
