
import React from 'react';
import { Clock, Shield, Zap, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseUsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Save Engineering Time",
      description: "Free up your engineers from conducting interviews"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "Reduce Hiring Risks",
      description: "Make confident decisions with thorough assessments"
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Accelerate Hiring",
      description: "Cut your time-to-hire by up to 40%"
    },
    {
      icon: <Target className="w-6 h-6 text-blue-500" />,
      title: "Find the Right Fit",
      description: "Identify candidates with the exact skills you need"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-500 dark:text-blue-400 font-medium mb-2 block">For Engineering Leaders</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Hire 10x Faster With Expert-Led Technical Interviews
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                We help engineering leaders build high-performing teams while saving time and resources on the hiring process.
              </p>
              
              <div className="space-y-5">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm mt-0.5">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{benefit.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Link 
                  to="/request-demo" 
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Request a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
                <img 
                  src="public/lovable-uploads/82f6f44b-4cd4-4594-9bbd-cec58e1a29ec.png" 
                  alt="Hirevantage Platform" 
                  className="w-full" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Comprehensive Interview Platform</h3>
                    <p className="text-white/90">All the tools you need to streamline your technical hiring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
