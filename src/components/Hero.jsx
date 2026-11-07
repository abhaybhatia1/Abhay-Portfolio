import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Mail, ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

const tags = ['Java', 'Spring Boot', 'MySQL', 'React', 'REST APIs', 'Spring Security'];

function SplitText({ text, className, delay = 0 }) {
  return (
    <span className={className} style={{ display: 'inline-flex', overflow: 'hidden' }} aria-hidden="true">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function MagneticButton({ children, className, href, target, rel, onClick }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 overflow-hidden"
      id="top"
    >
      {/* Radiant Background Glow Orbs */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-1/6 left-1/4 w-[40vw] h-[40vw] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute bottom-1/4 right-1/4 w-[32vw] h-[32vw] bg-violet-600/12 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-1/2 right-1/3 w-[22vw] h-[22vw] bg-sky-500/8 rounded-full blur-[90px] pointer-events-none"
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="z-10 w-full max-w-6xl mx-auto"
      >
        {/* Availability & Role Pill */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md text-xs text-indigo-200 font-medium shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to Engineering Roles · 2027
          </span>
          <span className="text-neutral-600 text-xs hidden sm:inline">|</span>
          <span className="text-neutral-400 text-xs font-mono tracking-wider uppercase hidden sm:inline">
            Java Backend Developer
          </span>
        </motion.div>

        {/* Hero Name with Screen-Reader Accessible SplitText */}
        <div className="mb-6">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1.02]"
            aria-label="Abhay Bhatia"
          >
            <span className="text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.15)] block">
              <SplitText text="ABHAY" delay={0.25} />
            </span>
            <span className="bg-gradient-to-r from-neutral-200 via-indigo-200 to-indigo-400 bg-clip-text text-transparent block mt-1">
              <SplitText text="BHATIA" delay={0.45} />
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-3xl leading-relaxed font-normal mb-8"
        >
          Building high-performance backend architectures, distributed microservices, and secure RESTful APIs with{' '}
          <span className="text-white font-medium">Java & Spring Boot</span>. Currently modernizing enterprise systems at{' '}
          <span className="text-indigo-300 font-medium underline underline-offset-4 decoration-indigo-500/40">Damco Solutions</span>, Gurgaon.
        </motion.p>

        {/* Tech Stack Chips with Spring Hover */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.85 } } }}
          className="flex flex-wrap items-center gap-2.5 mb-10"
        >
          {tags.map((tech) => (
            <motion.span
              key={tech}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 10 },
                show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 20 } },
              }}
              whileHover={{ scale: 1.08, borderColor: '#818cf8', color: '#ffffff' }}
              className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-xs font-medium text-neutral-300 tracking-wide cursor-default transition-all duration-200 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="mailto:abhaybhatia0898@gmail.com"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-100 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] transition-all cursor-pointer"
          >
            <Mail size={15} />
            Get in Touch
          </MagneticButton>

          <MagneticButton
            href="https://github.com/abhaybhatia1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 bg-white/[0.03] backdrop-blur-sm text-sm font-medium text-neutral-200 rounded-full hover:border-indigo-400 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all cursor-pointer"
          >
            <GithubIcon size={15} />
            GitHub Profile
          </MagneticButton>

          <MagneticButton
            href="#projects"
            className="inline-flex items-center gap-1.5 px-6 py-3.5 text-sm font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Explore Work</span>
            <ArrowUpRight size={14} className="text-neutral-500" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-14 flex items-center gap-3 text-xs text-neutral-400 uppercase tracking-widest pl-1 font-mono"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={13} className="text-indigo-400" />
        </motion.div>
        <span>Scroll to explore projects & journey</span>
      </motion.div>
    </section>
  );
}
