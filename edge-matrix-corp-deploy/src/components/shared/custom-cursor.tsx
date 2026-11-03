'use client';

// ============================================================================
// Edge Matrix Corporation — Premium Custom Cursor v2
// Dark theme: red dot (instant) + white glassmorphism trailing ring (spring)
// Expands and inverts on hoverable elements. Hidden on touch devices.
// ============================================================================

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const timer = setTimeout(() => {
      setMounted(true);
      document.documentElement.classList.add('has-custom-cursor');
    }, 0);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  // Dot tracks instantly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring springs behind with inertia
  const ringRawX = useMotionValue(-100);
  const ringRawY = useMotionValue(-100);
  const ringSpringConfig = { damping: 22, stiffness: 280, mass: 0.6 };
  const ringX = useSpring(ringRawX, ringSpringConfig);
  const ringY = useSpring(ringRawY, ringSpringConfig);

  const onMouseMove = useCallback((e: MouseEvent) => {
    dotX.set(e.clientX - 4);
    dotY.set(e.clientY - 4);
    ringRawX.set(e.clientX - 16);
    ringRawY.set(e.clientY - 16);
    setIsVisible(true);
  }, [dotX, dotY, ringRawX, ringRawY]);

  const onMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.closest('a') !== null ||
      target.closest('button') !== null ||
      window.getComputedStyle(target).cursor === 'pointer';
    setIsHovering(isClickable);
  }, []);

  const onMouseLeave = useCallback(() => setIsVisible(false), []);
  const onMouseDown = useCallback(() => setIsClicking(true), []);
  const onMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseOver, onMouseLeave, onMouseDown, onMouseUp]);

  // Don't render on server, during initial paint (hydration), or on touch devices
  if (!mounted || window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* ── Glassmorphism Ring (springs behind) ────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
          border: '1px solid rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          background: 'rgba(255, 255, 255, 0.04)',
        }}
        animate={{
          scale: isHovering ? 1.8 : isClicking ? 0.85 : 1,
          background: isHovering
            ? 'rgba(230, 0, 38, 0.12)'
            : 'rgba(255, 255, 255, 0.04)',
          borderColor: isHovering
            ? 'rgba(230, 0, 38, 0.7)'
            : 'rgba(255, 255, 255, 0.4)',
          boxShadow: isHovering
            ? '0 0 16px rgba(230, 0, 38, 0.4), inset 0 0 8px rgba(230, 0, 38, 0.1)'
            : '0 0 8px rgba(255, 255, 255, 0.05)',
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Red Dot (instant tracking) ──────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000]"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
          backgroundColor: '#E60026',
        }}
        animate={{
          scale: isHovering ? 0 : isClicking ? 1.6 : 1,
          backgroundColor: isClicking ? '#FF2A4B' : '#E60026',
          boxShadow: isHovering
            ? 'none'
            : '0 0 8px rgba(230, 0, 38, 0.9), 0 0 18px rgba(230, 0, 38, 0.4)',
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />
    </>
  );
}
