import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/audio';

// Animated counter hook with proper requestAnimationFrame cleanup
function useCounter(target, duration = 1.6) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    let frameId;
    const start = 0;
    const end = parseFloat(target);
    const range = end - start;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(start + range * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [inView, target, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, label, delay, isLight }) {
  const numeric = parseFloat(value);
  const { count, ref } = useCounter(numeric, 1.8);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => sounds.playHover()}
      className={`px-8 py-10 flex flex-col gap-2 rounded-2xl border transition-all duration-300 group liquid-glass ${
        isLight
          ? 'bg-white/80 border-purple-200/80 shadow-lg shadow-purple-900/5 hover:border-purple-400'
          : 'bg-[#0d091a]/70 border-white/[0.08] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]'
      }`}
    >
      <span className={`text-5xl md:text-6xl font-black tracking-tighter tabular-nums transition-colors ${
        isLight ? 'text-[#140827] group-hover:text-purple-700' : 'text-white group-hover:text-purple-300'
      }`}>
        {Number.isInteger(numeric) ? Math.round(count) : count.toFixed(1)}{suffix}
      </span>
      <span className={`text-sm font-semibold leading-snug ${
        isLight ? 'text-[#504070]' : 'text-neutral-400'
      }`}>
        {label}
      </span>
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
        <React.Fragment key={i}>
          <span style={{ display: 'inline-flex', overflow: 'hidden' }}>
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
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function About() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="about" className="py-32 px-6 md:px-12 relative z-10 overflow-hidden">
      {/* Subtle top/bottom glow lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[1px] ${
          isLight
            ? 'bg-gradient-to-r from-transparent via-purple-300/60 to-transparent'
            : 'bg-gradient-to-r from-transparent via-purple-500/20 to-transparent'
        }`} />
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[1px] ${
          isLight
            ? 'bg-gradient-to-r from-transparent via-purple-300/60 to-transparent'
            : 'bg-gradient-to-r from-transparent via-purple-500/20 to-transparent'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section tag */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono tracking-[0.25em] uppercase text-purple-600 dark:text-purple-400 mb-12 flex items-center gap-2 font-bold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          01 / About
        </motion.p>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-24">
          {/* Left — animated headline */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <AnimatedHeadline
                text="I build systems that"
                className={`block mb-1 font-black ${isLight ? 'text-[#140827]' : 'text-white'}`}
              />
              <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                <motion.em
                  style={{ display: 'inline-block', fontStyle: 'italic' }}
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-300 bg-clip-text text-transparent"
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
                  className={isLight ? 'text-purple-900/60' : 'text-neutral-400'}
                >
                  —
                </motion.span>
              </span>
              <br />
              <AnimatedHeadline
                text="not just compile."
                className={`block font-black ${isLight ? 'text-[#140827]' : 'text-white'}`}
              />
            </h2>
          </div>

          {/* Right — paragraphs with glowing callouts */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            {[
              <>I'm a Java backend developer currently at{' '}<span className={`font-semibold underline underline-offset-4 ${isLight ? 'text-purple-900 decoration-purple-500' : 'text-white decoration-purple-500/60'}`}>Damco Solutions</span>, where I'm modernizing core legacy architecture to high-speed Spring Boot REST microservices and an Angular frontend. My ECE background gave me a low-level systems mindset — I prioritize memory efficiency, latency, and data integrity.</>,
              <>I care about the product side of engineering. I want to understand{' '}<em>why</em> an API needs to exist before I write a single endpoint. I thrive in environments where backend resiliency directly shapes customer experience — not where code disappears into an untracked black box.</>,
              <>Outside work: load-testing endpoints, optimizing complex SQL queries, exploring distributed patterns, and polishing full-stack UI experiences.</>
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`text-lg leading-relaxed ${
                  isLight
                    ? i === 0 ? 'text-[#201438] font-medium' : 'text-[#483966]'
                    : i === 0 ? 'text-neutral-200' : 'text-neutral-400'
                }`}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Animated stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.08} isLight={isLight} />
          ))}
        </div>
      </div>
    </section>
  );
}
