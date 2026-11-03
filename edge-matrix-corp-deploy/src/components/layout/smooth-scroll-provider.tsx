'use client';

// ============================================================================
// Edge Matrix Corporation — Smooth Scroll Provider
// Wraps the app with Lenis smooth scrolling
// ============================================================================

import { ReactNode } from 'react';
import { useLenis } from '@/hooks/use-lenis';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useLenis();
  return <>{children}</>;
}
