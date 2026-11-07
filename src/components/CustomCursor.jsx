import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springCfg = { stiffness: 450, damping: 28 };
  const smoothX = useSpring(-100, springCfg);
  const smoothY = useSpring(-100, springCfg);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        target.classList.contains('hover-target')
      );
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;
  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Follower Ring with Indigo Glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-indigo-400/50"
        style={{
          x: smoothX,
          y: smoothY,
          boxShadow: isHovering ? '0 0 25px rgba(99, 102, 241, 0.4)' : 'none',
        }}
        animate={{
          width: isHovering ? 52 : isClicking ? 22 : 34,
          height: isHovering ? 52 : isClicking ? 22 : 34,
          marginLeft: isHovering ? -26 : isClicking ? -11 : -17,
          marginTop: isHovering ? -26 : isClicking ? -11 : -17,
          borderColor: isHovering ? 'rgba(129, 140, 248, 0.9)' : 'rgba(99, 102, 241, 0.45)',
          backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />

      {/* Center Precise Dot */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`,
          width: 6,
          height: 6,
          transition: 'transform 0.04s ease-out',
        }}
      />
    </>
  );
}
