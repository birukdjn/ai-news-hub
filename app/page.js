import ClientHome from './components/ClientHome';
import { fetchNewsFromApi } from '../lib/newsApi';

export default async function Home() {
  // Server-side fetch of initial headlines for better performance and SEO
  let initialArticles = [];
  try {
    const data = await fetchNewsFromApi({
      query: '',
      category: '',
      country: 'us',
      page: 1,
      pageSize: 24,
      apiKey: process.env.NEWSAPI_KEY,
    });
    initialArticles = (data.articles || []).filter(a => a.title !== '[Removed]');
  } catch {
    initialArticles = [];
  }

  return <ClientHome initialArticles={initialArticles} />;
}