/**
 * FabricFlow - Komponen Kartu Cyberpunk
 * Kartu transparan dengan outline neon dan animasi
 */

import { motion } from 'framer-motion'

// ==================== KOMPONEN KARTU ====================
const Kartu = ({
  children,
  judul = '',
  subjudul = '',
  aksi = null,
  neon = false,
  klik = false,
  onClick,
  warnaNeon = '#00d4ff', // cyan default
  className = '',
  ...props
}) => {
  const KomponenWrapper = motion.div

  return (
    <KomponenWrapper
      onClick={klik ? onClick : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={klik ? { scale: 1.02 } : { 
        borderColor: `${warnaNeon}50`,
        boxShadow: `0 0 30px ${warnaNeon}15, inset 0 0 30px ${warnaNeon}05`
      }}
      className={`
        relative rounded-xl overflow-hidden
        ${klik ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        background: 'rgba(10, 10, 15, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.4s ease'
      }}
      {...props}
    >
      {/* Efek garis neon di atas */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${warnaNeon}, transparent)`,
          opacity: 0.5
        }}
        whileHover={{ opacity: 1 }}
      />

      {/* Corner accents */}
      <div 
        className="absolute top-0 left-0 w-4 h-4 border-t border-l"
        style={{ borderColor: `${warnaNeon}50` }}
      />
      <div 
        className="absolute top-0 right-0 w-4 h-4 border-t border-r"
        style={{ borderColor: `${warnaNeon}50` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-4 h-4 border-b border-l"
        style={{ borderColor: `${warnaNeon}50` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 border-b border-r"
        style={{ borderColor: `${warnaNeon}50` }}
      />

      {/* Header kartu */}
      {(judul || aksi) && (
        <div 
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <div>
            {judul && (
              <h3 
                className="text-lg font-semibold text-white"
                style={{ textShadow: `0 0 20px ${warnaNeon}30` }}
              >
                {judul}
              </h3>
            )}
            {subjudul && (
              <p className="text-sm mt-0.5" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {subjudul}
              </p>
            )}
          </div>
          {aksi && (
            <div className="flex items-center gap-2">
              {aksi}
            </div>
          )}
        </div>
      )}

      {/* Konten kartu */}
      <div className={judul || aksi ? 'p-6' : 'p-6'}>
        {children}
      </div>
    </KomponenWrapper>
  )
}

// ==================== KOMPONEN STAT CARD CYBERPUNK ====================
export const KartuStat = ({
  judul,
  nilai,
  ikon,
  warna = 'cyan', // cyan, merah, hijau, kuning, pink, ungu
  perubahan = null,
  className = ''
}) => {
  const warnaConfig = {
    cyan: { neon: '#00ffff', gradient: 'from-cyan-500/20 to-blue-500/20' },
    merah: { neon: '#ff0040', gradient: 'from-red-500/20 to-pink-500/20' },
    hijau: { neon: '#00ff88', gradient: 'from-green-500/20 to-emerald-500/20' },
    kuning: { neon: '#ffff00', gradient: 'from-yellow-500/20 to-orange-500/20' },
    pink: { neon: '#ff00ff', gradient: 'from-pink-500/20 to-purple-500/20' },
    ungu: { neon: '#bf00ff', gradient: 'from-purple-500/20 to-indigo-500/20' }
  }

  const cfg = warnaConfig[warna] || warnaConfig.cyan

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 0 30px ${cfg.neon}20`
      }}
      className={`
        relative rounded-xl p-5 overflow-hidden
        ${className}
      `}
      style={{
        background: 'rgba(10, 10, 15, 0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${cfg.neon}30`,
        transition: 'all 0.3s ease'
      }}
    >
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-50`}
      />

      {/* Garis neon atas */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.neon}, transparent)` }}
      />

      <div className="relative flex items-center gap-4">
        {/* Ikon dengan efek neon */}
        <motion.div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${cfg.neon}20, transparent)`,
            border: `1px solid ${cfg.neon}40`,
            boxShadow: `0 0 20px ${cfg.neon}20, inset 0 0 20px ${cfg.neon}10`
          }}
          animate={{
            boxShadow: [
              `0 0 20px ${cfg.neon}20, inset 0 0 20px ${cfg.neon}10`,
              `0 0 30px ${cfg.neon}30, inset 0 0 30px ${cfg.neon}15`,
              `0 0 20px ${cfg.neon}20, inset 0 0 20px ${cfg.neon}10`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={{ color: cfg.neon, filter: `drop-shadow(0 0 8px ${cfg.neon})` }}>
            {ikon}
          </div>
        </motion.div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {judul}
          </p>
          <p 
            className="text-2xl font-bold text-white mt-1"
            style={{ textShadow: `0 0 20px ${cfg.neon}30` }}
          >
            {nilai}
          </p>
          
          {/* Perubahan */}
          {perubahan && (
            <motion.p 
              className="text-xs mt-1 flex items-center gap-1"
              style={{ color: perubahan.naik ? '#00ff88' : '#ff0040' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span style={{ filter: `drop-shadow(0 0 5px ${perubahan.naik ? '#00ff88' : '#ff0040'})` }}>
                {perubahan.naik ? '▲' : '▼'}
              </span>
              <span>{perubahan.nilai}% dari kemarin</span>
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Kartu
