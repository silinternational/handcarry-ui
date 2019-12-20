import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import dotenvPlugin from 'rollup-plugin-dotenv'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import autoPreprocess from 'svelte-preprocess'

const cacheBust = Date.now()
const production = !process.env.ROLLUP_WATCH

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `public/bundle.${cacheBust}.js`
	},
	plugins: [
		svelte({
			preprocess: autoPreprocess(),
			
			// enable run-time checks when not in production
			dev: !production,
			
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write(`public/bundle.${cacheBust}.css`)
			}
		}),

		// makes NAME=VALUE pairs in a .env file available in the app as process.env.<NAME> vars
		dotenvPlugin(),
		
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		// added so i18n/[lang].json files can be loaded in i18n/index.js
		json(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// generates a public/index.html that pulls in the newly cache-busted
		// app files, e.g., public/bundle.[timestamp].js
		htmlTemplate({
      template: 'src/prebuild-index.html',
			target: 'public/index.html',
			attrs: ['defer'],
			replaceVars: {
				'__GLOBAL_CSS_CACHE_BUST__': cacheBust,
				'__BUNDLE_CSS_CACHE_BUST__': cacheBust
			}
    })
	],
	watch: {
		clearScreen: false
	}
}
