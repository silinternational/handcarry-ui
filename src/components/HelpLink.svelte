<script>
import { sendAnalyticEvent } from '../data/analytics'

const formTitle = 'Support & Feedback'
const submitTitle = 'Submit'
const submitThanks = 'Thank you for contacting us'
</script>

<a href="#/" data-toggle="modal" data-target="#freshdesk" on:click={() => sendAnalyticEvent('Menu', 'help')} class={$$props.class}>
  <slot />
</a>

<div class="modal fade" id="freshdesk" tabindex="-1" role="dialog" aria-labelledby="freshdesk" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <iframe title="Feedback Form"
                src="https://wecarry.freshdesk.com/widgets/feedback_widget/new?widgetType=embedded&formTitle={encodeURIComponent(formTitle)}&submitTitle={encodeURIComponent(submitTitle)}&submitThanks={encodeURIComponent(submitThanks)}&screenshot=No&captcha=yes" 
                id="freshwidget-embedded-form" class="freshwidget-embedded-form" scrolling="no" height="500px" width="100%" frameborder="0" />
      </div>
    </div>
  </div>
</div>
