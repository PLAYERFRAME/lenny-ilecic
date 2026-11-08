import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, BarChart3, Play, Route } from 'lucide-react';
import { useRef } from 'react';
import { getAge, photos, profile, season } from '../data/player';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const age = getAge();

  const snapshot = [
    { k: 'Position', v: profile.primaryPosition.code, s: profile.secondaryPositions.map((p) => p.code).join(' · ') },
    { k: 'Age', v: String(age), s: profile.dateOfBirthLabel },
    { k: 'Nationality', v: profile.nationality, s: 'HRV' },
    { k: 'Foot', v: profile.preferredFoot, s: 'Preferred' },
    { k: 'Height', v: `${profile.heightCm}`, s: 'cm' },
    { k: 'Club', v: profile.currentClub, s: profile.league },
    { k: 'Contract', v: '05/2028', s: `Until ${profile.contractExpiry}` },
    { k: 'Market value', v: profile.marketValue.display, s: profile.marketValue.source },
  ];

  return (
    <section
      id="overview"
      ref={ref}
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Photography */}
      <motion.div className="absolute inset-x-0 top-0 -z-10 h-[82svh] md:inset-0 md:h-auto" style={{ y: imgY, scale: imgScale }}>
        <picture>
          <source media="(min-width: 768px)" srcSet={photos.heroNight} />
          <img
            src={photos.portraitCrowd}
            alt="Lenny Ilečić in match action for NK Rudeš under floodlights"
            className="h-full w-full object-cover object-[50%_18%] md:object-[78%_30%] lg:ml-auto lg:w-[66%] lg:[mask-image:linear-gradient(to_right,transparent,black_38%)]"
            fetchPriority="high"
          />
        </picture>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/80 to-transparent md:hidden" />
      </motion.div>
      {/* Light & gradient treatment */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10 md:bg-gradient-to-r md:from-ink md:via-ink/80 md:to-ink/0" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-ice-deep/20 blur-[140px]" />

      <div className="shell flex flex-1 flex-col justify-end pb-8 pt-[56svh] md:justify-center md:pb-10 md:pt-28">
        <motion.p
          className="label mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
          </span>
          Player Dossier · Season {season.label}
        </motion.p>

        <h1 id="hero-title" className="display flex flex-col gap-[0.02em] text-[clamp(4.2rem,14vw,10.5rem)] !font-semibold text-bone">
          {[profile.firstName, profile.lastName].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.02em] pt-[0.13em] leading-[0.92]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          className="mt-6 max-w-xl"
        >
          <p className="display-wide text-[clamp(0.95rem,2vw,1.25rem)] text-bone">
            Right Winger <span className="text-ice">/</span> Forward
          </p>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-mist">
            {profile.nationality} <span className="px-1.5 text-ice">•</span> {profile.currentClub}{' '}
            <span className="px-1.5 text-ice">•</span> {age} years old
          </p>
        </motion.div>

        {/* Headline metrics */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
          className="mt-9 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3"
        >
          <div className="flex flex-col-reverse">
            <dt className="label mt-1">
              Top speed
              <span className="block text-haze">Player-provided</span>
            </dt>
            <dd className="display num text-[clamp(2.4rem,5vw,3.5rem)] text-ice">
              {profile.topSpeed.value.toFixed(1)}
              <span className="ml-1 text-[0.42em] tracking-wide text-ice/80">KM/H</span>
            </dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="label mt-1">
              Market value
              <span className="block text-haze">Transfermarkt · 30.09.2026</span>
            </dt>
            <dd className="display num text-[clamp(2.4rem,5vw,3.5rem)]">{profile.marketValue.display}</dd>
          </div>
          <div className="col-span-2 flex flex-col-reverse sm:col-span-1">
            <dt className="label mt-1">
              Academy
              <span className="block text-haze">Development</span>
            </dt>
            <dd className="display text-[clamp(1.5rem,2.6vw,1.9rem)] leading-[0.95]">
              GNK Dinamo
              <br />
              Zagreb
            </dd>
          </div>
        </motion.dl>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <a href="#highlights" className="btn-primary">
            <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Watch highlights
          </a>
          <a href="#career" className="btn-ghost">
            <Route className="h-4 w-4" aria-hidden="true" /> Explore career
          </a>
          <a href="#performance" className="btn-ghost">
            <BarChart3 className="h-4 w-4" aria-hidden="true" /> View player stats
          </a>
        </motion.div>
      </div>

      {/* Scout snapshot — the 10-second read */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.05 }}
        className="relative border-t hairline bg-ink-900"
      >
        <div className="shell">
          <h2 className="sr-only">Scout snapshot</h2>
          <dl className="-mx-4 grid grid-cols-2 gap-px bg-white/[0.07] sm:grid-cols-4 xl:grid-cols-8">
            {snapshot.map((s) => (
              <div key={s.k} className="flex flex-col gap-1 bg-ink-900 px-4 py-4">
                <dt className="label !text-[10px]">{s.k}</dt>
                <dd className="text-[15px] font-semibold leading-tight text-bone">
                  {s.v}
                  <span className="mt-0.5 block font-mono text-[10.5px] font-normal uppercase tracking-[0.08em] text-mist">{s.s}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      <a
        href="#academy"
        className="absolute bottom-28 right-6 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-label text-mist transition-colors hover:text-ice xl:flex"
      >
        Scroll <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </section>
  );
}
