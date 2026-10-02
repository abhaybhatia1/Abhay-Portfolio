import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import data from '../data/portfolioData.json';

const { experience } = data;

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto" ref={containerRef}>
      <div className="mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm tracking-widest uppercase text-muted"
        >
          02 / Experience
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mt-4"
        >
          Professional Journey
        </motion.h3>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-0 w-[1px] h-full bg-neutral-800 ml-[11px] md:ml-[15px]" />
        <motion.div 
          className="absolute left-0 top-0 w-[1px] bg-white ml-[11px] md:ml-[15px] origin-top"
          style={{ height: "100%", scaleY: lineScale }}
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {experience.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative pl-12 md:pl-24"
            >
              {/* Dot */}
              <div className="absolute left-0 top-2 w-6 h-6 rounded-full border border-neutral-700 bg-background flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-4">
                <span className="text-sm md:text-base font-medium text-neutral-400 whitespace-nowrap">
                  {exp.date}
                </span>
                <h4 className="text-2xl md:text-4xl font-semibold tracking-tight">
                  {exp.title}
                </h4>
              </div>
              <p className="text-lg text-neutral-500 mb-6 italic">{exp.company}</p>
              <p className="text-neutral-300 leading-relaxed max-w-2xl text-lg">
                {exp.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
