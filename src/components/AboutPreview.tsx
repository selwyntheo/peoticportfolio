import Link from 'next/link';

export function AboutPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50" id="about">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              The Artist Behind the Canvas
            </h2>
            
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Hi, I&apos;m Sarah, a passionate painter who believes that every stroke of the brush carries a piece of the soul. 
                My journey began in childhood, sketching dreams on napkins, and has evolved into a lifelong love affair with 
                color and form.
              </p>
              
              <p>
                Through my work, I explore the intersection of emotion and nature, finding inspiration in everything from 
                morning sunlight filtering through leaves to the quiet contemplation of rainy afternoons.
              </p>
              
              <p>
                Each painting is a conversation between my inner world and the beauty I see around me, translated through 
                layers of paint and years of passionate dedication to the craft.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Read My Full Story
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Explore My Blog
              </Link>
            </div>
          </div>

          {/* Artist Visualization */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl overflow-hidden shadow-2xl">
              {/* Palette Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                {/* Paintbrush */}
                <div className="relative">
                  <div className="w-2 h-20 bg-amber-800 rounded-full transform rotate-45 relative z-10"></div>
                  <div className="absolute -top-4 -left-2 w-6 h-6 bg-gray-800 rounded-full transform rotate-45"></div>
                  
                  {/* Paint Spots */}
                  <div className="absolute -top-8 -right-8 w-4 h-4 bg-red-400 rounded-full opacity-80"></div>
                  <div className="absolute -bottom-8 -left-8 w-3 h-3 bg-blue-400 rounded-full opacity-80"></div>
                  <div className="absolute top-8 -right-12 w-2 h-2 bg-yellow-400 rounded-full opacity-80"></div>
                  <div className="absolute -top-12 left-8 w-3 h-3 bg-green-400 rounded-full opacity-80"></div>
                  <div className="absolute bottom-12 right-8 w-2 h-2 bg-purple-400 rounded-full opacity-80"></div>
                </div>
              </div>

              {/* Floating Art Elements */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-pink-300/60 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 bg-yellow-300/60 rounded-full blur-sm animate-pulse delay-500"></div>
              <div className="absolute top-16 right-16 w-6 h-6 bg-blue-300/60 rounded-full blur-sm animate-pulse delay-1000"></div>
              <div className="absolute bottom-16 left-16 w-10 h-10 bg-green-300/60 rounded-full blur-sm animate-pulse delay-1500"></div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 left-4 w-16 h-1 bg-white rounded transform rotate-12"></div>
                  <div className="absolute top-12 right-8 w-12 h-1 bg-white rounded transform -rotate-12"></div>
                  <div className="absolute bottom-8 left-12 w-20 h-1 bg-white rounded transform rotate-45"></div>
                  <div className="absolute bottom-16 right-4 w-8 h-1 bg-white rounded transform -rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements Around the Main Circle */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full shadow-lg animate-bounce"></div>
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-lg animate-bounce delay-300"></div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full shadow-lg animate-bounce delay-700"></div>
            <div className="absolute -bottom-4 -right-4 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg animate-bounce delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
