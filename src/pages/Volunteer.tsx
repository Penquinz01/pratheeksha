import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, CheckCircle, Send, HelpCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlumBackdrop } from '../components/common/PlumBackdrop';
import { volunteerFAQs, volunteerJourney } from '../data/content';

export const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const benefits = [
    { title: "Direct Social Impact", desc: "Work closely with single mothers, children, and chronic patients inside their homes, making a tangible difference." },
    { title: "Professional References", desc: "Gain recognized volunteer hours certificates and official recommendations for university or career growth." },
    { title: "Compassionate Network", desc: "Join an inspiring community of volunteers, doctors, and organizers who share deep values of dignity and care." }
  ];

  return (
    <>
      <SEO title="Volunteer with Us - Make a Visible Difference" />

      {/* Hero Header */}
      <section className="bg-brand-plum text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <PlumBackdrop glow="top-left" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-violet-light font-semibold uppercase tracking-wider text-xs font-body block">
            Join Our Mission
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Bring Hope to Wayanad
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            Your skills, presence, and kindness are valuable. Partner with our team of social workers to restore safety and education.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Why Volunteer
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-plum">
              What You Gain by Giving
            </h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {benefits.map((b, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl border border-brand-plum/5 shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-violet/10 text-brand-violet flex items-center justify-center">
                  <Heart className="h-5 w-5 animate-pulse" />
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-plum">
                  {b.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-brand-plum/80 leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-white border-y border-brand-plum/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Your Path
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-plum">
              The Volunteer Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection line */}
            <div className="absolute top-[40px] left-[10%] right-[10%] h-[1.5px] bg-brand-plum/10 hidden md:block z-0" />

            {volunteerJourney.map((step) => (
              <div key={step.step} className="text-center space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-full bg-brand-plum text-brand-beige border-4 border-white font-heading text-lg font-bold flex items-center justify-center mx-auto shadow-sm">
                  {step.step}
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-plum">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-brand-plum/80 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs & Signup Grid */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* FAQs Accordion */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 text-brand-violet mb-6">
                <HelpCircle className="h-5 w-5" />
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-plum">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {volunteerFAQs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-2xl border border-brand-plum/5 overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-5 flex items-center justify-between text-brand-plum hover:text-brand-violet focus:outline-none"
                      >
                        <span className="font-heading text-sm sm:text-base font-bold pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown 
                          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-brand-violet' : 'text-brand-plum/50'
                          }`} 
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="font-body text-xs sm:text-sm text-brand-plum/80 leading-relaxed px-5 pb-5 pt-1 border-t border-brand-plum/5">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signup Form */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-brand-plum/5 shadow-md">
              <h3 className="font-heading text-2xl font-bold text-brand-plum mb-2">
                Register as a Volunteer
              </h3>
              <p className="font-body text-xs text-brand-plum/80 mb-6">
                Tell us about your background and interests. Our program team will connect with you shortly.
              </p>

              {isSubmitted ? (
                <div className="bg-brand-plum/5 border border-brand-violet/20 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle className="h-10 w-10 text-brand-violet mx-auto" />
                  <h4 className="font-heading font-bold text-brand-plum">Application Submitted</h4>
                  <p className="text-xs text-brand-plum/80 font-body">Thank you for volunteering! Our coordinator will contact you in a few days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Phone</label>
                      <input
                        type="tel"
                        required
                        className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Current Location</label>
                      <input
                        type="text"
                        placeholder="City/Wayanad"
                        required
                        className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Key Skills</label>
                      <input
                        type="text"
                        placeholder="Teaching / Design"
                        required
                        className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Message / Availability</label>
                    <textarea
                      rows={3}
                      className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-plum hover:bg-brand-violet text-brand-beige hover:text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Apply to Volunteer</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
