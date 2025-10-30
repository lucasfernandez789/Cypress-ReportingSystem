import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Cypress-ReportingSystem/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  build: {
    outDir: 'docs',
    emptyOutDir: false,
    assetsDir: 'assets'
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
      '@assets': path.resolve(__dirname, './public/assets'),
      '@reports': path.resolve(__dirname, './public/reports')
    }
  }
}))