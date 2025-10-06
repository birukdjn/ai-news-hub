'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDarkMode } from '../hooks/useDarkMode';
import { Sun, Moon, Star } from 'lucide-react';
import SearchBar from './SearchBar';
import { useFavorites } from '../hooks/useFavorites';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onSearch,
  selectedCategory,
  setSelectedCategory,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDark, toggleDarkMode] = useDarkMode();
  const [localSearch, setLocalSearch] = useState('');
  const [localCategory, setLocalCategory] = useState('');
  const { favorites } = useFavorites();
  const [ask, setAsk] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!ask.trim()) return;
    setAiLoading(true);
    setAiResult('');
    try {
      const res = await fetch('/api/ai-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ask', payload: { question: ask } }),
      });
      const data = await res.json();
      if (data.result) setAiResult(data.result);
    } catch {}
    setAiLoading(false);
  };

  const effectiveSearchTerm = searchTerm !== undefined ? searchTerm : localSearch;
  const effectiveSetSearchTerm = setSearchTerm || setLocalSearch;
  const effectiveOnSearch = onSearch || (() => {
    const q = (searchTerm ?? localSearch).trim();
    const cat = (selectedCategory ?? localCategory) || '';
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat) params.set('category', cat);
    router.push(`${pathname || '/'}${params.toString() ? `?${params}` : ''}`);
  });
  const effectiveSelectedCategory = selectedCategory !== undefined ? selectedCategory : localCategory;
  const effectiveSetSelectedCategory = setSelectedCategory || setLocalCategory;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/60 bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              🧠 AI News Hub
            </Link>
            <div className="flex items-center gap-3 md:hidden">
              <Link
                href="/about"
                className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                About
              </Link>
            <Link
              href="/"
              className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Home
            </Link>
              <Link
                href="/favorites"
                className="relative flex items-center gap-1 bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-3 py-2 rounded-lg font-medium hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-colors"
              >
                <Star size={18} />
                <span>Favorites</span>
                {favorites?.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-2 py-0.5">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="flex-1">
            <SearchBar
              searchTerm={effectiveSearchTerm}
              setSearchTerm={effectiveSetSearchTerm}
              onSearch={effectiveOnSearch}
            />
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/about"
              className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className="relative flex items-center gap-1 bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-3 py-2 rounded-lg font-medium hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-colors"
            >
              <Star size={18} />
              <span>Favorites</span>
              {favorites?.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-2 py-0.5">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <form onSubmit={handleAsk} className="w-full md:w-auto">
            <div className="relative">
              <input
                value={ask}
                onChange={(e) => setAsk(e.target.value)}
                placeholder="Ask AI about AI news..."
                className="w-full md:w-80 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                {aiLoading ? '...' : 'Ask'}
              </button>
            </div>
            {aiResult && (
              <div className="mt-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 max-h-40 overflow-auto">
                {aiResult}
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}