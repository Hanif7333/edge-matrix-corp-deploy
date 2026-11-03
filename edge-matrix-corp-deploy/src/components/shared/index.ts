// ============================================================================
// Edge Matrix Corporation — Shared Components Barrel Export
//
// ARCHITECTURE: All shared components are exported from this file.
// Section files import from '@/components/shared' — never from
// individual component files. This allows refactoring internal
// file structure without breaking imports across the codebase.
// ============================================================================

// Layout primitives
export { SectionWrapper } from './section-wrapper';

// Heading system
export { SectionHeader } from './section-header';
export { PageHeader } from './page-header';
export { GradientText } from './gradient-text';

// Card system
export { GlassCard } from './glass-card';
export { GlowCard } from './glow-card';
export { GlassPanel } from './glass-panel';

// Interactive elements
export { AnimatedButton } from './animated-button';
export { MagneticButton } from './magnetic-button';
export { AnimatedGridBackground } from './animated-grid-bg';
export { HoverBorderCard } from './hover-border-card';
export { CustomCursor } from './custom-cursor';
export { CommandPalette } from './command-palette';
export { TerminalAssistant } from './terminal-assistant';
export { NeuralCore3D } from './neural-core';
export { DataCube3D } from './data-cube-3d';
export { GlobalGlobe3D } from './global-globe-3d';
export { ServerGrid3D } from './server-grid-3d';
export { KnowledgeCore3D } from './knowledge-core-3d';
export { RadarScanner3D } from './radar-scanner-3d';

// Data display
export { StatCard } from './stat-card';

// New premium components
export { MatrixRain } from './matrix-rain';
export { ClientCarousel } from './client-carousel';
export { ScrollToTop } from './scroll-to-top';
