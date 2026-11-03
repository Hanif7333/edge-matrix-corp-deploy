import { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';
import { PageHeader, GlowCard, ServerGrid3D } from '@/components/shared';
import { SERVICES } from '@/constants/services';
import Link from 'next/link';
import { ArrowRight, Brain, Eye, AudioLines, Bot, TrendingUp, Layers, Network, Radar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CTASection } from '@/sections';

export const metadata: Metadata = {
  title: 'Enterprise AI Services | Edge Matrix Corporation',
  description: 'Explore our eight specialized technology verticals working as an integrated intelligent automation ecosystem for enterprise-scale digital transformation.',
};

const ICON_MAP: Record<string, LucideIcon> = {
  Eye, AudioLines, Bot, TrendingUp, Layers, Brain, Network, Radar,
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        <PageHeader
          title="Our Purpose is To Deliver Excellence in Service and Execution"
          subtitle="Services we provide"
          badge="Services"
          breadcrumbs={[{ label: 'Services' }]}
          pattern="grid"
          gradientColor="accent"
        />

        <section className="em-section pt-0 pb-10">
          <div className="em-container">
            <ServerGrid3D />
          </div>
        </section>

        <section className="em-section pt-0 pb-32">
          <div className="em-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, index) => {
                const Icon = ICON_MAP[service.icon] || Brain;
                return (
                  <GlowCard
                    key={service.id}
                    delay={index * 0.1}
                    glow="accent"
                    className="p-8 group flex flex-col h-full"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-[1px]`}>
                        <div className="w-full h-full rounded-[11px] bg-em-bg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-em-text" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-[var(--font-heading)] text-xl font-bold text-em-text tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-em-text-secondary leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>

                    <div className="pt-6 border-t border-em-border mt-auto">
                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center justify-between w-full text-sm font-medium text-em-text hover:text-em-accent transition-colors group/link"
                      >
                        Explore Capabilities
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </GlowCard>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
