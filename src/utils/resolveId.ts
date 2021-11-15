import { readdirSync, statSync } from "fs";
import { dirname, resolve } from "path";
import { basename } from "path/posix";
import { ResolveIdResult } from "../rollup/types";

export function resolveId(
  source: string,
  importer: string | undefined
): ResolveIdResult {
  const filePath = importer
    ? resolve(dirname(importer), source)
    : resolve(source);

  return addJsExtensionIfNecessary(filePath);
}

function addJsExtensionIfNecessary(filePath: string) {
  return (
    findFile(filePath) ??
    findFile(filePath + ".mjs") ??
    findFile(filePath + ".js")
  );
}

function findFile(filePath: string): string | undefined {
  const stats = statSync(filePath);

  if (stats.isFile()) {
    const name = basename(filePath);
    const files = readdirSync(dirname(filePath));
    if (files.includes(name)) {
      return filePath;
    }
  }
}
