export const PhaseBlock = ({ number, icon, label, title, children }: { number: string; icon: React.ReactNode; label: string; title: string; children: React.ReactNode }) => (
  <div className="relative">
    <span className="absolute -left-14 md:-left-26 top-0 flex h-8 w-8 items-center justify-center rounded-none bg-primary text-primary-foreground font-bold text-sm shadow-none border border-primary">{number}</span>
    <div className="mb-2 flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider">
      {icon} {label}
    </div>
    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{title}</h3>
    {children}
  </div>
);
