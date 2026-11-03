'use client';

// ============================================================================
// Edge Matrix Corporation — Global Intelligence Globe 3D v2
// Light-mode themed interactive 3D globe with brand-harmonized colors.
// Uses a bright blue marble earth texture for premium light-mode aesthetics.
// ============================================================================

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { GlobeMethods } from 'react-globe.gl';

// Dynamically import the Globe to prevent SSR issues with Three.js
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

interface GlobePoint {
  lat: number;
  lng: number;
  size: number;
  color: string;
}

interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

// ─── Real Office Hub Locations (anchored) ────────────────────────────────────
const OFFICE_HUBS = [
  { lat: 9.9252, lng: 78.1198, label: 'Madurai' },        // India HQ
  { lat: 37.7749, lng: -122.4194, label: 'San Francisco' }, // USA
  { lat: 52.2297, lng: 21.0122, label: 'Warsaw' },          // Poland
];

export function GlobalGlobe3D() {
  const [isMounted, setIsMounted] = useState(false);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [windowWidth, setWindowWidth] = useState(800);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      setWindowWidth(window.innerWidth);
    }, 0);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Auto-rotate the globe slowly
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.8;
      globeRef.current.controls().enableZoom = false;
      // Tilt the earth slightly — focus on India/Europe region
      globeRef.current.pointOfView({ altitude: 2.2, lat: 25, lng: 50 }, 0);
    }
  }, [isMounted]);

  const [data, setData] = useState<{ arcsData: GlobeArc[]; pointsData: GlobePoint[] }>({ arcsData: [], pointsData: [] });

  useEffect(() => {
    const points: GlobePoint[] = [];
    const arcs: GlobeArc[] = [];

    // Add real office hub points (larger, brighter)
    OFFICE_HUBS.forEach((hub) => {
      points.push({
        lat: hub.lat,
        lng: hub.lng,
        size: 0.8,
        color: '#E60026',
      });
    });

    // Generate additional constellation nodes (smaller, distributed)
    const N_EXTRA = 35;
    for (let i = 0; i < N_EXTRA; i++) {
      points.push({
        lat: (Math.random() - 0.5) * 140,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() * 0.35 + 0.15,
        // Brand-harmonized colors for light mode: deep red, charcoal, medium red
        color: ['#E60026', '#0A0B0D', '#B3001B', '#E60026'][Math.floor(Math.random() * 4)],
      });
    }

    // Connect office hubs to each other (primary arcs)
    for (let i = 0; i < OFFICE_HUBS.length; i++) {
      for (let j = i + 1; j < OFFICE_HUBS.length; j++) {
        arcs.push({
          startLat: OFFICE_HUBS[i].lat,
          startLng: OFFICE_HUBS[i].lng,
          endLat: OFFICE_HUBS[j].lat,
          endLng: OFFICE_HUBS[j].lng,
          color: 'rgba(230, 0, 38, 0.65)',
        });
      }
    }

    // Generate additional network arcs
    for (let i = 0; i < 25; i++) {
      const start = points[Math.floor(Math.random() * points.length)];
      const end = points[Math.floor(Math.random() * points.length)];
      arcs.push({
        startLat: start.lat,
        startLng: start.lng,
        endLat: end.lat,
        endLng: end.lng,
        // Softer arcs for light background — red and charcoal tones
        color: ['rgba(230, 0, 38, 0.35)', 'rgba(10, 11, 13, 0.2)', 'rgba(179, 0, 27, 0.3)'][Math.floor(Math.random() * 3)],
      });
    }

    const timer = setTimeout(() => {
      setData({ arcsData: arcs, pointsData: points });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-em-primary/20 border-t-em-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Adjust globe size based on screen width
  const globeSize = windowWidth < 768 ? windowWidth - 40 : 500;

  // Viewport-based WebGL Throttling: Return dynamic premium SVG on viewports < 1024px
  const isMobile = windowWidth < 1024;

  if (isMobile) {
    return (
      <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center pointer-events-none select-none z-10 my-4">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-em-primary/8 blur-[60px] rounded-full" />

        {/* Premium High-Tech SVG Holographic Globe */}
        <svg className="w-full h-full text-em-text-muted/15" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          {/* Atmosphere outer orbit ring */}
          <circle cx="100" cy="100" r="85" strokeDasharray="3 3" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="75" className="stroke-em-primary/25" strokeWidth="1.5" />

          {/* Meridians */}
          <path d="M100 25 C125 50 125 150 100 175" strokeWidth="0.75" />
          <path d="M100 25 C75 50 75 150 100 175" strokeWidth="0.75" />
          <path d="M100 25 C150 50 150 150 100 175" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M100 25 C50 50 50 150 100 175" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Latitudes */}
          <path d="M25 100 H175" strokeWidth="0.75" />
          <path d="M30 70 C50 85 150 85 170 70" strokeWidth="0.5" />
          <path d="M30 130 C50 115 150 115 170 130" strokeWidth="0.5" />
          <path d="M48 45 C70 55 130 55 152 45" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M48 155 C70 145 130 145 152 155" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Network paths */}
          <path d="M60 60 Q100 130 140 140" className="stroke-em-primary/40" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M50 110 Q110 50 150 85" className="stroke-em-primary/30" strokeWidth="0.75" />
          <path d="M80 40 Q100 100 120 160" className="stroke-em-primary/40" strokeWidth="0.75" strokeDasharray="4 2" />

          {/* Glowing hub nodes */}
          <circle cx="60" cy="60" r="3.5" className="fill-em-primary" />
          <circle cx="60" cy="60" r="6" className="stroke-em-primary/30" strokeWidth="1" />

          <circle cx="140" cy="140" r="3" className="fill-em-text" />
          <circle cx="140" cy="140" r="5" className="stroke-em-text/20" strokeWidth="1" />

          <circle cx="50" cy="110" r="2.5" className="fill-em-text" />
          <circle cx="150" cy="85" r="3" className="fill-em-primary" />

          <circle cx="80" cy="40" r="2" className="fill-em-text" />
          <circle cx="120" cy="160" r="3" className="fill-em-primary" />

          <circle cx="100" cy="100" r="4.5" className="fill-em-primary animate-pulse" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing z-10">

      {/* Soft radial glow behind globe — light-mode harmonized */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-em-primary/[0.06] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-white/80 blur-[60px] rounded-full pointer-events-none" />

      <Globe
        ref={globeRef}
        width={globeSize}
        height={globeSize}
        // Light-mode: bright blue marble earth texture
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"

        // Points (Constellation Nodes)
        pointsData={data.pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.01}
        pointRadius="size"
        pointsMerge={false}

        // Arcs (Network Connections)
        arcsData={data.arcsData}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500}
        arcAltitudeAutoScale={0.3}
        arcStroke={0.5}

        // Atmosphere — softer brand red for light mode
        atmosphereColor="rgba(230, 0, 38, 0.35)"
        atmosphereAltitude={0.18}
      />
    </div>
  );
}
