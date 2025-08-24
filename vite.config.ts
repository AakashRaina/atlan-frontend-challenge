import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("react-router") ||
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("lucide-react")
          ) {
            return "@vendor";
          }

          return null;
        },
      },
    },
  },
});
