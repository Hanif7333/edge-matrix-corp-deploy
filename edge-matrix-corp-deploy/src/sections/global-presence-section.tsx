'use client';

// ============================================================================
// Edge Matrix Corporation — Regional Ecosystem Presence Section v5
// Rebuilt as an interactive 3D Constellation Network & Ecosystem Intel Platform.
// Features pure CSS 3D perspective tilts, scalable SVG dynamic pathways with
// animated path flow, ambient particles, and rich tech stack learning breakdowns.
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Globe2, BookOpen, Cpu, Award, Code, Database, Compass, Info, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

// ─── Custom Inline SVG Flag Components ───────────────────────────────────────

const USFlag = () => (
  <svg 
    width="28" 
    height="15" 
    style={{ width: '28px', height: '15px', minWidth: '28px', minHeight: '15px', display: 'inline-block' }} 
    className="rounded-sm overflow-hidden border border-white/10 shrink-0" 
    viewBox="0 0 74 39" 
    aria-label="United States Flag"
  >
    <rect width="74" height="39" fill="#3C3B6E" />
    {[...Array(13)].map((_, i) => (
      <rect
        key={i}
        y={(i * 39) / 13}
        width="74"
        height={39 / 13}
        fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
      />
    ))}
    <rect width="29.6" height="21" fill="#3C3B6E" />
    {/* Grid of clean abstract star points */}
    <circle cx="5" cy="4" r="0.8" fill="#FFFFFF" />
    <circle cx="10" cy="4" r="0.8" fill="#FFFFFF" />
    <circle cx="15" cy="4" r="0.8" fill="#FFFFFF" />
    <circle cx="20" cy="4" r="0.8" fill="#FFFFFF" />
    <circle cx="25" cy="4" r="0.8" fill="#FFFFFF" />
    <circle cx="7" cy="8" r="0.8" fill="#FFFFFF" />
    <circle cx="12" cy="8" r="0.8" fill="#FFFFFF" />
    <circle cx="17" cy="8" r="0.8" fill="#FFFFFF" />
    <circle cx="22" cy="8" r="0.8" fill="#FFFFFF" />
    <circle cx="5" cy="12" r="0.8" fill="#FFFFFF" />
    <circle cx="10" cy="12" r="0.8" fill="#FFFFFF" />
    <circle cx="15" cy="12" r="0.8" fill="#FFFFFF" />
    <circle cx="20" cy="12" r="0.8" fill="#FFFFFF" />
    <circle cx="25" cy="12" r="0.8" fill="#FFFFFF" />
    <circle cx="7" cy="16" r="0.8" fill="#FFFFFF" />
    <circle cx="12" cy="16" r="0.8" fill="#FFFFFF" />
    <circle cx="17" cy="16" r="0.8" fill="#FFFFFF" />
    <circle cx="22" cy="16" r="0.8" fill="#FFFFFF" />
  </svg>
);

const ChinaFlag = () => (
  <svg 
    width="27" 
    height="18" 
    style={{ width: '27px', height: '18px', minWidth: '27px', minHeight: '18px', display: 'inline-block' }} 
    className="rounded-sm overflow-hidden border border-white/10 shrink-0" 
    viewBox="0 0 30 20" 
    aria-label="China Flag"
  >
    <rect width="30" height="20" fill="#DE2910" />
    <polygon points="5,3 4.2,5.5 6.5,4 3.5,4 5.8,5.5" fill="#FFDE00" transform="translate(1.5, 1.5) scale(0.6)" />
    <polygon points="5,3 4.2,5.5 6.5,4 3.5,4 5.8,5.5" fill="#FFDE00" transform="translate(6, 1) rotate(10) scale(0.2)" />
    <polygon points="5,3 4.2,5.5 6.5,4 3.5,4 5.8,5.5" fill="#FFDE00" transform="translate(7.2, 2.5) rotate(30) scale(0.2)" />
    <polygon points="5,3 4.2,5.5 6.5,4 3.5,4 5.8,5.5" fill="#FFDE00" transform="translate(7.2, 4.5) scale(0.2)" />
    <polygon points="5,3 4.2,5.5 6.5,4 3.5,4 5.8,5.5" fill="#FFDE00" transform="translate(6, 6) rotate(10) scale(0.2)" />
  </svg>
);

const GCCFlag = () => (
  <svg 
    width="27" 
    height="18" 
    style={{ width: '27px', height: '18px', minWidth: '27px', minHeight: '18px', display: 'inline-block' }} 
    className="rounded-sm overflow-hidden border border-white/10 shrink-0" 
    viewBox="0 0 30 20" 
    aria-label="GCC Flag"
  >
    <rect width="30" height="20" fill="#006C35" />
    {/* Golden GCC union emblem medallion */}
    <circle cx="15" cy="10" r="5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
    <circle cx="15" cy="10" r="3.8" fill="none" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="0.8 0.8" />
    <polygon points="15,6.5 15.5,8 17,8 15.8,9 16.2,10.5 15,9.5 13.8,10.5 14.2,9 13,8 14.5,8" fill="#D4AF37" transform="translate(4.5, 3) scale(0.7)" />
  </svg>
);

const EUFlag = () => (
  <svg 
    width="27" 
    height="18" 
    style={{ width: '27px', height: '18px', minWidth: '27px', minHeight: '18px', display: 'inline-block' }} 
    className="rounded-sm overflow-hidden border border-white/10 shrink-0" 
    viewBox="0 0 30 20" 
    aria-label="European Union Flag"
  >
    <rect width="30" height="20" fill="#003399" />
    {/* Circle of stars */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const cx = 15 + 5.5 * Math.cos(angle);
      const cy = 10 + 5.5 * Math.sin(angle);
      return (
        <polygon
          key={i}
          points="0,-1.5 0.45,-0.45 1.5,-0.45 0.68,0.18 1,1.2 0,0.56 -1,1.2 -0.68,0.18 -1.5,-0.45 -0.45,-0.45"
          fill="#FFCC00"
          transform={`translate(${cx}, ${cy}) scale(0.35)`}
        />
      );
    })}
  </svg>
);

const IndiaFlag = () => (
  <svg 
    width="27" 
    height="18" 
    style={{ width: '27px', height: '18px', minWidth: '27px', minHeight: '18px', display: 'inline-block' }} 
    className="rounded-sm overflow-hidden border border-white/10 shrink-0" 
    viewBox="0 0 30 20" 
    aria-label="India Flag"
  >
    <rect width="30" height="6.67" fill="#FF9933" />
    <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
    <rect y="13.33" width="30" height="6.67" fill="#138808" />
    {/* Ashoka Chakra */}
    <circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" strokeWidth="0.4" />
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x2 = 15 + 2.2 * Math.cos(angle);
      const y2 = 10 + 2.2 * Math.sin(angle);
      return (
        <line
          key={i}
          x1="15"
          y1="10"
          x2={x2}
          y2={y2}
          stroke="#000080"
          strokeWidth="0.2"
        />
      );
    })}
  </svg>
);

const RussiaFlag = () => (
  <svg 
    width="27" 
    height="18" 
    style={{ width: '27px', height: '18px', minWidth: '27px', minHeight: '18px', display: 'inline-block' }} 
    className="rounded-sm overflow-hidden border border-white/10 shrink-0" 
    viewBox="0 0 30 20" 
    aria-label="Russia Flag"
  >
    <rect width="30" height="6.67" fill="#FFFFFF" />
    <rect y="6.67" width="30" height="6.67" fill="#0039A6" />
    <rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
  </svg>
);

const getFlagComponent = (name: string) => {
  const normName = name.toLowerCase();
  if (normName.includes('united') || normName.includes('us')) return <USFlag />;
  if (normName.includes('china')) return <ChinaFlag />;
  if (normName.includes('gcc')) return <GCCFlag />;
  if (normName.includes('union') || normName.includes('european') || normName.includes('eu')) return <EUFlag />;
  if (normName.includes('india')) return <IndiaFlag />;
  if (normName.includes('russia')) return <RussiaFlag />;
  return null;
};

const getShortName = (name: string) => {
  if (name.includes('United States')) return 'USA';
  if (name.includes('European Union')) return 'EU';
  if (name.includes('Russia')) return 'Russia';
  if (name.includes('China')) return 'China';
  if (name.includes('India')) return 'India';
  if (name.includes('GCC')) return 'GCC';
  return name.split(' ')[0];
};

// ─── Stat Counter Helper Component ───────────────────────────────────────────
function CountUp({ value, duration = 1800, trigger = false }: { value: string; duration?: number; trigger: boolean }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalSteps = 60;
    const stepTime = duration / totalSteps;
    const increment = Math.ceil(end / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return <>{count}{suffix}</>;
}

// ─── Regions Interactive & Learning Data ──────────────────────────────────────
interface LearningInfo {
  focus: string;
  techStack: string[];
  researchPaper: string;
  description: string;
  impact: string;
}

interface Region {
  name: string;
  role: string;
  partner: string;
  details: string[];
  color: string;
  glowColor: string;
  learningInfo: LearningInfo;
  coords: { x: number; y: number }; // viewBox 100x100
  delay: number;
}

const REGIONS: Region[] = [
  {
    name: 'United States',
    role: 'Global Strategy & AI Compute Hub',
    partner: 'Silicon Valley Innovation Lab',
    details: ['AI Research', 'Edge Acceleration', 'Enterprise Cloud Integrations'],
    color: '#E60026', // Primary Red
    glowColor: 'rgba(230, 0, 38, 0.45)',
    coords: { x: 16, y: 30 }, // Top-Left
    delay: 0.1,
    learningInfo: {
      focus: 'Sub-millisecond Large Model Inference at the Edge',
      techStack: ['vLLM Server', 'NVIDIA Triton', 'TensorRT-LLM', 'AWS Local Zones'],
      researchPaper: 'Speculative Decoding Protocols for Geographically Distributed Edge Clusters',
      description: 'Orchestrating highly decentralized inference pipelines across metropolitan edge grids to achieve low-latency generative AI execution without relying on centralized hyper-scaler datacenters.',
      impact: 'Reduces TTFT (Time-To-First-Token) by 62% for enterprise cognitive assistants.'
    }
  },
  {
    name: 'European Union',
    role: 'Decentralized Sovereignty & Regulatory Node',
    partner: 'Euro-Ecosystem Research Center',
    details: ['GDPR Compliance Labs', 'Sovereign Edge Clouds', 'Confidential Computing'],
    color: '#E60026',
    glowColor: 'rgba(230, 0, 38, 0.45)',
    coords: { x: 50, y: 12 }, // Top-Center
    delay: 0.2,
    learningInfo: {
      focus: 'Confidential Computing & Zero-Trust Federated Analytics',
      techStack: ['Intel SGX', 'AMD SEV-SNP', 'WebAssembly (Wasm)', 'Zero-Knowledge Proofs'],
      researchPaper: 'Privacy-Preserving Federated Model Aggregation Under Strict Sovereign Frameworks',
      description: 'Architecting privacy-hardened edge environments where machine learning models are trained and updated continuously on local nodes without ever transmitting raw personal data.',
      impact: 'Enables 100% compliance with strict EU sovereign data rules while scaling global model accuracy.'
    }
  },
  {
    name: 'Russia Operations',
    role: 'Industrial Robotics & Cybernetic Labs',
    partner: 'Eurasian Cybernetics Academy',
    details: ['Industrial Automation', 'Real-time Telemetry Systems', 'Harsh-Environment Hardware'],
    color: '#9CA3AF', // Steel Slate
    glowColor: 'rgba(156, 163, 175, 0.4)',
    coords: { x: 84, y: 30 }, // Top-Right
    delay: 0.3,
    learningInfo: {
      focus: 'Robust Sensor Grid Telemetry & Cybernetic Operations',
      techStack: ['ROS2 Humble', 'RTOS Kernels', 'C++ 23', 'Hardware-in-the-Loop Sim'],
      researchPaper: 'Fault-Tolerant Telemetry Protocols for High-Vibration Industrial Systems',
      description: 'Designing resilient edge control loops and real-time operating system integrations that maintain machine stability and predictive maintenance loops in extreme physical conditions.',
      impact: 'Eliminates unexpected equipment failure in heavy manufacturing and resource-extraction belts.'
    }
  },
  {
    name: 'China Operations',
    role: 'Autonomous Manufacturing & Vision Systems',
    partner: 'Shenzhen Hardware Synthesis Hub',
    details: ['Computer Vision Arrays', 'Autonomous Assembly Robotics', 'Micro-Controller Integration'],
    color: '#E60026',
    glowColor: 'rgba(230, 0, 38, 0.45)',
    coords: { x: 84, y: 70 }, // Bottom-Right
    delay: 0.4,
    learningInfo: {
      focus: 'High-throughput Visual Inspection & Optoelectronic Robotics',
      techStack: ['CUDA Compute', 'TensorRT Engine', 'FPGA Synthesis', 'OpenCV Pipelines'],
      researchPaper: 'Sub-millisecond Object Detection on Assembly Belts via Specialized FPGA Architectures',
      description: 'Deploying ultra-efficient convolution networks directly onto custom-synthesized silicon chips to inspect electronic micro-assemblies at full manufacturing speeds in real-time.',
      impact: 'Yields a 99.98% visual defect detection rate on automated packaging lines.'
    }
  },
  {
    name: 'India Hub',
    role: 'Regional Core & Academic Incubation Network',
    partner: 'Edge Matrix Consortium',
    details: ['Academic Incubation Labs', 'IoT Dev Kits', 'Distributed Intelligence Networks'],
    color: '#E60026',
    glowColor: 'rgba(230, 0, 38, 0.45)',
    coords: { x: 50, y: 88 }, // Bottom-Center
    delay: 0.5,
    learningInfo: {
      focus: 'Massively Distributed IoT Edge Clusters & Talent Incubation',
      techStack: ['Kubernetes Edge', 'FastAPI Microservices', 'MQTT Broker', 'PyTorch Engine'],
      researchPaper: 'Dynamic Task Orchestration Across Low-Power Heterogeneous Campus Networks',
      description: 'Connecting university campuses and elite technical hubs into a unified computing mesh that dynamically pools idle compute power for model fine-tuning and telemetry analytics.',
      impact: 'Empowers over 5,000 students and engineers with hands-on, production-grade edge hardware access.'
    }
  },
  {
    name: 'GCC Region',
    role: 'Smart Infrastructure & Energy Clouds',
    partner: 'Gulf Tech Innovation Consortium',
    details: ['Smart City Telemetry', 'Subsea / Grid Edge Security', 'Renewable Infrastructure Analytics'],
    color: '#E60026',
    glowColor: 'rgba(230, 0, 38, 0.45)',
    coords: { x: 16, y: 70 }, // Bottom-Left
    delay: 0.6,
    learningInfo: {
      focus: 'Energy Grid Telemetry & Real-Time Analytics',
      techStack: ['gRPC API', 'Docker Orchestrator', 'TimescaleDB Cloud', 'Hugging Face Telemetry'],
      researchPaper: 'Optimizing Power Allocation Protocols in Smart Grid Inverters Using Edge telemetry',
      description: 'Integrating real-time anomaly detection and operational telemetry into smart grid hardware and energy storage cells, optimizing loads dynamically across regional nodes.',
      impact: 'Boosts utility load management efficiency by 22% in critical utility grids.'
    }
  }
];

export function GlobalPresenceSection() {
  const { ref, isInView } = useScrollAnimation();
  const [selectedHub, setSelectedHub] = useState<Region>(REGIONS[0]);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  // Dynamic 3D tilt tracking for cards
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range: -0.5 to 0.5
    setMousePosition({ x, y });
    setActiveHoverIndex(index);
  };

  const handleCardMouseLeave = () => {
    setActiveHoverIndex(null);
  };

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden bg-background py-20 lg:py-28"
      id="global-presence"
      aria-labelledby="global-heading"
    >
      {/* Dynamic inline styles for smooth network pulse animations without cluttering global CSS */}
      <style>{`
        @keyframes flowData {
          to {
            stroke-dashoffset: -40px;
          }
        }
        .network-cable-flow {
          stroke-dasharray: 8px 12px;
          animation: flowData 2.4s linear infinite;
        }
        .network-cable-flow-fast {
          stroke-dasharray: 8px 12px;
          animation: flowData 1.2s linear infinite;
        }
        @keyframes floatSpace {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-12px) translateX(8px);
            opacity: 0.35;
          }
        }
        .constellation-drift {
          animation: floatSpace 8s ease-in-out infinite;
        }
        @keyframes coreRipple {
          0% {
            transform: scale(0.92);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.25;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        .nexus-core-ripple-1 {
          animation: coreRipple 4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .nexus-core-ripple-2 {
          animation: coreRipple 4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          animation-delay: 2s;
        }
      `}</style>

      {/* High-tech tech grid pattern */}
      <div className="absolute inset-0 em-grid-bg opacity-[0.03]" aria-hidden="true" />

      {/* Soft gradient ambient glows */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-em-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-em-accent/5 blur-[120px] pointer-events-none" />

      {/* Floating high-tech dots */}
      <div className="absolute inset-0 select-none overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-em-primary rounded-full constellation-drift"
            style={{
              top: `${15 + (i * 7)}%`,
              left: `${8 + (i * 8)}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${6 + (i % 3) * 2}s`
            }}
          />
        ))}
      </div>

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Global Ecosystem Focus"
          title="Regional Strategic Operations"
          gradientWords={['Strategic', 'Operations']}
          subtitle="Deploying production-grade industrial edge networks and secure compute architectures across our core strategic focus regions: North America, Europe, the Gulf, and Asia."
        />

        {/* ─── Main Interface Container: Split Map & Info Dashboard ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">

          {/* LEFT PANEL: Interactive 3D Constellation Network (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Visualizer Panel Frame */}
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-[620px] mx-auto rounded-3xl em-glass border border-white/10 overflow-hidden flex items-center justify-center p-4">

              {/* Internal abstract radar-like sweep overlay */}
              <div className="absolute inset-0 em-dots-bg opacity-10" aria-hidden="true" />
              <div className="absolute w-[90%] h-[90%] rounded-full border border-white/[0.03] flex items-center justify-center pointer-events-none">
                <div className="w-[66%] h-[66%] rounded-full border border-white/[0.04] flex items-center justify-center">
                  <div className="w-[33%] h-[33%] rounded-full border border-white/[0.05]" />
                </div>
              </div>

              {/* Responsive interactive layout */}
              <div className="relative w-full h-full max-w-[500px] max-h-[500px] select-none">

                {/* 1. SCALABLE SVG NETWORK LINKS */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="united-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E60026" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FF2A4B" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="european-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E60026" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FF2A4B" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="russia-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6B7280" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="china-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E60026" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#B3001B" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="india-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E60026" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FF2A4B" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="gcc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E60026" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FF2A4B" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Draw connecting fiber channels from central core (50, 50) */}
                  {REGIONS.map((region, idx) => {
                    const isSelected = selectedHub.name === region.name;
                    const isHovered = activeHoverIndex === idx;
                    const strokeColor = isSelected || isHovered
                      ? `url(#${region.name.toLowerCase().split(' ')[0]}-grad)`
                      : 'rgba(255,255,255,0.06)';

                    return (
                      <g key={region.name}>
                        {/* Static underlying link channel */}
                        <line
                          x1="50"
                          y1="50"
                          x2={region.coords.x}
                          y2={region.coords.y}
                          stroke={strokeColor}
                          strokeWidth={isSelected || isHovered ? '1.5' : '1'}
                          className="transition-all duration-300"
                        />
                        {/* Interactive flow pulses traveling down the wire */}
                        <line
                          x1="50"
                          y1="50"
                          x2={region.coords.x}
                          y2={region.coords.y}
                          stroke={region.color}
                          strokeWidth={isSelected || isHovered ? '2.5' : '1.5'}
                          strokeLinecap="round"
                          opacity={isSelected || isHovered ? '0.9' : '0.2'}
                          className={`transition-all duration-300 ${isSelected || isHovered ? 'network-cable-flow-fast' : 'network-cable-flow'}`}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* 2. CENTRAL NEXUS CORE (EDGE MATRIX HUB) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">

                  {/* Expanding halo ripple rings */}
                  <div className="absolute w-24 h-24 rounded-full border border-em-primary/20 pointer-events-none nexus-core-ripple-1" />
                  <div className="absolute w-24 h-24 rounded-full border border-em-primary/20 pointer-events-none nexus-core-ripple-2" />

                  {/* Glowing core sphere */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative w-12 h-12 rounded-full em-glass border border-em-primary/30 flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(230,0,38,0.25)] select-none z-30"
                  >
                    <div className="w-5 h-5 rounded-full bg-em-primary animate-pulse flex items-center justify-center">
                      <Compass className="w-3.5 h-3.5 text-white animate-spin-slow" />
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-em-text font-black tracking-widest uppercase mt-2 select-none whitespace-nowrap bg-black/40 px-2 py-0.5 rounded border border-white/5 backdrop-blur-md">
                    NEXUS CORE
                  </span>
                </div>

                {/* 3. ORBITING INTEL CARDS (CSS 3D perspective applied) */}
                {REGIONS.map((region, idx) => {
                  const isSelected = selectedHub.name === region.name;
                  const isHovered = activeHoverIndex === idx;

                  // Position relative to absolute viewport layout coordinates (Coords map to percent)
                  const cardStyle: React.CSSProperties = {
                    left: `${region.coords.x}%`,
                    top: `${region.coords.y}%`,
                    transform: `translate(-50%, -50%) ${isHovered
                        ? `perspective(1000px) rotateY(${mousePosition.x * 20}deg) rotateX(${-mousePosition.y * 20}deg) scale(1.06)`
                        : isSelected
                          ? 'perspective(1000px) rotateY(0deg) scale(1.02)'
                          : 'perspective(1000px) rotateY(0deg) scale(0.95)'
                      }`,
                    transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  };

                  return (
                    <div
                      key={region.name}
                      style={cardStyle}
                      onMouseMove={(e) => handleCardMouseMove(e, idx)}
                      onMouseLeave={handleCardMouseLeave}
                      onClick={() => setSelectedHub(region)}
                      className="absolute z-30 cursor-pointer select-none"
                    >
                      {/* Interactive visual layout */}
                      <div className={`relative px-3 py-2 rounded-xl transition-all duration-300 em-glass border flex items-center gap-2.5 whitespace-nowrap shadow-sm ${isSelected
                          ? 'border-em-primary bg-white shadow-[0_0_20px_rgba(230,0,38,0.12)] border-l-2'
                          : isHovered
                            ? 'border-em-primary/30 bg-white shadow-[0_4px_12px_rgba(10,11,13,0.06)]'
                            : 'border-zinc-200/60 bg-white/70'
                        }`}>

                        {/* Status pin & Country Flag indicator */}
                        {getFlagComponent(region.name)}
                        <span className={`text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${isSelected ? 'text-em-primary' : 'text-zinc-800'
                          }`}>
                          {getShortName(region.name)}
                        </span>

                        {/* Active connector node on the card itself */}
                        <div
                          className="absolute w-1 h-1 rounded-full pointer-events-none transition-all duration-300"
                          style={{
                            backgroundColor: isSelected ? region.color : 'transparent',
                            bottom: '-2px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            boxShadow: isSelected ? `0 0 8px ${region.color}` : 'none'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Ecosystem Intel & Learning Platform (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="em-glass rounded-3xl p-6 lg:p-8 border border-zinc-200/80 flex flex-col justify-between h-full bg-white/80 backdrop-blur-xl relative overflow-hidden shadow-sm">

              {/* Subtle top indicator grid */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] select-none pointer-events-none" aria-hidden="true">
                <Database className="w-full h-full text-zinc-950" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedHub.name}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: DURATION.fast, ease: EASE.cinematic }}
                  className="space-y-6 flex-grow flex flex-col justify-between"
                >
                  <div>
                    {/* Badge & Active Title */}
                    <div className="flex items-center gap-2 mb-2 select-none">
                      <MapPin className="w-4 h-4 text-em-primary animate-pulse" />
                      <span className="text-[10px] font-black tracking-widest text-em-primary uppercase">
                        {selectedHub.role}
                      </span>
                    </div>

                    <h3 className="font-[var(--font-heading)] text-2xl font-black text-zinc-950 tracking-tight flex items-center gap-2.5">
                      {getFlagComponent(selectedHub.name)}
                      {selectedHub.name}
                      <a
                        href="#trainings"
                        className="text-zinc-400 hover:text-em-primary transition-colors inline-flex"
                        aria-label={`View courses associated with ${selectedHub.name}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </h3>

                    <div className="text-xs font-bold text-zinc-500 mt-1 flex items-center gap-1.5 select-none">
                      <Award className="w-3.5 h-3.5 text-zinc-400" />
                      Strategic Entity: <span className="text-zinc-800 font-semibold">{selectedHub.partner}</span>
                    </div>

                    <div className="border-t border-zinc-200/60 my-4" />

                    {/* Rich learning summary */}
                    <div className="space-y-4">

                      {/* Learning Metric A: Focus Area */}
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-500 uppercase select-none mb-1">
                          <BookOpen className="w-3 h-3 text-em-primary" />
                          Primary Engineering Focus
                        </div>
                        <p className="text-xs text-zinc-600 font-medium leading-relaxed bg-zinc-50/50 p-3 rounded-lg border border-zinc-200/40">
                          {selectedHub.learningInfo.description}
                        </p>
                      </div>

                      {/* Learning Metric B: Technical Stack Stack */}
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-500 uppercase select-none mb-2">
                          <Code className="w-3 h-3 text-em-primary" />
                          Hub Stack & Tech Components
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedHub.learningInfo.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[9px] font-bold text-zinc-700 px-2 py-0.5 rounded bg-zinc-100/70 border border-zinc-200/60 hover:border-em-primary/30 transition-all select-none"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Learning Metric C: Peer-reviewed Research Target */}
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-500 uppercase select-none mb-1">
                          <Info className="w-3 h-3 text-em-primary" />
                          Key Architectural Protocol / Paper
                        </div>
                        <div className="text-[10px] text-zinc-700 italic font-semibold leading-snug border-l-2 border-em-primary pl-2.5">
                          &ldquo;{selectedHub.learningInfo.researchPaper}&rdquo;
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Impact bottom panel */}
                  <div className="mt-6 pt-4 border-t border-zinc-200/60 select-none bg-em-primary/[0.03] p-3.5 rounded-xl border border-em-primary/20">
                    <span className="text-[8px] font-black text-em-primary uppercase tracking-widest block mb-0.5">
                      Systemic Regional Impact
                    </span>
                    <span className="text-[11px] text-zinc-800 font-semibold block leading-normal">
                      {selectedHub.learningInfo.impact}
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* ─── Bottom Section: Real-World Metrics Grid ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { value: '6+', label: 'Strategic Global Hubs', icon: Globe2 },
            { value: '250+', label: 'Edge Infrastructure Nodes', icon: Cpu },
            { value: '80+', label: 'Enterprise Deployments', icon: Award },
            { value: '99.9%', label: 'Real-time Network Uptime', icon: BookOpen },
          ].map((stat, i) => {
            const IconComponent = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.fast, delay: 0.5 + i * 0.1, ease: EASE.cinematic }}
                className="relative overflow-hidden rounded-2xl em-glass p-5 flex flex-col justify-between border border-zinc-200/60 hover:border-em-primary/20 transition-all group shadow-sm bg-white/70"
              >
                {/* Tech corner accents */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-zinc-200 group-hover:border-em-primary/40 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-zinc-200 group-hover:border-em-primary/40 transition-colors" />

                <div className="flex items-center justify-between mb-2 select-none">
                  <span className="font-[var(--font-heading)] text-3xl font-black text-zinc-950 tracking-tight">
                    <CountUp value={stat.value} trigger={isInView} />
                  </span>
                  <IconComponent className="w-4 h-4 text-em-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>

                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-tight block">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
