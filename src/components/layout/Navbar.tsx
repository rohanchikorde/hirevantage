
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110 duration-300">
              H
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-500 transition-colors duration-300">Hirevantage</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
              Home
            </Link>
            <div className="relative group">
              <button className="nav-link flex items-center">
                Solutions
                <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="glass-panel p-3 space-y-1">
                  <Link 
                    to="/for-companies" 
                    className="block px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    For Enterprises
                  </Link>
                  <Link 
                    to="/for-interviewers" 
                    className="block px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    For Interviewers
                  </Link>
                  <Link 
                    to="/for-candidates" 
                    className="block px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    For Candidates
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'nav-link-active' : ''}`}>
              Pricing
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>
              About
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium px-4 py-2 rounded-lg transition-colors duration-300">
              Sign in
            </Link>
            <Link to="/request-demo" className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-pulse-slow">
              Request a demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 animate-slide-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="py-2">
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="pl-4 mt-2 space-y-2 border-l border-slate-200 dark:border-slate-800">
                <Link 
                  to="/for-companies" 
                  className="block py-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  For Enterprises
                </Link>
                <Link 
                  to="/for-interviewers" 
                  className="block py-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  For Interviewers
                </Link>
                <Link 
                  to="/for-candidates" 
                  className="block py-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  For Candidates
                </Link>
              </div>
            </div>
            <Link 
              to="/pricing" 
              className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-3">
              <Link 
                to="/login" 
                className="w-full text-center text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-lg py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link 
                to="/request-demo" 
                className="w-full text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request a demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
