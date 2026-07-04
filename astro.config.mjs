import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import path from 'path'
import cspHashes from './integrations/csp-hashes.mjs'

export default defineConfig({
  integrations: [solidJs(), cspHashes()],
  build: {
    inlineStylesheets: 'never',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
  },
})
