# Developer Workflow & AI-Assisted Engineering

## Core Collaboration Standards
To ensure a high-velocity, maintainable engineering culture, all developers must adhere to the following workflow:

### Branching Strategy
1. **`main`:** Highly protected. Direct commits are blocked. Represents the production Vercel deployment.
2. **`staging`:** Used for QA and final performance testing before production merges.
3. **`feature/*` or `fix/*`:** Feature branches mapped to JIRA/Linear tickets.

### Component Creation Rules
1. **Never write one-off styles:** Always use the defined Tailwind design tokens.
2. **If it repeats, extract it:** Any UI block used more than twice must be abstracted to `src/components/shared/` and exported via `index.ts`.
3. **Server First:** All components must default to Server Components unless they explicitly require `useState`, `useEffect`, or DOM event listeners (where `'use client'` must be placed at the very top).

## AI Workflow Integration (Enterprise Standard)
Edge Matrix Corporation leverages AI coding assistants to increase output velocity without sacrificing architectural integrity.

### 1. Continue.dev / Cline Usage
* **Context Loading:** AI models hallucinate when deprived of context. When asking an AI to generate a new section, you **must** supply it with `@src/animations/variants.ts` and `@src/components/shared/index.ts` so it uses the existing design system rather than inventing ad-hoc CSS.
* **Iterative Prompting:** Do not ask the AI to "build a page." Ask it to "scaffold the data model," then "build the component shell," then "apply framer-motion variants."

### 2. Local AI Verification (Ollama)
* Before pushing highly sensitive components that may contain corporate IP or proprietary algorithms, developers should utilize local models via Ollama to generate unit tests or perform code reviews, ensuring zero proprietary data leaves the machine.

## QA & Deployment Checklist
Before initiating a Pull Request to `main`, engineers must execute:
1. `npm run lint` — Zero ESLint warnings permitted.
2. `npm run build` — Validates that SSG completes successfully and TypeScript types are completely satisfied.
3. **Lighthouse Audit** — Run an incognito Lighthouse audit on the local build. If Performance drops below 90, the PR is rejected until hydration bottlenecks or layout shifts are resolved.
