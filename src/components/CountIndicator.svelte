<script>
export let number = 0
</script>

{#if number}
<small class="badge badge-danger badge-pill">
  {number}
</small>
{/if}