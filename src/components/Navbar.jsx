import React from 'react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-4 bg-[#040407]/75 backdrop-blur-xl border-b border-white/[0.06]"
    >
      {/* Brand Logo */}
      <a href="#top" className="flex items-center gap-2 group" aria-label="Abhay Bhatia Home">
        <span className="text-lg font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors">
          AB<span className="text-indigo-500">.</span>
        </span>
        <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 hidden sm:inline">
          / Java Backend Dev
        </span>
      </a>

      {/* Nav links matching section order */}
      <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400 font-medium tracking-wide">
        {[
          ['About', '#about'],
          ['Skills', '#skills'],
          ['Projects', '#projects'],
          ['Experience', '#experience'],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="hover:text-white transition-colors duration-150 relative py-1 group"
          >
            {label}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-500 to-sky-400 group-hover:w-full transition-all duration-300 rounded-full" />
          </a>
        ))}
      </div>

      {/* Right CTAs */}
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/abhaybhatia1"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
          title="GitHub Profile"
          aria-label="GitHub Profile"
        >
          <GithubIcon size={16} />
        </a>
        <a
          href="#contact"
          className="text-xs font-semibold px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
