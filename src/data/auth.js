import { getSeed, getToken } from './token'
import { loggedOut } from './analytics'
import { clearApp } from './storage'
import { wrappedFetch } from './api'
import { writable } from 'svelte/store'

export const loggingOut = writable(false)

export async function login(email, returnTo) {
  clearApp()

  let loginUrl = `auth/login?client-id=${encodeURIComponent(getSeed())}&auth-email=${encodeURIComponent(email)}`

  if (returnTo) {
    loginUrl += `&return-to=${encodeURIComponent(returnTo)}`
  }

  return await wrappedFetch(loginUrl)
}

export function logout() {
  loggingOut.set(true)

  // just in case something goes wrong below, we don't want the page to get stuck in a permanent logging out state
  const TEN_SECS = 10000
  setTimeout(() => loggingOut.set(false), TEN_SECS)

  window.location = `${process.env.BASE_API_URL}/auth/logout?token=${encodeURIComponent(getToken())}`

  clearApp()

  clearTimeout(autoLogoutTimer)

  loggedOut()
}
