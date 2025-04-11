
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  // Animation on scroll functionality
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800/50">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-r from-blue-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 animate-fade-in hover:scale-105 transition-transform duration-300">
            <span className="text-blue-700 dark:text-blue-400 text-sm font-medium">Revolutionizing Technical Interviews</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight animate-fade-in">
            Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Hiring Process</span> With Expert-Led Interviews
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            Connect with specialized interviewers, streamline candidate assessments, and make data-driven hiring decisions—all in one powerful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <Link to="/register" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white flex items-center justify-center space-x-2 px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
              <span>Start Hiring Better</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/request-demo" className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-2 px-8 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 font-medium">
              <span>Request a Demo</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start space-x-3 bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg hover:shadow-md transition-all duration-300">
              <CheckCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Elite Interviewers</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Access to industry specialists</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg hover:shadow-md transition-all duration-300">
              <CheckCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Data-Driven Insights</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Make confident hiring decisions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg hover:shadow-md transition-all duration-300">
              <CheckCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Time Efficiency</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Cut hiring time by up to 40%</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard preview */}
        <div className="mt-20 animate-on-scroll">
          <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-2 md:p-3 max-w-5xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-teal-400/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-400/20 rounded-full blur-xl"></div>
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden relative z-10">
              <div className="h-8 bg-slate-100 dark:bg-slate-700 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="h-[300px] md:h-[400px] bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="public/lovable-uploads/d742ebfb-ef72-4744-bd55-e5137f87c8ed.png" 
                    alt="Hirevantage Platform Dashboard" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
