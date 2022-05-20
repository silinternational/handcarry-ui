<script>
    import { Dialog } from '@silintl/ui-components'
    import { createEventDispatcher } from 'svelte'
    
    export let open = false
    
    const buttons = [
        { label: 'Yes, Delete', action: 'delete', class: 'error-button' },
        { label: 'cancel', action: 'cancel', class: 'mdc-dialog__button' },
    ]
    
    const dispatch = createEventDispatcher()
    
    const handleDialog = (e) => {
      e.detail ? dispatch(e.detail) : dispatch('closed')
    }
    </script>
    
    <Dialog.Alert
      {open}
      {buttons}
      defaultAction="cancel"
      title="Delete this Request?"
      on:chosen={handleDialog}
      on:closed={handleDialog}
      >Are you sure you would like to delete this request? This can't be undone.</Dialog.Alert
    >
    