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

  // Render code with proper syntax highlighting
  const renderHighlightedCode = (code: string) => {
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      const renderLine = (text: string) => {
        const elements = [];
        let remaining = text;
        let key = 0;

        // Process the line character by character to apply syntax highlighting
        while (remaining.length > 0) {
          let matched = false;

          // Keywords (blue)
          if (remaining.match(/^(#include|class|private|public|void|int|return|std)\b/)) {
            const match = remaining.match(/^(#include|class|private|public|void|int|return|std)\b/);
            elements.push(<span key={key++} className="text-[#569cd6]">{match[1]}</span>);
            remaining = remaining.slice(match[1].length);
            matched = true;
          }
          // Include brackets (orange)
          else if (remaining.match(/^<[^>]+>/)) {
            const match = remaining.match(/^<[^>]+>/);
            elements.push(<span key={key++} className="text-[#ce9178]">{match[0]}</span>);
            remaining = remaining.slice(match[0].length);
            matched = true;
          }
          // Types and STL (teal)
          else if (remaining.match(/^(vector|algorithm|sort|greater)\b/)) {
            const match = remaining.match(/^(vector|algorithm|sort|greater)\b/);
            elements.push(<span key={key++} className="text-[#4ec9b0]">{match[1]}</span>);
            remaining = remaining.slice(match[1].length);
            matched = true;
          }
          // Scope resolution (teal)
          else if (remaining.match(/^::/)) {
            elements.push(<span key={key++} className="text-[#4ec9b0]">::</span>);
            remaining = remaining.slice(2);
            matched = true;
          }
          // Functions and variables (yellow)
          else if (remaining.match(/^(InterviewQuestion|evaluateCandidate|getTopCandidate|candidates|push_back|begin|end|empty)\b/)) {
            const match = remaining.match(/^(InterviewQuestion|evaluateCandidate|getTopCandidate|candidates|push_back|begin|end|empty)\b/);
            elements.push(<span key={key++} className="text-[#dcdcaa]">{match[1]}</span>);
            remaining = remaining.slice(match[1].length);
            matched = true;
          }
          // Numbers (light green)
          else if (remaining.match(/^-?\d+/)) {
            const match = remaining.match(/^-?\d+/);
            elements.push(<span key={key++} className="text-[#b5cea8]">{match[0]}</span>);
            remaining = remaining.slice(match[0].length);
            matched = true;
          }
          
          if (!matched) {
            elements.push(<span key={key++} className="text-[#d4d4d4]">{remaining[0]}</span>);
            remaining = remaining.slice(1);
          }
        }
        
        return elements;
      };

      return (
        <div key={lineIndex} className="leading-relaxed">
          {renderLine(line)}
        </div>
      );
    });
  };

  return (
    <motion.div 
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="vscode-editor-container rounded-xl overflow-hidden glow-blue-enhanced">
        {/* VS Code Title Bar */}
        <div className="vscode-title-bar flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#ff5f57] rounded-full hover:bg-[#ff5f57]/80 transition-colors"></div>
              <div className="w-3 h-3 bg-[#ffbd2e] rounded-full hover:bg-[#ffbd2e]/80 transition-colors"></div>
              <div className="w-3 h-3 bg-[#28ca42] rounded-full hover:bg-[#28ca42]/80 transition-colors"></div>
            </div>
            <div className="text-sm text-[#cccccc] font-medium">interview_solution.cpp</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 text-[#cccccc] opacity-60">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* VS Code Tab Bar */}
        <div className="vscode-tab-bar flex border-b border-[#2d2d30]">
          <div className="vscode-tab-active flex items-center px-4 py-2 space-x-2">
            <svg className="w-4 h-4 text-[#519aba]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
            </svg>
            <span className="text-sm text-[#cccccc]">interview_solution.cpp</span>
            <div className="text-[#cccccc] opacity-60 hover:opacity-100 cursor-pointer ml-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* VS Code Editor Content */}
        <div className="vscode-editor-content p-6 min-h-[400px]">
          <div className="flex">
            {/* Line Numbers */}
            <div className="vscode-line-numbers pr-4 text-right select-none min-w-[40px]">
              {displayedCode.split('\n').map((_, i) => (
                <div key={i} className="text-[#858585] text-sm leading-relaxed font-mono">
                  {i + 1}
                </div>
              ))}
            </div>
            
            {/* Code Content */}
            <div className="flex-1 font-mono text-sm overflow-hidden">
              <div className="text-[#d4d4d4] whitespace-pre">
                {renderHighlightedCode(displayedCode)}
                {!isComplete && <span className="vscode-cursor">|</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-2xl -z-10"></div>
    </motion.div>
  );
}