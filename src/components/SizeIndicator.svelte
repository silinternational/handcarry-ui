<script>
import { sizes } from '../data/sizes'
import { Badge } from '@silintl/ui-components'

export let size

let color
let match
let name

$: match = sizes.find(s => s.type === size) || {}
$: color = match.color || 'secondary'
$: name = match.name || 'unknown'
</script>

<Badge {color} bordered borderRadius={'16px'} padding={'0 .5em'}>{ name }</Badge>
