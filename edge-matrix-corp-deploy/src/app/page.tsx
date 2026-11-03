// ============================================================================
// Edge Matrix Corporation — Homepage (Server Component)
//
// PERFORMANCE ARCHITECTURE:
// - This page is a Server Component — no 'use client' — so HTML is pre-rendered
//   and delivered instantly from the server/edge.
// - Above-fold sections (Hero, Stats, Clients) are eager — needed for LCP.
// - All below-fold sections are code-split into BelowFoldSections (Client),
//   which lazy-loads each heavy section only after initial paint.
// ============================================================================

import { Navbar, Footer } from '@/components/layout';
import { ScrollToTop } from '@/components/shared';
import { HeroSection } from '@/sections/hero-section';
import { StatsSection } from '@/sections/stats-section';
import { ClientsSection } from '@/sections/clients-section';
import { BelowFoldSections } from './below-fold-sections';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        {/* Above fold — eager, needed for LCP */}
        <HeroSection />
        <StatsSection />
        <ClientsSection />

        {/* Below fold — lazy loaded progressively in a Client Component */}
        <BelowFoldSections />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
