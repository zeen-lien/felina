/**
 * FabricFlow - Main App Component
 * Komponen utama aplikasi dengan routing
 */

import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'
import { inisialisasiDataDummy } from './data/dataDummy'

// Layout
import Layout from './components/layout/Layout'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Kasir from './pages/Kasir'
import Produk from './pages/Produk'
import Stok from './pages/Stok'
import KainRusak from './pages/KainRusak'
import Transaksi from './pages/Transaksi'
import Laporan from './pages/Laporan'
import Pengguna from './pages/Pengguna'
import AuditLog from './pages/AuditLog'

// ==================== PROTECTED ROUTE ====================
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { sudahLogin, adalahAdmin } = useAuthStore()

  if (!sudahLogin) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !adalahAdmin()) {
    return <Navigate to="/" replace />
  }

  return children
}

// ==================== PUBLIC ROUTE ====================
const PublicRoute = ({ children }) => {
  const { sudahLogin } = useAuthStore()

  if (sudahLogin) {
    return <Navigate to="/" replace />
  }

  return children
}

// ==================== MAIN APP ====================
function App() {
  // Inisialisasi data dummy saat pertama kali load
  useEffect(() => {
    inisialisasiDataDummy()
  }, [])

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Kasir - Semua role */}
        <Route path="kasir" element={<Kasir />} />

        {/* Produk - Semua role (tapi CRUD hanya admin) */}
        <Route path="produk" element={<Produk />} />

        {/* Stok - Semua role (tapi adjustment hanya admin) */}
        <Route path="stok" element={<Stok />} />

        {/* Kain Rusak - Semua role */}
        <Route path="rusak" element={<KainRusak />} />

        {/* Transaksi - Semua role (tapi void hanya admin) */}
        <Route path="transaksi" element={<Transaksi />} />

        {/* Laporan - Admin only */}
        <Route
          path="laporan"
          element={
            <ProtectedRoute adminOnly>
              <Laporan />
            </ProtectedRoute>
          }
        />

        {/* Pengguna - Admin only */}
        <Route
          path="pengguna"
          element={
            <ProtectedRoute adminOnly>
              <Pengguna />
            </ProtectedRoute>
          }
        />

        {/* Audit Log - Admin only */}
        <Route
          path="audit"
          element={
            <ProtectedRoute adminOnly>
              <AuditLog />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 - Redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
