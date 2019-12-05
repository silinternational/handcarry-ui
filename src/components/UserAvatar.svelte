<script>
export let user
export let small = false

$: nickname = user.nickname || ''
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}

.small {
  height: 2rem;
}
</style>

<img class="rounded-circle border" src={user.avatarURL} alt={nickname} title={nickname} class:small />
