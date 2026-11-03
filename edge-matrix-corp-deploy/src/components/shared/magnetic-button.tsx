'use client';

// ============================================================================
// Edge Matrix Corporation — Magnetic Button
// Advanced interaction component that follows the cursor slightly on hover.
// ============================================================================

import { useRef, useState, ReactNode } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import Link from 'next/link';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  intensity?: number;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  intensity = 0.5,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for smooth magnetic pull
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  // Add subtle rotation based on magnetic pull
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (scaled by intensity)
    x.set((clientX - centerX) * intensity);
    y.set((clientY - centerY) * intensity);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden group";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-em-primary to-em-primary-light text-white hover:shadow-[0_0_45px_rgba(230,0,38,0.45)]",
    secondary: "bg-em-accent text-white border border-em-accent hover:bg-em-accent/90 hover:shadow-md",
    ghost: "bg-transparent text-em-text-secondary hover:text-em-text hover:bg-em-surface-light/50"
  };

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ x, y, rotateX, rotateY }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={href}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          >
            {/* Shine effect on hover */}
            {variant !== 'ghost' && (
              <motion.div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${isHovered ? '50% 50%' : '0% 0%'}, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                }}
              />
            )}
            
            <span className="relative z-10 flex items-center justify-center gap-2 w-full">
              {children}
            </span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ x, y, rotateX, rotateY }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={onClick}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {/* Shine effect on hover */}
          {variant !== 'ghost' && (
            <motion.div
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at ${isHovered ? '50% 50%' : '0% 0%'}, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              }}
            />
          )}
          
          <span className="relative z-10 flex items-center justify-center gap-2 w-full">
            {children}
          </span>
        </button>
      </motion.div>
    </div>
  );
}
