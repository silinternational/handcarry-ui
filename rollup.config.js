import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json'
import dotenvPlugin from 'rollup-plugin-dotenv'

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css')
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
		livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		terser()
	],
	watch: {
		clearScreen: false
	}
}
