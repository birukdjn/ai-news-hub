'use client';

const categories = [
  'All', 'Tech', 'Sports', 'Health', 'Science', 'Business', 'Entertainment'
];

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => {
            const target = category === 'All' ? '' : category === 'Tech' ? 'technology' : category.toLowerCase();
            setSelectedCategory(target);
          }}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === (category === 'All' ? '' : category === 'Tech' ? 'technology' : category.toLowerCase())
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