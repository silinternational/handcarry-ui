<script>
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import { location } from 'svelte-spa-router'
import Footer from './Footer.svelte'
import routes from '../views/routes'
import Bootstrap from '../components/Bootstrap.svelte'
import BrandOnly from './BrandOnly.svelte'
</script>

<Bootstrap />

{#if $location.startsWith('/welcome') }
  <BrandOnly />
{:else}
  <Nav />
{/if}

<main class="container">
  <Router {routes} />
</main>

<Footer />
