<script>
  import Commitments from './Commitments.svelte'
  import Messages from './Messages.svelte'
  import Nav from './Nav.svelte'
  import Profile from './Profile.svelte'
  import Requests from './Requests.svelte'
  import Footer from './Footer.svelte'
  
  let current = window.location.hash;

  function onNavigation() {
    current = window.location.hash;
    if (current === '' || current === '#') {
      window.location.hash = '#requests';
    }
  }
  window.addEventListener("hashchange", onNavigation, false);

  onNavigation();

  $: console.log(`current page: ${current}`);
</script>

<style>
main {
  height: 85vh;
}
</style>

<Nav current={current} />

<main class="container">
  {#if current === '#requests'}
    <Requests />
  {:else if current === '#commitments'}
    <Commitments />
  {:else if current === '#messages'}
    <Messages />
  {:else if current === '#profile'}
    <Profile />
  {:else}
    <p>🤔Hmm... I couldn't find that page. Please try one of the links above.</p>
  {/if}
</main>

<Footer />