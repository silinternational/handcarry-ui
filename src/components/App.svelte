<script>
import { init as authenticate, me } from '../data/user'
import { init as loadMessaging } from '../data/messaging'
import { init as loadRequests } from '../data/requests'
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import { location } from 'svelte-spa-router'
import Footer from './Footer.svelte'
import routes from '../views/routes'
import Bootstrap from './Bootstrap.svelte'
import Error from './Error.svelte'

const landingPage = '/'
const publicRoutes = ['/terms', '/privacy']

$: isPublicRoute = ($location === landingPage) || publicRoutes.some(publicRoute => $location.startsWith(publicRoute))
$: isProtectedRoute = ! isPublicRoute
$: userIsAuthn = $me.id
$: userIsNotAuthn = ! userIsAuthn
$: isProtectedRoute && userIsNotAuthn && authenticate()
$: minimal = $location.startsWith('/welcome') || userIsNotAuthn
$: isDataNeeded = userIsAuthn && ! minimal
$: isDataNeeded && loadData()
$: $location && scrollTo(0,0) // ensure route changes behave like a normal page change in the browser by going back to the top of the page.

function loadData() {
  loadMessaging()
  loadRequests()
}
</script>

<Bootstrap />

<Nav user={$me} {minimal} />

<main class="container-xl">
  <Error />

  <Router {routes} />
</main>

<Footer />
