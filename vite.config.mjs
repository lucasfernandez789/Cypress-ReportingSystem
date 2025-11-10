import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config();

const repoName = process.env.VITE_REPO_NAME || '';
const reportsDir = process.env.REPORTS_DIR || 'cypress/reports';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({

  base: mode === 'production' ? `/${repoName}/` : '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true, //limpia antes de build
    assetsDir: 'assets'
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
      '@assets': path.resolve(__dirname, './public/assets'),
      '@reports': path.resolve(__dirname, './public/reports'),
      '@central-reports': path.resolve(reportsDir)
    }
  }
}))