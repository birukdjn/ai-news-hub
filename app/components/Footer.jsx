export default function Footer() {
  return (
    <footer className="mt-16 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div>© {new Date().getFullYear()} AI News Hub</div>
        <nav className="flex items-center gap-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/favorites" className="hover:underline">Favorites</a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}


