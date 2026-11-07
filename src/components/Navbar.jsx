import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Navbar() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [soundEnabled, setSoundEnabled] = useState(!sounds.isMuted());

  const handleToggleSound = () => {
    const nextState = sounds.toggleSound();
    setSoundEnabled(nextState);
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-3.5 liquid-glass border-b transition-all duration-300 ${
        isLight
          ? 'bg-white/80 border-purple-200/60 shadow-md shadow-purple-500/5'
          : 'bg-[#06050b]/80 border-white/[0.07] shadow-lg shadow-black/40'
      }`}
    >
      {/* Brand Logo */}
      <a
        href="#top"
        onClick={() => sounds.playClick()}
        onMouseEnter={() => sounds.playHover()}
        className="flex items-center gap-2 group cursor-pointer"
        aria-label="Abhay Bhatia Home"
      >
        <span className={`text-lg font-black tracking-tighter transition-colors ${
          isLight ? 'text-purple-950 group-hover:text-purple-700' : 'text-white group-hover:text-purple-300'
        }`}>
          AB<span className="text-purple-500">.</span>
        </span>
        <span className={`text-[10px] uppercase font-mono tracking-widest hidden sm:inline ${
          isLight ? 'text-purple-900/70' : 'text-neutral-400'
        }`}>
          / Backend Dev
        </span>
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide">
        {[
          ['About', '#about'],
          ['Skills', '#skills'],
          ['Projects', '#projects'],
          ['Experience', '#experience'],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className={`transition-colors duration-150 relative py-1 group font-semibold ${
              isLight
                ? 'text-purple-950/80 hover:text-purple-700'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            {label}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full" />
          </a>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Sound Effects Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleToggleSound}
          onMouseEnter={() => sounds.playHover()}
          aria-label={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          title={soundEnabled ? 'Sound Effects: ON (Click to Mute)' : 'Sound Effects: OFF (Click to Enable)'}
          className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center liquid-glass ${
            soundEnabled
              ? isLight
                ? 'bg-purple-100/90 border-purple-300 text-purple-700 shadow-sm'
                : 'bg-white/[0.05] border-purple-400/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
              : isLight
              ? 'bg-purple-50/50 border-purple-200/50 text-purple-400'
              : 'bg-white/[0.02] border-white/10 text-neutral-500'
          }`}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </motion.button>

        {/* Dark / Light Mode Sun/Moon Toggle */}
        <ThemeToggle />

        {/* GitHub Link */}
        <a
          href="https://github.com/abhaybhatia1"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className={`p-2.5 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer liquid-glass ${
            isLight
              ? 'border-purple-200/80 text-purple-900 hover:text-purple-600 hover:bg-purple-100/80'
              : 'border-white/10 text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
          title="GitHub Profile"
          aria-label="GitHub Profile"
        >
          <GithubIcon size={15} />
        </a>

        {/* LinkedIn Link */}
        <a
          href="https://in.linkedin.com/in/abhay-bhatia-202935229"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className={`p-2.5 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer liquid-glass ${
            isLight
              ? 'border-purple-200/80 text-purple-900 hover:text-purple-600 hover:bg-purple-100/80'
              : 'border-white/10 text-neutral-300 hover:text-purple-300 hover:bg-white/5'
          }`}
          title="LinkedIn Profile"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon size={15} />
        </a>

        {/* Hire Me CTA */}
        <a
          href="#contact"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className={`text-xs font-semibold px-4 py-2.5 rounded-full border transition-all duration-200 ml-1 cursor-pointer ${
            isLight
              ? 'bg-purple-600 text-white border-purple-500 hover:bg-purple-700 shadow-sm shadow-purple-400/40'
              : 'border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
          }`}
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
