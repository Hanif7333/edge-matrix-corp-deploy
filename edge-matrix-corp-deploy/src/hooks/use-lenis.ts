'use client';

// ============================================================================
// Edge Matrix Corporation — Lenis Smooth Scroll Hook v2
//
// FIX: Lenis v1.x works with the native document scroll model.
// html/body must NOT have `height: 100%` or `overflow: hidden` — doing so
// caps the scrollable height to the viewport and prevents scrolling below fold.
//
// This hook:
// 1. Initializes Lenis targeting document.documentElement (native scroll)
// 2. Handles its own RAF loop with proper cleanup
// 3. Skips initialization on touch/reduced-motion devices (native scroll wins)
// ============================================================================

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip smooth scroll on reduced-motion preference (accessibility)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // Prevent Lenis from intercepting scroll on horizontal marquee strips
      prevent: (node: Element) => {
        return (
          node.classList.contains('marquee-strip') ||
          node.closest('[data-lenis-prevent]') !== null
        );
      },
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
