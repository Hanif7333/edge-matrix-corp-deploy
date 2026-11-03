# Enterprise Design System & Motion Standards

## Core UI Principles
The Edge Matrix Corporation interface is engineered to evoke trust, technical superiority, and an executive-level presence.
1. **Glassmorphism & Depth:** Heavy use of layered opacity (`bg-em-surface/60`) over dark backgrounds (`#030712`) combined with `backdrop-blur-xl`. This creates an illusion of depth typical of advanced operating systems rather than flat websites.
2. **High-Contrast Accents:** The color palette relies heavily on pure black/slate backgrounds contrasted by vivid gradients (`em-primary`, `em-accent`, `em-highlight`). This ensures critical data and CTAs immediately draw executive focus.
3. **Typography:** Font stacks leverage highly legible, modern sans-serifs injected via `next/font`. Line-heights are relaxed (`leading-relaxed`) to optimize readability of dense, technical enterprise copywriting.

## Motion Hierarchy & Specifications
Motion is utilized strictly to provide feedback and guide attention, never for mere decoration.

### The "Zero Layout Thrashing" Rule
* **Standard:** Animations *must never* trigger browser layout or paint operations.
* **Execution:** We strictly animate the `transform` (scale, translate) and `opacity` CSS properties. This ensures the browser can offload the rendering directly to the GPU compositor thread, achieving buttery 60fps scrolling on any device.

### Interaction Standards
* **Cards (`GlowCard`, `HoverBorderCard`):** Feature subtle `scaleIn` easing and border-radius tracking that reacts to the mouse position. This builds a "tactile" relationship with the user.
* **Buttons (`MagneticButton`):** Utilize a dampening spring physics model (`stiffness: 150`, `damping: 15`). The button subtly pulls toward the cursor, indicating it is an active, highly responsive element.

## Responsive Strategy
1. **Mobile-First CSS:** All layout structures are defined for mobile first, utilizing Tailwind's `sm:`, `md:`, and `lg:` prefixes to build up complexity.
2. **Touch Optimization:** The `MagneticButton` gracefully degrades its physics simulation on touch devices, falling back to standard `whileTap` scaling states. Hover-glows are disabled or permanently rendered at low opacities to accommodate iOS/Android interaction paradigms.
