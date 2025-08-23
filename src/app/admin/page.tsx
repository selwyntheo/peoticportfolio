'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isAdminAvailable } from '@/lib/environment';

interface BlogPost {
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

interface Artwork {
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

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    author: '',
    readTime: '',
    featured: false,
    featuredImage: '',
    imageAlt: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Gallery state
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [activeTab, setActiveTab] = useState<'blog' | 'gallery'>('blog');
  const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [artworkFormData, setArtworkFormData] = useState({
    title: '',
    description: '',
    medium: '',
    dimensions: '',
    year: '',
    price: '',
    image: '',
    imageAlt: '',
    available: true,
    featured: false,
    category: '',
    tags: ''
  });
  const [artworkImagePreview, setArtworkImagePreview] = useState<string>('');

  // Environment check
  useEffect(() => {
    if (!isAdminAvailable()) {
      window.location.href = '/';
      return;
    }
  }, []);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('poeticPortfolioPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Load initial data from the JSON file
      loadInitialData();
    }

    // Load gallery data
    const savedArtworks = localStorage.getItem('poeticPortfolioArtworks');
    if (savedArtworks) {
      setArtworks(JSON.parse(savedArtworks));
    } else {
      loadInitialGalleryData();
    }
  }, []);

  const loadInitialData = async () => {
    try {
      const response = await fetch('/dynamic-blogs.json');
      const initialPosts = await response.json();
      setPosts(initialPosts);
      localStorage.setItem('poeticPortfolioPosts', JSON.stringify(initialPosts));
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadInitialGalleryData = async () => {
    try {
      const response = await fetch('/gallery-data.json');
      const initialArtworks = await response.json();
      setArtworks(initialArtworks);
      localStorage.setItem('poeticPortfolioArtworks', JSON.stringify(initialArtworks));
    } catch (error) {
      console.error('Error loading initial gallery data:', error);
    }
  };

  const savePosts = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('poeticPortfolioPosts', JSON.stringify(updatedPosts));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setFormData({...formData, featuredImage: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview('');
    setFormData({...formData, featuredImage: '', imageAlt: ''});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost: BlogPost = {
      id: editingPost ? editingPost.id : Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      date: editingPost ? editingPost.date : new Date().toISOString(),
      slug,
      featured: formData.featured,
      readTime: formData.readTime,
      author: formData.author,
      featuredImage: formData.featuredImage,
      imageAlt: formData.imageAlt
    };

    let updatedPosts;
    if (editingPost) {
      updatedPosts = posts.map(post => post.id === editingPost.id ? newPost : post);
    } else {
      updatedPosts = [newPost, ...posts];
    }

    savePosts(updatedPosts);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      author: '',
      readTime: '',
      featured: false,
      featuredImage: '',
      imageAlt: ''
    });
    setSelectedImage(null);
    setImagePreview('');
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      author: post.author || '',
      readTime: post.readTime || '',
      featured: post.featured || false,
      featuredImage: post.featuredImage || '',
      imageAlt: post.imageAlt || ''
    });
    setImagePreview(post.featuredImage || '');
    setIsCreating(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      savePosts(updatedPosts);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(posts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'dynamic-blogs.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Gallery functions
  const saveArtworks = (updatedArtworks: Artwork[]) => {
    setArtworks(updatedArtworks);
    localStorage.setItem('poeticPortfolioArtworks', JSON.stringify(updatedArtworks));
  };

  const handleArtworkImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setArtworkImagePreview(reader.result as string);
        setArtworkFormData({...artworkFormData, image: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const removeArtworkImage = () => {
    setArtworkImagePreview('');
    setArtworkFormData({...artworkFormData, image: '', imageAlt: ''});
  };

  const handleArtworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newArtwork: Artwork = {
      id: editingArtwork ? editingArtwork.id : Date.now(),
      title: artworkFormData.title,
      description: artworkFormData.description,
      medium: artworkFormData.medium,
      dimensions: artworkFormData.dimensions,
      year: artworkFormData.year,
      price: artworkFormData.price,
      image: artworkFormData.image,
      imageAlt: artworkFormData.imageAlt,
      available: artworkFormData.available,
      featured: artworkFormData.featured,
      category: artworkFormData.category,
      tags: artworkFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    let updatedArtworks;
    if (editingArtwork) {
      updatedArtworks = artworks.map(artwork => artwork.id === editingArtwork.id ? newArtwork : artwork);
    } else {
      updatedArtworks = [newArtwork, ...artworks];
    }

    saveArtworks(updatedArtworks);
    resetArtworkForm();
  };

  const resetArtworkForm = () => {
    setArtworkFormData({
      title: '',
      description: '',
      medium: '',
      dimensions: '',
      year: '',
      price: '',
      image: '',
      imageAlt: '',
      available: true,
      featured: false,
      category: '',
      tags: ''
    });
    setArtworkImagePreview('');
    setIsCreatingArtwork(false);
    setEditingArtwork(null);
  };

  const handleEditArtwork = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setArtworkFormData({
      title: artwork.title,
      description: artwork.description,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      year: artwork.year,
      price: artwork.price || '',
      image: artwork.image || '',
      imageAlt: artwork.imageAlt || '',
      available: artwork.available || false,
      featured: artwork.featured || false,
      category: artwork.category || '',
      tags: artwork.tags?.join(', ') || ''
    });
    setArtworkImagePreview(artwork.image || '');
    setIsCreatingArtwork(true);
  };

  const handleDeleteArtwork = (id: number) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      const updatedArtworks = artworks.filter(artwork => artwork.id !== id);
      saveArtworks(updatedArtworks);
    }
  };

  const exportGalleryData = () => {
    const dataStr = JSON.stringify(artworks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'gallery-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Canvas & Soul Admin
            </Link>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                View Site
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-purple-600 transition-colors">
                View Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts and gallery artworks</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('blog')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'blog'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Blog Posts ({posts.length})
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'gallery'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Gallery ({artworks.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Blog Management */}
        {activeTab === 'blog' && (
          <>
            {/* Blog Actions */}
            <div className="mb-8 flex flex-wrap gap-4">
              <button
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
              >
                Create New Post
          </button>
          <button
            onClick={exportData}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Export Data
          </button>
          <div className="text-sm text-gray-500 flex items-center">
            {posts.length} posts total
          </div>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  required
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Click to upload an image
                          </span>
                          <span className="mt-1 block text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </span>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}
                  
                  {imagePreview && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Alt Text
                      </label>
                      <input
                        type="text"
                        value={formData.imageAlt}
                        onChange={(e) => setFormData({...formData, imageAlt: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Describe the image for accessibility"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="art, painting, technique"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Post</span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                >
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">All Posts</h2>
          </div>
          
          <div className="divide-y">
            {posts.map((post) => (
              <div key={post.id} className="p-6 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium">{post.title}</h3>
                    {post.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.tags.length} tags</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-purple-600 hover:text-purple-700 px-3 py-1 rounded transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-700 px-3 py-1 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            
            {posts.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <p>No posts yet. Create your first post to get started!</p>
              </div>
            )}
          </div>
        </div>
        </>
        )}

        {/* Gallery Management */}
        {activeTab === 'gallery' && (
          <>
            {/* Gallery Actions */}
            <div className="mb-8 flex flex-wrap gap-4">
              <button
                onClick={() => setIsCreatingArtwork(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
              >
                Add New Artwork
              </button>
              <button
                onClick={exportGalleryData}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Export Gallery Data
              </button>
              <div className="text-sm text-gray-500 flex items-center">
                {artworks.length} artworks total
              </div>
            </div>

            {/* Create/Edit Artwork Form */}
            {isCreatingArtwork && (
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}
                </h2>
                
                <form onSubmit={handleArtworkSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={artworkFormData.title}
                        onChange={(e) => setArtworkFormData({...artworkFormData, title: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medium *
                      </label>
                      <input
                        type="text"
                        required
                        value={artworkFormData.medium}
                        onChange={(e) => setArtworkFormData({...artworkFormData, medium: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Oil on Canvas, Watercolor, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={artworkFormData.description}
                      onChange={(e) => setArtworkFormData({...artworkFormData, description: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* Artwork Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Artwork Image
                    </label>
                    <div className="space-y-4">
                      {artworkImagePreview ? (
                        <div className="relative">
                          <img 
                            src={artworkImagePreview} 
                            alt="Preview" 
                            className="w-full max-w-md h-48 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={removeArtworkImage}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="mt-4">
                            <label htmlFor="artwork-image-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                Click to upload artwork image
                              </span>
                              <span className="mt-1 block text-sm text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </span>
                            </label>
                            <input
                              id="artwork-image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleArtworkImageChange}
                              className="hidden"
                            />
                          </div>
                        </div>
                      )}
                      
                      {artworkImagePreview && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image Alt Text
                          </label>
                          <input
                            type="text"
                            value={artworkFormData.imageAlt}
                            onChange={(e) => setArtworkFormData({...artworkFormData, imageAlt: e.target.value})}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Describe the artwork for accessibility"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dimensions *
                      </label>
                      <input
                        type="text"
                        required
                        value={artworkFormData.dimensions}
                        onChange={(e) => setArtworkFormData({...artworkFormData, dimensions: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder='24" x 36"'
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year *
                      </label>
                      <input
                        type="text"
                        required
                        value={artworkFormData.year}
                        onChange={(e) => setArtworkFormData({...artworkFormData, year: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="2024"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="text"
                        value={artworkFormData.price}
                        onChange={(e) => setArtworkFormData({...artworkFormData, price: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="$1,200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={artworkFormData.category}
                        onChange={(e) => setArtworkFormData({...artworkFormData, category: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Landscapes, Portraits, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={artworkFormData.tags}
                      onChange={(e) => setArtworkFormData({...artworkFormData, tags: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="nature, oil painting, vibrant"
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={artworkFormData.available}
                        onChange={(e) => setArtworkFormData({...artworkFormData, available: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Available for Purchase</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={artworkFormData.featured}
                        onChange={(e) => setArtworkFormData({...artworkFormData, featured: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Featured Artwork</span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                    >
                      {editingArtwork ? 'Update Artwork' : 'Add Artwork'}
                    </button>
                    <button
                      type="button"
                      onClick={resetArtworkForm}
                      className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Artworks List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">All Artworks</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {artworks.map((artwork) => (
                  <div key={artwork.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square relative">
                      {artwork.image ? (
                        <img
                          src={artwork.image}
                          alt={artwork.imageAlt || artwork.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                          <div className="text-center text-purple-600">
                            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {artwork.featured && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        </div>
                      )}

                      {artwork.available && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Available
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{artwork.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{artwork.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <span>{artwork.medium}</span>
                        <span>{artwork.year}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <span>{artwork.dimensions}</span>
                        {artwork.price && <span className="font-medium text-purple-600">{artwork.price}</span>}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditArtwork(artwork)}
                          className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArtwork(artwork.id)}
                          className="text-red-600 hover:text-red-700 px-3 py-1 rounded transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {artworks.length === 0 && (
                  <div className="col-span-full p-12 text-center text-gray-500">
                    <p>No artworks yet. Add your first artwork to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
