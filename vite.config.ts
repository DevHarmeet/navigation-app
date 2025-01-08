import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      timeout: 1000,
      overlay: false,
    },
    watch: {
      usePolling: false,
      interval: 1000,
    },
  },
});
