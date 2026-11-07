import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const links = [
  {
    label: 'Send an Email',
    sub: 'abhaybhatia0898@gmail.com',
    href: 'mailto:abhaybhatia0898@gmail.com',
    icon: Mail,
  },
  {
    label: 'GitHub',
    sub: 'github.com/abhaybhatia1',
    href: 'https://github.com/abhaybhatia1',
    icon: GithubIcon,
    external: true,
  },
  {
    label: 'LinkedIn',
    sub: 'linkedin.com/in/abhay-bhatia-202935229',
    href: 'https://in.linkedin.com/in/abhay-bhatia-202935229',
    icon: LinkedinIcon,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-36 px-6 md:px-12 relative overflow-hidden border-t border-white/[0.06]">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono tracking-[0.25em] uppercase text-indigo-400 mb-12 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          05 / Contact
        </motion.p>

        {/* Headline */}
        <div className="mb-20">
          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
              className="text-6xl md:text-8xl lg:text-[8.5rem] font-black tracking-tight leading-none text-white"
            >
              LET'S
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.08 }}
              className="text-6xl md:text-8xl lg:text-[8.5rem] font-black tracking-tight leading-none bg-gradient-to-r from-neutral-300 via-indigo-300 to-indigo-500 bg-clip-text text-transparent"
            >
              CONNECT.
            </motion.h2>
          </div>
        </div>

        {/* Contact links list */}
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="group flex items-center justify-between py-8 text-neutral-300 hover:text-white transition-all duration-200"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:border-indigo-400 group-hover:bg-indigo-500/10 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-200">
                    <Icon size={18} className="text-neutral-300 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {link.label}
                    </p>
                    <p className="text-sm font-mono text-neutral-400 mt-0.5">{link.sub}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-neutral-500 group-hover:text-indigo-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-200"
                />
              </motion.a>
            );
          })}
        </div>

        {/* Availability status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 inline-flex items-center gap-2.5 text-xs text-neutral-300 border border-emerald-500/30 bg-emerald-500/5 rounded-full px-4 py-2 font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          Currently open to backend & full-stack software engineering roles
        </motion.div>
      </div>
    </section>
  );
}
