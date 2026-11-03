'use client';

// ============================================================================
// Edge Matrix Corporation — Premium Testimonials Section v3
// Auto-scrolling enterprise quote cards with visual credibility signals
// ============================================================================

import { motion } from 'motion/react';
import { Quote, Star, Shield, Award, CheckCircle2, Building2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

const TESTIMONIALS = [
  {
    quote:
      "Edge Matrix's computer vision system reduced our quality inspection time by 85% while improving defect detection rates to 99.7%. The ROI was visible within the first quarter.",
    author: 'Sarah Chen',
    role: 'VP of Manufacturing',
    company: 'Global Automotive Corp',
    impact: '85% faster inspection',
    stars: 5,
  },
  {
    quote:
      'Their predictive maintenance platform prevented $2.3M in unplanned downtime costs in the first year. The digital twin integration gives us visibility we never had before.',
    author: 'Michael Torres',
    role: 'Chief Technology Officer',
    company: 'Meridian Energy Systems',
    impact: '$2.3M downtime prevented',
    stars: 5,
  },
  {
    quote:
      'The voice AI solution transformed our warehouse operations. Workers interact with the WMS hands-free, improving picking accuracy by 40% and reducing training time significantly.',
    author: 'Dr. Priya Sharma',
    role: 'Director of Operations',
    company: 'Pacific Logistics International',
    impact: '40% accuracy gain',
    stars: 5,
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'SOC 2 Type II', sub: 'Certified' },
  { icon: Award, label: 'ISO 27001', sub: 'Compliant' },
  { icon: CheckCircle2, label: 'GDPR', sub: 'Ready' },
  { icon: Building2, label: 'Enterprise SLA', sub: '99.9% Uptime' },
];

export function TestimonialsSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden"
      id="testimonials"
      aria-label="Client testimonials"
    >
      {/* Background */}
      <div className="absolute inset-0 em-grid-bg opacity-[0.02]" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(230,0,38,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="em-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, ease: EASE.cinematic }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-em-primary/10 border border-em-primary/20 mb-5">
            <Star className="w-3.5 h-3.5 text-em-primary fill-em-primary" />
            <span className="text-[10px] font-semibold text-em-primary tracking-[0.2em] uppercase">
              Enterprise Trust
            </span>
          </div>
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-em-text tracking-tight leading-tight mb-4">
            What Industry{' '}
            <span className="em-text-gradient">Leaders Say</span>
          </h2>
          <p className="text-sm text-em-text-secondary max-w-xl mx-auto leading-relaxed">
            Enterprise clients across Fortune 500 companies and global organizations trust 
            Edge Matrix to deliver intelligent automation that actually works.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: DURATION.normal,
                delay: index * 0.12,
                ease: EASE.cinematic,
              }}
              className="group relative rounded-2xl bg-em-surface/50 border border-em-border p-7 flex flex-col transition-all duration-500 hover:border-em-primary/25 hover:bg-em-primary/[0.03] hover:shadow-[0_0_40px_rgba(230,0,38,0.06)]"
            >
              {/* Top accent */}
              <div className="flex items-start justify-between mb-5">
                <Quote className="w-8 h-8 text-em-primary/30 group-hover:text-em-primary/50 transition-colors duration-300" />
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-em-primary fill-em-primary" />
                  ))}
                </div>
              </div>

              {/* Impact chip */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-em-primary/10 border border-em-primary/15 mb-4 self-start">
                <div className="w-1 h-1 rounded-full bg-em-primary" />
                <span className="text-[9px] font-semibold text-em-primary uppercase tracking-wider">
                  {t.impact}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-em-text-secondary leading-relaxed mb-7 flex-grow">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="pt-4 border-t border-em-border">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-em-primary/20 to-em-accent/10 flex items-center justify-center border border-em-primary/20 shrink-0">
                    <span className="text-xs font-bold text-em-primary">
                      {t.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-em-text">{t.author}</div>
                    <div className="text-[11px] text-em-text-muted">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, delay: 0.4, ease: EASE.cinematic }}
          className="rounded-2xl bg-em-surface/50 border border-em-border p-7 sm:p-10"
        >
          <p className="text-center text-xs text-em-text-muted uppercase tracking-[0.2em] font-semibold mb-8">
            Enterprise Compliance & Certifications
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: DURATION.fast,
                  delay: 0.5 + i * 0.08,
                  ease: EASE.cinematic,
                }}
                className="flex flex-col items-center text-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-em-primary/[0.07] border border-em-primary/15 flex items-center justify-center group-hover:bg-em-primary/[0.12] group-hover:border-em-primary/30 transition-all duration-300">
                  <badge.icon className="w-5 h-5 text-em-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-em-text mb-0.5">{badge.label}</div>
                  <div className="text-[10px] text-em-text-muted">{badge.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
