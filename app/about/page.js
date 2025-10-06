export const metadata = {
  title: 'About | AI News Hub',
  description: 'Purpose, mission, and who built AI News Hub.',
  openGraph: {
    title: 'About | AI News Hub',
    description: 'Purpose, mission, and who built AI News Hub.',
    type: 'website'
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">About AI News Hub</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          AI News Hub curates the latest headlines and provides concise, AI-generated summaries.
          The goal is to help you stay informed quickly, with a clean, fast, and accessible UI.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Who built this?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Built with Next.js App Router, Tailwind CSS, and Framer Motion.
        </p>
        <div className="flex gap-3">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">GitHub</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800">LinkedIn</a>
          <a href="mailto:hello@example.com" className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Email</a>
        </div>
      </div>
    </div>
  );
}


