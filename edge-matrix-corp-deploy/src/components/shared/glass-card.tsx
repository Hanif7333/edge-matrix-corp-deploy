'use client';

// ============================================================================
// Edge Matrix Corporation — Glass Card
// Reusable glassmorphism card component with hover glow effect
// ============================================================================

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: 'primary' | 'accent' | 'highlight' | 'none';
  delay?: number;
  inView?: boolean;
}

const glowColors = {
  primary: 'hover:border-em-primary/30 hover:shadow-[0_0_40px_rgba(230,0,38,0.06)]',
  accent: 'hover:border-em-accent/30 hover:shadow-[0_0_40px_rgba(15,23,42,0.04)]',
  highlight: 'hover:border-em-highlight/30 hover:shadow-[0_0_40px_rgba(230,0,38,0.06)]',
  none: '',
};

export function GlassCard({
  children,
  className = '',
  hoverGlow = 'primary',
  delay = 0,
  inView = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`
        rounded-2xl
        bg-em-surface/60
        backdrop-blur-xl
        border border-em-border
        transition-all duration-500
        ${glowColors[hoverGlow]}
        hover:bg-em-surface/80
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
