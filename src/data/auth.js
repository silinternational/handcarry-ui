import { getExpiration, getSeed, getToken } from './token'
import { loggedOut } from './analytics'
import { clearApp } from './storage'
import { wrappedFetch } from './api'

const expirationEta = getExpiration().getTime() - Date.now()
const autoLogoutTimer = setTimeout(logout, expirationEta)

export async function login(email, returnTo) {
  clearApp()

  let loginUrl = `auth/login?client-id=${encodeURIComponent(getSeed())}&auth-email=${encodeURIComponent(email)}`

  if (returnTo) {
    loginUrl += `&return-to=${encodeURIComponent(returnTo)}`
  }

  return await wrappedFetch(loginUrl)
}

export function logout() {
  // TODO: maybe we need to be firing off some modal or progress that the user is being logged out...
  window.location = `${process.env.BASE_API_URL}/auth/logout?token=${encodeURIComponent(getToken())}`

  clearApp()

  clearTimeout(autoLogoutTimer)

  loggedOut()
}
