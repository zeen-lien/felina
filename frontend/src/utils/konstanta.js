/**
 * FabricFlow - Konstanta Aplikasi
 * File ini berisi semua konstanta yang digunakan di aplikasi
 */

// ==================== DATA PENGGUNA DEMO ====================
// Akun login yang sudah ditentukan (hardcoded untuk demo)
export const DAFTAR_PENGGUNA = [
  {
    id: 'usr-001',
    nama: 'Administrator',
    email: 'admin@fabricflow.com',
    password: 'admin123',
    peran: 'admin',
    aktif: true,
    fotoProfil: null,
    tanggalDibuat: '2024-01-01'
  },
  {
    id: 'usr-002',
    nama: 'Zeen_Lien',
    email: 'kasir1@fabricflow.com',
    password: 'kasir123',
    peran: 'kasir',
    aktif: true,
    fotoProfil: null,
    tanggalDibuat: '2024-01-15'
  },
  {
    id: 'usr-003',
    nama: 'Felina',
    email: 'kasir2@fabricflow.com',
    password: 'kasir123',
    peran: 'kasir',
    aktif: true,
    fotoProfil: null,
    tanggalDibuat: '2024-02-01'
  }
]

// ==================== KATEGORI PRODUK ====================
export const KATEGORI_KAIN = [
  { id: 'katun', nama: 'Katun', warna: '#4CAF50' },
  { id: 'sutra', nama: 'Sutra', warna: '#9C27B0' },
  { id: 'polyester', nama: 'Polyester', warna: '#2196F3' },
  { id: 'linen', nama: 'Linen', warna: '#FF9800' },
  { id: 'wol', nama: 'Wol', warna: '#795548' },
  { id: 'satin', nama: 'Satin', warna: '#E91E63' },
  { id: 'batik', nama: 'Batik', warna: '#607D8B' },
  { id: 'brokat', nama: 'Brokat', warna: '#FFD700' },
  { id: 'denim', nama: 'Denim', warna: '#1565C0' },
  { id: 'rayon', nama: 'Rayon', warna: '#00BCD4' }
]

// ==================== WARNA KAIN ====================
export const WARNA_KAIN = [
  'Putih', 'Hitam', 'Merah', 'Biru', 'Hijau', 'Kuning',
  'Ungu', 'Pink', 'Orange', 'Coklat', 'Abu-abu', 'Cream',
  'Navy', 'Maroon', 'Tosca', 'Gold', 'Silver', 'Motif'
]

// ==================== METODE PEMBAYARAN ====================
export const METODE_PEMBAYARAN = [
  { id: 'tunai', nama: 'Tunai', ikon: 'Banknote' },
  { id: 'transfer', nama: 'Transfer Bank', ikon: 'Building2' },
  { id: 'qris', nama: 'QRIS', ikon: 'QrCode' },
  { id: 'debit', nama: 'Kartu Debit', ikon: 'CreditCard' }
]

// ==================== STATUS TRANSAKSI ====================
export const STATUS_TRANSAKSI = {
  SELESAI: 'selesai',
  VOID: 'void',
  PENDING: 'pending'
}

// ==================== TIPE PERUBAHAN STOK ====================
export const TIPE_STOK = {
  MASUK: 'masuk',
  KELUAR: 'keluar',
  ADJUSTMENT: 'adjustment',
  RUSAK: 'rusak',
  PENJUALAN: 'penjualan'
}

// ==================== ALASAN KERUSAKAN ====================
export const ALASAN_KERUSAKAN = [
  'Terkena air/basah',
  'Sobek/robek',
  'Luntur warna',
  'Terkena noda',
  'Dimakan hama/rayap',
  'Rusak saat pengiriman',
  'Cacat produksi',
  'Lainnya'
]

// ==================== MENU NAVIGASI ====================
export const MENU_ADMIN = [
  { id: 'dashboard', nama: 'Dashboard', path: '/', ikon: 'LayoutDashboard' },
  { id: 'kasir', nama: 'Kasir', path: '/kasir', ikon: 'ShoppingCart' },
  { id: 'produk', nama: 'Produk', path: '/produk', ikon: 'Package' },
  { id: 'stok', nama: 'Stok', path: '/stok', ikon: 'Warehouse' },
  { id: 'rusak', nama: 'Kain Rusak', path: '/rusak', ikon: 'AlertTriangle' },
  { id: 'transaksi', nama: 'Transaksi', path: '/transaksi', ikon: 'Receipt' },
  { id: 'laporan', nama: 'Laporan', path: '/laporan', ikon: 'BarChart3' },
  { id: 'pengguna', nama: 'Pengguna', path: '/pengguna', ikon: 'Users' },
  { id: 'audit', nama: 'Audit Log', path: '/audit', ikon: 'FileText' }
]

export const MENU_KASIR = [
  { id: 'dashboard', nama: 'Dashboard', path: '/', ikon: 'LayoutDashboard' },
  { id: 'kasir', nama: 'Kasir', path: '/kasir', ikon: 'ShoppingCart' },
  { id: 'produk', nama: 'Produk', path: '/produk', ikon: 'Package' },
  { id: 'stok', nama: 'Stok', path: '/stok', ikon: 'Warehouse' },
  { id: 'rusak', nama: 'Kain Rusak', path: '/rusak', ikon: 'AlertTriangle' }
]

// ==================== KONFIGURASI APLIKASI ====================
export const KONFIGURASI = {
  NAMA_APLIKASI: 'FabricFlow',
  VERSI: '1.0.0',
  MATA_UANG: 'Rp',
  SATUAN_DEFAULT: 'meter',
  BATAS_STOK_RENDAH: 10, // Alert jika stok di bawah ini
  ITEMS_PER_HALAMAN: 10
}

// ==================== KEY LOCALSTORAGE ====================
export const STORAGE_KEYS = {
  PENGGUNA_LOGIN: 'fabricflow_pengguna',
  TOKEN: 'fabricflow_token',
  PRODUK: 'fabricflow_produk',
  TRANSAKSI: 'fabricflow_transaksi',
  STOK_LOG: 'fabricflow_stok_log',
  KAIN_RUSAK: 'fabricflow_kain_rusak',
  AUDIT_LOG: 'fabricflow_audit_log'
}
