<script>
import { sizes } from '../data/sizes'
import { Badge } from '@silintl/ui-components'

export let size

let color
let match
let name

$: match = sizes.find(s => s.type === size) || {}
$: color = match.color || '#777'
$: name = capitalizeFirstLetter(match.name) || 'unknown'

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)
</script>

<Badge {color} bordered borderRadius={'16px'} padding={'0 .5em'}>{ name }</Badge>
