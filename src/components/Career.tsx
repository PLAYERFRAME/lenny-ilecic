import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';
import { career } from '../data/player';
import Placeholder from './ui/Placeholder';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

function Crest({ monogram, active }: { monogram: string; active: boolean }) {
  return (
    <span
      className={`display-wide grid h-14 w-14 shrink-0 place-items-center rounded-full border text-[13px] transition-all duration-500 ${
        active ? 'border-ice bg-ice text-ink shadow-[0_0_0_6px_rgba(143,211,255,0.12)]' : 'border-white/20 bg-ink text-bone'
      }`}
      title="Club crest to be supplied"
    >
      {monogram}
    </span>
  );
}

export default function Career() {
  const currentIndex = Math.max(0, career.findIndex((c) => c.current));
  const [index, setIndex] = useState(currentIndex);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const entry = career[index];

  const go = (i: number) => setIndex((i + career.length) % career.length);
  const onKey = (e: KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % career.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + career.length) % career.length;
    if (next >= 0) {
      e.preventDefault();
      setIndex(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section id="career" aria-labelledby="career-title" className="relative border-t hairline py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          id="career-title"
          index="05"
          eyebrow="Professional career"
          title={
            <>
              The
              <br />
              <span className="text-ice">pathway</span>
            </>
          }
          intro="From the Dinamo Zagreb academy to senior football in the Croatian First Division. Select a club to see the detail."
        />

        {/* Timeline track */}
        <Reveal>
          <div role="tablist" aria-label="Career clubs" className="relative grid gap-3 md:grid-cols-3 md:gap-0">
            <div aria-hidden="true" className="absolute left-7 right-7 top-7 hidden h-px bg-white/10 md:block" />
            <motion.div
              aria-hidden="true"
              className="absolute left-7 top-7 hidden h-px origin-left bg-ice md:block"
              initial={false}
              animate={{ width: `calc(${(index / (career.length - 1)) * 100}% - ${(index / (career.length - 1)) * 56}px)` }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            {career.map((c, i) => {
              const selected = i === index;
              return (
                <button
                  key={c.id}
                  ref={(el) => (tabs.current[i] = el)}
                  role="tab"
                  id={`career-tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="career-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group relative flex items-center gap-4 rounded-sm border p-3 text-left transition-colors md:flex-col md:items-start md:border-0 md:p-0 md:pr-6 ${
                    selected ? 'border-ice/40 bg-white/[0.03] md:bg-transparent' : 'border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <Crest monogram={c.monogram} active={selected} />
                  <span className="min-w-0 md:mt-5">
                    <span className={`block font-mono text-[11px] uppercase tracking-[0.12em] ${selected ? 'text-ice' : 'text-mist'}`}>
                      {c.period}
                      {c.current && <span className="ml-2 rounded-full bg-ice/15 px-2 py-0.5 text-[9px] text-ice">Current</span>}
                    </span>
                    <span className={`mt-1 block text-[17px] font-semibold leading-snug transition-colors md:text-[20px] ${selected ? 'text-bone' : 'text-bone/70 group-hover:text-bone'}`}>
                      {c.club}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-mist">{c.level}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Detail panel */}
        <div id="career-panel" role="tabpanel" aria-labelledby={`career-tab-${entry.id}`} className="mt-12 md:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-8 overflow-hidden rounded-sm border hairline bg-ink-900 md:grid-cols-12"
            >
              <div className="relative md:col-span-5">
                {entry.photo ? (
                  <img src={entry.photo} alt={`Lenny Ilečić playing for ${entry.club}`} loading="lazy" className="h-full max-h-[460px] min-h-[280px] w-full object-cover object-[45%_center]" />
                ) : (
                  <Placeholder label={`${entry.club} photograph`} note="To be supplied" className="h-full min-h-[280px] w-full" />
                )}
              </div>
              <div className="flex flex-col p-6 md:col-span-7 md:py-10 md:pl-2 md:pr-10">
                <p className="label">{entry.period}</p>
                <h3 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)]">{entry.club}</h3>
                <p className="mt-3 inline-flex items-start gap-2 text-[13.5px] text-mist">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ice" aria-hidden="true" /> {entry.competition}
                </p>
                <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-bone/90">{entry.summary}</p>
                <ul className="mt-6 space-y-2.5">
                  {entry.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[14.5px] text-mist">
                      <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-ice" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-2 pt-10">
                  <button type="button" onClick={() => go(index - 1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-ice hover:text-ice" aria-label="Previous club">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => go(index + 1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-ice hover:text-ice" aria-label="Next club">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="ml-3 font-mono text-[11px] tracking-[0.1em] text-mist">
                    {String(index + 1).padStart(2, '0')} / {String(career.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
