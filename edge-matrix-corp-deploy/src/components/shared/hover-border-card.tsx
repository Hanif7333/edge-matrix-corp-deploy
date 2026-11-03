'use client';

// ============================================================================
// Edge Matrix Corporation — Hover Border Card
// Premium card system with cursor-tracking border gradients.
// ============================================================================

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface HoverBorderCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glowColor?: 'primary' | 'accent' | 'highlight';
}

export function HoverBorderCard({
  children,
  className = '',
  delay = 0,
  glowColor = 'primary',
}: HoverBorderCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const glowStyles = {
    primary: 'rgba(230, 0, 38, 1)',
    accent: 'rgba(15, 23, 42, 1)',
    highlight: 'rgba(255, 42, 75, 1)',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative rounded-2xl bg-em-surface/60 border border-em-border overflow-hidden group ${className}`}
    >
      {/* Base Inner Background */}
      <div className="absolute inset-[1px] bg-em-surface/90 rounded-[15px] z-0 transition-colors duration-500 group-hover:bg-em-surface/70" />
      
      {/* Animated Cursor Glow on the Border */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowStyles[glowColor]}, transparent 40%)`,
            opacity: 0.3,
          }}
        />
      )}

      {/* Mask to only show glow on the actual border (1px edge) */}
      {isHovered && (
        <div
          className="absolute inset-[1px] bg-em-surface pointer-events-none z-0 rounded-[15px]"
          style={{
            background: 'inherit',
          }}
        />
      )}
      
      {/* Top subtle gradient highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-em-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
