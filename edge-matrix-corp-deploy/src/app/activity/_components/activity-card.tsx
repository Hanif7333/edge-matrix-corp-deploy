'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GlowCard } from '@/components/shared';
import { BookOpen, Code, Terminal, Zap, ExternalLink } from 'lucide-react';

const ICON_MAP = {
  code: Code,
  terminal: Terminal,
  zap: Zap,
  bookOpen: BookOpen,
};

interface ActivityCardProps {
  activity: {
    type: string;
    title: string;
    date: string;
    desc: string;
    icon: 'code' | 'terminal' | 'zap' | 'bookOpen';
    color: 'primary' | 'accent' | 'highlight' | 'none';
    visualizerId: string;
    category: string;
    image?: string;
    featured?: boolean;
  };
  index: number;
}

export function ActivityCard({ activity, index }: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = ICON_MAP[activity.icon] || Code;

  const colorMap = {
    primary: {
      badge: 'bg-em-primary/[0.06] text-em-primary border-em-primary/15',
      icon: 'text-em-primary',
    },
    accent: {
      badge: 'bg-em-accent/[0.04] text-em-accent border-em-border-medium',
      icon: 'text-em-accent',
    },
    highlight: {
      badge: 'bg-em-highlight/[0.06] text-em-highlight border-em-highlight/15',
      icon: 'text-em-highlight',
    },
    none: {
      badge: 'bg-em-surface-light text-em-text-muted border-em-border',
      icon: 'text-em-text-muted',
    },
  };

  const colors = colorMap[activity.color] || colorMap.none;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-full ${activity.featured ? 'md:col-span-2' : 'col-span-1'}`}
    >
      <GlowCard
        glow={activity.color === 'none' ? 'primary' : activity.color}
        delay={index * 0.04}
        className="flex flex-col h-full overflow-hidden group"
      >
        {/* Showcase Image Container */}
        <div className="w-full aspect-video relative overflow-hidden bg-slate-950">
          <Image
            src={activity.image || '/images/activity/detection.png'}
            alt={activity.title}
            fill
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={activity.featured}
          />
          {/* Subtle overlay shading to match card boundaries */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />

          {/* Corner badge to denote active category */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[8px] font-mono text-white/70 uppercase z-20">
            {activity.category}
          </div>
        </div>

        {/* Content Area — uses design system tokens */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold tracking-widest uppercase text-em-text-muted/50 font-mono">
              {activity.date}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border ${colors.badge}`}>
              {activity.type}
            </span>
          </div>

          <div className="flex items-start gap-3 mb-3">
            <IconComponent
              className={`w-5 h-5 mt-0.5 shrink-0 ${colors.icon}`}
            />
            <h3 className="font-[var(--font-heading)] text-xl font-bold text-em-text leading-tight">
              {activity.title}
            </h3>
          </div>

          <p className="text-[13px] text-em-text-secondary leading-relaxed flex-grow line-clamp-4">
            {activity.desc}
          </p>

          <div className="mt-6 pt-4 border-t border-em-border">
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-xs font-medium text-em-text-muted hover:text-em-primary transition-colors group/link"
            >
              Read Full Detail
              <ExternalLink className="w-3 h-3 opacity-40 group-hover/link:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}


