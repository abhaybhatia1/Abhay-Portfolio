import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';

export default function Skills() {
  const allSkills = Object.values(skills).flat();

  return (
    <section id="skills" className="py-24 overflow-hidden bg-accent/20 border-y border-neutral-900">
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex gap-8 px-4 items-center"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
        >
          {[...allSkills, ...allSkills, ...allSkills].map((skill, index) => (
            <React.Fragment key={index}>
              <span className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                {skill.toUpperCase()}
              </span>
              <span className="text-xl md:text-3xl text-neutral-600">✦</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
