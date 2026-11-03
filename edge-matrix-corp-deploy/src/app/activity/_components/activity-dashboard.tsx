'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { ActivityCard } from './activity-card';

interface ActivityItem {
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
}

const CATEGORIES = ['All', 'AI Systems', 'NLP Models', 'Robotics', 'Analytics', 'Architecture'];

interface ActivityDashboardProps {
  activities: ActivityItem[];
}

export function ActivityDashboard({ activities }: ActivityDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [activities, searchQuery, activeCategory]);

  const categoryCount = (cat: string) => {
    if (cat === 'All') return activities.length;
    return activities.filter(a => a.category === cat).length;
  };

  return (
    <div className="space-y-10">
      {/* ─── Command Center Control Bar ─────────────────────────────────── */}
      <div className="relative">
        {/* Decorative top accent line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-em-primary to-transparent opacity-25" />

        <div className="relative overflow-hidden rounded-2xl bg-em-surface border border-em-border shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
          {/* Subtle inner grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(var(--em-text) 1px, transparent 1px), linear-gradient(90deg, var(--em-text) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Accent glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-em-primary to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-8 bg-em-primary/[0.03] blur-2xl" />

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-em-primary/25 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-em-primary/25 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-em-primary/10 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-em-primary/10 rounded-br-2xl" />

          <div className="relative z-10 p-5 md:p-6">
            {/* Title bar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-em-primary shadow-[0_0_8px_rgba(230,0,38,0.3)]" />
                <div className="w-2 h-2 rounded-full bg-em-primary/30" />
                <div className="w-2 h-2 rounded-full bg-em-primary/15" />
              </div>
              <div className="h-px flex-1 bg-em-border" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-em-primary/50 uppercase">
                Systems Dashboard
              </span>
              <div className="h-px flex-1 bg-em-border" />
              <SlidersHorizontal className="w-3.5 h-3.5 text-em-text-muted/40" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              {/* Search Input */}
              <div className="relative flex-1 max-w-lg group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-em-primary/40 transition-colors group-focus-within:text-em-primary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search systems, models, technologies..."
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-sm text-em-text placeholder:text-em-text-muted/50 bg-em-bg border border-em-border focus:outline-none focus:border-em-primary/30 focus:shadow-[0_0_16px_rgba(230,0,38,0.06)] transition-all duration-300 font-medium"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md bg-em-surface hover:bg-em-primary/10 text-em-text-muted hover:text-em-primary transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                ) : (
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-em-text-muted/40 bg-em-surface-light px-1.5 py-0.5 rounded border border-em-border hidden md:inline-block">
                    ⌘K
                  </kbd>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-8 bg-em-border" />

              {/* Category Filters */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  const count = categoryCount(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative px-3.5 py-2 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 border ${
                        isActive
                          ? 'text-white bg-gradient-to-br from-em-primary to-em-primary-dark border-em-primary shadow-[0_2px_12px_rgba(230,0,38,0.25)]'
                          : 'text-em-text-muted border-em-border hover:border-em-primary/20 hover:text-em-text'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCatPill"
                          className="absolute inset-0 rounded-lg bg-gradient-to-br from-em-primary to-em-primary-dark shadow-[0_2px_16px_rgba(230,0,38,0.3)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                      <span
                        className={`relative z-10 text-[9px] font-mono rounded-full w-4 h-4 flex items-center justify-center ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-em-surface-light text-em-text-muted/60'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status bar */}
            <div className="mt-4 pt-3 border-t border-em-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono text-em-text-muted/60">
                <Sparkles className="w-3 h-3 text-em-primary/40" />
                <span>
                  <span className="text-em-primary font-bold">{filtered.length}</span>
                  <span className="mx-1">/</span>
                  <span>{activities.length} systems active</span>
                </span>
                {searchQuery && (
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-em-surface-light border border-em-border text-em-text-muted">
                    query: &quot;{searchQuery}&quot;
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[9px] font-mono text-em-text-muted/40">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                  LIVE
                </span>
                <span>v4.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bento Grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((activity, index) => (
            <motion.div
              key={activity.visualizerId}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -12 }}
              transition={{
                layout: { type: 'spring', stiffness: 300, damping: 28 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
              }}
              className={activity.featured ? 'md:col-span-2' : 'col-span-1'}
            >
              <ActivityCard activity={activity} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-em-surface border border-em-border">
            <Search className="w-6 h-6 text-em-primary/25" />
          </div>
          <p className="text-sm text-em-text-secondary font-medium">No systems match your query.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-3 text-xs font-bold text-em-primary hover:text-em-primary-light transition-colors uppercase tracking-wider"
          >
            ← Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
