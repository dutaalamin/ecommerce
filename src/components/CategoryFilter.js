import React from 'react';

const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
];

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } transition-colors duration-300`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter; 