/**
 * FabricFlow - Halaman Transaksi Cyberpunk
 * Daftar transaksi dengan efek neon futuristik
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Eye, XCircle, Receipt } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useTransaksiStore from '../store/transaksiStore'
import Kartu, { KartuStat } from '../components/umum/Kartu'
import Tombol from '../components/umum/Tombol'
import Tabel from '../components/umum/Tabel'
import Modal from '../components/umum/Modal'
import { BadgeStatusTransaksi } from '../components/umum/Badge'
import { formatRupiah, formatTanggalWaktu } from '../utils/helper'
import { notifikasiSukses, konfirmasi } from '../utils/notifikasi'
import { METODE_PEMBAYARAN } from '../utils/konstanta'

// ==================== HALAMAN TRANSAKSI ====================
const Transaksi = () => {
  const { adalahAdmin } = useAuthStore()
  const { daftarTransaksi, voidTransaksi } = useTransaksiStore()

  const [pencarian, setPencarian] = useState('')
  const [filterStatus, setFilterStatus] = useState('semua')
  const [modalDetail, setModalDetail] = useState(false)
  const [transaksiTerpilih, setTransaksiTerpilih] = useState(null)

  const transaksiFiltered = daftarTransaksi.filter(trx => {
    const cocokPencarian = trx.nomor.toLowerCase().includes(pencarian.toLowerCase()) || trx.namaPengguna.toLowerCase().includes(pencarian.toLowerCase())
    const cocokStatus = filterStatus === 'semua' || trx.status === filterStatus
    return cocokPencarian && cocokStatus
  })

  const handleLihatDetail = (trx) => { setTransaksiTerpilih(trx); setModalDetail(true) }

  const handleVoid = async (trx) => {
    const konfirm = await konfirmasi('Void Transaksi?', `Transaksi ${trx.nomor} akan dibatalkan.`, 'Ya, Void', 'Batal')
    if (konfirm) { const hasil = voidTransaksi(trx.id); if (hasil.sukses) notifikasiSukses('Berhasil', 'Transaksi berhasil di-void') }
  }

  const kolomTabel = [
    { key: 'nomor', label: 'No. Transaksi', sortable: true, render: (nomor) => <span className="font-mono" style={{ color: '#00d4ff', textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>{nomor}</span> },
    { key: 'tanggal', label: 'Tanggal', sortable: true, render: (tanggal) => formatTanggalWaktu(tanggal) },
    { key: 'namaPengguna', label: 'Kasir', sortable: true },
    { key: 'items', label: 'Items', render: (items) => `${items.length} item` },
    { key: 'grandTotal', label: 'Total', sortable: true, render: (total) => <span className="font-semibold" style={{ color: '#ff0040', textShadow: '0 0 10px rgba(255, 0, 64, 0.5)' }}>{formatRupiah(total)}</span> },
    { key: 'metodeBayar', label: 'Pembayaran', render: (metode) => { const m = METODE_PEMBAYARAN.find(mp => mp.id === metode); return m?.nama || metode } },
    { key: 'status', label: 'Status', render: (status) => <BadgeStatusTransaksi status={status} /> },
    { key: 'aksi', label: 'Aksi', render: (_, trx) => (
      <div className="flex items-center gap-2">
        <motion.button onClick={() => handleLihatDetail(trx)} className="p-2 rounded-lg" style={{ color: '#00d4ff' }} whileHover={{ background: 'rgba(0, 212, 255, 0.2)', boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)' }} title="Lihat Detail"><Eye size={16} /></motion.button>
        {adalahAdmin() && trx.status !== 'void' && <motion.button onClick={() => handleVoid(trx)} className="p-2 rounded-lg" style={{ color: '#ff0040' }} whileHover={{ background: 'rgba(255, 0, 64, 0.2)', boxShadow: '0 0 15px rgba(255, 0, 64, 0.3)' }} title="Void"><XCircle size={16} /></motion.button>}
      </div>
    )}
  ]

  const totalTransaksi = transaksiFiltered.filter(t => t.status === 'selesai').length
  const totalPendapatan = transaksiFiltered.filter(t => t.status === 'selesai').reduce((sum, t) => sum + t.grandTotal, 0)
  const totalVoid = transaksiFiltered.filter(t => t.status === 'void').length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}>Transaksi</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Riwayat semua transaksi penjualan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KartuStat judul="Total Transaksi" nilai={totalTransaksi.toString()} ikon={<Receipt size={24} />} warna="hijau" />
        <KartuStat judul="Total Pendapatan" nilai={formatRupiah(totalPendapatan)} ikon={<Receipt size={24} />} warna="merah" />
        <KartuStat judul="Transaksi Void" nilai={totalVoid.toString()} ikon={<XCircle size={24} />} warna="kuning" />
      </div>

      <Kartu warnaNeon="#00d4ff">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={20} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            <input type="text" value={pencarian} onChange={(e) => setPencarian(e.target.value)} placeholder="Cari nomor transaksi atau kasir..." className="w-full pl-10 pr-4 py-2.5 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }} onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.3)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-xl cursor-pointer" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }}>
            <option value="semua" style={{ background: '#0a0a0f' }}>Semua Status</option>
            <option value="selesai" style={{ background: '#0a0a0f' }}>Selesai</option>
            <option value="void" style={{ background: '#0a0a0f' }}>Void</option>
          </select>
        </div>
        <Tabel kolom={kolomTabel} data={transaksiFiltered} pagination itemPerHalaman={10} kosongPesan="Tidak ada transaksi ditemukan" />
      </Kartu>

      <Modal buka={modalDetail} onTutup={() => setModalDetail(false)} judul="Detail Transaksi" ukuran="sedang" warnaNeon="#00d4ff">
        {transaksiTerpilih && (
          <div className="space-y-4">
            <div className="rounded-xl p-4" style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Nomor Transaksi</p><p className="font-mono" style={{ color: '#00d4ff' }}>{transaksiTerpilih.nomor}</p></div>
                <div><p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Status</p><BadgeStatusTransaksi status={transaksiTerpilih.status} /></div>
                <div><p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Tanggal</p><p style={{ color: '#ffffff' }}>{formatTanggalWaktu(transaksiTerpilih.tanggal)}</p></div>
                <div><p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Kasir</p><p style={{ color: '#ffffff' }}>{transaksiTerpilih.namaPengguna}</p></div>
                <div><p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Metode Bayar</p><p className="capitalize" style={{ color: '#ffffff' }}>{transaksiTerpilih.metodeBayar}</p></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2" style={{ color: '#ffffff' }}>Item Pembelian</h4>
              <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <table className="w-full text-sm">
                  <thead style={{ background: 'rgba(0, 0, 0, 0.5)' }}><tr><th className="px-4 py-2 text-left" style={{ color: '#00d4ff' }}>Produk</th><th className="px-4 py-2 text-right" style={{ color: '#00d4ff' }}>Qty</th><th className="px-4 py-2 text-right" style={{ color: '#00d4ff' }}>Harga</th><th className="px-4 py-2 text-right" style={{ color: '#00d4ff' }}>Subtotal</th></tr></thead>
                  <tbody>{transaksiTerpilih.items.map((item, idx) => <tr key={idx} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}><td className="px-4 py-2" style={{ color: '#ffffff' }}>{item.namaProduk}</td><td className="px-4 py-2 text-right" style={{ color: '#ffffff' }}>{item.jumlah}m</td><td className="px-4 py-2 text-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{formatRupiah(item.hargaSatuan)}</td><td className="px-4 py-2 text-right" style={{ color: '#ffffff' }}>{formatRupiah(item.subtotal)}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex justify-between text-sm"><span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Subtotal</span><span style={{ color: '#ffffff' }}>{formatRupiah(transaksiTerpilih.total)}</span></div>
              <div className="flex justify-between text-sm"><span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Diskon</span><span style={{ color: '#ff0040' }}>- {formatRupiah(transaksiTerpilih.diskon)}</span></div>
              <div className="flex justify-between text-lg font-bold pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}><span style={{ color: '#ffffff' }}>Grand Total</span><span style={{ color: '#00ff88', textShadow: '0 0 15px rgba(0, 255, 136, 0.5)' }}>{formatRupiah(transaksiTerpilih.grandTotal)}</span></div>
            </div>
            <Tombol tipe="primer" penuh onClick={() => setModalDetail(false)}>Tutup</Tombol>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}

export default Transaksi
