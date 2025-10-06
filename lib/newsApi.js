export async function fetchNewsFromApi({ query = '', category = '', country = 'us', page = 1, pageSize = 24, apiKey }) {
  const baseUrl = query ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/top-headlines';
  const params = new URLSearchParams({
    ...(query && { q: query }),
    ...(category && { category }),
    ...(!query && { country }),
    page: String(page),
    pageSize: String(pageSize),
    apiKey,
  });

  const url = `${baseUrl}?${params}`;
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`NewsAPI ${res.status}`);
      return await res.json();
    } catch (e) {
      lastError = e;
      await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
    }
  }
  throw lastError || new Error('NewsAPI failed');
}


