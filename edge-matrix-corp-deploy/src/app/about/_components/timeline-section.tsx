'use client';

// ============================================================================
// Edge Matrix Corporation — About Timeline Section
// Cinematic timeline showing company history and achievements
// ============================================================================

import { motion } from 'motion/react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';
import { SectionHeader } from '@/components/shared';

const TIMELINE = [
  {
    year: '2018',
    title: 'Foundation',
    description: 'Edge Matrix Corporation is founded with a mission to bridge the gap between academic AI research and industrial application.',
  },
  {
    year: '2020',
    title: 'Matrix Vision AI Launch',
    description: 'Release of our flagship computer vision platform, achieving 99.5% accuracy in industrial defect detection.',
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Opened offices in London and Singapore to support a growing portfolio of Fortune 500 manufacturing clients.',
  },
  {
    year: '2024',
    title: 'Industry 5.0 Integration',
    description: 'Launched the unified Enterprise Service Matrix, integrating robotics, IIoT, and predictive analytics into a single ecosystem.',
  },
  {
    year: '2026',
    title: 'The Intelligent Future',
    description: 'Surpassed 100+ production products globally, pioneering autonomous systems for the next industrial era.',
  },
];

export function AboutTimelineSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} className="relative em-section" aria-label="Company Timeline">
      <div className="absolute inset-0 em-grid-bg opacity-[0.02]" aria-hidden="true" />
      
      <div className="em-container relative z-10">
        <SectionHeader
          badge="History"
          title="Our Journey to Industry 5.0"
          gradientWords={['Journey']}
          subtitle="A track record of continuous innovation, technological breakthroughs, and enterprise scaling."
        />

        <div className="max-w-4xl mx-auto relative mt-16">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: EASE.cinematic }}
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-em-primary/50 via-em-accent/20 to-transparent origin-top"
          />

          <div className="space-y-12 md:space-y-20">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.year} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: DURATION.normal, delay: 0.5 + index * 0.15, ease: EASE.elastic }}
                    className="absolute left-[16px] md:left-1/2 w-2.5 h-2.5 rounded-full bg-em-primary border-4 border-em-bg -translate-x-1/2 mt-1.5"
                  />

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: DURATION.slow, delay: 0.6 + index * 0.15, ease: EASE.cinematic }}
                      className="em-glass rounded-2xl p-6 md:p-8"
                    >
                      <span className="inline-block px-3 py-1 rounded-md bg-em-primary-light/10 text-em-primary-light text-sm font-bold tracking-widest mb-4">
                        {item.year}
                      </span>
                      <h3 className="font-[var(--font-heading)] text-xl font-bold text-em-text mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-em-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
