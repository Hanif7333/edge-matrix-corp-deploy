'use client';

// ============================================================================
// Edge Matrix Corporation — Immersive Enterprise Hero Section v4 (Dark)
// Deep black + vivid Matrix Rain + mouse-reactive crimson glow + stagger reveal
// ============================================================================

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { DURATION, EASE } from '@/animations/variants';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { MagneticButton, MatrixRain } from '@/components/shared';
import { HERO_STATS } from '@/constants/stats';
import dynamic from 'next/dynamic';

// Defer the heavy 3D neural widget — not needed for LCP
const NeuralCore3D = dynamic(
  () => import('@/components/shared/neural-core').then(m => ({ default: m.NeuralCore3D })),
  { ssr: false, loading: () => <div className="w-full h-[500px]" /> }
);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mouse = useMousePosition();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden"
      aria-label="Welcome to Edge Matrix Corporation"
    >
      {/* ── Layered Background System ───────────────────────────────────── */}

      {/* Base deep black */}
      <div className="absolute inset-0 bg-background" />

      {/* Matrix Rain — vivid red/white on black */}
      <MatrixRain opacity={0.7} density={6} color="red" className="z-[1]" />

      {/* Subtle dark grid */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial gradient mask — keeps center readable, dims edges */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, var(--hero-mask-1, rgba(255,255,255,0.15)) 0%, var(--hero-mask-2, rgba(255,255,255,0.55)) 60%, var(--hero-mask-3, rgba(255,255,255,0.85)) 100%)',
        }}
      />

      {/* Mouse-reactive crimson glow orb — stronger on dark */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full pointer-events-none z-[4]"
        animate={{
          x: mouse.x - 450,
          y: mouse.y - 450,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 80, mass: 1 }}
        style={{
          background:
            'radial-gradient(circle, rgba(230,0,38,0.12) 0%, rgba(230,0,38,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Static crimson atmosphere — left */}
      <div
        className="absolute left-[5%] top-[20%] w-[600px] h-[600px] rounded-full pointer-events-none z-[4] opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(230,0,38,0.15) 0%, transparent 70%)' }}
      />
      {/* Static crimson atmosphere — right */}
      <div
        className="absolute right-[5%] bottom-[20%] w-[400px] h-[400px] rounded-full pointer-events-none z-[4] opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(230,0,38,0.08) 0%, transparent 70%)' }}
      />

      {/* ── Core Content ────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 em-container flex flex-col items-center text-center"
        style={{ y: yText, opacity, scale }}
      >
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: DURATION.normal, ease: EASE.cinematic }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-em-primary/10 border border-em-primary/40 backdrop-blur-md mb-10 shadow-[0_0_30px_rgba(230,0,38,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-em-primary" />
          <span className="text-xs font-semibold text-em-primary tracking-[0.15em] uppercase">
            Edge Matrix AI Engine — Live now
          </span>
          <div className="relative flex h-2 w-2 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-em-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-em-primary" />
          </div>
        </motion.div>

        {/* Primary Headline */}
        <div className="relative mb-3">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, delay: 0.1, ease: EASE.cinematic }}
            className="text-sm md:text-base font-semibold text-em-text-muted tracking-[0.3em] uppercase mb-4"
          >
            Edge Matrix Corporation
          </motion.p>

          <h1 className="font-[var(--font-heading)] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold tracking-[-0.03em] leading-[1.0] max-w-5xl">
            {/* Line 1 */}
            <div className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-em-text"
              >
                Simply
              </motion.span>
            </div>
            {/* Line 2 — crimson gradient */}
            <div className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block em-text-gradient"
              >
                the
              </motion.span>
            </div>
            {/* Line 3 */}
            <div className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block text-em-text"
              >
                Matrix Things
              </motion.span>
            </div>
          </h1>
        </div>

        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE.cinematic }}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-em-primary to-transparent mb-8 mx-auto shadow-[0_0_12px_rgba(230,0,38,0.6)]"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.normal, delay: 0.7, ease: EASE.cinematic }}
          className="text-base md:text-lg text-em-text-secondary leading-relaxed max-w-2xl mb-12 font-light"
        >
          Edge Matrix Multinational Corporation deploys Artificial Intelligence, Robotics, and{' '}
          Data Science at industrial scale — making humanity measurably more powerful.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.normal, delay: 0.85, ease: EASE.cinematic }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <MagneticButton href="/contact" variant="primary" intensity={0.3}>
            Request Executive Briefing
            <ArrowRight className="w-4 h-4 ml-2" />
          </MagneticButton>

          <MagneticButton href="/services" variant="secondary" intensity={0.2}>
            Explore Capabilities
          </MagneticButton>
        </motion.div>

        {/* 3D Neural Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.slow, delay: 0.9, ease: EASE.cinematic }}
          className="w-full max-w-4xl mx-auto hidden lg:block mb-16 relative"
        >
          {/* Deep red glow under the 3D */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-20 bg-em-primary/20 blur-[80px] rounded-full" />
          <NeuralCore3D />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 1.0, ease: EASE.cinematic }}
          className="w-full grid grid-cols-3 gap-8 sm:gap-16 pt-8 border-t border-em-border max-w-xl mx-auto"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-[var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-bold em-text-gradient">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs text-em-text-muted uppercase tracking-[0.2em] font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-em-text-muted uppercase tracking-[0.25em] font-medium">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-em-text-muted animate-bounce" />
      </motion.div>
    </section>
  );
}
