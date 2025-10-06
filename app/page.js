import ClientHome from './components/ClientHome';

// During build, don't fetch - let client handle it
async function getInitialArticles() {
  if (process.env.NODE_ENV === 'production' && process.env.IS_BUILD_TIME) {
    return [];
  }
  
  try {
    const res = await fetch('http://localhost:3000/api/news?country=us&page=1', {
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return (data.articles || []).filter(a => a.title !== '[Removed]');
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const initialArticles = await getInitialArticles();
  return <ClientHome initialArticles={initialArticles} />;
}