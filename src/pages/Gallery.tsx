import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Heart, Grid, Home, BookOpen, HeartPulse, ShieldAlert } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlumBackdrop } from '../components/common/PlumBackdrop';
import { ImageSlot } from '../components/common/ImageSlot';
import { galleryData, galleryPhotos, type GalleryItem } from '../data/content';

import 'react-photo-view/dist/react-photo-view.css';

// Real photographs of our own work only. This gallery previously showed stock
// library pictures, which misrepresented the projects it claimed to document.
// Photos live in /public/gallery/<folder>/, numbered from 01; a section states
// its folder and count in galleryData. A section with neither still renders as
// a labelled "photograph needed" slot. See ImageSlot for the direction.

/** One card per photograph, flattened out of the sections, in section order. */
interface Card {
  key: string;
  item: GalleryItem;
  thumb?: string;
  full?: string;
  /** 1-based position within its own section, for alt text and captions. */
  index?: number;
  total?: number;
}

function toCards(items: GalleryItem[]): Card[] {
  return items.flatMap((item) => {
    const photos = galleryPhotos(item);
    if (!photos.length) return [{ key: item.id, item }];
    return photos.map((p, i) => ({
      key: `${item.id}-${i}`,
      item,
      thumb: p.thumb,
      full: p.full,
      index: i + 1,
      total: photos.length,
    }));
  });
}

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Photos', icon: <Grid className="h-4 w-4" /> },
    { id: 'housing', name: 'Housing', icon: <Home className="h-4 w-4" /> },
    { id: 'education', name: 'Education', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'healthcare', name: 'Healthcare', icon: <HeartPulse className="h-4 w-4" /> },
    { id: 'community', name: 'Community Care', icon: <ShieldAlert className="h-4 w-4" /> }
  ];

  const filteredData = toCards(
    activeFilter === 'all'
      ? galleryData
      : galleryData.filter(item => item.category === activeFilter)
  );

  return (
    <>
      <SEO title="Photo Gallery - Transparency in Action" />

      {/* Hero Header */}
      <section className="bg-brand-plum text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <PlumBackdrop glow="bottom-right" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-violet-light font-semibold uppercase tracking-wider text-xs font-body block">
            Visual Transparency
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Our Work in Photos
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            Real photos capturing house handovers, medical relief drives, educational mentorship, and vocational training across Wayanad.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-brand-beige border-b border-brand-plum/5 sticky top-[72px] z-30 shadow-sm glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
                  activeFilter === cat.id
                    ? 'bg-brand-plum text-brand-beige shadow-md'
                    : 'bg-white text-brand-plum hover:bg-brand-plum/5 border border-brand-plum/5'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-like Grid + PhotoProvider Lightbox */}
      <section className="py-20 bg-brand-warmwhite min-h-[50vh]">
        <h2 className="sr-only">Photo gallery</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhotoProvider
            maskOpacity={0.9}
            loadingElement={<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-violet" />}
          >
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredData.map((card) => {
                  const { item } = card;

                  // No photograph yet: show a labelled slot, and no lightbox,
                  // since there is nothing to enlarge.
                  if (!card.thumb || !card.full) {
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        key={card.key}
                        className="relative overflow-hidden rounded-2xl shadow-sm border border-brand-plum/5 bg-white aspect-4/3"
                      >
                        <ImageSlot
                          title={item.title}
                          subtitle={item.description}
                          filename={item.imageFile}
                          alt={item.imageAlt}
                          aspectRatio="aspect-[4/3]"
                        />
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      key={card.key}
                      className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-sm border border-brand-plum/5 bg-white aspect-[4/3]"
                    >
                      {/* Grid shows the thumbnail; the lightbox loads the full
                          size, so a 100-card page is not a 20 MB download. */}
                      <PhotoView src={card.full}>
                        <div className="w-full h-full relative overflow-hidden">
                          {/* Image */}
                          <img
                            src={card.thumb}
                            alt={`${item.imageAlt} (${card.index} of ${card.total})`}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/90 via-brand-plum/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                            <span className="text-[10px] text-brand-violet font-bold font-body uppercase tracking-wider mb-1">
                              {item.category}
                            </span>
                            <h3 className="font-heading text-base font-bold text-white leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-white/80 text-[11px] font-body mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </PhotoView>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </PhotoProvider>

          {filteredData.length === 0 && (
            <div className="text-center py-20">
              <Heart className="h-12 w-12 text-brand-plum/20 mx-auto mb-4" />
              <p className="font-heading text-lg font-bold text-brand-plum/60">No photos in this category yet</p>
              <p className="font-body text-xs text-brand-plum/40">Check back soon as we update our reports weekly.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
