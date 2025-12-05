import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MethodologySummary } from "@/components/MethodologySummary";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        
        <section id="agency" className="py-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center bg-background border-b border-border">
            <div>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight mb-8 text-white">
                    THE SEARCH BAR IS DYING. <br/>
                    <span className="text-muted-foreground">THE CONVERSATION IS BEGINNING.</span>
                </h2>
                <div className="w-24 h-2 bg-primary mt-8"></div>
            </div>
            <div className="font-mono text-sm md:text-base text-muted-foreground space-y-6 leading-relaxed border-l border-border pl-6">
                <p>
                    Traditional SEO focused on ranking for keywords. We focus on influencing the neural networks that now control information discovery.
                </p>
                <p>
                    For SaaS and Ecom brands, being the <span className="text-accent">"recommended solution"</span> in a ChatGPT conversation is the new #1 ranking. We engineer the semantic structures that ensure your brand is the answer, not just a link.
                </p>
            </div>
        </section>

        <Services />
        <MethodologySummary />
        
        <footer className="bg-background text-white py-24 px-6 md:px-12 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-8xl font-display font-bold tracking-tighter mb-8 text-white">MEMETIK</h2>
                    <p className="font-mono text-sm text-muted-foreground max-w-md border-l-2 border-accent pl-4">
                        The world's first agency dedicated to LLM SEO and Generative Engine Optimization.
                    </p>
                </div>
                <div className="col-span-1 flex flex-col gap-4 font-mono text-sm text-muted-foreground">
                    <span className="text-white font-bold mb-2">LOCATIONS</span>
                    <span>SAN FRANCISCO</span>
                    <span>NEW YORK</span>
                    <span>TOKYO</span>
                </div>
                <div className="col-span-1 flex flex-col gap-4 font-mono text-sm text-muted-foreground">
                    <span className="text-white font-bold mb-2">CONNECT</span>
                    <a href="#" className="hover:text-primary transition-colors">TWITTER</a>
                    <a href="#" className="hover:text-primary transition-colors">INSTAGRAM</a>
                    <a href="#" className="hover:text-primary transition-colors">LINKEDIN</a>
                </div>
            </div>
            <div className="mt-24 pt-8 border-t border-border flex justify-between font-mono text-xs text-muted-foreground">
                <span>© 2025 MEMETIK AGENCY</span>
                <span className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   SYSTEMS OPERATIONAL
                </span>
            </div>
        </footer>
      </main>
    </div>
  );
}
