import { cn } from "@/lib/utils";

export function StrategySectionLead({
  takeaway,
  body,
  implication,
  className,
  children,
}: {
  takeaway?: React.ReactNode;
  body?: React.ReactNode;
  implication?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  const lead = takeaway ?? children;

  return (
    <div className={cn("mb-8 max-w-4xl", className)}>
      {lead ? <p className="text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">{lead}</p> : null}
      {body ? <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 md:text-base">{body}</p> : null}
      {implication ? (
        <div className="mt-5 inline-flex max-w-3xl rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/72">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">So what</span>
          <span>{implication}</span>
        </div>
      ) : null}
    </div>
  );
}
