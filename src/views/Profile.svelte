<script>
import { getUser, createPost } from '../data/gqlQueries'

let me = {}; loadMe()

async function loadMe() {
    const response = await getUser()
    me = response.user
}
</script>

<div class="alert alert-warning text-center" role="alert">
  Kate, make me beautiful please
</div>

<h2 class="pt-2">{ me.nickname } }</h2>

<div class="row">
  <div class="col-sm-4 col-lg-3">
    <svg class="lnr lnr-big lnr-user"><use alt="User's avatar" xlink:href="#lnr-user"></use></svg>
  </div>
  <div class="col-sm-8 col-lg-9">
    <h3>Contact Info</h3>
    <div class="container-fluid">
      <dl class="row">
        <dt class="col-sm-4 col-lg-3 col-xl-2">Email:</dt>
        <dd class="col-sm-8 col-lg-9 col-xl-10">{ me.email }</dd>      
      </dl>
    </div>
  </div>
</div>