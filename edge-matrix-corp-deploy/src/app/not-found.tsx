'use client';

// ============================================================================
// Edge Matrix Corporation — Custom Branded 404 (Node Not Found) Page
// Immersive light-theme responsive error layout utilizing design tokens
// ============================================================================

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Home, AlertTriangle } from 'lucide-react';
import { Navbar, Footer } from '@/components/layout';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 relative overflow-hidden bg-background">
        {/* Ambient Glowing Background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(230,0,38,0.06)_0%,transparent_70%)] blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(10,11,13,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,11,13,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 em-container flex flex-col items-center text-center px-4 max-w-2xl">
          {/* Diagnostic status tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-em-primary/10 border border-em-primary/30 mb-8"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-em-primary animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-em-primary">
              Status Code: 404 — Operational Drift
            </span>
          </motion.div>

          {/* Animated 3D-like Node wireframe */}
          <div className="relative w-44 h-44 mb-8 flex items-center justify-center select-none">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E60026" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#E60026" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Central disconnected node */}
              <circle cx="50" cy="50" r="16" fill="url(#node-glow)" className="animate-pulse" />
              <circle cx="50" cy="50" r="4" fill="#E60026" />
              
              {/* Outer floating nodes with dashed connections */}
              <g className="animate-spin-slow origin-center">
                <line x1="50" y1="50" x2="25" y2="25" stroke="rgba(10, 11, 13, 0.12)" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="50" y1="50" x2="75" y2="25" stroke="rgba(10, 11, 13, 0.12)" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="50" y1="50" x2="30" y2="75" stroke="rgba(10, 11, 13, 0.12)" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="50" y1="50" x2="70" y2="75" stroke="rgba(10, 11, 13, 0.12)" strokeWidth="1" strokeDasharray="3,3" />
                
                {/* Orbital nodes */}
                <circle cx="25" cy="25" r="3.5" fill="#0A0B0D" />
                <circle cx="75" cy="25" r="3.5" fill="#0A0B0D" />
                <circle cx="30" cy="75" r="3.5" fill="#0A0B0D" />
                <circle cx="70" cy="75" r="3.5" fill="#E60026" className="animate-ping [animation-duration:2.5s]" />
                <circle cx="70" cy="75" r="3.5" fill="#E60026" />
              </g>
            </svg>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-em-text mb-4"
          >
            Matrix Node Offline
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-em-text-secondary leading-relaxed mb-10 max-w-lg font-light"
          >
            The matrix node you are requesting is either offline, undergoing diagnostic recalibration, or has shifted coordinates. Let&apos;s redirect you back to active telemetry systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
          >
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-em-primary to-em-primary-light hover:shadow-[0_0_30px_rgba(230,0,38,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              Return to Control Center
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-em-text bg-em-surface border border-em-border hover:bg-em-surface-light hover:border-em-border-light hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Explore Capabilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
