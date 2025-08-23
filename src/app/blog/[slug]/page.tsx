import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogPost, getRecentPosts, getBlogData } from '@/lib/blogData';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const { posts } = getBlogData();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const recentPosts = getRecentPosts(3);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-purple-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-purple-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-gray-900 font-medium">
                {post.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-6">
            <Link 
              href={`/blog/category/${post.category.toLowerCase()}`}
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              {post.category}
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</time>
            </div>
            
            {post.readTime && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readTime}</span>
              </div>
            )}
            
            {post.author && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author}</span>
              </div>
            )}
          </div>

          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {post.featuredImage ? (
          <div className="aspect-video rounded-xl mb-12 relative overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10"></div>
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-purple-600">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium opacity-75">Featured Image</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-purple max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-purple-600 prose-blockquote:border-purple-200 prose-blockquote:text-purple-700 prose-code:text-purple-600 prose-code:bg-purple-50 prose-pre:bg-gray-50 prose-li:text-gray-700">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">{children}</h3>,
              p: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-purple-200 pl-6 py-2 my-6 italic text-purple-700 bg-purple-50 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>,
              li: ({children}) => <li className="text-gray-700">{children}</li>,
              strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
              em: ({children}) => <em className="italic text-purple-600">{children}</em>,
              code: ({children}) => <code className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-sm">{children}</code>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link 
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 px-3 py-1 rounded-md text-sm transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Share on Twitter
            </button>
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors">
              Share on Facebook
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
              Copy Link
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
              <article key={relatedPost.id} className="group">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 group-hover:from-purple-600/30 group-hover:to-indigo-600/30 transition-all duration-300"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-purple-600">
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                
                <time className="text-sm text-gray-500">
                  {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2 group-hover:text-purple-600 transition-colors">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    {relatedPost.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-2">
                  {relatedPost.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
