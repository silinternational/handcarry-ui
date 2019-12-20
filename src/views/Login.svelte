<script>
import { login } from '../data/api'
import { querystring } from 'svelte-spa-router'
import qs from 'qs'

$: returnTo = qs.parse($querystring)['return-to']


let email = getStoredEmail() || ''
let checked = wasRemembered()

function getStoredEmail() {
  return localStorage.getItem('email')
}

function wasRemembered(){
  return getStoredEmail() ? true : false
}

function storeRememberMeChoice() {
  if (checked) {
    localStorage.setItem('email', email)
  } else {
    localStorage.removeItem('email')
  }
}

function signIn() {
  storeRememberMeChoice()

  login(email, returnTo)
}
</script>

<form on:submit|preventDefault={signIn}>
  <div class="form-row">
    <div class="col-md-6 offset-md-2 col-lg-5 offset-lg-3">
      <h1 class="pt-5 pb-4">Sign in</h1>
    </div>
  </div>
  
  <div class="form-row align-items-center">
    <!-- svelte-ignore a11y-autofocus -->
    <input type="email" bind:value={email} required placeholder="Enter email address" autofocus class="form-control form-control-lg col-md-6 offset-md-2 col-lg-5 offset-lg-3 mr-4 my-2 pl-2">
    <button class="btn btn-primary btn-lg my-2">Sign in</button>
  </div>
  
  <div class="form-row">
    <div class="col-md-6 offset-md-2 col-lg-5 offset-lg-3">
      <div class="form-check">
        <input type="checkbox" id="rememberMe" bind:checked on:change={storeRememberMeChoice} class="form-check-input">
        <label for="rememberMe" class="form-check-label">
          Remember my email address
        </label>
      </div>
    </div>
  </div>
</form>
