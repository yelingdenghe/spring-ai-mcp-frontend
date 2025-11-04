import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:9009'

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          rewrite: (path) => path,
        },
        '/sse': {
          target: backendUrl,
          changeOrigin: true,
          rewrite: (path) => path,
        },
        '/chat': {
          target: backendUrl,
          changeOrigin: true,
          rewrite: (path) => path,
        },
        '/rag': {
          target: backendUrl,
          changeOrigin: true,
          rewrite: (path) => path,
        },
        '/internet': {
          target: backendUrl,
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
    },
  }
})
