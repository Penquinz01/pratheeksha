import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Stethoscope, Apple, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlaceholderImage } from '../components/common/PlaceholderImage';
import { programsList } from '../data/content';

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
      default:
        return <Heart className="h-6 w-6" />;
    }
  };

  return (
    <>
      <SEO title="Our Programs - Strategic Community Work" />

      {/* Hero Header */}
      <section className="bg-brand-forest text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-emerald rounded-full filter blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-emerald font-semibold uppercase tracking-wider text-xs font-body block">
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
              <div 
                key={prog.id} 
                id={prog.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center pb-24 border-b border-brand-forest/5 last:border-b-0 last:pb-0"
              >
                {/* Visual Block */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="relative p-2 bg-white rounded-3xl shadow-md border border-brand-forest/5 group overflow-hidden">
                    <PlaceholderImage
                      title={prog.title}
                      category={prog.id}
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
                  <div className="flex items-center space-x-3 text-brand-emerald">
                    <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 flex items-center justify-center">
                      {getIcon(prog.id)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider font-body">
                      {prog.description}
                    </span>
                  </div>
                  
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-forest">
                    {prog.title}
                  </h2>
                  
                  <p className="font-body text-sm sm:text-base text-brand-forest/85 leading-relaxed">
                    {prog.longDescription}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={prog.ctaLink}
                      className="inline-flex items-center space-x-2 bg-brand-forest hover:bg-brand-emerald text-brand-beige hover:text-white px-6 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-colors duration-300"
                    >
                      <span>{prog.ctaText}</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
