
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { seedSampleData, checkSampleDataExists } from '@/utils/seedData';
import { Button } from '@/components/ui/button';
import { Database } from '@/components/ui/database';
import { toast } from 'sonner';

const Register = () => {
  const { isAuthenticated, redirectToDashboard } = useAuth();
  const navigate = useNavigate();
  const [hasData, setHasData] = useState<boolean | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  
  useEffect(() => {
    // If already authenticated, redirect to the appropriate dashboard
    if (isAuthenticated) {
      redirectToDashboard();
    }
    
    // Check if sample data exists
    const checkData = async () => {
      const exists = await checkSampleDataExists();
      setHasData(exists);
    };
    
    checkData();
  }, [isAuthenticated, redirectToDashboard]);
  
  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const success = await seedSampleData();
      if (success) {
        setHasData(true);
      }
    } catch (error) {
      console.error("Error seeding data:", error);
      toast.error("Failed to seed sample data");
    } finally {
      setIsSeeding(false);
    }
  };

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
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Streamline your interview process</h2>
          <p className="text-lg text-white/80 mb-8">
            Join our network of companies and interviewers to simplify hiring, and make better decisions with data-driven insights.
          </p>
          
          <div className="space-y-6">
            {[
              "Automated candidate matching",
              "Qualified interviewer network",
              "Detailed interview feedback"
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
          
          {/* Sample Data Section */}
          {hasData === false && (
            <div className="mt-10 p-4 bg-white/10 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">No Sample Data Found</h3>
              <p className="text-white/80 mb-3">
                Would you like to seed some sample data for testing?
              </p>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleSeedData}
                disabled={isSeeding}
              >
                {isSeeding ? 'Seeding Data...' : 'Seed Sample Data'}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side - Registration Form */}
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
          
          {/* Mobile-only Sample Data Button */}
          {hasData === false && (
            <div className="md:hidden mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">No Sample Data Found</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-3">
                Would you like to seed some sample data for testing?
              </p>
              <Button
                className="w-full"
                onClick={handleSeedData}
                disabled={isSeeding}
              >
                {isSeeding ? 'Seeding Data...' : 'Seed Sample Data'}
              </Button>
            </div>
          )}
          
          <AuthForm type="register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
