import http from "http";
import chalk from "chalk";
import fs from "fs";

import { sleep } from "./sleep";
import { baseDir } from "../index";

export const initServer = async ({ PORT }: { PORT: number }) => {
  console.log(chalk.green(`🚀  Starting server on port ${PORT}`));
  await sleep(1000);
  console.clear();

  return http.createServer((req, res) => {
    if (!req.url.startsWith("/public")) req.url = "/public/index.html";
    fs.readFile(`${baseDir}/${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  });
};
