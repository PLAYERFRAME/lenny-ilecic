import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = { index: string; eyebrow: string; title: ReactNode; intro?: ReactNode; id?: string };

export default function SectionHeader({ index, eyebrow, title, intro, id }: Props) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="label mb-5 flex items-center gap-3">
          <span className="text-ice">{index}</span>
          <span className="h-px w-8 bg-white/20" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className="display text-[clamp(3rem,8vw,6.5rem)] text-bone">
          {title}
        </h2>
      </div>
      {intro && <div className="max-w-md text-[15px] leading-relaxed text-mist md:col-span-5 md:justify-self-end">{intro}</div>}
    </Reveal>
  );
}
