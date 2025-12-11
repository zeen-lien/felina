/**
 * FabricFlow - Helper Functions
 * Fungsi-fungsi pembantu yang digunakan di seluruh aplikasi
 */

import { format, formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { KONFIGURASI } from './konstanta'

// ==================== FORMAT MATA UANG ====================
/**
 * Format angka menjadi format mata uang Rupiah
 * @param {number} angka - Angka yang akan diformat
 * @returns {string} String dengan format Rupiah
 */
export const formatRupiah = (angka) => {
  if (angka === null || angka === undefined) return 'Rp 0'
  
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
  
  return formatter.format(angka)
}

/**
 * Format angka dengan pemisah ribuan
 * @param {number} angka - Angka yang akan diformat
 * @returns {string} String dengan pemisah ribuan
 */
export const formatAngka = (angka) => {
  if (angka === null || angka === undefined) return '0'
  return new Intl.NumberFormat('id-ID').format(angka)
}

// ==================== FORMAT TANGGAL ====================
/**
 * Format tanggal ke format Indonesia
 * @param {string|Date} tanggal - Tanggal yang akan diformat
 * @param {string} formatStr - Format output (default: 'dd MMMM yyyy')
 * @returns {string} Tanggal yang sudah diformat
 */
export const formatTanggal = (tanggal, formatStr = 'dd MMMM yyyy') => {
  if (!tanggal) return '-'
  
  try {
    const date = new Date(tanggal)
    return format(date, formatStr, { locale: id })
  } catch (error) {
    return '-'
  }
}

/**
 * Format tanggal dengan waktu
 * @param {string|Date} tanggal - Tanggal yang akan diformat
 * @returns {string} Tanggal dan waktu yang sudah diformat
 */
export const formatTanggalWaktu = (tanggal) => {
  return formatTanggal(tanggal, 'dd MMM yyyy, HH:mm')
}

/**
 * Format tanggal relatif (misal: "2 jam yang lalu")
 * @param {string|Date} tanggal - Tanggal yang akan diformat
 * @returns {string} Waktu relatif
 */
export const formatWaktuRelatif = (tanggal) => {
  if (!tanggal) return '-'
  
  try {
    const date = new Date(tanggal)
    return formatDistanceToNow(date, { addSuffix: true, locale: id })
  } catch (error) {
    return '-'
  }
}

// ==================== GENERATE ID & NOMOR ====================
/**
 * Generate ID unik
 * @param {string} prefix - Prefix untuk ID
 * @returns {string} ID unik
 */
export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return prefix ? `${prefix}-${timestamp}${random}` : `${timestamp}${random}`
}

/**
 * Generate nomor transaksi
 * @returns {string} Nomor transaksi dengan format TRX-YYYYMMDD-XXX
 */
export const generateNomorTransaksi = () => {
  const tanggal = format(new Date(), 'yyyyMMdd')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `TRX-${tanggal}-${random}`
}

/**
 * Generate kode produk
 * @param {string} kategori - Kategori produk
 * @returns {string} Kode produk
 */
export const generateKodeProduk = (kategori) => {
  const prefix = kategori.substring(0, 3).toUpperCase()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${random}`
}

// ==================== VALIDASI ====================
/**
 * Validasi email
 * @param {string} email - Email yang akan divalidasi
 * @returns {boolean} True jika valid
 */
export const validasiEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validasi angka positif
 * @param {number} angka - Angka yang akan divalidasi
 * @returns {boolean} True jika valid
 */
export const validasiAngkaPositif = (angka) => {
  return typeof angka === 'number' && angka > 0
}

// ==================== STORAGE HELPER ====================
/**
 * Simpan data ke localStorage
 * @param {string} key - Key storage
 * @param {any} data - Data yang akan disimpan
 */
export const simpanKeStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Gagal menyimpan ke storage:', error)
  }
}

/**
 * Ambil data dari localStorage
 * @param {string} key - Key storage
 * @param {any} defaultValue - Nilai default jika tidak ada
 * @returns {any} Data dari storage
 */
export const ambilDariStorage = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (error) {
    console.error('Gagal mengambil dari storage:', error)
    return defaultValue
  }
}

/**
 * Hapus data dari localStorage
 * @param {string} key - Key storage
 */
export const hapusDariStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Gagal menghapus dari storage:', error)
  }
}

// ==================== UTILITY LAINNYA ====================
/**
 * Delay/sleep function
 * @param {number} ms - Waktu dalam milidetik
 * @returns {Promise} Promise yang resolve setelah delay
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Truncate text dengan ellipsis
 * @param {string} text - Text yang akan dipotong
 * @param {number} maxLength - Panjang maksimal
 * @returns {string} Text yang sudah dipotong
 */
export const potongTeks = (text, maxLength = 50) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Capitalize first letter
 * @param {string} text - Text yang akan dikapitalisasi
 * @returns {string} Text dengan huruf pertama kapital
 */
export const kapitalisasi = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Cek apakah stok rendah
 * @param {number} stok - Jumlah stok
 * @returns {boolean} True jika stok rendah
 */
export const cekStokRendah = (stok) => {
  return stok < KONFIGURASI.BATAS_STOK_RENDAH
}

/**
 * Hitung persentase
 * @param {number} nilai - Nilai
 * @param {number} total - Total
 * @returns {number} Persentase
 */
export const hitungPersentase = (nilai, total) => {
  if (total === 0) return 0
  return Math.round((nilai / total) * 100)
}
