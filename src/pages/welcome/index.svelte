<script>
import { params } from '@roxi/routify'

const returnTo = $params['return-to']

let nextUrl = `/welcome/preferences`
if (returnTo) {
  nextUrl += `?return-to=${returnTo}`
}
</script>

<style>
  .anchor-margin {
    margin-top: 1.5rem;
  }
  h1 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
</style>
<div class="d-flex flex-column align-items-center pt-1 pt-md-5">
  <h1 class="text-center">Welcome to WeCarry!</h1>

  <p>
    We (the team behind WeCarry) appreciate you coming to check out WeCarry. We're excited about its potential
    and how it will be used to serve you and your colleagues around the world, and we hope you'll find it helpful too.
  </p>

  <p>
    WeCarry is currently in an Early Access period during which we hope to learn as much as possible about how you use
    WeCarry, what you like about it, what you dislike about it, and how we can make it better for you. We would really
    appreciate it if you'd let us know about any problems or frustrations you run into and any ideas you have that would
    make it even better. You can send us feedback or ask for support by clicking the Support &amp; Feedback button at
    the bottom of your screen.
  </p>

  <p>
    By clicking "Agree & Continue" you are agreeing to our <a href="/terms" target="_blank">Terms of Use</a> and
    <a href="/privacy" target="_blank">Privacy Policy</a>.
  </p>

  <a href={nextUrl} class="btn btn-primary anchor-margin">Agree & Continue</a>
</div>
