'use client';

// ============================================================================
// Edge Matrix Corporation — Glow Card v2 (Dark Theme + 3D Tilt)
// Dark glass surface, stronger red glows, Framer Motion 3D hover tilt.
// ============================================================================

import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { DURATION, EASE } from '@/animations/variants';

type GlowColor = 'primary' | 'accent' | 'highlight' | 'none';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glow?: GlowColor;
  delay?: number;
  inView?: boolean;
  hoverable?: boolean;
  tilt?: boolean;
  as?: 'div' | 'article' | 'li';
}

const glowStyles: Record<GlowColor, string> = {
  primary:
    'hover:border-em-primary/35 hover:shadow-[0_8px_30px_rgba(230,0,38,0.08),0_4px_12px_rgba(10,11,13,0.03)]',
  accent:
    'hover:border-em-accent/20 hover:shadow-[0_8px_30px_rgba(10,11,13,0.06)]',
  highlight:
    'hover:border-em-primary/35 hover:shadow-[0_8px_30px_rgba(230,0,38,0.08)]',
  none: '',
};

export function GlowCard({
  children,
  className = '',
  glow = 'primary',
  delay = 0,
  inView = true,
  hoverable = true,
  tilt = true,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 350, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.normal, delay, ease: EASE.cinematic }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tilt
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 800,
            }
          : {}
      }
      className={`
        rounded-2xl
        bg-white/75
        backdrop-blur-xl
        border border-em-border
        transition-all duration-500
        ${glowStyles[glow]}
        ${hoverable ? 'hover:bg-em-surface-light hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
