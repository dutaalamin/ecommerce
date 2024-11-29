import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../components/ToastContainer';

function Categories() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const { showToast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
      fetchProductsByCategory(category);
    } else {
      fetchAllProducts();
    }
  }, [category]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(['all', ...data]);
    } catch (error) {
      showToast('Failed to load categories', 'error');
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (cat) => {
    try {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/category/${cat}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "men's clothing":
        return '👔';
      case "women's clothing":
        return '👗';
      case 'electronics':
        return '📱';
      case 'jewelery':
        return '💍';
      default:
        return '🛍️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Shop by Category
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Browse our collection by category
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-4 min-w-max">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={cat === 'all' ? '/categories' : `/categories/${cat}`}
                className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{getCategoryIcon(cat)}</span>
                <span className="capitalize">{cat}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try selecting a different category
                </p>
              </div>
            )}
          </>
        )}

        {/* Category Description */}
        {selectedCategory !== 'all' && (
          <div className="mt-16 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
              About {selectedCategory}
            </h2>
            <p className="text-gray-600">
              Discover our collection of {selectedCategory} products. We offer a wide range of 
              high-quality items at competitive prices.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories; 