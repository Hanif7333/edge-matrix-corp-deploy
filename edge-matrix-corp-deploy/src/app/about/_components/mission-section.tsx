'use client';

// ============================================================================
// Edge Matrix Corporation — About Mission Section
// Mission/Vision and Industry 5.0 philosophy
// ============================================================================

import { motion } from 'motion/react';
import { Target, Lightbulb, Workflow } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';
import { GlassPanel } from '@/components/shared';

const PHILOSOPHIES = [
  {
    icon: Target,
    title: 'MISSION',
    desc: 'We strive to solve everyday problems all over the world by utilizing Artificial Intelligence, Robotics, data Science, Internet of Things, Digital Twin, Blockchain, and Big data analytics. Our mission is to help mankind do difficult and dangerous tasks easily using technology.',
  },
  {
    icon: Lightbulb,
    title: 'VISION',
    desc: "Artificial Intelligence and Robotics are said to be the world's most powerful technologies. Edge Matrix works to integrate these powerful technologies into human lives in order to drive humanity into the Industry 5.0 and evolve the human race to rule the age of intelligent machines.",
  },
  {
    icon: Workflow,
    title: 'ABOUT US',
    desc: 'A great world is the result of best minds on the planet. Edge Matrix Multinational Corporation is a corporate initiative that uses Artificial Intelligence, Robotics and Data Science to make humanity more powerful. Therefore we act as the Gateway to Industry 5.0. We proved our expertise at the field of Artificial Intelligence, AI - IoT and Robotics.',
  },
];

export function AboutMissionSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} className="relative em-section" aria-label="Our Mission and Vision">
      <div className="em-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PHILOSOPHIES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.normal, delay: index * 0.1, ease: EASE.cinematic }}
            >
              <GlassPanel intensity="light" className="p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-em-primary/10 border border-em-primary/20 flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-em-primary" />
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-em-text mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-em-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
