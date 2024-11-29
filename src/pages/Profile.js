import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContainer';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('profile');

  // Ambil order history dari localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleLogout = () => {
    dispatch(logout());
    showToast('Berhasil logout', 'success');
    navigate('/login');
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl text-white font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {user?.name || 'User'}
                </h3>
                <p className="text-sm text-gray-500">
                  {user?.email || 'email@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-6 text-sm font-medium border-b-2 focus:outline-none ${
                  activeTab === 'orders'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Order History
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="px-4 py-5 sm:p-6">
            {activeTab === 'profile' ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Account Information</h4>
                  <dl className="mt-4 space-y-4">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.name || 'Not set'}
                      </dd>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user?.email || 'Not set'}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-6">Order History</h4>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No orders found</p>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
                            <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.paymentStatus)}`}>
                            {order.paymentStatus || 'pending'}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between py-2">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="h-12 w-12 object-contain rounded"
                                />
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                            <p className="text-sm font-medium text-gray-500">Total</p>
                            <p className="text-sm font-medium text-gray-900">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                          {order.paymentMethod && (
                            <div className="mt-2 text-sm text-gray-500">
                              Payment Method: {order.paymentMethod.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 