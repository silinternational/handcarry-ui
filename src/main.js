import './components/global.css'
import './data/analytics'
import './data/error'
import App from './components/App.svelte'

const app = new App({
	target: document.body,
})

export default app
