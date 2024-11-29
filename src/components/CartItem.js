import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../features/cartSlice';
import { useToast } from './ToastContainer';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(item.id));
      showToast('Item removed from cart', 'info');
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    showToast('Item removed from cart', 'info');
  };

  return (
    <div className="flex items-center py-4 border-b">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow ml-4">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          ${formatPrice(item.price)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 ml-4">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Subtotal */}
      <div className="w-32 text-right ml-4">
        <p className="text-lg font-medium text-gray-900">
          ${formatPrice(item.price * item.quantity)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="ml-4 p-2 text-gray-400 hover:text-red-500"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default CartItem;
