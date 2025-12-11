/**
 * FabricFlow - Halaman Login Cyberpunk
 * Halaman autentikasi dengan efek neon futuristik
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Zap, Shield, User } from 'lucide-react'
import useAuthStore from '../store/authStore'
import InputField from '../components/umum/InputField'
import Tombol from '../components/umum/Tombol'
import { notifikasiSukses, notifikasiError } from '../utils/notifikasi'
import { DAFTAR_PENGGUNA } from '../utils/konstanta'

// ==================== HALAMAN LOGIN ====================
const Login = () => {
  const navigate = useNavigate()
  const { login, sedangMemuat } = useAuthStore()

  // State form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validasi form
  const validasiForm = () => {
    const errorBaru = {}
    if (!formData.email) {
      errorBaru.email = 'Email wajib diisi'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorBaru.email = 'Format email tidak valid'
    }
    if (!formData.password) {
      errorBaru.password = 'Password wajib diisi'
    }
    setErrors(errorBaru)
    return Object.keys(errorBaru).length === 0
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validasiForm()) return

    const hasil = login(formData.email, formData.password)
    if (hasil.sukses) {
      notifikasiSukses('Akses Diberikan', `Selamat datang, ${hasil.pengguna.nama}!`)
      navigate('/')
    } else {
      notifikasiError('Akses Ditolak', hasil.pesan)
    }
  }

  // Quick login
  const quickLogin = (email, password) => {
    setFormData({ email, password })
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: '#050505',
        backgroundImage: `
          linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glow orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 64, 0.15) 0%, transparent 70%)',
            top: '-10%',
            right: '-10%'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-10%'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Scan lines */}
        <motion.div
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent)'
          }}
          animate={{
            top: ['-10%', '110%']
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card container */}
        <div 
          className="relative rounded-2xl p-8 overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Top neon line */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #ff0040, #00ffff, transparent)'
            }}
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/50" />

          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              className="relative w-20 h-20 mx-auto mb-4"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 0, 64, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
                  '0 0 30px rgba(0, 212, 255, 0.5), 0 0 50px rgba(255, 0, 64, 0.3)',
                  '0 0 20px rgba(255, 0, 64, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(26, 35, 126, 0.8))',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 0, 64, 0.5)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={36} className="text-white" style={{ filter: 'drop-shadow(0 0 10px #fff)' }} />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold mb-1"
              style={{
                background: 'linear-gradient(90deg, #ff0040, #ff00ff, #00ffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              FabricFlow
            </motion.h1>
            <p className="text-cyan-400/60 text-sm font-mono tracking-wider">
              CYBER FABRIC MANAGEMENT SYSTEM
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Email"
              tipe="email"
              nama="email"
              nilai={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email Anda"
              ikon={<Mail size={20} className="text-cyan-400" />}
              error={errors.email}
              wajib
            />

            <InputField
              label="Password"
              tipe="password"
              nama="password"
              nilai={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              ikon={<Lock size={20} className="text-cyan-400" />}
              error={errors.password}
              wajib
            />

            <motion.button
              type="submit"
              disabled={sedangMemuat}
              className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #8B0000, #DC143C)',
                border: '1px solid #ff0040',
                boxShadow: '0 0 20px rgba(255, 0, 64, 0.3)'
              }}
              whileHover={{
                boxShadow: '0 0 30px rgba(255, 0, 64, 0.5), 0 0 60px rgba(255, 0, 64, 0.3)',
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
            >
              {sedangMemuat ? (
                <div className="loading-spinner w-5 h-5" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>MASUK SISTEM</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p className="text-sm text-white/40 text-center mb-4 font-mono">
              [ AKUN DEMO - KLIK UNTUK AUTOFILL ]
            </p>
            <div className="space-y-2">
              {DAFTAR_PENGGUNA.map((user, index) => (
                <motion.button
                  key={user.id}
                  type="button"
                  onClick={() => quickLogin(user.email, user.password)}
                  className="w-full flex items-center justify-between p-3 rounded-xl transition-all"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  whileHover={{
                    borderColor: user.peran === 'admin' ? '#ff0040' : '#00ffff',
                    boxShadow: user.peran === 'admin' 
                      ? '0 0 15px rgba(255, 0, 64, 0.2)' 
                      : '0 0 15px rgba(0, 212, 255, 0.2)',
                    x: 5
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: user.peran === 'admin' 
                          ? 'linear-gradient(135deg, rgba(255, 0, 64, 0.2), transparent)'
                          : 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), transparent)',
                        border: `1px solid ${user.peran === 'admin' ? '#ff004050' : '#00d4ff50'}`
                      }}
                    >
                      {user.peran === 'admin' ? (
                        <Shield size={18} style={{ color: '#ff0040', filter: 'drop-shadow(0 0 5px #ff0040)' }} />
                      ) : (
                        <User size={18} style={{ color: '#00ffff', filter: 'drop-shadow(0 0 5px #00ffff)' }} />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{user.nama}</p>
                      <p className="text-xs text-white/40 font-mono">{user.email}</p>
                    </div>
                  </div>
                  <span 
                    className="text-xs px-2 py-1 rounded-full font-mono uppercase"
                    style={{
                      background: user.peran === 'admin' ? 'rgba(255, 0, 64, 0.2)' : 'rgba(0, 212, 255, 0.2)',
                      color: user.peran === 'admin' ? '#ff0040' : '#00ffff',
                      border: `1px solid ${user.peran === 'admin' ? '#ff004050' : '#00d4ff50'}`,
                      textShadow: `0 0 10px ${user.peran === 'admin' ? '#ff0040' : '#00ffff'}`
                    }}
                  >
                    {user.peran}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bottom neon line */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #00ffff, #ff0040, transparent)'
            }}
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/30 mt-6 font-mono">
          © 2024 FABRICFLOW • DEMO VERSION • v1.0.0
        </p>
      </motion.div>
    </div>
  )
}

export default Login
