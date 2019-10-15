<script>
import Nav from './Nav.svelte'
import Router from 'svelte-spa-router' // https://github.com/ItalyPaleAle/svelte-spa-router
import Footer from './Footer.svelte'
import routes from '../views/routes'
import 'bootstrap'
</script>

<style type="text/scss" global>
$theme-colors: (
  "dark-gray" :#292923,
  
  "primary": #0095F3,
  "blue": #0095F3,
  
  "success": #67ae09,
  "green": #67ae09,
  
  //"info": #37c89e,
  "teal": #37c89e,
  
  "warning": #ff731b,
  "orange": #ff731b,
  
  "danger": #e0221f,
  "red": #e0221f,
);

@import "../../node_modules/bootstrap/scss/bootstrap";
</style>

<Nav />

<main class="container">
  <Router {routes} />
</main>

<Footer />
