import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/.netlify/functions": {
  //       target: "http://localhost:8888",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/\.netlify\/functions/, ""),
  //     },
  //   },
  // },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
