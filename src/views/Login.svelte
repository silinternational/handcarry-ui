<script>
import { login } from '../data/auth'
import { querystring, replace } from 'svelte-spa-router'
import qs from 'qs'
import { me } from '../data/user'

$: returnTo = qs.parse($querystring)['return-to']
$: $me.id && replace('/requests') // if they're already authn, no need to login again.

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

<form on:submit|preventDefault={signIn} class="row mt-2">
  <div class="col-12 col-sm-8 offset-sm-1 col-md-6 offset-md-2 col-lg-5 offset-lg-3">
    <h1 class="pb-3">Sign in</h1>
  </div>

  <!-- the input and button should stack on phones but go inline (and centered) on everything else -->
  
  <div class="col-12 col-sm-8 offset-sm-1 col-md-6 offset-md-2 col-lg-5 offset-lg-3">
    <!-- svelte-ignore a11y-autofocus -->
    <input type="email" bind:value={email} required placeholder="Remember my email address" autofocus class="form-control form-control-lg">
  </div>

  <!-- this is typically after the input, except on xs screens -->
  <div class="d-none d-sm-block">
    <button class="btn btn-primary btn-lg">Sign in</button>
  </div>

  <div class="col col-sm-8 offset-sm-1 col-md-6 offset-md-2 col-lg-5 offset-lg-3">
      <input type="checkbox" id="rememberMe" bind:checked on:change={storeRememberMeChoice} class="ml-1 mt-3">
      <label for="rememberMe">
        Remember my email address
      </label>
  </div>

  <!-- only on xs screens is this after the remember me, otherwise it's after the input -->
  <div class="col-4 d-sm-none">
    <button class="btn btn-primary btn-lg float-right mt-3">Sign in</button>
  </div>
</form>
