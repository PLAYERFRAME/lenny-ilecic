import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems, profile } from '../data/player';
import { useActiveSection } from '../hooks/useActiveSection';

const ids = navItems.map((n) => n.id);

export default function Nav() {
  const active = useActiveSection(ids);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 z-50 transition-colors duration-500 ${scrolled ? 'glass border-b hairline' : 'border-b border-transparent'}`}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="shell flex h-16 items-center justify-between gap-6" aria-label="Sections">
          <a href="#overview" className="group flex items-center gap-3" aria-label="Lenny Ilečić — back to top">
            <span className="display-wide grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[11px] transition-colors group-hover:border-ice group-hover:text-ice">
              LI
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[13px] font-semibold tracking-wide">{profile.fullName}</span>
              <span className="font-mono text-[10px] uppercase tracking-label text-mist">Player Dossier · {profile.primaryPosition.code}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block px-3.5 py-2 text-[12.5px] font-medium uppercase tracking-[0.1em] transition-colors ${
                      isActive ? 'text-bone' : 'text-mist hover:text-bone'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 -bottom-[1px] h-[2px] bg-ice"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#highlights" className="btn-ghost hidden !px-4 !py-2 !text-[11px] md:inline-flex">
              Highlights
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="shell flex h-full flex-col justify-center gap-1 pb-10 pt-24" aria-label="Sections (mobile)">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    // Body scrolling is locked while the menu is open, so close it first, then scroll.
                    e.preventDefault();
                    setOpen(false);
                    window.setTimeout(() => {
                      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                      document.getElementById(item.id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
                      history.replaceState(null, '', `#${item.id}`);
                    }, 60);
                  }}
                  className={`display flex items-baseline gap-4 py-1.5 text-[clamp(2.6rem,12vw,4rem)] ${active === item.id ? 'text-ice' : 'text-bone'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono text-[11px] font-normal tracking-label text-mist">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
