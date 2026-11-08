import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Clock, Link2Off, Newspaper } from 'lucide-react';
import { useState } from 'react';
import { media, type MediaItem } from '../data/player';
import Placeholder from './ui/Placeholder';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

const topics = ['All', 'Tournaments', 'Academy', 'Professional'] as const;

function MediaCard({ item, featured }: { item: MediaItem; featured?: boolean }) {
  const pending = !item.headline;
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-sm border hairline bg-ink-900 transition-colors duration-500 hover:border-ice/30 ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] md:aspect-auto md:w-[55%]' : 'aspect-[16/10]'}`}>
        {item.image ? (
          <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <Placeholder label="Featured image" note="From the original article" className="h-full w-full border-0 border-b md:border-b-0" />
        )}
        {pending && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ice backdrop-blur">
            Placeholder
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-5 ${featured ? 'md:p-8' : ''}`}>
        <div className="flex items-center justify-between gap-3">
          {item.publisherLogo ? (
            <img src={item.publisherLogo} alt={item.publisher ?? ''} className="h-5 w-auto opacity-80" />
          ) : (
            <span className="inline-flex items-center gap-2 rounded-sm border border-dashed border-white/15 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-mist">
              <Newspaper className="h-3 w-3" aria-hidden="true" /> {item.publisher ?? 'Publisher logo'}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-haze">
            <Clock className="h-3 w-3" aria-hidden="true" /> {item.date ?? 'Date tbc'}
          </span>
        </div>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ice/80">{item.topic}</p>
        <h3 className={`mt-2 font-semibold leading-snug ${featured ? 'text-[22px] md:text-[28px]' : 'text-[17px]'} ${pending ? 'text-bone/75' : 'text-bone'}`}>
          {item.headline ?? item.storyBrief}
        </h3>
        {pending && <p className="mt-1.5 text-[12px] italic text-haze">Story topic shown. Original headline to be added.</p>}

        {item.excerpt ? (
          <p className="mt-3 text-[14px] leading-relaxed text-mist">{item.excerpt}</p>
        ) : (
          <div className="mt-4 space-y-2" aria-hidden="true">
            <span className="block h-2 w-full rounded-full bg-white/[0.06]" />
            <span className="block h-2 w-11/12 rounded-full bg-white/[0.06]" />
            {featured && <span className="block h-2 w-3/4 rounded-full bg-white/[0.06]" />}
          </div>
        )}

        <div className="mt-auto pt-6">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-bone transition-colors hover:text-ice"
            >
              Read original article <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-haze">
              <Link2Off className="h-3.5 w-3.5" aria-hidden="true" /> Source link pending
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Media() {
  const [topic, setTopic] = useState<(typeof topics)[number]>('All');
  const items = topic === 'All' ? media : media.filter((m) => m.topic === topic);
  const count = (t: (typeof topics)[number]) => (t === 'All' ? media.length : media.filter((m) => m.topic === t).length);

  return (
    <section id="media" aria-labelledby="media-title" className="relative border-t hairline bg-ink-900/40 py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          id="media-title"
          index="06"
          eyebrow="Media spotlight"
          title={
            <>
              Press &amp;
              <br />
              <span className="text-ice">recognition</span>
            </>
          }
          intro="Newspaper coverage, sports portal articles, interviews and match reports. Every item will link to the original publication."
        />

        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Filter by topic" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={topic === t}
                  onClick={() => setTopic(t)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                    topic === t ? 'border-bone bg-bone text-ink' : 'border-white/12 text-mist hover:text-bone'
                  }`}
                >
                  {t} <span className="ml-1 font-mono text-[10px] opacity-60">{count(t)}</span>
                </button>
              ))}
            </div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-haze">Archive in preparation · verified sources only<span className="md:hidden"> · swipe</span></p>
          </div>
        </Reveal>

        <motion.div layout className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-[84%] shrink-0 snap-start md:w-auto"
              >
                <MediaCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
