import { NormalizedInputOptions } from "./rollup/types";

export default class Graph {
  constructor(private readonly options: NormalizedInputOptions) {}

  async build(): Promise<void> {}
}
