import React from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmation() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We'll send you an email with your order details and tracking information.
        </p>
        <div className="space-y-4">
          <Link
            to="/products"
            className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation; 