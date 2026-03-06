import { useEffect, useState } from "react";
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
import {
  MarketingCard,
  MarketingContainer,
  MarketingFooter,
  MarketingPage,
  MarketingPill,
  MarketingSectionGlow,
  MarketingSectionShell,
  marketingTheme,
} from "@/components/marketing/MarketingTheme";

export default function Audit() {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Free AEO Audit | MEMETIK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Get a free AI visibility audit. See exactly where your brand ranks in ChatGPT, Perplexity, and Gemini vs competitors. Results in 48 hours.");
  }, []);

  const AUDIT_API = "https://wonderful-rebirth-production-7f52.up.railway.app";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${AUDIT_API}/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, email }),
      });
      if (!res.ok) throw new Error("Failed to start audit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MarketingPage>
      <Nav />
      <main className="px-4 pb-8 pt-28 sm:px-6 md:px-12 md:pt-32">
        <MarketingContainer className="space-y-6">
          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-14">
            <MarketingSectionGlow className="-left-10 top-0 h-48 w-48" />
            <MarketingSectionGlow className="bottom-0 right-0 h-56 w-56" tone="amber" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.9fr)] lg:items-start">
              <div>
                <MarketingPill className="mb-8">
                  <span className="h-2 w-2 rounded-full bg-[#ff8a65] shadow-[0_0_12px_rgba(255,138,101,0.8)]" />
                  Free AI visibility analysis
                </MarketingPill>
                <h1 className="mb-6 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                  Is your brand
                  <br />
                  invisible to AI?
                </h1>
                <p className="mb-4 max-w-3xl text-xl text-white/74 sm:text-2xl md:text-3xl">
                  Find out what ChatGPT, Perplexity, and Gemini say when buyers ask about your category.
                </p>
                <p className="max-w-2xl font-mono text-sm leading-7 text-white/58">
                  Most B2B brands do not know their answer-share position, where competitors are winning, or which trust signals AI systems are rewarding. This audit turns that ambiguity into an executive view of risk and upside.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { stat: "40-70%", label: "Of buyers use AI before purchasing" },
                    { stat: "0%", label: "Of brands know their AI visibility" },
                    { stat: "90", label: "Days to shift answer share" },
                  ].map((item, i) => (
                    <MarketingCard key={i} className="p-5">
                      <div className="font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white">{item.stat}</div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{item.label}</div>
                    </MarketingCard>
                  ))}
                </div>
              </div>

              <MarketingCard className="p-6 sm:p-8">
                {submitted ? (
                  <div className="py-8 text-center">
                    <CheckCircle className="mx-auto mb-6 h-16 w-16 text-[#78f0c4]" />
                    <h3 className="font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-white">
                      Audit requested
                    </h3>
                    <p className="mt-4 font-mono text-sm leading-7 text-white/62">
                      We’ll analyze <strong>{domain}</strong> across ChatGPT, Perplexity, and Gemini and send your report within 24 hours.
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                      Results will land at {email}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className={marketingTheme.eyebrow}>Executive audit intake</div>
                      <h2 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-white">
                        Get your free AEO audit
                      </h2>
                      <p className="mt-3 font-mono text-xs leading-6 text-white/52">
                        Takes 30 seconds. Results delivered in 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <label className="block">
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                          Your website
                        </span>
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/32" />
                          <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="yourcompany.com"
                            required
                            className="w-full rounded-2xl border border-white/12 bg-white/[0.03] py-3 pl-11 pr-4 font-mono text-sm text-white placeholder:text-white/28 focus:border-white/24 focus:outline-none"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                          Work email
                        </span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          required
                          className="w-full rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder:text-white/28 focus:border-white/24 focus:outline-none"
                        />
                      </label>

                      <button
                        type="submit"
                        disabled={submitting}
                        className={`${marketingTheme.primaryButton} w-full disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        {submitting ? "Running audit..." : "Run my free audit"}
                        {!submitting && <ArrowRight className="h-4 w-4" />}
                      </button>

                      {error && <p className="text-center font-mono text-xs text-red-400">{error}</p>}

                      <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                        No credit card. No obligation. Just data.
                      </p>
                    </form>
                  </>
                )}
              </MarketingCard>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className={marketingTheme.eyebrow}>Report contents</div>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
                  What’s in the audit
                </h2>
              </div>
              <p className="max-w-xl font-mono text-sm leading-7 text-white/55">
                A 7-page competitive analysis of your AI search presence, benchmarked against the brands currently winning recommendation share.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  icon: Eye,
                  title: "AI visibility score",
                  description: "Your brand scored 0-100 across ChatGPT, Perplexity, and Gemini for your category keywords.",
                },
                {
                  icon: Target,
                  title: "Competitor benchmarks",
                  description: "See exactly which competitors AI recommends instead of you, and why they’re winning.",
                },
                {
                  icon: BarChart3,
                  title: "Query-by-query breakdown",
                  description: "10+ purchase-intent queries tested: who shows up, who gets cited, and who is invisible.",
                },
                {
                  icon: AlertTriangle,
                  title: "Content gap analysis",
                  description: "Specific topics and questions where your content is missing or too weak for AI citation.",
                },
                {
                  icon: Zap,
                  title: "5 quick wins",
                  description: "Actionable recommendations you can implement immediately to improve answer visibility.",
                },
                {
                  icon: Shield,
                  title: "Schema and technical check",
                  description: "JSON-LD, FAQ markup, and content structure assessment for AI parseability.",
                },
              ].map((item, i) => (
                <MarketingCard key={i} className="p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] text-white/72">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-white">{item.title}</h3>
                  <p className="mt-4 font-mono text-sm leading-7 text-white/60">{item.description}</p>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)] lg:items-center">
              <div>
                <div className={marketingTheme.eyebrow}>Why this matters now</div>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
                  Your buyers aren’t googling anymore
                </h2>
                <p className="mt-4 font-mono text-sm leading-7 text-white/58">
                  They’re asking ChatGPT what the best {"{category}"} platform is and moving forward with whoever the model presents as safest, strongest, and easiest to trust.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: EyeOff,
                      text: "Your brand is invisible in AI recommendations",
                    },
                    {
                      icon: TrendingDown,
                      text: "Google organic traffic is fragmenting across answer engines",
                    },
                    {
                      icon: AlertTriangle,
                      text: "Competitors are actively shaping the recommendation layer",
                    },
                    {
                      icon: Clock,
                      text: "The window to establish category authority is open now",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] text-white/68">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-sm leading-7 text-white/66">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <MarketingCard className="p-6">
                <div className={marketingTheme.eyebrow}>Sample audit result</div>
                <div className="mt-6 space-y-3">
                  {[
                    { query: '"best project management tool"', score: 0, color: "bg-red-400" },
                    { query: '"project management for startups"', score: 5, color: "bg-amber-300" },
                    { query: '"alternative to [competitor]"', score: 0, color: "bg-red-400" },
                    { query: '"[your brand] review"', score: 3, color: "bg-amber-300" },
                    { query: '"best [category] 2026"', score: 0, color: "bg-red-400" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
                      <span className="truncate font-mono text-xs text-white/52">{item.query}</span>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${item.color}`} />
                        <span className="font-mono text-xs text-white/72">{item.score}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white/68">Overall AEO score</span>
                  <span className="font-display text-3xl font-extrabold tracking-[-0.04em] text-[#ff8a65]">8/100</span>
                </div>
              </MarketingCard>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className={marketingTheme.eyebrow}>Delivery workflow</div>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
                  How it works
                </h2>
              </div>
              <p className="max-w-xl font-mono text-sm leading-7 text-white/55">
                Fast enough for executive teams. Specific enough for operators to act on immediately.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Submit your domain",
                  description: "Enter your website URL and we run it through our AI visibility analysis engine.",
                  time: "30 seconds",
                },
                {
                  step: "02",
                  title: "We analyze everything",
                  description: "10+ category queries across ChatGPT, Perplexity, and Gemini with competitor benchmarks and content gap analysis.",
                  time: "24 hours",
                },
                {
                  step: "03",
                  title: "Get your report",
                  description: "A 7-page branded PDF with your score, competitor comparison, and five specific recommendations.",
                  time: "Delivered via email",
                },
              ].map((item, i) => (
                <MarketingCard key={i} className="p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">{item.step}</div>
                  <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-white">{item.title}</h3>
                  <p className="mt-4 font-mono text-sm leading-7 text-white/60">{item.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12 text-center">
            <div className={marketingTheme.eyebrow}>Trusted by teams taking AI visibility seriously</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
              Why companies trust MEMETIK
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { stat: "50+", label: "Brands audited" },
                { stat: "3x", label: "Average citation lift" },
                { stat: "90", label: "Day guarantee" },
                { stat: "236", label: "Articles published" },
              ].map((item, i) => (
                <MarketingCard key={i} className="p-6">
                  <div className="font-display text-4xl font-extrabold uppercase tracking-[-0.04em] text-white">{item.stat}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{item.label}</div>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>
        </MarketingContainer>
      </main>

      <MarketingFooter
        title="Stop guessing. Start measuring answer share."
        description="Your competitors are already shaping AI recommendations. See exactly where you stand and where the fastest revenue upside sits."
        ctaHref="/audit"
        ctaLabel="Get your free audit"
        note="Free analysis · no obligation · results in 24 hours"
      />
    </MarketingPage>
  );
}
