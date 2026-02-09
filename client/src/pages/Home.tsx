import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Differentiation } from "@/components/Differentiation";
import { MethodologySummary } from "@/components/MethodologySummary";
import { Guarantee } from "@/components/Guarantee";
import { Qualification } from "@/components/Qualification";
import { FAQ } from "@/components/FAQ";
import { EmailCapture } from "@/components/EmailCapture";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "MEMETIK | AEO & SEO Agency";
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <MobileStickyCTA />
      <main>
        <Hero />
        <Services />
        <Differentiation />
        <MethodologySummary />
        <Guarantee />
        <Qualification />
        <FAQ />
        <EmailCapture />
        
        {/* FOOTER */}
        <footer className="bg-foreground text-background py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            
            {/* Final CTA Section */}
            <div className="text-center mb-16 pb-16 border-b border-background/15">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4 text-background">
                Stop Losing Deals to AI.
              </h2>
              <p className="text-base text-background/60 mb-8 max-w-xl mx-auto">
                Every day you wait, competitors are training LLMs to recommend them instead of you.
              </p>
              <a 
                href="https://cal.com/memetik/letstalk" 
                className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
              >
                GET YOUR FREE AI VISIBILITY AUDIT
                <span>→</span>
              </a>
              <p className="font-mono text-xs text-background/40 mt-4 uppercase">
                See exactly where you rank vs competitors · 30-min call
              </p>
            </div>
            
            {/* Footer Links */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-background/40 mb-4">For You</h4>
                <ul className="space-y-2">
                  <li><a href="/for/saas-founders" className="text-sm text-background/70 hover:text-background transition-colors">SaaS Founders</a></li>
                  <li><a href="/for/marketing-leaders" className="text-sm text-background/70 hover:text-background transition-colors">Marketing Leaders</a></li>
                  <li><a href="/for/ecommerce-brands" className="text-sm text-background/70 hover:text-background transition-colors">E-commerce</a></li>
                  <li><a href="/for/b2b-services" className="text-sm text-background/70 hover:text-background transition-colors">B2B Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-background/40 mb-4">Solutions</h4>
                <ul className="space-y-2">
                  <li><a href="/solutions/chatgpt-visibility" className="text-sm text-background/70 hover:text-background transition-colors">ChatGPT Visibility</a></li>
                  <li><a href="/solutions/perplexity-citations" className="text-sm text-background/70 hover:text-background transition-colors">Perplexity Citations</a></li>
                  <li><a href="/solutions/ai-overview-ranking" className="text-sm text-background/70 hover:text-background transition-colors">AI Overview Ranking</a></li>
                  <li><a href="/solutions/competitor-displacement" className="text-sm text-background/70 hover:text-background transition-colors">Competitor Displacement</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-background/40 mb-4">Compare</h4>
                <ul className="space-y-2">
                  <li><a href="/vs/traditional-seo-agencies" className="text-sm text-background/70 hover:text-background transition-colors">vs SEO Agencies</a></li>
                  <li><a href="/vs/content-marketing-agencies" className="text-sm text-background/70 hover:text-background transition-colors">vs Content Agencies</a></li>
                  <li><a href="/vs/manual-seo" className="text-sm text-background/70 hover:text-background transition-colors">vs DIY/Manual</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-background/40 mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="/resources" className="text-sm text-background/70 hover:text-background transition-colors">Articles</a></li>
                  <li><a href="/audit" className="text-sm text-background/70 hover:text-background transition-colors">Free Audit</a></li>
                  <li><a href="#methodology" className="text-sm text-background/70 hover:text-background transition-colors">Process</a></li>
                  <li><a href="#faq" className="text-sm text-background/70 hover:text-background transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-background/40 mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="/strategy" className="text-sm text-background/70 hover:text-background transition-colors">Strategy</a></li>
                  <li><a href="/bts" className="text-sm text-background/70 hover:text-background transition-colors">Behind the Scenes</a></li>
                  <li><a href="https://cal.com/memetik/letstalk" className="text-sm text-background/70 hover:text-background transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            
            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/15">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <h3 className="text-xl font-display font-bold tracking-tight text-background">
                  MEMETIK
                </h3>
                <span className="font-mono text-xs text-background/40">Answer Engine Optimization</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  <span className="font-mono text-xs uppercase tracking-wider text-background/70">
                    Accepting clients
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-background/40">
                  © 2026 MEMETIK
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
