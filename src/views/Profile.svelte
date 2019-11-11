<script>
import UserAvatar from '../components/UserAvatar.svelte'
import { me } from '../data/user'

$: email = $me.email || ''
$: nickname = $me.nickname || ''
</script>

<style>
.profile-avatar {
  font-size: 52px;
}
</style>

<div class="row">
  <div class="col-12 col-sm-5">
    <div class="text-center text-sm-right profile-avatar">
      <UserAvatar user={$me} />
    </div>
  </div>
  
  <div class="col-10 col-sm-7 offset-1 offset-sm-0">
    <h2 class="pt-2">{ nickname }</h2>
    <div>Email: <b>{ email }</b></div>
  </div>
</div>