import { fetchNewsFromApi } from '../../../lib/newsApi';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const country = searchParams.get('country') || 'us';
  const page = searchParams.get('page') || '1';

  if (!process.env.NEWSAPI_KEY) {
    return Response.json({ error: 'NewsAPI key not configured' }, { status: 500 });
  }

  try {
    const data = await fetchNewsFromApi({
      query,
      category,
      country,
      page: Number(page),
      pageSize: 24,
      apiKey: process.env.NEWSAPI_KEY,
    });
    return Response.json(data);
  } catch (error) {
    console.error('News API error:', error);
    return Response.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}