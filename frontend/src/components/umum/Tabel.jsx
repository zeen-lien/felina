/**
 * FabricFlow - Komponen Tabel Cyberpunk
 * Tabel dengan efek neon, sorting, dan pagination
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

// ==================== KOMPONEN TABEL ====================
const Tabel = ({
  kolom = [], // [{ key: '', label: '', sortable: false, render: (nilai, baris) => {} }]
  data = [],
  loading = false,
  kosongPesan = 'Tidak ada data',
  pagination = false,
  itemPerHalaman = 10,
  className = ''
}) => {
  // State untuk sorting
  const [sortConfig, setSortConfig] = useState({ key: null, arah: 'asc' })
  
  // State untuk pagination
  const [halamanAktif, setHalamanAktif] = useState(1)

  // Handle sorting
  const handleSort = (key) => {
    let arah = 'asc'
    if (sortConfig.key === key && sortConfig.arah === 'asc') {
      arah = 'desc'
    }
    setSortConfig({ key, arah })
  }

  // Sort data
  const dataTersortir = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    const nilaiA = a[sortConfig.key]
    const nilaiB = b[sortConfig.key]
    
    if (nilaiA < nilaiB) return sortConfig.arah === 'asc' ? -1 : 1
    if (nilaiA > nilaiB) return sortConfig.arah === 'asc' ? 1 : -1
    return 0
  })

  // Pagination
  const totalHalaman = Math.ceil(dataTersortir.length / itemPerHalaman)
  const indexMulai = (halamanAktif - 1) * itemPerHalaman
  const dataTampil = pagination 
    ? dataTersortir.slice(indexMulai, indexMulai + itemPerHalaman)
    : dataTersortir

  // Render ikon sort
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp size={14} className="opacity-30" />
    }
    return sortConfig.arah === 'asc' 
      ? <ChevronUp size={14} style={{ color: '#00ffff', filter: 'drop-shadow(0 0 5px #00ffff)' }} />
      : <ChevronDown size={14} style={{ color: '#00ffff', filter: 'drop-shadow(0 0 5px #00ffff)' }} />
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Tabel container */}
      <div 
        className="w-full overflow-x-auto rounded-xl"
        style={{
          border: '1px solid rgba(0, 212, 255, 0.2)',
          background: 'rgba(0, 0, 0, 0.3)'
        }}
      >
        <table className="w-full text-left">
          {/* Header */}
          <thead>
            <tr 
              style={{ 
                background: 'rgba(0, 0, 0, 0.5)',
                borderBottom: '1px solid rgba(0, 212, 255, 0.3)'
              }}
            >
              {kolom.map((kol) => (
                <th
                  key={kol.key}
                  onClick={() => kol.sortable && handleSort(kol.key)}
                  className={`
                    px-4 py-3 text-sm font-semibold uppercase tracking-wider
                    ${kol.sortable ? 'cursor-pointer select-none' : ''}
                  `}
                  style={{
                    color: '#00d4ff',
                    textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span>{kol.label}</span>
                    {kol.sortable && renderSortIcon(kol.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              // Loading state
              <tr>
                <td colSpan={kolom.length} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 rounded-full"
                      style={{
                        border: '3px solid rgba(0, 255, 255, 0.2)',
                        borderTopColor: '#00ffff',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Memuat data...</span>
                  </div>
                </td>
              </tr>
            ) : dataTampil.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={kolom.length} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📭</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{kosongPesan}</span>
                  </div>
                </td>
              </tr>
            ) : (
              // Data rows
              dataTampil.map((baris, index) => (
                <motion.tr
                  key={baris.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="group"
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(0, 212, 255, 0.05)'
                  }}
                >
                  {kolom.map((kol) => (
                    <td
                      key={kol.key}
                      className="px-4 py-4 text-sm"
                      style={{ color: '#ffffff' }}
                    >
                      {kol.render 
                        ? kol.render(baris[kol.key], baris)
                        : baris[kol.key]
                      }
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalHalaman > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Menampilkan {indexMulai + 1}-{Math.min(indexMulai + itemPerHalaman, data.length)} dari {data.length} data
          </p>
          
          <div className="flex items-center gap-2">
            {/* Tombol Previous */}
            <motion.button
              onClick={() => setHalamanAktif(h => Math.max(1, h - 1))}
              disabled={halamanAktif === 1}
              className="p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
              whileHover={halamanAktif !== 1 ? {
                borderColor: '#00d4ff',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)'
              } : {}}
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Nomor halaman */}
            {Array.from({ length: totalHalaman }, (_, i) => i + 1)
              .filter(h => h === 1 || h === totalHalaman || Math.abs(h - halamanAktif) <= 1)
              .map((halaman, index, arr) => (
                <div key={halaman} className="flex items-center">
                  {index > 0 && arr[index - 1] !== halaman - 1 && (
                    <span className="px-2" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>...</span>
                  )}
                  <motion.button
                    onClick={() => setHalamanAktif(halaman)}
                    className="w-10 h-10 rounded-lg font-medium"
                    style={{
                      background: halamanAktif === halaman 
                        ? 'linear-gradient(135deg, #8B0000, #DC143C)' 
                        : 'rgba(0, 0, 0, 0.5)',
                      border: `1px solid ${halamanAktif === halaman ? '#ff0040' : 'rgba(255, 255, 255, 0.1)'}`,
                      color: '#ffffff',
                      boxShadow: halamanAktif === halaman ? '0 0 20px rgba(255, 0, 64, 0.4)' : 'none'
                    }}
                    whileHover={halamanAktif !== halaman ? {
                      borderColor: '#00d4ff',
                      boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)'
                    } : {}}
                  >
                    {halaman}
                  </motion.button>
                </div>
              ))
            }

            {/* Tombol Next */}
            <motion.button
              onClick={() => setHalamanAktif(h => Math.min(totalHalaman, h + 1))}
              disabled={halamanAktif === totalHalaman}
              className="p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
              whileHover={halamanAktif !== totalHalaman ? {
                borderColor: '#00d4ff',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)'
              } : {}}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tabel
