'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import useTheme from '../hooks/useDarkMode';
import { Sun, Moon, Star, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import { useFavorites } from '../hooks/useFavorites';

const NavLink = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} transition-colors`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleSearch = (searchTerm) => {
    router.push(`/?q=${searchTerm}`);
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const navLinks = (
    <>
      <NavLink href="/" onClick={handleNavLinkClick}>Home</NavLink>
      <NavLink href="/about" onClick={handleNavLinkClick}>About</NavLink>
      <NavLink href="/favorites" onClick={handleNavLinkClick}>
        <div className="relative flex items-center gap-1">
          <Star size={18} />
          <span>Favorites</span>
          {favorites?.length > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-2 py-0.5">
              {favorites.length}
            </span>
          )}
        </div>
      </NavLink>
    </>
  );

  return (
    <nav 
      ref={navRef}
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/60 bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              🧠 AI News Hub
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Navigation - Dark Mode Always Visible */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Flex Column Layout */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4">
            <div className="flex flex-col space-y-2 mb-4">
              {navLinks}
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}