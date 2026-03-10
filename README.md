# 👑 Injection Queen

A modern, multilingual (Dutch/English) website for a cosmetic clinic in Amsterdam specializing in Botox and filler treatments. Built with React, TypeScript, and Tailwind CSS.

🌐 **Live:** [injectionqueen.nl](https://www.injectionqueen.nl)

---

## ✨ Features

- **31 Treatment Pages** — Botox (13), Fillers (9), Boosters (7), Fat Dissolving (2), each with bilingual content, FAQs, steps, and hero images
- **Category Landing Pages** — Dedicated overview pages for each treatment category at `/behandelingen/:category`
- **Dark/Light Mode** — Theme toggle with localStorage persistence
- **Multilingual** — Dutch (default) + English with i18next
- **Blog System** — Date-based URLs, bilingual posts, markdown-like content
- **Booking Integration** — ClinicMinds, EmailJS, and WhatsApp fallback
- **Responsive Design** — Mobile-first with Tailwind CSS
- **Animations** — Framer Motion page transitions and micro-interactions
- **SEO Optimized** — Per-page meta descriptions, semantic HTML, category-based URL hierarchy

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7.3 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 7.13 |
| Animations | Framer Motion 12.34 |
| Icons | Lucide React |
| i18n | i18next + react-i18next |
| SEO | react-helmet-async |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/injection-queen-new.git
cd injection-queen-new

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview   # Preview locally
```

Output: `dist/` directory, ready for static hosting.

## 📁 Project Structure

```
src/
├── blog/                    # Blog system (posts, types, registry)
├── components/              # Reusable UI components
├── data/treatments/         # Treatment data (modular structure)
│   ├── types.ts            # Treatment, FAQ, TreatmentStep interfaces
│   ├── index.ts            # Barrel file with exports & helpers
│   ├── botox/              # 13 individual treatment files
│   ├── filler-behandelingen/ # 9 filler treatment files
│   ├── hair-skin-boosters/ # 7 booster treatment files
│   └── fat-dissolving/     # 2 fat dissolving treatment files
├── hooks/                   # Custom React hooks (useTheme)
├── i18n/                    # Translations (nl.json, en.json)
├── pages/                   # Route page components
│   └── treatments/         # TreatmentDetail + CategoryDetail
├── sections/                # Page section components
├── services/                # Booking API & business logic
├── App.tsx                  # Routes & app shell
└── main.tsx                 # Entry point
```

## 🗺️ URL Structure

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/behandelingen` | All treatments overview |
| `/behandelingen/:category` | Category landing page |
| `/behandelingen/:category/:slug` | Individual treatment |
| `/prijzen` | Pricing |
| `/over-ons` | About |
| `/contact` | Contact |
| `/blog` | Blog index |
| `/blog/:datetime/:slug` | Blog post |

**Example URLs:**
```
/behandelingen/botox/fronsrimpels
/behandelingen/filler-behandelingen/lip-fillers
/behandelingen/hair-skin-boosters/sculptra
/behandelingen/fat-dissolving/lemon-bottle
```

## ➕ Adding Content

### New Treatment

1. Create `src/data/treatments/{category}/{slug}.ts`
2. Add hero image to `public/images/treatments/{category}/{slug}/hero.jpg`
3. Import and register in `src/data/treatments/index.ts`
4. It automatically appears on category and overview pages

### New Blog Post

1. Create `src/blog/posts/YYYY-MM-DD-hh-mm-slug.ts`
2. Add images to `public/images/blog/YYYY-MM-DD-slug/`
3. Register in `src/blog/registry.ts`

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary Gold | `#c9a961` | CTAs, accents |
| Dark Navy | `#1a1a2e` | Text, dark cards |
| Cream | `#faf8f5` | Light backgrounds |
| Dark BG | `#0f0f1a` | Dark mode background |

**Fonts:** Inter (body), Playfair Display (headings)

## 🌍 Environment Variables

```bash
VITE_CLINICMINDS_CLINIC_ID=   # ClinicMinds booking integration
VITE_CLINICMINDS_LOCALE=nl-NL
VITE_API_URL=                 # Custom API backend (optional)
VITE_EMAILJS_SERVICE_ID=      # EmailJS fallback (optional)
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

## 📦 Deployment

Static site — deploy to Vercel, Netlify, or any static file server:

```bash
npm run build   # Output: dist/
```

## 📝 License

Private project. All rights reserved.
