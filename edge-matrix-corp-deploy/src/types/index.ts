// ============================================================================
// Edge Matrix Corporation — Type Definitions
// Enterprise-grade type system for the corporate website
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface TrainingItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  topics: string[];
  icon: string;
}

export interface GlobalPresenceItem {
  region: string;
  countries: string[];
  offices: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  message: string;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  ease: string;
}

export interface SectionProps {
  className?: string;
  id?: string;
}
