import Graph from "./Graph";
import {
  NormalizedInputOptions,
  NormalizedOutputOptions,
  OutputBundle,
} from "./rollup/types";

export default class Bundle {
  constructor(
    private readonly outputOptions: NormalizedOutputOptions,
    private readonly inputOptions: NormalizedInputOptions,
    private readonly graph: Graph
  ) {}

  async generate(isWrite: boolean): Promise<OutputBundle> {
    const outputBundle = Object.create(null);

    return outputBundle as OutputBundle;
  }
}
