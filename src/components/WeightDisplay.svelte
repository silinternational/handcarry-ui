<script>
import { kilogramsToPounds } from '../data/weight'

export let kilograms

$: pounds = kilogramsToPounds(kilograms)

function round(value) {
  return Math.round(value * 10) / 10
}
</script>

{ round(kilograms) }&nbsp;kg / { round(pounds) }&nbsp;lbs
