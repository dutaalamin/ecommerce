import React from 'react';

function ProductFilters({ filters, setFilters }) {
  const priceRanges = [
    { label: 'All', value: 'all' },
    { label: 'Under $25', value: '0-25' },
    { label: '$25 - $50', value: '25-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: '100+' }
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating', value: 'rating' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="space-y-4">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value={range.value}
                  checked={filters.priceRange === range.value}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: e.target.value
                  })}
                  className="text-blue-600"
                />
                <span className="ml-2">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-medium mb-2">Sort By</h3>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({
              ...filters,
              sort: e.target.value
            })}
            className="w-full border rounded-lg p-2"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-medium mb-2">Minimum Rating</h3>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilters({
                  ...filters,
                  minRating: rating
                })}
                className={`p-2 rounded ${
                  filters.minRating === rating
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilters; 