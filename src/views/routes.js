import Commitments from './Commitments.svelte'
import Messages from './Messages.svelte'
import Profile from './Profile.svelte'
import NewRequest from './NewRequest.svelte'
import Requests from './Requests.svelte'
import RequestInfo from './RequestInfo.svelte'
import MyRequests from './MyRequests.svelte'
import Login from './Login.svelte'
import Welcome from './Welcome.svelte'
import UploadPlayground from './UploadPlayground.svelte'

// https://github.com/ItalyPaleAle/svelte-spa-router
const routes = {
	'/': Login,
	'/login': Login,
	'/welcome': Welcome,
	'/requests': Requests,
	'/requests/mine': MyRequests,
	'/requests/new': NewRequest,
	'/requests/:id': RequestInfo,
	'/commitments': Commitments,
	'/messages': Messages,
	'/messages/:id': Messages,
	'/messages/new-conversation/:postId': Messages,
	'/profile': Profile,
	'/upload': UploadPlayground,
 }

export default routes