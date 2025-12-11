/**
 * FabricFlow - Komponen Layout
 * Layout utama aplikasi dengan sidebar dan navbar
 */

import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import useProdukStore from '../../store/produkStore'
import useTransaksiStore from '../../store/transaksiStore'

// ==================== KOMPONEN LAYOUT ====================
const Layout = () => {
  const [sidebarTerbuka, setSidebarTerbuka] = useState(true)

  const { muatProduk } = useProdukStore()
  const { muatTransaksi } = useTransaksiStore()

  useEffect(() => {
    muatProduk()
    muatTransaksi()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarTerbuka(false)
      } else {
        setSidebarTerbuka(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div 
      className="min-h-screen flex"
      style={{
        background: '#050505',
        backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}
    >
      <Sidebar
        terbuka={sidebarTerbuka}
        onToggle={() => setSidebarTerbuka(!sidebarTerbuka)}
      />

      <div className="flex-1 flex flex-col min-h-screen w-full">
        <Navbar onToggleSidebar={() => setSidebarTerbuka(!sidebarTerbuka)} />

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>

        <footer 
          className="py-3 px-6 text-center mt-auto"
          style={{ 
            borderTop: '1px solid rgba(0, 212, 255, 0.1)',
            background: 'rgba(5, 5, 10, 0.8)'
          }}
        >
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            © 2024 <span style={{ background: 'linear-gradient(90deg, #ff0040, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="font-semibold">FabricFlow</span> - Sistem Digitalisasi Toko Kain
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Layout
