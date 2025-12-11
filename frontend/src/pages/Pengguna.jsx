/**
 * FabricFlow - Halaman Pengguna Cyberpunk
 * Manajemen user dengan efek neon futuristik
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, UserX, UserCheck, Users, Shield, User } from 'lucide-react'
import Kartu, { KartuStat } from '../components/umum/Kartu'
import Tombol from '../components/umum/Tombol'
import Tabel from '../components/umum/Tabel'
import Modal from '../components/umum/Modal'
import InputField, { SelectField } from '../components/umum/InputField'
import { BadgePeran } from '../components/umum/Badge'
import { formatTanggal } from '../utils/helper'
import { notifikasiSukses, notifikasiInfo } from '../utils/notifikasi'
import { DAFTAR_PENGGUNA } from '../utils/konstanta'

// ==================== HALAMAN PENGGUNA ====================
const Pengguna = () => {
  const [modalTerbuka, setModalTerbuka] = useState(false)
  const [formData, setFormData] = useState({ nama: '', email: '', password: '', peran: 'kasir' })

  const kolomTabel = [
    { key: 'nama', label: 'Nama', sortable: true, render: (nama, user) => (
      <div className="flex items-center gap-3">
        <motion.div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: user.peran === 'admin' ? 'linear-gradient(135deg, rgba(255, 0, 64, 0.3), rgba(139, 0, 0, 0.3))' : 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(26, 35, 126, 0.3))', border: `1px solid ${user.peran === 'admin' ? '#ff004050' : '#00d4ff50'}`, boxShadow: `0 0 15px ${user.peran === 'admin' ? 'rgba(255, 0, 64, 0.2)' : 'rgba(0, 212, 255, 0.2)'}` }} animate={{ boxShadow: [`0 0 15px ${user.peran === 'admin' ? 'rgba(255, 0, 64, 0.2)' : 'rgba(0, 212, 255, 0.2)'}`, `0 0 25px ${user.peran === 'admin' ? 'rgba(255, 0, 64, 0.3)' : 'rgba(0, 212, 255, 0.3)'}`, `0 0 15px ${user.peran === 'admin' ? 'rgba(255, 0, 64, 0.2)' : 'rgba(0, 212, 255, 0.2)'}`] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="font-bold" style={{ color: user.peran === 'admin' ? '#ff0040' : '#00d4ff' }}>{nama.charAt(0).toUpperCase()}</span>
        </motion.div>
        <div><p className="font-medium" style={{ color: '#ffffff' }}>{nama}</p><p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{user.email}</p></div>
      </div>
    )},
    { key: 'peran', label: 'Peran', render: (peran) => <BadgePeran peran={peran} /> },
    { key: 'aktif', label: 'Status', render: (aktif) => (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: aktif ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 0, 64, 0.2)', color: aktif ? '#00ff88' : '#ff0040', border: `1px solid ${aktif ? '#00ff8850' : '#ff004050'}`, textShadow: `0 0 10px ${aktif ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 0, 64, 0.5)'}` }}>
        {aktif ? <UserCheck size={12} /> : <UserX size={12} />}{aktif ? 'Aktif' : 'Nonaktif'}
      </span>
    )},
    { key: 'tanggalDibuat', label: 'Terdaftar', render: (tanggal) => formatTanggal(tanggal) },
    { key: 'aksi', label: 'Aksi', render: (_, user) => (
      <motion.button onClick={() => notifikasiInfo('Info', 'Fitur edit user dalam pengembangan')} className="p-2 rounded-lg" style={{ color: '#00d4ff' }} whileHover={{ background: 'rgba(0, 212, 255, 0.2)', boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)' }} title="Edit"><Edit size={16} /></motion.button>
    )}
  ]

  const totalAdmin = DAFTAR_PENGGUNA.filter(u => u.peran === 'admin').length
  const totalKasir = DAFTAR_PENGGUNA.filter(u => u.peran === 'kasir').length
  const totalAktif = DAFTAR_PENGGUNA.filter(u => u.aktif).length

  const handleSubmit = () => { notifikasiInfo('Info', 'Fitur tambah user dalam pengembangan. Gunakan akun demo yang tersedia.'); setModalTerbuka(false) }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(255, 0, 255, 0.3)' }}>Pengguna</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Kelola akun pengguna sistem</p>
        </div>
        <Tombol tipe="primer" onClick={() => setModalTerbuka(true)} ikon={<Plus size={20} />}>Tambah Pengguna</Tombol>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KartuStat judul="Admin" nilai={totalAdmin.toString()} ikon={<Shield size={24} />} warna="merah" />
        <KartuStat judul="Kasir" nilai={totalKasir.toString()} ikon={<User size={24} />} warna="cyan" />
        <KartuStat judul="Total Aktif" nilai={totalAktif.toString()} ikon={<Users size={24} />} warna="hijau" />
      </div>

      <Kartu warnaNeon="#ff00ff">
        <Tabel kolom={kolomTabel} data={DAFTAR_PENGGUNA} pagination itemPerHalaman={10} />
      </Kartu>

      <Modal buka={modalTerbuka} onTutup={() => setModalTerbuka(false)} judul="Tambah Pengguna Baru" ukuran="kecil" warnaNeon="#ff00ff">
        <div className="space-y-4">
          <InputField label="Nama Lengkap" nama="nama" nilai={formData.nama} onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))} placeholder="Masukkan nama" wajib />
          <InputField label="Email" tipe="email" nama="email" nilai={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="email@example.com" wajib />
          <InputField label="Password" tipe="password" nama="password" nilai={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} placeholder="Minimal 6 karakter" wajib />
          <SelectField label="Peran" nama="peran" nilai={formData.peran} onChange={(e) => setFormData(prev => ({ ...prev, peran: e.target.value }))} opsi={[{ value: 'admin', label: 'Admin' }, { value: 'kasir', label: 'Kasir' }]} wajib />
          <div className="flex justify-end gap-3 pt-4">
            <Tombol tipe="ghost" onClick={() => setModalTerbuka(false)}>Batal</Tombol>
            <Tombol tipe="primer" onClick={handleSubmit}>Simpan</Tombol>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default Pengguna
