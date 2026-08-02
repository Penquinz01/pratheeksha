import React from 'react';
import { Quote } from 'lucide-react';
import type { SuccessStory } from '../../data/content';

interface StoryQuoteProps {
  story: SuccessStory;
}

/**
 * A single beneficiary account.
 *
 * Reuses the card treatment already established by the Testimonials page
 * (white card, soft border, watermark quote glyph, typographic opening mark)
 * but differs from it deliberately in three ways:
 *
 *  - No photograph and no initials avatar. These are students speaking about
 *    bereavement; a stock face or a generated monogram would misrepresent them.
 *    The large quote mark carries the visual weight instead.
 *  - Real quotation semantics: <blockquote> wrapping the words, <cite> for the
 *    attribution, so the relationship survives without the styling.
 *  - No hover lift and no entrance animation, so nothing about a personal
 *    account moves or reacts as the reader works through it.
 */
export const StoryQuote: React.FC<StoryQuoteProps> = ({ story }) => (
  <figure className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-plum/5 shadow-sm relative flex flex-col justify-between h-full">
    {/* Watermark glyph: decorative only, hidden from assistive tech. */}
    <div
      aria-hidden="true"
      className="absolute top-6 right-8 text-brand-violet/10 select-none pointer-events-none"
    >
      <Quote className="h-16 w-16" />
    </div>

    <blockquote className="space-y-5 relative z-10">
      <span aria-hidden="true" className="text-brand-violet font-heading text-5xl leading-none select-none block">
        &ldquo;
      </span>
      <p className="font-heading text-base sm:text-lg text-brand-plum/90 leading-relaxed italic">
        {story.quote}
      </p>
    </blockquote>

    <figcaption className="pt-8 border-t border-brand-plum/5 mt-6 relative z-10">
      <cite className="not-italic">
        <span className="font-heading text-base font-bold text-brand-plum block">
          {story.name}
        </span>
        <span className="font-body text-xs text-brand-plum/80 font-medium block mt-1">
          {story.role}, {story.institution}
        </span>
      </cite>
    </figcaption>
  </figure>
);
