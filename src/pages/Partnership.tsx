import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Landmark, CheckCircle, Send } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PlumBackdrop } from '../components/common/PlumBackdrop';
import { csrCards, organizationDetails, partnerNetwork } from '../data/content';

export const Partnership: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    interest: 'safe-home',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <SEO title="Corporate Partnership & CSR - Transparency Matters" />

      {/* Hero Header */}
      <section className="bg-brand-plum text-brand-beige py-24 md:py-32 relative overflow-hidden">
        <PlumBackdrop glow="top-right" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-brand-violet-light font-semibold uppercase tracking-wider text-xs font-body block">
            Partner With Us
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Corporate Alliances & CSR
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-brand-beige/85 max-w-2xl mx-auto leading-relaxed">
            Collaborate with Pratheeksha to execute transparent, highly-audited community rehabilitation projects in Wayanad, Kerala.
          </p>
        </div>
      </section>

      {/* 6 Sponsorship Cards */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Sponsorship Pathways
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-plum">
              Individual & Corporate Sponsorships
            </h2>
            <p className="font-body text-sm text-brand-plum/80 mt-3 leading-relaxed">
              We offer structured pathways where you or your business can fund a specific program. We provide detailed receipts, verification records, and progress photos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {csrCards.map((card) => (
              <motion.div
                key={card.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInUp}
                id={card.id}
                className="bg-white p-8 rounded-3xl border border-brand-plum/5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group scroll-mt-24"
              >
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-brand-violet font-body uppercase tracking-wider bg-brand-violet/10 px-3 py-1 rounded-full">
                      {card.tagline}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-plum group-hover:text-brand-violet transition-colors">
                    {card.title}
                  </h3>
                  <p className="font-body text-sm text-brand-plum/80 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                <div className="pt-6">
                  <a
                    href="#csr-form"
                    className="w-full text-center block bg-brand-plum hover:bg-brand-violet text-brand-beige hover:text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-sm"
                  >
                    Select sponsorship
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Integrity Metrics */}
      <section className="py-24 bg-white border-y border-brand-plum/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block">
                Professional Compliance
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-plum leading-tight">
                Built for Institutional CSR Compliance
              </h2>
              <p className="font-body text-sm sm:text-base text-brand-plum/80 leading-relaxed">
                Pratheeksha Foundation Charitable Society understands the compliance, reporting, and transparency requirements of institutional corporate donors.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded bg-brand-violet/10 text-brand-violet flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-brand-plum text-sm">80G / 12A Certification</h3>
                    <p className="text-xs text-brand-plum/80 font-body">Donations are eligible for tax exemption under section 80G of the Income Tax Act.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded bg-brand-violet/10 text-brand-violet flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-brand-plum text-sm">Meticulous Auditing</h3>
                    <p className="text-xs text-brand-plum/80 font-body">Annual statements of accounts audited by Chartered Accountants and shared openly with stakeholders.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded bg-brand-violet/10 text-brand-violet flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-brand-plum text-sm">Real-Time Media Reporting</h3>
                    <p className="text-xs text-brand-plum/80 font-body">We record raw videos, construction progress snapshots, and beneficiary receipts for every single unit sponsored.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CSR Form Container */}
            <div id="csr-form" className="bg-brand-beige p-8 sm:p-10 rounded-3xl border border-brand-plum/5 shadow-sm scroll-mt-24">
              <h3 className="font-heading text-2xl font-bold text-brand-plum mb-2">
                Partnership Inquiry
              </h3>
              <p className="font-body text-xs text-brand-plum/80 mb-6">
                Tell us about your organization or sponsorship goals. Our coordinator will contact you with proposals, audit docs, and bank details.
              </p>

              {isSubmitted ? (
                <div className="bg-brand-plum/5 border border-brand-violet/20 p-6 rounded-2xl text-center space-y-3">
                  <ShieldCheck className="h-10 w-10 text-brand-violet mx-auto" />
                  <h4 className="font-heading font-bold text-brand-plum">Inquiry Received</h4>
                  <p className="text-xs text-brand-plum/80 font-body">Thank you for reaching out. We will get back to your organization within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Your Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Organization Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Corporate Email</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-white border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Phone Number</label>
                      <input
                        type="tel"
                        required
                        className="w-full bg-white border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Area of Interest</label>
                    <select
                      className="w-full bg-white border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2.5 text-xs font-body text-brand-plum outline-none"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="safe-home">Safe Home Mission (Housing)</option>
                      <option value="education-promise">Education Promise (Scholarships)</option>
                      <option value="health-relief">Healthcare & Palliative Care</option>
                      <option value="adopt-family">Adopt-a-Family Ration Drive</option>
                      <option value="livelihood">Capacity Livelihood Grants</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-plum/80 mb-1 font-body">Message</label>
                    <textarea
                      rows={3}
                      className="w-full bg-white border border-brand-plum/10 focus:border-brand-violet rounded-lg px-3 py-2 text-xs font-body text-brand-plum outline-none resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-plum hover:bg-brand-violet text-brand-beige hover:text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners — text-only roster. We hold no logo usage rights, and the
          names are intentionally not linked to any external site. */}
      <section className="py-24 bg-brand-warmwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-violet font-semibold uppercase tracking-wider text-xs font-body block mb-2">
              Working Together
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-plum">
              Our Partners
            </h2>
            <p className="font-body text-sm text-brand-plum/80 mt-3 leading-relaxed">
              Our programs run on a network of local shops, academies, trusts, and hospitals who extend their services to the families we support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerNetwork.map((group) => (
              <div
                key={group.heading}
                className="bg-white p-6 rounded-2xl border border-brand-plum/5 shadow-sm"
              >
                <h3 className="font-heading text-lg font-bold text-brand-plum leading-tight mb-5">
                  {group.heading}
                </h3>
                <ul className="space-y-3">
                  {group.partners.map((partner) => (
                    <li
                      key={partner.name}
                      className="border-b border-brand-plum/5 pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="font-body text-sm font-semibold text-brand-plum block leading-snug">
                        {partner.name}
                      </span>
                      {partner.descriptor && (
                        <span className="font-body text-xs text-brand-plum/60 italic block mt-1 leading-relaxed">
                          {partner.descriptor}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Account Details Card */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 rounded-3xl border border-brand-plum/5 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 text-brand-violet">
              <Landmark className="h-6 w-6" />
              <h3 className="font-heading text-2xl font-bold text-brand-plum">
                Direct Donation Credentials
              </h3>
            </div>
            <p className="font-body text-sm text-brand-plum/80 leading-relaxed">
              If you wish to make a direct transfer, you can execute a bank deposit or online NEFT/RTGS transaction. Please email us the transaction screenshot to receive the 80G tax exemption receipt.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-brand-beige/50 p-6 rounded-2xl border border-brand-plum/5 text-xs sm:text-sm font-body text-brand-plum">
              <div className="space-y-1.5">
                <div><strong>Account Name:</strong> {organizationDetails.name}</div>
                <div><strong>Bank Name:</strong> Federal Bank, Kalpetta Branch</div>
                <div><strong>Account Number:</strong> 12340200056789</div>
              </div>
              <div className="space-y-1.5">
                <div><strong>IFSC Code:</strong> FDRL0001234</div>
                <div><strong>Account Type:</strong> Current Account</div>
                <div><strong>FCRA Reg No:</strong> 059430219 (Foreign Grants)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
