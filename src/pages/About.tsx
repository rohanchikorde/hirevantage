
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lightbulb, Sparkles, CheckCircle, Target, Clock, Award, BarChart3 } from 'lucide-react';

const About: React.FC = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Chen",
      position: "CEO & Co-Founder",
      bio: "Previously led technical recruiting at Fortune 500 companies, with 8+ years in HR tech.",
      image: "public/lovable-uploads/b54002b7-7dd5-46f2-9dbd-c6bc5684c4cd.png"
    },
    {
      name: "Michael Rodriguez",
      position: "CTO & Co-Founder",
      bio: "Former engineering leader with experience scaling tech teams from 5 to 150+ engineers.",
      image: "public/lovable-uploads/3d70235c-edbf-4061-bbbc-859abf6c2541.png"
    },
    {
      name: "Priya Sharma",
      position: "Head of Product",
      bio: "Product expert with a background in creating HR software used by over 200 enterprises.",
      image: "public/lovable-uploads/5e22158d-dced-4a78-93d6-cc49ca0f1bab.png"
    }
  ];

  // Company values
  const values = [
    {
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
      title: "Innovation",
      description: "We consistently challenge the status quo and embrace emerging technologies."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Collaboration",
      description: "We believe the best solutions emerge when technical and HR teams work seamlessly together."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Excellence",
      description: "We're committed to delivering exceptional quality in everything we do."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-500" />,
      title: "Transparency",
      description: "We build trust through open communication and honest feedback."
    }
  ];

  // Company timeline
  const timeline = [
    {
      year: "2023",
      title: "The Idea",
      description: "Founders identified major inefficiencies in technical interviewing processes."
    },
    {
      year: "2024",
      title: "Development",
      description: "Assembled our core team and built the first version of our platform."
    },
    {
      year: "2025",
      title: "Launch",
      description: "Officially launched Hirevantage to enterprise customers worldwide."
    },
    {
      year: "Future",
      title: "Expansion",
      description: "Continuing to innovate and scale our solution globally."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                About <span className="text-blue-600 dark:text-blue-400">Hirevantage</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8">
                Revolutionizing technical hiring by bringing together HR expertise and engineering excellence.
              </p>
              <Link
                to="/request-demo"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3.5 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-blue-600 dark:text-blue-400 font-medium mb-2 block">Our Mission</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Transforming Technical Hiring
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                  At Hirevantage, we're on a mission to revolutionize how companies hire technical talent. We believe the interview process should be efficient, effective, and fair—creating better outcomes for both companies and candidates.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                  Our platform bridges the gap between HR departments and engineering teams, streamlining communication, standardizing evaluation criteria, and providing valuable data-driven insights that lead to better hiring decisions.
                </p>
                <div className="space-y-4 mt-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-slate-700 dark:text-slate-300">Reduce time-to-hire by up to 40%</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-slate-700 dark:text-slate-300">Improve candidate quality with standardized assessments</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-slate-700 dark:text-slate-300">Free up engineering time while maintaining high standards</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -z-10 top-0 -left-4 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -z-10 -bottom-8 right-0 w-72 h-72 bg-teal-200 dark:bg-teal-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                <img
                  src="public/lovable-uploads/82f6f44b-4cd4-4594-9bbd-cec58e1a29ec.png"
                  alt="Technical hiring process"
                  className="rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-blue-600 dark:text-blue-400 font-medium mb-2 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                From Concept to Reality
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Founded in 2025 by a team of experts with backgrounds in both technical recruitment and software development, Hirevantage was built to address the pain points we experienced firsthand.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                        {item.year}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="h-full w-0.5 bg-blue-200 dark:bg-blue-800 my-2"></div>
                      )}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-blue-600 dark:text-blue-400 font-medium mb-2 block">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Meet the Founders
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Our small but mighty team brings together over 20 years of combined experience in technical recruitment, engineering leadership, and HR technology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-blue-500 dark:border-blue-400"
                  />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-3">{member.position}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Plus an amazing team of engineers, designers, and customer success specialists
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
              >
                Join Our Team <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-blue-600 dark:text-blue-400 font-medium mb-2 block">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                What We Stand For
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                These core principles guide everything we do—from product development to customer interactions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow hover:shadow-md transition-all duration-300">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full w-16 h-16 flex items-center justify-center mb-5 mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 text-center">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Technical Hiring?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join forward-thinking companies already making better technical hires with Hirevantage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/request-demo"
                className="bg-white text-blue-600 hover:bg-slate-100 transition-colors duration-300 font-medium rounded-lg px-8 py-3.5 shadow-lg hover:shadow-xl"
              >
                Request a Demo
              </Link>
              <Link
                to="/pricing"
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 transition-colors duration-300 font-medium rounded-lg px-8 py-3.5"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
