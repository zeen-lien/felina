/**
 * FabricFlow - Halaman Kasir (POS) Cyberpunk
 * Point of Sale dengan efek neon futuristik
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  CreditCard,
  Banknote,
  QrCode,
  Building2,
  Receipt,
  CheckCircle
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import useProdukStore from '../store/produkStore'
import useTransaksiStore from '../store/transaksiStore'
import Kartu from '../components/umum/Kartu'
import Tombol from '../components/umum/Tombol'
import Modal from '../components/umum/Modal'
import { formatRupiah } from '../utils/helper'
import { notifikasiSukses, notifikasiError, konfirmasi } from '../utils/notifikasi'
import { METODE_PEMBAYARAN, KATEGORI_KAIN } from '../utils/konstanta'

const ikonMetode = { Banknote, Building2, QrCode, CreditCard }

// ==================== HALAMAN KASIR ====================
const Kasir = () => {
  const { pengguna } = useAuthStore()
  const { daftarProduk, updateStok } = useProdukStore()
  const {
    keranjang, diskon, metodeBayar,
    tambahKeKeranjang, updateJumlahKeranjang, hapusDariKeranjang,
    kosongkanKeranjang, setDiskon, setMetodeBayar, hitungTotal, prosesTransaksi
  } = useTransaksiStore()

  const [pencarian, setPencarian] = useState('')
  const [kategoriFilter, setKategoriFilter] = useState('semua')
  const [modalStruk, setModalStruk] = useState(false)
  const [transaksiSelesai, setTransaksiSelesai] = useState(null)
  const [jumlahInput, setJumlahInput] = useState({})

  const produkFiltered = daftarProduk.filter(produk => {
    const cocokPencarian = produk.nama.toLowerCase().includes(pencarian.toLowerCase()) ||
                          produk.kode.toLowerCase().includes(pencarian.toLowerCase())
    const cocokKategori = kategoriFilter === 'semua' || produk.kategori === kategoriFilter
    return cocokPencarian && cocokKategori
  })

  const { total, grandTotal } = hitungTotal()

  const handleTambahKeranjang = (produk) => {
    const jumlah = parseFloat(jumlahInput[produk.id]) || 1
    if (jumlah <= 0) { notifikasiError('Jumlah Tidak Valid', 'Jumlah harus lebih dari 0'); return }
    if (jumlah > produk.stok) { notifikasiError('Stok Tidak Cukup', `Stok tersedia: ${produk.stok} ${produk.satuan}`); return }
    tambahKeKeranjang(produk, jumlah)
    setJumlahInput(prev => ({ ...prev, [produk.id]: '' }))
    notifikasiSukses('Ditambahkan', `${produk.nama} ditambahkan ke keranjang`)
  }

  const handleProsesTransaksi = async () => {
    if (keranjang.length === 0) { notifikasiError('Keranjang Kosong', 'Tambahkan produk terlebih dahulu'); return }
    const konfirm = await konfirmasi('Proses Transaksi?', `Total: ${formatRupiah(grandTotal)}`, 'Ya, Proses', 'Batal')
    if (!konfirm) return
    for (const item of keranjang) { updateStok(item.produkId, -item.jumlah) }
    const hasil = prosesTransaksi(pengguna)
    if (hasil.sukses) {
      setTransaksiSelesai(hasil.transaksi)
      setModalStruk(true)
      notifikasiSukses('Transaksi Berhasil', `Nomor: ${hasil.transaksi.nomor}`)
    }
  }

  const handleBatalTransaksi = async () => {
    if (keranjang.length === 0) return
    const konfirm = await konfirmasi('Batalkan Transaksi?', 'Semua item akan dihapus', 'Ya, Batalkan', 'Tidak')
    if (konfirm) { kosongkanKeranjang(); notifikasiSukses('Dibatalkan', 'Keranjang dikosongkan') }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Panel Kiri - Daftar Produk */}
      <div className="flex-1">
        <Kartu className="!p-4" warnaNeon="#00ff88">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={20} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
              <input
                type="text"
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
                placeholder="Cari produk..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl transition-all duration-300"
                style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }}
                onFocus={(e) => { e.target.style.borderColor = '#00ff88'; e.target.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.3)' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none' }}
              />
            </div>
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl cursor-pointer"
              style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }}
            >
              <option value="semua" style={{ background: '#0a0a0f' }}>Semua Kategori</option>
              {KATEGORI_KAIN.map(kat => <option key={kat.id} value={kat.id} style={{ background: '#0a0a0f' }}>{kat.nama}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {produkFiltered.map((produk) => (
                <motion.div
                  key={produk.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl p-3 transition-all duration-300"
                  style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                  whileHover={{ borderColor: 'rgba(0, 255, 136, 0.5)', boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)' }}
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                      {produk.foto ? <img src={produk.foto} alt={produk.nama} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ShoppingCart size={24} style={{ color: 'rgba(255, 255, 255, 0.3)' }} /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: '#ffffff' }}>{produk.nama}</p>
                      <p className="text-xs" style={{ color: '#00d4ff' }}>{produk.kode}</p>
                      <p className="text-sm font-bold mt-1" style={{ color: '#ff0040', textShadow: '0 0 10px rgba(255, 0, 64, 0.5)' }}>{formatRupiah(produk.harga)}/{produk.satuan}</p>
                      <p className={`text-xs ${produk.stok < 10 ? '' : ''}`} style={{ color: produk.stok < 10 ? '#ffff00' : 'rgba(255, 255, 255, 0.5)' }}>Stok: {produk.stok} {produk.satuan}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={jumlahInput[produk.id] || ''}
                      onChange={(e) => setJumlahInput(prev => ({ ...prev, [produk.id]: e.target.value }))}
                      placeholder="Jml"
                      className="w-20 px-2 py-1.5 rounded-lg text-sm text-center"
                      style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }}
                    />
                    <Tombol tipe="primer" ukuran="kecil" onClick={() => handleTambahKeranjang(produk)} disabled={produk.stok <= 0} className="flex-1" ikon={<Plus size={16} />}>Tambah</Tombol>
                  </div>
                </motion.div>
              ))}
              {produkFiltered.length === 0 && <div className="col-span-full text-center py-12"><Search size={48} className="mx-auto mb-2" style={{ color: 'rgba(255, 255, 255, 0.2)', filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))' }} /><p className="mt-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Produk tidak ditemukan</p></div>}
            </div>
        </Kartu>
      </div>

      {/* Panel Kanan - Keranjang */}
      <div className="w-full lg:w-96">
        <Kartu className="!p-4" warnaNeon="#ff0040">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} style={{ color: '#ff0040', filter: 'drop-shadow(0 0 5px #ff0040)' }} />
              <h3 className="font-semibold" style={{ color: '#ffffff' }}>Keranjang</h3>
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(255, 0, 64, 0.2)', color: '#ff0040', border: '1px solid rgba(255, 0, 64, 0.3)' }}>{keranjang.length}</span>
            </div>
            {keranjang.length > 0 && <button onClick={handleBatalTransaksi} className="text-xs transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }} onMouseOver={(e) => e.target.style.color = '#ff0040'} onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}>Kosongkan</button>}
          </div>

          <div className="space-y-2 mb-4">
            <AnimatePresence>
              {keranjang.map((item) => (
                <motion.div key={item.produkId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl p-3" style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#ffffff' }}>{item.namaProduk}</p>
                      <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{formatRupiah(item.hargaSatuan)}/meter</p>
                    </div>
                    <button onClick={() => hapusDariKeranjang(item.produkId)} className="p-1 transition-colors" style={{ color: 'rgba(255, 255, 255, 0.5)' }} onMouseOver={(e) => e.target.style.color = '#ff0040'} onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}><Trash2 size={16} /></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateJumlahKeranjang(item.produkId, Math.max(0.1, item.jumlah - 0.5))} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.7)' }}><Minus size={14} /></button>
                      <span className="w-16 text-center text-sm font-medium" style={{ color: '#ffffff' }}>{item.jumlah} m</span>
                      <button onClick={() => updateJumlahKeranjang(item.produkId, Math.min(item.stokTersedia, item.jumlah + 0.5))} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.7)' }}><Plus size={14} /></button>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: '#ff0040', textShadow: '0 0 10px rgba(255, 0, 64, 0.5)' }}>{formatRupiah(item.subtotal)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {keranjang.length === 0 && <div className="text-center py-12"><ShoppingCart size={48} className="mx-auto mb-2" style={{ color: 'rgba(255, 255, 255, 0.2)' }} /><p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Keranjang kosong</p></div>}
          </div>

          {keranjang.length > 0 && (
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Diskon (Rp)</label>
                <input type="number" value={diskon || ''} onChange={(e) => setDiskon(e.target.value)} placeholder="0" className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Metode Pembayaran</label>
                <div className="grid grid-cols-4 gap-2">
                  {METODE_PEMBAYARAN.map((metode) => {
                    const Ikon = ikonMetode[metode.ikon]
                    return (
                      <motion.button key={metode.id} onClick={() => setMetodeBayar(metode.id)} className="p-2 rounded-lg flex flex-col items-center gap-1 transition-all" style={{ background: metodeBayar === metode.id ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)', border: `1px solid ${metodeBayar === metode.id ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'}`, color: metodeBayar === metode.id ? '#00d4ff' : 'rgba(255, 255, 255, 0.5)', boxShadow: metodeBayar === metode.id ? '0 0 15px rgba(0, 212, 255, 0.3)' : 'none' }} whileHover={{ borderColor: '#00d4ff' }}>
                        <Ikon size={18} />
                        <span className="text-[10px]">{metode.nama.split(' ')[0]}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex justify-between text-sm"><span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Subtotal</span><span style={{ color: '#ffffff' }}>{formatRupiah(total)}</span></div>
            <div className="flex justify-between text-sm"><span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Diskon</span><span style={{ color: '#ff0040' }}>- {formatRupiah(diskon)}</span></div>
            <div className="flex justify-between text-lg font-bold"><span style={{ color: '#ffffff' }}>Total</span><span style={{ background: 'linear-gradient(90deg, #ff0040, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{formatRupiah(grandTotal)}</span></div>
            <Tombol tipe="primer" penuh onClick={handleProsesTransaksi} disabled={keranjang.length === 0} ikon={<Receipt size={20} />}>Proses Transaksi</Tombol>
          </div>
        </Kartu>
      </div>

      {/* Modal Struk */}
      <Modal buka={modalStruk} onTutup={() => setModalStruk(false)} judul="Transaksi Berhasil" ukuran="kecil" warnaNeon="#00ff88">
        {transaksiSelesai && (
          <div className="text-center">
            <motion.div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 255, 136, 0.2)', border: '1px solid rgba(0, 255, 136, 0.5)' }} animate={{ boxShadow: ['0 0 20px rgba(0, 255, 136, 0.3)', '0 0 40px rgba(0, 255, 136, 0.5)', '0 0 20px rgba(0, 255, 136, 0.3)'] }} transition={{ duration: 2, repeat: Infinity }}><CheckCircle size={32} style={{ color: '#00ff88', filter: 'drop-shadow(0 0 10px #00ff88)' }} /></motion.div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.5)' }}>{transaksiSelesai.nomor}</h3>
            <div className="rounded-xl p-4 mb-4 text-left" style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              {transaksiSelesai.items.map((item, idx) => <div key={idx} className="flex justify-between text-sm py-1"><span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.namaProduk} ({item.jumlah}m)</span><span style={{ color: '#ffffff' }}>{formatRupiah(item.subtotal)}</span></div>)}
              <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex justify-between text-sm"><span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Diskon</span><span style={{ color: '#ff0040' }}>- {formatRupiah(transaksiSelesai.diskon)}</span></div>
                <div className="flex justify-between font-bold mt-1"><span style={{ color: '#ffffff' }}>Total</span><span style={{ color: '#00ff88' }}>{formatRupiah(transaksiSelesai.grandTotal)}</span></div>
              </div>
            </div>
            <Tombol tipe="primer" penuh onClick={() => setModalStruk(false)}>Selesai</Tombol>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Kasir
