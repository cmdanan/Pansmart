import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      features: `${path.resolve(__dirname, './src/features/*')}`,
      pages: `${path.resolve(__dirname, './src/pages/*')}`,
      store: `${path.resolve(__dirname, './src/store/*')}`,
      data: `${path.resolve(__dirname, './src/data/*')}`,
    },
  },
});
