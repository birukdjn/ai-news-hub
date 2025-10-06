export async function getNews() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=eee13f24a2f8496dbe681e555ab69833`
  );
  const data = await res.json();
  return data.articles;
}
