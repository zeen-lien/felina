/**
 * FabricFlow - Halaman Dashboard Cyberpunk
 * Ringkasan statistik dengan efek neon dan animasi
 */

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Banknote,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowRight,
  Zap,
  Activity,
  BarChart3,
  Trophy,
  RefreshCw
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts'
import useAuthStore from '../store/authStore'
import useProdukStore from '../store/produkStore'
import useTransaksiStore from '../store/transaksiStore'
import { KartuStat } from '../components/umum/Kartu'
import Kartu from '../components/umum/Kartu'
import Tombol from '../components/umum/Tombol'
import { BadgeStatusTransaksi } from '../components/umum/Badge'
import { formatRupiah, formatTanggalWaktu } from '../utils/helper'

// ==================== HALAMAN DASHBOARD ====================
const Dashboard = () => {
  const navigate = useNavigate()
  const { pengguna } = useAuthStore()
  const { daftarProduk, getProdukStokRendah } = useProdukStore()
  const { daftarTransaksi, getTransaksiHariIni, getTotalPenjualanHariIni } = useTransaksiStore()

  const transaksiHariIni = getTransaksiHariIni()
  const totalPenjualanHariIni = getTotalPenjualanHariIni()
  const produkStokRendah = getProdukStokRendah(10)

  const dataGrafikMingguan = [
    { hari: 'Sen', penjualan: 2500000, target: 3000000 },
    { hari: 'Sel', penjualan: 1800000, target: 3000000 },
    { hari: 'Rab', penjualan: 3200000, target: 3000000 },
    { hari: 'Kam', penjualan: 2100000, target: 3000000 },
    { hari: 'Jum', penjualan: 2800000, target: 3000000 },
    { hari: 'Sab', penjualan: 4500000, target: 3000000 },
    { hari: 'Min', penjualan: 3800000, target: 3000000 }
  ]

  const dataKategoriTerlaris = [
    { kategori: 'Katun', jumlah: 45, fill: '#ff0040' },
    { kategori: 'Sutra', jumlah: 28, fill: '#00ffff' },
    { kategori: 'Batik', jumlah: 35, fill: '#00ff88' },
    { kategori: 'Polyester', jumlah: 22, fill: '#ff00ff' },
    { kategori: 'Denim', jumlah: 18, fill: '#ffff00' }
  ]

  const dataPerforma = [
    { name: 'Target', value: 85, fill: '#00ffff' },
    { name: 'Penjualan', value: 72, fill: '#ff0040' },
    { name: 'Stok', value: 90, fill: '#00ff88' }
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-lg" style={{ background: 'rgba(10, 10, 15, 0.95)', border: '1px solid #00ffff', boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          <p className="text-cyan-400 font-semibold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name === 'penjualan' || entry.name === 'target' ? formatRupiah(entry.value) : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <motion.h1 className="text-3xl font-bold" style={{ background: 'linear-gradient(90deg, #ff0040, #00ffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard</motion.h1>
          <p className="text-white/50 flex items-center gap-2 mt-1">
            <Activity size={16} style={{ color: '#00ffff', filter: 'drop-shadow(0 0 5px #00ffff)' }} />
            Sistem aktif - Real-time monitoring
          </p>
        </div>
        <motion.div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'rgba(0, 255, 255, 0.1)', border: '1px solid rgba(0, 255, 255, 0.3)' }} animate={{ boxShadow: ['0 0 10px rgba(0, 255, 255, 0.2)', '0 0 20px rgba(0, 255, 255, 0.4)', '0 0 10px rgba(0, 255, 255, 0.2)'] }} transition={{ duration: 2, repeat: Infinity }}>
          <Zap size={18} className="text-cyan-400" />
          <span className="text-cyan-400 text-sm font-mono">ONLINE</span>
        </motion.div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KartuStat judul="Penjualan Hari Ini" nilai={formatRupiah(totalPenjualanHariIni)} ikon={<Banknote size={24} />} warna="merah" perubahan={{ nilai: 12, naik: true }} />
        <KartuStat judul="Transaksi Hari Ini" nilai={transaksiHariIni.length} ikon={<ShoppingCart size={24} />} warna="cyan" perubahan={{ nilai: 8, naik: true }} />
        <KartuStat judul="Total Produk" nilai={daftarProduk.length} ikon={<Package size={24} />} warna="hijau" />
        <KartuStat judul="Stok Menipis" nilai={produkStokRendah.length} ikon={<AlertTriangle size={24} />} warna="kuning" />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Kartu judul="Analisis Penjualan" subjudul="7 hari terakhir" warnaNeon="#00ffff" aksi={<BarChart3 size={20} style={{ color: '#00ffff' }} />}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataGrafikMingguan}>
                  <defs>
                    <linearGradient id="gradientPenjualan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff0040" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ff0040" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradientTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ffff" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00ffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
                  <XAxis dataKey="hari" stroke="rgba(255, 255, 255, 0.3)" tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }} />
                  <YAxis stroke="rgba(255, 255, 255, 0.3)" tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }} tickFormatter={(value) => `${value / 1000000}jt`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="target" stroke="#00ffff" strokeWidth={2} strokeDasharray="5 5" fill="url(#gradientTarget)" name="target" />
                  <Area type="monotone" dataKey="penjualan" stroke="#ff0040" strokeWidth={3} fill="url(#gradientPenjualan)" name="penjualan" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Kartu>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Kartu judul="Performa" subjudul="Pencapaian target" warnaNeon="#ff00ff" aksi={<Zap size={20} style={{ color: '#ff00ff' }} />}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={dataPerforma} startAngle={180} endAngle={0}>
                  <RadialBar minAngle={15} background={{ fill: 'rgba(255, 255, 255, 0.05)' }} clockWise dataKey="value" cornerRadius={10} />
                  <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" formatter={(value) => <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{value}</span>} />
                  <Tooltip content={<CustomTooltip />} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </Kartu>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Kartu judul="Kategori Terlaris" subjudul="Berdasarkan penjualan" warnaNeon="#00ff88" aksi={<Trophy size={20} style={{ color: '#00ff88' }} />}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataKategoriTerlaris} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
                  <XAxis type="number" stroke="rgba(255, 255, 255, 0.3)" tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }} />
                  <YAxis type="category" dataKey="kategori" stroke="rgba(255, 255, 255, 0.3)" tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="jumlah" radius={[0, 8, 8, 0]}>
                    {dataKategoriTerlaris.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Kartu>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Kartu judul="Transaksi Terakhir" subjudul="5 transaksi terbaru" warnaNeon="#ff0040" aksi={<Tombol tipe="ghost" ukuran="kecil" onClick={() => navigate('/transaksi')} ikon={<ArrowRight size={16} />} ikonPosisi="kanan">Lihat Semua</Tombol>}>
            <div className="space-y-3">
              {daftarTransaksi.slice(0, 5).map((trx, index) => (
                <motion.div key={trx.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ x: 5, backgroundColor: 'rgba(255, 0, 64, 0.1)' }} className="flex items-center justify-between p-3 rounded-xl transition-all" style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div className="flex items-center gap-3">
                    <motion.div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(255, 0, 64, 0.2))', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                      <ShoppingCart size={18} className="text-cyan-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-white font-mono">{trx.nomor}</p>
                      <p className="text-xs text-white/40 flex items-center gap-1"><Clock size={12} />{formatTanggalWaktu(trx.tanggal)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: '#ff0040', textShadow: '0 0 10px rgba(255, 0, 64, 0.5)' }}>{formatRupiah(trx.grandTotal)}</p>
                    <BadgeStatusTransaksi status={trx.status} />
                  </div>
                </motion.div>
              ))}
              {daftarTransaksi.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="mx-auto mb-2" style={{ color: 'rgba(255, 255, 255, 0.2)' }} />
                  <p className="text-white/50">Belum ada transaksi</p>
                </div>
              )}
            </div>
          </Kartu>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Kartu judul="Aksi Cepat" warnaNeon="#ff00ff" aksi={<Zap size={20} style={{ color: '#ff00ff' }} />}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Kasir', icon: ShoppingCart, path: '/kasir', color: '#ff0040' },
              { label: 'Produk', icon: Package, path: '/produk', color: '#00ffff' },
              { label: 'Stok', icon: TrendingUp, path: '/stok', color: '#00ff88' },
              { label: 'Laporan', icon: Banknote, path: '/laporan', color: '#ff00ff' }
            ].map((item) => (
              <motion.button key={item.label} onClick={() => navigate(item.path)} className="p-4 rounded-xl text-center transition-all" style={{ background: 'rgba(0, 0, 0, 0.3)', border: `1px solid ${item.color}30` }} whileHover={{ scale: 1.05, borderColor: item.color, boxShadow: `0 0 20px ${item.color}30` }} whileTap={{ scale: 0.95 }}>
                <motion.div className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${item.color}20, transparent)`, border: `1px solid ${item.color}50` }}>
                  <item.icon size={24} style={{ color: item.color, filter: `drop-shadow(0 0 5px ${item.color})` }} />
                </motion.div>
                <span className="text-white font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </Kartu>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
