import React from 'react';
import { Download, FileText } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlumBackdrop } from '../components/common/PlumBackdrop';
import { annualReportAchievements } from '../data/content';

export const AnnualReport: React.FC = () => {

  const documentDownloads = [
    { title: "Annual Report FY 2024-25", format: "PDF", size: "2.4 MB", date: "April 2025" },
    { title: "Financial Audit Report FY 2023-24", format: "PDF", size: "1.8 MB", date: "June 2024" },
    { title: "FCRA Foreign Grants Statement 2024", format: "PDF", size: "850 KB", date: "Jan 2025" }
  ];

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
            Review our audited financial breakdowns, milestone timelines, and download official reports to verify our field metrics.
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

      {/* Audited Document Downloads Section */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Library
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-plum">
              Official Downloads
            </h2>
            <p className="font-body text-sm text-brand-plum/80 mt-3">
              We publish detailed operational audits annually, covering bank expenditures and beneficiary receipts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documentDownloads.map((doc, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-3xl border border-brand-plum/5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-plum/5 text-brand-plum flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-plum">
                      {doc.title}
                    </h3>
                    <p className="font-body text-[11px] text-brand-plum/50 mt-1">
                      Released: {doc.date} &bull; Size: {doc.size}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  {/* Download Action Trigger (Mock download) */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`${doc.title} is not yet available to download. Please contact us to request a copy.`);
                    }}
                    className="flex items-center justify-center space-x-2 w-full bg-brand-plum hover:bg-brand-violet text-brand-beige hover:text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 active:scale-95 shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download {doc.format}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
