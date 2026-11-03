'use client';

// ============================================================================
// Edge Matrix Corporation — Premium Enterprise Footer v2
// Full-width newsletter CTA, animated social icons (LinkedIn, Instagram,
// Facebook, Twitter/X), tech-stack trust badges, legal links, and ambient
// glow effects with staggered Framer Motion entrance animations.
// ============================================================================

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, Phone, Send, ChevronRight } from 'lucide-react';
import { COMPANY_NAME } from '@/constants/navigation';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

// ─── Footer Link Data ────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  solutions: [
    { label: 'AI Vision', href: '/services#ai-vision' },
    { label: 'Voice AI', href: '/services#voice-ai' },
    { label: 'Robotics', href: '/services#robotics' },
    { label: 'Digital Twin', href: '/services#digital-twin' },
    { label: 'Predictive Analytics', href: '/services#predictive-analytics' },
    { label: 'Industrial IoT', href: '/services#iiot' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Activity', href: '/activity' },
    { label: 'Trainings', href: '/trainings' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'White Papers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'API Reference', href: '#' },
  ],
};

// ─── Inline SVG Brand Icons ──────────────────────────────────────────────────
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { Icon: LinkedInIcon, href: '#', label: 'LinkedIn', hoverColor: 'hover:text-[#0077B5]' },
  { Icon: InstagramIcon, href: '#', label: 'Instagram', hoverColor: 'hover:text-[#E4405F]' },
  { Icon: FacebookIcon, href: '#', label: 'Facebook', hoverColor: 'hover:text-[#1877F2]' },
  { Icon: XIcon, href: '#', label: 'X (Twitter)', hoverColor: 'hover:text-em-text' },
];

// ─── Newsletter CTA Strip ────────────────────────────────────────────────────
function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-em-border bg-gradient-to-r from-em-surface via-white to-em-surface mb-16">
      {/* Subtle ambient glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-em-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-em-primary/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8 md:py-6">
        {/* Left: CTA Copy */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
            <Mail className="w-4 h-4 text-em-primary" />
            <span className="text-[10px] font-black text-em-primary uppercase tracking-widest">Intelligence Briefings</span>
          </div>
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-em-text tracking-tight">
            Stay connected with Edge Matrix updates
          </h3>
          <p className="text-xs text-em-text-muted mt-1">
            Industry insights, product launches, and deep-tech research — delivered monthly.
          </p>
        </div>

        {/* Right: Email input + button */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full md:w-auto">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm font-semibold text-em-primary flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-em-primary/10 flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-em-primary" />
              </div>
              Subscribed successfully!
            </motion.div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full md:w-64 bg-white border border-em-border rounded-xl px-4 py-3 text-sm text-em-text focus:outline-none focus:ring-1 focus:ring-em-primary focus:border-em-primary/50 transition-colors placeholder:text-em-text-muted/60"
                required
              />
              <button
                type="submit"
                className="shrink-0 group relative inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,0,38,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-em-primary to-em-primary-light" />
                <Send className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

// ─── Main Footer Component ───────────────────────────────────────────────────
export function Footer() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });

  return (
    <footer
      ref={ref}
      className="relative bg-em-bg border-t border-em-border overflow-hidden"
      role="contentinfo"
    >
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-em-primary/40 to-transparent" />

      {/* Ambient background glow orbs */}
      <div className="absolute top-20 left-[10%] w-[300px] h-[300px] bg-em-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[10%] w-[250px] h-[250px] bg-em-accent/[0.02] rounded-full blur-[80px] pointer-events-none" />

      <div className="em-container-wide pt-20 pb-8 relative z-10">

        {/* ─── Newsletter CTA Strip ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, ease: EASE.cinematic }}
        >
          <NewsletterStrip />
        </motion.div>

        {/* ─── Main Footer Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

          {/* Brand Column (4 cols) — BIGGER LOGO */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.1, ease: EASE.cinematic }}
          >
            {/* Large prominent logo */}
            <Link href="/" className="inline-flex items-center mb-6 group">
              <div className="relative w-64 h-16 shrink-0 flex items-center justify-center transition-all duration-500 group-hover:scale-[1.03]">
                <Image
                  src="/logo.png"
                  alt="Edge Matrix Corporation Logo"
                  width={250}
                  height={250}
                  className="object-contain"
                  sizes="320px"
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                />
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-em-text-secondary leading-relaxed mb-2 max-w-sm">
              Building the intelligent systems that power the next industrial revolution.
            </p>
            <p className="text-xs text-em-text-muted leading-relaxed mb-8 max-w-sm">
              AI, Robotics, and Industry 5.0 solutions for global enterprises across manufacturing, defense, healthcare, and energy.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:writeus@edgematrixcorp.com"
                className="flex items-center gap-3 text-sm text-em-text-muted hover:text-em-primary transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-em-surface border border-em-border flex items-center justify-center shrink-0 group-hover:border-em-primary/30 group-hover:bg-em-primary/5 transition-all duration-200">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                writeus@edgematrixcorp.com
              </a>
              <a
                href="tel:+918300575800"
                className="flex items-center gap-3 text-sm text-em-text-muted hover:text-em-primary transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-em-surface border border-em-border flex items-center justify-center shrink-0 group-hover:border-em-primary/30 group-hover:bg-em-primary/5 transition-all duration-200">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                +91 8300575800
              </a>
              <div className="flex items-center gap-3 text-sm text-em-text-muted group">
                <div className="w-8 h-8 rounded-lg bg-em-surface border border-em-border flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>United States · Poland · India</span>
              </div>
            </div>
          </motion.div>

          {/* Solutions Column */}
          <motion.div
            className="lg:col-span-2 lg:col-start-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.2, ease: EASE.cinematic }}
          >
            <h3 className="text-[11px] font-black text-em-text uppercase tracking-[0.2em] mb-6">
              Solutions
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-em-text-muted hover:text-em-text transition-all duration-200 inline-flex items-center gap-1.5 group hover:translate-x-0.5"
                  >
                    <ChevronRight className="w-3 h-3 text-em-primary/0 group-hover:text-em-primary transition-all duration-200 -ml-4 group-hover:ml-0" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.3, ease: EASE.cinematic }}
          >
            <h3 className="text-[11px] font-black text-em-text uppercase tracking-[0.2em] mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-em-text-muted hover:text-em-text transition-all duration-200 inline-flex items-center gap-1.5 group hover:translate-x-0.5"
                  >
                    <ChevronRight className="w-3 h-3 text-em-primary/0 group-hover:text-em-primary transition-all duration-200 -ml-4 group-hover:ml-0" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.4, ease: EASE.cinematic }}
          >
            <h3 className="text-[11px] font-black text-em-text uppercase tracking-[0.2em] mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-em-text-muted hover:text-em-text transition-all duration-200 inline-flex items-center gap-1.5 group hover:translate-x-0.5"
                  >
                    <ChevronRight className="w-3 h-3 text-em-primary/0 group-hover:text-em-primary transition-all duration-200 -ml-4 group-hover:ml-0" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ─── Animated Gradient Divider ──────────────────────── */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-em-border to-transparent" />
          <motion.div
            className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-transparent via-em-primary/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE.cinematic }}
            style={{ transformOrigin: 'center' }}
          />
        </div>

        {/* ─── Bottom Bar ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Left: Copyright + Legal */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left order-3 lg:order-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.6 }}
          >
            <p className="text-xs text-em-text-muted">
              &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
            </p>
            <div className="hidden sm:block w-px h-3 bg-em-border" />
            <div className="flex items-center gap-3">
              <Link href="#" className="text-[10px] text-em-text-muted hover:text-em-text transition-colors">
                Privacy Policy
              </Link>
              <span className="text-em-border text-[10px]">&middot;</span>
              <Link href="#" className="text-[10px] text-em-text-muted hover:text-em-text transition-colors">
                Terms of Service
              </Link>
            </div>
          </motion.div>

          {/* Center: Tech Stack Trust Badges */}
          {/* <motion.div
            className="flex items-center gap-2 order-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.7 }}
          >
            {['Next.js', 'React', 'TypeScript', 'Tailwind'].map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-semibold text-em-text-muted/60 px-2 py-1 rounded-md bg-em-surface border border-em-border select-none"
              >
                {tech}
              </span>
            ))}
          </motion.div> */}

          {/* Right: Social Icons */}
          <motion.div
            className="flex items-center gap-2 order-1 lg:order-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.8 }}
          >
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl bg-em-surface border border-em-border flex items-center justify-center text-em-text-muted ${social.hoverColor} hover:bg-em-surface-light hover:border-em-primary/20 hover:shadow-[0_0_20px_rgba(230,0,38,0.08)] hover:scale-110 active:scale-95 transition-all duration-300`}
              >
                <social.Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
