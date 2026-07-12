import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { testimonials } from '../data/content';

export const Testimonials: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <>
      <SEO title="Voices of Hope - Beneficiary Stories & Testimonials" />

      {/* Hero Header */}
      <section className="bg-brand-forest text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-10 w-80 h-80 bg-brand-emerald rounded-full filter blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
            Beneficiary & Sponsor Stories
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Voices of Hope
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            Real stories of transformation, resilience, and restoration told by the families, students, and partners of Pratheeksha.
          </p>
        </div>
      </section>

      {/* Grid of Testimonials */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="bg-white p-10 rounded-3xl border border-brand-forest/5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                {/* Quotation icon background */}
                <div className="absolute top-6 right-8 text-brand-emerald/10 select-none pointer-events-none">
                  <Quote className="h-16 w-16" />
                </div>

                <div className="space-y-6 relative z-10">
                  <span className="text-brand-emerald font-heading text-5xl leading-none select-none block">
                    &ldquo;
                  </span>
                  <p className="font-heading text-base sm:text-lg text-brand-forest/90 leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-8 border-t border-brand-forest/5 mt-6">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-forest to-brand-emerald text-brand-beige flex items-center justify-center font-heading text-sm font-semibold shrink-0">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-brand-forest">
                      {t.name}
                    </h3>
                    <p className="font-body text-xs text-brand-forest/65 font-medium">
                      {t.role} &bull; {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-24 bg-brand-forest text-brand-beige text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <Heart className="h-10 w-10 text-brand-emerald mx-auto" fill="currentColor" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white italic">
            &ldquo;We cannot change the entire world, but we can change the entire world for one family.&rdquo;
          </h2>
          <p className="text-xs tracking-wider uppercase text-brand-beige/60 font-body">
            - Pratheeksha Foundation Field Promise
          </p>
        </div>
      </section>
    </>
  );
};
