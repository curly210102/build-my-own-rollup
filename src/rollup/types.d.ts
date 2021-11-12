export interface RollupBuild {
  generate: (outputOptions: OutputOptions) => Promise<RollupOutput>;
  write: (options: OutputOptions) => Promise<RollupOutput>;
}

export interface GenericConfigObject {
  [key: string]: unknown;
}

export interface NormalizedInputOptions {
  input: string[] | { [entryAlias: string]: string };
}

export interface OutputOptions {
  file?: string;
  dir?: string;
}

export interface NormalizedOutputOptions {
  file: string | undefined;
  dir: string | undefined;
}

export interface RollupOutput {}

export interface OutputBundle {
  [fileName: string]: OutputAsset | OutputChunk;
}

export interface PreRenderedAsset {
  name: string | undefined;
  source: string | Uint8Array;
  type: "asset";
}

export interface OutputAsset extends PreRenderedAsset {
  fileName: string;
  /** @deprecated Accessing "isAsset" on files in the bundle is deprecated, please use "type === \'asset\'" instead */
  isAsset: true;
}

export interface RenderedModule {
  code: string | null;
  originalLength: number;
  removedExports: string[];
  renderedExports: string[];
  renderedLength: number;
}

export interface PreRenderedChunk {
  exports: string[];
  facadeModuleId: string | null;
  isDynamicEntry: boolean;
  isEntry: boolean;
  isImplicitEntry: boolean;
  modules: {
    [id: string]: RenderedModule;
  };
  name: string;
  type: "chunk";
}

export interface RenderedChunk extends PreRenderedChunk {
  code?: string;
  dynamicImports: string[];
  fileName: string;
  implicitlyLoadedBefore: string[];
  importedBindings: {
    [imported: string]: string[];
  };
  imports: string[];
  map?: SourceMap;
  referencedFiles: string[];
}

export interface OutputChunk extends RenderedChunk {
  code: string;
}

export interface SourceMap {
  file: string;
  mappings: string;
  names: string[];
  sources: string[];
  sourcesContent: string[];
  version: number;
  toString(): string;
  toUrl(): string;
}
