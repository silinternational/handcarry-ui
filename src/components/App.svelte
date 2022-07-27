<script>
import { init as loadEvents } from 'data/events.js'
import { init as loadMessaging } from 'data/messaging.js'
import { init as loadRequests } from 'data/requests.js'
import { me } from 'data/user.js'
import '../mdc/_index.scss'
import { routes } from '../../.routify/routes'

import { parse, stringify } from 'qs'
import { Router } from '@roxi/routify'

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
