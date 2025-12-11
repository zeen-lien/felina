/**
 * FabricFlow - Komponen Sidebar Cyberpunk
 * Navigasi samping dengan efek neon dan animasi
 */

import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  AlertTriangle,
  Receipt,
  BarChart3,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  Zap,
  X
} from 'lucide-react'
import useAuthStore from '../../store/authStore'
import { MENU_ADMIN, MENU_KASIR } from '../../utils/konstanta'

// Map nama ikon ke komponen
const ikonMap = {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  AlertTriangle,
  Receipt,
  BarChart3,
  Users,
  FileText
}

// Warna neon untuk setiap menu
const warnaNeonMenu = {
  dashboard: '#00ffff',
  kasir: '#ff0040',
  produk: '#00ff88',
  stok: '#bf00ff',
  rusak: '#ffff00',
  transaksi: '#ff00ff',
  laporan: '#00d4ff',
  pengguna: '#ff8800',
  audit: '#00ffaa'
}

// ==================== KOMPONEN SIDEBAR ====================
const Sidebar = ({ terbuka, onToggle }) => {
  const location = useLocation()
  const { pengguna, adalahAdmin } = useAuthStore()
  const [isDesktop, setIsDesktop] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Pilih menu berdasarkan role
  const daftarMenu = adalahAdmin() ? MENU_ADMIN : MENU_KASIR

  // Sidebar width based on state and screen
  const sidebarWidth = isDesktop ? (terbuka ? 280 : 80) : 280

  return (
    <>
      {/* Overlay untuk mobile */}
      <AnimatePresence>
        {terbuka && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarWidth,
          x: isDesktop ? 0 : (terbuka ? 0 : -280)
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`
          fixed left-0 top-0 bottom-0 z-50 flex flex-col
          lg:sticky lg:top-0 lg:h-screen
        `}
        style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(5, 5, 10, 1) 100%)',
          borderRight: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.1)',
          minHeight: '100vh'
        }}
      >
        {/* Efek garis neon di atas */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #00ffff, #ff00ff, transparent)'
          }}
        />

        {/* Header Sidebar */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10 flex-shrink-0">
          <AnimatePresence mode="wait">
            {terbuka ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                {/* Logo dengan efek neon */}
                <motion.div 
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(26, 35, 126, 0.8))',
                    border: '1px solid rgba(255, 0, 64, 0.5)',
                    boxShadow: '0 0 20px rgba(255, 0, 64, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)'
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 0, 64, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)',
                      '0 0 30px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(255, 0, 64, 0.1)',
                      '0 0 20px rgba(255, 0, 64, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Zap size={24} className="text-white" style={{ filter: 'drop-shadow(0 0 5px #fff)' }} />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-gradient-cyber">FabricFlow</h1>
                  <p className="text-xs text-cyan-400/60">CYBER FABRIC SYSTEM</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="logo-mini"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(26, 35, 126, 0.8))',
                  border: '1px solid rgba(255, 0, 64, 0.5)',
                  boxShadow: '0 0 15px rgba(255, 0, 64, 0.3)'
                }}
              >
                <Zap size={24} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button - Desktop */}
          <button
            onClick={onToggle}
            className="hidden lg:flex p-2 rounded-lg transition-all duration-300 hover:bg-white/5"
            style={{ color: 'rgba(0, 212, 255, 0.7)' }}
          >
            {terbuka ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Close button - Mobile */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg transition-all duration-300 hover:bg-white/5"
            style={{ color: 'rgba(255, 0, 64, 0.7)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu navigasi - flex-1 untuk mengisi ruang */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto hide-scrollbar">
          <ul className="space-y-2">
            {daftarMenu.map((menu, index) => {
              const Ikon = ikonMap[menu.ikon]
              const aktif = location.pathname === menu.path
              const warnaNeon = warnaNeonMenu[menu.id] || '#00ffff'

              return (
                <motion.li 
                  key={menu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={menu.path}
                    onClick={() => window.innerWidth < 1024 && onToggle()}
                    className="relative block"
                  >
                    <motion.div
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-all duration-300 ease-out
                        ${aktif ? '' : 'hover:bg-white/5'}
                      `}
                      style={aktif ? {
                        background: `linear-gradient(90deg, ${warnaNeon}15, transparent)`,
                        borderLeft: `3px solid ${warnaNeon}`,
                        borderTop: `1px solid ${warnaNeon}30`,
                        borderRight: `1px solid ${warnaNeon}10`,
                        borderBottom: `1px solid ${warnaNeon}30`,
                        boxShadow: `inset 0 0 20px ${warnaNeon}10, 0 0 10px ${warnaNeon}20`
                      } : {
                        border: '1px solid transparent'
                      }}
                      whileHover={!aktif ? { 
                        x: 5,
                        transition: { duration: 0.2 }
                      } : {}}
                    >
                      {/* Ikon dengan efek neon */}
                      <motion.div
                        style={{ 
                          color: aktif ? warnaNeon : 'rgba(255, 255, 255, 0.5)',
                          filter: aktif ? `drop-shadow(0 0 8px ${warnaNeon})` : 'none'
                        }}
                        whileHover={{ 
                          filter: `drop-shadow(0 0 8px ${warnaNeon})`,
                          color: warnaNeon
                        }}
                      >
                        <Ikon size={22} />
                      </motion.div>

                      {/* Label - tampil saat sidebar terbuka atau di mobile */}
                      <AnimatePresence>
                        {(terbuka || !isDesktop) && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className={`whitespace-nowrap overflow-hidden font-medium ${
                              aktif ? 'text-white' : 'text-white/60'
                            }`}
                            style={aktif ? { 
                              textShadow: `0 0 10px ${warnaNeon}50`
                            } : {}}
                          >
                            {menu.nama}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Indikator aktif - Neon bar dengan efek glitch */}
                      {aktif && (
                        <>
                          {/* Garis neon vertikal di kanan */}
                          <motion.div
                            layoutId="activeBar"
                            className="absolute right-0 top-1 bottom-1 w-[3px] rounded-full"
                            style={{ 
                              background: `linear-gradient(180deg, transparent, ${warnaNeon}, transparent)`,
                              boxShadow: `0 0 15px ${warnaNeon}, 0 0 30px ${warnaNeon}50`
                            }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ 
                              scaleY: 1, 
                              opacity: 1,
                              boxShadow: [
                                `0 0 15px ${warnaNeon}, 0 0 30px ${warnaNeon}50`,
                                `0 0 25px ${warnaNeon}, 0 0 50px ${warnaNeon}80`,
                                `0 0 15px ${warnaNeon}, 0 0 30px ${warnaNeon}50`
                              ]
                            }}
                            transition={{ 
                              scaleY: { duration: 0.3 },
                              boxShadow: { duration: 1.5, repeat: Infinity }
                            }}
                          />
                          {/* Efek scan line */}
                          <motion.div
                            className="absolute right-0 w-[3px] h-2 rounded-full"
                            style={{ background: '#ffffff' }}
                            animate={{
                              top: ['10%', '80%', '10%'],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </>
                      )}
                    </motion.div>
                  </NavLink>
                </motion.li>
              )
            })}
          </ul>
        </nav>

        {/* Footer sidebar - info user - mt-auto untuk push ke bawah */}
        <div className="mt-auto p-4 border-t border-white/10 flex-shrink-0">
          <motion.div 
            className={`flex items-center gap-3 p-3 rounded-xl ${(!terbuka && isDesktop) && 'justify-center'}`}
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{
              borderColor: 'rgba(0, 212, 255, 0.3)',
              boxShadow: '0 0 15px rgba(0, 212, 255, 0.1)'
            }}
          >
            {/* Avatar dengan efek neon */}
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #ff0040, #00d4ff)',
                boxShadow: '0 0 15px rgba(255, 0, 64, 0.3)'
              }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(255, 0, 64, 0.3)',
                  '0 0 15px rgba(0, 212, 255, 0.3)',
                  '0 0 15px rgba(255, 0, 64, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-sm font-bold text-white">
                {pengguna?.nama?.charAt(0).toUpperCase()}
              </span>
            </motion.div>
            
            <AnimatePresence>
              {(terbuka || !isDesktop) && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium text-white truncate">
                    {pengguna?.nama}
                  </p>
                  <p className="text-xs uppercase tracking-wider" style={{ color: '#00ffff' }}>
                    {pengguna?.peran}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Efek garis neon di bawah */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #ff0040, #00ffff, transparent)'
          }}
        />
      </motion.aside>
    </>
  )
}

export default Sidebar
