import dotenv from "dotenv";
import chalk from "chalk";
import { sleep } from "./sleep";

export const loadEnv = async () => {
    console.clear();
    console.log(chalk.green(`⚙️   Loading environment variables...`));
    dotenv.config({ path: "./.env", quiet: true });
    console.log(chalk.green(`✔️   Environment variables loaded successfully`));
};
