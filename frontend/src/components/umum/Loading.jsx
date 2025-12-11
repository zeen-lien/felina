/**
 * FabricFlow - Komponen Loading Cyberpunk
 * Loading spinner dengan efek neon futuristik
 */

import { motion } from 'framer-motion'

// ==================== KOMPONEN LOADING ====================
const Loading = ({ 
  ukuran = 'sedang', // kecil, sedang, besar
  teks = 'Memuat...',
  tampilTeks = true,
  penuh = false // full screen
}) => {
  const ukuranConfig = {
    kecil: { spinner: 'w-8 h-8', teks: 'text-sm' },
    sedang: { spinner: 'w-12 h-12', teks: 'text-base' },
    besar: { spinner: 'w-16 h-16', teks: 'text-lg' }
  }

  const cfg = ukuranConfig[ukuran] || ukuranConfig.sedang

  const konten = (
    <div className="flex flex-col items-center gap-4">
      {/* Spinner dengan efek neon */}
      <div className="relative">
        {/* Ring luar */}
        <motion.div
          className={`${cfg.spinner} rounded-full`}
          style={{
            border: '3px solid rgba(0, 255, 255, 0.1)',
            borderTopColor: '#00ffff',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Ring dalam */}
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            border: '2px solid rgba(255, 0, 64, 0.1)',
            borderBottomColor: '#ff0040',
            boxShadow: '0 0 15px rgba(255, 0, 64, 0.3)'
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Titik tengah */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div 
            className="w-2 h-2 rounded-full"
            style={{
              background: '#00ffff',
              boxShadow: '0 0 10px #00ffff'
            }}
          />
        </motion.div>
      </div>

      {/* Teks loading */}
      {tampilTeks && (
        <motion.p
          className={`font-medium ${cfg.teks}`}
          style={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {teks}
        </motion.p>
      )}
    </div>
  )

  if (penuh) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="relative">
          {konten}
        </div>
      </div>
    )
  }

  return konten
}

// ==================== LOADING SKELETON ====================
export const Skeleton = ({ 
  lebar = 'w-full', 
  tinggi = 'h-4',
  rounded = 'rounded-lg'
}) => {
  return (
    <motion.div
      className={`${lebar} ${tinggi} ${rounded}`}
      style={{
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        backgroundSize: '200% 100%'
      }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0']
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// ==================== LOADING DOTS ====================
export const LoadingDots = () => {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: '#00ffff',
            boxShadow: '0 0 8px #00ffff'
          }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15
          }}
        />
      ))}
    </div>
  )
}

export default Loading
