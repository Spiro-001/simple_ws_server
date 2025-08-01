import esbuild from "esbuild";
import tailwindcssPlugin from "esbuild-plugin-tailwindcss";
import eventPlugin from "./esbuild-plugins/event";
import chalk from "chalk";
import { WebSocketServer } from "ws";

// Environment variables
const HMR_PORT = Number(process.env.HMR_PORT) || 8001;
const EVENT_PORT = Number(process.env.EVENT_PORT) || 8002;
const HOST = process.env.HOST || "localhost";
const NODE_ENV = process.env.NODE_ENV || "development";

const wss = new WebSocketServer({ port: EVENT_PORT });

wss.on("connection", (ws) => {
  ws.on("close", () => {});
});

console.clear();
console.log(chalk.yellow.bold(`✨  Starting HMR server`));
console.log(chalk.green(` → PORT:`), chalk.magenta(`${HMR_PORT}`));
console.log(chalk.green(` → EVENT_PORT:`), chalk.magenta(`${EVENT_PORT}`));
console.log(chalk.green(` → HOST:`), chalk.magenta(`${HOST}`));
console.log(chalk.green(` → NODE_ENV:`), chalk.magenta(`${NODE_ENV}`));
console.log();

const ctx = await esbuild
  .context({
    entryPoints: ["./view/index.tsx"],
    outdir: "./public",
    bundle: true,
    minify: false,
    sourcemap: true,
    plugins: [tailwindcssPlugin(), eventPlugin({ wss })],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

ctx
  .serve({
    port: HMR_PORT,
    host: HOST,
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

await ctx.watch();
