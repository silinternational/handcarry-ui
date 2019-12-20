import { tick } from 'svelte'

export async function scrollToHtmlId(id) {

  // Wait for the DOM to be rendered.
  await tick()

  const element = document.querySelector('#' + id)
  element && element.scrollIntoView()
}
