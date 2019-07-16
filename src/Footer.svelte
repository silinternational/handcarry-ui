<script>
  import { get, login } from './api'
  import { geoLocation } from './gqlQueries'
</script>

<style>
</style>

<footer style="display: flex; font-size: .25em">
  {#await get('get')}
    <p>⏳ waiting for data...</p>
  {:then value}
    <pre>{ JSON.stringify(value, null, 2)}</pre>
  {:catch error}
    <p>🧨 Something went wrong: {error.message}</p>
  {/await}

  {#await geoLocation('8.8.8.8')}
     <p>⏳ waiting for data...</p>
  {:then gqlResponse}
     <pre>{ JSON.stringify(gqlResponse.data, null, 2)}</pre>
  {:catch error}
     <p>🧨 Something went wrong: {error.message}</p>
  {/await}

  <button on:click={() => login()}>login</button>
</footer>