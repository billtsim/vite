import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/slick-carousel/slick/fonts/*',
          dest: 'fonts'
        }
      ]
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCase', // Use camelCase format for class names
    },
  },
  server: {
    host: true, // Allow access via IP address
  },
  build: {
    outDir: 'dist', // Ensure the build output directory is set to 'dist'
  },
});