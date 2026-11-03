'use client';

// ============================================================================
// Edge Matrix Corporation — Trainings & Workshops Section v3
// Premium training programs showcase with animated cards
// ============================================================================

import { motion } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  Clock,
  ArrowRight,
  Cpu,
  Brain,
  Wifi,
  BarChart3,
  Bot,
  CircuitBoard,
} from 'lucide-react';
import Link from 'next/link';
import { SectionHeader, GlowCard, AnimatedButton } from '@/components/shared';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

const TRAINING_PROGRAMS = [
  {
    title: 'AI and ML',
    description: 'Comprehensive training on AI/ML concepts, model development, and deployment for enterprise teams.',
    duration: '40 Hours',
    level: 'Intermediate',
    modules: 12,
    icon: 'brain',
    gradient: 'from-zinc-500 to-zinc-300',
  },
  {
    title: 'AI - Deep Learning',
    description: 'Hands-on workshop covering object detection, image segmentation, and edge deployment techniques.',
    duration: '32 Hours',
    level: 'Advanced',
    modules: 8,
    icon: 'cpu',
    gradient: 'from-red-600 to-red-400',
  },
  {
    title: 'Edge AI',
    description: 'End-to-end IIoT architecture design, sensor integration, and digital twin implementation.',
    duration: '36 Hours',
    level: 'Advanced',
    modules: 10,
    icon: 'circuit',
    gradient: 'from-zinc-400 to-zinc-200',
  },
  {
    title: 'Data Science',
    description: 'Advanced data analysis pipelines, statistical modeling, and visualization for enterprise insights.',
    duration: '48 Hours',
    level: 'Expert',
    modules: 14,
    icon: 'chart',
    gradient: 'from-red-700 to-red-500',
  },
  {
    title: 'Robotics',
    description: 'ROS2 development, motion planning, SLAM, and safety-critical systems engineering.',
    duration: '28 Hours',
    level: 'Advanced',
    modules: 8,
    icon: 'bot',
    gradient: 'from-zinc-300 to-white',
  },
  {
    title: 'IoT',
    description: 'Connected device ecosystems, edge computing, MQTT protocols, and cloud integration.',
    duration: '16 Hours',
    level: 'Executive',
    modules: 6,
    icon: 'wifi',
    gradient: 'from-red-500 to-zinc-300',
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  cpu: Cpu,
  circuit: CircuitBoard,
  chart: BarChart3,
  bot: Bot,
  wifi: Wifi,
};

function LevelBadge({ level }: { level: string }) {
  const colorMap: Record<string, string> = {
    Intermediate: 'text-em-text-secondary bg-em-surface-light border-em-border-medium',
    Advanced: 'text-em-primary bg-em-primary/8 border-em-primary/20',
    Expert: 'text-em-primary-dark bg-em-primary-dark/8 border-em-primary-dark/20',
    Executive: 'text-em-accent bg-em-accent/5 border-em-border-medium',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colorMap[level] || 'text-em-text-muted bg-em-surface border-em-border'}`}
    >
      {level}
    </span>
  );
}

export function TrainingsSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden"
      id="trainings"
      aria-labelledby="trainings-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 em-dots-bg opacity-[0.1]" aria-hidden="true" />

      <div className="em-container relative z-10">
        <SectionHeader
          badge="Education"
          title="Workshops & Training Programs"
          gradientWords={['Workshops', 'Training']}
          subtitle="Upskill your workforce with intensive, hands-on training programs designed by industry experts and delivered by practitioners who build real-world AI systems."
        />

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAINING_PROGRAMS.map((program, index) => {
            const IconComp = ICON_MAP[program.icon] || Brain;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <GlowCard
                  glow="primary"
                  delay={0.2 + index * 0.08}
                  inView={isInView}
                  className="p-0 group flex flex-col h-full overflow-hidden"
                >
                  {/* Top gradient accent bar */}
                  <div
                    className={`w-full h-1 bg-gradient-to-r ${program.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Icon + Level row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-em-primary/[0.06] border border-em-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-em-primary/10 group-hover:shadow-[0_0_16px_rgba(230,0,38,0.1)]">
                        <IconComp className="w-5 h-5 text-em-primary" />
                      </div>
                      <LevelBadge level={program.level} />
                    </div>

                    {/* Title */}
                    <h3 className="font-[var(--font-heading)] text-lg font-bold text-em-text mb-2 tracking-tight leading-snug group-hover:text-em-primary transition-colors duration-300">
                      {program.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-em-text-muted leading-relaxed mb-5 flex-grow">
                      {program.description}
                    </p>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-em-text-muted">
                        <Clock className="w-3.5 h-3.5 text-em-primary/50" />
                        {program.duration}
                      </div>
                      <div className="w-px h-3.5 bg-em-border" />
                      <div className="flex items-center gap-1.5 text-xs text-em-text-muted">
                        <BookOpen className="w-3.5 h-3.5 text-em-primary/50" />
                        {program.modules} Modules
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-4 border-t border-em-border">
                      <Link
                        href="/trainings"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-em-primary hover:text-em-primary-dark transition-all duration-300 uppercase tracking-wider group/link"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, delay: 0.6, ease: EASE.cinematic }}
          className="text-center mt-14"
        >
          <AnimatedButton variant="ghost" href="https://docs.google.com/forms/d/e/1FAIpQLScGH8tZ3yKab1qu7_suKaNiyVjurkA5cfoYvOMysaNr0qEdnw/viewform" external size="md">
            <GraduationCap className="w-4 h-4" />
            View All Training Programs
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
