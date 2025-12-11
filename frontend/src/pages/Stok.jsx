/**
 * FabricFlow - Halaman Stok Cyberpunk
 * Manajemen stok dengan efek neon futuristik
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, TrendingDown, RefreshCw, Package, History } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useProdukStore from '../store/produkStore'
import Kartu, { KartuStat } from '../components/umum/Kartu'
import Tombol from '../components/umum/Tombol'
import Tabel from '../components/umum/Tabel'
import Modal from '../components/umum/Modal'
import InputField, { SelectField } from '../components/umum/InputField'
import { BadgeStok } from '../components/umum/Badge'
import { formatRupiah, formatTanggalWaktu, ambilDariStorage, simpanKeStorage, generateId } from '../utils/helper'
import { notifikasiSukses, notifikasiError } from '../utils/notifikasi'
import { STORAGE_KEYS, TIPE_STOK } from '../utils/konstanta'

// ==================== HALAMAN STOK ====================
const Stok = () => {
  const { pengguna, adalahAdmin } = useAuthStore()
  const { daftarProduk, updateStok, cariProdukById } = useProdukStore()

  const [pencarian, setPencarian] = useState('')
  const [tabAktif, setTabAktif] = useState('stok')
  const [modalAdjustment, setModalAdjustment] = useState(false)
  const [formData, setFormData] = useState({ produkId: '', tipe: 'masuk', jumlah: '', catatan: '' })

  const stokLog = ambilDariStorage(STORAGE_KEYS.STOK_LOG, [])
  const produkFiltered = daftarProduk.filter(produk => produk.nama.toLowerCase().includes(pencarian.toLowerCase()) || produk.kode.toLowerCase().includes(pencarian.toLowerCase()))

  const handleAdjustment = () => {
    if (!formData.produkId) { notifikasiError('Error', 'Pilih produk terlebih dahulu'); return }
    if (!formData.jumlah || parseFloat(formData.jumlah) <= 0) { notifikasiError('Error', 'Jumlah harus lebih dari 0'); return }
    const produk = cariProdukById(formData.produkId)
    if (!produk) { notifikasiError('Error', 'Produk tidak ditemukan'); return }
    const jumlah = parseFloat(formData.jumlah)
    const perubahanStok = formData.tipe === 'masuk' ? jumlah : -jumlah
    if (formData.tipe === 'keluar' && produk.stok < jumlah) { notifikasiError('Error', 'Stok tidak mencukupi'); return }
    const hasil = updateStok(formData.produkId, perubahanStok)
    if (hasil.sukses) {
      const logBaru = { id: generateId('stk'), produkId: formData.produkId, namaProduk: produk.nama, jumlah: perubahanStok, stokSebelum: produk.stok, stokSesudah: hasil.stokBaru, tipe: formData.tipe === 'masuk' ? TIPE_STOK.MASUK : TIPE_STOK.KELUAR, referensi: 'Adjustment Manual', penggunaId: pengguna.id, namaPengguna: pengguna.nama, catatan: formData.catatan, tanggal: new Date().toISOString() }
      const logLama = ambilDariStorage(STORAGE_KEYS.STOK_LOG, [])
      simpanKeStorage(STORAGE_KEYS.STOK_LOG, [logBaru, ...logLama])
      notifikasiSukses('Berhasil', `Stok berhasil di-${formData.tipe === 'masuk' ? 'tambah' : 'kurangi'}`)
      setModalAdjustment(false)
      setFormData({ produkId: '', tipe: 'masuk', jumlah: '', catatan: '' })
    }
  }

  const kolomStok = [
    { key: 'kode', label: 'Kode', sortable: true, render: (kode) => <span className="font-mono" style={{ color: '#00d4ff', textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>{kode}</span> },
    { key: 'nama', label: 'Nama Produk', sortable: true },
    { key: 'kategori', label: 'Kategori', sortable: true },
    { key: 'stok', label: 'Stok', sortable: true, render: (stok, produk) => <div className="flex items-center gap-2"><span className="font-semibold" style={{ color: stok < 10 ? '#ffff00' : '#ffffff' }}>{stok} {produk.satuan}</span><BadgeStok stok={stok} /></div> },
    { key: 'harga', label: 'Nilai Stok', sortable: true, render: (_, produk) => <span className="font-semibold" style={{ color: '#ff0040', textShadow: '0 0 10px rgba(255, 0, 64, 0.5)' }}>{formatRupiah(produk.stok * produk.harga)}</span> }
  ]

  const kolomHistory = [
    { key: 'tanggal', label: 'Tanggal', sortable: true, render: (tanggal) => formatTanggalWaktu(tanggal) },
    { key: 'namaProduk', label: 'Produk', sortable: true },
    { key: 'tipe', label: 'Tipe', render: (tipe) => {
      const config = { masuk: { icon: TrendingUp, color: '#00ff88', bg: 'rgba(0, 255, 136, 0.2)' }, keluar: { icon: TrendingDown, color: '#ff0040', bg: 'rgba(255, 0, 64, 0.2)' }, penjualan: { icon: TrendingDown, color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.2)' }, rusak: { icon: TrendingDown, color: '#ffff00', bg: 'rgba(255, 255, 0, 0.2)' }, adjustment: { icon: RefreshCw, color: '#bf00ff', bg: 'rgba(191, 0, 255, 0.2)' } }
      const cfg = config[tipe] || config.adjustment
      const Icon = cfg.icon
      return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}50`, textShadow: `0 0 10px ${cfg.color}50` }}><Icon size={12} />{tipe}</span>
    }},
    { key: 'jumlah', label: 'Perubahan', render: (jumlah) => <span style={{ color: jumlah > 0 ? '#00ff88' : '#ff0040', textShadow: `0 0 10px ${jumlah > 0 ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 0, 64, 0.5)'}` }}>{jumlah > 0 ? '+' : ''}{jumlah}</span> },
    { key: 'stokSesudah', label: 'Stok Akhir' },
    { key: 'namaPengguna', label: 'Oleh' },
    { key: 'catatan', label: 'Catatan', render: (catatan) => catatan || '-' }
  ]

  const totalNilaiStok = daftarProduk.reduce((sum, p) => sum + (p.stok * p.harga), 0)
  const totalItem = daftarProduk.reduce((sum, p) => sum + p.stok, 0)
  const produkStokRendah = daftarProduk.filter(p => p.stok < 10).length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(191, 0, 255, 0.3)' }}>Manajemen Stok</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Pantau dan kelola stok produk</p>
        </div>
        {adalahAdmin() && <Tombol tipe="primer" onClick={() => setModalAdjustment(true)} ikon={<RefreshCw size={20} />}>Adjustment Stok</Tombol>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KartuStat judul="Total Item" nilai={`${totalItem.toFixed(1)} meter`} ikon={<Package size={24} />} warna="cyan" />
        <KartuStat judul="Nilai Stok" nilai={formatRupiah(totalNilaiStok)} ikon={<TrendingUp size={24} />} warna="merah" />
        <KartuStat judul="Stok Menipis" nilai={`${produkStokRendah} produk`} ikon={<TrendingDown size={24} />} warna="kuning" />
      </div>

      <div className="flex gap-2">
        <motion.button onClick={() => setTabAktif('stok')} className="px-4 py-2 rounded-xl font-medium flex items-center gap-2" style={{ background: tabAktif === 'stok' ? 'linear-gradient(135deg, #8B0000, #DC143C)' : 'rgba(0, 0, 0, 0.4)', border: `1px solid ${tabAktif === 'stok' ? '#ff0040' : 'rgba(255, 255, 255, 0.1)'}`, color: '#ffffff', boxShadow: tabAktif === 'stok' ? '0 0 20px rgba(255, 0, 64, 0.4)' : 'none' }} whileHover={{ borderColor: tabAktif === 'stok' ? '#ff0040' : '#00d4ff' }}><Package size={18} />Daftar Stok</motion.button>
        <motion.button onClick={() => setTabAktif('history')} className="px-4 py-2 rounded-xl font-medium flex items-center gap-2" style={{ background: tabAktif === 'history' ? 'linear-gradient(135deg, #8B0000, #DC143C)' : 'rgba(0, 0, 0, 0.4)', border: `1px solid ${tabAktif === 'history' ? '#ff0040' : 'rgba(255, 255, 255, 0.1)'}`, color: '#ffffff', boxShadow: tabAktif === 'history' ? '0 0 20px rgba(255, 0, 64, 0.4)' : 'none' }} whileHover={{ borderColor: tabAktif === 'history' ? '#ff0040' : '#00d4ff' }}><History size={18} />Riwayat</motion.button>
      </div>

      <Kartu warnaNeon={tabAktif === 'stok' ? '#bf00ff' : '#00d4ff'}>
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={20} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            <input type="text" value={pencarian} onChange={(e) => setPencarian(e.target.value)} placeholder="Cari produk..." className="w-full pl-10 pr-4 py-2.5 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }} onFocus={(e) => { e.target.style.borderColor = '#bf00ff'; e.target.style.boxShadow = '0 0 15px rgba(191, 0, 255, 0.3)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none' }} />
          </div>
        </div>
        {tabAktif === 'stok' ? <Tabel kolom={kolomStok} data={produkFiltered} pagination itemPerHalaman={10} /> : <Tabel kolom={kolomHistory} data={stokLog} pagination itemPerHalaman={10} kosongPesan="Belum ada riwayat perubahan stok" />}
      </Kartu>

      <Modal buka={modalAdjustment} onTutup={() => setModalAdjustment(false)} judul="Adjustment Stok" ukuran="kecil" warnaNeon="#bf00ff">
        <div className="space-y-4">
          <SelectField label="Pilih Produk" nama="produkId" nilai={formData.produkId} onChange={(e) => setFormData(prev => ({ ...prev, produkId: e.target.value }))} opsi={daftarProduk.map(p => ({ value: p.id, label: `${p.kode} - ${p.nama} (Stok: ${p.stok})` }))} placeholder="Pilih produk..." wajib />
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Tipe</label>
            <div className="flex gap-2">
              <motion.button type="button" onClick={() => setFormData(prev => ({ ...prev, tipe: 'masuk' }))} className="flex-1 py-2 rounded-xl font-medium flex items-center justify-center gap-2" style={{ background: formData.tipe === 'masuk' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 0, 0, 0.4)', border: `1px solid ${formData.tipe === 'masuk' ? '#00ff88' : 'rgba(255, 255, 255, 0.1)'}`, color: formData.tipe === 'masuk' ? '#00ff88' : 'rgba(255, 255, 255, 0.6)' }} whileHover={{ borderColor: '#00ff88' }}><TrendingUp size={18} />Masuk</motion.button>
              <motion.button type="button" onClick={() => setFormData(prev => ({ ...prev, tipe: 'keluar' }))} className="flex-1 py-2 rounded-xl font-medium flex items-center justify-center gap-2" style={{ background: formData.tipe === 'keluar' ? 'rgba(255, 0, 64, 0.2)' : 'rgba(0, 0, 0, 0.4)', border: `1px solid ${formData.tipe === 'keluar' ? '#ff0040' : 'rgba(255, 255, 255, 0.1)'}`, color: formData.tipe === 'keluar' ? '#ff0040' : 'rgba(255, 255, 255, 0.6)' }} whileHover={{ borderColor: '#ff0040' }}><TrendingDown size={18} />Keluar</motion.button>
            </div>
          </div>
          <InputField label="Jumlah (meter)" tipe="number" nama="jumlah" nilai={formData.jumlah} onChange={(e) => setFormData(prev => ({ ...prev, jumlah: e.target.value }))} placeholder="0" wajib />
          <InputField label="Catatan" tipe="textarea" nama="catatan" nilai={formData.catatan} onChange={(e) => setFormData(prev => ({ ...prev, catatan: e.target.value }))} placeholder="Alasan adjustment..." />
          <div className="flex justify-end gap-3 pt-4">
            <Tombol tipe="ghost" onClick={() => setModalAdjustment(false)}>Batal</Tombol>
            <Tombol tipe="primer" onClick={handleAdjustment}>Simpan</Tombol>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default Stok
