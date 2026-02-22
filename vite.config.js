// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import badgesPlugin from "./plugins/vite-plugin-badges.js";

export default defineConfig({
  plugins: [react(), badgesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // これがポイント！
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: true, // または '0.0.0.0'
    port: 5173, // 任意のポート
  },
});
