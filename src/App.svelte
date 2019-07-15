<script>
  import Nav from './Nav.svelte'

  let current = window.location.hash;

  function onNavigation() {
    current = window.location.hash;
  }
  window.addEventListener("hashchange", onNavigation, false);

  $: console.log(`current page: ${current}`);
</script>

<style>
</style>

<Nav current={current} />

<main class="container">main</main>
