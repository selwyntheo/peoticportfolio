import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  category: string;
  content: string;
  date: string;
  slug: string;
  featured?: boolean;
  readTime?: string;
  author?: string;
  featuredImage?: string;
  imageAlt?: string;
}

export interface BlogData {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}

export function getBlogData(): BlogData {
  try {
    // Try to read from dynamic blogs first
    const dynamicBlogsPath = path.join(process.cwd(), 'public', 'dynamic-blogs.json');
    
    if (fs.existsSync(dynamicBlogsPath)) {
      const dynamicData = fs.readFileSync(dynamicBlogsPath, 'utf8');
      const posts: BlogPost[] = JSON.parse(dynamicData);
      
      // Extract unique categories and tags
      const categories = [...new Set(posts.map(post => post.category))];
      const tags = [...new Set(posts.flatMap(post => post.tags))];
      
      return { posts, categories, tags };
    }
    
    // Fallback to empty data if no file exists
    return { posts: [], categories: [], tags: [] };
  } catch (error) {
    console.error('Error reading blog data:', error);
    return { posts: [], categories: [], tags: [] };
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  const { posts } = getBlogData();
  return posts.find(post => post.slug === slug) || null;
}

export function getFeaturedPosts(): BlogPost[] {
  const { posts } = getBlogData();
  return posts.filter(post => post.featured).slice(0, 3);
}

export function getPostsByCategory(category: string): BlogPost[] {
  const { posts } = getBlogData();
  return posts.filter(post => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  const { posts } = getBlogData();
  return posts.filter(post => post.tags.includes(tag));
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  const { posts } = getBlogData();
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const { categories } = getBlogData();
  return categories;
}

export function getAllTags(): string[] {
  const { tags } = getBlogData();
  return tags;
}

export function searchPosts(query: string): BlogPost[] {
  const { posts } = getBlogData();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm)
  );
}
