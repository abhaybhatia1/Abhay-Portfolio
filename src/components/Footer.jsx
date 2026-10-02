import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-neutral-900 bg-background flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
      <p>© {new Date().getFullYear()} Abhay Bhatia. All rights reserved.</p>
      
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <span className="uppercase tracking-widest text-xs">Software Engineer</span>
        <div className="w-1 h-1 bg-neutral-700 rounded-full" />
        <span className="uppercase tracking-widest text-xs">Gurgaon, India</span>
      </div>
    </footer>
  );
}
