import esbuild from "esbuild";
import postCssPlugin from "esbuild-style-plugin";

// Environment variables
const HMR_PORT = Number(process.env.HMR_PORT) || 8001;
const HOST = process.env.HOST || "localhost";

const ctx = await esbuild.context({
  entryPoints: ["./view/index.tsx"],
  outdir: "./public",
  bundle: true,
  minify: false,
  sourcemap: true,
  plugins: [
    postCssPlugin({
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    }),
  ],
});

ctx.serve({
  port: HMR_PORT,
  host: HOST,
});

await ctx.watch();
