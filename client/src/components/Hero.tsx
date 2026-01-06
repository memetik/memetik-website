export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background text-foreground">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--color-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-foreground)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-[0.04]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-24 pb-12">
        
        {/* Top Row - LAB Badge and Technical Info */}
        <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
          {/* LAB Badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-3 gap-[2px]">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-foreground"></div>
                ))}
              </div>
              <span className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight">LAB</span>
            </div>
          </div>
          
          {/* Center Technical Text */}
          <div className="hidden md:flex flex-col items-center gap-1 font-mono text-xs uppercase tracking-widest text-foreground/60">
            <span>UNITED STATES OF AMERICA</span>
            <div className="flex items-center gap-4">
              <span>ROBOTIC DEVELOPMENT GROUP</span>
              <span className="text-foreground/30">✦</span>
              <span>EXPERIMENTAL AUTONOMOUS UNITS</span>
            </div>
          </div>
          
          {/* Right Logo Area */}
          <div className="hidden lg:flex flex-col items-end font-mono text-xs uppercase tracking-wider">
            <div className="text-2xl font-display font-black tracking-tight mb-1">RCA</div>
            <div className="text-[10px] text-foreground/60">Reindustrializing Center</div>
            <div className="text-[10px] text-foreground/60">of America — U.S.A.</div>
          </div>
        </div>

        {/* Second Row - Subtitles */}
        <div className="flex flex-wrap items-center gap-4 mb-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          <span className="text-foreground/70">AUTONOMY FOR AI VISIBILITY</span>
          <span className="text-foreground/40">&gt;&gt;&gt;</span>
          <span className="text-foreground/70">USA</span>
          <div className="flex-grow"></div>
          <span className="hidden sm:inline text-foreground/50">BADGE ID: MTK-01-CTRL</span>
        </div>

        {/* Built to Endure Row */}
        <div className="flex flex-wrap items-center gap-3 mb-8 font-mono text-[10px] uppercase tracking-widest">
          <span className="text-foreground/70">BUILT TO ENDURE</span>
          <div className="w-5 h-5 border-2 border-foreground flex items-center justify-center text-[8px] font-bold">R</div>
          <div className="bg-foreground text-background px-3 py-1 font-bold">ADVANCED TECH OPS</div>
          <div className="flex-grow"></div>
          <span className="hidden sm:inline text-foreground/50">FIELD ZONE: GLOBAL DIGITAL CORRIDOR</span>
        </div>

        {/* Divider with dots */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-foreground/30 rounded-full"></div>
            ))}
          </div>
          <div className="flex-grow border-t border-foreground/20"></div>
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-foreground/30 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left - Research Unit Card */}
          <div className="border-2 border-foreground p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="font-mono text-xs uppercase tracking-widest">
                <div className="flex items-center gap-2 mb-2">
                  <span>INTERNAL</span>
                  <span className="bg-foreground text-background px-2 py-0.5 font-bold">DEPLOYED</span>
                </div>
                <span className="text-foreground/60">RESEARCH UNIT</span>
              </div>
              <div className="w-12 h-12 border-2 border-foreground rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-foreground rounded-full"></div>
              </div>
            </div>
            <div className="font-serif text-sm text-foreground/70 border-t border-foreground/20 pt-4">
              Reindustrializing Center of America
            </div>
          </div>

          {/* Right - FUEL Card */}
          <div className="border-2 border-foreground p-6 bg-foreground text-background">
            <div className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-2">MEMETIK</div>
            <div className="font-serif text-lg sm:text-xl italic mb-4">For Autonomous AI Visibility</div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider mb-4">
              <span className="text-background/60">CERTIFIED FOR OPERATIONS</span>
              <span className="border border-background/40 px-2 py-0.5">TESTED</span>
            </div>
            <div className="flex flex-wrap items-center justify-between text-[10px] font-mono uppercase tracking-wider text-background/60">
              <span>VISIBILITY SYSTEMS</span>
              <span>/</span>
              <span>UNITED STATES OF AMERICA</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center gap-1 border border-background/40 px-2 py-1">
                <span className="text-[10px]">✕</span>
              </div>
              <div className="bg-background text-foreground px-3 py-1 text-[10px] font-bold uppercase">LLM OPTIMIZATION</div>
              <div className="border border-background/40 px-3 py-1 text-[10px] font-bold uppercase">MISSION-GRADE</div>
              <div className="border border-background/40 px-3 py-1 text-[10px] font-bold uppercase">AEO</div>
            </div>
          </div>
        </div>

        {/* OPS 2026 Row */}
        <div className="border-2 border-foreground p-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              <div>GRASS ROOTS // SPECIAL OPERATIONS MISSION LOG</div>
              <div>SECURE CHANNEL ESTABLISHED...</div>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-foreground/20">
              AI OPS 2026
            </div>
          </div>
        </div>

        {/* Bottom Grid - Delivery Systems */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="border-2 border-foreground p-3">
            <div className="font-mono text-[10px] uppercase tracking-wider mb-2">[DELIVERY SYSTEMS]</div>
            <div className="flex gap-1">
              <div className="w-6 h-6 border border-foreground rounded-full"></div>
              <div className="w-6 h-6 border border-foreground rounded-full"></div>
              <div className="w-6 h-6 border border-foreground rounded-full"></div>
            </div>
          </div>
          
          <div className="border-2 border-foreground p-3 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-1 h-4 bg-foreground"></div>
                <div className="w-1 h-4 bg-foreground"></div>
                <div className="w-1 h-4 bg-foreground"></div>
              </div>
              <span className="font-mono text-xs">Made for the<br/>Digital Age</span>
            </div>
          </div>
          
          <div className="border-2 border-foreground p-3">
            <div className="font-mono text-[10px] uppercase tracking-wider font-bold">ENGINEERED FOR</div>
            <div className="font-mono text-[10px] uppercase tracking-wider font-bold">AI SUCCESS</div>
            <div className="text-[10px] font-mono mt-2 text-foreground/60">MORE VISIBILITY</div>
            <div className="text-[10px] font-mono text-foreground/60">MORE CITATIONS</div>
          </div>
          
          <div className="border-2 border-foreground p-3">
            <div className="font-mono text-[10px] uppercase tracking-wider mb-1">MEMETIK LAB</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/60">NEW YORK — NEW YORK</div>
          </div>
          
          <div className="border-2 border-foreground p-3 bg-foreground text-background">
            <div className="font-mono text-[10px] uppercase tracking-wider font-bold">2026</div>
            <div className="font-mono text-[10px] uppercase tracking-wider">STATUS</div>
            <div className="text-lg font-display font-black mt-1">INITIATED</div>
            <div className="font-mono text-[10px] uppercase tracking-wider">LOCKED IN</div>
          </div>
          
          <div className="border-2 border-foreground p-3">
            <div className="font-mono text-[10px] uppercase tracking-wider font-bold mb-2">American</div>
            <div className="font-mono text-[10px] uppercase tracking-wider font-bold">Dynamism</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-xs font-bold border border-foreground px-1">FWD</div>
              <div className="w-4 h-4 border border-foreground"></div>
            </div>
          </div>
        </div>

        {/* Made in USA Bar */}
        <div className="flex flex-wrap items-center gap-4 border-2 border-foreground p-3">
          <div className="bg-foreground text-background px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            MADE IN THE U.S.A.
            <span>&gt;&gt;&gt;</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/60">ZERO DOWNTIME MANUFACTURING</div>
          <div className="flex-grow"></div>
          <a 
            href="https://cal.com/memetik/letstalk" 
            className="bg-foreground text-background px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            LET'S TALK
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
