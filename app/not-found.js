import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{"The page you're looking for doesn't exist."}</p>
      <Link href="/" className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
        Go Home
      </Link>
    </div>
  );
}