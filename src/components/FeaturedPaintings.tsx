'use client';

import { useState } from 'react';
import Link from 'next/link';

const paintings = [
  {
    id: 1,
    title: "Sunset Dreams",
    description: "An ethereal landscape capturing the golden hour's magic with warm pastels and flowing brushstrokes.",
    gradient: "from-orange-300 via-pink-300 to-purple-300",
    medium: "Oil on Canvas",
    size: "24\" x 36\"",
    year: "2024"
  },
  {
    id: 2,
    title: "Ocean Whispers",
    description: "A serene seascape that evokes the calming rhythm of waves and the endless horizon.",
    gradient: "from-blue-300 via-cyan-300 to-teal-300",
    medium: "Acrylic on Canvas",
    size: "20\" x 30\"",
    year: "2024"
  },
  {
    id: 3,
    title: "Urban Symphony",
    description: "A vibrant cityscape celebrating the energy and movement of metropolitan life.",
    gradient: "from-gray-400 via-blue-400 to-purple-400",
    medium: "Mixed Media",
    size: "18\" x 24\"",
    year: "2023"
  },
  {
    id: 4,
    title: "Midnight Bloom",
    description: "An abstract floral piece exploring the mysterious beauty that emerges in darkness.",
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
    medium: "Oil on Canvas",
    size: "16\" x 20\"",
    year: "2023"
  }
];

export function FeaturedPaintings() {
  const [hoveredPainting, setHoveredPainting] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Paintings
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore a curated selection of my latest works, each piece telling its own unique story through color and form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {paintings.map((painting) => (
            <div
              key={painting.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredPainting(painting.id)}
              onMouseLeave={() => setHoveredPainting(null)}
            >
              {/* Painting Image Area */}
              <div className={`h-64 bg-gradient-to-br ${painting.gradient} relative overflow-hidden`}>
                {/* Overlay that appears on hover */}
                <div 
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredPainting === painting.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                    View Details
                  </button>
                </div>

                {/* Artistic elements to simulate a painting */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/40 rounded-full blur-sm"></div>
                  <div className="absolute bottom-6 right-6 w-12 h-4 bg-white/30 rounded-full blur-sm transform rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/20 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>

              {/* Painting Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {painting.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {painting.description}
                </p>
                
                {/* Painting Details */}
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Medium:</span>
                    <span className="font-medium">{painting.medium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">{painting.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year:</span>
                    <span className="font-medium">{painting.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Gallery Button */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            View Complete Gallery
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
