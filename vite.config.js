import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg}',
        ],
        runtimeCaching: [{
          urlPattern: new RegExp('^https://travel-troupe-api.herokuapp.com/'),
          handler: 'NetworkFirst',
            options: {
            networkTimeoutSeconds: 20,
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        }]
      },
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      }
    })
  ]
})
