import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Users, Compass, Network, Award } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { sixPillars } from '../data/content';

export const SixPillars: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  // Assign icons based on pillar id
  const getIcon = (id: string) => {
    switch (id) {
      case 'dignity':
        return <Heart className="h-6 w-6" />;
      case 'transparency':
        return <ShieldCheck className="h-6 w-6" />;
      case 'continuity':
        return <Compass className="h-6 w-6" />;
      case 'inclusivity':
        return <Users className="h-6 w-6" />;
      case 'collaboration':
        return <Network className="h-6 w-6" />;
      case 'resilience':
        return <Award className="h-6 w-6" />;
      default:
        return <Heart className="h-6 w-6" />;
    }
  };

  return (
    <>
      <SEO title="Our Six Pillars - Core Values & Credibility" />

      {/* Hero Header */}
      <section className="bg-brand-forest text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 right-10 w-72 h-72 bg-brand-emerald rounded-full filter blur-[100px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
            Our Foundation
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            The Six Pillars of Pratheeksha
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            The operating guidelines that govern our survey methodology, resource distributions, and corporate relationships.
          </p>
        </div>
      </section>

      {/* Pillars Grid Layout */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sixPillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl border border-brand-forest/5 shadow-sm hover:shadow-xl hover:border-brand-emerald/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top bar with Icon and Number */}
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-2xl bg-brand-forest/5 text-brand-forest group-hover:bg-brand-emerald/10 group-hover:text-brand-emerald transition-colors flex items-center justify-center">
                      {getIcon(pillar.id)}
                    </div>
                    <span className="font-heading text-4xl font-extrabold text-brand-forest/10 group-hover:text-brand-emerald/15 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-forest group-hover:text-brand-emerald transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-brand-forest/65 font-medium leading-relaxed">
                      {pillar.description}
                    </p>
                    <div className="h-[1px] bg-brand-forest/10 w-12 group-hover:w-full transition-all duration-500" />
                    <p className="font-body text-xs sm:text-sm text-brand-forest/80 leading-relaxed pt-2">
                      {pillar.detailedText}
                    </p>
                  </div>
                </div>

                {/* Sub-footer detail */}
                <div className="pt-8 text-xs font-semibold text-brand-emerald/75 uppercase tracking-wider font-body group-hover:text-brand-forest transition-colors">
                  Operational Standard &bull; Verified
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Operational Promise Statement */}
      <section className="py-24 bg-white border-t border-brand-forest/5 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
            Our Quality Pledge
          </span>
          <h2 className="font-heading text-3xl font-bold text-brand-forest">
            A Partnership Rooted in Integrity
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-forest/80 max-w-2xl mx-auto leading-relaxed">
            By implementing these six guidelines, we bridge the gap between donors and needy beneficiaries with complete clarity. Our records are open for audit anytime by our corporate and charity partners.
          </p>
        </div>
      </section>
    </>
  );
};
