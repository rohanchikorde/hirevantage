
import React from 'react';
import { Quote } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    quote: "Hirevantage has completely transformed our technical hiring process. We've seen a 35% reduction in time-to-hire and significantly better quality candidates advancing to final rounds.",
    author: "Sarah Johnson",
    title: "VP of Engineering, TechCorp",
    image: "public/lovable-uploads/b54002b7-7dd5-46f2-9dbd-c6bc5684c4cd.png"
  },
  {
    quote: "The expert interviewers at Hirevantage provide consistent, high-quality assessments that our team can trust. It's saved our engineering managers countless hours while improving our hiring decisions.",
    author: "Michael Chen",
    title: "CTO, GrowthScale",
    image: "public/lovable-uploads/3d70235c-edbf-4061-bbbc-859abf6c2541.png"
  },
  {
    quote: "Using Hirevantage gives us access to specialized interviewers we couldn't find internally. The detailed feedback reports help us make confident hiring decisions even for niche technical roles.",
    author: "Elena Rodriguez",
    title: "Head of Talent Acquisition, Innovex",
    image: "public/lovable-uploads/5e22158d-dced-4a78-93d6-cc49ca0f1bab.png"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-500 dark:text-blue-400 font-medium mb-2 block">Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Hear From Our Clients
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Companies of all sizes are transforming their hiring processes with Hirevantage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-on-scroll"
            >
              <div className="flex justify-center mb-6">
                <Quote className="w-10 h-10 text-blue-300 dark:text-blue-500/50" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
