import fs from 'fs';
import path from 'path';

export interface Artwork {
  id: number;
  title: string;
  description: string;
  medium: string;
  dimensions: string;
  year: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  available?: boolean;
  featured?: boolean;
  category?: string;
  tags?: string[];
}

export interface GalleryData {
  artworks: Artwork[];
  categories: string[];
  tags: string[];
}

export function getGalleryData(): GalleryData {
  try {
    // Try to read from gallery data first
    const galleryDataPath = path.join(process.cwd(), 'public', 'gallery-data.json');
    
    if (fs.existsSync(galleryDataPath)) {
      const galleryData = fs.readFileSync(galleryDataPath, 'utf8');
      const artworks: Artwork[] = JSON.parse(galleryData);
      
      // Extract unique categories and tags
      const categories = [...new Set(artworks.map(artwork => artwork.category).filter((category): category is string => Boolean(category)))];
      const tags = [...new Set(artworks.flatMap(artwork => artwork.tags || []))];
      
      return { artworks, categories, tags };
    }
    
    // Fallback to empty data if no file exists
    return { artworks: [], categories: [], tags: [] };
  } catch (error) {
    console.error('Error reading gallery data:', error);
    return { artworks: [], categories: [], tags: [] };
  }
}

export function getArtwork(id: number): Artwork | null {
  const { artworks } = getGalleryData();
  return artworks.find(artwork => artwork.id === id) || null;
}

export function getFeaturedArtworks(): Artwork[] {
  const { artworks } = getGalleryData();
  return artworks.filter(artwork => artwork.featured);
}

export function getArtworksByCategory(category: string): Artwork[] {
  const { artworks } = getGalleryData();
  return artworks.filter(artwork => artwork.category === category);
}

export function getArtworksByTag(tag: string): Artwork[] {
  const { artworks } = getGalleryData();
  return artworks.filter(artwork => artwork.tags?.includes(tag));
}

export function getAvailableArtworks(): Artwork[] {
  const { artworks } = getGalleryData();
  return artworks.filter(artwork => artwork.available);
}

export function getAllCategories(): string[] {
  const { categories } = getGalleryData();
  return categories;
}

export function getAllTags(): string[] {
  const { tags } = getGalleryData();
  return tags;
}
