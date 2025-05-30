import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'


// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias:[
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})
