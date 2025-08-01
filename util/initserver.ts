import http from "http";
import chalk from "chalk";
import fs from "fs";

import { sleep } from "./sleep";
import { baseDir } from "../index";

const NODE_ENV = process.env.NODE_ENV || "development";
const EVENT_PORT = Number(process.env.EVENT_PORT) || 8002;

export const initServer = async ({ PORT }: { PORT: number }) => {
  console.log(chalk.green(`🚀  Starting server on port ${PORT}`));
  await sleep(1000);
  console.clear();

  return http.createServer((req, res) => {
    const ip = req.socket.remoteAddress;
    console.log(chalk.green(`[${ip}] Request: ${req.url}`));

    if (!req.url.startsWith("/index")) req.url = "/index.html";
    fs.readFile(`${baseDir}/public/${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": getContentType(req.url) });
        if (req.url === "/index.html" && NODE_ENV === "development") {
          const RELOAD_EVENT = injectHMRScript({ port: EVENT_PORT });
          res.write(RELOAD_EVENT);
        }
        res.write(data);
        res.end();
      }
    });
  });
};

function injectHMRScript({ port }: { port: number }) {
  return `<script>
  const ws = new WebSocket("ws://localhost:${port}");
  ws.onmessage = (e) => window.location.reload();
</script>`;
}

function getContentType(url: string) {
  if (url.endsWith(".html")) return "text/html";
  if (url.endsWith(".js")) return "application/javascript";
  if (url.endsWith(".css")) return "text/css";
  if (url.endsWith(".png")) return "image/png";
  if (url.endsWith(".jpg")) return "image/jpeg";
  if (url.endsWith(".svg")) return "image/svg+xml";
  if (url.endsWith(".webp")) return "image/webp";
  if (url.endsWith(".json")) return "application/json";
  if (url.endsWith(".wasm")) return "application/wasm";
  return "application/octet-stream";
}
