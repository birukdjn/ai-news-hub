'use client';
import { useFavorites } from '../hooks/useFavorites';
import NewsCard from '../components/NewsCard';
import { motion } from 'framer-motion';

export default function FavoritesClient() {
  const { favorites, removeFavorite, isFavorite, addFavorite } = useFavorites();

  const handleToggleFavorite = (article) => {
    if (isFavorite(article.url)) {
      removeFavorite(article.url);
    } else {
      addFavorite(article);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Your Favorites</h2>
          <p className="text-gray-600 dark:text-gray-300">Saved articles for later</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No favorite articles yet</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {favorites.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`}
                article={article}
                isFavorite={isFavorite(article.url)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}


