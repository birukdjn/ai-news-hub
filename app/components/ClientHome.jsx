'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NewsCard from './NewsCard';
import LoadingSpinner from './LoadingSpinner';
import SkeletonCard from './SkeletonCard';
import { useFavorites } from '../hooks/useFavorites';
import CategoryMenu from './CategoryMenu';
import { useSearchParams } from 'next/navigation';

export default function ClientHome({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const sentinelRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const MAX_PAGES = 5;
  const searchParams = useSearchParams();

  useEffect(() => {
    setHasMore(true);
    setPage(1);
    // pick up URL params for q and category
    const q = searchParams?.get('q') || '';
    const cat = searchParams?.get('category') || '';
    if (q) setSearchTerm(q);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const fetchNews = async (search = '', category = '', pageNum = 1, append = false) => {
    setLoading(!append);
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
    }
  };

  useEffect(() => {
    // refresh list based on search/category
    fetchNews(searchTerm, selectedCategory, 1, false);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver(async (entries) => {
      const first = entries[0];
      if (first.isIntersecting && !loading && !isLoadingMore && hasMore) {
        setIsLoadingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchNews(searchTerm, selectedCategory, nextPage, true);
        setIsLoadingMore(false);
      }
    }, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [page, loading, isLoadingMore, searchTerm, selectedCategory, hasMore]);

  const handleToggleFavorite = (article) => {
    if (isFavorite(article.url)) {
      removeFavorite(article.url);
    } else {
      addFavorite(article);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">

      {/* top loading bar */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-[60]">
          <div className="h-1 bg-blue-600 animate-pulse w-full" />
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Top Headlines</h2>
          <p className="text-gray-600 dark:text-gray-300">Stay updated with AI-powered summaries</p>
        </div>

        <div className="mb-6">
          <CategoryMenu
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => fetchNews(searchTerm, selectedCategory, 1, false)}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100"
          >
            Refresh News
          </button>
        </div>

        <section className="max-w-2xl mx-auto mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-2">Subscribe for updates</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get the latest AI news highlights weekly. No spam.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">Subscribe</button>
            </form>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
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

            {!loading && articles.length > 0 && (
              <>
                <div className="flex justify-center mt-8">
                  <button
                    onClick={async () => {
                      if (!hasMore) return;
                      setIsLoadingMore(true);
                      const nextPage = page + 1;
                      setPage(nextPage);
                      await fetchNews(searchTerm, selectedCategory, nextPage, true);
                      setIsLoadingMore(false);
                    }}
                    disabled={!hasMore || isLoadingMore}
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoadingMore ? 'Loading...' : hasMore ? 'Load More' : 'No more results'}
                  </button>
                </div>
                <div ref={sentinelRef} className="h-10" />
              </>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
              <h3 className="text-lg font-semibold mb-3">🔥 Top Stories</h3>
              <ul className="space-y-3">
                {articles.slice(0, 5).map((a, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{a.title}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-3">🛠️ AI Tools Spotlight</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>ChatGPT</li>
                <li>Claude</li>
                <li>Midjourney</li>
                <li>Stable Diffusion</li>
              </ul>
            </div>
          </aside>
        </div>

      </main>
    </div>
  );
}


