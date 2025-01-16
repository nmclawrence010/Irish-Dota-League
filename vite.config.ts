import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/match": {
        target: "https://api.imprint.gg",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
      "/api/league/players": {
        target: "https://api.imprint.gg",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  define: {
    "process.env": {},
  },
});
