import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// module.exports = {
//   configureWebpack:{
//     externals:{
//       'call_db':'call_db',
//       'initmap':'initmap',
//       'jquery.min':'jquery.min',
//       'leaflet-providers-added-onemap':'eaflet-providers-added-onemap',
//       'Polyline.encoded':'Polyline.encoded',
//       'Routing':'Routing',
//     }
//   }
// }
