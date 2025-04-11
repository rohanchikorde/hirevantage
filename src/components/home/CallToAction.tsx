
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto animate-on-scroll">
          Ready to Revolutionize Your Technical Hiring?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-on-scroll">
          Join forward-thinking companies already saving time and making better hires with Hirevantage.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll">
          <Link 
            to="/register" 
            className="bg-white text-blue-600 hover:bg-slate-100 transition-colors duration-300 font-medium rounded-lg px-8 py-3.5 shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </Link>
          <Link 
            to="/request-demo" 
            className="bg-transparent text-white border-2 border-white hover:bg-white/10 transition-colors duration-300 font-medium rounded-lg px-8 py-3.5"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
