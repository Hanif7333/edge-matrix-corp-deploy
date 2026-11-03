'use client';

// ============================================================================
// Edge Matrix Corporation — Page Header
// Reusable cinematic header for all internal pages (About, Services, etc.)
// ============================================================================

import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { DURATION, EASE } from '@/animations/variants';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  breadcrumbs?: Breadcrumb[];
  pattern?: 'grid' | 'dots' | 'none';
  gradientColor?: 'primary' | 'accent' | 'highlight';
}

export function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumbs,
  pattern = 'grid',
  gradientColor = 'primary',
}: PageHeaderProps) {
  const gradientStyles = {
    primary: 'radial-gradient(circle, rgba(230,0,38,0.15) 0%, transparent 60%)',
    accent: 'radial-gradient(circle, rgba(15,23,42,0.06) 0%, transparent 60%)',
    highlight: 'radial-gradient(circle, rgba(230,0,38,0.08) 0%, transparent 60%)',
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Background patterns */}
      <div
        className={`absolute inset-0 ${pattern === 'grid' ? 'em-grid-bg' : pattern === 'dots' ? 'em-dots-bg' : ''} opacity-[0.03]`}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: gradientStyles[gradientColor] }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-em-bg to-transparent" />

      <div className="em-container relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumbs */}
          {breadcrumbs && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.cinematic }}
              className="flex items-center gap-2 mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="text-[11px] font-medium text-em-text-muted hover:text-em-text transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb) => (
                <div key={crumb.label} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-em-text-muted/30" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-[11px] font-medium text-em-text-muted hover:text-em-text transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[11px] font-medium text-em-primary" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </motion.nav>
          )}

          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE.cinematic }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-em-surface-light/60 border border-em-border mb-6"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${gradientColor === 'highlight' ? 'bg-em-highlight' : gradientColor === 'accent' ? 'bg-em-accent' : 'bg-em-primary'}`} />
              <span className="text-[10px] font-medium text-em-text-secondary tracking-wider uppercase">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title & Subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, delay: 0.1, ease: EASE.cinematic }}
            className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, delay: 0.2, ease: EASE.cinematic }}
            className="text-lg text-em-text-secondary leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
