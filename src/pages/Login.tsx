
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-intervue-600 text-white p-8 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-intervue-400"></div>
          <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-intervue-800"></div>
          <div className="absolute -bottom-32 left-1/3 w-72 h-72 rounded-full bg-intervue-400"></div>
        </div>
        
        <div className="relative max-w-md mx-auto">
          <Link to="/" className="flex items-center space-x-2 mb-12">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-intervue-600 font-bold text-xl">
              I
            </div>
            <span className="text-2xl font-bold">Intervue</span>
          </Link>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Welcome to the future of hiring</h2>
          <p className="text-lg text-white/80 mb-8">
            Streamline your interview process with our all-in-one platform designed for modern hiring teams.
          </p>
          
          <div className="space-y-6">
            {[
              "Centralized candidate management",
              "Expert interviewer network",
              "Real-time analytics and insights"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="md:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-intervue-600 flex items-center justify-center text-white font-bold text-xl">
                I
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Intervue</span>
            </Link>
          </div>
          
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
