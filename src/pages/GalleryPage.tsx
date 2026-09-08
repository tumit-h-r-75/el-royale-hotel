import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { galleryPhotos, GALLERY_CATEGORIES } from '../data/gallery';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

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
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-70 bg-black/95 flex flex-col justify-between p-4 md:p-6"
            >
              {/* Top Bar */}
              <div className="flex justify-between items-center text-white text-xs font-mono max-w-7xl mx-auto w-full">
                <span className="text-white/80">
                  {filteredPhotos[lightboxIndex].title} ({lightboxIndex + 1} of {filteredPhotos.length})
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image Center Stage with side buttons */}
              <div className="relative flex-1 flex items-center justify-center p-2 md:p-4">
                {/* Previous Button Left */}
                <button
                  onClick={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1))}
                  className="absolute left-2 md:left-6 z-10 p-3 bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.div
                  key={filteredPhotos[lightboxIndex].id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center justify-center max-w-5xl"
                >
                  <img
                    src={filteredPhotos[lightboxIndex].url}
                    alt={filteredPhotos[lightboxIndex].title}
                    className="max-h-[75vh] max-w-[85vw] object-contain rounded-[4px] shadow-2xl"
                  />
                  <p className="text-white/90 text-sm font-serif text-center mt-3 max-w-xl">
                    {filteredPhotos[lightboxIndex].caption}
                  </p>
                </motion.div>

                {/* Next Button Right */}
                <button
                  onClick={() => setLightboxIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0))}
                  className="absolute right-2 md:right-6 z-10 p-3 bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom indicators */}
              <div className="flex justify-center space-x-2 py-2">
                {filteredPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`h-1.5 transition-all rounded-full cursor-pointer ${
                      idx === lightboxIndex ? 'w-8 bg-brass' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </div>
  );
};
