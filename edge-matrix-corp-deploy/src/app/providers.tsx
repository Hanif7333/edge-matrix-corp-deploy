'use client';

// ============================================================================
// Edge Matrix Corporation — Client Providers
// Wraps the application with all client-side providers
// ============================================================================

import { ReactNode } from 'react';
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  );
}
