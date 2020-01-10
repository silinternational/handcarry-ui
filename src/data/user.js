import { writable } from 'svelte/store'
import { getUser, updateNickname, updateProfilePic } from './gqlQueries'
import { 
  changedNickname,
  changedAvatar,
 } from '../data/analytics'

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

  changedNickname()
}

export async function changeProfilePicture(photoId) {
  const updatedUser = await updateProfilePic(photoId)

  me.set(updatedUser)

  changedAvatar()
}

export function reset() {
  me.set({})
}