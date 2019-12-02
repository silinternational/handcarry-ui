import { writable } from 'svelte/store'
import { getUser, updateNickname, updateProfilePic } from './gqlQueries'

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

export async function changeNickname(nickname) {
  try {
    const updatedUser = await updateNickname(nickname)

    me.set(updatedUser)    
  } catch (e) {
    console.error(`user.js:changeNickname: `, e)
    // TODO: errorhandling?
  }
}

export async function changeProfilePicture(photoId) {
  try {
    const updatedUser = await updateProfilePic(photoId)

    me.set(updatedUser)    
  } catch (e) {
    console.error(`user.js:changeProfilePicture: `, e)
    // TODO: errorhandling?
  }
}

