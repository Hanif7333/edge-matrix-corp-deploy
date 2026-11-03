'use client';

// ============================================================================
// Edge Matrix Corporation — Section Header
// Reusable section heading with badge, title, and subtitle
// Used across all homepage sections for visual consistency
// ============================================================================

import { motion } from 'motion/react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  /** Words in the title to highlight with gradient */
  gradientWords?: string[];
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  gradientWords = [],
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });

  // Split title into words and apply gradient to matching ones
  const renderTitle = () => {
    const words = title.split(' ');
    return words.map((word, i) => {
      const isGradient = gradientWords.some(
        (gw) => gw.toLowerCase() === word.toLowerCase()
      );
      return (
        <span
          key={i}
          className={isGradient ? 'em-text-gradient' : ''}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <div
      ref={ref}
      className={`${align === 'center' ? 'text-center' : 'text-left'} mb-16 lg:mb-20 ${className}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-em-primary/[0.08] border border-em-primary/20 mb-6 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-em-primary animate-pulse-glow" />
          <span className="text-xs font-medium text-em-primary tracking-wide uppercase">
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6"
      >
        {renderTitle()}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-base sm:text-lg text-em-text-secondary leading-relaxed ${
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
