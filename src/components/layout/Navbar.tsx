import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { organizationDetails } from '../../data/content';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Six Pillars', path: '/six-pillars' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'CSR & Partnership', path: '/partnership' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Annual Report', path: '/annual-report' },
    { name: 'Contact', path: '/contact' },
  ];

  const activeLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return isActive 
      ? "text-brand-emerald font-semibold after:scale-x-100" 
      : "text-brand-forest/90 hover:text-brand-emerald after:scale-x-0";
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-nav py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-brand-forest p-1.5 rounded-lg group-hover:bg-brand-emerald transition-colors duration-300">
              <Heart className="h-6 w-6 text-brand-beige" fill="currentColor" />
            </div>
            <div>
              <span className="font-heading text-lg md:text-xl font-bold tracking-tight text-brand-forest group-hover:text-brand-emerald transition-colors duration-300 block leading-tight">
                {organizationDetails.shortName}
              </span>
              <span className="text-[10px] tracking-wider text-brand-forest/70 block uppercase font-body -mt-0.5">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-xs xl:text-sm font-medium tracking-wide uppercase transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-emerald after:origin-center after:transition-transform after:duration-300 ${activeLinkStyle(
                  link.path
                )}`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              to="/partnership"
              className="bg-brand-forest text-brand-beige hover:bg-brand-emerald hover:text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-md active:scale-95"
            >
              Partner Us
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-forest hover:text-brand-emerald focus:outline-none p-1.5 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-brand-warmwhite/98 border-t border-brand-forest/5 shadow-inner"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors ${
                    location.pathname === link.path
                      ? 'bg-brand-forest/5 text-brand-emerald font-semibold'
                      : 'text-brand-forest hover:bg-brand-forest/5 hover:text-brand-emerald'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 px-3">
                <Link
                  to="/partnership"
                  className="block w-full text-center bg-brand-forest text-brand-beige hover:bg-brand-emerald hover:text-white py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  Partner Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
