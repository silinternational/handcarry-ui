<script>
import { init as authenticate, me } from '../data/user'
import { init as loadEvents } from '../data/events'
import { init as loadMessaging } from '../data/messaging'
import { init as loadRequests } from '../data/requests'
import Nav from './Nav.svelte'
import Footer from './Footer.svelte'
import Bootstrap from './Bootstrap.svelte'
import Error from './Error.svelte'
import { loggingOut } from '../data/auth'
import { redirect, Router, url } from '@roxi/routify'
import { routes } from '../../.routify/routes'
import { parse, stringify } from 'qs'

const publicRoutes = ['/login', '/terms', '/privacy', '/join']

let minimal = false
let isPublicRoute = false

// FIXME
// $: isPublicRoute = publicRoutes.some(publicRoute => $url().startsWith(publicRoute))
$: ! (isPublicRoute || isUserAuthn()) && authenticate() // should only react to location changes, not user changes.
$: userIsAuthn = $me.id
// FIXME
// $: ['/', '/login'].includes($url()) && userIsAuthn && $redirect('/requests') // if they're already authn, no need to login again.
// $: minimal = $url().startsWith('/welcome') || ! userIsAuthn
$: isDataNeeded = userIsAuthn && ! minimal
$: isDataNeeded && loadData()

function isUserAuthn() {
  return $me.id
}
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

<Bootstrap />

<Nav user={$me} {minimal} />

<main class="container-xl">
  <Error />

  {#if $loggingOut}
     <h4>Thank you for visiting, we are signing you out now...</h4>
  {:else}
    <Router {routes} config={{queryHandler}} />
  {/if}
</main>

<Footer />
