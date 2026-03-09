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
- `images`: Array of image paths

### 3. Add Images

Create folder: `public/images/blog/YYYY-MM-DD-your-slug/`

Add images:
- `featured.jpg` - Main/hero image
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
- `/blog/2026-03-08-14-30/your-slug` (date-based URL)

## Markdown Format

Supported syntax:
- `## Heading` - H2 headers
- `**bold**` - Bold text
- `• item` or `- item` - Bullet points
- Regular paragraphs

## Image Markers (for side-by-side layout)

Control image placement with special markers in content:

```markdown
## Section Title

[IMAGE:botox-treatment.jpg:left]

Your text content here will appear next to the image on desktop, 
below the image on mobile. This creates a nice side-by-side layout.

Add as many paragraphs, lists, or headings as you need.

[END]

[IMAGE:result.jpg:right]

Another text block paired with an image on the right side.
You can include:
- Multiple paragraphs
- Bullet lists
- **Bold text**

[END]

[IMAGE:full-width.jpg:full]

This image takes the full width (default behavior).
```

### Marker Syntax

- `[IMAGE:filename.jpg:left]` - Start side-by-side section, image on left
- `[IMAGE:filename.jpg:right]` - Start side-by-side section, image on right
- `[IMAGE:filename.jpg:full]` or `[IMAGE:filename.jpg]` - Full width image (no [END] needed)
- `[END]` - End the side-by-side section (required for left/right layouts)

### How It Works

1. Place `[IMAGE:filename.jpg:left]` or `[IMAGE:filename.jpg:right]` where you want the section to start
2. Add all the content (paragraphs, headings, lists) you want next to the image
3. Place `[END]` to close the section
4. On **mobile**: Image is full-width, text appears below
5. On **desktop**: 50/50 split with image and text side-by-side

### Important Notes

- All content between the image marker and `[END]` appears in the text column
- You can include headings, paragraphs, lists - anything Markdown supports
- `[END]` is only needed for side-by-side layouts (left/right), not for full-width images
- The filename must match an image in your post's `images` array

## Image Guidelines

- Featured image: 1200x630px (social sharing)
- Gallery images: 1200x800px
- Format: JPG or WebP
- Optimize for web
- Use descriptive short filenames (e.g., `botox-treatment.jpg`, `featured.jpg`)

## File Naming Convention

Images are organized in date-based folders:
```
public/images/blog/
  2026-03-08-nieuwe-behandeling/
    featured.jpg
    botox-treatment.jpg
    result-after.jpg
```

Reference in post:
```typescript
images: [
  '/images/blog/2026-03-08-nieuwe-behandeling/featured.jpg',
  '/images/blog/2026-03-08-nieuwe-behandeling/botox-treatment.jpg',
  '/images/blog/2026-03-08-nieuwe-behandeling/result-after.jpg',
]
```
