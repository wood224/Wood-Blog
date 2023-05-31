import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const pathResolve = (dir) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": pathResolve("./src"),
    },
  },
  define: {
    __BaseURL__: JSON.stringify('http://localhost:3000'),
    __ApiURL__: JSON.stringify('http://localhost:3000/front/api')
    // __BaseURL__: JSON.stringify('http://118.89.199.233:3000'),
    // __ApiURL__: JSON.stringify('http://118.89.199.233:3000/front/api')
  },
  server: {
    host: '0.0.0.0',
    port: 224,
    open: true,
  },
})
