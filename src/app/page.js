import { getNews } from "./lib/newsApi";
import NewsCard from "./components/NewsCard";

export default async function Home() {
  const articles = await getNews();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🧠 AI News Hub
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <NewsCard key={i} article={a} />
        ))}
      </div>
    </main>
  );
}
