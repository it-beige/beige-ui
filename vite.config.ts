import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteJsx from "@vitejs/plugin-vue-jsx";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteJsx({})],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "#": path.join(__dirname, "types"),
    },
  },
});
