<script>
import { sizes } from 'data/sizes.js'

export let size

let color
let match
let name

$: match = sizes.find(s => s.type === size) || {}
$: color = match.color || 'secondary'
$: name = match.name || 'unknown'
</script>

<span class="badge badge-pill badge-{color}">{ name }</span>
