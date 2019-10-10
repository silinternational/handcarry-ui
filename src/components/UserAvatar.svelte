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

<div class="d-inline-block">
  {#if user.photoURL }
    <img class="rounded-circle border text-center" src={user.photoURL} alt={nickname} title={nickname} />
  {:else}
    <span class="badge badge-pill badge-primary" title={nickname}>{initial}</span>
  {/if}
</div>
