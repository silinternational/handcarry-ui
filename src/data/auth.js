import token from './token'
import { loggedOut } from './analytics'
import { clearApp } from './storage'
import { wrappedFetch } from './api'

const expirationEta = token.expiration().getTime() - Date.now()
const autoLogoutTimer = setTimeout(logout, expirationEta)

export async function login(email, returnTo) {
  clearApp()

  let loginUrl = `auth/login?client-id=${encodeURIComponent(token.key())}&auth-email=${encodeURIComponent(email)}`

  if (returnTo) {
    loginUrl += `&return-to=${encodeURIComponent(returnTo)}`
  }

  return await wrappedFetch(loginUrl)
}

export function logout() {
  window.location = `${process.env.BASE_API_URL}/auth/logout?token=${encodeURIComponent(token.pair())}`

  clearApp()

  clearTimeout(autoLogoutTimer)

  loggedOut()
}
