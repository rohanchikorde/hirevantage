
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110 duration-300">
                H
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300">Hirevantage</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
              Hirevantage streamlines the technical hiring process with expert interviewers, standardized assessments, and data-driven insights to help you build exceptional teams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/for-companies" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  For Enterprises
                </Link>
              </li>
              <li>
                <Link to="/for-interviewers" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  For Interviewers
                </Link>
              </li>
              <li>
                <Link to="/for-candidates" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  For Candidates
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Hirevantage. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <Link to="/terms" className="text-sm text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-sm text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
