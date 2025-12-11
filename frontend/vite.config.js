import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi Vite untuk FabricFlow
// Base URL disesuaikan untuk GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/felina/', // Nama repository GitHub
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    port: 5173,
    open: true
  }
})
