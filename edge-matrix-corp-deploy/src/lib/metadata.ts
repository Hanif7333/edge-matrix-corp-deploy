// ============================================================================
// Edge Matrix Corporation — SEO Metadata Configuration
// Centralized metadata for the entire application
//
// WHY: Extracting metadata into a dedicated module keeps layout.tsx
// focused on structure. It also allows importing/extending metadata
// in sub-pages without circular dependencies.
//
// SCALABILITY: Each page can import siteConfig and extend metadata
// using Next.js template patterns: `%s | Edge Matrix Corporation`
// ============================================================================

import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Edge Matrix Corporation',
  url: 'https://www.edgematrixcorp.com',
  description:
    'Edge Matrix Corporation is a global AI, Robotics, Computer Vision, Voice AI, IIoT, Digital Twin, and Industry 5.0 technology company helping enterprises solve complex industrial challenges with intelligent automation.',
  ogImage: '/og-image.png',
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Enterprise AI, Robotics & Industry 5.0`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Enterprise AI',
    'Robotics',
    'Computer Vision',
    'Voice AI',
    'Industry 5.0',
    'Digital Twin',
    'IIoT',
    'Industrial IoT',
    'Predictive Analytics',
    'Autonomous Systems',
    'Machine Learning',
    'Deep Learning',
    'Edge Computing',
    'AI Consulting',
    'Digital Transformation',
    'Smart Factory',
    'Edge Matrix Corporation',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Enterprise AI, Robotics & Industry 5.0`,
    description:
      'Building intelligent systems that power the next industrial revolution. Enterprise AI, Robotics, and Industry 5.0 solutions for global organizations.',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: 'Enterprise AI, Robotics & Industry 5.0 Solutions',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
