import Commitments from './Commitments.svelte'
import Messages from './Messages.svelte'
import Profile from './Profile.svelte'
import RequestForm from './RequestForm.svelte'
import Requests from './Requests.svelte'
import MyRequests from './MyRequests.svelte'
import Login from './Login.svelte'

// https://github.com/ItalyPaleAle/svelte-spa-router
const routes = {
	'/': Login,
	'/login': Login,
	'/requests': Requests,
	'/requests/mine': MyRequests,
	'/requests/new': RequestForm,
	'/commitments': Commitments,
	'/messages': Messages,
	'/messages/:id': Messages,
	'/profile': Profile,
 }

export default routes