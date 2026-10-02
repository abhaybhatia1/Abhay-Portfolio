import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden" id="top">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-neutral-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-7xl mx-auto"
      >
        <motion.p variants={item} className="text-muted tracking-widest text-sm md:text-base uppercase mb-4">
          Software Engineer
        </motion.p>
        
        <div className="overflow-hidden mb-2">
          <motion.h1 variants={item} className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none -ml-1 md:-ml-2">
            ABHAY
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1 variants={item} className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none text-neutral-500 -ml-1 md:-ml-2">
            BHATIA
          </motion.h1>
        </div>

        <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-12">
          {['Java', 'Spring Boot', 'React', 'SQL', 'AI'].map((tech) => (
            <span key={tech} className="px-4 py-2 border border-neutral-800 rounded-full text-sm tracking-wide text-neutral-300">
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.p variants={item} className="text-lg md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
          Building scalable backend systems, modern web applications, and AI-powered solutions. Based in Gurgaon, India.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-sm text-neutral-500 tracking-widest uppercase"
      >
        <div className="w-8 h-[1px] bg-neutral-600" />
        Scroll to explore
      </motion.div>
    </section>
  );
}
