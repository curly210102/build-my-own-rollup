import Bundle from "../Bundle";
import Graph from "../Graph";
import { getInputOptions } from "../utils/options/getInputOptions";
import { getOutputOptions } from "../utils/options/getOutputOptions";
import {
  GenericConfigObject,
  NormalizedInputOptions,
  OutputOptions,
  RollupBuild,
} from "./types";

export default function rollup(
  rawInputOptions: GenericConfigObject
): Promise<RollupBuild> {
  return rollupInternal(rawInputOptions);
}

export async function rollupInternal(
  rawInputOptions: GenericConfigObject
): Promise<RollupBuild> {
  const inputOptions = getInputOptions(rawInputOptions);

  const graph = new Graph(inputOptions);

  await graph.build();

  const result = {
    async generate(outputOptions: OutputOptions) {
      return handleGenerateWrite(
        false,
        inputOptions,
        outputOptions as GenericConfigObject,
        graph
      );
    },
    async write(outputOptions: OutputOptions) {
      return handleGenerateWrite(
        true,
        inputOptions,
        outputOptions as GenericConfigObject,
        graph
      );
    },
  };

  return result;
}

async function handleGenerateWrite(
  isWrite: boolean,
  inputOptions: NormalizedInputOptions,
  rawOutputOptions: GenericConfigObject,
  graph: Graph
) {
  const outputOptions = getOutputOptions(inputOptions, rawOutputOptions);
  const bundle = new Bundle(outputOptions, inputOptions, graph);
  const generated = await bundle.generate(isWrite);
  return generated;
}
