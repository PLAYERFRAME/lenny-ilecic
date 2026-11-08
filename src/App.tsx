import { MotionConfig } from 'motion/react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Academy from './components/Academy';
import Achievements from './components/Achievements';
import Performance from './components/Performance';
import Attributes from './components/Attributes';
import Career from './components/Career';
import Media from './components/Media';
import Highlights from './components/Highlights';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Academy />
        <Achievements />
        <Performance />
        <Attributes />
        <Career />
        <Media />
        <Highlights />
      </main>
      <Footer />
    </MotionConfig>
  );
}
