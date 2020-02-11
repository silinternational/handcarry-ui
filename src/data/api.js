import token from './token'
import { throwError } from './error'
import polyglot from '../i18n'
import { reset as resetUser } from './user'
import { reset as resetMessaging } from './messaging'
import { reset as resetRequests } from './requests'
import { loggedOut } from './analytics'

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
async function wrappedFetch(url, body) {
  const headers = {
    authorization: token.authzHeader(),
    'content-type': 'application/json',
  }

  // when dealing with FormData, i.e., when uploading files, allow the browser to set the request up
  // so boundary information is built properly.
  if (body instanceof FormData) {
    delete headers['content-type']
  }

  // reminder: fetch does not throw exceptions for non-200 responses (https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
  const response = await fetch(`${process.env.BASE_API_URL}/${url}`, {
    method: 'post',
    credentials: 'include', // ensures the response back from the api will be allowed to "set-cookie"
    headers,
    body,
  })

  const contents = await response.json()
  
  // gql responses can be the following:
  //   200's can be good { data } or bad { errors, data }
  //   422 is also possible, e.g., if the gql syntax is wrong, { errors }
  // buffalo responses more similarly mimic REST, error format will be:
  //   { code, key } where the message to display must be derived from { key }

  if (response.ok) { 
    return contents
  }

  if (response.status === 401) {
    clearLocalData()
  }

  // errors found in one of two places:
  //   buffalo => `key` (to be derived)
  //   gql => `errors[0].message`
  throwError(polyglot.t(contents.key) || contents.errors[0].message, response.status)
}

export async function gql(query) {
  const body = JSON.stringify({
    query
  })
  
  const response = await wrappedFetch('gql', body)
  
  if (response.errors) { 
    throwError(response.errors[0].message)
  }
     
  return response.data
}

export async function login(email, returnTo) {
  token.reset()

  let loginUrl = `auth/login?client-id=${encodeURIComponent(token.key())}&auth-email=${encodeURIComponent(email)}`

  if (returnTo) {
    loginUrl += `&return-to=${encodeURIComponent(returnTo)}`
  }

  try {
    const response = await wrappedFetch(loginUrl)

    window.location = response.RedirectURL
  } catch (e) {
    // TODO: need errorhandling and additional use cases with this response
    //   "Need to review response for error or multiple org 
    //    options for login. If multiple options you then also need to provide the org_id 
    //    when resubmitting call to login" –Phillip)
    throw e
  }
}

export function logout() {
  window.location = `${process.env.BASE_API_URL}/auth/logout?token=${encodeURIComponent(token.pair())}`

  clearLocalData()

  loggedOut()
}

export async function upload(formData) {
  return await wrappedFetch('upload', formData)
}

function clearLocalData() {
  token.reset()
  resetUser()
  resetMessaging()
  resetRequests()
}