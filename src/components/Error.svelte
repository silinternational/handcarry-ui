<script>
import { error, reset } from 'data/error.js'

$: e = $error
</script>

{#if e.message}
  <div class="alert alert-danger alert-dismissible" role="alert">
    <h4 class="alert-heading">Something went wrong</h4>

    <p class="text-monospace">{e.message}</p>

    <button on:click={reset} class="close" aria-label="Close">&times;</button>
  </div>
{/if}
