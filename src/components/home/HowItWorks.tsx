
import React, { useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Define Your Requirements',
    description: 'Specify the technical skills, experience level, and key competencies needed for your open positions.',
    points: [
      'Custom assessment templates',
      'Role-specific question banks',
      'Skill priority mapping'
    ],
    image: 'public/lovable-uploads/52d288ed-0f79-44f5-9827-676a71c09c5b.png'
  },
  {
    number: '02',
    title: 'Match With Expert Interviewers',
    description: 'Our AI pairs your requirements with interviewers who have deep expertise in your specific domain.',
    points: [
      'Specialized technical reviewers',
      'Industry-specific experience',
      'Availability matching'
    ],
    image: 'public/lovable-uploads/d2973f83-5a09-4880-8d13-dbfc7366496b.png'
  },
  {
    number: '03',
    title: 'Standardized Assessment Process',
    description: 'Candidates undergo consistent, structured evaluations that accurately measure technical capabilities.',
    points: [
      'Interactive coding sessions',
      'Objective scoring frameworks',
      'Comprehensive feedback reports'
    ],
    image: 'public/lovable-uploads/7a791aa2-777a-4864-b7f7-19798bcd9307.png'
  },
  {
    number: '04',
    title: 'Data-Driven Hiring Decisions',
    description: 'Review detailed analytics and comparative insights to confidently select the best candidates.',
    points: [
      'Side-by-side candidate comparison',
      'Skill gap analysis',
      'Team fit prediction'
    ],
    image: 'public/lovable-uploads/4cf027a4-8b32-4ec8-a983-3ba69536cf05.png'
  }
];

const HowItWorks: React.FC = () => {
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
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-500 dark:text-blue-400 font-medium mb-2 block">Simplified Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How Hirevantage Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            A streamlined approach to technical assessments that saves time and improves hiring quality.
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 animate-on-scroll`}
            >
              {/* Step Content */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="inline-flex items-center px-4 py-1 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-sm font-medium">
                    <span className="text-2xl mr-2 font-bold">{step.number}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">{step.description}</p>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <ul className="space-y-4">
                      {step.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-200">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step Image */}
              <div className="w-full md:w-1/2">
                <div className="relative bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/30 to-teal-200/30 dark:from-blue-700/20 dark:to-teal-700/20 rounded-2xl blur-xl z-0"></div>
                  <div className="relative z-10 overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-700">
                    <img 
                      src={step.image} 
                      alt={`Step ${step.number}: ${step.title}`}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
