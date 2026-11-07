import React from 'react';
import { motion } from 'framer-motion';
import data from '../data/portfolioData.json';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/audio';

const { skills } = data;

const categoryConfig = {
  Languages: {
    color: 'text-sky-500 dark:text-sky-400',
    dot: 'bg-sky-500',
    borderHover: 'hover:border-sky-400/50'
  },
  Backend: {
    color: 'text-purple-600 dark:text-purple-400',
    dot: 'bg-purple-500',
    borderHover: 'hover:border-purple-400/50'
  },
  Database: {
    color: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    borderHover: 'hover:border-emerald-400/50'
  },
  Tooling: {
    color: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
    borderHover: 'hover:border-amber-400/50'
  },
  Concepts: {
    color: 'text-fuchsia-600 dark:text-violet-400',
    dot: 'bg-fuchsia-500',
    borderHover: 'hover:border-fuchsia-400/50'
  },
};

export default function Skills() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="skills" className="py-32 px-6 md:px-12 border-t border-inherit relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2 font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              02 / Skills
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
              What I work<br />
              <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 dark:from-neutral-300 dark:to-purple-300 bg-clip-text text-transparent">
                with daily.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-sm max-w-xs leading-relaxed md:text-right font-medium ${
              isLight ? 'text-[#504070]' : 'text-neutral-400'
            }`}
          >
            Technologies deployed in production environments and personal engineering projects.
          </motion.p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, items], catIdx) => {
            const cfg = categoryConfig[category] || {
              color: 'text-purple-600 dark:text-neutral-400',
              dot: 'bg-purple-500',
              borderHover: 'hover:border-purple-400/50'
            };
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => sounds.playHover()}
                className={`group relative rounded-2xl border p-7 transition-all duration-300 liquid-glass ${
                  isLight
                    ? 'bg-white/80 border-purple-200/80 shadow-lg shadow-purple-950/5 hover:border-purple-400'
                    : 'bg-[#0d091a]/70 border-white/[0.08] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                } ${cfg.borderHover}`}
              >
                {/* Category label */}
                <div className="flex items-center gap-2.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${cfg.dot} shadow-[0_0_8px_currentColor]`} />
                  <span className={`text-xs tracking-wider uppercase font-mono font-bold ${cfg.color}`}>
                    {category}
                  </span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2.5">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.06 }}
                      onMouseEnter={() => sounds.playHover()}
                      className={`text-xs rounded-lg px-3.5 py-1.5 transition-all font-semibold cursor-default liquid-glass-pill ${
                        isLight
                          ? 'text-purple-950 bg-purple-50/90 border-purple-200/90 shadow-sm hover:border-purple-400 hover:bg-white'
                          : 'text-neutral-200 bg-white/[0.04] border-white/[0.08] hover:border-purple-400/50 hover:text-white'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Learning banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className={`text-xs font-mono font-semibold ${
            isLight ? 'text-purple-900/60' : 'text-neutral-500'
          }`}>
            Always learning: Kafka, Docker, Kubernetes, AWS Cloud Practitioner
          </p>
        </motion.div>
      </div>
    </section>
  );
}
