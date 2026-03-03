import { Link } from "wouter";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Nav />
      <div className="pt-32 pb-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight mb-4">404</h1>
          <p className="text-lg text-foreground/60 mb-8">This page doesn't exist.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
