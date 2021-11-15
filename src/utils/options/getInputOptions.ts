import {
  GenericConfigObject,
  InputOptions,
  NormalizedInputOptions,
} from "../../rollup/types";

export function getInputOptions(
  rawInputOptions: GenericConfigObject
): NormalizedInputOptions {
  if (!rawInputOptions) {
    throw new Error("You must supply an options object to rollup");
  }
  return normalizeInputOptions(rawInputOptions);
}

function normalizeInputOptions(config: InputOptions) {
  return {
    input: getInput(config.input),
  };
}

function getInput(rawInput: InputOptions["input"]) {
  return rawInput == null
    ? []
    : typeof rawInput === "string"
    ? [rawInput]
    : rawInput;
}
