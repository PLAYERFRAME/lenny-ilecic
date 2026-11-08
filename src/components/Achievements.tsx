import { AnimatePresence, motion } from 'motion/react';
import { Award, Film, Newspaper, Trophy, Zap } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';
import { achievements, type Achievement } from '../data/player';
import Placeholder from './ui/Placeholder';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

const icons: Record<Achievement['category'], typeof Award> = {
  'Individual award': Award,
  'Team title': Trophy,
  'Match performance': Zap,
  Competition: Trophy,
};

export default function Achievements() {
  const [activeId, setActiveId] = useState(achievements[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = achievements.find((a) => a.id === activeId)!;
  const Icon = icons[active.category];

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = achievements.length;
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActiveId(achievements[next].id);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative border-t hairline bg-ink-900 py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          id="achievements-title"
          index="02"
          eyebrow="Goalscoring recognition"
          title={
            <>
              Honours &amp;
              <br />
              <span className="text-ice">golden boots</span>
            </>
          }
          intro="Two tournament top-scorer awards in 2022, a hat-trick against Red Star Belgrade and a national U19 title. Select an honour for details."
        />

        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div role="tablist" aria-label="Achievements" aria-orientation="vertical" className="flex flex-col lg:col-span-5">
            {achievements.map((a, i) => {
              const selected = a.id === activeId;
              return (
                <button
                  key={a.id}
                  ref={(el) => (tabs.current[i] = el)}
                  role="tab"
                  id={`ach-tab-${a.id}`}
                  aria-selected={selected}
                  aria-controls="ach-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(a.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group relative flex items-center gap-5 border-b hairline py-5 text-left transition-colors first:border-t ${
                    selected ? 'text-bone' : 'text-mist hover:text-bone'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="ach-indicator"
                      className="absolute -left-4 top-0 h-full w-[3px] bg-ice md:-left-6"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className={`w-16 shrink-0 font-mono text-[11px] tracking-[0.08em] ${selected ? 'text-ice' : ''}`}>{a.year ?? '—'}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-semibold leading-snug md:text-[17px]">{a.title}</span>
                    <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-mist">{a.award}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px w-6 shrink-0 bg-current transition-all duration-500 ${selected ? 'w-10 text-ice' : 'opacity-30 group-hover:w-10'}`}
                  />
                </button>
              );
            })}
          </div>

          <div
            id="ach-panel"
            role="tabpanel"
            aria-labelledby={`ach-tab-${active.id}`}
            className="relative min-h-[460px] overflow-hidden rounded-sm border hairline bg-gradient-to-br from-ink-700/60 via-ink-800 to-ink lg:col-span-7"
          >
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ice-deep/20 blur-[100px]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col p-6 md:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-ice/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ice">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {active.category}
                  </span>
                  {active.year && <span className="display text-[clamp(2.5rem,6vw,4.5rem)] text-white/[0.08]">{active.year}</span>}
                </div>

                <div className="mt-8 flex items-end gap-6">
                  {active.stat && (
                    <div className="shrink-0">
                      <p className="display text-[clamp(4.5rem,11vw,8rem)] text-ice">{active.stat.value}</p>
                      <p className="label mt-1">{active.stat.label}</p>
                    </div>
                  )}
                </div>

                <h3 className="display mt-8 text-[clamp(2rem,4.2vw,3.2rem)] text-bone">{active.award}</h3>
                <p className="mt-2 text-[15px] font-medium text-bone/80">{active.title}</p>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mist">{active.description}</p>

                <div className="mt-auto grid grid-cols-3 gap-3 pt-10">
                  <Placeholder label="Photo" note="Tournament / trophy" className="aspect-[4/3] rounded-sm" compact />
                  <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-ice/25 placeholder-stripes text-center">
                    <Film className="h-4 w-4 text-ice/70" aria-hidden="true" />
                    <span className="font-mono text-[9px] uppercase tracking-label text-ice/80">Footage</span>
                  </div>
                  <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-ice/25 placeholder-stripes text-center">
                    <Newspaper className="h-4 w-4 text-ice/70" aria-hidden="true" />
                    <span className="font-mono text-[9px] uppercase tracking-label text-ice/80">Press</span>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-haze">Photos, footage and press references to be supplied</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
