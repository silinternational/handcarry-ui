<script>
export let alt
export let url
</script>

<style>
img {
  max-height: 100%;
  max-width: 100%;
}
</style>

<img src={url} {alt} class:d-none={!url} />
