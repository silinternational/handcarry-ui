import token from './token'
import { loggedOut } from './analytics'
import { clear } from './storage'
import { wrappedFetch } from './api'

export async function login(email, returnTo) {
  clear()

  let loginUrl = `auth/login?client-id=${encodeURIComponent(token.key())}&auth-email=${encodeURIComponent(email)}`

  if (returnTo) {
    loginUrl += `&return-to=${encodeURIComponent(returnTo)}`
  }

  const response = await wrappedFetch(loginUrl)
  // const response = [
  //   {
  //     name: 'SIL',
  //     logoURL: 'https://static.sil.org/brand-tool/glyph1.png',
  //     RedirectURL: 'https://example.org/login'
  //   },
  //   {
  //     name: 'Google',
  //     logoURL: 'https://www.naschenweng.info/wp-content/uploads/2010/10/google-logo.png',
  //     RedirectURL: 'https://example.org/login'
  //   },
  // ]

  // if (response.length === 1) {
    window.location = response.RedirectURL //response[0].RedirectURL
  // } else {
    // store these auth providers
    // push to another view
    // render the options
    // use the RedirectURL for the window.location in that view
    // destroy the storage
  // }
}

export function logout() {
  window.location = `${process.env.BASE_API_URL}/auth/logout?token=${encodeURIComponent(token.pair())}`

  clear()

  loggedOut()
}

export async function upload(formData) {
  return await wrappedFetch('upload', formData)
}
