'use client';

// ============================================================================
// Edge Matrix Corporation — Vision AI Section v4
// Left: metrics + description | Right: live CV simulation display (Light Glass)
// Features: scan line, bounding boxes, tracking dots, confidence overlays
// ============================================================================

import { motion } from 'motion/react';
import Image from 'next/image';
import {
  ScanSearch, CircleAlert, Camera, CheckCircle2, Cpu, BarChart3,
} from 'lucide-react';
import { SectionHeader } from '@/components/shared';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

const CAPABILITIES = [
  { icon: ScanSearch, title: 'Real-Time Object Detection', desc: 'Sub-millisecond detection across industrial environments with 99.7% accuracy.' },
  { icon: CircleAlert, title: 'Anomaly Detection', desc: 'AI-powered visual anomaly detection for quality control and safety compliance.' },
  { icon: Camera, title: 'Surveillance Intelligence', desc: 'Multi-camera AI for perimeter security, behavior analysis, and threat ID.' },
  { icon: CheckCircle2, title: 'Quality Inspection', desc: 'Automated visual inspection replacing manual QC with consistent precision.' },
  { icon: Cpu, title: 'Edge Deployment', desc: 'Optimized models on edge devices for offline, low-latency inference.' },
  { icon: BarChart3, title: 'Visual Analytics', desc: 'Transform visual data into operational insights and predictive dashboards.' },
];

const METRICS = [
  { label: 'Detection Accuracy', value: '99.7%', bar: 0.997 },
  { label: 'Processing Speed', value: '<10ms', bar: 0.95 },
  { label: 'Models Deployed', value: '200+', bar: 0.8 },
];

// ─── Detection Labels for HUD display ─────────────────────────────────────────
const DETECTIONS = [
  { id: 1, label: 'Object: Person', conf: 99.2, x: '12%', y: '18%', w: '32%', h: '55%' },
  { id: 2, label: 'Object: Machine', conf: 97.8, x: '52%', y: '30%', w: '38%', h: '40%' },
  { id: 3, label: 'Anomaly: Heat', conf: 88.4, x: '68%', y: '55%', w: '18%', h: '20%' },
];

// ─── HUD Corner Brackets ───────────────────────────────────────────────────────
function HudCorners({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* TL */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-em-primary animate-corner-flash" />
      {/* TR */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-em-primary animate-corner-flash" style={{ animationDelay: '0.5s' }} />
      {/* BL */}
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-em-primary animate-corner-flash" style={{ animationDelay: '1s' }} />
      {/* BR */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-em-primary animate-corner-flash" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}

// ─── Bounding Box ──────────────────────────────────────────────────────────────
function BoundingBox({
  detection,
  delay = 0,
  isInView,
}: {
  detection: (typeof DETECTIONS)[number];
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE.cinematic }}
      className="absolute animate-bbox-pulse"
      style={{
        left: detection.x,
        top: detection.y,
        width: detection.w,
        height: detection.h,
        border: '1.5px solid rgba(230, 0, 38, 0.9)',
        borderRadius: '4px',
        boxShadow: '0 0 8px rgba(230, 0, 38, 0.3)',
      }}
    >
      {/* HUD corner brackets inside bbox */}
      <div className="absolute -top-[1.5px] -left-[1.5px] w-3 h-3 border-t-2 border-l-2 border-em-primary" />
      <div className="absolute -top-[1.5px] -right-[1.5px] w-3 h-3 border-t-2 border-r-2 border-em-primary" />
      <div className="absolute -bottom-[1.5px] -left-[1.5px] w-3 h-3 border-b-2 border-l-2 border-em-primary" />
      <div className="absolute -bottom-[1.5px] -right-[1.5px] w-3 h-3 border-b-2 border-r-2 border-em-primary" />

      {/* Label chip */}
      <div
        className="absolute -top-5 left-0 px-2 py-0.5 text-[8px] font-mono font-bold whitespace-nowrap rounded-t-sm"
        style={{
          background: 'rgba(230, 0, 38, 0.95)',
          color: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {detection.label} · {detection.conf}%
      </div>

      {/* Tracking dot — center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 rounded-full bg-em-primary relative">
          <div className="absolute inset-0 rounded-full bg-em-primary animate-track-ping" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Scan Line ─────────────────────────────────────────────────────────────────
function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
      {/* Vertical scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] animate-scan-line"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(230,0,38,0.8) 20%, rgba(255,255,255,0.6) 50%, rgba(230,0,38,0.8) 80%, transparent)',
          boxShadow: '0 0 8px rgba(230,0,38,0.6), 0 0 20px rgba(230,0,38,0.3)',
        }}
      />
      {/* Scan glow area — below the line */}
      <div
        className="absolute left-0 right-0 h-6 animate-scan-line pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(230,0,38,0.06) 0%, transparent 100%)',
          animationDelay: '0s',
        }}
      />
    </div>
  );
}

// ─── Data Stream (side panel) ─────────────────────────────────────────────────
function DataStreamPanel() {
  const lines = [
    'FRAME: 00248192',
    'FPS: 120.0',
    'DETECT: 3 OBJ',
    'CONF AVG: 95.1%',
    'LATENCY: 8.2ms',
    'MODEL: YOLOv9-E',
    'EDGE: ACTIVE',
    'GPU: 94% UTIL',
    'TEMP: 67°C',
  ];

  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-20 overflow-hidden flex flex-col justify-center gap-1 pr-1 bg-white/75 backdrop-blur-md z-20"
      style={{ borderLeft: '1px solid rgba(10, 11, 13, 0.08)' }}
    >
      {lines.map((line, i) => (
        <motion.div
          key={line}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'linear',
          }}
          className="text-[7.5px] font-mono font-black px-1.5 py-0.5 whitespace-nowrap"
          style={{ color: '#E60026' }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

// ─── CV Display Panel ─────────────────────────────────────────────────────────
function CVDisplayPanel({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: DURATION.slow, delay: 0.3, ease: EASE.cinematic }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: '#f4f4f5',
        border: '1px solid rgba(230,0,38,0.25)',
        aspectRatio: '4/3',
        boxShadow: '0 0 50px rgba(230,0,38,0.06), 0 20px 40px rgba(10,11,13,0.08)',
      }}
    >
      {/* Light camera feed simulation with real human operator */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/vision-detection.png"
          alt="Live Vision AI detection feed showing human and machine operating"
          fill
          className="object-cover brightness-[0.98] contrast-[1.02]"
        />
        {/* Soft high-tech overlay blend */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10, 11, 13, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 11, 13, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* High-Tech Camera Viewfinder Crosshairs */}
      <div className="absolute top-1/2 left-[calc(50%-40px)] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-10 opacity-30">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute w-5 h-[1.5px] bg-em-primary" />
          <div className="absolute h-5 w-[1.5px] bg-em-primary" />
          <div className="w-2.5 h-2.5 rounded-full border border-em-primary bg-white/10 backdrop-blur-sm" />
        </div>
      </div>

      {/* Pitch & Horizon Ticks */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-24 w-2 flex flex-col justify-between items-center pointer-events-none select-none z-10 opacity-25">
        <div className="w-1.5 h-[1.5px] bg-gray-500" />
        <div className="w-3 h-[1.5px] bg-em-primary" />
        <div className="w-1.5 h-[1.5px] bg-gray-500" />
      </div>
      <div className="absolute right-23 top-1/2 -translate-y-1/2 h-24 w-2 flex flex-col justify-between items-center pointer-events-none select-none z-10 opacity-25">
        <div className="w-1.5 h-[1.5px] bg-gray-500" />
        <div className="w-3 h-[1.5px] bg-em-primary" />
        <div className="w-1.5 h-[1.5px] bg-gray-500" />
      </div>

      {/* Bounding boxes */}
      {DETECTIONS.map((det, i) => (
        <BoundingBox
          key={det.id}
          detection={det}
          delay={0.6 + i * 0.2}
          isInView={isInView}
        />
      ))}

      {/* Scan line */}
      <ScanLine />

      {/* Data stream side panel */}
      <DataStreamPanel />

      {/* HUD corners */}
      <HudCorners />

      {/* Top status bar (Light Glassmorphic) */}
      <div
        className="absolute top-0 left-0 right-20 h-6 flex items-center px-2.5 gap-3 z-20 backdrop-blur-md"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          borderBottom: '1px solid rgba(10, 11, 13, 0.08)',
        }}
      >
        <div className="flex items-center gap-1.5 animate-pulse-glow">
          <div className="w-1.5 h-1.5 rounded-full bg-em-primary" />
          <span className="text-[8px] font-mono font-bold text-em-primary tracking-wider">LIVE</span>
        </div>
        <span className="text-[8px] font-mono font-extrabold text-gray-500">CAM_01 · MATRIX-VISION-AI · v9.2</span>
        <div className="ml-auto text-[8px] font-mono text-gray-500 font-bold flex items-center gap-1">
          <span>REC</span>
          <span className="text-em-primary animate-pulse select-none text-[10px]">●</span>
        </div>
      </div>

      {/* Bottom inference bar (Light Glassmorphic) */}
      <div
        className="absolute bottom-0 left-0 right-20 py-1.5 px-2.5 flex items-center gap-4 z-20 backdrop-blur-md"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderTop: '1px solid rgba(10, 11, 13, 0.06)',
        }}
      >
        <span className="text-[8px] font-mono font-bold text-gray-400">INFERENCE ENGINE</span>
        {DETECTIONS.map((d) => (
          <div key={d.id} className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-em-primary" />
            <span className="text-[7.5px] font-mono font-black text-em-primary">
              {d.conf}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function VisionAISection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden bg-background"
      id="vision-ai"
      aria-label="Matrix Vision AI"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 em-dots-bg opacity-20" aria-hidden="true" />

      {/* Red atmospheric glow */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(230,0,38,0.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Computer Vision"
          title="Matrix Vision AI"
          gradientWords={['Vision', 'AI']}
          subtitle="Enterprise-grade computer vision that sees, understands, and acts on visual data in real time — transforming cameras into intelligent sensors across your operations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Description + Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.cinematic }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(230,0,38,0.08)', border: '1px solid rgba(230,0,38,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-em-primary animate-pulse-glow" />
              <span className="text-xs font-medium text-em-primary tracking-wide uppercase">Computer Vision</span>
            </div>

            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] mb-6">
              Matrix <span className="em-text-gradient-primary">Vision AI</span>
            </h2>

            <p className="text-base text-em-text-secondary leading-relaxed mb-10 max-w-lg">
              Enterprise-grade computer vision systems that see, understand, and act on
              visual data in real time — transforming cameras into intelligent sensors
              across your operations.
            </p>

            {/* Metric bars */}
            <div className="space-y-6">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 0.3 + i * 0.12, ease: EASE.cinematic }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-em-text-muted font-medium">{m.label}</span>
                    <span className="font-[var(--font-heading)] text-lg font-bold em-text-gradient-primary">
                      {m.value}
                    </span>
                  </div>
                  {/* Animated progress bar */}
                  <div className="h-px bg-em-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: m.bar } : {}}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: EASE.cinematic }}
                      className="h-full origin-left rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #E60026, #FF2A4B)',
                        boxShadow: '0 0 6px rgba(230,0,38,0.6)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Capability mini-list */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAPABILITIES.slice(0, 4).map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 0.7 + i * 0.07, ease: EASE.cinematic }}
                  className="flex items-start gap-2.5 p-3 rounded-xl transition-all duration-300 hover:bg-em-surface-light border border-em-border group"
                >
                  <cap.icon className="w-4 h-4 text-em-primary/60 mt-0.5 shrink-0 group-hover:text-em-primary transition-colors" />
                  <div>
                    <p className="text-xs font-semibold text-em-text-secondary mb-0.5">{cap.title}</p>
                    <p className="text-[10px] text-em-text-muted leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — CV Display Panel */}
          <div className="flex flex-col gap-4">
            <CVDisplayPanel isInView={isInView} />

            {/* Bottom 2 capabilities */}
            <div className="grid grid-cols-2 gap-3">
              {CAPABILITIES.slice(4).map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 1.0 + i * 0.1, ease: EASE.cinematic }}
                  className="p-4 rounded-xl transition-all duration-300 hover:bg-em-surface-light bg-em-surface border border-em-border group"
                >
                  <cap.icon className="w-4 h-4 text-em-primary/50 mb-2 group-hover:text-em-primary transition-colors" />
                  <h3 className="text-xs font-semibold text-em-text-secondary mb-1">{cap.title}</h3>
                  <p className="text-[10px] text-em-text-muted leading-relaxed">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
