
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Your pricing request has been submitted. We'll be in touch shortly!");
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 p-10 rounded-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Build a <span className="text-blue-600 dark:text-blue-400">best-in-class</span> tech team
              </h2>
              
              <ul className="space-y-6 mt-8">
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                    ⚡
                  </div>
                  <span className="text-lg text-slate-800 dark:text-slate-200">All-in-one interview platform</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                    ⚡
                  </div>
                  <span className="text-lg text-slate-800 dark:text-slate-200">Unlimited interview capacity</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                    ⚡
                  </div>
                  <span className="text-lg text-slate-800 dark:text-slate-200">Industry-specific expertise</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                    ⚡
                  </div>
                  <span className="text-lg text-slate-800 dark:text-slate-200">Tailored hiring solutions</span>
                </li>
              </ul>
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Scale your tech team with Hirevantage
                </h3>
                <button className="text-slate-400 hover:text-slate-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number <span className="text-red-500">*</span></Label>
                  <div className="flex gap-2">
                    <div className="w-24">
                      <div className="flex items-center border border-input bg-background rounded-md px-3 h-10">
                        <span className="text-sm text-slate-600 dark:text-slate-300">IN +91</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" className="ml-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      required 
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Your company size <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex">
                      <input type="radio" id="size-1-29" name="company-size" value="1-29" className="sr-only peer" required />
                      <label htmlFor="size-1-29" className="flex items-center justify-center w-full py-2.5 text-sm font-medium rounded-md border border-slate-200 cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700 dark:peer-checked:bg-blue-900/20">
                        1-29
                      </label>
                    </div>
                    <div className="flex">
                      <input type="radio" id="size-30-249" name="company-size" value="30-249" className="sr-only peer" />
                      <label htmlFor="size-30-249" className="flex items-center justify-center w-full py-2.5 text-sm font-medium rounded-md border border-slate-200 cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700 dark:peer-checked:bg-blue-900/20">
                        30-249
                      </label>
                    </div>
                    <div className="flex">
                      <input type="radio" id="size-250-4999" name="company-size" value="250-4999" className="sr-only peer" />
                      <label htmlFor="size-250-4999" className="flex items-center justify-center w-full py-2.5 text-sm font-medium rounded-md border border-slate-200 cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700 dark:peer-checked:bg-blue-900/20">
                        250-4999
                      </label>
                    </div>
                    <div className="flex">
                      <input type="radio" id="size-5000+" name="company-size" value="5000+" className="sr-only peer" />
                      <label htmlFor="size-5000+" className="flex items-center justify-center w-full py-2.5 text-sm font-medium rounded-md border border-slate-200 cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700 dark:peer-checked:bg-blue-900/20">
                        5000+
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-black dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-medium rounded-lg py-3 px-4 flex items-center justify-center gap-2"
                  >
                    Request Pricing
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
