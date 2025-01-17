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
      "^/api/.": {
        // Using a regex to match all /api/ routes
        target: "https://api.imprint.gg/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            // Add proper CORS headers to the response from the proxied server
            proxyRes.headers["Access-Control-Allow-Origin"] = "*";
            proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
            proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
          });
          proxy.on("error", (err, req, res) => {
            // Handle proxy errors gracefully
            console.error("Proxy error:", err);
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });
            res.end("Proxy error: Something went wrong.");
          });
        },
      },
    },
  },
  define: {
    "process.env": {},
  },
});
