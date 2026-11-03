'use client';

// ============================================================================
// Edge Matrix Corporation — Glass Panel
// Large-format glassmorphism container for hero areas, stat sections, CTAs
//
// WHY: Distinct from GlowCard — GlassPanel is for large, full-width or
// near-full-width content areas. It has stronger blur, more padding,
// and no hover effects (it's a container, not an interactive element).
//
// USAGE: Stats bar, featured content, hero sub-panels, map containers
// ============================================================================

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { DURATION, EASE } from '@/animations/variants';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  /** Visual weight */
  intensity?: 'light' | 'medium' | 'strong';
  /** Scroll reveal */
  inView?: boolean;
  delay?: number;
}

const intensityClasses = {
  light: 'em-glass',
  medium: 'em-glass-strong',
  strong: 'bg-em-surface/90 backdrop-blur-3xl border border-em-border',
};

export function GlassPanel({
  children,
  className = '',
  intensity = 'medium',
  inView = true,
  delay = 0,
}: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: DURATION.slow, delay, ease: EASE.cinematic }}
      className={`rounded-2xl ${intensityClasses[intensity]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
