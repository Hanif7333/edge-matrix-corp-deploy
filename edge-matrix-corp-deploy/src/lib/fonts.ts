// ============================================================================
// Edge Matrix Corporation — Font Configuration
// Centralized font loading via next/font/google
//
// WHY: next/font/google self-hosts fonts at build time, eliminating
// external network requests. Fonts are preloaded with <link rel="preload">,
// preventing FOUT (Flash of Unstyled Text) and improving LCP.
//
// PERFORMANCE: Zero CLS from font loading. Fonts are inlined into CSS
// and served from the same origin as the app.
// ============================================================================

import { Space_Grotesk, Inter } from 'next/font/google';

/**
 * Space Grotesk — Geometric sans-serif for headings
 * Used by: h1-h6, section titles, stat counters, brand elements
 * Character: Technical, modern, authoritative — matches NVIDIA/Palantir aesthetic
 */
export const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

/**
 * Inter — Humanist sans-serif for body text
 * Used by: paragraphs, navigation, buttons, labels, descriptions
 * Character: Highly legible at all sizes, optimized for screens — industry standard
 */
export const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

/**
 * CSS class string for applying both font variables to <html>
 * Used in layout.tsx: className={`${fontVariables} ...`}
 */
export const fontVariables = `${spaceGrotesk.variable} ${inter.variable}`;
