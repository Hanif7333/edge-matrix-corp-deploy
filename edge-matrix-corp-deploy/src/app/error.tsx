'use client';

// ============================================================================
// Edge Matrix Corporation — Custom Branded Error Boundary Page
// Immersive light-theme responsive error layout utilizing design tokens
// ============================================================================

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception to console
    console.error('System Exception Captured:', error);
  }, [error]);

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
            <AlertCircle className="w-3.5 h-3.5 text-em-primary animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-em-primary">
              System Exception Captured
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-em-text mb-4"
          >
            Thread Execution Failure
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-em-text-secondary leading-relaxed mb-6 max-w-lg font-light"
          >
            The Matrix Engine has encountered an unexpected operational anomaly. Our automated systems have flagged the diagnostics.
          </motion.p>

          {/* Diagnostic panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="w-full bg-em-surface border border-em-border rounded-xl p-5 text-left font-mono text-[11px] text-em-text-muted mb-10 overflow-x-auto max-h-40 max-w-lg scrollbar-thin shadow-inner"
          >
            <span className="text-em-primary font-bold">Diagnostics:</span> {error.message || 'Unknown operational runtime exception'}
            {error.digest && (
              <div className="mt-2 pt-2 border-t border-em-border/50">
                <span className="text-em-text-secondary font-bold">Thread Digest:</span> {error.digest}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
          >
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-em-primary to-em-primary-light hover:shadow-[0_0_30px_rgba(230,0,38,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reinitialize Connection
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-em-text bg-em-surface border border-em-border hover:bg-em-surface-light hover:border-em-border-light hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              Return to Control Center
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
