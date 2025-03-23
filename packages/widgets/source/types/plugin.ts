
export type IPluginCommand = 'serve' | 'build'

export type IPluginOptions = {
  root?: string;
  types?: string;
  serveDir?: string;
  buildDir?: string;
  assetsDir?: string;
}

