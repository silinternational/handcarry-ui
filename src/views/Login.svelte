<script>
import Login from '../components/Login.svelte'
import { replace } from 'svelte-spa-router'
import { me } from '../data/user'

$: $me.id && replace('/requests') // if they're already authn, no need to login again.
</script>

<Login>
  Sign in
</Login>