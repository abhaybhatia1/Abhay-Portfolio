import React from 'react';
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
    <div className="bg-[#040407] text-foreground min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Reactive Glow Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Loader Overlay (Exits cleanly after 1.3s) */}
      <PageLoader />

      {/* Main Content Rendered in DOM Immediately for SEO and Core Web Vitals */}
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
  );
}
