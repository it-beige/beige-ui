/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({})],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '#': path.join(__dirname, 'types')
    }
  },
  build: {
    sourcemap: true
  },
  test: {
    // jest like test apis
    globals: true,
    // 模拟dom环境
    environment: 'happy-dom',
    // 支持tsx
    transformMode: {
      web: [/.[tj]sx$/]
    }
  }
})
