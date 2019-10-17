import Messages from './Messages.svelte'
import Profile from './Profile.svelte'
import NewRequest from './NewRequest.svelte'
import Requests from './Requests.svelte'
import Request from './Request.svelte'
import Login from './Login.svelte'
import Welcome from './Welcome.svelte'

// https://github.com/ItalyPaleAle/svelte-spa-router
const routes = {
	'/': Login,
	'/login': Login,
	'/welcome': Welcome,
	'/requests': Requests,
	'/requests/new': NewRequest,
	'/requests/:id': Request,
	'/messages': Messages,
	'/messages/:id': Messages,
	'/messages/new-conversation/:postId': Messages,
	'/profile': Profile,
 }

export default routes