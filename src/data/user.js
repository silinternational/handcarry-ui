import { writable } from 'svelte/store'
import { getUser, updateNickname, updateProfilePic } from './gqlQueries'

export const me = writable({})

export function init() {
  loadAuthenticatedUser()
}

async function loadAuthenticatedUser() {
  const user = await getUser()

  me.set(user)
}

export async function changeNickname(nickname) {
  const updatedUser = await updateNickname(nickname)

  me.set(updatedUser)    
}

export async function changeProfilePicture(photoId) {
  const updatedUser = await updateProfilePic(photoId)

  me.set(updatedUser)
}

export function reset() {
  me.set({})
}