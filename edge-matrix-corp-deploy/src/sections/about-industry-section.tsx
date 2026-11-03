'use client';

// ============================================================================
// Edge Matrix Corporation — About Industry 5.0 Section v5
// Rebuilt as an Interactive Educational Knowledge Showcase.
// Cards feature active learning paths, key insights, and technology tags.
// ============================================================================

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Cpu, Users, Leaf, ShieldCheck, Zap, Globe, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

const PILLARS = [
  {
    icon: Users,
    title: 'Human-Centric',
    description: 'Placing human creativity and decision-making at the core of industrial automation.',
    gradient: 'from-zinc-500 to-zinc-300',
    image: '/images/about/human-centric.png',
    learningPath: 'Human-AI Partnership',
    keyInsights: [
      'Learn to orchestrate intuitive human-robot collaborative environments.',
      'Understand cognitive ergonomics to maximize workspace efficiency.'
    ],
    keyTech: ['Cobots', 'HMI Systems', 'Cognitive UX'],
  },
  {
    icon: Cpu,
    title: 'Intelligent Automation',
    description: 'AI-powered systems that learn, adapt, and optimize industrial processes in real time.',
    gradient: 'from-red-600 to-red-400',
    image: '/images/about/intelligent-automation.png',
    learningPath: 'Adaptive Systems & ML',
    keyInsights: [
      'Study self-learning pipelines that continuously optimize operational yields.',
      'Master reinforcement learning models for automated anomaly correction.'
    ],
    keyTech: ['Reinforcement Learning', 'Neural Networks', 'Auto-Tuning'],
  },
  {
    icon: Leaf,
    title: 'Sustainable Operations',
    description: 'Reducing waste, energy consumption, and environmental impact through smart systems.',
    gradient: 'from-zinc-400 to-zinc-200',
    image: '/images/about/sustainable-operations.png',
    learningPath: 'Green Tech & Circularity',
    keyInsights: [
      'Analyze real-time resource tracking and carbon accounting grids.',
      'Implement predictive modeling to reduce industrial waste and power draws.'
    ],
    keyTech: ['Zero-Waste Tech', 'Carbon Accounting', 'Smart Grids'],
  },
  {
    icon: ShieldCheck,
    title: 'Resilient Systems',
    description: 'Fault-tolerant architectures that ensure continuous uptime in mission-critical environments.',
    gradient: 'from-red-700 to-red-500',
    image: '/images/about/resilient-systems.png',
    learningPath: 'High-Availability Design',
    keyInsights: [
      'Design fault-tolerant computing grids capable of real-time auto-recovery.',
      'Master proactive stress-testing frameworks to mitigate supply chain downtime.'
    ],
    keyTech: ['Fail-Safe Networks', 'Self-Healing Nodes', 'Redundancy Scale'],
  },
  {
    icon: Zap,
    title: 'Edge Intelligence',
    description: 'Processing data at the edge for real-time decisions without cloud latency.',
    gradient: 'from-zinc-300 to-white',
    image: '/images/about/edge-intelligence.png',
    learningPath: 'Distributed Edge Compute',
    keyInsights: [
      'Implement low-latency neural inference direct to local sensors.',
      'Understand tinyML hardware constraints and offline database models.'
    ],
    keyTech: ['Edge AI Nodes', 'TinyML Frameworks', 'Local Processing'],
  },
  {
    icon: Globe,
    title: 'Connected Ecosystems',
    description: 'Seamlessly integrating machines, people, and data across global supply chains.',
    gradient: 'from-red-500 to-zinc-300',
    image: '/images/about/connected-ecosystems.png',
    learningPath: 'IoT Mesh & Logistics',
    keyInsights: [
      'Explore decentralized data meshes integrating complex global logistics loops.',
      'Analyze secure distributed ledger protocols for transparent tracking.'
    ],
    keyTech: ['IoT Data Mesh', 'Smart Logistics', 'Distributed Ledgers'],
  },
];

// ---------------------------------------------------------------------------
// 3D Flip Card Component — Interactive Educational Capsule
// ---------------------------------------------------------------------------
function PillarCard({
  pillar,
  index,
  isInView,
}: {
  pillar: typeof PILLARS[0];
  index: number;
  isInView: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION.normal,
        delay: 0.15 + index * 0.08,
        ease: EASE.cinematic,
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="em-perspective-1000 h-[380px] w-full cursor-pointer group"
      aria-label={`Pillar: ${pillar.title}. Learning Path: ${pillar.learningPath}. Click or hover to access key insights.`}
    >
      <div
        className={`relative w-full h-full duration-700 em-preserve-3d transition-transform ${isFlipped ? 'em-rotate-y-180' : 'group-hover:em-rotate-y-180'
          }`}
      >
        {/* ─── Front Face: Immersive visual conceptual layer ──────────────── */}
        <div className="absolute inset-0 w-full h-full em-backface-hidden rounded-2xl overflow-hidden bg-zinc-950 border border-gray-100 shadow-md">
          <Image
            src={pillar.image}
            alt={pillar.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover brightness-[0.7] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
            priority={index < 3}
          />

          {/* Visual Elements overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-6 select-none">
            {/* Learning Path Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 self-start border border-white/15 bg-white/10 backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              <span className="text-[9px] font-black text-white tracking-wider uppercase">
                {pillar.learningPath}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-black text-em-primary tracking-widest uppercase">
                  Pillar 0{index + 1}
                </span>
                <h3 className="font-[var(--font-heading)] text-xl font-black text-white tracking-tight leading-tight mt-0.5">
                  {pillar.title}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-em-primary group-hover:border-em-primary transition-all duration-300">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
            </div>

            <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-3 opacity-90 group-hover:opacity-100 transition-opacity">
              Hover / Tap to Study Insights
            </span>
          </div>
        </div>

        {/* ─── Back Face: High-information Knowledge Center ─────────────── */}
        <div className="absolute inset-0 w-full h-full em-backface-hidden em-rotate-y-180 rounded-2xl bg-white border border-em-border p-6 shadow-xl flex flex-col justify-between overflow-hidden">
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 em-grid-bg opacity-[0.03] select-none pointer-events-none" />

          <div className="relative z-10">
            {/* Header: Path Name + Pillar Number */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pillar.gradient} p-[1px]`}>
                  <div className="w-full h-full rounded-[9px] bg-em-surface flex items-center justify-center">
                    <pillar.icon className="w-4.5 h-4.5 text-em-primary" />
                  </div>
                </div>
                <div>
                  <span className="block text-[8px] font-black text-em-text-muted tracking-widest uppercase">
                    Learning Path
                  </span>
                  <span className="block text-[10px] font-extrabold text-em-primary tracking-wide leading-none">
                    {pillar.learningPath}
                  </span>
                </div>
              </div>
              <span className="text-xl font-black text-gray-100 select-none">
                0{index + 1}
              </span>
            </div>

            {/* Core definition */}
            <h3 className="font-[var(--font-heading)] text-base font-black text-em-text mb-1 tracking-tight">
              {pillar.title}
            </h3>
            <p className="text-xs text-em-text-secondary leading-relaxed mb-4">
              {pillar.description}
            </p>

            {/* 💡 What You Will Learn Module */}
            <div className="bg-gray-50/70 border border-gray-100 rounded-xl p-3 select-text cursor-text">
              <div className="flex items-center gap-1.5 mb-2 select-none">
                <GraduationCap className="w-3.5 h-3.5 text-em-primary" />
                <span className="text-[9px] font-black text-em-text tracking-widest uppercase">
                  What You Will Learn
                </span>
              </div>
              <ul className="space-y-1.5">
                {pillar.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex gap-1.5 text-[10px] text-em-text-secondary leading-relaxed align-top">
                    <span className="text-em-primary text-[10px] font-bold mt-0.5">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer: Tech Tags and Active Path Trigger */}
          <div className="relative z-10 border-t border-gray-100 pt-3 flex flex-col gap-2.5 select-none">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {pillar.keyTech.map((tech) => (
                <span key={tech} className="text-[8px] font-bold text-em-text-muted bg-gray-100 rounded-md px-1.5 py-0.5 tracking-wider">
                  #{tech.toUpperCase()}
                </span>
              ))}
            </div>
            {/* Call To Action */}
            <div className="flex items-center justify-between text-em-primary group/cta">
              <span className="text-[9px] font-black tracking-widest uppercase group-hover/cta:translate-x-0.5 transition-transform duration-300">
                Explore Learning Material
              </span>
              <ChevronRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Section Export
// ---------------------------------------------------------------------------
export function AboutIndustrySection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden bg-background"
      id="industry-5"
      aria-labelledby="industry-5-heading"
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 em-grid-bg opacity-[0.04]" aria-hidden="true" />

      {/* Red ambient mesh */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(230,0,38,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="About Industry"
          title="A great world is the result of best minds on the planet"
          gradientWords={['best', 'minds']}
          subtitle="Edge Matrix Multinational Corporation is a corporate initiative that uses Artificial Intelligence, Robotics and Data Science to make humanity more powerful. We act as the Gateway to Industry 5.0 — the result of great visionaries and innovative ideas, proving expertise in AI, AI-IoT and Robotics across the globe."
        />

        {/* Immersive Learning Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, index) => (
            <PillarCard
              key={pillar.title}
              pillar={pillar}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
