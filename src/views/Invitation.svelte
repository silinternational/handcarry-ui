<script>
import { onMount } from 'svelte'
import { login } from '../data/api'

export let params = {} // URL path parameters, provided by router.

let email = ''
let inviteInfo = {}

onMount(() => {
  console.log('invite code: ', params.code)
  inviteInfo = {
    type: 'meeting',
    name: 'Svelte conference',
    imageURL: 'https://svelte.dev/svelte-logo-horizontal.svg'
  }
})

const config = {
  meeting: {
    alt: 'Event logo',
    instructions: name => `To join the <strong>${name}</strong> event on WeCarry, enter your email address below to get started:`,
    returnTo: `/requests?eventName=${inviteInfo.name}`, // TODO: uri encode the name here if login() doesn't already
    placeholder: `Enter email associated with event`,
  },
}

$: altText = inviteInfo.type && config[inviteInfo.type].alt || ''
$: instructions = inviteInfo.type && config[inviteInfo.type].instructions(inviteInfo.name) || ''
$: placeholder = inviteInfo.type && config[inviteInfo.type].placeholder || ''

function join() {
  login(email, config[inviteInfo.type].returnTo)
}
</script>

<style>
img {
  max-height: 4rem;
}
</style>

<div class="text-center">
  <img src={inviteInfo.imageURL} alt={altText}>

  <h1 class="pt-4 pb-3">Welcome to WeCarry!</h1>
  
  <p>{@html instructions}</p>
</div>


<!-- the input and button should stack on phones but go inline (and centered) on everything else -->
<form on:submit|preventDefault={join} class="row">
  <div class="col-12 col-sm-8 offset-sm-1 col-md-6 offset-md-2 col-lg-5 offset-lg-3">
    <!-- svelte-ignore a11y-autofocus -->
    <input type="email" bind:value={email} required {placeholder} autofocus class="form-control form-control-lg">
  </div>
  <div class="col-12 col-sm-2">
    <button class="btn btn-primary btn-lg float-right mt-3 float-sm-none mt-sm-0">Join</button>
  </div>
</form>
