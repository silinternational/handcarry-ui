<script>
export let user
export let small = false

$: nickname = user.nickname || ''
</script>

<style>
img {
  object-fit: cover;
  width: 5rem;
  height: 5rem;
}

.small {
  height: 2rem;
  width: 2rem;
}
</style>

<img class="rounded-circle border" src={user.avatar_url} alt={nickname} title={nickname} class:small />
