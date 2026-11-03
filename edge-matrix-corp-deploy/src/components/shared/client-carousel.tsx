'use client';

// ============================================================================
// Edge Matrix Corporation — Floating Client Logo Grid v4
// MakeForms-style scattered floating cards with auto-scrolling columns.
// Each column scrolls vertically at different speeds; logos pause on hover.
//
// LOGO FILES: Place each company's logo in /public/clients/ folder.
// Use transparent PNG or SVG files for best results.
// ============================================================================

import React from 'react';

interface Partner {
  name: string;
  shortName: string;
  /** Local logo file path relative to /public, e.g. "/clients/nvidia.png" */
  logo: string | null;
  initials: string;
  accentColor: string;
}

// ─── PARTNER DATA ──────────────────────────────────────────────────────────
// To add a logo: save the image to public/clients/ and set the `logo` field.
// Example: logo: '/clients/nvidia.png'
// If logo is null, styled initials are shown as fallback.
// ───────────────────────────────────────────────────────────────────────────

const PARTNERS_COL_1: Partner[] = [
  {
    name: 'Nvidia',
    shortName: 'NVIDIA',
    logo: '/clients/nvidia.png',
    initials: 'NV',
    accentColor: '#76b900',
  },
  {
    name: 'NOKIA',
    shortName: 'NOKIA',
    logo: '/clients/nokia.png',
    initials: 'NK',
    accentColor: '#005AFF',
  },
  {
    name: 'TCE - TBI',
    shortName: 'TCE TBI',
    logo: '/clients/tce-tbi.png',
    initials: 'TBI',
    accentColor: '#1e3a8a',
  },
  {
    name: 'TNRPF',
    shortName: 'TNRPF',
    logo: '/clients/tnrpf.png',
    initials: 'TNRPF',
    accentColor: '#1d4ed8',
  },
];

const PARTNERS_COL_2: Partner[] = [
  {
    name: 'Anna University, Chennai',
    shortName: 'Anna University',
    logo: '/clients/anna-university.png',
    initials: 'AU',
    accentColor: '#800000',
  },
  {
    name: 'Quantanics',
    shortName: 'Quantanics',
    logo: '/clients/quantanics.png',
    initials: 'QN',
    accentColor: '#d97706',
  },
  {
    name: 'National Engineering College',
    shortName: 'NEC',
    logo: '/clients/nec.png',
    initials: 'NEC',
    accentColor: '#166534',
  },
  {
    name: 'Vyntar Engineering',
    shortName: 'Vyntar',
    logo: '/clients/vyntar.png',
    initials: 'VE',
    accentColor: '#0f766e',
  },
];

const PARTNERS_COL_3: Partner[] = [
  {
    name: 'Thiagarajar College of Engineering',
    shortName: 'TCE',
    logo: '/clients/tce.png',
    initials: 'TCE',
    accentColor: '#1e3a8a',
  },
  {
    name: 'EDII-TN',
    shortName: 'EDII-TN',
    logo: '/clients/edii-tn.png',
    initials: 'EDII',
    accentColor: '#b45309',
  },
  {
    name: "Stella Mary's College",
    shortName: "Stella Mary's",
    logo: '/clients/stella-marys.png',
    initials: 'SM',
    accentColor: '#7c3aed',
  },
  {
    name: 'Tannatechbiz',
    shortName: 'Tannatech',
    logo: '/clients/tannatech.png',
    initials: 'TT',
    accentColor: '#0369a1',
  },
  {
    name: 'Francis Xavier Engineering',
    shortName: 'FXEC',
    logo: '/clients/fxec.png',
    initials: 'FX',
    accentColor: '#9a3412',
  },
];

// ---------------------------------------------------------------------------
// Logo with smart fallback to styled initials — larger display
// ---------------------------------------------------------------------------
function PartnerLogo({ partner }: { partner: Partner }) {
  if (partner.logo) {
    return (
      <div className="relative w-full h-16 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="object-contain max-h-12 sm:max-h-14 max-w-[90%] select-none transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  }

  // Fallback: styled initials badge
  return (
    <div className="relative w-full h-16 flex items-center justify-center">
      <span
        className="text-lg font-black tracking-wider"
        style={{ color: partner.accentColor }}
      >
        {partner.initials}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Individual floating card — clean, rounded, with subtle shadow
// ---------------------------------------------------------------------------
function FloatingCard({ partner }: { partner: Partner }) {
  return (
    <div
      className="flex flex-col items-center justify-center px-3 sm:px-5 py-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default select-none w-full"
      style={{ minHeight: '125px' }}
    >
      <PartnerLogo partner={partner} />
      <span className="mt-2 text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-wider text-center uppercase leading-tight select-none">
        {partner.shortName}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scrolling column — infinite vertical scroll
// ---------------------------------------------------------------------------
function ScrollColumn({
  items,
  direction = 'up',
  speed = 30,
  className = '',
}: {
  items: Partner[];
  direction?: 'up' | 'down';
  speed?: number;
  className?: string;
}) {
  // Triple the items for seamless looping
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className={`flex flex-col overflow-hidden select-none group ${className}`}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className="flex flex-col gap-4 shrink-0 group-hover:[animation-play-state:paused]"
        style={{
          animation: `float-${direction} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {tripled.map((partner, i) => (
          <FloatingCard key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export — 3-column floating grid layout
// ---------------------------------------------------------------------------
export function ClientCarousel() {
  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      <div className="grid grid-cols-3 gap-4 h-full">
        <ScrollColumn items={PARTNERS_COL_1} direction="up" speed={28} />
        <ScrollColumn items={PARTNERS_COL_2} direction="down" speed={34} className="mt-8" />
        <ScrollColumn items={PARTNERS_COL_3} direction="up" speed={26} />
      </div>
    </div>
  );
}
