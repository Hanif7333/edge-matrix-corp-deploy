import { fontVariables } from '@/lib/fonts';
import { siteMetadata } from '@/lib/metadata';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CustomCursor, CommandPalette, TerminalAssistant } from '@/components/shared';
import './globals.css';

// ============================================================================
// Edge Matrix Corporation — Root Layout
//
// ARCHITECTURE: This file is a Server Component (no 'use client').
// This is critical because:
// 1. Metadata export only works in Server Components
// 2. Font variables are injected at build time, not runtime
// 3. The <html> and <body> structure is server-rendered for SEO
//
// Client-side features (smooth scroll, animations, state) live in
// <Providers>, which is the boundary between server and client rendering.
//
// PERFORMANCE:
// - Fonts: Preloaded via next/font, zero FOUT, zero CLS
// - CSS: globals.css is extracted and cached by Turbopack
// - HTML: Server-rendered for instant FCP
// - Providers: Hydrated after initial paint (non-blocking)
//
// ACCESSIBILITY:
// - lang="en" for screen readers
// - suppressHydrationWarning prevents theme-flash console noise
// - Skip-to-content link for keyboard users
// - Semantic <main> landmark provided by page components
// ============================================================================

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-em-text transition-colors duration-300" suppressHydrationWarning>
        {/* Skip to content — keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-em-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>

        {/* Ambient Glowing Background Blobs for Glassmorphism Depth */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,59,87,0.05)_0%,transparent_70%)] blur-[80px] animate-pulse-glow-slow" />
          <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,94,121,0.03)_0%,transparent_70%)] blur-[100px] animate-pulse-glow-slow [animation-delay:2.5s]" />
          <div className="absolute bottom-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(255,59,87,0.04)_0%,transparent_70%)] blur-[80px] animate-pulse-glow-slow [animation-delay:5s]" />
        </div>

        <Providers>
          {children}
        </Providers>
        <CommandPalette />
        <TerminalAssistant />
        <CustomCursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
