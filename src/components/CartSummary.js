import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartSummary() {
  const cartItems = useSelector(state => state.cart.items);
  
  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      {/* Subtotal */}
      <div className="flex justify-between py-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="text-gray-900">${formatPrice(subtotal)}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between py-2">
        <span className="text-gray-600">Shipping</span>
        <span className="text-gray-900">
          {shipping === 0 ? 'Free' : `$${formatPrice(shipping)}`}
        </span>
      </div>

      {/* Tax */}
      <div className="flex justify-between py-2">
        <span className="text-gray-600">Tax (10%)</span>
        <span className="text-gray-900">${formatPrice(tax)}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between py-2 border-t mt-2">
        <span className="text-lg font-medium text-gray-900">Total</span>
        <span className="text-lg font-medium text-gray-900">
          ${formatPrice(total)}
        </span>
      </div>

      {/* Free Shipping Notice */}
      {subtotal < 100 && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
          Add ${formatPrice(100 - subtotal)} more to get free shipping!
        </div>
      )}

      {/* Checkout Button */}
      <Link
        to="/checkout"
        className={`mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-center font-medium
          ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        onClick={(e) => {
          if (cartItems.length === 0) {
            e.preventDefault();
          }
        }}
      >
        Proceed to Checkout
      </Link>

      {/* Continue Shopping */}
      <Link
        to="/products"
        className="mt-4 block text-center text-blue-600 hover:text-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default CartSummary; 