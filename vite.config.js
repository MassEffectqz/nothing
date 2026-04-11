import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Оптимизация изображений
    assetsInlineLimit: 4096, // Inline файлы < 4kb
    // Brotli сжатие
    brotliSize: true,
    // Отчет о сборке
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // Оптимизация имен файлов для кэширования
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Настройки сервера для разработки
  server: {
    port: 3000,
    open: true,
  },
  // Предзагрузка ресурсов
  preview: {
    port: 4173,
    open: true,
  },
})

