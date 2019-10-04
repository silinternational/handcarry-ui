<script>
export let alt
export let url
</script>

<style>
div {
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
  height: 160px;
}
</style>

<div class="request-image" class:d-none={!url} style="background-image: url({url})" />
