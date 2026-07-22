import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { Connect } from "vite";
import type { ServerResponse } from "node:http";

// Middleware that prevents Vite's SPA fallback from swallowing /admin/* requests
// so the static public/admin/index.html is served by Vite's static file handler instead.
function adminStaticMiddleware(): { name: string; configureServer: (server: { middlewares: Connect.Server }) => void } {
  return {
    name: "admin-static",
    configureServer(server) {
      server.middlewares.use((req, _res: ServerResponse, next) => {
        if (req.url && (req.url === "/admin" || req.url.startsWith("/admin/"))) {
          // Rewrite bare /admin to /admin/index.html so Vite serves the file directly
          if (req.url === "/admin" || req.url === "/admin/") {
            req.url = "/admin/index.html";
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), adminStaticMiddleware()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    hmr: { clientPort: 443 },
    allowedHosts: "all",
  },
});
