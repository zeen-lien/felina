/**
 * FabricFlow - Komponen Input Field Cyberpunk
 * Input dengan efek neon dan animasi futuristik
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

// ==================== KOMPONEN INPUT FIELD ====================
const InputField = ({
  label,
  tipe = 'text', // text, email, password, number, textarea
  nama,
  nilai,
  onChange,
  placeholder = '',
  wajib = false,
  disabled = false,
  error = '',
  helper = '',
  ikon = null,
  className = '',
  ...props
}) => {
  // State untuk toggle password visibility
  const [tampilPassword, setTampilPassword] = useState(false)
  const [fokus, setFokus] = useState(false)

  // Tentukan tipe input yang akan dirender
  const tipeInput = tipe === 'password' && tampilPassword ? 'text' : tipe

  // Warna neon berdasarkan state
  const warnaNeon = error ? '#ff0040' : '#00d4ff'

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={nama}
          className="block text-sm font-medium mb-2"
          style={{ 
            color: fokus ? warnaNeon : 'rgba(255, 255, 255, 0.7)',
            textShadow: fokus ? `0 0 10px ${warnaNeon}50` : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          {label}
          {wajib && (
            <span 
              className="ml-1"
              style={{ color: '#ff0040', textShadow: '0 0 5px #ff0040' }}
            >
              *
            </span>
          )}
        </label>
      )}

      {/* Input container */}
      <motion.div 
        className="relative"
        animate={{
          boxShadow: fokus ? `0 0 20px ${warnaNeon}30` : '0 0 0px transparent'
        }}
        style={{ borderRadius: '0.75rem' }}
      >
        {/* Ikon kiri */}
        {ikon && (
          <div 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
            style={{ 
              color: fokus ? warnaNeon : 'rgba(255, 255, 255, 0.4)',
              filter: fokus ? `drop-shadow(0 0 5px ${warnaNeon})` : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {ikon}
          </div>
        )}

        {/* Input atau Textarea */}
        {tipe === 'textarea' ? (
          <textarea
            id={nama}
            name={nama}
            value={nilai}
            onChange={onChange}
            onFocus={() => setFokus(true)}
            onBlur={() => setFokus(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full px-4 py-3 rounded-xl min-h-[120px] resize-y
              transition-all duration-300 ease-out
              disabled:opacity-50 disabled:cursor-not-allowed
              ${ikon ? 'pl-12' : ''}
              ${className}
            `}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: `1px solid ${fokus ? warnaNeon : error ? '#ff004050' : 'rgba(255, 255, 255, 0.1)'}`,
              color: '#ffffff',
              outline: 'none'
            }}
            {...props}
          />
        ) : (
          <input
            id={nama}
            name={nama}
            type={tipeInput}
            value={nilai}
            onChange={onChange}
            onFocus={() => setFokus(true)}
            onBlur={() => setFokus(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full px-4 py-3 rounded-xl
              transition-all duration-300 ease-out
              disabled:opacity-50 disabled:cursor-not-allowed
              ${ikon ? 'pl-12' : ''}
              ${tipe === 'password' ? 'pr-12' : ''}
              ${className}
            `}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: `1px solid ${fokus ? warnaNeon : error ? '#ff004050' : 'rgba(255, 255, 255, 0.1)'}`,
              color: '#ffffff',
              outline: 'none'
            }}
            {...props}
          />
        )}

        {/* Efek garis neon bawah saat fokus */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: fokus ? 1 : 0 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${warnaNeon}, transparent)`,
            transformOrigin: 'center'
          }}
        />

        {/* Toggle password visibility */}
        {tipe === 'password' && (
          <button
            type="button"
            onClick={() => setTampilPassword(!tampilPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ 
              color: tampilPassword ? '#00ffff' : 'rgba(255, 255, 255, 0.4)',
              filter: tampilPassword ? 'drop-shadow(0 0 5px #00ffff)' : 'none'
            }}
          >
            {tampilPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm flex items-center gap-2"
          style={{ color: '#ff0040', textShadow: '0 0 10px #ff004050' }}
        >
          <span 
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: '#ff0040', boxShadow: '0 0 5px #ff0040' }}
          />
          {error}
        </motion.p>
      )}

      {/* Helper text */}
      {helper && !error && (
        <p 
          className="mt-2 text-sm"
          style={{ color: 'rgba(255, 255, 255, 0.4)' }}
        >
          {helper}
        </p>
      )}
    </div>
  )
}

// ==================== KOMPONEN SELECT ====================
export const SelectField = ({
  label,
  nama,
  nilai,
  onChange,
  opsi = [], // [{ value: '', label: '' }]
  placeholder = 'Pilih...',
  wajib = false,
  disabled = false,
  error = '',
  className = '',
  ...props
}) => {
  const [fokus, setFokus] = useState(false)
  const warnaNeon = error ? '#ff0040' : '#00d4ff'

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={nama}
          className="block text-sm font-medium mb-2"
          style={{ 
            color: fokus ? warnaNeon : 'rgba(255, 255, 255, 0.7)',
            textShadow: fokus ? `0 0 10px ${warnaNeon}50` : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          {label}
          {wajib && (
            <span 
              className="ml-1"
              style={{ color: '#ff0040', textShadow: '0 0 5px #ff0040' }}
            >
              *
            </span>
          )}
        </label>
      )}

      {/* Select */}
      <motion.div
        className="relative"
        animate={{
          boxShadow: fokus ? `0 0 20px ${warnaNeon}30` : '0 0 0px transparent'
        }}
        style={{ borderRadius: '0.75rem' }}
      >
        <select
          id={nama}
          name={nama}
          value={nilai}
          onChange={onChange}
          onFocus={() => setFokus(true)}
          onBlur={() => setFokus(false)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-xl
            transition-all duration-300 ease-out
            disabled:opacity-50 disabled:cursor-not-allowed
            cursor-pointer appearance-none
            bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2300d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e')]
            bg-[length:20px] bg-[right_12px_center] bg-no-repeat
            ${className}
          `}
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: `1px solid ${fokus ? warnaNeon : error ? '#ff004050' : 'rgba(255, 255, 255, 0.1)'}`,
            color: '#ffffff',
            outline: 'none'
          }}
          {...props}
        >
          <option value="" disabled style={{ background: '#0a0a0f', color: '#666' }}>
            {placeholder}
          </option>
          {opsi.map((opt) => (
            <option 
              key={opt.value} 
              value={opt.value}
              style={{ background: '#0a0a0f', color: '#ffffff' }}
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Efek garis neon bawah saat fokus */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: fokus ? 1 : 0 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${warnaNeon}, transparent)`,
            transformOrigin: 'center'
          }}
        />
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm flex items-center gap-2"
          style={{ color: '#ff0040', textShadow: '0 0 10px #ff004050' }}
        >
          <span 
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: '#ff0040', boxShadow: '0 0 5px #ff0040' }}
          />
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default InputField
