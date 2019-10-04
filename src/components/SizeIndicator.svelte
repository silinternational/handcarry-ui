<script>
export let size

$: normalizedSize = new String(size).toLowerCase()

const sizeToColorMap = {
  tiny: 'success',
  small: 'info',
  medium: 'warning',
  large: 'danger',
  xlarge: 'purple',
}
</script>

<style>
.badge-purple {
  color: white;
  background-color: purple;
}
</style>

<span class="badge badge-pill badge-{sizeToColorMap[normalizedSize]}">{ normalizedSize }</span>
