'use client';

// ============================================================================
// Edge Matrix Corporation — Premium CTA Section v3
// Cinematic full-bleed conversion block.
// Deep red atmosphere with Matrix Rain undertones.
// ============================================================================

import { motion } from 'motion/react';
import { Calendar, ArrowRight, ShieldCheck, Zap, Lock, Phone } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';
import { MatrixRain } from '@/components/shared/matrix-rain';
import Link from 'next/link';

const TRUST_METRICS = [
  { icon: ShieldCheck, label: 'SOC 2 Type II Certified' },
  { icon: Lock, label: 'Enterprise-Grade Security' },
  { icon: Zap, label: '99.99% Uptime SLA' },
  { icon: Phone, label: '24/7 Dedicated Support' },
];

export function CTASection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.25 });

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-40 overflow-hidden"
      aria-label="Book a consultation with Edge Matrix"
    >
      {/* ── Background Layers ────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-em-surface" />
      
      {/* Matrix Rain - very subtle on light surface */}
      <MatrixRain opacity={0.06} density={3} color="red" />

      {/* Deep atmospheric red bloom — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(230,0,38,0.05) 0%, rgba(230,0,38,0.01) 45%, transparent 70%)',
        }}
      />

      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-em-primary/20 to-transparent" />

      <div className="em-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.slow, ease: EASE.cinematic }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.1, ease: EASE.cinematic }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-em-primary/10 border border-em-primary/30 mb-10 shadow-[0_0_20px_rgba(230,0,38,0.15)]"
          >
            <Calendar className="w-3.5 h-3.5 text-em-primary" />
            <span className="text-xs font-semibold text-em-primary tracking-[0.2em] uppercase">
              Executive Briefing Program
            </span>
            <span className="w-2 h-2 rounded-full bg-em-primary animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.2, ease: EASE.cinematic }}
            className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold text-em-text tracking-[-0.03em] leading-[1.05] mb-6"
          >
            Ready to Initiate Your{' '}
            <br className="hidden sm:block" />
            <span className="em-text-gradient">Operational Transformation?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.3, ease: EASE.cinematic }}
            className="text-base md:text-lg text-em-text-secondary leading-relaxed mb-14 max-w-2xl mx-auto font-light"
          >
            Schedule a confidential technical review with our principal architects. 
            We will evaluate how Edge Matrix frameworks can secure, automate, and scale 
            your mission-critical industrial infrastructure — with zero obligation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.4, ease: EASE.cinematic }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-em-primary to-em-primary-light text-white text-sm font-bold tracking-wide transition-all duration-300 hover:shadow-[0_0_50px_rgba(230,0,38,0.45)] group"
            >
              <Calendar className="w-4 h-4" />
              Schedule Executive Review
              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/activity"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-em-surface border border-em-border text-em-text hover:bg-em-surface-light hover:border-em-primary/30 hover:text-em-primary text-sm font-semibold tracking-wide transition-all duration-300 group hover:shadow-md hover:shadow-em-primary/5"
            >
              Review Our Milestones
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE.cinematic }}
            className="w-full h-px bg-gradient-to-r from-transparent via-em-border to-transparent mb-10"
          />

          {/* Trust Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.slow, delay: 0.6, ease: EASE.cinematic }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-4"
          >
            {TRUST_METRICS.map((metric) => (
              <div key={metric.label} className="flex items-center gap-2">
                <metric.icon className="w-4 h-4 text-em-primary/70" />
                <span className="text-xs text-em-text-muted font-medium tracking-wide">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-em-border to-transparent" />
    </section>
  );
}
