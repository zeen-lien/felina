/**
 * FabricFlow - Komponen Navbar Cyberpunk
 * Header navigasi dengan efek neon dan animasi
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  Bell,
  LogOut,
  User,
  Settings,
  ChevronDown
} from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useProdukStore from '../../store/produkStore'
import { konfirmasi, notifikasiSukses } from '../../utils/notifikasi'
import { BadgePeran } from '../umum/Badge'

// ==================== KOMPONEN NAVBAR ====================
const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate()
  const { pengguna, logout } = useAuthStore()
  const { getProdukStokRendah } = useProdukStore()
  
  const [dropdownBuka, setDropdownBuka] = useState(false)
  const [notifBuka, setNotifBuka] = useState(false)

  const produkStokRendah = getProdukStokRendah(10)

  const handleLogout = async () => {
    const konfirm = await konfirmasi(
      'Keluar dari Sistem?',
      'Anda akan keluar dari akun ini.',
      'Ya, Keluar',
      'Batal'
    )

    if (konfirm) {
      logout()
      notifikasiSukses('Berhasil Keluar', 'Sampai jumpa kembali!')
      navigate('/login')
    }
  }

  return (
    <header 
      className="h-16 flex items-center justify-between px-4 lg:px-6 relative flex-shrink-0"
      style={{
        background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.95) 0%, rgba(5, 5, 10, 0.9) 100%)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)'
      }}
    >
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, #ff0040, transparent)' }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="flex items-center gap-4">
        {/* Toggle sidebar button - Mobile */}
        <motion.button
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl lg:hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 64, 0.2), rgba(0, 212, 255, 0.2))',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: '#00ffff'
          }}
          whileHover={{
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
            borderColor: '#00ffff'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={22} />
        </motion.button>

        <div className="hidden sm:block">
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Selamat datang kembali,</p>
          <p className="text-lg font-semibold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}>
            {pengguna?.nama}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifikasi */}
        <div className="relative">
          <motion.button
            onClick={() => { setNotifBuka(!notifBuka); setDropdownBuka(false) }}
            className="relative p-2 rounded-lg"
            style={{ color: 'rgba(255, 255, 255, 0.7)', border: '1px solid transparent' }}
            whileHover={{ color: '#ffff00', borderColor: 'rgba(255, 255, 0, 0.3)', boxShadow: '0 0 15px rgba(255, 255, 0, 0.2)' }}
          >
            <Bell size={22} />
            {produkStokRendah.length > 0 && (
              <motion.span 
                className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
                style={{ background: '#ff0040', boxShadow: '0 0 10px #ff0040' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>

          <AnimatePresence>
            {notifBuka && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 rounded-xl overflow-hidden z-50"
                style={{ background: 'rgba(10, 10, 15, 0.95)', border: '1px solid rgba(255, 255, 0, 0.3)', boxShadow: '0 0 30px rgba(255, 255, 0, 0.2)', backdropFilter: 'blur(20px)' }}
              >
                <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <h3 className="font-semibold" style={{ color: '#ffff00', textShadow: '0 0 10px rgba(255, 255, 0, 0.5)' }}>Notifikasi</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {produkStokRendah.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <Bell size={32} className="mx-auto mb-2" style={{ color: 'rgba(255, 255, 255, 0.2)' }} />
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Tidak ada notifikasi</p>
                    </div>
                  ) : (
                    produkStokRendah.slice(0, 5).map((produk) => (
                      <motion.div key={produk.id} className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }} whileHover={{ background: 'rgba(255, 255, 0, 0.05)' }}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255, 255, 0, 0.2)', border: '1px solid rgba(255, 255, 0, 0.3)' }}>
                            <AlertTriangle size={16} style={{ color: '#ffff00' }} />
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: '#ffffff' }}>Stok Menipis</p>
                            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{produk.nama} tersisa {produk.stok} {produk.satuan}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div className="relative">
          <motion.button
            onClick={() => { setDropdownBuka(!dropdownBuka); setNotifBuka(false) }}
            className="flex items-center gap-2 p-2 rounded-lg"
            style={{ border: '1px solid transparent' }}
            whileHover={{ borderColor: 'rgba(0, 212, 255, 0.3)', boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)' }}
          >
            <motion.div 
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ff0040, #00d4ff)' }}
              animate={{ boxShadow: ['0 0 15px rgba(255, 0, 64, 0.3)', '0 0 15px rgba(0, 212, 255, 0.3)', '0 0 15px rgba(255, 0, 64, 0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-sm font-bold text-white">{pengguna?.nama?.charAt(0).toUpperCase()}</span>
            </motion.div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium" style={{ color: '#ffffff' }}>{pengguna?.nama}</p>
              <BadgePeran peran={pengguna?.peran} />
            </div>
            <ChevronDown size={18} style={{ color: 'rgba(255, 255, 255, 0.5)', transform: dropdownBuka ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </motion.button>

          <AnimatePresence>
            {dropdownBuka && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden z-50"
                style={{ background: 'rgba(10, 10, 15, 0.95)', border: '1px solid rgba(0, 212, 255, 0.3)', boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)', backdropFilter: 'blur(20px)' }}
              >
                <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <p className="font-medium" style={{ color: '#ffffff' }}>{pengguna?.nama}</p>
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{pengguna?.email}</p>
                </div>
                <div className="py-2">
                  <motion.button className="w-full flex items-center gap-3 px-4 py-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }} whileHover={{ color: '#00ffff', background: 'rgba(0, 255, 255, 0.1)' }}>
                    <User size={18} /><span>Profil Saya</span>
                  </motion.button>
                  <motion.button className="w-full flex items-center gap-3 px-4 py-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }} whileHover={{ color: '#00ffff', background: 'rgba(0, 255, 255, 0.1)' }}>
                    <Settings size={18} /><span>Pengaturan</span>
                  </motion.button>
                </div>
                <div className="py-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <motion.button onClick={() => { setDropdownBuka(false); handleLogout() }} className="w-full flex items-center gap-3 px-4 py-2" style={{ color: '#ff0040' }} whileHover={{ background: 'rgba(255, 0, 64, 0.1)', textShadow: '0 0 10px rgba(255, 0, 64, 0.5)' }}>
                    <LogOut size={18} /><span>Keluar</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {(dropdownBuka || notifBuka) && <div className="fixed inset-0 z-40" onClick={() => { setDropdownBuka(false); setNotifBuka(false) }} />}
    </header>
  )
}

// Import AlertTriangle untuk notifikasi
import { AlertTriangle } from 'lucide-react'

export default Navbar
