<script>
import { sizes } from 'data/sizes.js'

import { Badge } from '@silintl/ui-components'

export let size

let color
let match
let name

$: match = sizes.find(s => s.type === size) || {}
$: color = match.color || '#777'
$: name = match.name || 'unknown'
</script>

<style>
  .capitalize {
    text-transform: capitalize;
  }
</style>

<Badge {color} bordered borderRadius={'16px'} padding={'0 .5em'}>
  <span class="capitalize fs-14">
    { name }
  </span>
</Badge>