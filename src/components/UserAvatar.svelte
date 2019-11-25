<script>
export let user

$: nickname = user.nickname || ''
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>

<img class="rounded-circle border text-center" src={user.photoURL} alt={nickname} title={nickname} />
