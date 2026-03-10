# Injection Queen - Project Documentation

## Project Overview

Injection Queen is a multilingual (Dutch/English) React website for a cosmetic clinic in Amsterdam specializing in Botox and filler treatments. The website features a modern, luxury aesthetic with dark/light mode support, comprehensive treatment information, a blog system, and integrated booking functionality.

**Primary Language:** Dutch (NL) with English (EN) as secondary  
**Target Market:** Netherlands (Amsterdam)  
**Domain:** https://www.injectionqueen.nl

## Technology Stack

### Core Technologies
- **Framework:** React 19.2.4 with TypeScript 5.9.3
- **Build Tool:** Vite 7.3.1 (ES Modules, modern bundling)
- **Styling:** Tailwind CSS 3.4.19 with PostCSS 8.5.6
- **Routing:** React Router DOM 7.13.1
- **Animations:** Framer Motion 12.34.3
- **Icons:** Lucide React 0.575.0

### Internationalization
- **i18n Library:** i18next 25.8.13 + react-i18next 16.5.4
- **Language Detection:** i18next-browser-languagedetector 8.2.1
- **Default Language:** Dutch (nl)
- **Fallback Language:** English (en)

### SEO & Meta
- **Helmet:** react-helmet-async 3.0.0 for dynamic meta tags

## Project Structure

```
├── public/                     # Static assets
│   ├── favicon/               # Favicon files
│   ├── images/                # Static images
│   │   ├── about/            # About page images
│   │   ├── blog/             # Blog post images (date-based folders)
│   │   ├── home/             # Homepage images
│   │   ├── instagram/        # Instagram feed images
│   │   ├── locations/        # Location photos
│   │   └── treatments/       # Treatment hero images (category/slug/hero.jpg)
│   │       ├── botox/        # 13 botox treatment images
│   │       ├── filler-behandelingen/  # 9 filler images
│   │       ├── hair-skin-boosters/    # 7 booster images
│   │       └── fat-dissolving/        # 2 fat dissolving images
│   └── logo/                 # Logo assets
├── src/
│   ├── blog/                 # Blog system
│   │   ├── posts/           # Blog post data files (TypeScript)
│   │   ├── types.ts         # Blog type definitions
│   │   ├── registry.ts      # Blog post registry & utilities
│   │   └── README.md        # Blog system documentation
│   ├── components/          # Reusable React components
│   │   ├── blog/           # Blog-specific components
│   │   ├── BackToTop.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── ClinicMindsBooking.tsx
│   │   ├── InstagramFeed.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageWrapper.tsx
│   │   ├── PlaceholderImage.tsx
│   │   └── ScrollToTop.tsx
│   ├── data/               # Static data files
│   │   └── treatments/     # Treatment data (modular structure)
│   │       ├── types.ts     # Treatment, FAQ, TreatmentStep interfaces
│   │       ├── index.ts     # Barrel file with exports and helpers
│   │       ├── botox/       # 13 individual botox treatment files
│   │       ├── filler-behandelingen/  # 9 filler treatment files
│   │       ├── hair-skin-boosters/    # 7 booster treatment files
│   │       └── fat-dissolving/        # 2 fat dissolving treatment files
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.tsx    # Dark/light mode context
│   ├── i18n/               # Internationalization
│   │   ├── locales/        # Translation JSON files
│   │   │   ├── nl.json    # Dutch translations
│   │   │   └── en.json    # English translations
│   │   └── index.ts        # i18n configuration
│   ├── pages/              # Page components (route handlers)
│   │   ├── treatments/     # Treatment pages
│   │   │   ├── TreatmentDetail.tsx  # Individual treatment page
│   │   │   └── CategoryDetail.tsx   # Category landing page
│   │   ├── Behandelingen.tsx  # All treatments overview
│   │   ├── BlogDetail.tsx
│   │   ├── BlogIndex.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── OverOns.tsx
│   │   └── Prijzen.tsx
│   ├── sections/           # Page section components
│   │   ├── About.tsx
│   │   ├── Booking.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Location.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Treatments.tsx
│   │   └── VIP.tsx
│   ├── services/           # API and business logic
│   │   ├── bookingApi.ts   # Booking form submission handlers
│   │   ├── bookingService.ts # Service catalog & pricing
│   │   └── clinicMindsApi.ts # ClinicMinds integration
│   ├── types/              # Global TypeScript types
│   ├── App.tsx             # Main app component with routes
│   ├── index.css           # Global styles with Tailwind
│   └── main.tsx            # Application entry point
├── index.html              # HTML entry point (Dutch meta tags)
├── package.json
├── tsconfig.json
├── tailwind.config.js      # Tailwind with custom theme
└── postcss.config.js
```

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (Vite dev server)
npm run dev

# Build for production (TypeScript compile + Vite build)
npm run build

# Preview production build locally
npm run preview
```

### Build Output
- Production builds are output to `dist/` directory
- Vite handles bundling, minification, and asset optimization
- Static assets from `public/` are copied to `dist/` root

## Environment Configuration

Create a `.env` file by copying `.env.example`. Never commit `.env` to git.

```bash
# ClinicMinds API Configuration
VITE_CLINICMINDS_CLINIC_ID=your_clinic_id_here
VITE_CLINICMINDS_LOCALE=nl-NL

# Optional: Custom API Backend
VITE_API_URL=https://api.injectionqueen.nl

# Optional: EmailJS (for email fallback)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Environment Variables
All environment variables must be prefixed with `VITE_` to be exposed to the client-side code. Access via `import.meta.env.VITE_*`.

## Key Features

### 1. Routing Structure
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with hero, treatments, about |
| `/over-ons` | OverOns | About page with specialist info |
| `/behandelingen` | Behandelingen | All treatments listing by category |
| `/behandelingen/:category` | CategoryDetail | Category landing page (botox, fillers, etc.) |
| `/behandelingen/:category/:slug` | TreatmentDetail | Individual treatment page |
| `/prijzen` | Prijzen | Pricing page (single source of truth for prices) |
| `/contact` | Contact | Contact form and info |
| `/blog` | BlogIndex | Blog listing with search/filter |
| `/blog/:datetime/:slug` | BlogDetail | Individual blog post |

**Example treatment URLs:**
- `/behandelingen/botox/fronsrimpels`
- `/behandelingen/filler-behandelingen/lip-fillers`
- `/behandelingen/hair-skin-boosters/sculptra`
- `/behandelingen/fat-dissolving/lemon-bottle`

### 2. Treatment Data System

Treatments are organized as individual TypeScript files in `src/data/treatments/`:

**Categories:**
| Internal Key | URL Slug | Name |
|---|---|---|
| `botox` | `botox` | Botox (13 treatments) |
| `fillers` | `filler-behandelingen` | Fillers (9 treatments) |
| `boosters` | `hair-skin-boosters` | Hair & Skin Boosters (7 treatments) |
| `fat-dissolving` | `fat-dissolving` | Fat Dissolving (2 treatments) |

**Treatment interface (`types.ts`):**
```typescript
interface Treatment {
    slug: string;
    category: 'botox' | 'fillers' | 'boosters' | 'fat-dissolving';
    categorySlug: string;           // URL-friendly category slug
    categoryLabel: { nl: string; en: string };
    name: { nl: string; en: string };
    shortDesc: { nl: string; en: string };
    description: { nl: string; en: string };
    metaDescription?: { nl: string; en: string };
    details: { nl: string[]; en: string[] };
    steps?: TreatmentStep[];        // Step-by-step process
    faq?: FAQ[];                    // Frequently asked questions
    aftercare: { nl: string[]; en: string[] };
    image?: string;                 // Hero image path
    duration?: string;
    resultDuration?: string;
}
```

**Adding a Treatment:**
1. Create file: `src/data/treatments/{category}/{slug}.ts`
2. Add hero image: `public/images/treatments/{category}/{slug}/hero.jpg`
3. Import and add to array in `src/data/treatments/index.ts`
4. The treatment automatically appears on the category and overview pages

**Important:** Prices are NOT stored in treatment files. The `Prijzen.tsx` page is the single source of truth for pricing.

### 3. Category Landing Pages

Each category has a dedicated landing page (`CategoryDetail.tsx`) featuring:
- Hero section with category image and CTA buttons
- Intro content explaining the treatment type
- Suitability information (who is it for?)
- Grid of all treatments in the category with cards
- Step-by-step treatment process
- Link to pricing page
- FAQ accordion with expand/collapse animations
- Bottom CTA for booking

Content is inline in `CategoryDetail.tsx` using the `categoryContent` object.

### 4. Theme System
- Dark/light mode toggle in navbar
- Theme persisted to localStorage
- CSS classes: `dark:` prefix for dark mode styles
- System preference detection via `prefers-color-scheme`

### 5. Blog System
- Posts stored as TypeScript modules in `src/blog/posts/`
- Date-based URLs: `/blog/YYYY-MM-DD-HH-MM/slug`
- Bilingual content (Dutch primary, English secondary)
- Markdown-like content with custom image markers
- Registry pattern for post management

**Adding a Blog Post:**
1. Create file: `src/blog/posts/YYYY-MM-DD-hh-mm-slug.ts`
2. Add images to `public/images/blog/YYYY-MM-DD-slug/`
3. Import and register in `src/blog/registry.ts`
4. Follow template in `src/blog/template.ts.example`

### 6. Booking System
- Service catalog with pricing in `src/services/bookingService.ts`
- Combo discounts (10% Botox+Fillers, 15% 3+ zones)
- Multiple submission methods:
  1. Custom API endpoint (if configured)
  2. EmailJS (if configured)
  3. WhatsApp fallback (default)
- ClinicMinds integration (partial/mock)

### 7. Internationalization
- Translation keys organized by page/feature
- Language toggle in navbar (desktop & mobile)
- Default Dutch, English fallback
- LocalStorage persistence
- Treatment content is bilingual in data files (not via i18n keys)

## Design System

### Colors (Tailwind Config)
```javascript
primary: {
  DEFAULT: '#c9a961',  // Gold
  dark: '#b8944f',
  light: '#d4b878',
}
secondary: '#1a1a2e'    // Dark navy
accent: '#e8d5c4'       // Beige
gold: '#d4a574'
rose: '#d4a5a5'
cream: '#faf8f5'        // Light background
dark: {
  bg: '#0f0f1a',       // Dark mode background
  card: '#1a1a2e',
}
```

### Typography
- **Sans:** Inter, system-ui
- **Serif:** Playfair Display, Georgia (for headings)

### Custom Utilities
```css
.gradient-text    /* Gold gradient text */
.glass           /* Semi-transparent with blur */
.glass-dark      /* Dark glass effect */
```

## Code Style Guidelines

### TypeScript
- Strict mode enabled (`strict: true`)
- No unused locals/parameters allowed
- ES2022 target with ESNext modules
- React JSX transform (`jsx: "react-jsx"`)

### Component Conventions
- Function components with explicit return types
- Props interfaces defined inline or imported
- Hooks follow `useXxx` naming
- Context providers in `hooks/` directory

### File Naming
- Components: PascalCase (e.g., `Navbar.tsx`)
- Utilities/hooks: camelCase (e.g., `useTheme.tsx`)
- Pages: PascalCase matching route name
- Treatment files: kebab-case matching slug (e.g., `lip-fillers.ts`)
- Blog posts: `YYYY-MM-DD-hh-mm-slug.ts`

### Imports
```typescript
// React first
import { useState, useEffect } from 'react';

// Third-party libraries
import { motion } from 'framer-motion';

// Local components
import { Navbar } from '../components/Navbar';

// Hooks/utils
import { useTheme } from '../hooks/useTheme';

// Types
import type { Treatment } from '../data/treatments/types';

// Styles last
import './index.css';
```

## Security Considerations

1. **Environment Variables:** Never commit `.env` files. Use `.env.example` for documentation.

2. **API Endpoints:** The booking system has multiple fallback methods. In production:
   - Set `VITE_API_URL` for custom backend
   - Or configure `VITE_EMAILJS_*` for email
   - Otherwise falls back to WhatsApp (no data stored server-side)

3. **XSS Prevention:** React's JSX escaping prevents most XSS. Be cautious with:
   - Blog post content rendering (custom MarkdownRenderer)
   - Any `dangerouslySetInnerHTML` usage (currently none)

4. **Dependencies:** Keep dependencies updated. Run `npm audit` regularly.

5. **Form Validation:** Client-side validation is for UX only. Backend must validate all inputs.

## Deployment

### Static Hosting
This is a static site suitable for:
- Vercel
- Netlify
- GitHub Pages
- Any static file server

### Build Process
1. `tsc` - TypeScript type checking
2. `vite build` - Bundle and optimize
3. Output in `dist/` directory

### SEO
- Meta tags in `index.html` (Dutch)
- React Helmet Async for dynamic titles on blog pages
- Per-treatment `metaDescription` fields for SEO-optimized descriptions
- Category-based URL structure improves crawlability
- Sitemap should be generated and submitted to search engines
- Robots: `index, follow` enabled

## External Integrations

1. **Google Fonts:** Inter and Playfair Display loaded from fonts.googleapis.com
2. **ClinicMinds:** Booking system integration (configured via env vars)
3. **WhatsApp:** Direct booking via wa.me links
4. **Instagram:** Embedded feed component

## Testing

Currently no test suite is configured. To add testing:
- Consider Vitest for unit testing (Vite-native)
- Consider Playwright for E2E testing
- React Testing Library for component testing

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2022 features used
- CSS backdrop-filter used for glass effects
- Dark mode via CSS custom properties
