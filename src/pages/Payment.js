import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import { useToast } from '../components/ToastContainer';

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const location = useLocation();
  const orderData = location.state?.orderData;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  if (!orderData) {
    navigate('/cart');
    return null;
  }

  const paymentMethods = [
    {
      id: 'bca',
      name: 'BCA Virtual Account',
      icon: '🏦',
      accountNumber: '8720xxx'
    },
    {
      id: 'mandiri',
      name: 'Mandiri Virtual Account',
      icon: '🏦',
      accountNumber: '8920xxx'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      icon: '📱',
      accountNumber: '0812xxx'
    },
    {
      id: 'ovo',
      name: 'OVO',
      icon: '📱',
      accountNumber: '0812xxx'
    }
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      showToast('Pilih metode pembayaran', 'error');
      return;
    }

    setLoading(true);

    try {
      // Simulasi proses pembayaran
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simpan data order dengan status pembayaran
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrder = {
        ...orderData,
        paymentMethod,
        paymentStatus: 'paid',
        paymentDate: new Date().toISOString()
      };
      orders.push(updatedOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Bersihkan keranjang
      dispatch(clearCart());

      showToast('Pembayaran berhasil!', 'success');
      navigate('/profile');
    } catch (error) {
      showToast('Gagal memproses pembayaran', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Pembayaran
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Total Pembayaran: ${orderData.total.toFixed(2)}
            </p>
          </div>

          {/* Payment Methods */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`relative rounded-lg border p-4 cursor-pointer hover:border-blue-500 transition-colors
                    ${paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-500">No. Virtual Account: {method.accountNumber}</p>
                      </div>
                    </div>
                    <div className={`h-5 w-5 border-2 rounded-full flex items-center justify-center
                      ${paymentMethod === method.id ? 'border-blue-500' : 'border-gray-300'}`}
                    >
                      {paymentMethod === method.id && (
                        <div className="h-2.5 w-2.5 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Ringkasan Pesanan</h4>
              <div className="space-y-2">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.title} x {item.quantity}</span>
                    <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <div className="mt-8">
              <button
                onClick={handlePayment}
                disabled={!paymentMethod || loading}
                className={`w-full py-3 px-4 rounded-md text-white font-medium
                  ${loading || !paymentMethod
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
              >
                {loading ? 'Memproses...' : 'Bayar Sekarang'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment; 