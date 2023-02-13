import ts from 'rollup-plugin-ts'
import pkg from './package.json' assert { type: "json" }
import eslint from '@rollup/plugin-eslint'
import progress from 'rollup-plugin-progress'
import { builtinModules } from 'module'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    progress(),
    eslint(),
    ts(),
  ],
  external: [
    ...builtinModules,
    ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
    ...(pkg.devDependencies == null ? [] : Object.keys(pkg.devDependencies)),
    ...(pkg.peerDependencies == null ? [] : Object.keys(pkg.peerDependencies)),
  ],
}
