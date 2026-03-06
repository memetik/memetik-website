export const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="mb-8 md:mb-12 flex items-start gap-4 border-b border-white/10 pb-5 md:pb-6">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
      {number}
    </div>
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Strategy Section</div>
      <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white">{title}</h2>
    </div>
  </div>
);
