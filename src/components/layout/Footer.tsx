import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { organizationDetails, fullTagline } from '../../data/content';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Programs', path: '/programs' },
    { name: 'Six Pillars', path: '/six-pillars' },
    { name: 'Photo Gallery', path: '/gallery' },
    { name: 'Success Stories', path: '/stories' },
  ];

  const supportLinks = [
    { name: 'Partner CSR', path: '/partnership' },
    { name: 'Annual Report', path: '/annual-report' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-brand-plum text-brand-beige border-t border-brand-plum/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full border-2 border-brand-beige/5 pointer-events-none" />
      <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full border-2 border-brand-beige/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-violet-light" aria-label="Pratheeksha Foundation - home">
              <Logo tone="light" size="h-14" />
            </Link>
            <p className="text-sm text-brand-beige/80 leading-relaxed font-body">
              {fullTagline}
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href={organizationDetails.socials.facebook} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-violet hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a 
                href={organizationDetails.socials.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-violet hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a 
                href={organizationDetails.socials.twitter} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-violet hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href={organizationDetails.socials.youtube} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-violet hover:text-white transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.555a3.002 3.002 0 0 0-2.11 2.108C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.484 20.5 12 20.5 12 20.5s7.516 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="font-heading text-lg text-white font-medium tracking-wide">
              Who We Are
            </h2>
            <ul className="space-y-2.5 text-sm font-body">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-brand-beige/85 hover:text-brand-violet-light hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h2 className="font-heading text-lg text-white font-medium tracking-wide">
              Get Involved
            </h2>
            <ul className="space-y-2.5 text-sm font-body">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-brand-beige/85 hover:text-brand-violet-light hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h2 className="font-heading text-lg text-white font-medium tracking-wide">
              Headquarters
            </h2>
            <ul className="space-y-3 text-sm text-brand-beige/80 font-body">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-brand-violet-light shrink-0 mt-0.5" />
                <span>
                  {organizationDetails.address.line1},<br />
                  {organizationDetails.address.line2},<br />
                  Wayanad, Kerala - {organizationDetails.address.pin}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-brand-violet-light shrink-0" />
                <a href={`tel:${organizationDetails.phone}`} className="hover:text-brand-violet-light transition-colors">
                  {organizationDetails.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-brand-violet-light shrink-0" />
                <a href={`mailto:${organizationDetails.email}`} className="hover:text-brand-violet-light transition-colors break-all">
                  {organizationDetails.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="mt-12 pt-8 border-t border-brand-beige/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-heading italic text-sm text-brand-beige/70 max-w-lg text-center md:text-left">
            &ldquo;{organizationDetails.footerQuote}&rdquo;
          </p>
          <div className="text-xs text-brand-beige/65 font-body text-center md:text-right">
            &copy; {currentYear} {organizationDetails.name}. All Rights Reserved. <br />
            Designed with compassion in Wayanad, Kerala.
          </div>
        </div>
      </div>
    </footer>
  );
};
