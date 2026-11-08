import { motion } from 'motion/react';
import { useState } from 'react';
import { combinedStats, photos, season, type StatLine } from '../data/player';
import CountUp from './ui/CountUp';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

type View = { id: string; label: string; stats: StatLine };

const fmt = (n: number, d = 0) => (Number.isFinite(n) ? n.toFixed(d) : '—');

export default function Performance() {
  const combined = combinedStats();
  const views: View[] = [
    { id: 'all', label: 'All competitions', stats: combined },
    ...season.competitions.map((c) => ({ id: c.id, label: c.name, stats: c.stats })),
  ];
  const [viewId, setViewId] = useState('all');
  const view = views.find((v) => v.id === viewId)!;
  const s = view.stats;
  const ga = s.goals + s.assists;

  const primary = [
    { label: 'Appearances', value: s.appearances },
    { label: 'Goals', value: s.goals },
    { label: 'Assists', value: s.assists },
    { label: 'Minutes', value: s.minutes },
  ];

  const derived = [
    { label: 'Goal contributions', value: String(ga), hint: 'Goals + assists' },
    { label: 'Mins per G/A', value: ga ? fmt(s.minutes / ga) : '—', hint: 'Minutes ÷ (G+A)' },
    { label: 'G+A per 90', value: s.minutes ? fmt((ga / s.minutes) * 90, 2) : '—', hint: '(G+A) ÷ minutes × 90' },
    { label: 'Goals per 90', value: s.minutes ? fmt((s.goals / s.minutes) * 90, 2) : '—', hint: 'Goals ÷ minutes × 90' },
  ];

  return (
    <section id="performance" aria-labelledby="performance-title" className="relative overflow-hidden border-t hairline py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          id="performance-title"
          index="03"
          eyebrow={`Season ${season.label} · ${season.club}`}
          title={
            <>
              Current
              <br />
              <span className="text-ice">season</span>
            </>
          }
          intro={
            <>
              Senior figures for {season.club} in the SuperSport HNL, Croatia’s top division, and the Croatian Cup.{' '}
              <span className="text-bone/70">{season.note}.</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div role="tablist" aria-label="Competition" className="no-scrollbar -mx-1 mb-10 flex gap-2 overflow-x-auto px-1">
                {views.map((v) => {
                  const selected = v.id === viewId;
                  return (
                    <button
                      key={v.id}
                      role="tab"
                      aria-selected={selected}
                      aria-controls="perf-panel"
                      onClick={() => setViewId(v.id)}
                      className={`relative shrink-0 rounded-full px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                        selected ? 'text-ink' : 'border border-white/12 text-mist hover:text-bone'
                      }`}
                    >
                      {selected && (
                        <motion.span layoutId="perf-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                      )}
                      <span className="relative">{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <div id="perf-panel" role="tabpanel" aria-live="polite">
              <dl className="grid grid-cols-2 border-t hairline md:grid-cols-4">
                {primary.map((p, i) => (
                  <div
                    key={p.label}
                    className={`flex flex-col-reverse gap-2 border-b hairline py-7 ${i % 2 ? 'pl-5 md:pl-6' : 'pr-5'} ${i > 0 ? 'md:border-l md:pl-6' : ''} ${i % 2 ? 'border-l' : ''}`}
                  >
                    <dt className="label">{p.label}</dt>
                    <dd className={`display num text-[clamp(3.6rem,9vw,6.5rem)] ${p.label === 'Goals' ? 'text-ice' : 'text-bone'}`}>
                      <CountUp key={`${viewId}-${p.label}`} value={p.value} duration={p.value > 50 ? 1.6 : 1} />
                    </dd>
                  </div>
                ))}
              </dl>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
                {derived.map((d) => (
                  <div key={d.label} className="flex flex-col-reverse gap-1.5">
                    <dt>
                      <span className="block text-[13px] font-medium text-bone/85">{d.label}</span>
                      <span className="block font-mono text-[10px] tracking-[0.06em] text-haze">{d.hint}</span>
                    </dt>
                    <dd className="num font-mono text-[26px] font-medium text-bone">{d.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.1em] text-haze">Rates calculated from the season figures above.</p>
            </div>

            {/* Breakdown table */}
            <Reveal className="mt-16">
              <h3 className="label mb-4">Competition breakdown</h3>
              <div className="overflow-x-auto">
                <table className="num w-full min-w-[480px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b hairline font-mono text-[10.5px] uppercase tracking-[0.12em] text-mist">
                      <th scope="col" className="py-3 font-normal">Competition</th>
                      <th scope="col" className="py-3 text-right font-normal">Apps</th>
                      <th scope="col" className="py-3 text-right font-normal">Goals</th>
                      <th scope="col" className="py-3 text-right font-normal">Assists</th>
                      <th scope="col" className="py-3 text-right font-normal">Minutes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {season.competitions.map((c) => (
                      <tr key={c.id} className="border-b hairline">
                        <th scope="row" className="py-4 font-medium text-bone">
                          {c.name}
                          {c.id === 'hnl' && (
                            <span className="ml-2.5 whitespace-nowrap rounded-full border border-ice/30 px-2 py-0.5 align-middle font-mono text-[9.5px] font-normal uppercase tracking-[0.12em] text-ice">
                              Top division
                            </span>
                          )}
                        </th>
                        <td className="py-4 text-right text-bone/85">{c.stats.appearances}</td>
                        <td className="py-4 text-right text-bone/85">{c.stats.goals}</td>
                        <td className="py-4 text-right text-bone/85">{c.stats.assists}</td>
                        <td className="py-4 text-right text-bone/85">{c.stats.minutes}</td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <th scope="row" className="py-4 text-ice">Total</th>
                      <td className="py-4 text-right">{combined.appearances}</td>
                      <td className="py-4 text-right">{combined.goals}</td>
                      <td className="py-4 text-right">{combined.assists}</td>
                      <td className="py-4 text-right">{combined.minutes}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative hidden lg:col-span-4 lg:block">
            <figure className="relative h-full min-h-[560px] overflow-hidden rounded-sm">
              <img
                src={photos.dribbleRed}
                alt="Lenny Ilečić driving forward with the ball for NK Rudeš"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[40%_center] transition-transform duration-[1.6s] hover:scale-[1.04]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 right-5">
                <span className="label !text-bone/70">NK Rudeš · SuperSport HNL · Top division</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
