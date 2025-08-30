import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        // Define custom colors if needed to match design precisely
        'dark-navy': '#1A202C',
        'accent-yellow': '#FFD700',
        'yellow-accent': '#FFD15B',
        'green-dark': '#3A6F56',
      },
      animation: {
        // If you have subtle animations like the blobs from the first image
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3399
  },
  base: "/my_portfolio/"
})
