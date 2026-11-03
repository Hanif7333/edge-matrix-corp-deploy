'use client';

// ============================================================================
// Edge Matrix Corporation — Innovation Showcase Section v3
// Premium split-screen layout with animated visualizers for each capability.
// ============================================================================

import { motion } from 'motion/react';
import { ArrowRight, Zap, Brain, Eye, Network } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';
import Link from 'next/link';
import Image from 'next/image';

const INNOVATIONS = [
  {
    icon: Brain,
    tag: 'Core AI Engine',
    title: 'Neural Processing at Industrial Scale',
    description:
      'Our proprietary AI inference engine processes 50TB+ of operational data daily, delivering millisecond-latency predictions to mission-critical industrial systems without cloud dependency.',
    metrics: [
      { value: '<5ms', label: 'Inference Latency' },
      { value: '99.7%', label: 'Accuracy' },
    ],
    accent: 'from-em-primary to-red-800',
    glow: 'rgba(230,0,38,0.15)',
    vizKey: 'neural',
    image: '/images/about/neural-processing.png',
  },
  {
    icon: Eye,
    tag: 'Computer Vision',
    title: 'Real-Time Visual Intelligence Systems',
    description:
      'Deploy camera-agnostic defect detection, anomaly recognition, and quality inspection systems across your factory floor. Integrates with any PLC or SCADA system.',
    metrics: [
      { value: '10,000+', label: 'Frames/sec' },
      { value: '99.9%', label: 'Defect Rate' },
    ],
    accent: 'from-red-700 to-zinc-600',
    glow: 'rgba(200,200,200,0.08)',
    vizKey: 'vision',
    image: '/images/about/vision-detection-live.png',
  },
  {
    icon: Network,
    tag: 'Digital Twin',
    title: 'Live Mirror of Your Physical Operations',
    description:
      'Construct hyper-realistic digital replicas of your industrial assets. Simulate, predict, and optimize before changes reach the physical floor — eliminating costly trial-and-error.',
    metrics: [
      { value: '85%', label: 'Cost Reduction' },
      { value: '3x', label: 'Faster Decisions' },
    ],
    accent: 'from-zinc-400 to-zinc-600',
    glow: 'rgba(160,160,165,0.1)',
    vizKey: 'twin',
    image: '/images/about/digital-twin.png',
  },
];

function InnovationCard({
  item,
  index,
  isInView,
}: {
  item: (typeof INNOVATIONS)[0];
  index: number;
  isInView: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: DURATION.slow,
        delay: index * 0.15,
        ease: EASE.cinematic,
      }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
    >
      {/* Text Content */}
      <div className={isEven ? '' : 'lg:col-start-2'}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-em-primary/10 border border-em-primary/20 mb-5">
          <item.icon className="w-3.5 h-3.5 text-em-primary" />
          <span className="text-[10px] font-semibold text-em-primary tracking-[0.2em] uppercase">
            {item.tag}
          </span>
        </div>

        <h3 className="font-[var(--font-heading)] text-2xl lg:text-3xl font-bold text-em-text mb-4 tracking-tight leading-tight">
          {item.title}
        </h3>

        <p className="text-sm text-em-text-secondary leading-relaxed mb-7 max-w-lg">
          {item.description}
        </p>

        {/* Micro metrics */}
        <div className="flex items-center gap-8 mb-8">
          {item.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-[var(--font-heading)] text-2xl font-bold em-text-gradient-primary">
                {m.value}
              </div>
              <div className="text-[10px] text-em-text-muted uppercase tracking-wider mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-em-primary hover:text-em-accent transition-colors duration-300 group"
        >
          Explore Capability
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Visual Card with Animated Visualizer */}
      <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
        <div
          className="relative h-80 lg:h-[26rem] rounded-3xl overflow-hidden bg-em-surface border border-em-border transition-shadow duration-500 hover:shadow-[0_12px_48px_rgba(230,0,38,0.08)] group/card"
          style={{ boxShadow: `0 6px 30px ${item.glow}` }}
        >
          {/* Image Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover opacity-90 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:scale-105 object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Dark vignette gradient overlay for high contrast details - replaces the white shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/15 z-10 opacity-75 group-hover/card:opacity-55 transition-opacity duration-500" />
          </div>

          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-[0.03] z-10`} />



          {/* Floating badges */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-em-bg/80 backdrop-blur-sm border border-em-border z-30">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-em-primary animate-pulse" />
              <span className="text-[9px] text-em-text font-bold tracking-widest uppercase">
                Live System
              </span>
            </div>
          </div>

          {/* Corner metric */}
          <div className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-em-bg/80 backdrop-blur-sm border border-em-border text-right z-30">
            <div className="font-[var(--font-heading)] text-lg font-bold text-em-primary">
              {item.metrics[0].value}
            </div>
            <div className="text-[9px] text-em-text-muted uppercase tracking-wider font-semibold">
              {item.metrics[0].label}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function InnovationSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden"
      id="innovation"
      aria-labelledby="innovation-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(230,0,38,0.08) 0%, transparent 70%)' }}
      />

      <div className="em-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, ease: EASE.cinematic }}
          className="max-w-2xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-em-primary/10 border border-em-primary/20 mb-5">
            <Zap className="w-3.5 h-3.5 text-em-primary" />
            <span className="text-[10px] font-semibold text-em-primary tracking-[0.2em] uppercase">
              Technology Stack
            </span>
          </div>
          <h2
            id="innovation-heading"
            className="font-[var(--font-heading)] text-3xl lg:text-5xl font-extrabold text-em-text tracking-tight leading-[1.05] mb-5"
          >
            Innovation Built for the{' '}
            <span className="em-text-gradient">Industrial Edge</span>
          </h2>
          <p className="text-base text-em-text-secondary leading-relaxed">
            Our technology stack is engineered for the harshest industrial conditions — delivering
            production-grade AI that operates reliably in environments where failure is not an option.
          </p>
        </motion.div>

        {/* Innovation Cards */}
        <div className="space-y-24 lg:space-y-32">
          {INNOVATIONS.map((item, i) => (
            <InnovationCard
              key={item.tag}
              item={item}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, delay: 0.5, ease: EASE.cinematic }}
          className="mt-20 pt-12 border-t border-em-border flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="font-[var(--font-heading)] text-lg font-bold text-em-text mb-1">
              Ready for a technical deep-dive?
            </div>
            <p className="text-sm text-em-text-secondary">
              Our principal architects will walk you through the full stack.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-em-primary to-em-primary-light text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(230,0,38,0.45)] group"
          >
            Request Architecture Review
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
