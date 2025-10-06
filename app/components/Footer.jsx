'use client';
import SubscribeForm from './SubscribeForm';

export default function Footer() {
  return (
    <footer className="mt-16 border-t dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Subscribe Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Stay Updated with AI News
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Get the latest AI developments delivered to your inbox weekly
          </p>
          <SubscribeForm />
        </div>

        {/* Footer Links */}
        <div className="border-t dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>© {new Date().getFullYear()} AI News Hub. All rights reserved.</div>
          <nav className="flex items-center gap-6">
            <a href="/" className="hover:underline hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
            <a href="/about" className="hover:underline hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
            <a href="/favorites" className="hover:underline hover:text-gray-900 dark:hover:text-white transition-colors">Favorites</a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}