<script>
import { init as authenticate, me } from '../data/user'
import { init as loadEvents } from '../data/events'
import { init as loadMessaging } from '../data/messaging'
import { init as loadRequests } from '../data/requests'
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import { location, replace } from 'svelte-spa-router'
import Footer from './Footer.svelte'
import routes from '../views/routes'
import Bootstrap from './Bootstrap.svelte'
import Error from './Error.svelte'
import { loggingOut } from '../data/auth'
import { initClient } from "@urql/svelte"
import { getToken } from '../data/token'
import { baseURL } from '../data/api'

const publicRoutes = ['/login', '/terms', '/privacy', '/join']

$: isPublicRoute = publicRoutes.some(publicRoute => $location.startsWith(publicRoute))
$: ! (isPublicRoute || isUserAuthn()) && authenticate() // should only react to location changes, not user changes.
$: userIsAuthn = $me.id
$: ['/', '/login'].includes($location) && userIsAuthn && replace('/requests') // if they're already authn, no need to login again.
$: minimal = $location.startsWith('/welcome') || ! userIsAuthn
$: isDataNeeded = userIsAuthn && ! minimal
$: isDataNeeded && loadData()
$: $location && scrollTo(0,0) // ensure route changes behave like a normal page change in the browser by going back to the top of the page.

function isUserAuthn() {
  return $me.id
}
function loadData() {
  loadMessaging()
  loadRequests()
  loadEvents()
}

const options = {
  url: baseURL,
  fetchOptions: () => {
    const token = getToken()
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
}

initClient(options);
</script>

<Bootstrap />

<Nav user={$me} {minimal} />

<main class="container-xl">
  <Error />

  {#if $loggingOut}
     <h4>Thank you for visiting, we are signing you out now...</h4>
  {:else}
    <Router {routes} />
  {/if}
</main>

<Footer />
