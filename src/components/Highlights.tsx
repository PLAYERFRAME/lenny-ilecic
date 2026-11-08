import { AnimatePresence, motion } from 'motion/react';
import { Clapperboard, Play } from 'lucide-react';
import { useState } from 'react';
import { videos } from '../data/player';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

export default function Highlights() {
  const [activeId, setActiveId] = useState(videos[0].id);
  const active = videos.find((v) => v.id === activeId)!;
  const ready = videos.filter((v) => v.src).length;

  return (
    <section id="highlights" aria-labelledby="highlights-title" className="relative border-t hairline py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          id="highlights-title"
          index="07"
          eyebrow="Video highlights"
          title={
            <>
              See him
              <br />
              <span className="text-ice">play</span>
            </>
          }
          intro={`A professional highlight reel plus clips by theme: goals, assists, pace, ball control, runs and finishing. ${ready} of ${videos.length} reels published.`}
        />

        {/* Category navigation */}
        <Reveal>
          <div role="tablist" aria-label="Highlight categories" className="no-scrollbar -mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
            {videos.map((v) => {
              const selected = v.id === activeId;
              return (
                <button
                  key={v.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="video-stage"
                  onClick={() => setActiveId(v.id)}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                    selected ? 'text-ink' : 'border border-white/12 text-mist hover:text-bone'
                  }`}
                >
                  {selected && <motion.span layoutId="video-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="relative">{v.category}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Featured stage */}
        <Reveal>
          <div id="video-stage" role="tabpanel" className="relative aspect-[4/5] overflow-hidden rounded-sm border hairline bg-ink-900 sm:aspect-video">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {active.src ? (
                  <video key={active.src} className="h-full w-full bg-black object-contain" controls playsInline preload="metadata" poster={active.poster}>
                    <source src={active.src} type="video/mp4" />
                  </video>
                ) : (
                  <>
                    <motion.img
                      src={active.poster}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-[60%_25%] opacity-45"
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 6, ease: 'easeOut' }}
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />

                    <div className="absolute inset-0 grid place-items-center">
                      <div className="flex flex-col items-center gap-4">
                        <span className="relative grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-white/5 backdrop-blur-md md:h-24 md:w-24">
                          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border border-ice/30 [animation-duration:2.4s]" />
                          <Play className="ml-1 h-7 w-7 text-bone/60" aria-hidden="true" />
                        </span>
                        <span className="rounded-full border border-ice/30 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ice backdrop-blur">
                          Footage coming soon
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
                      <p className="label !text-ice">{active.category}</p>
                      <h3 className="display mt-2 text-[clamp(2.2rem,5.5vw,4.5rem)]">{active.title}</h3>
                      <p className="mt-2 max-w-md text-[14px] leading-relaxed text-mist">{active.description}</p>
                      <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-haze">
                        <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" /> Placeholder · authentic match footage to be supplied
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Thumbnails */}
        <div className="no-scrollbar -mx-1 mt-4 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
          {videos.map((v) => {
            const selected = v.id === activeId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveId(v.id)}
                aria-label={`Show ${v.title}`}
                aria-pressed={selected}
                className={`group relative aspect-video w-44 shrink-0 snap-start overflow-hidden rounded-sm border text-left transition-all md:w-52 ${
                  selected ? 'border-ice' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img src={v.poster} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover object-[60%_25%] transition-all duration-500 ${selected ? 'opacity-60' : 'opacity-30 grayscale group-hover:opacity-50 group-hover:grayscale-0'}`} />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                <span className="absolute bottom-2 left-2.5 right-2.5">
                  <span className="block text-[12px] font-semibold leading-tight text-bone">{v.category}</span>
                  <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.12em] text-mist">{v.src ? v.duration ?? 'Watch' : 'Pending'}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
