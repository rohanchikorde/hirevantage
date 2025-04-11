
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TrustedBySection from '@/components/home/TrustedBySection';
import HowHiringWorksSection from '@/components/home/HowHiringWorksSection';
import StatsSection from '@/components/home/StatsSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToAction from '@/components/home/CallToAction';
import useAnimateOnScroll from '@/hooks/useAnimateOnScroll';

const Index: React.FC = () => {
  // Use the animation hook
  useAnimateOnScroll();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <TrustedBySection />
        <Features />
        <HowHiringWorksSection />
        <StatsSection />
        <HowItWorks />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
