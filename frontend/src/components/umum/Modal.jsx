/**
 * FabricFlow - Komponen Modal Cyberpunk
 * Modal dialog dengan efek neon dan animasi futuristik
 */

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// ==================== KOMPONEN MODAL ====================
const Modal = ({
  buka = false,
  onTutup,
  judul = '',
  ukuran = 'sedang', // kecil, sedang, besar, penuh
  children,
  footer = null,
  tutupDiLuar = true, // Tutup saat klik di luar modal
  warnaNeon = '#00d4ff',
  className = ''
}) => {
  // Kelas berdasarkan ukuran
  const kelasUkuran = {
    kecil: 'max-w-md',
    sedang: 'max-w-lg',
    besar: 'max-w-2xl',
    penuh: 'max-w-4xl'
  }

  // Disable scroll body saat modal terbuka
  useEffect(() => {
    if (buka) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [buka])

  // Handle klik di luar modal
  const handleKlikOverlay = (e) => {
    if (tutupDiLuar && e.target === e.currentTarget) {
      onTutup()
    }
  }

  // Handle tombol Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && buka) {
        onTutup()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [buka, onTutup])

  return (
    <AnimatePresence>
      {buka && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleKlikOverlay}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`
              w-full ${kelasUkuran[ukuran]} max-h-[90vh] overflow-hidden
              rounded-xl relative
              ${className}
            `}
            style={{
              background: 'rgba(10, 10, 15, 0.95)',
              border: `1px solid ${warnaNeon}50`,
              boxShadow: `0 0 40px ${warnaNeon}30, inset 0 0 60px rgba(0, 0, 0, 0.5)`,
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Efek garis neon atas */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${warnaNeon}, transparent)`
              }}
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Corner accents */}
            <div 
              className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2"
              style={{ borderColor: warnaNeon }}
            />
            <div 
              className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2"
              style={{ borderColor: warnaNeon }}
            />
            <div 
              className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2"
              style={{ borderColor: warnaNeon }}
            />
            <div 
              className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2"
              style={{ borderColor: warnaNeon }}
            />

            {/* Header */}
            <div 
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <h2 
                className="text-xl font-bold"
                style={{ 
                  color: '#ffffff',
                  textShadow: `0 0 20px ${warnaNeon}50`
                }}
              >
                {judul}
              </h2>
              <motion.button
                onClick={onTutup}
                className="p-2 rounded-lg"
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid transparent'
                }}
                whileHover={{
                  color: '#ff0040',
                  borderColor: '#ff004050',
                  boxShadow: '0 0 15px rgba(255, 0, 64, 0.3)'
                }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Konten */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {children}
            </div>

            {/* Footer (jika ada) */}
            {footer && (
              <div 
                className="px-6 py-4"
                style={{ 
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.3)'
                }}
              >
                {footer}
              </div>
            )}

            {/* Efek garis neon bawah */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, transparent, #ff0040, transparent)`
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
