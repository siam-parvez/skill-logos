import SectionContainer from '@/components/layout/section-container';
import IconCreator from '@/components/home/icon-creator';
import skillIcons from '@/lib/skill-icons';

export default function Home() {
  return (
    <>
      <SectionContainer className="overflow-hidden border-b pt-10 pb-14 md:pt-18 md:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10" />
        <div className="animate-in fade-in slide-in-from-bottom-2 mx-auto max-w-4xl text-center duration-700">
          <p className="text-primary mb-4 text-xs font-semibold tracking-[0.25em] uppercase">
            Faster Skill Logos Builder
          </p>
          <h1 className="text-foreground text-3xl font-black text-balance md:text-5xl">
            Build a clean skill wall for your GitHub profile in seconds.
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-sm leading-relaxed md:text-base">
            Pick from the available logo set, preview your generated SVG instantly, and copy a
            ready-to-paste snippet for your README, profile, or repository docs.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
            <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 font-medium">
              {skillIcons.iconNameList.length}+ icons
            </span>
            <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 font-medium">
              Theme aware
            </span>
            <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 font-medium">
              Zero setup
            </span>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="py-8 md:py-12">
        <IconCreator iconNames={skillIcons.iconNameList} />
      </SectionContainer>
    </>
  );
}
