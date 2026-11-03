'use client';

import { motion } from 'motion/react';

export function RadarScanner3D() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center pointer-events-none perspective-[1000px]">
      {/* 3D Tilted Radar Base */}
      <div 
        className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-em-primary/20 bg-em-bg/50 backdrop-blur-md flex items-center justify-center"
        style={{ transform: 'rotateX(60deg)', transformStyle: 'preserve-3d' }}
      >
        {/* Concentric Radar Rings */}
        <div className="absolute inset-[10%] rounded-full border border-em-primary/10" />
        <div className="absolute inset-[30%] rounded-full border border-em-primary/20" />
        <div className="absolute inset-[50%] rounded-full border border-em-primary/30" />
        
        {/* Central Hub */}
        <div className="absolute inset-[48%] rounded-full bg-em-primary shadow-[0_0_20px_#E60026]" style={{ transform: 'translateZ(10px)' }} />

        {/* Scanning Sweep */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(230,0,38,1) 0%, rgba(230,0,38,0) 100%)', transformStyle: 'preserve-3d', transform: 'translateZ(5px)' }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {/* Sweep Trail */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(230,0,38,0.2)_90deg)] origin-bottom-left -rotate-90 blur-md" />
        </motion.div>

        {/* Discovered Activity Nodes */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-2 h-2 bg-em-accent rounded-full shadow-[0_0_10px_#fff]"
          style={{ transform: 'translateZ(20px)' }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 1], delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]"
          style={{ transform: 'translateZ(30px)' }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 1], delay: 3 }}
        />
      </div>
      
      {/* Upward Holographic Projection */}
      <div className="absolute bottom-10 w-32 h-64 bg-gradient-to-t from-em-primary/10 to-transparent blur-xl" />
    </div>
  );
}
