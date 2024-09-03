import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  },
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:5555",
        changeOrigin: true,
        ws: true, // Enable WebSocket proxy
      },
    },
  },
});
