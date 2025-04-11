
import React from 'react';

// Trusted by companies
const trustedCompanies = [
  "public/lovable-uploads/cea52ef0-c483-4fb0-81b0-7b79916692a7.png",
  "public/lovable-uploads/cfd55ffb-3647-4d65-95d1-e32e8bb21830.png"
];

const TrustedBySection: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8 text-sm font-medium uppercase tracking-wide">
          Trusted By Industry Leaders Worldwide
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {trustedCompanies.map((logo, index) => (
            <div 
              key={index}
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <img src={logo} alt="Client logo" className="h-8 md:h-10 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
