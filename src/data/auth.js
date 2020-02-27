import token from './token'
import { loggedOut } from './analytics'
import { runCustomClears } from './storage'
import { wrappedFetch } from './api'

const expirationEta = token.expiration().getTime() - Date.now()
const autoLogoutTimer = setTimeout(logout, expirationEta)

export async function login(email, returnTo) {
  runCustomClears()

  let loginUrl = `auth/login?client-id=${encodeURIComponent(token.key())}&auth-email=${encodeURIComponent(email)}`

  if (returnTo) {
    loginUrl += `&return-to=${encodeURIComponent(returnTo)}`
  }

  // TODO: waiting on api to return array of auth providers
  const response = await wrappedFetch(loginUrl)
  // window.location = response.RedirectURL
  return [
    {
      name: 'SIL',
      RedirectURL: response.RedirectURL,
    }
    // {
    //   name: 'Google',
    //   RedirectURL: 'https://example.org/login'
    // },
    // {
    //   name: 'Facebook',
    //   RedirectURL: 'https://example.org/login'
    // },
    // {
    //   name: 'Twitter',
    //   RedirectURL: 'https://example.org/login'
    // },
    // {
    //   name: 'LinkedIn',
    //   RedirectURL: 'https://example.org/login'
    // },
    // {
    //   name: 'Microsoft',
    //   RedirectURL: 'https://example.org/login'
    // },
  ]
}

export function logout() {
  window.location = `${process.env.BASE_API_URL}/auth/logout?token=${encodeURIComponent(token.pair())}`

  runCustomClears()

  clearTimeout(autoLogoutTimer)

  loggedOut()
}

export async function upload(formData) {
  return await wrappedFetch('upload', formData)
}
