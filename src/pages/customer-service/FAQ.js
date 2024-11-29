import React, { useState } from 'react';

function FAQ() {
  const faqs = [
    {
      question: 'Bagaimana cara melakukan pembelian di Casava?',
      answer: 'Untuk melakukan pembelian, pilih produk yang Anda inginkan, tambahkan ke keranjang, dan ikuti proses checkout. Anda dapat membayar menggunakan berbagai metode pembayaran yang tersedia.'
    },
    {
      question: 'Berapa lama waktu pengiriman?',
      answer: 'Waktu pengiriman bervariasi tergantung lokasi, biasanya 2-5 hari kerja untuk area Jabodetabek dan 5-7 hari kerja untuk area luar Jabodetabek.'
    },
    {
      question: 'Apakah ada biaya pengiriman?',
      answer: 'Ya, biaya pengiriman dihitung berdasarkan berat produk dan lokasi pengiriman. Biaya akan ditampilkan saat proses checkout.'
    },
    {
      question: 'Bagaimana cara melacak pesanan?',
      answer: 'Setelah pesanan dikirim, Anda akan menerima nomor resi melalui email. Gunakan nomor tersebut untuk melacak pesanan Anda di halaman profil atau melalui website ekspedisi.'
    },
    {
      question: 'Apakah produk bergaransi?',
      answer: 'Ya, semua produk memiliki garansi sesuai dengan kebijakan masing-masing brand. Detail garansi dapat dilihat pada halaman detail produk.'
    },
    {
      question: 'Bagaimana cara melakukan pengembalian barang?',
      answer: 'Pengembalian barang dapat dilakukan dalam waktu 7 hari setelah barang diterima. Pastikan produk dalam kondisi asli dan belum digunakan. Hubungi customer service kami untuk proses pengembalian.'
    },
    {
      question: 'Metode pembayaran apa saja yang tersedia?',
      answer: 'Kami menerima pembayaran melalui transfer bank, kartu kredit, e-wallet (OVO, GoPay, DANA), dan virtual account.'
    },
    {
      question: 'Apakah ada minimal pembelian?',
      answer: 'Tidak ada minimal pembelian untuk berbelanja di Casava.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-medium text-blue-900 mb-4">
            Masih punya pertanyaan?
          </h2>
          <p className="text-blue-700 mb-4">
            Jika Anda tidak menemukan jawaban yang Anda cari, silakan hubungi tim customer service kami.
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

export default FAQ; 