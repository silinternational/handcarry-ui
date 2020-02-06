<script>
export let kilograms

$: pounds = kilograms /  0.45359237

function round(value) {
  return Math.round(value * 10) / 10
}
</script>

{ round(kilograms) }&nbsp;kg / { round(pounds) }&nbsp;lbs
