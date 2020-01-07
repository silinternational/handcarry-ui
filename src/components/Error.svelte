<script>
import { error, reset } from '../data/error'
import { querystring } from 'svelte-spa-router'
import qs from 'qs'

$: e = $error
$: errorOccurredOutsideApp = qs.parse($querystring)['error'] // this will be present when something goes wrong during authn related calls to api, e.g., logout, login
</script>

{#if e.message || errorOccurredOutsideApp}
  <div class="alert alert-danger alert-dismissible" role="alert">
    <h4 class="alert-heading">Something went wrong</h4>
    
    <p class="text-monospace">{@html e.message || 'No additional details'}</p>
    
    <button on:click={reset} class="close" aria-label="Close">&times;</button>
  </div>
{/if}