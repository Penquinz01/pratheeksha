import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlumBackdrop } from '../components/common/PlumBackdrop';
import { StoryQuote } from '../components/common/StoryQuote';
import { successStories } from '../data/content';

/**
 * Every account is rendered at once in a plain grid. There is no carousel:
 * a slider would put personal testimony behind interaction state, and the
 * brief for this section rules out autoplay and demands each quote stay
 * readable on its own. A static grid satisfies both without machinery.
 */
export const Stories: React.FC = () => {
  return (
    <>
      <SEO title="Voices of Pratheeksha - Student Success Stories" />

      {/* Hero Header */}
      <section className="bg-brand-plum text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <PlumBackdrop glow="top-left" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-violet-light font-semibold uppercase tracking-wider text-xs font-body block">
            Success Stories
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Voices of Pratheeksha
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            Students we walk alongside, in their own words.
          </p>
        </div>
      </section>

      {/* The accounts */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Student accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {successStories.map((story) => (
              <StoryQuote key={story.id} story={story} />
            ))}
          </div>

          <p className="font-body text-xs text-brand-plum/80 italic text-center mt-12">
            Shared with permission.
          </p>

          {/* One CTA for the section as a whole, never attached to a person. */}
          <div className="text-center mt-12 pt-12 border-t border-brand-plum/5">
            <Link
              to="/partnership#education-promise"
              className="inline-flex items-center space-x-2 text-brand-plum hover:text-brand-violet-dark focus-visible:text-brand-violet-dark font-semibold uppercase tracking-wider text-sm transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-violet-dark"
            >
              <span>Support our students</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
