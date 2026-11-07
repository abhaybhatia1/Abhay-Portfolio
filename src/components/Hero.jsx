import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';

// lucide-react doesn't ship a GitHub icon — using inline SVG
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const item = {
  hidden: { y: 80, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 20 } }
};

// Honest, accurate tech tags — removed "AI" since there's no AI project yet
const tags = ['Java', 'Spring Boot', 'MySQL', 'React', 'REST APIs', 'Spring Security'];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden"
      id="top"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-neutral-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-7xl mx-auto"
      >
        {/* Role label — single consistent title */}
        <motion.p variants={item} className="text-neutral-500 tracking-widest text-sm uppercase mb-6 flex items-center gap-3">
          <span className="w-6 h-[1px] bg-neutral-600" />
          Java Backend Developer
          <span className="text-neutral-700">·</span>
          <span className="text-green-500/80 text-xs">● Open to opportunities</span>
        </motion.p>

        {/* Name */}
        <div className="overflow-hidden mb-2">
          <motion.h1 variants={item} className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none -ml-1 md:-ml-2">
            ABHAY
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1 variants={item} className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none text-neutral-600 -ml-1 md:-ml-2">
            BHATIA
          </motion.h1>
        </div>

        {/* Tagline — honest, specific, no "AI" */}
        <motion.p variants={item} className="text-lg md:text-2xl text-neutral-400 max-w-2xl leading-relaxed mb-10">
          Building high-performance backend systems and clean REST APIs with Java & Spring Boot.
          Currently modernizing enterprise architecture at{' '}
          <span className="text-neutral-200">Damco Solutions</span>, Gurgaon.
        </motion.p>

        {/* Tech tags */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-12">
          {tags.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 border border-neutral-800 rounded-full text-xs tracking-wide text-neutral-400 hover:border-neutral-600 hover:text-neutral-200 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-4">
          <a
            href="mailto:abhaybhatia0898@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors duration-200"
          >
            <Mail size={14} />
            Get in Touch
          </a>
          <a
            href="https://github.com/abhaybhatia1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 text-sm font-medium rounded-full hover:border-white hover:text-white transition-colors duration-200"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3 text-xs text-neutral-600 tracking-widest uppercase"
      >
        <ArrowDown size={12} className="animate-bounce" />
        Scroll to explore
      </motion.div>
    </section>
  );
}
