export interface BlogPost {
  id: string;
  slug: string;
  date: string; // ISO format: 2026-02-25
  datetime: string; // For unique URLs: 2026-02-25-14-30
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  author: string;
  readTime: string;
  image: string; // Featured image
  images: string[]; // All images for gallery
  content: string; // Markdown content in Dutch
  contentEn: string; // Markdown content in English
  relatedPosts?: string[]; // Array of slugs
}

export interface BlogPostMeta {
  id: string;
  slug: string;
  date: string;
  datetime: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
}
