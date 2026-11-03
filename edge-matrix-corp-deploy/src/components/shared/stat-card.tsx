'use client';

// ============================================================================
// Edge Matrix Corporation — Stat Card
// Reusable statistic display with animated counter
//
// WHY: Statistics appear in 3+ sections (hero, stats, predictive analytics).
// This component standardizes the counter animation, layout, and typography.
//
// PERFORMANCE: Counter uses requestAnimationFrame (not setInterval).
// Animation only triggers when inView — no wasted CPU on off-screen cards.
// ============================================================================

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useCounter } from '@/hooks/use-counter';
import { DURATION, EASE } from '@/animations/variants';

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  delay?: number;
  inView?: boolean;
  className?: string;
}

export function StatCard({
  value,
  suffix = '',
  label,
  description,
  delay = 0,
  inView = true,
  className = '',
}: StatCardProps) {
  const { count, startCounting } = useCounter({
    end: value,
    duration: 2200,
    startOnView: false,
    decimals: value % 1 !== 0 ? 1 : 0,
  });

  const hasTriggered = useRef(false);

  useEffect(() => {
    if (inView && !hasTriggered.current) {
      hasTriggered.current = true;
      startCounting();
    }
  }, [inView, startCounting]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.normal, delay, ease: EASE.cinematic }}
      className={`text-center px-4 py-6 ${className}`}
    >
      <div className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
        <span className="em-text-gradient-primary">{count}</span>
        <span className="text-em-accent">{suffix}</span>
      </div>
      <div className="text-sm font-semibold text-em-text mb-1 tracking-wide">
        {label}
      </div>
      {description && (
        <div className="text-xs text-em-text-muted leading-relaxed max-w-[200px] mx-auto">
          {description}
        </div>
      )}
    </motion.div>
  );
}
