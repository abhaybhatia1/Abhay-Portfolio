import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import data from '../data/portfolioData.json';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

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

  const allEntries = [
    ...experience.map(e => ({ ...e, type: 'exp' })),
    ...education
      .filter(e => !e.title.includes('Class 12'))
      .map(e => ({ ...e, type: 'edu' })),
    ...certifications.map(c => ({ ...c, type: 'cert', date: '' })),
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-12 border-t border-white/[0.06] relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-[0.25em] uppercase text-indigo-400 mb-4 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            04 / Background
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none text-white"
          >
            Professional<br />
            <span className="bg-gradient-to-r from-neutral-400 to-indigo-300 bg-clip-text text-transparent">journey.</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Static track */}
          <div className="absolute left-[11px] md:left-[15px] top-0 w-[1px] h-full bg-white/[0.08]" />
          {/* Animated Glowing Fill */}
          <motion.div
            className="absolute left-[11px] md:left-[15px] top-0 w-[2px] -ml-[0.5px] bg-gradient-to-b from-indigo-500 via-sky-400 to-indigo-600 origin-top shadow-[0_0_12px_rgba(99,102,241,0.6)]"
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
                className="relative pl-12 md:pl-24 group"
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-white/20 bg-[#07080f] flex items-center justify-center group-hover:border-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300">
                  <div className="text-neutral-400 group-hover:text-indigo-300 transition-colors duration-300">
                    <EntryIcon type={entry.type} />
                  </div>
                </div>

                {/* Date */}
                {entry.date && (
                  <span className="inline-block text-xs tracking-wider uppercase font-mono text-indigo-400 mb-2 font-medium">
                    {entry.date}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white mb-1 group-hover:text-indigo-200 transition-colors">
                  {entry.title}
                </h3>

                {/* Company */}
                {entry.company && (
                  <p className="text-sm text-neutral-400 mb-4 font-medium">{entry.company}</p>
                )}

                {/* Description */}
                {entry.text && (
                  <p className="text-neutral-300 leading-relaxed max-w-2xl text-base group-hover:text-neutral-200 transition-colors duration-300">
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
