interface StepItem {
  number: string;
  title: string;
  desc: string;
}

interface ProcessCardProps {
  step: StepItem;
  index: number;
}

export function ProcessCard({ step, index }: ProcessCardProps) {
  // Staggered top offset on desktop for an organic editorial flow
  const desktopOffset = index % 2 === 1 ? "md:translate-y-6" : "";

  return (
    <div
      className={`rounded-[8px] bg-[#171617] border border-[#262525] p-8 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#393939] ${desktopOffset}`}
    >
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-[26px] font-bold text-[#fcfcfc] tracking-tight">
          {step.number}
        </span>
        <div className="w-8 h-8 rounded-[3px] bg-[#080808] border border-[#262525] flex items-center justify-center text-[#fe1e34]">
          <span className="text-[12px] font-bold">✦</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[20px] font-bold text-[#fcfcfc] tracking-tight font-[family-name:var(--font-display)]">
          {step.title}
        </h3>
        <p className="text-[14px] text-[#b5b2b2] leading-relaxed font-light">
          {step.desc}
        </p>
      </div>
    </div>
  );
}
