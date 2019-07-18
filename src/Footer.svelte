<script>
  import { get, login } from './api'
  import { /* geoLocation ,*/ posts, post } from './gqlQueries'

  const newPost = {
    orgID: "67356899-a02c-44dd-97df-c7bdb47d11ca", 
    createdByID: "e99421ee-7ca2-4c49-8ba5-21f51db53c3d",
    type: "REQUEST",
    title: "I need grape Jelly", 
    description: "Five jars please, if you can.", 
    origin: "WAXHAW", 
    size: "medium"
  }
</script>

<style>
</style>

<footer style="display: flex; align-items: flex-start; justify-content: space-between; font-size: .25em; background-color: lightgrey">
  {#await get('get')}
    <p>⏳ waiting for data...</p>
  {:then value}
    <pre>{ JSON.stringify(value, null, 2)}</pre>
  {:catch error}
    <p>🧨 Something went wrong: {error.message}</p>
  {/await}

  <!-- {#await geoLocation('8.8.8.8')} -->
  {#await posts()}
     <p>⏳ waiting for data...</p>
  {:then gqlResponse}
     <pre>{ JSON.stringify(gqlResponse.data, null, 2)}</pre>
  {:catch error}
     <p>🧨 Something went wrong: {error.message}</p>
  {/await}

  <button on:click={() => login()}>login</button>
  <button on:click={() => post(newPost)}>post</button>
</footer>