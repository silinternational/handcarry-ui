<script>
export let title = ''
</script>

<div class="row">
  <div class="col-12 col-md-4 col-lg-3">
    <h2>{ title }</h2>
  </div>
  <div class="col text-right">
    <div class="row">
      <div class="col-12 text-center col-sm text-sm-left text-md-right">
        <slot name="tags"></slot>
      </div>
      <div class="col-12 text-center col-sm-auto text-sm-right">
        <slot name="toggles"></slot>
      </div>
    </div>
  </div>
</div>

<div class="row mt-2">
  <div class="col-12 col-md-4 col-lg-3 mb-2">
    <div>
      <slot name="filters"></slot>
    </div>
  </div>
  <div class="col-12 col-md-8 col-lg-9">
    <slot name="items"></slot>
  </div>
</div>
