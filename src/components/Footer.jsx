import React from 'react';

export default function Footer() {
  return (
    <footer className="py-10 px-6 md:px-12 border-t border-white/[0.06] bg-[#040407] flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400 font-mono">
      <p>© {new Date().getFullYear()} Abhay Bhatia. Built with React & Vite.</p>
      
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <span className="uppercase tracking-widest text-indigo-400">Java Backend Developer</span>
        <div className="w-1 h-1 bg-indigo-500 rounded-full" />
        <span className="uppercase tracking-widest text-neutral-400">Gurgaon, India</span>
      </div>
    </footer>
  );
}
