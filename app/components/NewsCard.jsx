'use client';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Format date consistently for both server and client
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC'
  });
};

export default function NewsCard({ article, isFavorite, onToggleFavorite, trending = false }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(article);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 ${trending ? 'ring-2 ring-blue-500' : ''}`}
    >
      <Link href={`/articles/${encodeURIComponent(article.title)}`}>
        <div className="relative cursor-pointer">
          {!imageError && article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">AI News</span>
            </div>
          )}
          
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isFavorite 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-yellow-500 hover:text-white'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>

          {trending && (
            <div className="absolute top-2 left-2">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                TRENDING
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            
            <div 
              className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
              <span>Read</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
            {article.description || 'No description available.'}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {article.source?.name || 'Unknown Source'}
            </span>
            
            {article.author && (
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                by {article.author}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}