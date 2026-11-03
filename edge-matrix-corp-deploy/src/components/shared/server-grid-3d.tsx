'use client';

import { motion, useSpring } from 'motion/react';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useEffect, useState } from 'react';

export function ServerGrid3D() {
  const mouse = useMousePosition();
  const [windowCenter, setWindowCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setWindowCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const normalizedX = (mouse.x - windowCenter.x) / windowCenter.x || 0;
  const normalizedY = (mouse.y - windowCenter.y) / windowCenter.y || 0;

  const rotateX = useSpring(normalizedY * 20 + 60, { damping: 40, stiffness: 100 }); // Default tilted 60deg like an isometric grid
  const rotateZ = useSpring(normalizedX * -20 - 45, { damping: 40, stiffness: 100 }); // Default rotated -45deg

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center pointer-events-none perspective-[1500px]">
      <motion.div
        style={{ rotateX, rotateZ, transformStyle: 'preserve-3d' }}
        className="relative grid grid-cols-3 gap-8 p-12 bg-em-primary/5 border border-em-primary/20 backdrop-blur-md rounded-xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-16 h-16 bg-em-bg border border-em-primary/40 relative shadow-[0_10px_30px_rgba(230,0,38,0.2)]"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
            whileHover={{ translateZ: 60 }}
          >
            {/* Server Status Lights */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            <div className="absolute top-2 right-5 w-1 h-1 bg-em-accent rounded-full animate-ping" style={{ animationDelay: `${i * 0.1}s` }} />
            
            {/* Top glowing edge */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-em-primary to-transparent opacity-50" />
            
            {/* Floating shadow below */}
            <div className="absolute -bottom-10 left-0 right-0 h-10 bg-black/40 blur-md transform origin-top -skew-x-12" style={{ transform: 'translateZ(-40px)' }} />
          </motion.div>
        ))}

        {/* Base Grid Plane */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(230,0,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(230,0,38,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" style={{ transform: 'translateZ(-1px)' }} />
      </motion.div>
    </div>
  );
}
