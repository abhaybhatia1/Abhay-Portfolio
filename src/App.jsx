import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative transition-colors duration-400">
        {/* Reactive Glow Cursor */}
        <CustomCursor />

        {/* Cinematic Intro Loader Overlay (Exits cleanly after 1.3s) */}
        <PageLoader />

        {/* Main Content */}
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
