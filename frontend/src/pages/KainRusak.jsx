/**
 * FabricFlow - Halaman Kain Rusak Cyberpunk
 * Pencatatan kerusakan dengan efek neon futuristik
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, AlertTriangle, Camera, Package } from 'lucide-react'
import useProdukStore from '../store/produkStore'
import useAuthStore from '../store/authStore'
import Kartu, { KartuStat } from '../components/umum/Kartu'
import Tombol from '../components/umum/Tombol'
import Tabel from '../components/umum/Tabel'
import Modal from '../components/umum/Modal'
import InputField, { SelectField } from '../components/umum/InputField'
import { formatTanggalWaktu, ambilDariStorage, simpanKeStorage, generateId } from '../utils/helper'
import { notifikasiSukses, notifikasiError } from '../utils/notifikasi'
import { STORAGE_KEYS, ALASAN_KERUSAKAN, TIPE_STOK } from '../utils/konstanta'

// ==================== HALAMAN KAIN RUSAK ====================
const KainRusak = () => {
  const { pengguna } = useAuthStore()
  const { daftarProduk, updateStok, cariProdukById } = useProdukStore()

  const [modalTerbuka, setModalTerbuka] = useState(false)
  const [formData, setFormData] = useState({ produkId: '', jumlah: '', alasan: '', foto: '' })

  const daftarRusak = ambilDariStorage(STORAGE_KEYS.KAIN_RUSAK, [])

  const handleSubmit = () => {
    if (!formData.produkId) { notifikasiError('Error', 'Pilih produk terlebih dahulu'); return }
    if (!formData.jumlah || parseFloat(formData.jumlah) <= 0) { notifikasiError('Error', 'Jumlah harus lebih dari 0'); return }
    if (!formData.alasan) { notifikasiError('Error', 'Pilih alasan kerusakan'); return }
    const produk = cariProdukById(formData.produkId)
    if (!produk) { notifikasiError('Error', 'Produk tidak ditemukan'); return }
    const jumlah = parseFloat(formData.jumlah)
    if (jumlah > produk.stok) { notifikasiError('Error', `Stok tidak mencukupi. Tersedia: ${produk.stok} ${produk.satuan}`); return }

    const recordBaru = { id: generateId('rsk'), produkId: formData.produkId, namaProduk: produk.nama, kodeProduk: produk.kode, jumlah, alasan: formData.alasan, foto: formData.foto || null, penggunaId: pengguna.id, namaPengguna: pengguna.nama, tanggal: new Date().toISOString() }
    const daftarLama = ambilDariStorage(STORAGE_KEYS.KAIN_RUSAK, [])
    simpanKeStorage(STORAGE_KEYS.KAIN_RUSAK, [recordBaru, ...daftarLama])
    updateStok(formData.produkId, -jumlah)

    const logBaru = { id: generateId('stk'), produkId: formData.produkId, namaProduk: produk.nama, jumlah: -jumlah, stokSebelum: produk.stok, stokSesudah: produk.stok - jumlah, tipe: TIPE_STOK.RUSAK, referensi: recordBaru.id, penggunaId: pengguna.id, namaPengguna: pengguna.nama, catatan: formData.alasan, tanggal: new Date().toISOString() }
    const logLama = ambilDariStorage(STORAGE_KEYS.STOK_LOG, [])
    simpanKeStorage(STORAGE_KEYS.STOK_LOG, [logBaru, ...logLama])

    notifikasiSukses('Berhasil', 'Kerusakan kain berhasil dicatat')
    setModalTerbuka(false)
    setFormData({ produkId: '', jumlah: '', alasan: '', foto: '' })
  }

  const kolomTabel = [
    { key: 'tanggal', label: 'Tanggal', sortable: true, render: (tanggal) => formatTanggalWaktu(tanggal) },
    { key: 'kodeProduk', label: 'Kode', render: (kode) => <span className="font-mono" style={{ color: '#00d4ff', textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>{kode}</span> },
    { key: 'namaProduk', label: 'Produk', sortable: true },
    { key: 'jumlah', label: 'Jumlah', render: (jumlah) => <span className="font-semibold" style={{ color: '#ff0040', textShadow: '0 0 10px rgba(255, 0, 64, 0.5)' }}>{jumlah} meter</span> },
    { key: 'alasan', label: 'Alasan', render: (alasan) => <span className="px-2 py-1 rounded-full text-xs" style={{ background: 'rgba(255, 255, 0, 0.2)', color: '#ffff00', border: '1px solid rgba(255, 255, 0, 0.3)', textShadow: '0 0 10px rgba(255, 255, 0, 0.5)' }}>{alasan}</span> },
    { key: 'foto', label: 'Foto', render: (foto) => foto ? <a href={foto} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#00d4ff' }}>Lihat Foto</a> : <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>-</span> },
    { key: 'namaPengguna', label: 'Dicatat Oleh' }
  ]

  const totalKerusakan = daftarRusak.reduce((sum, r) => sum + r.jumlah, 0)
  const kerusakanBulanIni = daftarRusak.filter(r => { const tanggal = new Date(r.tanggal); const sekarang = new Date(); return tanggal.getMonth() === sekarang.getMonth() && tanggal.getFullYear() === sekarang.getFullYear() }).length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(255, 255, 0, 0.3)' }}>Kain Rusak</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Pencatatan kerusakan kain</p>
        </div>
        <Tombol tipe="primer" onClick={() => setModalTerbuka(true)} ikon={<Plus size={20} />}>Catat Kerusakan</Tombol>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <KartuStat judul="Total Kerusakan" nilai={`${totalKerusakan.toFixed(1)} meter`} ikon={<AlertTriangle size={24} />} warna="merah" />
        <KartuStat judul="Kerusakan Bulan Ini" nilai={`${kerusakanBulanIni} kasus`} ikon={<Package size={24} />} warna="kuning" />
      </div>

      <Kartu warnaNeon="#ffff00">
        <Tabel kolom={kolomTabel} data={daftarRusak} pagination itemPerHalaman={10} kosongPesan="Belum ada catatan kerusakan" />
      </Kartu>

      <Modal buka={modalTerbuka} onTutup={() => setModalTerbuka(false)} judul="Catat Kerusakan Kain" ukuran="kecil" warnaNeon="#ffff00">
        <div className="space-y-4">
          <SelectField label="Pilih Produk" nama="produkId" nilai={formData.produkId} onChange={(e) => setFormData(prev => ({ ...prev, produkId: e.target.value }))} opsi={daftarProduk.map(p => ({ value: p.id, label: `${p.kode} - ${p.nama} (Stok: ${p.stok} ${p.satuan})` }))} placeholder="Pilih produk..." wajib />
          <InputField label="Jumlah Rusak (meter)" tipe="number" nama="jumlah" nilai={formData.jumlah} onChange={(e) => setFormData(prev => ({ ...prev, jumlah: e.target.value }))} placeholder="0" wajib />
          <SelectField label="Alasan Kerusakan" nama="alasan" nilai={formData.alasan} onChange={(e) => setFormData(prev => ({ ...prev, alasan: e.target.value }))} opsi={ALASAN_KERUSAKAN.map(a => ({ value: a, label: a }))} placeholder="Pilih alasan..." wajib />
          <InputField label="URL Foto Bukti" nama="foto" nilai={formData.foto} onChange={(e) => setFormData(prev => ({ ...prev, foto: e.target.value }))} placeholder="https://example.com/foto.jpg" helper="Opsional - masukkan URL foto kerusakan" ikon={<Camera size={20} />} />
          <div className="flex justify-end gap-3 pt-4">
            <Tombol tipe="ghost" onClick={() => setModalTerbuka(false)}>Batal</Tombol>
            <Tombol tipe="primer" onClick={handleSubmit}>Simpan</Tombol>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default KainRusak
