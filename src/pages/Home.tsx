import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home as HomeIcon, ChevronRight } from 'lucide-react';

import { SEO } from '../components/common/SEO';
import { ImageSlot } from '../components/common/ImageSlot';
import { 
  heroContent, 
  aboutContent, 
  howWeWorkSteps,
  sixPillars,
  housingHighlight,
  galleryData,
  galleryPhoto,
  successStories
} from '../data/content';
import { StoryQuote } from '../components/common/StoryQuote';
import { PlumBackdrop } from '../components/common/PlumBackdrop';

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
      <section className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-br from-brand-plum via-[#3a1a55] to-black text-brand-beige overflow-hidden pt-20">
        {/* The photograph is the hero's texture, so the tiled hands mark is off
            here. Focal point sits below centre: the group stands in the lower
            half of the frame and a plain centre crop cuts their heads on tall
            viewports. */}
        <PlumBackdrop
          photo="/home/hero-group.jpg"
          photoPosition="50% 55%"
          glow="center"
          rings={false}
          intensity="subtle"
          pattern={false}
        />
        {/* Abstract Background Art — after the backdrop so the violet bloom
            still reads over the photograph rather than being painted out. */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-violet filter blur-[100px] animate-pulse duration-8000" />
          <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-brand-violet filter blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center space-x-2 bg-brand-violet/10 border border-brand-violet/20 px-4 py-1.5 rounded-full text-brand-violet-light mb-6"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            <span className="text-xs font-semibold uppercase tracking-wider font-body">
              Pratheeksha Foundation Charitable Society
            </span>
          </motion.div> */}

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
            /* Full-strength beige, not /85: over a photograph the wash can only
               hold the background so dark, and 85% measured at 3.49:1. */
            className="font-body text-base sm:text-lg md:text-xl text-brand-beige max-w-2xl leading-relaxed mb-10"
          >
            {heroContent.supportingText}
          </motion.p>

          {/* <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
          >
            <Link
              to={heroContent.primaryCtaLink}
              className="w-full sm:w-auto bg-brand-violet text-white hover:bg-brand-violet-dark px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-brand-violet/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              {heroContent.primaryCtaText}
            </Link>
          </motion.div> */}

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
              <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block">
                Who We Are
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight">
                Rooted in Wayanad, Dedicated to Human Dignity
              </h2>
              <p className="font-body text-brand-plum/80 leading-relaxed text-base md:text-lg">
                {aboutContent.whoWeAre}
              </p>
              <div className="pt-4 flex">
                <Link
                  to="/about"
                  className="flex items-center space-x-2 text-brand-violet hover:text-brand-plum font-semibold uppercase tracking-wider text-sm transition-colors group"
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
              <div className="absolute inset-0 bg-brand-plum/5 rounded-3xl transform translate-x-3 translate-y-3 pointer-events-none" />
              <ImageSlot
                src="/home/rooted-in-wayanad.jpg"
                filename="wayanad-community-engagement.jpg"
                alt="Beneficiary families seated at a foundation gathering in Wayanad"
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
              <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
                Our Foundation
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-plum">
                The Six Pillars of Pratheeksha
              </h2>
            </div>
            <Link
              to="/six-pillars"
              className="flex items-center space-x-2 text-brand-violet hover:text-brand-plum font-semibold uppercase tracking-wider text-sm transition-colors group shrink-0"
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
                className="bg-white p-8 rounded-2xl shadow-sm border border-brand-plum/5 hover:border-brand-violet/20 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-plum/5 flex items-center justify-center text-brand-plum group-hover:bg-brand-violet/10 group-hover:text-brand-violet transition-colors font-heading text-xl font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-plum">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-sm text-brand-plum/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-6">
                  <Link 
                    to="/six-pillars" 
                    className="text-brand-violet text-xs font-semibold uppercase tracking-wider flex items-center space-x-1 group-hover:text-brand-plum transition-colors"
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
      <section className="relative py-32 bg-brand-plum text-brand-beige overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full bg-gradient-to-r from-brand-plum via-brand-violet-dark to-brand-plum" />
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
              <div className="inline-flex items-center space-x-2 bg-brand-violet/20 border border-brand-violet/30 px-3 py-1 rounded-full text-brand-violet-light">
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
                  className="inline-flex items-center space-x-3 bg-brand-violet text-white hover:bg-brand-violet-dark px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-brand-violet/10"
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
                  src={housingHighlight.photo}
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
            <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Our Methodology
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-plum">
              How We Work
            </h2>
            <p className="font-body text-sm text-brand-plum/80 mt-4 leading-relaxed">
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
            <div className="absolute top-1/4 left-1/10 right-1/10 h-[1.5px] bg-brand-plum/10 hidden md:block z-0" />

            {howWeWorkSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="bg-white p-6 rounded-2xl border border-brand-plum/5 shadow-sm relative z-10 hover:shadow-md transition-shadow group text-center"
              >
                <div className="w-12 h-12 rounded-full bg-brand-plum text-brand-beige font-heading text-lg font-bold flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-violet transition-colors">
                  {step.step}
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-plum mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-brand-plum/80 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>





      {/* 7. Voices of Pratheeksha (Preview) — no animation or hover lift here,
          matching the dignified treatment on the /stories page itself. */}
      <section className="py-24 bg-brand-warmwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
                Success Stories
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-plum">
                Voices of Pratheeksha
              </h2>
            </div>
            <Link
              to="/stories"
              className="flex items-center space-x-2 text-brand-violet hover:text-brand-plum font-semibold uppercase tracking-wider text-sm transition-colors group shrink-0"
            >
              <span>Read All Stories</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {successStories.slice(0, 3).map((story) => (
              <StoryQuote key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Gallery Preview */}
      <section className="py-24 bg-brand-warmwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
                Visual Stories
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-plum">
                Impact Gallery
              </h2>
            </div>
            <Link
              to="/gallery"
              className="flex items-center space-x-2 text-brand-violet hover:text-brand-plum font-semibold uppercase tracking-wider text-sm transition-colors group shrink-0"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryData.slice(0, 4).map((g) => (
              <div key={g.id} className="relative group overflow-hidden rounded-2xl shadow-sm">
                <ImageSlot
                  /* First photograph of each section, at thumbnail size — the
                     preview never enlarges, so the full file is never needed. */
                  src={g.folder ? galleryPhoto(g.folder, 1).thumb : undefined}
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
      <section className="py-20 bg-brand-beige border-t border-brand-plum/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-plum">
            Have questions about our transparency or auditing?
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-plum/80 max-w-xl mx-auto">
            We values partnerships. Reach out directly to learn how we work, verify beneficiary profiles, or receive copy receipts.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 text-brand-plum hover:text-brand-violet font-semibold uppercase tracking-wider text-sm transition-colors"
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
