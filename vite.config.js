import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Vendor code changes far less often than app code, so splitting it
        // into its own chunk lets browsers cache it across deploys instead
        // of re-downloading react/framer-motion/etc. on every site update.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('react-router')) return 'vendor'
            if (id.includes('/react/') || id.includes('/react-dom/')) return 'vendor'
          }
        },
      },
    },
  },
})
