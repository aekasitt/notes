/* ~~/vite.config.js */

import autoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import tailwind from 'tailwindcss'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/notes/',
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    autoImport({
      dirs: ['./src/stores'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: [
        {
          '@vueuse/core': ['useColorMode'],
        },
        'pinia',
        'vue',
        'vue-router',
      ],
    }),
    svgLoader(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-'),
          white: 'preserve',
        },
      },
    }),
  ],
  publicDir: fileURLToPath(new URL('./static', import.meta.url)),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
