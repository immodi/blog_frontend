import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: __dirname,
  build: {
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: path.join(__dirname, 'index.html'),
      }
    }
  }
})
