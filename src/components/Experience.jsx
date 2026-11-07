import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import data from '../data/portfolioData.json';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/audio';

const { experience, education, certifications } = data;

const itemVariants = {
  hidden:  { opacity: 0, x: -30 },
  show:    { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 90, damping: 20 } }
};

function EntryIcon({ type }) {
  const cls = 'w-3.5 h-3.5';
  if (type === 'edu')  return <GraduationCap className={cls} />;
  if (type === 'cert') return <Award className={cls} />;
  return <Briefcase className={cls} />;
}

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const allEntries = [
    ...experience.map(e => ({ ...e, type: 'exp' })),
    ...education
      .filter(e => !e.title.includes('Class 12'))
      .map(e => ({ ...e, type: 'edu' })),
    ...certifications.map(c => ({ ...c, type: 'cert', date: '' })),
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-12 border-t border-inherit relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-[0.25em] uppercase text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2 font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            04 / Background
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className={`text-4xl md:text-6xl font-bold tracking-tight leading-none ${
              isLight ? 'text-[#140827]' : 'text-white'
            }`}
          >
            Professional<br />
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 dark:from-neutral-300 dark:to-purple-300 bg-clip-text text-transparent">
              journey.
            </span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Static track */}
          <div className={`absolute left-[11px] md:left-[15px] top-0 w-[1px] h-full ${
            isLight ? 'bg-purple-200' : 'bg-white/[0.08]'
          }`} />
          {/* Animated Glowing Fill */}
          <motion.div
            className="absolute left-[11px] md:left-[15px] top-0 w-[2px] -ml-[0.5px] bg-gradient-to-b from-purple-500 via-fuchsia-500 to-indigo-600 origin-top shadow-[0_0_12px_rgba(168,85,247,0.6)]"
            style={{ height: '100%', scaleY: lineScale }}
          />

          <div className="flex flex-col gap-14 md:gap-20">
            {allEntries.map((entry, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                onMouseEnter={() => sounds.playHover()}
                className="relative pl-12 md:pl-24 group"
              >
                {/* Timeline node */}
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 liquid-glass ${
                  isLight
                    ? 'border-purple-300 bg-white group-hover:border-purple-500 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'border-white/20 bg-[#0d091a] group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                }`}>
                  <div className={`transition-colors duration-300 ${
                    isLight
                      ? 'text-purple-700 group-hover:text-purple-900'
                      : 'text-neutral-400 group-hover:text-purple-300'
                  }`}>
                    <EntryIcon type={entry.type} />
                  </div>
                </div>

                {/* Date */}
                {entry.date && (
                  <span className="inline-block text-xs tracking-wider uppercase font-mono text-purple-600 dark:text-purple-400 mb-2 font-bold">
                    {entry.date}
                  </span>
                )}

                {/* Title */}
                <h3 className={`text-xl md:text-3xl font-bold tracking-tight mb-1 transition-colors ${
                  isLight
                    ? 'text-[#140827] group-hover:text-purple-700'
                    : 'text-white group-hover:text-purple-300'
                }`}>
                  {entry.title}
                </h3>

                {/* Company */}
                {entry.company && (
                  <p className={`text-sm mb-4 font-semibold ${
                    isLight ? 'text-[#504070]' : 'text-neutral-400'
                  }`}>
                    {entry.company}
                  </p>
                )}

                {/* Description */}
                {entry.text && (
                  <p className={`leading-relaxed max-w-2xl text-base transition-colors duration-300 font-normal ${
                    isLight
                      ? 'text-[#3c2f58] group-hover:text-[#1c1135]'
                      : 'text-neutral-300 group-hover:text-neutral-200'
                  }`}>
                    {entry.text}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
