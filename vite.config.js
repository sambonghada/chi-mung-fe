import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.jeju.go.kr',
        changeOrigin: true,
        rewrite: (path) =>path.replace(/^\/api/, '/api')
      },
      '/voices': {
        target: 'https://judy-carter-hyden-silvia-snorlax.site',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/voices/, '/voices'),  // URL 변환 설정
      },
    }
  }
});