const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')
const path = require('path')

module.exports = defineConfig({
  base: './',
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
})