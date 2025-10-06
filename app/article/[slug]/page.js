'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Calendar, ExternalLink } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);
      try {
        // In a real app, you'd fetch the specific article by ID
        // For demo, we'll use the first article from top headlines
        const response = await fetch('/api/news?country=us');
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          setArticle(data.articles[0]);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [params.slug]);

  const generateAISummary = async () => {
    if (!article) return;
    
    setSummaryLoading(true);
    try {
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article }),
      });

      const data = await response.json();
      if (data.summary) {
        setAiSummary(data.summary);
      }
    } catch (error) {
      console.error('Error generating AI summary:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!article) return;
    
    if (isFavorite(article.url)) {
      removeFavorite(article.url);
    } else {
      addFavorite(article);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <button 
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-6 hover:underline"
        >
          <ArrowLeft size={20} />
          <span>Back to News</span>
        </button>

        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {article.urlToImage && (
            <img 
              src={article.urlToImage} 
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
                  {article.source?.name || 'Unknown'}
                </span>
                <div className="flex items-center space-x-2 mt-2 text-gray-500 dark:text-gray-400">
                  <Calendar size={16} />
                  <span className="text-sm">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleToggleFavorite}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart 
                  size={24} 
                  fill={isFavorite(article.url) ? "currentColor" : "none"} 
                  color={isFavorite(article.url) ? "#ef4444" : "currentColor"}
                />
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {article.description}
            </p>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-7">
                {article.content?.replace(/\[\+\d+ chars\]/g, '') || 
                 'Full content not available. Please visit the original source.'}
              </p>
            </div>

            <div className="border-t dark:border-gray-700 pt-6 mb-8">
              <h3 className="text-xl font-bold mb-4">AI Summary</h3>
              
              {!aiSummary ? (
                <button
                  onClick={generateAISummary}
                  disabled={summaryLoading}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {summaryLoading ? 'Generating...' : 'Generate AI Summary'}
                </button>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 whitespace-pre-line">
                    {aiSummary}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t dark:border-gray-700 pt-6">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Read Full Article</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}