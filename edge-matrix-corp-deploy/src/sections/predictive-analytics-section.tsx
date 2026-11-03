'use client';

// ============================================================================
// Edge Matrix Corporation — Predictive Analytics & Digital Twin v2
// Dual-column comparison layout
// ============================================================================

import { motion } from 'motion/react';
import {
  TrendingUp, Factory, BarChart3, Activity, Layers, RefreshCcw,
} from 'lucide-react';
import { SectionHeader } from '@/components/shared';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

const ANALYTICS_CAPABILITIES = [
  { icon: TrendingUp, title: 'Predictive Maintenance', desc: 'Forecast equipment failures before they occur, reducing unplanned downtime by up to 70%.' },
  { icon: BarChart3, title: 'Demand Forecasting', desc: 'AI-driven demand prediction for optimized inventory and supply chain management.' },
  { icon: Activity, title: 'Operational Intelligence', desc: 'Real-time KPI monitoring and anomaly detection across complex operational ecosystems.' },
];

const TWIN_CAPABILITIES = [
  { icon: Layers, title: 'Asset Digital Twins', desc: 'Virtual replicas of physical assets for simulation, what-if analysis, and performance optimization.' },
  { icon: Factory, title: 'Process Simulation', desc: 'Model entire production lines to test changes before physical implementation.' },
  { icon: RefreshCcw, title: 'Real-Time Sync', desc: 'Continuous synchronization between physical systems and their digital counterparts via IIoT.' },
];

const IMPACT_STATS = [
  { value: '70%', label: 'Downtime Reduction' },
  { value: '3x', label: 'Faster Decision Making' },
  { value: '45%', label: 'Cost Savings' },
  { value: '99.9%', label: 'Model Accuracy' },
];

export function PredictiveAnalyticsSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden"
      id="predictive-analytics"
      aria-label="Predictive analytics and digital twin"
    >
      <div className="absolute inset-0 em-dots-bg opacity-15" aria-hidden="true" />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Intelligence"
          title="Predictive Analytics & Digital Twin"
          gradientWords={['Predictive', 'Digital']}
          subtitle="Data-driven decision intelligence and virtual replication technologies that transform how enterprises monitor, predict, and optimize operations."
        />

        {/* Dual columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.cinematic }}
            className="rounded-2xl bg-em-surface/50 border border-em-border p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-em-primary/[0.06] border border-em-primary/15 flex items-center justify-center">
                <TrendingUp className="w-4.5 h-4.5 text-em-primary" />
              </div>
              <h3 className="font-[var(--font-heading)] text-lg font-bold text-em-text">Predictive Analytics</h3>
            </div>
 
            <div className="space-y-4">
              {ANALYTICS_CAPABILITIES.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 0.3 + i * 0.08, ease: EASE.cinematic }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-em-surface/30 border border-em-border transition-all duration-300 hover:bg-em-surface/50"
                >
                  <c.icon className="w-4.5 h-4.5 text-em-primary/60 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-em-text mb-1">{c.title}</h4>
                    <p className="text-[11px] text-em-text-muted leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Digital Twin */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.cinematic }}
            className="rounded-2xl bg-em-surface/50 border border-em-border p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-em-accent/[0.06] border border-em-accent/15 flex items-center justify-center">
                <Layers className="w-4.5 h-4.5 text-em-accent" />
              </div>
              <h3 className="font-[var(--font-heading)] text-lg font-bold text-em-text">Digital Twin</h3>
            </div>
 
            <div className="space-y-4">
              {TWIN_CAPABILITIES.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 0.3 + i * 0.08, ease: EASE.cinematic }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-em-surface/30 border border-em-border transition-all duration-300 hover:bg-em-surface/50"
                >
                  <c.icon className="w-4.5 h-4.5 text-em-text-secondary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-em-text mb-1">{c.title}</h4>
                    <p className="text-[11px] text-em-text-muted leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, delay: 0.5, ease: EASE.cinematic }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {IMPACT_STATS.map((s) => (
            <div
              key={s.label}
              className="text-center py-5 px-3 rounded-xl em-glass"
            >
              <div className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold em-text-gradient mb-1.5">
                {s.value}
              </div>
              <div className="text-[10px] text-em-text-muted uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
