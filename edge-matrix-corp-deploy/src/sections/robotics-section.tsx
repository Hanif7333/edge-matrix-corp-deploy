'use client';

// ============================================================================
// Edge Matrix Corporation — Robotics & Autonomous Systems v4
// Left: Enterprise capability grids | Right: Clean Premium Quadruped Robots Showcase
// Renders the military green and black robot dogs cleanly with zero HUD overlays.
// ============================================================================

import Image from 'next/image';
import { motion } from 'motion/react';
import { Navigation, Users, ShieldCheck, Cpu, Settings2 } from 'lucide-react';
import { SectionHeader } from '@/components/shared';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

const CAPABILITIES = [
  {
    icon: Navigation,
    title: 'Autonomous Navigation',
    desc: 'Self-navigating mobile robots with real-time SLAM, trajectory optimization, and path planning.',
  },
  {
    icon: Users,
    title: 'Human-Robot Collaboration',
    desc: 'Collaborative robotic cobots designed for safe, physical workspace interactions with human operators.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety-Critical Systems',
    desc: 'IEC 61508 / ISO 13849 compliant fail-safe architectures for continuous uptime.',
  },
  {
    icon: Cpu,
    title: 'Embedded Edge Compute',
    desc: 'Direct neural processing models optimized on local hardware clusters for zero latency.',
  },
];

// ─── Clean Quadruped Visual Showcase Component ──────────────────────────────
function QuadrupedShowcase() {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden aspect-4/3 w-full max-w-xl mx-auto border border-em-border shadow-xl bg-em-surface-light group"
      style={{
        boxShadow: '0 0 40px rgba(230,0,38,0.04), 0 20px 40px rgba(10,11,13,0.06)',
      }}
    >
      {/* Base robot dogs image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/robot-dogs.png"
          alt="Quadruped robotic dogs mimicking military green and matte black Spot dogs"
          fill
          className="object-cover brightness-[0.98] contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft, modern glassmorphic ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10 pointer-events-none" />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Section Export
// ---------------------------------------------------------------------------
export function RoboticsSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden bg-background"
      id="robotics"
      aria-label="Robotics and autonomous systems"
    >
      {/* Subtle dots layout background */}
      <div className="absolute inset-0 em-dots-bg opacity-20" aria-hidden="true" />

      {/* Crimson accent glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(230,0,38,0.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Robotics"
          title="Robotics & Autonomous Systems"
          gradientWords={['Robotics', 'Autonomous']}
          subtitle="From autonomous mobile robots to collaborative cobots, we engineer intelligent robotic systems that operate safely alongside humans in complex industrial environments."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Text Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.cinematic }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-em-primary/20 bg-em-primary/[0.06] select-none">
              <Settings2 className="w-4 h-4 text-em-primary animate-spin-slow" style={{ animationDuration: '8s' }} />
              <span className="text-xs font-bold text-em-primary tracking-wider uppercase">Active Capabilities</span>
            </div>

            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-black text-em-text mb-6 tracking-tight leading-tight">
              Engineering the <span className="em-text-gradient-primary">Autonomous</span> Workforce
            </h2>

            <p className="text-base text-em-text-secondary leading-relaxed mb-8 max-w-lg">
              We design and construct mission-critical autonomous systems that bridge physical mechanics and artificial reasoning, enabling seamless operations on warehouse and industrial floors.
            </p>

            {/* Grid checklist of capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 0.3 + i * 0.08, ease: EASE.cinematic }}
                  className="p-4 rounded-2xl bg-white border border-em-border transition-all duration-300 hover:border-em-primary/25 hover:shadow-md group flex gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-em-primary/[0.06] border border-em-primary/10 flex items-center justify-center shrink-0 group-hover:bg-em-primary group-hover:border-em-primary transition-all duration-300">
                    <cap.icon className="w-4 h-4 text-em-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-em-text mb-0.5 group-hover:text-em-primary transition-colors">{cap.title}</h3>
                    <p className="text-[10px] text-em-text-muted leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Clean Robotics Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.slow, delay: 0.25, ease: EASE.cinematic }}
            className="flex items-center justify-center"
          >
            <QuadrupedShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
