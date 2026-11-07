import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import data from '../data/portfolioData.json';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/audio';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

const { projects } = data;

const accents = [
  {
    glow: 'rgba(168,85,247,0.22)',
    border: 'rgba(168,85,247,0.5)',
    tagLight: 'bg-purple-100/90 text-purple-800 border-purple-300',
    tagDark: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  },
  {
    glow: 'rgba(56,189,248,0.20)',
    border: 'rgba(56,189,248,0.5)',
    tagLight: 'bg-sky-100/90 text-sky-800 border-sky-300',
    tagDark: 'bg-sky-500/10 text-sky-300 border-sky-500/30'
  },
  {
    glow: 'rgba(16,185,129,0.18)',
    border: 'rgba(16,185,129,0.5)',
    tagLight: 'bg-emerald-100/90 text-emerald-800 border-emerald-300',
    tagDark: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
  },
];

function TiltCard({ children, className, accentGlow, accentBorder, onClick, isLight }) {
  const ref = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const springCfg = { stiffness: 180, damping: 22 };
  const rotateX = useSpring(0, springCfg);
  const rotateY = useSpring(0, springCfg);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rotateX.set(-(ny - 0.5) * 7);
    rotateY.set((nx - 0.5) * 7);
    setGlowPos({ x: nx * 100, y: ny * 100 });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  const handleMouseEnter = () => {
    sounds.playHover();
    setHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        boxShadow: hovered ? `0 0 50px ${accentGlow}` : undefined,
        borderColor: hovered ? accentBorder : isLight ? 'rgba(168,85,247,0.22)' : 'rgba(255,255,255,0.08)',
      }}
      className={className}
    >
      {hovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${accentGlow}, transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleCardClick = (url) => {
    sounds.playClick();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="py-32 px-6 md:px-12 border-t border-inherit relative overflow-hidden">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] rounded-full blur-[140px] pointer-events-none ${
        isLight ? 'bg-purple-300/15' : 'bg-purple-600/5'
      }`} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2 font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              03 / Selected Work
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className={`text-4xl md:text-6xl font-bold tracking-tight leading-none ${
                isLight ? 'text-[#140827]' : 'text-white'
              }`}
            >
              Things I've<br />
              <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 dark:from-neutral-300 dark:to-purple-300 bg-clip-text text-transparent">
                actually built.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-sm max-w-xs leading-relaxed md:text-right font-medium ${
              isLight ? 'text-[#504070]' : 'text-neutral-400'
            }`}
          >
            Click any project card to inspect the source code, architecture, and schema on GitHub.
          </motion.p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => {
            const accent = accents[index % accents.length];

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TiltCard
                  accentGlow={accent.glow}
                  accentBorder={accent.border}
                  isLight={isLight}
                  onClick={() => handleCardClick(project.url)}
                  className={`relative rounded-2xl border overflow-hidden cursor-pointer group transition-all duration-300 liquid-glass ${
                    isLight
                      ? 'bg-white/85 border-purple-200/90 shadow-xl shadow-purple-950/5 hover:shadow-2xl'
                      : 'bg-[#0b0816]/80 border-white/[0.08] shadow-2xl'
                  }`}
                >
                  {/* Glowing Top Progress Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)` }}
                  />

                  <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-16 md:items-start">
                    {/* Left: index + name + description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4 mb-4">
                        <span
                          className="text-5xl md:text-6xl font-black leading-none select-none flex-shrink-0 transition-opacity font-mono"
                          style={{ color: isLight ? '#9333ea' : accent.border, opacity: isLight ? 0.6 : 0.4 }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              sounds.playClick();
                            }}
                            onMouseEnter={() => sounds.playHover()}
                            className="inline-flex items-center gap-2 group/title"
                          >
                            <h3 className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
                              isLight
                                ? 'text-[#140827] group-hover/title:text-purple-700'
                                : 'text-white group-hover/title:text-purple-300'
                            }`}>
                              {project.name}
                            </h3>
                            <ArrowUpRight
                              size={18}
                              className={`transition-all ${
                                isLight
                                  ? 'text-purple-700 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5'
                                  : 'text-neutral-400 group-hover/title:text-purple-300 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5'
                              }`}
                            />
                          </a>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className={`text-xs px-3 py-1 rounded-full border font-semibold liquid-glass-pill ${
                                  isLight ? accent.tagLight : accent.tagDark
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className={`leading-relaxed text-base max-w-2xl font-normal mt-3 ${
                        isLight ? 'text-[#3c2f58]' : 'text-neutral-300'
                      }`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Right: impact pills + GitHub action button */}
                    <div className="flex flex-col gap-5 md:min-w-[240px] md:items-end justify-between">
                      {project.impact && (
                        <div className="flex flex-row md:flex-col gap-2.5 flex-wrap md:items-end">
                          {project.impact.map((item) => (
                            <div
                              key={item}
                              className={`flex items-center gap-2 text-xs font-mono font-semibold rounded-lg px-3.5 py-2 border liquid-glass-pill ${
                                isLight
                                  ? 'bg-purple-50/90 border-purple-200/90 text-purple-950 shadow-sm'
                                  : 'bg-white/[0.04] border-white/[0.08] text-neutral-200'
                              }`}
                            >
                              <ChevronRight size={13} className="text-purple-500 flex-shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sounds.playClick();
                          }}
                          onMouseEnter={() => sounds.playHover()}
                          className={`inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold rounded-xl px-4 py-2.5 shadow-md transition-all duration-200 ${
                            isLight
                              ? 'text-white bg-purple-600 hover:bg-purple-700 shadow-purple-500/20'
                              : 'text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          }`}
                        >
                          <GithubIcon size={14} />
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
