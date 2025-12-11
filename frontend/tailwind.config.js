/** @type {import('tailwindcss').Config} */

// Konfigurasi Tailwind CSS untuk FabricFlow
// Tema gelap dengan aksen merah maroon dan biru tua
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Warna kustom FabricFlow
      colors: {
        // Background gelap
        'gelap': {
          'utama': '#0a0a0a',
          'kartu': '#1a1a1a', 
          'hover': '#242424',
          'border': '#333333'
        },
        // Merah Maroon (Primary)
        'merah': {
          'utama': '#8B0000',
          'terang': '#DC143C',
          'gelap': '#5c0000',
          'neon': '#ff1744'
        },
        // Biru Tua (Secondary)
        'biru': {
          'utama': '#1a237e',
          'terang': '#3949ab',
          'gelap': '#0d1642',
          'neon': '#00d4ff'
        },
        // Text
        'teks': {
          'utama': '#ffffff',
          'sekunder': '#a0a0a0',
          'nonaktif': '#666666'
        }
      },
      // Font family
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      // Box shadow dengan efek neon
      boxShadow: {
        'neon-merah': '0 0 5px #DC143C, 0 0 20px rgba(220, 20, 60, 0.3)',
        'neon-biru': '0 0 5px #00d4ff, 0 0 20px rgba(0, 212, 255, 0.3)',
        'neon-putih': '0 0 5px #ffffff, 0 0 20px rgba(255, 255, 255, 0.2)',
        'kartu': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)'
      },
      // Animasi kustom
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out'
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 5px #DC143C, 0 0 20px rgba(220, 20, 60, 0.3)' },
          '50%': { boxShadow: '0 0 10px #DC143C, 0 0 40px rgba(220, 20, 60, 0.5)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 10px #00d4ff, 0 0 30px rgba(0, 212, 255, 0.5)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      // Border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      }
    },
  },
  plugins: [],
}
