<script>
import { init as initUser, me} from '../data/user'
import { init as initMessaging, unreads } from '../data/messaging'
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import { location } from 'svelte-spa-router'
import Footer from './Footer.svelte'
import routes from '../views/routes'
import Bootstrap from './Bootstrap.svelte'
import BrandOnly from './BrandOnly.svelte'
import Error from './Error.svelte'

initUser()
initMessaging()
</script>

<Bootstrap />

{#if $location.startsWith('/welcome') }
  <BrandOnly />
{:else}
  <Nav user={$me} unreads={$unreads} />
{/if}

<main class="container">
  <Error />

  <Router {routes} />
</main>

<Footer />
