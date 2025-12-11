/**
 * FabricFlow - Halaman Audit Log Cyberpunk
 * Riwayat aktivitas dengan efek neon futuristik
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, FileText, LogIn, Plus, Edit, Trash2, Filter } from 'lucide-react'
import Kartu, { KartuStat } from '../components/umum/Kartu'
import Tabel from '../components/umum/Tabel'
import { formatTanggalWaktu, ambilDariStorage } from '../utils/helper'
import { STORAGE_KEYS } from '../utils/konstanta'

// ==================== HALAMAN AUDIT LOG ====================
const AuditLog = () => {
  const [pencarian, setPencarian] = useState('')
  const [filterAksi, setFilterAksi] = useState('semua')

  const auditLog = ambilDariStorage(STORAGE_KEYS.AUDIT_LOG, [])

  const logFiltered = auditLog.filter(log => {
    const cocokPencarian = log.namaPengguna?.toLowerCase().includes(pencarian.toLowerCase()) || log.tabel?.toLowerCase().includes(pencarian.toLowerCase())
    const cocokAksi = filterAksi === 'semua' || log.aksi === filterAksi
    return cocokPencarian && cocokAksi
  })

  const getIkonAksi = (aksi) => {
    const config = {
      login: { icon: LogIn, color: '#00ff88', bg: 'rgba(0, 255, 136, 0.2)' },
      create: { icon: Plus, color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.2)' },
      update: { icon: Edit, color: '#ffff00', bg: 'rgba(255, 255, 0, 0.2)' },
      delete: { icon: Trash2, color: '#ff0040', bg: 'rgba(255, 0, 64, 0.2)' }
    }
    return config[aksi] || { icon: FileText, color: '#888888', bg: 'rgba(136, 136, 136, 0.2)' }
  }

  const kolomTabel = [
    { key: 'tanggal', label: 'Waktu', sortable: true, render: (tanggal) => formatTanggalWaktu(tanggal) },
    { key: 'namaPengguna', label: 'Pengguna', sortable: true },
    { key: 'aksi', label: 'Aksi', render: (aksi) => {
      const cfg = getIkonAksi(aksi)
      const Icon = cfg.icon
      return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}50`, textShadow: `0 0 10px ${cfg.color}50` }}><Icon size={12} />{aksi}</span>
    }},
    { key: 'tabel', label: 'Tabel', render: (tabel) => <span className="font-mono text-sm" style={{ color: '#00d4ff', textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>{tabel}</span> },
    { key: 'dataId', label: 'ID Data', render: (id) => id ? <span className="font-mono text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{id}</span> : '-' },
    { key: 'dataBaru', label: 'Detail', render: (data) => data ? <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{JSON.stringify(data).substring(0, 50)}...</span> : '-' }
  ]

  const totalLogin = auditLog.filter(l => l.aksi === 'login').length
  const totalCreate = auditLog.filter(l => l.aksi === 'create').length
  const totalUpdate = auditLog.filter(l => l.aksi === 'update').length
  const totalDelete = auditLog.filter(l => l.aksi === 'delete').length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>Audit Log</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Riwayat aktivitas sistem</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KartuStat judul="Login" nilai={totalLogin.toString()} ikon={<LogIn size={20} />} warna="hijau" />
        <KartuStat judul="Create" nilai={totalCreate.toString()} ikon={<Plus size={20} />} warna="cyan" />
        <KartuStat judul="Update" nilai={totalUpdate.toString()} ikon={<Edit size={20} />} warna="kuning" />
        <KartuStat judul="Delete" nilai={totalDelete.toString()} ikon={<Trash2 size={20} />} warna="merah" />
      </div>

      <Kartu warnaNeon="#00ffff">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={20} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            <input type="text" value={pencarian} onChange={(e) => setPencarian(e.target.value)} placeholder="Cari berdasarkan pengguna atau tabel..." className="w-full pl-10 pr-4 py-2.5 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }} onFocus={(e) => { e.target.style.borderColor = '#00ffff'; e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.3)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            <select value={filterAksi} onChange={(e) => setFilterAksi(e.target.value)} className="px-4 py-2.5 rounded-xl cursor-pointer" style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', outline: 'none' }}>
              <option value="semua" style={{ background: '#0a0a0f' }}>Semua Aksi</option>
              <option value="login" style={{ background: '#0a0a0f' }}>Login</option>
              <option value="create" style={{ background: '#0a0a0f' }}>Create</option>
              <option value="update" style={{ background: '#0a0a0f' }}>Update</option>
              <option value="delete" style={{ background: '#0a0a0f' }}>Delete</option>
            </select>
          </div>
        </div>
        <Tabel kolom={kolomTabel} data={logFiltered} pagination itemPerHalaman={15} kosongPesan="Belum ada aktivitas tercatat" />
      </Kartu>
    </motion.div>
  )
}

export default AuditLog
