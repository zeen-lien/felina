/**
 * FabricFlow - Transaksi Store
 * State management untuk transaksi menggunakan Zustand
 */

import { create } from 'zustand'
import { STORAGE_KEYS, STATUS_TRANSAKSI } from '../utils/konstanta'
import { generateId, generateNomorTransaksi, ambilDariStorage, simpanKeStorage } from '../utils/helper'
import { TRANSAKSI_DUMMY } from '../data/dataDummy'

// ==================== TRANSAKSI STORE ====================
const useTransaksiStore = create((set, get) => ({
  // State
  daftarTransaksi: [],
  sedangMemuat: false,
  
  // State untuk keranjang kasir
  keranjang: [],
  diskon: 0,
  metodeBayar: 'tunai',
  catatan: '',

  // ==================== ACTIONS ====================

  /**
   * Muat semua transaksi dari storage
   */
  muatTransaksi: () => {
    set({ sedangMemuat: true })
    
    let transaksi = ambilDariStorage(STORAGE_KEYS.TRANSAKSI, null)
    
    if (!transaksi) {
      transaksi = TRANSAKSI_DUMMY
      simpanKeStorage(STORAGE_KEYS.TRANSAKSI, transaksi)
    }
    
    set({ daftarTransaksi: transaksi, sedangMemuat: false })
  },

  // ==================== KERANJANG ACTIONS ====================

  /**
   * Tambah item ke keranjang
   * @param {object} produk - Data produk
   * @param {number} jumlah - Jumlah meter
   */
  tambahKeKeranjang: (produk, jumlah) => {
    const { keranjang } = get()
    
    // Cek apakah produk sudah ada di keranjang
    const indexExisting = keranjang.findIndex(item => item.produkId === produk.id)
    
    if (indexExisting !== -1) {
      // Update jumlah jika sudah ada
      const keranjangBaru = [...keranjang]
      const jumlahBaru = keranjangBaru[indexExisting].jumlah + jumlah
      keranjangBaru[indexExisting] = {
        ...keranjangBaru[indexExisting],
        jumlah: jumlahBaru,
        subtotal: jumlahBaru * produk.harga
      }
      set({ keranjang: keranjangBaru })
    } else {
      // Tambah item baru
      const itemBaru = {
        produkId: produk.id,
        kodeProduk: produk.kode,
        namaProduk: produk.nama,
        hargaSatuan: produk.harga,
        jumlah: jumlah,
        subtotal: jumlah * produk.harga,
        stokTersedia: produk.stok
      }
      set({ keranjang: [...keranjang, itemBaru] })
    }
  },

  /**
   * Update jumlah item di keranjang
   * @param {string} produkId - ID produk
   * @param {number} jumlahBaru - Jumlah baru
   */
  updateJumlahKeranjang: (produkId, jumlahBaru) => {
    const { keranjang } = get()
    
    const keranjangBaru = keranjang.map(item => {
      if (item.produkId === produkId) {
        return {
          ...item,
          jumlah: jumlahBaru,
          subtotal: jumlahBaru * item.hargaSatuan
        }
      }
      return item
    })
    
    set({ keranjang: keranjangBaru })
  },

  /**
   * Hapus item dari keranjang
   * @param {string} produkId - ID produk
   */
  hapusDariKeranjang: (produkId) => {
    const { keranjang } = get()
    set({ keranjang: keranjang.filter(item => item.produkId !== produkId) })
  },

  /**
   * Kosongkan keranjang
   */
  kosongkanKeranjang: () => {
    set({ 
      keranjang: [], 
      diskon: 0, 
      metodeBayar: 'tunai', 
      catatan: '' 
    })
  },

  /**
   * Set diskon
   * @param {number} nominal - Nominal diskon
   */
  setDiskon: (nominal) => {
    set({ diskon: Number(nominal) || 0 })
  },

  /**
   * Set metode bayar
   * @param {string} metode - Metode pembayaran
   */
  setMetodeBayar: (metode) => {
    set({ metodeBayar: metode })
  },

  /**
   * Set catatan
   * @param {string} catatan - Catatan transaksi
   */
  setCatatan: (catatan) => {
    set({ catatan })
  },

  /**
   * Hitung total keranjang
   * @returns {object} { total, diskon, grandTotal }
   */
  hitungTotal: () => {
    const { keranjang, diskon } = get()
    
    const total = keranjang.reduce((sum, item) => sum + item.subtotal, 0)
    const grandTotal = Math.max(0, total - diskon)
    
    return { total, diskon, grandTotal }
  },

  // ==================== TRANSAKSI ACTIONS ====================

  /**
   * Proses transaksi (simpan)
   * @param {object} pengguna - Data pengguna yang melakukan transaksi
   * @returns {object} Hasil { sukses, pesan, transaksi }
   */
  prosesTransaksi: (pengguna) => {
    const { keranjang, diskon, metodeBayar, catatan, daftarTransaksi } = get()
    
    if (keranjang.length === 0) {
      return {
        sukses: false,
        pesan: 'Keranjang masih kosong'
      }
    }

    const { total, grandTotal } = get().hitungTotal()

    const transaksiBaru = {
      id: generateId('trx'),
      nomor: generateNomorTransaksi(),
      tanggal: new Date().toISOString(),
      penggunaId: pengguna.id,
      namaPengguna: pengguna.nama,
      items: keranjang.map(item => ({
        produkId: item.produkId,
        namaProduk: item.namaProduk,
        jumlah: item.jumlah,
        hargaSatuan: item.hargaSatuan,
        subtotal: item.subtotal
      })),
      total,
      diskon,
      grandTotal,
      metodeBayar,
      status: STATUS_TRANSAKSI.SELESAI,
      catatan
    }

    const daftarBaru = [transaksiBaru, ...daftarTransaksi]
    simpanKeStorage(STORAGE_KEYS.TRANSAKSI, daftarBaru)
    
    set({ daftarTransaksi: daftarBaru })
    
    // Kosongkan keranjang setelah transaksi berhasil
    get().kosongkanKeranjang()

    return {
      sukses: true,
      pesan: 'Transaksi berhasil',
      transaksi: transaksiBaru
    }
  },

  /**
   * Void transaksi
   * @param {string} id - ID transaksi
   * @returns {object} Hasil { sukses, pesan }
   */
  voidTransaksi: (id) => {
    const { daftarTransaksi } = get()
    
    const index = daftarTransaksi.findIndex(t => t.id === id)
    if (index === -1) {
      return {
        sukses: false,
        pesan: 'Transaksi tidak ditemukan'
      }
    }

    if (daftarTransaksi[index].status === STATUS_TRANSAKSI.VOID) {
      return {
        sukses: false,
        pesan: 'Transaksi sudah di-void sebelumnya'
      }
    }

    const daftarBaru = [...daftarTransaksi]
    daftarBaru[index] = {
      ...daftarBaru[index],
      status: STATUS_TRANSAKSI.VOID,
      tanggalVoid: new Date().toISOString()
    }

    simpanKeStorage(STORAGE_KEYS.TRANSAKSI, daftarBaru)
    set({ daftarTransaksi: daftarBaru })

    return {
      sukses: true,
      pesan: 'Transaksi berhasil di-void'
    }
  },

  /**
   * Cari transaksi berdasarkan ID
   * @param {string} id - ID transaksi
   * @returns {object|null} Transaksi atau null
   */
  cariTransaksiById: (id) => {
    const { daftarTransaksi } = get()
    return daftarTransaksi.find(t => t.id === id) || null
  },

  /**
   * Filter transaksi berdasarkan tanggal
   * @param {Date} tanggalMulai - Tanggal mulai
   * @param {Date} tanggalAkhir - Tanggal akhir
   * @returns {array} Daftar transaksi
   */
  filterByTanggal: (tanggalMulai, tanggalAkhir) => {
    const { daftarTransaksi } = get()
    
    return daftarTransaksi.filter(t => {
      const tanggal = new Date(t.tanggal)
      return tanggal >= tanggalMulai && tanggal <= tanggalAkhir
    })
  },

  /**
   * Dapatkan transaksi hari ini
   * @returns {array} Daftar transaksi hari ini
   */
  getTransaksiHariIni: () => {
    const { daftarTransaksi } = get()
    const hariIni = new Date()
    hariIni.setHours(0, 0, 0, 0)
    
    return daftarTransaksi.filter(t => {
      const tanggal = new Date(t.tanggal)
      tanggal.setHours(0, 0, 0, 0)
      return tanggal.getTime() === hariIni.getTime() && t.status === STATUS_TRANSAKSI.SELESAI
    })
  },

  /**
   * Hitung total penjualan hari ini
   * @returns {number} Total penjualan
   */
  getTotalPenjualanHariIni: () => {
    const transaksiHariIni = get().getTransaksiHariIni()
    return transaksiHariIni.reduce((sum, t) => sum + t.grandTotal, 0)
  }
}))

export default useTransaksiStore
