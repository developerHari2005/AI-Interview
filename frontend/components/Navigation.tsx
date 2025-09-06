"use client";

import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6">
      <nav className="max-w-6xl mx-auto modern-navbar-glass rounded-2xl border border-white/20 shadow-2xl">
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 glow-blue-enhanced shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-30 blur-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold gradient-text-enhanced tracking-tight">InterviewAI</span>
                <span className="text-xs text-cyan-400/80 font-medium tracking-wider">AI-POWERED</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <div className="flex items-center space-x-1 bg-white/5 rounded-xl p-1 backdrop-blur-sm">
                <a
                  href="#features"
                  className="nav-link-modern"
                >
                  Features
                </a>
                <a
                  href="#demo"
                  className="nav-link-modern"
                >
                  Demo
                </a>
                <a
                  href="#testimonials"
                  className="nav-link-modern"
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="nav-link-modern"
                >
                  Pricing
                </a>
              </div>
              
              <div className="ml-6">
                <Link href="/login">
                  <button className="modern-cta-button group">
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10"
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
            <div className="md:hidden border-t border-white/20 mt-4">
              <div className="py-6 space-y-3">
                <a
                  href="#features"
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#demo"
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Demo
                </a>
                <a
                  href="#testimonials"
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </a>
                <div className="pt-4 border-t border-white/10">
                  <Link href="/login">
                    <button className="w-full modern-cta-button-mobile">
                      Get Started
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
