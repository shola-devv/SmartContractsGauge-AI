'use client';

import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Moon, Sun, Paperclip, Mic, Send } from 'lucide-react';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const controls = useAnimation();
  const router = useRouter();

  const handleSend = async () => {
    if (inputValue.trim()) {
      // Animate the input box floating down
      await controls.start({
        y: 1000,
        opacity: 0,
        transition: { duration: 0.8, ease: 'easeInOut' }
      });
      
      // Navigate to home page
      router.push('/home');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-slate-900' : 'bg-surface'
    }`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-2 sm:py-4 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primaryLight via-primary to-primaryDark rounded-neu shadow-neu dark:shadow-neuDark flex items-center justify-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-surfaceLight rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-sm sm:text-lg font-bold bg-gradient-to-r from-primary to-primaryDark bg-clip-text text-transparent">
              Dazl.
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-block text-surfaceDark dark:text-gray-300 hover:text-primary dark:hover:text-primaryLight transition-colors font-medium text-sm sm:text-base">
              Features
            </button>
            <button className="hidden sm:inline-block text-surfaceDark dark:text-gray-300 hover:text-primary dark:hover:text-primaryLight transition-colors font-medium text-sm sm:text-base">
              Pricing
            </button>
            <button className="hidden md:inline-block text-surfaceDark dark:text-gray-300 hover:text-primary dark:hover:text-primaryLight transition-colors font-medium text-sm sm:text-base">
              Log in
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-neu shadow-neu dark:shadow-neuDark hover:shadow-neuInset dark:hover:shadow-neuInsetDark transition-all duration-300 active:shadow-neuInset dark:active:shadow-neuInsetDark"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-primaryLight" />
              ) : (
                <Moon className="w-5 h-5 text-surfaceDark" />
              )}
            </button>

            <button className="bg-gradient-to-br from-primaryDark via-primary to-primaryLight text-surfaceLight px-4 py-2 sm:px-6 sm:py-2 rounded-neu font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-neu dark:shadow-neuDark hover:shadow-neuInset dark:hover:shadow-neuInsetDark active:shadow-neuInset dark:active:shadow-neuInsetDark">
              Start Building for free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-20 sm:pt-32 pb-8 sm:pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight px-4">
              <span className="text-surfaceDark dark:text-white">Build something </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primaryLight via-primary to-primaryDark bg-clip-text text-transparent">
                  dazzling
                </span>
                <motion.span
                  className="absolute -right-2 top-0 text-primary"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  ✨
                </motion.span>
              </span>
              <span className="text-surfaceDark dark:text-white">,</span>
              <br />
              <span className="text-surfaceDark dark:text-white">Ship it today.</span>
            </h1>
            
            <div className="max-w-2xl mx-auto flex flex-col gap-2 mb-8">
              <div className="flex items-center justify-center p-2 sm:p-0">
                <p className="text-sm sm:text-base md:text-lg lg:text-lg text-surfaceDark dark:text-gray-300 font-semibold text-center">
                  Turn your ideas into production-ready apps with a single prompt.
                </p>
              </div>
              <div className="flex items-center justify-center p-2 sm:p-0">
                <p className="text-sm sm:text-base md:text-lg lg:text-lg text-surfaceDark/80 dark:text-gray-400 font-semibold text-center">
                  No code. No limits. Just pure creation
                </p>
              </div>
            </div>
          </div>

          {/* Input Box with Animation */}
          <motion.div
            animate={controls}
            className="max-w-3xl mx-auto relative"
          >
            {/* Decorative curved line */}
            <div className="absolute -left-8 sm:-left-16 md:-left-24 top-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 pointer-events-none hidden lg:block">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M 150 10 Q 100 50, 100 100"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  className="text-primaryLight opacity-60"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Decorative curved line - right side */}
            <div className="absolute -right-8 sm:-right-16 md:-right-24 bottom-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 pointer-events-none hidden lg:block">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M 50 100 Q 100 150, 150 190"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  className="text-primaryLight opacity-60"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Input Container */}
            <div className="relative bg-surface dark:bg-slate-800 rounded-neu shadow-neu dark:shadow-neuDark p-3 sm:p-4 md:p-6 transition-all duration-300">
              <div className="mb-3 sm:mb-4 md:mb-6">
                <label className="block text-sm sm:text-base md:text-lg font-medium text-surfaceDark dark:text-gray-300 mb-3 sm:mb-4">
                  Describe your app idea and watch it come to life...
                </label>
                
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder=""
                  className="w-full h-32 sm:h-40 md:h-48 px-4 py-3 bg-transparent rounded-neu shadow-neuInset dark:shadow-neuInsetDark focus:shadow-neu dark:focus:shadow-neuDark focus:outline-none resize-none text-surfaceDark dark:text-white placeholder-surfaceShadow dark:placeholder-gray-500 transition-all duration-500 text-sm sm:text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.metaKey) {
                      handleSend();
                    }
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    className="p-2 sm:p-3 rounded-full shadow-neu dark:shadow-neuDark hover:shadow-neuInset dark:hover:shadow-neuInsetDark active:shadow-neuInset dark:active:shadow-neuInsetDark transition-all duration-300"
                    aria-label="Attach file"
                  >
                    <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    className="p-2 sm:p-3 rounded-full shadow-neu dark:shadow-neuDark hover:shadow-neuInset dark:hover:shadow-neuInsetDark active:shadow-neuInset dark:active:shadow-neuInsetDark transition-all duration-300"
                    aria-label="Voice input"
                  >
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-primaryDark via-primary to-primaryLight text-surfaceLight p-2 sm:p-3 rounded-full transition-all duration-300 shadow-neu dark:shadow-neuDark hover:shadow-neuInset dark:hover:shadow-neuInsetDark active:shadow-neuInset dark:active:shadow-neuInsetDark disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputValue.trim()}
                  aria-label="Send"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-surfaceDark dark:text-gray-400"
          >
            <p>Press <kbd className="px-2 py-1 shadow-neu dark:shadow-neuDark rounded text-xs sm:text-sm">⌘</kbd> + <kbd className="px-2 py-1 shadow-neu dark:shadow-neuDark rounded text-xs sm:text-sm">Enter</kbd> to send</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}