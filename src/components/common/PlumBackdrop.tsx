import React from 'react';

/**
 * Texture for the large flat plum surfaces (page heroes, the volunteer CTA,
 * the quote banner). Purely decorative: `aria-hidden`, `pointer-events-none`,
 * and it never carries meaning that isn't also in the text.
 *
 * Layers, back to front:
 *   1. optional photograph, dimmed, with a plum wash over it
 *   2. a tile of the logo's hands mark, scattered and very faint
 *   3. one or two soft violet glows
 *   4. thin concentric rings, echoing the footer
 *
 * On `photo`: this takes a real photograph of the foundation's work — pass a
 * path under /images/. It is deliberately not wired to stock or generated
 * imagery. A charity showing invented scenes of the people it serves is the
 * same credibility problem as a stock photo, and the site's photography
 * direction (see ImageSlot) rules both out.
 */

interface PlumBackdropProps {
  /** Real photograph to sit behind the wash, e.g. "/images/hero-handover.jpg". */
  photo?: string;
  /** Corner the primary glow sits in. */
  glow?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  /** Rings add depth on tall sections; drop them on short bands. */
  rings?: boolean;
  /** Texture strength. The default is deliberately faint. */
  intensity?: 'subtle' | 'normal';
}

const GLOW_POSITION: Record<NonNullable<PlumBackdropProps['glow']>, string> = {
  'top-left': '-top-24 -left-24',
  'top-right': '-top-24 -right-24',
  'bottom-left': '-bottom-24 -left-24',
  'bottom-right': '-bottom-24 -right-24',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

export const PlumBackdrop: React.FC<PlumBackdropProps> = ({
  photo,
  glow = 'top-right',
  rings = true,
  intensity = 'normal',
}) => {
  const patternOpacity = intensity === 'subtle' ? 'opacity-[0.04]' : 'opacity-[0.07]';

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {photo && (
        <>
          <img
            src={photo}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          {/* Plum wash: keeps the photograph as texture, never as content, and
              holds the headline's contrast steady whatever the image is. */}
          <div className="absolute inset-0 bg-brand-plum/85" />
        </>
      )}

      <div
        className={`absolute inset-0 bg-[url('/backdrop-hands.svg')] bg-repeat bg-[length:300px_300px] ${patternOpacity}`}
      />

      <div
        className={`absolute ${GLOW_POSITION[glow]} w-[28rem] h-[28rem] rounded-full bg-brand-violet-light/12 blur-[130px]`}
      />

      {rings && (
        <>
          <div className="absolute -left-40 -bottom-40 w-[34rem] h-[34rem] rounded-full border border-brand-violet-light/10" />
          <div className="absolute -left-24 -bottom-24 w-[24rem] h-[24rem] rounded-full border border-brand-violet-light/10" />
        </>
      )}
    </div>
  );
};
