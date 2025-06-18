import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'
import viteCompression from 'vite-plugin-compression'
import autoprefixer from 'autoprefixer';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [react(),
    viteCompression({
      threshold: 10240,
    })
  ],
  resolve: {
    alias:[
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        }
      },
    },
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
      },
    }
  },
  css: {
    postcss: {
      // 引入 autoprefixer
      plugins: [autoprefixer()]
    },
    preprocessorOptions: {
      less: {
        // 可选：配置LESS全局变量
        additionalData: `@import "@/styles/variables.less";`,
        javascriptEnabled: true,
      }
    }
  }
})
