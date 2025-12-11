/**
 * FabricFlow - Komponen Badge Cyberpunk
 * Badge dengan efek neon RGB
 */

import { motion } from 'framer-motion'

// Konfigurasi warna neon
const warnaConfig = {
  default: { bg: 'rgba(128, 128, 128, 0.2)', color: '#888888', border: '#88888850' },
  sukses: { bg: 'rgba(0, 255, 136, 0.15)', color: '#00ff88', border: '#00ff8850' },
  peringatan: { bg: 'rgba(255, 255, 0, 0.15)', color: '#ffff00', border: '#ffff0050' },
  bahaya: { bg: 'rgba(255, 0, 64, 0.15)', color: '#ff0040', border: '#ff004050' },
  info: { bg: 'rgba(0, 255, 255, 0.15)', color: '#00ffff', border: '#00ffff50' },
  primer: { bg: 'rgba(255, 0, 64, 0.15)', color: '#ff0040', border: '#ff004050' },
  sekunder: { bg: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '#00d4ff50' },
  pink: { bg: 'rgba(255, 0, 255, 0.15)', color: '#ff00ff', border: '#ff00ff50' },
  ungu: { bg: 'rgba(191, 0, 255, 0.15)', color: '#bf00ff', border: '#bf00ff50' }
}

// ==================== KOMPONEN BADGE ====================
const Badge = ({
  children,
  varian = 'default',
  ukuran = 'sedang',
  animasi = true,
  className = ''
}) => {
  const cfg = warnaConfig[varian] || warnaConfig.default

  const kelasUkuran = {
    kecil: 'px-2 py-0.5 text-[10px]',
    sedang: 'px-3 py-1 text-xs'
  }

  return (
    <motion.span
      className={`
        inline-flex items-center rounded-full font-semibold font-mono uppercase tracking-wider
        ${kelasUkuran[ukuran]}
        ${className}
      `}
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        textShadow: `0 0 10px ${cfg.color}`,
        boxShadow: animasi ? `0 0 10px ${cfg.color}30` : 'none'
      }}
      whileHover={animasi ? {
        boxShadow: `0 0 15px ${cfg.color}50`,
        scale: 1.05
      } : {}}
    >
      {children}
    </motion.span>
  )
}

// ==================== BADGE STATUS TRANSAKSI ====================
export const BadgeStatusTransaksi = ({ status }) => {
  const varianMap = {
    selesai: 'sukses',
    void: 'bahaya',
    pending: 'peringatan'
  }

  const labelMap = {
    selesai: '✓ SELESAI',
    void: '✗ VOID',
    pending: '◐ PENDING'
  }

  return (
    <Badge varian={varianMap[status] || 'default'} ukuran="kecil">
      {labelMap[status] || status}
    </Badge>
  )
}

// ==================== BADGE PERAN ====================
export const BadgePeran = ({ peran }) => {
  const varianMap = {
    admin: 'primer',
    kasir: 'sekunder'
  }

  const labelMap = {
    admin: '⚡ ADMIN',
    kasir: '◉ KASIR'
  }

  return (
    <Badge varian={varianMap[peran] || 'default'} ukuran="kecil">
      {labelMap[peran] || peran}
    </Badge>
  )
}

// ==================== BADGE STOK ====================
export const BadgeStok = ({ stok, batas = 10 }) => {
  let varian = 'sukses'
  let label = '● TERSEDIA'

  if (stok <= 0) {
    varian = 'bahaya'
    label = '○ HABIS'
  } else if (stok < batas) {
    varian = 'peringatan'
    label = '◐ MENIPIS'
  }

  return (
    <Badge varian={varian} ukuran="kecil">
      {label}
    </Badge>
  )
}

export default Badge
