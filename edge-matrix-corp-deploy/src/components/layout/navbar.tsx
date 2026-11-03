'use client';

// ============================================================================
// Edge Matrix Corporation — Enterprise Navigation Header
// Reorganized under the Enterprise Information Architecture Plan (Light/Glass)
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { COMPANY_NAME } from '@/constants/navigation';

const LEARNING_EVENTS_LINKS = [
  { label: 'Events', href: '/activity#events' },
  { label: 'Careers', href: '/careers' },
  { label: 'Training', href: '/trainings' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'learning' | null>(null);

  // Mobile accordions
  const [isMobileLearningOpen, setIsMobileLearningOpen] = useState(false);

  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileLearningOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const isSolutionsActive = pathname.startsWith('/services');
  const isLearningActive = pathname.startsWith('/activity') || pathname.startsWith('/trainings') || pathname.startsWith('/careers');

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/85 backdrop-blur-2xl border-b border-em-border shadow-md'
          : 'bg-white/20 backdrop-blur-md'
          }`}
      >
        <nav
          className="em-container-wide flex items-center justify-between h-20"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ─── Logo ────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center group shrink-0 select-none"
            aria-label={`${COMPANY_NAME} — Home`}
          >
            {/* Logo Mark — clean, borderless, and very large landscape logo */}
            <div className="relative w-64 h-24 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Edge Matrix Logo"
                fill
                className="object-contain select-none"
                sizes="512px"
                priority
              />
            </div>
          </Link>

          {/* ─── Desktop Navigation ──────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Home */}
            <Link
              href="/"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-none ${pathname === '/'
                ? 'text-em-text'
                : 'text-em-text-secondary hover:text-em-text hover:bg-em-surface-light'
                }`}
            >
              Home
              {pathname === '/' && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-em-primary to-em-primary-light rounded-full shadow-[0_0_8px_rgba(230,0,38,0.6)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Solutions — single link */}
            <Link
              href="/services"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-none ${isSolutionsActive
                ? 'text-em-text'
                : 'text-em-text-secondary hover:text-em-text hover:bg-em-surface-light'
                }`}
            >
              Solutions
              {isSolutionsActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-em-primary to-em-primary-light rounded-full shadow-[0_0_8px_rgba(230,0,38,0.6)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Learning & Events Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('learning')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-none ${activeDropdown === 'learning' || isLearningActive
                  ? 'text-em-text'
                  : 'text-em-text-secondary hover:text-em-text hover:bg-em-surface-light'
                  }`}
              >
                Learning & Events
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'learning' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'learning' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1 w-48 rounded-xl em-glass-strong p-2 shadow-xl border border-em-border flex flex-col z-50"
                  >
                    {LEARNING_EVENTS_LINKS.map(link => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="px-3 py-2 text-xs font-semibold text-em-text-secondary hover:text-em-primary hover:bg-em-primary/[0.04] rounded-lg transition-colors cursor-none"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {isLearningActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-em-primary to-em-primary-light rounded-full shadow-[0_0_8px_rgba(230,0,38,0.6)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>

            {/* About Us */}
            <Link
              href="/about"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-none ${pathname === '/about'
                ? 'text-em-text'
                : 'text-em-text-secondary hover:text-em-text hover:bg-em-surface-light'
                }`}
            >
              About Us
              {pathname === '/about' && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-em-primary to-em-primary-light rounded-full shadow-[0_0_8px_rgba(230,0,38,0.6)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {/* ─── Contact CTA & Mobile Toggle ─────────────────────────── */}
          <div className="flex items-center gap-4">
            {/* Contact CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-em-primary to-em-primary-light hover:shadow-[0_0_30px_rgba(230,0,38,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-none"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-em-text-secondary hover:text-em-text transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Menu Overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-white/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Drawer */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l border-em-border flex flex-col pt-24 px-8 shadow-2xl"
              aria-label="Mobile navigation"
            >
              {/* Red accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-em-primary to-transparent" />

              <div className="flex flex-col gap-3">
                {/* Home */}
                <Link
                  href="/"
                  className={`block px-4 py-2.5 text-base font-semibold rounded-xl transition-all duration-300 ${pathname === '/'
                    ? 'text-em-text bg-em-primary/10 border border-em-primary/20'
                    : 'text-em-text-secondary hover:text-em-text hover:bg-em-surface-light'
                    }`}
                >
                  Home
                </Link>

                {/* Solutions — single link */}
                <Link
                  href="/services"
                  className={`block px-4 py-2.5 text-base font-semibold rounded-xl transition-all duration-300 ${isSolutionsActive
                    ? 'text-em-text bg-em-primary/10 border border-em-primary/20'
                    : 'text-em-text-secondary hover:text-em-text hover:bg-em-surface-light'
                    }`}
                >
                  Solutions
                </Link>

                {/* Learning & Events Collapsible */}
                <div>
                  <button
                    onClick={() => setIsMobileLearningOpen(!isMobileLearningOpen)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-base font-semibold rounded-xl transition-all duration-300 text-em-text-secondary hover:text-em-text hover:bg-em-surface-light`}
                  >
                    <span>Learning & Events</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileLearningOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileLearningOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-6 mt-1 flex flex-col gap-1 border-l border-em-border"
                      >
                        {LEARNING_EVENTS_LINKS.map(link => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className={`block px-4 py-2 text-sm font-semibold rounded-lg text-em-text-secondary hover:text-em-primary hover:bg-em-primary/5 transition-all`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Us */}
                <Link
                  href="/about"
                  className={`block px-4 py-2.5 text-base font-semibold rounded-xl transition-all duration-300 ${pathname === '/about'
                    ? 'text-em-text bg-em-primary/10 border border-em-primary/20'
                    : 'text-em-text-secondary hover:text-em-text hover:bg-em-surface-light'
                    }`}
                >
                  About Us
                </Link>
              </div>

              {/* Mobile Contact CTA Button */}
              <div className="mt-8 pt-8 border-t border-em-border">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-em-primary to-em-primary-light hover:shadow-[0_0_30px_rgba(230,0,38,0.35)] transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>

              <div className="mt-auto pb-8">
                <p className="text-xs text-em-text-muted">
                  © {new Date().getFullYear()} {COMPANY_NAME}
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
