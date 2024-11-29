import React from 'react';

function Shipping() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Information</h1>

        <div className="space-y-8">
          {/* Shipping Methods */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Metode Pengiriman</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Regular Shipping</h3>
                <p className="text-gray-600">
                  • 2-5 hari kerja (Jabodetabek)<br />
                  • 5-7 hari kerja (Luar Jabodetabek)<br />
                  • Biaya mulai dari Rp 9.000
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Express Shipping</h3>
                <p className="text-gray-600">
                  • 1-2 hari kerja (Jabodetabek)<br />
                  • 2-3 hari kerja (Luar Jabodetabek)<br />
                  • Biaya mulai dari Rp 25.000
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Partners */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Partner Pengiriman</h2>
            <p className="text-gray-600 mb-4">
              Kami bekerja sama dengan ekspedisi terpercaya:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>JNE</li>
              <li>J&T Express</li>
              <li>SiCepat</li>
              <li>Anteraja</li>
              <li>GoSend (Khusus area tertentu)</li>
            </ul>
          </div>

          {/* Tracking */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Melacak Pesanan</h2>
            <p className="text-gray-600 mb-4">
              Setelah pesanan Anda dikirim, Anda akan menerima:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Email konfirmasi pengiriman</li>
              <li>Nomor resi untuk melacak pesanan</li>
              <li>Link tracking untuk memantau status pengiriman</li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Catatan Penting</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Pastikan alamat pengiriman lengkap dan benar</li>
              <li>Sertakan nomor telepon yang aktif</li>
              <li>Waktu pengiriman tidak termasuk hari libur nasional</li>
              <li>Biaya pengiriman dihitung berdasarkan berat dan volume paket</li>
              <li>Area terpencil mungkin memerlukan waktu pengiriman lebih lama</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Untuk informasi lebih lanjut, silakan{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-500">
              hubungi kami
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shipping; 