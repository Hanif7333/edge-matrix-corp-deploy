// ============================================================================
// Edge Matrix Corporation — Motion System
// Comprehensive animation variants, timing, and configuration
//
// WHY CENTRALIZED:
// 1. Consistency: Every section uses the same motion language
// 2. Performance: Shared easing curves are defined once
// 3. Maintainability: Change animation feel globally from one file
// 4. Accessibility: Reduced-motion support applied universally
//
// MOTION PHILOSOPHY:
// - Cinematic, not playful
// - Controlled, not chaotic
// - Purposeful, not decorative
// - Enterprise-grade, not startup-playful
//
// PERFORMANCE:
// - All transforms use GPU-composited properties (opacity, transform)
// - No layout-triggering properties (width, height, margin) animated
// - Duration kept short to avoid perceived sluggishness
// ============================================================================

// ─── Timing Constants ─────────────────────────────────────────────────────────
export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  cinematic: 1.2,
} as const;

// ─── Easing Curves ──────────────────────────────────────────────────────────
// Named after their feel, not their math — easier for engineers to choose
export const EASE = {
  /** Standard deceleration — elements arriving at rest */
  out: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Standard acceleration — elements leaving */
  in: [0.55, 0.055, 0.675, 0.19] as [number, number, number, number],
  /** Symmetric — elements moving through */
  inOut: [0.42, 0, 0.58, 1] as [number, number, number, number],
  /** Cinematic reveal — fast start, long gentle stop (Apple-style) */
  cinematic: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Snappy interaction — quick response for hover/click */
  snappy: [0.77, 0, 0.175, 1] as [number, number, number, number],
  /** Elastic — slight overshoot for micro-interactions */
  elastic: [0.68, -0.15, 0.265, 1.35] as [number, number, number, number],
} as const;

// ─── Motion Variants ──────────────────────────────────────────────────────────
// Used with Motion's `variants` prop for orchestrated animations

/** Fade in from below — primary section reveal */
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE.cinematic },
  },
} as const;

/** Fade in from above — for dropdown/overlay content */
export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASE.out },
  },
} as const;

/** Pure opacity fade — for subtle reveals */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
} as const;

/** Slide from left — for alternating layout reveals */
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE.cinematic },
  },
} as const;

/** Slide from right — paired with slideInLeft for rhythm */
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE.cinematic },
  },
} as const;

/** Scale up — for cards, images, modal entrances */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASE.cinematic },
  },
} as const;

/** Scale up subtle — for hover states and micro-interactions */
export const scaleInSubtle = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE.out },
  },
} as const;

// ─── Stagger Orchestration ──────────────────────────────────────────────────
// Used on parent containers to stagger children's animations

/** Standard stagger — for card grids, feature lists */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
} as const;

/** Slow stagger — for hero elements, major reveals */
export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
} as const;

/** Fast stagger — for compact lists, icon rows */
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
} as const;

/** Stagger child — default child variant */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.cinematic,
    },
  },
} as const;

// ─── Scroll Trigger Defaults ────────────────────────────────────────────────
// GSAP ScrollTrigger configuration presets
export const SCROLL_TRIGGER = {
  /** Standard reveal — triggers when element enters viewport */
  standard: {
    start: 'top 85%',
    end: 'bottom 15%',
    toggleActions: 'play none none reverse',
  },
  /** Aggressive — triggers earlier for above-fold content */
  eager: {
    start: 'top 95%',
    end: 'bottom 5%',
    toggleActions: 'play none none none',
  },
  /** Lazy — triggers later for below-fold content */
  lazy: {
    start: 'top 75%',
    end: 'bottom 25%',
    toggleActions: 'play none none reverse',
  },
  /** Pin — for scroll-locked storytelling sections */
  pin: {
    start: 'top top',
    end: '+=100%',
    pin: true,
    scrub: 1,
  },
} as const;

// ─── Hover Presets ──────────────────────────────────────────────────────────
// Used with Motion's `whileHover` prop

export const hoverLift = {
  y: -4,
  transition: { duration: DURATION.fast, ease: EASE.out },
} as const;

export const hoverScale = {
  scale: 1.02,
  transition: { duration: DURATION.fast, ease: EASE.snappy },
} as const;

export const hoverGlow = {
  boxShadow: '0 0 40px rgba(37, 99, 235, 0.15)',
  transition: { duration: DURATION.fast },
} as const;

// ─── Tap Presets ────────────────────────────────────────────────────────────
export const tapScale = {
  scale: 0.98,
  transition: { duration: DURATION.instant },
} as const;

// ─── Transition Presets ─────────────────────────────────────────────────────
// Shorthand transition objects for inline use

export const springGentle = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};

export const springSnappy = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
  mass: 0.5,
};

export const springBouncy = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 15,
  mass: 1,
};
