import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Nav } from "@/components/Nav";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface AuditData {
  id: string;
  slug: string;
  domain: string;
  status: string;
  ready: boolean;
  score?: {
    overall: number;
    grade: string;
    categories: Array<{
      name: string;
      score: number;
      maxScore: number;
    }>;
  };
  report?: {
    executiveSummary: string;
    categoryAnalysis: Array<{
      category: string;
      analysis: string;
      quickWins: string[];
    }>;
    topRecommendations: string[];
    contentToCreate: string[];
    competitorInsight: string;
    roadmap: {
      days30: string[];
      days60: string[];
      days90: string[];
    };
  };
  aiVisibility?: {
    queries: Array<{
      query: string;
      engines: Array<{
        engine: string;
        position: string;
        found: boolean;
      }>;
      competitors: string[];
    }>;
    claudeKnowledge?: {
      whatClaudeSays: string;
      sentiment: string;
    };
    brandAnalysis?: {
      category: string;
    };
  };
  crawl?: {
    title: string;
    description: string;
    wordCount: number;
    screenshot: string | null;
  };
  createdAt: string;
  completedAt: string;
}

function scoreColor(score: number, max: number): string {
  const pct = (score / max) * 100;
  if (pct >= 70) return "text-green-500";
  if (pct >= 40) return "text-yellow-500";
  return "text-red-500";
}

function scoreBgColor(score: number, max: number): string {
  const pct = (score / max) * 100;
  if (pct >= 70) return "bg-green-500";
  if (pct >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

function gradeColor(grade: string): string {
  if (grade.startsWith("A") || grade === "B") return "text-green-500";
  if (grade === "C") return "text-yellow-500";
  return "text-red-500";
}

function EngineStatus({ engines, engineName }: { engines: any[]; engineName: string }) {
  const engine = engines?.find((e) => e.engine === engineName);
  if (!engine) return <span className="text-foreground/30">—</span>;
  
  if (engine.position === "cited" || engine.position === "recommended") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-500 text-xs font-bold uppercase">
        <CheckCircle className="w-3 h-3" />
        Found
      </span>
    );
  }
  if (engine.position === "mentioned" || engine.found) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs font-bold uppercase">
        <AlertTriangle className="w-3 h-3" />
        Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-500 text-xs font-bold uppercase">
      <XCircle className="w-3 h-3" />
      Missing
    </span>
  );
}

export default function AuditReport() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const AUDIT_API = "https://wonderful-rebirth-production-7f52.up.railway.app";

  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function fetchAudit() {
      try {
        const res = await fetch(`${AUDIT_API}/audit/by-slug/${slug}/data`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Audit not found");
          } else {
            setError("Failed to load audit");
          }
          return;
        }
        const json = await res.json();
        setData(json);
        
        if (json.ready) {
          document.title = `AEO Audit: ${json.domain} - ${json.score?.overall}/100 | Memetik`;
        }
      } catch {
        setError("Failed to load audit");
      } finally {
        setLoading(false);
      }
    }

    fetchAudit();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-white/50" />
          <p className="font-mono text-sm text-white/50">Loading audit report...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a0a] text-[#f5f5f5]">
        <Nav />
        <div className="pt-32 pb-16 px-4 text-center">
          <h1 className="text-4xl font-display font-black uppercase mb-4">Audit Not Found</h1>
          <p className="font-mono text-white/60 mb-8">
            This audit report doesn't exist or has expired.
          </p>
          <Link href="/audit">
            <a className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-mono font-bold text-sm uppercase">
              Get Your Free Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </div>
    );
  }

  if (!data.ready) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a0a] text-[#f5f5f5]">
        <Nav />
        <div className="pt-32 pb-16 px-4 text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-white/50" />
          <h1 className="text-3xl font-display font-black uppercase mb-4">Audit in Progress</h1>
          <p className="font-mono text-white/60 mb-2">
            We're analyzing <strong className="text-white">{data.domain}</strong>
          </p>
          <p className="font-mono text-sm text-white/40">
            Status: {data.status}
          </p>
          <p className="font-mono text-xs text-white/30 mt-8">
            This page will update automatically when ready. Check your email for the link.
          </p>
        </div>
      </div>
    );
  }

  const { score, report, aiVisibility, crawl } = data;

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          body { background: white !important; color: black !important; }
        }
      `}</style>

      <Nav />

      {/* Hero / Cover */}
      <section className="pt-32 pb-16 px-4 sm:px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-xs tracking-widest text-white/40 mb-6 uppercase">
            AEO Audit Report
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight mb-6">
            {data.domain}
          </h1>

          <div className="inline-flex flex-col items-center mb-8">
            <div className="w-32 h-32 border-4 border-white/20 rounded-full flex flex-col items-center justify-center mb-4">
              <span className={`text-5xl font-display font-black ${gradeColor(score?.grade || "F")}`}>
                {score?.grade}
              </span>
            </div>
            <span className="text-2xl font-mono text-white/60">{score?.overall}/100</span>
          </div>

          <p className="font-serif text-lg text-white/60 max-w-2xl mx-auto mb-8">
            AI Search Visibility Assessment
          </p>

          <div className="flex items-center justify-center gap-4 no-print">
            <a
              href={`${AUDIT_API}/audit/by-slug/${slug}/pdf`}
              className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 font-mono text-sm text-white/70 hover:bg-white/5 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-2 font-mono font-bold text-sm uppercase"
            >
              Book Strategy Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="font-mono text-xs text-white/30 mt-8">
            Generated {new Date(data.completedAt).toLocaleDateString("en-US", { 
              year: "numeric", month: "long", day: "numeric" 
            })}
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 px-4 sm:px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-black uppercase mb-6">Executive Summary</h2>
          <p className="font-serif text-lg text-white/70 leading-relaxed">
            {report?.executiveSummary}
          </p>
        </div>
      </section>

      {/* Score Breakdown */}
      <section className="py-12 px-4 sm:px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-black uppercase mb-8">Score Breakdown</h2>
          
          <div className="space-y-4">
            {score?.categories.map((cat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm uppercase font-bold">{cat.name}</span>
                  <span className={`font-mono font-bold ${scoreColor(cat.score, cat.maxScore)}`}>
                    {cat.score}/{cat.maxScore}
                  </span>
                </div>
                <div className="h-3 bg-white/10 rounded-sm overflow-hidden">
                  <div 
                    className={`h-full ${scoreBgColor(cat.score, cat.maxScore)} transition-all duration-500`}
                    style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {crawl?.screenshot && (
            <div className="mt-8">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">Your Homepage</h4>
              <img 
                src={crawl.screenshot} 
                alt={`Screenshot of ${data.domain}`}
                className="w-full max-w-lg border border-white/10"
              />
            </div>
          )}
        </div>
      </section>

      {/* AI Visibility */}
      <section className="py-12 px-4 sm:px-6 md:px-12 border-b border-white/10 print-break">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-black uppercase mb-8">What AI Says About You</h2>
          
          {aiVisibility?.brandAnalysis?.category && (
            <p className="font-mono text-sm text-white/50 mb-4">
              Category: {aiVisibility.brandAnalysis.category}
            </p>
          )}

          {aiVisibility?.claudeKnowledge?.whatClaudeSays && (
            <div className="bg-white/5 border border-white/10 p-6 mb-8">
              <div className="font-mono text-xs uppercase tracking-wider text-white/40 mb-3">
                Claude's Knowledge ({aiVisibility.claudeKnowledge.sentiment})
              </div>
              <p className="font-serif text-lg italic text-white/80 leading-relaxed">
                "{aiVisibility.claudeKnowledge.whatClaudeSays}"
              </p>
            </div>
          )}

          <h3 className="text-lg font-display font-black uppercase mb-4">AI Search Query Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-mono text-xs uppercase text-white/50">Query</th>
                  <th className="text-center py-3 px-2 font-mono text-xs uppercase text-white/50">Perplexity</th>
                  <th className="text-center py-3 px-2 font-mono text-xs uppercase text-white/50">ChatGPT</th>
                  <th className="text-center py-3 px-2 font-mono text-xs uppercase text-white/50">Claude</th>
                  <th className="text-left py-3 px-4 font-mono text-xs uppercase text-white/50">Competitors</th>
                </tr>
              </thead>
              <tbody>
                {aiVisibility?.queries.slice(0, 10).map((q, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 font-mono text-xs text-white/70">{q.query}</td>
                    <td className="py-3 px-2 text-center">
                      <EngineStatus engines={q.engines} engineName="perplexity" />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <EngineStatus engines={q.engines} engineName="chatgpt" />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <EngineStatus engines={q.engines} engineName="claude" />
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-white/50">
                      {q.competitors?.slice(0, 2).join(", ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {report?.competitorInsight && (
            <div className="mt-8">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-3">Competitor Insight</h4>
              <p className="font-serif text-white/70">{report.competitorInsight}</p>
            </div>
          )}
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="py-12 px-4 sm:px-6 md:px-12 border-b border-white/10 print-break">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-black uppercase mb-8">Detailed Analysis</h2>
          
          <div className="space-y-6">
            {report?.categoryAnalysis.map((cat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-display font-black uppercase mb-3">{cat.category}</h3>
                <p className="font-serif text-white/70 mb-4">{cat.analysis}</p>
                
                {cat.quickWins && cat.quickWins.length > 0 && (
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Quick Wins</h4>
                    <ul className="space-y-1">
                      {cat.quickWins.map((win, j) => (
                        <li key={j} className="font-mono text-sm text-white/60 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {win}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-12 px-4 sm:px-6 md:px-12 border-b border-white/10 print-break">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-black uppercase mb-8">Top Recommendations</h2>
          
          <div className="space-y-3">
            {report?.topRecommendations.map((rec, i) => (
              <div key={i} className="bg-white/5 border border-white/10 border-l-4 border-l-white/30 p-4 flex items-start gap-4">
                <span className="font-mono font-bold text-white/40">{i + 1}</span>
                <span className="font-mono text-sm text-white/80">{rec}</span>
              </div>
            ))}
          </div>

          {report?.contentToCreate && report.contentToCreate.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-display font-black uppercase mb-8">Content to Create</h2>
              <div className="space-y-3">
                {report.contentToCreate.map((content, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 border-l-4 border-l-white/30 p-4 flex items-start gap-4">
                    <span className="font-mono font-bold text-white/40">{i + 1}</span>
                    <span className="font-mono text-sm text-white/80">{content}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-12 px-4 sm:px-6 md:px-12 border-b border-white/10 print-break">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-black uppercase mb-8">Your 90-Day AEO Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-lg font-display font-black uppercase mb-4 text-green-500">
                Days 1-30: Foundation
              </h3>
              <ul className="space-y-2">
                {report?.roadmap.days30.map((item, i) => (
                  <li key={i} className="font-mono text-sm text-white/70 flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-lg font-display font-black uppercase mb-4 text-yellow-500">
                Days 31-60: Build
              </h3>
              <ul className="space-y-2">
                {report?.roadmap.days60.map((item, i) => (
                  <li key={i} className="font-mono text-sm text-white/70 flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-lg font-display font-black uppercase mb-4 text-red-500">
                Days 61-90: Scale
              </h3>
              <ul className="space-y-2">
                {report?.roadmap.days90.map((item, i) => (
                  <li key={i} className="font-mono text-sm text-white/70 flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 no-print">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-xs tracking-widest text-white/40 mb-6 uppercase">
            Memetik
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase mb-4">
            Ready to Own Your AI Search Results?
          </h2>
          <p className="font-serif text-lg text-white/60 max-w-xl mx-auto mb-8">
            This audit identified {report?.topRecommendations.length || 0} high-impact opportunities. 
            Let's build your AEO strategy.
          </p>
          <a
            href="https://cal.com/memetik/letstalk"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Book a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="font-mono text-xs text-white/30 mt-6">
            memetik.ai
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 md:px-12 border-t border-white/10 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <a className="font-display font-black text-xl uppercase">MEMETIK</a>
          </Link>
          <div className="font-mono text-xs text-white/40 uppercase">
            &copy; 2026 MEMETIK
          </div>
        </div>
      </footer>
    </div>
  );
}
