export const metadata = {
  title: 'Contact | AI News Hub',
  description: 'Get in touch with AI News Hub.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Have feedback or ideas? Send a message below.</p>
        <form className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 h-32" placeholder="How can we help?" />
          </div>
          <button type="button" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Send</button>
        </form>
      </div>
    </div>
  );
}


