/**
 * FabricFlow - Notifikasi dengan SweetAlert2
 * Wrapper untuk SweetAlert2 dengan tema gelap
 */

import Swal from 'sweetalert2'

// ==================== KONFIGURASI DEFAULT ====================
const konfigurasiDefault = {
  background: '#1a1a1a',
  color: '#ffffff',
  confirmButtonColor: '#8B0000',
  cancelButtonColor: '#333333',
  customClass: {
    popup: 'rounded-2xl border border-gelap-border',
    title: 'text-xl font-bold',
    confirmButton: 'rounded-xl font-semibold',
    cancelButton: 'rounded-xl font-semibold'
  }
}

// ==================== NOTIFIKASI SUKSES ====================
/**
 * Tampilkan notifikasi sukses
 * @param {string} judul - Judul notifikasi
 * @param {string} pesan - Pesan notifikasi
 */
export const notifikasiSukses = (judul, pesan = '') => {
  return Swal.fire({
    ...konfigurasiDefault,
    icon: 'success',
    title: judul,
    text: pesan,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false
  })
}

// ==================== NOTIFIKASI ERROR ====================
/**
 * Tampilkan notifikasi error
 * @param {string} judul - Judul notifikasi
 * @param {string} pesan - Pesan notifikasi
 */
export const notifikasiError = (judul, pesan = '') => {
  return Swal.fire({
    ...konfigurasiDefault,
    icon: 'error',
    title: judul,
    text: pesan,
    confirmButtonText: 'Tutup'
  })
}

// ==================== NOTIFIKASI PERINGATAN ====================
/**
 * Tampilkan notifikasi peringatan
 * @param {string} judul - Judul notifikasi
 * @param {string} pesan - Pesan notifikasi
 */
export const notifikasiPeringatan = (judul, pesan = '') => {
  return Swal.fire({
    ...konfigurasiDefault,
    icon: 'warning',
    title: judul,
    text: pesan,
    confirmButtonText: 'Mengerti'
  })
}

// ==================== NOTIFIKASI INFO ====================
/**
 * Tampilkan notifikasi info
 * @param {string} judul - Judul notifikasi
 * @param {string} pesan - Pesan notifikasi
 */
export const notifikasiInfo = (judul, pesan = '') => {
  return Swal.fire({
    ...konfigurasiDefault,
    icon: 'info',
    title: judul,
    text: pesan,
    confirmButtonText: 'OK'
  })
}

// ==================== KONFIRMASI ====================
/**
 * Tampilkan dialog konfirmasi
 * @param {string} judul - Judul konfirmasi
 * @param {string} pesan - Pesan konfirmasi
 * @param {string} tombolKonfirmasi - Text tombol konfirmasi
 * @param {string} tombolBatal - Text tombol batal
 * @returns {Promise<boolean>} True jika dikonfirmasi
 */
export const konfirmasi = async (
  judul,
  pesan = '',
  tombolKonfirmasi = 'Ya, Lanjutkan',
  tombolBatal = 'Batal'
) => {
  const hasil = await Swal.fire({
    ...konfigurasiDefault,
    icon: 'question',
    title: judul,
    text: pesan,
    showCancelButton: true,
    confirmButtonText: tombolKonfirmasi,
    cancelButtonText: tombolBatal,
    reverseButtons: true
  })
  
  return hasil.isConfirmed
}

// ==================== KONFIRMASI HAPUS ====================
/**
 * Tampilkan dialog konfirmasi hapus
 * @param {string} namaItem - Nama item yang akan dihapus
 * @returns {Promise<boolean>} True jika dikonfirmasi
 */
export const konfirmasiHapus = async (namaItem = 'item ini') => {
  const hasil = await Swal.fire({
    ...konfigurasiDefault,
    icon: 'warning',
    title: 'Hapus Data?',
    html: `Apakah Anda yakin ingin menghapus <strong>${namaItem}</strong>?<br><small class="text-teks-sekunder">Tindakan ini tidak dapat dibatalkan.</small>`,
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#DC143C',
    reverseButtons: true
  })
  
  return hasil.isConfirmed
}

// ==================== INPUT DIALOG ====================
/**
 * Tampilkan dialog input
 * @param {string} judul - Judul dialog
 * @param {string} placeholder - Placeholder input
 * @param {string} inputType - Tipe input (text, number, etc)
 * @returns {Promise<string|null>} Nilai input atau null jika dibatalkan
 */
export const dialogInput = async (judul, placeholder = '', inputType = 'text') => {
  const hasil = await Swal.fire({
    ...konfigurasiDefault,
    title: judul,
    input: inputType,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Batal',
    inputValidator: (value) => {
      if (!value) {
        return 'Field ini wajib diisi!'
      }
    }
  })
  
  return hasil.isConfirmed ? hasil.value : null
}

// ==================== LOADING ====================
/**
 * Tampilkan loading
 * @param {string} pesan - Pesan loading
 */
export const tampilkanLoading = (pesan = 'Memproses...') => {
  Swal.fire({
    ...konfigurasiDefault,
    title: pesan,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

/**
 * Tutup loading
 */
export const tutupLoading = () => {
  Swal.close()
}

// ==================== TOAST ====================
/**
 * Tampilkan toast notification
 * @param {string} pesan - Pesan toast
 * @param {string} tipe - Tipe toast (success, error, warning, info)
 */
export const toast = (pesan, tipe = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#1a1a1a',
    color: '#ffffff',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: tipe,
    title: pesan
  })
}

// ==================== EXPORT DEFAULT ====================
export default {
  notifikasiSukses,
  notifikasiError,
  notifikasiPeringatan,
  notifikasiInfo,
  konfirmasi,
  konfirmasiHapus,
  dialogInput,
  tampilkanLoading,
  tutupLoading,
  toast
}
