"use client";

import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 glow-blue">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">InterviewAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#demo"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Demo
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Pricing
            </a>
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 glow-blue">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#demo"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Demo
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <Link href="/login">
                <button className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 glow-blue">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
