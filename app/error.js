'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl">{error?.message || 'An unexpected error occurred. Please try again.'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}


