import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Mail, ArrowUpRight } from 'lucide-react';
import ArchitectureConsole from './ArchitectureConsole';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/audio';

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

  const handleClick = (e) => {
    sounds.playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      onMouseEnter={() => sounds.playHover()}
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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden"
      id="top"
    >
      {/* Radiant Background Glow Orbs */}
      <motion.div
        style={{ y: orb1Y }}
        className={`absolute top-1/6 left-1/4 w-[42vw] h-[42vw] rounded-full blur-[140px] pointer-events-none transition-colors duration-500 ${
          isLight ? 'bg-purple-300/35' : 'bg-purple-600/15'
        }`}
      />
      <motion.div
        style={{ y: orb2Y }}
        className={`absolute bottom-1/4 right-1/4 w-[34vw] h-[34vw] rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${
          isLight ? 'bg-fuchsia-200/40' : 'bg-violet-600/12'
        }`}
      />
      <motion.div
        style={{ y: orb1Y }}
        className={`absolute top-1/2 right-1/3 w-[24vw] h-[24vw] rounded-full blur-[90px] pointer-events-none transition-colors duration-500 ${
          isLight ? 'bg-indigo-200/30' : 'bg-indigo-500/8'
        }`}
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
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold liquid-glass-pill ${
            isLight
              ? 'bg-purple-100/90 border-purple-300 text-purple-900 shadow-sm'
              : 'bg-purple-500/10 border-purple-500/30 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Open to Engineering Roles · 2027
          </span>
          <span className="opacity-30 text-xs hidden sm:inline">|</span>
          <span className={`text-xs font-mono tracking-wider uppercase font-semibold hidden sm:inline ${
            isLight ? 'text-purple-900/80' : 'text-neutral-400'
          }`}>
            Java Backend Developer
          </span>
        </motion.div>

        {/* Hero Name with Screen-Reader Accessible SplitText */}
        <div className="mb-6">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1.02]"
            aria-label="Abhay Bhatia"
          >
            <span className={`drop-shadow-[0_0_35px_rgba(168,85,247,0.2)] block ${
              isLight ? 'text-[#140827]' : 'text-white'
            }`}>
              <SplitText text="ABHAY" delay={0.25} />
            </span>
            <span className={`bg-clip-text text-transparent block mt-1 ${
              isLight
                ? 'bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600'
                : 'bg-gradient-to-r from-neutral-300 via-purple-300 to-sky-300'
            }`}>
              <SplitText text="BHATIA" delay={0.45} />
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed font-normal mb-8 ${
            isLight ? 'text-[#3c2f58]' : 'text-neutral-300'
          }`}
        >
          Building high-performance backend architectures, distributed microservices, and secure RESTful APIs with{' '}
          <span className={`font-semibold ${isLight ? 'text-purple-700' : 'text-purple-300'}`}>
            Java & Spring Boot
          </span>
          . Currently modernizing enterprise systems at{' '}
          <span className={`font-semibold underline underline-offset-4 ${
            isLight ? 'text-purple-900 decoration-purple-400' : 'text-white decoration-purple-500/50'
          }`}>
            Damco Solutions
          </span>
          , Noida.
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
              whileHover={{ scale: 1.08 }}
              onMouseEnter={() => sounds.playHover()}
              className={`px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide cursor-default transition-all duration-200 liquid-glass-pill ${
                isLight
                  ? 'bg-white/80 border-purple-200/90 text-purple-950 shadow-sm'
                  : 'bg-white/[0.04] border-white/10 text-neutral-200'
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4 mb-14"
        >
          <MagneticButton
            href="mailto:abhaybhatia0898@gmail.com"
            className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full shadow-lg transition-all cursor-pointer ${
              isLight
                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-400/40'
                : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.35)]'
            }`}
          >
            <Mail size={15} />
            Get in Touch
          </MagneticButton>

          <MagneticButton
            href="https://github.com/abhaybhatia1"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-7 py-3.5 border text-sm font-semibold rounded-full transition-all cursor-pointer liquid-glass-pill ${
              isLight
                ? 'border-purple-300 bg-white/90 text-purple-950 hover:border-purple-500 shadow-sm'
                : 'border-white/15 bg-white/[0.04] text-neutral-200 hover:border-purple-400'
            }`}
          >
            <GithubIcon size={15} />
            GitHub Profile
          </MagneticButton>

          <MagneticButton
            href="#projects"
            className={`inline-flex items-center gap-1.5 px-6 py-3.5 text-sm font-mono font-semibold transition-opacity cursor-pointer ${
              isLight ? 'text-purple-900/80 hover:text-purple-950' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>Explore Work</span>
            <ArrowUpRight size={14} />
          </MagneticButton>
        </motion.div>

        {/* Interactive Architecture Console (Hidden per user request, preserved for future use) */}
        {/* <ArchitectureConsole /> */}
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className={`mt-14 flex items-center gap-3 text-xs uppercase tracking-widest pl-1 font-mono max-w-6xl mx-auto w-full ${
          isLight ? 'text-purple-900/60' : 'text-neutral-500'
        }`}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={13} className={isLight ? 'text-purple-600' : 'text-purple-400'} />
        </motion.div>
        <span>Scroll to explore background & work</span>
      </motion.div>
    </section>
  );
}
