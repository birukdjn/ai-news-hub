'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import NewsCard from './components/NewsCard';
import LoadingSpinner from './components/LoadingSpinner';
import { useFavorites } from './hooks/useFavorites';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const fetchNews = async (search = '', category = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        country: 'us',
        apiKey: process.env.NEXT_PUBLIC_NEWSAPI_KEY,
        ...(search && { q: search }),
        ...(category && { category })
      });

      const response = await fetch(`/api/news?${params}`);
      const data = await response.json();
      
      if (data.articles) {
        setArticles(data.articles.filter(article => article.title !== '[Removed]'));
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = () => {
    fetchNews(searchTerm, selectedCategory);
  };

  const handleToggleFavorite = (article) => {
    if (isFavorite(article.url)) {
      removeFavorite(article.url);
    } else {
      addFavorite(article);
    }
  };

  const displayArticles = showFavorites ? favorites : articles;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar onShowFavorites={() => setShowFavorites(!showFavorites)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            {showFavorites ? 'Your Favorite News' : 'Latest News'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {showFavorites 
              ? `Your saved articles (${favorites.length})`
              : 'Stay updated with AI-powered summaries'
            }
          </p>
        </div>

        {!showFavorites && (
          <>
            <div className="mb-8">
              <SearchBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
              />
            </div>

            <CategoryFilter 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayArticles.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`}
                article={article}
                isFavorite={isFavorite(article.url)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </motion.div>
        )}

        {!loading && displayArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {showFavorites ? 'No favorite articles yet' : 'No articles found'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}