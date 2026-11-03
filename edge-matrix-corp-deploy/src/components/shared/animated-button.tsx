'use client';

// ============================================================================
// Edge Matrix Corporation — Animated Button
// Enterprise CTA button with gradient fill, glow, and motion feedback
//
// WHY: CTAs are the most important conversion elements. This component
// ensures every button has: proper focus states, tap feedback, hover glow,
// gradient styling, and consistent sizing across the site.
//
// VARIANTS:
// - primary: Gradient fill — main CTAs ("Get Started", "Schedule a Call")
// - secondary: Outline — secondary actions ("Contact Us", "Learn More")
// - ghost: Minimal — tertiary actions ("View All", nav links)
//
// PERFORMANCE: Hover effects use box-shadow (GPU-composited).
// Tap animation is spring-physics for natural feedback.
// ============================================================================

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { DURATION, EASE, tapScale } from '@/animations/variants';

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

const variantClasses = {
  primary: `
    relative overflow-hidden text-white font-medium rounded-xl
    hover:shadow-[0_0_50px_rgba(230,0,38,0.25)]
    transition-shadow duration-300
  `,
  secondary: `
    font-medium rounded-xl
    bg-em-accent border border-em-accent text-white
    hover:bg-em-accent/90 hover:shadow-md
    transition-all duration-300
  `,
  ghost: `
    font-medium rounded-lg
    text-em-text-muted
    hover:text-em-text hover:bg-em-surface-light
    transition-all duration-200
  `,
};

export function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  disabled = false,
  ariaLabel,
}: AnimatedButtonProps) {
  const classes = `
    inline-flex items-center justify-center
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
    ${className}
  `;

  const content = (
    <>
      {variant === 'primary' && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-em-primary to-em-primary-light transition-all duration-500"
          aria-hidden="true"
        />
      )}
      <span className={variant === 'primary' ? 'relative' : ''}>{children}</span>
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: tapScale,
    transition: { duration: DURATION.instant, ease: EASE.snappy },
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        <motion.span
          className="inline-flex items-center gap-inherit w-full justify-center"
          {...motionProps}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
