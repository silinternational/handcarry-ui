<script>
import { me } from '../data/user'
import { init as loadEvents } from '../data/events'
import { init as loadMessaging } from '../data/messaging'
import { init as loadRequests } from '../data/requests'
import { Router } from '@roxi/routify'
import { routes } from '../../.routify/routes'
import { parse, stringify } from 'qs'

$: $me.id && loadData()

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
