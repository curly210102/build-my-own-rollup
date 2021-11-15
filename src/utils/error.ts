import { RollupLogProps } from "../rollup/types";

export function error(base: Error | RollupLogProps): never {
  if (!(base instanceof Error))
    base = Object.assign(new Error(base.message), base);
  throw base;
}

export const enum Errors {
  UNRESOLVED_ENTRY = "UNRESOLVED_ENTRY",
  UNRESOLVED_IMPORT = "UNRESOLVED_IMPORT",
}

export function errUnresolvedEntry(unresolvedId: string): RollupLogProps {
  return {
    code: Errors.UNRESOLVED_ENTRY,
    message: `Could not resolve entry module (${unresolvedId}).`,
  };
}

export function errUnresolvedImport(
  source: string,
  importer: string
): RollupLogProps {
  return {
    code: Errors.UNRESOLVED_IMPORT,
    message: `Could not resolve '${source}' from ${importer}`,
  };
}
