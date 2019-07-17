import Commitments from './Commitments.svelte'
import Messages from './Messages.svelte'
import Profile from './Profile.svelte'
import Requests from './Requests.svelte'

// https://github.com/ItalyPaleAle/svelte-spa-router
const routes = {
	'/requests': Requests,
	'/commitments': Commitments,
	'/messages': Messages,
	'/messages/:id': Messages,
	'/profile': Profile,
 }

export default routes