// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // 可以在这里配置 CSS Modules 的选项
      localsConvention: 'camelCase', // 使用 camelCase 格式的类名
    },
  },
});
