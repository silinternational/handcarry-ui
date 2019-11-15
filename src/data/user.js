import { writable } from 'svelte/store'
import { getUser } from './gqlQueries'

export const me = writable({})

init()

function init() {
  loadAuthenticatedUser()
}

async function loadAuthenticatedUser() {
  try {
    const user = await getUser()

    me.set(user)
  } catch (e) {
    console.error(`user.js:loadAuthenticatedUser: `, e)
    // TODO: errorhandling?
  }
}
