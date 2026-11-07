import React from 'react';
import { motion } from 'framer-motion';
import data from '../data/portfolioData.json';

const { skills } = data;

const categoryConfig = {
  Languages: { color: 'text-sky-400', dot: 'bg-sky-400', borderHover: 'hover:border-sky-500/40' },
  Backend:   { color: 'text-indigo-400', dot: 'bg-indigo-400', borderHover: 'hover:border-indigo-500/40' },
  Database:  { color: 'text-emerald-400', dot: 'bg-emerald-400', borderHover: 'hover:border-emerald-500/40' },
  Tooling:   { color: 'text-amber-400', dot: 'bg-amber-400', borderHover: 'hover:border-amber-500/40' },
  Concepts:  { color: 'text-violet-400', dot: 'bg-violet-400', borderHover: 'hover:border-violet-500/40' },
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-indigo-400 mb-4 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              02 / Skills
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-none text-white"
            >
              What I work<br />
              <span className="bg-gradient-to-r from-neutral-400 to-indigo-300 bg-clip-text text-transparent">with daily.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-sm max-w-xs leading-relaxed md:text-right"
          >
            Technologies deployed in production environments and personal engineering projects.
          </motion.p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, items], catIdx) => {
            const cfg = categoryConfig[category] || { color: 'text-neutral-400', dot: 'bg-neutral-400', borderHover: 'hover:border-neutral-500/40' };
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl border border-white/[0.07] bg-[#07080f]/70 backdrop-blur-xl p-7 transition-all duration-300 ${cfg.borderHover} hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]`}
              >
                {/* Category label */}
                <div className="flex items-center gap-2.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${cfg.dot} shadow-[0_0_8px_currentColor]`} />
                  <span className={`text-xs tracking-wider uppercase font-mono font-semibold ${cfg.color}`}>
                    {category}
                  </span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2.5">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.06, borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}
                      className="text-xs text-neutral-300 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-1.5 transition-colors font-medium cursor-default"
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs text-indigo-300 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Currently Deep-Diving: Apache Kafka · Redis Distributed Caching · Docker
          </span>
        </motion.div>
      </div>
    </section>
  );
}
