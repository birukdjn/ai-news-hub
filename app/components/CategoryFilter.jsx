'use client';

const categories = [
  'All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'
];

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category === 'All' ? '' : category.toLowerCase())}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === (category === 'All' ? '' : category.toLowerCase())
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}