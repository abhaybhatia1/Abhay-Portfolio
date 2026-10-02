import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-6 transition-colors duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <a href="#top" className="text-xl font-bold tracking-tighter z-50">
        AB<span className="text-muted">.</span>
      </a>
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        <a href="#about" className="hover:text-muted transition-colors">About</a>
        <a href="#skills" className="hover:text-muted transition-colors">Skills</a>
        <a href="#experience" className="hover:text-muted transition-colors">Experience</a>
        <a href="#projects" className="hover:text-muted transition-colors">Work</a>
      </div>
      <a href="#contact" className="text-sm font-medium border border-neutral-700 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors z-50">
        Contact
      </a>
    </motion.nav>
  );
}
