import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    // короткие импорты: "~/components/..." вместо "../../components/..."
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      "/api": { target: "http://127.0.0.1:4000", changeOrigin: true },
      "/uploads": { target: "http://127.0.0.1:4000", changeOrigin: true },
    },
    port: 5173,
    // host: true — сервер слушает 0.0.0.0, поэтому сайт можно открыть
    // с другого устройства в той же сети или из облачной среды разработки.
    host: true,
    // allowedHosts разрешает обращение по внешнему домену (облачный preview).
    // При локальной работе это не мешает.
    allowedHosts: true,
  },
});
