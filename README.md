# TOKCO.IN — Interactive 3D Donut Website

![TOKCO Banner](./public/tokco-social.jpg)

> **Art-directed interactive 3D WebGL experience for TOKCO ([tokco.in](https://tokco.in/)).**  
> Built with Three.js, React Three Fiber, and Vite. Designed with Apple-level fluidity, commercial food photography lighting, and thoughtful editorial storytelling.

---

## ✦ Brand Identity & Visual Direction

- **Brand:** TOKCO
- **Official Domain:** [tokco.in](https://tokco.in/)
- **Instagram:** [@tokco.in](https://www.instagram.com/tokco.in/)
- **Palette:**
  - Primary Yellow: `#FFDD09` / `#FFE600`
  - Vivid Raspberry Pink: `#ED1B68` / `#F42877`
  - Charcoal / Ink: `#261520`
  - Cream Pastry: `#FFF8E9`
  - Sugar White: `#FFFFFF`
- **Typography:** *Outfit* (High-contrast editorial display) & *Plus Jakarta Sans* (Legible body copy)

---

## ✦ Features & 3D Architecture

1. **Photorealistic 3D Donut Engine**:
   - **Baked Pastry Dough**: Subdivided parametric torus with organic low-frequency displacement, baked crumb pores, and an authentic pale "fry line" equatorial proofing band.
   - **Viscous Draped Frosting**: Independent 3D geometric layer with physical thickness, rounded meniscus edges, and harmonic dripping lobes.
   - **Specular Sugar Glaze**: `MeshPhysicalMaterial` with clearcoat gloss (1.0), roughness (0.16), transmission (0.03), and IOR (1.46).
   - **Handcrafted Sprinkles**: 220 individual capsule sprinkles adhering to surface normal vectors with random planar rotation angles across the crest in 5 festive palette colors.
2. **Interactive Controls & Motion**:
   - **Drag-to-Rotate**: Pointer and touch drag with physics inertia damping and decaying velocity.
   - **Hover Parallax**: Cursor tracking creates camera tilt when idle.
   - **Scroll-Controlled Storytelling**: Coordinates position, scale, rotation, and camera macro zoom across 5 continuous scenes.
3. **Performance & Accessibility**:
   - Adaptive pixel ratio capped at `1.4` on mobile and `1.8` on desktop.
   - Pauses WebGL rendering loop when tab is hidden or canvas is scrolled out of view.
   - Respects `prefers-reduced-motion` media queries.
   - Graceful WebGL failure fallback rendering a CSS-styled layered donut.
   - Zero horizontal overflow across viewports from 320px to 4K ultra-wide.

---

## ✦ Tech Stack

- **Framework**: React 19 + Vite 6
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Icons**: Lucide React
- **Microinteractions**: Canvas Confetti
- **Styles**: Modern responsive CSS with custom properties & fluid typography

---

## ✦ Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm 9+

### Installation

```bash
git clone https://github.com/<your-username>/tokco-website.git
cd tokco-website
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live 3D site with Hot Module Replacement.

### Production Build

```bash
npm run build
npm run preview
```

The optimized static production assets will be generated in `dist/`.

---

## ✦ Custom Domain & DNS Configuration for `tokco.in`

To map the custom domain **tokco.in** to GitHub Pages:

1. In your DNS provider (GoDaddy, Namecheap, Cloudflare, etc.), configure the following records:

| Type | Host / Name | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.109.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.110.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.111.153` | 3600 (or Auto) |
| **CNAME** | `www` | `<your-username>.github.io` | 3600 (or Auto) |

2. In the GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Custom domain**, enter `tokco.in`.
   - Check **Enforce HTTPS** once the Let's Encrypt SSL certificate is provisioned (usually takes 15–30 minutes after DNS propagation).

---

## ✦ License

© 2026 TOKCO. All rights reserved. Original logo and brand assets are intellectual property of TOKCO.
