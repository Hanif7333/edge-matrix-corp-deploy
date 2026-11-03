'use client';

// ============================================================================
// Edge Matrix Corporation — Clients & Partners Showcase Section v4
// Split layout: compelling text + CTA on the left, floating auto-scrolling
// client logo grid on the right. Inspired by modern SaaS integration sections.
// ============================================================================

import { motion } from 'motion/react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';
import { ClientCarousel } from '@/components/shared/client-carousel';
import { ArrowRight } from 'lucide-react';

export function ClientsSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      id="clients"
      aria-label="Our clients and partners"
    >
      {/* === Subtle background === */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white" />

      <div className="em-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─── Left: Text Content ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.normal, ease: EASE.cinematic }}
            className="max-w-lg"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(230,0,38,0.08), rgba(230,0,38,0.04))',
                border: '1px solid rgba(230,0,38,0.2)',
              }}
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-em-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-em-primary" />
              </span>
              <span className="text-[10px] font-bold text-em-primary tracking-[0.25em] uppercase">
                Trusted Partners
              </span>
            </div>

            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-[2.75rem] font-black text-em-text mb-5 tracking-tight leading-[1.15]">
              Powering{' '}
              <span
                className="em-text-gradient-primary"
                style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
              >
                Innovation
              </span>{' '}
              with trusted organizations
            </h2>

            <p className="text-base text-em-text-secondary leading-relaxed mb-8">
              From top-tier universities and government bodies to global technology
              leaders — our clients trust Edge Matrix to deliver transformative AI
              and engineering solutions that drive real-world impact.
            </p>

            {/* CTA Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-em-primary to-em-primary-light hover:shadow-[0_0_30px_rgba(230,0,38,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn cursor-none"
            >
              Explore Partnerships
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Trust stats row */}
            {/* <div className="flex items-center gap-8 mt-10">
              <div>
                <div className="font-[var(--font-heading)] text-2xl font-black text-em-text">13+</div>
                <div className="text-[11px] text-em-text-muted font-semibold uppercase tracking-wider">Active Clients</div>
              </div>
              <div className="w-px h-10 bg-em-border" />
              <div>
                <div className="font-[var(--font-heading)] text-2xl font-black text-em-text">50+</div>
                <div className="text-[11px] text-em-text-muted font-semibold uppercase tracking-wider">Projects Delivered</div>
              </div>
              <div className="w-px h-10 bg-em-border" />
              <div>
                <div className="font-[var(--font-heading)] text-2xl font-black text-em-text">98%</div>
                <div className="text-[11px] text-em-text-muted font-semibold uppercase tracking-wider">Satisfaction</div>
              </div>
            </div> */}
          </motion.div>

          {/* ─── Right: Floating Client Logos Grid ────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.15, ease: EASE.cinematic }}
            className="relative"
          >
            <ClientCarousel />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
