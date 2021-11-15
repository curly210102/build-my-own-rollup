import { ResolvedIdMap } from "./rollup/types";

export default class Module {
  // 解析得到的依赖
  sources = new Set<string>();
  // 依赖对应的 resolveId（文件路径）
  declare resolvedIds: ResolvedIdMap;
  // 依赖模块
  dependencies = new Set<Module>();
  // 依赖该模块的所有模块的 id
  importers: string[] = [];
  constructor(public readonly id: string) {}
}
