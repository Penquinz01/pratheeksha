import React, { useState } from 'react';
import { MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlumBackdrop } from '../components/common/PlumBackdrop';
import { organizationDetails } from '../data/content';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const contactOptions = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Our Headquarters",
      details: [
        organizationDetails.address.line1,
        organizationDetails.address.line2,
        `${organizationDetails.address.city}, ${organizationDetails.address.district}, ${organizationDetails.address.state} - ${organizationDetails.address.pin}`
      ]
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Direct",
      details: [
        organizationDetails.phone,
        "Available Monday - Saturday (9:00 AM - 6:00 PM)"
      ],
      href: `tel:${organizationDetails.phoneHref}`
    }
  ];

  return (
    <>
      <SEO title="Contact Us - Reach Out to Pratheeksha Team" />

      {/* Hero Header */}
      <section className="bg-brand-plum text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <PlumBackdrop glow="top-left" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-violet-light font-semibold uppercase tracking-wider text-xs font-body block">
            Get In Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            We are Here to Listen
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            Reach out for partnership queries, volunteering requests, or if you know of a family in Wayanad needing shelter, healthcare, or food support.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Details & Socials */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <h2 className="font-heading text-3xl font-bold text-brand-plum leading-tight">
                  Contact Information
                </h2>
                <p className="font-body text-sm sm:text-base text-brand-plum/80 leading-relaxed">
                  Feel free to visit our office in Kalpetta, phone our coordinators, or send us a message using the form. We believe in direct human communication.
                </p>
              </div>

              <div className="space-y-6">
                {contactOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-brand-plum shadow-sm border border-brand-plum/5 flex items-center justify-center shrink-0">
                      {opt.icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-brand-plum">
                        {opt.title}
                      </h3>
                      <div className="font-body text-xs sm:text-sm text-brand-plum/80 mt-1 space-y-0.5">
                        {opt.details.map((detail, dIdx) => (
                          <div key={dIdx}>
                            {opt.href && dIdx === 0 ? (
                              <a href={opt.href} className="hover:text-brand-violet transition-colors font-medium">
                                {detail}
                              </a>
                            ) : (
                              <span>{detail}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Simple Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-brand-plum/5 shadow-md">
              <h3 className="font-heading text-2xl font-bold text-brand-plum mb-2">
                Send a Message
              </h3>
              <p className="font-body text-xs text-brand-plum/80 mb-6">
                Fill out the contact details below, and one of our volunteer staff will coordinate with you.
              </p>

              {isSubmitted ? (
                <div className="bg-brand-plum/5 border border-brand-violet/20 p-8 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="h-12 w-12 text-brand-violet mx-auto" />
                  <h4 className="font-heading text-xl font-bold text-brand-plum">Message Dispatched</h4>
                  <p className="text-xs sm:text-sm text-brand-plum/80 font-body">Thank you for contacting Pratheeksha. We have logged your query and will reply shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-body">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2.5 text-xs text-brand-plum outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2.5 text-xs text-brand-plum outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2.5 text-xs text-brand-plum outline-none"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1">Subject</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2.5 text-xs text-brand-plum outline-none"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full bg-brand-beige/50 border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2.5 text-xs text-brand-plum outline-none resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-plum hover:bg-brand-violet text-brand-beige hover:text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Maps Placeholder */}
      <section className="bg-brand-beige border-t border-brand-plum/5">
        <div className="w-full h-[450px] relative overflow-hidden bg-brand-lightgray">
          {/* Custom style to look premium */}
          <iframe
            title="Pratheeksha Foundation Location Map"
            src={organizationDetails.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[20%] contrast-[110%] opacity-90"
          />
        </div>
      </section>
    </>
  );
};
