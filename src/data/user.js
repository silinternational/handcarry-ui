import { writable, get } from 'svelte/store'
import {
  changedNickname,
  changedAvatar,
 } from '../data/analytics'
import { GET, PUT } from './api'
import { onClear } from './storage'

export const me = writable({})

export function init() {
  loadAuthenticatedUser()
  onClear(reset)
}

async function loadAuthenticatedUser() {
  const user = await GET('users/me')

  me.set(user)
}

export async function changeNickname(nickname) {
  const photo_id = get(me).photo_id
  const newUser = await PUT('users/me', {nickname, photo_id})

  me.set(newUser)

  changedNickname()
}

export async function changeProfilePicture(photo_id) {
  const newUser = await PUT('users/me', {photo_id})

  me.set(newUser)

  changedAvatar()
}

function reset() {
  me.set({})
}
