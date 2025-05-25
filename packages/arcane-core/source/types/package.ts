export interface IPackageNode {
  [K: string]: string
}

export type IPackage = {
  name: string;
  displayName: string;
  version: string;
  description: string;
  main: string;
  type: "commonjs" | "module"
  bin: IPackageNode
  scripts: IPackageNode
  dependencies: IPackageNode
  devDependencies: IPackageNode
  keywords: string[]
  author: string;
  license: string;
}