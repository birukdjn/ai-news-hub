import ClientHome from './components/ClientHome';

async function getInitialArticles() {
  try {
    // Use relative URL for internal API calls during build
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-production-url.com' 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/news?country=us&page=1`, {
      // Remove caching during build to avoid issues
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error('API response not ok:', res.status);
      return [];
    }
    
    const data = await res.json();
    return (data.articles || []).filter(a => a.title !== '[Removed]');
  } catch (error) {
    console.error('Error fetching initial articles:', error);
    return [];
  }
}

export default async function Home() {
  let initialArticles = [];
  
  try {
    initialArticles = await getInitialArticles();
  } catch (error) {
    console.error('Failed to get initial articles:', error);
    initialArticles = [];
  }

  return <ClientHome initialArticles={initialArticles} />;
}