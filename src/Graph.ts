import ModuleLoader, { UnresolvedModule } from "./ModuleLoader";
import { NormalizedInputOptions } from "./rollup/types";

function normalizeEntryModules(
  entryModules: string[] | Record<string, string>
): UnresolvedModule[] {
  if (Array.isArray(entryModules)) {
    return entryModules.map((id) => ({
      fileName: null,
      id,
      importer: undefined,
      name: null,
    }));
  }
  return Object.entries(entryModules).map(([name, id]) => ({
    fileName: null,
    id,
    importer: undefined,
    name,
  }));
}

export default class Graph {
  moduleLoader: ModuleLoader;

  constructor(private readonly options: NormalizedInputOptions) {
    this.moduleLoader = new ModuleLoader();
  }

  async build(): Promise<void> {
    this.generateModuleGraph();
    this.sortModules();
    this.includeStatements();
  }

  private generateModuleGraph() {
    this.moduleLoader.addEntryModules(
      normalizeEntryModules(this.options.input)
    );
  }

  private sortModules() {}

  private includeStatements() {}
}
