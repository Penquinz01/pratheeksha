import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../common/Logo';

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
    { name: 'Partnership', path: '/partnership' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Report', path: '/annual-report' },
    { name: 'Contact', path: '/contact' },
  ];

  const activeLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return isActive 
      ? "text-brand-violet font-semibold after:scale-x-100" 
      : "text-brand-plum/90 hover:text-brand-violet after:scale-x-0";
  };

  return (
    <header 
      style={{ zIndex: 9999 }}
      className={`fixed top-0 left-0 right-0 glass-nav shadow-sm transition-all duration-300 ${
        scrolled 
          ? 'h-16' 
          : 'h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-violet" aria-label="Pratheeksha Foundation - home">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-between flex-1 mx-10 max-w-4xl h-full">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center h-full text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-colors duration-300 whitespace-nowrap px-1 xl:px-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-violet after:origin-center after:transition-transform after:duration-300 ${activeLinkStyle(
                  link.path
                )}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Partner Us Button on the right */}
          <div className="hidden lg:flex items-center shrink-0 h-full">
            <Link
              to="/partnership"
              className="bg-brand-plum text-brand-beige hover:bg-brand-violet hover:text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-md active:scale-95 whitespace-nowrap"
            >
              Partner Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-plum hover:text-brand-violet p-1.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum"
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
            className="lg:hidden bg-brand-warmwhite/98 border-t border-brand-plum/5 shadow-inner absolute top-full left-0 right-0 w-full"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors ${
                    location.pathname === link.path
                      ? 'bg-brand-plum/5 text-brand-violet font-semibold'
                      : 'text-brand-plum hover:bg-brand-plum/5 hover:text-brand-violet'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 px-3">
                <Link
                  to="/partnership"
                  className="block w-full text-center bg-brand-plum text-brand-beige hover:bg-brand-violet hover:text-white py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300"
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
