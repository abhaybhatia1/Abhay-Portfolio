import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <footer className={`py-12 px-6 md:px-12 border-t flex flex-col md:flex-row justify-between items-center text-xs font-mono transition-colors duration-300 ${
      isLight
        ? 'border-purple-200/80 bg-white/60 text-purple-900/80'
        : 'border-white/[0.08] bg-[#06050b] text-neutral-400'
    }`}>
      <p className="font-semibold">© {new Date().getFullYear()} Abhay Bhatia. Built with React & Vite.</p>
      
      <div className="flex items-center gap-4 mt-4 md:mt-0 font-bold">
        <span className={`uppercase tracking-widest ${
          isLight ? 'text-purple-700' : 'text-purple-400'
        }`}>
          Java Backend Developer
        </span>
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
        <span className={`uppercase tracking-widest ${
          isLight ? 'text-purple-900/70' : 'text-neutral-400'
        }`}>
          Gurgaon, India
        </span>
      </div>
    </footer>
  );
}
