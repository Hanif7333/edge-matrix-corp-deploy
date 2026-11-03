'use client';

// ============================================================================
// Edge Matrix Corporation — Matrix Rain v2 (Dark Theme Optimized)
// Vivid Enterprise Red (#E60026) + White leads on deep black canvas.
// Bright glowing heads, crimson trails — highly visible against dark bg.
// ============================================================================

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  opacity?: number;
  speed?: number;
  density?: number; // 1-10
  color?: 'red' | 'white' | 'mixed';
  className?: string;
}

export function MatrixRain({
  opacity = 0.65,
  speed = 1,
  density = 6,
  color = 'red',
  className = '',
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const FONT_SIZE = 13;
    const CHARS = 'エアウオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ01MATRIX'.split('');
    const BASE_SPEED = 0.7 * speed;
    let drops: { y: number; speed: number; bright: boolean; phase: number }[] = [];
    let cols = 0;
    let animId: number;
    let lastTime = 0;
    const INTERVAL = 1000 / 30;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      cols = Math.floor(w / FONT_SIZE);
      const activeCols = Math.floor(cols * (density / 10));

      drops = Array.from({ length: cols }, () => ({
        y: Math.random() * -80,
        speed: (0.5 + Math.random() * 1.2) * BASE_SPEED,
        bright: Math.random() < 0.12, // 12% are glowing leads
        phase: Math.random() * Math.PI * 2, // for flicker
      }));

      // Disable inactive columns
      for (let i = activeCols; i < cols; i++) {
        drops[i].speed = 0;
      }
    };

    const bgVal = window.getComputedStyle(document.body).backgroundColor;
    const isLight = bgVal.includes('255, 255, 255') || bgVal === 'white' || bgVal === 'rgb(255, 255, 255)';

    const draw = (timestamp: number) => {
      animId = requestAnimationFrame(draw);
      const delta = timestamp - lastTime;
      if (delta < INTERVAL) return;
      lastTime = timestamp - (delta % INTERVAL);

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Trail fade color — fades to white in light theme and black in dark theme
      ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.045)' : 'rgba(0, 0, 0, 0.045)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;

      drops.forEach((drop, i) => {
        if (!drop.speed) return;

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drop.y * FONT_SIZE;

        if (y < 0 || y > h) {
          if (y > h && Math.random() > 0.96) {
            drop.y = 0;
            drop.bright = Math.random() < 0.12;
            drop.phase = Math.random() * Math.PI * 2;
          }
          drop.y += drop.speed;
          return;
        }

        const depthFade = Math.max(0.12, 1 - (y / h) * 0.6);

        if (drop.bright) {
          // Blazing lead — full brightness (black in light mode, white in dark mode)
          ctx.fillStyle = isLight 
            ? `rgba(10, 11, 13, ${0.95 * depthFade})` 
            : `rgba(255, 255, 255, ${0.92 * depthFade})`;
          ctx.shadowColor = 'rgba(230, 0, 38, 1)';
          ctx.shadowBlur = isLight ? 4 : 12;
        } else if (color === 'red') {
          const intensity = 0.45 + Math.sin(timestamp * 0.001 + drop.phase) * 0.1;
          ctx.fillStyle = `rgba(230, 0, 38, ${intensity * depthFade})`;
          ctx.shadowBlur = 0;
        } else if (color === 'white') {
          ctx.fillStyle = isLight
            ? `rgba(10, 11, 13, ${0.35 * depthFade})`
            : `rgba(200, 200, 200, ${0.35 * depthFade})`;
          ctx.shadowBlur = 0;
        } else {
          // Mixed: vivid red base with occasional dark/white flashes
          const flashChance = Math.random();
          if (flashChance < 0.04) {
            // Occasional flash
            ctx.fillStyle = isLight 
              ? `rgba(10, 11, 13, ${0.8 * depthFade})` 
              : `rgba(255, 255, 255, ${0.75 * depthFade})`;
            ctx.shadowColor = 'rgba(230, 0, 38, 0.5)';
            ctx.shadowBlur = isLight ? 2 : 6;
          } else {
            // Vivid crimson
            const intensity = 0.55 + Math.sin(timestamp * 0.0008 + drop.phase) * 0.12;
            ctx.fillStyle = `rgba(230, 0, 38, ${intensity * depthFade})`;
            ctx.shadowBlur = 0;
          }
        }

        ctx.fillText(char, x, y);

        // Reset glow after bright chars
        if (drop.bright) ctx.shadowBlur = 0;

        drop.y += drop.speed;
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      init();
    });
    resizeObserver.observe(canvas);

    // Pause animation when canvas scrolls out of view — saves GPU/CPU
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    // Patched draw to skip frames when not visible
    const originalDraw = draw;
    const pausableDraw = (timestamp: number) => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      originalDraw(timestamp);
    };
    // Override draw reference used in RAF
    (draw as unknown as { _paused: boolean })._paused = false;

    init();
    animId = requestAnimationFrame(pausableDraw);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [speed, density, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
