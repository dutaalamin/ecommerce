import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleWishlist, clearWishlist } from '../features/wishlistSlice';
import { addToCart } from '../features/cartSlice';
import { useToast } from '../components/ToastContainer';

function Wishlist() {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const wishlistItems = useSelector(state => state.wishlist.items);

  const handleRemoveFromWishlist = (product) => {
    dispatch(toggleWishlist(product));
    showToast('Removed from wishlist', 'success');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(toggleWishlist(product));
    showToast('Added to cart and removed from wishlist', 'success');
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    showToast('Wishlist cleared', 'success');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-4">Browse our products and add some items to your wishlist!</p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Wishlist</h2>
        <button
          onClick={handleClearWishlist}
          className="text-red-600 hover:text-red-700"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="font-medium mb-2">{product.title}</h3>
            <p className="text-lg font-bold mb-4">${product.price}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(product)}
                className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist; 