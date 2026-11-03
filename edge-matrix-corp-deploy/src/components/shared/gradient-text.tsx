'use client';

// ============================================================================
// Edge Matrix Corporation — Gradient Text
// Inline text with animated gradient coloring
//
// WHY: Multiple sections need gradient-highlighted words. This component
// provides a consistent, accessible implementation with optional animation.
//
// ACCESSIBILITY: Uses aria-label for screen readers since
// -webkit-text-fill-color: transparent makes text invisible to some AT.
// ============================================================================

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'highlight';
  animated?: boolean;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

const gradientClasses = {
  default: 'em-text-gradient',
  primary: 'em-text-gradient-primary',
  highlight: 'em-text-gradient-highlight',
};

export function GradientText({
  children,
  variant = 'default',
  animated = false,
  className = '',
  as: Tag = 'span',
}: GradientTextProps) {
  return (
    <Tag
      className={`${gradientClasses[variant]} ${animated ? 'animate-gradient-shift' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
