<script>
  import Footer from '../components/Footer.svelte'
  import Bootstrap from '../components/Bootstrap.svelte'
  import Error from '../components/Error.svelte'
  import Nav from '../components/Nav.svelte'
  import { loggingOut } from '../data/auth'
  import { init as authenticate, me } from '../data/user'
  import { page } from '@roxi/routify'

  const publicRoutes = ['/terms', '/privacy', '/join']

  let isPublicRoute = false

  $: isPublicRoute = publicRoutes.some(publicRoute => $page.path.startsWith(publicRoute))
  $: ! (isPublicRoute || isUserAuthn()) && authenticate() // should only react to location changes, not user changes.
  $: userIsAuthn = $me.id

  function isUserAuthn() {
    return $me.id
  }
</script>
<!-- This div prevents material from messing up the layout. Once converted to material grid it can be removed -->
<div class='w-100'>
  <Bootstrap />
  
  <Nav user={$me} />
  
  <main class="container-xl">
    <Error />
    
    {#if $loggingOut}
    <h4>Thank you for visiting, we are signing you out now...</h4>
    {/if}
    
    <slot />
  </main>

  <Footer />
</div>