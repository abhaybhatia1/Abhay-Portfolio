import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import data from '../data/portfolioData.json';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const { experience, education, certifications } = data;

const itemVariants = {
  hidden:  { opacity: 0, x: -30 },
  show:    { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

// Icon per entry type
function EntryIcon({ type }) {
  const cls = 'w-4 h-4';
  if (type === 'edu')  return <GraduationCap className={cls} />;
  if (type === 'cert') return <Award className={cls} />;
  return <Briefcase className={cls} />;
}

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  // Merge arrays with a type tag for icon selection
  const allEntries = [
    ...experience.map(e => ({ ...e, type: 'exp' })),
    ...education
      .filter(e => !e.title.includes('Class 12')) // Remove 12th grade entry
      .map(e => ({ ...e, type: 'edu' })),
    ...certifications.map(c => ({ ...c, type: 'cert', date: '' })),
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-12 border-t border-neutral-900 bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-sm tracking-widest uppercase text-neutral-500 mb-4"
          >
            04 / Background
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
          >
            Professional<br />
            <span className="text-neutral-500">journey.</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Static track */}
          <div className="absolute left-[11px] md:left-[15px] top-0 w-[1px] h-full bg-neutral-800" />
          {/* Animated fill */}
          <motion.div
            className="absolute left-[11px] md:left-[15px] top-0 w-[1px] bg-gradient-to-b from-white/60 to-white/10 origin-top"
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
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-neutral-700 bg-background flex items-center justify-center group-hover:border-neutral-400 transition-colors duration-300">
                  <div className="text-neutral-600 group-hover:text-neutral-300 transition-colors duration-300">
                    <EntryIcon type={entry.type} />
                  </div>
                </div>

                {/* Date */}
                {entry.date && (
                  <span className="inline-block text-xs tracking-widest uppercase text-neutral-600 mb-3 font-medium">
                    {entry.date}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-white mb-1 group-hover:text-neutral-200 transition-colors">
                  {entry.title}
                </h3>

                {/* Company / Institution */}
                {entry.company && (
                  <p className="text-sm text-neutral-500 mb-4 font-medium">{entry.company}</p>
                )}

                {/* Description */}
                {entry.text && (
                  <p className="text-neutral-400 leading-relaxed max-w-2xl text-base group-hover:text-neutral-300 transition-colors duration-300">
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
