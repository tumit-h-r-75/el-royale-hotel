import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { galleryPhotos, GALLERY_CATEGORIES } from '../data/gallery';
import { X, ZoomIn } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-8 border-b border-hairline">
          <div className="max-w-[700px] space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Visual Archive
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-tight">
              A study in texture, shadow, and citrus sunlight.
            </h1>
            <p className="text-muted text-base">
              Photographing the quiet moments at The Tangerine: natural Belgian linens, textured lime plaster, afternoon pool reflections, and nightfall over Burbank.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-6">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-[2px] text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brass text-white'
                    : 'bg-paper text-muted hover:text-ink border border-hairline'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative h-80 rounded-[8px] overflow-hidden border border-hairline cursor-pointer bg-paper"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-mono text-brass tracking-wider">
                    {photo.category}
                  </span>
                  <h3 className="font-serif text-lg leading-tight mt-0.5">{photo.title}</h3>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 animate-in fade-in">
            <div className="flex justify-between items-center text-white text-xs font-mono">
              <span>{filteredPhotos[lightboxIndex].title} ({lightboxIndex + 1} of {filteredPhotos.length})</span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 text-white hover:text-brass"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <img
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-[4px]"
              />
              <p className="text-white/80 text-xs font-serif text-center mt-3 max-w-xl">
                {filteredPhotos[lightboxIndex].caption}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1))}
                className="px-4 py-2 bg-white/10 text-white rounded-[2px] hover:bg-white/20 text-xs font-mono"
              >
                ← Previous
              </button>
              <button
                onClick={() => setLightboxIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0))}
                className="px-4 py-2 bg-white/10 text-white rounded-[2px] hover:bg-white/20 text-xs font-mono"
              >
                Next →
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
