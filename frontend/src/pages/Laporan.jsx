/**
 * FabricFlow - Halaman Laporan Cyberpunk
 * Laporan dengan grafik neon futuristik
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadialBarChart, RadialBar } from 'recharts'
import useTransaksiStore from '../store/transaksiStore'
import useProdukStore from '../store/produkStore'
import Kartu, { KartuStat } from '../components/umum/Kartu'
import Tombol from '../components/umum/Tombol'
import { formatRupiah } from '../utils/helper'
import { notifikasiSukses } from '../utils/notifikasi'
import { KATEGORI_KAIN } from '../utils/konstanta'

const WARNA_NEON = ['#ff0040', '#00d4ff', '#00ff88', '#ffff00', '#ff00ff', '#bf00ff']

// Custom Tooltip Cyberpunk
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-3" style={{ background: 'rgba(10, 10, 15, 0.95)', border: '1px solid #00d4ff', boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}>
        <p className="text-sm font-medium" style={{ color: '#00d4ff' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>{entry.name}: {formatRupiah(entry.value)}</p>
        ))}
      </div>
    )
  }
  return null
}

// ==================== HALAMAN LAPORAN ====================
const Laporan = () => {
  const { daftarTransaksi } = useTransaksiStore()
  const { daftarProduk } = useProdukStore()
  const [periode, setPeriode] = useState('mingguan')

  const transaksiSelesai = daftarTransaksi.filter(t => t.status === 'selesai')
  const totalPenjualan = transaksiSelesai.reduce((sum, t) => sum + t.grandTotal, 0)
  const totalTransaksi = transaksiSelesai.length
  const rataRata = totalTransaksi > 0 ? totalPenjualan / totalTransaksi : 0

  const dataPenjualan = [
    { tanggal: '05 Des', penjualan: 2500000 },
    { tanggal: '06 Des', penjualan: 1800000 },
    { tanggal: '07 Des', penjualan: 3200000 },
    { tanggal: '08 Des', penjualan: 2100000 },
    { tanggal: '09 Des', penjualan: 2800000 },
    { tanggal: '10 Des', penjualan: 4500000 },
    { tanggal: '11 Des', penjualan: 3800000 }
  ]

  const dataKategori = KATEGORI_KAIN.slice(0, 6).map((kat, idx) => {
    const produkKategori = daftarProduk.filter(p => p.kategori === kat.id)
    const totalStok = produkKategori.reduce((sum, p) => sum + p.stok, 0)
    return { nama: kat.nama, nilai: totalStok || Math.floor(Math.random() * 100) + 20, fill: WARNA_NEON[idx] }
  })

  const dataRadial = [
    { nama: 'Target', nilai: 100, fill: 'rgba(255, 255, 255, 0.1)' },
    { nama: 'Tercapai', nilai: 75, fill: '#00ff88' }
  ]

  const produkTerlaris = daftarProduk.slice(0, 5).map((p) => ({ ...p, terjual: Math.floor(Math.random() * 50) + 10 })).sort((a, b) => b.terjual - a.terjual)

  const handleExport = () => notifikasiSukses('Export Berhasil', 'Laporan telah diunduh (simulasi)')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>Laporan</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Analisis penjualan dan stok</p>
        </div>
        <div className="flex gap-2">
          <select value={periode} onChange={(e) => setPeriode(e.target.value)} className="px-4 py-2 rounded-xl cursor-pointer" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }}>
            <option value="harian" style={{ background: '#0a0a0f' }}>Harian</option>
            <option value="mingguan" style={{ background: '#0a0a0f' }}>Mingguan</option>
            <option value="bulanan" style={{ background: '#0a0a0f' }}>Bulanan</option>
          </select>
          <Tombol tipe="sekunder" onClick={handleExport} ikon={<Download size={20} />}>Export</Tombol>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KartuStat judul="Total Penjualan" nilai={formatRupiah(totalPenjualan)} ikon={<TrendingUp size={24} />} warna="merah" perubahan={{ naik: true, nilai: 12 }} />
        <KartuStat judul="Total Transaksi" nilai={totalTransaksi.toString()} ikon={<BarChart3 size={24} />} warna="cyan" perubahan={{ naik: true, nilai: 8 }} />
        <KartuStat judul="Rata-rata/Transaksi" nilai={formatRupiah(rataRata)} ikon={<Calendar size={24} />} warna="hijau" perubahan={{ naik: false, nilai: 3 }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Kartu judul="Grafik Penjualan" subjudul={`Periode ${periode}`} warnaNeon="#ff0040">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataPenjualan}>
                <defs>
                  <linearGradient id="gradientNeon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff0040" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ff0040" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
                <XAxis dataKey="tanggal" stroke="rgba(255, 255, 255, 0.3)" tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }} />
                <YAxis stroke="rgba(255, 255, 255, 0.3)" tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }} tickFormatter={(value) => `${value / 1000000}jt`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="penjualan" name="Penjualan" stroke="#ff0040" strokeWidth={3} fill="url(#gradientNeon)" style={{ filter: 'drop-shadow(0 0 10px #ff0040)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Kartu>

        <Kartu judul="Distribusi Stok per Kategori" warnaNeon="#00d4ff">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataKategori} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="nilai" nameKey="nama" stroke="none">
                  {dataKategori.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} style={{ filter: `drop-shadow(0 0 10px ${entry.fill})` }} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Kartu>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Kartu judul="Produk Terlaris" subjudul="5 produk dengan penjualan tertinggi" warnaNeon="#00ff88">
            <div className="space-y-3">
              {produkTerlaris.map((produk, index) => (
                <motion.div key={produk.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }} whileHover={{ borderColor: 'rgba(0, 255, 136, 0.5)', boxShadow: '0 0 15px rgba(0, 255, 136, 0.2)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ background: index === 0 ? 'rgba(255, 215, 0, 0.2)' : index === 1 ? 'rgba(192, 192, 192, 0.2)' : index === 2 ? 'rgba(205, 127, 50, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : 'rgba(255, 255, 255, 0.5)', border: `1px solid ${index === 0 ? '#ffd70050' : index === 1 ? '#c0c0c050' : index === 2 ? '#cd7f3250' : 'rgba(255, 255, 255, 0.1)'}`, textShadow: index < 3 ? `0 0 10px ${index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32'}` : 'none' }}>{index + 1}</div>
                  <div className="flex-1"><p className="font-medium" style={{ color: '#ffffff' }}>{produk.nama}</p><p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{produk.kode}</p></div>
                  <div className="text-right"><p className="font-semibold" style={{ color: '#00ff88', textShadow: '0 0 10px rgba(0, 255, 136, 0.5)' }}>{produk.terjual} meter</p><p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>terjual</p></div>
                </motion.div>
              ))}
            </div>
          </Kartu>
        </div>

        <Kartu judul="Target Bulanan" warnaNeon="#bf00ff">
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" data={dataRadial} startAngle={180} endAngle={0}>
                <RadialBar dataKey="nilai" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="text-center -mt-16">
              <p className="text-4xl font-bold" style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.5)' }}>75%</p>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Target Tercapai</p>
            </div>
          </div>
        </Kartu>
      </div>
    </motion.div>
  )
}

export default Laporan
