import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7090',//'http://localhost:5027',
        secure: false // for development for self assigned ssl certificate in asp.net
      },
      '/hub': {
        target: 'https://localhost:7090',//'http://localhost:5027',
        ws: true,
        secure: false 
      },
      '/images': {
        target: 'https://localhost:7090',//'http://localhost:5027',
        secure: false
      }
    }
  }
})
