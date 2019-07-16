<script>
  import Commitments from './Commitments.svelte'
  import Messages from './Messages.svelte'
  import Nav from './Nav.svelte'
  import Profile from './Profile.svelte'
  import Requests from './Requests.svelte'
  import { get, gql } from './api.js'

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

<main class="container ">
  {#if current === '#requests'}
    <Requests />
  {:else if current === '#commitments'}
    <Commitments />
  {:else if current === '#messages'}
    <Messages />
  {:else if current === '#profile'}
    <Profile />
  {:else}
    <p>Hmm... I couldn't find that page. Please try one of the links above.</p>
  {/if}
</main>

<footer style="display: flex; font-size: .25em">
  {#await get()}
  	<p>waiting for the promise to resolve...</p>
  {:then value}
    <pre>{ JSON.stringify(value, null, 2)}</pre>
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}

  {#await gql()}
  	<p>waiting for the promise to resolve...</p>
  {:then gqlResponse}
    <pre>{ JSON.stringify(gqlResponse.data, null, 2)}</pre>
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</footer>