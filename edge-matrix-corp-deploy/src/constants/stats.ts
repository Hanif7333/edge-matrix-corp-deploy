// ============================================================================
// Edge Matrix Corporation — Statistics & Metrics
// Real company data for homepage counters and credibility indicators
// ============================================================================

import { StatItem } from '@/types';

/** Primary hero-adjacent stats — shown in the Stats Section */
export const GLOBAL_STATS: StatItem[] = [
  {
    value: 100,
    suffix: '+',
    label: 'Products',
    description: 'Enterprise AI products deployed in production',
  },
  {
    value: 50,
    suffix: '+',
    label: 'MVPs',
    description: 'Rapid prototypes validated with enterprise clients',
  },
  {
    value: 7,
    suffix: '+',
    label: 'Countries',
    description: 'Global presence across continents',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Members',
    description: 'Engineers, researchers, and industry specialists',
  },
  {
    value: 300,
    suffix: '+',
    label: 'Workshops',
    description: 'Corporate training and upskilling programs',
  },
];

/** Hero section quick stats — compact indicators */
export const HERO_STATS = [
  { value: '100+', label: 'Products' },
  { value: '7+', label: 'Countries' },
  { value: '200+', label: 'Team' },
] as const;

/** General Company Metrics */
export const COMPANY_METRICS = {
  founded: 2018,
  employees: '200+',
  patents: '45+',
  researchPapers: '120+',
  dataProcessedDaily: '50TB+',
};
