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
      localsConvention: 'camelCase', // 使用 camelCase 格式的类名
    },
  },
  server: {
    host: true, // 允许通过 IP 地址访问
  },
});