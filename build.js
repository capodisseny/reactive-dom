import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  drop:["console", "debugger"],
//   target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'out.js',
})



await esbuild.build({
  entryPoints: ['other-libraries/petite-vue/src/index.ts'],
  bundle: true,
  minify: false,

  define: {
    // 'process.env.NODE_ENV': '"development"',
    "import.meta.env.DEV":"false"
  },
  // format: 'cmjs',
  keepNames: true,
  globalName: 'PetiteVue',  
  drop:["console", "debugger"],
//   target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'examples/vue.js',
})