import { writable, get } from 'svelte/store'
import { getUser, updateUser} from './gqlQueries'
import { 
  changedNickname,
  changedAvatar,
 } from '../data/analytics'
import { onClear } from './storage'

export const me = writable({})

export function init() {
  loadAuthenticatedUser()
  onClear(reset)
}

async function loadAuthenticatedUser() {
  const user = await getUser()

  me.set(user)
}

export async function changeNickname(nickname) {
  const mergedUpdates = Object.assign({}, get(me), { nickname })

  const newUser = await updateUser(mergedUpdates)

  me.set(newUser)

  changedNickname()
}

export async function changeProfilePicture(photoID) {
  const mergedUpdates = Object.assign({}, get(me), { photoID })

  const newUser = await updateUser(mergedUpdates)

  me.set(newUser)

  changedAvatar()
}

function reset() {
  me.set({})
}
