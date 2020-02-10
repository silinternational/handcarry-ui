<script>
import { kilogramsToPounds } from '../data/weight'

export let kilograms

$: pounds = kilogramsToPounds(kilograms)

function format(number) {
  if (number) {
    return round(number) || '< 0.1'
  }
  return number
}

function round(value) {
  return Math.round(value * 10) / 10
}
</script>

<style>
span {
  white-space: nowrap;
}
</style>

<span>{ format(kilograms) } kg</span> / <span>{ format(pounds) } lbs</span>
