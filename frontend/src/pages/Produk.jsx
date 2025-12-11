/**
 * FabricFlow - Halaman Produk Cyberpunk
 * Manajemen produk dengan efek neon futuristik
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, Package, Filter } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useProdukStore from '../store/produkStore'
import Kartu from '../components/umum/Kartu'
import Tombol from '../components/umum/Tombol'
import Tabel from '../components/umum/Tabel'
import Modal from '../components/umum/Modal'
import InputField, { SelectField } from '../components/umum/InputField'
import { BadgeStok } from '../components/umum/Badge'
import { formatRupiah } from '../utils/helper'
import { notifikasiSukses, notifikasiError, konfirmasiHapus } from '../utils/notifikasi'
import { KATEGORI_KAIN, WARNA_KAIN } from '../utils/konstanta'

// ==================== HALAMAN PRODUK ====================
const Produk = () => {
  const { adalahAdmin } = useAuthStore()
  const { daftarProduk, tambahProduk, updateProduk, hapusProduk } = useProdukStore()

  const [pencarian, setPencarian] = useState('')
  const [kategoriFilter, setKategoriFilter] = useState('semua')
  const [modalTerbuka, setModalTerbuka] = useState(false)
  const [modeEdit, setModeEdit] = useState(false)
  const [produkEdit, setProdukEdit] = useState(null)
  const [formData, setFormData] = useState({ kode: '', nama: '', kategori: '', warna: '', harga: '', stok: '', satuan: 'meter', foto: '', deskripsi: '' })
  const [errors, setErrors] = useState({})

  const produkFiltered = daftarProduk.filter(produk => {
    const cocokPencarian = produk.nama.toLowerCase().includes(pencarian.toLowerCase()) || produk.kode.toLowerCase().includes(pencarian.toLowerCase())
    const cocokKategori = kategoriFilter === 'semua' || produk.kategori === kategoriFilter
    return cocokPencarian && cocokKategori
  })

  const resetForm = () => { setFormData({ kode: '', nama: '', kategori: '', warna: '', harga: '', stok: '', satuan: 'meter', foto: '', deskripsi: '' }); setErrors({}); setModeEdit(false); setProdukEdit(null) }
  const bukaModalTambah = () => { resetForm(); setModalTerbuka(true) }
  const bukaModalEdit = (produk) => { setFormData({ kode: produk.kode, nama: produk.nama, kategori: produk.kategori, warna: produk.warna, harga: produk.harga.toString(), stok: produk.stok.toString(), satuan: produk.satuan, foto: produk.foto || '', deskripsi: produk.deskripsi || '' }); setProdukEdit(produk); setModeEdit(true); setModalTerbuka(true) }
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' })) }

  const validasiForm = () => {
    const errorBaru = {}
    if (!formData.nama.trim()) errorBaru.nama = 'Nama produk wajib diisi'
    if (!formData.kategori) errorBaru.kategori = 'Kategori wajib dipilih'
    if (!formData.harga || parseFloat(formData.harga) <= 0) errorBaru.harga = 'Harga harus lebih dari 0'
    if (!modeEdit && (!formData.stok || parseFloat(formData.stok) < 0)) errorBaru.stok = 'Stok tidak boleh negatif'
    setErrors(errorBaru)
    return Object.keys(errorBaru).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validasiForm()) return
    if (modeEdit) {
      const hasil = updateProduk(produkEdit.id, formData)
      if (hasil.sukses) { notifikasiSukses('Berhasil', 'Produk berhasil diupdate'); setModalTerbuka(false); resetForm() }
      else notifikasiError('Gagal', hasil.pesan)
    } else {
      const hasil = tambahProduk(formData)
      if (hasil.sukses) { notifikasiSukses('Berhasil', 'Produk berhasil ditambahkan'); setModalTerbuka(false); resetForm() }
      else notifikasiError('Gagal', hasil.pesan)
    }
  }

  const handleHapus = async (produk) => {
    const konfirm = await konfirmasiHapus(produk.nama)
    if (konfirm) {
      const hasil = hapusProduk(produk.id)
      if (hasil.sukses) notifikasiSukses('Berhasil', 'Produk berhasil dihapus')
      else notifikasiError('Gagal', hasil.pesan)
    }
  }

  const kolomTabel = [
    { key: 'foto', label: 'Foto', render: (_, produk) => (
      <div className="w-12 h-12 rounded-lg overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
        {produk.foto ? <img src={produk.foto} alt={produk.nama} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Package size={20} style={{ color: 'rgba(255, 255, 255, 0.3)' }} /></div>}
      </div>
    )},
    { key: 'kode', label: 'Kode', sortable: true, render: (kode) => <span className="font-mono" style={{ color: '#00d4ff', textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>{kode}</span> },
    { key: 'nama', label: 'Nama Produk', sortable: true },
    { key: 'kategori', label: 'Kategori', sortable: true, render: (kategori) => {
      const kat = KATEGORI_KAIN.find(k => k.id === kategori)
      return <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${kat?.warna}20`, color: kat?.warna, border: `1px solid ${kat?.warna}50` }}>{kat?.nama || kategori}</span>
    }},
    { key: 'harga', label: 'Harga', sortable: true, render: (harga, produk) => <span className="font-semibold" style={{ color: '#ff0040', textShadow: '0 0 10px rgba(255, 0, 64, 0.5)' }}>{formatRupiah(harga)}/{produk.satuan}</span> },
    { key: 'stok', label: 'Stok', sortable: true, render: (stok, produk) => <div className="flex items-center gap-2"><span>{stok} {produk.satuan}</span><BadgeStok stok={stok} /></div> },
    { key: 'aksi', label: 'Aksi', render: (_, produk) => (
      <div className="flex items-center gap-2">
        {adalahAdmin() && (
          <>
            <motion.button onClick={() => bukaModalEdit(produk)} className="p-2 rounded-lg" style={{ color: '#00d4ff' }} whileHover={{ background: 'rgba(0, 212, 255, 0.2)', boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)' }} title="Edit"><Edit size={16} /></motion.button>
            <motion.button onClick={() => handleHapus(produk)} className="p-2 rounded-lg" style={{ color: '#ff0040' }} whileHover={{ background: 'rgba(255, 0, 64, 0.2)', boxShadow: '0 0 15px rgba(255, 0, 64, 0.3)' }} title="Hapus"><Trash2 size={16} /></motion.button>
          </>
        )}
      </div>
    )}
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>Produk</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Kelola produk kain toko Anda</p>
        </div>
        {adalahAdmin() && <Tombol tipe="primer" onClick={bukaModalTambah} ikon={<Plus size={20} />}>Tambah Produk</Tombol>}
      </div>

      {/* Filter & Search */}
      <Kartu warnaNeon="#00ff88">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={20} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            <input type="text" value={pencarian} onChange={(e) => setPencarian(e.target.value)} placeholder="Cari produk berdasarkan nama atau kode..." className="w-full pl-10 pr-4 py-2.5 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }} onFocus={(e) => { e.target.style.borderColor = '#00ff88'; e.target.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.3)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            <select value={kategoriFilter} onChange={(e) => setKategoriFilter(e.target.value)} className="px-4 py-2.5 rounded-xl cursor-pointer" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }}>
              <option value="semua" style={{ background: '#0a0a0f' }}>Semua Kategori</option>
              {KATEGORI_KAIN.map(kat => <option key={kat.id} value={kat.id} style={{ background: '#0a0a0f' }}>{kat.nama}</option>)}
            </select>
          </div>
        </div>
      </Kartu>

      {/* Tabel Produk */}
      <Kartu warnaNeon="#00d4ff">
        <Tabel kolom={kolomTabel} data={produkFiltered} pagination itemPerHalaman={10} kosongPesan="Tidak ada produk ditemukan" />
      </Kartu>

      {/* Modal Tambah/Edit */}
      <Modal buka={modalTerbuka} onTutup={() => { setModalTerbuka(false); resetForm() }} judul={modeEdit ? 'Edit Produk' : 'Tambah Produk Baru'} ukuran="besar" warnaNeon="#00ff88">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Kode Produk" nama="kode" nilai={formData.kode} onChange={handleChange} placeholder="Contoh: KTN-001" helper="Kosongkan untuk generate otomatis" disabled={modeEdit} />
            <InputField label="Nama Produk" nama="nama" nilai={formData.nama} onChange={handleChange} placeholder="Nama kain" error={errors.nama} wajib />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField label="Kategori" nama="kategori" nilai={formData.kategori} onChange={handleChange} opsi={KATEGORI_KAIN.map(k => ({ value: k.id, label: k.nama }))} placeholder="Pilih kategori" error={errors.kategori} wajib />
            <SelectField label="Warna" nama="warna" nilai={formData.warna} onChange={handleChange} opsi={WARNA_KAIN.map(w => ({ value: w, label: w }))} placeholder="Pilih warna" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Harga per Meter" tipe="number" nama="harga" nilai={formData.harga} onChange={handleChange} placeholder="0" error={errors.harga} wajib />
            <InputField label="Stok" tipe="number" nama="stok" nilai={formData.stok} onChange={handleChange} placeholder="0" error={errors.stok} disabled={modeEdit} helper={modeEdit ? 'Gunakan menu Stok untuk adjustment' : ''} />
            <SelectField label="Satuan" nama="satuan" nilai={formData.satuan} onChange={handleChange} opsi={[{ value: 'meter', label: 'Meter' }, { value: 'yard', label: 'Yard' }]} />
          </div>
          <InputField label="URL Foto" nama="foto" nilai={formData.foto} onChange={handleChange} placeholder="https://example.com/foto.jpg" helper="Masukkan URL gambar produk" />
          <InputField label="Deskripsi" tipe="textarea" nama="deskripsi" nilai={formData.deskripsi} onChange={handleChange} placeholder="Deskripsi produk..." />
          <div className="flex justify-end gap-3 pt-4">
            <Tombol tipe="ghost" onClick={() => { setModalTerbuka(false); resetForm() }}>Batal</Tombol>
            <Tombol tipe="primer">{modeEdit ? 'Update' : 'Simpan'}</Tombol>
          </div>
        </form>
      </Modal>
    </motion.div>
  )
}

export default Produk
