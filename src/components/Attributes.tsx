import { motion, useInView } from 'motion/react';
import { BarChart2, Info, Radar as RadarIcon } from 'lucide-react';
import { lazy, Suspense, useRef, useState } from 'react';
import { attributes, photos, profile } from '../data/player';
import CountUp from './ui/CountUp';
import Reveal from './ui/Reveal';

const RadarView = lazy(() => import('./RadarView'));

const GAUGE_MAX = 40;

function SpeedGauge({ value }: { value: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  // Semicircle from 180° (0 km/h) to 360° (40 km/h); radius 100, centre (120,120)
  const r = 100;
  const cx = 120;
  const cy = 120;
  const pt = (v: number, rr = r) => {
    const a = Math.PI + (v / GAUGE_MAX) * Math.PI;
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)] as const;
  };
  const [ex, ey] = pt(GAUGE_MAX);
  const arc = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${ex} ${ey}`;
  const frac = value / GAUGE_MAX;
  const ticks = Array.from({ length: 21 }, (_, i) => i * 2);

  return (
    <svg ref={ref} viewBox="0 0 240 140" className="w-full max-w-[420px]" aria-hidden="true">
      <defs>
        <linearGradient id="speedGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#3B8DFF" />
          <stop offset="100%" stopColor="#8FD3FF" />
        </linearGradient>
      </defs>
      {ticks.map((t) => {
        const major = t % 10 === 0;
        const [x1, y1] = pt(t, r + 8);
        const [x2, y2] = pt(t, r + (major ? 16 : 12));
        return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke={major ? '#8C97AD' : '#2A3550'} strokeWidth={major ? 1.4 : 1} />;
      })}
      {[0, 10, 20, 30, 40].map((t) => {
        const [x, y] = pt(t, r - 16);
        return (
          <text key={t} x={x} y={y + 3} textAnchor="middle" fill="#5A6580" fontSize="8" fontFamily="JetBrains Mono, monospace">
            {t}
          </text>
        );
      })}
      <path d={arc} fill="none" stroke="#1A253D" strokeWidth="6" strokeLinecap="round" />
      <motion.path
        d={arc}
        fill="none"
        stroke="url(#speedGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? frac : 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export default function Attributes() {
  const [mode, setMode] = useState<'bars' | 'radar'>('bars');

  return (
    <section id="attributes" aria-labelledby="attributes-title" className="relative border-t hairline bg-ink-900 py-24 md:py-36">
      <div className="shell">
        <Reveal className="mb-12 md:mb-16">
          <p className="label mb-5 flex items-center gap-3">
            <span className="text-ice">04</span>
            <span className="h-px w-8 bg-white/20" aria-hidden="true" />
            Scouting profile
          </p>
          <h2 id="attributes-title" className="display text-[clamp(3rem,8vw,6.5rem)]">
            Pace that
            <br />
            <span className="text-ice">breaks lines</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Top speed — feature panel */}
          <Reveal className="relative overflow-hidden rounded-sm border hairline lg:col-span-5">
            <img
              src={photos.portraitFloodlight}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[60%_20%] opacity-40"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/40" />
            <div className="relative flex h-full min-h-[520px] flex-col p-6 md:p-9">
              <p className="label !text-ice">Top speed</p>
              <div className="mt-auto">
                <SpeedGauge value={profile.topSpeed.value} />
                <p className="display num mt-3 text-[clamp(5rem,12vw,8.5rem)] text-bone">
                  <CountUp value={profile.topSpeed.value} decimals={1} duration={1.6} />
                </p>
                <p className="display-wide mt-1 text-[18px] text-ice">KM/H</p>
                <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-mist">
                  Explosive acceleration and top-end speed to attack depth, run the channels and finish transitions.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-haze">
                  <Info className="h-3.5 w-3.5" aria-hidden="true" /> Player-provided figure
                </p>
              </div>
            </div>
          </Reveal>

          {/* Ratings */}
          <Reveal delay={0.1} className="rounded-sm border hairline bg-ink p-6 md:p-9 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="label">Technical &amp; tactical attributes</h3>
              <div role="group" aria-label="Chart view" className="flex rounded-full border border-white/12 p-1">
                {(
                  [
                    ['bars', 'Bars', BarChart2],
                    ['radar', 'Radar', RadarIcon],
                  ] as const
                ).map(([id, label, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={mode === id}
                    onClick={() => setMode(id)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                      mode === id ? 'bg-bone text-ink' : 'text-mist hover:text-bone'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 min-h-[360px]">
              {mode === 'bars' ? (
                <ul className="space-y-6">
                  {attributes.items.map((a, i) => (
                    <li key={a.name}>
                      <div className="mb-2.5 flex items-baseline justify-between gap-4">
                        <span className="text-[15px] font-medium text-bone">{a.name}</span>
                        <span className="num font-mono text-[15px] text-bone">
                          <span className={a.score >= 9 ? 'text-ice' : ''}>{a.score}</span>
                          <span className="text-haze">/10</span>
                        </span>
                      </div>
                      <div className="flex gap-1" role="meter" aria-valuemin={0} aria-valuemax={10} aria-valuenow={a.score} aria-label={a.name}>
                        {Array.from({ length: 10 }, (_, s) => (
                          <motion.span
                            key={s}
                            className={`h-2 flex-1 rounded-[1px] ${s < a.score ? (a.score >= 9 ? 'bg-ice' : 'bg-bone/70') : 'bg-white/[0.07]'}`}
                            initial={{ opacity: 0.15, scaleY: 0.4 }}
                            whileInView={{ opacity: 1, scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 + s * 0.035, duration: 0.35 }}
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Suspense fallback={<div className="grid h-[360px] place-items-center font-mono text-[11px] uppercase tracking-label text-mist">Loading chart…</div>}>
                  <RadarView />
                </Suspense>
              )}
            </div>

            <div className="mt-8 flex gap-3 rounded-sm border border-ice/20 bg-ice/[0.04] p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-ice" aria-hidden="true" />
              <p className="text-[13px] leading-relaxed text-mist">
                <span className="font-semibold text-bone">{attributes.source}.</span> {attributes.disclaimer}
              </p>
            </div>

            <div className="mt-8 border-t hairline pt-6">
              <h3 className="label mb-4">Playing style</h3>
              <ul className="flex flex-wrap gap-2">
                {profile.playingStyle.map((p) => (
                  <li key={p} className="rounded-full border border-white/10 px-3.5 py-1.5 text-[12.5px] text-bone/85">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
