'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NewsCard from './NewsCard';
import SkeletonCard from './SkeletonCard';
import { useFavorites } from '../hooks/useFavorites';
import CategoryMenu from './CategoryMenu';
import { useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';

export default function ClientHome({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const MAX_PAGES = 5;
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setHasMore(true);
    setPage(1);
    const q = searchParams?.get('q') || '';
    const cat = searchParams?.get('category') || '';
    if (q) setSearchTerm(q);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const fetchNews = async (search = '', category = '', pageNum = 1, append = false) => {
    if (!append) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    try {
      const params = new URLSearchParams({
        country: 'us',
        ...(search && { q: search }),
        ...(category && { category }),
        page: String(pageNum),
      });
      const response = await fetch(`/api/news?${params}`);
      const data = await response.json();
      if (data.articles) {
        setError('');
        const cleaned = data.articles.filter((article) => article.title !== '[Removed]');
        setArticles((prev) => (append ? [...prev, ...cleaned] : cleaned));
        if (cleaned.length === 0 || pageNum >= MAX_PAGES) setHasMore(false);
      } else {
        setError(data.error || 'Failed to load news');
        if (!append) setArticles([]);
        setHasMore(false);
      }
    } catch (error) {
      setError('Unable to reach the news service. Please try again later.');
      if (!append) setArticles([]);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNews(searchTerm, selectedCategory, 1, false);
  }, [searchTerm, selectedCategory]);

  const handleToggleFavorite = (article) => {
    if (isFavorite(article.url)) {
      removeFavorite(article.url);
    } else {
      addFavorite(article);
    }
  };

  const handleSearch = (searchTerm) => {
    router.push(`/?q=${searchTerm}`);
  };

  const handleLoadMore = () => {
    if (!loading && !isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(searchTerm, selectedCategory, nextPage, true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-2 text-gray-900 dark:text-white">AI News Hub</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Your daily digest of AI advancements</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mb-8">
          <CategoryMenu
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Main Content - Full Width */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {articles.map((article, index) => (
                <NewsCard
                  key={`${article.url}-${index}`}
                  article={article}
                  isFavorite={isFavorite(article.url)}
                  onToggleFavorite={handleToggleFavorite}
                  trending={index < 3}
                />
              ))}
            </motion.div>
          )}

          {!loading && error && (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found</p>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !loading && articles.length > 0 && (
            <div className="text-center mt-12 mb-8">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : (
                  'Load More Articles'
                )}
              </button>
            </div>
          )}

          {/* Loading more skeleton cards */}
          {isLoadingMore && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!hasMore && !loading && articles.length > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">You've reached the end of the news.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}