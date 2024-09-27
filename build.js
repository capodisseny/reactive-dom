import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/reactive-dom.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  drop:["console", "debugger"],
//   target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'out.js',
})