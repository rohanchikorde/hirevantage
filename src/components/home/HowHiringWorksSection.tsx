
import React from 'react';
import { ArrowRight, BriefcaseIcon, CalendarIcon, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowHiringWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-500 dark:text-blue-400 font-medium mb-2 block">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How Technical Hiring Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Our streamlined approach makes hiring top technical talent fast and efficient
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="relative">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div className="mb-6 h-16 flex items-center justify-center">
                <BriefcaseIcon className="w-12 h-12 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 text-center">Define Requirements</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Specify skills, experience level, and other criteria for your ideal candidate
              </p>
            </div>
            
            <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-4">
              <ArrowRight className="w-6 h-6 text-blue-300 dark:text-blue-700" />
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div className="mb-6 h-16 flex items-center justify-center">
                <CalendarIcon className="w-12 h-12 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 text-center">Schedule Interviews</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                We match you with expert technical interviewers and handle all scheduling
              </p>
            </div>
            
            <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-4">
              <ArrowRight className="w-6 h-6 text-blue-300 dark:text-blue-700" />
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div className="mb-6 h-16 flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 text-center">Receive Detailed Reports</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Get comprehensive evaluations and make data-driven hiring decisions
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/request-demo" 
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowHiringWorksSection;
