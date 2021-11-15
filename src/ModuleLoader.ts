import Module from "./Module";
import { ResolvedId, ResolveIdResult } from "./rollup/types";
import { error, errUnresolvedEntry, errUnresolvedImport } from "./utils/error";
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

    if (resolveIdResult == null) {
      return error(errUnresolvedEntry(unresolvedId));
    }

    return this.fetchModule(resolveIdResult, importer, true);
  }

  private fetchModule(
    id: string,
    importer: string | undefined,
    isEntry: boolean
  ) {
    const existingModule = this.modulesById.get(id);
    if (existingModule instanceof Module) {
      return existingModule;
    }

    const module = new Module(id);
    this.modulesById.set(id, module);
    // Module 解析代码提取依赖和导出
    this.addModuleSource(id, importer, module);
    const resolveStaticDependency = this.getResolveStaticDependency(module);
    this.fetchStaticDependencies(module, resolveStaticDependency);
    return module;
  }

  private addModuleSource(
    id: string,
    importer: string | undefined,
    module: Module
  ) {}

  private getResolveStaticDependency(
    module: Module
  ): [source: string, resolvedId: ResolvedId][] {
    return Array.from(module.sources, (source) => [
      source,
      (module.resolvedIds[source] =
        module.resolvedIds[source] ??
        this.handleResolveId(resolveId(source, module.id), source, module.id)),
    ]);
  }

  private handleResolveId(
    resolvedId: ResolveIdResult,
    source: string,
    importer: string
  ): ResolvedId {
    if (resolvedId == null) {
      return error(errUnresolvedImport(source, importer));
    }

    return resolvedId;
  }

  private fetchStaticDependencies(
    module: Module,
    resolveStaticDependency: [source: string, resolvedId: ResolvedId][]
  ) {
    resolveStaticDependency.forEach(([source, resolvedId]) => {
      const dependency = this.fetchModule(resolvedId, module.id, false);
      module.dependencies.add(dependency);
      dependency.importers.push(module.id);
    });
  }
}
