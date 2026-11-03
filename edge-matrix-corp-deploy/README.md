# Edge Matrix Corporation
**Industry 5.0 Enterprise AI & Robotics Platform**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-black?style=flat-square&logo=framer)](https://www.framer.com/motion/)

Edge Matrix Corporation is a production-grade, highly-optimized enterprise frontend architecture showcasing advanced AI, Robotics, and IIoT capabilities. Engineered to strict B2B standards, it demonstrates senior-level React product thinking, zero-CLS rendering pipelines, and premium hardware-accelerated motion systems.

---

## 📚 Comprehensive Engineering Documentation

To ensure long-term maintainability and support global developer onboarding, all architectural, performance, and scalability decisions are heavily documented in the `docs/` directory:

- [🏗 Frontend Architecture Guide](./docs/architecture.md) — Modular design, SSG vs SSR, and rendering decisions.
- [🎨 Design System & Motion](./docs/design-system.md) — Typography, spacing, interaction principles, and physics-based motion.
- [⚡ Performance Engineering](./docs/performance.md) — Zero layout thrashing, Lighthouse optimization, and hydration strategies.
- [🚀 Scalability Roadmap](./docs/scalability-roadmap.md) — CMS integration, Backend architecture, and enterprise portals.
- [🧑‍💻 Developer Workflow & AI Tools](./docs/developer-workflow.md) — AI-assisted coding (Continue.dev/Cline), Git branching, and codebase standards.

---

## 🏛 Architecture & Engineering Philosophy

This project is not a template; it is a scalable, modular enterprise frontend ecosystem. 

*   **Zero Layout Thrashing:** All animations are strictly bound to GPU-composited properties (`transform`, `opacity`). The DOM is never forced into expensive layout recalculations during scroll.
*   **Static Generation First (SSG):** All enterprise routes (including dynamic service slugs) are pre-rendered at build time via `generateStaticParams`. This ensures instant FCP/LCP and infinite global CDN scalability.
*   **Canvas-Driven Backgrounds:** Rather than rendering thousands of DOM nodes for background grids, visual atmospheres are orchestrated via HTML5 Canvas with `requestAnimationFrame`, resulting in zero CPU overhead and smooth 60fps performance.
*   **Interaction Physics:** Standard CSS transitions are replaced with `framer-motion` spring physics, creating a magnetic, tactile, and intelligent user experience that feels distinctly premium.

## 🚀 Tech Stack

*   **Framework:** Next.js 16 (App Router, Turbopack)
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS v4 (with semantic CSS variable tokens)
*   **Motion:** Motion for React (formerly Framer Motion), GSAP ScrollTrigger
*   **Forms:** React Hook Form + Zod (Enterprise validation)
*   **Icons:** Lucide React
*   **Analytics:** Vercel Speed Insights & Analytics

## 📂 Project Structure

```
edge-matrix-corp/
├── docs/          # Comprehensive engineering documentation
├── src/
│   ├── animations/    # Centralized variant tokens (stagger, duration, easing)
│   ├── app/           # Next.js App Router (Static pre-rendered routes)
│   ├── components/    # Reusable architecture
│   │   ├── layout/    # Navbar, Footer, Providers
│   │   └── shared/    # MagneticButton, GlowCard, CanvasGrids (Barrel exported)
│   ├── constants/     # SSG Data sources (Services, Metrics, Global Navigation)
│   ├── hooks/         # Custom React hooks (useScrollAnimation, useMousePosition)
│   ├── lib/           # Utilities (Metadata configs, Font injection)
│   ├── sections/      # High-level page orchestrators (Hero, About, CTA)
│   └── types/         # Global TypeScript interfaces
```

## ⚡ Performance Optimization

Targeting **Lighthouse 95+**, the architecture implements:
1.  **Image Optimization:** Pre-configured for AVIF/WebP delivery.
2.  **Package Optimization:** Heavy UI libraries (`lucide-react`, `motion`) are explicitly tree-shaken via Next.js `optimizePackageImports`.
3.  **Hydration Strategy:** Non-critical visual elements are lazy-loaded or injected post-hydration.
4.  **SEO Infrastructure:** Automated `sitemap.xml`, strict `robots.txt`, and dynamic OpenGraph/Twitter card injection per route.

## 💻 Developer Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/edge-matrix-corp.git

# Install dependencies
npm install

# Start the development server (Turbopack enabled)
npm run dev

# Run Production Build locally to verify SSG/Performance
npm run build
npm run start
```
Navigate to `http://localhost:3000` to view the build.

## 📈 Deployment Workflow

This project is pre-configured for zero-config enterprise deployment on Vercel. 
1. Link GitHub repository to Vercel.
2. Framework Preset: **Next.js**.
3. Build Command: `npm run build` (default).
4. Vercel automatically deploys the static assets to its global Edge Network.

---
*Engineered for performance. Designed for the enterprise.*
