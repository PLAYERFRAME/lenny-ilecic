import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';
import { academy } from '../data/player';
import Placeholder from './ui/Placeholder';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

export default function Academy() {
  const pathRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: pathRef, offset: ['start 75%', 'end 55%'] });

  return (
    <section id="academy" aria-labelledby="academy-title" className="relative overflow-hidden border-t hairline py-24 md:py-36">
      {/* Oversized backdrop word */}
      <div
        aria-hidden="true"
        className="display pointer-events-none absolute -right-10 top-10 select-none text-[28vw] leading-none text-transparent opacity-[0.05] md:top-0"
        style={{ WebkitTextStroke: '2px #8FD3FF' }}
      >
        Dinamo
      </div>

      <div className="shell relative">
        <SectionHeader
          id="academy-title"
          index="01"
          eyebrow="Academy legacy"
          title={
            <>
              Made at
              <br />
              <span className="text-ice">Dinamo</span> Zagreb
            </>
          }
          intro={academy.summary}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left: honours + pathway */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-2xl text-[clamp(1.35rem,2.4vw,1.9rem)] font-light leading-snug text-bone/90">
                The Dinamo Zagreb academy shaped his game: a national U19 title, two tournament top-scorer
                awards and appearances against <span className="text-ice">Europe’s elite academies</span>.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-12 grid grid-cols-2 border-l border-t hairline sm:grid-cols-4">
                {academy.honours.map((h) => (
                  <div key={h.value} className="group flex flex-col border-b border-r hairline p-5 transition-colors hover:bg-white/[0.03]">
                    <dt className="mt-4 text-[13px] font-medium leading-tight text-bone">
                      <span className="block whitespace-nowrap">{h.label}</span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-mist">{h.sub}</span>
                    </dt>
                    <dd className="display order-first text-[2.6rem] leading-none text-ice transition-transform duration-500 group-hover:-translate-y-1">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <h3 className="label mb-8 mt-16">Development pathway</h3>
            <ol ref={pathRef} className="relative ml-2 space-y-9 border-l border-white/10 pl-9">
              <motion.span
                aria-hidden="true"
                className="absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-ice to-ice-deep"
                style={{ scaleY: scrollYProgress }}
              />
              {academy.milestones.map((m, i) => (
                <li key={m.label} className="relative">
                  <Reveal delay={i * 0.04} y={16}>
                    <span
                      aria-hidden="true"
                      className="absolute -left-[42px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-ink bg-ice shadow-[0_0_0_4px_rgba(143,211,255,0.15)]"
                    />
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <p className="text-[17px] font-semibold text-bone">{m.label}</p>
                      {m.season && <span className="font-mono text-[11px] tracking-[0.1em] text-ice">{m.season}</span>}
                    </div>
                    <p className="mt-1.5 max-w-lg text-[14.5px] leading-relaxed text-mist">{m.detail}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: academy imagery slots */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={0.15}>
                <Placeholder
                  label="Academy photograph"
                  note="GNK Dinamo Zagreb youth — to be supplied"
                  className="aspect-[4/5] w-full rounded-sm"
                />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Placeholder label="U19 title 2022/23" note="Team photo" className="aspect-square rounded-sm" />
                  <Placeholder label="UEFA Youth League" note="Match photo" className="aspect-square rounded-sm" />
                </div>
                <p className="mt-4 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em] text-haze">
                  Image slots reserved for authentic academy photography.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
