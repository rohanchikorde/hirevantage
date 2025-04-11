
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  Clock, 
  Users, 
  Calendar, 
  FileSearch, 
  BarChart3,
  BriefcaseIcon,
  ChartBar,
  Award
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const RequestDemo: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    teamSize: '',
    goals: '',
    hearAbout: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Demo request received!",
        description: "Our team will contact you shortly to schedule your personalized demo.",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800/50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                  Book Your Personalized Demo
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  See how our Interview-as-a-Service platform can transform your technical hiring process and help you hire top engineering talent 10x faster.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white text-lg">30-Minute Personalized Demo</h3>
                      <p className="text-slate-600 dark:text-slate-400">See how our platform can adapt to your specific hiring needs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white text-lg">Expert Consultation</h3>
                      <p className="text-slate-600 dark:text-slate-400">Chat with technical hiring specialists who understand your industry</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <FileSearch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white text-lg">Tailored Recommendations</h3>
                      <p className="text-slate-600 dark:text-slate-400">Get customized strategies to optimize your technical interview process</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 md:p-8">
                  <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Schedule Your Demo</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Work Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="workEmail"
                        name="workEmail"
                        type="email"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your company name"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleChange}
                          placeholder="Your job title"
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="teamSize">Team Size</Label>
                        <select
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="" disabled>Select team size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501+">501+ employees</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="goals">What are your hiring goals?</Label>
                      <Textarea
                        id="goals"
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        placeholder="Tell us more about your technical hiring needs and challenges"
                        rows={4}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hearAbout">How did you hear about us?</Label>
                      <Input
                        id="hearAbout"
                        name="hearAbout"
                        value={formData.hearAbout}
                        onChange={handleChange}
                        placeholder="Google, LinkedIn, Referral, etc."
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Demo'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-4">
                      By submitting this form, you agree to our <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Our Interview-as-a-Service Platform?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                We streamline your technical hiring process from end to end
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                  <Calendar className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Simplified Scheduling</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Our automated calendar integration eliminates scheduling hassles, allowing you to conduct more interviews with less administrative work.
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                  <BriefcaseIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Expert Interviewers</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Access a network of industry specialists with deep domain expertise to conduct thorough technical assessments of your candidates.
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                  <ChartBar className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Data-Driven Insights</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Make confident hiring decisions with comprehensive analytics and detailed performance metrics for every candidate.
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                  <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Time Efficiency</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Reduce your time-to-hire by up to 40% with streamlined workflows and parallel candidate assessments.
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                  <Award className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Consistent Quality</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Our standardized interview methodology ensures fair and objective evaluation of all candidates.
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                  <BarChart3 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Scalable Solution</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Whether you're hiring one engineer or building an entire team, our platform scales to meet your needs.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <div className="inline-block mb-10 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <img src="public/lovable-uploads/b54002b7-7dd5-46f2-9dbd-c6bc5684c4cd.png" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" />
                    <img src="public/lovable-uploads/3d70235c-edbf-4061-bbbc-859abf6c2541.png" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" />
                    <img src="public/lovable-uploads/5e22158d-dced-4a78-93d6-cc49ca0f1bab.png" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" />
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Trusted by 500+ companies</span>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Ready to transform your technical hiring process?
              </h3>
              <Button 
                onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white px-8 py-6 rounded-lg shadow-md hover:shadow-lg text-lg"
              >
                Schedule Your Demo Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RequestDemo;
