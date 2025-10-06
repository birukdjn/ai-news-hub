'use client';

export default function SubscribeForm() {
  return (
    <section className="max-w-2xl mx-auto mb-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-2">Subscribe for updates</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get the latest AI news highlights weekly. No spam.</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
          <button className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
