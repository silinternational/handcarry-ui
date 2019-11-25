<script>
import md5 from 'blueimp-md5'

export let user

$: nickname = user.nickname || ''
$: hashedEmail = md5((user.email || '').trim().toLowerCase()) // https://en.gravatar.com/site/implement/hash/
$: src = user.photoURL || `https://www.gravatar.com/avatar/${hashedEmail}?default=mp` // https://en.gravatar.com/site/implement/images#default-image
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>

<img class="rounded-circle border" {src} alt={nickname} title={nickname} />
