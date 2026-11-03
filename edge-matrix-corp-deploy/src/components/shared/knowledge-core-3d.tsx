'use client';

import { motion } from 'motion/react';

/**
 * KnowledgeCore3D — Animated training platform neural core visualizer
 * Designed to sit naturally on a light background using the design system.
 */
export function KnowledgeCore3D() {
  return (
    <div className="relative w-full flex items-center justify-center py-8">
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-em-surface border border-em-border"
        style={{
          boxShadow: '0 4px 40px rgba(0,0,0,0.06), 0 0 80px rgba(230,0,38,0.03)',
        }}
      >
        {/* Soft radial gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-em-primary/[0.02] via-transparent to-em-primary/[0.01]" />

        {/* Micro grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(var(--em-text) 1px, transparent 1px), linear-gradient(90deg, var(--em-text) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-em-primary/20 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-em-primary/20 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-em-primary/10 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-em-primary/10 rounded-br-3xl" />

        {/* HUD labels */}
        <div className="absolute top-4 left-5 z-20 font-mono text-[9px] tracking-[0.2em] text-em-primary/30 uppercase">
          Neural::Training_Core
        </div>
        <div className="absolute top-4 right-5 z-20 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
          <span className="font-mono text-[9px] text-em-text-muted/50 tracking-wider">ONLINE</span>
        </div>

        <div className="relative w-full h-[360px] flex items-center justify-center pointer-events-none" style={{ perspective: '900px' }}>
          {/* Ambient soft glow */}
          <div className="absolute w-44 h-44 bg-em-primary/[0.06] rounded-full blur-[60px]" />

          {/* Outer orbit ring 1 */}
          <motion.div
            className="absolute w-64 h-64 rounded-full border border-em-border-medium"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-em-primary shadow-[0_0_12px_rgba(230,0,38,0.4)]"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-em-primary/50"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Outer orbit ring 2 (tilted) */}
          <motion.div
            className="absolute w-56 h-56 rounded-full border border-dashed border-em-border"
            style={{ transform: 'rotateX(65deg)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-em-text/20" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-em-primary/40" />
          </motion.div>

          {/* Mid orbit ring (tilted opposite) */}
          <motion.div
            className="absolute w-44 h-44 rounded-full border border-em-primary/[0.08]"
            style={{ transform: 'rotateX(70deg) rotateZ(30deg)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-em-primary/50 shadow-[0_0_8px_rgba(230,0,38,0.3)]" />
          </motion.div>

          {/* Inner ring */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-em-border-light"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-em-text/30" />
          </motion.div>

          {/* Core nucleus */}
          <div className="relative">
            <motion.div
              className="absolute -inset-6 rounded-full border border-em-primary/10"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -inset-3 rounded-full bg-em-primary/[0.06]"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-em-primary to-em-primary-dark shadow-[0_0_30px_rgba(230,0,38,0.35),0_0_60px_rgba(230,0,38,0.12)] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
          </div>

          {/* Data stream particles */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = i * 60;
            const radius = 100 + (i % 3) * 20;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-em-primary/30"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
              />
            );
          })}
        </div>

        {/* Bottom telemetry bar */}
        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between font-mono text-[8px] text-em-text-muted/40 z-20">
          <div className="flex items-center gap-4">
            <span>NODES: 6</span>
            <span>SYNC: 99.8%</span>
          </div>
          <div className="flex items-center gap-4">
            <span>UPTIME: 24/7</span>
            <span>v4.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
