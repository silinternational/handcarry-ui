<script>
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import Footer from './Footer.svelte'
import routes from './routes'
</script>

<style>
main {
  height: 85vh;
}
</style>

<Nav />

<main class="container">
  <Router {routes} />
</main>

<Footer />