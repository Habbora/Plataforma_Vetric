import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Log da variável de ambiente em tempo de servidor (dev/preview)
  // Útil para validar -e VITE_API_URL no container
  // Aparece no terminal onde o Vite inicia
  ...(console.log('[VITECONF] VITE_API_URL =', process.env.VITE_API_URL), {}),
  server: {
    host: "::",
    port: 8080,
    // Permite qualquer host durante o desenvolvimento (npm run dev)
    allowedHosts: true, 
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 8080, // Recomendado manter a porta consistente
    // Permite qualquer host durante o preview (npm run preview)
    allowedHosts: true, 
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
