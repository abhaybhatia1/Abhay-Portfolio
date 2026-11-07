import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-5 bg-background/80 backdrop-blur-md border-b border-neutral-900/50"
    >
      {/* Logo */}
      <a href="#top" className="text-lg font-bold tracking-tighter z-50 hover:text-neutral-300 transition-colors">
        AB<span className="text-neutral-600">.</span>
      </a>

      {/* Nav links */}
      <div className="hidden md:flex gap-8 text-sm text-neutral-400 font-medium tracking-wide">
        {[['About', '#about'], ['Skills', '#skills'], ['Experience', '#experience'], ['Work', '#projects']].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="hover:text-white transition-colors duration-150 relative group"
          >
            {label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-200" />
          </a>
        ))}
      </div>

      {/* Right CTAs */}
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/abhaybhatia1"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors duration-150"
        >
          <GithubIcon size={14} />
        </a>
        <a
          href="#contact"
          className="text-xs font-semibold border border-neutral-700 px-4 py-2 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-200"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
