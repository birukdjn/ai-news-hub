export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const country = searchParams.get('country') || 'us';

  if (!process.env.NEWSAPI_KEY) {
    return Response.json({ error: 'NewsAPI key not configured' }, { status: 500 });
  }

  try {
    const baseUrl = query 
      ? 'https://newsapi.org/v2/everything'
      : 'https://newsapi.org/v2/top-headlines';

    const params = new URLSearchParams({
      ...(query && { q: query }),
      ...(category && { category }),
      ...(!query && { country }),
      apiKey: process.env.NEWSAPI_KEY,
      pageSize: '30'
    });

    const response = await fetch(`${baseUrl}?${params}`);
    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error('News API error:', error);
    return Response.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}