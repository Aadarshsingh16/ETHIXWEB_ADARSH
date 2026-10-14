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
    <section id="work" className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
      <div className="space-y-4 mb-10">
        <SectionLabel>{data.label}</SectionLabel>
        <TwoToneHeading
          as="h2"
          main={data.headingMain}
          fade={data.headingFade}
          size="lg"
          className="max-w-3xl"
        />
        <p className="text-[14px] text-[#6E6E73] max-w-2xl">
          {data.note}
        </p>
      </div>

      {/* Stacked Work Cards Pile */}
      <div className="relative pt-4">
        {data.projects.map((project, idx) => (
          <WorkCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
