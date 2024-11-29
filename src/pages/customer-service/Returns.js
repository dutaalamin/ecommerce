import React from 'react';

function Returns() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Exchanges</h1>

        {/* Return Policy */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Kebijakan Pengembalian</h2>
          <p className="text-gray-600 mb-4">
            Kami menerima pengembalian produk dalam waktu 7 hari setelah produk diterima dengan syarat:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Produk belum digunakan dan dalam kondisi asli</li>
            <li>Kemasan produk masih lengkap dan tidak rusak</li>
            <li>Memiliki bukti pembelian yang valid</li>
            <li>Produk bukan merupakan item sale atau diskon</li>
          </ul>
        </div>

        {/* How to Return */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cara Melakukan Pengembalian</h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-4">
            <li>
              <span className="font-medium">Ajukan Pengembalian</span>
              <p className="ml-6 mt-2">
                Hubungi customer service kami melalui email atau telepon untuk mengajukan pengembalian
                dalam waktu 7 hari setelah produk diterima.
              </p>
            </li>
            <li>
              <span className="font-medium">Konfirmasi Pengajuan</span>
              <p className="ml-6 mt-2">
                Tim kami akan mereview pengajuan Anda dan mengirimkan konfirmasi beserta instruksi
                pengembalian.
              </p>
            </li>
            <li>
              <span className="font-medium">Kirim Produk</span>
              <p className="ml-6 mt-2">
                Kemas produk dengan aman dan kirimkan ke alamat yang kami berikan menggunakan jasa
                ekspedisi yang dapat dilacak.
              </p>
            </li>
            <li>
              <span className="font-medium">Proses Refund</span>
              <p className="ml-6 mt-2">
                Setelah produk kami terima dan verifikasi, refund akan diproses dalam waktu 3-5 hari
                kerja.
              </p>
            </li>
          </ol>
        </div>

        {/* Exchange Policy */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Kebijakan Penukaran</h2>
          <div className="text-gray-600">
            <p className="mb-4">
              Penukaran produk dapat dilakukan dalam waktu 7 hari dengan ketentuan:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Tersedia stok produk pengganti</li>
              <li>Perbedaan harga akan disesuaikan</li>
              <li>Biaya pengiriman penukaran ditanggung pembeli</li>
              <li>Kondisi produk sesuai syarat pengembalian</li>
            </ul>
          </div>
        </div>

        {/* Non-Returnable Items */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Produk Yang Tidak Dapat Dikembalikan</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Produk dengan diskon lebih dari 50%</li>
            <li>Produk yang telah digunakan atau rusak</li>
            <li>Produk tanpa label atau kemasan asli</li>
            <li>Produk intimate wear</li>
            <li>Produk yang dibeli saat flash sale</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium text-blue-900 mb-4">
            Butuh bantuan dengan pengembalian?
          </h2>
          <p className="text-blue-700 mb-4">
            Tim customer service kami siap membantu Anda
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}

export default Returns; 