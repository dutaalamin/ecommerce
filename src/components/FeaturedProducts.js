import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function FeaturedProducts() {
  const { items, status } = useSelector((state) => state.products);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  // Ambil 4 produk pertama sebagai featured products
  const featuredProducts = items.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain mb-4"
          />
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.title}</h3>
          <p className="text-blue-600 font-bold">${product.price}</p>
        </Link>
      ))}
    </div>
  );
}

export default FeaturedProducts; 