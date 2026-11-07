import React from 'react';
import { motion } from 'framer-motion';
import data from '../data/portfolioData.json';

const { skills } = data;

// Category display config
const categoryConfig = {
  Languages:    { color: 'text-sky-400',     dot: 'bg-sky-400'     },
  Backend:      { color: 'text-indigo-400',  dot: 'bg-indigo-400'  },
  Database:     { color: 'text-emerald-400', dot: 'bg-emerald-400' },
  Tooling:      { color: 'text-amber-400',   dot: 'bg-amber-400'   },
  Concepts:     { color: 'text-rose-400',    dot: 'bg-rose-400'    },
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 border-t border-neutral-900 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-sm tracking-widest uppercase text-neutral-500 mb-4"
            >
              02 / Skills
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
            >
              What I work<br />
              <span className="text-neutral-500">with daily.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-500 text-sm max-w-xs leading-relaxed md:text-right"
          >
            Tools & technologies I've used in real production environments, not just tutorials.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([category, items], catIdx) => {
            const cfg = categoryConfig[category] || { color: 'text-neutral-400', dot: 'bg-neutral-400' };
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                className="group relative rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6 hover:border-neutral-700 transition-colors duration-300"
              >
                {/* Category label */}
                <div className="flex items-center gap-2 mb-5">
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span className={`text-xs tracking-widest uppercase font-semibold ${cfg.color}`}>
                    {category}
                  </span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.06 + i * 0.04 }}
                      className="text-sm text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 hover:border-neutral-600 hover:text-white transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Honest disclaimer */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-10 text-xs text-neutral-600 text-center tracking-wide"
        >
          Currently learning: Docker · PostgreSQL · Apache Kafka
        </motion.p>

      </div>
    </section>
  );
}
