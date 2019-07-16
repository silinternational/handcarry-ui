import Commitments from './Commitments.svelte'
import Messages from './Messages.svelte'
import Profile from './Profile.svelte'
import Requests from './Requests.svelte'

const routes = {
	'/requests': Requests,
	'/commitments': Commitments,
	'/messages': Messages,
	'/profile': Profile,
 }


export default routes