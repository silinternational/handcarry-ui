<script>
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import Footer from './Footer.svelte'
import routes from '../views/routes'
</script>

<style type="text/scss" global>
@import "../custom.scss";
</style>

<Nav />

<main class="container">
  <Router {routes} />
</main>

<Footer />
