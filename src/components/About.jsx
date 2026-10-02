import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-background relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="w-full md:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-widest uppercase text-muted"
          >
            01 / About
          </motion.h2>
        </div>
        
        <div className="w-full md:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8">
              I apply modern <span className="text-neutral-500 italic">engineering principles</span> to research, design, develop, and maintain scalable applications.
            </h3>
            
            <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
              I enjoy untangling complex problems, collaborating with stakeholders, and shipping dependable results. My focus bridges robust backend architectures with seamless frontend experiences.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
