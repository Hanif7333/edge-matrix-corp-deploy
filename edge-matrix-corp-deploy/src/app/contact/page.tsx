import { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';
import { PageHeader, GlowCard, SectionWrapper, GlobalGlobe3D } from '@/components/shared';
import { ContactForm } from './_components/contact-form';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Edge Matrix Corporation',
  description: 'Get in touch with our global offices to discuss how our AI and Robotics solutions can transform your enterprise.',
};

const OFFICES = [
  {
    city: 'United States',
    region: 'North America',
    address: '08, The Green Ste, A Dover Delaware - 19901, USA',
    email: 'writeus@edgematrixcorp.com',
    phone: '+1 (929) 207-1726',
    timezone: 'EST / EDT',
  },
  {
    city: 'India',
    region: 'Asia Pacific',
    address: 'No 10, Subramaniyapuram 4th Street, Madurai-625011',
    email: 'writeus@edgematrixcorp.com',
    phone: '+91 8300575800',
    timezone: 'IST',
  },
  {
    city: 'Poland',
    region: 'Europe',
    address: 'Kopalniana 16E, 01-321 Warszawa,\n Poland',
    email: 'anish@edgematrixcorp.com',
    phone: '+48 793 916-894',
    timezone: 'CET',
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        <PageHeader
          title="USE THE BELOW FORM TO DROP US MESSAGE"
          subtitle="Interact with us"
          badge="Contact Us"
          breadcrumbs={[{ label: 'Contact' }]}
          pattern="dots"
          gradientColor="primary"
        />

        <SectionWrapper>
          <div className="hidden lg:block relative z-0">
            <GlobalGlobe3D />
          </div>
        </SectionWrapper>

        <section className="em-section pt-0">
          <div className="em-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Left Column: Form */}
              <div className="lg:col-span-7 xl:col-span-8">
                <ContactForm />
              </div>

              {/* Right Column: Offices */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                <h3 className="font-[var(--font-heading)] text-xl font-bold text-em-text px-2">
                  Global Intelligence Hubs
                </h3>

                {OFFICES.map((office, index) => (
                  <GlowCard key={office.city} delay={index * 0.1} glow="primary" className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-em-primary/10 flex items-center justify-center shrink-0 mt-1">
                        <MapPin className="w-5 h-5 text-em-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-em-text text-lg">{office.city}</h4>
                        <div className="text-[10px] text-em-primary font-bold uppercase tracking-wider mb-2">
                          {office.region}
                        </div>
                        <p className="text-sm text-em-text-secondary whitespace-pre-line mb-4">
                          {office.address}
                        </p>
                        <div className="space-y-2">
                          <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-xs text-em-text-muted hover:text-em-primary transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                            {office.email}
                          </a>
                          <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-xs text-em-text-muted hover:text-em-primary transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                            {office.phone}
                          </a>
                          <div className="flex items-center gap-2 text-xs text-em-text-muted">
                            <Clock className="w-3.5 h-3.5" />
                            {office.timezone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
