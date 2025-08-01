import chalk from "chalk";

// Utils
import { loadEnv } from "./util/loadenv";
import { initServer } from "./util/initserver";
import { WSDashboard } from "./util/wsdash";

// WebSockets
import { WebSocketServer } from "ws";

// Loading environment variables
await loadEnv();

export const baseDir = process.cwd();

// Environment variables
const PORT = Number(process.env.PORT) || 8000;
const NODE_ENV = process.env.NODE_ENV || "development";
const WS_DASH_PORT = Number(process.env.WS_DASH_PORT) || 8080;

// Initialize server
const server = await initServer({ PORT });
server.listen(PORT, () => {
  console.log(chalk.yellow.bold(`✨  Simple WebSocket Server`));
  console.log(chalk.green(` → PORT:`), chalk.magenta(`${PORT}`));
  console.log(chalk.green(` → NODE_ENV:`), chalk.magenta(`${NODE_ENV}`));
});

// Websocket settings
const WS_SETTINGS = {
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  },
};

// Initialize Websocket server
const dash_clients = new WSDashboard({ WS_DASH_PORT });
const wss = new WebSocketServer({ server, ...WS_SETTINGS });

// Websocket connection
wss.on("connection", (ws, req) => {
  dash_clients.add(ws, req);
  // Rest of Websocket code

  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());
    dash_clients.broadcast({ type, data });
    // Rest of Websocket code
  });

  ws.on("close", () => {
    dash_clients.remove(ws);
    // Rest of Websocket code
  });
});
