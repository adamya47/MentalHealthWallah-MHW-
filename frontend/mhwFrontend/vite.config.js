import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api":{
        target: 'https://mentalhealthwallah-mhw.onrender.com', // Correct backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` from the path before forwarding
      }
      
    }
  },
  plugins: [react()],
})
