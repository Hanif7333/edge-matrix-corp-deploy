import { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';
import { PageHeader } from '@/components/shared';
import { AboutMissionSection } from './_components/mission-section';
import { AboutTimelineSection } from './_components/timeline-section';
import { AboutStatsSection } from './_components/stats-section';
import { CTASection } from '@/sections';

export const metadata: Metadata = {
  title: 'About | Edge Matrix Corporation',
  description: 'Our mission, vision, and the history behind Edge Matrix Corporation. Engineering intelligent systems for the Industry 5.0 era.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        <PageHeader
          title="WE DO IT FOR YOU WITH HAPPINESS"
          subtitle="We work through every aspect at the planning. Edge Matrix Multinational Corporation is a corporate initiative that uses Artificial Intelligence, Robotics and Data Science to make humanity more powerful."
          badge="About Us"
          breadcrumbs={[{ label: 'About' }]}
          pattern="dots"
          gradientColor="primary"
        />

        <AboutMissionSection />
        <AboutStatsSection />
        <AboutTimelineSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
