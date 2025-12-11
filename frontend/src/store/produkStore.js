/**
 * FabricFlow - Produk Store
 * State management untuk produk menggunakan Zustand
 */

import { create } from 'zustand'
import { STORAGE_KEYS } from '../utils/konstanta'
import { generateId, generateKodeProduk, ambilDariStorage, simpanKeStorage } from '../utils/helper'
import { PRODUK_DUMMY } from '../data/dataDummy'

// ==================== PRODUK STORE ====================
const useProdukStore = create((set, get) => ({
  // State
  daftarProduk: [],
  sedangMemuat: false,
  produkTerpilih: null,

  // ==================== ACTIONS ====================

  /**
   * Muat semua produk dari storage
   */
  muatProduk: () => {
    set({ sedangMemuat: true })
    
    let produk = ambilDariStorage(STORAGE_KEYS.PRODUK, null)
    
    // Jika belum ada data, gunakan data dummy
    if (!produk) {
      produk = PRODUK_DUMMY
      simpanKeStorage(STORAGE_KEYS.PRODUK, produk)
    }
    
    set({ daftarProduk: produk, sedangMemuat: false })
  },

  /**
   * Tambah produk baru
   * @param {object} dataProduk - Data produk baru
   * @returns {object} Hasil { sukses, pesan, produk }
   */
  tambahProduk: (dataProduk) => {
    const { daftarProduk } = get()
    
    // Generate ID dan kode jika belum ada
    const produkBaru = {
      id: generateId('prd'),
      kode: dataProduk.kode || generateKodeProduk(dataProduk.kategori),
      nama: dataProduk.nama,
      kategori: dataProduk.kategori,
      warna: dataProduk.warna || '',
      harga: Number(dataProduk.harga),
      stok: Number(dataProduk.stok) || 0,
      satuan: dataProduk.satuan || 'meter',
      foto: dataProduk.foto || null,
      deskripsi: dataProduk.deskripsi || '',
      tanggalDibuat: new Date().toISOString()
    }

    // Cek kode duplikat
    const kodeDuplikat = daftarProduk.find(p => p.kode === produkBaru.kode)
    if (kodeDuplikat) {
      return {
        sukses: false,
        pesan: 'Kode produk sudah digunakan'
      }
    }

    const daftarBaru = [...daftarProduk, produkBaru]
    simpanKeStorage(STORAGE_KEYS.PRODUK, daftarBaru)
    set({ daftarProduk: daftarBaru })

    return {
      sukses: true,
      pesan: 'Produk berhasil ditambahkan',
      produk: produkBaru
    }
  },

  /**
   * Update produk
   * @param {string} id - ID produk
   * @param {object} dataBaru - Data yang akan diupdate
   * @returns {object} Hasil { sukses, pesan }
   */
  updateProduk: (id, dataBaru) => {
    const { daftarProduk } = get()
    
    const index = daftarProduk.findIndex(p => p.id === id)
    if (index === -1) {
      return {
        sukses: false,
        pesan: 'Produk tidak ditemukan'
      }
    }

    // Cek kode duplikat (kecuali produk yang sama)
    if (dataBaru.kode) {
      const kodeDuplikat = daftarProduk.find(p => p.kode === dataBaru.kode && p.id !== id)
      if (kodeDuplikat) {
        return {
          sukses: false,
          pesan: 'Kode produk sudah digunakan'
        }
      }
    }

    const produkUpdated = {
      ...daftarProduk[index],
      ...dataBaru,
      harga: dataBaru.harga ? Number(dataBaru.harga) : daftarProduk[index].harga,
      stok: dataBaru.stok !== undefined ? Number(dataBaru.stok) : daftarProduk[index].stok,
      tanggalDiupdate: new Date().toISOString()
    }

    const daftarBaru = [...daftarProduk]
    daftarBaru[index] = produkUpdated
    
    simpanKeStorage(STORAGE_KEYS.PRODUK, daftarBaru)
    set({ daftarProduk: daftarBaru })

    return {
      sukses: true,
      pesan: 'Produk berhasil diupdate'
    }
  },

  /**
   * Hapus produk
   * @param {string} id - ID produk
   * @returns {object} Hasil { sukses, pesan }
   */
  hapusProduk: (id) => {
    const { daftarProduk } = get()
    
    const daftarBaru = daftarProduk.filter(p => p.id !== id)
    
    if (daftarBaru.length === daftarProduk.length) {
      return {
        sukses: false,
        pesan: 'Produk tidak ditemukan'
      }
    }

    simpanKeStorage(STORAGE_KEYS.PRODUK, daftarBaru)
    set({ daftarProduk: daftarBaru })

    return {
      sukses: true,
      pesan: 'Produk berhasil dihapus'
    }
  },

  /**
   * Cari produk berdasarkan ID
   * @param {string} id - ID produk
   * @returns {object|null} Produk atau null
   */
  cariProdukById: (id) => {
    const { daftarProduk } = get()
    return daftarProduk.find(p => p.id === id) || null
  },

  /**
   * Cari produk berdasarkan kode
   * @param {string} kode - Kode produk
   * @returns {object|null} Produk atau null
   */
  cariProdukByKode: (kode) => {
    const { daftarProduk } = get()
    return daftarProduk.find(p => p.kode === kode) || null
  },

  /**
   * Filter produk berdasarkan kategori
   * @param {string} kategori - Kategori produk
   * @returns {array} Daftar produk
   */
  filterByKategori: (kategori) => {
    const { daftarProduk } = get()
    if (!kategori || kategori === 'semua') return daftarProduk
    return daftarProduk.filter(p => p.kategori === kategori)
  },

  /**
   * Cari produk berdasarkan keyword
   * @param {string} keyword - Kata kunci pencarian
   * @returns {array} Daftar produk
   */
  cariProduk: (keyword) => {
    const { daftarProduk } = get()
    if (!keyword) return daftarProduk
    
    const keywordLower = keyword.toLowerCase()
    return daftarProduk.filter(p => 
      p.nama.toLowerCase().includes(keywordLower) ||
      p.kode.toLowerCase().includes(keywordLower) ||
      p.kategori.toLowerCase().includes(keywordLower) ||
      p.warna.toLowerCase().includes(keywordLower)
    )
  },

  /**
   * Update stok produk
   * @param {string} id - ID produk
   * @param {number} jumlah - Jumlah perubahan (positif/negatif)
   * @returns {object} Hasil { sukses, pesan, stokBaru }
   */
  updateStok: (id, jumlah) => {
    const { daftarProduk } = get()
    
    const index = daftarProduk.findIndex(p => p.id === id)
    if (index === -1) {
      return {
        sukses: false,
        pesan: 'Produk tidak ditemukan'
      }
    }

    const stokBaru = daftarProduk[index].stok + jumlah
    
    if (stokBaru < 0) {
      return {
        sukses: false,
        pesan: 'Stok tidak mencukupi'
      }
    }

    const daftarBaru = [...daftarProduk]
    daftarBaru[index] = {
      ...daftarBaru[index],
      stok: stokBaru
    }

    simpanKeStorage(STORAGE_KEYS.PRODUK, daftarBaru)
    set({ daftarProduk: daftarBaru })

    return {
      sukses: true,
      pesan: 'Stok berhasil diupdate',
      stokBaru
    }
  },

  /**
   * Dapatkan produk dengan stok rendah
   * @param {number} batas - Batas stok rendah
   * @returns {array} Daftar produk dengan stok rendah
   */
  getProdukStokRendah: (batas = 10) => {
    const { daftarProduk } = get()
    return daftarProduk.filter(p => p.stok < batas)
  },

  /**
   * Set produk terpilih
   * @param {object|null} produk - Produk yang dipilih
   */
  setProdukTerpilih: (produk) => {
    set({ produkTerpilih: produk })
  }
}))

export default useProdukStore
