<script>
import { login } from '../data/auth'
import { querystring } from 'svelte-spa-router'
import qs from 'qs'
import { me } from '../data/user'
import jquery from 'jquery' // $ is already a reserved word in svelte

export let placeholder = 'Enter email address'
export let buttonText = 'Sign in'
export let hideRememberMe = false
export let returnTo = qs.parse($querystring)['return-to']
console.log('return to : ',returnTo)
let email = getStoredEmail() || ''
let checked = !!email
let identityProviders = []

function getStoredEmail() {
  return localStorage.getItem('email')
}

function storeRememberMeChoice() {
  if (checked) {
    localStorage.setItem('email', email)
  } else {
    localStorage.removeItem('email')
  }
}

function logo(name) {
  const urls = {
    // https://developers.google.com/identity/branding-guidelines
    google: 'oauth/btn_google_signin_dark_normal_web@2x.png',
    // https://developers.facebook.com/docs/facebook-login/web/login-button
    facebook: 'oauth/facebook.png',
    // https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter
    twitter: 'oauth/twitter_button.png',
    // https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin
    linkedin: 'oauth/linkedin-Sign-in-Large---Default.png',
    // https://https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-add-branding-in-azure-ad-apps
    microsoft: 'oauth/ms-symbollockup_signin_dark.svg',
  }

  return urls[name.toLowerCase()]
}

async function signIn() {
  storeRememberMeChoice()

  identityProviders = await login(email, returnTo)

  if (identityProviders.length === 1) {
    window.location = identityProviders[0].RedirectURL
  } else {
    // make sure to use an id here since there may be other plugins that use bootstrap modals, e.g., freshdesk
    jquery('#identityProviderModal').modal('show')
  }
}
</script>

<style>
a > img {
  width: 21rem; /* worked pretty well on all screens, no need for breakpoint work here */
}
</style>

<form on:submit|preventDefault={signIn} class="row mt-2">
  <div class="col-12 col-sm-8 offset-sm-1 col-md-6 offset-md-2 col-lg-5 offset-lg-3">
    <h1 class="pb-3"><slot /></h1>
  </div>

  <!-- the input and button should stack on phones but go inline (and centered) on everything else -->

  <div class="col-12 col-sm-8 offset-sm-1 col-md-6 offset-md-2 col-lg-5 offset-lg-3">
    <!-- svelte-ignore a11y-autofocus -->
    <input type="email" bind:value={email} required {placeholder} autofocus class="form-control form-control-lg">
  </div>

  <!-- this is typically after the input, except on xs screens -->
  <div class="d-none d-sm-block ml-3">
    <button class="btn btn-primary btn-lg">{buttonText}</button>
  </div>

    <div class="col col-sm-8 offset-sm-1 col-md-6 offset-md-2 col-lg-5 offset-lg-3">
      <div class="form-check mt-2 ml-1">
        {#if ! hideRememberMe}
          <input type="checkbox" id="rememberMe" bind:checked on:change={storeRememberMeChoice} class="form-check-input">
          <label for="rememberMe" class="form-check-label">
            Remember my email address
          </label>
        {/if}
      </div>
    </div>

  <!-- only on xs screens is this after the remember me, otherwise it's after the input -->
  <div class="col-4 d-sm-none">
    <button class="btn btn-primary btn-lg float-right mt-3">{buttonText}</button>
  </div>
</form>

<div class="modal fade" id="identityProviderModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" class="align-text-top">×</span>
        </button>
      </div>
      <div class="modal-body d-flex flex-column align-items-center">
        <p class="pb-3">
          To sign in as <strong>{email}</strong>, choose a provider below:
        </p>

        {#each identityProviders as { RedirectURL, Name }}
          <a href={RedirectURL} class="mb-2">
            <img src={logo(Name)} alt={`Sign in with ${Name}`}>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>