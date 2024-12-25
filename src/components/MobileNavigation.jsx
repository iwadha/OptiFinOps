import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Check initial theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleContactModal = () => {
    document.getElementById('contactModal').classList.remove('hidden');
    closeMenu();
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <img 
          src="/logo.svg" 
          alt="OptiFinOps Logo" 
          className="h-8"
        />

        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          {/* Hamburger Menu */}
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40 overflow-y-auto">
          <nav className="px-4 py-6 space-y-4">
            <a 
              href="#home" 
              className="block py-3 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              onClick={closeMenu}
            >
              Home
            </a>
            <a 
              href="#cost-calculator" 
              className="block py-3 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              onClick={closeMenu}
            >
              Cost Calculator
            </a>
            <a 
              href="#finops-assessment" 
              className="block py-3 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              onClick={closeMenu}
            >
              FinOps Assessment
            </a>
            <a 
              href="#success-stories" 
              className="block py-3 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              onClick={closeMenu}
            >
              Success Stories
            </a>
            <button
              className="w-full py-3 bg-blue-600 text-white rounded-lg mt-4"
              onClick={handleContactModal}
            >
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
