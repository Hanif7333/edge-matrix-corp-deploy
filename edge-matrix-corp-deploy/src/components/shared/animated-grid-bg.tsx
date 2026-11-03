'use client';

// ============================================================================
// Edge Matrix Corporation — Animated Grid Background
// Cinematic, performance-optimized background using canvas for the Hero
// ============================================================================

import { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/use-mouse-position';

export function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Matrix Rain Setup
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
    const fontSize = 14;
    let columns: number;
    let drops: number[];

    const initMatrix = () => {
      columns = Math.floor(window.innerWidth / fontSize) + 1;
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // start offscreen
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initMatrix();
    };

    window.addEventListener('resize', resize);
    resize();

    const drawGrid = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Clear with slight opacity for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, w, h);
      
      // 1. Draw Digital Rain — Enterprise Crimson
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Crimson red for enterprise matrix aesthetic
        const isLead = Math.random() < 0.03;
        ctx.fillStyle = isLead
          ? 'rgba(255, 255, 255, 0.85)'      // occasional white flash
          : 'rgba(230, 0, 38, 0.35)';          // enterprise crimson
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset or move drop
        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // 2. Draw Interactive Grid
      const gridSize = 40;
      const offsetX = (time * 0.5) % gridSize;
      const offsetY = (time * 0.5) % gridSize;

      ctx.lineWidth = 1;
      
      // Draw grid lines
      for (let x = -offsetX; x < w; x += gridSize) {
        for (let y = -offsetY; y < h; y += gridSize) {
          // Calculate distance to mouse
          const rect = canvas.getBoundingClientRect();
          const mouseX = mouse.x - rect.left;
          const mouseY = mouse.y - rect.top;
          
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Base opacity + hover opacity
          const baseOpacity = 0.02;
          const hoverOpacity = Math.max(0, 0.15 - (dist / 1000));
          const opacity = baseOpacity + hoverOpacity;

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          
          // Draw crosshairs at intersections
          ctx.beginPath();
          ctx.moveTo(x - 2, y);
          ctx.lineTo(x + 2, y);
          ctx.moveTo(x, y - 2);
          ctx.lineTo(x, y + 2);
          ctx.stroke();
        }
      }
      
      time++;
      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse.x, mouse.y]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Fallback gradient masks to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-em-bg via-transparent to-em-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-em-bg via-transparent to-em-bg" />
    </div>
  );
}
