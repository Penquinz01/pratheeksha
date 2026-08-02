import React, { useState } from 'react';

/**
 * The Pratheeksha Foundation logo.
 *
 * The supplied `public/logo.svg` is the original PDF page (612x792pt) with the
 * artwork floating in the middle and the wordmark set rotated, reading
 * bottom-to-top. `logo-horizontal.svg` is that same artwork rotated 90
 * clockwise so the type stands upright, with the hands mark and the wordmark
 * translated into a horizontal lockup. No path data was redrawn — see the
 * generator note in the repo history.
 *
 * On the plum the artwork's own colours collapse: the dot above the hands is
 * exactly the background colour and the mark reads at 1.81:1. Dark surfaces
 * therefore get `-light` variants, recoloured to brand-violet-light and beige.
 *
 * The label lives on the wrapping link (aria-label), so the image is marked
 * decorative to avoid announcing the organisation's name twice.
 */

interface LogoProps {
  /** "dark" for light backgrounds (navbar), "light" for the plum footer. */
  tone?: 'dark' | 'light';
  /** Tailwind height class for the lockup. */
  size?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  tone = 'dark',
  size = 'h-11',
  className = '',
}) => {
  const [artworkFailed, setArtworkFailed] = useState(false);

  // Text fallback only — used if the SVG ever fails to load, never as a
  // stand-in for artwork we do have.
  if (artworkFailed) {
    return (
      <span className={`flex flex-col justify-center ${className}`}>
        <span
          className={`font-heading text-lg md:text-xl font-bold tracking-tight leading-none ${
            tone === 'light' ? 'text-white' : 'text-brand-plum'
          }`}
        >
          PRATHEEKSHA
        </span>
        <span
          className={`text-[10px] tracking-[0.3em] uppercase font-body mt-1 leading-none ${
            tone === 'light' ? 'text-brand-violet-light' : 'text-brand-violet'
          }`}
        >
          Foundation
        </span>
      </span>
    );
  }

  return (
    <img
      src={tone === 'light' ? '/logo-horizontal-light.svg' : '/logo-horizontal.svg'}
      alt=""
      aria-hidden="true"
      onError={() => setArtworkFailed(true)}
      className={`${size} w-auto shrink-0 ${className}`}
    />
  );
};
