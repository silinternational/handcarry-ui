<script>
import { login } from '../data/api'

let email = ''

</script>

<style>
</style>

<form on:submit|preventDefault={ () => login(email, '/requests') }>
  <div class="form-row">
    <div class="col-md-6 offset-md-2 col-lg-5 offset-lg-3">
      <h1 class="pt-5 pb-4">Sign in</h1>
    </div>
  </div>
  <div class="form-group form-row align-items-center">
    <!-- svelte-ignore a11y-autofocus -->
    <input id="email" class="form-control form-control-lg col-md-6 offset-md-2 col-lg-5 offset-lg-3 mr-4 my-2" type="email" bind:value={ email } placeholder="Enter email address" autofocus>
    <button type="submit" class="btn btn-primary btn-lg my-2">Sign in</button>
  </div>
</form>
