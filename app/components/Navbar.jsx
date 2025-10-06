'use client';
import { useDarkMode } from '../hooks/useDarkMode';
import { Sun, Moon, Star } from 'lucide-react';

export default function Navbar({ onShowFavorites }) {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            AI News Hub
          </h1>          
          <div className="flex items-center space-x-4">
            <button
              onClick={onShowFavorites}
              className="flex items-center space-x-1 bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-3 py-2 rounded-lg font-medium hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-colors"
            >
              <Star size={18} />
              <span>Favorites</span>
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}