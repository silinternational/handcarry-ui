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

  // TODO: waiting on api to return array of auth providers
  // const response = await wrappedFetch(loginUrl)
  return [
    {
      name: 'Google',
      RedirectURL: 'https://example.org/login'
    },
    {
      name: 'Facebook',
      RedirectURL: 'https://example.org/login'
    },
    {
      name: 'Twitter',
      RedirectURL: 'https://example.org/login'
    },
    {
      name: 'LinkedIn',
      RedirectURL: 'https://example.org/login'
    },
    {
      name: 'Microsoft',
      RedirectURL: 'https://example.org/login'
    },
  ]
}

export function logout() {
  window.location = `${process.env.BASE_API_URL}/auth/logout?token=${encodeURIComponent(token.pair())}`

  clear()

  loggedOut()
}

export async function upload(formData) {
  return await wrappedFetch('upload', formData)
}
