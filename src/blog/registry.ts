// Blog Post Registry - imports all blog posts
import { BlogPost, BlogPostMeta } from './types';

// Import all blog posts
import { post as post20260225 } from './posts/2026-02-25-hoe-vaak-moet-je-botox-herhalen';
import { post as post20260205 } from './posts/2026-02-05-waaraan-herken-je-een-betrouwbare-cosmetische-arts';

// Registry of all posts
export const blogPosts: BlogPost[] = [
  post20260225,
  post20260205,
  // Add more posts here
];

// Sort posts by date (newest first)
export const sortedPosts = [...blogPosts].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Get all posts (for listing)
export const getAllPosts = (): BlogPost[] => sortedPosts;

// Get all posts metadata (lighter for listings)
export const getAllPostsMeta = (): BlogPostMeta[] => 
  sortedPosts.map(post => ({
    id: post.id,
    slug: post.slug,
    date: post.date,
    datetime: post.datetime,
    title: post.title,
    titleEn: post.titleEn,
    excerpt: post.excerpt,
    excerptEn: post.excerptEn,
    category: post.category,
    author: post.author,
    readTime: post.readTime,
    image: post.image,
  }));

// Get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Get post by datetime (for date-based URLs)
export const getPostByDateTime = (datetime: string): BlogPost | undefined => {
  return blogPosts.find(post => post.datetime === datetime);
};

// Get related posts
export const getRelatedPosts = (post: BlogPost, limit: number = 3): BlogPost[] => {
  if (!post.relatedPosts || post.relatedPosts.length === 0) {
    // Return other posts from same category
    return sortedPosts
      .filter(p => p.category === post.category && p.id !== post.id)
      .slice(0, limit);
  }
  
  return sortedPosts
    .filter(p => post.relatedPosts?.includes(p.slug) && p.id !== post.id)
    .slice(0, limit);
};

// Get all unique categories
export const getAllCategories = (): string[] => {
  const categories = new Set(blogPosts.map(post => post.category));
  return ['All', ...Array.from(categories)];
};

// Get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'All') return sortedPosts;
  return sortedPosts.filter(post => post.category === category);
};

// Search posts
export const searchPosts = (query: string, language: 'nl' | 'en' = 'nl'): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  return sortedPosts.filter(post => {
    const title = (language === 'nl' ? post.title : post.titleEn).toLowerCase();
    const excerpt = (language === 'nl' ? post.excerpt : post.excerptEn).toLowerCase();
    const content = (language === 'nl' ? post.content : post.contentEn).toLowerCase();
    
    return title.includes(searchTerm) || 
           excerpt.includes(searchTerm) || 
           content.includes(searchTerm);
  });
};

// Generate URL for a blog post (date-based)
export const getPostUrl = (post: BlogPost): string => {
  return `/blog/${post.datetime}`;
};

// Format date for display
export const formatDate = (dateString: string, language: 'nl' | 'en' = 'nl'): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(language === 'nl' ? 'nl-NL' : 'en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
