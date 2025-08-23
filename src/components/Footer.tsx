import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Canvas & Soul
              </span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Follow my artistic journey and stay updated with new paintings, blog posts, and creative insights. 
              Where colors meet emotions and brushstrokes tell stories.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="mailto:contact@canvasandsoul.com"
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Email"
              >
                <span className="text-sm">📧</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Instagram"
              >
                <span className="text-sm">📸</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Twitter"
              >
                <span className="text-sm">🐦</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Pinterest"
              >
                <span className="text-sm">📌</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Art Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Art Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery?category=landscapes" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Landscapes
                </Link>
              </li>
              <li>
                <Link href="/gallery?category=abstracts" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Abstracts
                </Link>
              </li>
              <li>
                <Link href="/gallery?category=portraits" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Portraits
                </Link>
              </li>
              <li>
                <Link href="/gallery?category=cityscapes" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Cityscapes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Inspired</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates about new artworks and blog posts
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-full border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-r-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Canvas & Soul. All rights reserved. Made with 💜 and lots of paint.
          </p>
        </div>
      </div>
    </footer>
  );
}
