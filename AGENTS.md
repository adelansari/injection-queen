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
│   │   └── treatments/       # Treatment images
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
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.tsx    # Dark/light mode context
│   ├── i18n/               # Internationalization
│   │   ├── locales/        # Translation JSON files
│   │   │   ├── nl.json    # Dutch translations
│   │   │   └── en.json    # English translations
│   │   └── index.ts        # i18n configuration
│   ├── pages/              # Page components (route handlers)
│   │   ├── treatments/     # Treatment detail pages
│   │   ├── Behandelingen.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── BlogIndex.tsx
│   │   ├── BlogPost.tsx
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
| `/behandelingen` | Behandelingen | All treatments listing |
| `/prijzen` | Prijzen | Pricing page |
| `/contact` | Contact | Contact form and info |
| `/blog` | BlogIndex | Blog listing with search/filter |
| `/blog/:datetime/:slug` | BlogDetail | Individual blog post |
| `/voorhoofdrimpels` | Voorhoofdrimpels | Treatment detail |
| `/lippen` | Lippen | Treatment detail |
| `/kin` | Kin | Treatment detail |
| `/kraaienpootjes` | Kraaienpootjes | Treatment detail |

### 2. Theme System
- Dark/light mode toggle in navbar
- Theme persisted to localStorage
- CSS classes: `dark:` prefix for dark mode styles
- System preference detection via `prefers-color-scheme`

### 3. Blog System
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

### 4. Booking System
- Service catalog with pricing in `src/services/bookingService.ts`
- Combo discounts (10% Botox+Fillers, 15% 3+ zones)
- Multiple submission methods:
  1. Custom API endpoint (if configured)
  2. EmailJS (if configured)
  3. WhatsApp fallback (default)
- ClinicMinds integration (partial/mock)

### 5. Internationalization
- Translation keys organized by page/feature
- Language toggle in navbar (desktop & mobile)
- Default Dutch, English fallback
- LocalStorage persistence

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
import type { BlogPost } from '../blog/types';

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
