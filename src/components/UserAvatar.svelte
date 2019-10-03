<script>
export let user

$: initial = Array.from(user.nickname)[0]
</script>

{#if user.photoURL }
<img src={ user.photoURL } alt="{ user.nickname }" />
{:else}
<span>{ initial }</span>
{/if}
