import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../features/productSlice';

function SearchFilters() {
  const dispatch = useDispatch();
  const { items, filters } = useSelector((state) => state.products);
  
  const [localFilters, setLocalFilters] = useState({
    priceRange: [0, 1000],
    categories: [],
    sortBy: ''
  });

  // Get unique categories from products
  const availableCategories = [...new Set(items.map(item => item.category))];

  // Get min and max prices from products
  const prices = items.map(item => item.price);
  const minPrice = Math.floor(Math.min(...prices, 0));
  const maxPrice = Math.ceil(Math.max(...prices, 1000));

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handlePriceChange = (e, index) => {
    const newRange = [...localFilters.priceRange];
    newRange[index] = Number(e.target.value);
    setLocalFilters({
      ...localFilters,
      priceRange: newRange
    });
  };

  const handleCategoryChange = (category) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    
    setLocalFilters({
      ...localFilters,
      categories: newCategories
    });
  };

  const handleSortChange = (e) => {
    setLocalFilters({
      ...localFilters,
      sortBy: e.target.value
    });
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setLocalFilters({
      priceRange: [minPrice, maxPrice],
      categories: [],
      sortBy: ''
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span>Min:</span>
            <input
              type="number"
              value={localFilters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              min={minPrice}
              max={localFilters.priceRange[1]}
              className="w-24 px-2 py-1 border rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Max:</span>
            <input
              type="number"
              value={localFilters.priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              min={localFilters.priceRange[0]}
              max={maxPrice}
              className="w-24 px-2 py-1 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Categories</h4>
        <div className="space-y-2">
          {availableCategories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Sort By</h4>
        <select
          value={localFilters.sortBy}
          onChange={handleSortChange}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={handleApplyFilters}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SearchFilters; 