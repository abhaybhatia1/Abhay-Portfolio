import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-40 px-6 md:px-12 relative overflow-hidden bg-background">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm tracking-widest uppercase text-muted mb-8"
        >
          05 / Contact
        </motion.p>
        
        <div className="overflow-hidden mb-4">
          <motion.h2 
            initial={{ y: 150 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-none"
          >
            LET'S BUILD
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.h2 
            initial={{ y: 150 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-none text-neutral-600"
          >
            SOMETHING.
          </motion.h2>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xl text-neutral-400 mb-16 max-w-xl"
        >
          Open to software engineering opportunities and technical collaboration.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <a 
            href="mailto:abhaybhatia0898@gmail.com" 
            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform"
          >
            Email Me
          </a>
          <a 
            href="https://github.com/abhaybhatia1" 
            target="_blank" 
            rel="noreferrer"
            className="px-8 py-4 border border-neutral-700 hover:border-white font-medium rounded-full hover:bg-white hover:text-black transition-all"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
