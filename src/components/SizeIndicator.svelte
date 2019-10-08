<script>
import { sizes } from '../data/sizes'

export let size

$: color = sizes.find(s => s.type === size).color
</script>

<span class="badge badge-pill badge-{color}">{ size.toLowerCase() }</span>
