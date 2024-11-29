import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { useToast } from '../components/ToastContainer';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products?limit=4');
      const data = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      showToast('Failed to load featured products', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4"
            alt="Background"
            className="w-full h-full object-cover object-center opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to Our Store
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover our collection of high-quality products at great prices.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-blue-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-blue-700"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="sm:flex sm:items-baseline sm:justify-between mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block"
          >
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden">
          <Link
            to="/products"
            className="block text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <Link
              to="/categories"
              className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
            {['electronics', 'jewelery', "men's clothing", "women's clothing"].map((category) => (
              <Link
                key={category}
                to={`/categories/${category}`}
                className="group relative rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-w-3 aspect-h-2">
                  <div className="p-8 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-lg font-medium text-gray-900 text-center capitalize">
                      {category}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              to="/categories"
              className="block text-sm font-semibold text-blue-600 hover:text-blue-500"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
