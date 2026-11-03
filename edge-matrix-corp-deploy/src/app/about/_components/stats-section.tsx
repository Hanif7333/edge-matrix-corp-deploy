'use client';

// ============================================================================
// Edge Matrix Corporation — About Stats Section
// Company metrics and enterprise scale
// ============================================================================

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { COMPANY_METRICS } from '@/constants/stats';
import { GlassPanel } from '@/components/shared';
import { motion } from 'motion/react';
import { DURATION, EASE } from '@/animations/variants';

export function AboutStatsSection() {
  const { ref, isInView } = useScrollAnimation();

  const metricsArray = [
    { label: 'Founded', value: COMPANY_METRICS.founded },
    { label: 'Employees', value: COMPANY_METRICS.employees },
    { label: 'Patents', value: COMPANY_METRICS.patents },
    { label: 'Research Papers', value: COMPANY_METRICS.researchPapers },
    { label: 'Data Processed Daily', value: COMPANY_METRICS.dataProcessedDaily },
  ];

  return (
    <section ref={ref} className="relative py-12" aria-label="Company Metrics">
      <div className="em-container">
        <GlassPanel intensity="strong" className="p-8 lg:p-12 overflow-hidden relative">
          {/* Subtle bg glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-em-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {metricsArray.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.normal, delay: index * 0.1, ease: EASE.cinematic }}
                className="flex flex-col gap-2"
              >
                <div className="text-3xl lg:text-4xl font-bold font-[var(--font-heading)] em-text-gradient-primary">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-em-text-muted font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
