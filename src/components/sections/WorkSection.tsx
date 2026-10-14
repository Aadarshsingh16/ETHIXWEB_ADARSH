import { SectionLabel } from "@/components/ui/SectionLabel";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { WorkCard } from "@/components/ui/WorkCard";

interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  badge: string;
}

interface WorkData {
  label: string;
  headingMain: string;
  headingFade: string;
  note: string;
  projects: ProjectItem[];
}

interface WorkSectionProps {
  data: WorkData;
}

export function WorkSection({ data }: WorkSectionProps) {
  return (
    <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
      <div className="space-y-4 mb-12">
        <SectionLabel hasDot={true}>{data.label}</SectionLabel>
        <TwoToneHeading
          as="h2"
          main={data.headingMain}
          fade={data.headingFade}
          size="lg"
          className="max-w-4xl"
          italicFade={true}
        />
        <p className="text-[14px] font-mono uppercase tracking-[0.16em] text-[#b5b2b2] max-w-2xl">
          {data.note}
        </p>
      </div>

      {/* Stacked Work Cards Pile — 8px Radius Editorial Gallery Presentation */}
      <div className="relative pt-4">
        {data.projects.map((project, idx) => (
          <WorkCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
