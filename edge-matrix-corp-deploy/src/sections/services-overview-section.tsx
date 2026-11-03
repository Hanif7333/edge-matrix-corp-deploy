'use client';

// ============================================================================
// Edge Matrix Corporation — Services Overview v3 (Dark + 3D Tilt)
// Dark glass cards, red border gradient on hover, Framer Motion 3D tilt.
// ============================================================================

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Eye, AudioLines, Bot, TrendingUp, Layers, Brain, Network, Radar, ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/shared';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { SERVICES } from '@/constants/services';
import { DURATION, EASE } from '@/animations/variants';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Eye, AudioLines, Bot, TrendingUp, Layers, Brain, Network, Radar,
};

// ─── 3D Tilt Wrapper ──────────────────────────────────────────────────────────
function TiltCard({
  children,
  className = '',
  intensity = 6,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cfg = { damping: 22, stiffness: 350, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), cfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), cfg);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ServicesOverviewSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden bg-background"
      id="services-overview"
      aria-label="Enterprise AI solutions"
    >
      {/* Dark grid */}
      <div className="absolute inset-0 em-grid-bg opacity-[0.03]" aria-hidden="true" />

      {/* Red ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(ellipse, rgba(230,0,38,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="EXPLORE FOR MORE"
          title="Services"
          gradientWords={['Services']}
          subtitle="Our Purpose is To Deliver Excellence in Service and Execution. We deploy enterprise-grade AI capabilities across industries — transforming operations, unlocking efficiency, and driving measurable business outcomes at scale."
        />

        {/* Hero Services — 2 featured cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {SERVICES.slice(0, 2).map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Brain;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.normal, delay: index * 0.1, ease: EASE.cinematic }}
              >
                <TiltCard intensity={5}>
                  <div
                    className="group relative rounded-2xl p-8 lg:p-10 transition-all duration-500 overflow-hidden"
                    style={{
                      background: 'var(--em-surface)',
                      border: '1px solid var(--em-border)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'rgba(230,0,38,0.35)';
                      el.style.background = 'var(--em-surface-light)';
                      el.style.boxShadow = '0 0 40px rgba(230,0,38,0.15), 0 20px 60px rgba(10,11,13,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'var(--em-border)';
                      el.style.background = 'var(--em-surface)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    {/* Corner gradient accent */}
                    <div
                      className={`absolute top-0 right-0 w-48 h-48 rounded-bl-[140px] bg-gradient-to-bl ${service.gradient} opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-700`}
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-[1px] mb-6`}>
                        <div className="w-full h-full rounded-[11px] bg-em-surface flex items-center justify-center">
                          <Icon className="w-5 h-5 text-em-text-secondary" />
                        </div>
                      </div>

                      <h3 className="font-[var(--font-heading)] text-xl lg:text-2xl font-bold text-em-text mb-1.5 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs font-medium text-em-primary uppercase tracking-wider mb-4">
                        {service.subtitle}
                      </p>
                      <p className="text-sm text-em-text-secondary leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {service.features.slice(0, 4).map((f) => (
                          <div key={f} className="flex items-center gap-2 text-[11px] text-em-text-muted">
                            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.gradient} shrink-0`} />
                            {f}
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/services#${service.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-em-primary hover:text-em-primary-light transition-colors group/link"
                      >
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Compact 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.slice(2).map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Brain;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.fast, delay: 0.25 + index * 0.06, ease: EASE.cinematic }}
              >
                <TiltCard intensity={8} className="h-full">
                  <div
                    className="group rounded-2xl p-5 transition-all duration-500 h-full"
                    style={{
                      background: 'var(--em-surface)',
                      border: '1px solid var(--em-border)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'rgba(230,0,38,0.3)';
                      el.style.background = 'var(--em-surface-light)';
                      el.style.boxShadow = '0 0 30px rgba(230,0,38,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = 'var(--em-border)';
                      el.style.background = 'var(--em-surface)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} p-[1px] shrink-0`}>
                        <div className="w-full h-full rounded-[11px] bg-em-surface flex items-center justify-center">
                          <Icon className="w-4 h-4 text-em-text-secondary" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-[var(--font-heading)] text-sm font-semibold text-em-text mb-1 tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-[11px] text-em-text-muted leading-relaxed line-clamp-2 mb-3">
                          {service.description}
                        </p>
                        <Link
                          href={`/services#${service.id}`}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-em-primary hover:text-em-primary-light transition-colors group/link"
                        >
                          Explore
                          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
