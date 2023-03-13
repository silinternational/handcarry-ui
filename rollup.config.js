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
import html from '@rollup/plugin-html'

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
    dir: 'dist',
    entryFileNames: 'bundle.[hash].js',
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
    html({
      template: ({ files }) => {
        const script = (files.js || [])
          .map(({ fileName }) => `<script defer src='/${fileName}'></script>`)
          .join('\n')

        const css = (files.css || [])
          .map(({ fileName }) => `<link rel='stylesheet' href='/${fileName}'>`)
          .join('\n')
        return getHtml(script, css)
      }
    }),
  ],
  watch: {
    clearScreen: false,
  }
}

function getHtml (script, css) {
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
    <title>WeCarry</title>
  
    <link rel='icon' type='image/png' href='/favicon.ico'>
    <link rel="manifest" href="/manifest.json">
  
    <script>
      'serviceWorker' in navigator && window.addEventListener('load', navigator.serviceWorker.register('/service-worker.js'))
    </script>
  
    ${css}
  </head>
  
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/polyglot.js/2.2.2/polyglot.min.js"></script>
    <script>
      window.fwSettings={
      'widget_id':48000002116
      };
      !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()
    </script>
    <script type='text/javascript' src='https://widget.freshworks.com/widgets/48000002116.js' async defer></script>
    ${script}
  </body>
  </html>`
}
