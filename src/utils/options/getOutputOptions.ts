import {
  GenericConfigObject,
  NormalizedInputOptions,
  NormalizedOutputOptions,
} from "../../rollup/types";

export function getOutputOptions(
  inputOptions: NormalizedInputOptions,
  rawOutputOptions: GenericConfigObject
): NormalizedOutputOptions {
  return normalizeOutputOptions(rawOutputOptions, inputOptions);
}

function normalizeOutputOptions(config, inputOptions) {
  const file = getFile(config, inputOptions);
  return {
    file,
    dir: getDir(config, file),
  };
}

function getFile(config, inputOptions) {
  const { file } = config;
  if (typeof file === "string") {
    if (!Array.isArray(inputOptions.input)) {
      throw new Error(
        'you must set "output.dir" instead of "output.file" when providing named inputs'
      );
    }
  }
  return file;
}

function getDir(config, file) {
  const { dir } = config;
  if (typeof dir === "string" && typeof file === "string") {
    throw new Error(
      'you must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks'
    );
  }
  return dir;
}
