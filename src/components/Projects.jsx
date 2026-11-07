import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import data from '../data/portfolioData.json';
import { ArrowUpRight, ExternalLink, ChevronRight } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

const { projects } = data;

const accents = [
  { glow: 'rgba(99,102,241,0.18)',  border: 'rgba(99,102,241,0.4)',  tag: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'  },
  { glow: 'rgba(16,185,129,0.14)',  border: 'rgba(16,185,129,0.4)',  tag: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  { glow: 'rgba(245,158,11,0.14)',  border: 'rgba(245,158,11,0.4)',  tag: 'bg-amber-500/10  text-amber-300  border-amber-500/20'    },
];

// 3-D tilt card driven by mouse position
function TiltCard({ children, className, accentGlow, accentBorder }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const springCfg = { stiffness: 180, damping: 22 };
  const rotateX = useSpring(0, springCfg);
  const rotateY = useSpring(0, springCfg);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top)  / rect.height;
    rotateX.set(-(ny - 0.5) * 10);
    rotateY.set( (nx - 0.5) * 10);
    setGlowPos({ x: nx * 100, y: ny * 100 });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        boxShadow: hovered ? `0 0 80px ${accentGlow}, 0 0 1px ${accentBorder}` : '0 0 0 rgba(0,0,0,0)',
        borderColor: hovered ? accentBorder : 'rgba(64,64,64,1)',
        transition: 'box-shadow 0.4s, border-color 0.4s',
      }}
      className={className}
    >
      {/* Mouse-following glow spotlight */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, ${accentGlow}, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 border-t border-neutral-900 relative overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

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

            {/* Word-reveal headline */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
                  Things I've<br />
                  <span className="text-neutral-500">actually built.</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 text-sm max-w-xs leading-relaxed md:text-right"
          >
            Each project is a problem I chose to solve, not a tutorial I followed.
          </motion.p>
        </div>

        {/* Tilt project cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => {
            const accent = accents[index % accents.length];

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              >
                <TiltCard
                  accentGlow={accent.glow}
                  accentBorder={accent.border}
                  className="relative rounded-2xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-sm overflow-hidden"
                >
                  {/* Animated top bar */}
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)` }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                  />

                  <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-16 md:items-start">

                    {/* Left: index + name + description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4 mb-5">
                        <motion.span
                          className="text-6xl font-bold leading-none select-none flex-shrink-0"
                          style={{ color: accent.border, opacity: 0.3 }}
                          whileHover={{ opacity: 0.7 }}
                          transition={{ duration: 0.2 }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </motion.span>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
                            {project.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <motion.span
                                key={tech}
                                whileHover={{ scale: 1.08 }}
                                className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${accent.tag}`}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-neutral-400 leading-relaxed text-base md:text-lg max-w-2xl">
                        {project.description}
                      </p>
                    </div>

                    {/* Right: impact pills + buttons */}
                    <div className="flex flex-col gap-6 md:min-w-[220px] md:items-end justify-between">
                      {project.impact && (
                        <div className="flex flex-row md:flex-col gap-3 flex-wrap md:items-end">
                          {project.impact.map((item, i) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.08 + 0.4 }}
                              className="flex items-center gap-2 text-sm text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
                            >
                              <ChevronRight size={12} className="text-neutral-600 flex-shrink-0" />
                              {item}
                            </motion.div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-row md:flex-col gap-3 flex-wrap">
                        <motion.a
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-neutral-300 bg-neutral-900 border border-neutral-700 hover:border-white/40 hover:text-white rounded-lg px-4 py-2.5 transition-colors duration-200"
                        >
                          <GithubIcon size={13} />
                          View Code
                        </motion.a>
                        {project.liveUrl && (
                          <motion.a
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-black bg-white hover:bg-neutral-200 rounded-lg px-4 py-2.5 transition-colors duration-200"
                          >
                            <ExternalLink size={13} />
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
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
          <motion.a
            whileHover={{ gap: '1.5rem' }}
            href="https://github.com/abhaybhatia1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-4 text-sm text-neutral-500 hover:text-white transition-colors duration-200 group"
          >
            <motion.span
              className="w-8 h-[1px] bg-neutral-700 group-hover:bg-white transition-colors duration-300"
              whileHover={{ width: 48 }}
            />
            See all repositories on GitHub
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
