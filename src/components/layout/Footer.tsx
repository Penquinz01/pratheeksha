import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
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
                  {organizationDetails.address.city}, {organizationDetails.address.district},{' '}
                  {organizationDetails.address.state} - {organizationDetails.address.pin}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-brand-violet-light shrink-0" />
                <a href={`tel:${organizationDetails.phoneHref}`} className="hover:text-brand-violet-light transition-colors">
                  {organizationDetails.phone}
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
