<script>
import { me } from '../data/user'
import { init as loadEvents } from '../data/events'
import { init as loadMessaging } from '../data/messaging'
import { init as loadRequests } from '../data/requests'
import { redirect, Router, url } from '@roxi/routify'
import { routes } from '../../.routify/routes'
import { parse, stringify } from 'qs'

$: userIsAuthn = $me.id
// FIXME
// $: ['/', '/login'].includes($url()) && userIsAuthn && $redirect('/requests') // if they're already authn, no need to login again.

$: isDataNeeded = userIsAuthn
$: isDataNeeded && loadData()

function loadData() {
  loadMessaging()
  loadRequests()
  loadEvents()
}
const queryHandler = {
	parse: params => parse(params, {ignoreQueryPrefix: true}),
	stringify
}
</script>

<Router {routes} config={{queryHandler}} />
