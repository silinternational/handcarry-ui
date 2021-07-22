import App from 'components/App.svelte'
import './components/global.css'
import 'data/analytics.js'
import 'data/error.js'

const app = new App({
	target: document.body,
})

export default app
