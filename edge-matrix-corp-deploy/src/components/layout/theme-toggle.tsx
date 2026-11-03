'use client';

// ============================================================================
// Edge Matrix Corporation — Premium Theme Toggle
// Micro-animated toggle utilizing Framer Motion and Lucide icons
// ============================================================================

import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-em-border bg-white/70 dark:bg-white/5 backdrop-blur-md hover:border-em-primary/45 transition-colors cursor-none select-none group shadow-[0_4px_12px_rgba(10,11,13,0.04)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-em-primary focus-visible:outline-offset-2 overflow-hidden"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Dynamic scan line inside toggle */}
      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-em-primary/50 to-transparent top-0 animate-scan-line pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <motion.div
          className="absolute text-em-text shrink-0"
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 90,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Sun className="w-4.5 h-4.5 text-em-primary" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          className="absolute text-em-text shrink-0"
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -90,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Moon className="w-4.5 h-4.5 text-em-primary-light" />
        </motion.div>
      </div>
    </button>
  );
}
