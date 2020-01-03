<script>
import { init as authenticate, me } from '../data/user'
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import { location } from 'svelte-spa-router'
import Footer from './Footer.svelte'
import routes from '../views/routes'
import Bootstrap from './Bootstrap.svelte'
import Error from './Error.svelte'

const publicRoutes = ['/welcome/terms', '/welcome/privacy']

$: isPublicRoute = publicRoutes.some(publicRoute => $location.startsWith(publicRoute))
$: isProtectedRoute = ! isPublicRoute
$: userIsUnknown = ! $me.id
$: isProtectedRoute && userIsUnknown && authenticate()
$: minimal = $location.startsWith('/welcome') || userIsUnknown
</script>

<Bootstrap />

<Nav user={$me} {minimal} />

<main class="container">
  <Error />

  <Router {routes} />
</main>

<Footer />
