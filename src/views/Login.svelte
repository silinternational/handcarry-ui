<script>
import { login } from '../data/api'

let email = ''

</script>

<style>
</style>

<h1 class="pb-4">Sign in</h1>

<form on:submit|preventDefault={ () => login(email, '/requests') }>
  <div class="form-group row align-items-center">
    <!-- svelte-ignore a11y-autofocus -->
    <input id="email" class="form-control form-control-lg col-4 mr-4" type="email" bind:value={ email } placeholder="Enter email address" autofocus>
    <button type="submit" class="btn btn-primary btn-lg">Sign in</button>
  </div>
</form>
