# Blog System

## Adding a New Blog Post

### 1. Create the Post File

Copy `template.ts` to `posts/YYYY-MM-DD-hh-mm-your-slug.ts`

Example: `posts/2026-03-08-14-30-nieuwe-behandeling.ts`

### 2. Fill in the Content

Update all fields in the template:
- `id`: Increment from highest existing
- `slug`: URL-friendly slug
- `date`: ISO format (YYYY-MM-DD)
- `datetime`: Date + time for unique URL (YYYY-MM-DD-HH-MM)
- `title` / `titleEn`: Dutch and English titles
- `content` / `contentEn`: Markdown content

### 3. Add Images

Create folder: `public/images/blog/YYYY-MM-DD-your-slug/`

Add images:
- `featured.jpg` - Main image
- Additional images referenced in `images` array

### 4. Register the Post

Add to `registry.ts`:

```typescript
import { post as post20260308 } from './posts/2026-03-08-14-30-nieuwe-behandeling';

export const blogPosts: BlogPost[] = [
  // ...existing posts
  post20260308,
];
```

### 5. URL Format

Posts are accessible at:
- `/blog/2026-03-08-14-30` (date-based URL - preferred)

## Markdown Format

Supported syntax:
- `## Heading` - H2 headers
- `**bold**` - Bold text
- `• item` - Bullet points
- Regular paragraphs

## Image Guidelines

- Featured image: 1200x630px (social sharing)
- Gallery images: 1200x800px
- Format: JPG or WebP
- Optimize for web
