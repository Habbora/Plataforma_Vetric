import { join } from "path";
import { stat } from "fs/promises";

const baseDir = join(process.cwd(), "dist");
const port = Number(process.env.PORT || 3000);

export default {
  port,
  fetch: async (req: Request) => {
    const url = new URL(req.url);
    if (url.pathname === "/config.json") {
      const apiUrl =
        process.env.VITE_API_URL ||
        process.env.API_URL ||
        "http://localhost:3001";
      const appName =
        process.env.VITE_APP_NAME ||
        process.env.APP_NAME ||
        "VETRIC Dashboard";
      const body = JSON.stringify({ API_URL: apiUrl, APP_NAME: appName });
      return new Response(body, {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }
    if (url.pathname === "/health") {
      return new Response("ok", { headers: { "Content-Type": "text/plain" } });
    }
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const filePath = join(baseDir, pathname);
    try {
      await stat(filePath);
      return new Response(Bun.file(filePath));
    } catch {
      return new Response(Bun.file(join(baseDir, "index.html")));
    }
  },
};

