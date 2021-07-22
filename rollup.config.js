import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import dotenv from 'rollup-plugin-dotenv'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import { generateSW } from 'rollup-plugin-workbox'
import routify from '@roxi/routify/plugins/rollup'
import autoPreprocess from 'svelte-preprocess'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'

const production = !process.env.ROLLUP_WATCH

const aliases = alias({
  // resolve: ['.svelte', '.js'],
  entries: [
    { find: 'components', replacement: 'src/components' },
    { find: 'data', replacement: 'src/data' },
  ]
})

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: production,
  },
  preserveEntrySignatures: 'strict',
  inlineDynamicImports: true,
  plugins: [
    aliases,
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      emitCss: true, // give component style to postcss() for processing
      preprocess: autoPreprocess(),
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // added so i18n/[lang].json files can be loaded in i18n/index.js
    json(),
    postcss({
      extract: true, // create a css file alongside the output.file
      sourceMap: production,
      use: {
        sass: {
          includePaths: ['node_modules']
        }
      },
    }),
    routify({}),

    // makes NAME=VALUE pairs in a .env file available in the app as process.env.<NAME> vars
    dotenv(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),

    // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW
    generateSW({
      globDirectory: 'dist',
      globPatterns: ['**/*.{css,html,js,json,png}'],
      globIgnores: ['oauth/*'],
      navigateFallback: 'index.html',
      offlineGoogleAnalytics: true,
      swDest: 'dist/service-worker.js',
    }),

    //           minify     auto-refresh browser on changes
    production ? terser() : livereload('dist'),
  ],
  watch: {
    clearScreen: false,
  }
}
