import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated counter hook with easeOutExpo
function useCounter(target, duration = 1.6) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseFloat(target);
    const range = end - start;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(start + range * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, label, delay }) {
  const numeric = parseFloat(value);
  const { count, ref } = useCounter(numeric, 1.8);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.4)' }}
      className="bg-[#07080f]/80 backdrop-blur-xl px-8 py-10 flex flex-col gap-2 rounded-2xl border border-white/[0.06] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 group"
    >
      <span className="text-5xl md:text-6xl font-black tracking-tighter text-white tabular-nums group-hover:text-indigo-300 transition-colors">
        {Number.isInteger(numeric) ? Math.round(count) : count.toFixed(1)}{suffix}
      </span>
      <span className="text-sm text-neutral-400 font-medium leading-snug">{label}</span>
    </motion.div>
  );
}

const stats = [
  { value: '1.5', suffix: '+', label: 'Years Professional Experience' },
  { value: '3',   suffix: '',  label: 'Companies Shipped Real Products' },
  { value: '20',  suffix: '+', label: 'REST APIs Built & Deployed' },
  { value: '50',  suffix: '%', label: 'Error Reduction at FarEye' },
];

function AnimatedHeadline({ text, className }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 relative z-10 overflow-hidden">
      {/* Subtle top/bottom glow lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section tag */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono tracking-[0.25em] uppercase text-indigo-400 mb-12 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          01 / About
        </motion.p>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-24">
          {/* Left — animated headline */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <AnimatedHeadline text="I build systems that" className="block mb-1 text-white" />
              <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                <motion.em
                  style={{ display: 'inline-block', fontStyle: 'italic' }}
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-gradient-to-r from-indigo-300 via-sky-300 to-indigo-400 bg-clip-text text-transparent"
                >
                  actually ship
                </motion.em>
              </span>
              <span style={{ display: 'inline-block', overflow: 'hidden', marginLeft: '0.3em' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-neutral-400"
                >
                  —
                </motion.span>
              </span>
              <br />
              <AnimatedHeadline text="not just compile." className="block text-white" />
            </h2>
          </div>

          {/* Right — paragraphs with glowing callouts */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            {[
              <>I'm a Java backend developer currently at{' '}<span className="text-white font-semibold underline underline-offset-4 decoration-indigo-500/50">Damco Solutions</span>, where I'm modernizing core legacy architecture to high-speed Spring Boot REST microservices and an Angular frontend. My ECE background gave me a low-level systems mindset — I prioritize memory efficiency, latency, and data integrity.</>,
              <>I care about the product side of engineering. I want to understand{' '}<em>why</em> an API needs to exist before I write a single endpoint. I thrive in environments where backend resiliency directly shapes customer experience — not where code disappears into an untracked black box.</>,
              <>Outside work: load-testing endpoints, optimizing complex SQL queries, exploring distributed patterns, and polishing full-stack UI experiences.</>
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`text-lg leading-relaxed ${i === 0 ? 'text-neutral-200' : 'text-neutral-400'}`}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Animated stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
