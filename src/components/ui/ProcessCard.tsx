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
  const desktopOffset = index % 2 === 1 ? "md:translate-y-8" : "";

  return (
    <div
      className={`rounded-[28px] bg-white border border-[#E6E6E8] p-8 flex flex-col justify-between transition-transform duration-200 ease-out hover:-translate-y-1 ${desktopOffset}`}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[28px] font-bold text-[#0C0C0D] tracking-tight">
          {step.number}
        </span>
        <div className="w-10 h-10 rounded-full bg-[#FDECEC] flex items-center justify-center text-[#C1272D]">
          <span className="text-[14px] font-bold">✦</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[22px] font-semibold text-[#0C0C0D] tracking-tight">
          {step.title}
        </h3>
        <p className="text-[15px] sm:text-[16px] text-[#6E6E73] leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  );
}
