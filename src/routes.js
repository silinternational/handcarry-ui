import Commitments from './Commitments.svelte'
import Messages from './Messages.svelte'
import Profile from './Profile.svelte'
import RequestForm from './RequestForm.svelte'
import Requests from './Requests.svelte'
import MyRequests from './MyRequests.svelte'

// https://github.com/ItalyPaleAle/svelte-spa-router
const routes = {
	'/requestform': RequestForm,
	'/': Requests,
	'/requests': Requests,
	'/requestsmine': MyRequests,
	'/commitments': Commitments,
	'/messages': Messages,
	'/messages/:id': Messages,
	'/profile': Profile,
 }

export default routes