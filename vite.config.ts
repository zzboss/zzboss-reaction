import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'
import viteCompression from 'vite-plugin-compression'


// https://vite.dev/config/
export default defineConfig({
  base: './', // 添加这一行
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
            // const lib = id.toString().split('node_modules/')[1].split('/')[0].toString();
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
  }
})
