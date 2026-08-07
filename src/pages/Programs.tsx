import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Stethoscope, Apple, ShieldAlert, Heart, Calendar, HardHat, Accessibility, BookOpen, Bus } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlumBackdrop } from '../components/common/PlumBackdrop';
import { ImageSlot } from '../components/common/ImageSlot';
import { EnrollmentTable } from '../components/common/EnrollmentTable';
import { programsList } from '../data/content';
import { renderEmphasis } from '../lib/richText';

export const Programs: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  // Assign icons based on program ID
  const getIcon = (id: string) => {
    switch (id) {
      case 'education':
        return <GraduationCap className="h-6 w-6" />;
      case 'healthcare':
        return <Stethoscope className="h-6 w-6" />;
      case 'food-clothing':
        return <Apple className="h-6 w-6" />;
      case 'housing':
        return <ShieldAlert className="h-6 w-6" />;
      case 'recreation':
        return <Heart className="h-6 w-6" />;
      case 'training-faith':
        return <Calendar className="h-6 w-6" />;
      case 'rehab':
        return <HardHat className="h-6 w-6" />;
      case 'sahara-bharat':
        return <Accessibility className="h-6 w-6" />;
      case 'noorul-quran':
        return <BookOpen className="h-6 w-6" />;
      case 'tours':
        return <Bus className="h-6 w-6" />;
      default:
        return <Heart className="h-6 w-6" />;
    }
  };

  return (
    <>
      <SEO title="Our Programs - Strategic Community Work" />

      {/* Hero Header */}
      <section className="bg-brand-plum text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <PlumBackdrop glow="bottom-left" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-violet-light font-semibold uppercase tracking-wider text-xs font-body block">
            Our Initiatives
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            How We Empower Lives
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            By tackling the core elements of human vulnerability—shelter, health, learning, nutrition, livelihood, and emotional wellness.
          </p>
        </div>
      </section>

      {/* Programs List - Alternating Staggered Rows */}
      <section className="py-24 bg-brand-beige space-y-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {programsList.map((prog, index) => {
            const isEven = index % 2 === 0;

            return (
              <React.Fragment key={prog.id}>
              <div
                id={prog.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center pb-24 border-b border-brand-plum/5 last:border-b-0 last:pb-0 scroll-mt-24"
              >
                {/* Visual Block */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="relative p-2 bg-white rounded-3xl shadow-md border border-brand-plum/5 group overflow-hidden">
                    <ImageSlot
                      src={prog.photo}
                      filename={prog.imageFile}
                      alt={prog.imageAlt}
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="flex items-center space-x-3 text-brand-violet">
                    <div className="w-10 h-10 rounded-xl bg-brand-violet/10 flex items-center justify-center">
                      {getIcon(prog.id)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider font-body">
                      {prog.description}
                    </span>
                  </div>
                  
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-plum">
                    {prog.title}
                  </h2>
                  
                  <p className="font-body text-sm sm:text-base text-brand-plum/85 leading-relaxed">
                    {renderEmphasis(prog.longDescription)}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={prog.ctaLink}
                      className="inline-flex items-center space-x-2 bg-brand-plum hover:bg-brand-violet text-brand-beige hover:text-white px-6 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors duration-300"
                    >
                      <span>{prog.ctaText}</span>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Enrollment breakdown sits directly below Education Promise. */}
              {prog.id === 'education' && (
                <div className="pb-24 border-b border-brand-plum/5">
                  <EnrollmentTable />
                </div>
              )}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
};
