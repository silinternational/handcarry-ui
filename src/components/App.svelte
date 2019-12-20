<script>
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import { location } from 'svelte-spa-router'
import Footer from './Footer.svelte'
import routes from '../views/routes'
import Bootstrap from './Bootstrap.svelte'
import Error from './Error.svelte'
</script>

<Bootstrap />

{#if ! $location.startsWith('/welcome') }
  <Nav />
{/if}

<main class="container">
  <Error />

  <Router {routes} />
</main>

<Footer />
