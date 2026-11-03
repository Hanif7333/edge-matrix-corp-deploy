'use client';

// ============================================================================
// Edge Matrix Corporation — High-Performance Hydration Skeletons
// Premium glassmorphic placeholders to eliminate layout shifts (CLS)
// ============================================================================

export function SectionSkeleton({ cardCount = 3 }: { cardCount?: number }) {
  return (
    <div className="w-full em-section min-h-[400px] flex flex-col items-center justify-center animate-pulse py-20">
      <div className="em-container w-full">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="w-24 h-5 bg-em-primary/15 dark:bg-em-primary/10 rounded-full border border-em-primary/20" />
          <div className="w-2/3 max-w-md h-10 bg-em-surface-lighter dark:bg-white/5 rounded-xl" />
          <div className="w-3/4 max-w-xl h-6 bg-em-surface-light dark:bg-white/5 rounded-lg" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-em-border p-8 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-em-surface-lighter dark:bg-white/5 border border-em-border" />
                <div className="w-32 h-6 bg-em-surface-lighter dark:bg-white/10 rounded-md" />
              </div>
              <div className="space-y-3 my-6">
                <div className="w-full h-4 bg-em-surface-light dark:bg-white/5 rounded" />
                <div className="w-5/6 h-4 bg-em-surface-light dark:bg-white/5 rounded" />
                <div className="w-2/3 h-4 bg-em-surface-light dark:bg-white/5 rounded" />
              </div>
              <div className="w-full pt-4 border-t border-em-border">
                <div className="w-24 h-4 bg-em-surface-lighter dark:bg-white/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesSkeleton() {
  return <SectionSkeleton cardCount={3} />;
}

export function GenericGridSkeleton() {
  return (
    <div className="w-full em-section min-h-[300px] flex items-center justify-center animate-pulse py-16">
      <div className="em-container w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80 rounded-2xl bg-white/40 dark:bg-white/5 border border-em-border p-8 space-y-6" />
          <div className="h-80 rounded-2xl bg-white/40 dark:bg-white/5 border border-em-border p-8 space-y-6" />
        </div>
      </div>
    </div>
  );
}
