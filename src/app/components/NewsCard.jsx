import Link from "next/link";

export default function NewsCard({ article }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="rounded-md w-full h-48 object-cover"
        />
      )}
      <h2 className="text-lg font-semibold mt-3">{article.title}</h2>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{article.description}</p>

      <Link
        href={`/article/${encodeURIComponent(article.title)}`}
        className="inline-block mt-3 text-blue-500"
      >
        Read more →
      </Link>
    </div>
  );
}
