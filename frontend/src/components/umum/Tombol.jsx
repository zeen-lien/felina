/**
 * FabricFlow - Komponen Tombol Cyberpunk
 * Tombol dengan efek neon dan animasi futuristik
 */

import { motion } from 'framer-motion'

// Konfigurasi warna tombol
const warnaConfig = {
  primer: {
    bg: 'linear-gradient(135deg, #8B0000, #DC143C)',
    border: '#ff0040',
    glow: 'rgba(255, 0, 64, 0.5)',
    hoverGlow: '0 0 30px rgba(255, 0, 64, 0.6), 0 0 60px rgba(255, 0, 64, 0.3)'
  },
  sekunder: {
    bg: 'linear-gradient(135deg, #1a237e, #3949ab)',
    border: '#00d4ff',
    glow: 'rgba(0, 212, 255, 0.5)',
    hoverGlow: '0 0 30px rgba(0, 212, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.3)'
  },
  outline: {
    bg: 'transparent',
    border: '#ff0040',
    glow: 'rgba(255, 0, 64, 0.3)',
    hoverGlow: '0 0 20px rgba(255, 0, 64, 0.4)'
  },
  ghost: {
    bg: 'transparent',
    border: 'rgba(255, 255, 255, 0.1)',
    glow: 'transparent',
    hoverGlow: '0 0 15px rgba(255, 255, 255, 0.1)'
  },
  bahaya: {
    bg: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
    border: '#ff0000',
    glow: 'rgba(255, 0, 0, 0.5)',
    hoverGlow: '0 0 30px rgba(255, 0, 0, 0.6)'
  },
  cyber: {
    bg: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))',
    border: '#00ffff',
    glow: 'rgba(0, 255, 255, 0.3)',
    hoverGlow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(255, 0, 255, 0.3)'
  }
}

// ==================== KOMPONEN TOMBOL ====================
const Tombol = ({
  children,
  tipe = 'primer',
  ukuran = 'sedang',
  penuh = false,
  disabled = false,
  loading = false,
  ikon = null,
  ikonPosisi = 'kiri',
  onClick,
  className = '',
  ...props
}) => {
  const cfg = warnaConfig[tipe] || warnaConfig.primer

  // Kelas berdasarkan ukuran
  const kelasUkuran = {
    kecil: 'px-3 py-1.5 text-sm',
    sedang: 'px-5 py-2.5 text-base',
    besar: 'px-7 py-3.5 text-lg'
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative inline-flex items-center justify-center gap-2
        font-semibold rounded-lg overflow-hidden
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${kelasUkuran[ukuran]}
        ${penuh ? 'w-full' : ''}
        ${className}
      `}
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 0 15px ${cfg.glow}`,
        color: tipe === 'outline' || tipe === 'ghost' ? cfg.border : '#ffffff'
      }}
      whileHover={!disabled ? {
        scale: 1.02,
        boxShadow: cfg.hoverGlow,
        y: -2
      } : {}}
      whileTap={!disabled ? { scale: 0.98, y: 0 } : {}}
      {...props}
    >
      {/* Efek shine */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
        }}
        whileHover={{
          opacity: 1,
          x: ['0%', '100%']
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-5 h-5 rounded-full"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: '#ffffff'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Ikon kiri */}
      {!loading && ikon && ikonPosisi === 'kiri' && (
        <span className="flex-shrink-0" style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}>
          {ikon}
        </span>
      )}

      {/* Text */}
      <span className="relative z-10">{children}</span>

      {/* Ikon kanan */}
      {!loading && ikon && ikonPosisi === 'kanan' && (
        <span className="flex-shrink-0" style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}>
          {ikon}
        </span>
      )}
    </motion.button>
  )
}

export default Tombol
