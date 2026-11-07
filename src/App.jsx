import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-[#040407] text-foreground min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Reactive Glow Cursor */}
      <CustomCursor />

      {/* Fast Cinematic Intro Loader */}
      <PageLoader onComplete={() => setLoaded(true)} />

      {/* Main Content Reveal */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}