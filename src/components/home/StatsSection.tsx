
import React from 'react';
import { Clock, Award, Users, Star } from 'lucide-react';

// Stats data
const stats = [
  {
    value: "40%",
    label: "Time-to-hire reduction",
    icon: <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
  },
  {
    value: "87%",
    label: "Interview consistency",
    icon: <Award className="w-6 h-6 text-blue-500 dark:text-blue-400" />
  },
  {
    value: "500+",
    label: "Specialized interviewers",
    icon: <Users className="w-6 h-6 text-blue-500 dark:text-blue-400" />
  },
  {
    value: "92%",
    label: "Client satisfaction rate",
    icon: <Star className="w-6 h-6 text-blue-500 dark:text-blue-400" />
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-500 dark:text-blue-400 font-medium mb-2 block">By The Numbers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Real Results That Matter
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Our platform delivers measurable improvements to your technical hiring process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</h3>
              <p className="text-slate-600 dark:text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
