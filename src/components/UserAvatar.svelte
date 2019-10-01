<script>
export let user;

let nickname = user.nickname || ''
</script>

<div class="text-truncate">
  {#if user.imageUrl }
    <img src={ user.imageUrl } alt="{ nickname }" />
  {:else}
    <i>{ nickname }</i>
  {/if}
</div>
