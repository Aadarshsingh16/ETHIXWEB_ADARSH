import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { ProcessCard } from "@/components/ui/ProcessCard";

interface StepItem {
  number: string;
  title: string;
  desc: string;
}

interface ProcessData {
  label: string;
  headingMain: string;
  headingFade: string;
  steps: StepItem[];
}

interface ProcessSectionProps {
  data: ProcessData;
}

export function ProcessSection({ data }: ProcessSectionProps) {
  return (
    <section id="process" className="max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-28">
      <div className="space-y-4 mb-12">
        <SectionLabel>{data.label}</SectionLabel>
        <TwoToneHeading
          as="h2"
          main={data.headingMain}
          fade={data.headingFade}
          size="lg"
          className="max-w-3xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.steps.map((step, idx) => (
          <ProcessCard key={step.number} step={step} index={idx} />
        ))}
      </div>
    </section>
  );
}
