'use client';

// ============================================================================
// Edge Matrix Corporation — Section Wrapper
// Enterprise section container with scroll-triggered reveal and background
//
// WHY: Every section needs the same padding, positioning context,
// background support, and IntersectionObserver setup. This component
// eliminates 15+ lines of boilerplate per section.
//
// PERFORMANCE: Uses IntersectionObserver (not scroll events).
// Children only animate when the section enters viewport.
// Backgrounds are absolute-positioned and composited on GPU.
// ============================================================================

import { ReactNode, forwardRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

type BackgroundPattern = 'none' | 'grid' | 'grid-dense' | 'dots';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Section padding variant */
  size?: 'default' | 'sm' | 'lg';
  /** Background pattern */
  background?: BackgroundPattern;
  /** Background pattern opacity (0-100) */
  backgroundOpacity?: number;
  /** Show a gradient orb effect */
  glowPosition?: 'none' | 'center' | 'top-right' | 'bottom-left' | 'top-left';
  /** Glow color */
  glowColor?: 'primary' | 'accent' | 'highlight';
  /** ARIA label for the section */
  ariaLabel?: string;
  /** ARIA labelledby for the section */
  ariaLabelledBy?: string;
}

const bgPatternClasses: Record<BackgroundPattern, string> = {
  none: '',
  grid: 'em-grid-bg',
  'grid-dense': 'em-grid-bg-dense',
  dots: 'em-dots-bg',
};

const sizeClasses = {
  default: 'em-section',
  sm: 'em-section-sm',
  lg: 'em-section',
};

const glowColors = {
  primary: 'rgba(37, 99, 235, 0.1)',
  accent: 'rgba(6, 182, 212, 0.1)',
  highlight: 'rgba(124, 58, 237, 0.1)',
};

const glowPositions = {
  none: '',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'top-left': 'top-0 left-0',
};

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  function SectionWrapper(
    {
      children,
      id,
      className = '',
      size = 'default',
      background = 'none',
      backgroundOpacity = 25,
      glowPosition = 'none',
      glowColor = 'primary',
      ariaLabel,
      ariaLabelledBy,
    },
    ref
  ) {
    const { ref: scrollRef, isInView } = useScrollAnimation({ threshold: 0.1 });

    // Merge refs
    const mergedRef = useCallback(
      (node: HTMLElement | null) => {
        // IntersectionObserver ref
        (scrollRef as React.MutableRefObject<HTMLElement | null>).current = node;
        // Forwarded ref
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      },
      [ref, scrollRef]
    );

    return (
      <section
        ref={mergedRef}
        id={id}
        className={`relative overflow-hidden ${sizeClasses[size]} ${className}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {/* Background pattern */}
        {background !== 'none' && (
          <div
            className={`absolute inset-0 ${bgPatternClasses[background]}`}
            style={{ opacity: backgroundOpacity / 100 }}
            aria-hidden="true"
          />
        )}

        {/* Gradient glow orb */}
        {glowPosition !== 'none' && (
          <div
            className={`absolute w-[600px] h-[600px] rounded-full pointer-events-none ${glowPositions[glowPosition]}`}
            style={{
              background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
              opacity: 0.2,
            }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </section>
    );
  }
);
