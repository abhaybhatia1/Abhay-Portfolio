import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/audio';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const handleClick = () => {
    // Sound effect: pass true if switching to daytime (sun rise pop), false if switching to nighttime
    sounds.playToggle(!isLight);
    toggleTheme();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleClick}
      onMouseEnter={() => sounds.playHover()}
      aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      title={isLight ? 'Switch to Dark Mode (Moon)' : 'Switch to Light Mode (Sun)'}
      className={`relative p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer liquid-glass ${
        isLight
          ? 'bg-purple-100/80 border-purple-300/80 text-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-purple-200/90'
          : 'bg-white/[0.05] border-white/15 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:bg-purple-500/20 hover:border-purple-400/50'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center justify-center text-purple-700"
          >
            <Sun size={17} className="stroke-[2.3]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center justify-center text-purple-300"
          >
            <Moon size={17} className="stroke-[2.3]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
