import React from 'react';
import { Instagram, Facebook, Linkedin, X } from 'lucide-react';

export const ImprintPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Imprint Leaderboard
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Coming Soon...
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <a
              href="https://x.com/ImprintEsports_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <X size={24} />
              <span className="font-medium">Follow us on X</span>
            </a>
            
            <a
              href="https://www.instagram.com/ImprintEsports/#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
            >
              <Instagram size={24} />
              <span className="font-medium">Follow us on Instagram</span>
            </a>

            <a
              href="https://www.facebook.com/people/Imprint-Esports/61563195342615/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
            >
              <Facebook size={24} />
              <span className="font-medium">Follow us on Facebook</span>
            </a>

            <a
              href="https://www.linkedin.com/company/imprintesports/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600 transition-colors"
            >
              <Linkedin size={24} />
              <span className="font-medium">Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 