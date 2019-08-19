<script>
import { login, get } from './api'

let email = ''
</script>

<style>
</style>

<h1 class="pb-4">Sign in</h1>

<form on:submit|preventDefault={ () => login(email) }>
  <div class="form-group row align-items-center">
    <label for="email" class="col-2 col-form-label-lg">Email address</label>
    <input id="email" class="form-control form-control-lg col-6 mr-4" type="email" bind:value={ email } placeholder="Enter email address" autofocus>
    <button type="submit" class="btn btn-primary btn-lg col-2">Sign in</button>
  </div>
</form>

{#await get('me')}
  <p>⏳ checking to see if I know who you are...</p>
{:then value}
  <pre>{ JSON.stringify(value, null, 2) }</pre>
{:catch error}
  <p>🧨 Something went wrong: { JSON.stringify(error.message, null, 2) }</p>
{/await}
