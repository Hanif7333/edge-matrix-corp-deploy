'use client';

// ============================================================================
// Edge Matrix Corporation — Premium Stats Section v3
// Bento-grid impact metrics with animated counters + visual hierarchy
// ============================================================================

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useCounter } from '@/hooks/use-counter';
import { GLOBAL_STATS } from '@/constants/stats';
import { DURATION, EASE } from '@/animations/variants';
import { Activity, BarChart3, Globe2, Package, Users } from 'lucide-react';
import type { StatItem } from '@/types';

const STAT_ICONS = [Package, BarChart3, Globe2, Users, Activity];

// Individual stat card with animated counter
function StatCard({
  stat,
  index,
  isInView,
  featured = false,
}: {
  stat: StatItem;
  index: number;
  isInView: boolean;
  featured?: boolean;
}) {
  const { count, startCounting } = useCounter({
    end: stat.value,
    duration: 2400,
    startOnView: false,
    decimals: stat.value % 1 !== 0 ? 1 : 0,
  });

  const hasTriggered = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      const timer = setTimeout(() => startCounting(), index * 120);
      return () => clearTimeout(timer);
    }
  }, [isInView, startCounting, index]);

  const Icon = STAT_ICONS[index % STAT_ICONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION.normal,
        delay: index * 0.08,
        ease: EASE.cinematic,
      }}
      className={`relative group rounded-2xl border transition-all duration-500 overflow-hidden
        ${featured
          ? 'bg-em-primary/[0.04] border-em-primary/20 hover:border-em-primary/40 hover:bg-em-primary/[0.08]'
          : 'bg-em-surface border-em-border hover:border-em-primary/20 hover:bg-em-surface-light hover:shadow-lg hover:shadow-em-primary/3'
        } p-7`}
    >
      {/* Corner glow for featured */}
      {featured && (
        <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-em-primary/5 pointer-events-none" />
      )}

      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${
          featured
            ? 'bg-em-primary/15 border border-em-primary/20'
            : 'bg-em-surface border border-em-border'
        }`}
      >
        <Icon className={`w-5 h-5 ${featured ? 'text-em-primary' : 'text-em-text-secondary'}`} />
      </div>

      {/* Counter value */}
      <div className="flex items-baseline gap-1 mb-1.5">
        <span
          className={`font-[var(--font-heading)] text-4xl lg:text-5xl font-extrabold tracking-tight leading-none ${
            featured ? 'em-text-gradient' : 'text-em-text'
          }`}
        >
          {count}
        </span>
        <span
          className={`font-[var(--font-heading)] text-2xl font-bold ${
            featured ? 'text-em-primary' : 'text-em-text-secondary'
          }`}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div className="text-sm font-semibold text-em-text mb-1.5 tracking-wide">
        {stat.label}
      </div>

      {/* Description */}
      <div className="text-xs text-em-text-muted leading-relaxed">
        {stat.description}
      </div>

      {/* Bottom progress line — animated on view */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: EASE.cinematic }}
        className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left ${
          featured
            ? 'bg-gradient-to-r from-em-primary to-em-highlight'
            : 'bg-gradient-to-r from-transparent via-em-primary/20 to-transparent'
        }`}
      />
    </motion.div>
  );
}

export function StatsSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative em-section-sm overflow-hidden"
      id="stats"
      aria-label="Company statistics and impact"
    >
      {/* Background */}
      <div className="absolute inset-0 em-dots-bg opacity-[0.15]" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(230,0,38,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="em-container relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, ease: EASE.cinematic }}
          className="flex items-center justify-center mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-em-primary/50" />
            <span className="text-[10px] font-semibold text-em-primary tracking-[0.3em] uppercase">
              Impact by Numbers
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-em-primary/50" />
          </div>
        </motion.div>

        {/* Bento Grid — first stat featured, rest normal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {GLOBAL_STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
