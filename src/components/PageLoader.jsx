import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 1300);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const letters = 'ABHAY BHATIA'.split('');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] bg-[#040407] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Subtle background ambient mesh */}
          <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Animated vertical grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-700 to-transparent"
                style={{ left: `${(i + 1) * 20}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
              />
            ))}
          </div>

          {/* Logo letters staggered */}
          <div className="flex overflow-hidden relative z-10 mb-4" aria-hidden="true">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter ${
                  char === ' ' ? 'w-4 md:w-6' : i >= 6 ? 'text-indigo-400' : 'text-white'
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-neutral-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            Software Engineer · 2027
          </motion.div>

          {/* Animated loading bar */}
          <div className="absolute bottom-12 w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
