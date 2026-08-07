import React from 'react';
import { SEO } from '../components/common/SEO';
import { PlumBackdrop } from '../components/common/PlumBackdrop';
import { annualReportAchievements } from '../data/content';

export const AnnualReport: React.FC = () => {

  return (
    <>
      <SEO title="Annual Report & Financial Transparency" />

      {/* Hero Header */}
      <section className="bg-brand-plum text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <PlumBackdrop glow="top-left" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-violet-light font-semibold uppercase tracking-wider text-xs font-body block">
            Transparency Report
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Accountability & Impact
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            Review our audited financial breakdowns and milestone timelines, and see the field metrics behind them.
          </p>
        </div>
      </section>

      {/* Milestone Achievements Timeline */}
      <section className="py-24 bg-white border-y border-brand-plum/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-plum">
              Milestones & Achievements
            </h2>
          </div>

          <div className="relative border-l border-brand-plum/10 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-12">
            {annualReportAchievements.map((ach, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-brand-plum group-hover:border-brand-violet group-hover:bg-brand-violet transition-colors" />

                <div className="space-y-2">
                  <span className="text-xs font-bold text-brand-violet font-body uppercase tracking-wider bg-brand-violet/10 px-2.5 py-0.5 rounded-full">
                    {ach.year}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-plum group-hover:text-brand-violet transition-colors">
                    {ach.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-brand-plum/80 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};
