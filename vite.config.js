/* ~~/vite.config.js */

import autoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import { copyFile, mkdir } from 'fs/promises'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'
import tailwind from 'tailwindcss'
import topLevelAwait from 'vite-plugin-top-level-await'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/notes/',
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwind()],
    },
  },
  build: { compilerOptions: { target: 'esnext' } },
  optimizeDeps: { exclude: ['pyodide'] },
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
    topLevelAwait(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-'),
          white: 'preserve',
        },
      },
    }),
    {
      name: 'vite-plugin-pyodide',
      generateBundle: async () => {
        let assetsDir = 'dist/assets'
        await mkdir(assetsDir, { recursive: true })
        let files = ['pyodide-lock.json', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip']
        let modulePath = resolve(__dirname, './node_modules/pyodide/')
        for (let file of files) await copyFile(resolve(modulePath, file), resolve(assetsDir, file))
      },
    },
    {
      name: 'configure-response-headers',
      configureServer: server => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
          next()
        })
      },
    },
  ],
  publicDir: fileURLToPath(new URL('./static', import.meta.url)),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  worker: { format: 'es' },
})
