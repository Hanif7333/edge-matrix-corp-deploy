'use client';

// ============================================================================
// Edge Matrix Corporation — Careers Page (Client Component)
// Premium 3D dynamic page with Annual Tech Membership, Internship Programme,
// Training Programme (3D carousel), and Event Photo Gallery sections.
// ============================================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap, Users, Award, Clock, ArrowRight,
  ChevronLeft, ChevronRight, Cpu, Eye, Bot, Mic,
  Wifi, Shield, Calendar, Camera,
  Layers, Code, Target, ImageIcon,
  IndianRupee, Sparkles, BookOpen, GraduationCap,
  Wrench, PenTool, Globe, Phone, Mail,
  Briefcase, Trophy, HeartHandshake, BadgePercent,
  CircuitBoard, Lightbulb, CheckCircle, Rocket,
  X,
  type LucideIcon
} from 'lucide-react';
import { SectionHeader, AnimatedButton } from '@/components/shared';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';
import { CTASection } from '@/sections';

// ─── CountUp Helper ──────────────────────────────────────────────────────────
function CountUp({ value, trigger }: { value: number; trigger: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const steps = 50;
    const inc = Math.ceil(value / steps);
    const timer = setInterval(() => {
      start += inc;
      if (start >= value) { clearInterval(timer); setCount(value); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [value, trigger]);
  return <>{count}</>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — ANNUAL TECH MEMBERSHIP (Premium, company-critical)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Membership Domains (from poster) ─────────────────────────────────────────
const MEMBERSHIP_DOMAINS: { label: string; icon: LucideIcon }[] = [
  { label: 'Industrial AI', icon: Cpu },
  { label: 'Edge AI', icon: CircuitBoard },
  { label: 'Data Science', icon: Lightbulb },
  { label: 'IIoT', icon: Wifi },
  { label: 'Deep Learning with CV', icon: Eye },
  { label: '3D Designing', icon: PenTool },
  { label: 'PCB Designing', icon: CircuitBoard },
  { label: 'Web Development', icon: Code },
  { label: 'Mobile App Development', icon: Layers },
  { label: 'Cyber Security', icon: Shield },
  { label: 'Electric Vehicles', icon: Zap },
  { label: 'Full Stack Development', icon: Globe },
];

// ─── Membership Benefits (from poster) ────────────────────────────────────────
const MEMBERSHIP_BENEFITS: { text: string; icon: LucideIcon }[] = [
  { text: 'Unlimited Internships', icon: Briefcase },
  { text: 'Access to a Wide Range of Courses', icon: BookOpen },
  { text: 'Product Development Support', icon: Wrench },
  { text: 'Comprehensive Placement Training', icon: GraduationCap },
  { text: 'Journal Support', icon: PenTool },
  { text: 'Patenting Assistance', icon: Award },
  { text: 'Comprehensive Student Development Program', icon: Rocket },
  { text: 'Free Participation in Hackathons & Competitions', icon: Trophy },
  { text: '24/7 R&D Support', icon: HeartHandshake },
  { text: 'Material Provision (Worth ₹25,000)', icon: BadgePercent },
  { text: 'Mentorship from Industry Experts', icon: Users },
  { text: 'Performance-Based Stipends for Outstanding Candidates', icon: IndianRupee },
];

function MembershipSection() {
  const { ref, isInView } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<'benefits' | 'domains'>('benefits');
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  return (
    <section ref={ref} className="em-section relative overflow-hidden" id="membership">
      {/* Ambient effects */}
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-em-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 em-grid-bg opacity-[0.02]" />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Flagship Programme"
          title="Matrix Annual Membership Program"
          gradientWords={['Annual', 'Membership']}
          subtitle="Join India's most ambitious deep-tech community. Get unlimited internships, industry mentorship, R&D access, and a direct pipeline to real-world AI, robotics, and IoT projects — all for one annual fee."
        />

        {/* ── Hero Pricing Card ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, delay: 0.15, ease: EASE.cinematic }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Glow border */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-em-primary/40 via-em-primary/10 to-amber-500/20" />

            <div className="relative rounded-3xl bg-white p-8 lg:p-10">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-em-primary via-em-primary-light to-amber-500" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left: Pricing Hero */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-em-primary/8 border border-em-primary/15 mb-5">
                    <Sparkles className="w-3.5 h-3.5 text-em-primary" />
                    <span className="text-[10px] font-black text-em-primary uppercase tracking-widest">Limited Time Offer</span>
                  </div>

                  <h3 className="font-[var(--font-heading)] text-2xl lg:text-3xl font-black text-em-text tracking-tight mb-3">
                    Program Worth{' '}
                    <span className="line-through text-em-text-muted/50 text-xl lg:text-2xl font-bold">₹1,50,000</span>
                  </h3>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[10px] font-bold text-em-text-muted uppercase tracking-widest">Now @</span>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="font-[var(--font-heading)] text-5xl lg:text-6xl font-black bg-gradient-to-r from-em-primary to-em-primary-light bg-clip-text text-transparent">
                      ₹5,000
                    </span>
                    <span className="text-base text-em-text-muted font-semibold">/ year</span>
                  </div>

                  <p className="text-sm text-em-text-secondary leading-relaxed mb-6 max-w-sm">
                    One membership. Unlimited access to courses, internships, mentorship, hackathons, R&D support, and placement training across 12+ deep-tech domains.
                  </p>

                  <AnimatedButton href="https://docs.google.com/forms/d/e/1FAIpQLSdap21sZWiUYRdWt-xyeylYkcRMIuzr717miNv-kDNhvLTrEA/viewform" variant="primary" external>
                    Become a Member
                  </AnimatedButton>

                  {/* Contact row */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <a href="mailto:writeus@edgematrixcorp.com" className="inline-flex items-center gap-1.5 text-xs text-em-text-muted hover:text-em-primary transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      writeus@edgematrixcorp.com
                    </a>
                    <a href="tel:+918300575800" className="inline-flex items-center gap-1.5 text-xs text-em-text-muted hover:text-em-primary transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                      83005 75800
                    </a>
                  </div>
                </div>

                {/* Right: Savings & Stats */}
                <div className="flex flex-col gap-4">
                  {/* Savings highlight */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/60 p-5 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest block mb-1">You Save</span>
                      <span className="font-[var(--font-heading)] text-3xl font-black text-emerald-700">
                        ₹1,45,000
                      </span>
                      <span className="text-xs text-emerald-600 font-medium block mt-1">96.7% off the programme value</span>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 12, suffix: '+', label: 'Tech Domains', icon: Cpu },
                      { value: 13, suffix: '', label: 'Benefits', icon: Sparkles },
                      { value: 500, suffix: '+', label: 'Active Members', icon: Users },
                      { value: 24, suffix: '/7', label: 'R&D Support', icon: HeartHandshake },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: DURATION.fast, delay: 0.3 + i * 0.08 }}
                        className="p-3.5 rounded-xl bg-white border border-em-border text-center hover:border-em-primary/20 hover:shadow-[0_0_20px_rgba(230,0,38,0.06)] transition-all group"
                      >
                        <stat.icon className="w-4 h-4 text-em-primary/60 mx-auto mb-1.5 group-hover:text-em-primary transition-colors" />
                        <span className="font-[var(--font-heading)] text-xl font-black text-em-text block">
                          <CountUp value={stat.value} trigger={isInView} />{stat.suffix}
                        </span>
                        <span className="text-[8px] font-bold text-em-text-muted uppercase tracking-widest">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Benefits & Domains Tabs ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, delay: 0.35 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-1 bg-em-surface rounded-xl p-1 w-fit mx-auto mb-8 border border-em-border">
            {(['benefits', 'domains'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab
                  ? 'bg-white text-em-text shadow-sm border border-em-border'
                  : 'text-em-text-muted hover:text-em-text'
                  }`}
              >
                {tab === 'benefits' ? '✦ Benefits' : '◈ Domains'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'benefits' ? (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {MEMBERSHIP_BENEFITS.map((benefit, idx) => {
                  const BenefitIcon = benefit.icon;
                  const isHovered = hoveredBenefit === idx;
                  return (
                    <motion.div
                      key={benefit.text}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: DURATION.fast, delay: 0.05 + idx * 0.04 }}
                      onMouseEnter={() => setHoveredBenefit(idx)}
                      onMouseLeave={() => setHoveredBenefit(null)}
                      className={`relative p-4 rounded-xl border transition-all duration-300 cursor-default group ${isHovered
                        ? 'bg-white border-em-primary/25 shadow-[0_4px_25px_rgba(230,0,38,0.08)] -translate-y-0.5'
                        : 'bg-white/70 border-em-border hover:border-em-primary/15'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${isHovered ? 'bg-em-primary/10' : 'bg-em-surface'
                          }`}>
                          <BenefitIcon className={`w-4.5 h-4.5 transition-colors duration-300 ${isHovered ? 'text-em-primary' : 'text-em-text-muted'
                            }`} />
                        </div>
                        <div className="flex-grow min-w-0">
                          <span className="text-sm font-semibold text-em-text leading-snug block">
                            {benefit.text}
                          </span>
                        </div>
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 transition-all duration-300 ${isHovered ? 'text-em-primary scale-110' : 'text-emerald-400'
                          }`} />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="domains"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {MEMBERSHIP_DOMAINS.map((domain, idx) => {
                  const DomainIcon = domain.icon;
                  return (
                    <motion.div
                      key={domain.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: DURATION.fast, delay: 0.05 + idx * 0.04 }}
                      className="relative p-5 rounded-xl bg-white border border-em-border text-center group hover:border-em-primary/20 hover:shadow-[0_4px_25px_rgba(230,0,38,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                    >
                      <div className="w-11 h-11 rounded-xl bg-em-surface mx-auto mb-3 flex items-center justify-center group-hover:bg-em-primary/10 transition-colors duration-300">
                        <DomainIcon className="w-5 h-5 text-em-text-muted group-hover:text-em-primary transition-colors duration-300" />
                      </div>
                      <span className="text-sm font-bold text-em-text group-hover:text-em-primary transition-colors duration-300">
                        {domain.label}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Trust Indicators ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-14 select-none"
        >
          {[
            { icon: Shield, label: 'Secure Payments' },
            { icon: Award, label: 'Industry Certifications' },
            { icon: Calendar, label: 'Annual Programme' },
            { icon: Globe, label: 'India & US Offices' },
          ].map((trust) => (
            <div key={trust.label} className="flex items-center gap-2 text-xs text-em-text-muted font-medium">
              <trust.icon className="w-3.5 h-3.5 text-em-primary/60" />
              {trust.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — INTERNSHIP PROGRAMME (Timeline Journey)
// ═══════════════════════════════════════════════════════════════════════════════

const INTERNSHIP_STAGES = [
  { step: 1, title: 'Application', description: 'Submit your profile, portfolio, and area of interest through our online portal.', icon: Code },
  { step: 2, title: 'Selection & Interview', description: 'Technical assessment and culture-fit interview with our engineering leads.', icon: Target },
  { step: 3, title: 'Onboarding', description: 'Orientation week: meet your mentor, set up dev environments, and define project scope.', icon: Layers },
  { step: 4, title: 'Live Project Phase', description: 'Work on production-grade AI, robotics, or IoT projects alongside senior engineers.', icon: Cpu },
  { step: 5, title: 'Certification & Placement', description: 'Receive industry-recognized certification and priority placement into full-time roles.', icon: Award },
];

const INTERNSHIP_DOMAINS = [
  { label: 'AI & ML', icon: Cpu },
  { label: 'Computer Vision', icon: Eye },
  { label: 'Robotics', icon: Bot },
  { label: 'Industrial IoT', icon: Wifi },
  { label: 'Voice AI', icon: Mic },
];

function InternshipSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} className="em-section relative overflow-hidden bg-em-surface/30 border-t border-em-border" id="internships">
      <div className="absolute inset-0 em-dots-bg opacity-[0.03]" />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Talent Pipeline"
          title="Matrix Innovation Forge Internship"
          gradientWords={['Internship']}
          subtitle="A structured 3–6 month immersion into production-grade deep-tech engineering. Work on real projects, earn certifications, and fast-track into industry roles."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
          {/* Left: Timeline */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Vertical connector line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, ease: EASE.cinematic }}
                className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-em-primary via-em-primary/40 to-transparent origin-top hidden sm:block"
              />

              <div className="space-y-6">
                {INTERNSHIP_STAGES.map((stage, idx) => {
                  const StageIcon = stage.icon;
                  return (
                    <motion.div
                      key={stage.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: DURATION.normal, delay: 0.2 + idx * 0.12, ease: EASE.cinematic }}
                      className="flex items-start gap-4 sm:gap-6 group"
                    >
                      {/* Step indicator */}
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-em-border flex items-center justify-center group-hover:border-em-primary/30 group-hover:shadow-[0_0_20px_rgba(230,0,38,0.08)] transition-all duration-300">
                          <StageIcon className="w-4.5 h-4.5 text-em-primary" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-em-primary text-white text-[8px] font-black flex items-center justify-center">
                          {stage.step}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow pb-6">
                        <h3 className="font-[var(--font-heading)] text-base font-bold text-em-text mb-1 group-hover:text-em-primary transition-colors duration-300">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-em-text-secondary leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Domain Tags */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.normal, delay: 0.8 }}
              className="mt-6"
            >
              <span className="text-[10px] font-black text-em-text-muted uppercase tracking-widest block mb-3">Available Domains</span>
              <div className="flex flex-wrap gap-2">
                {INTERNSHIP_DOMAINS.map((domain) => (
                  <span key={domain.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-em-border text-xs font-semibold text-em-text-secondary hover:border-em-primary/20 hover:text-em-primary transition-all">
                    <domain.icon className="w-3 h-3" />
                    {domain.label}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="mt-8">
              <AnimatedButton href="https://docs.google.com/forms/d/e/1FAIpQLScGH8tZ3yKab1qu7_suKaNiyVjurkA5cfoYvOMysaNr0qEdnw/viewform" variant="primary" external>
                Apply for Internship
              </AnimatedButton>
            </div>
          </div>

          {/* Right: Stats + Poster */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 6, suffix: ' months', label: 'Max Duration' },
                { value: 5, suffix: '+', label: 'Tech Domains' },
                { value: 100, suffix: '%', label: 'Project-Based' },
                { value: 200, suffix: '+', label: 'Alumni Placed' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 0.4 + i * 0.1 }}
                  className="p-4 rounded-xl bg-white border border-em-border text-center hover:border-em-primary/20 hover:shadow-[0_0_20px_rgba(230,0,38,0.06)] transition-all"
                >
                  <span className="font-[var(--font-heading)] text-2xl font-black text-em-text block">
                    <CountUp value={stat.value} trigger={isInView} />{stat.suffix}
                  </span>
                  <span className="text-[9px] font-bold text-em-text-muted uppercase tracking-widest">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Poster Slot */}
            <div className="rounded-2xl overflow-hidden border border-em-border bg-em-surface/50 relative flex items-center justify-center flex-grow">
              <Image
                src="/images/careers/internship-poster.png"
                alt="Internship Programme"
                width={600}
                height={450}
                className="w-full h-auto object-contain"
                sizes="600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — TRAINING PROGRAMME (3D Carousel Showcase)
// ═══════════════════════════════════════════════════════════════════════════════

const TRAINING_PROGRAMMES = [
  {
    title: 'AI Foundations',
    duration: '4 Weeks',
    level: 'Beginner',
    levelColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: Cpu,
    gradient: 'from-em-primary/10 to-em-primary/5',
    topics: ['Python for AI', 'Machine Learning', 'Neural Networks', 'Model Deployment'],
    description: 'Master the fundamentals of artificial intelligence and machine learning with hands-on projects and real-world datasets.',
  },
  {
    title: 'Computer Vision Masterclass',
    duration: '6 Weeks',
    level: 'Intermediate',
    levelColor: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: Eye,
    gradient: 'from-blue-500/10 to-blue-500/5',
    topics: ['OpenCV Deep Dive', 'YOLO Object Detection', 'TensorRT Optimization', 'Edge Deployment'],
    description: 'Build production-grade computer vision pipelines from scratch. Detect, track, and classify objects in real-time video streams.',
  },
  {
    title: 'Robotics Engineering',
    duration: '8 Weeks',
    level: 'Advanced',
    levelColor: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: Bot,
    gradient: 'from-purple-500/10 to-purple-500/5',
    topics: ['ROS2 Humble', 'SLAM Navigation', 'Kinematics & Control', 'Gazebo Simulation'],
    description: 'Design, program, and deploy autonomous robotic systems. From kinematics theory to real hardware integration.',
  },
  {
    title: 'Industrial IoT Systems',
    duration: '4 Weeks',
    level: 'Intermediate',
    levelColor: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: Wifi,
    gradient: 'from-amber-500/10 to-amber-500/5',
    topics: ['MQTT Protocol', 'Edge Computing', 'Sensor Networks', 'Dashboard Analytics'],
    description: 'Architect intelligent connected systems for industrial environments. Monitor, predict, and automate with IoT edge nodes.',
  },
];

function TrainingCarouselSection() {
  const { ref, isInView } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, 1 right
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TRAINING_PROGRAMMES.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TRAINING_PROGRAMMES.length) % TRAINING_PROGRAMMES.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    intervalRef.current = setInterval(goNext, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activeIndex]);

  const active = TRAINING_PROGRAMMES[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section ref={ref} className="em-section relative overflow-hidden" id="training-programmes">
      <div className="absolute inset-0 em-grid-bg opacity-[0.02]" />
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-em-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Skill Development"
          title="Training Programmes"
          gradientWords={['Training', 'Programmes']}
          subtitle="Industry-designed curriculum delivered by senior engineers. Choose from beginner to advanced tracks across AI, vision, robotics, and IoT."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3D Carousel Display */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-em-border bg-white min-h-[400px] lg:min-h-[480px] flex flex-col">
              {/* Top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${active.gradient.replace('/10', '/60').replace('/5', '/30')}`} />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60, rotateY: direction * 8 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: direction * -60, rotateY: direction * -8 }}
                  transition={{ duration: 0.5, ease: EASE.cinematic }}
                  className="flex-grow p-8 lg:p-10 flex flex-col justify-between"
                  style={{ perspective: '1000px' }}
                >
                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${active.gradient} border border-em-border flex items-center justify-center`}>
                        <ActiveIcon className="w-7 h-7 text-em-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${active.levelColor}`}>
                          {active.level}
                        </span>
                        <span className="text-[9px] font-bold text-em-text-muted bg-em-surface px-2.5 py-1 rounded-lg border border-em-border flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {active.duration}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-[var(--font-heading)] text-2xl lg:text-3xl font-bold text-em-text tracking-tight mb-3">
                      {active.title}
                    </h3>
                    <p className="text-sm text-em-text-secondary leading-relaxed mb-6 max-w-lg">
                      {active.description}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {active.topics.map((topic) => (
                        <span key={topic} className="text-[10px] font-bold text-em-text-muted bg-em-surface border border-em-border px-2.5 py-1 rounded-lg">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <AnimatedButton href="/contact" variant="primary">
                    Enroll Now — {active.title}
                  </AnimatedButton>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
                <button
                  onClick={goPrev}
                  className="w-9 h-9 rounded-xl bg-em-surface border border-em-border flex items-center justify-center text-em-text-muted hover:text-em-text hover:border-em-primary/20 transition-all"
                  aria-label="Previous programme"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goNext}
                  className="w-9 h-9 rounded-xl bg-em-surface border border-em-border flex items-center justify-center text-em-text-muted hover:text-em-text hover:border-em-primary/20 transition-all"
                  aria-label="Next programme"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {TRAINING_PROGRAMMES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to programme ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-em-primary' : 'w-3 bg-em-border hover:bg-em-text-muted/30'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Programme Index Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {TRAINING_PROGRAMMES.map((prog, idx) => {
              const ProgIcon = prog.icon;
              const isActive = idx === activeIndex;

              return (
                <motion.button
                  key={prog.title}
                  onClick={() => goTo(idx)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 0.3 + idx * 0.1 }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${isActive
                    ? 'bg-white border-em-primary/20 shadow-[0_0_25px_rgba(230,0,38,0.08)]'
                    : 'bg-white/60 border-em-border hover:border-em-primary/10 hover:bg-white'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'bg-em-primary/10' : 'bg-em-surface'
                      }`}>
                      <ProgIcon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-em-primary' : 'text-em-text-muted'}`} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className={`text-sm font-bold truncate transition-colors duration-300 ${isActive ? 'text-em-text' : 'text-em-text-secondary'}`}>
                        {prog.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] font-bold text-em-text-muted">{prog.duration}</span>
                        <span className="text-em-border text-[9px]">&middot;</span>
                        <span className={`text-[9px] font-bold ${isActive ? 'text-em-primary' : 'text-em-text-muted'}`}>{prog.level}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-all duration-300 ${isActive ? 'text-em-primary translate-x-0 opacity-100' : 'text-em-text-muted/30 -translate-x-2 opacity-0 group-hover:opacity-60 group-hover:translate-x-0'
                      }`} />
                  </div>
                </motion.button>
              );
            })}

            {/* Poster Slot */}
            <div className="rounded-2xl overflow-hidden border border-em-border bg-em-surface/50 relative aspect-video flex items-center justify-center mt-2">
              <Image
                src="/images/careers/training-poster.JPG"
                alt="Training Programme"
                fill
                className="object-cover"
                sizes="600px"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-em-text-muted/40 pointer-events-none">
                <ImageIcon className="w-8 h-8 mb-1" />
                <span className="text-[10px] font-medium">Training Programme Banner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — EVENT PHOTO GALLERY
// ═══════════════════════════════════════════════════════════════════════════════

interface GalleryPhoto {
  src: string;
  caption: string;
  category: 'partnerships' | 'exhibitions' | 'workshops' | 'achievements' | 'networking';
  featured: boolean;
}

function EventGallerySection({ photos }: { photos: GalleryPhoto[] }) {
  const { ref, isInView } = useScrollAnimation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Moments', icon: Camera },
    { id: 'partnerships', label: 'Partnerships', icon: Users },
    { id: 'workshops', label: 'Workshops', icon: Layers },
    { id: 'exhibitions', label: 'Exhibitions', icon: Sparkles },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'networking', label: 'Networking', icon: Globe },
  ] as const;

  // Handle Lightbox Navigation
  const handlePrev = useCallback(() => {
    setActivePhotoIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const handleNext = useCallback(() => {
    setActivePhotoIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePhotoIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handlePrev, handleNext]);

  // Helper to render Category Icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'partnerships': return <Users className="w-3 h-3" />;
      case 'workshops': return <Layers className="w-3 h-3" />;
      case 'exhibitions': return <Sparkles className="w-3 h-3" />;
      case 'achievements': return <Trophy className="w-3 h-3" />;
      case 'networking': return <Globe className="w-3 h-3" />;
      default: return <Camera className="w-3 h-3" />;
    }
  };

  return (
    <section ref={ref} className="em-section relative overflow-hidden bg-em-surface/30 border-t border-em-border" id="gallery">
      <div className="absolute inset-0 em-dots-bg opacity-[0.03]" />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Training Moments"
          title="Event Photo Gallery"
          gradientWords={['Photo', 'Gallery']}
          subtitle="Snapshots from our training workshops, hackathons, certification ceremonies, and industry events across all regional hubs."
        />

        {photos.length > 0 ? (
          <>
            {/* Category Filter Tabs */}
            <div className="flex justify-center mt-10">
              <div className="flex overflow-x-auto gap-2 p-1.5 bg-white/60 backdrop-blur-md border border-em-border rounded-2xl max-w-full no-scrollbar">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  const count = cat.id === 'all' ? photos.length : photos.filter(p => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setActivePhotoIndex(null);
                      }}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap group shrink-0 ${isActive
                        ? 'text-white'
                        : 'text-em-text-secondary hover:text-em-text hover:bg-em-surface/50'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-em-primary rounded-xl -z-10 shadow-lg shadow-em-primary/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${isActive ? 'bg-white/20 text-white' : 'bg-em-surface border border-em-border text-em-text-muted'
                        }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bento Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 auto-rows-[240px] grid-flow-dense"
            >
              <AnimatePresence mode="popLayout">
                {filteredPhotos.map((photo, idx) => {
                  const isFeatured = photo.featured;

                  return (
                    <motion.div
                      key={photo.src}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: DURATION.fast }}
                      className={`relative group rounded-2xl overflow-hidden border border-em-border bg-em-surface shadow-sm hover:border-em-primary/20 hover:shadow-lg transition-all duration-500 cursor-pointer ${isFeatured
                        ? 'col-span-1 sm:col-span-2 row-span-1 sm:row-span-2'
                        : 'col-span-1 row-span-1'
                        }`}
                      onClick={() => setActivePhotoIndex(idx)}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        sizes={
                          isFeatured
                            ? '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw'
                            : '(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw'
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Premium Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />

                      {/* Top Bar with Category Icon Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white bg-black/60 backdrop-blur-md border border-white/10 shadow-sm transition-transform duration-300 group-hover:translate-y-0">
                        {getCategoryIcon(photo.category)}
                        <span>{photo.category}</span>
                      </div>

                      {/* Playful click indicator inside the image on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transition-all scale-75 group-hover:scale-100 duration-500">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Always visible info panel at the bottom */}
                      <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end">
                        {isFeatured && (
                          <span className="text-[8px] font-black uppercase tracking-widest text-white bg-em-primary/80 border border-em-primary w-max px-2.5 py-0.5 rounded-lg mb-2 shadow-sm">
                            Featured Moment
                          </span>
                        )}
                        <p className="text-xs font-bold text-white leading-relaxed drop-shadow-md line-clamp-2 transition-transform duration-500 group-hover:-translate-y-1">
                          {photo.caption}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.normal, delay: 0.2 }}
            className="mt-12 flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-em-border bg-white/50"
          >
            <div className="w-16 h-16 rounded-2xl bg-em-surface flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-em-text-muted/40" />
            </div>
            <h3 className="font-[var(--font-heading)] text-lg font-bold text-em-text-muted mb-1">
              Gallery Coming Soon
            </h3>
            <p className="text-sm text-em-text-muted/60 text-center max-w-md">
              Photos from upcoming training events, workshops, and ceremonies will appear here.
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Bar */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-50 text-white/70 text-xs md:text-sm font-bold select-none px-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-em-primary" />
                <span className="uppercase tracking-widest">{filteredPhotos[activePhotoIndex].category}</span>
              </div>
              <span className="bg-white/10 px-3 py-1 rounded-full font-mono text-[11px]">
                {activePhotoIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Interactive Container */}
            <div
              className="relative w-full max-w-5xl h-[55vh] md:h-[65vh] flex items-center justify-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 md:-left-16 z-50 w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <motion.div
                key={filteredPhotos[activePhotoIndex].src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl"
              >
                <Image
                  src={filteredPhotos[activePhotoIndex].src}
                  alt={filteredPhotos[activePhotoIndex].caption}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 md:-right-16 z-50 w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.1 }}
              className="mt-6 w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/15 text-white rounded-2xl p-5 md:p-6 shadow-2xl select-none text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-em-primary bg-em-primary/20 border border-em-primary/30 px-3 py-1 rounded-full">
                  {filteredPhotos[activePhotoIndex].category}
                </span>
                {filteredPhotos[activePhotoIndex].featured && (
                  <span className="text-[9px] font-black uppercase tracking-wider text-white bg-em-primary border border-em-primary px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
                {filteredPhotos[activePhotoIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function CareersPageContent({ photos = [] }: { photos?: GalleryPhoto[] }) {
  return (
    <>
      <MembershipSection />
      <InternshipSection />
      <TrainingCarouselSection />
      <EventGallerySection photos={photos} />
      <CTASection />
    </>
  );
}
