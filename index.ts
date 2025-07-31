import chalk from "chalk";

// Utils
import { sleep } from "./util/sleep";
import { loadEnv } from "./util/loadenv";
import { initServer } from "./util/initserver";

// WebSockets
import { WebSocketServer } from "ws";

// Loading environment variables
await loadEnv();

export const baseDir = process.cwd();

// Environment variables
const PORT = Number(process.env.PORT) || 8080;

const server = await initServer({ PORT });
server.listen(PORT, () => {
  console.log(chalk.yellow.bold(`Simple WebSocket Server`));
  console.log(chalk.green(` — PORT:`), chalk.magenta(`${PORT}`));
});

// const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     console.log(`Received message => ${message}`);
//     ws.send(`Received your message => ${message}`);
//   });

//   ws.on("close", () => console.log("Client disconnected"));
// });
