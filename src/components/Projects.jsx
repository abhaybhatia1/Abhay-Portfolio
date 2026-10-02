import React from 'react';
import { motion } from 'framer-motion';
import data from '../data/portfolioData.json';
import { ArrowUpRight } from 'lucide-react';

const { projects } = data;

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-accent/10 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-muted"
          >
            03 / Selected Work
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mt-4"
          >
            Product-minded <br />technical work.
          </motion.h3>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.name}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row gap-12 md:gap-24 items-center"
            >
              {/* Abstract Visual Placeholder since we don't have images */}
              <div className="w-full md:w-1/2 aspect-video bg-neutral-900 rounded-lg overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center text-neutral-800 font-bold text-[12rem] opacity-20 select-none">
                  0{index + 1}
                </div>
                {/* Decorative elements */}
                <div className="absolute top-8 left-8 w-16 h-[1px] bg-neutral-700" />
                <div className="absolute bottom-8 right-8 w-1 h-16 bg-neutral-700" />
              </div>

              <div className="w-full md:w-1/2 flex flex-col items-start">
                <p className="text-xs tracking-widest uppercase text-neutral-500 mb-6 flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="bg-neutral-900 px-3 py-1 rounded-full">{tech}</span>
                  ))}
                </p>
                <h4 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-neutral-300 transition-colors">
                  {project.name}
                </h4>
                <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                  {project.description}
                </p>
                
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-neutral-400 transition-colors pb-1 border-b border-white hover:border-neutral-400"
                >
                  View Repository <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
