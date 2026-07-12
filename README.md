# Pratheeksha Foundation Charitable Society Web Portal

A premium, modern, responsive static website built for **Pratheeksha Foundation Charitable Society**, a volunteer-driven NGO based in Wayanad, Kerala. The portal is designed with elegant typography (Playfair Display & Inter), organic Kerala green color tones, fluid entrance animations, and full SEO support.

---

## 🛠️ Technology Stack

*   **Framework**: [React 19](https://react.dev/)
*   **Bundler**: [Vite 8](https://vite.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Routing**: [React Router DOM v6](https://reactrouter.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Slider/Carousel**: [Swiper.js v11](https://swiperjs.com/)
*   **Lightbox**: [React Photo View](https://react-photo-view.vercel.app/)
*   **SEO Metadata**: [React Helmet Async](https://github.com/staylor/react-helmet-async)

---

## 📂 Project Architecture

The workspace is organized logically to separate structural copy from visual components:

```text
src/
├── data/
│   └── content.ts             # Central structured data storage (no hardcoded content in pages)
├── components/
│   ├── common/
│   │   ├── SEO.tsx            # Dynamic React Helmet Async tags & JSON-LD schema builder
│   │   ├── AnimatedCounter.tsx# Viewport-aware numeric counter animations
│   │   └── PlaceholderImage.ts# Custom CSS SVG gradient image elements
│   └── layout/
│       ├── Navbar.tsx         # Sticky glassmorphism header & mobile navigation drawer
│       ├── Footer.tsx         # Dark brand-forest footer with structured contacts & quick links
│       └── ScrollToTop.tsx    # Scroll position reset handler on route transition
├── pages/
│   ├── Home.tsx               # Homepage detailing hero, work steps, testimonials, and previews
│   ├── About.tsx              # About Us narrative, vision, mission, and leadership cards
│   ├── Programs.tsx           # Alternating detailed rows describing our 6 core charity initiatives
│   ├── SixPillars.tsx         # In-depth philosophies, accountability rules, and grid cards
│   ├── Gallery.tsx            # Responsive masonry-like filter grid & lightbox viewer
│   ├── Testimonials.tsx       # Quotation layout presenting single-mother & sponsor statements
│   ├── Partnership.tsx        # CSR options, banking details, 80G tax exemptions, & inquiry form
│   ├── Volunteer.tsx          # FAQ accordion dropdowns, journey timeline, & application card
│   ├── AnnualReport.tsx       # Milestones timeline, reports download, & CSS/SVG allocation chart
│   └── Contact.tsx            # Map iframe embed, direct office phone/email, & contact form
├── App.tsx                    # React router route mappings & Helmet provider setup
└── main.tsx                   # Core entry point mounting DOM
```

---

## 🚀 Getting Started

Follow these steps to run the application locally or compile it for hosting.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Install Dependencies
Clone or extract the workspace and install standard packages:
```bash
npm install
```

### 3. Start Development Server
Run Vite's rapid local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Compile for Production
Build the optimized static assets ready for fast-edge deployment:
```bash
npm run build
```
Vite will compile the code and place the output into the `/dist` directory.

### 5. Preview Production Bundle locally
To preview the compiled assets locally:
```bash
npm run preview
```

---

## 🌐 Production Deployment

Since the portal is completely static, the compiled `/dist` directory can be hosted on any modern static provider:

### Deploying on Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run command: `vercel`
3. Link your project and set the build output directory to `dist` when prompted.

### Deploying on Netlify
1. Log into your Netlify dashboard and drag and drop the `/dist` folder directly, OR
2. Link your GitHub repository, selecting build command `npm run build` and publish directory `dist`.

### Deploying on GitHub Pages
Configure your GitHub Actions file to run `npm run build` and deploy the output of the `/dist` directory to your `gh-pages` branch.
