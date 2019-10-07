<script>
export let user

$: nickname = user.nickname || ''
$: initial = Array.from(nickname)[0] || ''
</script>

<style>
div {
  width: 1.6em;
  height: 1.6em;
}
img {
  max-width: 100%;
  max-height: 100%;
}
</style>

<div class="d-inline-block rounded-circle border text-center">
  {#if user.photoURL }
  <img src={ user.photoURL } alt="{ nickname }" />
  {:else}
  <span>{ initial }</span>
  {/if}
</div>
