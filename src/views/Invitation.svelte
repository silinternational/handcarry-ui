<script>
import { onMount } from 'svelte'
import { getInviteInfo } from '../data/api'
import Login from '../components/Login.svelte'

export let params = {} // URL path parameters, provided by router.

let loading = false
let inviteInfo = {}

onMount(async () => {
  try {
    loading = true

    inviteInfo = await getInviteInfo(params.code)
  } finally {
    loading = false
  }
})

const config = {
  meeting: {
    alt: 'Event logo',
    instructions: name => `To join the ${name} event on WeCarry, enter your email address below to get started:`,
    returnTo: () => `/requests?event=${encodeURIComponent(inviteInfo.name)}`, 
    placeholder: `Enter email associated with event`,
  },
}

$: altText = inviteInfo.type && config[inviteInfo.type].alt || ''
$: instructions = inviteInfo.type && config[inviteInfo.type].instructions(inviteInfo.name) || ''
$: placeholder = inviteInfo.type && config[inviteInfo.type].placeholder || ''
</script>

<style>
img {
  max-height: 4rem;
}
</style>

<div class="text-center">
  <h1 class="pb-4">Welcome to WeCarry!</h1>

  {#if inviteInfo.imageURL}
    <img src={inviteInfo.imageURL} alt={altText} class="mb-3">
  {/if}
</div>

<div class="row">
  <div class="col col-sm-8 offset-sm-2 col-lg-8 offset-lg-2">
      {#if loading}
        <div class="d-flex align-items-center justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Verifying your invitation...</span>
          </div>
          <span class="pl-3 lead">Verifying your invitation...</span>
        </div>
      {:else}
        <p class="text-center">
          {instructions}
        </p>
      {/if}
  </div>
</div>

{#if inviteInfo.type}
  <Login {placeholder} buttonText="Join" hideRememberMe returnTo={config[inviteInfo.type].returnTo()} />
{/if}