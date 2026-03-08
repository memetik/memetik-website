import { cn } from "@/lib/utils";

function StrategyAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050608]" />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.35) 75%, transparent)",
        }}
      />
      <div className="absolute left-[-12%] top-[2%] h-[30rem] w-[30rem] rounded-full bg-[#3157d8]/18 blur-[120px]" />
      <div className="absolute right-[-10%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-[#d08c4a]/15 blur-[120px]" />
      <div className="absolute bottom-[-12%] left-[12%] h-[22rem] w-[22rem] rounded-full bg-[#4f7bf5]/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[6%] h-[24rem] w-[24rem] rounded-full bg-[#f2d1a0]/8 blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)] opacity-40" />
    </div>
  );
}

export function StrategyPageFrame({
  children,
  className,
  mainClassName,
}: {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-screen w-full overflow-x-hidden bg-background text-foreground selection:bg-[#f4e4cd] selection:text-[#090b0d] font-sans",
        className
      )}
    >
      <StrategyAtmosphere />
      <main className={cn("relative z-10 px-4 pt-24 pb-24 sm:px-6 sm:pt-28 sm:pb-32 md:px-10 lg:px-12", mainClassName)}>{children}</main>
    </div>
  );
}
