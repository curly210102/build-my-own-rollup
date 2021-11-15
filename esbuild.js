require("esbuild").buildSync({
  entryPoints: ["src/rollup/rollup.ts"],
  bundle: true,
  platform: "node",
  target: ["node14"],
  outdir: "dist",
});
