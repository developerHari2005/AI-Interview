'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippet = `#include <iostream>
#include <vector>
#include <algorithm>

class InterviewQuestion {
private:
    std::vector<int> candidates;
    
public:
    void evaluateCandidate(int score) {
        candidates.push_back(score);
        std::sort(candidates.begin(), 
                 candidates.end(), 
                 std::greater<int>());
    }
    
    int getTopCandidate() {
        return candidates.empty() ? 
               -1 : candidates[0];
    }
};`;

export default function CodeEditor() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < codeSnippet.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(codeSnippet.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      // Wait 2 seconds before restarting the animation
      const restartTimer = setTimeout(() => {
        setDisplayedCode('');
        setCurrentIndex(0);
        setIsComplete(false);
      }, 2000);
      return () => clearTimeout(restartTimer);
    }
  }, [currentIndex]);

  return (
    <motion.div 
      className="relative w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="glass-morphism rounded-xl p-6 glow-blue">
        {/* VS Code Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-sm text-gray-400">interview_solution.cpp</div>
        </div>
        
        {/* Code Content */}
        <div className="font-mono text-sm leading-relaxed">
          <pre className="text-gray-300 whitespace-pre-wrap">
            {displayedCode}
            {!isComplete && <span className="typing-cursor"></span>}
          </pre>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl -z-10"></div>
    </motion.div>
  );
}