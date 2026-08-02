import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Home as HomeIcon, ChevronRight } from 'lucide-react';

import { SEO } from '../components/common/SEO';
import { ImageSlot } from '../components/common/ImageSlot';
import { 
  heroContent, 
  aboutContent, 
  howWeWorkSteps, 
  sixPillars, 
  housingHighlight, 
  galleryData 
} from '../data/content';

export const Home: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      <SEO title="Hope, Made Visible" />

      {/* 1. Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-br from-brand-forest via-[#1e3e34] to-black text-brand-beige overflow-hidden pt-20">
        {/* Abstract Background Art */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-emerald filter blur-[100px] animate-pulse duration-8000" />
          <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-brand-emerald filter blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center space-x-2 bg-brand-emerald/10 border border-brand-emerald/20 px-4 py-1.5 rounded-full text-brand-emerald mb-6"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            <span className="text-xs font-semibold uppercase tracking-wider font-body">
              Pratheeksha Foundation Charitable Society
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
          >
            {heroContent.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-base sm:text-lg md:text-xl text-brand-beige/85 max-w-2xl leading-relaxed mb-10"
          >
            {heroContent.supportingText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
          >
            <Link
              to={heroContent.primaryCtaLink}
              className="w-full sm:w-auto bg-brand-emerald text-white hover:bg-brand-emerald-dark px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-brand-emerald/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              {heroContent.primaryCtaText}
            </Link>
            <Link
              to={heroContent.secondaryCtaLink}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              {heroContent.secondaryCtaText}
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block"
            onClick={() => document.getElementById('about-preview')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="w-6 h-10 border border-brand-beige/30 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-3 bg-brand-emerald rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. About Preview & Impact Section */}
      <section id="about-preview" className="py-24 bg-brand-beige relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text details */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
                Who We Are
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-forest leading-tight">
                Rooted in Wayanad, Dedicated to Human Dignity
              </h2>
              <p className="font-body text-brand-forest/80 leading-relaxed text-base md:text-lg">
                {aboutContent.whoWeAre}
              </p>
              <div className="pt-4 flex">
                <Link
                  to="/about"
                  className="flex items-center space-x-2 text-brand-emerald hover:text-brand-forest font-semibold uppercase tracking-wider text-sm transition-colors group"
                >
                  <span>Discover Our Full Story</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Visual highlight box */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-brand-forest/5 rounded-3xl transform translate-x-3 translate-y-3 pointer-events-none" />
              <ImageSlot
                filename="wayanad-community-engagement.jpg"
                alt="Field team meeting families in a Wayanad settlement"
                aspectRatio="aspect-[4/3]"
                className="shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Six Pillars Preview */}
      <section className="py-24 bg-brand-warmwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block mb-2">
                Our Foundation
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-forest">
                The Six Pillars of Pratheeksha
              </h2>
            </div>
            <Link
              to="/six-pillars"
              className="flex items-center space-x-2 text-brand-emerald hover:text-brand-forest font-semibold uppercase tracking-wider text-sm transition-colors group shrink-0"
            >
              <span>Explore Pillars in Depth</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sixPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-brand-forest/5 hover:border-brand-emerald/20 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-forest/5 flex items-center justify-center text-brand-forest group-hover:bg-brand-emerald/10 group-hover:text-brand-emerald transition-colors font-heading text-xl font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-forest">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-sm text-brand-forest/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-6">
                  <Link 
                    to="/six-pillars" 
                    className="text-brand-emerald text-xs font-semibold uppercase tracking-wider flex items-center space-x-1 group-hover:text-brand-forest transition-colors"
                  >
                    <span>Read pillar details</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Housing Highlight (Dedicated Section) */}
      <section className="relative py-32 bg-brand-forest text-brand-beige overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full bg-gradient-to-r from-brand-forest via-brand-emerald-dark to-brand-forest" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-brand-emerald/20 border border-brand-emerald/30 px-3 py-1 rounded-full text-brand-emerald">
                <HomeIcon className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider font-body">
                  Featured Initiative
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight whitespace-pre-line">
                {housingHighlight.headline}
              </h2>
              <p className="font-body text-base sm:text-lg text-brand-beige/85 leading-relaxed">
                {housingHighlight.description}
              </p>
              <div className="pt-4">
                <Link
                  to={housingHighlight.ctaLink}
                  className="inline-flex items-center space-x-3 bg-brand-emerald text-white hover:bg-brand-emerald-dark px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-brand-emerald/10"
                >
                  <span>{housingHighlight.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="relative p-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl">
                <ImageSlot
                  filename={housingHighlight.imageFile}
                  alt={housingHighlight.imageAlt}
                  aspectRatio="aspect-video"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. How We Work (Horizontal Timeline) */}
      <section className="py-24 bg-brand-beige relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Our Methodology
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-forest">
              How We Work
            </h2>
            <p className="font-body text-sm text-brand-forest/75 mt-4 leading-relaxed">
              We employ a continuous, transparent operational cycle that ensures every bit of support gets fully verified, professionally executed, and systematically tracked.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-5 gap-8 relative"
          >
            {/* Timeline connector line on desktop */}
            <div className="absolute top-1/4 left-1/10 right-1/10 h-[1.5px] bg-brand-forest/10 hidden md:block z-0" />

            {howWeWorkSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="bg-white p-6 rounded-2xl border border-brand-forest/5 shadow-sm relative z-10 hover:shadow-md transition-shadow group text-center"
              >
                <div className="w-12 h-12 rounded-full bg-brand-forest text-brand-beige font-heading text-lg font-bold flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-emerald transition-colors">
                  {step.step}
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-forest mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-brand-forest/75 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>





      {/* 9. Volunteer CTA Section */}
      <section className="py-24 bg-brand-forest text-brand-beige relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-emerald/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
            Make A Difference
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Help Us Bring Light to Wayanad
          </h2>
          <p className="font-body text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            Your time, skills, and energy can change lives. From teaching orphan kids to survey-work in tribal hamlets, we need volunteers who believe in human dignity.
          </p>
          <div className="pt-4">
            <Link
              to="/volunteer"
              className="bg-brand-emerald text-white hover:bg-brand-emerald-dark px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-brand-emerald/10 hover:-translate-y-0.5 active:translate-y-0"
            >
              Join Our Volunteer Team
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Gallery Preview */}
      <section className="py-24 bg-brand-warmwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block mb-2">
                Visual Stories
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-forest">
                Impact Gallery
              </h2>
            </div>
            <Link
              to="/gallery"
              className="flex items-center space-x-2 text-brand-emerald hover:text-brand-forest font-semibold uppercase tracking-wider text-sm transition-colors group shrink-0"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryData.slice(0, 4).map((g) => (
              <div key={g.id} className="relative group overflow-hidden rounded-2xl shadow-sm">
                <ImageSlot
                  title={g.title}
                  subtitle={g.description}
                  filename={g.imageFile}
                  alt={g.imageAlt}
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final Contact CTA */}
      <section className="py-20 bg-brand-beige border-t border-brand-forest/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-forest">
            Have questions about our transparency or auditing?
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-forest/75 max-w-xl mx-auto">
            We values partnerships. Reach out directly to learn how we work, verify beneficiary profiles, or receive copy receipts.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 text-brand-forest hover:text-brand-emerald font-semibold uppercase tracking-wider text-sm transition-colors"
            >
              <span>Get in Touch with our team</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
