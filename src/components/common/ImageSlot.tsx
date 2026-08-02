import React from 'react';
import { Camera } from 'lucide-react';

/**
 * PHOTOGRAPHY DIRECTION — applies to every image on this site.
 *
 *   Authentic groundwork only. Photograph real settings: offices, workshops,
 *   construction sites, key handovers, home visits, classrooms.
 *   Soft, natural light. Shoot people where they actually are.
 *   No heavy filters, no dramatic colour grading, no stock-library imagery,
 *   no AI-generated pictures.
 *
 * Until a real photograph exists, this renders a clean labelled slot naming the
 * exact file that belongs there, so a photographer or editor can see what is
 * still needed. Drop the file into /public/images/ and pass `src` to fill it.
 */

interface ImageSlotProps {
  /** Path to the real photograph, once it exists (e.g. "/images/safe-home-key-handover.jpg"). */
  src?: string;
  /** Intended filename, shown on the empty slot so the gap is self-documenting. */
  filename: string;
  /** Alt text — required whether or not the photo exists yet. */
  alt: string;
  /** Caption heading shown over the image. */
  title?: string;
  /** Caption line beneath the title. */
  subtitle?: string;
  aspectRatio?: string;
  className?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  filename,
  alt,
  title,
  subtitle,
  aspectRatio = 'aspect-video',
  className = '',
}) => {
  const frame = `relative overflow-hidden w-full h-full rounded-2xl ${aspectRatio} ${className} group`;

  if (src) {
    return (
      <div className={frame}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {(title || subtitle) && (
          <div className="absolute inset-0 flex flex-col justify-end p-8 bg-linear-to-t from-black/80 via-black/30 to-transparent">
            {title && (
              <h3 className="font-heading text-xl md:text-2xl text-white font-medium mb-1 drop-shadow-sm tracking-wide">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-white/80 text-xs md:text-sm max-w-[90%] font-body font-light">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${frame} bg-brand-lightgray border border-dashed border-brand-plum/20 flex flex-col justify-between p-6`}
      role="img"
      aria-label={alt}
    >
      <div className="flex items-center space-x-2 text-brand-plum/40">
        <Camera className="h-4 w-4" />
        <span className="font-body text-[10px] font-semibold uppercase tracking-wider">
          Photograph needed
        </span>
      </div>

      <div className="space-y-1">
        {title && (
          <h3 className="font-heading text-lg md:text-xl text-brand-plum font-bold leading-tight">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="font-body text-xs md:text-sm text-brand-plum/80 leading-relaxed max-w-[95%]">
            {subtitle}
          </p>
        )}
        <p className="font-body text-[10px] text-brand-plum/45 pt-2 break-all">
          <span className="font-mono">{filename}</span>
          <span className="block italic mt-0.5">alt: {alt}</span>
        </p>
      </div>
    </div>
  );
};
