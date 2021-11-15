import Module from "./Module";
import { resolveId } from "./utils/resolveId";

export interface UnresolvedModule {
  fileName: string | null;
  id: string;
  importer: string | undefined;
  name: string | null;
}

function addChunkNamesToModule(
  module: Module,
  { fileName, name }: UnresolvedModule
) {}

export default class ModuleLoader {
  private readonly modulesById: Map<string, Module>;
  constructor() {
    this.modulesById = new Map();
  }
  addEntryModules(unresolvedEntryModules: UnresolvedModule[]) {
    unresolvedEntryModules
      .map(({ id, importer }) => this.loadEntryModule(id, importer))
      .forEach((entryModule, index) => {
        addChunkNamesToModule(entryModule, unresolvedEntryModules[index]);
      });
  }

  private loadEntryModule(
    unresolvedId: string,
    importer: string | undefined
  ): Module {
    const resolveIdResult = resolveId(unresolvedId, importer);

    return this.fetchModule(resolveIdResult, importer, true);
  }

  private fetchModule(
    id: string,
    importer: string | undefined,
    isEntry: boolean
  ): Module {
    const existingModule = this.modulesById.get(id);
    if (existingModule instanceof Module) {
      return existingModule;
    }

    const module: Module = new Module();
    this.modulesById.set(id, module);
    this.addModuleSource(id, importer, module);
    // Dependencies
  }

  private addModuleSource(
    id: string,
    importer: string | undefined,
    module: Module
  ) {}
}
