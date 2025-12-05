import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-black selection:text-white">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        
        <section id="agency" className="py-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center bg-neutral-100 dark:bg-neutral-900">
            <div>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight mb-8">
                    THE SEARCH BAR IS DYING. <br/>
                    <span className="text-neutral-400">THE CONVERSATION IS BEGINNING.</span>
                </h2>
            </div>
            <div className="font-mono text-sm md:text-base text-muted-foreground space-y-6 leading-relaxed">
                <p>
                    Traditional SEO focused on ranking for keywords. We focus on influencing the neural networks that now control information discovery.
                </p>
                <p>
                    For SaaS and Ecom brands, being the "recommended solution" in a ChatGPT conversation is the new #1 ranking. We engineer the semantic structures that ensure your brand is the answer, not just a link.
                </p>
            </div>
        </section>

        <Services />
        <ProjectGrid />
        
        <footer className="bg-black text-white py-24 px-6 md:px-12 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-8xl font-display font-bold tracking-tighter mb-8">MEMETIK</h2>
                    <p className="font-mono text-sm text-neutral-500 max-w-md">
                        The world's first agency dedicated to LLM SEO and Generative Engine Optimization.
                    </p>
                </div>
                <div className="col-span-1 flex flex-col gap-4 font-mono text-sm text-neutral-400">
                    <span>SAN FRANCISCO</span>
                    <span>NEW YORK</span>
                    <span>TOKYO</span>
                </div>
                <div className="col-span-1 flex flex-col gap-4 font-mono text-sm text-neutral-400">
                    <a href="#" className="hover:text-white">TWITTER</a>
                    <a href="#" className="hover:text-white">INSTAGRAM</a>
                    <a href="#" className="hover:text-white">LINKEDIN</a>
                </div>
            </div>
            <div className="mt-24 pt-8 border-t border-white/10 flex justify-between font-mono text-xs text-neutral-500">
                <span>© 2025 MEMETIK AGENCY</span>
                <span>ALL RIGHTS RESERVED</span>
            </div>
        </footer>
      </main>
    </div>
  );
}
