import Messages from './Messages.svelte'
import Profile from './Profile.svelte'
import CreateOrUpdateRequest from './CreateOrUpdateRequest.svelte'
import Requests from './Requests.svelte'
import Request from './Request.svelte'
import Login from './Login.svelte'
import Welcome from './Welcome.svelte'
import Privacy from './Privacy.svelte'
import Terms from './Terms.svelte'
import FirstTimePreferences from './FirstTimePreferences.svelte'

// https://github.com/ItalyPaleAle/svelte-spa-router
const routes = {
	'/': Login,
	'/login': Login,
	'/welcome': Welcome,
	'/privacy': Privacy,
	'/privacy/:section': Privacy,
	'/terms': Terms,
	'/terms/:section': Terms,
	'/welcome/preferences': FirstTimePreferences,
	'/requests': Requests,
	'/requests/new': CreateOrUpdateRequest,
	'/requests/:id': Request,
	'/requests/:id/conversation/:conversationId': Request,
	'/requests/:id/edit': CreateOrUpdateRequest,
	'/messages': Messages,
	'/messages/:id': Messages,
	'/profile': Profile,
 }

export default routes