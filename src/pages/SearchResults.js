import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

function SearchResults() {
  const { items, status, searchTerm } = useSelector((state) => state.products);
  
  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Search Results for "{searchTerm}"
        </h2>
        <p className="text-gray-600 mt-2">
          Found {filteredProducts.length} items
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            No products found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults; 