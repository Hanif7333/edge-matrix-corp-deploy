'use client';

// ============================================================================
// Edge Matrix Corporation — Below-fold Sections Loader
// Client Component wrapper that lazy-loads all below-the-fold sections.
// Using `ssr: false` here is valid because this is a Client Component.
// ============================================================================

import dynamic from 'next/dynamic';
import { ServicesSkeleton, GenericGridSkeleton } from '@/components/ui/skeletons';

const AboutIndustrySection       = dynamic(() => import('@/sections/about-industry-section').then(m => ({ default: m.AboutIndustrySection })), { ssr: false, loading: () => <GenericGridSkeleton /> });
const ServicesOverviewSection    = dynamic(() => import('@/sections/services-overview-section').then(m => ({ default: m.ServicesOverviewSection })), { ssr: false, loading: () => <ServicesSkeleton /> });
const InnovationSection          = dynamic(() => import('@/sections/innovation-section').then(m => ({ default: m.InnovationSection })), { ssr: false, loading: () => <GenericGridSkeleton /> });
const VisionAISection            = dynamic(() => import('@/sections/vision-ai-section').then(m => ({ default: m.VisionAISection })), { ssr: false, loading: () => <ServicesSkeleton /> });
const VoiceAISection             = dynamic(() => import('@/sections/voice-ai-section').then(m => ({ default: m.VoiceAISection })), { ssr: false, loading: () => <ServicesSkeleton /> });
const RoboticsSection            = dynamic(() => import('@/sections/robotics-section').then(m => ({ default: m.RoboticsSection })), { ssr: false, loading: () => <GenericGridSkeleton /> });
const PredictiveAnalyticsSection = dynamic(() => import('@/sections/predictive-analytics-section').then(m => ({ default: m.PredictiveAnalyticsSection })), { ssr: false, loading: () => <GenericGridSkeleton /> });
const GlobalPresenceSection      = dynamic(() => import('@/sections/global-presence-section').then(m => ({ default: m.GlobalPresenceSection })), { ssr: false, loading: () => <GenericGridSkeleton /> });
const TestimonialsSection        = dynamic(() => import('@/sections/testimonials-section').then(m => ({ default: m.TestimonialsSection })), { ssr: false, loading: () => <ServicesSkeleton /> });
const CTASection                 = dynamic(() => import('@/sections/cta-section').then(m => ({ default: m.CTASection })), { ssr: false, loading: () => <GenericGridSkeleton /> });

export function BelowFoldSections() {
  return (
    <>
      <div className="em-divider mx-auto w-1/2" aria-hidden="true" />
      <AboutIndustrySection />
      <ServicesOverviewSection />
      <div className="em-divider mx-auto w-1/3" aria-hidden="true" />
      <InnovationSection />
      <VisionAISection />
      <VoiceAISection />
      <RoboticsSection />
      <PredictiveAnalyticsSection />
      <div className="em-divider mx-auto w-1/3" aria-hidden="true" />
      <GlobalPresenceSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
