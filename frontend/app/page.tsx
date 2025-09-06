'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { Shield, Search, BarChart3, Server, Play, ArrowRight, Star } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "AI Proctoring",
      description: "Advanced AI monitoring ensures exam integrity with real-time behavior analysis and fraud detection."
    },
    {
      icon: Search,
      title: "Plagiarism Detection",
      description: "Sophisticated algorithms detect code similarity and prevent cheating across multiple programming languages."
    },
    {
      icon: BarChart3,
      title: "Real-Time Dashboard",
      description: "Comprehensive analytics and insights help recruiters make data-driven hiring decisions instantly."
    },
    {
      icon: Server,
      title: "Scalable Infrastructure",
      description: "Cloud-native architecture handles thousands of concurrent interviews with 99.9% uptime guarantee."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Technical Recruiter",
      company: "TechCorp",
      quote: "This platform revolutionized our hiring process. We reduced time-to-hire by 60% while maintaining quality.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Michael Rodriguez",
      role: "VP of Engineering",
      company: "StartupXYZ",
      quote: "The AI proctoring is incredibly accurate. We've eliminated cheating while creating a fair experience for candidates.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Emily Johnson",
      role: "Head of Talent",
      company: "InnovateLabs",
      quote: "The analytics dashboard provides insights we never had before. It's like having a data scientist on our hiring team.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0B0F1A] overflow-hidden">
      <Navigation />
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">AI-Powered</span><br />
              <span className="text-white">Interview</span><br />
              <span className="gradient-text">Platform</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Secure. Scalable. Fair online assessments that revolutionize your hiring process with cutting-edge AI technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-full glow-blue transition-all duration-300"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Try Candidate Test
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
          
          {/* Right Side - Code Editor */}
          <div className="flex justify-center lg:justify-end">
            <CodeEditor />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Powerful Features for <span className="gradient-text">Modern Hiring</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Our platform combines AI innovation with practical solutions to streamline your technical recruitment process.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">
              Experience Seamless Interviews with <span className="gradient-text">AI Assistance</span>
            </h2>
            
            <div className="relative max-w-4xl mx-auto">
              <motion.div 
                className="glass-morphism rounded-2xl p-8 aspect-video flex items-center justify-center glow-cyan"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                    <Play className="h-12 w-12 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Interactive Demo</h3>
                  <p className="text-gray-400">Click to see our platform in action</p>
                </div>
              </motion.div>
              
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-2xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-400 ml-2">4.9/5 from 500+ reviews</span>
            </div>
          </motion.div>
          
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                quote={testimonial.quote}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] to-[#111827]"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to <span className="gradient-text">revolutionize</span><br />
              your hiring process?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Join thousands of companies who trust our AI-powered platform to find the best talent efficiently and fairly.
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:from-blue-600 hover:via-cyan-600 hover:to-purple-600 text-white px-12 py-8 text-xl font-bold rounded-full glow-cyan transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
      </section>
    </main>
  );
}