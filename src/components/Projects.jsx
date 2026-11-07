import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data/portfolioData.json';
import { ArrowUpRight, ExternalLink, ChevronRight } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

const { projects } = data;

/* Accent colours per project index — extend as you add projects */
const accents = [
  { glow: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)', tag: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' },
  { glow: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', tag: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  { glow: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  tag: 'bg-amber-500/10  text-amber-300  border-amber-500/20'  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" className="py-32 px-6 md:px-12 border-t border-neutral-900 relative overflow-hidden">

      {/* Background gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-sm tracking-widest uppercase text-neutral-500 mb-4"
            >
              03 / Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
            >
              Things I've<br />
              <span className="text-neutral-500">actually built.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 text-sm max-w-xs leading-relaxed md:text-right"
          >
            Each project is a problem I chose to solve, not a tutorial I followed.
          </motion.p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => {
            const accent = accents[index % accents.length];
            const isHovered = hovered === index;

            return (
              <motion.div
                key={project.name}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="group relative rounded-2xl border border-neutral-800 bg-neutral-950/60 backdrop-blur-sm overflow-hidden transition-all duration-500 cursor-default"
                style={{
                  boxShadow: isHovered ? `0 0 60px ${accent.glow}, 0 0 1px ${accent.border}` : 'none',
                  borderColor: isHovered ? accent.border : undefined,
                }}
              >
                {/* Animated top highlight bar */}
                <motion.div
                  className="absolute top-0 left-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)` }}
                  initial={{ width: '0%' }}
                  animate={{ width: isHovered ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />

                <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-16 md:items-start">

                  {/* Left side: index + name + description */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-start gap-4 mb-5">
                      {/* Large faded index */}
                      <span
                        className="text-6xl font-bold leading-none select-none flex-shrink-0 transition-colors duration-300"
                        style={{ color: isHovered ? accent.border : 'rgba(255,255,255,0.06)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2 group-hover:text-neutral-200 transition-colors">
                          {project.name}
                        </h3>
                        {/* Stack tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${accent.tag}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-neutral-400 leading-relaxed text-base md:text-lg max-w-2xl group-hover:text-neutral-300 transition-colors duration-400">
                      {project.description}
                    </p>
                  </div>

                  {/* Right side: impact pills + links */}
                  <div className="flex flex-col gap-6 md:min-w-[220px] md:items-end justify-between">

                    {/* Impact highlights */}
                    {project.impact && (
                      <div className="flex flex-row md:flex-col gap-3 flex-wrap md:items-end">
                        {project.impact.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-sm text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
                          >
                            <ChevronRight size={12} className="text-neutral-600 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Links */}
                    <div className="flex flex-row md:flex-col gap-3 flex-wrap">
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-neutral-300 bg-neutral-900 border border-neutral-700 hover:border-white/40 hover:text-white rounded-lg px-4 py-2.5 transition-all duration-200"
                      >
                        <GithubIcon size={13} />
                        View Code
                      </motion.a>
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-black bg-white hover:bg-neutral-200 rounded-lg px-4 py-2.5 transition-all duration-200"
                        >
                          <ExternalLink size={13} />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/abhaybhatia1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-sm text-neutral-500 hover:text-white transition-colors duration-200 group"
          >
            <span className="w-8 h-[1px] bg-neutral-700 group-hover:bg-white group-hover:w-12 transition-all duration-300" />
            See all repositories on GitHub
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
