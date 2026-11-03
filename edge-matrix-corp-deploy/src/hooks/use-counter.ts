'use client';

// ============================================================================
// Edge Matrix Corporation — Animated Counter Hook
// Smooth number counting animation for statistics
// ============================================================================

import { useEffect, useState, useCallback } from 'react';

interface UseCounterOptions {
  end: number;
  duration?: number;
  startOnView?: boolean;
  decimals?: number;
}

export function useCounter({
  end,
  duration = 2000,
  startOnView = true,
  decimals = 0,
}: UseCounterOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);

  const startCounting = useCallback(() => {
    setHasStarted(true);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = eased * end;

      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [hasStarted, end, duration, decimals]);

  return { count, startCounting };
}
