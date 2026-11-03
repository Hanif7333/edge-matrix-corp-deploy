# Frontend Architecture Guide

## Why Next.js App Router?
The Edge Matrix Corporation platform utilizes the **Next.js App Router** architecture to achieve maximum enterprise scalability and SEO performance. 
* **Server Components by Default:** By pushing rendering to the server during the build step, we ship drastically less JavaScript to the client. This is critical for maintaining Lighthouse 95+ scores while using complex animation libraries.
* **Static Site Generation (SSG):** Dynamic routes (like `/services/[slug]`) utilize `generateStaticParams()`. This compiles dynamic data into static HTML at build time, completely removing the Node.js server bottleneck and allowing infinite scaling via Edge CDNs.

## Component Modularity & Organization
The application adheres to a strict "Atomic-inspired" modular design:
1. **`components/shared/`:** Reusable primitive atoms (e.g., `MagneticButton`, `GlowCard`, `PageHeader`). These are **barrel-exported** (`index.ts`) so imports across the codebase remain clean and refactor-friendly.
2. **`sections/`:** High-level page orchestrators (e.g., `HeroSection`, `CTASection`). These assemble shared components into major content blocks. Sections are decoupled from specific pages, allowing the "Trainings" or "Activity" sections to be dropped into any route globally.
3. **`app/[route]/_components/`:** Page-specific components that are *not* globally reusable (e.g., `AboutTimelineSection`). The `_` prefix signals to Next.js that this directory is explicitly excluded from routing.

## Controlled Motion Strategy
Enterprise applications require motion to feel "intelligent and professional," not "playful and chaotic."
* **Centralized Configuration:** All easing curves, durations, and stagger properties are stored in `src/animations/variants.ts`. This ensures absolute consistency across every page. If the brand guidelines shift to require faster animations, a single variable change in `variants.ts` updates the entire application.
* **Physics over CSS:** For interactive elements like the `MagneticButton`, we utilize `framer-motion` springs rather than CSS transitions, ensuring physics-based, interruptible interactions that track user intention accurately.

## Data Decoupling
All marketing copy, service details, and company metrics are decoupled from React components and stored in `src/constants/`. 
* **Reasoning:** This allows content strategists to update copy without modifying complex React logic. Furthermore, it perfectly positions the codebase for a seamless migration to a Headless CMS (like Sanity.io or Contentful)—the constants file can simply be swapped for an API fetch function.
