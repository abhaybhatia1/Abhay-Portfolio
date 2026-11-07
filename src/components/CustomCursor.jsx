import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [active, setActive] = useState(false);
  const isMountedRef = useRef(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const springCfg = { stiffness: 450, damping: 28 };
  const smoothX = useSpring(-100, springCfg);
  const smoothY = useSpring(-100, springCfg);

  useEffect(() => {
    // Disable on touch screens or small devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return;

    isMountedRef.current = true;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
      setActive(true);
    };

    const onOver = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        target.classList.contains('hover-target') ||
        target.getAttribute('role') === 'button'
      );
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setActive(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [smoothX, smoothY]);

  if (!active) return null;

  return (
    <>
      {/* Outer Spring Follower Ring with Purple Glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border"
        style={{
          x: smoothX,
          y: smoothY,
          boxShadow: isHovering
            ? isLight
              ? '0 0 25px rgba(147, 51, 234, 0.4)'
              : '0 0 25px rgba(168, 85, 247, 0.45)'
            : 'none',
        }}
        animate={{
          width: isHovering ? 52 : isClicking ? 22 : 34,
          height: isHovering ? 52 : isClicking ? 22 : 34,
          marginLeft: isHovering ? -26 : isClicking ? -11 : -17,
          marginTop: isHovering ? -26 : isClicking ? -11 : -17,
          borderColor: isHovering
            ? isLight
              ? 'rgba(126, 34, 206, 0.9)'
              : 'rgba(192, 132, 252, 0.9)'
            : isLight
            ? 'rgba(147, 51, 234, 0.4)'
            : 'rgba(168, 85, 247, 0.4)',
          backgroundColor: isHovering
            ? isLight
              ? 'rgba(147, 51, 234, 0.1)'
              : 'rgba(168, 85, 247, 0.08)'
            : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />

      {/* Center Precise Dot */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] shadow-sm ${
          isLight ? 'bg-purple-700 shadow-purple-500/50' : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
        }`}
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
