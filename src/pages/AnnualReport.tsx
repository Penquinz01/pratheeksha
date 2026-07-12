import React from 'react';
import { Download, FileText } from 'lucide-react';
import { SEO } from '../components/common/SEO';
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
      <section className="bg-brand-forest text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-10 w-80 h-80 bg-brand-emerald rounded-full filter blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
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
      <section className="py-24 bg-white border-y border-brand-forest/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-forest">
              Milestones & Achievements
            </h2>
          </div>

          <div className="relative border-l border-brand-forest/10 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-12">
            {annualReportAchievements.map((ach, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-brand-forest group-hover:border-brand-emerald group-hover:bg-brand-emerald transition-colors" />

                <div className="space-y-2">
                  <span className="text-xs font-bold text-brand-emerald font-body uppercase tracking-wider bg-brand-emerald/10 px-2.5 py-0.5 rounded-full">
                    {ach.year}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-forest group-hover:text-brand-emerald transition-colors">
                    {ach.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-brand-forest/75 leading-relaxed">
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
            <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Library
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-forest">
              Official Downloads
            </h2>
            <p className="font-body text-sm text-brand-forest/75 mt-3">
              We publish detailed operational audits annually. Click to view placeholder documents detailing bank expenditures and beneficiary receipts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documentDownloads.map((doc, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-3xl border border-brand-forest/5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-forest/5 text-brand-forest flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-forest">
                      {doc.title}
                    </h3>
                    <p className="font-body text-[11px] text-brand-forest/50 mt-1">
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
                      alert(`Downloading placeholder file: ${doc.title}.pdf`);
                    }}
                    className="flex items-center justify-center space-x-2 w-full bg-brand-forest hover:bg-brand-emerald text-brand-beige hover:text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 active:scale-95 shadow-sm"
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
