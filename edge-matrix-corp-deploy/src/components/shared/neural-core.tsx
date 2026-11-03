'use client';

import { motion, useSpring } from 'motion/react';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useEffect, useState } from 'react';

export function NeuralCore3D() {
  const mouse = useMousePosition();
  const [windowCenter, setWindowCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowCenter({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    };

    const timer = setTimeout(handleResize, 0);

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate mouse distance from center (-1 to 1)
  const normalizedX = (mouse.x - windowCenter.x) / windowCenter.x || 0;
  const normalizedY = (mouse.y - windowCenter.y) / windowCenter.y || 0;

  // Spring physics for smooth 3D rotation
  const springConfig = { damping: 30, stiffness: 100, mass: 2 };
  
  const rotateX = useSpring(normalizedY * 30, springConfig); // Tilt up/down
  const rotateY = useSpring(normalizedX * -30, springConfig); // Rotate left/right
  
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-none perspective-[1000px]">
      
      {/* 3D Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-64 h-64 md:w-96 md:h-96"
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Core Sphere (Back Layer) */}
        <div 
          className="absolute inset-0 rounded-full border border-em-primary/20 bg-em-primary/5 backdrop-blur-sm"
          style={{ transform: 'translateZ(-50px)' }}
        >
          <div className="absolute inset-4 rounded-full border border-em-accent/30 animate-[spin_10s_linear_infinite_reverse]" />
        </div>

        {/* Neural Network Nodes (Middle Layer) */}
        <div 
          className="absolute inset-0"
          style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
        >
          {/* Generate structural lines using SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100">
            <motion.path 
              d="M50 10 L85 25 L85 75 L50 90 L15 75 L15 25 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              className="text-em-primary"
              animate={{
                strokeDasharray: ["0 100", "100 0"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
            <path d="M50 10 L50 50 L85 25 M85 75 L50 50 L50 90 M15 75 L50 50 L15 25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-em-accent/50" />
            
            {/* Glowing Nodes */}
            <circle cx="50" cy="50" r="3" className="fill-em-primary" />
            <circle cx="50" cy="10" r="1.5" className="fill-em-accent" />
            <circle cx="85" cy="25" r="1.5" className="fill-em-accent" />
            <circle cx="85" cy="75" r="1.5" className="fill-em-accent" />
            <circle cx="50" cy="90" r="1.5" className="fill-em-accent" />
            <circle cx="15" cy="75" r="1.5" className="fill-em-accent" />
            <circle cx="15" cy="25" r="1.5" className="fill-em-accent" />
          </svg>
        </div>

        {/* Outer Orbital Rings (Front Layer) */}
        <div 
          className="absolute inset-[-10%] rounded-full border-2 border-dashed border-em-primary/30"
          style={{ transform: 'translateZ(50px)' }}
        />
        <div 
          className="absolute inset-[-20%] rounded-full border border-em-accent/20"
          style={{ transform: 'translateZ(100px)' }}
        >
          {/* Orbital Dot */}
          <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 bg-em-highlight rounded-full shadow-[0_0_10px_#fff]" />
        </div>

        {/* Central Glow Core */}
        <div className="absolute inset-1/4 bg-em-primary/30 rounded-full blur-2xl animate-pulse mix-blend-screen" />
      </motion.div>
    </div>
  );
}
