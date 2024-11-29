import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { useToast } from './ToastContainer';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
    showToast('Produk berhasil ditambahkan ke keranjang', 'success');
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="h-full">
      <div 
        onClick={handleCardClick}
        className="h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col cursor-pointer"
      >
        {/* Image Container - Fixed Height */}
        <div className="relative w-full h-64 bg-gray-100 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Title & Category */}
          <div>
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>
          </div>

          {/* Rating */}
          <div className="mt-2">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.round(product.rating?.rate || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">
                ({product.rating?.count || 0})
              </span>
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price?.toFixed(2)}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(e);
              }}
              className="flex items-center justify-center p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
