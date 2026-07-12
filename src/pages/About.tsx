import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlaceholderImage } from '../components/common/PlaceholderImage';
import { aboutContent } from '../data/content';

export const About: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <SEO title="About Us - Who We Are & Our Story" />

      {/* Hero Header */}
      <section className="bg-brand-forest text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-emerald rounded-full filter blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
            About Pratheeksha
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Restoring Dignity, building Futures
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            A volunteer-driven, highly audited community-first NGO committed to resolving extreme poverty and homelessness in Wayanad, Kerala.
          </p>
        </div>
      </section>

      {/* Who We Are & Story */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-forest leading-tight">
                Our Story
              </h2>
              <p className="font-body text-sm sm:text-base text-brand-forest/85 leading-relaxed">
                {aboutContent.whoWeAre}
              </p>
              <p className="font-body text-sm sm:text-base text-brand-forest/85 leading-relaxed">
                {aboutContent.ourStory}
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="relative p-2 bg-white rounded-3xl shadow-lg border border-brand-forest/5"
            >
              <PlaceholderImage 
                title="Siddique Valappil - Community House Construction" 
                category="foundation" 
                aspectRatio="aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-brand-beige p-10 rounded-3xl border border-brand-forest/5 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-forest text-brand-beige flex items-center justify-center">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brand-forest">
                  Our Vision
                </h3>
                <p className="font-body text-brand-forest/80 leading-relaxed text-sm sm:text-base">
                  {aboutContent.vision}
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-brand-beige p-10 rounded-3xl border border-brand-forest/5 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-emerald text-white flex items-center justify-center">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-brand-forest">
                  Our Mission
                </h3>
                <p className="font-body text-brand-forest/80 leading-relaxed text-sm sm:text-base">
                  {aboutContent.mission}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community First Model */}
      <section className="py-24 bg-brand-beige border-y border-brand-forest/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
            Our Operational Strategy
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-forest">
            The Community First Model
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-forest/85 max-w-3xl mx-auto leading-relaxed">
            {aboutContent.communityFirstModel} We map requirements in direct cooperation with local healthcare officers, public teachers, and village authorities to build systems that resolve the root cause of poverty.
          </p>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-forest/5">
              <h4 className="font-heading font-bold text-brand-forest mb-2">1. Localized Mapping</h4>
              <p className="text-xs text-brand-forest/75 font-body">Field volunteers map remote forest areas to identify families in severe distress.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-forest/5">
              <h4 className="font-heading font-bold text-brand-forest mb-2">2. Direct Verification</h4>
              <p className="text-xs text-brand-forest/75 font-body">Background assessment of income, medical history, and structural safety of the home.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-forest/5">
              <h4 className="font-heading font-bold text-brand-forest mb-2">3. Transparency Reporting</h4>
              <p className="text-xs text-brand-forest/75 font-body">Continuous reports, photos, and expenditure tracking shared directly with the donor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Our Compass
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-forest">
              Values That Drive Us
            </h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {aboutContent.coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-brand-beige p-8 rounded-2xl border border-brand-forest/5 flex flex-col space-y-4 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-forest/5 text-brand-forest flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-forest">
                  {val.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-brand-forest/75 leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Our Stewards
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-forest">
              Leadership Team
            </h2>
            <p className="font-body text-sm text-brand-forest/75 leading-relaxed mt-4">
              Meet the trustees, advisors, and social workers guiding Pratheeksha's missions with integrity and deep local focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.leadership.map((leader, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-brand-forest/5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  {/* Decorative Profile Placeholder */}
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-tr from-brand-forest/90 to-brand-emerald/70 flex items-center justify-center text-white relative overflow-hidden">
                    <Users className="h-10 w-10 text-brand-beige opacity-40 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-forest leading-tight">
                      {leader.name}
                    </h3>
                    <span className="text-xs text-brand-emerald font-semibold font-body">
                      {leader.role}
                    </span>
                  </div>
                  <p className="font-body text-xs text-brand-forest/85 leading-relaxed">
                    {leader.bio}
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
