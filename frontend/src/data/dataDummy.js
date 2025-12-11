/**
 * FabricFlow - Data Dummy untuk Demo
 * Data sample untuk simulasi aplikasi
 */

import { generateId, generateNomorTransaksi } from '../utils/helper'

// ==================== DATA PRODUK ====================
export const PRODUK_DUMMY = [
  {
    id: 'prd-001',
    kode: 'KTN-001',
    nama: 'Katun Jepang Premium',
    kategori: 'katun',
    warna: 'Putih',
    harga: 75000,
    stok: 150.5,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    deskripsi: 'Katun Jepang kualitas premium, lembut dan adem',
    tanggalDibuat: '2024-01-10'
  },
  {
    id: 'prd-002',
    kode: 'KTN-002',
    nama: 'Katun Combed 30s',
    kategori: 'katun',
    warna: 'Hitam',
    harga: 65000,
    stok: 200,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
    deskripsi: 'Katun combed 30s untuk kaos premium',
    tanggalDibuat: '2024-01-12'
  },
  {
    id: 'prd-003',
    kode: 'STR-001',
    nama: 'Sutra Thailand',
    kategori: 'sutra',
    warna: 'Merah',
    harga: 150000,
    stok: 80,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?w=400',
    deskripsi: 'Sutra Thailand asli, mengkilap dan mewah',
    tanggalDibuat: '2024-01-15'
  },
  {
    id: 'prd-004',
    kode: 'PLY-001',
    nama: 'Polyester Premium',
    kategori: 'polyester',
    warna: 'Navy',
    harga: 45000,
    stok: 300,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    deskripsi: 'Polyester anti kusut untuk seragam',
    tanggalDibuat: '2024-01-18'
  },
  {
    id: 'prd-005',
    kode: 'BTK-001',
    nama: 'Batik Pekalongan',
    kategori: 'batik',
    warna: 'Motif',
    harga: 120000,
    stok: 50,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=400',
    deskripsi: 'Batik cap Pekalongan motif klasik',
    tanggalDibuat: '2024-01-20'
  },
  {
    id: 'prd-006',
    kode: 'LIN-001',
    nama: 'Linen Import',
    kategori: 'linen',
    warna: 'Cream',
    harga: 180000,
    stok: 45,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    deskripsi: 'Linen import dari Eropa, tekstur natural',
    tanggalDibuat: '2024-01-22'
  },
  {
    id: 'prd-007',
    kode: 'STN-001',
    nama: 'Satin Bridal',
    kategori: 'satin',
    warna: 'Gold',
    harga: 95000,
    stok: 120,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?w=400',
    deskripsi: 'Satin premium untuk gaun pengantin',
    tanggalDibuat: '2024-01-25'
  },
  {
    id: 'prd-008',
    kode: 'DNM-001',
    nama: 'Denim Stretch',
    kategori: 'denim',
    warna: 'Biru',
    harga: 85000,
    stok: 180,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400',
    deskripsi: 'Denim stretch untuk celana jeans',
    tanggalDibuat: '2024-01-28'
  },
  {
    id: 'prd-009',
    kode: 'BRK-001',
    nama: 'Brokat Perancis',
    kategori: 'brokat',
    warna: 'Pink',
    harga: 250000,
    stok: 8.5,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    deskripsi: 'Brokat import Perancis dengan payet',
    tanggalDibuat: '2024-02-01'
  },
  {
    id: 'prd-010',
    kode: 'RYN-001',
    nama: 'Rayon Viscose',
    kategori: 'rayon',
    warna: 'Hijau',
    harga: 55000,
    stok: 250,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
    deskripsi: 'Rayon viscose lembut dan jatuh',
    tanggalDibuat: '2024-02-05'
  },
  {
    id: 'prd-011',
    kode: 'WOL-001',
    nama: 'Wol Australia',
    kategori: 'wol',
    warna: 'Abu-abu',
    harga: 200000,
    stok: 35,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    deskripsi: 'Wol Australia untuk jas dan blazer',
    tanggalDibuat: '2024-02-08'
  },
  {
    id: 'prd-012',
    kode: 'KTN-003',
    nama: 'Katun Toyobo',
    kategori: 'katun',
    warna: 'Putih',
    harga: 70000,
    stok: 175,
    satuan: 'meter',
    foto: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
    deskripsi: 'Katun Toyobo untuk gamis dan baju muslim',
    tanggalDibuat: '2024-02-10'
  }
]

// ==================== DATA TRANSAKSI ====================
export const TRANSAKSI_DUMMY = [
  {
    id: 'trx-001',
    nomor: 'TRX-20241210-001',
    tanggal: '2024-12-10T09:30:00',
    penggunaId: 'usr-002',
    namaPengguna: 'Budi Santoso',
    items: [
      { produkId: 'prd-001', namaProduk: 'Katun Jepang Premium', jumlah: 2.5, hargaSatuan: 75000, subtotal: 187500 },
      { produkId: 'prd-003', namaProduk: 'Sutra Thailand', jumlah: 1, hargaSatuan: 150000, subtotal: 150000 }
    ],
    total: 337500,
    diskon: 10000,
    grandTotal: 327500,
    metodeBayar: 'tunai',
    status: 'selesai',
    catatan: 'Pelanggan reguler'
  },
  {
    id: 'trx-002',
    nomor: 'TRX-20241210-002',
    tanggal: '2024-12-10T10:45:00',
    penggunaId: 'usr-002',
    namaPengguna: 'Budi Santoso',
    items: [
      { produkId: 'prd-005', namaProduk: 'Batik Pekalongan', jumlah: 3, hargaSatuan: 120000, subtotal: 360000 }
    ],
    total: 360000,
    diskon: 0,
    grandTotal: 360000,
    metodeBayar: 'qris',
    status: 'selesai',
    catatan: ''
  },
  {
    id: 'trx-003',
    nomor: 'TRX-20241210-003',
    tanggal: '2024-12-10T14:20:00',
    penggunaId: 'usr-003',
    namaPengguna: 'Siti Rahayu',
    items: [
      { produkId: 'prd-008', namaProduk: 'Denim Stretch', jumlah: 5, hargaSatuan: 85000, subtotal: 425000 },
      { produkId: 'prd-002', namaProduk: 'Katun Combed 30s', jumlah: 2, hargaSatuan: 65000, subtotal: 130000 }
    ],
    total: 555000,
    diskon: 25000,
    grandTotal: 530000,
    metodeBayar: 'transfer',
    status: 'selesai',
    catatan: 'Untuk konveksi'
  },
  {
    id: 'trx-004',
    nomor: 'TRX-20241211-001',
    tanggal: '2024-12-11T08:15:00',
    penggunaId: 'usr-002',
    namaPengguna: 'Budi Santoso',
    items: [
      { produkId: 'prd-007', namaProduk: 'Satin Bridal', jumlah: 4, hargaSatuan: 95000, subtotal: 380000 }
    ],
    total: 380000,
    diskon: 0,
    grandTotal: 380000,
    metodeBayar: 'tunai',
    status: 'selesai',
    catatan: 'Untuk gaun pengantin'
  },
  {
    id: 'trx-005',
    nomor: 'TRX-20241211-002',
    tanggal: '2024-12-11T11:30:00',
    penggunaId: 'usr-003',
    namaPengguna: 'Siti Rahayu',
    items: [
      { produkId: 'prd-009', namaProduk: 'Brokat Perancis', jumlah: 2, hargaSatuan: 250000, subtotal: 500000 },
      { produkId: 'prd-006', namaProduk: 'Linen Import', jumlah: 1.5, hargaSatuan: 180000, subtotal: 270000 }
    ],
    total: 770000,
    diskon: 50000,
    grandTotal: 720000,
    metodeBayar: 'debit',
    status: 'selesai',
    catatan: 'Pesanan khusus'
  }
]

// ==================== DATA STOK LOG ====================
export const STOK_LOG_DUMMY = [
  {
    id: 'stk-001',
    produkId: 'prd-001',
    namaProduk: 'Katun Jepang Premium',
    jumlah: 50,
    stokSebelum: 100.5,
    stokSesudah: 150.5,
    tipe: 'masuk',
    referensi: 'Restok dari supplier',
    penggunaId: 'usr-001',
    namaPengguna: 'Administrator',
    catatan: 'Pengiriman dari PT Tekstil Jaya',
    tanggal: '2024-12-09T10:00:00'
  },
  {
    id: 'stk-002',
    produkId: 'prd-001',
    namaProduk: 'Katun Jepang Premium',
    jumlah: -2.5,
    stokSebelum: 153,
    stokSesudah: 150.5,
    tipe: 'penjualan',
    referensi: 'TRX-20241210-001',
    penggunaId: 'usr-002',
    namaPengguna: 'Budi Santoso',
    catatan: 'Penjualan',
    tanggal: '2024-12-10T09:30:00'
  },
  {
    id: 'stk-003',
    produkId: 'prd-009',
    namaProduk: 'Brokat Perancis',
    jumlah: -1.5,
    stokSebelum: 10,
    stokSesudah: 8.5,
    tipe: 'rusak',
    referensi: 'RSK-001',
    penggunaId: 'usr-001',
    namaPengguna: 'Administrator',
    catatan: 'Terkena air hujan',
    tanggal: '2024-12-08T14:00:00'
  }
]

// ==================== DATA KAIN RUSAK ====================
export const KAIN_RUSAK_DUMMY = [
  {
    id: 'rsk-001',
    produkId: 'prd-009',
    namaProduk: 'Brokat Perancis',
    jumlah: 1.5,
    alasan: 'Terkena air/basah',
    foto: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    penggunaId: 'usr-001',
    namaPengguna: 'Administrator',
    tanggal: '2024-12-08T14:00:00'
  },
  {
    id: 'rsk-002',
    produkId: 'prd-005',
    namaProduk: 'Batik Pekalongan',
    jumlah: 2,
    alasan: 'Luntur warna',
    foto: null,
    penggunaId: 'usr-002',
    namaPengguna: 'Budi Santoso',
    tanggal: '2024-12-05T11:30:00'
  }
]

// ==================== DATA AUDIT LOG ====================
export const AUDIT_LOG_DUMMY = [
  {
    id: 'aud-001',
    penggunaId: 'usr-001',
    namaPengguna: 'Administrator',
    aksi: 'login',
    tabel: 'users',
    dataId: 'usr-001',
    dataLama: null,
    dataBaru: null,
    tanggal: '2024-12-11T08:00:00'
  },
  {
    id: 'aud-002',
    penggunaId: 'usr-001',
    namaPengguna: 'Administrator',
    aksi: 'create',
    tabel: 'produk',
    dataId: 'prd-012',
    dataLama: null,
    dataBaru: { nama: 'Katun Toyobo', harga: 70000 },
    tanggal: '2024-12-10T09:15:00'
  },
  {
    id: 'aud-003',
    penggunaId: 'usr-002',
    namaPengguna: 'Budi Santoso',
    aksi: 'create',
    tabel: 'transaksi',
    dataId: 'trx-001',
    dataLama: null,
    dataBaru: { nomor: 'TRX-20241210-001', grandTotal: 327500 },
    tanggal: '2024-12-10T09:30:00'
  }
]

// ==================== FUNGSI INISIALISASI DATA ====================
/**
 * Inisialisasi semua data dummy ke localStorage
 */
export const inisialisasiDataDummy = () => {
  const STORAGE_KEYS = {
    PRODUK: 'fabricflow_produk',
    TRANSAKSI: 'fabricflow_transaksi',
    STOK_LOG: 'fabricflow_stok_log',
    KAIN_RUSAK: 'fabricflow_kain_rusak',
    AUDIT_LOG: 'fabricflow_audit_log'
  }

  // Cek apakah data sudah ada
  const produkExist = localStorage.getItem(STORAGE_KEYS.PRODUK)
  
  if (!produkExist) {
    // Simpan semua data dummy
    localStorage.setItem(STORAGE_KEYS.PRODUK, JSON.stringify(PRODUK_DUMMY))
    localStorage.setItem(STORAGE_KEYS.TRANSAKSI, JSON.stringify(TRANSAKSI_DUMMY))
    localStorage.setItem(STORAGE_KEYS.STOK_LOG, JSON.stringify(STOK_LOG_DUMMY))
    localStorage.setItem(STORAGE_KEYS.KAIN_RUSAK, JSON.stringify(KAIN_RUSAK_DUMMY))
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOG, JSON.stringify(AUDIT_LOG_DUMMY))
    
    console.log('✅ Data dummy berhasil diinisialisasi')
  }
}
