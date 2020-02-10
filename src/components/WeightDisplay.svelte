<script>
import { kilogramsToPounds } from '../data/weight'

export let kilograms

$: pounds = kilogramsToPounds(kilograms)

function round(value) {
  return Math.round(value * 10) / 10
}
</script>

<style>
span {
  white-space: nowrap;
}
</style>

<span>{ round(kilograms) || '< 0.1' } kg</span> / <span>{ round(pounds) } lbs</span>
