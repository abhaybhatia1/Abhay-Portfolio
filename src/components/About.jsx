import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '1.5+', label: 'Years Professional Experience' },
  { value: '3',    label: 'Companies Shipped Real Products' },
  { value: '20+',  label: 'REST APIs Built & Deployed' },
  { value: '50%',  label: 'Error Reduction at FarEye' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden">

      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.p {...fadeUp(0)} className="text-sm tracking-widest uppercase text-neutral-500 mb-16">
          01 / About
        </motion.p>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-24">

          {/* Left — headline */}
          <motion.div {...fadeUp(0.05)} className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
              I build things that{' '}
              <span className="text-neutral-500 italic">actually ship</span>{' '}
              — not just things that compile.
            </h2>
          </motion.div>

          {/* Right — story */}
          <motion.div {...fadeUp(0.12)} className="lg:w-1/2 flex flex-col gap-6">
            <p className="text-lg text-neutral-300 leading-relaxed">
              I'm a Java backend developer currently at{' '}
              <span className="text-white font-medium">Damco Solutions</span>, where I'm leading
              the modernization of a legacy MVC system to an Angular + Spring Boot architecture.
              My ECE background gave me a low-level systems mindset — I think about memory,
              latency, and data integrity before I think about features.
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed">
              I care about the product side of engineering. I want to understand{' '}
              <em>why</em> an API needs to exist before I write a single endpoint. I'm drawn to
              teams where backend quality directly shapes user experience — not just where code
              disappears into a black box.
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Outside work: optimizing SQL queries for fun, reading about distributed systems,
              and slowly learning how to make my side projects not look terrible on mobile.
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 rounded-2xl overflow-hidden"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
              className="bg-background px-8 py-10 flex flex-col gap-2 group hover:bg-neutral-900/60 transition-colors duration-300"
            >
              <span className="text-5xl md:text-6xl font-bold tracking-tighter text-white group-hover:text-neutral-200 transition-colors">
                {stat.value}
              </span>
              <span className="text-sm text-neutral-500 leading-snug">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
