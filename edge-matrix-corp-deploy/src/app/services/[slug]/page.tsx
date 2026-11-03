import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';
import { PageHeader, GlassPanel, GlowCard } from '@/components/shared';
import { SERVICES } from '@/constants/services';
import { CTASection } from '@/sections';
import { siteConfig } from '@/lib/metadata';
import { CheckCircle2, Box, Cpu, ShieldCheck } from 'lucide-react';

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.id === resolvedParams.slug);
  
  if (!service) {
    return { title: 'Service Not Found | Edge Matrix Corporation' };
  }

  return {
    title: `${service.title} | Edge Matrix Corporation`,
    description: service.description,
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.id === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Structured SEO Schema (JSON-LD) for Search Engine Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.title,
    'description': service.description,
    'provider': {
      '@type': 'Organization',
      'name': siteConfig.name,
      'url': siteConfig.url,
      'logo': `${siteConfig.url}/logo.png`
    },
    'areaServed': 'Global',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': service.title,
      'itemListElement': service.features.map((feature) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': feature
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" role="main">
        <PageHeader
          title={service.title}
          subtitle={service.description}
          badge={service.subtitle}
          breadcrumbs={[
            { label: 'Services', href: '/services' },
            { label: service.title },
          ]}
          pattern="dots"
          gradientColor="highlight"
        />

        {/* Capabilities Deep Dive */}
        <section className="em-section pt-0">
          <div className="em-container">
            <div className="mb-12">
              <h2 className="font-[var(--font-heading)] text-3xl font-bold text-em-text mb-4">
                Core Capabilities
              </h2>
              <p className="text-em-text-secondary max-w-2xl">
                Our {service.title} platform provides an end-to-end suite of enterprise tools designed for high-performance industrial environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, i) => (
                <GlowCard key={feature} delay={i * 0.1} glow="highlight" className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-em-highlight shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-em-text">{feature}</span>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack & Implementation */}
        <section className="em-section bg-em-surface/30 border-y border-em-border">
          <div className="em-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <GlassPanel intensity="strong" className="p-8 lg:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-em-highlight/10 border border-em-highlight/20 flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6 text-em-highlight" />
                </div>
                <h3 className="text-xl font-bold text-em-text mb-4">Tech Stack Integration</h3>
                <p className="text-sm text-em-text-secondary">
                  Seamlessly integrates with your existing ERP, MES, and cloud infrastructure using enterprise-grade REST APIs and secure websocket connections.
                </p>
              </GlassPanel>

              <GlassPanel intensity="strong" className="p-8 lg:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-em-accent/10 border border-em-accent/20 flex items-center justify-center mb-6">
                  <Box className="w-6 h-6 text-em-accent" />
                </div>
                <h3 className="text-xl font-bold text-em-text mb-4">Edge & Cloud Deployment</h3>
                <p className="text-sm text-em-text-secondary">
                  Flexible deployment architectures supporting full cloud (AWS/Azure/GCP), on-premise, or hybrid edge computing for ultra-low latency requirements.
                </p>
              </GlassPanel>

              <GlassPanel intensity="strong" className="p-8 lg:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-em-primary/10 border border-em-primary/20 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-em-primary" />
                </div>
                <h3 className="text-xl font-bold text-em-text mb-4">Enterprise Security</h3>
                <p className="text-sm text-em-text-secondary">
                  SOC2 Type II certified architecture with end-to-end encryption, role-based access control, and complete data sovereignty compliance.
                </p>
              </GlassPanel>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
