'use client';
import { motion } from 'framer-motion';
import { Heart, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewsCard({ article, isFavorite, onToggleFavorite, trending = false }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {article.urlToImage ? (
        <div className="w-full h-48 relative">
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          {trending && (
            <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-red-600 text-white">🔥 Trending</span>
          )}
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
            {article.source?.name || 'Unknown'}
          </span>
          <button
            onClick={() => onToggleFavorite(article)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart 
              size={20} 
              fill={isFavorite ? "currentColor" : "none"} 
              color={isFavorite ? "#ef4444" : "currentColor"}
            />
          </button>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          
          <Link 
            href={`/article/${encodeURIComponent(article.title)}`}
            as={`/article/${encodeURIComponent(article.title)}`}
            className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Read More</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}