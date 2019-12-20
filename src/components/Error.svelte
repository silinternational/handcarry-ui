<script>
import { error, reset } from '../data/error'
import { querystring } from 'svelte-spa-router'
import qs from 'qs'

$: e = $error
$: returnTo = qs.parse($querystring)['return-to']
$: someErrorOccurred = qs.parse($querystring)['error'] // this will be present when something goes wrong during authn related calls to api, e.g., logout, login
</script>

{#if e.code === 401 && returnTo || e.code !== 401 && e.message || someErrorOccurred}
  <div class="alert alert-danger alert-dismissible" role="alert">
    <h4 class="alert-heading">Something went wrong</h4>
    
    <p class="text-monospace">{e.message || 'No additional details'}</p>
    
    <button on:click={reset} class="close" aria-label="Close">&times;</button>
  </div>
{/if}