/**
 * FabricFlow - Auth Store
 * State management untuk autentikasi menggunakan Zustand
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DAFTAR_PENGGUNA, STORAGE_KEYS } from '../utils/konstanta'

// ==================== AUTH STORE ====================
const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      pengguna: null,
      sudahLogin: false,
      sedangMemuat: false,

      // ==================== ACTIONS ====================
      
      /**
       * Login pengguna
       * @param {string} email - Email pengguna
       * @param {string} password - Password pengguna
       * @returns {object} Hasil login { sukses, pesan, pengguna }
       */
      login: (email, password) => {
        set({ sedangMemuat: true })

        // Cari pengguna berdasarkan email
        const penggunaDitemukan = DAFTAR_PENGGUNA.find(
          (p) => p.email.toLowerCase() === email.toLowerCase()
        )

        // Validasi email
        if (!penggunaDitemukan) {
          set({ sedangMemuat: false })
          return {
            sukses: false,
            pesan: 'Email tidak terdaftar dalam sistem'
          }
        }

        // Validasi password
        if (penggunaDitemukan.password !== password) {
          set({ sedangMemuat: false })
          return {
            sukses: false,
            pesan: 'Password yang Anda masukkan salah'
          }
        }

        // Validasi status aktif
        if (!penggunaDitemukan.aktif) {
          set({ sedangMemuat: false })
          return {
            sukses: false,
            pesan: 'Akun Anda telah dinonaktifkan. Hubungi administrator.'
          }
        }

        // Login berhasil
        const dataPengguna = {
          id: penggunaDitemukan.id,
          nama: penggunaDitemukan.nama,
          email: penggunaDitemukan.email,
          peran: penggunaDitemukan.peran,
          fotoProfil: penggunaDitemukan.fotoProfil
        }

        set({
          pengguna: dataPengguna,
          sudahLogin: true,
          sedangMemuat: false
        })

        return {
          sukses: true,
          pesan: 'Login berhasil',
          pengguna: dataPengguna
        }
      },

      /**
       * Logout pengguna
       */
      logout: () => {
        set({
          pengguna: null,
          sudahLogin: false
        })
      },

      /**
       * Cek apakah pengguna adalah admin
       * @returns {boolean}
       */
      adalahAdmin: () => {
        const { pengguna } = get()
        return pengguna?.peran === 'admin'
      },

      /**
       * Cek apakah pengguna adalah kasir
       * @returns {boolean}
       */
      adalahKasir: () => {
        const { pengguna } = get()
        return pengguna?.peran === 'kasir'
      },

      /**
       * Update data pengguna
       * @param {object} dataBaru - Data pengguna yang akan diupdate
       */
      updatePengguna: (dataBaru) => {
        set((state) => ({
          pengguna: { ...state.pengguna, ...dataBaru }
        }))
      }
    }),
    {
      name: STORAGE_KEYS.PENGGUNA_LOGIN, // Key untuk localStorage
      partialize: (state) => ({
        pengguna: state.pengguna,
        sudahLogin: state.sudahLogin
      })
    }
  )
)

export default useAuthStore
