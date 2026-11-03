'use client';

import { motion, useSpring } from 'motion/react';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useEffect, useState } from 'react';

export function DataCube3D() {
  const mouse = useMousePosition();
  const [windowCenter, setWindowCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setWindowCenter({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }, 0);

    const handleResize = () => {
      setWindowCenter({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const normalizedX = (mouse.x - windowCenter.x) / windowCenter.x || 0;
  const normalizedY = (mouse.y - windowCenter.y) / windowCenter.y || 0;

  const springConfig = { damping: 40, stiffness: 100, mass: 2 };
  
  // Base rotation plus mouse rotation
  const rotateX = useSpring(normalizedY * -45, springConfig);
  const rotateY = useSpring(normalizedX * 45, springConfig);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center pointer-events-none perspective-[1200px]">
      
      {/* Container for the 3D Cube */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
        className="relative w-48 h-48 md:w-64 md:h-64"
      >
        {/* Core Glowing Orb inside the Cube */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-em-primary/60 blur-[30px] rounded-full animate-pulse" style={{ transform: 'translateZ(0px)' }} />

        {/* Cube Faces */}
        {/* Front Face */}
        <div 
          className="absolute inset-0 border border-em-primary/40 bg-em-bg/40 backdrop-blur-sm flex items-center justify-center overflow-hidden"
          style={{ transform: 'translateZ(128px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-em-primary/10 to-transparent" />
          {/* Matrix Grid Lines on Face */}
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(230, 0, 38, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(230, 0, 38, 0.25) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 border border-em-accent/40 bg-em-bg/20 backdrop-blur-sm"
          style={{ transform: 'translateZ(-128px) rotateY(180deg)' }}
        >
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        {/* Right Face */}
        <div 
          className="absolute inset-0 border border-em-primary/30 bg-em-bg/20"
          style={{ transform: 'translateX(128px) rotateY(90deg)' }}
        />

        {/* Left Face */}
        <div 
          className="absolute inset-0 border border-em-primary/30 bg-em-bg/20"
          style={{ transform: 'translateX(-128px) rotateY(-90deg)' }}
        />

        {/* Top Face */}
        <div 
          className="absolute inset-0 border border-em-primary/30 bg-em-primary/5"
          style={{ transform: 'translateY(-128px) rotateX(90deg)' }}
        />

        {/* Bottom Face */}
        <div 
          className="absolute inset-0 border border-em-primary/30 bg-em-primary/5"
          style={{ transform: 'translateY(128px) rotateX(-90deg)' }}
        >
          {/* Casting a fake shadow downwards */}
          <div className="absolute inset-0 bg-em-primary/40 blur-[60px]" style={{ transform: 'translateZ(-50px)' }} />
        </div>

        {/* Outer Wireframe Box (Tesseract Effect) */}
        <motion.div
          className="absolute inset-[-20%] border border-white/5"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0px)' }}
          animate={{
            rotateX: [0, 180, 360],
            rotateY: [0, -180, -360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
           {/* Wireframe Faces */}
           <div className="absolute inset-0 border border-em-primary/20" style={{ transform: 'translateZ(160px)' }} />
           <div className="absolute inset-0 border border-em-accent/20" style={{ transform: 'translateZ(-160px)' }} />
           <div className="absolute inset-0 border border-white/10" style={{ transform: 'translateX(160px) rotateY(90deg)' }} />
           <div className="absolute inset-0 border border-white/10" style={{ transform: 'translateX(-160px) rotateY(90deg)' }} />
        </motion.div>

      </motion.div>
    </div>
  );
}
