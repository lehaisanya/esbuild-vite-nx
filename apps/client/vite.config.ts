/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(({ mode }) => ({
  cacheDir: '../../node_modules/.vite/client',

  server: {
    port: 4200,
    host: 'localhost',
    proxy:
      mode === 'development'
        ? {
            '/api': 'http://localhost:3500'
          }
        : undefined
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest'
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
}));
